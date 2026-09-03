import { motion, useReducedMotion } from 'motion/react'
import { ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { usePointerOrbit } from '@/lib/usePointerOrbit'
import { cn } from '@/lib/utils'

export interface GneissStormHeroProps {
  eyebrow?: string
  titleLines: string[]
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  ctaDisabled?: boolean
  className?: string
}

const SIZE = 150
const HALF = SIZE / 2

function gneissGradient(angle: number) {
  return `repeating-linear-gradient(${angle}deg, #c4a4a4 0px, #c4a4a4 8px, #8a8a90 8px, #8a8a90 16px, #d4b8b8 16px, #d4b8b8 22px, #6a6a70 22px, #6a6a70 30px)`
}

function GneissBoulder() {
  const { rotation, bind, isDragging } = usePointerOrbit({
    initial: { x: 8, y: -14 },
    pitchScale: 0.85,
  })

  const faces = [
    { transform: `rotateY(0deg) translateZ(${HALF}px)`, angle: 45 },
    { transform: `rotateY(90deg) translateZ(${HALF}px)`, angle: 135 },
    { transform: `rotateY(180deg) translateZ(${HALF}px)`, angle: 225 },
    { transform: `rotateY(-90deg) translateZ(${HALF}px)`, angle: 315 },
    { transform: `rotateX(90deg) translateZ(${HALF}px)`, angle: 0 },
    { transform: `rotateX(-90deg) translateZ(${HALF}px)`, angle: 90 },
  ]

  return (
    <div
      className="relative grid h-full w-full place-items-center"
      {...bind}
      style={bind.style}
      aria-label="Gneiss boulder. Click or tap, hold, and drag to rotate."
      role="img"
    >
      <div
        className="pointer-events-none absolute h-[min(50vw,280px)] w-[min(50vw,280px)] rounded-full bg-[#c4a4a4]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none"
        style={{ perspective: 1100, perspectiveOrigin: '50% 45%' }}
      >
        <div
          style={{
            width: SIZE,
            height: SIZE,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.55))',
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-white/10"
              style={{
                width: SIZE,
                height: SIZE,
                background: gneissGradient(face.angle),
                transform: face.transform,
                backfaceVisibility: 'hidden',
              }}
            />
          ))}
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-4 text-[10px] uppercase tracking-[0.4em] text-white/35">
        {isDragging ? 'Orbiting' : 'Hold and drag'}
      </p>
    </div>
  )
}

function RainCurtain({ animate }: { animate: boolean }) {
  const streaks = Array.from({ length: 24 }, (_, i) => ({
    left: `${(i * 4.3) % 100}%`,
    delay: (i * 0.12) % 1.8,
    height: 40 + (i % 5) * 12,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {streaks.map((streak, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent"
          style={{ left: streak.left, height: `${streak.height}%` }}
          animate={
            animate
              ? { y: ['-100%', '200%'], opacity: [0, 0.6, 0] }
              : { y: '0%', opacity: 0.15 }
          }
          transition={{
            duration: motionDuration.emphasis,
            delay: streak.delay,
            repeat: animate ? Infinity : 0,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export function GneissStormHero({
  eyebrow,
  titleLines,
  subtitle,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  className,
}: GneissStormHeroProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Gneiss', 'storm']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-gradient-to-br from-[#1a1e24] via-[#2a2f38] to-[#1a1e24] text-white',
        className,
      )}
    >
      <RainCurtain animate={!reduceMotion} />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.04)_50%,transparent_60%)]"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col lg:grid lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-center px-6 pb-8 pt-20 lg:px-14 lg:pb-0 lg:pt-0">
          {eyebrow ? (
            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#c4a4a4]/80"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionDuration.standard }}
            >
              {eyebrow}
            </motion.p>
          ) : null}

          <motion.div
            className="mt-4"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.hero }}
          >
            <ResponsiveHeadline
              level={1}
              lines={displayLines}
              className="text-white"
              fontSize={88}
              lineHeight={92}
            />
          </motion.div>

          {subtitle ? (
            <motion.p
              className="mt-6 max-w-[38ch] text-sm leading-relaxed text-white/60 md:text-base"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: motionDuration.standard, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          ) : null}

          {ctaLabel ? (
            <motion.div
              className="mt-8"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionDuration.standard, delay: 0.3 }}
            >
              {ctaHref && !ctaDisabled ? (
                <a
                  href={ctaHref}
                  className="inline-block border border-[#c4a4a4]/50 bg-[#c4a4a4]/10 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#e8ecef] transition-colors hover:bg-[#c4a4a4]/20"
                >
                  {ctaLabel}
                </a>
              ) : (
                <button
                  type="button"
                  disabled={ctaDisabled}
                  className="inline-block border border-[#c4a4a4]/30 bg-[#c4a4a4]/5 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40"
                >
                  {ctaLabel}
                </button>
              )}
            </motion.div>
          ) : null}
        </div>

        <div className="relative min-h-[50svh] flex-1 lg:min-h-0">
          <GneissBoulder />
        </div>
      </div>
    </section>
  )
}
