/* ==========================================================================
   givens.component.ts — the four ultimate concerns as a scroll narrative.

   The structural counterpart of the CBT roadmap, with its two defects fixed:
   that component hid every step behind an IntersectionObserver watching an id
   (#final) no element had, so the last block stayed invisible permanently; and
   its active-section tracking ran an unthrottled handler on every scroll
   event. Reveal here can never hide what it fails to show, and the jump-nav
   uses an observer with no scroll handler at all.
   ========================================================================== */

import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy,
  PLATFORM_ID, inject, signal
} from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { IconComponent } from '../../shared/components/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';

@Component({
  selector: 'app-givens',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RevealDirective, ParallaxDirective],
  template: `
<section class="page-head">
  <div class="wrap">
    <div class="page-head-grid">
      <div class="page-head-title">
        <p class="t-eyebrow"><span>{{ i18n.t('nav.givens') }}</span></p>
        <h1 class="t-title" style="margin-top:1rem">{{ i18n.t('givens.title') }}</h1>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted">{{ i18n.t('givens.lead') }}</p>
      </div>
    </div>

    <nav class="filter-bar" style="margin-top:2.5rem" [attr.aria-label]="i18n.t('givens.nav')">
      @for (given of store.givens(); track given.id) {
        <a class="chip chip-btn" [class.chip-active]="active() === given.id"
           [href]="'#' + given.id" (click)="jump($event, given.id)">
          <app-icon [name]="given.icon" cls="icon-sm" />{{ i18n.pick(given.title) }}
        </a>
      }
    </nav>
  </div>
</section>

<section class="wrap" style="padding-bottom:2rem">
  <div class="card card-xl" style="max-width:52rem" appReveal>
    <h2 class="t-subtitle">{{ i18n.t('givens.intro.title') }}</h2>
    <p class="t-body muted" style="margin-top:.85rem">{{ i18n.t('givens.intro.body') }}</p>
  </div>
</section>

@for (given of store.givens(); track given.id; let i = $index) {
  <section class="section" [attr.id]="given.id"
           [class.bg-alt]="i % 2 === 1">
    <div class="wrap">

      <div class="scenario-split" [class.is-flipped]="i % 2 === 1" style="align-items:start">
        @if (i % 2 === 1) {
          <div class="split-narrow">
            <div class="plate plate-portrait plate-scrim" appReveal>
              <img [src]="given.image + '?auto=format&fit=crop&w=900&q=75'"
                   [alt]="i18n.pick(given.imageAlt)" loading="lazy"
                   [appParallax]="0.03" [appParallaxClamp]="22"
                   style="transform:translate3d(0,var(--parallax,0px),0) scale(1.06)">
            </div>
          </div>
        }

        <div class="split-wide">
          <p class="given-index" appReveal="fade">{{ pad(given.order) }}</p>
          <h2 class="t-title" style="margin-top:.75rem" appReveal>{{ i18n.pick(given.title) }}</h2>
          <p class="t-micro" style="margin-top:.5rem">{{ given.original }}</p>
          <p class="hanging-quote" style="margin-top:1.5rem" appReveal [appRevealDelay]="80">
            {{ i18n.pick(given.tagline) }}
          </p>
          <p class="t-body muted measure" style="margin-top:1.5rem" appReveal [appRevealDelay]="140">
            {{ i18n.pick(given.definition) }}
          </p>
        </div>

        @if (i % 2 === 0) {
          <div class="split-narrow">
            <div class="plate plate-portrait plate-scrim" appReveal>
              <img [src]="given.image + '?auto=format&fit=crop&w=900&q=75'"
                   [alt]="i18n.pick(given.imageAlt)" loading="lazy"
                   [appParallax]="0.03" [appParallaxClamp]="22"
                   style="transform:translate3d(0,var(--parallax,0px),0) scale(1.06)">
            </div>
          </div>
        }
      </div>

      <div class="grid12" style="margin-top:3.5rem">
        <div class="card" style="grid-column:1/-1" appReveal>
          <h3 class="t-subtitle" style="font-size:1.125rem;display:flex;align-items:center;gap:.6rem">
            <span style="color:var(--accent)"><app-icon name="circle-dot" cls="icon-sm" /></span>
            {{ i18n.t('givens.section.manifest') }}
          </h3>
          <ul class="flow-list t-body" style="margin-top:1rem">
            @for (item of i18n.pickList(given.manifest); track item) { <li>{{ item }}</li> }
          </ul>
        </div>
      </div>

      <div class="scenario-split" style="margin-top:1.5rem;align-items:start">
        <div class="split-narrow">
          <div class="card" style="height:100%" appReveal [appRevealDelay]="60">
            <h3 class="t-subtitle" style="font-size:1.125rem;display:flex;align-items:center;gap:.6rem">
              <span style="color:var(--accent)"><app-icon name="shield" cls="icon-sm" /></span>
              {{ i18n.t('givens.section.defenses') }}
            </h3>
            <ul class="flow-list t-body" style="margin-top:1rem">
              @for (item of i18n.pickList(given.defenses); track item) { <li>{{ item }}</li> }
            </ul>
          </div>
        </div>
        <div class="split-wide">
          <div class="card card-sweep" style="height:100%" appReveal [appRevealDelay]="120">
            <h3 class="t-subtitle" style="font-size:1.125rem;display:flex;align-items:center;gap:.6rem">
              <span style="color:var(--accent)"><app-icon name="compass" cls="icon-sm" /></span>
              {{ i18n.t('givens.section.stance') }}
            </h3>
            <p class="t-body muted" style="margin-top:1rem">{{ i18n.pick(given.stance) }}</p>
          </div>
        </div>
      </div>

      <div style="margin-top:2.5rem" appReveal>
        <p class="t-eyebrow"><span>{{ i18n.t('givens.section.voices') }}</span></p>
        <div class="scenario-split" style="margin-top:1.25rem;align-items:start">
          @for (voice of i18n.pickList(given.voices); track voice; let vi = $index) {
            <div [class]="vi === 0 ? 'split-wide' : 'split-narrow'">
              <p class="hanging-quote">{{ voice }}</p>
            </div>
          }
        </div>
      </div>

    </div>
  </section>
}

<section class="section">
  <div class="wrap">
    <div class="cta-band" appReveal>
      <div>
        <h2 class="t-subtitle">{{ i18n.t('games.givens.title') }}</h2>
        <p class="t-body muted" style="margin-top:.75rem;max-width:52ch">
          {{ i18n.t('games.givens.lead') }}
        </p>
      </div>
      <a class="btn btn-primary" href="/games/givens">
        <span>{{ i18n.t('common.start') }}</span>
        <app-icon name="arrow-right" cls="icon-sm" />
      </a>
    </div>
  </div>
</section>
  `
})
export class GivensComponent implements AfterViewInit, OnDestroy {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly active = signal<string | null>(null);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!this.isBrowser || !('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) this.active.set(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    for (const given of this.store.givens()) {
      const section = this.host.nativeElement.querySelector(`#${CSS.escape(given.id)}`);
      if (section) this.observer.observe(section);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  /** Scroll rather than navigate, so the fragment does not reload the route. */
  protected jump(event: Event, id: string): void {
    if (!this.isBrowser) return;
    event.preventDefault();
    const target = this.host.nativeElement.querySelector(`#${CSS.escape(id)}`);
    target?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
  }
}
