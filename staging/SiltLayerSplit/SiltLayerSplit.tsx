import { motion, useReducedMotion } from 'motion/react'
import { RatioImage, ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface SiltLayerSplitProps {
  eyebrow?: string
  titleLines: string[]
  body?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

function SiltBands({ animate }: { animate: boolean }) {
  const bands = [
    { y: '18%', h: 6, delay: 0, color: '#c4b49a' },
    { y: '35%', h: 4, delay: 0.2, color: '#8b7355' },
    { y: '52%', h: 8, delay: 0.4, color: '#a89880' },
    { y: '68%', h: 5, delay: 0.6, color: '#6b5d48' },
    { y: '82%', h: 7, delay: 0.8, color: '#c4b49a' },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
      {bands.map((band, i) => (
        <motion.div
          key={i}
          className="absolute left-0 w-full opacity-60"
          style={{
            top: band.y,
            height: band.h,
            background: `linear-gradient(90deg, transparent, ${band.color}, transparent)`,
          }}
          animate={
            animate
              ? { x: ['-5%', '5%', '-5%'], opacity: [0.4, 0.7, 0.4] }
              : undefined
          }
          transition={{
            duration: motionDuration.emphasis * 2,
            delay: band.delay,
            repeat: animate ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function SiltLayerSplit({
  eyebrow,
  titleLines,
  body,
  image,
  imageAlt = '',
  ctaLabel,
  ctaHref,
  className,
}: SiltLayerSplitProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Silt', 'layer']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col bg-[#2a2418] text-[#e8e0d4] lg:grid lg:grid-cols-2',
        className,
      )}
    >
      <SiltBands animate={!reduceMotion} />

      <div className="relative min-h-[45svh] border-b border-[#8b7355]/20 lg:min-h-[100svh] lg:border-b-0 lg:border-r lg:border-[#8b7355]/20">
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
            className="flex h-full min-h-[45svh] items-center justify-center bg-[#3a3228] lg:min-h-[100svh]"
            aria-hidden
          >
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#8b7355]/50">
              Sediment
            </span>
          </div>
        )}
      </div>

      <div className="relative flex flex-col justify-center px-6 py-16 lg:px-14 lg:py-20">
        {eyebrow ? (
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#c4b49a]/80"
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
            className="text-[#e8e0d4]"
            fontSize={72}
            lineHeight={76}
          />
        </motion.div>

        {body ? (
          <motion.p
            className="mt-6 max-w-[42ch] text-sm leading-relaxed text-[#e8e0d4]/65 md:text-base"
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
            className="mt-8 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#c4b49a] underline decoration-[#8b7355]/50 underline-offset-4 transition hover:text-[#e8e0d4]"
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
