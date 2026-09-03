import { useCallback, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { RatioImage } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface PlinthCard {
  image?: string
  title: string
  body?: string
  href?: string
}

export interface PlinthCardPedestalProps {
  eyebrow?: string
  title?: string
  cards: PlinthCard[]
  initialIndex?: number
  className?: string
}

export function PlinthCardPedestal({
  eyebrow,
  title,
  cards,
  initialIndex = 0,
  className,
}: PlinthCardPedestalProps) {
  const reduceMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(
    cards.length > 0 ? Math.min(initialIndex, cards.length - 1) : 0,
  )
  const [dragStart, setDragStart] = useState<number | null>(null)

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    const child = el.children[index] as HTMLElement | undefined
    if (child) {
      child.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', inline: 'center', block: 'nearest' })
    }
    setActive(index)
  }, [reduceMotion])

  const go = useCallback(
    (dir: -1 | 1) => {
      if (cards.length === 0) return
      const next = (active + dir + cards.length) % cards.length
      scrollToIndex(next)
    },
    [active, cards.length, scrollToIndex],
  )

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#1c1c1e] text-[#f4f0e8]',
        className,
      )}
    >
      <header className="absolute left-5 top-16 z-20 md:left-10 md:top-20">
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#d4cfc4]/60">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-2 max-w-[14ch] text-3xl font-bold leading-[0.95] md:text-5xl">
            {title}
          </h2>
        ) : null}
      </header>

      <div className="absolute right-5 top-16 z-20 flex gap-2 md:right-10 md:top-20">
        <button
          type="button"
          onClick={() => go(-1)}
          className="flex h-10 w-10 items-center justify-center border border-[#d4cfc4]/30 text-lg hover:bg-[#d4cfc4]/10"
          aria-label="Previous card"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="flex h-10 w-10 items-center justify-center border border-[#d4cfc4]/30 text-lg hover:bg-[#d4cfc4]/10"
          aria-label="Next card"
        >
          →
        </button>
      </div>

      {cards.length === 0 ? (
        <p className="px-6 text-sm text-white/40">No cards on the plinth rail.</p>
      ) : (
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[7.5vw] pb-8 pt-28 [scrollbar-width:none] md:gap-10 md:px-[12vw] md:pt-32 [&::-webkit-scrollbar]:hidden"
          onPointerDown={(e) => setDragStart(e.clientX)}
          onPointerUp={(e) => {
            if (dragStart === null) return
            const delta = e.clientX - dragStart
            if (delta > 50) go(-1)
            if (delta < -50) go(1)
            setDragStart(null)
          }}
          onPointerCancel={() => setDragStart(null)}
          onScroll={() => {
            const el = scrollRef.current
            if (!el) return
            const center = el.scrollLeft + el.clientWidth / 2
            let closest = 0
            let minDist = Infinity
            Array.from(el.children).forEach((child, i) => {
              const c = child as HTMLElement
              const childCenter = c.offsetLeft + c.offsetWidth / 2
              const dist = Math.abs(center - childCenter)
              if (dist < minDist) {
                minDist = dist
                closest = i
              }
            })
            setActive(closest)
          }}
          style={{ touchAction: 'pan-x' }}
        >
          {cards.map((card, i) => {
            const plinthHeight = 40 + i * 24
            const isActive = i === active
            return (
              <article
                key={i}
                className="w-[85vw] shrink-0 snap-center md:w-[55vw]"
              >
                <motion.div
                  className="relative flex flex-col"
                  animate={{
                    y: isActive && !reduceMotion ? -12 : 0,
                    scale: isActive ? 1 : 0.94,
                  }}
                  transition={{ duration: reduceMotion ? 0 : motionDuration.standard }}
                >
                  <div
                    className="relative overflow-hidden border border-[#d4cfc4]/20 bg-[#2a2a2c] shadow-2xl"
                    style={{ marginTop: `${plinthHeight}px` }}
                  >
                    {card.image ? (
                      <RatioImage src={card.image} alt="" ratio="4/5" className="w-full" />
                    ) : (
                      <div className="flex aspect-[4/5] items-center justify-center bg-[#3a3a3c] text-xs uppercase tracking-widest text-white/30">
                        No image
                      </div>
                    )}
                    <div className="border-t border-[#d4cfc4]/15 p-5 md:p-6">
                      <h3 className="text-xl font-bold leading-tight md:text-2xl">{card.title}</h3>
                      {card.body ? (
                        <p className="mt-2 text-sm leading-relaxed text-[#f4f0e8]/65">{card.body}</p>
                      ) : null}
                      {card.href ? (
                        <a
                          href={card.href}
                          className="mt-4 inline-block text-xs uppercase tracking-[0.25em] text-[#d4cfc4] hover:underline"
                        >
                          Read story →
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <div
                    className="absolute bottom-0 left-1/2 w-[90%] -translate-x-1/2 bg-gradient-to-b from-[#d4cfc4] to-[#a8a398]"
                    style={{ height: `${plinthHeight}px` }}
                    aria-hidden
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-white/20" />
                  </div>
                </motion.div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
