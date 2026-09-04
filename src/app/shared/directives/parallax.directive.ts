/* ==========================================================================
   parallax.directive.ts — writes a `--parallax` custom property on a rAF loop.

   Ports the CBT ParallaxDirective, including the part worth keeping: the
   directive publishes an offset as a CSS custom property and lets the
   consumer compose it with whatever other transform it needs (a scale, say).
   The directive never owns `transform` itself.

   Work is gated on intersection, so off-screen elements cost nothing, and the
   whole thing is inert under prerendering and reduced motion.
   ========================================================================== */

import { isPlatformBrowser } from '@angular/common';
import {
  Directive, ElementRef, NgZone, OnDestroy, OnInit, PLATFORM_ID, inject, input
} from '@angular/core';

@Directive({ selector: '[appParallax]' })
export class ParallaxDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Fraction of scroll distance to translate by. */
  readonly appParallax = input(0.08);
  /** Maximum absolute offset in pixels. */
  readonly appParallaxClamp = input(48);

  private observer?: IntersectionObserver;
  private visible = false;
  private queued = false;
  private onScroll = (): void => this.schedule();

  ngOnInit(): void {
    if (!this.isBrowser || this.reducedMotion()) return;

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        entries => {
          for (const entry of entries) this.visible = entry.isIntersecting;
          this.schedule();
        },
        { rootMargin: '25% 0px 25% 0px', threshold: 0 }
      );
      this.observer.observe(this.el.nativeElement);
    } else {
      this.visible = true;
    }

    // Outside Angular: this fires on every scroll frame and must not trigger
    // change detection. It only writes a CSS variable.
    this.zone.runOutsideAngular(() => {
      addEventListener('scroll', this.onScroll, { passive: true });
      addEventListener('resize', this.onScroll, { passive: true });
      this.schedule();
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (!this.isBrowser) return;
    removeEventListener('scroll', this.onScroll);
    removeEventListener('resize', this.onScroll);
  }

  private schedule(): void {
    if (this.queued) return;
    this.queued = true;
    requestAnimationFrame(() => {
      this.queued = false;
      this.tick();
    });
  }

  private tick(): void {
    if (!this.visible) return;
    const host = this.el.nativeElement;
    const rect = host.getBoundingClientRect();
    const centre = rect.top + rect.height / 2;
    const raw = (window.innerHeight / 2 - centre) * this.appParallax();
    const clamp = this.appParallaxClamp();
    const offset = Math.min(clamp, Math.max(-clamp, raw));
    host.style.setProperty('--parallax', `${offset.toFixed(1)}px`);
  }

  private reducedMotion(): boolean {
    try {
      return matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  }
}
