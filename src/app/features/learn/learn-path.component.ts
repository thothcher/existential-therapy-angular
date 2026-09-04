/* ==========================================================================
   learn-path.component.ts — the course, seen whole.

   The one page on this platform with a first item and a last one. Everything
   else is a catalogue you enter sideways; this is the thread through them.

   Nothing is locked. A hard prerequisite chain would be the obvious thing to
   build and the wrong one: this is free material for people arriving with very
   different backgrounds, and a clinician who wants module six today should get
   module six. The order is a recommendation the page makes visible — through
   numbering, through completion state, and through one "continue here" marker
   on the first unfinished module — rather than a gate.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { CURRICULUM, TOTAL_STEPS } from '../../core/data/curriculum.data';
import { IconComponent } from '../../shared/components/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-learn-path',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, RevealDirective],
  template: `
<section class="page-head">
  <div class="wrap">
    <div class="page-head-grid">
      <div class="page-head-title">
        <p class="t-eyebrow"><span>{{ i18n.t('learn.eyebrow') }}</span></p>
        <h1 class="t-title" style="margin-top:1rem">{{ i18n.t('learn.title') }}</h1>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted">{{ i18n.t('learn.lead') }}</p>
      </div>
    </div>

    <!-- One bar for the whole course. The number that matters is how much is
         left, so it leads with steps rather than with a percentage. -->
    <div class="course-meter" appReveal="fade">
      <div class="course-meter-top">
        <p class="t-micro">
          {{ i18n.t('learn.doneOf', { done: doneSteps(), total: total }) }}
          @if (modulesDone()) {
            <span class="muted"> · {{ i18n.t('learn.modulesDone', { count: modulesDone() }) }}</span>
          }
        </p>
        <p class="t-micro" style="color:var(--accent)">{{ percent() }}%</p>
      </div>
      <div class="meter" role="progressbar" [attr.aria-valuenow]="percent()"
           aria-valuemin="0" aria-valuemax="100"
           [attr.aria-label]="i18n.t('learn.title')">
        <span class="meter-fill" [style.width.%]="percent()"></span>
      </div>

      <div class="course-meter-actions">
        @if (next(); as module) {
          <a class="btn btn-primary" [routerLink]="['/learn', module.slug]">
            {{ doneSteps() ? i18n.t('learn.continue') : i18n.t('learn.start') }}
            <app-icon name="arrow-right" cls="icon-sm" />
          </a>
          <p class="t-micro muted">{{ i18n.pick(module.title) }}</p>
        } @else {
          <p class="t-body" style="color:var(--accent)">
            <app-icon name="circle-check" cls="icon-sm" /> {{ i18n.t('learn.allDone') }}
          </p>
        }
        @if (doneSteps()) {
          <button type="button" class="btn btn-quiet btn-sm" (click)="reset()">
            <app-icon name="rotate-ccw" cls="icon-sm" />{{ i18n.t('learn.reset') }}
          </button>
        }
      </div>
    </div>
  </div>
</section>

<section class="wrap" style="padding-bottom:6rem">
  <ol class="module-list">
    @for (module of modules; track module.id; let i = $index) {
      <li appReveal [appRevealDelay]="i * 60">
        <a class="module-row group" [routerLink]="['/learn', module.slug]"
           [class.is-done]="isDone(module.id)"
           [class.is-next]="next()?.id === module.id">

          <span class="module-index" aria-hidden="true">
            @if (isDone(module.id)) {
              <app-icon name="check" cls="icon-sm" />
            } @else {
              {{ pad(module.order) }}
            }
          </span>

          <span class="module-main">
            <span class="module-title">
              <h2 class="t-subtitle">{{ i18n.pick(module.title) }}</h2>
              @if (next()?.id === module.id && doneSteps()) {
                <span class="chip chip-accent">{{ i18n.t('learn.youAreHere') }}</span>
              }
            </span>
            <p class="t-body muted" style="margin-top:.4rem">{{ i18n.pick(module.summary) }}</p>

            <span class="module-meta t-micro">
              <span><app-icon name="clock" cls="icon-sm" />{{ i18n.t('learn.minutes', { count: module.minutes }) }}</span>
              <span><app-icon name="list-checks" cls="icon-sm" />{{ i18n.t('learn.steps', { count: module.steps.length }) }}</span>
              @if (stepsDone(module.id); as done) {
                <span style="color:var(--accent)">{{ done }}/{{ module.steps.length }}</span>
              }
            </span>
          </span>

          <span class="module-go" aria-hidden="true"><app-icon name="arrow-right" cls="icon-sm" /></span>
        </a>
      </li>
    }
  </ol>
</section>
  `
})
export class LearnPathComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);
  private readonly confirm = inject(ConfirmService);

  protected readonly modules = CURRICULUM;
  protected readonly total = TOTAL_STEPS;

  protected readonly doneSteps = computed(() =>
    this.modules.reduce((sum, module) => sum + this.store.moduleProgress(module.id).steps.length, 0)
  );

  protected readonly percent = computed(() =>
    this.total ? Math.round((this.doneSteps() / this.total) * 100) : 0
  );

  protected readonly modulesDone = computed(() =>
    this.modules.filter(module => this.isDone(module.id)).length
  );

  /** The first module with anything left in it — where "continue" points. */
  protected readonly next = computed(() =>
    this.modules.find(module => !this.isDone(module.id)) ?? null
  );

  protected isDone(moduleId: string): boolean {
    return this.store.moduleProgress(moduleId).completedAt !== null;
  }

  protected stepsDone(moduleId: string): number {
    return this.store.moduleProgress(moduleId).steps.length;
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  protected async reset(): Promise<void> {
    const confirmed = await this.confirm.ask({
      title: this.i18n.t('learn.resetTitle'),
      message: this.i18n.t('learn.resetConfirm'),
      confirmLabel: this.i18n.t('common.delete'),
      cancelLabel: this.i18n.t('common.cancel'),
      icon: 'rotate-ccw'
    });
    if (!confirmed) return;
    this.store.resetCourse();
  }
}
