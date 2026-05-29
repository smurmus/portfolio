# Pawprint Trail Fix — Task Context

## What's already done
- `src/hooks/usePan.ts`: BOARD_WIDTH 6000→7000, BOARD_HEIGHT 4000→5000 ✅
- `src/components/Board/Board.module.css`: canvas 6000×4000 → 7000×5000 (must match usePan) ✅
- `src/components/Board/Board.tsx`: BUFFER 1200→2000 ✅; culling constants 3000/2000 → 3500/2500 ✅
- `src/components/PawprintTrail/PawprintTrail.tsx`: Phase 10 stagger fixed; switched to `<symbol>`+`<use>` ✅

## What still needs doing

### 1. Fix paw stagger in PawprintTrail.tsx (most important)
The trail looks like a single paw print per step during the southward phases (phases 8–10, steps ~97–167). Root cause: when heading south (angle ≈180°), the perpendicular axis is horizontal, so L/R stagger must be ±18–20px in **x**. Current coords only stagger ~12px in x AND vary y, causing ~50% overlap.

**Rule for correct cat stride geometry:**
- Direction vector for angle θ (0=up, 90=right) in SVG coords: `dir = (sin θ, −cos θ)`
- Left-perpendicular: `perp = (cos θ, sin θ)`
- L paw: `centerline + perp × 18`
- R paw: `centerline − perp × 18`
- Both paws same angle (±2°), advance ~28–30px along centerline between L and R

For **heading south (angle≈180°)**:
- L paw: (cx − 18, cy, 179)
- R paw: (cx + 18, cy + 30, 181)

For **heading east (angle≈90°)**:
- L paw: (cx, cy − 18, 89) — already correct in phases 1–7

**Only phases 8–10 need redesigning** — the screenshot confirmed phases 1–7 look fine.

Current phase 8 starts at step 97: `[1588, 342, 142]` — heading SE, this phase is already borderline OK.
The real problem is phase 10 (long southward run, steps ~133–167) where angles are 178–180° and stagger collapses.

**New phase 10 pattern** (heading south, centerline drifting slightly E then W):
```
// Each stride pair: L at (cx-18, cy), R at (cx+18, cy+30), angles 179/181
// Advance centerline ~55px south per pair, drift cx ±4px for organic feel
```

### 2. Switch to `<symbol>` + `<use>` for performance (optional but approved)
Replace 168 `<g>` elements (each with 5 paths = 840 nodes) with one `<defs>` + 168 `<use>` = 174 nodes.

```tsx
// In the SVG:
<defs>
  <g id="paw-shape">
    <path d="M161.11 167.151C178.806 149.47 225.333 144.23 251.752 159.094C297.932 185.075 298.998 197.064 323.193 223.023C355.644 257.84 362.538 309.881 311.138 333.639C278.555 348.7 256.791 323.446 220 337.695C190.525 349.111 131.356 384.663 105.552 332.724C91.0374 303.51 113.677 214.541 161.11 167.151Z" />
    <ellipse cx="62.6616" cy="167.551" rx="44" ry="53" transform="rotate(-25.7606 62.6616 167.551)" />
    <ellipse cx="349.261" cy="136.542" rx="44" ry="53" transform="rotate(37.8389 349.261 136.542)" />
    <ellipse cx="135.886" cy="74.0788" rx="44.105" ry="61.6083" transform="rotate(-14.3108 135.886 74.0788)" />
    <ellipse cx="251.639" cy="68.1503" rx="44.105" ry="63.1406" transform="rotate(7.16773 251.639 68.1503)" />
  </g>
</defs>
{STEPS.map(([cx, cy, angle], i) => (
  <use key={i} href="#paw-shape"
    transform={`translate(${cx},${cy}) rotate(${angle}) scale(0.058) translate(-208,-190)`}
    fill="var(--color-text-primary)"
    opacity="0.10"
  />
))}
```

## Key coordinate facts
- Trail SVG placed at board (580, 300)
- Destination items (cats, "you found them." card) at board (2690, 1985)
- In SVG-local coords, destination = (2110, 1685)
- Final step currently lands at SVG (2098, 1676) ✓
- Phases 1–7 (steps 0–96): heading E/NE/SE — look fine, keep as-is
- Phases 8–10 (steps 97–167): heading S/SW/SE — need stagger fix

## Current STEPS array in PawprintTrail.tsx
Phases 1–7 run from step 0 to step ~96. Phase 8 starts at step 97 with `[1588, 342, 142]`.

The problematic phase 10 (steps 133–167) currently looks like:
```
[2068, 828, 148], [2096, 812, 116], ...all the way to... [2098, 1676, 180]
```
These need to be replaced with properly staggered stride pairs.

## File locations
- `src/hooks/usePan.ts` — board bounds (already fixed)
- `src/components/Board/Board.tsx` — culling buffer (already fixed)  
- `src/components/PawprintTrail/PawprintTrail.tsx` — the trail (needs stagger fix)
- `src/config/boardItems.ts` — board item positions (no changes needed)
