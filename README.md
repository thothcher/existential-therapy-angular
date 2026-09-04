# ყოფნა · Being

A learning platform for **existential therapy**, in Georgian with an English
toggle. **Angular 21** — standalone components, signals, zoneless, Tailwind v4:
the same stack as the CBT platform, prerendered to static HTML at build time.

```bash
npm install
npm start        # dev server at http://localhost:4200
npm run build    # prerenders 40 routes into dist/…/browser
```

The build output is plain HTML, CSS and JS. Deploy it to any static host; there
is no Node process to run.

---

## 1. Why prerendered rather than SSR

The CBT platform uses `outputMode: "server"` — every request rendered on demand
by an Express process, which is why its `server.ts` carries that comment about
`NG_ALLOWED_HOSTS`.

This platform has no backend at all: no database, no API, no per-request state.
So it uses `outputMode: "static"`. Angular renders every route at build time and
writes real files:

```
dist/existential-therapy-angular/browser/
├── index.html
├── givens/index.html
├── thinkers/index.html
├── thinkers/frankl/index.html          one per thinker
├── practices/dereflection/index.html   one per practice
├── scenarios/diagnosis/index.html      one per scenario
└── … 40 files in total
```

Same SEO benefit as SSR, the same content for readers without JavaScript, no
server to operate, and no SSRF host allow-list to configure.

`src/app/app.routes.server.ts` drives it. Parameterised routes take their
parameter lists from the same data modules the components read, so adding a
thinker to `thinkers.data.ts` produces `thinkers/<slug>/index.html` on the next
build — nothing to register in two places.

The three `admin` routes are `RenderMode.Client`: they show nothing useful
without a local profile, so prerendering them would emit copies of an empty
shell.

---

## 2. Project structure

```
src/
├── index.html          fonts, and the pre-paint theme script
├── styles.css          the entire design system (section 4)
└── app/
    ├── app.ts                  root shell: header, router outlet, footer
    ├── app.routes.ts           every route, lazily loaded
    ├── app.routes.server.ts    what gets prerendered, and with which params
    ├── core/
    │   ├── models/             one barrel of interfaces
    │   ├── data/               13 modules: content, strings, icons
    │   ├── services/           storage, theme, i18n, store, auth, seo
    │   └── guards/             adminGuard
    ├── shared/
    │   ├── components/         header, footer, icon, plate, brand-mark
    │   └── directives/         appReveal, appParallax
    └── features/               one folder per area; games/ holds the exercises
```

26 components, 6 services, 13 data modules, about 9,200 lines of TypeScript.

---

## 3. Routes

| Route | Page |
|---|---|
| `/` | Landing page |
| `/givens` | Yalom's four ultimate concerns, as a scroll narrative |
| `/thinkers`, `/thinkers/:slug` | Nine thinkers; searchable and filterable |
| `/practices`, `/practices/:slug` | The five interventions |
| `/lexicon` | 28 terms, each with its original-language name |
| `/scenarios`, `/scenarios/:id` | Eight vignettes: situation, reflection, reveal |
| `/vs-cbt` | Explicit comparison with CBT |
| `/inventory` | Frankl's meaning inventory |
| `/games` | Exercise hub, with a completion ring each |
| `/games/terms` | **Term Matcher** — SVG lines between terms and definitions |
| `/games/branching` | **Scenario Branching** — pick a response, all three explained |
| `/games/givens` | **Four Concerns Sorter** — 16 statements, four bins |
| `/games/timeline` | **Concept Timeline** — order ten works chronologically |
| `/contact`, `/privacy`, `/terms` | |
| `/login`, `/register` | Demonstration only — see section 6 |
| `/admin`, `/admin/content`, `/admin/users` | Demonstration only — see section 6 |

`NAV_PRIMARY` and `NAV_MORE` in `shared/components/header.component.ts` are the
single source of navigation truth; the footer derives its columns from them.

All four exercises are **fully keyboard operable**:

| Exercise | Keyboard |
|---|---|
| Term Matcher | arrows move, `Enter` selects, `Escape` clears the pending pick |
| Scenario Branching | `Tab` and `Enter` |
| Four Concerns Sorter | focus a statement, press `1`–`4`; or `Enter` for a bin menu |
| Concept Timeline | `Ctrl` with `up`/`down` reorders, `Enter` checks |

---

## 4. Design tokens

All in `src/styles.css`. Light lives on `:root`; dark redefines **only** the
semantic layer, so one class on `<html>` retints the platform.

The Tailwind `@theme` block forwards to those same custom properties rather than
duplicating them. Two consequences: `bg-surface` and the hand-written `.card`
resolve to the same value, and **dark mode needs no `dark:` variant for colour**
— because `.dark` redefines the underlying property on `<html>`, a themed
utility re-resolves on its own.

Tailwind is layout scaffolding only: grid, flex, spacing, breakpoints.
Everything that carries the brand lives in the component layer.

### Colour

```
Base    paper #FAFAFA  surface #FDFDFE  surface-2 #F4F6F9  elevated #FFFFFF  (light)
        paper #0B0F14  surface #121820  surface-2 #0F141B  elevated #18202A  (dark)

Neutral 50 #F7F8FA · 100 #EDEFF3 · 200 #DDE1E8 · 300 #C2C8D4 · 400 #99A2B2
        500 #6E7788 · 600 #515A6B · 700 #3B4351 · 800 #262D38 · 900 #171D26 · 950 #0B0F14

Azure   50 #EFF5FF · 100 #DBE7FE · 200 #BFD4FE · 300 #93B4FD · 400 #60A5FA
        500 #3B82F6 · 600 #2563EB · 700 #1D4ED8 · 800 #1E40AF · 900 #1E3A8A
```

