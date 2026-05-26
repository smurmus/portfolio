/* BLOCK TYPES: add new types to src/types/content.ts
   and add a corresponding case to the renderer in CaseStudy.tsx.
   Case study prompts may extend this. */

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'callout'; text: string }
