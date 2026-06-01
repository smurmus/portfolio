import { useState, useEffect, useRef } from 'react'
import styles from './CaseTOC.module.css'

type Section = { id: string; label: string; fullScreen?: boolean }

type Props = {
  sections: Section[]
}

export default function CaseTOC({ sections }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const mobileWrapperRef = useRef<HTMLDivElement>(null)

  // Active section — scroll listener that marks the last section whose top
  // has passed 25% of the viewport. Handles short sections and page-bottom
  // correctly, unlike an IntersectionObserver with a fixed rootMargin.
  useEffect(() => {
    const triggerSection = sections.find(s => !s.fullScreen) ?? sections[0]

    const update = () => {
      // Active section
      const threshold = window.scrollY + window.innerHeight * 0.25
      let found: string | null = null
      for (const { id } of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= threshold) found = id
      }

      // If near the bottom of the page, force the last section active —
      // short final sections can't scroll their heading past the 25% threshold.
      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80
      if (nearBottom && sections.length > 0) {
        found = sections[sections.length - 1].id
      }

      setActiveId(found)

      // Visibility: show as soon as trigger section heading scrolls above fold.
      const triggerEl = document.getElementById(triggerSection.id)
      if (triggerEl) {
        setVisible(triggerEl.getBoundingClientRect().top < 0)
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [sections])

  // Close mobile panel on outside click
  useEffect(() => {
    if (!panelOpen) return
    const handler = (e: MouseEvent) => {
      if (mobileWrapperRef.current && !mobileWrapperRef.current.contains(e.target as Node)) {
        setPanelOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [panelOpen])

  // Suppress when a fullScreen section is currently occupying the viewport.
  // Checked directly via getBoundingClientRect so it reacts instantly on scroll-up,
  // rather than waiting for the activeId threshold to cross — which lags by 25vh.
  const [fullScreenInView, setFullScreenInView] = useState(false)
  useEffect(() => {
    const check = () => {
      const inView = sections.filter(s => s.fullScreen).some(s => {
        const el = document.getElementById(s.id)
        if (!el) return false
        const { top, bottom } = el.getBoundingClientRect()
        return top < window.innerHeight * 0.6 && bottom > 0
      })
      setFullScreenInView(inView)
    }
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [sections])

  const effectiveVisible = visible && !fullScreenInView

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
    setPanelOpen(false)
  }

  return (
    <>
      {/* Desktop: fixed left sidebar */}
      <nav
        aria-label="Case study sections"
        className={`${styles.sidebar} ${effectiveVisible ? styles.sidebarVisible : ''}`}
      >
        <ul className={styles.list}>
          {sections.map(({ id, label }) => (
            <li key={id} className={styles.listItem}>
              <button
                className={`${styles.item} ${activeId === id ? styles.itemActive : ''}`}
                onClick={() => scrollTo(id)}
                aria-current={activeId === id ? 'location' : undefined}
              >
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.label}>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Tablet: sticky horizontal strip — always shown at this breakpoint,
          natural flow placement after lede ensures it only sticks once hero is past */}
      <div aria-hidden="true" className={styles.strip}>
        <div className={styles.stripScroll}>
          {sections.map(({ id, label }) => (
            <button
              key={id}
              className={`${styles.pill} ${activeId === id ? styles.pillActive : ''}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: fixed bottom button + slide-up panel */}
      <div
        ref={mobileWrapperRef}
        className={`${styles.mobileBar} ${effectiveVisible ? styles.mobileBarVisible : ''}`}
      >
        <button
          className={styles.jumpButton}
          onClick={() => setPanelOpen(p => !p)}
          aria-expanded={panelOpen}
          aria-label="Jump to section"
        >
          ≡ Jump to section ↓
        </button>
        <div
          className={`${styles.panel} ${panelOpen ? styles.panelOpen : ''}`}
          role="dialog"
          aria-label="Section navigation"
        >
          <ul className={styles.panelList}>
            {sections.map(({ id, label }) => (
              <li key={id}>
                <button
                  className={`${styles.panelItem} ${activeId === id ? styles.panelItemActive : ''}`}
                  onClick={() => scrollTo(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
