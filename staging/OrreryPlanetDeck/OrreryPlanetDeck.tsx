import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { RatioImage } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface OrreryCard {
  image?: string
  title: string
  body?: string
}

export interface OrreryPlanetDeckProps {
  eyebrow?: string
  title?: string
  cards: OrreryCard[]
  initialIndex?: number
  className?: string
}

export function OrreryPlanetDeck({
  eyebrow,
  title,
  cards,
  initialIndex = 0,
  className,
}: OrreryPlanetDeckProps) {
  const reduceMotion = useReducedMotion()
  const count = cards.length
  const [active, setActive] = useState(
    count > 0 ? Math.min(initialIndex, count - 1) : 0,
  )
  const [dragStart, setDragStart] = useState<number | null>(null)
  const [spin, setSpin] = useState(0)

  const go = useCallback(
    (dir: -1 | 1) => {
      if (count === 0) return
      setActive((i) => (i + dir + count) % count)
      setSpin((s) => s + dir)
    },
    [count],
  )

  const activeCard = cards[active]
  const ringRotation = spin * 45

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0a0818] text-[#f4efe6]',
        className,
      )}
      onPointerDown={(e) => setDragStart(e.clientX)}
      onPointerUp={(e) => {
        if (dragStart === null) return
        const delta = e.clientX - dragStart
        if (delta > 40) go(-1)
        if (delta < -40) go(1)
        setDragStart(null)
      }}
      onPointerCancel={() => setDragStart(null)}
      style={{ touchAction: 'pan-y' }}
    >
      <header className="absolute left-5 top-16 z-20 md:left-10 md:top-20">
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#d4a84b]/70">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-2 max-w-[14ch] text-3xl font-bold leading-[0.95] text-[#f4efe6] md:text-5xl">
            {title}
          </h2>
        ) : null}
      </header>

      <div className="relative flex h-[min(75svh,700px)] w-full flex-col items-center justify-center px-4">
        {count === 0 ? (
          <p className="text-sm text-white/40">No planets on the orrery.</p>
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              {[1, 1.4, 1.8].map((scale, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-[#d4a84b]/25"
                  style={{
                    width: `${scale * 180}px`,
                    height: `${scale * 100}px`,
                  }}
                  animate={{ rotate: ringRotation + i * 30 }}
                  transition={{
                    duration: reduceMotion ? 0 : motionDuration.emphasis,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>

            <div className="relative w-full max-w-2xl">
              <motion.article
                key={`${activeCard.title}-${active}`}
                className="relative z-20 overflow-hidden rounded-xl border border-[#d4a84b]/35 bg-[#12101a] shadow-[0_0_48px_rgba(212,168,75,0.12)]"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: motionDuration.standard }}
              >
                {activeCard.image ? (
                  <RatioImage src={activeCard.image} alt="" ratio="16/10" className="w-full" />
                ) : (
                  <div className="aspect-[16/10] bg-[#d4a84b]/5" aria-hidden />
                )}
                <div className="p-5 md:p-6">
                  <h3 className="font-serif text-xl font-bold text-[#f4efe6] md:text-2xl">
                    {activeCard.title}
                  </h3>
                  {activeCard.body ? (
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{activeCard.body}</p>
                  ) : null}
                </div>
              </motion.article>
            </div>

            <div className="absolute bottom-8 flex items-center gap-4">
              <button
                type="button"
                onClick={() => go(-1)}
                className="rounded-full border border-[#d4a84b]/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#d4a84b] transition hover:bg-[#d4a84b]/10"
                aria-label="Previous planet"
              >
                ← Orbit
              </button>
              <span className="font-mono text-[10px] text-white/40">
                {active + 1} / {count}
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                className="rounded-full border border-[#d4a84b]/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#d4a84b] transition hover:bg-[#d4a84b]/10"
                aria-label="Next planet"
              >
                Orbit →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
