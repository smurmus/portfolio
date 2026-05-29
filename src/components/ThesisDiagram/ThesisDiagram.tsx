import styles from './ThesisDiagram.module.css'

const leftItems = [
  'Information overload',
  'Content hard to find',
  'Channel structure as solution',
  'Admin-side curation',
  'Navigation and filtering',
]

const rightItems = [
  'Re-entry illegitimacy',
  'Content crossing channel boundaries',
  'User intent as the missing layer',
  'Member-side, ongoing curation',
  'A reason to come back',
]

export default function ThesisDiagram() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.columns}>
        <div className={`${styles.col} ${styles.colLeft}`}>
          <h4 className={styles.colHeading}>What Discord built for</h4>
          <ul className={styles.list}>
            {leftItems.map(item => (
              <li key={item} className={styles.item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={`${styles.col} ${styles.colRight}`}>
          <h4 className={styles.colHeading}>What the research found</h4>
          <ul className={styles.list}>
            {rightItems.map(item => (
              <li key={item} className={styles.item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className={styles.caption}>
        Every Discord feature addresses the left column.
        Waypoints addresses the right.
      </p>
    </div>
  )
}
