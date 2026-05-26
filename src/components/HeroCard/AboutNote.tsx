import { useNavigate } from 'react-router-dom'
import styles from './AboutNote.module.css'

type AboutNoteProps = {
  text: string
  href: string
  color?: string
  className?: string
  style?: React.CSSProperties
}

export default function AboutNote({ text, href, color, className, style }: AboutNoteProps) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(href)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className={`${styles.note} ${className ?? ''}`}
      style={{ background: color, ...style }}
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={text}
    >
      <span className={styles.text}>{text}</span>
    </div>
  )
}
