import { useNavigate } from 'react-router-dom'
import styles from './Polaroid.module.css'
import type { PolaroidData } from '../../config/boardItems'

type PolaroidSize = 'standard' | 'large' | 'landscape'

type PolaroidProps = {
  data: PolaroidData
  isClickable: boolean
  size?: PolaroidSize
  accentColor?: string
  className?: string
  style?: React.CSSProperties
}

const sizeClass: Record<PolaroidSize, string> = {
  standard: '',
  large: 'sizeLarge',
  landscape: 'sizeLandscape',
}

export default function Polaroid({ data, isClickable, size = 'standard', accentColor, className, style }: PolaroidProps) {
  const navigate = useNavigate()
  const { imageSrc, imageAlt, caption, href, isExternal, imagePosition } = data

  const hasImage = Boolean(imageSrc)
  const isNavigable = isClickable && Boolean(href)

  function handleClick(e: React.MouseEvent) {
    if (!isNavigable) return
    e.stopPropagation()  // prevent PolaroidStack collapse handler from firing
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      navigate(href)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(e as unknown as React.MouseEvent)
    }
  }

  return (
    <div
      className={`${styles.card} ${sizeClass[size] ? styles[sizeClass[size] as keyof typeof styles] : ''} ${isNavigable ? styles.cardClickable : ''} ${className ?? ''}`}
      style={{
        ...style,
        ...(accentColor ? { borderColor: `color-mix(in srgb, ${accentColor} 30%, var(--color-polaroid-border))` } : {}),
      }}
      onClick={handleClick}
      onKeyDown={isNavigable ? handleKeyDown : undefined}
      role={isNavigable ? 'link' : undefined}
      tabIndex={isNavigable ? 0 : undefined}
      aria-label={isNavigable ? `${caption} — ${imageAlt}` : undefined}
    >
      <div className={styles.imageArea}>
        {hasImage ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className={styles.image}
            loading="lazy"
            width={160}
            height={150}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderLabel}>{imageAlt}</span>
          </div>
        )}
      </div>

      <div className={styles.caption}>
        <span className={isNavigable ? styles.captionLink : styles.captionText}>
          {caption}
        </span>
      </div>
    </div>
  )
}
