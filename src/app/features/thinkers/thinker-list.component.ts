/* ==========================================================================
   thinker-list.component.ts — searchable, filterable index.

   Ports the CBT psychologist list with two fixes: its search input re-filtered
   on every keystroke with no debounce, and its filter buttons carried no
   aria-pressed, so a screen-reader user could not tell which was active.

   The filter value is the tradition's Georgian or English label, which changes
   with the language — so a language switch clears it rather than leaving a
   filter that matches nothing.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { IconComponent } from '../../shared/components/icon.component';
import { PlateComponent } from '../../shared/components/plate.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import type { Thinker } from '../../core/models';

@Component({
  selector: 'app-thinker-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, PlateComponent, RevealDirective],
  template: `
<section class="page-head">
  <div class="wrap">
    <div class="page-head-grid">
      <div class="page-head-title">
        <p class="t-eyebrow"><span>{{ i18n.t('nav.thinkers') }}</span></p>
        <h1 class="t-title" style="margin-top:1rem">{{ i18n.t('thinkers.title') }}</h1>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted">{{ i18n.t('thinkers.lead') }}</p>
      </div>
    </div>

    <div class="filter-bar" style="margin-top:2.5rem">
      <div class="search-wrap">
        <app-icon name="search" cls="icon-sm" />
        <input type="search" class="field"
               [placeholder]="i18n.t('common.searchHint')"
               [attr.aria-label]="i18n.t('common.search')"
               [value]="rawQuery()"
               (input)="onSearch($event)">
      </div>
      <div class="filter-bar" role="group" [attr.aria-label]="i18n.t('thinkers.filter.tradition')">
        <button type="button" class="chip chip-btn"
                [attr.aria-pressed]="tradition() === null"
                (click)="setTradition(null)">{{ i18n.t('common.all') }}</button>
        @for (value of traditions(); track value) {
          <button type="button" class="chip chip-btn"
                  [attr.aria-pressed]="tradition() === value"
                  (click)="setTradition(value)">{{ value }}</button>
        }
      </div>
    </div>

    <p class="t-micro" style="margin-top:1rem" role="status" aria-live="polite">
      {{ i18n.t('common.results', { count: results().length }) }}
    </p>
  </div>
</section>

<section class="wrap" style="padding-bottom:6rem">
  <div class="thinker-index">
    @for (thinker of results(); track thinker.slug; let i = $index) {
      <a class="thinker-item group" [routerLink]="['/thinkers', thinker.slug]"
         appReveal [appRevealDelay]="(i % 6) * 70">
        <div class="plate plate-hover">
          @if (thinker.portrait; as portrait) {
            <img [src]="portrait.src" alt="" aria-hidden="true"
                 width="480" height="600" loading="lazy" decoding="async" />
          } @else {
            <app-plate [seed]="thinker.plate" />
          }
        </div>
        <p class="t-micro">{{ years(thinker) }} · {{ i18n.pick(thinker.origin) }}</p>
        <h2 class="t-subtitle" style="margin-top:.3rem">{{ i18n.pick(thinker.name) }}</h2>
        <p class="t-micro" style="margin-top:.2rem;color:var(--accent)">
          {{ i18n.pick(thinker.tradition) }}
        </p>
        <p class="t-body muted" style="margin-top:.6rem">{{ i18n.pick(thinker.summary) }}</p>
        <span class="link-draw" style="margin-top:.85rem">
          {{ i18n.t('common.readMore') }}<app-icon name="arrow-right" cls="icon-sm" />
        </span>
      </a>
    }
  </div>

  @if (!results().length) {
    <div style="padding:4rem 0;text-align:center">
      <p class="t-subtitle">{{ i18n.t('common.noResults') }}</p>
      <p class="t-body muted" style="margin-top:.5rem">{{ i18n.t('common.noResultsHint') }}</p>
    </div>
  }
</section>
  `
})
export class ThinkerListComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);

  /** What the user typed; mirrored so the input keeps its value on re-render. */
  protected readonly rawQuery = signal('');
  /** The debounced value the filter actually reads. */
  private readonly query = signal('');
  protected readonly tradition = signal<string | null>(null);

  private debounce?: ReturnType<typeof setTimeout>;

  constructor() {
    // A tradition label is language-specific, so a language change drops it.
    effect(() => {
      this.i18n.lang();
      this.tradition.set(null);
    });
  }

  protected readonly traditions = computed(() => {
    const seen: string[] = [];
    for (const thinker of this.store.thinkers()) {
      const value = this.i18n.pick(thinker.tradition);
      if (!seen.includes(value)) seen.push(value);
    }
    return seen;
  });

  protected readonly results = computed(() => {
    const query = this.query();
    const tradition = this.tradition();
    return this.store.thinkers().filter(thinker => {
      if (tradition && this.i18n.pick(thinker.tradition) !== tradition) return false;
      if (!query) return true;
      return this.haystack(thinker).includes(query);
    });
  });

  protected onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.rawQuery.set(value);
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => this.query.set(value.trim().toLowerCase()), 160);
  }

  protected setTradition(value: string | null): void {
    // Clicking the active filter clears it.
    this.tradition.update(current => (current === value ? null : value));
  }

  protected years(thinker: Thinker): string {
    return `${thinker.birthYear}–${thinker.deathYear ?? ''}`;
  }

  private haystack(thinker: Thinker): string {
    return [
      this.i18n.pick(thinker.name),
      thinker.latin,
      this.i18n.pick(thinker.summary),
      this.i18n.pick(thinker.tradition),
      this.i18n.pick(thinker.origin),
      this.i18n.pickList(thinker.keyIdeas).join(' '),
      this.i18n.pickList(thinker.tags).join(' ')
    ].join(' ').toLowerCase();
  }
}
