/* BLOCK TYPES: add new types to src/types/content.ts
   and add a corresponding case to the renderer in CaseStudy.tsx.
   Case study prompts may extend this. */

export type AnnotationBeat = {
  label: string
  /** Region coordinates as percentages of the screenshot dimensions */
  region: { left: string; top: string; width: string; height: string }
  card: {
    side: 'left' | 'right'
    top: number      // % from top of screenshot
    /** Horizontal offset % from the chosen side */
    offset?: number
    /** Override font size in px — use for progressive sizing across beats */
    fontSize?: number
  }
  isPullQuote?: boolean
}

export type PersonaCardDef = {
  id: string
  name: string
  behaviors: string[]
  footerLabel: string
  footerText: string
  variant: 'observer' | 'contributor'
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'image'; src: string; alt?: string; caption?: string; captionHref?: string; opacity?: number; height?: number; objectFit?: 'cover' | 'contain'; objectPosition?: string; fadeBottom?: boolean }
  | { type: 'callout'; text: string }
  | { type: 'media-placeholder'; label: string }
  | {
    type: 'split'
    left: ContentBlock[]
    right: ContentBlock[]
    /** Vertical alignment of columns. Default: 'start' */
    align?: 'start' | 'center'
  }
  | { type: 'persona-cards'; cards: PersonaCardDef[]; isInitialIntroduction?: boolean }
  | {
    type: 'annotated-screenshot'
    src: string
    alt: string
    beats: AnnotationBeat[]
    caption?: string
  }
  | { type: 'audit-feature-cards' }
  | { type: 'feature-audit-table' }
  | { type: 'audit-closing'; line1: string; line2: string }
  | { type: 'section-lede'; text: string }
  | { type: 'lede'; text: string }
  | { type: 'caption'; text: string }
  | { type: 'design-2024-landscape' }
  | { type: 'thesis-diagram' }
  | { type: 'notification-rebuttal' }
  | { type: 'engagement-funnel' }
  | { type: 'tldr-timeline' }
  | { type: 'link-button'; href: string; label: string }
  | { type: 'screenshot-row'; items: { src: string; alt?: string; caption: string }[] }
  | { type: 'prototype-iframe'; src: string; height?: number; mobile?: boolean }
  | { type: 'video'; src: string; caption?: string }
  | { type: 'sources-list'; items: { label: string; href: string; note?: string }[] }
  | { type: 'sparkle-aside'; content: string; href?: string; hrefLabel?: string }
  | { type: 'metrics-grid'; items: { metric: string; whatItIs: string; whyItMatters: string }[] }
  | { type: 'aside-note'; text: string }
  | { type: 'code'; language?: string; text: string }
  | { type: 'collab-diagram' }
