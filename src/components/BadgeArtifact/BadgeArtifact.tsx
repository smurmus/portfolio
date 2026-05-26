import styles from './BadgeArtifact.module.css'

type BadgeArtifactProps = {
  company: string
  name: string
  title: string
  imageSrc: string
  className?: string
  style?: React.CSSProperties
}

export default function BadgeArtifact({
  company,
  name,
  title,
  imageSrc,
  className,
  style,
}: BadgeArtifactProps) {
  const hasImage = Boolean(imageSrc)

  return (
    <div className={`${styles.wrapper} ${className ?? ''}`} style={style}>
      {/* Lanyard — SVG curved line hanging from badge top */}
      <svg
        className={styles.lanyard}
        width="30"
        height="28"
        viewBox="0 0 30 28"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M15 0 C10 8, 5 16, 15 24 C25 16, 20 8, 15 0"
          stroke="#C9B99A"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div className={styles.badge} role="img" aria-label={`${name} — ${company} ID badge`}>
        <div className={styles.photoArea}>
          {hasImage ? (
            <img
              src={imageSrc}
              alt={name}
              className={styles.photo}
              width={70}
              height={70}
              loading="lazy"
            />
          ) : (
            <span className={styles.photoPlaceholder}>
              {/* TODO: add badge photo to public/assets/artifacts/badge-placeholder.png */}
              photo
            </span>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.company}>{company}</div>
          <div className={styles.name}>{name}</div>
          <div className={styles.title}>{title}</div>
        </div>

        <div className={styles.stripe} aria-hidden="true" />
      </div>
    </div>
  )
}
