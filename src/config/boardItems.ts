export type PolaroidData = {
  id: string
  imageSrc: string
  imageAlt: string
  caption: string
  href: string
  isExternal: boolean
  rotation: number
}

export type WashiLabelData = {
  label: string
  color: string
  patternId: string
  textColor?: string // defaults to white
}

export type BoardItem = {
  id: string
  type:
    | 'hero'
    | 'project-stack'
    | 'decorative-stack'
    | 'sticky'
    | 'sticker'
    | 'washi-label'
    | 'badge'
    | 'about-note'
    | 'contact-card'
  x: number       // px offset from board center
  y: number       // px offset from board center
  rotation: number // resting rotation in degrees
  zIndex: number
  data: Record<string, unknown>
}

const boardItems: BoardItem[] = [

  // ── HERO ZONE ──────────────────────────────────────────

  {
    id: 'hero',
    type: 'hero',
    x: 0, y: 0, rotation: -1, zIndex: 10,
    data: {
      name: 'hi! sondhayni here 👋🏽',
      tagline: 'compulsive maker, pulling at the seam between design and engineering.',
      // TODO: finalize tagline
    },
  },

  {
    id: 'badge',
    type: 'badge',
    x: -180, y: -60, rotation: -8, zIndex: 8,
    data: {
      company: 'BigHealth',
      name: 'Sondhayni Murmu',
      title: 'Senior Software Engineer',
      imageSrc: '/assets/artifacts/badge-placeholder.png',
      // lanyard renders as a short SVG curved line hanging from the bottom of the badge
    },
  },

  {
    id: 'sticker-cherrypick',
    type: 'sticker',
    x: 200, y: -80, rotation: 8, zIndex: 9,
    data: {
      imageSrc: '/assets/stickers/cherrypick-placeholder.png',
      alt: 'i git cherry-pick you sticker',
      size: 80,
      // TODO: replace with Procreate export
    },
  },

  {
    id: 'sticker-sewing',
    type: 'sticker',
    x: 240, y: 60, rotation: -4, zIndex: 7,
    data: {
      imageSrc: '/assets/stickers/sewing-placeholder.png',
      alt: 'sewing machine sticker',
      size: 60,
      // TODO: replace with Procreate export
    },
  },

  // ── PROJECT ZONE ───────────────────────────────────────

  {
    id: 'washi-design-systems',
    type: 'washi-label',
    x: -480, y: 220, rotation: -1, zIndex: 6,
    data: {
      label: 'project: design systems',
      color: 'var(--washi-design-systems)',
      patternId: 'crosses',
    } satisfies WashiLabelData,
  },

  {
    id: 'stack-design-systems',
    type: 'project-stack',
    x: -460, y: 280, rotation: -2, zIndex: 6,
    data: {
      polaroids: [
        {
          id: 'ds-case-study',
          imageSrc: '/assets/polaroids/ds-casestudy.png',
          imageAlt: 'Design systems case study preview',
          caption: 'case study →',
          href: '/case-study/design-systems',
          isExternal: false,
          rotation: -4,
        },
        {
          id: 'ds-kit',
          imageSrc: '/assets/polaroids/ds-kit.png',
          imageAlt: 'Design systems component kit',
          caption: 'the kit →',
          href: '/case-study/design-systems#kit',
          isExternal: false,
          rotation: 3,
        },
      ] as PolaroidData[],
    },
  },

  {
    id: 'washi-contentfill',
    type: 'washi-label',
    x: -60, y: 220, rotation: 1, zIndex: 6,
    data: {
      label: 'project: contentfill',
      color: 'var(--washi-contentfill)',
      patternId: 'stripes',
    } satisfies WashiLabelData,
  },

  {
    id: 'stack-contentfill',
    type: 'project-stack',
    x: -40, y: 280, rotation: 2, zIndex: 6,
    data: {
      polaroids: [
        {
          id: 'cf-case-study',
          imageSrc: '/assets/polaroids/cf-casestudy.png',
          imageAlt: 'Contentfill case study preview',
          caption: 'case study →',
          href: '/case-study/contentfill',
          isExternal: false,
          rotation: -3,
        },
        {
          id: 'cf-github',
          imageSrc: '/assets/polaroids/cf-github.png',
          imageAlt: 'Contentfill GitHub repository',
          caption: 'github →',
          href: 'https://github.com/sondhayni/contentfill',
          isExternal: true,
          rotation: 4,
        },
      ] as PolaroidData[],
    },
  },

  {
    id: 'washi-discord',
    type: 'washi-label',
    x: 380, y: 220, rotation: -1, zIndex: 6,
    data: {
      label: 'project: discord',
      color: 'var(--washi-discord)',
      patternId: 'dots',
    } satisfies WashiLabelData,
  },

  {
    id: 'stack-discord',
    type: 'project-stack',
    x: 400, y: 280, rotation: -3, zIndex: 6,
    data: {
      polaroids: [
        {
          id: 'dc-case-study',
          imageSrc: '/assets/polaroids/dc-casestudy.png',
          imageAlt: 'Discord case study preview',
          caption: 'case study →',
          href: '/case-study/discord',
          isExternal: false,
          rotation: -5,
        },
        {
          id: 'dc-kit',
          imageSrc: '/assets/polaroids/dc-kit.png',
          imageAlt: 'Discord community UI kit on Figma',
          caption: 'UI kit →',
          href: 'https://figma.com/community/[YOUR-KIT-URL]',
          isExternal: true,
          rotation: 4,
        },
      ] as PolaroidData[],
    },
  },

  // ── LEFT FRINGE ────────────────────────────────────────

  {
    id: 'stack-postcards',
    type: 'decorative-stack',
    x: -780, y: -80, rotation: 3, zIndex: 4,
    data: {
      polaroids: [
        {
          id: 'pc-tokyo',
          imageSrc: '/assets/artifacts/postcard-tokyo.png',
          imageAlt: 'Tokyo postcard',
          caption: '', href: '', isExternal: false, rotation: -8,
        },
        {
          id: 'pc-portugal',
          imageSrc: '/assets/artifacts/postcard-portugal.png',
          imageAlt: 'Portugal postcard',
          caption: '', href: '', isExternal: false, rotation: 5,
        },
        {
          id: 'pc-providence',
          imageSrc: '/assets/artifacts/postcard-providence.png',
          imageAlt: 'Providence postcard',
          caption: '', href: '', isExternal: false, rotation: -3,
        },
        {
          id: 'pc-amsterdam',
          imageSrc: '/assets/artifacts/postcard-amsterdam.png',
          imageAlt: 'Amsterdam postcard',
          caption: '', href: '', isExternal: false, rotation: 6,
        },
      ] as PolaroidData[],
    },
  },

  {
    id: 'about-note',
    type: 'about-note',
    x: -740, y: 160, rotation: -3, zIndex: 5,
    data: {
      text: 'about me →',
      href: '/about',
      color: '#FDF0D5',
    },
  },

  // ── RIGHT FRINGE ───────────────────────────────────────

  {
    id: 'sticker-avatar',
    type: 'sticker',
    x: 720, y: -120, rotation: 4, zIndex: 5,
    data: {
      imageSrc: '/assets/stickers/avatar-placeholder.png',
      alt: 'Sondhayni avatar illustration',
      size: 120,
      // TODO: replace with Procreate illustration export
    },
  },

  {
    id: 'washi-cosplay',
    type: 'washi-label',
    x: 700, y: 100, rotation: 2, zIndex: 5,
    data: {
      label: 'crafts & cosplay',
      color: 'var(--washi-cosplay)',
      patternId: 'diamonds',
    } satisfies WashiLabelData,
  },

  {
    id: 'stack-cosplay',
    type: 'decorative-stack',
    x: 720, y: 160, rotation: 3, zIndex: 5,
    data: {
      polaroids: [
        {
          id: 'cos-katara',
          imageSrc: '/assets/polaroids/cos-katara.png',
          imageAlt: 'Katara cosplay',
          caption: 'katara',
          href: '', isExternal: false, rotation: -4,
        },
        {
          id: 'cos-jinx',
          imageSrc: '/assets/polaroids/cos-jinx.png',
          imageAlt: 'Jinx from Arcane cosplay',
          caption: 'jinx from arcane',
          href: '', isExternal: false, rotation: 5,
        },
      ] as PolaroidData[],
    },
  },

  {
    id: 'sticky-currently',
    type: 'sticky',
    x: 780, y: 320, rotation: -2, zIndex: 5,
    data: {
      label: 'currently:',
      lines: [
        'applying to DAP',
        'making things',
        'drinking too much coffee',
      ],
      // TODO: update this periodically
      color: 'var(--color-accent-yellow)',
    },
  },

  // ── UTILITY ROW ────────────────────────────────────────

  {
    id: 'contact-card',
    type: 'contact-card',
    x: -60, y: 560, rotation: -1, zIndex: 4,
    data: {
      name: 'Sondhayni Murmu',
      email: 'hello@sondhayni.me', // TODO: confirm email
      links: [
        { label: 'github',   href: 'https://github.com/sondhayni' },
        { label: 'linkedin', href: 'https://linkedin.com/in/sondhayni' },
      ],
    },
  },

  {
    id: 'resume-link',
    type: 'sticky',
    x: 220, y: 570, rotation: 2, zIndex: 4,
    data: {
      text: 'resume.pdf',
      href: '/assets/resume.pdf',
      color: '#FDF0D5',
      // TODO: add actual resume PDF to public/assets/
    },
  },
]

export default boardItems
