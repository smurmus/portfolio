import { useState } from 'react'
import styles from './Sticker.module.css'

type StickerProps = {
  imageSrc: string
  alt: string
  size: number
  className?: string
  style?: React.CSSProperties
}

export default function Sticker({ imageSrc, alt, size, className, style }: StickerProps) {
  const [wobbling, setWobbling] = useState(false)
  const hasImage = Boolean(imageSrc)

  function handlePointerEnter() {
    setWobbling(true)
  }

  function handleAnimationEnd() {
    setWobbling(false)
  }

  return (
    <div
      className={`${styles.sticker} ${wobbling ? 'wobble' : ''} ${className ?? ''}`}
      style={{ width: size, height: size, ...style }}
      onPointerEnter={handlePointerEnter}
      onAnimationEnd={handleAnimationEnd}
    >
      {hasImage ? (
        <img
          src={imageSrc}
          alt=""  /* decorative — alt intentionally empty */
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
