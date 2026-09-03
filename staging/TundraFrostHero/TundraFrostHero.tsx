import { motion, useReducedMotion } from 'motion/react'
import { ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { usePointerOrbit } from '@/lib/usePointerOrbit'
import { cn } from '@/lib/utils'

export interface TundraFrostHeroProps {
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

function FrostOctahedron() {
  const { rotation, bind, isDragging } = usePointerOrbit({
    initial: { x: 8, y: -14 },
    pitchScale: 0.85,
  })

  const faces = Array.from({ length: 8 }, (_, i) => ({
    transform: `rotateY(${i * 45}deg) translateZ(${HALF}px)`,
    hue: 190 + (i % 4) * 12,
  }))

  return (
    <div
      className="relative grid h-full w-full place-items-center"
      {...bind}
      style={bind.style}
      aria-label="Frost crystal. Click or tap, hold, and drag to rotate."
      role="img"
    >
      <div
        className="pointer-events-none absolute h-[min(60vw,320px)] w-[min(60vw,320px)] rounded-full bg-[#a8e6ff]/20 blur-3xl"
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
            filter: 'drop-shadow(0 0 40px rgba(168,230,255,0.55))',
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-[#a8e6ff]/50"
              style={{
                width: SIZE,
                height: SIZE,
                background: `linear-gradient(135deg, hsla(${face.hue},80%,75%,0.75) 0%, hsla(${face.hue},60%,25%,0.35) 100%)`,
                transform: face.transform,
                backfaceVisibility: 'hidden',
              }}
            />
          ))}
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-4 text-[10px] uppercase tracking-[0.4em] text-[#f0f8ff]/35">
        {isDragging ? 'Orbiting' : 'Hold and drag'}
      </p>
    </div>
  )
}

function AuroraMist({ animate }: { animate: boolean }) {
  const blobs = Array.from({ length: 6 }, (_, i) => ({
    left: `${(i * 19) % 85}%`,
    top: `${(i * 27) % 75}%`,
    size: 100 + (i % 3) * 60,
    delay: i * 0.35,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            left: blob.left,
            top: blob.top,
            width: blob.size,
            height: blob.size,
            background: 'radial-gradient(circle, rgba(168,230,255,0.18) 0%, transparent 70%)',
          }}
          animate={
            animate
              ? { scale: [1, 1.15, 1], opacity: [0.2, 0.45, 0.2] }
              : { opacity: 0.25 }
          }
          transition={{
            duration: motionDuration.emphasis * 2,
            delay: blob.delay,
            repeat: animate ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function TundraFrostHero({
  eyebrow,
  titleLines,
  subtitle,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  className,
}: TundraFrostHeroProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Tundra', 'frost']

  return (
    <section
      className={cn(
        'relative grid min-h-[100svh] w-full grid-rows-[1fr_auto] overflow-hidden bg-[#0a1420] text-[#f0f8ff] lg:grid-cols-2 lg:grid-rows-1',
        className,
      )}
    >
      <AuroraMist animate={!reduceMotion} />

      <motion.div
        className="relative z-10 flex flex-col justify-center px-6 py-16 lg:px-12 lg:py-20"
        initial={reduceMotion ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionDuration.hero }}
      >
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#a8e6ff]/70">
            {eyebrow}
          </p>
        ) : null}
        <div className="mt-4 max-w-[14ch]">
          <ResponsiveHeadline level={1} lines={displayLines} className="text-[#f0f8ff]" />
        </div>
        {subtitle ? (
          <p className="mt-6 max-w-[36ch] text-sm leading-relaxed text-[#f0f8ff]/70 md:text-base">
            {subtitle}
          </p>
        ) : null}
        {ctaLabel ? (
          <a
            href={ctaHref ?? '#'}
            aria-disabled={ctaDisabled}
            className={cn(
              'mt-8 inline-flex w-fit border border-[#a8e6ff] px-6 py-3 text-xs uppercase tracking-[0.3em] transition-colors',
              ctaDisabled
                ? 'pointer-events-none opacity-40'
                : 'hover:bg-[#a8e6ff]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a8e6ff]',
            )}
          >
            {ctaLabel}
          </a>
        ) : null}
      </motion.div>

      <div className="relative z-10 min-h-[50svh] lg:min-h-0">
        <FrostOctahedron />
      </div>
    </section>
  )
}
