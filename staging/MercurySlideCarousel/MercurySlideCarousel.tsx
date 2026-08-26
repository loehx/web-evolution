import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { RatioImage } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface MercuryCard {
  image?: string
  title: string
  body?: string
}

export interface MercurySlideCarouselProps {
  eyebrow?: string
  title?: string
  cards: MercuryCard[]
  initialIndex?: number
  className?: string
}

export function MercurySlideCarousel({
  eyebrow,
  title,
  cards,
  initialIndex = 0,
  className,
}: MercurySlideCarouselProps) {
  const reduceMotion = useReducedMotion()
  const count = cards.length
  const [active, setActive] = useState(
    count > 0 ? Math.min(initialIndex, count - 1) : 0,
  )
  const [dragStart, setDragStart] = useState<number | null>(null)
  const [ripple, setRipple] = useState(0)

  const go = useCallback(
    (dir: -1 | 1) => {
      if (count === 0) return
      setActive((i) => (i + dir + count) % count)
      setRipple((r) => r + 1)
    },
    [count],
  )

  const activeCard = cards[active]

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0a0c10] text-white',
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
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#c0c8d0]/70">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-2 max-w-[14ch] text-3xl font-bold leading-[0.95] text-[#e8f0f8] md:text-5xl">
            {title}
          </h2>
        ) : null}
      </header>

      <div className="relative flex h-[min(75svh,700px)] w-full flex-col items-center justify-center px-4">
        {count === 0 ? (
          <p className="text-sm text-white/40">No cards on the trough.</p>
        ) : (
          <>
            <div className="relative w-full max-w-2xl">
              <motion.article
                key={`${activeCard.title}-${active}`}
                className="relative z-20 overflow-hidden rounded-xl border border-[#c0c8d0]/30 bg-[#12141a] shadow-[0_0_40px_rgba(192,200,208,0.15)]"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionDuration.standard }}
              >
                {activeCard.image ? (
                  <RatioImage src={activeCard.image} alt="" ratio="16/10" className="w-full" />
                ) : (
                  <div className="aspect-[16/10] bg-[#c0c8d0]/5" aria-hidden />
                )}
                <div className="p-5 md:p-6">
                  <h3 className="text-xl font-bold text-[#e8f0f8] md:text-2xl">{activeCard.title}</h3>
                  {activeCard.body ? (
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{activeCard.body}</p>
                  ) : null}
                </div>
              </motion.article>

              <div
                className="absolute -bottom-8 left-1/2 z-10 h-16 w-[120%] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-[#c0c8d0]/40 via-[#8a949c]/20 to-transparent blur-sm"
                aria-hidden
              />
            </div>

            <div className="relative mt-12 h-24 w-full max-w-3xl">
              <div
                className="absolute inset-x-0 bottom-0 h-3 rounded-full bg-gradient-to-r from-transparent via-[#c0c8d0]/60 to-transparent"
                aria-hidden
              />
              <motion.div
                key={ripple}
                className="absolute bottom-0 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full border border-[#c0c8d0]/30"
                initial={reduceMotion ? false : { scale: 0.3, opacity: 0.6 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: motionDuration.emphasis }}
                aria-hidden
              />
              <div
                className="absolute inset-x-[10%] bottom-1 h-8 rounded-[50%] bg-gradient-to-b from-[#e8f0f8]/20 to-[#c0c8d0]/10"
                aria-hidden
              />
            </div>
          </>
        )}
      </div>

      {count > 1 ? (
        <div className="absolute bottom-10 z-20 flex items-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            className="rounded-full border border-[#c0c8d0]/40 px-5 py-2 text-xs uppercase tracking-[0.3em] text-[#c0c8d0] transition hover:bg-[#c0c8d0]/10"
            aria-label="Previous card"
          >
            ←
          </button>
          <span className="font-mono text-xs text-white/40">
            {active + 1} / {count}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            className="rounded-full border border-[#c0c8d0]/40 px-5 py-2 text-xs uppercase tracking-[0.3em] text-[#c0c8d0] transition hover:bg-[#c0c8d0]/10"
            aria-label="Next card"
          >
            →
          </button>
        </div>
      ) : null}
    </section>
  )
}
