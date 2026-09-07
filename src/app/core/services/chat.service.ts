/* ==========================================================================
   chat.service.ts — the conversations, and the stream that feeds them.

   Talks to /api/chat, never to Anthropic. The key lives in the Netlify
   function; this side sends a mode, a language and at most a scenario id, and
   reads SSE frames back.

   Conversations are kept, not overwritten. "New conversation" starts another
   one and leaves the last where it was — the earlier build deleted it, which
   meant the only way to begin again was to destroy what you had just done.
   Deleting is now its own deliberate act, per conversation.

   Three things here are load-bearing and easy to get wrong:

   1. This app is zoneless — there is no zone.js in the project at all. A fetch
      reader loop that mutates a plain field paints nothing and raises no error.
      Every token has to reach the DOM through a signal write.

   2. `streaming` is deliberately separate from the turns list. If each token
      rebuilt that array, the @for over it would re-diff every message in the
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

/** Matches the server cap. Trimmed from the front so one session cannot grow without end. */
const MAX_TURNS = 40;
/** How many conversations the history keeps before the oldest falls off. */
const MAX_SESSIONS = 20;
/** Characters of the first message used as a conversation's title. */
const TITLE_LENGTH = 60;

export type ChatMode = 'therapist' | 'client';
export type ChatStatus = 'idle' | 'sending' | 'streaming' | 'error';

