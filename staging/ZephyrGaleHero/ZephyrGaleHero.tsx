import { motion, useReducedMotion } from 'motion/react'
import { ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { usePointerOrbit } from '@/lib/usePointerOrbit'
import { cn } from '@/lib/utils'

export interface ZephyrGaleHeroProps {
  eyebrow?: string
  titleLines: string[]
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  ctaDisabled?: boolean
  className?: string
}

const SIZE = 140
const HALF = SIZE / 2

function crystalFace(angle: number) {
  return `linear-gradient(${angle}deg, rgba(184,232,244,0.85) 0%, rgba(240,250,252,0.4) 40%, rgba(26,40,56,0.2) 100%)`
}

function WindCrystal() {
  const { rotation, bind, isDragging } = usePointerOrbit({
    initial: { x: -12, y: 18 },
    pitchScale: 0.9,
  })

  const faces = [
    { transform: `rotateY(0deg) translateZ(${HALF}px)`, angle: 30 },
    { transform: `rotateY(90deg) translateZ(${HALF}px)`, angle: 120 },
    { transform: `rotateY(180deg) translateZ(${HALF}px)`, angle: 210 },
    { transform: `rotateY(-90deg) translateZ(${HALF}px)`, angle: 300 },
    { transform: `rotateX(90deg) translateZ(${HALF}px)`, angle: 0 },
    { transform: `rotateX(-90deg) translateZ(${HALF}px)`, angle: 180 },
  ]

  return (
    <div
      className="relative grid h-full w-full place-items-center"
      {...bind}
      style={bind.style}
      aria-label="Wind crystal. Click or tap, hold, and drag to rotate."
      role="img"
    >
      <div
        className="pointer-events-none absolute h-[min(55vw,300px)] w-[min(55vw,300px)] rounded-full bg-[#b8e8f4]/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none"
        style={{ perspective: 1200, perspectiveOrigin: '50% 42%' }}
      >
        <div
          style={{
            width: SIZE,
            height: SIZE,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            filter: 'drop-shadow(0 16px 40px rgba(184,232,244,0.35))',
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-white/20 backdrop-blur-sm"
              style={{
                width: SIZE,
                height: SIZE,
                background: crystalFace(face.angle),
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

function GaleStreaks({ animate }: { animate: boolean }) {
  const streaks = Array.from({ length: 18 }, (_, i) => ({
    top: `${8 + (i * 5.2) % 85}%`,
    width: 80 + (i % 4) * 40,
    delay: (i * 0.15) % 2.5,
    opacity: 0.15 + (i % 3) * 0.1,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {streaks.map((streak, i) => (
        <motion.div
          key={i}
          className="absolute left-0 h-px bg-gradient-to-r from-transparent via-[#b8e8f4]/60 to-transparent"
          style={{ top: streak.top, width: `${streak.width}%`, opacity: streak.opacity }}
          animate={
            animate
              ? { x: ['-20%', '120%'], opacity: [0, streak.opacity, 0] }
              : { x: '0%', opacity: streak.opacity * 0.5 }
          }
          transition={{
            duration: motionDuration.emphasis * 1.5,
            delay: streak.delay,
            repeat: animate ? Infinity : 0,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export function ZephyrGaleHero({
  eyebrow,
  titleLines,
  subtitle,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  className,
}: ZephyrGaleHeroProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Zephyr', 'gale']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-gradient-to-br from-[#1a2838] via-[#243850] to-[#1a2838] text-[#f0fafc] lg:grid lg:grid-cols-2',
        className,
      )}
    >
      <GaleStreaks animate={!reduceMotion} />

      <div className="relative z-10 flex flex-col justify-center px-6 py-20 lg:px-14 lg:py-24">
        {eyebrow ? (
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#b8e8f4]/70"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard }}
          >
            {eyebrow}
          </motion.p>
        ) : null}

        <motion.div
          className="mt-4"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionDuration.hero }}
        >
          <ResponsiveHeadline
            level={1}
            lines={displayLines}
            className="text-[#f0fafc]"
            fontSize={76}
            lineHeight={80}
          />
        </motion.div>

        {subtitle ? (
          <motion.p
            className="mt-6 max-w-[40ch] text-sm leading-relaxed text-[#f0fafc]/60 md:text-base"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionDuration.standard, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        ) : null}

        {ctaLabel && ctaHref ? (
          <motion.a
            href={ctaHref}
            aria-disabled={ctaDisabled}
            className={cn(
              'mt-8 inline-block rounded-sm border border-[#b8e8f4]/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#b8e8f4] transition hover:bg-[#b8e8f4]/10',
              ctaDisabled && 'pointer-events-none opacity-40',
            )}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionDuration.standard, delay: 0.3 }}
          >
            {ctaLabel}
          </motion.a>
        ) : null}
      </div>

      <div className="relative min-h-[50svh] lg:min-h-[100svh]">
        <WindCrystal />
      </div>
    </section>
  )
}
