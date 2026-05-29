import { useNavigate } from 'react-router-dom'
import styles from './Polaroid.module.css'
import type { PolaroidData } from '../../config/boardItems'

type PolaroidProps = {
  data: PolaroidData
  isClickable: boolean
  className?: string
  style?: React.CSSProperties
}

export default function Polaroid({ data, isClickable, className, style }: PolaroidProps) {
  const navigate = useNavigate()
  const { imageSrc, imageAlt, caption, href, isExternal, imagePosition } = data

  const hasImage = Boolean(imageSrc)
  const isNavigable = isClickable && Boolean(href)

  function handleClick(e: React.MouseEvent) {
    if (!isNavigable) return
    e.stopPropagation()  // prevent PolaroidStack collapse handler from firing
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else if (href.includes('#')) {
      const [path, hash] = href.split('#')
      navigate(path || '/')
      // defer scroll until after navigation renders
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      })
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
      className={`${styles.card} ${isNavigable ? styles.cardClickable : ''} ${className ?? ''}`}
      style={style}
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
