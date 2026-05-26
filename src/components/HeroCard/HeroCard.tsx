import styles from './HeroCard.module.css'

type HeroCardProps = {
  name: string
  tagline: string
  className?: string
}

export default function HeroCard({ name, tagline, className }: HeroCardProps) {
  return (
    <div className={`${styles.card} ${className ?? ''}`}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.tagline}>{tagline}</p>
    </div>
  )
}
