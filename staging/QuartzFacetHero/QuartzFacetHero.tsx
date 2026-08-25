import { motion, useReducedMotion } from 'motion/react'
import { ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { usePointerOrbit } from '@/lib/usePointerOrbit'
import { cn } from '@/lib/utils'

export interface QuartzFacetHeroProps {
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

function QuartzOctahedron() {
  const { rotation, bind, isDragging } = usePointerOrbit({
    initial: { x: 12, y: -18 },
    pitchScale: 0.85,
  })

  const faces = [
  { transform: `rotateY(0deg) translateZ(${HALF}px)`, tone: '#b8e0f0' },
  { transform: `rotateY(90deg) translateZ(${HALF}px)`, tone: '#7ec8e3' },
  { transform: `rotateY(180deg) translateZ(${HALF}px)`, tone: '#a8d8ea' },
  { transform: `rotateY(-90deg) translateZ(${HALF}px)`, tone: '#d4f1f9' },
  { transform: `rotateX(90deg) translateZ(${HALF}px)`, tone: '#e8f4fc' },
  { transform: `rotateX(-90deg) translateZ(${HALF}px)`, tone: '#5eb8d4' },
  ]

  return (
    <div
      className="relative grid h-full w-full place-items-center"
      {...bind}
      style={bind.style}
      aria-label="Quartz crystal. Click or tap, hold, and drag to rotate."
      role="img"
    >
      <div
        className="pointer-events-none absolute h-[min(55vw,300px)] w-[min(55vw,300px)] rounded-full bg-[#7ec8e3]/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[20%] h-24 w-48 rounded-full bg-white/10 blur-2xl"
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
            filter: 'drop-shadow(0 0 28px rgba(126,200,227,0.65))',
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-white/25"
              style={{
                width: SIZE,
                height: SIZE,
                background: `linear-gradient(145deg, ${face.tone}, ${face.tone}55)`,
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

export function QuartzFacetHero({
  eyebrow,
  titleLines,
  subtitle,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  className,
}: QuartzFacetHeroProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Quartz', 'facet']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-gradient-to-b from-[#1a2332] via-[#243044] to-[#1a2332] text-white',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#7ec8e3]/15 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col lg:grid lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-center px-6 pb-8 pt-20 lg:px-14 lg:pb-0 lg:pt-0">
          {eyebrow ? (
            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#7ec8e3]/80"
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
              className="mt-6 max-w-[38ch] text-sm leading-relaxed text-white/65 md:text-base"
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
                  className="inline-block border border-[#7ec8e3]/50 bg-[#7ec8e3]/15 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#e8f4fc] transition-colors hover:bg-[#7ec8e3]/25"
                >
                  {ctaLabel}
                </a>
              ) : (
                <button
                  type="button"
                  disabled={ctaDisabled}
                  className="inline-block border border-[#7ec8e3]/30 bg-[#7ec8e3]/5 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40"
                >
                  {ctaLabel}
                </button>
              )}
            </motion.div>
          ) : null}
        </div>

        <div className="relative min-h-[50svh] flex-1 lg:min-h-0">
          <QuartzOctahedron />
        </div>
      </div>
    </section>
  )
}
