import { useRef, useCallback, useEffect } from 'react'

const SESSION_KEY    = 'board-pan'
const BOARD_WIDTH    = 6000
const BOARD_HEIGHT   = 4000
// How much the board shifts per pixel of cursor offset from viewport center.
// 0.5 = cursor at edge shows the full item spread without losing the hero.
const PARALLAX       = 0.5
const LERP           = 0.08   // smooth-follow factor per frame (0–1)

// Drag (touch / mobile)
const MOMENTUM_SAMPLES = 3
const DECAY            = 0.88
const MIN_VEL          = 0.5

type Vec2 = { x: number; y: number }

// The translate(tx, ty) that places the board center at the viewport center.
function defaultPanFor(vpW: number, vpH: number): Vec2 {
  return {
    x: vpW / 2 - BOARD_WIDTH  / 2,   // e.g. 720 − 3000 = −2280
    y: vpH / 2 - BOARD_HEIGHT / 2,   // e.g. 400 − 2000 = −1600
  }
}

// Keep canvas edges from going past viewport edges.
function clamp(x: number, y: number, vpW: number, vpH: number): Vec2 {
  return {
    x: Math.min(0, Math.max(vpW - BOARD_WIDTH,  x)),
    y: Math.min(0, Math.max(vpH - BOARD_HEIGHT, y)),
  }
}

function loadSaved(): Vec2 | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as Vec2) : null
  } catch { return null }
}

function save(p: Vec2) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(p)) } catch { /**/ }
}

export function usePan(canvasRef: React.RefObject<HTMLElement | null>) {
  const pan       = useRef<Vec2>({ x: 0, y: 0 })
  const target    = useRef<Vec2>({ x: 0, y: 0 })
  const base      = useRef<Vec2>({ x: 0, y: 0 }) // default (board center) pan
  const rafId     = useRef<number | null>(null)
  const lerping   = useRef(false)
  const onSettled = useRef<((p: Vec2) => void) | null>(null)

  // Mobile drag state
  const dragging  = useRef(false)
  const lastPtr   = useRef<Vec2>({ x: 0, y: 0 })
  const velHist   = useRef<Vec2[]>([])

  const apply = useCallback((x: number, y: number) => {
    const el = canvasRef.current
    if (el) el.style.transform = `translate(${x}px,${y}px)`
  }, [canvasRef])

  // ── Lerp loop ────────────────────────────────────────────
  const startLerp = useCallback(() => {
    if (lerping.current) return
    lerping.current = true
    const step = () => {
      const dx = target.current.x - pan.current.x
      const dy = target.current.y - pan.current.y
      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
        pan.current = { ...target.current }
        apply(pan.current.x, pan.current.y)
        lerping.current = false
        onSettled.current?.(pan.current)
        return
      }
      pan.current = { x: pan.current.x + dx * LERP, y: pan.current.y + dy * LERP }
      apply(pan.current.x, pan.current.y)
      rafId.current = requestAnimationFrame(step)
    }
    rafId.current = requestAnimationFrame(step)
  }, [apply])

  const setTarget = useCallback((x: number, y: number) => {
    const vpW = window.innerWidth
    const vpH = window.innerHeight
    target.current = clamp(x, y, vpW, vpH)
    startLerp()
  }, [startLerp])

  // ── Mouse-follow (desktop) ────────────────────────────────
  const onMouseMove = useCallback((e: MouseEvent) => {
    const vpW = window.innerWidth
    const vpH = window.innerHeight
    const dx = (e.clientX - vpW / 2) * PARALLAX
    const dy = (e.clientY - vpH / 2) * PARALLAX
    setTarget(base.current.x - dx, base.current.y - dy)
  }, [setTarget])

  // ── Drag (touch / mobile pointer) ────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Only activate drag on touch; mouse uses follow
    if (e.pointerType === 'mouse') return
    if (rafId.current) cancelAnimationFrame(rafId.current)
    lerping.current = false
    dragging.current = true
    lastPtr.current  = { x: e.clientX, y: e.clientY }
    velHist.current  = []
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const dx = e.clientX - lastPtr.current.x
      const dy = e.clientY - lastPtr.current.y
      lastPtr.current = { x: e.clientX, y: e.clientY }
      velHist.current.push({ x: dx, y: dy })
      if (velHist.current.length > MOMENTUM_SAMPLES) velHist.current.shift()
      const vpW = window.innerWidth
      const vpH = window.innerHeight
      const next = clamp(pan.current.x + dx, pan.current.y + dy, vpW, vpH)
      pan.current = next
      target.current = next
      apply(next.x, next.y)
    }

    const onUp = () => {
      if (!dragging.current) return
      dragging.current = false
      const hist = velHist.current
      if (hist.length > 0) {
        let vx = hist.reduce((s, v) => s + v.x, 0) / hist.length
        let vy = hist.reduce((s, v) => s + v.y, 0) / hist.length
        if (Math.abs(vx) > MIN_VEL || Math.abs(vy) > MIN_VEL) {
          const momentum = () => {
            vx *= DECAY; vy *= DECAY
            if (Math.abs(vx) < MIN_VEL && Math.abs(vy) < MIN_VEL) {
              save(pan.current); onSettled.current?.(pan.current); return
            }
            const next = clamp(pan.current.x + vx, pan.current.y + vy, window.innerWidth, window.innerHeight)
            pan.current = next; target.current = next
            apply(next.x, next.y)
            rafId.current = requestAnimationFrame(momentum)
          }
          rafId.current = requestAnimationFrame(momentum)
          return
        }
      }
      save(pan.current)
      onSettled.current?.(pan.current)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup',   onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup',   onUp)
    }
  }, [apply])

  // ── Init ─────────────────────────────────────────────────
  const initPan = useCallback((viewportEl: HTMLElement) => {
    const vpW = window.innerWidth
    const vpH = window.innerHeight
    const def = defaultPanFor(vpW, vpH)
    base.current = def

    // Restore saved position (e.g. back from case study), else use default
    const saved   = loadSaved()
    const initial = saved ? clamp(saved.x, saved.y, vpW, vpH) : def
    pan.current    = initial
    target.current = initial
    apply(initial.x, initial.y)

    // Attach mouse-follow to the viewport element
    viewportEl.addEventListener('mousemove', onMouseMove)
    return () => viewportEl.removeEventListener('mousemove', onMouseMove)
  }, [apply, onMouseMove])

  const onPanSettled = useCallback((cb: (p: Vec2) => void) => {
    onSettled.current = cb
  }, [])

  return { onPointerDown, initPan, getPan: () => pan.current, onPanSettled }
}
