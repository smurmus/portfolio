import { useEffect, useState, useRef } from 'react'
import Board, { type BoardItem } from '../components/Board/Board'
import HeroCard from '../components/HeroCard/HeroCard'
import PolaroidStack from '../components/PolaroidStack/PolaroidStack'
import WashiLabel from '../components/WashiLabel/WashiLabel'
import StickyNote from '../components/StickyNote/StickyNote'
import Sticker from '../components/Sticker/Sticker'
import BadgeArtifact from '../components/BadgeArtifact/BadgeArtifact'
import AboutNote from '../components/HeroCard/AboutNote'
import ContactCard from '../components/HeroCard/ContactCard'
import { WASHI_DEFS } from '../components/WashiLabel/WashiPatterns'
import boardItemsConfig from '../config/boardItems'
import type { PolaroidData, WashiLabelData } from '../config/boardItems'

// ── Mobile drag hint ──────────────────────────────────────

const HINT_KEY = 'board-drag-hint-shown'

function DragHint() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(HINT_KEY)) return
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem(HINT_KEY, '1')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        Portfolio board — drag to explore
      </div>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-handwriting)',
          fontSize: 14,
          color: 'var(--color-text-secondary)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 600ms ease-out',
          pointerEvents: 'none',
          zIndex: 1000,
          whiteSpace: 'nowrap',
        }}
      >
        drag to explore →
      </div>
    </>
  )
}

// ── Entrance delay schedule ───────────────────────────────

const DELAY: Record<string, number> = {
  hero:                   150,
  badge:                  200,
  'sticker-cherrypick':   250,
  'sticker-sewing':       250,
  'washi-design-systems': 300,
  'washi-contentfill':    360,
  'washi-discord':        420,
  'stack-design-systems': 380,
  'stack-contentfill':    440,
  'stack-discord':        500,
  'stack-postcards':      500,
  'about-note':           560,
  'sticker-avatar':       540,
  'washi-cosplay':        600,
  'stack-cosplay':        660,
  'sticky-currently':     660,
  'contact-card':         700,
  'resume-link':          740,
}

// ── Render each config item as a Board child ──────────────

function renderItem(item: typeof boardItemsConfig[number]): React.ReactNode {
  const d = item.data

  switch (item.type) {
    case 'hero':
      return (
        <HeroCard
          name={d.name as string}
          tagline={d.tagline as string}
        />
      )

    case 'project-stack':
      return (
        <PolaroidStack
          polaroids={d.polaroids as PolaroidData[]}
          variant="project"
        />
      )

    case 'decorative-stack':
      return (
        <PolaroidStack
          polaroids={d.polaroids as PolaroidData[]}
          variant="decorative"
        />
      )

    case 'washi-label': {
      const wd = d as unknown as WashiLabelData
      return (
        <WashiLabel
          label={wd.label}
          color={wd.color}
          patternId={wd.patternId}
          textColor={wd.textColor}
        />
      )
    }

    case 'sticky':
      if (d.lines) {
        return (
          <StickyNote
            color={d.color as string}
            label={d.label as string}
            lines={d.lines as string[]}
            href={d.href as string | undefined}
          />
        )
      }
      return (
        <StickyNote
          color={d.color as string}
          text={d.text as string}
          href={d.href as string | undefined}
        />
      )

    case 'sticker':
      return (
        <Sticker
          imageSrc={d.imageSrc as string}
          alt={d.alt as string}
          size={d.size as number}
        />
      )

    case 'badge':
      return (
        <BadgeArtifact
          company={d.company as string}
          name={d.name as string}
          title={d.title as string}
          imageSrc={d.imageSrc as string}
        />
      )

    case 'about-note':
      return (
        <AboutNote
          text={d.text as string}
          href={d.href as string}
          color={d.color as string}
        />
      )

    case 'contact-card':
      return (
        <ContactCard
          name={d.name as string}
          email={d.email as string}
          links={d.links as { label: string; href: string }[]}
        />
      )

    default:
      return null
  }
}

// ── Page ─────────────────────────────────────────────────

export default function BoardPage() {
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  const boardItems: BoardItem[] = boardItemsConfig.map(item => ({
    id: item.id,
    x: item.x,
    y: item.y,
    zIndex: item.zIndex,
    rotation: item.rotation,
    entranceDelay: prefersReducedMotion.current ? 0 : (DELAY[item.id] ?? 600),
    children: renderItem(item),
  }))

  return (
    <>
      {/* Hidden SVG defs — washi pattern IDs available globally */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        dangerouslySetInnerHTML={{ __html: WASHI_DEFS }}
      />

      <Board items={boardItems} />
      <DragHint />
    </>
  )
}
