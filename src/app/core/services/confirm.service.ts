/* ==========================================================================
   confirm.service.ts — the ask-before-destroying dialog, as a promise.

   Replaces window.confirm(). The native dialog is the browser's chrome, not
   the site's: it ignores the theme, ignores the type scale, cannot say more
   than one line, and on desktop announces the origin above the question —
   which reads like a security warning for something as ordinary as clearing
   your own progress.

   Call sites keep the shape they had, so a confirmation stays one line:

       if (!await this.confirm.ask({ ... })) return;

   Under prerendering there is nobody to ask, so ask() resolves false rather
   than hanging on a promise the server will never settle.
   ========================================================================== */

import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ConfirmRequest {
  title: string;
  /** One or two sentences. Say what is lost, and whether it comes back. */
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  /** IconComponent name for the glyph beside the title. */
  icon?: string;
}

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly requestSignal = signal<ConfirmRequest | null>(null);
  /** The question on screen, or null when nothing is being asked. */
  readonly request = this.requestSignal.asReadonly();

  private settle: ((confirmed: boolean) => void) | null = null;

  ask(request: ConfirmRequest): Promise<boolean> {
    if (!this.isBrowser) return Promise.resolve(false);

    // A second ask supersedes the first; the earlier one resolves as a cancel
    // so its caller unwinds instead of waiting forever.
    this.settle?.(false);

    return new Promise<boolean>(resolve => {
      this.settle = resolve;
      this.requestSignal.set(request);
    });
  }

  /**
   * Answer the open question. Called by the dialog for every exit — button,
   * Escape, backdrop — so answering twice has to be harmless.
   */
  answer(confirmed: boolean): void {
    const settle = this.settle;
    this.settle = null;
    this.requestSignal.set(null);
    settle?.(confirmed);
  }
}
