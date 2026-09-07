/* ==========================================================================
   home.component.ts — the landing page.

   Section rhythm follows the CBT home page (hero, stats, concept grid, people,
   techniques, cases, exercises, closing CTA) on a completely different layout:
   an asymmetric grid the content deliberately does not fill.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { IconComponent } from '../../shared/components/icon.component';
import { PlateComponent } from '../../shared/components/plate.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { HeroSceneComponent } from '../../shared/components/hero-scene.component';
import { GAMES } from '../games/games.catalogue';
import { CURRICULUM, TOTAL_STEPS } from '../../core/data/curriculum.data';

const FEATURED_THINKERS = ['frankl', 'yalom', 'heidegger', 'may', 'sartre', 'kierkegaard'];

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, PlateComponent, RevealDirective, ParallaxDirective, HeroSceneComponent],
  template: `
<!-- ================= hero =================
     Full-bleed and dark in both themes. The WebGL field carries the depth the
     rest of the site draws flat; where it cannot run, the gradient and grain
     underneath are the design rather than a gap. -->
<section class="hero-immersive">
  <app-hero-scene />
  <div class="hero-veil" aria-hidden="true"></div>

  <div class="wrap hero-inner on-plate">
    <p class="t-eyebrow" appReveal="fade"><span>{{ i18n.t('home.hero.eyebrow') }}</span></p>
    <h1 class="t-display hero-headline" appReveal [appRevealDelay]="80">
      {{ i18n.t('home.hero.title') }}
    </h1>
    <p class="t-lead measure" style="margin-top:1.5rem" appReveal [appRevealDelay]="160">
      {{ i18n.t('home.hero.lead') }}
    </p>

    <div class="hero-actions" appReveal [appRevealDelay]="240">
      <a class="btn btn-primary" routerLink="/learn">
        <span>{{ i18n.t('home.hero.cta') }}</span>
        <app-icon name="arrow-right" cls="icon-sm" />
      </a>
      <a class="btn btn-on-dark" routerLink="/givens">{{ i18n.t('home.hero.secondary') }}</a>
    </div>

    <figure class="hero-caption-quiet" appReveal [appRevealDelay]="320">
      <blockquote class="t-body" style="margin:0">{{ i18n.t('home.hero.caption') }}</blockquote>
    </figure>
  </div>

  <div class="hero-scroll" aria-hidden="true">
    <app-icon name="arrow-down" cls="icon-sm" />
  </div>
</section>

<section class="wrap" style="padding-block:3.5rem 0">
  <div class="stats">
    @for (stat of stats(); track stat.key; let i = $index) {
      <div appReveal [appRevealDelay]="i * 70">
        <span class="stat-num">{{ stat.value }}</span>
        <span class="t-micro">{{ i18n.t(stat.key) }}</span>
      </div>
    }
  </div>
</section>

<!-- ================= the four givens ================= -->
<section class="section">
  <div class="wrap">
    <div class="page-head-grid" style="margin-bottom:3rem">
      <div class="page-head-title">
        <p class="t-eyebrow" appReveal="fade"><span>{{ i18n.t('home.givens.eyebrow') }}</span></p>
        <h2 class="t-title" style="margin-top:1rem" appReveal>{{ i18n.t('home.givens.title') }}</h2>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted" appReveal [appRevealDelay]="90">{{ i18n.t('home.givens.lead') }}</p>
      </div>
    </div>

    <div class="givens-grid">
      @for (given of store.givens(); track given.id; let i = $index) {
        <a class="card card-xl card-hover given-card"
           [routerLink]="['/givens']" [fragment]="given.id"
           appReveal [appRevealDelay]="i * 70">
          <div class="plate" aria-hidden="true">
            <img [src]="given.image + '?auto=format&fit=crop&w=900&q=70'" alt="" loading="lazy">
          </div>
          <div class="given-card-body on-plate"
               style="min-height:15rem;display:flex;flex-direction:column">
            <div style="display:flex;align-items:center;gap:.75rem">
              <span style="color:var(--a-300)"><app-icon [name]="given.icon" /></span>
              <span class="given-index" style="color:var(--a-300)">{{ pad(given.order) }}</span>
            </div>
            <h3 class="t-subtitle" style="margin-top:auto;padding-top:2.5rem;color:#F2F5F9">
              {{ i18n.pick(given.title) }}
            </h3>
            <p class="t-micro" style="margin-top:.35rem;color:rgba(242,245,249,.6);letter-spacing:.02em">
              {{ given.original }}
            </p>
            <p class="t-body" style="margin-top:.85rem;color:rgba(242,245,249,.82);max-width:46ch">
              {{ i18n.pick(given.tagline) }}
            </p>
          </div>
        </a>
      }
    </div>
  </div>
</section>

<!-- ================= the course =================
     Directly after the givens, because that is the moment a first-time reader
     has seen enough to want an order and has not yet been handed six
     catalogues. Shows a resume bar once there is progress to resume. -->
<section class="section">
  <div class="wrap">
    <div class="resume" appReveal="fade">
      @if (courseStarted()) {
        <div>
          <p class="t-eyebrow"><span>{{ i18n.t('home.resume.eyebrow') }}</span></p>
          <h2 class="t-subtitle" style="margin-top:.6rem">{{ i18n.t('home.resume.title') }}</h2>
          @if (nextModule(); as module) {
            <p class="t-body muted" style="margin-top:.4rem">{{ i18n.pick(module.title) }}</p>
          }
          <div class="meter resume-bar">
            <span class="meter-fill" [style.width.%]="coursePercent()"></span>
          </div>
        </div>
        <a class="btn btn-primary" [routerLink]="nextModule() ? ['/learn', nextModule()!.slug] : ['/learn']">
          {{ i18n.t('learn.continue') }}<app-icon name="arrow-right" cls="icon-sm" />
        </a>
      } @else {
        <div>
          <p class="t-eyebrow"><span>{{ i18n.t('home.learn.eyebrow') }}</span></p>
          <h2 class="t-subtitle" style="margin-top:.6rem">{{ i18n.t('home.learn.title') }}</h2>
          <p class="t-body muted measure" style="margin-top:.5rem">{{ i18n.t('home.learn.lead') }}</p>
        </div>
        <a class="btn btn-primary" routerLink="/learn">
          {{ i18n.t('home.learn.cta') }}<app-icon name="arrow-right" cls="icon-sm" />
        </a>
      }
    </div>
  </div>
</section>

<!-- ================= divider ================= -->
<section class="divider-bleed bleed" aria-labelledby="quoteHeading">
  <img src="https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=1800&q=80"
       alt="" loading="lazy"
       [appParallax]="0.04" [appParallaxClamp]="34"
       style="transform: translate3d(0, var(--parallax, 0px), 0)">
  <div class="divider-inner on-plate">
    <span style="display:inline-block;opacity:.5"><app-icon name="quote" cls="icon-lg" /></span>
    <blockquote id="quoteHeading" class="serif"
                style="font-size:clamp(1.375rem,2.6vw,1.875rem);line-height:1.45;margin:1.5rem 0 0">
      {{ i18n.t('home.quote.text') }}
    </blockquote>
    <p class="t-micro" style="margin-top:1.5rem;color:rgba(242,245,249,.7)">
      {{ i18n.t('home.quote.author') }}
    </p>
  </div>
</section>

<!-- ================= thinkers ================= -->
<section class="section">
  <div class="wrap">
    <div class="page-head-grid" style="margin-bottom:3rem">
      <div class="page-head-title">
        <p class="t-eyebrow" appReveal="fade"><span>{{ i18n.t('home.thinkers.eyebrow') }}</span></p>
        <h2 class="t-title" style="margin-top:1rem" appReveal>{{ i18n.t('home.thinkers.title') }}</h2>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted" appReveal [appRevealDelay]="90">{{ i18n.t('home.thinkers.lead') }}</p>
        <a class="link-draw" routerLink="/thinkers" style="margin-top:1rem">
          <span>{{ i18n.t('common.seeAll') }}</span>
          <app-icon name="arrow-right" cls="icon-sm" />
        </a>
      </div>
    </div>

    <div class="thinker-index">
      @for (thinker of featured(); track thinker.slug; let i = $index) {
        <a class="thinker-item group" [routerLink]="['/thinkers', thinker.slug]"
           appReveal [appRevealDelay]="i * 70">
          <div class="plate plate-hover">
            @if (thinker.portrait; as portrait) {
              <img [src]="portrait.src" alt="" aria-hidden="true"
                   width="480" height="600" loading="lazy" decoding="async" />
            } @else {
              <app-plate [seed]="thinker.plate" />
            }
          </div>
          <p class="t-micro">{{ years(thinker) }} · {{ i18n.pick(thinker.tradition) }}</p>
          <h3 class="t-subtitle" style="margin-top:.3rem">{{ i18n.pick(thinker.name) }}</h3>
          <p class="t-body muted" style="margin-top:.5rem">{{ i18n.pick(thinker.summary) }}</p>
          <span class="link-draw" style="margin-top:.85rem">
            {{ i18n.t('common.readMore') }}<app-icon name="arrow-right" cls="icon-sm" />
          </span>
        </a>
      }
    </div>
  </div>
</section>

<!-- ================= practices ================= -->
<section class="section" style="background:var(--surface-2)">
  <div class="wrap">
    <div class="page-head-grid" style="margin-bottom:2rem">
      <div class="page-head-title">
        <p class="t-eyebrow" appReveal="fade"><span>{{ i18n.t('home.practices.eyebrow') }}</span></p>
        <h2 class="t-title" style="margin-top:1rem" appReveal>{{ i18n.t('home.practices.title') }}</h2>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted" appReveal [appRevealDelay]="90">{{ i18n.t('home.practices.lead') }}</p>
      </div>
    </div>

    <div class="rows">
      @for (practice of store.practices(); track practice.slug; let i = $index) {
        <a class="row-item" [routerLink]="['/practices', practice.slug]"
           appReveal [appRevealDelay]="i * 60">
          <span class="row-num">{{ pad(practice.order) }}</span>
          <div>
            <h3 class="t-subtitle">{{ i18n.pick(practice.title) }}</h3>
            <p class="t-micro" style="margin-top:.25rem">{{ practice.original }}</p>
          </div>
          <p class="t-body muted">{{ i18n.pick(practice.summary) }}</p>
          <span class="row-arrow"><app-icon name="arrow-right" /></span>
        </a>
      }
    </div>
  </div>
</section>

<!-- ================= scenarios ================= -->
<section class="section">
  <div class="wrap">
    <div class="page-head-grid" style="margin-bottom:3rem">
      <div class="page-head-title">
        <p class="t-eyebrow" appReveal="fade"><span>{{ i18n.t('home.scenarios.eyebrow') }}</span></p>
        <h2 class="t-title" style="margin-top:1rem" appReveal>{{ i18n.t('home.scenarios.title') }}</h2>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted" appReveal [appRevealDelay]="90">{{ i18n.t('home.scenarios.lead') }}</p>
        <a class="link-draw" routerLink="/scenarios" style="margin-top:1rem">
          <span>{{ i18n.t('common.seeAll') }}</span>
          <app-icon name="arrow-right" cls="icon-sm" />
        </a>
      </div>
    </div>

    <div class="stack-lg">
      @for (scenario of previewScenarios(); track scenario.id; let i = $index) {
        <div class="scenario-split" [class.is-flipped]="i % 2 === 1"
             appReveal [appRevealDelay]="i * 80">
          @if (i % 2 === 1) {
            <div class="split-narrow">
              <p class="hanging-quote">{{ opening(scenario.situation) }}</p>
            </div>
          }
          <div class="split-wide">
            <a class="card card-xl card-hover card-sweep" [routerLink]="['/scenarios', scenario.id]">
              <div style="display:flex;align-items:center;gap:.75rem;color:var(--accent)">
                <app-icon [name]="scenario.icon" cls="icon-sm" />
                <span class="t-micro" style="color:var(--accent)">{{ i18n.pick(scenario.person) }}</span>
              </div>
              <h3 class="t-subtitle" style="margin-top:1rem">{{ i18n.pick(scenario.title) }}</h3>
              <p class="t-body muted" style="margin-top:.85rem">
                {{ i18n.pick(scenario.reflectionPrompt) }}
              </p>
              <span class="link-draw" style="margin-top:1.25rem">
                {{ i18n.t('common.readMore') }}<app-icon name="arrow-right" cls="icon-sm" />
              </span>
            </a>
          </div>
          @if (i % 2 === 0) {
            <div class="split-narrow">
              <p class="hanging-quote">{{ opening(scenario.situation) }}</p>
            </div>
          }
        </div>
      }
    </div>
  </div>
</section>

<!-- ================= exercises ================= -->
<section class="section" style="background:var(--surface-2)">
  <div class="wrap">
    <div class="page-head-grid" style="margin-bottom:2.5rem">
      <div class="page-head-title">
        <p class="t-eyebrow" appReveal="fade"><span>{{ i18n.t('home.games.eyebrow') }}</span></p>
        <h2 class="t-title" style="margin-top:1rem" appReveal>{{ i18n.t('home.games.title') }}</h2>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted" appReveal [appRevealDelay]="90">{{ i18n.t('home.games.lead') }}</p>
      </div>
    </div>

    <div class="game-grid">
      @for (game of games; track game.id; let i = $index) {
        <a class="card card-hover card-sweep game-card" [routerLink]="game.path"
           appReveal [appRevealDelay]="i * 70">
          <span class="game-card-icon"><app-icon [name]="game.icon" /></span>
          <h3 class="t-subtitle" style="font-size:1.125rem">{{ i18n.t(game.titleKey) }}</h3>
          <p class="t-body muted" style="font-size:.9375rem">{{ i18n.t(game.shortKey) }}</p>
          <p class="t-micro" style="margin-top:auto;padding-top:.75rem"
             [class.is-accent]="!!store.gameProgress(game.id)"
             [class.is-faint]="!store.gameProgress(game.id)">
            {{ progressLabel(game.id) }}
          </p>
        </a>
      }
    </div>
  </div>
</section>

<!-- ================= the conversation ================= -->
<section class="section">
  <div class="wrap">
    <div class="resume" appReveal="fade">
      <div>
        <p class="t-eyebrow"><span>{{ i18n.t('chat.eyebrow') }}</span></p>
        <h2 class="t-subtitle" style="margin-top:.6rem">{{ i18n.t('chat.title') }}</h2>
        <p class="t-body muted measure" style="margin-top:.5rem">{{ i18n.t('chat.lead') }}</p>
      </div>
      <a class="btn btn-primary" routerLink="/chat">
        {{ i18n.t('chat.begin') }}<app-icon name="arrow-right" cls="icon-sm" />
      </a>
    </div>
  </div>
</section>

<!-- ================= closing ================= -->
<section class="section">
  <div class="wrap">
    <div class="cta-band" appReveal>
      <div>
        <h2 class="t-subtitle">{{ i18n.t('home.cta.title') }}</h2>
        <p class="t-body muted" style="margin-top:.75rem;max-width:48ch">{{ i18n.t('home.cta.lead') }}</p>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:.75rem">
        <a class="btn btn-primary" routerLink="/givens">
          <span>{{ i18n.t('nav.givens') }}</span>
          <app-icon name="arrow-right" cls="icon-sm" />
        </a>
        <a class="btn btn-ghost" routerLink="/vs-cbt">{{ i18n.t('nav.vscbt') }}</a>
      </div>
    </div>
  </div>
</section>
  `
})
export class HomeComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);
  protected readonly games = GAMES;

  /* ---- the course band ---------------------------------------------------
     A first-time visitor sees the invitation; a returning one sees where they
     stopped. Both are the same block, because two blocks would compete. */

  private readonly stepsDone = computed(() =>
    CURRICULUM.reduce((sum, module) => sum + this.store.moduleProgress(module.id).steps.length, 0)
  );

  protected readonly courseStarted = computed(() => this.stepsDone() > 0);

  protected readonly coursePercent = computed(() =>
    TOTAL_STEPS ? Math.round((this.stepsDone() / TOTAL_STEPS) * 100) : 0
  );

  /** First module with anything left in it. */
  protected readonly nextModule = computed(() =>
    CURRICULUM.find(module => this.store.moduleProgress(module.id).completedAt === null) ?? null
  );

  protected readonly stats = computed(() => [
    { key: 'home.stats.givens', value: this.store.givens().length },
    { key: 'home.stats.thinkers', value: this.store.thinkers().length },
    { key: 'home.stats.scenarios', value: this.store.scenarios().length },
    { key: 'home.stats.games', value: GAMES.length }
  ]);

  protected readonly featured = computed(() =>
    FEATURED_THINKERS
      .map(slug => this.store.thinkers().find(t => t.slug === slug))
      .filter((t): t is NonNullable<typeof t> => !!t)
  );

  protected readonly previewScenarios = computed(() => this.store.scenarios().slice(0, 3));

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  protected years(thinker: { birthYear: number; deathYear: number | null }): string {
    return `${thinker.birthYear}–${thinker.deathYear ?? ''}`;
  }

  /** The first sentence of a vignette, used as the hanging quotation. */
  protected opening(situation: { ka: string; en: string }): string {
    const text = this.i18n.pick(situation);
    return text.split('\n\n')[0].split('. ')[0] + '.';
  }

  protected progressLabel(gameId: string): string {
    const progress = this.store.gameProgress(gameId);
    return progress
      ? `${this.i18n.t('games.progress.best')} · ${progress.best}/${progress.bestTotal}`
      : this.i18n.t('games.progress.none');
  }
}
