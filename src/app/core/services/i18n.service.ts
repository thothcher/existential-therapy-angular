/* ==========================================================================
   i18n.service.ts — Georgian (source) / English.

   Ported from the CBT TranslateService: same flat dot-key dictionary, same
   fallback chain (active language -> source -> the key itself). Three changes:

   1. Georgian is the SOURCE language, not a translation layer. `ka` is
      complete by construction and `en` falls back to it, never the reverse.
   2. Content is bilingual too, via pick() / pickList().
   3. No impure pipe. `lang` is a signal, and t() reads it, so any template
      calling t() re-renders on a language change automatically — which is
      what CBT's `pure: false` pipe was working around.
   ========================================================================== */

import { Injectable, computed, effect, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StorageService } from './storage.service';
import { STRINGS } from '../data/strings.data';
import type { Bilingual, BilingualList, Lang } from '../models';

const KEY = 'et_lang';
const SOURCE: Lang = 'ka';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly storage = inject(StorageService);
  private readonly doc = inject(DOCUMENT);

  readonly supported: readonly Lang[] = ['ka', 'en'];

  private readonly langSignal = signal<Lang>(this.initial());
  readonly lang = this.langSignal.asReadonly();
  readonly isGeorgian = computed(() => this.langSignal() === 'ka');

  constructor() {
    effect(() => {
      const lang = this.langSignal();
      this.doc.documentElement.setAttribute('lang', lang);
      this.storage.set(KEY, lang);
    });
  }

  setLang(lang: Lang): void {
    if (this.supported.includes(lang)) this.langSignal.set(lang);
  }

  /**
   * Look up a dot-key. `vars` interpolates {name} placeholders.
   * A missing key returns the key itself, so the gap shows up in review
   * rather than rendering blank.
   */
  t(key: string, vars?: Record<string, string | number>): string {
    const lang = this.langSignal();
    const value = STRINGS[lang]?.[key] ?? STRINGS[SOURCE]?.[key];
    if (value === undefined) return key;
    if (!vars) return value;
    return value.replace(/\{(\w+)\}/g, (match, name: string) =>
      Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match
    );
  }

  /** Resolve a bilingual content field. Plain strings pass straight through. */
  pick(field: Bilingual | string | null | undefined): string {
    if (field === null || field === undefined) return '';
    if (typeof field === 'string') return field;
    const lang = this.langSignal();
    return field[lang] || field[SOURCE] || '';
  }

  /**
   * Resolve a list, accepting either shape the data files use:
   *   [{ka, en}, ...]        an array of bilingual items
   *   {ka: [...], en: [...]} one array per language
   */
  pickList(field: BilingualList | null | undefined): string[] {
    if (!field) return [];
    if (Array.isArray(field)) return field.map(item => this.pick(item));
    const lang = this.langSignal();
    return field[lang] ?? field[SOURCE] ?? [];
  }

  /** Locale tag for date and collation APIs. */
  locale(): string { return this.langSignal() === 'ka' ? 'ka-GE' : 'en-GB'; }

  formatDate(iso: string): string {
    try {
      return new Date(iso).toLocaleDateString(this.locale(), {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch {
      return iso.slice(0, 10);
    }
  }

  private initial(): Lang {
    const stored = this.storage.get<Lang | null>(KEY, null);
    if (stored && this.supported.includes(stored)) return stored;
    // Georgian is the platform's language, not a localisation of an English
    // original, so it is the default for everyone. English is one click away.
    return SOURCE;
  }
}
