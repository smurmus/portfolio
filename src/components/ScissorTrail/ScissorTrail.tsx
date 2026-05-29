import styles from './ScissorTrail.module.css'

export default function ScissorTrail() {
  return (
    <svg
      width="760"
      height="520"
      viewBox="0 0 760 520"
      className={styles.trail}
      aria-hidden="true"
      overflow="visible"
    >
      <path
        d="M 40 360 C 58 415, 200 425, 232 355 C 258 295, 310 70, 385 88 C 448 102, 482 235, 535 222 C 578 210, 628 28, 688 14 C 720 6, 748 8, 755 8"
        stroke="var(--color-board-dot)"
        strokeWidth="1.5"
        strokeDasharray="10 6"
        strokeDashoffset="10"
        strokeLinecap="round"
        fill="none"
      />
      {/* Blade pivot nudged up so it aligns with path start (40, 360) */}
      <text
        x="40"
        y="354"
        fontSize="26"
        fill="var(--color-board-dot)"
        textAnchor="middle"
        dominantBaseline="central"
        transform="rotate(75, 40, 360)"
        className={styles.scissors}
      >
        ✂
      </text>
    </svg>
  )
}
