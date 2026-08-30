import { useCallback, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { RatioImage } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface PylonCard {
  image?: string
  title: string
  body?: string
  href?: string
}

export interface PylonCardArrayProps {
  eyebrow?: string
  title?: string
  cards: PylonCard[]
  initialIndex?: number
  className?: string
}

function PylonTower({ animate }: { animate: boolean }) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-40 w-16 -translate-x-1/2 -translate-y-1/2 md:h-56 md:w-20"
      aria-hidden
    >
      <div className="absolute bottom-0 left-1/2 h-full w-3 -translate-x-1/2 bg-gradient-to-t from-[#5a5a5e] to-[#8a8a8e]" />
      <motion.div
        className="absolute left-1/2 top-[30%] h-1 w-[140%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f5a623]/70 to-transparent"
        animate={animate ? { opacity: [0.5, 1, 0.5] } : undefined}
        transition={{ duration: motionDuration.emphasis, repeat: animate ? Infinity : 0 }}
      />
      <motion.div
        className="absolute left-1/2 top-[50%] h-1 w-[180%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#8a8a8e] to-transparent"
        animate={animate ? { rotate: 360 } : undefined}
        transition={{ duration: motionDuration.emphasis * 10, repeat: animate ? Infinity : 0, ease: 'linear' }}
      />
      <motion.div
        className="absolute left-1/2 top-[70%] h-1 w-[120%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f5a623]/50 to-transparent"
        animate={animate ? { opacity: [0.4, 0.9, 0.4] } : undefined}
        transition={{ duration: motionDuration.emphasis * 1.5, repeat: animate ? Infinity : 0 }}
      />
    </div>
  )
}

export function PylonCardArray({
  eyebrow,
  title,
  cards,
  initialIndex = 0,
  className,
}: PylonCardArrayProps) {
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
        'relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#1a1e24] text-[#e8e4e0]',
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
          className="border border-[#8a8a8e]/40 px-3 py-2 text-xs uppercase tracking-widest hover:border-[#f5a623]/60"
          aria-label="Previous card"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="border border-[#8a8a8e]/40 px-3 py-2 text-xs uppercase tracking-widest hover:border-[#f5a623]/60"
          aria-label="Next card"
        >
          →
        </button>
      </div>

      <PylonTower animate={!reduceMotion} />

      <div
        ref={scrollRef}
        className="relative z-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[15vw] py-24 scrollbar-none md:gap-10 md:px-[20vw]"
        onPointerDown={(e) => setDragStart(e.clientX)}
        onPointerUp={(e) => {
          if (dragStart === null) return
          const delta = e.clientX - dragStart
          if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1)
          setDragStart(null)
        }}
        onPointerLeave={() => setDragStart(null)}
      >
        {cards.map((card, i) => (
          <motion.article
            key={`${card.title}-${i}`}
            className={cn(
              'w-[70vw] shrink-0 snap-center md:w-[28rem]',
              i === active ? 'z-10' : 'z-0 opacity-70',
            )}
            animate={{
              scale: i === active ? 1 : 0.92,
              y: i === active ? -12 : 0,
            }}
            transition={{ duration: reduceMotion ? 0 : motionDuration.standard }}
          >
            <div
              className="relative border border-[#8a8a8e]/30 bg-[#2a2e34]/90 p-4 shadow-xl"
              style={{ transform: `rotate(${(i - active) * 3}deg)` }}
            >
              {card.image ? (
                <RatioImage src={card.image} alt="" ratio="4/5" className="w-full" />
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#3a3e44] text-xs uppercase tracking-widest text-white/30">
                  Cross-arm
                </div>
              )}
              <h3 className="mt-4 text-xl font-bold md:text-2xl">{card.title}</h3>
              {card.body ? (
                <p className="mt-2 text-sm leading-relaxed text-[#e8e4e0]/70">{card.body}</p>
              ) : null}
              {card.href ? (
                <a
                  href={card.href}
                  className="mt-4 inline-block text-xs uppercase tracking-widest text-[#f5a623] hover:underline"
                >
                  Read more →
                </a>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>

      <p className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-[#8a8a8e]/60">
        {cards.length > 0 ? `${active + 1} / ${cards.length}` : '0 / 0'} · drag rail
      </p>
    </section>
  )
}
