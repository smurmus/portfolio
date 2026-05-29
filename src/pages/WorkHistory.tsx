import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './WorkHistory.module.css'

function BackButton() {
  const navigate = useNavigate()
  return (
    <nav className={styles.backNav}>
      <button
        className={styles.backLink}
        onClick={() => navigate(-1)}
        aria-label="back to main board"
      >
        ← back
      </button>
    </nav>
  )
}

type RoleProps = {
  company: string
  title: string
  dates: string
  description: string
  current?: boolean
}

function Role({ company, title, dates, description, current }: RoleProps) {
  return (
    <div className={styles.role} data-current={current ? 'true' : undefined}>
      <div className={styles.roleMeta}>
        <span className={styles.company}>{company}</span>
        {current && <span className={styles.currentTag}>now</span>}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.dates}>{dates}</div>
      <p className={styles.description}>{description}</p>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────

export default function WorkHistory() {
  useLayoutEffect(() => {
    const body = document.body
    const root = document.getElementById('root')
    body.style.overflow = 'auto'
    body.style.height   = 'auto'
    if (root) { root.style.height = 'auto'; root.style.minHeight = '100vh' }
    return () => {
      body.style.overflow = ''
      body.style.height   = ''
      if (root) { root.style.height = ''; root.style.minHeight = '' }
    }
  }, [])

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <BackButton />

        <header className={styles.header}>
          <p className={styles.eyebrow}>a brief history</p>
          <h1 className={styles.heading}>where i've been</h1>
          <p className={styles.subheading}>
            {/* TODO: optional one-liner context — e.g. "engineer and designer who keeps ending up at the intersection" */}
          </p>
        </header>

        <div className={styles.divider} />

        <section className={styles.timeline} aria-label="work history">

          <Role
            company="Big Health"
            title="Senior Software Engineer, Fullstack"
            dates="Nov 2024 – present"
            description="Digital therapeutics for sleep and mental health."
            current
          />

          <Role
            company="Cyberse"
            title="Software Engineer"
            dates="Feb 2024 – Oct 2024"
            description="TODO: one-liner about what Cyberse does."
          />

          <Role
            company="Hearth"
            title="Engineering Manager"
            dates="Sep 2022 – Nov 2023"
            description="TODO: one-liner about what Hearth does."
          />

          <Role
            company="Hearth"
            title="Lead UX Engineer"
            dates="Aug 2021 – Sep 2022"
            description=""
          />

          <Role
            company="Hearth"
            title="Software Engineer"
            dates="Sep 2018 – Aug 2021"
            description=""
          />

        </section>

        <div className={styles.divider} />

        <footer className={styles.footer}>
          <a
            href="https://linkedin.com/in/sondhayni"
            className={styles.linkItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin →
          </a>
        </footer>
      </div>
    </main>
  )
}
