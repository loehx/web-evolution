import { motion, useReducedMotion } from 'motion/react'
import { ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { usePointerOrbit } from '@/lib/usePointerOrbit'
import { cn } from '@/lib/utils'

export interface ObsidianRiftHeroProps {
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

function ObsidianShard() {
  const { rotation, bind, isDragging } = usePointerOrbit({
    initial: { x: 12, y: -18 },
    pitchScale: 0.85,
  })

  const faces = [
    { transform: `rotateY(0deg) translateZ(${HALF}px)`, tone: '#1a1a2e' },
    { transform: `rotateY(90deg) translateZ(${HALF}px)`, tone: '#0f0f18' },
    { transform: `rotateY(180deg) translateZ(${HALF}px)`, tone: '#252538' },
    { transform: `rotateY(-90deg) translateZ(${HALF}px)`, tone: '#12121c' },
    { transform: `rotateX(90deg) translateZ(${HALF}px)`, tone: '#2a2a40' },
    { transform: `rotateX(-90deg) translateZ(${HALF}px)`, tone: '#0a0a10' },
  ]

  return (
    <div
      className="relative grid h-full w-full place-items-center"
      {...bind}
      style={bind.style}
      aria-label="Obsidian shard. Click or tap, hold, and drag to rotate."
      role="img"
    >
      <div
        className="pointer-events-none absolute h-[min(50vw,300px)] w-[min(50vw,300px)] rounded-full bg-[#6b4ce6]/20 blur-3xl"
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
            filter: 'drop-shadow(0 0 28px rgba(107,76,230,0.55))',
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-white/10"
              style={{
                width: SIZE,
                height: SIZE,
                background: `linear-gradient(160deg, ${face.tone}, ${face.tone}88)`,
                transform: face.transform,
                backfaceVisibility: 'hidden',
              }}
            />
          ))}
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-4 text-[10px] uppercase tracking-[0.4em] text-white/30">
        {isDragging ? 'Orbiting' : 'Hold and drag'}
      </p>
    </div>
  )
}

export function ObsidianRiftHero({
  eyebrow,
  titleLines,
  subtitle,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  className,
}: ObsidianRiftHeroProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Obsidian', 'rift']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#0d0d12] text-white',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_45%,#6b4ce6/25_50%,transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-[38%] w-px bg-gradient-to-b from-transparent via-[#6b4ce6]/60 to-transparent lg:left-[42%]"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col lg:grid lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col justify-end px-6 pb-10 pt-20 lg:justify-center lg:px-14 lg:pb-0 lg:pt-0">
          {eyebrow ? (
            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#6b4ce6]/70"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionDuration.standard }}
            >
              {eyebrow}
            </motion.p>
          ) : null}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.hero, delay: 0.1 }}
          >
            <ResponsiveHeadline
              level={1}
              lines={displayLines}
              className="mt-3 text-[clamp(2.5rem,9vw,6rem)] font-black uppercase leading-[0.88] tracking-tight text-white"
            />
          </motion.div>
          {subtitle ? (
            <motion.p
              className="mt-5 max-w-[36ch] text-sm leading-relaxed text-white/55"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: motionDuration.standard, delay: 0.25 }}
            >
              {subtitle}
            </motion.p>
          ) : null}
          {ctaLabel ? (
            <motion.a
              href={ctaHref ?? '#'}
              className={cn(
                'mt-8 inline-flex w-fit border border-[#6b4ce6]/50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-[#6b4ce6]/15',
                ctaDisabled && 'pointer-events-none opacity-40',
              )}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionDuration.standard, delay: 0.35 }}
              aria-disabled={ctaDisabled}
            >
              {ctaLabel}
            </motion.a>
          ) : null}
        </div>

        <motion.div
          className="relative min-h-[50svh] flex-1 lg:min-h-[100svh]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: motionDuration.hero, delay: 0.15 }}
        >
          <ObsidianShard />
        </motion.div>
      </div>
    </section>
  )
}
