/* ==========================================================================
   app.ts — the root shell.

   Mirrors the CBT root component: header, routed outlet, footer. Without the
   custom cursor, which set `cursor: none !important` on the whole document.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header.component';
import { FooterComponent } from './shared/components/footer.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog.component';
import { I18nService } from './core/services/i18n.service';
import { ThemeService } from './core/services/theme.service';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ConfirmDialogComponent],
  template: `
    <a class="skip-link" href="#main">{{ i18n.t('nav.skip') }}</a>
    <app-header />
    <main id="main">
      <router-outlet />
    </main>
    <app-footer />

    <!-- Mounted once here so any feature can ask a question. -->
    <app-confirm-dialog />
  `,
  styles: [':host { display: contents; }']
})
export class App {
  protected readonly i18n = inject(I18nService);

  // Instantiated for their side effects: the theme effect writes the class on
  // <html>, and the SEO effect keeps title and description in step with both
  // the route and the active language.
  private readonly theme = inject(ThemeService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.init();
  }
}
