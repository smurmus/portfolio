// SVG <defs> block containing one <pattern> per washi tape type.
// Patterns are 12×12px tiles, low contrast (white stroke/fill at 0.15–0.25 opacity).
//
// HOW TO SWAP A PATTERN:
//   1. Export your hand-drawn tile from Procreate as an SVG (12×12px artboard).
//   2. Copy the interior path/shape elements.
//   3. Paste them inside the matching <pattern> element below, replacing the
//      placeholder geometry. Keep the <pattern> wrapper and patternUnits unchanged.
//   4. No other code changes needed — the pattern ID is referenced by WashiLabel.

export const WASHI_DEFS = `
<defs>

  <!-- CROSSES — design systems (sage)
       TODO: replace interior shapes with hand-drawn + export from Procreate -->
  <pattern id="washi-crosses" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
    <line x1="6" y1="2" x2="6" y2="10" stroke="white" stroke-opacity="0.2" stroke-width="1"/>
    <line x1="2" y1="6" x2="10" y2="6" stroke="white" stroke-opacity="0.2" stroke-width="1"/>
  </pattern>

  <!-- STRIPES — contentfill (amber), diagonal 45deg
       TODO: replace interior shapes with hand-drawn + export from Procreate -->
  <pattern id="washi-stripes" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
    <line x1="0" y1="12" x2="12" y2="0" stroke="white" stroke-opacity="0.18" stroke-width="1.5"/>
  </pattern>

  <!-- DOTS — discord (purple)
       TODO: replace interior shapes with hand-drawn + export from Procreate -->
  <pattern id="washi-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
    <circle cx="6" cy="6" r="1.5" fill="white" fill-opacity="0.2"/>
  </pattern>

  <!-- DIAMONDS — crafts & cosplay (red)
       TODO: replace interior shapes with hand-drawn + export from Procreate -->
  <pattern id="washi-diamonds" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
    <rect x="4" y="4" width="4" height="4" transform="rotate(45 6 6)"
          fill="none" stroke="white" stroke-opacity="0.2" stroke-width="1"/>
  </pattern>

  <!-- DASHES — default fallback for any future label
       TODO: replace interior shapes with hand-drawn + export from Procreate -->
  <pattern id="washi-dashes" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
    <line x1="3" y1="6" x2="9" y2="6" stroke="white" stroke-opacity="0.15" stroke-width="1"/>
  </pattern>

</defs>
`
