/* ==========================================================================
   icon.component.ts — renders one inlined Lucide glyph.

   Usage:  <app-icon name="compass" />
           <app-icon name="arrow-right" cls="icon-sm" />

   The path data is trusted, repo-authored constant markup, so binding it
   through DomSanitizer.bypassSecurityTrustHtml is safe here — nothing user
   supplied ever reaches it. Sanitised once and cached per name + class,
   because these render hundreds of times per page.

   The whole <svg> is built as a string and written into a plain HTML wrapper,
   rather than binding [innerHTML] on an <svg> element in the template. The
   latter reads better but throws NotYetImplemented under prerendering: the
   server DOM does not implement the innerHTML setter on SVGSVGElement, and
   the thrown error aborted the component's render, so every icon was missing
   from the static HTML until hydration replaced it — exactly what inlining
   the geometry was meant to avoid. PlateComponent writes its SVG the same
   way for the same reason.

   Both wrappers are display: contents, so the svg stays a layout child of
   whatever contains the <app-icon> and positioning rules keep working.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICON_PATHS } from '../../core/data/icons.data';

const CACHE = new Map<string, SafeHtml>();

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [innerHTML]="svg()"></span>`,
  styles: [
    ':host { display: contents; }',
    'span { display: contents; }'
  ]
})
export class IconComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly name = input.required<string>();
  readonly cls = input('');

  protected readonly svg = computed<SafeHtml | null>(() => {
    const name = this.name();
    const body = ICON_PATHS[name];
    if (!body) return null;   // unknown name renders nothing, never throws

    const cls = this.cls();
    const key = `${name}|${cls}`;
    let cached = CACHE.get(key);
    if (!cached) {
      // cls comes from templates in this repo, but it lands in an attribute,
      // so quotes are escaped rather than trusted.
      const attr = `icon ${cls}`.trim().replace(/"/g, '&quot;');
      cached = this.sanitizer.bypassSecurityTrustHtml(
        `<svg class="${attr}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">` +
          body +
        '</svg>'
      );
      CACHE.set(key, cached);
    }
    return cached;
  });
}
