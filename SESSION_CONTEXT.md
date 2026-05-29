# Session Context — Portfolio / DAP work

## Who I am
Sondhayni — software engineer transitioning into product design, applying to Shopify's Design Apprentice Program (DAP). Portfolio at `/Users/sondhayni/Documents/side-projects/portfolio` (React + TypeScript + Vite, CSS Modules, PP Hatton display font, Satoshi body font).

## What's been done

### Discord case study — substantially revised

#### Hero / opening hook
- Old approach (separate `openingHook` section with typing animation + separate hero) has been **replaced**.
- New: the hero image IS the hook. Hero fills 100vh. Hook text ("What if you didn't have to be everywhere to catch everything?") overlays centered on the image at initial blur (`blur(7px)`, `scale(1.02)`).
- Scroll-driven: 0–150px scroll → image unblurs + hook text fades/drifts up. 80–260px → title card fades + slides in from bottom-left.
- `CaseStudyHero.tsx` handles all of this via `hookText` prop + scroll listener with refs on image, hook overlay, and card group.
- `openingHook` config field still exists in types but is unused for Discord — `hookText` on `hero` config does the work.

#### Navigation / TOC
- Back button is now always `position: fixed` outside `<main>` in `CaseStudy.tsx` (`.fixedBack` class). Removed from `CaseStudyHero`.
- TOC was broken because `pageEnter` animation used `transform: translateY(12px)` — even a no-op transform on `.page` makes all `position: fixed`/`sticky` children position relative to `.page` not viewport. Fixed by removing transform from `pageEnter` entirely (opacity-only animation now).
- Arrow key nav stops: `case-hero` → `case-meta` (with `useMemo` override that scrolls to `metaTop - 55vh` so title card + meta are both visible) → sections.
- `case-meta` id added to the meta row `<div>` in `CaseStudy.tsx`.

#### Content changes
- **ThesisDiagram removed** from "The Gap" section. Replaced by the Chelsea paragraph.
- **Chelsea paragraph** rewritten: "Take Chelsea: Design Buddies announced a design-a-thon, and she wanted in…" — grounds the participation gap in a real story.
- **Design2024Landscape** redesigned: regular 4 cards now have solid accent border + light purple tint (they're the subject). Favorites card is transparent/dashed-neutral (the outlier — shipped after). Static sparkle icon on Favorites card ties to SparkleAside below. Heading added to explain purpose.
- **NotificationRebuttal** tightened from 4 → 3 paragraphs. "The design-a-thon participant" → "Chelsea".
- **Waypoints section** restructured: added placeholder `media-placeholder` blocks for Radar feed recording and right-click entry recording (alongside existing `set-a-waypoint.webm`).
- **FeatureAuditTable** thesis paragraph rewritten — jargon removed.
- **TldrTimeline**: "Discord ships 5 features" → "3 features" (matches audit).
- Many smaller copy fixes throughout (contributor footer, callout, reflection, audit line, MAU number, TL;DR paragraph).

### Case study page transitions
- `pageEnter` is now opacity-only (no transform) — safe for fixed/sticky children.
- View Transitions API wired for hook image → hero image (`view-transition-name: case-hero`).

### Design Systems case study — substantially complete
All copy gaps filled, prose cut to minimal, images wired. Key things to know:
- Big Health system is called **COG**. Both Hajimari and COG built on Tamagui with custom token layer.
- `src/components/CollabDiagram/` — new component (type: `collab-diagram`) showing Hearth vs COG collaboration model as a swimlane.
- Reflection section **deleted** — case study ends with Storybook link.

**Hajimari assets** copied to `public/assets/design-systems/`:
- `hajimari-hero.png`, `hajimari-storybook-button.png`, `hajimari-tokens-colors.png`, `hajimari-button-states.gif`, `hajimari-storybook-textinput.png`, `hajimari-typography.png`, `hajimari-typography-old.png`

**COG placeholders** — all `screenshot-row` right slots have empty `src: ''`. Drop files into `public/assets/design-systems/` and update paths in `caseStudies.ts`.

---

## What still needs doing

### Discord case study
- **Webm recordings needed**: Radar feed flow and right-click entry flow (placeholders already in Waypoints section). Drop `.webm` files in `public/assets/` and swap `media-placeholder` blocks for `video` blocks in `caseStudies.ts`.
- Affinity map: `/assets/affinity-map.png` placeholder (drop file when ready).

### Contentfill case study (`contentfill`)
- ~10 screenshot placeholders — paths set as `/assets/contentfill/*.png`, drop files in
- Engineering tickets metric — confirmed story is wrong, needs correction
- Hero image: `/assets/contentfill/hero-preview-error.png` (empty)

### Other
- About page (`src/pages/About.tsx`) and Work History (`src/pages/WorkHistory.tsx`) — not yet reviewed
- Board page: other project polaroids may need updating
- PAWPRINT_TASK.md in root — unknown, check if still relevant

---

## Key files
- `src/config/caseStudies.ts` — all case study content
- `src/pages/CaseStudy.tsx` — renderer + nav logic (`useSectionKeyNav`, `navOverrides`)
- `src/pages/CaseStudy.module.css` — page animation (opacity-only), fixed back button
- `src/components/CaseStudyHero/` — hero with scroll-driven blur/hook reveal (`hookText` prop)
- `src/components/CaseTOC/CaseTOC.tsx` — TOC visibility (scroll-listener, suppressed during fullScreen sections)
- `src/components/Design2024Landscape/` — landscape card grid with Favorites outlier treatment
- `src/components/FeatureAuditTable/` — audit table + thesis paragraph (hardcoded)
- `src/components/NotificationRebuttal/` — 3-paragraph aside (Chelsea named)
- `src/components/CollabDiagram/` — Hearth vs COG swimlane (design-systems only)

## Behaviour rules
- Don't run the dev server or invoke `/run` — Sondhayni controls when it starts
- Short, direct responses
