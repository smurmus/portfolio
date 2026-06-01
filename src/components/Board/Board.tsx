import { useRef, useEffect, useCallback, useState, memo } from 'react'
import { usePan } from '../../hooks/usePan'
import styles from './Board.module.css'

const BUFFER = 2000 // px outside viewport to still render items

type BoardItem = {
  id: string
  x: number
  y: number
  zIndex: number
  rotation: number
  entranceDelay: number
  children: React.ReactNode
}

type BoardProps = {
  items: BoardItem[]
  className?: string
}

// ── Sparkle — burst at click position ────────────────────────

type SparkleData = { id: number; x: number; y: number }

// Same 4-pointed star path as SparkleAside
const STAR_PATH = 'M12 2L13.6 9.4L21 12L13.6 14.6L12 22L10.4 14.6L3 12L10.4 9.4L12 2Z'

const Sparkle = memo(function Sparkle({ x, y, onDone }: { x: number; y: number; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 620)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className={styles.sparkle} style={{ left: x, top: y }} aria-hidden="true">
      <svg viewBox="0 0 24 24" className={`${styles.sparkleStar} ${styles.sparkleStar1}`}>
        <path d={STAR_PATH}/>
      </svg>
      <svg viewBox="0 0 24 24" className={`${styles.sparkleStar} ${styles.sparkleStar2}`}>
        <path d={STAR_PATH}/>
      </svg>
      <svg viewBox="0 0 24 24" className={`${styles.sparkleStar} ${styles.sparkleStar3}`}>
        <path d={STAR_PATH}/>
      </svg>
    </div>
  )
})

// ── Drag hint — appears after IDLE_MS of no board interaction ──

function DragHint() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const dismiss = () => setVisible(false)
    window.addEventListener('pointerdown', dismiss, { once: true, passive: true })
    window.addEventListener('wheel',       dismiss, { once: true, passive: true })
    return () => {
      window.removeEventListener('pointerdown', dismiss)
      window.removeEventListener('wheel',       dismiss)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`${styles.dragHint} ${visible ? styles.dragHintVisible : ''}`}
    >
      move to explore
    </div>
  )
}

// ── Recenter button — snaps board back to default pan ──────────

function RecenterButton({ recenter }: { recenter: () => void }) {
  return (
    <button
      className={styles.recenterBtn}
      onClick={recenter}
      onPointerDown={e => e.stopPropagation()}
      aria-label="Recenter board"
      title="Recenter"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor" />
        <line x1="7" y1="1" x2="7" y2="3"   stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <line x1="7" y1="11" x2="7" y2="13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <line x1="1" y1="7" x2="3" y2="7"   stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <line x1="11" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
      recenter
    </button>
  )
}

// ── Board ──────────────────────────────────────────────────────

export default function Board({ items, className }: BoardProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const canvasRef   = useRef<HTMLDivElement>(null)
  const [visibleIds, setVisibleIds] = useState<Set<string>>(() => new Set(items.map(i => i.id)))
  const [entranceActive, setEntranceActive] = useState(false)

  const { onPointerDown, getPan, onPanSettled, recenter, panBy } = usePan(
    canvasRef as React.RefObject<HTMLElement | null>
  )

  const STEP = 200

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't pan when focus is on an interactive child (polaroid, sticker, button, link)
    const active = document.activeElement as HTMLElement | null
    if (active && active !== viewportRef.current && active !== document.body) {
      const tag = active.tagName
      if (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' || tag === 'TEXTAREA') return
      const role = active.getAttribute('role')
      if (role === 'button' || role === 'link' || role === 'group') return
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const step = prefersReduced ? STEP * 2 : STEP

    switch (e.key) {
      case 'ArrowLeft':  e.preventDefault(); panBy( step,     0); break
      case 'ArrowRight': e.preventDefault(); panBy(-step,     0); break
      case 'ArrowUp':    e.preventDefault(); panBy(    0,  step); break
      case 'ArrowDown':  e.preventDefault(); panBy(    0, -step); break
      case 'Home':       e.preventDefault(); recenter();          break
      case ' ':          e.preventDefault(); recenter();          break
    }
  }, [panBy, recenter])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const sparkleCount = useRef(0)
  const [sparkles, setSparkles] = useState<SparkleData[]>([])

  const handleClick = useCallback((e: React.MouseEvent) => {
    const id = ++sparkleCount.current
    setSparkles(prev => [...prev, { id, x: e.clientX, y: e.clientY }])
  }, [])

  const removeSparkle = useCallback((id: number) => {
    setSparkles(prev => prev.filter(s => s.id !== id))
  }, [])

  const updateCulling = useCallback(() => {
    const p   = getPan()
    const vpW = window.innerWidth
    const vpH = window.innerHeight
    const cx  = p.x + 3500
    const cy  = p.y + 2500

    const next = new Set<string>()
    for (const item of items) {
      const sx = cx + item.x
      const sy = cy + item.y
      if (
        sx > -BUFFER && sx < vpW + BUFFER &&
        sy > -BUFFER && sy < vpH + BUFFER
      ) next.add(item.id)
    }
    setVisibleIds(next)
  }, [items, getPan])

  useEffect(() => {
    onPanSettled(updateCulling)
    updateCulling()

    const rafId = requestAnimationFrame(() => setEntranceActive(true))

    const willChangeTimer = setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.board-item')
        .forEach(el => { el.style.willChange = 'auto' })
    }, 1000)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(willChangeTimer)
    }
  }, [onPanSettled, updateCulling])

  return (
    <div
      ref={viewportRef}
      className={`${styles.viewport} ${className ?? ''}`}
      role="region"
      aria-label="portfolio board — drag or scroll to explore, use arrow keys to pan"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onClick={handleClick}
    >
      <div ref={canvasRef} className={styles.canvas}>
        <div className={styles.itemsContainer}>
          {items.map(item => {
            if (!visibleIds.has(item.id)) return null
            return (
              <div
                key={item.id}
                className={`${styles.item} board-item ${entranceActive ? 'board-item--visible' : ''}`}
                style={{
                  left: item.x,
                  top: item.y,
                  zIndex: item.zIndex,
                  '--resting-rotation': `${item.rotation}deg`,
                  '--entrance-delay':   `${item.entranceDelay}ms`,
                  willChange: 'transform, opacity',
                } as React.CSSProperties}
              >
                {item.children}
              </div>
            )
          })}
        </div>
      </div>

      <RecenterButton recenter={recenter} />
      <DragHint />
      {sparkles.map(s => (
        <Sparkle key={s.id} x={s.x} y={s.y} onDone={() => removeSparkle(s.id)} />
      ))}
    </div>
  )
}

export type { BoardItem }
