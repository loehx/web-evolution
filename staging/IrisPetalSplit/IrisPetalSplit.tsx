import { motion, useReducedMotion } from 'motion/react'
import { RatioImage, ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface IrisPetalSplitProps {
  eyebrow?: string
  titleLines: string[]
  body?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

function IrisPetals({ animate }: { animate: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-1/2 z-20 hidden h-48 w-full -translate-y-1/2 lg:block"
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M200,60 Q120,20 60,60 Q120,100 200,60 Q280,100 340,60 Q280,20 200,60"
        fill="none"
        stroke="#c9a227"
        strokeWidth="1"
        opacity="0.4"
        animate={animate ? { pathLength: [0, 1] } : undefined}
        transition={{ duration: motionDuration.emphasis }}
      />
      <motion.ellipse
        cx="200"
        cy="60"
        rx="80"
        ry="30"
        fill="#c9a227"
        opacity="0.08"
        animate={animate ? { scale: [0.9, 1.05, 0.9] } : undefined}
        transition={{ duration: motionDuration.emphasis * 2, repeat: animate ? Infinity : 0 }}
      />
    </svg>
  )
}

function PollenDrift({ animate }: { animate: boolean }) {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    left: `${48 + (i * 5) % 12}%`,
    delay: i * 0.12,
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
          className="absolute rounded-full bg-[#c9a227]/50"
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          animate={
            animate
              ? { y: ['0%', '100%'], opacity: [0, 0.7, 0], x: [0, (i % 2 ? 8 : -8), 0] }
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
    </div>
  )
}

export function IrisPetalSplit({
  eyebrow,
  titleLines,
  body,
  image,
  imageAlt = '',
  ctaLabel,
  ctaHref,
  className,
}: IrisPetalSplitProps) {
  const reduceMotion = useReducedMotion()
  const displayLines = titleLines.length ? titleLines : ['Iris', 'petal']

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#2a1a3a] text-[#f5f0e8] lg:grid lg:grid-cols-12',
        className,
      )}
    >
      <motion.div
        className="relative z-10 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:-mr-16 lg:mt-12"
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
          <div className="flex aspect-[3/4] w-full items-center justify-center bg-[#3a2a4a] text-xs uppercase tracking-widest text-white/30">
            Iris bloom
          </div>
        )}
      </motion.div>

      <IrisPetals animate={!reduceMotion} />
      <PollenDrift animate={!reduceMotion} />

      <motion.div
        className="relative z-10 flex flex-col justify-center px-6 py-12 lg:col-span-6 lg:col-start-7 lg:px-10 lg:py-20"
        initial={reduceMotion ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: motionDuration.standard, delay: reduceMotion ? 0 : 0.15 }}
      >
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#c9a227]/70">
            {eyebrow}
          </p>
        ) : null}
        <div className="mt-4 max-w-[12ch] lg:-ml-8">
          <ResponsiveHeadline level={1} lines={displayLines} className="text-[#f5f0e8]" />
        </div>
        {body ? (
          <p className="mt-6 max-w-[40ch] font-serif text-sm leading-relaxed text-[#f5f0e8]/75 md:text-base">
            {body}
          </p>
        ) : null}
        {ctaLabel ? (
          <a
            href={ctaHref ?? '#'}
            className="mt-8 inline-flex w-fit border border-[#c9a227] px-6 py-3 text-xs uppercase tracking-[0.3em] transition-colors hover:bg-[#c9a227]/15"
          >
            {ctaLabel}
          </a>
        ) : null}
      </motion.div>

      <div
        className="h-px w-full bg-[#c9a227]/20 lg:hidden"
        aria-hidden
      />
    </section>
  )
}
