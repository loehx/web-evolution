import { motion, useReducedMotion } from 'motion/react'
import { RatioImage, ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface FolioMarginSplitProps {
  eyebrow?: string
  titleLines: string[]
  body?: string
  marginNotes?: string[]
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export function FolioMarginSplit({
  eyebrow,
  titleLines,
  body,
  marginNotes = [],
  image,
  imageAlt = '',
  ctaLabel,
  ctaHref,
  className,
}: FolioMarginSplitProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col bg-[#f5f0e6] text-[#1a1612] lg:grid lg:grid-cols-2',
        className,
      )}
    >
      <div className="relative min-h-[45svh] border-b border-[#1a1612]/10 lg:min-h-[100svh] lg:border-b-0 lg:border-r">
        {image ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: motionDuration.emphasis }}
            className="h-full"
          >
            <RatioImage
              src={image}
              alt={imageAlt}
              ratio="4/5"
              className="h-full min-h-[45svh] lg:min-h-[100svh]"
            />
          </motion.div>
        ) : (
          <div className="grid h-full min-h-[45svh] place-items-center bg-[#ebe4d8] text-[10px] uppercase tracking-[0.35em] text-[#1a1612]/40 lg:min-h-[100svh]">
            Verso — no image
          </div>
        )}
        <p className="pointer-events-none absolute bottom-4 left-4 font-serif text-xs italic text-[#1a1612]/40">
          Fig. 1
        </p>
      </div>

      <div className="relative flex flex-col justify-center px-6 py-12 lg:grid lg:grid-cols-[1fr_88px] lg:gap-0 lg:px-10 lg:py-16">
        <div className="lg:pr-8">
          {eyebrow ? (
            <motion.p
              className="font-serif text-[10px] uppercase tracking-[0.35em] text-[#8b2942]"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
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
            transition={{ duration: motionDuration.standard, delay: 0.06 }}
          >
            <ResponsiveHeadline
              level={2}
              lines={titleLines.length ? titleLines : ['Untitled folio']}
              className="font-serif text-[#1a1612]"
              fontSize={56}
              lineHeight={60}
            />
          </motion.div>

          {body ? (
            <motion.p
              className="mt-6 max-w-[42ch] text-base leading-[1.75] text-[#1a1612]/80 md:text-lg"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: motionDuration.standard, delay: 0.15 }}
            >
              {body}
            </motion.p>
          ) : null}

          {ctaLabel ? (
            <motion.a
              href={ctaHref ?? '#'}
              className="mt-8 inline-block border-b border-[#8b2942] pb-1 font-serif text-sm italic text-[#8b2942]"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: motionDuration.micro, delay: 0.22 }}
            >
              {ctaLabel}
            </motion.a>
          ) : null}
        </div>

        <aside className="mt-8 flex flex-col gap-6 border-t border-[#8b2942]/20 pt-6 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
          {marginNotes.length > 0 ? (
            marginNotes.map((note, i) => (
              <motion.p
                key={`${note}-${i}`}
                className="font-serif text-[11px] italic leading-snug text-[#8b2942]"
                initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: motionDuration.standard, delay: 0.1 + i * 0.06 }}
              >
                {note}
              </motion.p>
            ))
          ) : (
            <p className="font-serif text-[11px] italic text-[#8b2942]/40">—</p>
          )}
        </aside>
      </div>
    </section>
  )
}
