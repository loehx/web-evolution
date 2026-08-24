import { motion, useReducedMotion } from 'motion/react'
import { ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { usePointerOrbit } from '@/lib/usePointerOrbit'
import { cn } from '@/lib/utils'

export interface AuroraCrownHeroProps {
  eyebrow?: string
  titleLines: string[]
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  ctaDisabled?: boolean
  className?: string
}

const SIZE = 120
const HALF = SIZE / 2

function AuroraCurtain({ animate }: { animate: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-[20%] top-0 h-full w-[70%] bg-gradient-to-b from-[#3dffa0]/30 via-[#8b5cf6]/20 to-transparent blur-3xl"
        animate={animate ? { x: [0, 40, 0], opacity: [0.5, 0.8, 0.5] } : undefined}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[10%] top-[10%] h-[80%] w-[60%] bg-gradient-to-b from-[#8b5cf6]/25 via-[#3dffa0]/15 to-transparent blur-3xl"
        animate={animate ? { x: [0, -30, 0], opacity: [0.4, 0.7, 0.4] } : undefined}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#0a1628] to-transparent" />
    </div>
  )
}

function CrystalCrown() {
  const { rotation, bind, isDragging } = usePointerOrbit({
    initial: { x: -8, y: 22 },
    pitchScale: 0.9,
  })

  const faces = [
    { transform: `rotateY(0deg) translateZ(${HALF}px)`, tone: '#c8f0ff' },
    { transform: `rotateY(90deg) translateZ(${HALF}px)`, tone: '#a8e0ff' },
    { transform: `rotateY(180deg) translateZ(${HALF}px)`, tone: '#d4f5ff' },
    { transform: `rotateY(-90deg) translateZ(${HALF}px)`, tone: '#9ad8ff' },
    { transform: `rotateX(90deg) translateZ(${HALF}px)`, tone: '#e8fbff' },
    { transform: `rotateX(-90deg) translateZ(${HALF}px)`, tone: '#7ec8f0' },
  ]

  return (
    <div
      className="relative grid h-full w-full place-items-center"
      {...bind}
      style={bind.style}
      aria-label="Crystal crown. Click or tap, hold, and drag to rotate."
      role="img"
    >
      <div
        className="pointer-events-none absolute h-[min(55vw,340px)] w-[min(55vw,340px)] rounded-full bg-[#3dffa0]/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none"
        style={{ perspective: 1200, perspectiveOrigin: '50% 40%' }}
      >
        <div
          style={{
            width: SIZE,
            height: SIZE,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            filter: 'drop-shadow(0 0 32px rgba(61,255,160,0.5))',
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-white/30"
              style={{
                width: SIZE,
                height: SIZE,
                background: `linear-gradient(145deg, ${face.tone}, ${face.tone}66)`,
                transform: face.transform,
                backfaceVisibility: 'hidden',
              }}
            />
          ))}
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-6 text-[10px] uppercase tracking-[0.4em] text-white/25">
        {isDragging ? 'Orbiting' : 'Hold and drag'}
      </p>
    </div>
  )
}

export function AuroraCrownHero({
  eyebrow,
  titleLines,
  subtitle,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  className,
}: AuroraCrownHeroProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Aurora', 'crown']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#0a1628] text-white',
        className,
      )}
    >
      <AuroraCurtain animate={!reduceMotion} />

      <div className="relative z-10 flex flex-1 flex-col lg:grid lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col justify-end px-6 pb-10 pt-20 lg:justify-center lg:px-14 lg:pb-0">
          {eyebrow ? (
            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#3dffa0]/70"
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
              className="mt-4 text-[clamp(2.5rem,9vw,5.5rem)] font-extrabold leading-[0.92] text-white"
            />
          </motion.div>
          {subtitle ? (
            <motion.p
              className="mt-5 max-w-[38ch] text-sm leading-relaxed text-white/55 md:text-base"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: motionDuration.standard, delay: 0.35 }}
            >
              {subtitle}
            </motion.p>
          ) : null}
          {ctaLabel ? (
            <motion.a
              href={ctaHref ?? '#'}
              aria-disabled={ctaDisabled}
              className={cn(
                'mt-8 inline-flex w-fit border border-[#3dffa0]/50 px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#3dffa0] transition hover:bg-[#3dffa0]/10',
                ctaDisabled && 'pointer-events-none opacity-40',
              )}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionDuration.standard, delay: 0.45 }}
            >
              {ctaLabel}
            </motion.a>
          ) : null}
        </div>

        <div className="relative min-h-[50svh] flex-1 lg:min-h-0">
          <CrystalCrown />
        </div>
      </div>
    </section>
  )
}
