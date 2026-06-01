import { useLayoutEffect, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ScrollToTopFAB from '../components/ScrollToTopFAB/ScrollToTopFAB'
import Lightbox from '../components/Lightbox/Lightbox'
import styles from './About.module.css'

function BackButton() {
  const navigate = useNavigate()
  return (
    <button
      className={styles.fixedBack}
      onClick={() => navigate(-1)}
      aria-label="back to main board"
    >
      ← back
    </button>
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
    </div>
  )
}

// ── Gallery wall helpers ──────────────────────────────────

type ZoomFn = (src: string, alt: string) => void

type FrameProps = {
  rot: string
  shape?: 'rect' | 'circle' | 'oval' | 'square'
  flex?: number
  children: React.ReactNode
  caption: string
  zoomSrc?: string
  zoomAlt?: string
  onZoom?: ZoomFn
}

function GalleryFrame({ rot, shape = 'rect', flex = 1, children, caption, zoomSrc, zoomAlt, onZoom }: FrameProps) {
  const matClass = [
    styles.galleryMat,
    shape === 'circle' ? styles.matCircle : '',
    shape === 'oval' ? styles.matOval : '',
    shape === 'square' ? styles.matSquare : '',
    zoomSrc ? styles.matZoom : '',
  ].filter(Boolean).join(' ')

  const handleClick = () => { if (zoomSrc && zoomAlt && onZoom) onZoom(zoomSrc, zoomAlt) }
  const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } }

  return (
    <figure className={`${styles.galleryFigure} ${rot}`} style={{ flex }}>
      <div
        className={matClass}
        onClick={zoomSrc ? handleClick : undefined}
        onKeyDown={zoomSrc ? handleKey : undefined}
        role={zoomSrc ? 'button' : undefined}
        tabIndex={zoomSrc ? 0 : undefined}
        aria-label={zoomSrc ? `Zoom: ${zoomAlt}` : undefined}
      >
        {children}
      </div>
      <figcaption className={styles.galleryCaption}>{caption}</figcaption>
    </figure>
  )
}

// ── Page ─────────────────────────────────────────────────

