/* ==========================================================================
   games.catalogue.ts — the four exercises, in one list.

   Shared by the home page, the games hub and the header, so a new exercise is
   registered once.
   ========================================================================== */

export interface GameEntry {
  /** Progress key in localStorage; also the route's last segment. */
  id: string;
  path: string;
  icon: string;
  titleKey: string;
  /** One line, for cards. */
  shortKey: string;
  /** A paragraph, for the hub. */
  leadKey: string;
  instructionsKey: string;
}

export const GAMES: GameEntry[] = [
  {
    id: 'terms',
    path: '/games/terms',
    icon: 'puzzle',
    titleKey: 'games.terms.title',
    shortKey: 'games.terms.short',
    leadKey: 'games.terms.lead',
    instructionsKey: 'games.terms.instructions'
  },
  {
    id: 'branching',
    path: '/games/branching',
    icon: 'list-checks',
    titleKey: 'games.branching.title',
    shortKey: 'games.branching.short',
    leadKey: 'games.branching.lead',
    instructionsKey: 'games.branching.lead'
  },
  {
    id: 'sorter',
    path: '/games/givens',
    icon: 'layers',
    titleKey: 'games.givens.title',
    shortKey: 'games.givens.short',
    leadKey: 'games.givens.lead',
    instructionsKey: 'games.givens.instructions'
  },
  {
    id: 'timeline',
    path: '/games/timeline',
    icon: 'clock',
    titleKey: 'games.timeline.title',
    shortKey: 'games.timeline.short',
    leadKey: 'games.timeline.lead',
    instructionsKey: 'games.timeline.instructions'
  }
];
