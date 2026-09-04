/* ==========================================================================
   confirm-dialog.component.ts — renders whatever ConfirmService is asking.

   Mounted once in the root shell, so any feature can ask a question without
   carrying dialog markup of its own.

   Built on the native <dialog> with showModal(), which buys the parts that
   hand-rolled overlays usually get wrong: the top layer (no z-index race),
   a focus trap, the rest of the page made inert, and Escape to dismiss. Every
   exit route funnels through answer(), so the promise settles exactly once
   whether the reader clicks, presses Escape, or clicks the backdrop.

   Cancel comes first in the DOM, so showModal() lands focus there — the safe
   half of a destructive question, and the same reason it sits on the left.
   ========================================================================== */

import {
  ChangeDetectionStrategy, Component, ElementRef, PLATFORM_ID,
  effect, inject, viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConfirmService } from '../../core/services/confirm.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-confirm-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
<dialog #dlg class="modal" aria-labelledby="confirmTitle" aria-describedby="confirmBody"
        (close)="confirm.answer(false)" (click)="onDialogClick($event)">
  @if (confirm.request(); as request) {
    <div class="modal-panel">
      <div class="modal-head">
        <span class="modal-glyph" aria-hidden="true">
          <app-icon [name]="request.icon ?? 'triangle-alert'" />
        </span>
        <h2 class="t-subtitle" id="confirmTitle">{{ request.title }}</h2>
      </div>

      <p class="t-body muted" id="confirmBody">{{ request.message }}</p>

      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" (click)="confirm.answer(false)">
          {{ request.cancelLabel }}
        </button>
        <button type="button" class="btn btn-primary" (click)="confirm.answer(true)">
          {{ request.confirmLabel }}
        </button>
      </div>
    </div>
  }
</dialog>
  `,
  styles: [':host { display: contents; }']
})
export class ConfirmDialogComponent {
  protected readonly confirm = inject(ConfirmService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dlg');

  constructor() {
    effect(() => {
      const asking = this.confirm.request() !== null;
      const el = this.dialog()?.nativeElement;
      if (!el || !this.isBrowser) return;

      // showModal() on an already-open dialog throws, hence the open guards.
      if (asking && !el.open) el.showModal();
      else if (!asking && el.open) el.close();
    });
  }

  /**
   * A modal dialog reports itself as the target for backdrop clicks — the
   * panel and its contents report themselves — so this tells the two apart.
   */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog()?.nativeElement) this.confirm.answer(false);
  }
}
