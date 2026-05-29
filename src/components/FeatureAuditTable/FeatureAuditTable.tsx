/* FeatureAuditTable
 * Mobile breakpoint: < 768px — table collapses to card layout
 * Data: hardcoded in the `features` array below — update there to change content
 */
import { useEffect, useRef, useState } from 'react'
import Lightbox from '../Lightbox/Lightbox'
import styles from './FeatureAuditTable.module.css'

type Feature = {
  name: string
  year: string
  screenshot: string
  screenshotAlt: string
  solves: string
  frame: string
  reengages: 'no' | 'yes'
  reengage_note: string | null
}

const features: Feature[] = [
  {
    name: "Bookmarks / Reminders",
    year: "Sept 2024",
    screenshot: "/assets/audit/bookmarks-context-menu.png",
    screenshotAlt: "Discord right-click context menu showing the Bookmark Message option",
    solves: "Save messages and resurface them at a chosen time",
    frame: "Information",
    reengages: "no",
    reengage_note: "Time-based resurface only — no intent or condition",
  },
  {
    name: "Ignore",
    year: "Feb 2025",
    screenshot: "/assets/audit/ignore-context-menu.png",
    screenshotAlt: "Discord user right-click context menu showing the Ignore option",
    solves: "Hide specific users without blocking them",
    frame: "Information",
    reengages: "no",
    reengage_note: null,
  },
  {
    name: "UI overhaul (inbox, density)",
    year: "Mar 2025",
    screenshot: "/assets/audit/march-2025-title-bar.png",
    screenshotAlt: "Discord title bar showing the repositioned Inbox icon and density controls",
    solves: "Inbox repositioned, navigation tightened, UI density options added",
    frame: "Information",
    reengages: "no",
    reengage_note: "Navigation improvement — still information access, not participation",
  },
]

export const FeatureAuditTable: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    if (revealed) return
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [revealed])

  return (
    <>
      <div className={styles.wrapper} ref={containerRef}>
        <p className={styles.scopeNote}>
          Features that predate this design — Threads, Forum channels, Browse Channels, AI Summaries — appear in the Research section as the landscape that motivated the original Launchpad.
        </p>

        <table className={styles.table} aria-label="Discord feature audit — post-2024 shipping">
          <thead>
            <tr>
              <th className={styles.th} style={{ width: '26%' }}>Feature</th>
              <th className={styles.th} style={{ width: '30%' }}>Problem it solves</th>
              <th className={styles.th} style={{ width: '20%' }}>Problem frame</th>
              <th className={styles.th} style={{ width: '24%' }}>Helps re-engage after absence?</th>
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr
                key={f.name}
                className={`${styles.row} ${revealed ? styles.rowVisible : ''}`}
                style={revealed ? { transitionDelay: `${i * 60}ms` } : undefined}
              >
                <td className={styles.td}>
                  <div className={styles.featureCell}>
                    <button
                      className={styles.thumbBtn}
                      onClick={() => setLightbox({ src: f.screenshot, alt: f.screenshotAlt })}
                      aria-label={`View screenshot: ${f.screenshotAlt}`}
                    >
                      <img
                        src={f.screenshot}
                        alt=""
                        className={styles.thumb}
                        loading="lazy"
                      />
                    </button>
                    <div>
                      <span className={styles.featureName}>{f.name}</span>
                      <span className={styles.featureYear}>{f.year}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.td}>{f.solves}</td>
                <td className={styles.td}>
                  <span className={`${styles.pill} ${styles.pillInfo}`}>{f.frame}</span>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.pill} ${styles.pillNo}`}>No</span>
                  {f.reengage_note && (
                    <span className={styles.reengageNote}>{f.reengage_note}</span>
                  )}
                </td>
              </tr>
            ))}

            {/* Waypoints gap row */}
            <tr
              className={`${styles.row} ${styles.rowWaypoints} ${revealed ? styles.rowVisible : ''}`}
              style={revealed ? { transitionDelay: `${features.length * 60}ms` } : undefined}
            >
              <td className={styles.td}>
                <span className={styles.questionMark}>?</span>
              </td>
              <td className={styles.td}>
                <span className={styles.questionMark}>?</span>
              </td>
              <td className={styles.td}>
                <span className={`${styles.pill} ${styles.pillParticipation}`}>Participation</span>
              </td>
              <td className={styles.td}>
                <span className={`${styles.pill} ${styles.pillYes}`}>Yes</span>
                <span className={styles.reengageNote}>
                  Members declare intent once; matching content surfaces across servers without requiring active check-ins
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className={styles.mobileCards} aria-label="Discord feature audit — post-2024 shipping">
          {features.map((f, i) => (
            <div
              key={f.name}
              className={`${styles.card} ${revealed ? styles.cardVisible : ''}`}
              style={revealed ? { transitionDelay: `${i * 60}ms` } : undefined}
            >
              <button
                className={styles.mobileThumbBtn}
                onClick={() => setLightbox({ src: f.screenshot, alt: f.screenshotAlt })}
                aria-label={`View screenshot: ${f.screenshotAlt}`}
              >
                <img src={f.screenshot} alt="" className={styles.mobileThumb} loading="lazy" />
              </button>
              <div className={styles.cardHeader}>
                <span className={styles.featureName}>{f.name}</span>
                <span className={styles.featureYear}>{f.year}</span>
              </div>
              <p className={styles.cardSolves}>{f.solves}</p>
              <div className={styles.cardPills}>
                <span className={`${styles.pill} ${styles.pillInfo}`}>{f.frame}</span>
                <span className={`${styles.pill} ${styles.pillNo}`}>No</span>
              </div>
              {f.reengage_note && (
                <p className={styles.reengageNote}>{f.reengage_note}</p>
              )}
            </div>
          ))}

          {/* Mobile Waypoints gap row */}
          <div
            className={`${styles.card} ${styles.cardWaypoints} ${revealed ? styles.cardVisible : ''}`}
            style={revealed ? { transitionDelay: `${features.length * 60}ms` } : undefined}
          >
            <div className={styles.cardHeader}>
              <span className={styles.questionMark}>?</span>
            </div>
            <div className={styles.cardPills}>
              <span className={`${styles.pill} ${styles.pillParticipation}`}>Participation</span>
              <span className={`${styles.pill} ${styles.pillYes}`}>Yes</span>
            </div>
            <p className={styles.reengageNote}>
              Members declare intent once; matching content surfaces across servers without requiring active check-ins
            </p>
          </div>
        </div>

        <div className={styles.thesis}>
          Every shipped feature makes information easier to find. None of them address what happens after you've been away — the sense that you've missed too much to re-enter, that the window to participate has closed. Waypoints is the member-side counterpart to Browse Channels: instead of an admin curating what's visible, each member declares what matters to them. A self-authored reason to come back.
        </div>
      </div>

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}
