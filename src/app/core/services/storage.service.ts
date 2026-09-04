/* ==========================================================================
   storage.service.ts — every localStorage access in the app goes through here.

   Two reasons it exists rather than calling localStorage directly:

   1. Prerendering. Routes are rendered at build time in Node, where there is
      no localStorage at all. `isPlatformBrowser` keeps that from throwing —
      the same guard CBT applies, for the same reason.
   2. Private windows, disabled site data and some embedded contexts throw on
      read as well as write. A failure must lose a convenience, never break a
      page.
   ========================================================================== */

import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StorageService {
  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  get<T>(key: string, fallback: T): T {
    if (!this.isBrowser) return fallback;
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  }

  set(key: string, value: unknown): boolean {
    if (!this.isBrowser) return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  remove(key: string): void {
    if (!this.isBrowser) return;
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  }
}
