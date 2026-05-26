import styles from './ContactCard.module.css'

type ContactLink = {
  label: string
  href: string
}

type ContactCardProps = {
  name: string
  email: string
  links: ContactLink[]
  className?: string
  style?: React.CSSProperties
}

export default function ContactCard({ name, email, links, className, style }: ContactCardProps) {
  return (
    <div className={`${styles.card} ${className ?? ''}`} style={style}>
      <div className={styles.name}>{name}</div>
      <a href={`mailto:${email}`} className={styles.email}>
        {email}
      </a>
      <hr className={styles.divider} />
      <div className={styles.links}>
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
