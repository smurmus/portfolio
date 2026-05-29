import styles from './Design2024Landscape.module.css'

type Feature = {
  name: string
  year: string
  desc: string
  isFavorites?: boolean
}

const features: Feature[] = [
  { name: 'Threads', year: '2021', desc: 'Organise fast-moving chat into side threads' },
  { name: 'Forum channels', year: '2022', desc: 'Browseable topic threads for focused discussion' },
  { name: 'Browse Channels', year: '2023', desc: 'Admin-curated channel discovery for new members' },
  { name: 'AI Summaries', year: '2023', desc: 'Catch up on what you missed while away' },
  { name: 'Favorites', year: '2026', desc: 'Pinned channels from across your servers — surfaced in one sidebar', isFavorites: true },
]

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M12 2L13.6 9.4L21 12L13.6 14.6L12 22L10.4 14.6L3 12L10.4 9.4L12 2Z" />
    </svg>
  )
}

export default function Design2024Landscape() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>What Discord had already built going into 2024</p>
      <div className={styles.row}>
        {features.map(f => (
          <div key={f.name} className={`${styles.card} ${f.isFavorites ? styles.cardFavorites : ''}`}>
            {f.isFavorites && <SparkleIcon className={styles.sparkleIcon} />}
            <div className={styles.nameRow}>
              <span className={styles.name}>{f.name}</span>
              <span className={`${styles.year} ${f.isFavorites ? styles.yearFavorites : ''}`}>{f.year}</span>
            </div>
            <p className={styles.desc}>{f.desc}</p>
          </div>
        ))}
      </div>
      <p className={styles.caption}>
        The landscape the Launchpad was designed into. <SparkleIcon className={styles.captionSparkle} /> shipped after.
      </p>
    </div>
  )
}
