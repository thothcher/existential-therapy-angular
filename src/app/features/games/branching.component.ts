/* ==========================================================================
   branching.component.ts — Scenario Branching.

   A client statement with three therapist responses. Choosing one locks the
   set — the CBT quiz's semantics, deliberately kept, because being able to
   change your answer after seeing the feedback would remove the point.

   Where this departs from the CBT engine: every verdict and explanation is
   authored data. The CBT rubric derived its judgements from English keyword
   matching, which scored near zero for a session held in any other language.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { IconComponent } from '../../shared/components/icon.component';
import { GameShellComponent } from './game-shell.component';
import { GAME_BRANCHING } from '../../core/data/game-branching.data';
import type { BranchItem, BranchTag } from '../../core/models';

const TAG_KEYS: Record<BranchTag, string> = {
  existential: 'games.branching.tagExistential',
  reassurance: 'games.branching.tagReassurance',
  interpretation: 'games.branching.tagInterpretation',
  problemSolving: 'games.branching.tagProblemSolving',
  avoidance: 'games.branching.tagAvoidance'
};

@Component({
  selector: 'app-branching-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, GameShellComponent],
  template: `
<app-game-shell #shell gameId="branching" [total]="total"
                titleKey="games.branching.title" leadKey="games.branching.lead"
                instructionsKey="games.branching.lead"
                (restart)="restart()">

  @if (current(); as item) {
    <div class="settle">
      <div class="card card-xl">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem">
          <p class="t-eyebrow"><span>{{ i18n.t('games.branching.client') }}</span></p>
          @if (store.given(item.givenId); as given) {
            <span class="chip">{{ i18n.pick(given.title) }}</span>
          }
        </div>
        <p class="hanging-quote" style="margin-top:1.25rem;font-size:1.375rem">
          {{ i18n.pick(item.client) }}
        </p>
      </div>

      <div class="stack" style="margin-top:1.5rem" role="group"
           [attr.aria-label]="i18n.t('games.branching.yourChoice')">
        @for (option of item.options; track $index; let oi = $index) {
          <button type="button" class="tile"
                  [class.state-locked]="locked()"
                  [class.state-correct]="locked() && option.correct"
                  [class.state-wrong]="locked() && chosen() === oi && !option.correct"
                  [attr.aria-disabled]="locked() ? true : null"
                  (click)="choose(oi)">
            <span class="t-body">{{ i18n.pick(option.text) }}</span>
          </button>
        }
      </div>

      @if (locked()) {
        <!-- Every option is explained, not only the one chosen: the reasoning
             is the content here, and a learner needs all three to see it. -->
        <div class="stack" style="margin-top:1.5rem">
          @for (option of item.options; track $index; let oi = $index) {
            <div class="card-flat"
                 [class.ring-accent]="chosen() === oi">
              <div style="display:flex;align-items:center;gap:.6rem;flex-wrap:wrap">
                <span class="chip" [class.chip-accent]="option.correct">
                  {{ i18n.t(tagKey(option.tag)) }}
                </span>
                @if (chosen() === oi) {
                  <span class="t-micro" style="color:var(--accent)">
                    {{ i18n.t('games.branching.yourChoice') }}
                  </span>
                }
              </div>
              <p class="t-body" style="margin-top:.7rem;font-size:.9375rem">
                {{ i18n.pick(option.feedback) }}
              </p>
            </div>
          }
        </div>

        @if (index() + 1 < total) {
          <div style="margin-top:1.5rem">
            <button type="button" class="btn btn-primary" #advanceBtn (click)="advance()">
              <span>{{ i18n.t('common.next') }}</span>
              <app-icon name="arrow-right" cls="icon-sm" />
            </button>
          </div>
        }
      }
    </div>
  }

</app-game-shell>
  `
})
export class BranchingGameComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);

  private readonly shell = viewChild.required(GameShellComponent);

  protected readonly total = GAME_BRANCHING.length;

  private readonly items = signal<BranchItem[]>(shuffle(GAME_BRANCHING));
  protected readonly index = signal(0);
  protected readonly locked = signal(false);
  protected readonly chosen = signal<number | null>(null);

  protected readonly current = computed(() => this.items()[this.index()] ?? null);

  protected tagKey(tag: BranchTag): string {
    return TAG_KEYS[tag] ?? TAG_KEYS.interpretation;
  }

  protected choose(optionIndex: number): void {
    if (this.locked()) return;   // one-shot, as in the CBT quiz
    const item = this.current();
    if (!item) return;

    this.locked.set(true);
    this.chosen.set(optionIndex);

    const option = item.options[optionIndex];
    const wasCorrect = !!option.correct;

    this.shell().say(
      (wasCorrect ? this.i18n.t('games.terms.correct') : this.i18n.t('games.branching.why')) +
      '. ' + this.i18n.pick(option.feedback)
    );
    this.shell().step(wasCorrect);
  }

  protected advance(): void {
    if (this.index() + 1 >= this.total) return;
    this.index.update(n => n + 1);
    this.locked.set(false);
    this.chosen.set(null);
  }

  protected restart(): void {
    this.items.set(shuffle(GAME_BRANCHING));
    this.index.set(0);
    this.locked.set(false);
    this.chosen.set(null);
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
