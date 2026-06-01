import { memo } from 'react'
import styles from './AirplaneTrail.module.css'

// Start matches the scissors origin: SVG (40,360) → board (520,−40), just right of greeting
const START_X = 40
const START_Y = 360

const PIN_X = 1200
const PIN_Y = -10
const FONT_SIZE = 28
const ATTR_FONT_SIZE = 15
const TEXT_X = PIN_X + 16

const LINE1_Y = PIN_Y + FONT_SIZE * 0.60
const LINE2_Y = LINE1_Y + FONT_SIZE * 1.72
const ATTR_Y  = LINE2_Y + FONT_SIZE * 1.72 + 4

// Departure tangent at (40,360): first CP (80,400) → direction (40,40) → 45°
const AIRPLANE_ANGLE = 45

const TRAIL_COLOR = 'var(--color-text-primary)'

// 7 segments, 5 direction changes — wanders like something that flew in from a distance
const TRAIL_PATH = [
  `M ${START_X},${START_Y}`,
  `C 80,400 180,430 270,400`,    // short shallow dip
  `C 340,375 360,270 460,250`,   // arc back up
  `C 520,238 540,310 640,290`,   // dip — loop 1
  `C 700,278 720,180 820,160`,   // arc back up
  `C 870,150 890,210 980,190`,   // dip — loop 2
  `C 1020,180 1060,100 1140,60`, // arc up higher
  `C 1160,50 1180,20 ${PIN_X},${PIN_Y}`, // final approach from below-left
].join(' ')

const AIRPLANE_TRANSFORM = `translate(${START_X},${START_Y}) rotate(${AIRPLANE_ANGLE})`
const PIN_TRANSFORM = `translate(${PIN_X},${PIN_Y})`

const AirplaneTrail = memo(function AirplaneTrail() {
  return (
    <svg
      width="900"
      height="520"
      viewBox="0 0 900 520"
      className={styles.trail}
      aria-hidden="true"
      overflow="visible"
    >
      <g opacity="0.20">
        <path
          d={TRAIL_PATH}
          stroke={TRAIL_COLOR}
          strokeWidth="1.5"
          strokeDasharray="6 5"
          strokeLinecap="round"
          fill="none"
        />

        <polygon
          points="10,0 -10,-7 -4,0 -10,7"
          fill={TRAIL_COLOR}
          transform={AIRPLANE_TRANSFORM}
        />

        <g transform={PIN_TRANSFORM}>
          <path
            d="M 0,0 C -3,-5 -6,-9 -6,-16 A 6,6 0 1 1 6,-16 C 6,-9 3,-5 0,0 Z"
            fill={TRAIL_COLOR}
          />
          <circle cx="0" cy="-16" r="2.5" fill="#f5f4f0" />
        </g>
      </g>

      {/* Quote text — click navigates to about#beyond-heading; hover lifts opacity */}
      <g
        className={styles.quote}
        opacity="0.20"
        onClick={() => { window.location.href = '/about#beyond-heading' }}
        role="link"
        aria-label="Visit the beyond work section"
      >
        <text
          x={TEXT_X}
          y={LINE1_Y}
          fontFamily="'Edu NSW ACT Cursive', cursive"
          fontSize={FONT_SIZE}
          fontWeight="400"
          fill="var(--color-text-primary)"
          textRendering="optimizeSpeed"
        >
          the universe is not made of atoms;
        </text>
        <text
          x={TEXT_X}
          y={LINE2_Y}
          fontFamily="'Edu NSW ACT Cursive', cursive"
          fontSize={FONT_SIZE}
          fontWeight="400"
          fill="var(--color-text-primary)"
          textRendering="optimizeSpeed"
        >
          {"it's made of tiny stories."}
        </text>
        <text
          x={TEXT_X}
          y={ATTR_Y}
          fontFamily="'Edu NSW ACT Cursive', cursive"
          fontSize={ATTR_FONT_SIZE}
          fontWeight="400"
          fill="var(--color-text-primary)"
          textRendering="optimizeSpeed"
        >
          {"— Muriel Rukeyser"}
        </text>
      </g>
    </svg>
  )
})

export default AirplaneTrail
