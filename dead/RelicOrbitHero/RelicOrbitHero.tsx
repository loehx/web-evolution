import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { motionDuration } from '@/lib/motion'
import { usePointerOrbit } from '@/lib/usePointerOrbit'

export interface RelicOrbitHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  ctaLabel?: string
  onCtaClick?: () => void
  className?: string
}

const FACE_SIZE = 220
const HALF = FACE_SIZE / 2

const faces: { label: string; transform: string; tone: string }[] = [
  { label: 'N', transform: `rotateY(0deg) translateZ(${HALF}px)`, tone: '#c45c26' },
  { label: 'S', transform: `rotateY(180deg) translateZ(${HALF}px)`, tone: '#8a3d18' },
  { label: 'E', transform: `rotateY(90deg) translateZ(${HALF}px)`, tone: '#d4a574' },
  { label: 'W', transform: `rotateY(-90deg) translateZ(${HALF}px)`, tone: '#6b3a22' },
  { label: 'ZENITH', transform: `rotateX(90deg) translateZ(${HALF}px)`, tone: '#f4e8d0' },
  { label: 'NADIR', transform: `rotateX(-90deg) translateZ(${HALF}px)`, tone: '#2a2018' },
]

function RelicModel() {
  const { rotation, bind, isDragging } = usePointerOrbit({
    initial: { x: -22, y: 32 },
  })

  return (
    <div
      className="relative grid h-full min-h-[50svh] w-full place-items-center"
      {...bind}
      style={bind.style}
      aria-label="3D relic. Click or tap, hold, and drag to rotate."
      role="img"
    >
      <div
        className="pointer-events-none"
        style={{ perspective: 1100, perspectiveOrigin: '50% 45%' }}
      >
        <div
          className="relative"
          style={{
            width: FACE_SIZE,
            height: FACE_SIZE,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {faces.map((face) => (
            <div
              key={face.label}
              className="absolute inset-0 grid place-items-center border border-black/40 font-sans text-xs font-semibold tracking-[0.35em] text-black/80"
              style={{
                width: FACE_SIZE,
                height: FACE_SIZE,
                background: face.tone,
                transform: face.transform,
                backfaceVisibility: 'hidden',
              }}
            >
              {face.label}
            </div>
          ))}
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-[#f4e8d0]/50 md:bottom-10">
        {isDragging ? 'Orbiting' : 'Hold and drag'}
      </p>
    </div>
  )
}

export function RelicOrbitHero({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
  className,
}: RelicOrbitHeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className={cn(
        'relative min-h-[100svh] w-full overflow-hidden bg-[#1a1410] text-[#f4e8d0]',
        className,
      )}
    >
      <motion.div
        className="absolute inset-0 md:left-[32%] md:right-0"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : motionDuration.hero, ease: [0.16, 1, 0.3, 1] }}
      >
        <RelicModel />
      </motion.div>

      <div className="relative z-10 flex min-h-[100svh] w-full flex-col justify-end p-5 pb-24 md:w-[42%] md:justify-end md:p-10 md:pb-16">
        {eyebrow ? (
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-[#c45c26]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-[18ch] text-balance text-5xl font-semibold leading-[0.88] tracking-tight md:text-7xl lg:text-[5.5rem]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-[#f4e8d0]/70 md:text-base">
            {subtitle}
          </p>
        ) : null}
        {ctaLabel ? (
          <button
            type="button"
            onClick={onCtaClick}
            className="mt-8 w-fit border border-[#c45c26] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#c45c26] transition-colors duration-[var(--duration-micro)] hover:bg-[#c45c26] hover:text-[#1a1410]"
          >
            {ctaLabel}
          </button>
        ) : null}
      </div>
    </section>
  )
}
