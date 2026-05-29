import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react'
import caseStudies from '../config/caseStudies'
import type { ContentBlock } from '../types/content'
import AnnotatedScreenshot from '../components/AnnotatedScreenshot/AnnotatedScreenshot'
import CaseStudyHero from '../components/CaseStudyHero/CaseStudyHero'
import CaseTOC from '../components/CaseTOC/CaseTOC'
import PersonaCards from '../components/PersonaCards/PersonaCards'
import AuditFeatureCards from '../components/AuditFeatureCards/AuditFeatureCards'
import { FeatureAuditTable } from '../components/FeatureAuditTable/FeatureAuditTable'
import Design2024Landscape from '../components/Design2024Landscape/Design2024Landscape'
import ThesisDiagram from '../components/ThesisDiagram/ThesisDiagram'
import NotificationRebuttal from '../components/NotificationRebuttal/NotificationRebuttal'
import EngagementFunnel from '../components/EngagementFunnel/EngagementFunnel'
import TldrTimeline from '../components/TldrTimeline/TldrTimeline'
import Lightbox from '../components/Lightbox/Lightbox'
import SparkleAside from '../components/SparkleAside/SparkleAside'
import MetricsGrid from '../components/MetricsGrid/MetricsGrid'
import CollabDiagram from '../components/CollabDiagram/CollabDiagram'
import styles from './CaseStudy.module.css'

/* BLOCK TYPES: add new types to src/types/content.ts
   and add a corresponding case to the renderer below.
   Case study prompts may extend this. */

// ── Image carousel ───────────────────────────────────────

type CarouselImage = { src: string; alt: string; rotation: number }

