/* ==========================================================================
   Domain models.

   Mirrors the CBT `core/models` barrel, with one structural difference that
   runs through everything: Georgian is the source language, so every
   translatable field is a `Bilingual` pair rather than a bare string. CBT
   translated only its UI chrome, which left Georgian readers with English
   case studies; here the content itself is bilingual.
   ========================================================================== */

export type Lang = 'ka' | 'en';

/** A translatable value. `ka` is authoritative; `en` is a register match. */
export interface Bilingual {
  ka: string;
  en: string;
}

/** A translatable list. Data files use whichever shape reads better. */
export type BilingualList = Bilingual[] | { ka: string[]; en: string[] };

/* ---- content ------------------------------------------------------------ */

export interface Given {
  id: string;
  order: number;
  icon: string;
  image: string;
  imageAlt: Bilingual;
  title: Bilingual;
  original: string;
  tagline: Bilingual;
  definition: Bilingual;
  manifest: BilingualList;
  defenses: BilingualList;
  stance: Bilingual;
  voices: BilingualList;
}

export interface Work {
  title: Bilingual;
  year: number;
}

/**
 * A freely licensed portrait. Several carry CC BY / CC BY-SA terms, so the
 * credit line is part of the data rather than an afterthought — the detail
 * page prints it under the image.
 */
export interface Portrait {
  /** Path under /thinkers, e.g. '/thinkers/sartre.jpg'. */
  src: string;
  /** Photographer or artist, as Wikimedia Commons records them. */
  credit: string;
  /** Short licence name, e.g. 'CC BY-SA 3.0' or 'Public domain'. */
  license: string;
  /** The Commons file page, so the claim can be checked. */
  source: string;
}

export interface Thinker {
  id: string;
  slug: string;
  /** Seed for the generated abstract plate, used wherever no portrait exists. */
  plate: number;
  /** Portrait, when a freely licensed one exists; the plate covers the rest. */
  portrait?: Portrait;
  name: Bilingual;
  latin: string;
  birthYear: number;
  deathYear: number | null;
  origin: Bilingual;
  tradition: Bilingual;
  summary: Bilingual;
  /** Paragraphs separated by a blank line. */
  biography: Bilingual;
  keyIdeas: Bilingual[];
  works: Work[];
  contributions: Bilingual[];
  tags: Bilingual[];
  related: string[];
}

export interface Practice {
  id: string;
  slug: string;
  icon: string;
  order: number;
  title: Bilingual;
  original: string;
  summary: Bilingual;
  whatItIs: Bilingual;
  whyItWorks: Bilingual;
  howToUse: BilingualList;
  pitfalls: BilingualList;
  /** Points at the game or tool that exercises this practice. */
  tryIt: { key: string; path: string };
  relatedGiven: string[];
}

export interface LexiconCategory {
  id: string;
  label: Bilingual;
}

export interface LexiconTerm {
  id: string;
  category: string;
  term: Bilingual;
  /** The Latin, German, French or Danish source term. */
  original: string;
  definition: Bilingual;
  relatedThinker?: string;
  relatedPractice?: string;
}

export interface Scenario {
  id: string;
  order: number;
  icon: string;
  title: Bilingual;
  person: Bilingual;
  concernIds: string[];
  practiceSlug: string;
  situation: Bilingual;
  reflectionPrompt: Bilingual;
  therapistResponse: Bilingual;
}

export interface CompareRow {
  aspect: Bilingual;
  ex: Bilingual;
  cbt: Bilingual;
}

export interface LegalSection {
  heading: Bilingual;
  body: Bilingual;
  list?: BilingualList;
}

/* ---- games -------------------------------------------------------------- */

export interface TermPair {
  id: string;
  term: Bilingual;
  original: string;
  definition: Bilingual;
  /** Shown once the pair resolves, right or wrong. */
  note: Bilingual;
}

export type BranchTag =
  | 'existential' | 'reassurance' | 'interpretation' | 'problemSolving' | 'avoidance';

export interface BranchOption {
  tag: BranchTag;
  correct?: boolean;
  text: Bilingual;
  feedback: Bilingual;
}

export interface BranchItem {
  id: string;
  givenId: string;
  client: Bilingual;
  options: BranchOption[];
}

export interface SortStatement {
  id: string;
  givenId: string;
  text: Bilingual;
  why: Bilingual;
}

export interface TimelineItem {
  id: string;
  year: number;
  thinkerSlug: string;
  title: Bilingual;
  who: Bilingual;
  note: Bilingual;
}

/* ---- local state -------------------------------------------------------- */

export interface GameProgress {
  best: number;
  bestTotal: number;
  attempts: number;
  completedAt: string | null;
}

export interface InventoryEntry {
  id: string;
  createdAt: string;
  creative: string;
  experiential: string;
  attitudinal: string;
  remains: string;
  weight: Record<string, number>;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}
