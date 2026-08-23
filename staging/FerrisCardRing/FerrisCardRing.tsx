import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { RatioImage } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface FerrisCard {
  image?: string
  title: string
  body?: string
}

export interface FerrisCardRingProps {
  eyebrow?: string
  title?: string
  cards: FerrisCard[]
  initialIndex?: number
  className?: string
}

const MAX_CARDS = 8
const RADIUS = 34

export function FerrisCardRing({
  eyebrow,
  title,
  cards,
  initialIndex = 0,
  className,
}: FerrisCardRingProps) {
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

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0f1729] text-white',
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
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#f5c542]/70">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-2 max-w-[14ch] text-3xl font-bold leading-[0.95] text-[#f5c542] md:text-5xl">
            {title}
          </h2>
        ) : null}
      </header>

      <div className="relative flex h-[min(80svh,760px)] w-full items-center justify-center">
        {count === 0 ? (
          <p className="text-sm text-white/40">No cards on the wheel.</p>
        ) : (
          <>
            <div
              className="pointer-events-none absolute h-6 w-6 rounded-full bg-[#f5c542] shadow-[0_0_30px_#f5c542]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute h-[min(55vmin,400px)] w-[min(55vmin,400px)] rounded-full border-2 border-dashed border-[#f5c542]/25"
              aria-hidden
            />

            {cards.slice(0, count).map((card, index) => {
              const offset = (index - active + count) % count
              const angle = (offset / count) * Math.PI * 2 - Math.PI / 2
              const isActive = offset === 0

              return (
                <motion.article
                  key={`${card.title}-${index}`}
                  className={cn(
                    'absolute w-[min(72vw,260px)] overflow-hidden rounded-xl border-2 bg-[#1a2540]',
                    isActive ? 'z-30 border-[#f5c542]' : 'z-10 border-white/10',
                  )}
                  animate={{
                    left: `calc(50% + ${Math.cos(angle) * RADIUS}%)`,
                    top: `calc(50% + ${Math.sin(angle) * RADIUS}%)`,
                    scale: isActive ? 1.08 : 0.8,
                    opacity: isActive ? 1 : 0.5,
                    rotate: isActive ? 0 : offset * 4,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : motionDuration.emphasis,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  {card.image ? (
                    <RatioImage src={card.image} alt="" ratio="4/3" />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-[#f5c542]/10 text-[10px] uppercase tracking-[0.3em] text-[#f5c542]/40">
                      No image
                    </div>
                  )}
                  <div className="p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff6b9d]">
                      Gondola {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-1 text-sm font-bold leading-tight text-[#f5c542]">
                      {card.title}
                    </h3>
                    {card.body ? (
                      <p className="mt-1 line-clamp-2 text-[11px] text-white/60">{card.body}</p>
                    ) : null}
                  </div>
                </motion.article>
              )
            })}

            <div className="absolute bottom-8 flex gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="rounded-full border border-[#f5c542]/40 px-4 py-2 text-xs uppercase tracking-wider text-[#f5c542] transition hover:bg-[#f5c542]/10"
                aria-label="Previous card"
              >
                ← Spin
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="rounded-full border border-[#ff6b9d]/40 px-4 py-2 text-xs uppercase tracking-wider text-[#ff6b9d] transition hover:bg-[#ff6b9d]/10"
                aria-label="Next card"
              >
                Spin →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
