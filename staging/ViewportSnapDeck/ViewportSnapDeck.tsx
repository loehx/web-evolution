import { type ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface ViewportSnapDeckProps {
  children: ReactNode
  className?: string
  /** When false, sections stack normally without snap behavior */
  enabled?: boolean
  hideScrollbar?: boolean
}

export interface ViewportSnapSlideProps {
  children: ReactNode
  className?: string
  id?: string
  align?: 'start' | 'center' | 'end'
}

/**
 * Root-level vertical snap scroller using native CSS scroll-snap.
 * Pattern inspired by full-view-snap-react / CSS scroll-snap guides.
 */
export function ViewportSnapDeck({
  children,
  className,
  enabled = true,
  hideScrollbar = true,
}: ViewportSnapDeckProps) {
  return (
    <section
      className={cn(
        'relative w-full',
        enabled && 'h-[100svh] snap-y snap-mandatory overflow-y-auto overscroll-y-contain',
        hideScrollbar && 'scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {children}
    </section>
  )
}

export function ViewportSnapSlide({
  children,
  className,
  id,
  align = 'start',
}: ViewportSnapSlideProps) {
  const alignClass = {
    start: 'snap-start',
    center: 'snap-center',
    end: 'snap-end',
  }[align]

  return (
    <div
      id={id}
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col justify-center px-6 py-16 md:px-12',
        alignClass,
        className,
      )}
    >
      {children}
    </div>
  )
}

export interface ViewportSnapNavProps {
  slides: { id: string; label: string }[]
  activeId?: string
  onNavigate?: (id: string) => void
  className?: string
}

/**
 * Fixed dot navigation that tracks which snap slide is in view.
 */
export function ViewportSnapNav({
  slides,
  activeId,
  onNavigate,
  className,
}: ViewportSnapNavProps) {
  return (
    <nav
      aria-label="Section navigation"
      className={cn(
        'fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex',
        className,
      )}
    >
      {slides.map((slide) => (
        <button
          key={slide.id}
          type="button"
          aria-label={slide.label}
          aria-current={activeId === slide.id ? 'true' : undefined}
          onClick={() => onNavigate?.(slide.id)}
          className={cn(
            'size-2.5 rounded-full transition',
            activeId === slide.id ? 'scale-125 bg-white' : 'bg-white/30 hover:bg-white/60',
          )}
        />
      ))}
    </nav>
  )
}

export function useViewportSnapObserver(slideIds: string[]) {
  const [activeId, setActiveId] = useState(slideIds[0] ?? '')

  useEffect(() => {
    const elements = slideIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveId(visible.target.id)
        }
      },
      { root: null, threshold: [0.35, 0.55, 0.75] },
    )

    for (const element of elements) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [slideIds])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { activeId, scrollTo }
}
