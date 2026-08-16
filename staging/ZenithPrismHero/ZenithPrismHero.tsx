import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { motionDuration } from '@/lib/motion'
import { usePointerOrbit } from '@/lib/usePointerOrbit'
import { ResponsiveHeadline } from '@/components/primitives'

export interface ZenithPrismHeroProps {
  eyebrow?: string
  title?: string
  titleLines?: string[]
  subtitle?: string
  ctaLabel?: string
  onCtaClick?: () => void
  className?: string
}

const PRISM_SIZE = 200
const HALF = PRISM_SIZE / 2

function PrismModel() {
  const { rotation, bind, isDragging } = usePointerOrbit({
    initial: { x: -18, y: 24 },
    inertia: true,
  })

  const faces = [
    { transform: `rotateY(0deg) translateZ(${HALF * 0.6}px)`, gradient: 'from-fuchsia-500/80 via-violet-500/60 to-transparent' },
    { transform: `rotateY(120deg) translateZ(${HALF * 0.6}px)`, gradient: 'from-cyan-400/80 via-sky-500/60 to-transparent' },
    { transform: `rotateY(240deg) translateZ(${HALF * 0.6}px)`, gradient: 'from-amber-400/80 via-orange-500/60 to-transparent' },
  ]

  return (
    <div
      className="relative grid h-full min-h-[55svh] w-full place-items-center md:min-h-[100svh]"
      {...bind}
      style={bind.style}
      aria-label="3D glass prism. Click or tap, hold, and drag to rotate."
      role="img"
    >
      <div
        className="pointer-events-none absolute h-[70%] w-[70%] rounded-full opacity-40 blur-3xl"
        style={{
          background: 'conic-gradient(from 180deg, #ff00aa, #00d4ff, #ffcc00, #ff00aa)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none"
        style={{ perspective: 1200, perspectiveOrigin: '50% 45%' }}
      >
        <div
          className="relative"
          style={{
            width: PRISM_SIZE,
            height: PRISM_SIZE * 1.2,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              className={cn(
                'absolute inset-0 border border-white/20 bg-gradient-to-b backdrop-blur-sm',
                face.gradient,
              )}
              style={{
                width: PRISM_SIZE,
                height: PRISM_SIZE * 1.2,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                transform: face.transform,
                backfaceVisibility: 'hidden',
              }}
            />
          ))}
          <div
            className="absolute border border-white/30 bg-white/5"
            style={{
              width: PRISM_SIZE,
              height: PRISM_SIZE * 0.35,
              transform: `rotateX(90deg) translateZ(${PRISM_SIZE * 0.35}px)`,
              backfaceVisibility: 'hidden',
            }}
          />
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-8 text-[10px] uppercase tracking-[0.45em] text-white/40">
        {isDragging ? 'Orbiting' : 'Hold and drag'}
      </p>
    </div>
  )
}

export function ZenithPrismHero({
  eyebrow,
  title,
  titleLines,
  subtitle,
  ctaLabel,
  onCtaClick,
  className,
}: ZenithPrismHeroProps) {
  const reduceMotion = useReducedMotion()
  const lines = titleLines ?? (title ? [title] : [])

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#070b14] text-white md:flex-row',
        className,
      )}
    >
      <motion.div
        className="flex flex-col justify-center px-5 py-16 md:w-5/12 md:px-10 md:py-0 lg:px-14"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionDuration.hero, ease: [0.22, 1, 0.36, 1] }}
      >
        {eyebrow ? (
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-white/45">
            {eyebrow}
          </p>
        ) : null}
        <div className="mt-4 md:mt-6">
          {title ? (
            <ResponsiveHeadline
              level={1}
              lines={lines}
              className="text-white"
              fontSize={88}
              lineHeight={96}
            />
          ) : (
            <span className="sr-only">Untitled</span>
          )}
        </div>
        {subtitle ? (
          <p className="mt-6 max-w-[32ch] text-base leading-relaxed text-white/65 md:text-lg">
            {subtitle}
          </p>
        ) : null}
        {ctaLabel ? (
          <button
            type="button"
            onClick={onCtaClick}
            className="mt-8 w-fit border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition-colors hover:bg-white hover:text-[#070b14]"
          >
            {ctaLabel}
          </button>
        ) : null}
      </motion.div>

      <motion.div
        className="relative min-h-[55svh] flex-1 md:min-h-[100svh]"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: motionDuration.hero, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <PrismModel />
      </motion.div>
    </section>
  )
}
