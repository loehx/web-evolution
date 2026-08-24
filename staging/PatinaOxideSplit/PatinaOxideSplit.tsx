import { motion, useReducedMotion } from 'motion/react'
import { RatioImage, ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface PatinaOxideSplitProps {
  eyebrow?: string
  titleLines: string[]
  body?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

function VerdigrisBleed({ animate }: { animate: boolean }) {
  const patches = [
    { cx: '50%', cy: '15%', r: 22, delay: 0 },
    { cx: '48%', cy: '40%', r: 28, delay: 0.12 },
    { cx: '52%', cy: '65%', r: 20, delay: 0.24 },
    { cx: '50%', cy: '88%', r: 24, delay: 0.36 },
  ]

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      aria-hidden
      preserveAspectRatio="none"
    >
      {patches.map((patch, i) => (
        <motion.circle
          key={i}
          cx={patch.cx}
          cy={patch.cy}
          r={patch.r}
          fill="#3d7a6a"
          fillOpacity={0.18}
          initial={animate ? { scale: 0, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: motionDuration.emphasis, delay: patch.delay }}
        />
      ))}
      <motion.rect
        x="46%"
        y="0"
        width="8%"
        height="100%"
        fill="url(#copperGrad)"
        fillOpacity={0.5}
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: motionDuration.standard }}
      />
      <defs>
        <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b87333" />
          <stop offset="50%" stopColor="#3d7a6a" />
          <stop offset="100%" stopColor="#b87333" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function PatinaOxideSplit({
  eyebrow,
  titleLines,
  body,
  image,
  imageAlt = '',
  ctaLabel,
  ctaHref,
  className,
}: PatinaOxideSplitProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Patina', 'oxide']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col bg-[#f8f4ec] text-[#3d2914] lg:grid lg:grid-cols-2',
        className,
      )}
    >
      <VerdigrisBleed animate={!reduceMotion} />

      <div className="relative min-h-[45svh] border-b border-[#b87333]/20 lg:min-h-[100svh] lg:border-b-0 lg:border-r lg:border-[#b87333]/20">
        {image ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: motionDuration.emphasis }}
            className="h-full"
          >
            <RatioImage
              src={image}
              alt={imageAlt}
              ratio="3/4"
              className="h-full min-h-[45svh] lg:min-h-[100svh] lg:aspect-auto lg:[&]:aspect-[4/5]"
            />
          </motion.div>
        ) : (
          <div className="flex min-h-[45svh] items-center justify-center bg-[#b87333]/8 lg:min-h-[100svh]">
            <p className="font-serif text-sm italic text-[#3d7a6a]/50">No photograph</p>
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#3d7a6a]/20 to-transparent lg:w-12"
          aria-hidden
        />
      </div>

      <div className="relative flex flex-col justify-center px-6 py-14 lg:px-14 lg:py-20">
        {eyebrow ? (
          <motion.p
            className="font-serif text-xs uppercase tracking-[0.35em] text-[#3d7a6a]/80"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard }}
          >
            {eyebrow}
          </motion.p>
        ) : null}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionDuration.emphasis, delay: 0.1 }}
        >
          <ResponsiveHeadline
            level={1}
            lines={displayLines}
            className="mt-3 font-serif text-[clamp(2rem,7vw,4.5rem)] font-semibold leading-[0.95] text-[#3d2914]"
          />
        </motion.div>
        {body ? (
          <motion.p
            className="mt-6 max-w-[42ch] font-serif text-base leading-relaxed text-[#3d2914]/75"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionDuration.standard, delay: 0.25 }}
          >
            {body}
          </motion.p>
        ) : null}
        {ctaLabel ? (
          <motion.a
            href={ctaHref ?? '#'}
            className="mt-8 inline-flex w-fit border border-[#3d7a6a]/40 px-6 py-3 font-serif text-xs uppercase tracking-[0.2em] text-[#3d7a6a] transition hover:bg-[#3d7a6a]/8"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard, delay: 0.35 }}
          >
            {ctaLabel}
          </motion.a>
        ) : null}
      </div>
    </section>
  )
}
