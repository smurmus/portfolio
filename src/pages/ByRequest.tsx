import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import PasswordGate from '../components/PasswordGate/PasswordGate'
import byRequestWork from '../config/byRequestWork'
import type { ByRequestProject, MediaItem } from '../config/byRequestWork'
import styles from './ByRequest.module.css'

function MediaCell({ item }: { item: MediaItem }) {
  const isEmpty = !item.src

  const media = isEmpty ? (
    <div className={styles.mediaSwatch}>
      <span className={styles.mediaSwatchLabel}>{item.type}</span>
    </div>
  ) : item.type === 'video' ? (
    <video
      src={item.src}
      className={styles.mediaAsset}
      autoPlay
      muted
      loop
      playsInline
    />
  ) : (
    <img
      src={item.src}
      alt={item.alt ?? item.caption}
      className={styles.mediaAsset}
      loading="lazy"
    />
  )

  return (
    <figure className={`${styles.mediaCell} ${item.wide ? styles.mediaCellWide : ''}`}>
      <div className={styles.mediaFrame}>{media}</div>
      <figcaption className={styles.mediaCaption}>{item.caption}</figcaption>
    </figure>
  )
}

function ProjectSection({ project }: { project: ByRequestProject }) {
  return (
    <section className={styles.project}>
      <div className={styles.projectHeader}>
        <div className={styles.projectMeta}>
          <span className={styles.roleTag}>{project.role}</span>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <h2 className={styles.projectTitle}>{project.title}</h2>
        <p className={styles.projectDescription}>{project.description}</p>
        {project.links && project.links.length > 0 && (
          <div className={styles.projectLinks}>
            {project.links.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={styles.projectLink}
                {...(link.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label} →
              </a>
            ))}
          </div>
        )}
      </div>
      <div className={styles.gallery}>
        {project.items.map(item => (
          <MediaCell key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function ByRequestContent() {
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
          <div className={styles.lockBadge}>🔒 password protected</div>
          <h1 className={styles.title}>by request</h1>
          <p className={styles.framing}>
            Things I helped <strong>build and ship</strong> — not as the designer,
            but as the engineer who made them real. During each project I was part of
            the design process in meaningful ways: mapping UX flows, prototyping ideas
            in code, and bridging the gap between design intent and implementation.
            The visual design direction came from others, but I was in the room.
          </p>
        </header>
        <hr className={styles.divider} />
        <div className={styles.projects}>
          {byRequestWork.map((project, i) => (
            <>
              <ProjectSection key={project.id} project={project} />
              {i < byRequestWork.length - 1 && <hr key={`${project.id}-divider`} className={styles.divider} />}
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ByRequest() {
  return (
    <PasswordGate>
      <ByRequestContent />
    </PasswordGate>
  )
}
