import { useRef, useEffect, useCallback, useState } from 'react'
import { usePan } from '../../hooks/usePan'
import styles from './Board.module.css'

const VIEWPORT_BUFFER = 800 // px beyond viewport to render items
const BOARD_ITEM_MARGIN = 200 // rough item half-size for culling

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
  const viewportRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [visibleIds, setVisibleIds] = useState<Set<string>>(() => new Set(items.map(i => i.id)))
  const [entranceActive, setEntranceActive] = useState(false)

  const { onPointerDown, initPan, getPan, registerPanChangeCallback } = usePan(
    canvasRef as React.RefObject<HTMLElement | null>
  )

  // Update culling — called on pan end, not during drag
  const updateCulling = useCallback(() => {
    const pan = getPan()
    const vpW = window.innerWidth
    const vpH = window.innerHeight

    // Canvas center in screen space: panX + boardW/2, panY + boardH/2
    // Item screen position: canvasCenterX + item.x, canvasCenterY + item.y
    const canvasCenterX = pan.x + 3000
    const canvasCenterY = pan.y + 2000

    const next = new Set<string>()
    for (const item of items) {
      const screenX = canvasCenterX + item.x
      const screenY = canvasCenterY + item.y
      const inView =
        screenX > -VIEWPORT_BUFFER - BOARD_ITEM_MARGIN &&
        screenX < vpW + VIEWPORT_BUFFER + BOARD_ITEM_MARGIN &&
        screenY > -VIEWPORT_BUFFER - BOARD_ITEM_MARGIN &&
        screenY < vpH + VIEWPORT_BUFFER + BOARD_ITEM_MARGIN
      if (inView) next.add(item.id)
    }
    setVisibleIds(next)
  }, [items, getPan])

  useEffect(() => {
    initPan()
    // Register culling update on pan end
    registerPanChangeCallback(updateCulling)

    // Initial culling pass
    updateCulling()

    // Trigger entrance animation
    const entranceTimer = setTimeout(() => setEntranceActive(true), 50)

    return () => clearTimeout(entranceTimer)
  }, [initPan, registerPanChangeCallback, updateCulling])

  // Clean up will-change after entrance completes
  useEffect(() => {
    if (!entranceActive) return
    const cleanup = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>('.board-item')
      els.forEach(el => { el.style.willChange = 'auto' })
    }, 1000)
    return () => clearTimeout(cleanup)
  }, [entranceActive])

  return (
    <div
      ref={viewportRef}
      className={`${styles.viewport} ${className ?? ''}`}
      role="region"
      aria-label="portfolio board — drag to explore"
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
                  '--resting-rotation': `${item.rotation}deg`,
                  '--entrance-delay': `${item.entranceDelay}ms`,
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
