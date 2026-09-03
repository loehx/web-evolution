import { motion, useReducedMotion } from 'motion/react'
import { RatioImage, ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface BrocadeLoomSplitProps {
  eyebrow?: string
  titleLines: string[]
  body?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

function BrocadeGutter({ animate }: { animate: boolean }) {
  const threads = Array.from({ length: 12 }, (_, i) => ({
    offset: i * 8,
    delay: i * 0.1,
    horizontal: i % 2 === 0,
  }))

  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-8 -translate-x-1/2 lg:block"
      aria-hidden
    >
      {threads.map((thread, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/60 to-transparent"
          style={{ top: `${thread.offset}%` }}
          animate={
            animate
              ? thread.horizontal
                ? { x: ['-20%', '20%', '-20%'], opacity: [0.3, 0.8, 0.3] }
                : { scaleX: [0.5, 1, 0.5], opacity: [0.4, 0.9, 0.4] }
              : undefined
          }
          transition={{
            duration: motionDuration.emphasis * 1.5,
            delay: thread.delay,
            repeat: animate ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#c9a227]/10 via-[#c9a227]/20 to-[#c9a227]/10" />
    </div>
  )
}

function MobileBrocadeBand({ animate }: { animate: boolean }) {
  return (
    <motion.div
      className="h-2 w-full bg-gradient-to-r from-transparent via-[#c9a227]/40 to-transparent lg:hidden"
      animate={animate ? { opacity: [0.4, 0.9, 0.4] } : undefined}
      transition={{ duration: motionDuration.emphasis, repeat: animate ? Infinity : 0 }}
      aria-hidden
    />
  )
}

export function BrocadeLoomSplit({
  eyebrow,
  titleLines,
  body,
  image,
  imageAlt = '',
  ctaLabel,
  ctaHref,
  className,
}: BrocadeLoomSplitProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Brocade', 'loom']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col bg-[#2a1420] text-[#f0e8dc] lg:grid lg:grid-cols-2',
        className,
      )}
    >
      <BrocadeGutter animate={!reduceMotion} />

      <div className="relative min-h-[45svh] border-b border-[#c9a227]/15 lg:min-h-[100svh] lg:border-b-0 lg:border-r lg:border-[#c9a227]/15">
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
              className="h-full min-h-[45svh] w-full lg:min-h-[100svh] lg:aspect-auto lg:h-full"
            />
          </motion.div>
        ) : (
          <div
            className="flex h-full min-h-[45svh] items-center justify-center bg-[#3a1a28] lg:min-h-[100svh]"
            aria-hidden
          >
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#c9a227]/50">
              Loom
            </span>
          </div>
        )}
      </div>

      <MobileBrocadeBand animate={!reduceMotion} />

      <div className="relative flex flex-col justify-center px-6 py-16 lg:px-14 lg:py-20">
        {eyebrow ? (
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#c9a227]/80"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
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
          transition={{ duration: motionDuration.emphasis }}
        >
          <ResponsiveHeadline
            level={1}
            lines={displayLines}
            className="text-[#f0e8dc]"
            fontSize={68}
            lineHeight={72}
          />
        </motion.div>

        {body ? (
          <motion.p
            className="mt-6 max-w-[42ch] text-sm leading-relaxed text-[#f0e8dc]/65 md:text-base"
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
            className="mt-8 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#c9a227] underline decoration-[#c9a227]/40 underline-offset-4 transition hover:text-[#f0e8dc]"
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
