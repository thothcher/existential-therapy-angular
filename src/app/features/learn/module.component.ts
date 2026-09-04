/* ==========================================================================
   module.component.ts — one module, one step at a time.

   A step is the smallest thing a reader can finish, and the page shows exactly
   one of them. That is the whole point of the format: a catalogue page hands
   you everything at once and lets you skim, and skimming is what has been
   happening on this platform. Here you cannot see step four until you have
   dealt with step three.

   The slug is a signal derived from the route, so a link from one module to
   another rebuilds the view — the same reason thinker-detail reads its slug
   that way rather than in ngOnInit.

   Steps are marked done as they are passed, never retroactively: a `visit`
   counts once its link has been opened, a `quiz` once it has been answered
   (right or wrong — the explanation is the teaching, not the score), and a
   `reflect` once something has been written. Nothing here is a test.
   ========================================================================== */

import {
  ChangeDetectionStrategy, Component, computed, effect, inject, signal, untracked
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { SeoService } from '../../core/services/seo.service';
import { CURRICULUM } from '../../core/data/curriculum.data';
import { IconComponent } from '../../shared/components/icon.component';
import type { ModuleStep } from '../../core/models';

@Component({
  selector: 'app-module',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
@if (module(); as module) {
  <section class="page-head">
    <div class="wrap">
      <a class="link-draw" routerLink="/learn" style="margin-bottom:1.75rem">
        <app-icon name="arrow-left" cls="icon-sm" />{{ i18n.t('learn.title') }}
      </a>

      <p class="t-micro">
        {{ i18n.t('learn.moduleOf', { index: module.order, total: modules.length }) }}
        · {{ i18n.t('learn.minutes', { count: module.minutes }) }}
      </p>
      <h1 class="t-title" style="margin-top:.6rem;font-size:clamp(1.9rem,4vw,2.75rem)">
        {{ i18n.pick(module.title) }}
      </h1>

      <!-- Step pips: position without a scrollbar's worth of guesswork. -->
      <div class="step-pips" [attr.aria-label]="i18n.t('learn.stepOf', { index: index() + 1, total: module.steps.length })">
        @for (step of module.steps; track step.id; let i = $index) {
          <button type="button" class="pip"
                  [class.is-current]="i === index()"
                  [class.is-done]="store.isStepDone(module.id, step.id)"
                  [attr.aria-current]="i === index() ? 'step' : null"
                  [attr.aria-label]="i18n.pick(step.title)"
                  (click)="go(i)"></button>
        }
      </div>
    </div>
  </section>

  <section class="wrap" style="padding-bottom:6rem">
    @if (step(); as step) {
      <article class="step-card">
        <p class="t-micro" style="color:var(--accent)">
          {{ i18n.t('learn.kind.' + step.kind) }}
        </p>
        <h2 class="t-subtitle" style="margin-top:.5rem;font-size:1.375rem">
          {{ i18n.pick(step.title) }}
        </h2>

        @switch (step.kind) {

          @case ('read') {
            <div class="prose t-body" style="margin-top:1.25rem">
              @for (paragraph of paragraphs(step); track $index) { <p>{{ paragraph }}</p> }
            </div>
          }

          @case ('visit') {
            <p class="t-body" style="margin-top:1.25rem">{{ i18n.pick(step.body) }}</p>
            @if (step.link; as link) {
              <a class="visit-card group" [routerLink]="link.path" (click)="markVisited(step)">
                <span>
                  <span class="t-micro muted">{{ i18n.t('learn.opensPage') }}</span>
                  <span class="t-subtitle" style="display:block;margin-top:.2rem;font-size:1.0625rem">
                    {{ i18n.pick(link.label) }}
                  </span>
                </span>
                <app-icon name="arrow-up-right" />
              </a>
              @if (!store.isStepDone(module.id, step.id)) {
                <p class="t-micro muted" style="margin-top:.75rem">{{ i18n.t('learn.visitHint') }}</p>
              }
            }
          }

          @case ('quiz') {
            <p class="t-body" style="margin-top:1.25rem">{{ i18n.pick(step.body) }}</p>
            <div class="quiz-options">
              @for (option of step.options ?? []; track $index; let o = $index) {
                <button type="button" class="quiz-option"
                        [class.is-picked]="answer() === o"
                        [class.is-correct]="answer() !== null && option.correct"
                        [disabled]="answer() !== null"
                        (click)="pick(step, o)">
                  <span class="quiz-mark" aria-hidden="true">
                    @if (answer() !== null && option.correct) { <app-icon name="check" cls="icon-sm" /> }
                    @else if (answer() === o) { <app-icon name="x" cls="icon-sm" /> }
                  </span>
                  <span>
                    <span class="t-body">{{ i18n.pick(option.text) }}</span>
                    @if (answer() !== null && (answer() === o || option.correct)) {
                      <span class="t-micro muted" style="display:block;margin-top:.5rem">
                        {{ i18n.pick(option.why) }}
                      </span>
                    }
                  </span>
                </button>
              }
            </div>
          }

          @case ('reflect') {
            <p class="t-body" style="margin-top:1.25rem">{{ i18n.pick(step.body) }}</p>
            <textarea class="field" rows="5" style="margin-top:1rem"
                      [attr.aria-label]="i18n.pick(step.title)"
                      [value]="store.note(step.id)"
                      (input)="onReflect(step, $event)"></textarea>
            <p class="t-micro muted" style="margin-top:.5rem">{{ i18n.t('learn.savedLocally') }}</p>
          }
        }

        <div class="step-actions">
          <button type="button" class="btn btn-ghost" [disabled]="index() === 0" (click)="go(index() - 1)">
            <app-icon name="arrow-left" cls="icon-sm" />{{ i18n.t('common.previous') }}
          </button>

          @if (index() < module.steps.length - 1) {
            <button type="button" class="btn btn-primary" (click)="advance(step)">
              {{ i18n.t('common.next') }}<app-icon name="arrow-right" cls="icon-sm" />
            </button>
          } @else {
            <button type="button" class="btn btn-primary" (click)="advance(step)">
              {{ i18n.t('learn.finishModule') }}<app-icon name="check" cls="icon-sm" />
            </button>
          }
        </div>
      </article>

      <!-- Shown only once the last step is behind you. -->
      @if (justFinished()) {
        <div class="card outcomes" style="margin-top:2rem">
          <p class="t-micro" style="color:var(--accent)">
            <app-icon name="circle-check" cls="icon-sm" /> {{ i18n.t('learn.moduleDone') }}
          </p>
          <h2 class="t-subtitle" style="margin-top:.75rem;font-size:1.125rem">
            {{ i18n.t('learn.outcomes') }}
          </h2>
          <ul class="flow-list" style="margin-top:.75rem">
            @for (outcome of i18n.pickList(module.outcomes); track outcome) { <li>{{ outcome }}</li> }
          </ul>
          <div style="display:flex;gap:.75rem;margin-top:1.5rem;flex-wrap:wrap">
            @if (nextModule(); as onward) {
              <a class="btn btn-primary" [routerLink]="['/learn', onward.slug]">
                {{ i18n.t('learn.nextModule') }}: {{ i18n.pick(onward.title) }}
                <app-icon name="arrow-right" cls="icon-sm" />
              </a>
            }
            <a class="btn btn-ghost" routerLink="/learn">{{ i18n.t('learn.backToPath') }}</a>
          </div>
        </div>
      }
    }
  </section>
} @else {
  <section class="section">
    <div class="wrap" style="text-align:center;max-width:34rem">
      <p class="t-subtitle">{{ i18n.t('learn.notFound') }}</p>
      <a class="btn btn-ghost" routerLink="/learn" style="margin-top:1.5rem">
        {{ i18n.t('learn.title') }}
      </a>
    </div>
  </section>
}
  `
})
export class ModuleComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);

  protected readonly modules = CURRICULUM;

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map(params => params.get('slug') ?? '')),
    { initialValue: '' }
  );

  protected readonly module = computed(() =>
    CURRICULUM.find(entry => entry.slug === this.slug()) ?? null
  );

  protected readonly index = signal(0);
  /** Which option was chosen on the current quiz step, if any. */
  protected readonly answer = signal<number | null>(null);
  protected readonly justFinished = signal(false);

  protected readonly step = computed<ModuleStep | null>(() => {
    const steps = this.module()?.steps ?? [];
    return steps[this.index()] ?? null;
  });

  protected readonly nextModule = computed(() => {
    const order = this.module()?.order ?? 0;
    return CURRICULUM.find(entry => entry.order === order + 1) ?? null;
  });

  constructor() {
    // Position. Depends on the route and nothing else: the stored progress is
    // read untracked because finishing a step writes to that same store, and a
    // tracked read would re-run this effect on every answer and throw the
    // reader back to the first unfinished step mid-module.
    effect(() => {
      const module = this.module();
      this.answer.set(null);
      this.justFinished.set(false);
      if (!module) return;

      const done = untracked(() => this.store.moduleProgress(module.id).steps);
      const firstUnfinished = module.steps.findIndex(step => !done.includes(step.id));
      this.index.set(firstUnfinished === -1 ? 0 : firstUnfinished);
    });

    // Title follows the route and the language, so it is its own effect.
    effect(() => {
      const module = this.module();
      if (module) this.seo.setTitle(this.i18n.pick(module.title));
    });
  }

  protected paragraphs(step: ModuleStep): string[] {
    return this.i18n.pick(step.body).split('\n\n').filter(Boolean);
  }

  protected go(to: number): void {
    this.index.set(to);
    this.answer.set(null);
    this.justFinished.set(false);
  }

  /** A quiz teaches through its explanation, so any answer completes the step. */
  protected pick(step: ModuleStep, option: number): void {
    if (this.answer() !== null) return;
    this.answer.set(option);
    this.done(step);
  }

  protected markVisited(step: ModuleStep): void {
    this.done(step);
  }

  protected onReflect(step: ModuleStep, event: Event): void {
    const text = (event.target as HTMLTextAreaElement).value;
    this.store.saveNote(step.id, text);
    if (text.trim()) this.done(step);
  }

  /** Next / Finish. Reading and reflecting count as done by moving on. */
  protected advance(step: ModuleStep): void {
    const module = this.module();
    if (!module) return;

    this.done(step);

    if (this.index() < module.steps.length - 1) {
      this.go(this.index() + 1);
      return;
    }
    this.justFinished.set(true);
  }

  private done(step: ModuleStep): void {
    const module = this.module();
    if (module) this.store.completeStep(module.id, step.id, module.steps.length);
  }

}
