import { type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface MarqueeRibbonProps {
  items: string[]
  /** Animation duration in seconds for one full loop */
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
}

/**
 * Seamless infinite marquee via duplicated track + translateX(-50%).
 * Pattern from spell.sh / CSS-only marquee guides.
 */
export function MarqueeRibbon({
  items,
  speed = 28,
  direction = 'left',
  pauseOnHover = true,
  className,
}: MarqueeRibbonProps) {
  const duplicated = [...items, ...items]

  return (
    <div
      role="marquee"
      aria-label="Scrolling highlights"
      className={cn(
        'relative overflow-hidden border-y border-white/10 bg-zinc-900/80 py-4 backdrop-blur-sm',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-zinc-900 to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-zinc-900 to-transparent sm:w-24"
      />

      <div
        className={cn(
          'flex w-max items-center gap-8 sm:gap-12',
          direction === 'left' ? 'animate-marquee' : '[animation-direction:reverse] animate-marquee',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={{ '--marquee-duration': `${speed}s` } as CSSProperties}
      >
        {duplicated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300 sm:text-base"
          >
            {item}
          </span>
        ))}
      </div>

      <span className="sr-only">{items.join(', ')}</span>
    </div>
  )
}

export interface MarqueeRibbonItemProps {
  children: ReactNode
  className?: string
}

export function MarqueeRibbonItem({ children, className }: MarqueeRibbonItemProps) {
  return (
    <span className={cn('inline-flex items-center gap-2 whitespace-nowrap', className)}>
      {children}
    </span>
  )
}
