/* ==========================================================================
   reveal.directive.ts — scroll-triggered fade and rise.

   Ports the CBT RevealDirective, keeping its one-shot semantics (unobserve on
   first intersection) and its stagger convention, with three corrections:

   1. It never hides content it might fail to reveal. The CBT version set
      opacity to 0 and relied on an observer to restore it, which is why its
      roadmap's final marker — whose observed id did not exist — stayed
      invisible permanently. Here anything already in view on load is revealed
      immediately, and no observer means no hiding at all.
   2. Under prerendering the element must render visible, or the static HTML
      ships with everything at opacity 0 for anyone without JavaScript.
   3. The transition lives in CSS keyed off a custom property, rather than
      being written as an inline transition string from TypeScript.
   ========================================================================== */

import { isPlatformBrowser } from '@angular/common';
import {
  Directive, ElementRef, OnDestroy, OnInit, PLATFORM_ID, Renderer2, inject, input
} from '@angular/core';

export type RevealDirection = 'up' | 'left' | 'right' | 'fade';

@Directive({
  selector: '[appReveal]',
  host: { '[attr.data-reveal]': 'appReveal() || "up"' }
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly appReveal = input<RevealDirection | ''>('up');
  readonly appRevealDelay = input(0);

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const host = this.el.nativeElement;

    // No browser (prerender), no observer support, or reduced motion:
    // show it now and never touch it again.
    if (!this.isBrowser || !('IntersectionObserver' in window) || this.reducedMotion()) {
      this.renderer.addClass(host, 'is-revealed');
      return;
    }

    const delay = this.appRevealDelay();
    if (delay) this.renderer.setStyle(host, '--reveal-delay', `${delay}ms`);

    // Above-the-fold content is revealed at once, so it never waits for a
    // scroll that may never come.
    const rect = host.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      this.renderer.addClass(host, 'is-revealed');
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          this.renderer.addClass(host, 'is-revealed');
          this.observer?.unobserve(host);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private reducedMotion(): boolean {
    try {
      return matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  }
}
