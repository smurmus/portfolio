import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './BadgeArtifact.module.css'

type BadgeArtifactProps = {
  company: string
  name: string
  title: string
  imageSrc?: string
  pushpinSrc?: string
  href?: string
  className?: string
  style?: React.CSSProperties
}

export default function BadgeArtifact({
  company,
  name,
  title,
  imageSrc,
  pushpinSrc,
  href,
  className,
  style,
}: BadgeArtifactProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const navigate = useNavigate()
  const showImage = Boolean(imageSrc) && !imgFailed
  const titleLines = title.split('\n')

  const interactiveProps = href ? {
    role: 'link' as const,
    tabIndex: 0,
    onClick: () => navigate(href),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(href) }
    },
    'aria-label': `${name} — ${company} ID badge — view work history`,
    style: { ...style, cursor: 'pointer' },
  } : { style }

  if (showImage) {
    return (
      <div className={`${styles.wrapper} ${className ?? ''}`} {...interactiveProps}>
        {pushpinSrc && (
          <img
            src={pushpinSrc}
            alt=""
            aria-hidden="true"
            className={styles.pushpin}
          />
        )}
        <img
          src={imageSrc}
          alt={`${name} — ${company} ID badge`}
          className={styles.badgeImg}
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      </div>
    )
  }

  // HTML fallback while PNGs are missing
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`} {...interactiveProps}>
      <div className={styles.pushpinFallback} aria-hidden="true">
        <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
          <ellipse cx="14" cy="16" rx="11" ry="3" fill="rgba(0,0,0,0.15)" />
          <circle cx="14" cy="12" r="11" fill="#A0632A" />
          <circle cx="14" cy="12" r="9" fill="#C87B3A" />
          <circle cx="10" cy="8" r="3" fill="rgba(255,255,255,0.25)" />
          <rect x="12.5" y="21" width="3" height="15" rx="1.5" fill="#8B5520" />
        </svg>
      </div>
      <div
        className={styles.badge}
        role="img"
        aria-label={`${name} — ${company} ID badge`}
      >
        <div className={styles.logoRow}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <rect width="14" height="14" rx="3" fill="#F97316" />
            <rect x="3" y="6" width="8" height="1.5" rx="0.75" fill="white" />
            <rect x="3" y="3" width="8" height="1.5" rx="0.75" fill="white" />
            <rect x="3" y="9" width="5" height="1.5" rx="0.75" fill="white" />
          </svg>
          <span className={styles.company}>{company}</span>
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.name}>{name}</div>
        <div className={styles.title}>
          {titleLines.map((line, i) => (
            <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
          ))}
        </div>
        {href && (
          <div className={styles.historyHint} aria-hidden="true">work history →</div>
        )}
      </div>
    </div>
  )
}
