/* ==========================================================================
   app.routes.server.ts — what gets written to disk at build time.

   CBT used `{ path: '**', renderMode: RenderMode.Server }`: every request is
   rendered on demand by a Node process. This platform has no backend, so every
   route is prerendered instead. The build emits real HTML files and the output
   deploys to any static host.

   Parameterised routes need their parameter lists supplied, which is what
   getPrerenderParams does below. The lists come from the same data modules the
   components read, so adding a thinker to thinkers.data.ts automatically
   produces thinkers/<slug>/index.html on the next build — nothing to register
   in two places.

   The admin routes are deliberately client-only: they render nothing useful
   without a local profile, so prerendering them would emit three copies of an
   empty shell.
   ========================================================================== */

import { RenderMode, ServerRoute } from '@angular/ssr';
import { THINKERS } from './core/data/thinkers.data';
import { PRACTICES } from './core/data/practices.data';
import { SCENARIOS } from './core/data/scenarios.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'thinkers/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => THINKERS.map(thinker => ({ slug: thinker.slug }))
  },
  {
    path: 'practices/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PRACTICES.map(practice => ({ slug: practice.slug }))
  },
  {
    path: 'scenarios/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SCENARIOS.map(scenario => ({ id: scenario.id }))
  },

  // Nothing worth prerendering: a local demonstration gated on a profile that
  // exists only in the visitor's own browser.
  { path: 'admin', renderMode: RenderMode.Client },
  { path: 'admin/content', renderMode: RenderMode.Client },
  { path: 'admin/users', renderMode: RenderMode.Client },

  { path: '**', renderMode: RenderMode.Prerender }
];
