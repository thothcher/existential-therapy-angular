/* ==========================================================================
   app.routes.ts — every route, lazily loaded.

   Same shape as the CBT route table (loadComponent everywhere, SEO data per
   route) with one change: `data` carries translation KEYS rather than finished
   English strings, so the title and description follow the language switch as
   well as the route. See SeoService.
   ========================================================================== */

import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    data: { titleKey: 'meta.home', descKey: 'meta.desc.home' }
  },

  /* ---- the course ------------------------------------------------------ */
  {
    path: 'learn',
    loadComponent: () =>
      import('./features/learn/learn-path.component').then(m => m.LearnPathComponent),
    data: { titleKey: 'meta.learn', descKey: 'learn.lead' }
  },
  {
    path: 'learn/:slug',
    loadComponent: () =>
      import('./features/learn/module.component').then(m => m.ModuleComponent),
    data: { titleKey: 'meta.learn', descKey: 'learn.lead' }
  },

  /* ---- content --------------------------------------------------------- */
  {
    path: 'givens',
    loadComponent: () => import('./features/givens/givens.component').then(m => m.GivensComponent),
    data: { titleKey: 'meta.givens', descKey: 'givens.lead' }
  },
  {
    path: 'thinkers',
    loadComponent: () =>
      import('./features/thinkers/thinker-list.component').then(m => m.ThinkerListComponent),
    data: { titleKey: 'meta.thinkers', descKey: 'thinkers.lead' }
  },
  {
    path: 'thinkers/:slug',
    loadComponent: () =>
      import('./features/thinkers/thinker-detail.component').then(m => m.ThinkerDetailComponent),
    data: { titleKey: 'meta.thinker', descKey: 'thinkers.lead' }
  },
  {
    path: 'practices',
    loadComponent: () =>
      import('./features/practices/practice-list.component').then(m => m.PracticeListComponent),
    data: { titleKey: 'meta.practices', descKey: 'practices.lead' }
  },
  {
    path: 'practices/:slug',
    loadComponent: () =>
      import('./features/practices/practice-detail.component').then(m => m.PracticeDetailComponent),
    data: { titleKey: 'meta.practice', descKey: 'practices.lead' }
  },
  {
    path: 'lexicon',
    loadComponent: () => import('./features/lexicon/lexicon.component').then(m => m.LexiconComponent),
    data: { titleKey: 'meta.lexicon', descKey: 'lexicon.lead' }
  },
  {
    path: 'scenarios',
    loadComponent: () =>
      import('./features/scenarios/scenario-list.component').then(m => m.ScenarioListComponent),
    data: { titleKey: 'meta.scenarios', descKey: 'scenarios.lead' }
  },
  {
    path: 'scenarios/:id',
    loadComponent: () =>
      import('./features/scenarios/scenario-detail.component').then(m => m.ScenarioDetailComponent),
    data: { titleKey: 'meta.scenario', descKey: 'scenarios.lead' }
  },
  {
    path: 'vs-cbt',
    loadComponent: () => import('./features/vs-cbt/vs-cbt.component').then(m => m.VsCbtComponent),
    data: { titleKey: 'meta.vscbt', descKey: 'vscbt.lead' }
  },
  {
    path: 'inventory',
    loadComponent: () =>
      import('./features/inventory/inventory.component').then(m => m.InventoryComponent),
    data: { titleKey: 'meta.inventory', descKey: 'inventory.lead' }
  },

  /* ---- exercises -------------------------------------------------------- */
  {
    path: 'games',
    loadComponent: () => import('./features/games/games-hub.component').then(m => m.GamesHubComponent),
    data: { titleKey: 'meta.games', descKey: 'games.lead' }
  },
  {
    path: 'games/terms',
    loadComponent: () => import('./features/games/terms.component').then(m => m.TermsGameComponent),
    data: { titleKey: 'games.terms.title', descKey: 'games.terms.lead' }
  },
  {
    path: 'games/branching',
    loadComponent: () =>
      import('./features/games/branching.component').then(m => m.BranchingGameComponent),
    data: { titleKey: 'games.branching.title', descKey: 'games.branching.lead' }
  },
  {
    path: 'games/givens',
    loadComponent: () => import('./features/games/sorter.component').then(m => m.SorterGameComponent),
    data: { titleKey: 'games.givens.title', descKey: 'games.givens.lead' }
  },
  {
    path: 'games/timeline',
    loadComponent: () =>
      import('./features/games/timeline.component').then(m => m.TimelineGameComponent),
    data: { titleKey: 'games.timeline.title', descKey: 'games.timeline.lead' }
  },

  /* ---- everything else --------------------------------------------------- */
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    data: { titleKey: 'meta.contact', descKey: 'contact.lead' }
  },
  {
    path: 'privacy',
    loadComponent: () => import('./features/legal/legal.component').then(m => m.LegalComponent),
    data: { titleKey: 'meta.privacy', descKey: 'meta.privacy', which: 'privacy' }
  },
  {
    path: 'terms',
    loadComponent: () => import('./features/legal/legal.component').then(m => m.LegalComponent),
    data: { titleKey: 'meta.terms', descKey: 'meta.terms', which: 'terms' }
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/auth.component').then(m => m.AuthComponent),
    data: { titleKey: 'meta.login', descKey: 'auth.login.lead', mode: 'login' }
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/auth.component').then(m => m.AuthComponent),
    data: { titleKey: 'meta.register', descKey: 'auth.register.lead', mode: 'register' }
  },

  /* ---- admin (demo) ------------------------------------------------------ */
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
    data: { titleKey: 'meta.admin', descKey: 'admin.lead', view: 'dashboard' }
  },
  {
    path: 'admin/content',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
    data: { titleKey: 'meta.admin', descKey: 'admin.lead', view: 'content' }
  },
  {
    path: 'admin/users',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
    data: { titleKey: 'meta.admin', descKey: 'admin.lead', view: 'users' }
  },

  { path: '**', redirectTo: '' }
];
