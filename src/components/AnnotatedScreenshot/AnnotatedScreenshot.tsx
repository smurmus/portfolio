import { useRef, useEffect, useState } from 'react'
import type { AnnotationBeat } from '../../types/content'
import styles from './AnnotatedScreenshot.module.css'

type AnnotatedScreenshotProps = {
  src: string
  alt: string
  beats: AnnotationBeat[]
  caption?: string
}

// Beats fire at these scroll progress thresholds (0–1)
const THRESHOLDS = [0.2, 0.55, 0.88]

// On mobile (≤480px) only show beat index 1 (sidebar)
const MOBILE_BEAT = 1

export default function AnnotatedScreenshot({ src, alt, beats, caption }: AnnotatedScreenshotProps) {
  const scrollRangeRef = useRef<HTMLDivElement>(null)
  const [activeBeat, setActiveBeat] = useState(-1)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile on mount and resize
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 480px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Scroll progress → active beat
  useEffect(() => {
    const onScroll = () => {
      const el = scrollRangeRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const totalScrollable = el.offsetHeight - window.innerHeight
      if (totalScrollable <= 0) return

      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))

      // On mobile, only beat MOBILE_BEAT fires — at the midpoint of scroll range
      if (isMobile) {
        setActiveBeat(progress >= 0.4 ? MOBILE_BEAT : -1)
        return
      }

      // Desktop: step through thresholds in reverse to find highest fired
      let next = -1
      for (let i = THRESHOLDS.length - 1; i >= 0; i--) {
        if (progress >= THRESHOLDS[i]) { next = i; break }
      }
      setActiveBeat(next)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // check position on mount
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  const scrollRangeHeight = `${(beats.length + 1) * 100}vh`

  return (
    <>
    <div
      ref={scrollRangeRef}
      className={styles.scrollRange}
      style={{ height: scrollRangeHeight }}
      data-beat-thresholds={THRESHOLDS.join(',')}
    >
      <div className={styles.sticky}>
        <div className={styles.stickyInner}>
        <div className={styles.screenshotWrapper}>
          <img
            src={src}
            alt={alt}
            className={styles.screenshot}
            draggable={false}
            loading="lazy"
          />

          {/* Region overlays — dim/highlight each UI zone */}
          {beats.map((beat, i) => {
            // On mobile, only render the one mobile beat's region
            if (isMobile && i !== MOBILE_BEAT) return null

            const isActive = activeBeat === i
            const isAnyActive = activeBeat >= 0
            const isDimmed = isAnyActive && !isActive

            return (
              <div
                key={i}
                aria-hidden="true"
                className={`
                  ${styles.region}
                  ${isActive ? styles.regionActive : ''}
                  ${isDimmed ? styles.regionDimmed : ''}
                `.trim()}
                style={{
                  left: beat.region.left,
                  top: beat.region.top,
                  width: beat.region.width,
                  height: beat.region.height,
                }}
              />
            )
          })}

          {/* Member list — always dimmed when any beat is active, no annotation */}
          <div
            aria-hidden="true"
            className={`${styles.region} ${activeBeat >= 0 ? styles.regionDimmed : ''}`}
            style={{ left: '79%', top: '0%', width: '21%', height: '100%' }}
          />

          {/* Annotation cards */}
          {beats.map((beat, i) => {
            // On mobile, only render mobile beat's card
            if (isMobile && i !== MOBILE_BEAT) return null

            const isVisible = activeBeat === i
            const isRight = beat.card.side === 'right'
            const offset = beat.card.offset ?? 2

            const cardStyle: React.CSSProperties = {
              top: `${beat.card.top}%`,
              ...(isRight
                ? { right: `${offset}%` }
                : { left: `${offset}%` }
              ),
              ...(beat.card.fontSize ? { fontSize: `${beat.card.fontSize}px` } : {}),
            }

            return (
              <div
                key={i}
                aria-live="polite"
                aria-atomic="true"
                className={`
                  ${styles.card}
                  ${isRight ? styles.cardRight : styles.cardLeft}
                  ${beat.isPullQuote ? styles.cardPullQuote : ''}
                  ${isVisible ? styles.cardVisible : ''}
                `.trim()}
                style={cardStyle}
              >
                <span className={styles.cardText}>{beat.label}</span>
              </div>
            )
          })}
        </div>
        {caption && <p className={styles.captionBelow}>{caption}</p>}
        </div>
      </div>
    </div>
    </>
  )
}
