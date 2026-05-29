import { useState, useMemo } from 'react'
import Board, { type BoardItem } from '../components/Board/Board'
import HeroCard from '../components/HeroCard/HeroCard'
import PolaroidStack from '../components/PolaroidStack/PolaroidStack'
import WashiLabel from '../components/WashiLabel/WashiLabel'
import StickyNote from '../components/StickyNote/StickyNote'
import Sticker from '../components/Sticker/Sticker'
import BadgeArtifact from '../components/BadgeArtifact/BadgeArtifact'
import AboutNote from '../components/HeroCard/AboutNote'
import ContactCard from '../components/HeroCard/ContactCard'
import PawprintTrail from '../components/PawprintTrail/PawprintTrail'
import { WASHI_DEFS } from '../components/WashiLabel/WashiPatterns'
import boardItemsConfig from '../config/boardItems'
import type { PolaroidData, WashiLabelData } from '../config/boardItems'

// Items ripple out from the center — delay scales with distance from board origin
function distDelay(x: number, y: number): number {
  const dist = Math.sqrt(x * x + y * y)
  return Math.round(Math.min(dist / 1200, 1) * 420)
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
          emoji={d.emoji as string | undefined}
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
          hoverImageSrc={d.hoverImageSrc as string | undefined}
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
          pushpinSrc={d.pushpinSrc as string | undefined}
          href={d.href as string | undefined}
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

    case 'decoration':
      if (d.component === 'PawprintTrail') return <PawprintTrail />
      if (d.component === 'HandwritingLabel') return (
        <span style={{
          fontFamily: 'var(--font-handwriting)',
          fontSize: d.fontSize as number,
          color: d.color as string,
          display: 'block',
        }}>
          {d.text as string}
        </span>
      )
      if (d.component === 'MiniStickyNote') return (
        <div style={{
          background: d.color as string,
          padding: '10px 14px',
          width: 88,
          boxShadow: '0 2px 8px rgba(0,0,0,0.10), 2px 2px 0 rgba(0,0,0,0.04)',
          borderRadius: 1,
        }}>
          <span style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: 11,
            color: 'var(--color-text-primary)',
            lineHeight: 1.4,
            display: 'block',
          }}>
            {d.text as string}
          </span>
        </div>
      )
      return null

    default:
      return null
  }
}

// ── Page ─────────────────────────────────────────────────

export default function BoardPage() {
  const [prefersReducedMotion] = useState(
    () => typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  const boardItems: BoardItem[] = useMemo(() => boardItemsConfig.map(item => ({
    id: item.id,
    x: item.x,
    y: item.y,
    zIndex: item.zIndex,
    rotation: item.rotation,
    entranceDelay: prefersReducedMotion ? 0 : distDelay(item.x, item.y),
    children: renderItem(item),
  })), [prefersReducedMotion])

  return (
    <>
      {/* Hidden SVG defs — washi pattern IDs available globally */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        dangerouslySetInnerHTML={{ __html: WASHI_DEFS }}
      />

      <Board items={boardItems} />
    </>
  )
}
