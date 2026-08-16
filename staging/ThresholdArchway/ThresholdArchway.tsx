import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { motionDuration } from '@/lib/motion'

export interface ThresholdLink {
  label: string
  href: string
}

export interface ThresholdArchwayProps {
  brand: string
  tagline?: string
  links?: ThresholdLink[]
  legal?: string
  className?: string
}

export function ThresholdArchway({
  brand,
  tagline,
  links = [],
  legal,
  className,
}: ThresholdArchwayProps) {
  const reduceMotion = useReducedMotion()

  return (
    <footer
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-[#f5f0e8] text-[#2a2520]',
        className,
      )}
    >
      {tagline ? (
        <p className="px-5 pt-16 text-center font-serif text-lg text-[#2a2520]/65 md:px-10 md:text-xl">
          {tagline}
        </p>
      ) : null}

      <div className="relative mt-auto w-full">
        <svg
          viewBox="0 0 1200 520"
          className="block w-full text-[#e8e0d0]"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 520 L0 380 Q600 -40 1200 380 L1200 520 Z"
            fill="currentColor"
            stroke="#2a2520"
            strokeWidth="2"
          />
          <path
            d="M520 120 L600 40 L680 120 L660 200 L540 200 Z"
            fill="#d9d0c0"
            stroke="#2a2520"
            strokeWidth="2"
          />
        </svg>

        <motion.div
          className="absolute top-[8%] left-1/2 w-[min(70vw,420px)] -translate-x-1/2 text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionDuration.standard }}
        >
          <p
            className="font-serif text-[clamp(2.5rem,10vw,5.5rem)] font-bold leading-[0.9] tracking-tight"
            aria-label={brand}
          >
            {brand}
          </p>
        </motion.div>

        <nav
          className="absolute inset-x-0 bottom-[28%] flex flex-wrap justify-center gap-x-6 gap-y-3 px-5 md:gap-x-10"
          aria-label="Footer"
        >
          {links.map((link) => (
            <motion.a
              key={link.href + link.label}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-[0.25em] underline decoration-[#2a2520]/25 underline-offset-4 md:text-base"
              whileHover={reduceMotion ? undefined : { y: -3 }}
              transition={{ duration: motionDuration.micro }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {legal ? (
          <p className="absolute bottom-6 left-0 right-0 px-5 text-center text-[10px] uppercase tracking-[0.28em] text-[#2a2520]/60">
            {legal}
          </p>
        ) : null}
      </div>
    </footer>
  )
}
