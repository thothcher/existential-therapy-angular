/* ==========================================================================
   auth.guard.ts — ported from the CBT adminGuard.

   A navigation convenience, not a security boundary: the profile it checks
   lives in localStorage, which belongs entirely to the visitor. It exists so
   the admin screens do not render an empty shell for someone with no profile.

   Under prerendering there is no browser and no storage, so the guard must
   allow the route through at build time or the page would never be generated.
   ========================================================================== */

import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (_route, state) => {
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  // Let the prerenderer through; the check runs for real in the browser.
  if (!isBrowser) return true;

  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAdmin()) return true;

  return router.createUrlTree(['/login'], { queryParams: { next: state.url } });
};

/** Keeps a signed-in visitor away from the sign-in form. */
export const guestGuard: CanActivateFn = () => {
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  if (!isBrowser) return true;
  // The auth pages show a signed-in panel rather than redirecting, so this
  // always allows through. Kept for parity with the CBT guard set.
  return true;
};
