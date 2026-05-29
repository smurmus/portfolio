import { useEffect, useRef } from 'react'
import styles from './CaseStudyHero.module.css'

type Props = {
  imageSrc: string
  imageAlt: string
  title: string
  subhead: string
  skipToId?: string
  prototypeHref?: string
  ctaLabel?: string
  rotation?: number
  accentColor?: string
  /** When set, hero fills 100vh. Image starts blurred; text drifts up + image unblurs on scroll. */
  hookText?: string
}

export default function CaseStudyHero({
  imageSrc,
  imageAlt,
  title,
  subhead,
  skipToId,
  prototypeHref,
  ctaLabel,
  rotation = 0.8,
  accentColor,
  hookText,
}: Props) {
  const imageRef = useRef<HTMLImageElement>(null)
  const hookRef = useRef<HTMLDivElement>(null)
  const cardGroupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hookText) return

    const BLUR_START = 7    // px blur at scroll=0 — legible but clearly unfocused
    const REVEAL_END = 150  // scroll px where image is fully sharp
    const TEXT_FADE_END = 160
    const CARD_START = 80
    const CARD_END = 260

    const onScroll = () => {
      const y = window.scrollY

      // Image: blur from BLUR_START→0 and scale 1.04→1 as image sharpens
      if (imageRef.current) {
        const blurProgress = Math.min(1, y / REVEAL_END)
        const blur = BLUR_START * (1 - blurProgress)
        const scale = 1 + 0.02 * (1 - blurProgress)
        imageRef.current.style.filter = blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : ''
        imageRef.current.style.transform = `scale(${scale.toFixed(4)})`
      }

      // Hook text: drifts upward and fades out
      if (hookRef.current) {
        const progress = Math.min(1, y / TEXT_FADE_END)
        hookRef.current.style.opacity = String((1 - progress).toFixed(3))
        hookRef.current.style.transform = `translateY(${(-progress * 40).toFixed(1)}px)`
      }

      // Title card: fades + slides in after text is mostly gone
      if (cardGroupRef.current) {
        const progress = Math.min(1, Math.max(0, (y - CARD_START) / (CARD_END - CARD_START)))
        cardGroupRef.current.style.opacity = String(progress.toFixed(3))
        cardGroupRef.current.style.transform = `translateY(${((1 - progress) * 20).toFixed(1)}px)`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [hookText])

  return (
    <div
      className={`${styles.hero} ${hookText ? styles.heroFullViewport : ''}`}
      style={!imageSrc && accentColor ? { background: accentColor } : undefined}
    >
      {imageSrc ? (
        <img
          ref={hookText ? imageRef : undefined}
          src={imageSrc}
          alt={imageAlt}
          className={styles.image}
          style={hookText ? { filter: `blur(7px)`, transform: 'scale(1.02)', transformOrigin: 'center center' } : undefined}
          draggable={false}
        />
      ) : (
        <div className={styles.imagePlaceholder} aria-label={imageAlt} />
      )}

      <div className={styles.gradient} aria-hidden="true" />

      {hookText && (
        <div ref={hookRef} className={styles.hookOverlay}>
          <p className={styles.hookOverlayText}>{hookText}</p>
        </div>
      )}

      <div
        ref={hookText ? cardGroupRef : undefined}
        className={styles.cardGroup}
        style={hookText ? { opacity: 0, transform: 'translateY(20px)' } : undefined}
      >
        <div
          className={styles.card}
          style={{ '--rotation': `${rotation}deg` } as React.CSSProperties}
        >
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Case Study</span>
            {prototypeHref && (
              <a
                href={prototypeHref}
                {...(prototypeHref.startsWith('#') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className={styles.protoLink}
              >
                {ctaLabel ?? 'prototype ↗'}
              </a>
            )}
          </div>
          <h1 className={styles.cardTitle}>{title}</h1>
          <p className={styles.subhead}>{subhead}</p>
          {skipToId && (
            <a href={`#${skipToId}`} className={styles.skipLink}>
              skip to TL;DR ↓
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
