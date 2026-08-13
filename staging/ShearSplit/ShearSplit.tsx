import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { motionDuration } from '@/lib/motion'

export interface ShearSplitProps {
  eyebrow?: string
  title: string
  body?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  onCtaClick?: () => void
  /** Image on the right wedge (default) or left. */
  imageSide?: 'left' | 'right'
  className?: string
}

export function ShearSplit({
  eyebrow,
  title,
  body,
  image,
  imageAlt = '',
  ctaLabel,
  onCtaClick,
  imageSide = 'right',
  className,
}: ShearSplitProps) {
  const reduceMotion = useReducedMotion()
  const imageRight = imageSide !== 'left'

  return (
    <section
      className={cn(
        'relative min-h-[100svh] w-full overflow-hidden bg-[#0c0c0c] text-[#e8d5b5]',
        className,
      )}
    >
      <div className="flex min-h-[100svh] w-full flex-col md:block">
        <motion.div
          className={cn(
            'relative h-[52svh] w-full overflow-hidden bg-[#1a1a1a] md:absolute md:inset-y-0 md:h-auto md:w-[72%]',
            imageRight ? 'md:right-0' : 'md:left-0',
            imageRight
              ? 'md:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]'
              : 'md:[clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]',
          )}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : motionDuration.emphasis }}
        >
          {image ? (
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover md:min-h-[100svh]"
            />
          ) : (
            <div className="grid h-full min-h-[52svh] place-items-center text-xs uppercase tracking-[0.35em] text-[#e8d5b5]/30 md:min-h-[100svh]">
              Missing plate
            </div>
          )}
        </motion.div>

        <div
          className={cn(
            'relative z-10 flex flex-1 flex-col justify-center px-5 py-12 md:min-h-[100svh] md:w-[46%] md:px-12 lg:px-16',
            imageRight ? 'md:ml-0' : 'md:ml-auto',
          )}
        >
          {eyebrow ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#e8d5b5]/50">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="mt-4 max-w-[14ch] text-4xl font-semibold leading-[0.9] tracking-tight md:text-6xl lg:text-7xl">
              {title}
            </h2>
          ) : null}
          {body ? (
            <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-[#e8d5b5]/70 md:text-base">
              {body}
            </p>
          ) : null}
          {ctaLabel ? (
            <button
              type="button"
              onClick={onCtaClick}
              className="mt-8 w-fit border border-[#e8d5b5] px-5 py-3 text-xs uppercase tracking-[0.28em]"
            >
              {ctaLabel}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
