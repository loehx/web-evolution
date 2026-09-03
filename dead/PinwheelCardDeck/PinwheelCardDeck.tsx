import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { RatioImage } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface PinwheelCard {
  image?: string
  title: string
  body?: string
}

export interface PinwheelCardDeckProps {
  eyebrow?: string
  title?: string
  cards: PinwheelCard[]
  initialIndex?: number
  className?: string
}

const SPOKE_COUNT_MAX = 8

export function PinwheelCardDeck({
  eyebrow,
  title,
  cards,
  initialIndex = 0,
  className,
}: PinwheelCardDeckProps) {
  const reduceMotion = useReducedMotion()
  const count = Math.min(cards.length, SPOKE_COUNT_MAX)
  const [active, setActive] = useState(
    count > 0 ? Math.min(initialIndex, count - 1) : 0,
  )
  const [dragStart, setDragStart] = useState<number | null>(null)

  const step = count > 0 ? 360 / count : 0
  const wheelRotation = count > 0 ? -active * step : 0

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
    if (delta > 48) go(-1)
    if (delta < -48) go(1)
    setDragStart(null)
  }

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#faf6ee] text-[#121212]',
        className,
      )}
      onPointerDown={(e) => onPointerDown(e.clientX)}
      onPointerUp={(e) => onPointerUp(e.clientX)}
      onPointerCancel={() => setDragStart(null)}
      style={{ touchAction: 'pan-y' }}
    >
      <header className="absolute left-5 top-16 z-20 md:left-10 md:top-20">
        {eyebrow ? (
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#121212]/50">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-2 max-w-[18ch] text-3xl font-bold leading-[0.95] md:text-5xl">
            {title}
          </h2>
        ) : null}
      </header>

      <div className="relative flex h-[min(72svh,640px)] w-full max-w-[min(100vw,900px)] items-center justify-center">
        {count === 0 ? (
          <p className="text-sm text-[#121212]/50">No cards on the pinwheel.</p>
        ) : (
          <motion.div
            className="relative h-full w-full"
            animate={{ rotate: wheelRotation }}
            transition={{
              duration: reduceMotion ? 0 : motionDuration.emphasis,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {cards.slice(0, count).map((card, index) => {
              const angle = index * step
              const isActive = index === active
              return (
                <div
                  key={`${card.title}-${index}`}
                  className="absolute left-1/2 top-1/2 w-[min(42vw,220px)] -translate-x-1/2 -translate-y-1/2 md:w-[min(38vw,280px)]"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-min(28vh,200px)) rotate(-${angle + wheelRotation}deg)`,
                    transformOrigin: 'center center',
                  }}
                >
                  <article
                    className={cn(
                      'overflow-hidden rounded-2xl border-2 bg-white shadow-lg transition-shadow',
                      isActive ? 'border-[#ff6b4a] shadow-[#ff6b4a]/25' : 'border-[#121212]/15',
                    )}
                  >
                    <div className="relative aspect-[4/5] bg-[#7ec8e3]/40">
                      {card.image ? (
                        <RatioImage src={card.image} alt="" ratio="4/5" className="h-full w-full" />
                      ) : (
                        <div className="grid h-full place-items-center text-[10px] uppercase tracking-[0.3em] text-[#121212]/40">
                          No image
                        </div>
                      )}
                      <span
                        className="absolute left-3 top-3 rounded-full bg-[#ff6b4a] px-2 py-0.5 text-[10px] font-bold text-white"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="px-3 py-3 md:px-4 md:py-4">
                      <h3 className="text-lg font-bold leading-tight md:text-xl">{card.title}</h3>
                      {card.body ? (
                        <p className="mt-1 text-xs text-[#121212]/65 md:text-sm">{card.body}</p>
                      ) : null}
                    </div>
                  </article>
                </div>
              )
            })}
          </motion.div>
        )}

        <div className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 gap-3 pb-4">
          <button
            type="button"
            aria-label="Previous card"
            onClick={() => go(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-[#121212] bg-[#faf6ee] text-lg"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next card"
            onClick={() => go(1)}
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-[#121212] bg-[#ff6b4a] text-lg text-white"
          >
            →
          </button>
        </div>
      </div>

      {count > 0 ? (
        <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-[#121212]/45">
          Swipe or use arrows · {active + 1} / {count}
        </p>
      ) : null}
    </section>
  )
}
