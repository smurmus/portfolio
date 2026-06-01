import styles from './ScissorCutout.module.css'

export default function ScissorCutout() {
  return (
    <div className={styles.container}>
      {/* Board surface — revealed when the page flips away */}
      <div className={styles.board}>
        <span className={styles.placeholder}>✂</span>
      </div>

      {/* The page — flips away on hover like a book page turning */}
      <div className={styles.page} />

      {/* Perforated cut-line border — always on top */}
      <svg
        className={styles.border}
        viewBox="0 0 210 210"
        aria-hidden="true"
        overflow="visible"
      >
        <circle
          cx="105"
          cy="105"
          r="102"
          stroke="var(--color-board-dot)"
          strokeWidth="1.5"
          strokeDasharray="10 6"
          strokeDashoffset="10"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}
