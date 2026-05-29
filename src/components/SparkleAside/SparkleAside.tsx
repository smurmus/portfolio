import { useState } from 'react'
import styles from './SparkleAside.module.css'

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M12 2L13.6 9.4L21 12L13.6 14.6L12 22L10.4 14.6L3 12L10.4 9.4L12 2Z" fill="currentColor" />
    </svg>
  )
}

export default function SparkleAside({
  content,
  href,
  hrefLabel,
}: {
  content: string
  href?: string
  hrefLabel?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close note' : 'Show note'}
      >
        <Sparkle className={`${styles.sparkle} ${styles.s1}`} />
        <Sparkle className={`${styles.sparkle} ${styles.s2}`} />
        <Sparkle className={`${styles.sparkle} ${styles.s3}`} />
      </button>

      <div className={`${styles.reveal} ${open ? styles.revealOpen : ''}`} aria-hidden={!open}>
        <div>
          <p className={styles.content}>{content}</p>
          {href && (
            <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {hrefLabel ?? 'source ↗'}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
