import type { ContentBlock } from '../types/content'

export type CaseStudyMeta = {
  role: string
  timeline: string
  tools: string
}

export type CaseStudyHeroConfig = {
  imageSrc: string
  imageAlt: string
  title: string
  subhead: string
  skipToId?: string
  prototypeHref?: string
  rotation?: number
  /** Fallback bg when imageSrc is empty — matches project accent color */
  accentColor?: string
  /** When set, hero fills 100vh with this text overlaid. Title card fades in on scroll. */
  hookText?: string
}

export type CaseStudySectionDef = {
  id: string
  label: string
  /** When true, the sidebar TOC hides while this section is active.
      Use for full-viewport sections (annotated screenshot, video, etc.) */
  fullScreen?: boolean
  blocks: ContentBlock[]
}

export type CaseStudy = {
  id: string
  title: string
  subtitle: string
  meta: CaseStudyMeta
  images: { src: string; alt: string; rotation: number }[]
  hero?: CaseStudyHeroConfig
  /** Cinematic opener rendered before the hero — big display text + optional screenshot */
  openingHook?: {
    text: string
    /** Typed in on scroll/keypress into the second viewport */
    textSuffix?: string
    imageSrc?: string
    imageAlt?: string
  }
  /** Introductory paragraph rendered between meta row and sections */
  lede?: string
  /** When present, renders the sectioned layout with TOC instead of flat blocks */
  sections?: CaseStudySectionDef[]
  blocks: ContentBlock[]
}