**One accent only** — azure-700 in light, azure-400 in dark. Correct and
incorrect are carried by icon, wording and weight, never by a second hue.

Contrast, all at or above WCAG AA: body 13:1, muted 4.9:1, accent 7.0:1 in
light; body 15:1, accent 8:1 in dark.

### Type — exactly five sizes

| Token | Size | Line-height | Tracking |
|---|---|---|---|
| `--fs-display` | `clamp(2.25rem, 1.5rem + 3vw, 3.75rem)` | 1.05 | −0.032em |
| `--fs-title` | `clamp(1.75rem, 1.35rem + 1.7vw, 2.75rem)` | 1.15 | −0.02em |
| `--fs-subtitle` | `1.375rem` | 1.4 | −0.01em |
| `--fs-body` | `1.0625rem` | **1.7** | 0 |
| `--fs-micro` | `0.8125rem` | 1.5 | 0.06em |

Headings `Source Serif 4` then `Noto Serif Georgian`; body `Inter` then
`Noto Sans Georgian`. The fallback resolves per character, so Latin takes the
first family and Georgian the second — which is why the order matters.

**No `text-transform: uppercase` anywhere.** Georgian has no uppercase, so
micro-labels take their hierarchy from letter-spacing and colour instead.

### Form and motion

```
--r-sm 12px  --r-md 16px  --r-lg 20px  --r-xl 24px  --r-pill 999px
--shadow-soft / --shadow-lift / --shadow-pop     layered, never one hard drop
--ring-inset                                     replaces borders on surfaces
--ease cubic-bezier(0.22, 1, 0.36, 1)
--dur-fast 200ms  --dur-mid 400ms  --dur-slow 600ms  --stagger 70ms
```

Hover vocabulary: underline draw, a `translateY(-3px)` lift, a 3px icon shift, a
gradient border sweep. No bounce, nothing scales above 1.03.
`prefers-reduced-motion` disables reveal and parallax and leaves everything
visible.

---

## 5. Imagery

Six Unsplash photographs, chosen for fog, horizon, light and negative space. No
people, no consulting-room clichés. Each desaturated to `0.55`.

| Photo ID | Subject | Used for |
|---|---|---|
| `photo-1487621167305-5d248087c724` | Fog over a pine forest | Home hero |
| `photo-1509023464722-18d996393ca8` | Dark mountain over water at dusk | Quote divider |
| `photo-1478760329108-5c3ed9d495a0` | Deep dark water, almost formless | Death |
| `photo-1524230572899-a752b3835840` | White arched corridor receding | Freedom |
| `photo-1518837695005-2083093ee35b` | Water surface in low light | Isolation |
| `photo-1517685352821-92cf88aee5a5` | Cloud layer seen from above | Meaninglessness |

Every plate paints a gradient plus `public/grain.svg` **before** the image
loads, so a blocked or slow photograph degrades to an intentional surface rather
than a white hole.

The thinkers carry **no photographs**. Each has a numeric `plate` seed, and
`PlateComponent` renders a deterministic composition from it — a horizon, a
light source, a few long arcs. Being deterministic, it prerenders identically to
what the browser later hydrates.

---

## 6. The demonstration layer

`/login`, `/register` and the three `/admin` routes mirror the CBT routes, but
this platform has no backend, so they are built honestly:

- **No password is collected, transmitted, hashed or stored.** A profile is a
  name and an email in `localStorage`. A password field with nowhere to send it
  would invite someone to type a real password into a page that cannot protect
  it.
- Each of these pages carries a visible **დემო რეჟიმი** badge.
- `adminGuard` redirects rather than pretending to secure anything;
  `localStorage` belongs to the visitor. It also lets the prerenderer through,
  since there is no browser at build time.
- The content editor writes **overrides** that `StoreService` layers over the
  seed data at read time. `core/data/` is never modified, and "reset to seed"
  discards the overrides entirely.

---

## 7. What is stored in the browser

| Key | Contents |
|---|---|
| `et_theme` | `"light"` or `"dark"` |
| `et_lang` | `"ka"` or `"en"` |
| `et_progress` | best score and attempts, per exercise |
| `et_notes` | your reflection note, per scenario |
| `et_inventory` | meaning-inventory entries, the 20 most recent |
| `et_overrides` | admin content edits |
| `et_users`, `et_session` | demo profiles |

Every access goes through `StorageService`, guarded on `isPlatformBrowser`
(there is no storage during prerendering) and wrapped in `try/catch` (private
windows and disabled site data throw on read as well as write). A failure loses
a convenience, never functionality.

---

## 8. Adding content

Content lives in `src/app/core/data/*.data.ts`. Every translatable field is a
`Bilingual` pair resolved by `i18n.pick()`; lists accept either
`[{ka,en}, …]` or `{ka: […], en: […]}` through `i18n.pickList()`.

To add a thinker, append to `THINKERS` with a unique `slug` and a `plate` seed.
It appears in the index, becomes searchable, gets a detail page, and gets its
own prerendered HTML file. No other file changes.

---

## 9. A note on the build log

`ng build` prints a number of `ERROR Error: NotYetImplemented` stack traces
during prerendering. They come from Angular's server-side DOM, which does not
implement every `CSSStyleDeclaration` operation the styling instructions
attempt.

**They are non-fatal and do not affect the output.** All 40 routes prerender and
the build exits successfully. The emitted HTML was checked directly — inline
styles, generated plate SVGs, icons and Georgian content are all present — and
the built site was served and rendered in Chrome to confirm it matches the
reference implementation.
