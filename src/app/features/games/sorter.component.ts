/* ==========================================================================
   sorter.component.ts — Four Concerns Sorter.

   Sixteen statements go into four bins. Drag-and-drop alone is inaccessible,
   so the keyboard path is not an add-on but a second first-class input:

     Tab              reach a statement
     1 / 2 / 3 / 4    place it in that bin
     Enter or Space   open a menu of the four bins
     Escape           close that menu

   Pointer input uses HTML5 drag events plus a tap-then-tap fallback, since
   touch devices do not fire dragstart at all.

   A statement is always filed under its correct given, right or wrong, so the
   finished board reads as a correct answer key rather than a record of
   mistakes. Only the score reflects the attempt.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { IconComponent } from '../../shared/components/icon.component';
import { GameShellComponent } from './game-shell.component';
import { GAME_SORTER } from '../../core/data/game-sorter.data';
import type { SortStatement } from '../../core/models';

@Component({
  selector: 'app-sorter-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, GameShellComponent],
  template: `
<app-game-shell #shell gameId="sorter" [total]="total"
                titleKey="games.givens.title" leadKey="games.givens.lead"
                instructionsKey="games.givens.instructions"
                (restart)="restart()">

  <div class="sorter-layout">

    <div>
      <p class="t-eyebrow" style="margin-bottom:1rem">
        <span>{{ i18n.t('games.givens.pool') }}</span>
      </p>
      <div class="stack-sm">
        @for (statement of pool(); track statement.id) {
          <div style="position:relative">
            <button type="button" class="tile sort-chip" draggable="true"
                    [class.is-selected]="pending() === statement.id"
                    aria-haspopup="menu" [attr.aria-expanded]="menuFor() === statement.id"
                    (click)="select(statement.id)"
                    (keydown)="onKey($event, statement.id)"
                    (dragstart)="onDragStart($event, statement.id)"
                    (dragend)="onDragEnd()">
              <span class="t-body" style="font-size:.9375rem">{{ i18n.pick(statement.text) }}</span>
            </button>

            @if (menuFor() === statement.id) {
              <div class="bin-menu" role="menu">
                @for (given of store.givens(); track given.id; let gi = $index) {
                  <button type="button" role="menuitem" class="drawer-link"
                          (click)="place(statement.id, given.id)">
                    <span class="bin-key">{{ gi + 1 }}</span>
                    <app-icon [name]="given.icon" cls="icon-sm" />
                    <span>{{ i18n.pick(given.title) }}</span>
                  </button>
                }
              </div>
            }
          </div>
        }
      </div>
      <p class="t-micro" style="margin-top:1rem">
        {{ i18n.t('games.givens.remaining', { count: pool().length }) }}
      </p>
    </div>

    <div class="bin-grid">
      @for (given of store.givens(); track given.id; let gi = $index) {
        <section class="bin" [class.is-target]="!!pending()" [class.is-over]="over() === given.id"
                 [attr.aria-labelledby]="'binLabel-' + given.id"
                 (click)="onBinClick(given.id)"
                 (dragover)="onDragOver($event, given.id)"
                 (dragleave)="onDragLeave(given.id)"
                 (drop)="onDrop($event, given.id)">
          <h3 class="t-micro" [attr.id]="'binLabel-' + given.id"
              style="display:flex;align-items:center;gap:.5rem;color:var(--text-strong)">
            <span style="color:var(--accent)"><app-icon [name]="given.icon" cls="icon-sm" /></span>
            <span class="bin-key">{{ gi + 1 }}</span>
            {{ i18n.pick(given.title) }}
          </h3>
          <div class="bin-body stack-sm" style="margin-top:.85rem">
            @for (placed of placedIn(given.id); track placed.statement.id) {
              <div class="tile sort-chip state-locked settle"
                   [class.state-correct]="placed.correct"
                   [class.state-wrong]="!placed.correct">
                <span class="t-body" style="font-size:.9375rem">
                  {{ i18n.pick(placed.statement.text) }}
                </span>
              </div>
            }
          </div>
        </section>
      }
    </div>

  </div>

  <div class="stack-sm" style="margin-top:1.5rem">
    @for (note of notes(); track note.id) {
      <div class="card-flat settle">
        <p class="t-micro" [class.is-accent]="note.correct" [class.is-muted]="!note.correct">
          <app-icon [name]="note.correct ? 'circle-check' : 'info'" cls="icon-sm" />
          {{ note.given }}
        </p>
        <p class="t-body" style="margin-top:.35rem;font-size:.9375rem">{{ note.why }}</p>
      </div>
    }
  </div>

</app-game-shell>
  `
})
export class SorterGameComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);

  private readonly shell = viewChild.required(GameShellComponent);

  protected readonly total = GAME_SORTER.length;

  private readonly statements = signal<SortStatement[]>(shuffle(GAME_SORTER));
  /** statementId -> whether the guess was right. Placement itself is always correct. */
  private readonly placed = signal<Record<string, boolean>>({});

  protected readonly pending = signal<string | null>(null);
  protected readonly menuFor = signal<string | null>(null);
  protected readonly over = signal<string | null>(null);
  protected readonly notes = signal<{ id: string; given: string; why: string; correct: boolean }[]>([]);

  protected readonly pool = computed(() =>
    this.statements().filter(statement => !(statement.id in this.placed()))
  );

  protected placedIn(givenId: string): { statement: SortStatement; correct: boolean }[] {
    const map = this.placed();
    return this.statements()
      .filter(statement => statement.id in map && statement.givenId === givenId)
      .map(statement => ({ statement, correct: map[statement.id] }));
  }

  /* ---- placement --------------------------------------------------------- */

  protected place(statementId: string, binId: string): void {
    if (statementId in this.placed()) return;
    const statement = this.statements().find(s => s.id === statementId);
    if (!statement) return;

    const wasCorrect = statement.givenId === binId;
    this.placed.update(map => ({ ...map, [statementId]: wasCorrect }));
    this.pending.set(null);
    this.menuFor.set(null);
    this.over.set(null);

    const given = this.store.given(statement.givenId);
    const givenTitle = given ? this.i18n.pick(given.title) : '';
    const why = this.i18n.pick(statement.why);

    this.notes.update(list => [{ id: statementId, given: givenTitle, why, correct: wasCorrect }, ...list]);
    this.shell().say(
      (wasCorrect ? this.i18n.t('games.terms.correct') : this.i18n.t('games.terms.wrong')) +
      '. ' + givenTitle + '. ' + why
    );
    this.shell().step(wasCorrect);
  }

  protected select(statementId: string): void {
    this.menuFor.set(null);
    this.pending.update(current => (current === statementId ? null : statementId));
  }

  protected onBinClick(binId: string): void {
    const statementId = this.pending();
    if (statementId) this.place(statementId, binId);
  }

  /* ---- keyboard ---------------------------------------------------------- */

  protected onKey(event: KeyboardEvent, statementId: string): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.pending.set(null);
      this.menuFor.set(null);
      return;
    }

    if (/^[1-4]$/.test(event.key)) {
      const given = this.store.givens()[Number(event.key) - 1];
      if (!given) return;
      event.preventDefault();
      this.place(statementId, given.id);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.pending.set(statementId);
      this.menuFor.update(current => (current === statementId ? null : statementId));
    }
  }

  /* ---- drag and drop ------------------------------------------------------ */

  protected onDragStart(event: DragEvent, statementId: string): void {
    this.pending.set(statementId);
    try {
      event.dataTransfer?.setData('text/plain', statementId);
      if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
    } catch { /* some browsers restrict this; `pending` still carries it */ }
  }

  protected onDragEnd(): void {
    this.over.set(null);
  }

  protected onDragOver(event: DragEvent, binId: string): void {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    this.over.set(binId);
  }

  protected onDragLeave(binId: string): void {
    if (this.over() === binId) this.over.set(null);
  }

  protected onDrop(event: DragEvent, binId: string): void {
    event.preventDefault();
    let id = '';
    try { id = event.dataTransfer?.getData('text/plain') ?? ''; } catch { /* fall back */ }
    const statementId = id || this.pending();
    if (statementId) this.place(statementId, binId);
  }

  /* ---- reset -------------------------------------------------------------- */

  protected restart(): void {
    this.statements.set(shuffle(GAME_SORTER));
    this.placed.set({});
    this.pending.set(null);
    this.menuFor.set(null);
    this.over.set(null);
    this.notes.set([]);
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
