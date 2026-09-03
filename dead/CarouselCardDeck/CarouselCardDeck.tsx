import { useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

export interface CarouselCard {
  title: string
  description?: string
  imageUrl?: string
  href?: string
}

export interface CarouselCardDeckProps {
  items: CarouselCard[]
  showArrows?: boolean
  className?: string
}

function CarouselCardItem({ card }: { card: CarouselCard }) {
  const inner = (
    <>
      {card.imageUrl ? (
        <img
          src={card.imageUrl}
          alt=""
          className="h-36 w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-36 items-center justify-center bg-zinc-800 text-sm text-zinc-500">
          No image
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-zinc-100">{card.title}</h3>
        {card.description && (
          <p className="mt-1 line-clamp-3 text-sm text-zinc-400">{card.description}</p>
        )}
      </div>
    </>
  )

  const shell = (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80">
      {inner}
    </article>
  )

  if (card.href) {
    return (
      <a href={card.href} className="block h-full transition hover:border-violet-400/40">
        {shell}
      </a>
    )
  }

  return shell
}

/**
 * Horizontal snap carousel of generic content cards with optional arrow controls.
 */
export function CarouselCardDeck({
  items,
  showArrows = true,
  className,
}: CarouselCardDeckProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(items.length > 1)

  const updateScrollState = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  const scrollByCard = (direction: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    const cardWidth = el.querySelector<HTMLElement>('[data-carousel-card]')?.offsetWidth ?? 280
    el.scrollBy({ left: direction * (cardWidth + 16), behavior: 'smooth' })
    requestAnimationFrame(updateScrollState)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') scrollByCard(-1)
    if (event.key === 'ArrowRight') scrollByCard(1)
  }

  if (items.length === 0) {
    return (
      <div
        className={cn(
          'rounded-xl border border-dashed border-white/20 p-8 text-center text-sm text-zinc-500',
          className,
        )}
      >
        No cards to display
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      {showArrows && items.length > 1 && (
        <div className="mb-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-zinc-300 disabled:opacity-30"
            aria-label="Previous cards"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-zinc-300 disabled:opacity-30"
            aria-label="Next cards"
          >
            →
          </button>
        </div>
      )}

      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Card carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onScroll={updateScrollState}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((card, index) => (
          <div
            key={`${card.title}-${index}`}
            data-carousel-card
            className="w-[min(100%,18rem)] shrink-0 snap-start sm:w-72"
          >
            <CarouselCardItem card={card} />
          </div>
        ))}
      </div>
    </div>
  )
}
