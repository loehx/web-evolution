import { useEffect, useState } from 'react'
import {
  FeatureCardSkeleton,
  MarqueeRibbon,
  ParallaxHero,
  SkeletonReveal,
  ViewportSnapDeck,
  ViewportSnapNav,
  ViewportSnapSlide,
  useViewportSnapObserver,
} from '@/components'

const SNAP_SLIDES = [
  { id: 'snap-intro', label: 'Intro slide' },
  { id: 'snap-stack', label: 'Stack slide' },
  { id: 'snap-outro', label: 'Outro slide' },
] as const

const MARQUEE_ITEMS = [
  'Viewport-native',
  'Skeleton-first UX',
  'Parallax depth',
  'Marquee motion',
  'Scroll snap decks',
  'Bold and generic',
]

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { activeId, scrollTo } = useViewportSnapObserver(SNAP_SLIDES.map((slide) => slide.id))

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2200)
    return () => window.clearTimeout(timer)
  }, [])

  const scrollToSnapDeck = () => {
    document.getElementById('snap-deck')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="bg-zinc-950 text-zinc-50">
      <ParallaxHero
        eyebrow="Evolved Web"
        title="Bold components for the modern web"
        subtitle="Bold building blocks inspired by viewport physics, marquee rhythm, skeleton honesty, and parallax depth."
        onCtaClick={scrollToSnapDeck}
      />

      <MarqueeRibbon items={MARQUEE_ITEMS} speed={24} />

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:px-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">
            SkeletonReveal
          </p>
          <h2 className="text-3xl font-bold tracking-tight">Honest loading, zero layout jump</h2>
          <p className="text-zinc-400">
            Mirrors final content geometry while data resolves, then crossfades into the real card.
            Sits between hero and content sections without stealing scroll focus.
          </p>
        </div>

        <SkeletonReveal
          isLoading={isLoading}
          skeleton={<FeatureCardSkeleton />}
          className="w-full"
        >
          <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-14 items-center justify-center rounded-xl bg-violet-500/20 text-xl">
                ⚡
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Edge response profile</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Cached at 42 edge nodes. Time-to-first-byte under 90ms for 94% of sessions.
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                ['Latency', '87ms'],
                ['Cache hit', '94%'],
                ['Regions', '42'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/5 bg-black/20 px-3 py-4"
                >
                  <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
                  <p className="mt-1 font-mono text-lg text-white">{value}</p>
                </div>
              ))}
            </div>
          </article>
        </SkeletonReveal>
      </section>

      <div id="snap-deck">
        <div className="mx-auto max-w-6xl px-6 pb-8 pt-20 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            ViewportSnapDeck
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Full-viewport snap storytelling</h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Scroll into this deck to take over vertical navigation. Each slide locks to the viewport
            using native CSS scroll-snap — no scroll-jacking libraries required.
          </p>
        </div>

        <ViewportSnapDeck>
          <ViewportSnapNav
            slides={[...SNAP_SLIDES]}
            activeId={activeId}
            onNavigate={scrollTo}
          />

          <ViewportSnapSlide
            id="snap-intro"
            className="bg-gradient-to-br from-violet-950/80 via-zinc-950 to-zinc-950"
          >
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Slide 01</p>
              <h3 className="mt-4 text-4xl font-extrabold md:text-6xl">Occupy the viewport</h3>
              <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
                On desktop, each slide fills 100svh and snaps on scroll. Dot navigation tracks the
                active slide via IntersectionObserver.
              </p>
            </div>
          </ViewportSnapSlide>

          <ViewportSnapSlide
            id="snap-stack"
            className="bg-gradient-to-br from-cyan-950/50 via-zinc-950 to-zinc-950"
          >
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {['ParallaxHero', 'MarqueeRibbon', 'SkeletonReveal'].map((name) => (
                <div
                  key={name}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <p className="font-mono text-sm text-cyan-300">{name}</p>
                  <p className="mt-3 text-sm text-zinc-400">
                    Composes above this deck as standard document flow until the snap region begins.
                  </p>
                </div>
              ))}
            </div>
          </ViewportSnapSlide>

          <ViewportSnapSlide
            id="snap-outro"
            className="bg-gradient-to-t from-zinc-950 via-zinc-950 to-emerald-950/40"
          >
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-4xl font-extrabold md:text-5xl">Release back to the page</h3>
              <p className="mt-6 text-zinc-400">
                After the final slide, scrolling continues normally. On narrow viewports, slides keep
                min-height but allow content to breathe with extra vertical padding.
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-10 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                Back to top
              </button>
            </div>
          </ViewportSnapSlide>
        </ViewportSnapDeck>
      </div>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-zinc-500">
        web-evolution · React + Tailwind + Motion ·{' '}
        <a href="/preview" className="text-violet-300 hover:underline">
          Preview gallery
        </a>
      </footer>
    </main>
  )
}
