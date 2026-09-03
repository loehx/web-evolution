import { motion, useReducedMotion } from 'motion/react'
import { RatioImage, ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface VerdureCanopySplitProps {
  eyebrow?: string
  titleLines: string[]
  body?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

function CanopyDapple({ animate }: { animate: boolean }) {
  const patches = [
    { cx: '20%', cy: '12%', r: 18, delay: 0 },
    { cx: '75%', cy: '25%', r: 22, delay: 0.15 },
    { cx: '35%', cy: '55%', r: 16, delay: 0.3 },
    { cx: '85%', cy: '70%', r: 20, delay: 0.45 },
    { cx: '55%', cy: '88%', r: 14, delay: 0.6 },
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
          fill="#d4a574"
          fillOpacity={0.12}
          animate={
            animate
              ? {
                  cx: [patch.cx, `${parseFloat(patch.cx) + 3}%`, patch.cx],
                  opacity: [0.08, 0.18, 0.08],
                }
              : undefined
          }
          transition={{
            duration: motionDuration.emphasis * 2,
            delay: patch.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <path
        d="M0 0 L100 0 Q 80 15 60 8 T 20 12 T 0 20 Z"
        fill="#4a7c59"
        fillOpacity={0.35}
      />
      <path
        d="M0 5 L100 5 Q 70 22 45 15 T 10 18 T 0 28 Z"
        fill="#1a2e1a"
        fillOpacity={0.5}
      />
    </svg>
  )
}

export function VerdureCanopySplit({
  eyebrow,
  titleLines,
  body,
  image,
  imageAlt = '',
  ctaLabel,
  ctaHref,
  className,
}: VerdureCanopySplitProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Verdure', 'canopy']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col bg-[#1a2e1a] text-[#e8f0e8] lg:grid lg:grid-cols-2',
        className,
      )}
    >
      <CanopyDapple animate={!reduceMotion} />

      <div className="relative min-h-[45svh] border-b border-[#4a7c59]/20 lg:min-h-[100svh] lg:border-b-0 lg:border-r lg:border-[#4a7c59]/20">
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
          <div
            className="flex h-full min-h-[45svh] items-center justify-center bg-[#4a7c59]/10 lg:min-h-[100svh]"
            aria-hidden
          >
            <p className="text-sm text-[#4a7c59]/50">Forest floor</p>
          </div>
        )}
      </div>

      <div className="relative flex flex-col justify-center px-6 py-16 lg:px-14 lg:py-0">
        {eyebrow ? (
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#d4a574]/80"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard }}
          >
            {eyebrow}
          </motion.p>
        ) : null}

        <motion.div
          className="mt-4"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionDuration.hero }}
        >
          <ResponsiveHeadline
            level={1}
            lines={displayLines}
            className="text-[#e8f0e8]"
            fontSize={72}
            lineHeight={76}
          />
        </motion.div>

        {body ? (
          <motion.p
            className="mt-6 max-w-[40ch] text-sm leading-relaxed text-[#e8f0e8]/70 md:text-base"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionDuration.standard, delay: 0.15 }}
          >
            {body}
          </motion.p>
        ) : null}

        {ctaLabel && ctaHref ? (
          <motion.a
            href={ctaHref}
            className="mt-8 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#d4a574] underline decoration-[#4a7c59]/50 underline-offset-4 transition hover:text-[#e8f0e8]"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionDuration.standard, delay: 0.25 }}
          >
            {ctaLabel}
          </motion.a>
        ) : null}
      </div>
    </section>
  )
}
