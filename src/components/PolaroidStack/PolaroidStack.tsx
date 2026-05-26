import { useRef, useCallback, useState, useEffect } from 'react'
import Polaroid from '../Polaroid/Polaroid'
import type { PolaroidData } from '../../config/boardItems'
import styles from './PolaroidStack.module.css'

type PolaroidStackProps = {
  polaroids: PolaroidData[]
  variant: 'project' | 'decorative'
  className?: string
}

const CARD_WIDTH = 160
const CARD_GAP = 40   // breathing room between cards in lined state
const FAN_RADIUS = 70
const FAN_LIFT = 30
const FAN_ANGLE = 15  // max fan angle in degrees (±)

// ── Position math ────────────────────────────────────────
// Returns the outer transform (X position + rotation).
// Y lift is handled separately by the inner liftWrapper.

function getCardPosition(i: number, n: number, isLined: boolean) {
  if (isLined) {
    const totalWidth = n * CARD_WIDTH + (n - 1) * CARD_GAP
    const tx = -(totalWidth / 2) + i * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2
    return { tx, ty: 0, angle: 0 }
  }
  if (n === 1) return { tx: 0, ty: 0, angle: 0 }
  const angle = -FAN_ANGLE + ((FAN_ANGLE * 2) / (n - 1)) * i
  const rad = (angle * Math.PI) / 180
  const tx = Math.sin(rad) * FAN_RADIUS
  const ty = (1 - Math.cos(rad)) * -FAN_LIFT
  return { tx, ty, angle }
}

function getZIndex(i: number, n: number, isLined: boolean, hoveredIndex: number): number {
  if (isLined) {
    if (i === hoveredIndex) return n + 10
    return i
  }
  // Fan: middle card on top so the spread reads as centered
  const mid = (n - 1) / 2
  return n - Math.round(Math.abs(i - mid))
}

// ── Component ────────────────────────────────────────────

export default function PolaroidStack({ polaroids, variant, className }: PolaroidStackProps) {
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
          ? `project polaroids — ${n} items, press Enter to expand`
          : `decorative polaroid stack — ${n} items`
      }
      tabIndex={0}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Invisible bridge fills the full lined span so gaps between cards
          don't count as "outside the component", preventing pointerleave misfires. */}
      {isLined && (() => {
        const bridgeWidth = n * CARD_WIDTH + (n - 1) * CARD_GAP
        return (
          <div
            aria-hidden="true"
            className={styles.bridge}
            style={{
              left: `${-bridgeWidth / 2}px`,
              width: `${bridgeWidth}px`,
            }}
            onPointerEnter={() => setHoveredIndex(-1)}
          />
        )
      })()}

      {polaroids.map((polaroid, i) => {
        const { tx, ty, angle } = getCardPosition(i, n, isLined)
        const isCardHovered = isLined && hoveredIndex === i
        const zIndex = getZIndex(i, n, isLined, hoveredIndex)

        const outerTransform = `translateX(${tx}px) translateY(${ty}px) rotate(${angle}deg)`
        const liftTransform = `translateY(${isCardHovered ? -8 : 0}px)`

        return (
          <div
            key={polaroid.id}
            ref={el => { cardRefs.current[i] = el }}
            className={styles.cardWrapper}
            style={{ transform: outerTransform, zIndex }}
            tabIndex={isLined && isProject ? 0 : -1}
            onFocus={() => isLined && setHoveredIndex(i)}
            onBlur={() => setHoveredIndex(-1)}
            onPointerEnter={() => isLined && setHoveredIndex(i)}
            onPointerLeave={(e) => {
              // Only clear if leaving the stack entirely, not moving to a sibling card.
              // pointerleave fires before pointerenter on the next element, so without
              // this check the index resets to -1 before the next card can claim it.
              const to = e.relatedTarget as Node | null
              if (!containerRef.current?.contains(to)) setHoveredIndex(-1)
            }}
            onKeyDown={(e) => {
              if (!isLined || !isProject) return
              if (e.key === 'Enter') {
                e.preventDefault()
                const link = e.currentTarget.querySelector('[role="link"]') as HTMLElement
                link?.click()
              }
            }}
          >
            <div
              className={`${styles.liftWrapper} ${isCardHovered ? styles.lifted : ''}`}
              style={{ transform: liftTransform }}
            >
              <Polaroid
                data={polaroid}
                isClickable={isProject && isLined}
                style={{ pointerEvents: isLined ? 'auto' : 'none' }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
