/* ==========================================================================
   crisis.data.ts — what the page shows when it stops being a conversation.

   The detection lives on the server (netlify/shared/crisis.mts), deliberately:
   a check that runs in the browser is a check anyone can delete, and a second
   copy of the phrase list would drift from the first. This file holds only the
   part that is displayed.

   ⚠ TODO_VERIFY — the numbers below are PLACEHOLDERS and must be replaced with
   verified Georgian services before this page is made public. Until `verified`
   is true the component shows the site's existing wording instead ("speak to a
   professional; in an acute crisis, contact emergency services", which is what
   legal.data.ts already promises) and does not render the list at all. Showing
   a wrong number to someone in crisis is worse than showing none.
   ========================================================================== */

import type { Bilingual } from '../models';

export interface CrisisService {
  name: Bilingual;
  /** Dialled as-is. Kept a string: Georgian short codes have no country prefix. */
  number: string;
  /** When it answers, e.g. "24/7". */
  hours: Bilingual;
  note?: Bilingual;
}

/**
 * Flip to true only once every entry below has been checked against the
 * service's own published information. See the TODO above.
 */
export const CRISIS_VERIFIED = false;

export const CRISIS_SERVICES: CrisisService[] = [
  {
    name: { ka: 'გადაუდებელი დახმარება', en: 'Emergency services' },
    number: '112',
    hours: { ka: '24/7', en: '24/7' },
    note: {
      ka: 'თუ საფრთხე ახლავეა — სიცოცხლისთვის ან ჯანმრთელობისთვის.',
      en: 'If the danger is immediate — to life or to health.'
    }
  }
  // TODO_VERIFY: add Georgia's suicide-prevention and mental-health helplines
  // here once their numbers and hours are confirmed from an official source.
];
