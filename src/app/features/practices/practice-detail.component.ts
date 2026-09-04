/* ==========================================================================
   practice-detail.component.ts — one intervention, addressed by :slug.

   Same five-part shape as the CBT technique detail (what it is, why it works,
   how to use it, pitfalls, try it). The difference is that `tryIt` actually
   leads somewhere: every practice points into the game or tool that exercises
   it. In the CBT data that field existed and mostly pointed nowhere.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { SeoService } from '../../core/services/seo.service';
import { IconComponent } from '../../shared/components/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-practice-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, RevealDirective],
  template: `
@if (practice(); as p) {
  <section class="page-head">
    <div class="wrap">
      <a class="link-draw" routerLink="/practices" style="margin-bottom:1.75rem">
        <app-icon name="arrow-left" cls="icon-sm" />{{ i18n.t('nav.practices') }}
      </a>

      <div class="page-head-grid">
        <div class="page-head-title">
          <div style="display:flex;align-items:center;gap:.85rem;color:var(--accent)">
            <app-icon [name]="p.icon" cls="icon-lg" />
            <span class="t-micro" style="color:var(--accent)">{{ pad(p.order) }}</span>
          </div>
          <h1 class="t-title" style="margin-top:1rem">{{ i18n.pick(p.title) }}</h1>
          <p class="t-micro" style="margin-top:.5rem">{{ p.original }}</p>
        </div>
        <div class="page-head-aside">
          <p class="t-lead">{{ i18n.pick(p.summary) }}</p>
          <div class="tags" style="margin-top:1.25rem">
            @for (givenId of p.relatedGiven; track givenId) {
              @if (store.given(givenId); as given) {
                <a class="chip chip-accent chip-btn" routerLink="/givens" [fragment]="given.id">
                  <app-icon [name]="given.icon" cls="icon-sm" />{{ i18n.pick(given.title) }}
                </a>
              }
            }
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="wrap" style="padding-bottom:6rem">
    <div class="detail-grid">

      <div class="stack-lg">
        <div appReveal>
          <p class="t-eyebrow"><span>{{ i18n.t('practices.detail.what') }}</span></p>
          <div class="prose t-body measure" style="margin-top:1rem">
            @for (paragraph of split(p.whatItIs); track $index) { <p>{{ paragraph }}</p> }
          </div>
        </div>

        <div appReveal [appRevealDelay]="70">
          <p class="t-eyebrow"><span>{{ i18n.t('practices.detail.why') }}</span></p>
          <div class="prose t-body measure" style="margin-top:1rem">
            @for (paragraph of split(p.whyItWorks); track $index) { <p>{{ paragraph }}</p> }
          </div>
        </div>

        <div class="card card-xl" appReveal [appRevealDelay]="140">
          <h2 class="t-subtitle" style="display:flex;align-items:center;gap:.6rem">
            <span style="color:var(--accent)"><app-icon name="list-checks" cls="icon-sm" /></span>
            {{ i18n.t('practices.detail.how') }}
          </h2>
          <ol style="margin:1.25rem 0 0;padding:0;list-style:none">
            @for (step of i18n.pickList(p.howToUse); track step) {
              <li style="display:grid;grid-template-columns:1.75rem 1fr;gap:.85rem;
                         padding:.7rem 0;border-bottom:1px solid var(--hairline)">
                <span class="t-micro serif" style="color:var(--accent);letter-spacing:0">
                  <span style="font-size:1rem">&bull;</span>
                </span>
                <span class="t-body">{{ step }}</span>
              </li>
            }
          </ol>
        </div>
      </div>

      <aside class="detail-aside stack">
        <div class="card">
          <h2 class="t-subtitle" style="font-size:1.0625rem;display:flex;align-items:center;gap:.6rem">
            <span style="color:var(--accent)"><app-icon name="triangle-alert" cls="icon-sm" /></span>
            {{ i18n.t('practices.detail.pitfalls') }}
          </h2>
          <ul class="flow-list t-body" style="margin-top:1rem;font-size:.9375rem">
            @for (pitfall of i18n.pickList(p.pitfalls); track pitfall) { <li>{{ pitfall }}</li> }
          </ul>
        </div>

        <div class="card card-sweep">
          <p class="t-eyebrow"><span>{{ i18n.t('practices.detail.tryIt') }}</span></p>
          <p class="t-subtitle" style="font-size:1.0625rem;margin-top:.85rem">
            {{ i18n.t(p.tryIt.key) }}
          </p>
          <a class="btn btn-primary btn-sm" style="margin-top:1rem" [routerLink]="p.tryIt.path">
            {{ i18n.t('common.start') }}<app-icon name="arrow-right" cls="icon-sm" />
          </a>
        </div>
      </aside>

    </div>
  </section>
} @else {
  <section class="section">
    <div class="wrap" style="text-align:center;max-width:34rem">
      <p class="t-title">{{ i18n.t('practices.notFound') }}</p>
      <a class="btn btn-primary" style="margin-top:1.5rem" routerLink="/practices">
        <app-icon name="arrow-left" cls="icon-sm" />{{ i18n.t('nav.practices') }}
      </a>
    </div>
  </section>
}
  `
})
export class PracticeDetailComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map(params => params.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' }
  );

  protected readonly practice = computed(() => this.store.practice(this.slug()));

  constructor() {
    effect(() => {
      const practice = this.practice();
      if (practice) this.seo.setTitle(this.i18n.pick(practice.title));
      else this.seo.clearTitle();
    });
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  protected split(field: { ka: string; en: string }): string[] {
    return this.i18n.pick(field).split('\n\n');
  }
}
