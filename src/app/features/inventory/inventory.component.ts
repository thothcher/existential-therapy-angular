/* ==========================================================================
   inventory.component.ts — Frankl's meaning inventory.

   The existential counterpart to the CBT thought record: a short guided
   wizard, persisted, capped at twenty entries, with a real reset. The
   structure is deliberately parallel — a step table, a gate on advance, a
   completion summary, a history of past entries — because that feature is the
   most-used part of the CBT platform and the pattern earns its place.

   What differs is what it asks. A thought record tests a thought for accuracy.
   This asks where meaning is currently being found, along Frankl's three
   roads, and then what would remain if all of it were taken.

   Two accessibility gaps in the original are closed: every field has a real
   <label> (the CBT wizard used placeholders alone on three of five steps), and
   focus moves to the new step's field on advance.
   ========================================================================== */

import {
  ChangeDetectionStrategy, Component, ElementRef, computed, inject, signal, viewChild
} from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { IconComponent } from '../../shared/components/icon.component';
import type { InventoryEntry } from '../../core/models';

interface StepDef { key: string; field: FieldName; }
type FieldName = 'creative' | 'experiential' | 'attitudinal' | 'remains';

const STEPS: StepDef[] = [
  { key: 'step1', field: 'creative' },
  { key: 'step2', field: 'experiential' },
  { key: 'step3', field: 'attitudinal' },
  { key: 'step4', field: 'remains' }
];

function blank(): { text: Record<FieldName, string>; weight: Record<FieldName, number> } {
  return {
    text: { creative: '', experiential: '', attitudinal: '', remains: '' },
    weight: { creative: 50, experiential: 50, attitudinal: 50, remains: 50 }
  };
}

