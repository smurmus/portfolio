import React, { useRef, useCallback, useEffect, useLayoutEffect } from 'react'

const BOARD_WIDTH  = 7000
const BOARD_HEIGHT = 5000
const LERP         = 0.12

// Touch / mouse drag momentum
const MOMENTUM_SAMPLES = 3
const DECAY            = 0.88
const MIN_VEL          = 0.5

// Zoom limits
const MIN_SCALE = 0.3
const MAX_SCALE = 3.0

type Vec2 = { x: number; y: number }

function defaultPan(vpW: number, vpH: number): Vec2 {
  // On mobile, hero card shrinks to 320px — use a smaller x offset so it stays on-screen
  const xOffset = vpW < 640 ? -160 : -300
  return {
    x: vpW / 2 - BOARD_WIDTH  / 2 + xOffset,
    // Offset down 60px so projects peek into the initial view without dominating
    y: vpH / 2 - BOARD_HEIGHT / 2 - 60,
  }
}

function clampScaled(x: number, y: number, s: number, vpW: number, vpH: number): Vec2 {
  return {
    x: Math.min(0, Math.max(vpW - BOARD_WIDTH  * s, x)),
    y: Math.min(0, Math.max(vpH - BOARD_HEIGHT * s, y)),
  }
}

export function usePan(canvasRef: React.RefObject<HTMLElement | null>) {
  const pan     = useRef<Vec2>({ x: 0, y: 0 })
  const target  = useRef<Vec2>({ x: 0, y: 0 })
  const scale   = useRef(1)
  const rafId   = useRef<number | null>(null)
  const lerping = useRef(false)
  const settled = useRef<((p: Vec2) => void) | null>(null)

  const dragging = useRef(false)
  const lastPtr  = useRef<Vec2>({ x: 0, y: 0 })
  const velHist  = useRef<Vec2[]>([])

  const apply = useCallback((x: number, y: number, s: number = scale.current) => {
    const el = canvasRef.current
    if (el) el.style.transform = `translate3d(${x}px,${y}px,0) scale(${s})`
  }, [canvasRef])

  // ── Init: fires before first paint so there's no position flash ──
  useLayoutEffect(() => {
    const vpW = window.innerWidth
    const vpH = window.innerHeight
    const initial = defaultPan(vpW, vpH)
    pan.current    = initial
    target.current = initial
    scale.current  = 1
    apply(initial.x, initial.y, 1)
    // Clear any stale pan from previous sessions
    try { sessionStorage.removeItem('board-pan') } catch { /* ignore */ }
  }, [apply])

  // ── Pointer drag (mouse + touch) ──────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (rafId.current) { cancelAnimationFrame(rafId.current); lerping.current = false }
    dragging.current = true
    lastPtr.current  = { x: e.clientX, y: e.clientY }
    velHist.current  = []
    // No setPointerCapture: window-level listeners handle drag, and capture
    // would fire pointerleave on PolaroidStack before click fires — collapsing
    // the stack and making isNavigable false, blocking navigation.
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const dx = e.clientX - lastPtr.current.x
      const dy = e.clientY - lastPtr.current.y
      lastPtr.current = { x: e.clientX, y: e.clientY }
      velHist.current.push({ x: dx, y: dy })
      if (velHist.current.length > MOMENTUM_SAMPLES) velHist.current.shift()
      const next = clampScaled(pan.current.x + dx, pan.current.y + dy, scale.current, window.innerWidth, window.innerHeight)
      pan.current = next; target.current = next
      apply(next.x, next.y)
    }

    const onUp = () => {
      if (!dragging.current) return
      dragging.current = false
      const hist = velHist.current
      if (!hist.length) return
      let vx = hist.reduce((s, v) => s + v.x, 0) / hist.length
      let vy = hist.reduce((s, v) => s + v.y, 0) / hist.length
      if (Math.abs(vx) < MIN_VEL && Math.abs(vy) < MIN_VEL) return
      const momentum = () => {
        vx *= DECAY; vy *= DECAY
        if (Math.abs(vx) < MIN_VEL && Math.abs(vy) < MIN_VEL) {
          settled.current?.(pan.current); return
        }
        const next = clampScaled(pan.current.x + vx, pan.current.y + vy, scale.current, window.innerWidth, window.innerHeight)
        pan.current = next; target.current = next
        apply(next.x, next.y)
        rafId.current = requestAnimationFrame(momentum)
      }
      rafId.current = requestAnimationFrame(momentum)
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (e.ctrlKey) {
        // Pinch gesture — zoom centered on cursor
        if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = null }
        const delta = e.deltaY * (e.deltaMode === 1 ? 24 : 1)
        const factor = Math.exp(-delta * 0.006)
        const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale.current * factor))

        // Keep board point under cursor fixed in viewport
        const cx = e.clientX
        const cy = e.clientY
        const ratio = newScale / scale.current
        const newX = cx - (cx - pan.current.x) * ratio
        const newY = cy - (cy - pan.current.y) * ratio

        scale.current = newScale
        const next = clampScaled(newX, newY, newScale, window.innerWidth, window.innerHeight)
        pan.current = next; target.current = next
        apply(next.x, next.y, newScale)
      } else {
        // Two-finger scroll — pan
        const sc = e.deltaMode === 1 ? 24 : 1
        const next = clampScaled(
          pan.current.x - e.deltaX * sc,
          pan.current.y - e.deltaY * sc,
          scale.current,
          window.innerWidth, window.innerHeight,
        )
        pan.current    = next
        target.current = next
        apply(next.x, next.y)
      }
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup',   onUp)
    window.addEventListener('wheel',       onWheel, { passive: false })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup',   onUp)
      window.removeEventListener('wheel',       onWheel)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [apply])

  const getPan   = useCallback(() => pan.current,   [])
  const getScale = useCallback(() => scale.current, [])

  const onPanSettled = useCallback((cb: (p: Vec2) => void) => {
    settled.current = cb
  }, [])

  const panBy = useCallback((dx: number, dy: number) => {
    if (rafId.current) { cancelAnimationFrame(rafId.current); lerping.current = false }
    const next = clampScaled(pan.current.x + dx, pan.current.y + dy, scale.current, window.innerWidth, window.innerHeight)
    pan.current    = next
    target.current = next
    apply(next.x, next.y)
    settled.current?.(next)
  }, [apply])

  const recenter = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    dragging.current = false
    lerping.current  = false

    // Snap scale back to 1 immediately; animate position
    scale.current = 1

    const dest = defaultPan(window.innerWidth, window.innerHeight)
    target.current = dest

    const animate = () => {
      const dx = dest.x - pan.current.x
      const dy = dest.y - pan.current.y
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        pan.current = dest
        apply(dest.x, dest.y, 1)
        settled.current?.(dest)
        return
      }
      pan.current = { x: pan.current.x + dx * LERP, y: pan.current.y + dy * LERP }
      apply(pan.current.x, pan.current.y, 1)
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)
  }, [apply])

  return { onPointerDown, getPan, getScale, onPanSettled, recenter, panBy }
}