function Carousel({ images }: { images: CarouselImage[] }) {
  const [frontIndex, setFrontIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const cycle = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setFrontIndex(i => (i + 1) % images.length)
      setAnimating(false)
    }, 150)
  }

  return (
    <div className={styles.carousel} aria-label="project images">
      {images.map((img, i) => {
        const isFront = i === frontIndex
        const depth = ((i - frontIndex + images.length) % images.length)
        const baseRotation = img.rotation
        const offsetX = depth * 8
        const offsetY = depth * 6

        return (
          <div
            key={i}
            className={styles.carouselCard}
            style={{
              zIndex: images.length - depth,
              transform: `translateX(${offsetX}px) translateY(${offsetY}px) rotate(${baseRotation}deg) scale(${animating && isFront ? 0.95 : 1})`,
              boxShadow: isFront
                ? '0 4px 24px rgba(0,0,0,0.12)'
                : '0 2px 8px rgba(0,0,0,0.08)',
            }}
            onClick={isFront ? cycle : undefined}
            role={isFront ? 'button' : undefined}
            tabIndex={isFront ? 0 : undefined}
            aria-label={isFront ? `${img.alt} — click to see next` : undefined}
            onKeyDown={isFront ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cycle() }
            } : undefined}
          >
            {img.src ? (
              <img
                src={img.src}
                alt={img.alt}
                className={styles.carouselImage}
                loading="lazy"
                width={700}
                height={394}
              />
            ) : (
              <div className={styles.carouselPlaceholder}>
                <span className={styles.carouselPlaceholderLabel}>
                  {/* TODO: replace with real case study screenshot */}
                  {img.alt}
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Inline text renderer ─────────────────────────────────
// Supports **bold** and *italic* markers in plain text strings.

function inlineText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g
  let last = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    if (match[1] != null) parts.push(<strong key={match.index}>{match[1]}</strong>)
    else parts.push(<em key={match.index}>{match[2]}</em>)
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

// ── Content block renderer ───────────────────────────────

type OnImageClick = (src: string, alt: string) => void

function renderBlock(block: ContentBlock, i: number, onImageClick?: OnImageClick) {
  switch (block.type) {
    case 'paragraph':
      return <p key={i} className={styles.paragraph}>{inlineText(block.text)}</p>

    case 'heading':
      return <h2 key={i} className={styles.heading}>{inlineText(block.text)}</h2>

    case 'callout':
      return <blockquote key={i} className={styles.callout}>{inlineText(block.text)}</blockquote>

    case 'subheading':
      return <h3 key={i} className={styles.subheading}>{inlineText(block.text)}</h3>

    case 'media-placeholder':
      return (
        <div key={i} className={styles.mediaPlaceholder}>
          <span className={styles.mediaPlaceholderLabel}>{block.label}</span>
        </div>
      )

    case 'split':
      return (
        <div
          key={i}
          className={styles.split}
          style={block.align === 'center' ? { alignItems: 'center' } : undefined}
        >
          <div className={styles.splitCol}>
            {block.left.map((b, j) => renderBlock(b, j, onImageClick))}
          </div>
          <div className={styles.splitCol}>
            {block.right.map((b, j) => renderBlock(b, j, onImageClick))}
          </div>
        </div>
      )

    case 'persona-cards':
      return (
        <div key={i} className={styles.fullBleedContent}>
          <PersonaCards cards={block.cards} isInitialIntroduction={block.isInitialIntroduction} />
        </div>
      )

    case 'annotated-screenshot':
      return (
        <AnnotatedScreenshot
          key={i}
          src={block.src}
          alt={block.alt}
          beats={block.beats}
          caption={block.caption}
        />
      )

    case 'image':
      return (
        <figure key={i} className={styles.blockFigure}>
          {block.src ? (() => {
            const imgEl = (
              <img
                src={block.src}
                alt={block.alt ?? block.caption ?? ''}
                className={`${block.height == null || block.objectFit === 'cover' ? styles.blockImage : styles.blockImageConstrained} ${onImageClick ? styles.blockImageClickable : ''}`}
                loading="lazy"
                style={{
                  ...(block.opacity != null ? { opacity: block.opacity } : {}),
                  ...(block.height != null ? { height: block.height } : {}),
                  ...(block.objectFit != null ? { objectFit: block.objectFit } : {}),
                  ...(block.objectPosition != null ? { objectPosition: block.objectPosition } : {}),
                }}
                onClick={onImageClick ? () => onImageClick(block.src, block.alt ?? block.caption ?? '') : undefined}
              />
            )
            return block.fadeBottom ? (
              <div className={`${styles.imageWrapper} ${styles.imageWrapperFade}`}>{imgEl}</div>
            ) : imgEl
          })() : (
            <div className={`${styles.blockImage} ${styles.blockImagePlaceholder}`}>
              <span className={styles.imageCaption}>{block.alt ?? block.caption}</span>
            </div>
          )}
          {block.caption && (
            <figcaption className={styles.imageCaption}>
              {block.captionHref ? (
                <a
                  href={block.captionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.imageCaptionLink}
                >
                  {block.caption}
                </a>
              ) : block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'video':
      return (
        <figure key={i} className={styles.blockFigure}>
          <video
            src={block.src}
            className={styles.blockImage}
            autoPlay
            loop
            muted
            playsInline
          />
          {block.caption && <figcaption className={styles.imageCaption}>{block.caption}</figcaption>}
        </figure>
      )

    case 'audit-feature-cards':
      return (
        <div key={i} className={styles.fullBleedContent}>
          <AuditFeatureCards />
        </div>
      )

    case 'feature-audit-table':
      return (
        <div key={i} className={styles.fullBleedContent}>
          <FeatureAuditTable />
        </div>
      )

    case 'audit-closing':
      return (
        <p key={i} className={styles.auditClosing}>
          {block.line1}<br />{block.line2}
        </p>
      )

    case 'lede':
      return <p key={i} className={styles.lede}>{block.text}</p>

    case 'section-lede':
      return <p key={i} className={styles.sectionLede}>{block.text}</p>

    case 'caption':
      return <p key={i} className={styles.blockCaption}>{block.text}</p>

    case 'design-2024-landscape':
      return (
        <div key={i} className={styles.fullBleedContent}>
          <Design2024Landscape />
        </div>
      )

    case 'thesis-diagram':
      return (
        <div key={i} className={styles.fullBleedContent}>
          <ThesisDiagram />
        </div>
      )

    case 'collab-diagram':
      return <CollabDiagram key={i} />

    case 'notification-rebuttal':
      return <NotificationRebuttal key={i} />

    case 'engagement-funnel':
      return <EngagementFunnel key={i} />

    case 'tldr-timeline':
      return <TldrTimeline key={i} />

    case 'link-button':
      return (
        <div key={i} className={styles.linkButtonWrap}>
          <a href={block.href} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
            {block.label}
          </a>
        </div>
      )

    case 'prototype-iframe':
      return (
        <div key={i} className={`${styles.iframeWrapper}${block.mobile ? ` ${styles.iframeWrapperMobile}` : ''}`}>
          <div className={styles.iframeChrome}>
            <div className={styles.iframeChromeDots}>
              <span /><span /><span />
            </div>
            <a href={block.src} target="_blank" rel="noopener noreferrer" className={styles.iframeChromeUrl}>{block.src}</a>
          </div>
          <iframe
            src={block.src}
            className={styles.iframeEmbed}
            style={block.height != null ? { height: block.height } : undefined}
            title="Live prototype"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      )

    case 'metrics-grid':
      return <MetricsGrid key={i} items={block.items} />

    case 'aside-note':
      return <p key={i} className={styles.asideNote}>{block.text}</p>

    case 'code':
      return (
        <div key={i} className={styles.codeBlock}>
          <code className={styles.codeBlockInner}>{block.text}</code>
        </div>
      )

    case 'sparkle-aside':
      return (
        <SparkleAside
          key={i}
          content={block.content}
          href={block.href}
          hrefLabel={block.hrefLabel}
        />
      )

    case 'sources-list':
      return (
        <ul key={i} className={styles.sourcesList}>
          {block.items.map((item, j) => (
            <li key={j} className={styles.sourcesItem}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.sourcesLink}>
                {item.label}
              </a>
              {item.note && <span className={styles.sourcesNote}> — {item.note}</span>}
            </li>
          ))}
        </ul>
      )

    case 'screenshot-row':
      return (
        <div key={i} className={styles.screenshotRow}>
          {block.items.map((item, j) => (
            <figure key={j} className={styles.screenshotRowItem}>
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.alt ?? item.caption}
                  className={styles.screenshotRowImg}
                  onClick={onImageClick ? () => onImageClick(item.src, item.alt ?? item.caption) : undefined}
                  style={onImageClick ? { cursor: 'zoom-in' } : undefined}
                  loading="lazy"
                />
              ) : (
                <div className={styles.screenshotRowPlaceholder}><span>{item.alt ?? item.caption}</span></div>
              )}
              <figcaption className={styles.imageCaption}>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      )

    default:
      return null
  }
}

// ── Keyboard section navigation ──────────────────────────

function useSectionKeyNav(
  sectionIds: string[],
  overrides?: Record<string, () => void>
) {
  useEffect(() => {
    if (!sectionIds.length) return

    const getStops = (): number[] => {
      const stops: number[] = []
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        stops.push(el.getBoundingClientRect().top + window.scrollY)
        el.querySelectorAll<HTMLElement>('[data-beat-thresholds]').forEach(range => {
          const thresholds = range.dataset.beatThresholds?.split(',').map(Number) ?? []
          const rangeTop = range.getBoundingClientRect().top + window.scrollY
          const totalScrollable = range.offsetHeight - window.innerHeight
          if (totalScrollable > 0) {
            thresholds.forEach(t => stops.push(rangeTop + t * totalScrollable))
          }
        })
      }
      return stops.sort((a, b) => a - b)
    }

    const getActiveIndex = (stops: number[]) => {
      // Use 0.55 × innerHeight as lookahead — matches the case-meta override offset
      // so that stop is correctly identified as "visited" after the override fires.
      const lookahead = Math.round(window.innerHeight * 0.55)
      let active = 0
      for (let i = 0; i < stops.length; i++) {
        if (stops[i] <= window.scrollY + lookahead) active = i
      }
      return active
    }

    const isBeatNavTarget = (y: number): boolean => {
      const ranges = document.querySelectorAll<HTMLElement>('[data-beat-thresholds]')
      for (const range of Array.from(ranges)) {
        const rangeTop = range.getBoundingClientRect().top + window.scrollY
        const totalScrollable = range.offsetHeight - window.innerHeight
        if (totalScrollable > 0 && y > rangeTop && y <= rangeTop + totalScrollable) return true
      }
      return false
    }

    const goTo = (y: number) => {
      // Check if a section override matches this Y position
      if (overrides) {
        for (const id of sectionIds) {
          const el = document.getElementById(id)
          if (!el) continue
          const sectionY = el.getBoundingClientRect().top + window.scrollY
          if (Math.abs(sectionY - y) < 10 && overrides[id]) {
            overrides[id]()
            return
          }
        }
      }
      // Beat-to-beat navigation uses the legacy 2-arg scrollTo (implicit 'auto')
      // instead of behavior:'instant' — Safari doesn't fire scroll events for
      // programmatic instant jumps, which would leave annotation state stale.
      if (isBeatNavTarget(y)) {
        window.scrollTo(0, Math.max(0, y))
      } else {
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'Tab') {
        e.preventDefault()
        const stops = getStops()
        const next = getActiveIndex(stops) + (e.shiftKey ? -1 : 1)
        goTo(stops[Math.max(0, Math.min(stops.length - 1, next))])
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        const stops = getStops()
        goTo(stops[Math.min(stops.length - 1, getActiveIndex(stops) + 1)])
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const stops = getStops()
        goTo(stops[Math.max(0, getActiveIndex(stops) - 1)])
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [sectionIds, overrides])
}

// ── Page ─────────────────────────────────────────────────

function BackToTopFAB() {
  const [visible, setVisible] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        setVisible(window.scrollY > 400)
        rafRef.current = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <button
      className={`${styles.backToTop} ${visible ? styles.backToTopVisible : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="back to top"
    >
      ↑ top
    </button>
  )
}

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const study = caseStudies.find(s => s.id === id)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt })

  const sectionIds = study?.sections?.map(s => s.id) ?? []
  const navIds = [
    ...(study?.hero ? ['case-hero'] : []),
    ...(study?.hero ? ['case-meta'] : []),
    ...sectionIds,
  ]
  // Override case-meta navigation: instead of jumping to meta's top edge
  // (which scrolls the hero title card fully off-screen), scroll to a position
  // that keeps the bottom of the hero in frame so title card + meta are both visible.
  const navOverrides = useMemo(() => ({
    'case-meta': () => {
      const el = document.getElementById('case-meta')
      if (!el) return
      const metaTop = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: Math.max(0, metaTop - Math.round(window.innerHeight * 0.55)), behavior: 'smooth' })
    },
  }), [])
  useSectionKeyNav(navIds, navOverrides)

  // useLayoutEffect: runs synchronously before paint, so body is scrollable
  // from the very first frame — no flash of clipped content.
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

  function handleBack() {
    navigate(-1)
  }

  if (!study) {
    return (
      <div className={styles.loading}>
        case study not found.
      </div>
    )
  }

  return (
    <>
      <button className={styles.fixedBack} onClick={handleBack} aria-label="back to main board">
        ← back to main board
      </button>
      {study.sections && (
        <div className={styles.fixedKeyboardHint} aria-hidden="true">
          <span className={styles.fixedKeyboardHintArrows}>↑ ↓</span>
          {' '}arrow keys navigate
        </div>
      )}
      <main className={styles.page}>
        <div className={styles.inner}>

          {study.hero ? (
            <div id="case-hero">
              <CaseStudyHero {...study.hero} accentColor={study.hero.accentColor} />
            </div>
          ) : (
            <>
              <h1 className={styles.title}>{study.title}</h1>
              <p className={styles.subtitle}>{study.subtitle}</p>
              <Carousel images={study.images} />
            </>
          )}

          <div id="case-meta" className={`${styles.meta} ${study.hero ? styles.metaHeroDelay : ''}`}>
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Role</div>
              <div className={styles.metaValue}>{study.meta.role}</div>
            </div>
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Timeline</div>
              <div className={styles.metaValue}>{study.meta.timeline}</div>
            </div>
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Tools</div>
              <div className={styles.metaValue}>{study.meta.tools}</div>
            </div>
          </div>

          {study.sections ? (
            <>
              {study.lede && study.lede.split('\n\n').map((para, i) => (
                <p key={i} className={styles.lede} style={i > 0 ? { marginTop: '1.25rem' } : undefined}>{para}</p>
              ))}
              <CaseTOC sections={study.sections} />
              {study.sections.map(section => (
                <section key={section.id} id={section.id} className={styles.csSection}>
                  <h2 className={styles.csSectionHeading}>{section.label}</h2>
                  <div className={styles.csSectionBody}>
                    {section.blocks.map((block, i) => renderBlock(block, i, openLightbox))}
                  </div>
                </section>
              ))}
            </>
          ) : (
            <div className={styles.body}>
              {study.blocks.map((block, i) => renderBlock(block, i, openLightbox))}
            </div>
          )}

        </div>
      </main>
      <BackToTopFAB />
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
