/* ==========================================================================
   theme.service.ts — light / dark with a persistent choice.

   Ported from the CBT ThemeService: same fallback chain (stored choice ->
   prefers-color-scheme -> light) and the same class on <html>. Two changes:

   1. The class is also applied by an inline script in index.html, before the
      first paint. CBT applied it in an effect, so every dark-mode load flashed
      light first.
   2. An explicit choice writes `.light` as well as `.dark`, so someone who
      picks light while their OS is dark is actually respected. Storing only
      `.dark` cannot express that.
   ========================================================================== */

import { Injectable, effect, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StorageService } from './storage.service';

export type Theme = 'light' | 'dark';
const KEY = 'et_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = inject(StorageService);
  private readonly doc = inject(DOCUMENT);

  private readonly themeSignal = signal<Theme>(this.initial());
  readonly current = this.themeSignal.asReadonly();

  constructor() {
    effect(() => {
      const theme = this.themeSignal();
      if (!this.storage.isBrowser) return;
      const root = this.doc.documentElement;
      root.classList.toggle('dark', theme === 'dark');
      root.classList.toggle('light', theme === 'light');
      root.style.colorScheme = theme;
      this.storage.set(KEY, theme);
    });
  }

  isDark(): boolean { return this.themeSignal() === 'dark'; }

  toggle(): void {
    this.themeSignal.set(this.isDark() ? 'light' : 'dark');
  }

  set(theme: Theme): void { this.themeSignal.set(theme); }

  private initial(): Theme {
    const stored = this.storage.get<Theme | null>(KEY, null);
    if (stored === 'dark' || stored === 'light') return stored;
    if (!this.storage.isBrowser) return 'light';
    try {
      return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }
}
