/* ==========================================================================
   auth.component.ts — sign in and register (demonstration only).

   The mode comes from the route's `data.mode`, so one component serves both.
   There is no password field anywhere in this flow: see the note at the top of
   auth.service.ts for why building one with nowhere to send it would be the
   wrong thing to ship.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { I18nService } from '../../core/services/i18n.service';
import { AuthService } from '../../core/services/auth.service';
import { IconComponent } from '../../shared/components/icon.component';

@Component({
  selector: 'app-auth',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule, IconComponent],
  template: `
<section class="section">
  <div class="wrap">
    <div class="scenario-split" style="align-items:center">

      <div class="split-narrow">
        <span class="demo-badge">
          <app-icon name="info" cls="icon-sm" />{{ i18n.t('common.demo') }}
        </span>

        <h1 class="t-title" style="margin-top:1.25rem">
          {{ i18n.t(isRegister() ? 'auth.register.title' : 'auth.login.title') }}
        </h1>
        <p class="t-body muted" style="margin-top:.85rem">
          {{ i18n.t(isRegister() ? 'auth.register.lead' : 'auth.login.lead') }}
        </p>

        <div class="card-flat" style="margin-top:1.5rem;display:flex;gap:.85rem;align-items:flex-start">
          <span style="color:var(--accent);flex:none;margin-top:.15rem">
            <app-icon name="shield" cls="icon-sm" />
          </span>
          <p class="t-micro" style="letter-spacing:0;line-height:1.65">
            {{ i18n.t('auth.demoNotice') }}
          </p>
        </div>

        <p class="t-micro" style="margin-top:1rem">{{ i18n.t('auth.hint') }}</p>
      </div>

      <div class="split-wide">
        @if (auth.currentUser(); as user) {
          <div class="card card-xl" style="max-width:30rem;margin-inline:auto">
            <span class="game-card-icon"><app-icon name="user" /></span>
            <h2 class="t-subtitle" style="margin-top:1rem">{{ user.name || user.email }}</h2>
            <p class="t-micro" style="margin-top:.35rem">
              {{ user.email }} ·
              {{ i18n.t(user.role === 'admin' ? 'admin.roleAdmin' : 'admin.roleUser') }}
            </p>
            <div style="display:flex;gap:.75rem;margin-top:1.5rem;flex-wrap:wrap">
              <a class="btn btn-primary" routerLink="/">{{ i18n.t('nav.home') }}</a>
              <button type="button" class="btn btn-ghost" (click)="auth.logout()">
                <app-icon name="log-out" cls="icon-sm" />{{ i18n.t('auth.logout') }}
              </button>
            </div>
          </div>
        } @else {
          <form class="card card-xl" style="max-width:30rem;margin-inline:auto" novalidate
                (ngSubmit)="submit()">
            @if (isRegister()) {
              <div>
                <label class="field-label" for="authName">{{ i18n.t('auth.name') }}</label>
                <input class="field" id="authName" type="text" autocomplete="name"
                       [(ngModel)]="name" name="authName">
              </div>
            }

            <div [style.margin-top]="isRegister() ? '1.25rem' : null">
              <label class="field-label" for="authEmail">{{ i18n.t('auth.email') }}</label>
              <input class="field" id="authEmail" type="email" autocomplete="email"
                     [(ngModel)]="email" name="authEmail">
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top:1.75rem;width:100%">
              <app-icon name="log-in" cls="icon-sm" />
              {{ i18n.t(isRegister() ? 'auth.create' : 'auth.enter') }}
            </button>

            <p role="status" aria-live="polite"
               class="t-micro is-accent" style="margin-top:1rem;min-height:1.2em">
              {{ status() }}
            </p>

            <a class="link-draw" style="margin-top:.5rem"
               [routerLink]="isRegister() ? '/login' : '/register'">
              {{ i18n.t(isRegister() ? 'auth.toLogin' : 'auth.toRegister') }}
            </a>
          </form>
        }
      </div>

    </div>
  </div>
</section>
  `
})
export class AuthComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected name = '';
  protected email = '';
  protected readonly status = signal('');

  private readonly mode = toSignal(
    this.route.data.pipe(map(data => (data['mode'] as string) ?? 'login')),
    { initialValue: (this.route.snapshot.data['mode'] as string) ?? 'login' }
  );

  protected readonly isRegister = computed(() => this.mode() === 'register');

  protected submit(): void {
    const email = this.email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.status.set(this.i18n.t('contact.errEmail'));
      return;
    }
    if (this.isRegister() && !this.name.trim()) {
      this.status.set(this.i18n.t('contact.errName'));
      return;
    }

    const result = this.isRegister()
      ? this.auth.register(this.name, email)
      : this.auth.login(email);

    if (!result.ok) {
      this.status.set(this.i18n.t(result.error));
      return;
    }

    this.status.set('');
    void this.router.navigateByUrl(this.next());
  }

  /** Only ever a local path, never a value that could carry an absolute URL. */
  private next(): string {
    const target = this.route.snapshot.queryParamMap.get('next') ?? '';
    return /^\/[A-Za-z0-9/_-]*$/.test(target) ? target : '/';
  }
}
