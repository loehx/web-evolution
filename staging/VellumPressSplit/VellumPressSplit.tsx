import { motion, useReducedMotion } from 'motion/react'
import { RatioImage, ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface VellumPressSplitProps {
  eyebrow?: string
  titleLines: string[]
  body?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

function InkBleed({ animate }: { animate: boolean }) {
  const blobs = [
    { cx: '50%', cy: '20%', r: 18, delay: 0 },
    { cx: '48%', cy: '45%', r: 24, delay: 0.15 },
    { cx: '52%', cy: '70%', r: 16, delay: 0.3 },
    { cx: '50%', cy: '90%', r: 20, delay: 0.45 },
  ]

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      aria-hidden
      preserveAspectRatio="none"
    >
      {blobs.map((blob, i) => (
        <motion.circle
          key={i}
          cx={blob.cx}
          cy={blob.cy}
          r={blob.r}
          fill="#8b2500"
          fillOpacity={0.12}
          initial={animate ? { scale: 0, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: motionDuration.emphasis, delay: blob.delay }}
        />
      ))}
      <motion.rect
        x="46%"
        y="0"
        width="8%"
        height="100%"
        fill="#f4ead5"
        fillOpacity={0.6}
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: motionDuration.standard }}
      />
    </svg>
  )
}

export function VellumPressSplit({
  eyebrow,
  titleLines,
  body,
  image,
  imageAlt = '',
  ctaLabel,
  ctaHref,
  className,
}: VellumPressSplitProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Vellum', 'press']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col bg-[#f4ead5] text-[#3d2914] lg:grid lg:grid-cols-2',
        className,
      )}
    >
      <InkBleed animate={!reduceMotion} />

      <div className="relative min-h-[45svh] border-b border-[#3d2914]/10 lg:min-h-[100svh] lg:border-b-0 lg:border-r lg:border-[#3d2914]/10">
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
          <div className="flex min-h-[45svh] items-center justify-center bg-[#3d2914]/5 lg:min-h-[100svh]">
            <p className="font-serif text-sm italic text-[#3d2914]/40">No photograph</p>
          </div>
        )}
      </div>

      <div className="relative flex flex-col justify-center px-6 py-14 lg:px-14 lg:py-20">
        {eyebrow ? (
          <motion.p
            className="font-serif text-xs uppercase tracking-[0.35em] text-[#8b2500]/70"
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
            className="mt-8 inline-flex w-fit border border-[#8b2500]/40 px-6 py-3 font-serif text-xs uppercase tracking-[0.2em] text-[#8b2500] transition hover:bg-[#8b2500]/8"
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
