export type MediaItem = {
  id: string
  src: string
  type: 'image' | 'video' | 'gif'
  caption: string
  alt?: string
  wide?: boolean  // spans both columns when true
}

export type ByRequestProject = {
  id: string
  title: string
  description: string
  role: string
  tags: string[]
  items: MediaItem[]
  links?: { label: string; href: string; isExternal: boolean }[]
}

const byRequestWork: ByRequestProject[] = [
  {
    id: 'placeholder-a',
    title: 'Project Name',
    description: 'Brief description of what this was and what you built or contributed to.',
    role: 'engineer',
    tags: ['React', 'TypeScript'],
    items: [
      {
        id: 'pa-1',
        src: '',
        type: 'image',
        caption: 'Caption describing what this shows',
        alt: 'placeholder image',
        wide: true,
      },
      {
        id: 'pa-2',
        src: '',
        type: 'video',
        caption: 'A short demo or walkthrough',
        alt: 'placeholder video',
      },
      {
        id: 'pa-3',
        src: '',
        type: 'image',
        caption: 'Another screenshot or detail',
        alt: 'placeholder image',
      },
    ],
    links: [],
  },
  {
    id: 'placeholder-b',
    title: 'Another Project',
    description: 'Brief description of what this was and what you built or contributed to.',
    role: 'engineer',
    tags: ['React Native'],
    items: [
      {
        id: 'pb-1',
        src: '',
        type: 'gif',
        caption: 'Interaction or animation demo',
        alt: 'placeholder gif',
      },
      {
        id: 'pb-2',
        src: '',
        type: 'image',
        caption: 'Screenshot or design detail',
        alt: 'placeholder image',
      },
    ],
    links: [],
  },
]

export default byRequestWork