export interface ChatTurn {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export interface ChatSession {
  id: string;
  mode: ChatMode;
  scenarioId: string | null;
  /** Derived from the first thing the reader said; empty until they say it. */
  title: string;
  startedAt: string;
  updatedAt: string;
  turns: ChatTurn[];
}

interface StoredChat {
  sessions: ChatSession[];
  activeId: string | null;
}

/** The shape the first release wrote. Migrated on read, then never written again. */
interface LegacyChat {
  mode: ChatMode;
  scenarioId: string | null;
  turns: ChatTurn[];
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly storage = inject(StorageService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /* ---- state ------------------------------------------------------------ */

  private readonly sessionsSignal = signal<ChatSession[]>([]);
  private readonly activeIdSignal = signal<string | null>(null);
  private readonly streamingSignal = signal('');
  private readonly statusSignal = signal<ChatStatus>('idle');
  private readonly crisisSignal = signal(false);
  /** A `chat.err.*` key rather than a finished string, so it follows the language. */
  private readonly errorSignal = signal<string | null>(null);

  /** Newest first — the order the history rail lists them in. */
  readonly sessions = computed(() =>
    [...this.sessionsSignal()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  );
  readonly activeId = this.activeIdSignal.asReadonly();
  readonly streaming = this.streamingSignal.asReadonly();
  readonly status = this.statusSignal.asReadonly();
  readonly crisis = this.crisisSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly active = computed<ChatSession | null>(() => {
    const id = this.activeIdSignal();
    return id ? this.sessionsSignal().find(s => s.id === id) ?? null : null;
  });

  readonly mode = computed<ChatMode | null>(() => this.active()?.mode ?? null);
  readonly scenarioId = computed<string | null>(() => this.active()?.scenarioId ?? null);
  readonly turns = computed<ChatTurn[]>(() => this.active()?.turns ?? []);

  readonly busy = computed(() => {
    const status = this.statusSignal();
    return status === 'sending' || status === 'streaming';
  });

  /** The conversation has run long enough that a debrief is worth offering. */
  readonly canDebrief = computed(() => this.mode() === 'client' && this.turns().length >= 4);

  private controller: AbortController | null = null;
  private buffer = '';
  private frame = 0;

  constructor() {
    this.restore();
    // Navigating away mid-reply must not leave a reader running.
    inject(DestroyRef).onDestroy(() => this.abort());
  }

  /* ---- sessions --------------------------------------------------------- */

  begin(mode: ChatMode, scenarioId: string | null): void {
    this.abort();
    const now = new Date().toISOString();
    const session: ChatSession = {
      id: `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
      mode,
      scenarioId,
      title: '',
      startedAt: now,
      updatedAt: now,
      turns: []
    };
    this.sessionsSignal.update(list => [session, ...list].slice(0, MAX_SESSIONS));
    this.activeIdSignal.set(session.id);
    this.clearTransient();
    this.persist();
  }

  /** Opens an earlier conversation. */
  open(id: string): void {
    if (id === this.activeIdSignal()) return;
    this.abort();
    this.activeIdSignal.set(id);
    this.clearTransient();
    this.persist();
  }

  /**
   * Leaves the current conversation and returns to the picker. Nothing is
   * deleted — that is what `remove` is for.
   */
  newConversation(): void {
    this.abort();
    this.activeIdSignal.set(null);
    this.clearTransient();
    this.persist();
  }

  remove(id: string): void {
    if (id === this.activeIdSignal()) this.abort();
    this.sessionsSignal.update(list => list.filter(s => s.id !== id));
    if (id === this.activeIdSignal()) {
      this.activeIdSignal.set(null);
      this.clearTransient();
    }
    this.persist();
  }

  clearAll(): void {
    this.abort();
    this.sessionsSignal.set([]);
    this.activeIdSignal.set(null);
    this.clearTransient();
    this.storage.remove(KEY);
  }

  dismissCrisis(): void {
    this.crisisSignal.set(false);
  }

  private clearTransient(): void {
    this.streamingSignal.set('');
    this.statusSignal.set('idle');
    this.crisisSignal.set(false);
    this.errorSignal.set(null);
  }

  /* ---- sending ---------------------------------------------------------- */

  async send(text: string, lang: Lang): Promise<void> {
    const message = text.trim();
    const session = this.active();
    if (!this.isBrowser || !message || !session || this.busy()) return;

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
          mode: session.mode,
          scenarioId: session.scenarioId,
          lang,
          turns: this.turns().map(turn => ({ role: turn.role, text: turn.text }))
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
    const id = this.activeIdSignal();
    if (!id) return;

    this.sessionsSignal.update(list =>
      list.map(session => {
        if (session.id !== id) return session;
        const turn: ChatTurn = {
          id: `${role}-${Date.now()}-${session.turns.length}`,
          role,
          text
        };
        return {
          ...session,
          turns: [...session.turns, turn].slice(-MAX_TURNS),
          // The first thing the reader says names the conversation.
          title: session.title || (role === 'user' ? titleFrom(text) : ''),
          updatedAt: new Date().toISOString()
        };
      })
    );
    this.persist();
  }

  /* ---- persistence ------------------------------------------------------ */

  private persist(): void {
    this.storage.set(KEY, {
      sessions: this.sessionsSignal(),
      activeId: this.activeIdSignal()
    } satisfies StoredChat);
  }

  private restore(): void {
    if (!this.isBrowser) return;
    const stored = this.storage.get<StoredChat | LegacyChat | null>(KEY, null);
    if (!stored) return;

    // The first release stored one bare conversation. Carry it across rather
    // than dropping somebody's transcript on an upgrade.
    if (!('sessions' in stored)) {
      const legacy = stored as LegacyChat;
      if (legacy.mode !== 'therapist' && legacy.mode !== 'client') return;
      const now = new Date().toISOString();
      const turns = Array.isArray(legacy.turns) ? legacy.turns.slice(-MAX_TURNS) : [];
      const first = turns.find(turn => turn.role === 'user');
      const session: ChatSession = {
        id: `c${Date.now().toString(36)}legacy`,
        mode: legacy.mode,
        scenarioId: legacy.scenarioId ?? null,
        title: first ? titleFrom(first.text) : '',
        startedAt: now,
        updatedAt: now,
        turns
      };
      this.sessionsSignal.set([session]);
      this.activeIdSignal.set(turns.length ? session.id : null);
      this.persist();
      return;
    }

    const sessions = Array.isArray(stored.sessions) ? stored.sessions : [];
    this.sessionsSignal.set(sessions.slice(0, MAX_SESSIONS));
    const activeId = stored.activeId ?? null;
    this.activeIdSignal.set(sessions.some(s => s.id === activeId) ? activeId : null);
  }
}

function titleFrom(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > TITLE_LENGTH ? `${clean.slice(0, TITLE_LENGTH).trimEnd()}…` : clean;
}
