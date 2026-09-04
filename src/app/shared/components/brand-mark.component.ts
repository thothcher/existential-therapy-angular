/* ==========================================================================
   brand-mark.component.ts — the logo.

   A threshold: an open doorway drawn as a single aperture with a horizon line
   passing through it. Being, and the opening onto it.

   Inline rather than <img src="mark.svg"> so it inherits currentColor and
   costs no second request.
   ========================================================================== */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-brand-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg class="brand-mark" viewBox="0 0 32 32" fill="none" stroke="currentColor"
         stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M8 29V14a8 8 0 0 1 16 0v15" />
      <path d="M2 21h6" opacity=".45" />
      <path d="M24 21h6" opacity=".45" />
      <circle cx="16" cy="21" r="2.4" />
    </svg>
  `,
  styles: [':host { display: contents; }']
})
export class BrandMarkComponent {}
