import styles from './WashiLabel.module.css'

type WashiLabelProps = {
  label: string
  color: string
  patternId: string
  textColor?: string
  className?: string
  style?: React.CSSProperties
}

export default function WashiLabel({
  label,
  color,
  patternId,
  textColor = 'white',
  className,
  style,
}: WashiLabelProps) {
  return (
    <div
      className={`${styles.label} ${className ?? ''}`}
      style={style}
      aria-hidden="true"
    >
      {/* Base color + pattern overlay rendered as inline SVG rects.
          Pattern IDs are defined in the hidden <svg> defs block in BoardPage. */}
      <svg className={styles.svg} aria-hidden="true">
        <rect width="100%" height="100%" fill={color} />
        <rect width="100%" height="100%" fill={`url(#washi-${patternId})`} />
      </svg>
      <span className={styles.text} style={{ color: textColor }}>
        {label}
      </span>
    </div>
  )
}
