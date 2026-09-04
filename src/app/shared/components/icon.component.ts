/* ==========================================================================
   icon.component.ts — renders one inlined Lucide glyph.

   Usage:  <app-icon name="compass" />
           <app-icon name="arrow-right" cls="icon-sm" />

   The path data is trusted, repo-authored constant markup, so binding it
   through DomSanitizer.bypassSecurityTrustHtml is safe here — nothing user
   supplied ever reaches it. Sanitised once and cached per name, because these
   render hundreds of times per page.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICON_PATHS } from '../../core/data/icons.data';

const CACHE = new Map<string, SafeHtml>();

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (body()) {
      <svg [class]="'icon ' + cls()" viewBox="0 0 24 24" aria-hidden="true" focusable="false"
           [innerHTML]="body()"></svg>
    }
  `,
  styles: [':host { display: contents; }']
})
export class IconComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly name = input.required<string>();
  readonly cls = input('');

  protected readonly body = computed<SafeHtml | null>(() => {
    const key = this.name();
    if (!ICON_PATHS[key]) return null;   // unknown name renders nothing, never throws
    let cached = CACHE.get(key);
    if (!cached) {
      cached = this.sanitizer.bypassSecurityTrustHtml(ICON_PATHS[key]);
      CACHE.set(key, cached);
    }
    return cached;
  });
}
