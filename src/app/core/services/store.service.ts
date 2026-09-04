/* ==========================================================================
   store.service.ts — the data facade.

   Ports the CBT DataService, whose collections were computed signals of the
   form "remote rows if any, else the seed array". Here the override layer is
   localStorage rather than Supabase, but the contract is identical: callers
   ask the store, never the data module, and never learn whether what they got
   was seeded or edited.

   Two CBT weaknesses are closed. Quiz results and sessions lived in in-memory
   signals and were lost on refresh; everything below is durable. And every
   read is guarded, so storage being unavailable degrades to the seed data.
   ========================================================================== */

import { Injectable, computed, signal, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { GIVENS } from '../data/givens.data';
import { THINKERS } from '../data/thinkers.data';
import { PRACTICES } from '../data/practices.data';
import { LEXICON } from '../data/lexicon.data';
import { SCENARIOS } from '../data/scenarios.data';
import type {
  GameProgress, Given, InventoryEntry, LexiconTerm, Practice, Scenario, Thinker
} from '../models';

const KEYS = {
  overrides: 'et_overrides',
  progress: 'et_progress',
  notes: 'et_notes',
  inventory: 'et_inventory'
} as const;

type Overrides = Record<string, Record<string, Record<string, unknown>>>;

export type CollectionName = 'thinkers' | 'practices' | 'lexicon' | 'scenarios' | 'givens';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private readonly storage = inject(StorageService);

  readonly collections: readonly CollectionName[] =
    ['thinkers', 'practices', 'lexicon', 'scenarios', 'givens'];

  /** Bumped on every write, so the computed collections below re-evaluate. */
  private readonly revision = signal(0);

  private readonly overrides = computed<Overrides>(() => {
    this.revision();
    const stored = this.storage.get<Overrides | null>(KEYS.overrides, null);
    return stored && typeof stored === 'object' ? stored : {};
  });

  /* ---- content: seed with any local edits applied on top ---------------- */

  readonly givens    = computed(() => this.resolve('givens', GIVENS));
  readonly thinkers  = computed(() => this.resolve('thinkers', THINKERS));
  readonly practices = computed(() => this.resolve('practices', PRACTICES));
  readonly lexicon   = computed(() => this.resolve('lexicon', LEXICON));
  readonly scenarios = computed(() => this.resolve('scenarios', SCENARIOS));

  given(id: string): Given | null {
    return this.givens().find(row => row.id === id) ?? null;
  }
  thinker(slug: string): Thinker | null {
    return this.thinkers().find(row => row.slug === slug) ?? null;
  }
  practice(slug: string): Practice | null {
    return this.practices().find(row => row.slug === slug) ?? null;
  }
  scenario(id: string): Scenario | null {
    return this.scenarios().find(row => row.id === id) ?? null;
  }
  lexiconTerm(id: string): LexiconTerm | null {
    return this.lexicon().find(row => row.id === id) ?? null;
  }

  /** Generic accessor, used by the admin content editor. */
  collection(name: CollectionName): { id: string }[] {
    switch (name) {
      case 'givens': return this.givens();
      case 'thinkers': return this.thinkers();
      case 'practices': return this.practices();
      case 'lexicon': return this.lexicon();
      case 'scenarios': return this.scenarios();
    }
  }

  private resolve<T extends { id: string }>(name: CollectionName, seed: readonly T[]): T[] {
    const patch = this.overrides()[name];
    if (!patch) return seed as T[];
    return seed.map(row =>
      Object.prototype.hasOwnProperty.call(patch, row.id)
        ? ({ ...row, ...patch[row.id] } as T)
        : row
    );
  }

  /* ---- admin overrides --------------------------------------------------- */

  setOverride(name: CollectionName, id: string, patch: Record<string, unknown>): void {
    const all: Overrides = { ...this.overrides() };
    all[name] = { ...(all[name] ?? {}), [id]: { ...(all[name]?.[id] ?? {}), ...patch } };
    this.storage.set(KEYS.overrides, all);
    this.revision.update(n => n + 1);
  }

  overrideCount(): number {
    return Object.values(this.overrides())
      .reduce((total, group) => total + Object.keys(group ?? {}).length, 0);
  }

  resetOverrides(): void {
    this.storage.remove(KEYS.overrides);
    this.revision.update(n => n + 1);
  }

  /* ---- game progress ------------------------------------------------------
     CBT kept quiz results in an in-memory signal, so a refresh on the result
     page showed an empty state. These survive the session. */

  readonly progress = computed<Record<string, GameProgress>>(() => {
    this.revision();
    const stored = this.storage.get<Record<string, GameProgress> | null>(KEYS.progress, null);
    return stored && typeof stored === 'object' ? stored : {};
  });

  gameProgress(gameId: string): GameProgress | null {
    return this.progress()[gameId] ?? null;
  }

  /** Only an improvement replaces the best score; every run counts as an attempt. */
  recordGame(gameId: string, correct: number, total: number): GameProgress {
    const all = { ...this.progress() };
    const entry: GameProgress = {
      ...(all[gameId] ?? { best: 0, bestTotal: total, attempts: 0, completedAt: null })
    };
    entry.attempts += 1;
    entry.completedAt = new Date().toISOString();
    const ratio = total ? correct / total : 0;
    const bestRatio = entry.bestTotal ? entry.best / entry.bestTotal : 0;
    if (ratio >= bestRatio) {
      entry.best = correct;
      entry.bestTotal = total;
    }
    all[gameId] = entry;
    this.storage.set(KEYS.progress, all);
    this.revision.update(n => n + 1);
    return entry;
  }

  resetProgress(): void {
    this.storage.remove(KEYS.progress);
    this.revision.update(n => n + 1);
  }

  /* ---- scenario reflection notes ------------------------------------------ */

  readonly notes = computed<Record<string, string>>(() => {
    this.revision();
    return this.storage.get<Record<string, string>>(KEYS.notes, {}) ?? {};
  });

  note(scenarioId: string): string {
    return this.notes()[scenarioId] ?? '';
  }

  saveNote(scenarioId: string, text: string): void {
    const all = { ...this.notes() };
    if (text && text.trim()) all[scenarioId] = text;
    else delete all[scenarioId];
    this.storage.set(KEYS.notes, all);
    this.revision.update(n => n + 1);
  }

  /* ---- meaning inventory (capped at 20, as the CBT thought record was) ----- */

  readonly inventory = computed<InventoryEntry[]>(() => {
    this.revision();
    const stored = this.storage.get<InventoryEntry[]>(KEYS.inventory, []);
    return Array.isArray(stored) ? stored : [];
  });

  saveInventory(entry: InventoryEntry): void {
    this.storage.set(KEYS.inventory, [entry, ...this.inventory()].slice(0, 20));
    this.revision.update(n => n + 1);
  }

  deleteInventory(id: string): void {
    this.storage.set(KEYS.inventory, this.inventory().filter(item => item.id !== id));
    this.revision.update(n => n + 1);
  }
}
