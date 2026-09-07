/* ==========================================================================
   crisis.mts — the phrases that stop the conversation.

   Server-side only, and deliberately so. A check that runs in the browser is a
   check an attacker deletes, and duplicating the list would guarantee the two
   copies drift. The browser learns about a hit the same way it learns anything
   else here: an SSE event.

   These are matched before the model is called at all, which means a person
   who types one of them gets the same answer instantly, at no cost, and
   whether or not the API is reachable.

   The list is deliberately blunt. A false positive shows someone a card with
   real telephone numbers on it, which is a small cost; a false negative leaves
   someone alone with a language model, which is not. Erring toward the card is
   the correct asymmetry.
   ========================================================================== */

/** Case-insensitive; Georgian has no case, so the flag only affects the English. */
export const CRISIS_PATTERNS: readonly RegExp[] = [
  /* ---- Georgian ---------------------------------------------------------- */
  /თავს?\s*მოვ?ი?კლავ/i,          // "I will kill myself"
  /თავის\s*მოკვლ/i,               // "killing oneself"
  /სუიციდ/i,
  /თვითმკვლელობ/i,
  /აღარ\s*მინდა\s*ცხოვრებ/i,      // "I no longer want to live"
  /ცხოვრება\s*აღარ\s*მინდა/i,
  /სიცოცხლე\s*აღარ\s*მინდა/i,
  /მინდა\s*მოვკვდე/i,             // "I want to die"
  /მოვკვდე/i,
  /წამლებ(ი|ს)\s*(დავთვალე|დავლიე|ვთვლი)/i,  // "counted / took the pills"
  /ვენებ(ი|ს)\s*გადა?ჭრ/i,        // cutting veins
  /თავს\s*ვი?ზიან/i,              // self-harm
  /საკუთარ\s*თავს\s*ვაზიან/i,

  /* ---- English ----------------------------------------------------------- */
  /\bkill\s+my\s*self\b/i,
  /\bkilling\s+my\s*self\b/i,
  /\bsuicid/i,
  /\bend\s+(my|it)\s+(life|all)\b/i,
  /\btake\s+my\s+own\s+life\b/i,
  /\bwant\s+to\s+die\b/i,
  /\bdon'?t\s+want\s+to\s+(live|be\s+here|exist)\b/i,
  /\bno\s+reason\s+to\s+(live|go\s+on)\b/i,
  /\bbetter\s+off\s+(dead|without\s+me)\b/i,
  /\bcount(ed|ing)?\s+(my\s+)?pills\b/i,
  /\bself[-\s]?harm/i,
  /\bcut(ting)?\s+my\s*self\b/i,
  /\bhurt\s+my\s*self\b/i
];
