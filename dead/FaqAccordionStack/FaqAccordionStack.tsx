import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useId, useState } from 'react'
import { RatioImage, ResponsiveHeadline, type ImageRatio } from '@/components/primitives'
import { cn } from '@/lib/utils'

export interface FaqItem {
  id?: string
  question: string
  answer: string
}

export interface FaqAccordionStackProps {
  eyebrow?: string
  /** Primary title — each entry is one SVG line via ResponsiveHeadline. */
  headlineLines?: string[]
  intro?: string
  items?: FaqItem[]
  imageSrc?: string
  imageAlt?: string
  imageRatio?: ImageRatio
  /** Side image column on tablet/desktop; hidden when omitted. */
  imageSide?: 'left' | 'right'
  /** Item ids (or index strings) open on first render. */
  defaultOpenIds?: string[]
  allowMultiple?: boolean
  showNumbers?: boolean
  className?: string
}

function itemKey(item: FaqItem, index: number) {
  return item.id ?? String(index)
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn(
        'h-5 w-5 shrink-0 text-violet-400 transition-transform duration-200',
        open && 'rotate-180',
      )}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function FaqAccordionItem({
  item,
  index,
  open,
  onToggle,
  showNumbers,
  panelId,
  buttonId,
  reducedMotion,
}: {
  item: FaqItem
  index: number
  open: boolean
  onToggle: () => void
  showNumbers?: boolean
  panelId: string
  buttonId: string
  reducedMotion: boolean | null
}) {
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start gap-4 py-4 text-left transition hover:text-violet-200 md:py-5"
        >
          {showNumbers && (
            <span
              aria-hidden
              className="mt-0.5 font-mono text-xs tabular-nums text-violet-400/80 md:text-sm"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          <span className="flex-1 text-base font-semibold leading-snug text-zinc-100 md:text-lg">
            {item.question}
          </span>
          <ChevronIcon open={open} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-4 pl-0 text-sm leading-relaxed text-zinc-400 md:pb-5 md:text-base md:leading-relaxed">
              {showNumbers && <span className="sr-only">{`Answer ${index + 1}: `}</span>}
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * FAQ section with expandable question/answer pairs, optional side image, and SVG headline.
 */
export function FaqAccordionStack({
  eyebrow,
  headlineLines,
  intro,
  items = [],
  imageSrc,
  imageAlt = '',
  imageRatio = '3/4',
  imageSide = 'left',
  defaultOpenIds,
  allowMultiple = false,
  showNumbers = true,
  className,
}: FaqAccordionStackProps) {
  const baseId = useId()
  const reducedMotion = useReducedMotion()
  const resolvedItems = items.length > 0 ? items : []
  const initialOpen = new Set(
    defaultOpenIds ??
      (resolvedItems[0] ? [itemKey(resolvedItems[0], 0)] : []),
  )
  const [openIds, setOpenIds] = useState<Set<string>>(initialOpen)

  const toggle = (key: string) => {
    setOpenIds((prev) => {
      if (allowMultiple) {
        const next = new Set(prev)
        if (next.has(key)) next.delete(key)
        else next.add(key)
        return next
      }
      return prev.has(key) ? new Set<string>() : new Set([key])
    })
  }

  const hasImage = Boolean(imageSrc)
  const imageBlock = hasImage ? (
    <div
      className={cn(
        'w-full shrink-0 md:max-w-xs lg:max-w-sm',
        imageSide === 'right' && 'lg:order-3',
      )}
    >
      <RatioImage
        src={imageSrc}
        alt={imageAlt}
        ratio={imageRatio}
        className="rounded-2xl border border-white/10"
      />
    </div>
  ) : null

  return (
    <section className={cn('w-full bg-zinc-950 px-6 py-14 md:px-10 md:py-20 lg:px-16 lg:py-24', className)}>
      <div
        className={cn(
          'mx-auto flex w-full flex-col gap-10 lg:gap-16',
          hasImage
            ? 'lg:flex-row lg:items-start lg:justify-between'
            : 'lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-16',
        )}
      >
        <div
          className={cn(
            'flex flex-col gap-8 lg:max-w-md lg:shrink-0',
            hasImage && imageSide === 'left' && 'lg:order-2 lg:flex-1',
            hasImage && imageSide === 'right' && 'lg:order-1 lg:flex-1',
            !hasImage && 'lg:sticky lg:top-8',
          )}
        >
          {hasImage && imageSide === 'left' && (
            <div className="md:hidden">{imageBlock}</div>
          )}

          <div>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                {eyebrow}
              </p>
            )}
            {headlineLines && headlineLines.length > 0 ? (
              <ResponsiveHeadline
                lines={headlineLines}
                level={2}
                className={cn('mt-3 text-white', !eyebrow && 'mt-0')}
                fontSize={72}
                lineHeight={84}
              />
            ) : (
              !eyebrow &&
              !intro &&
              resolvedItems.length === 0 && (
                <p className="text-zinc-500 italic">Add headline or FAQ items</p>
              )
            )}
            {intro && (
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">{intro}</p>
            )}
          </div>

          {hasImage && imageSide === 'right' && (
            <div className="md:hidden">{imageBlock}</div>
          )}
        </div>

        {hasImage && (
          <div
            className={cn(
              'hidden md:block lg:shrink-0',
              imageSide === 'left' ? 'lg:order-1' : 'lg:order-3',
            )}
          >
            {imageBlock}
          </div>
        )}

        <div
          className={cn(
            'min-w-0 flex-1 rounded-2xl border border-white/10 bg-zinc-900/50 px-5 md:px-6 lg:px-8',
            hasImage && 'lg:order-2',
          )}
        >
          {resolvedItems.length === 0 ? (
            <p className="py-8 text-center text-sm italic text-zinc-500">No questions yet</p>
          ) : (
            <div role="list">
              {resolvedItems.map((item, index) => {
                const key = itemKey(item, index)
                const panelId = `${baseId}-panel-${key}`
                const buttonId = `${baseId}-button-${key}`
                return (
                  <div key={key} role="listitem">
                    <FaqAccordionItem
                      item={item}
                      index={index}
                      open={openIds.has(key)}
                      onToggle={() => toggle(key)}
                      showNumbers={showNumbers}
                      panelId={panelId}
                      buttonId={buttonId}
                      reducedMotion={reducedMotion}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
