import { motion, useReducedMotion } from 'motion/react'
import { RatioImage, ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface LoomWeaveSplitProps {
  eyebrow?: string
  titleLines: string[]
  body?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

function LoomThreads({ animate }: { animate: boolean }) {
  const threads = Array.from({ length: 12 }, (_, i) => i)

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      aria-hidden
      preserveAspectRatio="none"
    >
      {threads.map((i) => {
        const x = 8 + i * 7.5
        return (
          <motion.line
            key={`warp-${i}`}
            x1={`${x}%`}
            y1="0%"
            x2={`${x}%`}
            y2="100%"
            stroke="#2e4057"
            strokeWidth={i % 3 === 0 ? 2 : 1}
            strokeOpacity={0.15 + (i % 4) * 0.05}
            initial={animate ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ duration: motionDuration.emphasis, delay: i * 0.04 }}
          />
        )
      })}
      {threads.slice(0, 8).map((i) => {
        const y = 12 + i * 10
        return (
          <motion.line
            key={`weft-${i}`}
            x1="0%"
            y1={`${y}%`}
            x2="100%"
            y2={`${y + 2}%`}
            stroke="#c45c26"
            strokeWidth={1}
            strokeOpacity={0.2}
            initial={animate ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ duration: motionDuration.standard, delay: 0.3 + i * 0.05 }}
          />
        )
      })}
    </svg>
  )
}

export function LoomWeaveSplit({
  eyebrow,
  titleLines,
  body,
  image,
  imageAlt = '',
  ctaLabel,
  ctaHref,
  className,
}: LoomWeaveSplitProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Woven', 'words']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col bg-[#f2ebe0] text-[#2e4057] lg:grid lg:grid-cols-2',
        className,
      )}
    >
      <LoomThreads animate={!reduceMotion} />

      <div className="relative min-h-[45svh] border-b border-[#2e4057]/10 lg:min-h-[100svh] lg:border-b-0 lg:border-r lg:border-[#2e4057]/10">
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
          <div className="grid h-full min-h-[45svh] place-items-center bg-[#e8dfd2] text-[10px] uppercase tracking-[0.35em] text-[#2e4057]/35 lg:min-h-[100svh]">
            Warp — no image
          </div>
        )}
      </div>

      <div className="relative flex flex-col justify-center px-6 py-14 lg:px-12 lg:py-20">
        {eyebrow ? (
          <motion.p
            className="font-serif text-[10px] uppercase tracking-[0.35em] text-[#c45c26]"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard }}
          >
            {eyebrow}
          </motion.p>
        ) : null}

        <motion.div
          className="mt-4"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionDuration.standard, delay: 0.08 }}
        >
          <ResponsiveHeadline
            level={2}
            lines={displayLines}
            className="font-serif text-[#2e4057]"
            fontSize={52}
            lineHeight={58}
          />
        </motion.div>

        {body ? (
          <motion.p
            className="mt-6 max-w-[42ch] text-base leading-[1.75] text-[#2e4057]/75 md:text-lg"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionDuration.standard, delay: 0.18 }}
          >
            {body}
          </motion.p>
        ) : null}

        {ctaLabel && ctaHref ? (
          <motion.a
            href={ctaHref}
            className="mt-8 inline-block border-b-2 border-[#c45c26] pb-1 font-serif text-sm uppercase tracking-[0.25em] text-[#c45c26] transition-colors hover:text-[#2e4057]"
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
