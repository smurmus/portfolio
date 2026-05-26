import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import caseStudies from '../config/caseStudies'
import type { ContentBlock } from '../types/content'
import styles from './CaseStudy.module.css'

/* BLOCK TYPES: add new types to src/types/content.ts
   and add a corresponding case to the renderer below.
   Case study prompts may extend this. */

// ── Image carousel ───────────────────────────────────────

type CarouselImage = { src: string; alt: string; rotation: number }

function Carousel({ images }: { images: CarouselImage[] }) {
  const [frontIndex, setFrontIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const cycle = useCallback(() => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setFrontIndex(i => (i + 1) % images.length)
      setAnimating(false)
    }, 150)
  }, [animating, images.length])

  return (
    <div className={styles.carousel} aria-label="project images">
      {images.map((img, i) => {
        const isFront = i === frontIndex
        const depth = ((i - frontIndex + images.length) % images.length)
        const baseRotation = img.rotation
        const offsetX = depth * 8
        const offsetY = depth * 6

        return (
          <div
            key={i}
            className={styles.carouselCard}
            style={{
              zIndex: images.length - depth,
              transform: `translateX(${offsetX}px) translateY(${offsetY}px) rotate(${baseRotation}deg) scale(${animating && isFront ? 0.95 : 1})`,
              boxShadow: isFront
                ? '0 4px 24px rgba(0,0,0,0.12)'
                : '0 2px 8px rgba(0,0,0,0.08)',
            }}
            onClick={isFront ? cycle : undefined}
            role={isFront ? 'button' : undefined}
            tabIndex={isFront ? 0 : undefined}
            aria-label={isFront ? `${img.alt} — click to see next` : undefined}
            onKeyDown={isFront ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cycle() }
            } : undefined}
          >
            {img.src ? (
              <img
                src={img.src}
                alt={img.alt}
                className={styles.carouselImage}
                loading="lazy"
                width={700}
                height={394}
              />
            ) : (
              <div className={styles.carouselPlaceholder}>
                <span className={styles.carouselPlaceholderLabel}>
                  {/* TODO: replace with real case study screenshot */}
                  {img.alt}
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Content block renderer ───────────────────────────────

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case 'paragraph':
      return <p key={i} className={styles.paragraph}>{block.text}</p>

    case 'heading':
      return <h2 key={i} className={styles.heading}>{block.text}</h2>

    case 'callout':
      return <blockquote key={i} className={styles.callout}>{block.text}</blockquote>

    case 'image':
      return (
        <figure key={i} style={{ margin: '0 0 1.5rem' }}>
          {block.src ? (
            <img
              src={block.src}
              alt={block.caption ?? ''}
              className={styles.blockImage}
              loading="lazy"
            />
          ) : (
            <div
              className={styles.blockImage}
              style={{
                background: '#D4D0C8',
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span className={styles.imageCaption}>
                {/* TODO: add image */}
                {block.caption}
              </span>
            </div>
          )}
          {block.caption && (
            <figcaption className={styles.imageCaption}>{block.caption}</figcaption>
          )}
        </figure>
      )

    default:
      return null
  }
}

// ── Page ─────────────────────────────────────────────────

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const study = caseStudies.find(s => s.id === id)

  // Add scroll class to body so board's overflow:hidden doesn't block scroll
  useEffect(() => {
    document.body.classList.add('page-case-study')
    return () => document.body.classList.remove('page-case-study')
  }, [])

  function handleBack() {
    navigate(-1)
  }

  if (!study) {
    return (
      <div className={styles.loading}>
        case study not found.
      </div>
    )
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>

        <nav className={styles.backNav}>
          <button className={styles.backLink} onClick={handleBack} aria-label="back to main board">
            ← back to main board
          </button>
        </nav>

        <h1 className={styles.title}>{study.title}</h1>
        <p className={styles.subtitle}>{study.subtitle}</p>

        <Carousel images={study.images} />

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <div className={styles.metaLabel}>Role</div>
            <div className={styles.metaValue}>{study.meta.role}</div>
          </div>
          <div className={styles.metaItem}>
            <div className={styles.metaLabel}>Timeline</div>
            <div className={styles.metaValue}>{study.meta.timeline}</div>
          </div>
          <div className={styles.metaItem}>
            <div className={styles.metaLabel}>Tools</div>
            <div className={styles.metaValue}>{study.meta.tools}</div>
          </div>
        </div>

        <div className={styles.body}>
          {study.blocks.map((block, i) => renderBlock(block, i))}
        </div>

      </div>
    </main>
  )
}
