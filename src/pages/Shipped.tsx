import { Link } from 'react-router-dom'
import PasswordGate from '../components/PasswordGate/PasswordGate'
import shippedWork from '../config/shippedWork'
import type { ShippedProject } from '../config/shippedWork'
import styles from './Shipped.module.css'

function ProjectCard({ project }: { project: ShippedProject }) {
  return (
    <article className={styles.card}>
      {project.imageSrc ? (
        <img
          src={project.imageSrc}
          alt={project.title}
          className={styles.cardImage}
        />
      ) : (
        <div className={styles.cardImagePlaceholder}>image coming soon</div>
      )}
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.roleTag}>{project.role}</span>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <h2 className={styles.cardTitle}>{project.title}</h2>
        <p className={styles.cardDescription}>{project.description}</p>
        {project.links.length > 0 && (
          <div className={styles.cardLinks}>
            {project.links.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={styles.cardLink}
                {...(link.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function ShippedContent() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.fixedBack}>← back</Link>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.lockBadge}>🔒 password protected</div>
          <h1 className={styles.title}>shipped work</h1>
          <p className={styles.framing}>
            Things I helped <strong>build and ship</strong> — not as the designer,
            but as the engineer who made them real. During each project I was part of
            the design process in meaningful ways: mapping UX flows, prototyping ideas
            in code, and bridging the gap between design intent and implementation.
            The visual design direction came from others, but I was in the room.
          </p>
        </header>
        <hr className={styles.divider} />
        <div className={styles.grid}>
          {shippedWork.length === 0 ? (
            <p className={styles.empty}>projects coming soon :)</p>
          ) : (
            shippedWork.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default function Shipped() {
  return (
    <PasswordGate>
      <ShippedContent />
    </PasswordGate>
  )
}
