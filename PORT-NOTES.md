# Port notes

Two things this project relates to:

- **`~/Desktop/CBT`** — the CBT platform. Angular 21 SSR, Supabase, trilingual.
  This project mirrors its architecture and shares none of its design.
- **`~/Desktop/existential-therapy-platform`** — the vanilla HTML/JS build of
  this same platform, kept intact. All content, copy and design decisions were
  made there first and ported here unchanged.

---

## What moved across from the vanilla build

**The content is byte-identical.** The twelve data modules were converted
mechanically — the `(function (ET) { ET.data.x = … })(window.ET)` wrapper was
replaced with `export const X: T[] = …` and nothing inside was touched. Same
Georgian, same English, same eight vignettes, same 28 lexicon entries.

**The design system is the same file**, with a Tailwind `@theme` block added on
top that forwards to the tokens rather than restating them.

**Everything else was rewritten** as Angular:

| Vanilla | Angular |
|---|---|
| `ET.storage` wrapper | `StorageService`, now also guarded on `isPlatformBrowser` |
| `ET.theme` | `ThemeService` — a signal plus an effect |
| `ET.i18n` with `data-i18n` attributes | `I18nService`; templates call `i18n.t()` directly |
| `ET.store` facade | `StoreService` — computed signals over seed plus overrides |
| `ET.auth` | `AuthService` — computed signals |
| `ET.chrome` rendering header and footer | `HeaderComponent`, `FooterComponent` |
| `ET.icon(name)` returning a string | `IconComponent`, sanitised once and cached |
| `ET.plate(seed)` | `PlateComponent` |
| `ET.motion` reveal and parallax | `RevealDirective`, `ParallaxDirective` |
| `js/pages/*.js` manipulating innerHTML | 26 components with signal-driven templates |
| `ET.game()` engine | `GameShellComponent` with content projection |
| `?slug=` and `ET.util.param()` | Real routes with `:slug` and `toSignal(paramMap)` |

---

## What Angular improved over the vanilla build

- **No manual re-render plumbing.** The vanilla version had every page register
  an `ET.i18n.onChange()` callback that re-ran `innerHTML` assignment. Here
  `i18n.t()` reads a signal, so a language change re-renders whatever depends on
  it and nothing else. The entire re-render layer disappeared.
- **No listener bookkeeping.** Two bugs in the vanilla build were duplicate
  event handlers accumulating on rebuild. With templates, that class of bug
  cannot occur.
- **No `esc()` calls.** Every interpolation is escaped by the framework. The
  vanilla code had to call `ET.util.esc()` on every interpolated value, and one
  missed call would have been an injection.
- **Real routing.** `?slug=` query parameters became proper URLs, which is also
  what makes prerendering possible.
- **Typed content.** The data files are now checked against interfaces in
  `core/models`.

## What the vanilla build still does better

- **It opens by double-clicking `index.html`.** This one needs `npm run build`.
- **It has no dependencies.** This one installs roughly 300 MB of `node_modules`
  to build 40 static files.

---

## Carried over from CBT (architecture, not code)

Route table with `loadComponent` and per-route SEO data · a nav array as the
single source of truth · `DataService`'s "overrides layered over seed" contract
· `ThemeService`'s fallback chain and class-on-`<html>` · the flat dot-key
translation dictionary · `RevealDirective` and `ParallaxDirective` semantics ·
the SVG score donut geometry · `adminGuard` · the `isPlatformBrowser` guard
convention · one data module per domain, page components that only render.

## Deliberately not carried over

Supabase · Express and on-demand SSR · the custom cursor (it set
`cursor: none !important` document-wide) · the emoji flag language switcher ·
CBT's two competing visual languages · its `!important` dark-mode bridge · all
of its colour, type, spacing, icons and copy.

## CBT bugs not reproduced

The quiz progress bar that never reached 100% · results held in memory and lost
on refresh · an English keyword rubric that scored near zero in Georgian · the
roadmap's permanently invisible final marker · two pages missing from the nav
array · no focus trap, no Escape handling, no `aria-live`, no keyboard handlers
anywhere · no Georgian-capable font, and `uppercase` micro-labels that do
nothing in Mkhedruli · a theme applied in an effect, so every dark load flashed
light · undebounced search · a glossary filtering on its visible English label ·
`firebase.service.ts` exporting `SupabaseService` · a failing `app.spec.ts` ·
an `environment.prod.ts` missing the key it needs.

---

## Bugs found and fixed during this port

1. **`[id]` does not serialize during prerendering.** The four `/givens`
   sections and the sorter's bin labels were bound with `[id]="…"`, which is a
   property binding — it exists only after hydration, so the jump-nav anchors
   were dead in the static HTML. Changed to `[attr.id]`, which always
   serializes.
2. **`var()` inside bound style values.** `[style.color]="'var(--accent)'"` and
   five like it were replaced with class bindings. Styling a state through an
   inline value string is the wrong tool regardless, and these are now four
   small utilities in the stylesheet.
3. **A bare `appParallax` attribute alongside `[appParallax]="0.05"`** set the
   input to the empty string and failed to compile. The binding alone matches
   the selector.
