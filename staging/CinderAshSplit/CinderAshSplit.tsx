import { motion, useReducedMotion } from 'motion/react'
import { RatioImage, ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface CinderAshSplitProps {
  eyebrow?: string
  titleLines: string[]
  body?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

function AshParticles({ animate }: { animate: boolean }) {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    left: `${20 + (i * 13) % 60}%`,
    delay: i * 0.2,
    size: 2 + (i % 3),
  }))

  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-12 -translate-x-1/2 lg:block"
      aria-hidden
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#e85d04]/60"
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          animate={
            animate
              ? { y: ['0%', '120%'], opacity: [0, 0.8, 0], x: [0, (i % 2 ? 8 : -8), 0] }
              : { opacity: 0.3 }
          }
          transition={{
            duration: motionDuration.emphasis * 2,
            delay: p.delay,
            repeat: animate ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e85d04]/5 via-[#e85d04]/15 to-[#e85d04]/5" />
    </div>
  )
}

function MobileAshBand({ animate }: { animate: boolean }) {
  return (
    <motion.div
      className="h-3 w-full bg-gradient-to-r from-transparent via-[#e85d04]/30 to-transparent lg:hidden"
      animate={animate ? { opacity: [0.3, 0.7, 0.3] } : undefined}
      transition={{ duration: motionDuration.emphasis, repeat: animate ? Infinity : 0 }}
      aria-hidden
    />
  )
}

export function CinderAshSplit({
  eyebrow,
  titleLines,
  body,
  image,
  imageAlt = '',
  ctaLabel,
  ctaHref,
  className,
}: CinderAshSplitProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Cinder', 'ash']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#2a2622] text-[#e8e4e0] lg:grid lg:grid-cols-12',
        className,
      )}
    >
      <motion.div
        className="relative z-10 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:-mr-16 lg:mt-16"
        initial={reduceMotion ? false : { opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: motionDuration.standard }}
      >
        {image ? (
          <RatioImage
            src={image}
            alt={imageAlt}
            ratio="3/4"
            className="w-full shadow-2xl lg:max-h-[75svh] lg:object-cover"
          />
        ) : (
          <div className="flex aspect-[3/4] w-full items-center justify-center bg-[#3a3632] text-xs uppercase tracking-widest text-white/30">
            Ash field
          </div>
        )}
      </motion.div>

      <MobileAshBand animate={!reduceMotion} />
      <AshParticles animate={!reduceMotion} />

      <motion.div
        className="relative z-20 flex flex-col justify-center px-6 py-12 lg:col-span-6 lg:col-start-6 lg:row-start-1 lg:px-10 lg:py-20"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionDuration.standard, delay: reduceMotion ? 0 : 0.15 }}
      >
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#e85d04]/70">
            {eyebrow}
          </p>
        ) : null}
        <div className="mt-4 max-w-[16ch]">
          <ResponsiveHeadline level={1} lines={displayLines} className="text-[#e8e4e0]" />
        </div>
        {body ? (
          <p className="mt-6 max-w-prose text-sm leading-relaxed text-[#e8e4e0]/70 md:text-base">
            {body}
          </p>
        ) : null}
        {ctaLabel && ctaHref ? (
          <a
            href={ctaHref}
            className="mt-8 inline-flex w-fit border border-[#e85d04]/40 px-5 py-2.5 text-xs uppercase tracking-[0.25em] hover:bg-[#e85d04]/10"
          >
            {ctaLabel}
          </a>
        ) : null}
      </motion.div>
    </section>
  )
}
