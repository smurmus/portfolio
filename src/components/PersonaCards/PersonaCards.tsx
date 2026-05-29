import type { PersonaCardDef } from '../../types/content'
import styles from './PersonaCards.module.css'

function NoMouthFace({ className }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M16 3C12.5522 3 9.24558 4.36964 6.80761 6.80761C4.36964 9.24558 3 12.5522 3 16C3 19.4478 4.36964 22.7544 6.80761 25.1924C9.24558 27.6304 12.5522 29 16 29C19.4478 29 22.7544 27.6304 25.1924 25.1924C27.6304 22.7544 29 19.4478 29 16C29 12.5522 27.6304 9.24558 25.1924 6.80761C22.7544 4.36964 19.4478 3 16 3ZM32 16C32 20.2435 30.3143 24.3131 27.3137 27.3137C24.3131 30.3143 20.2435 32 16 32C11.7565 32 7.68687 30.3143 4.68629 27.3137C1.68571 24.3131 0 20.2435 0 16C0 11.7565 1.68571 7.68687 4.68629 4.68629C7.68687 1.68571 11.7565 0 16 0C20.2435 0 24.3131 1.68571 27.3137 4.68629C30.3143 7.68687 32 11.7565 32 16ZM9.025 13C9.025 12.4696 9.23571 11.9609 9.61079 11.5858C9.98586 11.2107 10.4946 11 11.025 11C11.5554 11 12.0641 11.2107 12.4392 11.5858C12.8143 11.9609 13.025 12.4696 13.025 13C13.025 13.5304 12.8143 14.0391 12.4392 14.4142C12.0641 14.7893 11.5554 15 11.025 15C10.4946 15 9.98586 14.7893 9.61079 14.4142C9.23571 14.0391 9.025 13.5304 9.025 13ZM21.025 11C21.5554 11 22.0641 11.2107 22.4392 11.5858C22.8143 11.9609 23.025 12.4696 23.025 13C23.025 13.5304 22.8143 14.0391 22.4392 14.4142C22.0641 14.7893 21.5554 15 21.025 15C20.4946 15 19.9859 14.7893 19.6108 14.4142C19.2357 14.0391 19.025 13.5304 19.025 13C19.025 12.4696 19.2357 11.9609 19.6108 11.5858C19.9859 11.2107 20.4946 11 21.025 11Z" fill="currentColor" />
    </svg>
  )
}

function OpenMouthFace({ className }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0C11.7565 0 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32ZM6.05 19.6313C5.8125 18.775 6.5125 18 7.4 18H24.6C25.4875 18 26.1938 18.775 25.95 19.6313C24.7625 23.875 20.7562 27 16 27C11.2438 27 7.2375 23.875 6.05 19.6313ZM13.6 13.3L13.5875 13.2875C13.575 13.275 13.5625 13.2562 13.5437 13.2312C13.5062 13.1812 13.4437 13.1063 13.3687 13.0188C13.2125 12.8438 12.9937 12.6063 12.7312 12.375C12.1812 11.8875 11.5562 11.5 11 11.5C10.4438 11.5 9.81875 11.8875 9.26875 12.375C9.00625 12.6063 8.7875 12.8438 8.63125 13.0188C8.55625 13.1063 8.49375 13.1812 8.45625 13.2312C8.4375 13.2562 8.41875 13.275 8.4125 13.2875L8.4 13.3C8.26875 13.475 8.04375 13.5438 7.84375 13.475C7.64375 13.4063 7.5 13.2188 7.5 13C7.5 11.8813 7.91875 10.775 8.5375 9.95C9.15 9.1375 10.0312 8.5 11 8.5C11.9688 8.5 12.85 9.1375 13.4625 9.95C14.0812 10.775 14.5 11.8813 14.5 13C14.5 13.2125 14.3625 13.4063 14.1562 13.475C13.95 13.5438 13.725 13.475 13.6 13.3ZM23.6 13.3L23.5875 13.2875C23.575 13.275 23.5625 13.2562 23.5438 13.2312C23.5063 13.1812 23.4437 13.1063 23.3687 13.0188C23.2125 12.8438 22.9938 12.6063 22.7313 12.375C22.1813 11.8875 21.5562 11.5 21 11.5C20.4438 11.5 19.8187 11.8875 19.2687 12.375C19.0062 12.6063 18.7875 12.8438 18.6313 13.0188C18.5563 13.1063 18.4937 13.1812 18.4562 13.2312C18.4375 13.2562 18.4188 13.275 18.4125 13.2875L18.4 13.3C18.2687 13.475 18.0438 13.5438 17.8438 13.475C17.6437 13.4063 17.5 13.2188 17.5 13C17.5 11.8813 17.9188 10.775 18.5375 9.95C19.15 9.1375 20.0312 8.5 21 8.5C21.9688 8.5 22.85 9.1375 23.4625 9.95C24.0812 10.775 24.5 11.8813 24.5 13C24.5 13.2125 24.3625 13.4063 24.1562 13.475C23.95 13.5438 23.725 13.475 23.6 13.3Z" fill="currentColor" />
    </svg>
  )
}

const ICONS: Record<PersonaCardDef['variant'], typeof NoMouthFace> = {
  observer: NoMouthFace,
  contributor: OpenMouthFace,
}

function PersonaCard({ card, isInitialIntroduction }: { card: PersonaCardDef; isInitialIntroduction: boolean }) {
  const Icon = ICONS[card.variant]

  return (
    <div className={`${styles.card} ${card.variant === 'observer' ? styles.cardObserver : styles.cardContributor}`}>
      <div className={styles.header}>
        <Icon className={styles.icon} />
        <h4 className={styles.name}>{card.name}</h4>
      </div>

      <ul className={`${styles.behaviors} ${!isInitialIntroduction ? styles.dimmed : ''}`}>
        {card.behaviors.map((b, j) => (
          <li key={j} className={styles.behavior}>{b}</li>
        ))}
      </ul>

      {!isInitialIntroduction && (
        <div className={styles.footer}>
          <span className={styles.footerLabel}>{card.footerLabel}</span>
          <p className={styles.footerText}>{card.footerText}</p>
        </div>
      )}
    </div>
  )
}

export default function PersonaCards({
  cards,
  isInitialIntroduction = false,
}: {
  cards: PersonaCardDef[]
  isInitialIntroduction?: boolean
}) {
  return (
    <div className={styles.grid}>
      {cards.map(card => (
        <PersonaCard key={card.id} card={card} isInitialIntroduction={isInitialIntroduction} />
      ))}
    </div>
  )
}
