import { useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Polaroid from '../Polaroid/Polaroid'
import { useUnstack } from '../../hooks/useUnstack'
import type { PolaroidData } from '../../config/boardItems'
import styles from './PolaroidStack.module.css'

type PolaroidStackProps = {
  polaroids: PolaroidData[]
  variant: 'project' | 'decorative'
  className?: string
}

// ── Fan math ─────────────────────────────────────────────
// Derived from N, no hardcoded angles.
function getFanTransform(i: number, n: number, isExpanded: boolean, isHovered: boolean) {
  if (!isExpanded) {
    // Collapsed: stack with visible offsets beneath top card
    const isTop = i === n - 1
    if (isTop) {
      return `translateX(0px) translateY(0px) rotate(${0}deg)`
    }
    const stackOffset = (n - 1 - i) // distance from top
    return `translateX(${stackOffset * 4}px) translateY(${stackOffset * 3}px) rotate(${0}deg)`
  }

  // N=1: no fan, just lift on hover
  if (n === 1) {
    const lift = isHovered ? -8 : 0
    return `translateX(0px) translateY(${lift}px) rotate(0deg)`
  }

  // Fan from bottom-center pivot
  const angle = -25 + (50 / (n - 1)) * i
  const rad = (angle * Math.PI) / 180
  const tx = Math.sin(rad) * 80
  const ty = (1 - Math.cos(rad)) * -40
  const lift = isHovered ? -8 : 0

  return `translateX(${tx}px) translateY(${ty + lift}px) rotate(${angle}deg)`
}

export default function PolaroidStack({ polaroids, variant, className }: PolaroidStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const isProject = variant === 'project'
  const n = polaroids.length

  const { state, hoveredIndex, setHoveredIndex, expand, collapse, toggle } = useUnstack({
    containerRef,
    onCollapse: () => containerRef.current?.focus(),
  })

  const isExpanded = state === 'expanded'

  // Desktop: expand on pointer enter, collapse on leave (with hit-area padding via CSS)
  const handlePointerEnter = useCallback(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (!isTouchDevice) expand()
  }, [expand])

  const handlePointerLeave = useCallback(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (!isTouchDevice) collapse()
  }, [collapse])

  // Mobile: first tap expands, tap on container (not card) collapses
  const handleClick = useCallback((e: React.MouseEvent) => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (!isTouchDevice) return
    if (!isExpanded) {
      expand()
      e.stopPropagation()
      return
    }
    // Tap on container area (not a card) — collapse
    if (e.target === containerRef.current) {
      collapse()
    }
  }, [isExpanded, expand, collapse])

  // Keyboard: Enter/Space to expand collapsed stack
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isExpanded && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      expand()
    }
  }, [isExpanded, expand])

  // Focus management: when expanded, move focus to first card
  useEffect(() => {
    if (isExpanded && cardRefs.current[0]) {
      cardRefs.current[0]?.focus()
    }
  }, [isExpanded])

  // Z-index: top card (last in array) renders on top when collapsed
  // When expanded, hovered card gets highest z
  function getZIndex(i: number) {
    if (!isExpanded) return i
    if (i === hoveredIndex) return n + 10
    return i
  }

  return (
    <>
      {/* Mobile collapse overlay — rendered via portal behind stack */}
      {isExpanded && createPortal(
        <div
          className={styles.mobileOverlay}
          onClick={collapse}
          aria-hidden="true"
          style={{ zIndex: 50 }}
        />,
        document.body
      )}

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
        style={{ zIndex: isExpanded ? 100 : undefined }}
      >
        {polaroids.map((polaroid, i) => {
          const isHovered = isExpanded && hoveredIndex === i
          const transform = getFanTransform(i, n, isExpanded, isHovered)
          const isCollapsing = !isExpanded

          return (
            <div
              key={polaroid.id}
              ref={el => { cardRefs.current[i] = el }}
              className={`
                ${styles.cardWrapper}
                ${isCollapsing ? styles.collapsing : ''}
                ${isHovered ? styles.hovered : ''}
              `.trim()}
              style={{
                transform,
                zIndex: getZIndex(i),
                // Only apply tabIndex to cards when expanded
                ...(isExpanded && isProject ? {} : {}),
              }}
              tabIndex={isExpanded && isProject ? 0 : -1}
              role={isExpanded && isProject ? 'link' : undefined}
              aria-label={isExpanded && isProject ? polaroid.caption : undefined}
              onFocus={() => isExpanded && setHoveredIndex(i)}
              onBlur={() => setHoveredIndex(-1)}
              onPointerEnter={() => isExpanded && setHoveredIndex(i)}
              onPointerLeave={() => setHoveredIndex(-1)}
              onKeyDown={(e) => {
                if (!isExpanded || !isProject) return
                if (e.key === 'Enter') {
                  e.preventDefault()
                  // Navigate — Polaroid caption click handles the actual nav
                  const link = e.currentTarget.querySelector('[role="link"]') as HTMLElement
                  link?.click()
                }
              }}
            >
              <Polaroid
                data={polaroid}
                isClickable={isProject && isExpanded}
                style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
