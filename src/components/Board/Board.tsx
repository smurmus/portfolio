import { useRef, useEffect, useCallback, useState } from 'react'
import { usePan } from '../../hooks/usePan'
import styles from './Board.module.css'

const BUFFER = 1200 // px outside viewport to still render items

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

export default function Board({ items, className }: BoardProps) {
  const viewportRef   = useRef<HTMLDivElement>(null)
  const canvasRef     = useRef<HTMLDivElement>(null)
  const [visibleIds, setVisibleIds] = useState<Set<string>>(() => new Set(items.map(i => i.id)))
  const [entranceActive, setEntranceActive] = useState(false)

  const { onPointerDown, initPan, getPan, onPanSettled } = usePan(
    canvasRef as React.RefObject<HTMLElement | null>
  )

  // Recompute which items fall within the expanded viewport window.
  // pan.x is the canvas translate — board center is at (pan.x + 3000, pan.y + 2000)
  // in screen space, so item screen position = (pan.x + 3000 + item.x, pan.y + 2000 + item.y).
  const updateCulling = useCallback(() => {
    const p   = getPan()
    const vpW = window.innerWidth
    const vpH = window.innerHeight
    const cx  = p.x + 3000
    const cy  = p.y + 2000

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
    const vp = viewportRef.current
    if (!vp) return

    // initPan returns a cleanup fn that removes the mousemove listener
    const cleanup = initPan(vp)

    // Re-cull whenever pan settles (mouse-follow lerp end, drag momentum end)
    onPanSettled(updateCulling)

    // Initial cull after pan is set
    updateCulling()

    const entranceTimer = setTimeout(() => setEntranceActive(true), 50)

    return () => {
      cleanup()
      clearTimeout(entranceTimer)
    }
  }, [initPan, onPanSettled, updateCulling])

  // Remove will-change after entrance completes
  useEffect(() => {
    if (!entranceActive) return
    const t = setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.board-item')
        .forEach(el => { el.style.willChange = 'auto' })
    }, 1100)
    return () => clearTimeout(t)
  }, [entranceActive])

  return (
    <div
      ref={viewportRef}
      className={`${styles.viewport} ${className ?? ''}`}
      role="region"
      aria-label="portfolio board — move your mouse to explore"
      onPointerDown={onPointerDown}
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
                  '--resting-rotation':  `${item.rotation}deg`,
                  '--entrance-delay':    `${item.entranceDelay}ms`,
                  willChange: 'transform, opacity',
                } as React.CSSProperties}
              >
                {item.children}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export type { BoardItem }
