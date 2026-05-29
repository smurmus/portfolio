import styles from './TldrTimeline.module.css'

const nodes = [
  { year: '2024',       label: 'Original design',          outlined: false },
  { year: '2024–2026',  label: 'Discord ships 3 features', outlined: false },
  { year: '2026',       label: 'Gap identified',            outlined: true  },
  { year: '2026',       label: 'Waypoints',                 outlined: false },
]

export default function TldrTimeline() {
  return (
    <div className={styles.wrapper}>
      {nodes.map((node, i) => (
        <div key={i} className={styles.node}>
          <span className={styles.year}>{node.year}</span>
          <div className={node.outlined ? styles.circleOutlined : styles.circleFilled} />
          <span className={styles.label}>{node.label}</span>
        </div>
      ))}
    </div>
  )
}
