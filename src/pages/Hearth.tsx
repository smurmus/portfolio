import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import PasswordGate from '../components/PasswordGate/PasswordGate'
import styles from './ByRequest.module.css'

function HearthContent() {
  useLayoutEffect(() => {
    const body = document.body
    const root = document.getElementById('root')
    body.style.overflow = 'auto'
    body.style.height = 'auto'
    if (root) { root.style.height = 'auto'; root.style.minHeight = '100vh' }
    return () => {
      body.style.overflow = ''
      body.style.height = ''
      if (root) { root.style.height = ''; root.style.minHeight = '' }
    }
  }, [])

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.fixedBack}>← back</Link>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.lockBadge} style={{
            color: 'var(--washi-hearth)',
            background: 'color-mix(in srgb, var(--washi-hearth) 12%, transparent)',
            borderColor: 'color-mix(in srgb, var(--washi-hearth) 30%, transparent)',
          }}>🔒 password protected</div>
          <h1 className={styles.title}>Hearth</h1>
          <p className={styles.framing} style={{ fontStyle: 'italic' }}>
            "Engineer" by title, but I was never just the person at the end of the handoff. I was
            in the design process in ways that mattered: mapping flows, prototyping ideas in code,
            pushing back when something wouldn't work, and making sure what shipped actually looked
            like what was intended.
          </p>
          <p className={styles.framing} style={{ marginTop: '1rem' }}>
            Hearth is a fintech platform for home improvement contractors. I was an early engineer
            and eventually engineering manager, close enough to the product that I owned UX direction
            on KYC onboarding and the contractor financial dashboards, and built Hajimari, the
            company's first design system.
          </p>
        </header>
        <hr className={styles.divider} />
        <section className={styles.project}>
          <div className={styles.projectHeader}>
            <div className={styles.projectMeta}>
              <span className={styles.tag}>React Native</span>
              <span className={styles.tag}>React</span>
              <span className={styles.tag}>fintech</span>
            </div>
            <h2 className={styles.projectTitle}>Hearth — contractor platform</h2>
            <p className={styles.projectDescription}>
              Hearth's core product gave contractors tools to manage clients, send financing offers,
              create quotes, and track leads — across both mobile and web. I was close enough to the
              product to own UX direction on key flows: KYC onboarding, the client management views,
              and the contractor financial dashboards.
            </p>
          </div>
          {/* Row 1: two portrait videos at their native aspect ratios */}
          <div className={styles.gallery}>
            <figure className={styles.mediaCell}>
              <div className={styles.mediaFramePortrait} style={{ aspectRatio: '894 / 1534' }}>
                <video
                  src="/assets/hearth/hearth-overwrite-client.webm"
                  className={styles.mediaAsset}
                  autoPlay muted loop playsInline
                />
              </div>
              <figcaption className={styles.mediaCaption}>Client record — overwrite flow</figcaption>
            </figure>
            <figure className={styles.mediaCell}>
              <div className={styles.mediaFramePortrait} style={{ aspectRatio: '894 / 1404' }}>
                <video
                  src="/assets/hearth/hearth-new-quote.webm"
                  className={styles.mediaAsset}
                  autoPlay muted loop playsInline
                />
              </div>
              <figcaption className={styles.mediaCaption}>New quote creation</figcaption>
            </figure>
          </div>
          {/* Row 2: portrait screenshot + wide desktop screenshot */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginTop: '20px' }}>
            <figure className={styles.mediaCell} style={{ flex: '0 0 auto', width: '28%' }}>
              <div className={styles.mediaFramePortrait}>
                <img
                  src="/assets/hearth/hearth-clients-dropdown-old.jpg"
                  alt="Hearth mobile app — clients list with filter dropdown"
                  className={styles.mediaAsset}
                  loading="lazy"
                />
              </div>
              <figcaption className={styles.mediaCaption}>Client list — filter by type</figcaption>
            </figure>
            <figure className={styles.mediaCell} style={{ flex: '1 1 auto' }}>
              <div className={styles.mediaFrame}>
                <img
                  src="/assets/hearth/hearth-leads-widget.png"
                  alt="Hearth web dashboard — leads website widget setup"
                  className={styles.mediaAsset}
                  loading="lazy"
                />
              </div>
              <figcaption className={styles.mediaCaption}>Web dashboard — leads website widget configuration</figcaption>
            </figure>
          </div>
        </section>
        <hr className={styles.divider} />
        <section className={styles.project}>
          <div className={styles.projectHeader}>
            <div className={styles.projectMeta}>
              <span className={styles.tag}>tokens</span>
              <span className={styles.tag}>Storybook</span>
              <span className={styles.tag}>React</span>
            </div>
            <h2 className={styles.projectTitle}>Hajimari — design system</h2>
            <p className={styles.projectDescription}>
              Hajimari was Hearth's first design system — built from scratch, by me, while I was
              still an IC engineer. I defined the token architecture, built the component library in
              Storybook, and established the collaboration model between design and engineering. The
              full story is in the case study.
            </p>
            <div className={styles.projectLinks}>
              <Link to="/design-systems" className={styles.projectLink}>case study →</Link>
            </div>
          </div>
          <div className={styles.gallery}>
            <figure className={`${styles.mediaCell} ${styles.mediaCellWide}`}>
              <div className={styles.mediaFrame}>
                <img
                  src="/assets/design-systems/hajimari-hero.png"
                  alt="Hajimari design system overview"
                  className={styles.mediaAsset}
                  loading="lazy"
                />
              </div>
              <figcaption className={styles.mediaCaption}>Hajimari — Hearth's component library and token system</figcaption>
            </figure>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function Hearth() {
  return (
    <PasswordGate company="Hearth">
      <HearthContent />
    </PasswordGate>
  )
}
