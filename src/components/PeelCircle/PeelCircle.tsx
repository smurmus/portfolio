import { useRef, useEffect, type ReactNode } from 'react'
import styles from './PeelCircle.module.css'

const DEFAULT_PALETTE: [string, string][] = [
  ['#D94F38', '#fafafa'],
  ['#6B62A8', '#FFFAF4'],
  ['#4A8C72', '#fafafa'],
  ['#E8A030', '#FFFAF4'],
  ['#F0956A', '#fafafa'],
]

function lighten(hex: string, t: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${Math.round(r + (255 - r) * t)},${Math.round(g + (255 - g) * t)},${Math.round(b + (255 - b) * t)})`
}

type Props = {
  /** Content shown in the reveal layer (circle-clipped). Defaults to bgColor fill. */
  children?: ReactNode
  /** Override the default color palette. Each entry is [fgHex, bgHex]. */
  palette?: [string, string][]
  /** Called after each color flip completes. */
  onFlip?: () => void
  hintText?: string
  className?: string
}

export default function PeelCircle({
  children,
  palette = DEFAULT_PALETTE,
  onFlip,
  hintText = 'peel me',
  className = '',
}: Props) {
  const frontRef = useRef<HTMLDivElement>(null)
  const backRef  = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function applyColor(idx: number) {
    const [fg, bg] = palette[idx % palette.length]
    const front = frontRef.current
    const back  = backRef.current
    const reveal = revealRef.current
    if (!front || !back || !reveal) return

    front.style.background = fg
    front.style.backgroundImage = ''

    back.style.backgroundColor = lighten(fg, 0.50)
    back.style.backgroundImage =
      `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 100%)`

    reveal.style.background = 'transparent'
  }

  useEffect(() => {
    applyColor(indexRef.current)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [palette])

  function handleClick() {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      indexRef.current = (indexRef.current + 1) % palette.length
      applyColor(indexRef.current)
      onFlip?.()
    }, 750)
  }

  return (
    <div className={`${styles.peel} ${className}`} onClick={handleClick}>

      {/* REVEAL LAYER */}
      <div className={styles.reveal} ref={revealRef}>
        <div className={styles['peel-reveal-content']}>
          {children}
        </div>
      </div>

      {/* Perforated ring — renders before sticker faces so they sit on top of it */}
      <svg
        className={styles['perforated-ring']}
        width="180" height="180"
        aria-hidden="true"
      >
        <circle
          cx="90" cy="90" r="69"
          fill="none"
          stroke="var(--color-board-dot)"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          strokeLinecap="round"
        />
      </svg>

      {/* STICKER FACES */}
      <div className={styles.sticky}>
        <div className={`${styles['circle-wrapper']} ${styles['front-wrapper']}`}>
          <div className={`${styles.circle} ${styles.front}`} ref={frontRef} />
        </div>
        <div className={`${styles['circle-wrapper']} ${styles['back-wrapper']}`}>
          <div className={`${styles.circle} ${styles.back}`} ref={backRef} />
        </div>
      </div>

      <span className={styles['peel-hint']}>{hintText}</span>
    </div>
  )
}
