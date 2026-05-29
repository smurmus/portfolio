import styles from './CollabDiagram.module.css'

export default function CollabDiagram() {
  return (
    <div className={styles.root}>

      {/* ── Hearth panel ─────────────────────────────────── */}
      <div className={styles.panel}>
        <span className={styles.panelTitle}>Hearth — Hajimari</span>
        <div className={styles.lanes}>
          <span className={styles.laneLabel}>Design</span>
          <div className={styles.lane}>
            <span className={styles.step}>Spec</span>
            <span className={styles.arrow}>→</span>
            <span className={styles.step}>Hand off</span>
          </div>

          <span className={styles.laneLabel}>Engineering</span>
          <div className={styles.lane}>
            <span className={styles.step}>Implement</span>
            <span className={styles.arrow}>→</span>
            <span className={`${styles.step} ${styles.stepCollab}`}>Code review</span>
          </div>
        </div>
        <span className={styles.collabTag}>Collaboration reactive — caught at review</span>
      </div>

      <div className={styles.divider} />

      {/* ── COG panel ──────────────────────────────────────── */}
      <div className={styles.panel}>
        <span className={styles.panelTitle}>Big Health — COG</span>
        <div className={styles.sharedBlock}>
          <span className={styles.sharedLabel}>Design + Engineering</span>
          <span className={`${styles.step} ${styles.stepCollab} ${styles.stepShared}`}>
            Co-create token layer
          </span>
        </div>
        <div className={styles.lanes}>
          <span className={styles.laneLabel}>Design</span>
          <div className={styles.lane}>
            <span className={styles.step}>Spec (system-aware)</span>
            <span className={styles.arrow}>→</span>
            <span className={styles.step}>Review</span>
          </div>

          <span className={styles.laneLabel}>Engineering</span>
          <div className={styles.lane}>
            <span className={styles.step}>Implement</span>
            <span className={styles.arrow}>→</span>
            <span className={styles.step}>Ship</span>
          </div>
        </div>
        <span className={styles.collabTag}>Collaboration proactive — built into the foundation</span>
      </div>

    </div>
  )
}