@Component({
  selector: 'app-inventory',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
<section class="page-head">
  <div class="wrap">
    <div class="page-head-grid">
      <div class="page-head-title">
        <p class="t-eyebrow"><span>{{ i18n.t('nav.inventory') }}</span></p>
        <h1 class="t-title" style="margin-top:1rem">{{ i18n.t('inventory.title') }}</h1>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted">{{ i18n.t('inventory.lead') }}</p>
        <p class="t-micro" style="margin-top:1rem;display:flex;gap:.5rem;align-items:flex-start">
          <span style="color:var(--accent)"><app-icon name="shield" cls="icon-sm" /></span>
          <span>{{ i18n.t('inventory.privacy') }}</span>
        </p>
      </div>
    </div>
  </div>
</section>

<section class="wrap" style="padding-bottom:6rem">
  <div class="detail-grid">

    <div>
      @if (!completed()) {
        <div class="wizard">
          <div style="display:flex;justify-content:space-between;align-items:baseline;gap:1rem">
            <p class="t-micro">{{ i18n.t('inventory.' + current().key + '.title') }}</p>
            <p class="t-micro">
              {{ i18n.t('inventory.step', { current: step() + 1, total: steps.length }) }}
            </p>
          </div>
          <div class="progress-track" style="margin-top:.5rem" role="progressbar"
               aria-valuemin="0" [attr.aria-valuemax]="steps.length" [attr.aria-valuenow]="step() + 1">
            <div class="progress-fill" [style.width.%]="((step() + 1) / steps.length) * 100"></div>
          </div>

          <div class="card card-xl" style="margin-top:1.5rem">
            <h2 class="t-subtitle">{{ i18n.t('inventory.' + current().key + '.title') }}</h2>
            <p class="t-body muted" style="margin-top:.75rem">
              {{ i18n.t('inventory.' + current().key + '.desc') }}
            </p>

            <div style="margin-top:1.5rem">
              <label class="field-label" for="stepField">
                {{ i18n.t('inventory.' + current().key + '.hint') }}
              </label>
              <textarea class="field" id="stepField" rows="5" #stepField
                        [value]="text()[current().field]"
                        (input)="onText($event)"></textarea>
              @if (showError()) {
                <p class="field-error" role="alert">{{ i18n.t('inventory.required') }}</p>
              }
            </div>

            <div style="margin-top:1.5rem">
              <label class="field-label" for="stepWeight">{{ i18n.t('inventory.weight') }}</label>
              <input type="range" class="range" id="stepWeight" min="0" max="100" step="1"
                     [value]="weight()[current().field]" (input)="onWeight($event)">
              <div class="range-legend">
                <span>{{ i18n.t('inventory.weightLow') }}</span>
                <span>{{ i18n.t('inventory.weightHigh') }}</span>
              </div>
            </div>
          </div>

          <div style="display:flex;gap:.75rem;margin-top:1.5rem;flex-wrap:wrap">
            <button type="button" class="btn btn-ghost"
                    [style.visibility]="step() === 0 ? 'hidden' : null" (click)="back()">
              <app-icon name="arrow-left" cls="icon-sm" />{{ i18n.t('common.previous') }}
            </button>
            <button type="button" class="btn btn-primary" (click)="advance()">
              {{ step() === steps.length - 1 ? i18n.t('common.finish') : i18n.t('common.continue') }}
              <app-icon name="arrow-right" cls="icon-sm" />
            </button>
          </div>
        </div>
      } @else {
        <div class="wizard">
          <div class="card card-xl settle">
            <p class="t-eyebrow"><span>{{ i18n.t('inventory.complete.title') }}</span></p>
            <p class="t-body muted" style="margin-top:1rem">{{ i18n.t('inventory.complete.lead') }}</p>

            <div style="margin-top:1.5rem">
              @for (definition of steps; track definition.field) {
                <div style="padding:1.15rem 0;border-bottom:1px solid var(--hairline)">
                  <div style="display:flex;justify-content:space-between;gap:1rem;align-items:baseline">
                    <p class="t-micro" style="color:var(--accent)">
                      {{ i18n.t('inventory.' + definition.key + '.title') }}
                    </p>
                    <p class="t-micro">{{ weight()[definition.field] }} / 100</p>
                  </div>
                  <div class="progress-track" style="margin-top:.5rem">
                    <div class="progress-fill" [style.width.%]="weight()[definition.field]"></div>
                  </div>
                  <p class="t-body" style="margin-top:.75rem;white-space:pre-wrap">
                    {{ text()[definition.field] }}
                  </p>
                </div>
              }
            </div>
          </div>

          <div style="display:flex;gap:.75rem;margin-top:1.5rem;flex-wrap:wrap">
            <button type="button" class="btn btn-primary" (click)="save()">
              <app-icon name="save" cls="icon-sm" />{{ i18n.t('inventory.saveEntry') }}
            </button>
            <button type="button" class="btn btn-ghost" (click)="reset()">
              <app-icon name="rotate-ccw" cls="icon-sm" />{{ i18n.t('inventory.newEntry') }}
            </button>
          </div>
        </div>
      }
    </div>

    <aside class="detail-aside">
      <h2 class="t-subtitle" style="font-size:1.0625rem">{{ i18n.t('inventory.history') }}</h2>
      <div class="stack-sm" style="margin-top:1rem">
        @for (entry of store.inventory(); track entry.id) {
          <details class="card-flat">
            <summary style="cursor:pointer;display:flex;justify-content:space-between;
                            gap:1rem;align-items:center">
              <span class="t-micro" style="color:var(--text-strong)">
                {{ i18n.t('inventory.entryFrom', { date: i18n.formatDate(entry.createdAt) }) }}
              </span>
              <span class="t-micro"><app-icon name="chevron-down" cls="icon-sm" /></span>
            </summary>
            <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--hairline)">
              @for (definition of steps; track definition.field) {
                @if (entryText(entry, definition.field)) {
                  <div style="margin-bottom:1rem">
                    <p class="t-micro" style="color:var(--accent)">
                      {{ i18n.t('inventory.' + definition.key + '.title') }}
                      · {{ entry.weight[definition.field] }}/100
                    </p>
                    <p class="t-body" style="margin-top:.35rem;font-size:.9375rem;white-space:pre-wrap">
                      {{ entryText(entry, definition.field) }}
                    </p>
                  </div>
                }
              }
              <button type="button" class="btn btn-quiet btn-sm"
                      (click)="store.deleteInventory(entry.id)">
                <app-icon name="trash-2" cls="icon-sm" />{{ i18n.t('inventory.deleteEntry') }}
              </button>
            </div>
          </details>
        } @empty {
          <p class="t-body muted">{{ i18n.t('inventory.historyEmpty') }}</p>
        }
      </div>
    </aside>

  </div>
</section>
  `
})
export class InventoryComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);
  protected readonly steps = STEPS;

  private readonly state = signal(blank());
  protected readonly text = computed(() => this.state().text);
  protected readonly weight = computed(() => this.state().weight);

  protected readonly step = signal(0);
  protected readonly completed = signal(false);
  protected readonly showError = signal(false);

  private readonly stepField = viewChild<ElementRef<HTMLTextAreaElement>>('stepField');

  protected readonly current = computed(() => STEPS[this.step()]);

  private canProceed(): boolean {
    return this.text()[this.current().field].trim().length > 0;
  }

  protected onText(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    const field = this.current().field;
    this.state.update(s => ({ ...s, text: { ...s.text, [field]: value } }));
    this.showError.set(false);
  }

  protected onWeight(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    const field = this.current().field;
    this.state.update(s => ({ ...s, weight: { ...s.weight, [field]: value } }));
  }

  protected advance(): void {
    if (!this.canProceed()) {
      this.showError.set(true);
      this.stepField()?.nativeElement.focus();
      return;
    }
    if (this.step() === STEPS.length - 1) {
      this.completed.set(true);
      return;
    }
    this.step.update(n => n + 1);
    this.focusField();
  }

  protected back(): void {
    if (this.step() > 0) this.step.update(n => n - 1);
    this.focusField();
  }

  protected save(): void {
    const entry: InventoryEntry = {
      id: this.uid(),
      createdAt: new Date().toISOString(),
      creative: this.text().creative,
      experiential: this.text().experiential,
      attitudinal: this.text().attitudinal,
      remains: this.text().remains,
      weight: { ...this.weight() }
    };
    this.store.saveInventory(entry);
    this.reset();
  }

  protected reset(): void {
    this.state.set(blank());
    this.step.set(0);
    this.completed.set(false);
    this.showError.set(false);
  }

  protected entryText(entry: InventoryEntry, field: FieldName): string {
    return entry[field];
  }

  /** Focus the new step's field, so a keyboard user is not left on a button
      that has just been replaced. The CBT wizard stranded focus here. */
  private focusField(): void {
    queueMicrotask(() => this.stepField()?.nativeElement.focus());
  }

  private uid(): string {
    try {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    } catch { /* fall through */ }
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }
}
