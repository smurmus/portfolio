import { memo } from 'react'

const FONT = "'Edu TAS Beginner', cursive"
const COLOR = 'var(--color-text-primary)'
const OPACITY = 0.38

// Arrow curve
const ARROW_PATH = 'M 38 24 C 42 32 50 36 56 40'
const CURVE_LEN = 30

// Arrowhead barbs — one connected stroke: tip1 → point → tip2, draws left to right
// Tangent at (56,40): direction ≈ (0.83, 0.55). Barb tips at (52,34) and (49,39).
const BARBS_PATH = 'M 52 34 L 56 40 L 49 39'
const BARBS_LEN = 15

// Total cycle: curve draws 0→57%, barbs draw 60→72%, both hold to 100%
const CYCLE = 1.4 // seconds

// Switch to try each variant: 'nudge' | 'draw' | 'wag' | 'pulse'
const VARIANT = 'draw'

const ANIMATIONS: Record<string, string> = {
  nudge: `
    @keyframes sh-nudge {
      0%   { transform: translate(0, 0);     animation-timing-function: ease-out; }
      45%  { transform: translate(4px, 4px); animation-timing-function: ease-in; }
      100% { transform: translate(0, 0); }
    }
    .sh-arrow { animation: sh-nudge 1.1s infinite; }
  `,
  draw: `
    @keyframes sh-draw-curve {
      0%   { stroke-dashoffset: ${CURVE_LEN}; }
      57%  { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: 0; }
    }
    @keyframes sh-draw-barbs {
      0%, 60% { stroke-dashoffset: ${BARBS_LEN}; }
      80%     { stroke-dashoffset: 0; }
      100%    { stroke-dashoffset: 0; }
    }
    .sh-draw-curve { animation: sh-draw-curve ${CYCLE}s ease-out infinite; }
    .sh-draw-barbs { animation: sh-draw-barbs ${CYCLE}s ease-out infinite; }
  `,
  wag: `
    @keyframes sh-wag {
      0%, 100% { transform: rotate(0deg); }
      25%  { transform: rotate(10deg); }
      75%  { transform: rotate(-10deg); }
    }
    .sh-arrow { transform-origin: 38px 24px; animation: sh-wag 0.7s ease-in-out infinite; }
  `,
  pulse: `
    @keyframes sh-pulse {
      0%, 100% { transform: scale(1); }
      50%  { transform: scale(1.5); }
    }
    .sh-arrowhead { transform-origin: 56px 40px; animation: sh-pulse 0.8s ease-in-out infinite; }
  `,
}

const StartHereAnnotation = memo(function StartHereAnnotation() {
  const isDraw  = VARIANT === 'draw'
  const isPulse = VARIANT === 'pulse'

  return (
    <svg
      width="120"
      height="70"
      viewBox="0 0 120 70"
      overflow="visible"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <defs>
        {!isDraw && (
          <marker
            id="sh-arrowhead"
            markerWidth="6"
            markerHeight="5"
            refX="5"
            refY="2.5"
            orient="auto"
          >
            <polygon
              className={isPulse ? 'sh-arrowhead' : undefined}
              points="0 0, 6 2.5, 0 5"
              fill={COLOR}
            />
          </marker>
        )}
        <style>{`
          @media (prefers-reduced-motion: no-preference) {
            ${ANIMATIONS[VARIANT]}
          }
        `}</style>
      </defs>

      <g opacity={OPACITY}>
        <text
          x="4"
          y="18"
          fontFamily={FONT}
          fontSize="18"
          fontWeight="400"
          fill={COLOR}
        >
          start here
        </text>

        {isDraw ? (
          <g>
            <path
              className="sh-draw-curve"
              d={ARROW_PATH}
              pathLength={CURVE_LEN}
              stroke={COLOR}
              strokeWidth="1.2"
              strokeDasharray={CURVE_LEN}
              strokeDashoffset={CURVE_LEN}
              fill="none"
              strokeLinecap="round"
            />
            <path
              className="sh-draw-barbs"
              d={BARBS_PATH}
              pathLength={BARBS_LEN}
              stroke={COLOR}
              strokeWidth="1.2"
              strokeDasharray={BARBS_LEN}
              strokeDashoffset={BARBS_LEN}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ) : (
          <g className={isPulse ? undefined : 'sh-arrow'}>
            <path
              className={isPulse ? 'sh-arrow' : undefined}
              d={ARROW_PATH}
              stroke={COLOR}
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              markerEnd="url(#sh-arrowhead)"
            />
          </g>
        )}
      </g>
    </svg>
  )
})

export default StartHereAnnotation
