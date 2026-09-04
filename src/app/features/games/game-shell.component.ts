/* ==========================================================================
   game-shell.component.ts — the apparatus every exercise shares.

   Provides what the CBT quiz engine either lacked or got wrong:

   - A progress bar that actually reaches 100%. The CBT bar computed
     currentIndex / length, so it read 0% on the first question and never
     completed.
   - An aria-live status region. CBT conveyed correctness through a left border
     colour alone, which is silent to a screen reader.
   - A real retry that resets every piece of state. Only the CBT thought record
     had one; restarting a quiz meant re-navigating to its URL.
   - Durable progress, written to localStorage rather than an in-memory signal
     a refresh discards.
   - A score reported as a fraction with words, never as a colour alone.

   Games project their board into <ng-content> and drive the shell through the
   `step`, `say` and `restart` outputs and methods.
   ========================================================================== */

import {
  ChangeDetectionStrategy, Component, ElementRef, computed, inject, input, output,
  signal, viewChild
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { IconComponent } from '../../shared/components/icon.component';
import type { GameProgress } from '../../core/models';

/** 2*pi*r for r = 54 — the CBT donut geometry, restyled. */
const CIRCUMFERENCE = 339.292;

@Component({
  selector: 'app-game-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
<section class="page-head">
  <div class="wrap">
    <a class="link-draw" routerLink="/games" style="margin-bottom:1.75rem">
      <app-icon name="arrow-left" cls="icon-sm" />{{ i18n.t('nav.games') }}
    </a>

    <div class="page-head-grid">
      <div class="page-head-title">
        <p class="t-eyebrow"><span>{{ i18n.t('nav.games') }}</span></p>
        <h1 class="t-title" style="margin-top:1rem">{{ i18n.t(titleKey()) }}</h1>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted">{{ i18n.t(leadKey()) }}</p>
      </div>
    </div>
  </div>
</section>

<section class="wrap" style="padding-bottom:6rem">

  <div class="game-toolbar">
    <div style="flex:1;min-width:12rem">
      <div class="progress-track" role="progressbar" aria-valuemin="0"
           [attr.aria-valuenow]="done()" [attr.aria-valuemax]="total()"
           [attr.aria-valuetext]="countLabel()"
           [attr.aria-label]="i18n.t('a11y.progressbar')">
        <div class="progress-fill" [style.width.%]="percent()"></div>
      </div>
      <p class="t-micro" style="margin-top:.5rem">{{ countLabel() }}</p>
    </div>
    <button type="button" class="btn btn-ghost btn-sm" (click)="restart.emit()">
      <app-icon name="rotate-ccw" cls="icon-sm" />{{ i18n.t('common.retry') }}
    </button>
  </div>

  <details class="card-flat" style="margin-bottom:1.75rem">
    <summary class="t-micro" style="cursor:pointer;color:var(--text-strong)">
      {{ i18n.t('games.keyboardHint') }}
    </summary>
    <p class="t-body" style="margin-top:.75rem;font-size:.9375rem">
      {{ i18n.t(instructionsKey()) }}
    </p>
  </details>

  <!-- The live region CBT never had: correctness was a border colour. -->
  <p class="sr-only" role="status" aria-live="polite" aria-atomic="true">{{ status() }}</p>

  <div><ng-content /></div>

  @if (finished()) {
    <div class="card card-xl settle" style="margin-top:2rem;display:grid;gap:2rem">
      <div style="display:flex;flex-wrap:wrap;gap:2rem;align-items:center">

        <div style="position:relative;width:7.5rem;height:7.5rem;flex:none">
          <svg class="ring" viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
            <circle class="ring-track" cx="60" cy="60" r="54" stroke-width="4" />
            <circle class="ring-fill" cx="60" cy="60" r="54" stroke-width="4"
                    [attr.stroke-dasharray]="circumference"
                    [attr.stroke-dashoffset]="dashOffset()" />
          </svg>
          <div style="position:absolute;inset:0;display:grid;place-items:center">
            <span class="serif" style="font-size:1.75rem;color:var(--text-strong)">
              {{ percent() }}%
            </span>
          </div>
        </div>

        <div style="flex:1 1 16rem;min-width:0">
          <h2 class="t-subtitle" tabindex="-1" style="outline:none" #resultHeading>
            {{ i18n.t('games.scoreOf', { correct: correct(), total: total() }) }}
          </h2>
          <p class="t-body muted" style="margin-top:.6rem">{{ i18n.t(messageKey()) }}</p>
          @if (record(); as entry) {
            <p class="t-micro" style="margin-top:.85rem">
              {{ i18n.t('games.progress.best') }}: {{ entry.best }}/{{ entry.bestTotal }}
              · {{ i18n.t('games.progress.attempts', { count: entry.attempts }) }}
            </p>
          }
        </div>

      </div>

      <div style="display:flex;flex-wrap:wrap;gap:.75rem">
        <button type="button" class="btn btn-primary" (click)="restart.emit()">
          <app-icon name="rotate-ccw" cls="icon-sm" />{{ i18n.t('common.retry') }}
        </button>
        <a class="btn btn-ghost" routerLink="/games">
          {{ i18n.t('nav.games') }}<app-icon name="arrow-right" cls="icon-sm" />
        </a>
      </div>
    </div>
  }

</section>
  `
})
export class GameShellComponent {
  protected readonly i18n = inject(I18nService);
  private readonly store = inject(StoreService);

  readonly gameId = input.required<string>();
  readonly total = input.required<number>();
  readonly titleKey = input.required<string>();
  readonly leadKey = input.required<string>();
  readonly instructionsKey = input.required<string>();

  /** Emitted when the toolbar or result-panel retry is pressed. */
  readonly restart = output<void>();

  protected readonly circumference = CIRCUMFERENCE;

  protected readonly done = signal(0);
  protected readonly correct = signal(0);
  protected readonly finished = signal(false);
  protected readonly status = signal('');
  protected readonly record = signal<GameProgress | null>(null);

  private readonly resultHeading = viewChild<ElementRef<HTMLElement>>('resultHeading');

  protected readonly percent = computed(() => {
    const total = this.total();
    return total ? Math.round((this.done() / total) * 100) : 0;
  });

  protected readonly countLabel = computed(() =>
    this.i18n.t('common.of', { current: this.done(), total: this.total() })
  );

  protected readonly scorePercent = computed(() => {
    const total = this.total();
    return total ? Math.round((this.correct() / total) * 100) : 0;
  });

  protected readonly dashOffset = computed(() =>
    (CIRCUMFERENCE - (CIRCUMFERENCE * this.scorePercent()) / 100).toFixed(1)
  );

  protected readonly messageKey = computed(() => {
    const ratio = this.total() ? this.correct() / this.total() : 0;
    if (ratio === 1) return 'games.result.perfect';
    if (ratio >= 0.75) return 'games.result.strong';
    if (ratio >= 0.4) return 'games.result.fair';
    return 'games.result.weak';
  });

  /* ---- the API games drive ---------------------------------------------- */

  /** Announce to assistive tech and the status line. */
  say(message: string): void {
    this.status.set(message);
  }

  /** Record one resolved item; `wasCorrect` counts toward the score. */
  step(wasCorrect: boolean): void {
    this.done.update(n => n + 1);
    if (wasCorrect) this.correct.update(n => n + 1);
    if (this.done() >= this.total()) this.finish();
  }

  /** Show the result panel and persist the run. */
  finish(): void {
    if (this.finished()) return;
    this.record.set(this.store.recordGame(this.gameId(), this.correct(), this.total()));
    this.finished.set(true);
    this.say(
      this.i18n.t('games.scoreOf', { correct: this.correct(), total: this.total() }) +
      '. ' + this.i18n.t(this.messageKey())
    );
    // Move focus to the outcome so a keyboard user does not miss it.
    queueMicrotask(() => this.resultHeading()?.nativeElement.focus());
  }

  /** Clear shell state; the game clears its own board. */
  reset(): void {
    this.done.set(0);
    this.correct.set(0);
    this.finished.set(false);
    this.status.set('');
    this.record.set(null);
  }
}
