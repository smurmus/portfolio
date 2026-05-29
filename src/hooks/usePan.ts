import React, { useRef, useCallback, useEffect, useLayoutEffect } from 'react'

const BOARD_WIDTH  = 7000
const BOARD_HEIGHT = 5000
const LERP         = 0.12

// Touch / mouse drag momentum
const MOMENTUM_SAMPLES = 3
const DECAY            = 0.88
const MIN_VEL          = 0.5

type Vec2 = { x: number; y: number }

function defaultPan(vpW: number, vpH: number): Vec2 {
  return {
    x: vpW / 2 - BOARD_WIDTH  / 2 - 300,
    // Offset down 60px so projects peek into the initial view without dominating
    y: vpH / 2 - BOARD_HEIGHT / 2 - 60,
  }
}

function clamp(x: number, y: number, vpW: number, vpH: number): Vec2 {
  return {
    x: Math.min(0, Math.max(vpW - BOARD_WIDTH,  x)),
    y: Math.min(0, Math.max(vpH - BOARD_HEIGHT, y)),
  }
}

export function usePan(canvasRef: React.RefObject<HTMLElement | null>) {
  const pan     = useRef<Vec2>({ x: 0, y: 0 })
  const target  = useRef<Vec2>({ x: 0, y: 0 })
  const rafId   = useRef<number | null>(null)
  const lerping = useRef(false)
  const settled = useRef<((p: Vec2) => void) | null>(null)

  const dragging = useRef(false)
  const lastPtr  = useRef<Vec2>({ x: 0, y: 0 })
  const velHist  = useRef<Vec2[]>([])

  const apply = useCallback((x: number, y: number) => {
    const el = canvasRef.current
    if (el) el.style.transform = `translate3d(${x}px,${y}px,0)`
  }, [canvasRef])

  // ── Init: fires before first paint so there's no position flash ──
  useLayoutEffect(() => {
    const vpW = window.innerWidth
    const vpH = window.innerHeight
    const initial = defaultPan(vpW, vpH)
    pan.current    = initial
    target.current = initial
    apply(initial.x, initial.y)
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
      const next = clamp(pan.current.x + dx, pan.current.y + dy, window.innerWidth, window.innerHeight)
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
        const next = clamp(pan.current.x + vx, pan.current.y + vy, window.innerWidth, window.innerHeight)
        pan.current = next; target.current = next
        apply(next.x, next.y)
        rafId.current = requestAnimationFrame(momentum)
      }
      rafId.current = requestAnimationFrame(momentum)
    }

    // Wheel / trackpad — passive:false so preventDefault() actually works
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const scale = e.deltaMode === 1 ? 24 : 1
      const next = clamp(
        pan.current.x - e.deltaX * scale,
        pan.current.y - e.deltaY * scale,
        window.innerWidth, window.innerHeight
      )
      pan.current    = next
      target.current = next
      apply(next.x, next.y)
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

  const getPan = useCallback(() => pan.current, [])

  const onPanSettled = useCallback((cb: (p: Vec2) => void) => {
    settled.current = cb
  }, [])

  const recenter = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    dragging.current = false
    lerping.current  = false

    const dest = defaultPan(window.innerWidth, window.innerHeight)
    target.current   = dest

    const animate = () => {
      const dx = dest.x - pan.current.x
      const dy = dest.y - pan.current.y
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        pan.current = dest
        apply(dest.x, dest.y)
        settled.current?.(dest)
        return
      }
      pan.current = { x: pan.current.x + dx * LERP, y: pan.current.y + dy * LERP }
      apply(pan.current.x, pan.current.y)
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)
  }, [apply])

  return { onPointerDown, getPan, onPanSettled, recenter }
}
