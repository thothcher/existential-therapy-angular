/* ==========================================================================
   seo.service.ts — document title and meta description per route.

   Same shape as the CBT SeoService (walk to the deepest activated route on
   NavigationEnd, read its `data`), with one difference: the route carries
   translation KEYS rather than finished English strings, so the title also
   updates when the language changes rather than only when the route does.
   ========================================================================== */

import { Injectable, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { I18nService } from './i18n.service';

export interface RouteSeo {
  /** Dot-key into the string dictionary, e.g. 'meta.givens'. */
  titleKey?: string;
  descKey?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly i18n = inject(I18nService);

  /** The deepest activated route's SEO data, as a signal. */
  private readonly current = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => {
        let route = this.route;
        while (route.firstChild) route = route.firstChild;
        return (route.snapshot.data ?? {}) as RouteSeo;
      })
    ),
    { initialValue: {} as RouteSeo }
  );

  /** Detail pages call this to override the route's generic title. */
  private readonly override = { title: '' };

  init(): void {
    effect(() => {
      const data = this.current();
      const brand = this.i18n.t('brand.name');
      const name = this.override.title || (data.titleKey ? this.i18n.t(data.titleKey) : '');
      this.title.setTitle(name ? `${name} · ${brand}` : brand);

      const description = data.descKey ? this.i18n.t(data.descKey) : this.i18n.t('meta.desc.home');
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: name ? `${name} · ${brand}` : brand });
      this.meta.updateTag({ property: 'og:description', content: description });
    });
  }

  /** Set a specific title for a detail page (a thinker's name, say). */
  setTitle(name: string): void {
    this.override.title = name;
    this.title.setTitle(`${name} · ${this.i18n.t('brand.name')}`);
  }

  clearTitle(): void {
    this.override.title = '';
  }
}
