import { motion, useReducedMotion } from 'motion/react'
import { RatioImage, ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface SlateChalkSplitProps {
  eyebrow?: string
  titleLines: string[]
  body?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

function ChalkDust({ animate }: { animate: boolean }) {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    left: `${45 + (i * 7) % 20}%`,
    delay: i * 0.15,
    size: 1 + (i % 2),
  }))

  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-16 -translate-x-1/2 lg:block"
      aria-hidden
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#f0ece4]/40"
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          animate={
            animate
              ? { y: ['0%', '100%'], opacity: [0, 0.6, 0], x: [0, (i % 2 ? 6 : -6), 0] }
              : { opacity: 0.2 }
          }
          transition={{
            duration: motionDuration.emphasis * 2,
            delay: p.delay,
            repeat: animate ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0ece4]/5 via-[#f0ece4]/10 to-[#f0ece4]/5" />
    </div>
  )
}

function MobileDustBand({ animate }: { animate: boolean }) {
  return (
    <motion.div
      className="h-2 w-full bg-gradient-to-r from-transparent via-[#f0ece4]/20 to-transparent lg:hidden"
      animate={animate ? { opacity: [0.2, 0.5, 0.2] } : undefined}
      transition={{ duration: motionDuration.emphasis, repeat: animate ? Infinity : 0 }}
      aria-hidden
    />
  )
}

export function SlateChalkSplit({
  eyebrow,
  titleLines,
  body,
  image,
  imageAlt = '',
  ctaLabel,
  ctaHref,
  className,
}: SlateChalkSplitProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Slate', 'chalk']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#2a3238] text-[#f0ece4] lg:grid lg:grid-cols-12',
        className,
      )}
    >
      <motion.div
        className="relative z-10 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:-mr-20 lg:mt-12"
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
          <div className="flex aspect-[3/4] w-full items-center justify-center bg-[#3a4248] text-xs uppercase tracking-widest text-white/30">
            Slate board
          </div>
        )}
      </motion.div>

      <MobileDustBand animate={!reduceMotion} />
      <ChalkDust animate={!reduceMotion} />

      <motion.div
        className="relative z-20 flex flex-col justify-center px-6 py-12 lg:col-span-7 lg:col-start-5 lg:row-start-1 lg:px-10 lg:py-20"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionDuration.standard, delay: reduceMotion ? 0 : 0.15 }}
      >
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#8a9aa8]/80">
            {eyebrow}
          </p>
        ) : null}
        <div className="mt-4 max-w-[16ch] lg:-ml-8">
          <ResponsiveHeadline
            level={1}
            lines={displayLines}
            className="text-[#f0ece4] [text-shadow:1px_1px_0_#8a9aa8]"
          />
        </div>
        {body ? (
          <p className="mt-6 max-w-[40ch] text-sm leading-relaxed text-[#f0ece4]/75 md:text-base">
            {body}
          </p>
        ) : null}
        {ctaLabel ? (
          <a
            href={ctaHref ?? '#'}
            className="mt-8 inline-flex w-fit border-b-2 border-[#f0ece4]/60 pb-1 text-xs uppercase tracking-[0.3em] hover:border-[#f0ece4]"
          >
            {ctaLabel}
          </a>
        ) : null}
      </motion.div>
    </section>
  )
}
