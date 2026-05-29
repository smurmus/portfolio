import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './About.module.css'

function BackButton() {
  const navigate = useNavigate()
  return (
    <nav className={styles.backNav}>
      <button
        className={styles.backLink}
        onClick={() => navigate(-1)}
        aria-label="back to main board"
      >
        ← back
      </button>
    </nav>
  )
}

function Portrait() {
  return (
    <div className={styles.portrait}>
      {/* Drop photo at /public/assets/about/portrait.jpg to activate */}
      <img
        src="/assets/about/portrait.jpg"
        alt="Sondhayni"
        className={styles.portraitImg}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
      <span className={styles.portraitPlaceholder}>photo</span>
    </div>
  )
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className={styles.imgPlaceholder} aria-hidden="true">
      <span className={styles.imgPlaceholderLabel}>{label}</span>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────

export default function About() {
  useLayoutEffect(() => {
    const body = document.body
    const root = document.getElementById('root')
    body.style.overflow = 'auto'
    body.style.height   = 'auto'
    if (root) { root.style.height = 'auto'; root.style.minHeight = '100vh' }
    return () => {
      body.style.overflow = ''
      body.style.height   = ''
      if (root) { root.style.height = ''; root.style.minHeight = '' }
    }
  }, [])

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <BackButton />

        {/* ── Header ───────────────────────────────────────── */}
        <header className={styles.header}>
          <div className={styles.headerText}>
            <p className={styles.greeting}>hi, i'm</p>
            <h1 className={styles.name}>Sondhayni Murmu</h1>
            <p className={styles.tagline}>
              {/* TODO: finalize tagline — mirrors board hero card */}
              compulsive maker, pulling at the seam between design and engineering.
            </p>
          </div>
          <Portrait />
        </header>

        <div className={styles.divider} />

        {/* ── Bio ──────────────────────────────────────────── */}
        <section className={styles.section} aria-labelledby="bio-heading">
          <h2 className={styles.sectionHeading} id="bio-heading">the long version</h2>

          <p className={styles.paragraph}>
            {/* TODO: write bio — 2–3 sentences on background, where you came from */}
            [Placeholder: brief origin story — where you grew up, how you got into tech, the design+engineering thread that runs through everything.]
          </p>

          <p className={styles.paragraph}>
            {/* TODO: write bio — the making-things angle, what compulsive maker means */}
            [Placeholder: what "compulsive maker" means in practice — the impulse to build the thing rather than just design it, or design it rather than just ship it. The itch that crosses disciplines.]
          </p>

          <p className={styles.paragraph}>
            {/* TODO: write bio — current chapter, BigHealth, what you're focused on */}
            [Placeholder: current chapter — senior software engineer at BigHealth, what that work looks like, what you've been learning or building lately.]
          </p>
        </section>

        {/* ── What I do ────────────────────────────────────── */}
        <section className={styles.section} aria-labelledby="work-heading">
          <h2 className={styles.sectionHeading} id="work-heading">what i do</h2>

          <div className={styles.twoCol}>
            <div className={styles.twoColText}>
              <p className={styles.paragraph}>
                {/* TODO: engineering paragraph — React, TypeScript, component systems, etc. */}
                [Placeholder: the engineering side — languages, frameworks, what kinds of problems you gravitate toward in code.]
              </p>
              <p className={styles.paragraph}>
                {/* TODO: design paragraph — research, Figma, the design work at Discord / BigHealth */}
                [Placeholder: the design side — research, interaction design, the projects where you've worn both hats. Reference Discord Waypoints, design systems work.]
              </p>
              <p className={styles.paragraph}>
                {/* TODO: the intersection paragraph — why you do both, what it gives you */}
                [Placeholder: what living at the intersection actually feels like and why it's the right place to be. Not a resume bullet — a perspective.]
              </p>
            </div>
            <div className={styles.twoColMedia}>
              {/* TODO: replace with a screenshot of work in context — Figma, Storybook, terminal, etc. */}
              <ImagePlaceholder label="screenshot of work — Storybook / Figma / terminal" />
            </div>
          </div>
        </section>

        {/* ── Beyond work ──────────────────────────────────── */}
        <section className={styles.section} aria-labelledby="beyond-heading">
          <h2 className={styles.sectionHeading} id="beyond-heading">beyond work</h2>

          <p className={styles.paragraph}>
            {/* TODO: intro sentence — the "making" that happens outside of a job */}
            [Placeholder: the making that happens outside of a job — how cosplay, sewing, and travel are all the same impulse in different materials.]
          </p>

          <div className={styles.photoGrid}>
            {/* TODO: 3–4 photos — cosplay (Katara, Jinx), something sewing-related, a travel photo */}
            {/* These should feel like polaroid snapshots, not portfolio shots */}
            <figure className={styles.photoGridItem}>
              <ImagePlaceholder label="cosplay photo — Katara\n(/assets/polaroids/cos-katara.png)" />
              <figcaption className={styles.photoCaption}>katara</figcaption>
            </figure>
            <figure className={styles.photoGridItem}>
              <ImagePlaceholder label="cosplay photo — Jinx\n(/assets/polaroids/cos-jinx.png)" />
              <figcaption className={styles.photoCaption}>jinx from arcane</figcaption>
            </figure>
            <figure className={styles.photoGridItem}>
              <ImagePlaceholder label="sewing / craft photo\n(/assets/about/sewing.jpg)" />
              <figcaption className={styles.photoCaption}>{/* TODO: caption */}[caption]</figcaption>
            </figure>
            <figure className={styles.photoGridItem}>
              <ImagePlaceholder label="travel photo\n(/assets/artifacts/postcard-*.png or a real photo)" />
              <figcaption className={styles.photoCaption}>{/* TODO: caption + location */}[location]</figcaption>
            </figure>
          </div>

          <p className={styles.paragraph}>
            {/* TODO: sewing / pockets paragraph — add pockets to everything */}
            [Placeholder: the sewing angle — making clothes, adding pockets where there are none, what that teaches you about fit and function.]
          </p>

          <p className={styles.paragraph}>
            {/* TODO: travel paragraph — Tokyo, Portugal, Providence, Amsterdam */}
            [Placeholder: travel — cities visited, what draws you to new places, how it feeds the work or the making.]
          </p>
        </section>

        {/* ── Currently ────────────────────────────────────── */}
        <section className={styles.section} aria-labelledby="currently-heading">
          <h2 className={styles.sectionHeading} id="currently-heading">currently</h2>
          {/* TODO: update this list periodically — mirrors the sticky note on the board */}
          <ul className={styles.currentList}>
            <li className={styles.currentItem}>☐ add pockets to everything</li>
            <li className={styles.currentItem}>☐ keep goldfish plant alive</li>
            <li className={styles.currentItem}>☐ get more coffee</li>
            {/* TODO: add 2–3 more real items — project in progress, thing you're reading, learning, etc. */}
          </ul>
        </section>

        <div className={styles.divider} />

        {/* ── Get in touch ─────────────────────────────────── */}
        <section className={styles.section} aria-labelledby="contact-heading">
          <h2 className={styles.sectionHeading} id="contact-heading">get in touch</h2>
          <p className={styles.paragraph}>
            {/* TODO: brief contact prompt — what kinds of convos you're up for */}
            [Placeholder: a line about what you're open to — collaboration, opportunities, people who just want to talk about Discord UI patterns or Arcane cosplay.]
          </p>

          <div className={styles.links}>
            <a
              href="mailto:hello@sondhayni.me"
              className={styles.linkItem}
              aria-label="email Sondhayni"
            >
              {/* TODO: confirm email address */}
              hello@sondhayni.me
            </a>
            <a
              href="https://github.com/sondhayni"
              className={styles.linkItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              github →
            </a>
            <a
              href="https://linkedin.com/in/sondhayni"
              className={styles.linkItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin →
            </a>
            <a
              href="/work"
              className={styles.linkItem}
            >
              work history →
            </a>
          </div>
        </section>

      </div>
    </main>
  )
}
