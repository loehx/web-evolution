import { motion, useReducedMotion } from 'motion/react'
import { RatioImage, ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface FractureEchoSplitProps {
  eyebrow?: string
  titleLines: string[]
  body?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export function FractureEchoSplit({
  eyebrow,
  titleLines,
  body,
  image,
  imageAlt = '',
  ctaLabel,
  ctaHref,
  className,
}: FractureEchoSplitProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col bg-[#f4f0e8] text-[#0d0d0d] lg:grid lg:grid-cols-2',
        className,
      )}
    >
      <div className="relative min-h-[48svh] overflow-hidden lg:min-h-[100svh]">
        {image ? (
          <>
            <motion.div
              className="absolute inset-0 opacity-30"
              initial={reduceMotion ? false : { x: -12, y: 8 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: motionDuration.emphasis }}
            >
              <RatioImage src={image} alt="" ratio="3/4" className="h-full min-h-[48svh] lg:min-h-full" />
            </motion.div>
            <motion.div
              className="absolute inset-0 opacity-50"
              initial={reduceMotion ? false : { x: 8, y: -6 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: motionDuration.emphasis, delay: 0.08 }}
            >
              <RatioImage src={image} alt="" ratio="3/4" className="h-full min-h-[48svh] lg:min-h-full" />
            </motion.div>
            <motion.div
              className="relative z-10"
              initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: motionDuration.standard }}
            >
              <RatioImage
                src={image}
                alt={imageAlt}
                ratio="3/4"
                className="h-full min-h-[48svh] lg:min-h-full"
              />
            </motion.div>
          </>
        ) : (
          <div className="grid h-full min-h-[48svh] place-items-center bg-[#e8e2d8] text-[10px] uppercase tracking-[0.35em] text-[#0d0d0d]/40 lg:min-h-[100svh]">
            No image
          </div>
        )}
        <div
          className="pointer-events-none absolute -right-8 top-0 z-20 h-full w-16 bg-[#6b5b95] opacity-90 lg:w-24"
          style={{ transform: 'skewX(-12deg)' }}
          aria-hidden
        />
      </div>

      <div className="relative flex flex-col justify-center px-6 py-12 lg:px-12 lg:py-20">
        {eyebrow ? (
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#6b5b95]"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard }}
          >
            {eyebrow}
          </motion.p>
        ) : null}

        <div className="relative mt-4">
          {titleLines.map((line, i) => (
            <p
              key={`echo-${i}`}
              className="pointer-events-none absolute left-2 font-serif text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] text-[#6b5b95]/20"
              style={{ top: i * 8, left: i * 6 }}
              aria-hidden
            >
              {line}
            </p>
          ))}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.emphasis, delay: 0.1 }}
          >
            <ResponsiveHeadline
              level={2}
              lines={titleLines.length ? titleLines : ['Untitled']}
              className="font-serif text-[#0d0d0d]"
              fontSize={64}
              lineHeight={72}
            />
          </motion.div>
        </div>

        {body ? (
          <motion.p
            className="mt-6 max-w-[42ch] text-base leading-relaxed text-[#0d0d0d]/75 md:text-lg"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionDuration.standard, delay: 0.2 }}
          >
            {body}
          </motion.p>
        ) : null}

        {ctaLabel ? (
          <motion.a
            href={ctaHref ?? '#'}
            className="mt-8 inline-block border-b-2 border-[#6b5b95] pb-1 text-sm font-semibold uppercase tracking-[0.25em]"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionDuration.micro, delay: 0.3 }}
          >
            {ctaLabel}
          </motion.a>
        ) : null}
      </div>
    </section>
  )
}
