import { useRef, useCallback, useEffect } from 'react'

const SESSION_KEY = 'board-pan'
const MOMENTUM_HISTORY = 3       // pointer events to average velocity from
const DECAY_FACTOR = 0.88        // exponential decay per frame
const MIN_VELOCITY = 0.5         // px/frame at which momentum stops
const BOARD_WIDTH = 6000
const BOARD_HEIGHT = 4000

type Vec2 = { x: number; y: number }

function clampPan(x: number, y: number, vpW: number, vpH: number): Vec2 {
  const minX = vpW - BOARD_WIDTH / 2
  const maxX = BOARD_WIDTH / 2
  const minY = vpH - BOARD_HEIGHT / 2
  const maxY = BOARD_HEIGHT / 2
  return {
    x: Math.min(maxX, Math.max(minX, x)),
    y: Math.min(maxY, Math.max(minY, y)),
  }
}

function loadSavedPan(): Vec2 | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Vec2
  } catch {
    return null
  }
}

function savePan(pan: Vec2): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(pan))
  } catch {
    // sessionStorage unavailable — silently ignore
  }
}

export type PanState = {
  x: number
  y: number
}

export function usePan(containerRef: React.RefObject<HTMLElement | null>) {
  const pan = useRef<Vec2>({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastPointer = useRef<Vec2>({ x: 0, y: 0 })
  const velocityHistory = useRef<Vec2[]>([])
  const rafId = useRef<number | null>(null)
  // Listener refs so we can remove them
  const onMoveFn = useRef<((e: PointerEvent) => void) | null>(null)
  const onUpFn = useRef<((e: PointerEvent) => void) | null>(null)

  // Callback so Board can read current pan for culling
  const onPanChange = useRef<((pan: Vec2) => void) | null>(null)

  const applyTransform = useCallback((x: number, y: number) => {
    const el = containerRef.current
    if (!el) return
    el.style.transform = `translate(${x}px, ${y}px)`
  }, [containerRef])

  const cancelMomentum = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }, [])

  const runMomentum = useCallback((vx: number, vy: number) => {
    const step = () => {
      vx *= DECAY_FACTOR
      vy *= DECAY_FACTOR

      if (Math.abs(vx) < MIN_VELOCITY && Math.abs(vy) < MIN_VELOCITY) {
        savePan(pan.current)
        onPanChange.current?.(pan.current)
        return
      }

      const vpW = window.innerWidth
      const vpH = window.innerHeight
      const next = clampPan(pan.current.x + vx, pan.current.y + vy, vpW, vpH)
      pan.current = next
      applyTransform(next.x, next.y)

      rafId.current = requestAnimationFrame(step)
    }
    rafId.current = requestAnimationFrame(step)
  }, [applyTransform])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Only pan on primary pointer and when target is the canvas itself
    if (e.button !== 0 && e.pointerType === 'mouse') return
    cancelMomentum()
    isDragging.current = true
    lastPointer.current = { x: e.clientX, y: e.clientY }
    velocityHistory.current = []
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [cancelMomentum])

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current) return

    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }

    // Keep velocity history for momentum calc
    velocityHistory.current.push({ x: dx, y: dy })
    if (velocityHistory.current.length > MOMENTUM_HISTORY) {
      velocityHistory.current.shift()
    }

    const vpW = window.innerWidth
    const vpH = window.innerHeight
    const next = clampPan(pan.current.x + dx, pan.current.y + dy, vpW, vpH)
    pan.current = next
    applyTransform(next.x, next.y)
  }, [applyTransform])

  const onPointerUp = useCallback((_e: PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false

    // Average last N velocity samples
    const hist = velocityHistory.current
    if (hist.length > 0) {
      const avgVx = hist.reduce((s, v) => s + v.x, 0) / hist.length
      const avgVy = hist.reduce((s, v) => s + v.y, 0) / hist.length
      if (Math.abs(avgVx) > MIN_VELOCITY || Math.abs(avgVy) > MIN_VELOCITY) {
        runMomentum(avgVx, avgVy)
        return
      }
    }

    savePan(pan.current)
    onPanChange.current?.(pan.current)
  }, [runMomentum])

  // Attach move/up to window so drag continues outside container
  useEffect(() => {
    onMoveFn.current = onPointerMove
    onUpFn.current = onPointerUp

    const move = (e: PointerEvent) => onMoveFn.current?.(e)
    const up = (e: PointerEvent) => onUpFn.current?.(e)

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      cancelMomentum()
    }
  }, [onPointerMove, onPointerUp, cancelMomentum])

  // Initialize pan position on mount
  const initPan = useCallback(() => {
    const saved = loadSavedPan()
    const vpW = window.innerWidth
    const vpH = window.innerHeight

    // Default: center the hero zone (board center) in the viewport
    const defaultX = vpW / 2
    const defaultY = vpH / 2

    const initial = saved ?? { x: defaultX, y: defaultY }
    const clamped = clampPan(initial.x, initial.y, vpW, vpH)
    pan.current = clamped
    applyTransform(clamped.x, clamped.y)
  }, [applyTransform])

  const registerPanChangeCallback = useCallback((cb: (pan: Vec2) => void) => {
    onPanChange.current = cb
  }, [])

  return {
    onPointerDown,
    initPan,
    getPan: () => pan.current,
    registerPanChangeCallback,
  }
}
