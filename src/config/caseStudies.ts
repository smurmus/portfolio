import { ContentBlock } from '../types/content'

export type CaseStudyMeta = {
  role: string
  timeline: string
  tools: string
}

export type CaseStudy = {
  id: string
  title: string
  subtitle: string
  meta: CaseStudyMeta
  images: { src: string; alt: string; rotation: number }[]
  blocks: ContentBlock[]
}

const caseStudies: CaseStudy[] = [

  // ──────────────────────────────────────────────────────
  /* CONTENT PLACEHOLDER — full case study content
     to be added via separate case study prompt.
     Do not write real copy here. */
  {
    id: 'discord',
    title: 'Discord Community UI Kit',
    subtitle: 'Designing a Figma component library for server moderators and community builders.',
    meta: {
      role: 'UX Engineer / Designer',
      timeline: '2023 — 3 months',
      tools: 'Figma, React, TypeScript',
    },
    images: [
      {
        src: '/assets/polaroids/dc-casestudy.png',
        alt: 'Discord case study — overview',
        rotation: -2,
      },
      {
        src: '/assets/polaroids/dc-kit.png',
        alt: 'Discord UI kit component library',
        rotation: 1,
      },
      {
        src: '',
        alt: 'Discord case study — detail view',
        rotation: -1,
      },
    ],
    blocks: [
      {
        type: 'heading',
        text: 'The problem',
      },
      {
        type: 'paragraph',
        text: 'Placeholder: describe the Discord moderation tooling gap and why a community UI kit was the right answer. 2–3 sentences grounding the problem in real user pain.',
      },
      {
        type: 'callout',
        text: 'Placeholder callout — a key insight or constraint from this project.',
      },
      // ── Annotated screenshot section ──────────────────
      {
        type: 'annotated-screenshot',
        src: '/assets/discord-home.png',
        alt: 'Discord interface showing the p5.js server — server rail, channel list, and message feed',
        beats: [
          {
            label: 'Servers — each one a separate community',
            region: { left: '0%', top: '0%', width: '5%', height: '100%' },
            card: { side: 'right', bottom: 8, offset: 2 },
            isPullQuote: false,
          },
          {
            label: 'Channels — dozens per server, always on',
            region: { left: '5%', top: '0%', width: '15.5%', height: '100%' },
            card: { side: 'right', bottom: 18, offset: 2 },
            isPullQuote: false,
          },
          {
            label: '850 million messages per day',
            region: { left: '20.5%', top: '0%', width: '57%', height: '100%' },
            card: { side: 'left', bottom: 8, offset: 22 },
            isPullQuote: true,
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  /* CONTENT PLACEHOLDER — full case study content
     to be added via separate case study prompt.
     Do not write real copy here. */
  {
    id: 'contentfill',
    title: 'Contentfill',
    subtitle: 'A CLI + VS Code extension that seeds your dev environment with realistic placeholder content.',
    meta: {
      role: 'Solo engineer / designer',
      timeline: '2024 — 6 weeks',
      tools: 'TypeScript, Node.js, VS Code API, Figma',
    },
    images: [
      {
        src: '/assets/polaroids/cf-casestudy.png',
        alt: 'Contentfill case study — overview',
        rotation: -1,
      },
      {
        src: '/assets/polaroids/cf-github.png',
        alt: 'Contentfill GitHub repository',
        rotation: 2,
      },
      {
        src: '',
        alt: 'Contentfill — in-use screenshot',
        rotation: -2,
      },
    ],
    blocks: [
      {
        type: 'heading',
        text: 'The problem',
      },
      {
        type: 'paragraph',
        text: 'Placeholder: describe the pain of lorem ipsum in real design reviews, and the motivation for a tool that seeds contextually correct content at the component level.',
      },
      {
        type: 'callout',
        text: 'Placeholder callout — a key decision or tradeoff from this project.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  /* CONTENT PLACEHOLDER — full case study content
     to be added via separate case study prompt.
     Do not write real copy here. */
  {
    id: 'design-systems',
    title: 'Design Systems at BigHealth',
    subtitle: 'Building and scaling a cross-platform component library for a regulated mental health product.',
    meta: {
      role: 'Lead UX Engineer',
      timeline: '2022–2024',
      tools: 'React, Storybook, Figma, TypeScript',
    },
    images: [
      {
        src: '/assets/polaroids/ds-casestudy.png',
        alt: 'Design systems case study — overview',
        rotation: -2,
      },
      {
        src: '/assets/polaroids/ds-kit.png',
        alt: 'Design systems component kit',
        rotation: 1,
      },
      {
        src: '',
        alt: 'Design systems — Storybook overview',
        rotation: 2,
      },
    ],
    blocks: [
      {
        type: 'heading',
        text: 'The problem',
      },
      {
        type: 'paragraph',
        text: 'Placeholder: describe the pre-system state — fragmented components, inconsistent patterns, friction between design and engineering — and what was at stake in a healthcare product context.',
      },
      {
        type: 'callout',
        text: 'Placeholder callout — a key constraint or breakthrough from this project.',
      },
    ],
  },
]

export default caseStudies
