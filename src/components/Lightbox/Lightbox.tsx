import { useEffect } from 'react'
import styles from './Lightbox.module.css'

type Props = {
  src: string
  alt: string
  onClose: () => void
}

export default function Lightbox({ src, alt, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Full size image"
    >
      <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>
      <img
        src={src}
        alt={alt}
        className={styles.image}
        onClick={e => e.stopPropagation()}
      />
    </div>
  )
}
