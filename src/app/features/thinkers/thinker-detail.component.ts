/* ==========================================================================
   thinker-detail.component.ts — one thinker, addressed by :slug.

   This is where the CBT psychologist detail had a real bug: following a
   related-psychologist link did not reload the profile, because the component
   read its route parameter once in ngOnInit and Angular reuses the instance
   when only the parameter changes. Here the slug is a signal derived from the
   route, so every related link updates the page — the whole view is computed
   from it.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { SeoService } from '../../core/services/seo.service';
import { IconComponent } from '../../shared/components/icon.component';
import { PlateComponent } from '../../shared/components/plate.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-thinker-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, PlateComponent, RevealDirective],
  template: `
@if (thinker(); as t) {
  <section class="page-head">
    <div class="wrap">
      <a class="link-draw" routerLink="/thinkers" style="margin-bottom:1.75rem">
        <app-icon name="arrow-left" cls="icon-sm" />{{ i18n.t('nav.thinkers') }}
      </a>

      <div class="scenario-split" style="align-items:end">
        <div class="split-wide">
          <p class="t-micro">{{ years(t) }} · {{ i18n.pick(t.origin) }}</p>
          <h1 class="t-display" style="margin-top:.75rem;font-size:clamp(2.25rem,5vw,3.5rem)">
            {{ i18n.pick(t.name) }}
          </h1>
          @if (i18n.pick(t.name) !== t.latin) {
            <p class="t-micro" style="margin-top:.5rem">{{ t.latin }}</p>
          }
          <p class="t-lead measure" style="margin-top:1.25rem">{{ i18n.pick(t.summary) }}</p>
          <div class="tags" style="margin-top:1.5rem">
            @for (tag of i18n.pickList(t.tags); track tag) {
              <span class="chip">{{ tag }}</span>
            }
          </div>
        </div>
        <div class="split-narrow">
          <div class="plate" style="aspect-ratio:4/5">
            @if (t.portrait; as portrait) {
              <img [src]="portrait.src"
                   [alt]="i18n.t('thinkers.portraitAlt', { name: i18n.pick(t.name) })"
                   width="640" height="800" decoding="async" />
            } @else {
              <app-plate [seed]="t.plate" [label]="i18n.pick(t.name)" />
            }
          </div>
          @if (t.portrait; as portrait) {
            <p class="t-micro plate-credit">
              <a [href]="portrait.source" target="_blank" rel="noopener noreferrer">
                {{ i18n.t('thinkers.credit', { credit: portrait.credit, license: portrait.license }) }}
              </a>
            </p>
          }
        </div>
      </div>
    </div>
  </section>

  <section class="wrap" style="padding-bottom:6rem">
    <div class="detail-grid">

      <div class="prose t-body">
        @for (paragraph of paragraphs(); track $index) {
          <p appReveal [appRevealDelay]="$index * 60">{{ paragraph }}</p>
        }

        <h2 appReveal>{{ i18n.t('thinkers.detail.contributions') }}</h2>
        <ul class="flow-list" appReveal>
          @for (item of i18n.pickList(t.contributions); track item) { <li>{{ item }}</li> }
        </ul>
      </div>

      <aside class="detail-aside stack">

        <div class="card">
          <h2 class="t-subtitle" style="font-size:1.0625rem">{{ i18n.t('thinkers.detail.facts') }}</h2>
          <dl style="margin:1rem 0 0">
            @for (fact of facts(); track fact.label) {
              <div style="display:flex;justify-content:space-between;gap:1rem;padding:.5rem 0;
                          border-bottom:1px solid var(--hairline)">
                <dt class="t-micro">{{ fact.label }}</dt>
                <dd class="t-micro" style="margin:0;color:var(--text-strong);text-align:end">
                  {{ fact.value }}
                </dd>
              </div>
            }
          </dl>
        </div>

        <div class="card">
          <h2 class="t-subtitle" style="font-size:1.0625rem">{{ i18n.t('thinkers.detail.ideas') }}</h2>
          <ul class="flow-list t-body" style="margin-top:1rem;font-size:.9375rem">
            @for (idea of i18n.pickList(t.keyIdeas); track idea) { <li>{{ idea }}</li> }
          </ul>
        </div>

        <div class="card">
          <h2 class="t-subtitle" style="font-size:1.0625rem">{{ i18n.t('thinkers.detail.works') }}</h2>
          <ol style="margin:1rem 0 0;padding:0;list-style:none">
            @for (work of t.works; track work.year) {
              <li style="display:flex;gap:.85rem;padding:.5rem 0;border-bottom:1px solid var(--hairline)">
                <span class="t-micro" style="color:var(--accent);flex:none;width:2.75rem">
                  {{ work.year }}
                </span>
                <span class="t-body" style="font-size:.9375rem">{{ i18n.pick(work.title) }}</span>
              </li>
            }
          </ol>
        </div>

        @if (related().length) {
          <div class="card">
            <h2 class="t-subtitle" style="font-size:1.0625rem">
              {{ i18n.t('thinkers.detail.related') }}
            </h2>
            <div class="stack-sm" style="margin-top:1rem">
              @for (other of related(); track other.slug) {
                <a class="link-draw" style="display:flex" [routerLink]="['/thinkers', other.slug]">
                  {{ i18n.pick(other.name) }}<app-icon name="arrow-right" cls="icon-sm" />
                </a>
              }
            </div>
          </div>
        }

      </aside>
    </div>
  </section>
} @else {
  <section class="section">
    <div class="wrap" style="text-align:center;max-width:34rem">
      <p class="t-title">{{ i18n.t('thinkers.notFound') }}</p>
      <a class="btn btn-primary" style="margin-top:1.5rem" routerLink="/thinkers">
        <app-icon name="arrow-left" cls="icon-sm" />{{ i18n.t('nav.thinkers') }}
      </a>
    </div>
  </section>
}
  `
})
export class ThinkerDetailComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);

  /** Derived from the route, so a related link re-renders rather than sticking. */
  private readonly slug = toSignal(
    this.route.paramMap.pipe(map(params => params.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' }
  );

  protected readonly thinker = computed(() => this.store.thinker(this.slug()));

  protected readonly paragraphs = computed(() => {
    const thinker = this.thinker();
    return thinker ? this.i18n.pick(thinker.biography).split('\n\n') : [];
  });

  protected readonly related = computed(() => {
    const thinker = this.thinker();
    if (!thinker) return [];
    return thinker.related
      .map(slug => this.store.thinker(slug))
      .filter((item): item is NonNullable<typeof item> => !!item);
  });

  protected readonly facts = computed(() => {
    const thinker = this.thinker();
    if (!thinker) return [];
    return [
      { label: this.i18n.t('thinkers.detail.years'), value: this.years(thinker) },
      { label: this.i18n.t('thinkers.detail.origin'), value: this.i18n.pick(thinker.origin) },
      { label: this.i18n.t('thinkers.detail.tradition'), value: this.i18n.pick(thinker.tradition) }
    ];
  });

  constructor() {
    effect(() => {
      const thinker = this.thinker();
      if (thinker) this.seo.setTitle(this.i18n.pick(thinker.name));
      else this.seo.clearTitle();
    });
  }

  protected years(thinker: { birthYear: number; deathYear: number | null }): string {
    return `${thinker.birthYear}–${thinker.deathYear ?? ''}`;
  }
}
