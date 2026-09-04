/* ==========================================================================
   scenario-detail.component.ts — situation, reflection, then the reveal.

   The order is the whole point: the therapeutic response stays behind a
   deliberate action, so the reader thinks first.

   CBT simulated this as a chat with an LLM persona and then scored the
   therapist with an English keyword rubric, which scored near zero for any
   session held in Georgian. Nothing here is scored at all — the reader's own
   note is saved, per scenario, and restored on return.
   ========================================================================== */

import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy,
  PLATFORM_ID, computed, effect, inject, signal, viewChild
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { SeoService } from '../../core/services/seo.service';
import { IconComponent } from '../../shared/components/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import type { Bilingual } from '../../core/models';

@Component({
  selector: 'app-scenario-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, RevealDirective],
  template: `
@if (scenario(); as s) {
  <section class="page-head">
    <div class="wrap">
      <a class="link-draw no-print" routerLink="/scenarios" style="margin-bottom:1.75rem">
        <app-icon name="arrow-left" cls="icon-sm" />{{ i18n.t('nav.scenarios') }}
      </a>

      <div class="page-head-grid">
        <div class="page-head-title">
          <div style="display:flex;align-items:center;gap:.85rem;color:var(--accent)">
            <app-icon [name]="s.icon" cls="icon-lg" />
            <span class="t-micro" style="color:var(--accent)">{{ i18n.pick(s.person) }}</span>
          </div>
          <h1 class="t-title" style="margin-top:1rem">{{ i18n.pick(s.title) }}</h1>
        </div>
        <div class="page-head-aside">
          <div class="tags">
            @for (givenId of s.concernIds; track givenId) {
              @if (store.given(givenId); as given) {
                <a class="chip chip-accent chip-btn" routerLink="/givens" [fragment]="given.id">
                  <app-icon [name]="given.icon" cls="icon-sm" />{{ i18n.pick(given.title) }}
                </a>
              }
            }
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="wrap" style="padding-bottom:5rem">
    <div class="detail-grid">
      <div class="stack-lg">

        <article class="prose t-body measure" appReveal>
          @for (paragraph of paragraphs(s.situation); track $index) { <p>{{ paragraph }}</p> }
        </article>

        <div class="card card-xl card-sweep" appReveal>
          <p class="t-eyebrow"><span>{{ i18n.t('scenarios.reflect') }}</span></p>
          <p class="t-subtitle" style="margin-top:1rem">{{ i18n.pick(s.reflectionPrompt) }}</p>
          <p class="t-micro" style="margin-top:.85rem">{{ i18n.t('scenarios.reflectHint') }}</p>

          <div style="margin-top:1.5rem" class="no-print">
            <label class="field-label" for="scenarioNote">{{ i18n.t('scenarios.yourNote') }}</label>
            <textarea class="field" id="scenarioNote" rows="4" #noteField
                      [placeholder]="i18n.t('scenarios.notePlaceholder')"
                      [value]="initialNote()"
                      (input)="onNoteInput($event)"
                      (blur)="flushNote()"></textarea>
            <p class="t-micro" role="status" aria-live="polite"
               style="margin-top:.5rem;min-height:1.2em">{{ noteStatus() }}</p>
          </div>
        </div>

        @if (!revealed()) {
          <div class="no-print" appReveal>
            <button type="button" class="btn btn-primary"
                    aria-expanded="false" aria-controls="revealPanel"
                    (click)="reveal()">
              <app-icon name="book-open" cls="icon-sm" />{{ i18n.t('scenarios.reveal') }}
            </button>
          </div>
        }

        <div class="card card-xl settle" id="revealPanel" [hidden]="!revealed()">
          <p class="t-eyebrow"><span>{{ i18n.t('scenarios.response') }}</span></p>
          <div class="prose t-body" style="margin-top:1.25rem" tabindex="-1" #revealBody>
            @for (paragraph of paragraphs(s.therapistResponse); track $index) { <p>{{ paragraph }}</p> }
          </div>
        </div>

      </div>

      <aside class="detail-aside stack no-print">
        @if (practice(); as p) {
          <div class="card">
            <p class="t-eyebrow"><span>{{ i18n.t('scenarios.practice') }}</span></p>
            <h2 class="t-subtitle" style="font-size:1.0625rem;margin-top:.85rem">
              {{ i18n.pick(p.title) }}
            </h2>
            <p class="t-body muted" style="margin-top:.5rem;font-size:.9375rem">
              {{ i18n.pick(p.summary) }}
            </p>
            <a class="link-draw" style="margin-top:1rem" [routerLink]="['/practices', p.slug]">
              {{ i18n.t('common.readMore') }}<app-icon name="arrow-right" cls="icon-sm" />
            </a>
          </div>
        }

        <div class="card">
          <p class="t-micro">{{ position() }} / {{ store.scenarios().length }}</p>
          @if (next(); as n) {
            <a class="link-draw" style="margin-top:.85rem" [routerLink]="['/scenarios', n.id]">
              {{ i18n.pick(n.title) }}<app-icon name="arrow-right" cls="icon-sm" />
            </a>
          }
        </div>

        <button type="button" class="btn btn-ghost btn-sm" (click)="print()">
          <app-icon name="printer" cls="icon-sm" />{{ i18n.t('common.print') }}
        </button>
      </aside>
    </div>
  </section>
} @else {
  <section class="section">
    <div class="wrap" style="text-align:center;max-width:34rem">
      <p class="t-title">{{ i18n.t('scenarios.notFound') }}</p>
      <a class="btn btn-primary" style="margin-top:1.5rem" routerLink="/scenarios">
        <app-icon name="arrow-left" cls="icon-sm" />{{ i18n.t('nav.scenarios') }}
      </a>
    </div>
  </section>
}
  `
})
export class ScenarioDetailComponent implements OnDestroy {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly id = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('id') ?? '' }
  );

  protected readonly scenario = computed(() => this.store.scenario(this.id()));
  protected readonly revealed = signal(false);
  protected readonly noteStatus = signal('');

  private readonly revealBody = viewChild<ElementRef<HTMLElement>>('revealBody');
  private pending = '';
  private debounce?: ReturnType<typeof setTimeout>;

  /** Read once per scenario; the textarea owns its value after that. */
  protected readonly initialNote = computed(() => this.store.note(this.id()));

  protected readonly practice = computed(() => {
    const scenario = this.scenario();
    return scenario ? this.store.practice(scenario.practiceSlug) : null;
  });

  protected readonly position = computed(() => {
    const scenario = this.scenario();
    return scenario ? this.store.scenarios().indexOf(scenario) + 1 : 0;
  });

  protected readonly next = computed(() => {
    const all = this.store.scenarios();
    return all[this.position()] ?? all[0] ?? null;
  });

  constructor() {
    effect(() => {
      const scenario = this.scenario();
      if (scenario) this.seo.setTitle(this.i18n.pick(scenario.title));
      else this.seo.clearTitle();
      // A different vignette starts closed again.
      this.revealed.set(false);
    });
  }

  protected paragraphs(field: Bilingual): string[] {
    return this.i18n.pick(field).split('\n\n');
  }

  protected reveal(): void {
    this.revealed.set(true);
    // Move focus into the revealed text, so a keyboard user lands on the new
    // content rather than on a button that has just disappeared.
    queueMicrotask(() => this.revealBody()?.nativeElement.focus());
  }

  /* ---- the note: debounced while typing, flushed on the way out ---------- */

  protected onNoteInput(event: Event): void {
    this.pending = (event.target as HTMLTextAreaElement).value;
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => this.flushNote(), 400);
  }

  protected flushNote(): void {
    clearTimeout(this.debounce);
    const id = this.id();
    if (!id) return;
    this.store.saveNote(id, this.pending);
    this.noteStatus.set(this.pending.trim() ? this.i18n.t('scenarios.saved') : '');
  }

  // A note written and abandoned inside the debounce window must not be lost.
  @HostListener('window:pagehide')
  onPageHide(): void { this.flushNote(); }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (this.isBrowser && document.visibilityState === 'hidden') this.flushNote();
  }

  ngOnDestroy(): void { this.flushNote(); }

  protected print(): void {
    if (!this.isBrowser) return;
    this.revealed.set(true);   // printing should include the response
    queueMicrotask(() => window.print());
  }
}
