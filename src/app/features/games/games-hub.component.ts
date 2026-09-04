/* ==========================================================================
   games-hub.component.ts — the exercise index, with a completion ring each.

   Reads the durable progress the shell writes. The CBT equivalent kept quiz
   results in an in-memory signal, so this overview would have been empty after
   every refresh.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { IconComponent } from '../../shared/components/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { GAMES } from './games.catalogue';

const CIRCUMFERENCE = 339.292;

@Component({
  selector: 'app-games-hub',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, RevealDirective],
  template: `
<section class="page-head">
  <div class="wrap">
    <div class="page-head-grid">
      <div class="page-head-title">
        <p class="t-eyebrow"><span>{{ i18n.t('nav.games') }}</span></p>
        <h1 class="t-title" style="margin-top:1rem">{{ i18n.t('games.title') }}</h1>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted">{{ i18n.t('games.lead') }}</p>
        @if (anyProgress()) {
          <div style="margin-top:1rem">
            <button type="button" class="btn btn-quiet btn-sm" (click)="reset()">
              <app-icon name="trash-2" cls="icon-sm" />{{ i18n.t('games.progress.reset') }}
            </button>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<section class="wrap" style="padding-bottom:6rem">
  <div class="stack">
    @for (game of games; track game.id; let i = $index) {
      <a class="card card-xl card-hover card-sweep" [routerLink]="game.path"
         appReveal [appRevealDelay]="i * 70"
         style="display:flex;gap:1.5rem;align-items:flex-start">

        <span class="game-card-icon" style="flex:none"><app-icon [name]="game.icon" /></span>

        <div style="flex:1;min-width:0">
          <h2 class="t-subtitle">{{ i18n.t(game.titleKey) }}</h2>
          <p class="t-body muted" style="margin-top:.6rem;max-width:52ch">
            {{ i18n.t(game.leadKey) }}
          </p>
          <p class="t-micro" style="margin-top:1rem"
             [class.is-accent]="!!store.gameProgress(game.id)"
             [class.is-faint]="!store.gameProgress(game.id)">
            @if (store.gameProgress(game.id); as p) {
              {{ i18n.t('games.progress.best') }}: {{ p.best }}/{{ p.bestTotal }}
              · {{ i18n.t('games.progress.attempts', { count: p.attempts }) }}
            } @else {
              {{ i18n.t('games.progress.none') }}
            }
          </p>
        </div>

        @if (store.gameProgress(game.id); as p) {
          <div style="position:relative;width:4rem;height:4rem;flex:none">
            <svg class="ring" viewBox="0 0 120 120" width="64" height="64" aria-hidden="true">
              <circle class="ring-track" cx="60" cy="60" r="54" stroke-width="7" />
              <circle class="ring-fill" cx="60" cy="60" r="54" stroke-width="7"
                      [attr.stroke-dasharray]="circumference"
                      [attr.stroke-dashoffset]="offset(p.best, p.bestTotal)" />
            </svg>
            <div style="position:absolute;inset:0;display:grid;place-items:center">
              <span class="t-micro" style="letter-spacing:0;color:var(--text-strong)">
                {{ percent(p.best, p.bestTotal) }}%
              </span>
            </div>
          </div>
        }
      </a>
    }
  </div>
</section>
  `
})
export class GamesHubComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);
  private readonly confirm = inject(ConfirmService);
  protected readonly games = GAMES;
  protected readonly circumference = CIRCUMFERENCE;

  protected readonly anyProgress = computed(() =>
    GAMES.some(game => !!this.store.gameProgress(game.id))
  );

  protected percent(best: number, total: number): number {
    return total ? Math.round((best / total) * 100) : 0;
  }

  protected offset(best: number, total: number): string {
    return (CIRCUMFERENCE - (CIRCUMFERENCE * this.percent(best, total)) / 100).toFixed(1);
  }

  protected async reset(): Promise<void> {
    const confirmed = await this.confirm.ask({
      title: this.i18n.t('games.progress.resetTitle'),
      message: this.i18n.t('games.progress.resetConfirm'),
      confirmLabel: this.i18n.t('common.delete'),
      cancelLabel: this.i18n.t('common.cancel'),
      icon: 'trash-2'
    });
    if (!confirmed) return;
    this.store.resetProgress();
  }
}
