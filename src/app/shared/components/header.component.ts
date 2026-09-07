/* ==========================================================================
   header.component.ts — the bar, the overflow menu and the mobile drawer.

   NAV is the single source of navigation truth, as `navLinks` was in the CBT
   header — with one correction. In that app the glossary and thought-record
   routes existed but were absent from the array, so neither was reachable from
   the header. Here every route appears exactly once, either in the bar or in
   the overflow menu, and the drawer lists all of them.

   Popover and drawer behaviour closes three further gaps in the original:
   Escape closes them, an outside click closes them, and focus is trapped
   while open then restored on close. The drawer also locks body scroll.
   ========================================================================== */

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, ElementRef, HostListener, PLATFORM_ID,
  computed, inject, signal, viewChild
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';
import { IconComponent } from './icon.component';
import { BrandMarkComponent } from './brand-mark.component';

export interface NavLink {
  path: string;
  key: string;
  icon: string;
  /** Detail routes that should light up this link. */
  exact?: boolean;
}

/** Six in the bar is what the Georgian labels actually fit at 1240px. */
export const NAV_PRIMARY: NavLink[] = [
  { path: '/',           key: 'nav.home',       icon: 'house', exact: true },
  { path: '/learn',      key: 'nav.learn',      icon: 'graduation-cap' },
  { path: '/givens',     key: 'nav.givens',     icon: 'layers' },
  { path: '/thinkers',   key: 'nav.thinkers',   icon: 'users' },
  { path: '/practices',  key: 'nav.practices',  icon: 'compass' },
  { path: '/games',      key: 'nav.games',      icon: 'puzzle' }
];

/** The reference tools: one click behind "more", and listed in full in the drawer. */
export const NAV_MORE: NavLink[] = [
  { path: '/chat',      key: 'nav.chat',      icon: 'message-circle' },
  { path: '/scenarios', key: 'nav.scenarios', icon: 'quote' },
  { path: '/lexicon',   key: 'nav.lexicon',   icon: 'book-open' },
  { path: '/inventory', key: 'nav.inventory', icon: 'notebook-pen' },
  { path: '/vs-cbt',    key: 'nav.vscbt',     icon: 'scale' },
  { path: '/contact',   key: 'nav.contact',   icon: 'mail' }
];

