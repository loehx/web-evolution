import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { LetterMosaicHeadline } from './LetterMosaicHeadline'

export type LetterMosaicProps = {
  headline: string
  tagline?: string
  className?: string
}

export function LetterMosaic({ headline, tagline, className }: LetterMosaicProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className={cn('relative min-h-[100svh] w-full overflow-hidden bg-[#030806]', className)}
      aria-label={headline}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(61,107,82,0.35), transparent 55%), radial-gradient(circle at 80% 70%, rgba(90,130,104,0.2), transparent 50%)',
        }}
      />

      <motion.div
        className="relative z-10 flex min-h-[100svh] w-full flex-col justify-end px-5 pb-8 md:justify-center md:px-10 md:pb-0"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : motionDuration.hero, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex max-w-[92vw] flex-col gap-3 md:max-w-[70vw]">
          <LetterMosaicHeadline
            headline={headline}
            className="text-[20vw] font-semibold leading-[0.85] text-white"
          />
          {tagline ? (
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/55 md:text-base">
              {tagline}
            </p>
          ) : null}
        </div>
      </motion.div>
    </section>
  )
}
