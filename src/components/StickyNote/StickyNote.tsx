import styles from './StickyNote.module.css'

type StickyNoteProps = {
  color: string
  label?: string
  lines?: string[]
  text?: string
  href?: string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export default function StickyNote({
  color,
  label,
  lines,
  text,
  href,
  className,
  style,
  onClick,
}: StickyNoteProps) {
  const isClickable = Boolean(href || onClick)

  function handleClick() {
    if (href) window.open(href, '_blank', 'noopener,noreferrer')
    onClick?.()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className={`${styles.note} ${isClickable ? styles.clickable : ''} ${className ?? ''}`}
      style={{ background: color, ...style }}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'link' : undefined}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
    >
      {label && <div className={styles.label}>{label}</div>}

      {lines && lines.length > 0 && (
        <ul className={styles.lines} aria-label={label}>
          {lines.map((line, i) => (
            <li key={i} className={styles.line}>{line}</li>
          ))}
        </ul>
      )}

      {text && (
        <span className={styles.singleText}>{text}</span>
      )}
    </div>
  )
}
