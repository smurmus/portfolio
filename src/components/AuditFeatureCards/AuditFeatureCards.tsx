import { useState, useEffect } from 'react'
import styles from './AuditFeatureCards.module.css'

type Feature = {
  name: string
  year: string
  screenshot: string
  screenshotAlt: string
  does: string
  doesnt: string
  sourceLink?: { label: string; href: string }
}

const features: Feature[] = [
  {
    name: "Bookmarks / Reminders",
    year: "September 2024",
    screenshot: "/assets/audit/bookmarks-context-menu.png",
    screenshotAlt: "Discord right-click context menu on a message showing the Bookmark Message option",
    does: "Saves messages for later.",
    doesnt: "Time-based resurface only — no way to say why you're saving it or what would make it worth returning to.",
    sourceLink: {
      label: "via Discord Support",
      href: "https://support.discord.com/hc/en-us/articles/26442819646999-Message-Bookmarks-and-Reminders",
    },
  },
  {
    name: "Ignore",
    year: "February 2025",
    screenshot: "/assets/audit/ignore-context-menu.png",
    screenshotAlt: "Discord user right-click context menu showing the Ignore option",
    does: "Reduces noise from specific users.",
    doesnt: "Doesn't help with re-entry — it's about filtering out, not finding a way back in.",
  },
  {
    name: "March 2025 UI overhaul",
    year: "March 2025",
    screenshot: "/assets/audit/march-2025-title-bar.png",
    screenshotAlt: "Discord title bar showing the repositioned Inbox icon",
    does: "Navigation and density improvements.",
    doesnt: "Still operating entirely within the information-management frame — the question of when to re-engage is untouched.",
  },
]

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className={styles.lightboxOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Full size screenshot"
    >
      <button
        className={styles.lightboxClose}
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>
      <img
        src={src}
        alt={alt}
        className={styles.lightboxImage}
        onClick={e => e.stopPropagation()}
      />
    </div>
  )
}

export default function AuditFeatureCards() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <div className={styles.stack}>
        {features.map((f) => (
          <div key={f.name} className={styles.card}>
            <button
              className={styles.screenshotCol}
              onClick={() => setLightbox({ src: f.screenshot, alt: f.screenshotAlt })}
              aria-label={`View full screenshot: ${f.screenshotAlt}`}
              style={{ '--screenshot-bg': `url(${f.screenshot})` } as React.CSSProperties}
            >
              <img
                src={f.screenshot}
                alt={f.screenshotAlt}
                className={styles.screenshot}
                loading="lazy"
              />
              <span className={styles.expandHint} aria-hidden="true">tap to expand</span>
            </button>
            <div className={styles.annotationCol}>
              <span className={styles.featureLabel}>{f.name}</span>
              <span className={styles.featureYear}>{f.year}</span>
              <hr className={styles.divider} />
              <p className={styles.does}>{f.does}</p>
              <p className={styles.doesnt}>{f.doesnt}</p>
              {f.sourceLink && (
                <a
                  href={f.sourceLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sourceLink}
                >
                  {f.sourceLink.label}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}
