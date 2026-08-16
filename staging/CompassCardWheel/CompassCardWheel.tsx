import { useCallback, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { RatioImage } from '@/components/primitives'

export interface CompassCard {
  image?: string
  title: string
  body?: string
  index?: string
}

export interface CompassCardWheelProps {
  eyebrow?: string
  title?: string
  cards: CompassCard[]
  className?: string
}

function normalizeAngle(deg: number) {
  return ((deg % 360) + 360) % 360
}

export function CompassCardWheel({
  eyebrow,
  title,
  cards,
  className,
}: CompassCardWheelProps) {
  const reduceMotion = useReducedMotion()
  const [rotation, setRotation] = useState(0)
  const dragStart = useRef({ angle: 0, rotation: 0 })
  const wheelRef = useRef<HTMLDivElement>(null)
  const count = Math.max(cards.length, 1)
  const slice = 360 / count

  const activeIndex = normalizeAngle(Math.round(-rotation / slice)) % count

  const rotateBy = useCallback(
    (delta: number) => {
      setRotation((r) => r + delta)
    },
    [],
  )

  const getAngleFromCenter = useCallback((clientX: number, clientY: number) => {
    const el = wheelRef.current
    if (!el) return 0
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI
  }, [])

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      dragStart.current = {
        angle: getAngleFromCenter(e.clientX, e.clientY),
        rotation,
      }
    },
    [getAngleFromCenter, rotation],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
      const angle = getAngleFromCenter(e.clientX, e.clientY)
      const delta = angle - dragStart.current.angle
      setRotation(dragStart.current.rotation + delta)
    },
    [getAngleFromCenter],
  )

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    setRotation((r) => {
      const snapped = -Math.round(r / slice) * slice
      return reduceMotion ? snapped : snapped
    })
  }, [reduceMotion, slice])

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col bg-[#1a1f2e] text-[#e8f5ee]',
        className,
      )}
    >
      <header className="px-5 pt-14 md:px-10 md:pt-16">
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#39ff88]/70">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-2 max-w-[18ch] text-3xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h2>
        ) : null}
      </header>

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 pb-16">
        <div className="absolute top-8 left-1/2 h-8 w-0.5 -translate-x-1/2 bg-[#39ff88]" aria-hidden />

        <div
          ref={wheelRef}
          className="relative grid h-[min(72vw,520px)] w-[min(72vw,520px)] place-items-center touch-none"
          style={{ touchAction: 'none', cursor: 'grab' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-label="Rotate the compass wheel to browse cards"
          role="group"
        >
          <div
            className="absolute inset-0 rounded-full border border-[#39ff88]/25"
            aria-hidden
          />
          <div
            className="absolute inset-[12%] rounded-full border border-dashed border-white/10"
            aria-hidden
          />

          <motion.div
            className="absolute inset-0"
            animate={{ rotate: rotation }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 120, damping: 18 }
            }
          >
            {cards.map((card, i) => {
              const angle = i * slice
              const isActive = i === activeIndex
              return (
                <article
                  key={`${card.title}-${i}`}
                  className={cn(
                    'absolute top-1/2 left-1/2 w-[min(42vw,220px)] -translate-x-1/2 -translate-y-1/2',
                    isActive ? 'z-20' : 'z-10 opacity-70',
                  )}
                  style={{
                    transform: `rotate(${angle}deg) translateY(-140px) rotate(${-angle}deg)`,
                  }}
                >
                  <div
                    className={cn(
                      'overflow-hidden border bg-[#0f131c] transition-transform',
                      isActive
                        ? 'border-[#39ff88] scale-105'
                        : 'border-white/15 scale-95',
                    )}
                  >
                    <RatioImage src={card.image} alt="" ratio="4/3" />
                    <div className="p-3 md:p-4">
                      <p className="font-mono text-[9px] text-[#39ff88]/80">
                        {card.index ?? String(i + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold leading-tight md:text-base">
                        {card.title}
                      </h3>
                      {card.body ? (
                        <p className="mt-1 line-clamp-2 text-xs text-white/55">{card.body}</p>
                      ) : null}
                    </div>
                  </div>
                </article>
              )
            })}
          </motion.div>

          {cards.length === 0 ? (
            <p className="text-sm text-white/40">No cards on this wheel.</p>
          ) : null}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            aria-label="Rotate counter-clockwise"
            onClick={() => rotateBy(slice)}
            className="grid h-11 w-11 place-items-center border border-[#39ff88]/40 font-mono text-sm hover:bg-[#39ff88]/10"
          >
            ↺
          </button>
          <button
            type="button"
            aria-label="Rotate clockwise"
            onClick={() => rotateBy(-slice)}
            className="grid h-11 w-11 place-items-center border border-[#39ff88]/40 font-mono text-sm hover:bg-[#39ff88]/10"
          >
            ↻
          </button>
        </div>
      </div>
    </section>
  )
}
