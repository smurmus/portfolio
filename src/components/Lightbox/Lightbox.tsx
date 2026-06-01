import { useEffect, useRef } from 'react'
import styles from './Lightbox.module.css'

type Props = {
  src: string
  alt: string
  onClose: () => void
}

export default function Lightbox({ src, alt, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<Element | null>(null)

  useEffect(() => {
    triggerRef.current = document.activeElement
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'Tab') {
        // Only focusable element is the close button — keep focus there
        e.preventDefault()
        closeRef.current?.focus()
      }
    }

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      ;(triggerRef.current as HTMLElement | null)?.focus()
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
      <button ref={closeRef} className={styles.close} onClick={onClose} aria-label="Close">✕</button>
      <img
        src={src}
        alt={alt}
        className={styles.image}
        onClick={e => e.stopPropagation()}
      />
    </div>
  )
}
