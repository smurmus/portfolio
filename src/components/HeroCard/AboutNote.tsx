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

  return (
    <a
      className={`${styles.note} ${className ?? ''}`}
      style={{ background: color, ...style }}
      href={href}
      onClick={(e) => { e.preventDefault(); navigate(href) }}
    >
      <span className={styles.text}>{text}</span>
    </a>
  )
}
