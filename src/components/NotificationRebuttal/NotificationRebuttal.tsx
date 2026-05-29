import styles from './NotificationRebuttal.module.css'

export default function NotificationRebuttal() {
  return (
    <aside className={styles.rebuttal}>
      <p className={styles.title}>This isn't notifications.</p>
      <p className={styles.para}>
        Notifications are sender-controlled and about recency — they fire because someone posted.
        Waypoints are user-controlled and about relevance — they surface because you declared interest.
        The trigger is completely different.
      </p>
      <p className={styles.para}>
        No badge, no unread count, no obligation. Radar is a pull surface — you go there when you
        want to see what's matched. It doesn't interrupt.
      </p>
    </aside>
  )
}
