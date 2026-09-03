import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { RatioImage } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface VortexCard {
  image?: string
  title: string
  body?: string
}

export interface VortexCardSpiralProps {
  eyebrow?: string
  title?: string
  cards: VortexCard[]
  initialIndex?: number
  className?: string
}

const MAX_CARDS = 8
const ACCENTS = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#dda0dd']

export function VortexCardSpiral({
  eyebrow,
  title,
  cards,
  initialIndex = 0,
  className,
}: VortexCardSpiralProps) {
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

  function onPointerDown(clientX: number) {
    setDragStart(clientX)
  }

  function onPointerUp(clientX: number) {
    if (dragStart === null) return
    const delta = clientX - dragStart
    if (delta > 40) go(-1)
    if (delta < -40) go(1)
    setDragStart(null)
  }

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0d3b4c] text-white',
        className,
      )}
      onPointerDown={(e) => onPointerDown(e.clientX)}
      onPointerUp={(e) => onPointerUp(e.clientX)}
      onPointerCancel={() => setDragStart(null)}
      style={{ touchAction: 'pan-y' }}
    >
      <header className="absolute left-5 top-16 z-20 md:left-10 md:top-20">
        {eyebrow ? (
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#4ecdc4]/80">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-2 max-w-[16ch] text-3xl font-bold leading-[0.95] md:text-5xl">
            {title}
          </h2>
        ) : null}
      </header>

      <div className="relative flex h-[min(75svh,700px)] w-full items-center justify-center">
        {count === 0 ? (
          <p className="text-sm text-white/50">No cards in the vortex.</p>
        ) : (
          <>
            <div
              className="pointer-events-none absolute h-[min(60vmin,420px)] w-[min(60vmin,420px)] rounded-full border border-dashed border-[#4ecdc4]/25"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute h-[min(40vmin,280px)] w-[min(40vmin,280px)] rounded-full border border-[#ff6b6b]/20"
              aria-hidden
            />

            {cards.slice(0, count).map((card, index) => {
              const offset = (index - active + count) % count
              const angle = offset * (360 / count) - 90
              const radius = 28 + offset * 6
              const isActive = offset === 0
              const accent = ACCENTS[index % ACCENTS.length]

              return (
                <motion.article
                  key={`${card.title}-${index}`}
                  className={cn(
                    'absolute w-[min(38vw,240px)] overflow-hidden rounded-2xl border-2 bg-[#0a2a36] shadow-xl md:w-[min(32vw,280px)]',
                    isActive ? 'z-30' : 'z-10',
                  )}
                  animate={{
                    left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * radius}vmin - min(19vw, 120px))`,
                    top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * radius}vmin - min(24vw, 150px))`,
                    scale: isActive ? 1.08 : 0.82 - offset * 0.04,
                    opacity: isActive ? 1 : Math.max(0.35, 0.85 - offset * 0.12),
                    rotate: isActive ? 0 : angle * 0.05,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : motionDuration.emphasis,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ borderColor: isActive ? accent : `${accent}55` }}
                >
                  <div className="relative aspect-[4/5] bg-[#1a5568]/50">
                    {card.image ? (
                      <RatioImage src={card.image} alt="" ratio="4/5" className="h-full w-full" />
                    ) : (
                      <div className="grid h-full place-items-center text-[10px] uppercase tracking-[0.3em] text-white/35">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold leading-tight">{card.title}</h3>
                    {card.body ? (
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{card.body}</p>
                    ) : null}
                  </div>
                </motion.article>
              )
            })}
          </>
        )}
      </div>

      {count > 1 ? (
        <div className="absolute bottom-10 flex gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            className="rounded-full border border-white/30 px-5 py-2 text-xs uppercase tracking-[0.25em] hover:bg-white/10"
            aria-label="Previous card"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="rounded-full border border-[#4ecdc4]/60 px-5 py-2 text-xs uppercase tracking-[0.25em] hover:bg-[#4ecdc4]/10"
            aria-label="Next card"
          >
            Next
          </button>
        </div>
      ) : null}
    </section>
  )
}
