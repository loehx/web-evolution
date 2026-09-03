import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { RatioImage } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface NexusCard {
  image?: string
  title: string
  body?: string
}

export interface NexusCardHelixProps {
  eyebrow?: string
  title?: string
  cards: NexusCard[]
  initialIndex?: number
  className?: string
}

const MAX_CARDS = 8
const HELIX_COLORS = ['#00d4ff', '#ff00aa', '#7b61ff', '#00ffaa']

export function NexusCardHelix({
  eyebrow,
  title,
  cards,
  initialIndex = 0,
  className,
}: NexusCardHelixProps) {
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
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0a1628] text-white',
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
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#00d4ff]/70">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-2 max-w-[14ch] text-3xl font-bold leading-[0.95] md:text-5xl">
            {title}
          </h2>
        ) : null}
      </header>

      <div className="relative flex h-[min(78svh,720px)] w-full items-center justify-center">
        {count === 0 ? (
          <p className="text-sm text-white/40">No cards in the helix.</p>
        ) : (
          <>
            <div
              className="pointer-events-none absolute h-4 w-4 rounded-full bg-[#00d4ff] shadow-[0_0_40px_#00d4ff]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute h-[min(50vmin,360px)] w-[min(50vmin,360px)] rounded-full border border-dashed border-[#00d4ff]/20"
              aria-hidden
            />

            {cards.slice(0, count).map((card, index) => {
              const offset = (index - active + count) % count
              const t = offset / count
              const angle = t * Math.PI * 2
              const helixY = Math.sin(angle * 2) * 18
              const radius = 32 + offset * 5
              const isActive = offset === 0
              const accent = HELIX_COLORS[index % HELIX_COLORS.length]

              return (
                <motion.article
                  key={card.title + index}
                  className={cn(
                    'absolute w-[min(72vw,300px)] overflow-hidden rounded-lg border bg-[#0f1f3a]/90 backdrop-blur-sm',
                    isActive ? 'z-30 border-white/30' : 'z-10 border-white/10',
                  )}
                  animate={{
                    left: `calc(50% + ${Math.cos(angle - Math.PI / 2) * radius}%)`,
                    top: `calc(50% + ${helixY}% + ${Math.sin(angle - Math.PI / 2) * radius * 0.3}%)`,
                    scale: isActive ? 1 : 0.82,
                    opacity: isActive ? 1 : 0.55,
                    rotate: isActive ? 0 : offset * 3,
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
                    <div
                      className="flex aspect-[4/3] items-center justify-center text-[10px] uppercase tracking-[0.3em] text-white/30"
                      style={{ background: `${accent}22` }}
                    >
                      No image
                    </div>
                  )}
                  <div className="p-4">
                    <p
                      className="text-[10px] font-mono uppercase tracking-[0.3em]"
                      style={{ color: accent }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-1 text-lg font-bold leading-tight">{card.title}</h3>
                    {card.body ? (
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/60">
                        {card.body}
                      </p>
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
            className="grid h-12 w-12 place-items-center rounded-full border border-[#00d4ff]/40 text-[#00d4ff] transition-colors hover:bg-[#00d4ff]/10"
            aria-label="Previous card"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="grid h-12 w-12 place-items-center rounded-full border border-[#00d4ff]/40 text-[#00d4ff] transition-colors hover:bg-[#00d4ff]/10"
            aria-label="Next card"
          >
            →
          </button>
        </div>
      ) : null}
    </section>
  )
}