const caseStudies: CaseStudy[] = [

  // ──────────────────────────────────────────────────────
  {
    id: 'discord',
    title: 'Discord "Waypoints"',
    subtitle: 'Discord has spent years helping people find communities. Waypoints tackles what comes next — staying part of one.',
    hero: {
      imageSrc: '/assets/discord-radar-hero.png',
      imageAlt: 'Discord My Radar — a personalized feed of matched posts from across your servers, with the Waypoints panel on the right',
      title: 'Discord “Waypoints”',
      subhead: 'Discord has spent years helping users find what they missed.\nThis project is about giving them a reason to come back.',
      skipToId: 'tldr',
      prototypeHref: '#prototype',
      rotation: 0.8,
      hookText: "What if you didn’t have to be everywhere to catch everything?",
    },
    meta: {
      role: 'Design, research',
      timeline: '2024, revisited 2026',
      tools: 'Figma, Claude Code, Notion, Discord',
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
    lede: "A spec project I first explored in 2024 and found my way back to in 2026 — the AI landscape had made things possible that weren't practical at the time.",
    sections: [
      {
        id: 'context',
        label: 'Current State',
        fullScreen: true,
        blocks: [
          {
            type: 'section-lede',
            text: 'What opening Discord looks like today:',
          },
          {
            type: 'annotated-screenshot',
            src: '/assets/discord-home.png',
            alt: 'Discord interface showing the p5.js server — server rail, channel list, and message feed',
            beats: [
              {
                label: "Every server is its own community…",
                region: { left: '3.5%', top: '0%', width: '4.5%', height: '100%' },
                card: { side: 'left', top: 12, offset: 9, fontSize: 13 },
                isPullQuote: false,
              },
              {
                label: "…with dozens of channels, all running in parallel…",
                region: { left: '8%', top: '0%', width: '14%', height: '100%' },
                card: { side: 'left', top: 12, offset: 23, fontSize: 15 },
                isPullQuote: false,
              },
              {
                label: "…each filling up whether you're watching or not.",
                region: { left: '22%', top: '0%', width: '57%', height: '100%' },
                card: { side: 'right', top: 12, offset: 22, fontSize: 19 },
                isPullQuote: true,
              },
            ],
            caption: 'Actual screenshot taken from actual Discord.',
          },
          {
            type: 'split',
            align: 'center',
            left: [
              {
                type: 'paragraph',
                text: "Discord is organized around servers — persistent communities built around shared interests. Inside each server, content moves through channels: text, voice, and thread-based spaces that fill continuously. At scale, an active server generates more content than any member could read.",
              },
              {
                type: 'paragraph',
                text: "It starts to feel a little like this:",
              },
            ],
            right: [
              {
                type: 'image',
                src: '/assets/discord-overwhelmed.gif',
                alt: 'Overwhelmed office worker buried in paperwork — a metaphor for the Discord unread pile',
                caption: 'source: abstract',
                captionHref: 'https://giphy.com/goabstract',
              },
            ],
          },
        ],
      },
      {
        id: 'research',
        label: 'Research',
        blocks: [
          {
            type: 'subheading',
            text: 'The Starting Point',
          },
          {
            type: 'split',
            align: 'start',
            left: [
              {
                type: 'paragraph',
                text: 'I conducted **7** interviews across two rounds.',
              },
              {
                type: 'paragraph',
                text: "Every person's relationship with Discord was different — different servers, different habits, different reasons for showing up. But when I mapped specific behaviors rather than attitudes, **two patterns kept surfacing**.",
              },
            ],
            right: [
              {
                type: 'image',
                src: '/assets/discord-affinity-map.svg',
                alt: 'Affinity map — behavioral patterns from 7 interviews',
                caption: 'Affinity map — click to zoom',
              },
            ],
          },
          {
            type: 'subheading',
            text: 'Two Patterns',
          },
          {
            type: 'paragraph',
            text: 'Every pass through the data landed in the same two places.',
          },
          {
            type: 'persona-cards',
            isInitialIntroduction: true,
            cards: [
              {
                id: 'observer',
                name: 'The Observer',

                variant: 'observer',
                behaviors: [
                  'Reads channels regularly, rarely posts',
                  'Has typed a reply and deleted it before sending',
                  'Drops in, catches up, leaves without a trace',
                  'Wants to feel part of the community without performing membership',
                ],
                footerLabel: 'WHAT THEY NEED',
                footerText: 'A clear on-ramp back into conversations they care about.',
              },
              {
                id: 'contributor',
                name: 'The Contributor',

                variant: 'contributor',
                behaviors: [
                  "Posts when something comes to mind — doesn't wait for the right moment",
                  'Joins conversations mid-thread without hesitation',
                  'Uses Discord to contribute as much as to consume',
                  'Checks back to see if anyone responded',
                ],
                footerLabel: 'WHAT THEY HAVE',
                footerText: 'Posting doesn\'t feel like a big deal — the barrier to contribute is low.',
              },
            ],
          },
        ],
      },
      {
        id: 'design-2024',
        label: '2024 — Original Design',
        blocks: [
          {
            type: 'section-lede',
            text: "The problem wasn't the content. It was the navigation to find it.",
          },
          { type: 'design-2024-landscape' },
          {
            type: 'split',
            align: 'start',
            left: [
              { type: 'subheading', text: 'The "Launchpad"' },
              {
                type: 'paragraph',
                text: 'In 2024, working from this research, I designed a "Launchpad" home base — a personalized view that surfaced relevant content from your servers without requiring you to visit each one individually.',
              },
              {
                type: 'paragraph',
                text: "The Launchpad was a curated home view — favorited channels from across your servers and DMs, all in one sidebar. Most people only care about one or two channels per server. This put just those in one place, cutting out the rest. The participation problem wasn't on my radar yet.",
              },
            ],
            right: [
              {
                type: 'image',
                src: '/assets/design-2024/launchpad-screen-2.png',
                alt: '2024 Figma mockup — Launchpad detail view',
                caption: '2024 Figma mockup — the Launchpad concept',
                opacity: 0.88,
                height: 500,
                objectFit: 'cover',
                objectPosition: 'top',
                fadeBottom: true,
              },
            ],
          },
          {
            type: 'sparkle-aside',
            content: 'Discord launched Favorites as an experiment in 2026 — essentially what Launchpad was: a pinned list of channels from across your servers, surfaced in one place.',
            href: 'https://support.discord.com/hc/en-us/articles/38810584460439-Favorites-FAQ',
            hrefLabel: 'Discord Favorites FAQ ↗',
          },
        ],
      },
      {
        id: 'discord-shipped',
        label: '2026 — Audit',
        blocks: [
          {
            type: 'paragraph',
            text: "Between 2024 and 2026, Discord shipped three more features in this space. By 2026 the underlying AI tooling had matured enough to make this worth revisiting. The audit is a check on what had changed.",
          },
          { type: 'feature-audit-table' },
        ],
      },
      {
        id: 'the-gap',
        label: 'The Gap',
        blocks: [
          {
            type: 'persona-cards',
            cards: [
              {
                id: 'observer',
                name: 'The Observer',

                variant: 'observer',
                behaviors: [
                  'Reads channels regularly, rarely posts',
                  'Has typed a reply and deleted it before sending',
                  'Drops in, catches up, leaves without a trace',
                  'Wants to feel part of the community without performing membership',
                ],
                footerLabel: 'WHAT THEY NEED',
                footerText: 'A clear on-ramp back into conversations they care about.',
              },
              {
                id: 'contributor',
                name: 'The Contributor',

                variant: 'contributor',
                behaviors: [
                  "Posts when something comes to mind — doesn't wait for the right moment",
                  'Joins conversations mid-thread without hesitation',
                  'Uses Discord to contribute as much as to consume',
                  'Checks back to see if anyone responded',
                ],
                footerLabel: 'WHAT THEY HAVE',
                footerText: 'Posting doesn\'t feel like a big deal — the barrier to contribute is low.',
              },
            ],
          },
          {
            type: 'paragraph',
            text: 'Take Chelsea: Design Buddies announced a design-a-thon, and she wanted in. By the time she went to join, teams were already formed. Discord showed her everything — it just didn\'t know this was the thing she\'d been waiting for. That\'s the participation gap in practice: present, paying attention, still a beat behind on the moments that matter. A Waypoint for "design-a-thon" would have caught the announcement, the team formation thread, wherever it came up — surfaced to her when it was still actionable.',
          },
        ],
      },
      {
        id: 'waypoints',
        label: 'Waypoints — The Solution',
        blocks: [
          { type: 'section-lede', text: 'A Waypoint lives within a server. You set it once, declare what you\'re tracking, and it monitors that server\'s channels indefinitely. Radar is the other half — a unified feed that surfaces every match from all your active Waypoints, wherever they came from.' },

          { type: 'subheading', text: 'Two surfaces' },
          { type: 'paragraph', text: 'Waypoints are scoped to individual servers — you\'re telling a specific community what you care about within it, not setting a global interest across all of Discord. Radar aggregates the results: one feed that pulls every match from every server where you have an active Waypoint.' },
          {
            type: 'split',
            align: 'center',
            left: [
              {
                type: 'image',
                src: '/assets/discord-waypoint.png',
                alt: 'Discord Waypoints panel — active Waypoints within a server',
                caption: 'Waypoints — what you\'re watching for, within a server.',
              },
            ],
            right: [
              {
                type: 'image',
                src: '/assets/discord-radar-hero.png',
                alt: 'Discord My Radar — unified feed of matched posts',
                caption: 'Radar — every match, in one place.',
              },
            ],
          },

          { type: 'subheading', text: 'Setting a Waypoint' },
          { type: 'paragraph', text: 'From the Waypoints panel in any server, or right-click any message to start from context. The system proposes a Waypoint based on the message; you edit it to match what you actually mean. Nothing is created silently — every Waypoint is visible, editable, removable.' },
          { type: 'video', src: '/assets/set-a-waypoint-source-server.webm', caption: 'From the Waypoints panel — open it in any server and define what you\'re tracking.' },
          { type: 'video', src: '/assets/set-a-waypoint-source-message.webm', caption: 'From a message — right-click any post to create a Waypoint from context.' },

          { type: 'subheading', text: 'Radar' },
          { type: 'paragraph', text: 'Radar is a scrollable feed of everything that matched your active Waypoints — across every server, in one place. Navigate directly from a match to its channel, edit a Waypoint on the spot, or filter by server.' },
          { type: 'video', src: '/assets/radar-message-match-good.webm', caption: 'A strong match surfaces in the feed.' },
          { type: 'video', src: '/assets/my-radar-edit-item.webm', caption: 'Editing a Waypoint from Radar — refine the query without losing your place.' },
          { type: 'video', src: '/assets/my-radar-filter-and-clear.webm', caption: 'Filter by server or clear matches you\'re done with.' },

          {
            type: 'callout',
            text: 'A Waypoint for "design-a-thon" should catch posts about it whether they say "design sprint", "collab project", or anything else that means the same thing. That\'s semantic matching — it\'s what makes Waypoints work in natural language rather than as a keyword filter.',
          },
          { type: 'notification-rebuttal' },
        ],
      },
      {
        id: 'prototype',
        label: 'Prototype**',
        fullScreen: true,
        blocks: [
          { type: 'section-lede', text: 'Three navigable flows — the Radar feed, the Waypoints panel, and the right-click entry point. At the bottom right is a button to open a control menu to view all available flows and states.' },
          { type: 'prototype-iframe', src: 'https://discord-waypoints.vercel.app', height: 680 },
          { type: 'prototype-iframe', src: 'https://discord-waypoints.vercel.app', mobile: true },
          {
            type: 'sparkle-aside',
            content: 'Built with Claude Code — routing, Figma-faithful components, and the semantic matching mock in a few evenings. The AI tooling that made this fast is the same shift that made the core feature possible.',
          },
          { type: 'paragraph', text: '**Add Waypoint doesn\'t persist across sessions and most sidebar links don\'t resolve — the prototype is scoped to what matters: what Radar feels like when it\'s working, what matched Waypoints look like, and how you navigate from a match back to its channel.' },
        ],
      },
      {
        id: 'impact-measurement',
        label: 'Impact & Measurement',
        blocks: [
          { type: 'lede', text: 'This was never shipped. These numbers are speculative. But part of designing something real is knowing what "working" would actually look like.' },
          // TODO: revisit closing sentence — "thread back into communities that kept moving without them" is placeholder
          { type: 'paragraph', text: 'Discord has 260M monthly active users and 31.5M daily actives. Within that gap are Observer-segment users — people who are in their servers, care about them, but don\'t know what\'s worth engaging with when they show up — and without a clear reason to, eventually stop. Waypoints is the thread back into communities that kept moving without them.' },
          { type: 'engagement-funnel' },
          { type: 'subheading', text: 'What success might look like' },
          { type: 'paragraph', text: 'If this shipped, these are the signals worth watching — and what they\'d actually tell you.' },
          {
            type: 'metrics-grid',
            items: [
              {
                metric: 'DAU/MAU ratio — Observer segment',
                whatItIs: 'Observer-segment users (monthly actives who\'ve never posted) logging in daily, before vs. after setting a Waypoint.',
                whyItMatters: 'The most direct signal that Waypoints are converting passive check-ins into genuine daily engagement.',
              },
              {
                metric: 'First post rate',
                whatItIs: 'Observer-segment users who post in a matched server for the first time within 30 days of setting a Waypoint.',
                whyItMatters: 'Crossing from Observer to Contributor. Even a small lift here is the re-entry problem being solved.',
              },
              {
                metric: 'Waypoint-to-engagement rate',
                whatItIs: 'Radar matches that lead to a channel visit within 24 hours.',
                whyItMatters: 'Whether surfacing drives re-entry or becomes background noise. Low rate = Waypoints too broad, or matches not compelling enough to act on.',
              },
              {
                metric: 'Waypoint retention at 30 days',
                whatItIs: 'Users with at least one active Waypoint 30 days after setting their first.',
                whyItMatters: 'Habit vs. novelty. Drop-off signals NLP quality or match relevance needs work — not that the concept is wrong.',
              },
            ],
          },
          { type: 'aside-note', text: 'A few things that would be tempting to track but wouldn\'t tell you much: total messages sent (too noisy, too many variables), Nitro conversion directly (too many steps in the chain to attribute cleanly), and Radar opens (a vanity metric — opening Radar and finding something worth acting on are different things).' },
          { type: 'caption', text: 'Sources: MAU/DAU — SQ Magazine, TechRT, DemandSage (2025). Nitro subscribers — Sacra, Feedough (2025). Observer gap derived from 10% CPR benchmark (Levellr, 2025) — industry figure, not Discord-reported. All projections are speculative estimates with methodology disclosed, not measured outcomes.' },
        ],
      },
      {
        id: 'reflection',
        label: 'Reflection',
        blocks: [
          { type: 'paragraph', text: 'The assumption I\'d want to validate earliest is NLP reliability. The design depends on matches being good enough that one imperfect result doesn\'t break trust — visible match attribution is the recovery mechanism, but that\'s an assumption worth testing against real data. Synthetic matches in a prototype behave very differently from production-scale semantic search across diverse server content.' },
          { type: 'paragraph', text: 'From an engineering perspective, I\'d also want the infrastructure decisions shaped early. This is a semantic search pipeline — message ingestion, embedding generation, vector similarity search, ranking, delivery — running at Discord\'s scale. The architecture is well-established, but latency matters more than it might look: for something like team formation in a design-a-thon, a match needs to surface while the window is still open. Near-real-time processing is a different infrastructure investment than batch, and that decision shapes what\'s realistic for an initial scope.' },
          { type: 'paragraph', text: 'One scope question I hit early: should a Waypoint watch across every server you\'re in — not just the one where you set it? The appeal is obvious; the problem is equally obvious once you think it through. A semantic search pipeline running against every channel across every server you\'ve ever joined is a very different infrastructure commitment than one scoped to opted-in, per-server watching. And from a design standpoint, the intent gets muddier — you\'re not describing a global interest, you\'re telling a specific community what you care about within it. Keeping Waypoints per-server was both the engineering-sane and design-coherent call.' },
          { type: 'paragraph', text: 'The next design problem I\'d tackle is discoverability. Waypoints is an ambient feature — it lives in the background until you\'ve set one, and if you never set one, you never see the value. The right-click entry point makes creation contextual, and empty Radar state is the natural onboarding surface, but it\'s a cold-start problem: you have to already understand what Waypoints does to know what to put there. How that first Waypoint gets set — and when — shapes whether the feature reaches the people it\'s designed for.' },
        ],
      },
      {
        id: 'tldr',
        label: 'TL;DR',
        blocks: [
          { type: 'section-lede', text: 'Discord has a participation problem, not an information problem. Here\'s the design that addresses it.' },
          { type: 'tldr-timeline' },
          { type: 'paragraph', text: 'Every feature Discord shipped between 2024 and 2026 addresses information access. The participation gap — already visible in the 2024 research — stayed open. That\'s what this design addresses.' },
          { type: 'feature-audit-table' },
          { type: 'engagement-funnel' },
          {
            type: 'image',
            src: '/assets/discord-radar-hero.png',
            alt: 'Discord My Radar — populated state',
            caption: 'Waypoints — declare what matters to you. Radar surfaces it across every server, wherever it lands.',
          },
          { type: 'link-button', href: 'https://discord-waypoints.vercel.app', label: 'Open the prototype →' },
        ],
      },
      {
        id: 'appendix',
        label: 'Sources',
        blocks: [
          {
            type: 'sources-list',
            items: [
              {
                label: 'Discord Statistics 2025 — TechRT',
                href: 'https://techrt.com/discord-statistics/',
                note: '260M MAU, 31.5M DAU (2025 estimates)',
              },
              {
                label: 'Discord Statistics 2025 — SQ Magazine',
                href: 'https://sqmagazine.co.uk/discord-statistics/',
                note: '231M MAU as of Q2 2025',
              },
              {
                label: 'Key metrics for defining your Discord community — Levellr',
                href: 'https://www.levellr.com/this-is-what-success-looks-like-key-metrics-for-defining-your-discord-community/',
                note: 'Community Participation Rate benchmark (~10%)',
              },
              {
                label: 'Discord revenue and valuation — Sacra',
                href: 'https://sacra.com/c/discord/',
                note: '7.3M Nitro subscribers, $725M ARR (2025)',
              },
              {
                label: 'Discord Statistics — DemandSage',
                href: 'https://www.demandsage.com/discord-statistics/',
                note: 'MAU/DAU and user growth figures',
              },
            ],
          },
          {
            type: 'caption',
            text: 'MAU and DAU figures are third-party estimates — Discord does not publicly report these on a regular cadence. The ~10% Community Participation Rate is Levellr\'s stated industry benchmark, not a Discord-reported figure. All statistics reflect 2025 data unless noted.',
          },
        ],
      },
    ],
    blocks: [],
  },

  // ──────────────────────────────────────────────────────

  {
    id: 'contentfill',
    title: 'Contentfill',
    subtitle: 'A GUI for bulk Contentful operations, designed around the fact that what it does can\'t be undone.',
    hero: {
      imageSrc: '',
      // TODO: hero image — PreviewStep in error state. Errors tab active, 2–3 error rows visible,
      // plain-language error messages, editable proposed-value inputs, Apply button greyed.
      // No callouts. Let it land.
      imageAlt: 'Contentfill — PreviewStep in error state, Errors tab active, showing per-entry error messages and a greyed Apply button',
      accentColor: '#C87A1A',
      title: 'Contentfill',
      subhead: 'Bulk operations on a shared CMS are irreversible.\nThis tool is designed around that fact.',
      skipToId: 'tldr',
      rotation: -1,
    },
    meta: {
      role: 'End-to-end design · Implementation via Claude Code',
      timeline: '2024–2025',
      tools: 'Contentful CMA, React, TypeScript, Claude Code',
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
        alt: 'Contentfill — PreviewStep in use',
        rotation: -2,
      },
    ],
    lede: 'Contentfill is an internal GUI I designed and shipped at Big Health — a tool for bulk Contentful operations that non-technical users could run themselves, safely, without engineering involvement.',
    sections: [

      // ── The Problem ──────────────────────────────────────

      {
        id: 'problem',
        label: 'The Problem',
        blocks: [
          {
            type: 'section-lede',
            text: 'When something needs to change across hundreds of entries, Contentful\'s native editor provides exactly one path: open each entry individually.',
          },
          {
            type: 'paragraph',
            text: 'The content team at Big Health manages hundreds of Contentful entries across dozens of content types. The people responsible for keeping them accurate — content admins, PMs, designers, clinical content admins — are not engineers. Adding a field across twenty content types means navigating to each one individually. Deriving a slug from a title field means opening every entry by hand. Creating hundreds of entries from a template means doing it one at a time.',
          },
          {
            type: 'video',
            src: '/assets/contentfill/contentful-multiple-entries-open.webm',
            caption: 'Contentful\'s native editor — each reference opens a new modal, stacking.',
          },
          {
            type: 'callout',
            text: 'Each reference opens a new modal. Three levels deep, the original entry is buried. Each level requires its own explicit publish. Forget one and the change doesn\'t reach delivery.',
          },
          {
            type: 'paragraph',
            text: 'Bulk-edit tools exist in Contentful\'s marketplace. None addressed the three operations the team kept needing: schema changes across content types, computed field transforms, and bulk creation. The engineering path — Contentful\'s CMA — can do all three, but it\'s code-only, has no preview, and puts every operation back in the ticket queue.',
          },
          {
            type: 'video',
            src: '/assets/contentfill/contentful-open-multiple-entries.webm',
            caption: 'Hundreds of entries. No path through them except one at a time.',
          },
          {
            type: 'paragraph',
            text: 'Before Contentfill, a colleague needed to create and update hundreds of entries. There was no tool for it. They spent hours in Contentful\'s editor, opening entries one by one.',
          },
        ],
      },

      // ── Design Decisions ─────────────────────────────────

      {
        id: 'decisions',
        label: 'Design Decisions',
        blocks: [
          {
            type: 'section-lede',
            text: 'Six decisions shaped Contentfill\'s design. The first two address operations that didn\'t exist anywhere else. The rest address how those operations are executed safely.',
          },

          // ── Decision 1 ───────────────────────────────────

          {
            type: 'subheading',
            text: '1. Transforms as first-class operations, not one-time scripts',
          },
          {
            type: 'paragraph',
            text: 'Every bulk-edit tool in Contentful\'s ecosystem sets the same static value across many entries. None generate new values from existing field data. In Contentfill, transforms are menu-selectable — slugify, copy-field, prepend, append, or plain-English AI Agent — and previewed against every entry before a write happens. The AI proposes; the user decides.',
          },
          {
            type: 'media-placeholder',
            label: 'TODO: ConfigStep for Update Entries — content type selected, transform selector visible (slugify/copy-field/AI Agent options), right-rail field inspector populated with fields for the selected type.',
          },
          {
            type: 'caption',
            text: 'Transform chosen from a menu. Schema visible while configuring. No code involved.',
          },
          {
            type: 'callout',
            text: 'Computed from existing field data — not a static value set across all entries. Natural language → computed values → reviewable before write.',
          },

          // ── Decision 2 ───────────────────────────────────

          {
            type: 'subheading',
            text: '2. Schema operations with the same care as content operations',
          },
          {
            type: 'paragraph',
            text: 'Add Field and Delete Field are dedicated workflows in Contentfill — each with their own ConfigStep, PreviewStep, and ApplyStep. The Delete Field flow surfaces Contentful\'s required two-phase deletion process as an explicit, named sequence: users see what phase they\'re in and see the warning before they begin, not at the moment of no return.',
          },
          {
            type: 'media-placeholder',
            label: 'TODO: Delete Field ConfigStep — grouped content type selection (MODULE, DAILY SESSIONS, COMPONENT, SCREEN sections visible), yellow "Destructive operation" warning banner at top.',
          },
          {
            type: 'caption',
            text: 'Schema operations treated with the same preview-before-write design as content operations.',
          },
          {
            type: 'callout',
            text: 'Risk is named at the entry point — before the user selects a single content type. Content types grouped by domain taxonomy, not API name or alphabetical order.',
          },

          // ── Decision 3 ───────────────────────────────────

          {
            type: 'subheading',
            text: '3. Preview is mandatory, numbered, and architecturally enforced',
          },
          {
            type: 'paragraph',
            text: 'Preview in Contentfill isn\'t a flag, a toggle, or an optional step — it\'s step two of three, clearly numbered at the top of every screen. Step three is inaccessible until step two completes. The stepper isn\'t navigation; it\'s a commitment contract.',
          },
          {
            type: 'media-placeholder',
            label: 'TODO: Stepper component — tight crop showing all three states across one strip. Configure (checkmark, complete), Preview (active, numbered circle), Results (inactive, greyed). If possible, two states side by side: one with Configure active, one with Preview active.',
          },
          {
            type: 'callout',
            text: 'Step 3 is inaccessible until step 2 is complete. Preview is not optional.',
          },

          // ── Decision 4 ───────────────────────────────────

          {
            type: 'subheading',
            text: '4. Per-entry error handling with inline override',
          },
          {
            type: 'paragraph',
            text: 'In the PreviewStep, error entries are shown inline — plain-language explanation, an editable proposed-value field, and a link to the entry in Contentful. The apply button shows an unresolved error count and stays disabled until every error is addressed. One bad entry doesn\'t abort the batch or disappear into a summary; it stays visible until someone makes a decision about it.',
          },
          {
            type: 'media-placeholder',
            label: 'TODO: One error row, full-width, from the PreviewStep errors tab. Slug-collision error preferred. Show: red row highlight, editable proposed-value input, full plain-language error message ("Slug \'t-r-guided-practice\' collides with entry \'T&R Guided Practice 1\'. Rename one of them manually."), bottom bar with error count and greyed Apply button.',
          },
          {
            type: 'callout',
            text: 'Plain language — not a stack trace. The user knows what went wrong and what to do about it. Editable inline. No context switch required.',
          },

          // ── Decision 5 ───────────────────────────────────

          {
            type: 'subheading',
            text: '5. A consistent design language for dangerous operations',
          },
          {
            type: 'paragraph',
            text: 'Three affordances instead of a confirmation modal: an always-visible environment badge so you know which environment you\'re in before touching anything; a destructive-operation warning banner that appears at the entry point to dangerous flows, not at the moment of no return; and an apply button that stays disabled until every error in the batch is resolved — consent earned through action, not assumed.',
          },
          {
            type: 'media-placeholder',
            label: 'TODO: Destructive operation warning banner — Delete Field ConfigStep, tight crop',
          },
          {
            type: 'media-placeholder',
            label: 'TODO: Master environment badge — Contentfill header, tight crop',
          },

          // ── Decision 6 ───────────────────────────────────

          {
            type: 'subheading',
            text: '6. Excel as an access bridge for bulk creation',
          },
          {
            type: 'paragraph',
            text: 'Contentfill generates an Excel template from the live content model — correctly-named columns, required fields marked, field types embedded. The user fills it in offline and re-uploads. It flows through the same PreviewStep as every other operation: same error handling, same gatekeeping, same apply flow. The first content admin to use it needed one sentence of direction and didn\'t come back with questions.',
          },
          {
            type: 'media-placeholder',
            // TODO: capture this from a real re-upload on your work laptop before May 29.
            // The filled-in spreadsheet parsed and resolved into the standard preview table.
            // The Excel file itself is NOT worth screenshotting — the PreviewStep after re-upload does.
            label: 'TODO: Re-upload PreviewStep — filled spreadsheet parsed into the preview table, showing proposed new entries as rows with current/proposed columns. This is the visual that closes the loop: Excel goes in, the same safety pipeline comes out.',
          },
          {
            type: 'callout',
            text: 'The spreadsheet re-enters the same preview-before-write pipeline as every other operation — the same error handling, the same commit gatekeeping.',
          },
        ],
      },

      // ── The Flow ─────────────────────────────────────────

      {
        id: 'flow',
        label: 'The Flow',
        blocks: [
          {
            type: 'section-lede',
            text: 'Contentfill has three steps. They\'re always visible at the top of the screen, and they\'re always in this order.',
          },
          {
            type: 'video',
            src: '/assets/contentfill/contentfill-login-initial-load.webm',
            caption: 'Contentfill — initial load. Select an operation and begin.',
          },
          {
            type: 'subheading',
            text: 'Configure',
          },
          {
            type: 'paragraph',
            text: 'Select an operation (Update Entries, Add Field, Delete Field), choose the content types you\'re targeting, and configure what should happen. The schema for whatever you\'ve selected is visible in the right rail — every field, every type, every constraint — while you configure. You never have to look it up somewhere else.',
          },
          {
            type: 'media-placeholder',
            label: 'TODO: ConfigStep for Update Entries — content type selected, right-rail inspector populated.',
          },
          {
            type: 'caption',
            text: 'Configure: the schema is visible while you work.',
          },
          {
            type: 'subheading',
            text: 'Preview',
          },
          {
            type: 'paragraph',
            text: 'Before anything is written to Contentful, every entry in the batch is shown with its current value and the proposed change side-by-side. Errors are surfaced per entry with plain-language explanations. Warnings are flagged. Clean entries are grouped separately. The Apply button stays disabled until every error has been addressed.',
          },
          {
            type: 'media-placeholder',
            label: 'TODO: PreviewStep, mostly-clean state — majority of rows clean, one or two warnings visible, filter tabs showing All/Errors/Warnings/Clean.',
          },
          {
            type: 'caption',
            text: 'Preview: every change reviewed before commit. The Apply button doesn\'t activate until the batch is clean.',
          },
          {
            type: 'subheading',
            text: 'Results',
          },
          {
            type: 'paragraph',
            text: 'After applying, the results screen shows the outcome per entry: updated, skipped, errored. Every updated entry links back to Contentful.',
          },
          {
            type: 'media-placeholder',
            label: 'TODO: Results screen — entry counts, status indicators, links out to updated entries. Capture from a real operation.',
          },
          {
            type: 'caption',
            text: 'Results: full accountability for what happened and what didn\'t.',
          },
        ],
      },

      // ── On AI Implementation ─────────────────────────────

      {
        id: 'ai',
        label: 'On AI Implementation',
        blocks: [
          {
            type: 'paragraph',
            text: 'I used Claude Code as the implementation partner. The engineering path was available to me — I\'m a software engineer — but the design problems were the ones worth spending time on.',
          },
          {
            type: 'split',
            align: 'start',
            left: [
              {
                type: 'subheading',
                text: 'Claude Code handled',
              },
              {
                type: 'paragraph',
                text: 'React components · TypeScript · Contentful CMA API wiring · Build tooling',
              },
            ],
            right: [
              {
                type: 'subheading',
                text: 'I handled',
              },
              {
                type: 'paragraph',
                text: 'What the tool does · Who it serves · Safety affordances · Error handling · When and how the UI communicates risk',
              },
            ],
          },
          {
            type: 'paragraph',
            text: 'The deletion flow is the clearest example. Claude Code implemented two-phase field deletion as a single step with no visible progress. I recognized it immediately: the operation was running, but Contentful\'s two-phase structure was invisible. I directed it to surface both phases with a named progress indicator. That\'s the difference between a user trusting the tool and hitting refresh because nothing appeared to happen.',
          },
          {
            type: 'callout',
            text: 'Using AI to implement a design tool is different from using AI to design one. The decisions about what Contentfill should do and how it should handle the moment before an irreversible operation — those were mine.',
          },
        ],
      },

      // ── Impact ───────────────────────────────────────────

      {
        id: 'impact',
        label: 'Impact',
        blocks: [
          {
            type: 'section-lede',
            text: 'Operations that previously required hours of manual work, or an engineering ticket and a multi-day wait, can now be executed by the content owner in under fifteen minutes.',
          },
          {
            type: 'paragraph',
            text: 'This isn\'t an estimate — it follows from how the tool works. Any operation Contentfill supports is faster than the manual alternative by construction.',
          },
          {
            type: 'paragraph',
            text: 'A colleague needed to create and update hundreds of entries. Before Contentfill, there was no tool for this. They spent hours working through Contentful\'s native editor. With Contentfill, the same class of operation runs in a single session.',
          },
          {
            type: 'metrics-grid',
            items: [
              {
                metric: '~15 min',
                whatItIs: 'Time to execute a bulk operation that previously took hours',
                whyItMatters: 'Structural estimate — follows from the tool\'s design',
              },
              {
                metric: 'hundreds',
                whatItIs: 'Largest single operation run to date',
                whyItMatters: 'Single session, no engineering involvement',
              },
              {
                metric: '1 sentence',
                whatItIs: 'Direction needed for a new user to complete their first Excel-template operation',
                whyItMatters: 'Observed',
              },
            ],
          },
          {
            type: 'paragraph',
            text: 'Contentfill is now the default path for bulk content operations on the team.',
          },
          {
            type: 'link-button',
            href: 'https://github.com/smurmus-bighealth/contentfill#start-here',
            label: 'View on GitHub →',
          },
        ],
      },

      // ── What I'd Do Differently ───────────────────────────

      {
        id: 'reflection',
        label: 'What I\'d Do Differently',
        blocks: [
          {
            type: 'paragraph',
            text: 'The transform system is extensible, but only by engineers. Adding a new transform type means copying a TypeScript template file, writing the transformation logic, and deploying. Non-technical users can describe what they want through the AI Agent — but they can\'t save a reusable transform, name it, or have it appear in the transform menu for future operations.',
          },
          {
            type: 'paragraph',
            text: 'The missing design is a UI-driven transform builder: a way for a content admin to define a repeatable operation, give it a name, and have it available the next time they need it. The AI Agent gets close — a user can describe the same transformation twice and get the same result — but it\'s not the same as a saved, shareable, named transform. Engineering involvement is still required to extend the system in any durable way.',
          },
          {
            type: 'paragraph',
            text: 'That\'s the design I\'d build next. The tool currently gives non-technical users the ability to execute operations; it doesn\'t yet give them the ability to extend them. Those are different levels of ownership over the same system, and the second one is worth building.',
          },
          {
            type: 'media-placeholder',
            label: 'OPTIONAL: low-fidelity wireframe of the planned transform builder UI. Only include if you have one — the prose is sufficient without it.',
          },
        ],
      },

      // ── TL;DR ─────────────────────────────────────────────

      {
        id: 'tldr',
        label: 'TL;DR',
        blocks: [
          {
            type: 'section-lede',
            text: 'A GUI for bulk Contentful operations that non-technical users could run themselves — safely, without engineering mediation, without skipping the preview step.',
          },
          {
            type: 'paragraph',
            text: 'The core insight: the people who own content patterns shouldn\'t need an engineer to execute them. The core constraint: bulk CMS operations are irreversible, and the tool has to be designed around that fact from the first screen.',
          },
          {
            type: 'metrics-grid',
            items: [
              {
                metric: '~15 min',
                whatItIs: 'Time to execute a bulk operation that previously took hours',
                whyItMatters: 'Structural estimate',
              },
              {
                metric: '1 sentence',
                whatItIs: 'Direction needed for a new user to complete their first Excel-template operation',
                whyItMatters: 'Observed',
              },
            ],
          },
          {
            type: 'link-button',
            href: 'https://github.com/smurmus-bighealth/contentfill#start-here',
            label: 'View on GitHub →',
          },
        ],
      },

    ],
    blocks: [],
  },

  // ──────────────────────────────────────────────────────

  {
    id: 'design-systems',
    title: 'Design Systems',
    subtitle: 'Two systems. Four decisions. What I\'ve learned about where design and engineering thinking conflict.',
    hero: {
      imageSrc: '/assets/design-systems/hajimari-hero.png',
      imageAlt: 'Hajimari Design System — overview of components, tokens, and documentation',
      accentColor: '#2E6E55',
      title: 'Design Systems',
      subhead: 'Where design and engineering thinking conflict — and what it takes to resolve that conflict in the system itself.',
      skipToId: 'impact',
      rotation: 1.2,
    },
    meta: {
      role: 'Lead UX Engineer / Senior Product Engineer',
      timeline: 'Hearth 2021–2022 · Big Health 2024–present', // TODO: confirm exact dates
      tools: 'React, TypeScript, Tamagui, Storybook, Figma',
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
    lede: 'I\'ve built two design systems from scratch. One in a company where the design and engineering teams had outgrown their informal agreements; the other currently in progress, at a company still establishing its design language while shipping against it.\n\nWhat I\'ve learned across both isn\'t about components or tokens. It\'s about where design and engineering thinking conflict — and what it takes to resolve that conflict in the system itself, rather than in every individual decision.',
    sections: [

      // ── The Work ─────────────────────────────────────────

      {
        id: 'work',
        label: 'The Work',
        blocks: [
          {
            type: 'split',
            align: 'center',
            left: [
              {
                type: 'image',
                src: '/assets/design-systems/hajimari-storybook-button.png',
                alt: 'Hajimari Storybook — Button component documentation',
                caption: 'Hajimari — Hearth',
              },
            ],
            right: [
              { type: 'subheading', text: 'Hajimari' },
              {
                type: 'paragraph',
                text: 'Design system built from scratch at Hearth, a fintech platform for home improvement financing. Co-authored with the design team as Lead UX Engineer. Shipped as the foundation for Hearth\'s universal app launch.',
              },
            ],
          },
          {
            type: 'split',
            align: 'center',
            left: [
              {
                type: 'image',
                src: '/assets/design-systems/cog-typography.png',
                alt: 'COG Storybook — Typography documentation',
                caption: 'COG — Big Health',
              },
            ],
            right: [
              { type: 'subheading', text: 'COG' },
              {
                type: 'paragraph',
                text: 'Design system in active development at Big Health. Built on Tamagui alongside a systems-minded designer from the ground up — the token architecture and the working relationship were established at the same time.',
              },
            ],
          },
        ],
      },

      // ── Decision 1 ───────────────────────────────────────

      {
        id: 'decision-1',
        label: 'Semantic Tokens',
        blocks: [
          {
            type: 'paragraph',
            text: '`blue500` requires every consumer to hold the mapping in their head. `primary` doesn\'t. The overhead is a one-time conversation about what "primary" means — worth it versus paying the translation cost on every implementation.',
          },
          {
            type: 'screenshot-row',
            items: [
              {
                src: '/assets/design-systems/hajimari-tokens-colors.png',
                alt: 'Hajimari color token palette in Storybook — Primary, Success, Warning, Danger with scale 100–900',
                caption: 'Hajimari — Hearth',
              },
              {
                src: '/assets/design-systems/cog-tokens-colors.png',
                alt: 'COG color token palette — Semantic and raw palettes in Storybook',
                caption: 'COG — Big Health',
              },
            ],
          },
          {
            type: 'screenshot-row',
            items: [
              {
                src: '/assets/design-systems/hajimari-typography-old.png',
                alt: 'Original Hajimari typography — separate mobile and web scales with many divergent sizes',
                caption: 'Before — two separate scales',
              },
              {
                src: '/assets/design-systems/hajimari-typography.png',
                alt: 'Revised Hajimari typography — 5 size tiers with Regular, Medium, and Semibold weight variants',
                caption: 'After — constrained tiers, weight variants',
              },
            ],
          },
          {
            type: 'paragraph',
            text: 'The slippage was never intentional — a `17px` padding in a Figma spec that wasn\'t linked to a token, an engineer who implemented exactly what the file said.',
          },
        ],
      },

      // ── Decision 2 ───────────────────────────────────────

      {
        id: 'decision-2',
        label: 'Opinionated API',
        blocks: [
          {
            type: 'image',
            src: '/assets/design-systems/hajimari-button-states.gif',
            alt: 'Hajimari button component — animated states including hover, press, and disabled',
          },
          {
            type: 'paragraph',
            text: 'My default was an engineer\'s instinct: flexible API, let the caller decide. Anastasia reframed it.',
          },
          {
            type: 'callout',
            text: '"If a button isn\'t meant to communicate a warning, should we be using a warning button there?"',
          },
          {
            type: 'paragraph',
            text: 'Flexible means the wrong option compiles as easily as the right one. Opinionated means the type system catches it before review does.',
          },
          {
            type: 'code',
            language: 'typescript',
            text: `type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'filled'
  | 'text';

interface ButtonProps {
  variant: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}`,
          },
          {
            type: 'screenshot-row',
            items: [
              {
                src: '/assets/design-systems/hajimari-storybook-button.png',
                alt: 'Hajimari Storybook — Button documentation with variants, states, and usage guidelines',
                caption: 'Hajimari — Hearth',
              },
              {
                src: '',
                alt: 'COG button or CTA component documentation',
                caption: 'COG — Big Health',
              },
            ],
          },
        ],
      },

      // ── Decision 3 ───────────────────────────────────────

      {
        id: 'decision-3',
        label: 'Designing the Collaboration',
        blocks: [
          {
            type: 'paragraph',
            text: 'At Hearth, my designer worked intuitively — good output, approximate specs. Code review meant deciding when `padding: 13` was intentional versus a Figma artefact, then correcting toward the token when it wasn\'t.',
          },
          {
            type: 'paragraph',
            text: 'At COG, that conversation moved earlier. Defining the color tokens meant working through what "primary" and "secondary" meant in context — I explained the scale mechanics, she shaped the semantics.',
          },
          {
            type: 'collab-diagram',
          },
          {
            type: 'screenshot-row',
            items: [
              {
                src: '/assets/design-systems/hajimari-storybook-textinput.png',
                alt: 'Hajimari Storybook — Text Input component documentation showing Tamagui integration',
                caption: 'Hajimari — Hearth',
              },
              {
                src: '/assets/design-systems/cog-typography.png',
                alt: 'COG Storybook — TimeTextInput component documentation',
                caption: 'COG — Big Health',
              },
            ],
          },
        ],
      },

      // ── Decision 4 ───────────────────────────────────────

      {
        id: 'decision-4',
        label: 'The System Lives in the Gaps',
        blocks: [
          {
            type: 'paragraph',
            text: 'At Hearth: catching spec drift in review — `padding: 13` where the token was 12, and deciding whether to correct or flag.',
          },
          {
            type: 'paragraph',
            text: 'At COG: the specs are tighter, so the gap is different. Form screens were designed for the happy path. Disabled states, loading states, the difference between "submitting" and "error" — none of that was specced. I knew what it should look like because I knew what the API returned. I\'d implement and surface it in review.',
          },
        ],
      },

      // ── Where This Lands ─────────────────────────────────

      {
        id: 'impact',
        label: 'Where This Lands',
        blocks: [
          {
            type: 'paragraph',
            text: 'A single token layer resolving correctly across React and React Native. What ships looks like it belongs to the same product. That\'s true of Hajimari at launch and what COG is being built toward.',
          },
          {
            type: 'link-button',
            href: 'https://storybook-bighealth.vercel.app',
            label: 'View COG Storybook →',
          },
        ],
      },

    ],
    blocks: [],
  },
]

export default caseStudies
