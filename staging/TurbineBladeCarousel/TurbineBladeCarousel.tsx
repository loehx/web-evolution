import { useCallback, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { RatioImage } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface TurbineCard {
  image?: string
  title: string
  body?: string
  href?: string
}

export interface TurbineBladeCarouselProps {
  eyebrow?: string
  title?: string
  cards: TurbineCard[]
  initialIndex?: number
  className?: string
}

function TurbineHub({ animate }: { animate: boolean }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 md:h-48 md:w-48" aria-hidden>
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-[#8a8a8e]/40 bg-gradient-to-br from-[#3a3a3e] to-[#1a1a1e]"
        animate={animate ? { rotate: 360 } : undefined}
        transition={{ duration: motionDuration.emphasis * 8, repeat: animate ? Infinity : 0, ease: 'linear' }}
      />
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 h-1 w-[60%] origin-left bg-gradient-to-r from-[#f5a623]/60 to-transparent"
          style={{ transform: `rotate(${i * 60}deg)` }}
        />
      ))}
    </div>
  )
}

export function TurbineBladeCarousel({
  eyebrow,
  title,
  cards,
  initialIndex = 0,
  className,
}: TurbineBladeCarouselProps) {
  const reduceMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(
    cards.length > 0 ? Math.min(initialIndex, cards.length - 1) : 0,
  )
  const [dragStart, setDragStart] = useState<number | null>(null)

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = scrollRef.current
      if (!el) return
      const child = el.children[index] as HTMLElement | undefined
      if (child) {
        child.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          inline: 'center',
          block: 'nearest',
        })
      }
      setActive(index)
    },
    [reduceMotion],
  )

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
        'relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#1a1a1e] text-[#e8e4e0]',
        className,
      )}
    >
      <header className="absolute left-5 top-16 z-20 md:left-10 md:top-20">
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#f5a623]/70">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-2 max-w-[14ch] text-3xl font-bold leading-[0.95] md:text-5xl">{title}</h2>
        ) : null}
      </header>

      <div className="absolute right-5 top-16 z-20 flex gap-2 md:right-10 md:top-20">
        <button
          type="button"
          onClick={() => go(-1)}
          className="flex h-10 w-10 items-center justify-center border border-[#8a8a8e]/40 text-lg hover:bg-[#8a8a8e]/10"
          aria-label="Previous blade"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="flex h-10 w-10 items-center justify-center border border-[#8a8a8e]/40 text-lg hover:bg-[#8a8a8e]/10"
          aria-label="Next blade"
        >
          →
        </button>
      </div>

      <TurbineHub animate={!reduceMotion} />

      {cards.length === 0 ? (
        <p className="px-6 text-sm text-white/40">No blades on the turbine hub.</p>
      ) : (
        <div
          ref={scrollRef}
          className="relative z-10 flex snap-x snap-mandatory gap-8 overflow-x-auto px-[10vw] pb-8 pt-28 [scrollbar-width:none] md:gap-12 md:px-[15vw] md:pt-32 [&::-webkit-scrollbar]:hidden"
          onPointerDown={(e) => setDragStart(e.clientX)}
          onPointerUp={(e) => {
            if (dragStart === null) return
            const delta = e.clientX - dragStart
            if (Math.abs(delta) > 40) go(delta > 0 ? -1 : 1)
            setDragStart(null)
          }}
        >
          {cards.map((card, i) => {
            const isActive = i === active
            const inner = (
              <motion.article
                className={cn(
                  'flex w-[72vw] shrink-0 snap-center flex-col overflow-hidden border border-[#8a8a8e]/30 bg-[#2a2a2e] md:w-[28rem]',
                  isActive && 'border-[#f5a623]/50 shadow-[0_0_30px_rgba(245,166,35,0.15)]',
                )}
                animate={{
                  scale: isActive ? 1 : 0.92,
                  opacity: isActive ? 1 : 0.65,
                  rotate: isActive ? 0 : i < active ? -2 : 2,
                }}
                transition={{ duration: reduceMotion ? 0 : motionDuration.standard }}
              >
                {card.image ? (
                  <RatioImage src={card.image} alt="" ratio="4/5" className="w-full" />
                ) : (
                  <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#3a3a3e] text-xs uppercase tracking-widest text-white/30">
                    Blade {i + 1}
                  </div>
                )}
                <div className="p-5">
                  <p className="font-mono text-[10px] text-[#f5a623]/60">BLADE {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 text-xl font-bold">{card.title}</h3>
                  {card.body ? <p className="mt-2 text-sm text-[#e8e4e0]/70">{card.body}</p> : null}
                </div>
              </motion.article>
            )

            return card.href ? (
              <a key={i} href={card.href} className="shrink-0" onClick={() => setActive(i)}>
                {inner}
              </a>
            ) : (
              <div key={i} className="shrink-0" onClick={() => setActive(i)}>
                {inner}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
