import styles from './Sticker.module.css'

type StickerProps = {
  imageSrc: string
  hoverImageSrc?: string
  /** 'fade' fades the hover image in on top; 'clip-wipe' reveals it with a left-to-right wipe */
  revealMode?: 'fade' | 'clip-wipe'
  alt: string
  size: number
  variant?: 'social'
  className?: string
  style?: React.CSSProperties
}

export default function Sticker({ imageSrc, hoverImageSrc, alt, size, variant, className, style, revealMode = 'fade' }: StickerProps) {
  const hasImage = Boolean(imageSrc)

  const variantClass = variant === 'social' ? styles['social-sticker'] : ''

  return (
    <div
      className={`${styles.sticker} ${variantClass} ${className ?? ''}`}
      style={{ width: size, height: size, ...style }}
    >
      {hasImage && hoverImageSrc ? (
        <div className={styles.imageWrapper}>
          <img
            src={imageSrc}
            alt=""
            className={`${styles.image} ${styles.imageDefault}`}
            width={size}
            height={size}
            loading="lazy"
          />
          <img
            src={hoverImageSrc}
            alt=""
            className={`${styles.image} ${revealMode === 'clip-wipe' ? styles.imageHoverClip : styles.imageHover}`}
            width={size}
            height={size}
            loading="lazy"
          />
        </div>
      ) : hasImage ? (
        <img
          src={imageSrc}
          alt=""
          className={styles.image}
          width={size}
          height={size}
          loading="lazy"
        />
      ) : (
        <div
          className={styles.placeholder}
          style={{ width: size, height: size }}
          role="img"
          aria-label={alt}
        >
          <span className={styles.placeholderLabel}>{alt}</span>
        </div>
      )}
    </div>
  )
}
