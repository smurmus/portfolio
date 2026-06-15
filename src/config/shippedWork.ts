export type ShippedProject = {
  id: string
  title: string
  description: string
  role: string
  tags: string[]
  imageSrc: string
  links: { label: string; href: string; isExternal: boolean }[]
}

const shippedWork: ShippedProject[] = [
  // Add projects here. Each entry renders a card on /shipped.
  // {
  //   id: 'example',
  //   title: 'Project Name',
  //   description: 'What it does and what you built.',
  //   role: 'engineer',
  //   tags: ['React', 'TypeScript'],
  //   imageSrc: '/assets/shipped/example.png',
  //   links: [
  //     { label: 'github', href: 'https://github.com/...', isExternal: true },
  //     { label: 'live', href: 'https://...', isExternal: true },
  //   ],
  // },
]

export default shippedWork
