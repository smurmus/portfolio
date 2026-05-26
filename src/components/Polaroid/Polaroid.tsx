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
  const { imageSrc, imageAlt, caption, href, isExternal } = data

  const hasImage = Boolean(imageSrc)
  const hasCaption = Boolean(caption)
  const isNavigable = isClickable && Boolean(href)

  function handleCaptionClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (!isNavigable) return
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      navigate(href)
    }
  }

  function handleCaptionKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCaptionClick(e as unknown as React.MouseEvent)
    }
  }

  return (
    <div className={`${styles.card} ${className ?? ''}`} style={style}>
      <div className={styles.imageArea}>
        {hasImage ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className={styles.image}
            loading="lazy"
            width={160}
            height={150}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderLabel}>{imageAlt}</span>
          </div>
        )}
      </div>

      <div className={styles.caption}>
        {hasCaption && isNavigable ? (
          <span
            role="link"
            tabIndex={0}
            className={styles.captionLink}
            onClick={handleCaptionClick}
            onKeyDown={handleCaptionKeyDown}
            aria-label={`${caption} — ${imageAlt}`}
          >
            {caption}
          </span>
        ) : (
          <span className={styles.captionText}>{caption}</span>
        )}
      </div>
    </div>
  )
}
