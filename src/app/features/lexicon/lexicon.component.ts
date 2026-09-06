/* ==========================================================================
   lexicon.component.ts — searchable, filterable vocabulary.

   Ports the CBT glossary with its category filter reworked. That component
   filtered on the visible English category label, which would have broken the
   moment a second language appeared. Here the filter value is a stable id and
   only the label is translated.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { IconComponent } from '../../shared/components/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LEXICON_CATEGORIES } from '../../core/data/lexicon.data';
import type { LexiconTerm } from '../../core/models';

@Component({
  selector: 'app-lexicon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, RevealDirective],
  template: `
<section class="page-head">
  <div class="wrap">
    <div class="page-head-grid">
      <div class="page-head-title">
        <p class="t-eyebrow"><span>{{ i18n.t('nav.lexicon') }}</span></p>
        <h1 class="t-title" style="margin-top:1rem">{{ i18n.t('lexicon.title') }}</h1>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted">{{ i18n.t('lexicon.lead') }}</p>
      </div>
    </div>

    <div class="filter-bar" style="margin-top:2.5rem">
      <div class="search-wrap">
        <app-icon name="search" cls="icon-sm" />
        <input type="text" class="field"
               [placeholder]="i18n.t('lexicon.searchHint')"
               [attr.aria-label]="i18n.t('common.search')"
               [value]="rawQuery()" (input)="onSearch($event)">
      </div>
      <div class="filter-bar" role="group" [attr.aria-label]="i18n.t('lexicon.category')">
        <button type="button" class="chip chip-btn"
                [attr.aria-pressed]="category() === null"
                (click)="setCategory(null)">{{ i18n.t('common.all') }}</button>
        @for (cat of categories; track cat.id) {
          <button type="button" class="chip chip-btn"
                  [attr.aria-pressed]="category() === cat.id"
                  (click)="setCategory(cat.id)">{{ i18n.pick(cat.label) }}</button>
        }
      </div>
    </div>

    <p class="t-micro" style="margin-top:1rem" role="status" aria-live="polite">
      {{ i18n.t('common.results', { count: results().length }) }}
    </p>
  </div>
</section>

<section class="wrap" style="padding-bottom:6rem">
  <div class="rows">
    @for (entry of results(); track entry.id; let i = $index) {
      <div class="row-item" appReveal [appRevealDelay]="(i % 8) * 45">
        <span class="row-num"><app-icon name="circle-dot" cls="icon-sm" /></span>

        <div>
          <h2 class="t-subtitle" style="font-size:1.125rem">{{ i18n.pick(entry.term) }}</h2>
          <p class="t-micro" style="margin-top:.2rem">{{ entry.original }}</p>
          <p class="t-body muted" style="margin-top:.6rem;max-width:62ch">
            {{ i18n.pick(entry.definition) }}
          </p>

          @if (entry.relatedPractice) {
            <div style="margin-top:.85rem">
              <a class="link-draw" [routerLink]="['/practices', entry.relatedPractice]">
                {{ i18n.t('lexicon.related') }}<app-icon name="arrow-right" cls="icon-sm" />
              </a>
            </div>
          } @else if (entry.relatedThinker && store.thinker(entry.relatedThinker); as thinker) {
            <div style="margin-top:.85rem">
              <a class="link-draw" [routerLink]="['/thinkers', thinker.slug]">
                {{ i18n.pick(thinker.name) }}<app-icon name="arrow-right" cls="icon-sm" />
              </a>
            </div>
          }
        </div>

        <div style="align-self:start">
          <span class="chip">{{ categoryLabel(entry.category) }}</span>
        </div>
        <span></span>
      </div>
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
export class LexiconComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);
  protected readonly categories = LEXICON_CATEGORIES;

  protected readonly rawQuery = signal('');
  private readonly query = signal('');
  protected readonly category = signal<string | null>(null);

  private debounce?: ReturnType<typeof setTimeout>;

  protected readonly results = computed(() => {
    const query = this.query();
    const category = this.category();
    const locale = this.i18n.locale();

    return this.store.lexicon()
      .filter(entry => {
        if (category && entry.category !== category) return false;
        if (!query) return true;
        return [
          this.i18n.pick(entry.term), entry.original, this.i18n.pick(entry.definition)
        ].join(' ').toLowerCase().includes(query);
      })
      .sort((a, b) => this.i18n.pick(a.term).localeCompare(this.i18n.pick(b.term), locale));
  });

  protected onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.rawQuery.set(value);
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => this.query.set(value.trim().toLowerCase()), 160);
  }

  protected setCategory(id: string | null): void {
    this.category.update(current => (current === id ? null : id));
  }

  protected categoryLabel(id: LexiconTerm['category']): string {
    const found = LEXICON_CATEGORIES.find(cat => cat.id === id);
    return found ? this.i18n.pick(found.label) : id;
  }
}
