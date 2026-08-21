import { motion, useReducedMotion } from 'motion/react'
import { ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { usePointerOrbit } from '@/lib/usePointerOrbit'
import { cn } from '@/lib/utils'

export interface HorizonFlareHeroProps {
  eyebrow?: string
  titleLines: string[]
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  ctaDisabled?: boolean
  className?: string
}

const ORB_SIZE = 180
const HALF = ORB_SIZE / 2

function FlareOrb() {
  const { rotation, bind, isDragging } = usePointerOrbit({
    initial: { x: -12, y: 28 },
    pitchScale: 0.85,
  })

  const faces = [
    { transform: `rotateY(0deg) translateZ(${HALF}px)`, tone: '#ffb347' },
    { transform: `rotateY(90deg) translateZ(${HALF}px)`, tone: '#ff6b35' },
    { transform: `rotateY(180deg) translateZ(${HALF}px)`, tone: '#e85d04' },
    { transform: `rotateY(-90deg) translateZ(${HALF}px)`, tone: '#ffd166' },
    { transform: `rotateX(90deg) translateZ(${HALF}px)`, tone: '#fff3cd' },
    { transform: `rotateX(-90deg) translateZ(${HALF}px)`, tone: '#c1121f' },
  ]

  return (
    <div
      className="relative grid h-full w-full place-items-center"
      {...bind}
      style={bind.style}
      aria-label="Solar flare orb. Click or tap, hold, and drag to rotate."
      role="img"
    >
      <div
        className="pointer-events-none absolute h-[min(50vw,280px)] w-[min(50vw,280px)] rounded-full bg-[#ff6b35]/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none"
        style={{ perspective: 1100, perspectiveOrigin: '50% 50%' }}
      >
        <div
          style={{
            width: ORB_SIZE,
            height: ORB_SIZE,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            filter: 'drop-shadow(0 0 24px rgba(255,107,53,0.6))',
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-white/20"
              style={{
                width: ORB_SIZE,
                height: ORB_SIZE,
                background: `linear-gradient(135deg, ${face.tone}, ${face.tone}88)`,
                transform: face.transform,
                backfaceVisibility: 'hidden',
              }}
            />
          ))}
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-2 text-[10px] uppercase tracking-[0.4em] text-white/40">
        {isDragging ? 'Orbiting' : 'Hold and drag'}
      </p>
    </div>
  )
}

export function HorizonFlareHero({
  eyebrow,
  titleLines,
  subtitle,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  className,
}: HorizonFlareHeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#0a0e27] text-white',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#ff6b35]/40 via-[#e85d04]/20 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-[62%] h-px bg-gradient-to-r from-transparent via-[#ffd166] to-transparent"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col lg:grid lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col justify-center px-6 pb-8 pt-20 lg:px-12 lg:pb-0 lg:pt-0">
          {eyebrow ? (
            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#ffd166]/80"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionDuration.standard }}
            >
              {eyebrow}
            </motion.p>
          ) : null}

          <motion.div
            className="mt-4"
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.hero, delay: 0.08 }}
          >
            <ResponsiveHeadline
              level={1}
              lines={titleLines.length ? titleLines : ['Horizon']}
              className="font-sans font-bold uppercase tracking-tight text-white"
              fontSize={72}
              lineHeight={68}
            />
          </motion.div>

          {subtitle ? (
            <motion.p
              className="mt-6 max-w-[38ch] text-base leading-relaxed text-white/70 md:text-lg"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: motionDuration.standard, delay: 0.25 }}
            >
              {subtitle}
            </motion.p>
          ) : null}

          {ctaLabel ? (
            <motion.a
              href={ctaDisabled ? undefined : (ctaHref ?? '#')}
              aria-disabled={ctaDisabled}
              className={cn(
                'mt-8 inline-flex w-fit items-center border border-[#ffd166]/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] transition-colors',
                ctaDisabled
                  ? 'cursor-not-allowed opacity-40'
                  : 'hover:bg-[#ffd166]/10 hover:text-[#ffd166]',
              )}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: motionDuration.micro, delay: 0.35 }}
            >
              {ctaLabel}
            </motion.a>
          ) : null}
        </div>

        <div className="relative min-h-[42svh] lg:min-h-[100svh]">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <FlareOrb />
          </div>
        </div>
      </div>
    </section>
  )
}
