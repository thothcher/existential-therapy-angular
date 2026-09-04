/* ==========================================================================
   terms.component.ts — Term Matcher.

   Terms on the left, shuffled definitions on the right. Pick a term, then a
   definition; an SVG line is drawn between the two anchor points. A correct
   pair locks and the line settles; a wrong pair still resolves and explains
   itself, so an attempt always teaches.

   Fully keyboard operable — required, not optional, because a pointer-only
   matching game excludes anyone who cannot use one:
     ArrowUp / ArrowDown     move within a column (roving tabindex)
     ArrowLeft / ArrowRight  cross between columns
     Enter / Space           select
     Escape                  clear the pending selection
   ========================================================================== */

import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, HostListener,
  PLATFORM_ID, computed, inject, signal, viewChild
} from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { IconComponent } from '../../shared/components/icon.component';
import { GameShellComponent } from './game-shell.component';
import { GAME_TERMS } from '../../core/data/game-terms.data';
import type { TermPair } from '../../core/models';

const PAIR_COUNT = 8;

interface Wire { d: string; cls: string; }

@Component({
  selector: 'app-terms-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, GameShellComponent],
  template: `
<app-game-shell #shell gameId="terms" [total]="pairCount"
                titleKey="games.terms.title" leadKey="games.terms.lead"
                instructionsKey="games.terms.instructions"
                (restart)="restart()">

  <div class="match-wrap" #board>
    <svg class="wire-layer" aria-hidden="true"
         [attr.viewBox]="'0 0 ' + boxWidth() + ' ' + boxHeight()"
         [attr.width]="boxWidth()" [attr.height]="boxHeight()">
      @for (wire of wires(); track $index) {
        <path [attr.class]="wire.cls" [attr.d]="wire.d" />
      }
    </svg>

    <div class="match-col">
      <p class="t-eyebrow" style="margin-bottom:1rem">
        <span>{{ i18n.t('games.terms.columnTerms') }}</span>
      </p>
      <div class="stack-sm" role="listbox" [attr.aria-label]="i18n.t('games.terms.columnTerms')">
        @for (pair of pairs(); track pair.id; let i = $index) {
          <button type="button" class="tile match-tile" role="option"
                  [attr.data-side]="'term'" [attr.data-id]="pair.id"
                  [class.is-selected]="selected() === pair.id"
                  [class.state-correct]="solved()[pair.id]"
                  [class.state-locked]="solved()[pair.id]"
                  [attr.aria-selected]="selected() === pair.id"
                  [attr.aria-disabled]="solved()[pair.id] ? true : null"
                  [attr.tabindex]="roving('term', pair.id, i)"
                  (click)="chooseTerm(pair.id)"
                  (keydown)="onKey($event, 'term', i)">
            <span class="t-body strong">{{ i18n.pick(pair.term) }}</span>
            <span class="t-micro" style="display:block;margin-top:.2rem">{{ pair.original }}</span>
          </button>
        }
      </div>
    </div>

    <div class="match-col">
      <p class="t-eyebrow" style="margin-bottom:1rem">
        <span>{{ i18n.t('games.terms.columnDefs') }}</span>
      </p>
      <div class="stack-sm" role="listbox" [attr.aria-label]="i18n.t('games.terms.columnDefs')">
        @for (pair of defs(); track pair.id; let i = $index) {
          <button type="button" class="tile match-tile" role="option"
                  [attr.data-side]="'def'" [attr.data-id]="pair.id"
                  [class.state-correct]="solved()[pair.id]"
                  [class.state-locked]="solved()[pair.id]"
                  [class.nudge]="shaking() === pair.id"
                  [attr.aria-disabled]="solved()[pair.id] ? true : null"
                  [attr.tabindex]="roving('def', pair.id, i)"
                  (click)="chooseDef(pair.id)"
                  (keydown)="onKey($event, 'def', i)">
            <span class="t-body">{{ i18n.pick(pair.definition) }}</span>
          </button>
        }
      </div>
    </div>
  </div>

  <div class="stack-sm" style="margin-top:1.5rem">
    @for (note of notes(); track note.id) {
      <div class="card-flat settle">
        <p class="t-micro" [class.is-accent]="note.correct" [class.is-muted]="!note.correct">
          <app-icon [name]="note.correct ? 'circle-check' : 'info'" cls="icon-sm" />
          {{ i18n.pick(note.pair.term) }}
        </p>
        <p class="t-body" style="margin-top:.35rem;font-size:.9375rem">
          {{ i18n.pick(note.pair.note) }}
        </p>
      </div>
    }
  </div>

</app-game-shell>
  `
})
export class TermsGameComponent implements AfterViewChecked {
  protected readonly i18n = inject(I18nService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly pairCount = PAIR_COUNT;

  private readonly shell = viewChild.required(GameShellComponent);
  private readonly board = viewChild<ElementRef<HTMLElement>>('board');

  protected readonly pairs = signal<TermPair[]>(this.deal());
  protected readonly defs = signal<TermPair[]>([]);
  protected readonly solved = signal<Record<string, boolean>>({});
  protected readonly selected = signal<string | null>(null);
  protected readonly shaking = signal<string | null>(null);
  protected readonly notes = signal<{ id: string; pair: TermPair; correct: boolean }[]>([]);

  protected readonly wires = signal<Wire[]>([]);
  protected readonly boxWidth = signal(0);
  protected readonly boxHeight = signal(0);

  /** Set when the board changes shape and the wires need recomputing. */
  private dirty = true;

  constructor() {
    this.defs.set(shuffle(this.pairs()));
  }

  ngAfterViewChecked(): void {
    if (this.dirty) {
      this.dirty = false;
      this.drawWires();
    }
  }

  private deal(): TermPair[] {
    return shuffle(GAME_TERMS).slice(0, PAIR_COUNT);
  }

  protected restart(): void {
    const fresh = this.deal();
    this.pairs.set(fresh);
    this.defs.set(shuffle(fresh));
    this.solved.set({});
    this.selected.set(null);
    this.notes.set([]);
    this.wires.set([]);
    this.shell().reset();
    this.shell().say(this.i18n.t('games.terms.pickTerm'));
    this.dirty = true;
  }

  /* ---- selection --------------------------------------------------------- */

  protected chooseTerm(id: string): void {
    if (this.solved()[id]) return;
    this.selected.update(current => (current === id ? null : id));
    this.shell().say(
      this.selected() ? this.i18n.t('games.terms.pickDef') : this.i18n.t('games.terms.pickTerm')
    );
    this.dirty = true;
  }

  protected chooseDef(defId: string): void {
    const termId = this.selected();
    if (!termId) {
      this.shell().say(this.i18n.t('games.terms.pickTerm'));
      return;
    }
    if (this.solved()[defId]) return;

    const pair = this.pairs().find(p => p.id === termId);
    if (!pair) return;

    const wasCorrect = defId === termId;
    if (!wasCorrect) {
      this.shaking.set(defId);
      setTimeout(() => this.shaking.set(null), 450);
    }

    // A wrong attempt still resolves the pair: it is revealed and locked, and
    // simply does not count toward the score.
    this.solved.update(map => ({ ...map, [termId]: true }));
    this.notes.update(list => [{ id: termId, pair, correct: wasCorrect }, ...list]);
    this.selected.set(null);
    this.dirty = true;

    this.shell().say(
      (wasCorrect ? this.i18n.t('games.terms.correct') : this.i18n.t('games.terms.wrong')) +
      '. ' + this.i18n.pick(pair.term)
    );
    this.shell().step(wasCorrect);
  }

  /* ---- keyboard ---------------------------------------------------------- */

  protected roving(side: 'term' | 'def', id: string, index: number): number {
    if (this.solved()[id]) return -1;
    const list = side === 'term' ? this.pairs() : this.defs();
    const firstOpen = list.findIndex(p => !this.solved()[p.id]);
    return index === firstOpen ? 0 : -1;
  }

  protected onKey(event: KeyboardEvent, side: 'term' | 'def', index: number): void {
    const open = this.openTiles(side);
    const position = open.indexOf(event.target as HTMLElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusAt(open, position + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusAt(open, position - 1);
        break;
      case 'ArrowLeft':
      case 'ArrowRight': {
        event.preventDefault();
        const other = this.openTiles(side === 'term' ? 'def' : 'term');
        this.focusAt(other, 0);
        break;
      }
      case 'Escape':
        event.preventDefault();
        this.selected.set(null);
        this.dirty = true;
        this.shell().say(this.i18n.t('games.terms.pickTerm'));
        break;
      default:
        break;
    }
    void index;
  }

  private openTiles(side: 'term' | 'def'): HTMLElement[] {
    const root = this.board()?.nativeElement;
    if (!root) return [];
    return Array.from(
      root.querySelectorAll<HTMLElement>(`[data-side="${side}"]:not(.state-locked)`)
    );
  }

  private focusAt(list: HTMLElement[], index: number): void {
    if (!list.length) return;
    list[(index + list.length) % list.length].focus();
  }

  /* ---- wire drawing ------------------------------------------------------ */

  @HostListener('window:resize')
  @HostListener('window:scroll')
  onViewportChange(): void {
    this.drawWires();
  }

  private drawWires(): void {
    if (!this.isBrowser) return;
    const root = this.board()?.nativeElement;
    if (!root) return;

    const box = root.getBoundingClientRect();
    this.boxWidth.set(Math.round(box.width));
    this.boxHeight.set(Math.round(box.height));

    const paths: Wire[] = [];

    for (const id of Object.keys(this.solved())) {
      const term = root.querySelector(`[data-side="term"][data-id="${id}"]`);
      const def = root.querySelector(`[data-side="def"][data-id="${id}"]`);
      if (!term || !def) continue;
      const a = term.getBoundingClientRect();
      const b = def.getBoundingClientRect();
      const x1 = a.right - box.left;
      const y1 = a.top + a.height / 2 - box.top;
      const x2 = b.left - box.left;
      const y2 = b.top + b.height / 2 - box.top;
      const mid = (x1 + x2) / 2;
      paths.push({
        cls: 'wire',
        d: `M${x1.toFixed(1)} ${y1.toFixed(1)} C${mid.toFixed(1)} ${y1.toFixed(1)}, ` +
           `${mid.toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`
      });
    }

    // The pending selection trails a dashed stub from the chosen term.
    const pending = this.selected();
    if (pending) {
      const tile = root.querySelector(`[data-side="term"][data-id="${pending}"]`);
      if (tile) {
        const rect = tile.getBoundingClientRect();
        const x1 = rect.right - box.left;
        const y1 = rect.top + rect.height / 2 - box.top;
        paths.push({ cls: 'wire wire-pending', d: `M${x1} ${y1} L${x1 + 28} ${y1}` });
      }
    }

    this.wires.set(paths);
  }
}

/** Fisher-Yates. Returns a new array; never mutates the seed data. */
function shuffle<T>(list: readonly T[]): T[] {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
