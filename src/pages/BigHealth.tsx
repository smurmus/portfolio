import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import PasswordGate from '../components/PasswordGate/PasswordGate'
import styles from './ByRequest.module.css'

type VideoItem = {
  id: string
  src: string
  caption: string
  subcaption?: string
}

const sleepioVideos: VideoItem[] = [
  {
    id: 'login',
    src: '/assets/big-health/sleepio-login.webm',
    caption: 'Login & account creation',
    subcaption: 'Entry point for new and returning users',
  },
  {
    id: 'getting-started',
    src: '/assets/big-health/sleepio-getting-started.webm',
    caption: 'Getting started',
    subcaption: 'Onboarding into the 6-week CBT-I program',
  },
  {
    id: 'baseline-quiz',
    src: '/assets/big-health/sleepio-baseline-quiz.webm',
    caption: 'Sleep assessment',
    subcaption: 'Baseline quiz that tailors the program',
  },
  {
    id: 'sleep-diary',
    src: '/assets/big-health/sleepio-sleep-diary.webm',
    caption: 'Sleep diary',
    subcaption: 'Daily log — the core tracking loop',
  },
]

function VideoCell({ item }: { item: VideoItem }) {
  return (
    <figure className={styles.mediaCell}>
      <div className={styles.mediaFramePortrait}>
        <video
          src={item.src}
          className={styles.mediaAsset}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <figcaption className={styles.mediaCaption}>
        {item.caption}
        {item.subcaption && (
          <span style={{ display: 'block', fontWeight: 400, opacity: 0.65, fontSize: '13px', marginTop: '2px' }}>
            {item.subcaption}
          </span>
        )}
      </figcaption>
    </figure>
  )
}

function BigHealthContent() {
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
            color: 'var(--washi-big-health)',
            background: 'color-mix(in srgb, var(--washi-big-health) 12%, transparent)',
            borderColor: 'color-mix(in srgb, var(--washi-big-health) 30%, transparent)',
          }}>🔒 password protected</div>
          <h1 className={styles.title}>Big Health</h1>
          <p className={styles.framing} style={{ fontStyle: 'italic' }}>
            "Engineer" by title, but I was never just the person at the end of the handoff. I was
            in the design process in ways that mattered: mapping flows, prototyping ideas in code,
            pushing back when something wouldn't work, and making sure what shipped actually looked
            like what was intended.
          </p>
          <p className={styles.framing} style={{ marginTop: '1rem' }}>
            Big Health builds digital therapeutics for sleep and mental health. I worked on the
            patient-facing products (Daylight, Spark, and mainly Sleepio), plus internal tooling
            and the COG design system.
          </p>
        </header>
        <hr className={styles.divider} />
        <section className={styles.project}>
          <div className={styles.projectHeader}>
            <div className={styles.projectMeta}>
              <span className={styles.tag}>React Native</span>
              <span className={styles.tag}>TypeScript</span>
              <span className={styles.tag}>CBT-I</span>
            </div>
            <h2 className={styles.projectTitle}>Sleepio — patient-facing app</h2>
            <p className={styles.projectDescription}>
              Sleepio is a digital CBT-I (cognitive behavioural therapy for insomnia) program. I worked
              across the onboarding funnel, sleep diary, and session flows — building screens to spec,
              contributing to interaction polish, and flagging design gaps before they became bugs.
            </p>
          </div>
          <div className={styles.gallery} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {sleepioVideos.map(item => (
              <VideoCell key={item.id} item={item} />
            ))}
          </div>
        </section>
        <hr className={styles.divider} />
        <section className={styles.project}>
          <div className={styles.projectHeader}>
            <div className={styles.projectMeta}>
              <span className={styles.tag}>tokens</span>
              <span className={styles.tag}>Storybook</span>
            </div>
            <h2 className={styles.projectTitle}>COG — design system</h2>
            <p className={styles.projectDescription}>
              COG is Big Health's design system. I helped build out the token architecture,
              contributed components to Storybook, and worked closely with design to close the
              gap between spec and implementation. The full story — how the system was structured,
              how we collaborated, and what we got right — is in the case study.
            </p>
            <div className={styles.projectLinks}>
              <Link to="/design-systems" className={styles.projectLink}>case study →</Link>
            </div>
          </div>
          <div className={styles.gallery}>
            <figure className={`${styles.mediaCell} ${styles.mediaCellWide}`}>
              <div className={styles.mediaFrame}>
                <img
                  src="/assets/design-systems/cog-tokens-colors.png"
                  alt="COG design system color tokens"
                  className={styles.mediaAsset}
                  loading="lazy"
                />
              </div>
              <figcaption className={styles.mediaCaption}>Color token scale — the backbone of COG's theming model</figcaption>
            </figure>
          </div>
        </section>
        <hr className={styles.divider} />
        <section className={styles.project}>
          <div className={styles.projectHeader}>
            <div className={styles.projectMeta}>
              <span className={styles.tag}>TypeScript</span>
              <span className={styles.tag}>Contentful</span>
              <span className={styles.tag}>AI</span>
            </div>
            <h2 className={styles.projectTitle}>Contentfill — internal tooling</h2>
            <p className={styles.projectDescription}>
              A tool I designed and built to streamline how the content team managed Contentful
              entries — bulk edits, CSV imports, and an AI agent for generating copy at scale.
              Saved hours per week and reduced errors from manual entry. See the full case study
              for the design decisions and build process.
            </p>
            <div className={styles.projectLinks}>
              <Link to="/contentfill" className={styles.projectLink}>case study →</Link>
            </div>
          </div>
          <div className={styles.gallery}>
            <figure className={`${styles.mediaCell} ${styles.mediaCellWide}`}>
              <div className={styles.mediaFrame}>
                <video
                  src="/assets/contentfill/contentfill-update-entries-ai-agent.webm"
                  className={styles.mediaAsset}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              <figcaption className={styles.mediaCaption}>AI agent updating Contentful entries in bulk</figcaption>
            </figure>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function BigHealth() {
  return (
    <PasswordGate company="Big Health">
      <BigHealthContent />
    </PasswordGate>
  )
}
