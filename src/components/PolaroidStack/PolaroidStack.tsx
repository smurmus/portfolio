import { useRef, useCallback, useState, useEffect } from 'react'
import Polaroid from '../Polaroid/Polaroid'
import type { PolaroidData } from '../../config/boardItems'
import styles from './PolaroidStack.module.css'

type CardSize = 'standard' | 'large' | 'landscape'

type PolaroidStackProps = {
  polaroids: PolaroidData[]
  variant: 'project' | 'decorative'
  cardSize?: CardSize
  accentColor?: string
  fanAngle?: number
  fanRadius?: number
  fanLift?: number
  restingRotation?: number
  className?: string
}

const SIZE_CONFIG: Record<CardSize, { width: number; height: number; gap: number }> = {
  standard:  { width: 200, height: 250, gap: 48 },
  large:     { width: 260, height: 320, gap: 56 },
  landscape: { width: 300, height: 210, gap: 48 },
}

const DEFAULT_FAN_RADIUS = 110
const DEFAULT_FAN_LIFT = 50
const DEFAULT_FAN_ANGLE = 24

// ── Position math ────────────────────────────────────────
// Returns the outer transform (X position + rotation).
// Y lift is handled separately by the inner liftWrapper.

function getCardPosition(i: number, n: number, isLined: boolean, fanAngle: number, fanRadius: number, fanLift: number, cardWidth: number, cardGap: number) {
  if (isLined) {
    const totalWidth = n * cardWidth + (n - 1) * cardGap
    const tx = -(totalWidth / 2) + i * (cardWidth + cardGap) + cardWidth / 2
    return { tx, ty: 0, angle: 0 }
  }
  if (n === 1) return { tx: 0, ty: 0, angle: 0 }
  const angle = -fanAngle + ((fanAngle * 2) / (n - 1)) * i
  const rad = (angle * Math.PI) / 180
  const tx = Math.sin(rad) * fanRadius
  const ty = (1 - Math.cos(rad)) * -fanLift
  return { tx, ty, angle }
}

function getZIndex(i: number, n: number, isLined: boolean, hoveredIndex: number): number {
  if (isLined) {
    if (i === hoveredIndex) return n + 10
    return i
  }
  // Fan: rightmost card on top
  return i
}

// ── Component ────────────────────────────────────────────

export default function PolaroidStack({ polaroids, variant, cardSize = 'standard', accentColor, fanAngle = DEFAULT_FAN_ANGLE, fanRadius = DEFAULT_FAN_RADIUS, fanLift = DEFAULT_FAN_LIFT, restingRotation = 0, className }: PolaroidStackProps) {
  const { width: cardWidth, height: cardHeight, gap: cardGap } = SIZE_CONFIG[cardSize]
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const isProject = variant === 'project'
  const n = polaroids.length

  const [isLined, setIsLined] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(-1)

  const expand = useCallback(() => setIsLined(true), [])

  const collapse = useCallback(() => {
    setIsLined(false)
    setHoveredIndex(-1)
  }, [])

  // Keyboard: Escape collapses
  useEffect(() => {
    if (!isLined) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        collapse()
        containerRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isLined, collapse])

  const handlePointerEnter = useCallback(() => {
    if (!window.matchMedia('(hover: none)').matches) expand()
  }, [expand])

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    if (window.matchMedia('(hover: none)').matches) return
    // Cards in lined state extend outside the container's layout bounds.
    // Only collapse if the pointer actually left the whole component subtree.
    const to = e.relatedTarget as Node | null
    if (!containerRef.current?.contains(to)) collapse()
  }, [collapse])

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!window.matchMedia('(hover: none)').matches) return
    e.stopPropagation()
    isLined ? collapse() : expand()
  }, [isLined, expand, collapse])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isLined && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      expand()
    }
  }, [isLined, expand])

  return (
    <div
      ref={containerRef}
      className={`${styles.stack} ${className ?? ''}`}
      role={isProject ? 'group' : 'img'}
      aria-label={
        isProject
          ? isLined
            ? `project polaroids — ${n} items, press Escape to collapse`
            : `project polaroids — ${n} items, press Enter to expand`
          : `decorative polaroid stack — ${n} items`
      }
      tabIndex={0}
      style={isLined ? { transform: `rotate(${-restingRotation}deg)` } : undefined}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Invisible bridge fills the full lined span so gaps between cards
          don't count as "outside the component", preventing pointerleave misfires. */}
      {isLined && (() => {
        const bridgeWidth = n * cardWidth + (n - 1) * cardGap
        return (
          <div
            aria-hidden="true"
            className={styles.bridge}
            style={{
              left: `${-bridgeWidth / 2}px`,
              width: `${bridgeWidth}px`,
              height: `${cardHeight}px`,
            }}
            onPointerEnter={() => setHoveredIndex(-1)}
          />
        )
      })()}

      {polaroids.map((polaroid, i) => {
        const { tx, ty, angle } = getCardPosition(i, n, isLined, fanAngle, fanRadius, fanLift, cardWidth, cardGap)
        const isCardHovered = isLined && hoveredIndex === i
        const zIndex = getZIndex(i, n, isLined, hoveredIndex)

        const totalAngle = isLined ? 0 : angle + polaroid.rotation
        const outerTransform = `translateX(${tx}px) translateY(${ty}px) rotate(${totalAngle}deg)`
        const liftTransform = `translateY(${isCardHovered ? -8 : 0}px)`

        return (
          <div
            key={polaroid.id}
            ref={el => { cardRefs.current[i] = el }}
            className={styles.cardWrapper}
            style={{ transform: outerTransform, zIndex }}
            onFocus={() => isLined && setHoveredIndex(i)}
            onBlur={() => setHoveredIndex(-1)}
            onPointerEnter={() => isLined && setHoveredIndex(i)}
            onPointerLeave={(e) => {
              const to = e.relatedTarget as Node | null
              if (!containerRef.current?.contains(to)) setHoveredIndex(-1)
            }}
          >
            <div
              className={`${styles.liftWrapper} ${isCardHovered ? styles.lifted : ''}`}
              style={{ transform: liftTransform }}
            >
              <Polaroid
                data={polaroid}
                isClickable={isProject && isLined}
                size={cardSize}
                accentColor={accentColor}
                style={{ pointerEvents: isLined ? 'auto' : 'none' }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
