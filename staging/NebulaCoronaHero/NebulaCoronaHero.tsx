import { motion, useReducedMotion } from 'motion/react'
import { ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { usePointerOrbit } from '@/lib/usePointerOrbit'
import { cn } from '@/lib/utils'

export interface NebulaCoronaHeroProps {
  eyebrow?: string
  titleLines: string[]
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  ctaDisabled?: boolean
  className?: string
}

const SIZE = 130
const HALF = SIZE / 2

function CoronaIcosahedron() {
  const { rotation, bind, isDragging } = usePointerOrbit({
    initial: { x: -8, y: 22 },
    pitchScale: 0.85,
  })

  const faces = [
    { transform: `rotateY(0deg) translateZ(${HALF}px)`, hue: 280 },
    { transform: `rotateY(72deg) translateZ(${HALF}px)`, hue: 300 },
    { transform: `rotateY(144deg) translateZ(${HALF}px)`, hue: 320 },
    { transform: `rotateY(216deg) translateZ(${HALF}px)`, hue: 290 },
    { transform: `rotateY(288deg) translateZ(${HALF}px)`, hue: 310 },
    { transform: `rotateX(63.4deg) translateZ(${HALF * 0.85}px)`, hue: 270 },
    { transform: `rotateX(-63.4deg) translateZ(${HALF * 0.85}px)`, hue: 330 },
  ]

  return (
    <div
      className="relative grid h-full w-full place-items-center"
      {...bind}
      style={bind.style}
      aria-label="Corona sphere. Click or tap, hold, and drag to rotate."
      role="img"
    >
      <div
        className="pointer-events-none absolute h-[min(60vw,320px)] w-[min(60vw,320px)] rounded-full bg-[#e040fb]/20 blur-3xl"
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
            filter: 'drop-shadow(0 0 40px rgba(224,64,251,0.5))',
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-[#e040fb]/40"
              style={{
                width: SIZE,
                height: SIZE,
                background: `linear-gradient(135deg, hsla(${face.hue},80%,65%,0.7) 0%, hsla(${face.hue},60%,25%,0.3) 100%)`,
                transform: face.transform,
                backfaceVisibility: 'hidden',
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
              }}
            />
          ))}
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-4 text-[10px] uppercase tracking-[0.4em] text-[#f8f4ff]/35">
        {isDragging ? 'Orbiting' : 'Hold and drag'}
      </p>
    </div>
  )
}

function NebulaClouds({ animate }: { animate: boolean }) {
  const clouds = Array.from({ length: 8 }, (_, i) => ({
    left: `${(i * 17) % 90}%`,
    top: `${(i * 23) % 80}%`,
    size: 120 + (i % 3) * 80,
    delay: i * 0.4,
    hue: 270 + (i % 4) * 15,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {clouds.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            left: cloud.left,
            top: cloud.top,
            width: cloud.size,
            height: cloud.size,
            background: `radial-gradient(circle, hsla(${cloud.hue},70%,50%,0.25) 0%, transparent 70%)`,
          }}
          animate={
            animate
              ? {
                  x: [0, 20, -10, 0],
                  y: [0, -15, 10, 0],
                  opacity: [0.3, 0.6, 0.4, 0.3],
                }
              : { opacity: 0.35 }
          }
          transition={{
            duration: motionDuration.emphasis * 2.5,
            delay: cloud.delay,
            repeat: animate ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function StarField() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    size: 1 + (i % 3),
    opacity: 0.2 + (i % 5) * 0.12,
  }))

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}

export function NebulaCoronaHero({
  eyebrow,
  titleLines,
  subtitle,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  className,
}: NebulaCoronaHeroProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Nebula', 'corona']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-gradient-to-b from-[#0a0514] via-[#1a0a2e] to-[#0d0618] text-[#f8f4ff] lg:flex-row',
        className,
      )}
    >
      <StarField />
      <NebulaClouds animate={!reduceMotion} />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-20 md:px-12 lg:px-16">
        {eyebrow ? (
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#e040fb]/70"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard }}
          >
            {eyebrow}
          </motion.p>
        ) : null}
        <motion.div
          className="mt-4 max-w-[14ch]"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionDuration.hero, delay: reduceMotion ? 0 : 0.1 }}
        >
          <ResponsiveHeadline
            level={1}
            lines={displayLines}
            className="text-[#f8f4ff]"
          />
        </motion.div>
        {subtitle ? (
          <motion.p
            className="mt-6 max-w-md text-sm leading-relaxed text-[#f8f4ff]/60 md:text-base"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard, delay: reduceMotion ? 0 : 0.25 }}
          >
            {subtitle}
          </motion.p>
        ) : null}
        {ctaLabel && ctaHref ? (
          <motion.a
            href={ctaHref}
            aria-disabled={ctaDisabled}
            className={cn(
              'mt-8 inline-flex w-fit border border-[#e040fb]/50 px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#f8f4ff] transition-colors hover:bg-[#e040fb]/15',
              ctaDisabled && 'pointer-events-none opacity-40',
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard, delay: reduceMotion ? 0 : 0.35 }}
          >
            {ctaLabel}
          </motion.a>
        ) : null}
      </div>

      <div className="relative z-10 min-h-[50svh] flex-1 lg:min-h-0">
        <CoronaIcosahedron />
      </div>
    </section>
  )
}
