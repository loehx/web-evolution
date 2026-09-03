import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'
import { motionDuration } from '@/lib/motion'
import { RatioImage, ResponsiveHeadline } from '@/components/primitives'

export interface StrataScrollSplitProps {
  eyebrow?: string
  title?: string
  titleLines?: string[]
  body?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  onCtaClick?: () => void
  className?: string
}

const STRATA = [
  { color: '#3d3428', height: '12%' },
  { color: '#5c4f3a', height: '18%' },
  { color: '#8a7a62', height: '22%' },
  { color: '#c4b59a', height: '28%' },
  { color: '#ebe4d6', height: '20%' },
]

export function StrataScrollSplit({
  eyebrow,
  title,
  titleLines,
  body,
  image,
  imageAlt = '',
  ctaLabel,
  onCtaClick,
  className,
}: StrataScrollSplitProps) {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const parallax1 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -40])
  const parallax2 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -80])
  const parallax3 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -120])

  const lines = titleLines ?? (title ? [title] : [])

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative min-h-[100svh] w-full overflow-hidden bg-[#ebe4d6] text-[#2a2520]',
        className,
      )}
    >
      <div className="absolute inset-0 flex flex-col" aria-hidden>
        {STRATA.map((layer, i) => (
          <motion.div
            key={layer.color}
            className="w-full"
            style={{
              height: layer.height,
              backgroundColor: layer.color,
              y: i === 1 ? parallax1 : i === 2 ? parallax2 : i === 3 ? parallax3 : 0,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-[100svh] w-full flex-col justify-center px-5 py-16 md:flex-row md:items-center md:gap-10 md:px-10 lg:px-16">
        <motion.div
          className="md:w-5/12"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: motionDuration.standard }}
        >
          {eyebrow ? (
            <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#2a2520]/55">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <div className="mt-4">
              <ResponsiveHeadline
                level={1}
                lines={lines}
                className="text-[#2a2520]"
                fontSize={72}
                lineHeight={80}
              />
            </div>
          ) : (
            <span className="sr-only">Untitled</span>
          )}
          {body ? (
            <p className="mt-6 max-w-[40ch] font-sans text-base leading-relaxed text-[#2a2520]/80 md:text-lg">
              {body}
            </p>
          ) : null}
          {ctaLabel ? (
            <button
              type="button"
              onClick={onCtaClick}
              className="mt-8 border border-[#2a2520]/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em]"
            >
              {ctaLabel}
            </button>
          ) : null}
        </motion.div>

        <motion.div
          className="mt-10 md:mt-0 md:w-7/12"
          style={{ y: parallax2 }}
        >
          <div className="border-4 border-[#2a2520]/20 bg-[#c4b59a] p-2 shadow-[8px_8px_0_#3d3428]">
            <RatioImage src={image} alt={imageAlt} ratio="16/10" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
