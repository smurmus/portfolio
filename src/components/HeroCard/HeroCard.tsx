import styles from './HeroCard.module.css'

type HeroCardProps = {
  name: string
  tagline: string
  emoji?: string
  className?: string
}

export default function HeroCard({ name, tagline, emoji, className }: HeroCardProps) {
  return (
    <div className={`${styles.card} ${className ?? ''}`}>
      <h1 className={styles.name}>
        {name}
        {emoji && (
          <span className={styles.waveEmoji} aria-hidden="true"> {emoji}</span>
        )}
      </h1>
      <p className={styles.tagline}>{tagline}</p>
    </div>
  )
}
