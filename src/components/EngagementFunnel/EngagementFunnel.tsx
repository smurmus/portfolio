import styles from './EngagementFunnel.module.css'

// All figures 2025 estimates — see appendix for sources
const MAU   = 260
const DAU   = 31.5
const NITRO = 7.3

const nitroPct    = (NITRO / MAU) * 100          // ~2.8%
const nonNitroDau = ((DAU - NITRO) / MAU) * 100  // ~9.3%
const observerPct = ((MAU - DAU) / MAU) * 100    // ~87.9%
const observerM   = Math.round(MAU - DAU)

export default function EngagementFunnel() {
  return (
    <div className={styles.wrapper}>

      {/* Single stacked bar */}
      <div className={styles.barTrack}>
        <div
          className={styles.segmentNitro}
          style={{ width: `${nitroPct}%` }}
          title={`Nitro subscribers: ${NITRO}M`}
        />
        <div
          className={styles.segmentDau}
          style={{ width: `${nonNitroDau}%` }}
          title={`Non-Nitro daily active: ~${Math.round(DAU - NITRO)}M`}
        />
        <div
          className={styles.segmentObserver}
          style={{ width: `${observerPct}%` }}
          title={`Observer gap: ~${observerM}M`}
        />
      </div>

      {/* Labels */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.swatch} data-seg="nitro" />
          <span className={styles.legendStat}>{NITRO}M</span>
          <span className={styles.legendLabel}>Nitro subscribers</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.swatch} data-seg="dau" />
          <span className={styles.legendStat}>{DAU}M</span>
          <span className={styles.legendLabel}>Daily active</span>
        </div>
        <div className={`${styles.legendItem} ${styles.legendObserver}`}>
          <span className={styles.swatch} data-seg="observer" />
          <span className={styles.legendStat}>~{observerM}M</span>
          <span className={styles.legendLabel}>monthly-not-daily — Observer behavior likely concentrated here</span>
        </div>
      </div>

      <p className={styles.annotation}>
        Waypoints is a lever at the Observer → daily active boundary.
      </p>

    </div>
  )
}
