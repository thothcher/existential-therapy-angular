/* ==========================================================================
   auth.service.ts — the local demonstration account layer.

   The CBT platform had real Supabase authentication. This one has no backend,
   so rather than imitate one, this layer is honest about what it is:

   - No password is ever asked for, transmitted, hashed or stored. A profile is
     a name and an email in localStorage. A password field with nowhere to send
     it would invite someone to type a real password into a page that cannot
     protect it.
   - Every page using it shows a visible "demo mode" badge.
   - adminGuard redirects rather than pretending to secure anything. Anyone can
     edit localStorage; this is navigation, not a security boundary.

   What it does provide is the thing the feature is actually for: a profile
   that game progress and inventory entries can belong to.
   ========================================================================== */

import { Injectable, computed, signal, inject } from '@angular/core';
import { StorageService } from './storage.service';
import type { DemoUser } from '../models';

const USERS_KEY = 'et_users';
const SESSION_KEY = 'et_session';

export type AuthResult =
  | { ok: true; user: DemoUser }
  | { ok: false; error: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storage = inject(StorageService);
  private readonly revision = signal(0);

  readonly users = computed<DemoUser[]>(() => {
    this.revision();
    const stored = this.storage.get<DemoUser[]>(USERS_KEY, []);
    return Array.isArray(stored) ? stored : [];
  });

  readonly currentUser = computed<DemoUser | null>(() => {
    this.revision();
    const id = this.storage.get<string | null>(SESSION_KEY, null);
    if (!id) return null;
    return this.users().find(user => user.id === id) ?? null;
  });

  readonly isLoggedIn = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  /** The first profile created becomes the administrator. */
  register(name: string, email: string): AuthResult {
    const mail = this.normalise(email);
    const list = this.users();
    if (list.some(user => user.email === mail)) return { ok: false, error: 'auth.exists' };

    const user: DemoUser = {
      id: this.uid(),
      name: (name ?? '').trim(),
      email: mail,
      role: list.length === 0 ? 'admin' : 'user',
      createdAt: new Date().toISOString()
    };
    this.storage.set(USERS_KEY, [...list, user]);
    this.storage.set(SESSION_KEY, user.id);
    this.revision.update(n => n + 1);
    return { ok: true, user };
  }

  /** Sign in by email alone. See the note at the top of this file. */
  login(email: string): AuthResult {
    const mail = this.normalise(email);
    const user = this.users().find(item => item.email === mail);
    if (!user) return { ok: false, error: 'auth.notFound' };
    this.storage.set(SESSION_KEY, user.id);
    this.revision.update(n => n + 1);
    return { ok: true, user };
  }

  logout(): void {
    this.storage.remove(SESSION_KEY);
    this.revision.update(n => n + 1);
  }

  deleteUser(id: string): void {
    this.storage.set(USERS_KEY, this.users().filter(user => user.id !== id));
    if (this.storage.get<string | null>(SESSION_KEY, null) === id) {
      this.storage.remove(SESSION_KEY);
    }
    this.revision.update(n => n + 1);
  }

  private normalise(email: string): string {
    return String(email ?? '').trim().toLowerCase();
  }

  private uid(): string {
    try {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    } catch {
      /* fall through */
    }
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }
}
