import styles from './MetricsGrid.module.css'

export type MetricItem = {
  metric: string
  whatItIs: string
  whyItMatters: string
}

function MetricCard({ item }: { item: MetricItem }) {
  return (
    <div className={styles.card}>
      <span className={styles.metricLabel}>{item.metric}</span>
      <p className={styles.whatItIs}>{item.whatItIs}</p>
      <p className={styles.whyItMatters}>{item.whyItMatters}</p>
    </div>
  )
}

export default function MetricsGrid({ items }: { items: MetricItem[] }) {
  return (
    <div className={styles.grid}>
      {items.map((item, i) => (
        <MetricCard key={i} item={item} />
      ))}
    </div>
  )
}
