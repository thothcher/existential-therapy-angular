/* ==========================================================================
   contact.component.ts — a contact form with no server to post to.

   The CBT form posted to a hard-coded n8n webhook. There is no endpoint for
   this platform, so rather than invent one or silently swallow the message,
   the form validates locally and hands the composed text to the visitor: it
   opens their mail client, and offers a clipboard copy as a fallback for
   anyone without one configured.
   ========================================================================== */

import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../core/services/i18n.service';
import { IconComponent } from '../../shared/components/icon.component';

const ADDRESS = 'hello@example.org';   // replace with a real address before publishing

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, IconComponent],
  template: `
<section class="page-head">
  <div class="wrap">
    <div class="page-head-grid">
      <div class="page-head-title">
        <p class="t-eyebrow"><span>{{ i18n.t('nav.contact') }}</span></p>
        <h1 class="t-title" style="margin-top:1rem">{{ i18n.t('contact.title') }}</h1>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted">{{ i18n.t('contact.lead') }}</p>
      </div>
    </div>
  </div>
</section>

<section class="wrap" style="padding-bottom:6rem">
  <div class="detail-grid">

    <form class="card card-xl" style="max-width:38rem" novalidate (ngSubmit)="send()">
      <div>
        <label class="field-label" for="name">{{ i18n.t('contact.name') }}</label>
        <input class="field" id="name" type="text" autocomplete="name"
               [(ngModel)]="name" name="name"
               [attr.aria-invalid]="errors().name ? true : null">
        @if (errors().name) {
          <p class="field-error" role="alert">{{ i18n.t('contact.errName') }}</p>
        }
      </div>

      <div style="margin-top:1.25rem">
        <label class="field-label" for="email">{{ i18n.t('contact.email') }}</label>
        <input class="field" id="email" type="email" autocomplete="email"
               [(ngModel)]="email" name="email"
               [attr.aria-invalid]="errors().email ? true : null">
        @if (errors().email) {
          <p class="field-error" role="alert">{{ i18n.t('contact.errEmail') }}</p>
        }
      </div>

      <div style="margin-top:1.25rem">
        <label class="field-label" for="subject">{{ i18n.t('contact.subject') }}</label>
        <input class="field" id="subject" type="text" [(ngModel)]="subject" name="subject">
      </div>

      <div style="margin-top:1.25rem">
        <label class="field-label" for="message">{{ i18n.t('contact.message') }}</label>
        <textarea class="field" id="message" rows="6" [(ngModel)]="message" name="message"
                  [attr.aria-invalid]="errors().message ? true : null"></textarea>
        @if (errors().message) {
          <p class="field-error" role="alert">{{ i18n.t('contact.errMessage') }}</p>
        }
      </div>

      <div style="display:flex;gap:.75rem;margin-top:1.75rem;flex-wrap:wrap">
        <button type="submit" class="btn btn-primary">
          <app-icon name="send" cls="icon-sm" />{{ i18n.t('contact.send') }}
        </button>
        <button type="button" class="btn btn-ghost" (click)="copy()">
          <app-icon name="copy" cls="icon-sm" />{{ i18n.t('contact.copyInstead') }}
        </button>
      </div>

      <p class="t-micro" role="status" aria-live="polite"
         style="margin-top:1rem;min-height:1.2em;color:var(--text-muted)">{{ status() }}</p>
    </form>

    <aside class="detail-aside">
      <div class="card-flat" style="display:flex;gap:.85rem;align-items:flex-start">
        <span style="color:var(--accent);flex:none;margin-top:.15rem">
          <app-icon name="info" cls="icon-sm" />
        </span>
        <p class="t-micro" style="letter-spacing:0;line-height:1.65">
          {{ i18n.t('contact.notice') }}
        </p>
      </div>
    </aside>

  </div>
</section>
  `
})
export class ContactComponent {
  protected readonly i18n = inject(I18nService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected name = '';
  protected email = '';
  protected subject = '';
  protected message = '';

  protected readonly status = signal('');
  protected readonly errors = signal<{ name?: boolean; email?: boolean; message?: boolean }>({});

  private validate(): boolean {
    const errors = {
      name: !this.name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim()),
      message: !this.message.trim()
    };
    this.errors.set(errors);
    return !errors.name && !errors.email && !errors.message;
  }

  private compose(): string {
    return `${this.message.trim()}\n\n— ${this.name.trim()} <${this.email.trim()}>`;
  }

  protected send(): void {
    if (!this.validate()) {
      this.focusFirstError();
      return;
    }
    if (!this.isBrowser) return;
    const subject = this.subject.trim() || this.i18n.t('brand.name');
    location.href =
      `mailto:${ADDRESS}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(this.compose())}`;
    this.status.set(this.i18n.t('contact.opened'));
  }

  protected copy(): void {
    if (!this.validate()) {
      this.focusFirstError();
      return;
    }
    if (!this.isBrowser) return;

    const text = this.compose();
    const done = (): void => this.status.set(this.i18n.t('common.copied'));

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => this.fallbackCopy(text, done));
    } else {
      this.fallbackCopy(text, done);
    }
  }

  /** execCommand is deprecated but remains the only path in some contexts. */
  private fallbackCopy(text: string, done: () => void): void {
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
      done();
    } catch {
      this.status.set('');
    }
  }

  private focusFirstError(): void {
    if (!this.isBrowser) return;
    const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
    first?.focus();
  }
}
