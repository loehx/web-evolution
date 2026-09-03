import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { RatioImage } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface SpoolCard {
  image?: string
  title: string
  body?: string
}

export interface SpoolReelCarouselProps {
  eyebrow?: string
  title?: string
  cards: SpoolCard[]
  initialIndex?: number
  className?: string
}

const MAX_CARDS = 8

export function SpoolReelCarousel({
  eyebrow,
  title,
  cards,
  initialIndex = 0,
  className,
}: SpoolReelCarouselProps) {
  const reduceMotion = useReducedMotion()
  const count = Math.min(cards.length, MAX_CARDS)
  const [active, setActive] = useState(
    count > 0 ? Math.min(initialIndex, count - 1) : 0,
  )
  const [dragStart, setDragStart] = useState<number | null>(null)

  const go = useCallback(
    (dir: -1 | 1) => {
      if (count === 0) return
      setActive((i) => (i + dir + count) % count)
    },
    [count],
  )

  const activeCard = count > 0 ? cards[active] : null

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#141210] text-[#f5f0e8] lg:grid lg:grid-cols-[1fr_1.1fr]',
        className,
      )}
      onPointerDown={(e) => setDragStart(e.clientY)}
      onPointerUp={(e) => {
        if (dragStart === null) return
        const delta = e.clientY - dragStart
        if (delta > 40) go(-1)
        if (delta < -40) go(1)
        setDragStart(null)
      }}
      onPointerCancel={() => setDragStart(null)}
      style={{ touchAction: 'pan-x' }}
    >
      <header className="absolute left-5 top-16 z-20 lg:left-10 lg:top-20">
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#e8a838]/70">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-2 max-w-[14ch] text-3xl font-bold leading-[0.95] text-[#c0c0c0] md:text-5xl">
            {title}
          </h2>
        ) : null}
      </header>

      <div className="relative flex min-h-[55svh] items-center justify-center px-6 pt-28 lg:min-h-[100svh] lg:pt-0">
        {count === 0 ? (
          <p className="text-sm text-white/40">No frames on the reel.</p>
        ) : (
          <div className="relative flex h-[min(60vmin,420px)] w-[min(40vmin,200px)] items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-[#c0c0c0]/30 bg-gradient-to-b from-[#2a2826] to-[#141210] shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]"
              animate={{ rotate: reduceMotion ? 0 : active * 45 }}
              transition={{ duration: reduceMotion ? 0 : motionDuration.emphasis, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            />
            <div
              className="absolute h-8 w-8 rounded-full bg-[#e8a838] shadow-[0_0_20px_#e8a838]"
              aria-hidden
            />
            {cards.slice(0, count).map((card, index) => {
              const offset = (index - active + count) % count
              const isActive = offset === 0
              if (offset > 3) return null

              return (
                <motion.div
                  key={`${card.title}-${index}`}
                  className={cn(
                    'absolute left-1/2 w-[min(55vw,140px)] -translate-x-1/2 overflow-hidden rounded-sm border bg-[#1a1816]',
                    isActive ? 'z-30 border-[#e8a838]' : 'z-10 border-[#c0c0c0]/20',
                  )}
                  animate={{
                    top: `${12 + offset * 14}%`,
                    scale: isActive ? 1 : 0.85 - offset * 0.05,
                    opacity: isActive ? 1 : 0.4 - offset * 0.1,
                    rotate: offset * 2,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : motionDuration.emphasis,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {card.image ? (
                    <RatioImage src={card.image} alt="" ratio="16/10" />
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center bg-[#e8a838]/10 text-[8px] uppercase tracking-[0.3em] text-[#e8a838]/40">
                      No frame
                    </div>
                  )}
                  <p className="truncate px-2 py-1 font-mono text-[8px] text-[#e8a838]/60">
                    Frame {String(index + 1).padStart(2, '0')}
                  </p>
                </motion.div>
              )
            })}
          </div>
        )}

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => go(-1)}
            className="rounded-full border border-[#c0c0c0]/40 px-4 py-2 text-xs uppercase tracking-wider text-[#c0c0c0] transition hover:bg-[#c0c0c0]/10"
            aria-label="Previous frame"
          >
            ↑ Reel
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="rounded-full border border-[#e8a838]/40 px-4 py-2 text-xs uppercase tracking-wider text-[#e8a838] transition hover:bg-[#e8a838]/10"
            aria-label="Next frame"
          >
            Reel ↓
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 pb-16 pt-4 lg:px-14 lg:pb-0">
        {activeCard ? (
          <motion.article
            key={active}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#e8a838]">
              Frame {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-tight text-[#f5f0e8] md:text-4xl">
              {activeCard.title}
            </h3>
            {activeCard.body ? (
              <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-[#f5f0e8]/60 md:text-base">
                {activeCard.body}
              </p>
            ) : null}
            {activeCard.image ? (
              <div className="mt-6 hidden overflow-hidden rounded-sm border border-[#c0c0c0]/20 lg:block">
                <RatioImage src={activeCard.image} alt="" ratio="16/10" />
              </div>
            ) : null}
          </motion.article>
        ) : null}

        <div className="mt-8 hidden gap-3 lg:flex">
          <button
            type="button"
            onClick={() => go(-1)}
            className="rounded-full border border-[#c0c0c0]/40 px-5 py-2 text-xs uppercase tracking-wider text-[#c0c0c0] transition hover:bg-[#c0c0c0]/10"
            aria-label="Previous frame"
          >
            ↑ Unwind
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="rounded-full border border-[#e8a838]/40 px-5 py-2 text-xs uppercase tracking-wider text-[#e8a838] transition hover:bg-[#e8a838]/10"
            aria-label="Next frame"
          >
            Unwind ↓
          </button>
        </div>
      </div>
    </section>
  )
}
