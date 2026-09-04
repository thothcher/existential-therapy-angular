/* ==========================================================================
   vs-cbt.component.ts — the explicit comparison.

   Written to inform rather than to win. The platform this one parallels is a
   CBT platform, and a comparison that caricatured CBT would be both unfair and
   useless to a learner who will meet both approaches in practice — hence the
   section on when CBT is the better choice.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { IconComponent } from '../../shared/components/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import {
  VSCBT_CONVERGE, VSCBT_ROWS, VSCBT_WHEN_CBT, VSCBT_WHEN_EX
} from '../../core/data/vscbt.data';

@Component({
  selector: 'app-vs-cbt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RevealDirective],
  template: `
<section class="page-head">
  <div class="wrap">
    <div class="page-head-grid">
      <div class="page-head-title">
        <p class="t-eyebrow"><span>{{ i18n.t('nav.vscbt') }}</span></p>
        <h1 class="t-title" style="margin-top:1rem">{{ i18n.t('vscbt.title') }}</h1>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted">{{ i18n.t('vscbt.lead') }}</p>
      </div>
    </div>
  </div>
</section>

<section class="wrap">
  <div class="compare-scroll" appReveal>
    <table class="compare">
      <thead>
        <tr>
          <th scope="col">{{ i18n.t('vscbt.table.aspect') }}</th>
          <th scope="col" class="col-ex">{{ i18n.t('vscbt.table.existential') }}</th>
          <th scope="col">{{ i18n.t('vscbt.table.cbt') }}</th>
        </tr>
      </thead>
      <tbody>
        @for (row of rows; track $index) {
          <tr>
            <th scope="row">{{ i18n.pick(row.aspect) }}</th>
            <td class="col-ex">{{ i18n.pick(row.ex) }}</td>
            <td>{{ i18n.pick(row.cbt) }}</td>
          </tr>
        }
      </tbody>
    </table>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="scenario-split">
      <div class="split-wide">
        <h2 class="t-title" appReveal>{{ i18n.t('vscbt.converge.title') }}</h2>
        <ul class="flow-list t-body" style="margin-top:1.5rem" appReveal [appRevealDelay]="80">
          @for (item of converge; track $index) { <li>{{ i18n.pick(item) }}</li> }
        </ul>
      </div>
      <div class="split-narrow">
        <div class="card card-xl" appReveal [appRevealDelay]="140">
          <span class="game-card-icon"><app-icon name="scale" /></span>
          <p class="t-body muted" style="margin-top:1rem">{{ i18n.t('footer.disclaimerBody') }}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" style="background:var(--surface-2)">
  <div class="wrap">
    <div class="scenario-split" style="align-items:start">
      <div class="split-wide">
        <h2 class="t-subtitle" appReveal>{{ i18n.t('vscbt.whenCbt.title') }}</h2>
        <p class="t-body muted" style="margin-top:.75rem" appReveal>
          {{ i18n.t('vscbt.whenCbt.lead') }}
        </p>
        <ul class="flow-list t-body" style="margin-top:1.5rem" appReveal [appRevealDelay]="80">
          @for (item of whenCbt; track $index) { <li>{{ i18n.pick(item) }}</li> }
        </ul>
      </div>
      <div class="split-narrow">
        <h2 class="t-subtitle" appReveal>{{ i18n.t('vscbt.whenEx.title') }}</h2>
        <ul class="flow-list t-body" style="margin-top:1.5rem" appReveal [appRevealDelay]="80">
          @for (item of whenEx; track $index) { <li>{{ i18n.pick(item) }}</li> }
        </ul>
      </div>
    </div>
  </div>
</section>
  `
})
export class VsCbtComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly rows = VSCBT_ROWS;
  protected readonly converge = VSCBT_CONVERGE;
  protected readonly whenCbt = VSCBT_WHEN_CBT;
  protected readonly whenEx = VSCBT_WHEN_EX;
}
