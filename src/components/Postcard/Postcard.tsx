import styles from './Postcard.module.css'

type PostcardProps = {
  imageSrc: string
  imageAlt: string
  className?: string
  style?: React.CSSProperties
}

export default function Postcard({ imageSrc, imageAlt, className, style }: PostcardProps) {
  const hasImage = Boolean(imageSrc)

  return (
    <div className={`${styles.card} ${className ?? ''}`} style={style}>
      {hasImage ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className={styles.image}
          width={160}
          height={108}
          loading="lazy"
        />
      ) : (
        <div className={styles.placeholder}>
          <span className={styles.placeholderLabel}>
            {/* TODO: replace with real postcard photo */}
            {imageAlt}
          </span>
        </div>
      )}
    </div>
  )
}