export default function About() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const openZoom: ZoomFn = useCallback((src, alt) => setLightbox({ src, alt }), [])

  useLayoutEffect(() => {
    const body = document.body
    const root = document.getElementById('root')
    body.style.overflow = 'auto'
    body.style.height = 'auto'
    if (root) { root.style.height = 'auto'; root.style.minHeight = '100vh' }
    return () => {
      body.style.overflow = ''
      body.style.height = ''
      if (root) { root.style.height = ''; root.style.minHeight = '' }
    }
  }, [])

  // Body overflow is hidden by default (board page); hash scroll fires before
  // React renders so the browser can't scroll. Do it manually after mount.
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <main className={styles.page}>
      <BackButton />

      <div className={styles.inner}>
        {/* ── Header ───────────────────────────────────────── */}
        <header className={styles.header}>
          <div className={styles.headerText}>
            <p className={styles.greeting}>hi, i'm</p>
            <h1 className={styles.name}>Sondhayni Murmu</h1>
            <p className={styles.tagline}>
              Lover of puns, puzzles, pockets, and pegboards.
            </p>
            <div className={styles.headerLinks}>
              <a href="mailto:sondhayni@gmail.com" className={styles.headerLinkItem}>sondhayni[at]gmail.com</a>
              <a href="https://github.com/smurmus" className={styles.headerLinkItem} target="_blank" rel="noopener noreferrer">github →</a>
              <a href="https://linkedin.com/in/sondhayni" className={styles.headerLinkItem} target="_blank" rel="noopener noreferrer">linkedin →</a>
              <a href="/work" className={styles.headerLinkItem}>work history →</a>
            </div>
          </div>
          <Portrait />
        </header>

        <div className={styles.divider} />

        {/* ── Bio ──────────────────────────────────────────── */}
        <section className={styles.section} aria-labelledby="bio-heading">
          <h2 className={styles.sectionHeading} id="bio-heading">the long version</h2>

          <p className={styles.paragraph}>
            I grew up in New Jersey, though I like to joke that I was always a west coast girl — which became true after university in LA and then moving up to the Bay Area for work, where I've stayed (and haven't really looked back, except to visit). Somewhere in there I also apparently decided I love travel: Japan, Spain, Portugal, France, Mexico, Amsterdam.
          </p>

          <p className={styles.paragraph}>
            I've been a tinkerer as long as I can remember — taking things apart to see how they worked, poking at whatever I didn't understand. I also always had an artistic streak, which combined with the need-to-make impulse meant a lot of comics and stories I genuinely hope are lost to the annals of time and a few spring cleanings. Software ended up being the place where both of those things could live: something to take apart, and something to make things with.
          </p>

          <p className={styles.paragraph}>
            Right now I'm a senior software engineer at Big Health, mostly focused on patient-facing product work. I also recently got back into dancing after a long hiatus — I'm a trained Indian classical dancer, and it turns out I'd forgotten how quickly I pick up choreography, which means I actually get to spend most of class working on craft and technique. It works a completely different part of the brain, but scratches the same itch.
          </p>
        </section>

        <div className={styles.divider} />

        {/* ── Beyond work ──────────────────────────────────── */}
        <section className={styles.section} aria-labelledby="beyond-heading">
          <h2 className={styles.sectionHeading} id="beyond-heading">beyond work</h2>

          <p className={styles.paragraph}>
            What I love most is <em>learning things</em> — especially when that means <em>making things</em>. On any given day I might be sewing, drawing, painting, sculpting, doing papercraft, or writing code (or vibe-coding, as the kids say now). I play video games, I'm usually reading two to four books at once (at least one fiction, one non-fiction), and I climb...sometimes.
          </p>

          <p className={styles.paragraph}>
            I'm also a big fan of <em>snail mail</em>, especially sending postcards from my travels. In a largely online and digital world, opening physical mail (that isn't an ad or bills) brings a special kind of joy, I think.
            Hot take: postcards should be postmarked from the country you visited, otherwise what's the point?!
          </p>

          {/* ── Gallery wall — row-based so no column height gaps ── */}
          <div className={styles.galleryWall}>

            {/* Row 1: two tall portraits flanking a shorter landscape video */}
            <div className={styles.gwRow}>
              <GalleryFrame flex={9} rot={styles.rotA}
                caption="jinx cosplay from arcane — turns out body paint turns you into king midas, but for color"
                zoomSrc="/assets/polaroids/cos-jinx.jpg" zoomAlt="Jinx from Arcane cosplay" onZoom={openZoom}
              >
                <img src="/assets/polaroids/cos-jinx.jpg" alt="" className={`${styles.gwMedia} ${styles.gwPortrait}`} />
              </GalleryFrame>

              <GalleryFrame flex={14} rot={styles.rotB} caption="playtime is all the time">
                <video src="/assets/about/poppy-tibbers-playing.webm" className={`${styles.gwMedia} ${styles.gwLandscape}`} autoPlay loop muted playsInline />
              </GalleryFrame>

              <GalleryFrame flex={12} rot={styles.rotF}
                caption="jinx's minigun — all from scratch! next time we try fishbones."
                zoomSrc="/assets/about/jinx-minigun.jpg" zoomAlt="Handmade Jinx minigun prop" onZoom={openZoom}
              >
                <img src="/assets/about/jinx-minigun.jpg" alt="" className={`${styles.gwMedia} ${styles.gwLandscape}`} />
              </GalleryFrame>
            </div>

            {/* Row 2: circle + landscape + oval */}
            <div className={`${styles.gwRow} ${styles.gwRowTop}`}>
              <GalleryFrame flex={10} rot={styles.rotC} shape="circle" caption="tibbers & poppy"
                zoomSrc="/assets/about/poppy-tibbers.jpg" zoomAlt="Poppy and Tibbers on their window hammock" onZoom={openZoom}
              >
                <img src="/assets/about/poppy-tibbers.jpg" alt="" className={`${styles.gwMedia} ${styles.gwCircle}`} />
              </GalleryFrame>

              <GalleryFrame flex={13} rot={styles.rotD} caption="sewing hyperfocus mode. ignore my weird hand positioning."
                zoomSrc="/assets/about/hyperfocus-sewing.jpg" zoomAlt="Sewing project in progress" onZoom={openZoom}
              >
                <img src="/assets/about/hyperfocus-sewing.jpg" alt="" className={`${styles.gwMedia} ${styles.gwLandscape}`} />
              </GalleryFrame>

              <GalleryFrame flex={7} rot={styles.rotG} shape="oval" caption="hand-lettered card for a friend's wedding"
                zoomSrc="/assets/about/congrats-card.jpg" zoomAlt="Handmade congrats card" onZoom={openZoom}
              >
                <img src="/assets/about/congrats-card.jpg" alt="" className={`${styles.gwMedia} ${styles.gwOval}`} />
              </GalleryFrame>
            </div>

            {/* Row 3: square card + landscape video + postcard photo */}
            <div className={styles.gwRow}>
              <GalleryFrame flex={10} rot={styles.rotE} shape="square" caption="digitally designed & printed holiday card"
                zoomSrc="/assets/about/custom-card.jpg" zoomAlt="Handmade holiday card" onZoom={openZoom}
              >
                <img src="/assets/about/custom-card.jpg" alt="" className={`${styles.gwMedia} ${styles.gwSquare}`} />
              </GalleryFrame>

              <GalleryFrame flex={14} rot={styles.rotH} caption="pinning a pattern. (Why don't they warn you how much of sewing is NOT sewing?)">
                <video src="/assets/about/pattern-pinning.webm" className={`${styles.gwMedia} ${styles.gwLandscape}`} autoPlay loop muted playsInline />
              </GalleryFrame>

              <GalleryFrame flex={11} rot={styles.rotB}
                caption="postcards i sent home from tokyo — one per neighborhood"
                zoomSrc="/assets/about/tokyo-postcards.jpg" zoomAlt="Japanese postcards with Nippon stamps, written in Tokyo" onZoom={openZoom}
              >
                <img src="/assets/about/tokyo-postcards.jpg" alt="" className={`${styles.gwMedia} ${styles.gwLandscape}`} />
              </GalleryFrame>
            </div>

            {/* Pegboard — full width */}
            <GalleryFrame flex={1} rot={styles.rotI}
              caption="I fill up and wipe my pegboard clean at the start of each year. This is 2026."
              zoomSrc="/assets/about/pegboard-2026.jpg" zoomAlt="Sondhayni's pegboard — 2026" onZoom={openZoom}
            >
              <img src="/assets/about/pegboard-2026.jpg" alt="" className={`${styles.gwMedia} ${styles.gwWide}`} />
            </GalleryFrame>
          </div>

          {lightbox && (
            <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
          )}
        </section>

        <div className={styles.divider} />

        {/* ── Smurmus lore ─────────────────────────────────── */}
        <section className={styles.section} aria-labelledby="smurmus-heading">
          <h2 className={styles.sectionHeading} id="smurmus-heading">what's a smurmus?</h2>

          <p className={styles.paragraph}>
            Common names come with common problems: bad SEO, impossible to google, two dozen LinkedIn profiles to sort through. I have altogether opposite problems and what I can only describe as a monopoly on my own name online. (I still have to spell it out on the phone. You can't have everything.)
          </p>

          <p className={styles.paragraph}>
            So when it came time to pick a username, I had some freedom. I landed on <em>smurmus</em> — initially because I thought it was a palindrome (it's not), but mostly because it's genuinely fun to say. Try it. Smurmus. See?
          </p>

          <p className={styles.paragraph}>
            It also happens to parse nicely as <em>s. murmu</em> — first initial, last name — which means this URL sounds a little like it belongs to me even before you know who I am. It stuck as my GitHub handle, became an office nickname for a handful of coworkers, and at this point it would feel wrong to change it.
          </p>

          <p className={styles.paragraph}>
            <em>(My handle on most social platforms is just sondhayni, which I'm aware is a privilege — having a name that's both unique and easy to claim is not something everyone gets to take for granted.)</em>
          </p>
        </section>

      </div>

      <ScrollToTopFAB />
    </main>
  )
}
