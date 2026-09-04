/* ==========================================================================
   scenario-list.component.ts — the eight vignettes, alternating 7/5 splits.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { IconComponent } from '../../shared/components/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import type { Bilingual } from '../../core/models';

@Component({
  selector: 'app-scenario-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, RevealDirective],
  template: `
<section class="page-head">
  <div class="wrap">
    <div class="page-head-grid">
      <div class="page-head-title">
        <p class="t-eyebrow"><span>{{ i18n.t('nav.scenarios') }}</span></p>
        <h1 class="t-title" style="margin-top:1rem">{{ i18n.t('scenarios.title') }}</h1>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted">{{ i18n.t('scenarios.lead') }}</p>
      </div>
    </div>
  </div>
</section>

<section class="wrap" style="padding-bottom:6rem">
  <div class="stack-lg">
    @for (scenario of store.scenarios(); track scenario.id; let i = $index) {
      <div class="scenario-split" [class.is-flipped]="i % 2 === 1"
           appReveal [appRevealDelay]="(i % 4) * 70">

        @if (i % 2 === 1) {
          <div class="split-narrow">
            <p class="t-eyebrow"><span>{{ i18n.t('scenarios.reflect') }}</span></p>
            <p class="hanging-quote" style="margin-top:1rem">
              {{ i18n.pick(scenario.reflectionPrompt) }}
            </p>
          </div>
        }

        <div class="split-wide">
          <a class="card card-xl card-hover card-sweep" style="display:block"
             [routerLink]="['/scenarios', scenario.id]">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem">
              <div style="display:flex;align-items:center;gap:.75rem;color:var(--accent)">
                <app-icon [name]="scenario.icon" cls="icon-sm" />
                <span class="t-micro" style="color:var(--accent)">
                  {{ i18n.pick(scenario.person) }}
                </span>
              </div>
              @if (store.note(scenario.id)) {
                <span class="chip chip-accent">
                  <app-icon name="check" cls="icon-sm" />{{ i18n.t('scenarios.saved') }}
                </span>
              } @else {
                <span class="t-micro">{{ pad(scenario.order) }}</span>
              }
            </div>

            <h2 class="t-subtitle" style="margin-top:1rem">{{ i18n.pick(scenario.title) }}</h2>
            <p class="t-body muted" style="margin-top:.85rem;max-width:60ch">
              {{ opening(scenario.situation) }}
            </p>

            <div class="tags" style="margin-top:1.25rem">
              @for (givenId of scenario.concernIds; track givenId) {
                @if (store.given(givenId); as given) {
                  <span class="chip chip-accent">{{ i18n.pick(given.title) }}</span>
                }
              }
            </div>

            <span class="link-draw" style="margin-top:1.25rem">
              {{ i18n.t('common.readMore') }}<app-icon name="arrow-right" cls="icon-sm" />
            </span>
          </a>
        </div>

        @if (i % 2 === 0) {
          <div class="split-narrow">
            <p class="t-eyebrow"><span>{{ i18n.t('scenarios.reflect') }}</span></p>
            <p class="hanging-quote" style="margin-top:1rem">
              {{ i18n.pick(scenario.reflectionPrompt) }}
            </p>
          </div>
        }

      </div>
    }
  </div>
</section>
  `
})
export class ScenarioListComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  /** The opening paragraph, as a taste of the vignette. */
  protected opening(situation: Bilingual): string {
    return this.i18n.pick(situation).split('\n\n')[0];
  }
}
