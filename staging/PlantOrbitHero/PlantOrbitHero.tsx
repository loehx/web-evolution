import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { motionDuration } from '@/lib/motion'
import { useInView } from '@/lib/useInView'
import { usePointerOrbit } from '@/lib/usePointerOrbit'
import { DEFAULT_PLANT, type PlantId } from './plants'

const PlantOrbitScene = lazy(() =>
  import('./PlantOrbitScene').then((module) => ({ default: module.PlantOrbitScene })),
)

export type { PlantId } from './plants'

export interface PlantOrbitHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  ctaLabel?: string
  onCtaClick?: () => void
  plant?: PlantId
  className?: string
}

function PlantPulseFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-pulse rounded-full border border-[#6b9e72]/30 bg-[#1e3424]/60" />
    </div>
  )
}

/** ~40% viewport margin so the next gallery variant can preload before scroll. */
function useNearViewportRootMargin(ratio = 0.4) {
  const [rootMargin, setRootMargin] = useState(() => {
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800
    return `${Math.round(vh * ratio)}px 0px`
  })

  useEffect(() => {
    const update = () =>
      setRootMargin(`${Math.round(window.innerHeight * ratio)}px 0px`)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [ratio])

  return rootMargin
}

function PlantStage({ plant }: { plant: PlantId }) {
  const reduceMotion = useReducedMotion()
  const rootMargin = useNearViewportRootMargin()
  const { ref, inView } = useInView(rootMargin)
  const { radians, bind, isDragging } = usePointerOrbit({
    initial: { x: -12, y: 28 },
  })

  return (
    <div
      ref={ref}
      className="relative h-full min-h-[50svh] w-full"
      {...bind}
      style={bind.style}
      aria-label="3D plant specimen. Click or tap, hold, and drag to rotate."
      role="img"
    >
      <div className="pointer-events-none absolute inset-0">
        {inView ? (
          <Suspense fallback={<PlantPulseFallback />}>
            <PlantOrbitScene
              plant={plant}
              radians={radians}
              autoRotate={!reduceMotion}
              isDragging={isDragging}
            />
          </Suspense>
        ) : (
          <PlantPulseFallback />
        )}
      </div>

      {/* Vitrine corner marks */}
      <div className="pointer-events-none absolute inset-6 hidden border border-[#8fb996]/20 md:block" />
      <div className="pointer-events-none absolute right-8 top-8 hidden h-12 w-12 border-r border-t border-[#c9a96e]/40 md:block" />
      <div className="pointer-events-none absolute bottom-8 left-8 hidden h-12 w-12 border-b border-l border-[#c9a96e]/40 md:block" />

      <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-[#8fb996]/55 md:bottom-10">
        {isDragging ? 'Orbiting' : 'Hold and drag'}
      </p>
    </div>
  )
}

export function PlantOrbitHero({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
  plant = DEFAULT_PLANT,
  className,
}: PlantOrbitHeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className={cn(
        'relative min-h-[100svh] w-full overflow-hidden bg-[#0f1a12] text-[#e4efe6]',
        className,
      )}
    >
      {/* Moss theater atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#0a120c_0%,#14281a_45%,#0d1810_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_72%_38%,rgba(74,124,89,0.22),transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(200,220,200,0.15)_2px,rgba(200,220,200,0.15)_3px)]"
        aria-hidden
      />

      <motion.div
        className="absolute inset-0 md:left-[32%] md:right-0"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : motionDuration.hero,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <PlantStage plant={plant} />
      </motion.div>

      <div className="pointer-events-none relative z-10 flex min-h-[100svh] w-full flex-col justify-end p-5 pb-24 md:w-[42%] md:p-10 md:pb-16">
        {eyebrow ? (
          <p className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.45em] text-[#8fb996]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-[16ch] font-['Cormorant_Garamond',Georgia,serif] text-5xl font-semibold leading-[0.9] tracking-tight text-balance md:text-7xl lg:text-[5.25rem]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-[36ch] font-sans text-sm leading-relaxed text-[#c8d8cc]/75 md:text-base">
            {subtitle}
          </p>
        ) : null}
        {ctaLabel ? (
          <button
            type="button"
            onClick={onCtaClick}
            className="pointer-events-auto mt-8 w-fit border border-[#c9a96e]/70 px-6 py-3 font-sans text-xs uppercase tracking-[0.3em] text-[#d4bc82] transition-colors duration-[var(--duration-micro)] hover:border-[#c9a96e] hover:bg-[#c9a96e]/10 hover:text-[#f0e4c8]"
          >
            {ctaLabel}
          </button>
        ) : null}
      </div>
    </section>
  )
}
