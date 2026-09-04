/* ==========================================================================
   plate.component.ts — a deterministic abstract plate for each thinker.

   The CBT platform illustrated every psychologist with an unrelated stock
   photograph of a stranger, which reads as a portrait and is not one. Rather
   than repeat that, each thinker carries a numeric seed and this component
   renders a composition from it: a horizon, a light source, a few long arcs
   and some faint verticals.

   Same seed, same image, every load — so a thinker's plate becomes a
   recognisable mark rather than random decoration. Being deterministic also
   means it prerenders identically to what the browser later hydrates.

   Colour comes entirely from three CSS custom properties, so the plate
   follows the theme like everything else.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/** Mulberry32 — small, fast, fully deterministic. */
function rng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPlate(seed: number, label: string): string {
  const random = rng(seed || 1);
  const uid = `p${seed || 1}`;

  const horizon = 58 + random() * 22;          // 58-80% of height
  const sunX = 18 + random() * 64;
  const sunY = horizon - (6 + random() * 22);
  const sunR = 5 + random() * 7;
  const arcCount = 3 + Math.floor(random() * 3);

  let arcs = '';
  for (let i = 0; i < arcCount; i++) {
    const y = horizon + 4 + i * (4 + random() * 7);
    const lift = 2 + random() * 9;
    const opacity = (0.32 - i * 0.05).toFixed(2);
    arcs +=
      `<path d="M-5 ${y.toFixed(1)} Q 50 ${(y - lift).toFixed(1)} 105 ${y.toFixed(1)}" ` +
      `fill="none" stroke="currentColor" stroke-width="0.6" opacity="${opacity}"/>`;
  }

  let verticals = '';
  const vCount = 2 + Math.floor(random() * 4);
  for (let v = 0; v < vCount; v++) {
    const x = (8 + random() * 84).toFixed(1);
    const h = 6 + random() * 26;
    verticals +=
      `<line x1="${x}" y1="${horizon.toFixed(1)}" x2="${x}" y2="${(horizon - h).toFixed(1)}" ` +
      `stroke="currentColor" stroke-width="0.5" opacity="0.18"/>`;
  }

  const a11y = label
    ? `role="img" aria-label="${label.replace(/"/g, '&quot;')}"`
    : 'aria-hidden="true"';

  return (
    `<svg class="plate-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" ${a11y}>` +
      '<defs>' +
        `<linearGradient id="${uid}sky" x1="0" y1="0" x2="0" y2="1">` +
          '<stop offset="0%" stop-color="var(--plate-top)"/>' +
          '<stop offset="100%" stop-color="var(--plate-bottom)"/>' +
        '</linearGradient>' +
        `<radialGradient id="${uid}glow" cx="${sunX.toFixed(1)}%" cy="${sunY.toFixed(1)}%" r="55%">` +
          '<stop offset="0%" stop-color="var(--plate-glow)" stop-opacity="0.85"/>' +
          '<stop offset="100%" stop-color="var(--plate-glow)" stop-opacity="0"/>' +
        '</radialGradient>' +
      '</defs>' +
      `<rect width="100" height="100" fill="url(#${uid}sky)"/>` +
      `<rect width="100" height="100" fill="url(#${uid}glow)"/>` +
      `<circle cx="${sunX.toFixed(1)}" cy="${sunY.toFixed(1)}" r="${sunR.toFixed(1)}" ` +
        'fill="var(--plate-glow)" opacity="0.5"/>' +
      `<g color="var(--plate-line)">${verticals}` +
        `<line x1="-5" y1="${horizon.toFixed(1)}" x2="105" y2="${horizon.toFixed(1)}" ` +
          'stroke="currentColor" stroke-width="0.7" opacity="0.5"/>' +
        arcs +
      '</g>' +
    '</svg>'
  );
}

@Component({
  selector: 'app-plate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [innerHTML]="svg()"></span>`,
  styles: [
    ':host { display: block; width: 100%; height: 100%; }',
    'span { display: block; width: 100%; height: 100%; }'
  ]
})
export class PlateComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly seed = input.required<number>();
  readonly label = input('');

  protected readonly svg = computed<SafeHtml>(() =>
    // Generated from a number and a label we escape ourselves; no user input.
    this.sanitizer.bypassSecurityTrustHtml(buildPlate(this.seed(), this.label()))
  );
}
