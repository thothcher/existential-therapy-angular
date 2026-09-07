/* ==========================================================================
   chat.service.ts — the conversation, and the stream that feeds it.

   Talks to /api/chat, never to Anthropic. The key lives in the Netlify
   function; this side sends a mode, a language and at most a scenario id, and
   reads SSE frames back.

   Three things here are load-bearing and easy to get wrong:

   1. This app is zoneless — there is no zone.js in the project at all. A fetch
      reader loop that mutates a plain field paints nothing and raises no error.
      Every token has to reach the DOM through a signal write.

   2. `streaming` is deliberately separate from `turns`. If each token rebuilt
      the turns array, the @for over it would re-diff every message in the
      conversation on every token. Kept apart, the list is untouched mid-reply
      and exactly one interpolation updates.

   3. Georgian is multi-byte UTF-8 and a network chunk will land mid-character.
      TextDecoder is used in streaming mode for that reason, and SSE frames are
      re-assembled across chunk boundaries for the same one.
   ========================================================================== */

import { DestroyRef, Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from './storage.service';
import type { Lang } from '../models';

const KEY = 'et_chat';

/** Matches the server cap. Trimmed from the front so a session cannot grow without end. */
const MAX_TURNS = 40;

export type ChatMode = 'therapist' | 'client';
export type ChatStatus = 'idle' | 'sending' | 'streaming' | 'error';

export interface ChatTurn {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

interface StoredSession {
  mode: ChatMode;
  scenarioId: string | null;
  turns: ChatTurn[];
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly storage = inject(StorageService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /* ---- state ------------------------------------------------------------ */

  private readonly modeSignal = signal<ChatMode | null>(null);
  private readonly scenarioSignal = signal<string | null>(null);
  private readonly turnsSignal = signal<ChatTurn[]>([]);
  private readonly streamingSignal = signal('');
  private readonly statusSignal = signal<ChatStatus>('idle');
  private readonly crisisSignal = signal(false);
  /** A `chat.err.*` key rather than a finished string, so it follows the language. */
  private readonly errorSignal = signal<string | null>(null);

  readonly mode = this.modeSignal.asReadonly();
  readonly scenarioId = this.scenarioSignal.asReadonly();
  readonly turns = this.turnsSignal.asReadonly();
  readonly streaming = this.streamingSignal.asReadonly();
  readonly status = this.statusSignal.asReadonly();
  readonly crisis = this.crisisSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly busy = computed(() => {
    const status = this.statusSignal();
    return status === 'sending' || status === 'streaming';
  });

  /** The conversation has run long enough that a debrief is worth offering. */
  readonly canDebrief = computed(() =>
    this.modeSignal() === 'client' && this.turnsSignal().length >= 4
  );

  private controller: AbortController | null = null;
  private buffer = '';
  private frame = 0;

  constructor() {
    this.restore();
    // Navigating away mid-reply must not leave a reader running.
    inject(DestroyRef).onDestroy(() => this.abort());
  }

  /* ---- session ---------------------------------------------------------- */

  begin(mode: ChatMode, scenarioId: string | null): void {
    this.abort();
    this.modeSignal.set(mode);
    this.scenarioSignal.set(scenarioId);
    this.turnsSignal.set([]);
    this.streamingSignal.set('');
    this.statusSignal.set('idle');
    this.crisisSignal.set(false);
    this.errorSignal.set(null);
    this.persist();
  }

  /** Back to the mode picker, and gone from storage. */
  reset(): void {
    this.abort();
    this.modeSignal.set(null);
    this.scenarioSignal.set(null);
    this.turnsSignal.set([]);
    this.streamingSignal.set('');
    this.statusSignal.set('idle');
    this.crisisSignal.set(false);
    this.errorSignal.set(null);
    this.storage.remove(KEY);
  }

  dismissCrisis(): void {
    this.crisisSignal.set(false);
  }

  /* ---- sending ---------------------------------------------------------- */

  async send(text: string, lang: Lang): Promise<void> {
    const message = text.trim();
    const mode = this.modeSignal();
    if (!this.isBrowser || !message || !mode || this.busy()) return;

    this.errorSignal.set(null);
    this.appendTurn('user', message);
    this.statusSignal.set('sending');

    this.controller = new AbortController();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        signal: this.controller.signal,
        body: JSON.stringify({
          mode,
          scenarioId: this.scenarioSignal(),
          lang,
          turns: this.turnsSignal().map(turn => ({ role: turn.role, text: turn.text }))
        })
      });

      if (!response.body) throw new Error('no-body');
      await this.consume(response.body);
    } catch (error) {
      // An abort is a normal outcome — the reader pressed stop, or navigated.
      if ((error as Error)?.name === 'AbortError') {
        this.settleStream();
        return;
      }
      this.flushFrame();
      this.settleStream();
      this.statusSignal.set('error');
      this.errorSignal.set('chat.err.network');
    } finally {
      this.controller = null;
    }
  }

  /** Ends the reply early. What arrived is kept — it is what the reader read. */
  stop(): void {
    this.controller?.abort();
  }

  private abort(): void {
    this.controller?.abort();
    this.controller = null;
    if (this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
    }
    this.buffer = '';
  }

  /* ---- the stream ------------------------------------------------------- */

  private async consume(body: ReadableStream<Uint8Array>): Promise<void> {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let carry = '';

    this.statusSignal.set('streaming');

    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;

      // stream: true — a chunk boundary inside a Georgian character would
      // otherwise decode to a replacement glyph.
      carry += decoder.decode(value, { stream: true });

      // A chunk can also end mid-frame; whatever is left after the last blank
      // line stays in `carry` for the next read.
      const frames = carry.split('\n\n');
      carry = frames.pop() ?? '';

      for (const raw of frames) this.handleFrame(raw);
    }

    this.flushFrame();
    this.settleStream();
  }

  private handleFrame(raw: string): void {
    let event = 'message';
    let data = '';

    for (const line of raw.split('\n')) {
      if (line.startsWith('event:')) event = line.slice(6).trim();
      else if (line.startsWith('data:')) data += line.slice(5).trim();
    }
    if (!data) return;

    let payload: { text?: string; code?: string };
    try {
      payload = JSON.parse(data) as { text?: string; code?: string };
    } catch {
      return;
    }

    switch (event) {
      case 'delta':
        if (payload.text) this.push(payload.text);
        break;

      case 'crisis':
        // The persona stands down. The transcript stays: deleting what someone
        // just wrote at this exact moment would be the wrong signal entirely.
        this.controller?.abort();
        this.flushFrame();
        this.settleStream();
        this.crisisSignal.set(true);
        break;

      case 'error':
        this.flushFrame();
        this.settleStream();
        this.statusSignal.set('error');
        this.errorSignal.set(`chat.err.${payload.code ?? 'server'}`);
        break;

      case 'done':
      default:
        break;
    }
  }

  /**
   * Tokens arrive faster than the display can show them. Accumulating into a
   * plain field and flushing once per frame means one signal write — and so
   * one repaint — per frame, instead of one per token.
   */
  private push(delta: string): void {
    this.buffer += delta;
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.streamingSignal.set(this.buffer);
    });
  }

  private flushFrame(): void {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
    }
    if (this.buffer) this.streamingSignal.set(this.buffer);
  }

  /** Moves the in-flight text into the transcript as one completed turn. */
  private settleStream(): void {
    const text = this.buffer.trim();
    this.buffer = '';
    this.streamingSignal.set('');
    if (text) this.appendTurn('assistant', text);
    if (this.statusSignal() !== 'error') this.statusSignal.set('idle');
  }

  private appendTurn(role: ChatTurn['role'], text: string): void {
    const turn: ChatTurn = { id: `${role}-${Date.now()}-${this.turnsSignal().length}`, role, text };
    this.turnsSignal.update(list => [...list, turn].slice(-MAX_TURNS));
    this.persist();
  }

  /* ---- persistence ------------------------------------------------------ */

  private persist(): void {
    const mode = this.modeSignal();
    if (!mode) return;
    this.storage.set(KEY, {
      mode,
      scenarioId: this.scenarioSignal(),
      turns: this.turnsSignal()
    } satisfies StoredSession);
  }

  private restore(): void {
    if (!this.isBrowser) return;
    const stored = this.storage.get<StoredSession | null>(KEY, null);
    if (!stored || (stored.mode !== 'therapist' && stored.mode !== 'client')) return;

    this.modeSignal.set(stored.mode);
    this.scenarioSignal.set(stored.scenarioId ?? null);
    this.turnsSignal.set(Array.isArray(stored.turns) ? stored.turns.slice(-MAX_TURNS) : []);
  }
}
