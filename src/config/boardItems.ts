export type PolaroidData = {
  id: string
  imageSrc: string
  imageAlt: string
  caption: string
  href: string
  isExternal: boolean
  rotation: number
  imagePosition?: string
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
  | 'decoration'
  | 'social-sticker'
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
    x: 0, y: -150, rotation: -1, zIndex: 10,
    data: {
      name: 'hi! sondhayni here ',
      emoji: '👋🏽',
      tagline: '—an inquisitive maker pulling at the seam between design and engineering.',
    },
  },

  {
    id: 'badge',
    type: 'badge',
    x: -500, y: -160, rotation: -8, zIndex: 8,
    data: {
      company: 'BigHealth',
      name: 'Sondhayni Murmu',
      title: 'Senior Software Engineer\n(Engineering)',
      imageSrc: '/assets/artifacts/bighealth-badge.png',
      pushpinSrc: '/assets/artifacts/pushpin.png',
      href: '/work',
    },
  },

  {
    id: 'about-note',
    type: 'about-note',
    x: -300, y: 0, rotation: -3, zIndex: 5,
    data: {
      text: 'about me →',
      href: '/about',
      color: '#FDF0D5',
    },
  },

  // {
  //   id: 'sticker-cherrypick',
  //   type: 'sticker',
  //   x: 200, y: -80, rotation: 8, zIndex: 9,
  //   data: {
  //     imageSrc: '/assets/stickers/cherrypick-placeholder.png',
  //     alt: 'i git cherry-pick you sticker',
  //     size: 80,
  //     // TODO: replace with Procreate export
  //   },
  // },

  // {
  //   id: 'sticker-sewing',
  //   type: 'sticker',
  //   x: 400, y: -60, rotation: 20, zIndex: 17,
  //   data: {
  //     imageSrc: '/assets/stickers/sewing-thread.png',
  //     alt: 'sewing machine sticker',
  //     size: 150,
  //     // TODO: replace with Procreate export
  //   },
  // },

  // ── PROJECT ZONE ───────────────────────────────────────

  {
    id: 'washi-design-systems',
    type: 'washi-label',
    x: -460, y: 200, rotation: -1, zIndex: 6,
    data: {
      label: 'building design systems',
      color: 'var(--washi-design-systems)',
      patternId: 'crosses',
    } satisfies WashiLabelData,
  },

  {
    id: 'stack-design-systems',
    type: 'project-stack',
    x: -440, y: 300, rotation: -2, zIndex: 6,
    data: {
      fanRadius: 100,
      fanAngle: 15,
      polaroids: [
        // NOTE: everything seems to be gone from here??
        // {
        //   id: 'ds-kit',
        //   imageSrc: '/assets/polaroids/ds-storybook-hearth.png',
        //   imageAlt: 'Storybook preview for Hearth Design System',
        //   caption: 'Storybook (Hearth) →',
        //   href: '/case-study/design-systems#kit',
        //   isExternal: false,
        //   rotation: 3,
        // },
        {
          id: 'ds-kit',
          imageSrc: '/assets/polaroids/COG-design-system.png',
          imageAlt: 'Storybook preview for Big Health Design System',
          caption: 'storybook →',
          href: 'https://storybook-bighealth.vercel.app',
          isExternal: true,
          rotation: 3,
        },
        {
          id: 'ds-case-study',
          imageSrc: '/assets/design-systems/hajimari-hero.png',
          imageAlt: 'Design systems case study preview',
          caption: 'case study →',
          href: '/case-study/design-systems',
          isExternal: false,
          rotation: -4,
          imagePosition: 'bottom right',
        },
      ] as PolaroidData[],
    },
  },

  {
    id: 'washi-contentfill',
    type: 'washi-label',
    x: 20, y: 420, rotation: -5, zIndex: 6,
    data: {
      label: 'project: "contentfill"',
      color: 'var(--washi-contentfill)',
      patternId: 'stripes',
    } satisfies WashiLabelData,
  },

  {
    id: 'stack-contentfill',
    type: 'project-stack',
    x: 40, y: 160, rotation: -4, zIndex: 6,
    data: {
      fanAngle: 20,
      fanRadius: 60,
      fanLift: 40,
      polaroids: [
        {
          id: 'cf-github',
          imageSrc: '/assets/polaroids/cf-github.png',
          imageAlt: 'Contentfill GitHub repository',
          caption: 'github →',
          href: 'https://github.com/smurmus-bighealth/contentfill#start-here',
          isExternal: true,
          rotation: 4,
        },
        {
          id: 'cf-case-study',
          imageSrc: '/assets/polaroids/cf-casestudy.png',
          imageAlt: 'Contentfill case study preview',
          caption: 'case study →',
          href: '/case-study/contentfill',
          isExternal: false,
          rotation: -10,
        },
      ] as PolaroidData[],
    },
  },

  {
    id: 'washi-discord',
    type: 'washi-label',
    x: 460, y: 380, rotation: 5, zIndex: 9,
    data: {
      label: 'project: discord "waypoints"',
      color: 'var(--washi-discord)',
      patternId: 'dots',
    } satisfies WashiLabelData,
  },

  {
    id: 'stack-discord',
    type: 'project-stack',
    x: 550, y: 100, rotation: 10, zIndex: 6,
    data: {
      fanAngle: 30,
      fanRadius: 120,
      fanLift: -10,
      polaroids: [
        {
          id: 'dc-kit',
          imageSrc: '/assets/polaroids/discord-ui-kit-preview.png',
          imageAlt: 'Discord UI Kit Preview',
          caption: 'community UI kit →',
          href: 'https://www.figma.com/community/file/1408017287039851803/discord-ui-kit',
          isExternal: true,
          rotation: 8,
        },
        {
          id: 'dc-case-study',
          imageSrc: '/assets/discord-radar-hero.png',
          imageAlt: 'Discord My Radar — populated feed with Waypoints panel',
          caption: 'case study →',
          href: '/case-study/discord',
          isExternal: false,
          rotation: -6,
        },
        {
          id: 'dc-live-prototype',
          imageSrc: '/assets/discord-waypoint.png',
          imageAlt: 'Discord — Set a Waypoint modal',
          caption: 'prototype →',
          href: '/case-study/discord#prototype',
          isExternal: false,
          rotation: -20,
        },
      ] as PolaroidData[],
    },
  },

  // ── LEFT FRINGE ────────────────────────────────────────

  // {
  //   id: 'stack-postcards',
  //   type: 'decorative-stack',
  //   x: -780, y: -60, rotation: 3, zIndex: 4,
  //   data: {
  //     polaroids: [
  //       {
  //         id: 'pc-tokyo',
  //         imageSrc: '/assets/artifacts/postcard-tokyo.png',
  //         imageAlt: 'Tokyo postcard',
  //         caption: '', href: '', isExternal: false, rotation: -8,
  //       },
  //       {
  //         id: 'pc-portugal',
  //         imageSrc: '/assets/artifacts/postcard-portugal.png',
  //         imageAlt: 'Portugal postcard',
  //         caption: '', href: '', isExternal: false, rotation: 5,
  //       },
  //       {
  //         id: 'pc-providence',
  //         imageSrc: '/assets/artifacts/postcard-providence.png',
  //         imageAlt: 'Providence postcard',
  //         caption: '', href: '', isExternal: false, rotation: -3,
  //       },
  //       {
  //         id: 'pc-amsterdam',
  //         imageSrc: '/assets/artifacts/postcard-amsterdam.png',
  //         imageAlt: 'Amsterdam postcard',
  //         caption: '', href: '', isExternal: false, rotation: 6,
  //       },
  //     ] as PolaroidData[],
  //   },
  // },

  // ── RIGHT FRINGE ───────────────────────────────────────

  {
    id: 'sticker-avatar',
    type: 'sticker',
    x: -300, y: -180, rotation: -3, zIndex: 8,
    data: {
      imageSrc: '/assets/stickers/self-sitting.png',
      alt: 'Sondhayni sitting cross-legged',
      size: 140,
    },
  },

  {
    id: 'sticker-zuko',
    type: 'sticker',
    x: 420, y: -50, rotation: 20, zIndex: 17,
    data: {
      imageSrc: '/assets/stickers/zuko-illustration.png',
      hoverImageSrc: '/assets/stickers/zuko-illustration-2.png',
      alt: 'Zuko illustration',
      size: 80,
    },
  },

  // {
  //   id: 'sticker-goldfish-plant',
  //   type: 'sticker',
  //   x: 50, y: 40, rotation: -15, zIndex: 6,
  //   data: {
  //     imageSrc: '/assets/stickers/goldfish-plant-illustration.png',
  //     alt: 'goldfish plant in a pot',
  //     size: 150,
  //   },
  // },

  {
    id: 'scissor-trail',
    type: 'decoration',
    x: 480, y: -400, rotation: 0, zIndex: 3,
    data: { component: 'ScissorTrail' },
  },

  {
    id: 'washi-cosplay',
    type: 'washi-label',
    x: 1260, y: -680, rotation: 2, zIndex: 5,
    data: {
      label: 'crafts & cosplay',
      color: 'var(--washi-cosplay)',
      patternId: 'diamonds',
    } satisfies WashiLabelData,
  },

  {
    id: 'stack-cosplay',
    type: 'project-stack',
    x: 1300, y: -580, rotation: 3, zIndex: 5,
    data: {
      fanAngle: 10,
      fanRadius: 100,
      fanLift: -20,
      polaroids: [
        {
          id: 'cos-katara',
          imageSrc: '/assets/polaroids/cos-katara.jpg',
          imageAlt: 'Katara cosplay',
          caption: 'katara →',
          href: '/about#beyond-heading', isExternal: false, rotation: -4,
        },
        {
          id: 'cos-jinx',
          imageSrc: '/assets/polaroids/cos-jinx.jpg',
          imageAlt: 'Jinx from Arcane cosplay',
          caption: 'jinx from arcane →',
          href: '/about#beyond-heading', isExternal: false, rotation: -10,
        },
      ] as PolaroidData[],
    },
  },

  {
    id: 'washi-currently',
    type: 'washi-label',
    x: -400, y: -310, rotation: -2, zIndex: 5,
    data: {
      label: 'currently:',
      color: 'var(--washi-currently)',
      patternId: 'stripes',
    } satisfies WashiLabelData,
  },

  {
    id: 'sticky-currently',
    type: 'sticky',
    x: -400, y: -240, rotation: -2, zIndex: 5,
    data: {
      lines: [
        'TODO',
        '☐ add pockets to everything',
        '☐ keep goldfish plant alive',
        '☐ acquire caffeine',
      ],
      // TODO: update this periodically
      color: 'var(--color-accent-yellow)',
    },
  },
  {
    id: 'social-github',
    type: 'social-sticker',
    x: -380, y: 0,
    rotation: -6,
    zIndex: 5,
    data: {
      href: 'https://github.com/sondhayni',
      icon: 'github',
      label: 'GitHub',
      isExternal: true,
      imageSrc: '/assets/stickers/github-logo.svg',
      size: 60,
    },
  },
  {
    id: 'social-linkedin',
    type: 'social-sticker',
    x: -460, y: -10,
    rotation: -16,
    zIndex: 5,
    data: {
      href: 'https://linkedin.com/in/sondhayni',
      icon: 'linkedin',
      label: 'LinkedIn',
      isExternal: true,
      imageSrc: '/assets/stickers/linkedin-logo.svg',
      size: 60,
    },
  },

  // ── UTILITY ROW ────────────────────────────────────────

  // {
  //   id: 'contact-card',
  //   type: 'contact-card',
  //   x: -60, y: 480, rotation: -1, zIndex: 4,
  //   data: {
  //     name: 'Sondhayni Murmu',
  //     email: 'hello@sondhayni.me', // TODO: confirm email
  //     links: [
  //       { label: 'github', href: 'https://github.com/sondhayni' },
  //       { label: 'linkedin', href: 'https://linkedin.com/in/sondhayni' },
  //     ],
  //   },
  // },


  // ── EASTER EGG — cat trail & destination ───────────────
  // No entrance animation: items far enough from center that the
  // 300ms transition completes before any user could pan there.

  {
    id: 'easter-egg-trail',
    type: 'decoration',
    x: 580, y: 300, rotation: 0, zIndex: 2,
    data: {
      component: 'PawprintTrail',
    },
  },

  {
    id: 'easter-egg-cats',
    type: 'sticker',
    x: 2690, y: 1985, rotation: -3, zIndex: 5,
    data: {
      imageSrc: '',
      // TODO: replace with actual photo/illustration of Poppy and Tibbers
      alt: 'poppy & tibbers (photo here)',
      size: 160,
    },
  },

  {
    id: 'easter-egg-label',
    type: 'decoration',
    x: 2690, y: 1985, rotation: 2, zIndex: 5,
    data: {
      component: 'HandwritingLabel',
      text: 'poppy & tibbers',
      fontSize: 13,
      color: 'var(--color-text-secondary)',
    },
  },

  {
    id: 'easter-egg-note',
    type: 'decoration',
    x: 2690, y: 1985, rotation: 6, zIndex: 6,
    data: {
      component: 'MiniStickyNote',
      text: 'you found them.',
      color: 'var(--color-sticky-note)',
    },
  },

]

export default boardItems
