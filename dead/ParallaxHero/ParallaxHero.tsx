import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

export interface ParallaxHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  ctaLabel?: string
  onCtaClick?: () => void
  className?: string
}

/**
 * Full-viewport hero with scroll-linked parallax layers.
 * Pattern adapted from Aceternity UI / Framer Motion scroll transforms.
 */
export function ParallaxHero({
  eyebrow,
  title,
  subtitle,
  ctaLabel = 'Explore components',
  onCtaClick,
  className,
}: ParallaxHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '55%'])
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.65, 0.15])

  return (
    <section
      ref={ref}
      className={cn(
        'relative isolate flex h-[100svh] min-h-[32rem] items-center overflow-hidden bg-zinc-950',
        className,
      )}
    >
      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 opacity-30"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(circle at center, black 20%, transparent 75%)',
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y: orbY }}
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl md:h-96 md:w-96"
      />
      <motion.div
        aria-hidden
        style={{ y: orbY }}
        className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl md:h-80 md:w-80"
      />

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center md:px-10"
      >
        {eyebrow ? (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-violet-300/90 md:text-sm">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-zinc-400 md:text-xl">
            {subtitle}
          </p>
        ) : null}
        <button
          type="button"
          onClick={onCtaClick}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {ctaLabel}
        </button>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent"
      />
    </section>
  )
}
