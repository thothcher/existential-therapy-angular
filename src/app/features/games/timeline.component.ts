/* ==========================================================================
   timeline.component.ts — Concept Timeline.

   Ten works to put in chronological order on a vertical rail. Dragging
   reorders; so does the keyboard:

     Tab                    reach a card
     Ctrl + ArrowUp/Down    move the focused card one position
     Enter                  check the order

   Checking locks every correctly placed card and reveals its year. Misplaced
   cards pulse once and stay movable, so a round converges rather than ending
   in a single pass or fail. The score is taken from the FIRST check only:
   later checks help the learner get there but must not inflate the result.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { IconComponent } from '../../shared/components/icon.component';
import { GameShellComponent } from './game-shell.component';
import { GAME_TIMELINE } from '../../core/data/game-timeline.data';
import type { TimelineItem } from '../../core/models';

@Component({
  selector: 'app-timeline-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, GameShellComponent],
  template: `
<app-game-shell #shell gameId="timeline" [total]="total"
                titleKey="games.timeline.title" leadKey="games.timeline.lead"
                instructionsKey="games.timeline.instructions"
                (restart)="restart()">

  <div class="timeline-head">
    <span class="t-micro">{{ i18n.t('games.timeline.earliest') }}</span>
    <span class="t-micro">{{ i18n.t('games.timeline.latest') }}</span>
  </div>

  <ol class="timeline-rail" [attr.aria-label]="i18n.t('games.timeline.title')">
    @for (item of ordered(); track item.id; let i = $index) {
      <li class="timeline-item"
          [class.state-correct]="locked()[item.id]"
          [class.state-locked]="locked()[item.id]"
          [class.is-dragging]="dragging() === item.id">
        <span class="timeline-dot" aria-hidden="true"></span>
        <div class="tile timeline-card"
             [attr.draggable]="locked()[item.id] ? null : true"
             [attr.tabindex]="locked()[item.id] ? null : 0"
             [class.nudge]="pulsing() && !locked()[item.id]"
             [attr.aria-label]="cardLabel(item, i)"
             (keydown)="onKey($event, i)"
             (dragstart)="onDragStart(item.id)"
             (dragend)="onDragEnd()"
             (dragover)="onDragOver($event, i)"
             (drop)="onDrop($event)">
          <div style="display:flex;align-items:flex-start;gap:.75rem">
            <span style="color:var(--text-faint);flex:none;margin-top:.15rem">
              <app-icon [name]="locked()[item.id] ? 'circle-check' : 'grip-vertical'" cls="icon-sm" />
            </span>
            <div style="min-width:0">
              <p class="t-body strong" style="font-size:.9375rem">{{ i18n.pick(item.title) }}</p>
              <p class="t-micro" style="margin-top:.15rem">
                {{ i18n.pick(item.who) }}
                @if (locked()[item.id]) {
                  · <span style="color:var(--accent)">{{ item.year }}</span>
                }
              </p>
              @if (locked()[item.id]) {
                <p class="t-body" style="margin-top:.5rem;font-size:.875rem;color:var(--text-muted)">
                  {{ i18n.pick(item.note) }}
                </p>
              }
            </div>
          </div>
        </div>
      </li>
    }
  </ol>

  <div style="margin-top:1.5rem">
    <button type="button" class="btn btn-primary" [disabled]="allLocked()" (click)="check()">
      <app-icon name="check" cls="icon-sm" />{{ i18n.t('common.check') }}
    </button>
  </div>

</app-game-shell>
  `
})
export class TimelineGameComponent {
  protected readonly i18n = inject(I18nService);
  private readonly shell = viewChild.required(GameShellComponent);

  protected readonly total = GAME_TIMELINE.length;

  /** Correct order, by id. */
  private readonly solution = GAME_TIMELINE
    .slice()
    .sort((a, b) => a.year - b.year)
    .map(item => item.id);

  private readonly order = signal<string[]>(this.deal());
  protected readonly locked = signal<Record<string, boolean>>({});
  protected readonly dragging = signal<string | null>(null);
  protected readonly pulsing = signal(false);

  private scored = false;

  protected readonly ordered = computed(() =>
    this.order()
      .map(id => GAME_TIMELINE.find(item => item.id === id))
      .filter((item): item is TimelineItem => !!item)
  );

  protected readonly allLocked = computed(() =>
    this.ordered().every(item => this.locked()[item.id])
  );

  /** Shuffle until the opening arrangement is not already the answer. */
  private deal(): string[] {
    let next: string[];
    do {
      next = shuffle(GAME_TIMELINE).map(item => item.id);
    } while (next.join() === this.solution.join() && GAME_TIMELINE.length > 1);
    return next;
  }

  protected cardLabel(item: TimelineItem, index: number): string {
    return `${this.i18n.pick(item.title)}, ${this.i18n.pick(item.who)}. ` +
      this.i18n.t('common.of', { current: index + 1, total: this.total });
  }

  /* ---- moving ------------------------------------------------------------ */

  private move(from: number, to: number): void {
    if (to < 0 || to >= this.order().length) return;
    const id = this.order()[from];
    if (this.locked()[id]) return;

    this.order.update(list => {
      const next = list.slice();
      next.splice(from, 1);
      next.splice(to, 0, id);
      return next;
    });

    this.shell().say(
      this.i18n.t('games.timeline.movedBy', { n: Math.abs(to - from) }) + '. ' +
      this.i18n.t('common.of', { current: to + 1, total: this.total })
    );
  }

  protected onKey(event: KeyboardEvent, index: number): void {
    // Ctrl is required so plain arrows still scroll the page.
    if ((event.ctrlKey || event.metaKey) && event.key === 'ArrowUp') {
      event.preventDefault();
      this.move(index, index - 1);
    } else if ((event.ctrlKey || event.metaKey) && event.key === 'ArrowDown') {
      event.preventDefault();
      this.move(index, index + 1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.check();
    }
  }

  protected onDragStart(id: string): void {
    if (this.locked()[id]) return;
    this.dragging.set(id);
  }

  protected onDragEnd(): void {
    this.dragging.set(null);
  }

  protected onDragOver(event: DragEvent, index: number): void {
    const id = this.dragging();
    if (!id) return;
    const target = this.order()[index];
    if (this.locked()[target]) return;
    event.preventDefault();
    const from = this.order().indexOf(id);
    if (from === -1 || from === index) return;
    this.move(from, index);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(null);
  }

  /* ---- checking ----------------------------------------------------------- */

  protected check(): void {
    const order = this.order();
    const nowLocked = { ...this.locked() };
    let correctNow = 0;

    order.forEach((id, position) => {
      if (this.solution[position] === id) {
        correctNow += 1;
        nowLocked[id] = true;
      }
    });
    this.locked.set(nowLocked);

    this.pulsing.set(true);
    setTimeout(() => this.pulsing.set(false), 460);

    this.shell().say(this.i18n.t('games.scoreOf', { correct: correctNow, total: this.total }));

    // Only the first check scores.
    if (!this.scored) {
      this.scored = true;
      order.forEach((id, position) => this.shell().step(this.solution[position] === id));
    }
  }

  protected restart(): void {
    this.order.set(this.deal());
    this.locked.set({});
    this.dragging.set(null);
    this.scored = false;
    this.shell().reset();
  }
}

function shuffle<T>(list: readonly T[]): T[] {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
