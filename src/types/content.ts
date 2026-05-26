/* BLOCK TYPES: add new types to src/types/content.ts
   and add a corresponding case to the renderer in CaseStudy.tsx.
   Case study prompts may extend this. */

export type AnnotationBeat = {
  label: string
  /** Region coordinates as percentages of the screenshot dimensions */
  region: { left: string; top: string; width: string; height: string }
  card: {
    side: 'left' | 'right'
    bottom: number   // % from bottom of screenshot
    /** Horizontal offset % from the chosen side */
    offset?: number
  }
  isPullQuote?: boolean
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'callout'; text: string }
  | {
      type: 'annotated-screenshot'
      src: string
      alt: string
      beats: AnnotationBeat[]
    }
