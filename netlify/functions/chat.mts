/* ==========================================================================
   chat.mts — the only place an API key exists.

   The site itself is a static prerendered bundle with no server (angular.json
   is outputMode: "static"). Anything reachable from src/ ships to the browser,
   so the key lives here, in Netlify's environment, and the browser talks to
   /api/chat instead of to Anthropic.

   Everything this function does beyond proxying is a guard:

     · The system prompt is built HERE, from the mode and an optional scenario
       id. The client sends neither a prompt nor a persona — otherwise anyone
       could POST their own system prompt and use the owner's key as a free
       general-purpose Claude.
     · Crisis phrases are screened before the model is called at all. A hit
       returns a `crisis` event and costs nothing.
     · Turns, message length and max_tokens are capped server-side, because a
       cap enforced in the browser is not a cap.
     · A per-IP token bucket throttles the obvious abuse. It is per-instance
       and therefore best-effort; the real backstop is a spend limit set in the
       Anthropic console.
   ========================================================================== */

import Anthropic from '@anthropic-ai/sdk';
import type { Config, Context } from '@netlify/functions';
import { CRISIS_PATTERNS } from '../shared/crisis.mjs';
import { buildSystemPrompt, type ChatMode } from '../shared/prompts.mjs';

/* ---- caps --------------------------------------------------------------- */

const MAX_TURNS = 40;          // a conversation, not a free API tier
const MAX_CHARS = 4000;        // per message
const MAX_TOKENS = 1024;       // a therapist's reply is short by design
const RATE_LIMIT = 30;         // requests per IP per window
const RATE_WINDOW = 60 * 60 * 1000;

/** Per-instance and therefore leaky. Enough to stop a script, not an attacker. */
const buckets = new Map<string, { count: number; resetAt: number }>();

function overRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

/* ---- wire shapes -------------------------------------------------------- */

interface Turn { role: 'user' | 'assistant'; text: string }

interface ChatRequest {
  mode: ChatMode;
  scenarioId?: string | null;
  lang: 'ka' | 'en';
  turns: Turn[];
}

/** One SSE frame. The browser parses these in ChatService. */
function frame(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function errorStream(code: string, status: number): Response {
  return new Response(frame('error', { code }), {
    status,
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

/* ---- handler ------------------------------------------------------------ */

export default async (request: Request, context: Context): Promise<Response> => {
  if (request.method !== 'POST') return errorStream('method', 405);

  const ip = context.ip || 'unknown';
  if (overRateLimit(ip)) return errorStream('rate', 429);

  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return errorStream('bad-request', 400);
  }

  const mode: ChatMode = body.mode === 'client' ? 'client' : 'therapist';
  const lang = body.lang === 'en' ? 'en' : 'ka';
  const turns = Array.isArray(body.turns) ? body.turns : [];

  if (!turns.length) return errorStream('bad-request', 400);
  if (turns.length > MAX_TURNS) return errorStream('too-long', 413);

  const latest = turns[turns.length - 1];
  if (!latest || latest.role !== 'user' || typeof latest.text !== 'string') {
    return errorStream('bad-request', 400);
  }
  if (latest.text.length > MAX_CHARS) return errorStream('too-long', 413);

  // Ahead of the key check on purpose: someone in crisis gets the same answer
  // whether or not the API is configured or reachable. It also costs nothing,
  // because the model is never called.
  if (CRISIS_PATTERNS.some(pattern => pattern.test(latest.text))) {
    return new Response(frame('crisis', { reason: 'phrase' }), {
      headers: {
        'content-type': 'text/event-stream; charset=utf-8',
        'cache-control': 'no-store'
      }
    });
  }

  const key = process.env['ANTHROPIC_API_KEY'];
  if (!key) return errorStream('unconfigured', 503);

  const system = buildSystemPrompt(mode, lang, body.scenarioId ?? null);
  const client = new Anthropic({ apiKey: key });

  const messages = turns
    .filter(turn => typeof turn.text === 'string' && turn.text.trim())
    .map(turn => ({
      role: turn.role === 'assistant' ? ('assistant' as const) : ('user' as const),
      content: turn.text.slice(0, MAX_CHARS)
    }));

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: string, data: unknown) =>
        controller.enqueue(encoder.encode(frame(event, data)));

      try {
        const run = client.beta.messages.stream({
          model: 'claude-opus-5',
          max_tokens: MAX_TOKENS,
          // Chat is not a high-effort workload, and a therapist's reply should
          // arrive while the reader is still looking at the screen. Thinking
          // stays ON — disabling it on Opus 5 leaks <thinking> tags into the
          // visible response; effort is the correct lever.
          output_config: { effort: 'medium' },
          // The persona and the safety rules are constant per mode, and they
          // are resent on every turn. Caching them is ~90% off the prefix.
          system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
          messages,
          // Distress is exactly the material that can trip a safety classifier.
          // A refusal mid-conversation would read as the therapist walking out,
          // so let the server retry on a fallback model first.
          betas: ['server-side-fallback-2026-07-01'],
          fallbacks: 'default'
        });

        for await (const event of run) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta' &&
            event.delta.text
          ) {
            send('delta', { text: event.delta.text });
          }
        }

        const final = await run.finalMessage();

        // The whole fallback chain declined. Treat it as a stand-down rather
        // than an error — a refusal here almost always means the conversation
        // reached something the page should not be handling anyway.
        if (final.stop_reason === 'refusal') {
          send('crisis', { reason: 'refusal' });
        } else {
          send('done', { stopReason: final.stop_reason });
        }
      } catch (error) {
        const code =
          error instanceof Anthropic.RateLimitError ? 'rate'
          : error instanceof Anthropic.AuthenticationError ? 'unconfigured'
          : error instanceof Anthropic.BadRequestError ? 'bad-request'
          : 'server';
        send('error', { code });
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-store',
      connection: 'keep-alive'
    }
  });
};

export const config: Config = { path: '/api/chat' };
