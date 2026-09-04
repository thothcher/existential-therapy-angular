/* ==========================================================================
   legal.component.ts — privacy and terms, from the same component.

   Which set of sections to render comes from the route's `data.which`, so both
   pages share one component and one layout.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { I18nService } from '../../core/services/i18n.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LEGAL_UPDATED, PRIVACY, TERMS } from '../../core/data/legal.data';

@Component({
  selector: 'app-legal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
<section class="page-head">
  <div class="wrap">
    <div class="page-head-grid">
      <div class="page-head-title">
        <p class="t-eyebrow"><span>{{ i18n.t('footer.legal') }}</span></p>
        <h1 class="t-title" style="margin-top:1rem">{{ i18n.t(titleKey()) }}</h1>
      </div>
      <div class="page-head-aside">
        <p class="t-micro">
          {{ i18n.t('legal.updated') }}: {{ i18n.formatDate(updated) }}
        </p>
      </div>
    </div>
  </div>
</section>

<section class="wrap" style="padding-bottom:6rem">
  <div class="stack-lg measure">
    @for (section of sections(); track $index; let i = $index) {
      <section appReveal [appRevealDelay]="i * 60">
        <h2 class="t-subtitle">{{ i18n.pick(section.heading) }}</h2>
        <p class="t-body muted" style="margin-top:.85rem">{{ i18n.pick(section.body) }}</p>
        @if (section.list) {
          <ul class="flow-list t-body" style="margin-top:1rem">
            @for (item of i18n.pickList(section.list); track item) { <li>{{ item }}</li> }
          </ul>
        }
      </section>
    }
  </div>
</section>
  `
})
export class LegalComponent {
  protected readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  protected readonly updated = LEGAL_UPDATED;

  private readonly which = toSignal(
    this.route.data.pipe(map(data => (data['which'] as string) ?? 'privacy')),
    { initialValue: (this.route.snapshot.data['which'] as string) ?? 'privacy' }
  );

  protected readonly sections = computed(() => (this.which() === 'terms' ? TERMS : PRIVACY));

  protected readonly titleKey = computed(() =>
    this.which() === 'terms' ? 'legal.terms.title' : 'legal.privacy.title'
  );
}
