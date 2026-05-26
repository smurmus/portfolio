import { useState, useCallback, useEffect, useRef } from 'react'

export type StackState = 'collapsed' | 'expanded'

type UseUnstackOptions = {
  containerRef: React.RefObject<HTMLElement | null>
  onCollapse?: () => void
}

export function useUnstack({ containerRef, onCollapse }: UseUnstackOptions) {
  const [state, setState] = useState<StackState>('collapsed')
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const isMobile = useRef(false)

  // Detect mobile/touch device
  useEffect(() => {
    isMobile.current = window.matchMedia('(hover: none)').matches
  }, [])

  const expand = useCallback(() => setState('expanded'), [])

  const collapse = useCallback(() => {
    setState('collapsed')
    setHoveredIndex(-1)
    onCollapse?.()
  }, [onCollapse])

  const toggle = useCallback(() => {
    setState(s => s === 'collapsed' ? 'expanded' : 'collapsed')
    setHoveredIndex(-1)
  }, [])

  // Keyboard: Escape collapses
  useEffect(() => {
    if (state !== 'expanded') return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        collapse()
        containerRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [state, collapse, containerRef])

  return {
    state,
    hoveredIndex,
    setHoveredIndex,
    expand,
    collapse,
    toggle,
    isMobile: isMobile.current,
  }
}
