# sondhayni.me — personal portfolio

Sondhayni Murmu's portfolio site: a draggable pegboard of polaroids, stickers, and sticky notes.

## Local dev

```bash
npm install
npm run dev
# runs at http://localhost:3000
```

## Asset swaps

**Fonts** — Drop `PPHatton-Medium.woff2`, `PPHatton-Medium.woff`, `PPHatton-Bold.woff2`, and
`PPHatton-Bold.woff` into `public/fonts/`. The `@font-face` blocks in `src/styles/globals.css`
already reference those exact paths — no code changes needed.

**Stickers** — Replace placeholder PNGs in `public/assets/stickers/` with Procreate exports.
Filenames must match the `imageSrc` values in `src/config/boardItems.ts`.

**Polaroids** — Replace placeholder images in `public/assets/polaroids/`.
Filenames must match `imageSrc` values in `src/config/boardItems.ts`.

**Artifacts** — Badge photo, lanyard, postcards live in `public/assets/artifacts/`.
Filenames must match `src/config/boardItems.ts`.

**Washi patterns** — Placeholder SVG geometry is in `src/components/WashiLabel/WashiPatterns.ts`.
Each pattern block has a comment showing exactly which shapes to replace with your Procreate exports.
Keep the `<pattern>` wrapper and `patternUnits` unchanged — only swap the interior geometry.

**Resume** — Drop `resume.pdf` into `public/assets/` to activate the resume link on the board.

## Case studies

Case study content is managed in `src/config/caseStudies.ts`. Each entry maps to a route:

- `/case-study/discord`
- `/case-study/contentfill`
- `/case-study/design-systems`

Full content for each case study is added via separate focused prompts — see comments in
`caseStudies.ts`. Do not write real copy directly into the placeholder blocks.

## Deployment

Connected to Vercel — auto-deploys on push to `main`. `vercel.json` handles client-side routing
so direct URL access (e.g. `/case-study/discord`) doesn't 404.
