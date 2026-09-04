/* ==========================================================================
   footer.component.ts — brand blurb, three link columns, disclaimer, copyright.

   Columns are derived from the same NAV arrays the header uses, so a route
   added there appears here without a second edit.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { IconComponent } from './icon.component';
import { BrandMarkComponent } from './brand-mark.component';
import { NAV_MORE, NAV_PRIMARY, NavLink } from './header.component';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, BrandMarkComponent],
  template: `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">

      <div>
        <a class="brand" routerLink="/" style="margin-bottom:.9rem">
          <app-brand-mark />
          <span class="brand-name">{{ i18n.t('brand.name') }}</span>
        </a>
        <p class="t-body muted" style="max-width:34ch">{{ i18n.t('footer.about') }}</p>
      </div>

      @for (column of columns; track column.headKey) {
        <div>
          <p class="footer-head">{{ i18n.t(column.headKey) }}</p>
          @for (link of column.links; track link.path) {
            <a class="footer-link" [routerLink]="link.path">{{ i18n.t(link.key) }}</a>
          }
        </div>
      }

    </div>

    <div class="card-flat footer-note">
      <span class="footer-note-icon"><app-icon name="info" cls="icon-sm" /></span>
      <p class="t-micro" style="letter-spacing:0;line-height:1.65">
        <strong class="strong">{{ i18n.t('footer.disclaimer') }}.</strong>
        {{ i18n.t('footer.disclaimerBody') }}
      </p>
    </div>

    <hr class="rule" style="margin:2.5rem 0 1.5rem">
    <p class="t-micro">
      &copy; {{ year }} {{ i18n.t('brand.name') }} · {{ i18n.t('footer.rights') }}
    </p>

  </div>
</footer>
  `
})
export class FooterComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly year = new Date().getFullYear();

  protected readonly columns: { headKey: string; links: NavLink[] }[] = [
    { headKey: 'footer.explore', links: NAV_PRIMARY.slice(1, 5) },
    { headKey: 'footer.learn',   links: [NAV_PRIMARY[5], NAV_MORE[0], NAV_MORE[1], NAV_MORE[2]] },
    {
      headKey: 'footer.legal',
      links: [
        { path: '/contact', key: 'nav.contact',    icon: 'mail' },
        { path: '/privacy', key: 'footer.privacy', icon: 'shield' },
        { path: '/terms',   key: 'footer.terms',   icon: 'book-open' }
      ]
    }
  ];
}