export const NAV_ALL = [...NAV_PRIMARY, ...NAV_MORE];

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, IconComponent, BrandMarkComponent],
  template: `
<header class="site-header" [attr.data-scrolled]="scrolled()">
  <div class="wrap">
    <div class="header-bar">

      <a class="brand" routerLink="/">
        <app-brand-mark />
        <span class="brand-name">{{ i18n.t('brand.name') }}</span>
      </a>

      <nav class="nav-desktop" [attr.aria-label]="i18n.t('nav.primary')">
        @for (link of navPrimary; track link.path) {
          <a class="nav-link"
             [routerLink]="link.path"
             routerLinkActive="is-active"
             [routerLinkActiveOptions]="{ exact: !!link.exact }"
             #rla="routerLinkActive"
             [attr.aria-current]="rla.isActive ? 'page' : null">{{ i18n.t(link.key) }}</a>
        }

        <div class="more-wrap">
          <button type="button" class="nav-link more-btn" #moreBtn
                  aria-haspopup="menu" [attr.aria-expanded]="moreOpen()"
                  [attr.aria-current]="moreIsActive() ? 'page' : null"
                  (click)="toggleMore()">
            {{ i18n.t('nav.more') }}<app-icon name="chevron-down" cls="icon-sm" />
          </button>

          <div class="more-panel" role="menu" [hidden]="!moreOpen()" #morePanel>
            @for (link of navMore; track link.path) {
              <a class="drawer-link" role="menuitem" [routerLink]="link.path"
                 routerLinkActive="is-active" (click)="closeMore(false)">
                <app-icon [name]="link.icon" cls="icon-sm" />
                <span>{{ i18n.t(link.key) }}</span>
              </a>
            }
          </div>
        </div>
      </nav>

      <div class="header-actions">
        <div class="lang-switch header-wide-only" role="group" [attr.aria-label]="i18n.t('common.language')">
          <button type="button" class="lang-opt" [attr.aria-pressed]="i18n.lang() === 'ka'"
                  (click)="i18n.setLang('ka')">ქარ</button>
          <button type="button" class="lang-opt" [attr.aria-pressed]="i18n.lang() === 'en'"
                  (click)="i18n.setLang('en')">ENG</button>
        </div>

        <!-- Icon and label always describe the destination state. -->
        <button type="button" class="icon-btn"
                [attr.aria-label]="i18n.t(theme.isDark() ? 'common.themeLight' : 'common.themeDark')"
                (click)="theme.toggle()">
          <app-icon [name]="theme.isDark() ? 'sun' : 'moon'" />
        </button>

        @if (auth.currentUser(); as user) {
          <a class="icon-btn header-wide-only" routerLink="/admin"
             [attr.aria-label]="i18n.t('auth.account')" [title]="user.name">
            <app-icon name="user" />
          </a>
        } @else {
          <a class="icon-btn header-wide-only" routerLink="/login" [attr.aria-label]="i18n.t('meta.login')">
            <app-icon name="log-in" />
          </a>
        }

        <button type="button" class="icon-btn nav-toggle" #drawerBtn
                [attr.aria-label]="i18n.t('nav.open')"
                [attr.aria-expanded]="drawerOpen()" aria-controls="siteDrawer"
                (click)="openDrawer()">
          <app-icon name="menu" />
        </button>
      </div>

    </div>
  </div>
</header>

<!-- A real overlay panel, not the push-down block the CBT header used.
     [hidden] maps to display:none, which can't be transitioned — so closing
     stayed visible through .is-closing (which swaps in the reverse keyframes)
     until the panel's own slide-out animation reports finished. -->
<div class="drawer" id="siteDrawer" [hidden]="!drawerOpen() && !drawerClosing()"
     [class.is-closing]="drawerClosing()" (animationend)="onDrawerAnimationEnd($event)" #drawer>
  <div class="drawer-scrim" (click)="closeDrawer()"></div>
  <div class="drawer-panel" role="dialog" aria-modal="true"
       [attr.aria-label]="i18n.t('nav.primary')">
    <div class="drawer-top">
      <span class="t-micro">{{ i18n.t('nav.menu') }}</span>
      <button type="button" class="icon-btn" [attr.aria-label]="i18n.t('nav.close')"
              (click)="closeDrawer()">
        <app-icon name="x" />
      </button>
    </div>
    <nav [attr.aria-label]="i18n.t('nav.primary')">
      @for (link of navAll; track link.path) {
        <a class="drawer-link" [routerLink]="link.path"
           routerLinkActive="is-active"
           [routerLinkActiveOptions]="{ exact: !!link.exact }"
           (click)="closeDrawer()">
          <app-icon [name]="link.icon" cls="icon-sm" />
          <span>{{ i18n.t(link.key) }}</span>
        </a>
      }
    </nav>

    <!-- Only rendered where the bar has dropped them; see .drawer-foot. -->
    <div class="drawer-foot">
      @if (auth.currentUser(); as user) {
        <a class="drawer-link" routerLink="/admin" (click)="closeDrawer()">
          <app-icon name="user" cls="icon-sm" />
          <span>{{ user.name }}</span>
        </a>
      } @else {
        <a class="drawer-link" routerLink="/login" (click)="closeDrawer()">
          <app-icon name="log-in" cls="icon-sm" />
          <span>{{ i18n.t('meta.login') }}</span>
        </a>
      }

      <div class="drawer-lang">
        <span class="t-micro">{{ i18n.t('common.language') }}</span>
        <div class="lang-switch" role="group" [attr.aria-label]="i18n.t('common.language')">
          <button type="button" class="lang-opt" [attr.aria-pressed]="i18n.lang() === 'ka'"
                  (click)="i18n.setLang('ka')">ქარ</button>
          <button type="button" class="lang-opt" [attr.aria-pressed]="i18n.lang() === 'en'"
                  (click)="i18n.setLang('en')">ENG</button>
        </div>
      </div>
    </div>
  </div>
</div>
  `
})
export class HeaderComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly theme = inject(ThemeService);
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly navPrimary = NAV_PRIMARY;
  protected readonly navMore = NAV_MORE;
  protected readonly navAll = NAV_ALL;

  protected readonly scrolled = signal(false);
  protected readonly moreOpen = signal(false);
  protected readonly drawerOpen = signal(false);
  /** True for exactly as long as the close animation is playing. */
  protected readonly drawerClosing = signal(false);

  private readonly moreBtn = viewChild<ElementRef<HTMLButtonElement>>('moreBtn');
  private readonly morePanel = viewChild<ElementRef<HTMLElement>>('morePanel');
  private readonly drawerBtn = viewChild<ElementRef<HTMLButtonElement>>('drawerBtn');
  private readonly drawer = viewChild<ElementRef<HTMLElement>>('drawer');

  private releaseFocus: (() => void) | null = null;

  protected readonly moreIsActive = computed(() =>
    NAV_MORE.some(link => this.router.url.split('?')[0] === link.path)
  );

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.scrolled.set(scrollY > 8);
  }

  /* ---- overflow menu ---------------------------------------------------- */

  protected toggleMore(): void {
    this.moreOpen() ? this.closeMore(true) : this.openMore();
  }

  private openMore(): void {
    this.moreOpen.set(true);
    queueMicrotask(() => this.morePanel()?.nativeElement.querySelector('a')?.focus());
  }

  protected closeMore(restoreFocus: boolean): void {
    if (!this.moreOpen()) return;
    this.moreOpen.set(false);
    if (restoreFocus) this.moreBtn()?.nativeElement.focus();
  }

  /* ---- drawer ------------------------------------------------------------ */

  protected openDrawer(): void {
    this.drawerClosing.set(false);   // reopening mid-close cancels the exit
    this.drawerOpen.set(true);
    if (!this.isBrowser) return;
    this.doc.body.style.overflow = 'hidden';   // scroll lock, absent in the original
    queueMicrotask(() => {
      const panel = this.drawer()?.nativeElement;
      if (panel) this.releaseFocus = trapFocus(panel);
    });
  }

  protected closeDrawer(): void {
    if (!this.drawerOpen()) return;
    this.drawerOpen.set(false);
    this.drawerClosing.set(true);   // keeps the panel unhidden through its exit
    if (!this.isBrowser) return;
    this.doc.body.style.overflow = '';
    this.releaseFocus?.();
    this.releaseFocus = null;
    this.drawerBtn()?.nativeElement.focus();
  }

  /** [hidden] re-engages once the panel — not the scrim — finishes sliding out. */
  protected onDrawerAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'slide-out' && this.drawerClosing()) {
      this.drawerClosing.set(false);
    }
  }

  /* ---- global keys and outside clicks ------------------------------------ */

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.drawerOpen()) return this.closeDrawer();
    if (this.moreOpen()) this.closeMore(true);
  }

  @HostListener('document:pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    if (!this.moreOpen()) return;
    const target = event.target as Node;
    const insidePanel = this.morePanel()?.nativeElement.contains(target);
    const onButton = this.moreBtn()?.nativeElement.contains(target);
    if (!insidePanel && !onButton) this.closeMore(false);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isBrowser) return;
    if (innerWidth >= 1240 && this.drawerOpen()) this.closeDrawer();
  }
}

/** Trap Tab inside a container; returns a release function. */
function trapFocus(container: HTMLElement): () => void {
  const SELECTOR =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
    'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const nodes = (): HTMLElement[] =>
    Array.from(container.querySelectorAll<HTMLElement>(SELECTOR))
      .filter(el => el.offsetParent !== null || el === document.activeElement);

  const onKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return;
    const list = nodes();
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  container.addEventListener('keydown', onKeydown);
  nodes()[0]?.focus();
  return () => container.removeEventListener('keydown', onKeydown);
}
