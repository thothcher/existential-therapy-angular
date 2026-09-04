/* ==========================================================================
   practice-list.component.ts — the five interventions.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { IconComponent } from '../../shared/components/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-practice-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, RevealDirective],
  template: `
<section class="page-head">
  <div class="wrap">
    <div class="page-head-grid">
      <div class="page-head-title">
        <p class="t-eyebrow"><span>{{ i18n.t('nav.practices') }}</span></p>
        <h1 class="t-title" style="margin-top:1rem">{{ i18n.t('practices.title') }}</h1>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted">{{ i18n.t('practices.lead') }}</p>
      </div>
    </div>
  </div>
</section>

<section class="wrap" style="padding-bottom:6rem">
  <div class="rows">
    @for (practice of store.practices(); track practice.slug; let i = $index) {
      <a class="row-item" [routerLink]="['/practices', practice.slug]"
         appReveal [appRevealDelay]="i * 60">
        <span class="row-num">{{ pad(practice.order) }}</span>

        <div>
          <h2 class="t-subtitle">{{ i18n.pick(practice.title) }}</h2>
          <p class="t-micro" style="margin-top:.25rem">{{ practice.original }}</p>
          <p class="t-body muted" style="margin-top:.6rem;max-width:56ch">
            {{ i18n.pick(practice.summary) }}
          </p>
        </div>

        <div class="tags" style="align-self:center">
          @for (givenId of practice.relatedGiven; track givenId) {
            @if (store.given(givenId); as given) {
              <span class="chip chip-accent">{{ i18n.pick(given.title) }}</span>
            }
          }
        </div>

        <span class="row-arrow" style="align-self:center"><app-icon name="arrow-right" /></span>
      </a>
    }
  </div>
</section>
  `
})
export class PracticeListComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
