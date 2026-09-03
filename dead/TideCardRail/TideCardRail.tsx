import { useRef } from 'react'
import { cn } from '@/lib/utils'

export interface TideCard {
  image?: string
  title: string
  body?: string
}

export interface TideCardRailProps {
  eyebrow?: string
  title?: string
  cards: TideCard[]
  className?: string
}

export function TideCardRail({ eyebrow, title, cards, className }: TideCardRailProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollByCard(direction: -1 | 1) {
    const root = scrollerRef.current
    if (!root) return
    const card = root.querySelector('[data-tide-card]')
    const width = card instanceof HTMLElement ? card.offsetWidth : root.clientWidth * 0.6
    root.scrollBy({ left: direction * (width + 16), behavior: 'smooth' })
  }

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col bg-[#f3efe4] text-[#141414]',
        className,
      )}
    >
      <header className="flex items-end justify-between gap-6 px-5 pt-16 md:px-10 md:pt-20">
        <div>
          {eyebrow ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#141414]/50">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="mt-2 max-w-[16ch] text-4xl font-semibold leading-[0.9] tracking-tight md:text-6xl">
              {title}
            </h2>
          ) : null}
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button
            type="button"
            aria-label="Previous cards"
            onClick={() => scrollByCard(-1)}
            className="grid h-12 w-12 place-items-center border border-[#141414] text-lg"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next cards"
            onClick={() => scrollByCard(1)}
            className="grid h-12 w-12 place-items-center border border-[#141414] text-lg"
          >
            →
          </button>
        </div>
      </header>

      <div
        ref={scrollerRef}
        className="mt-8 flex min-h-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-10 md:gap-6 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.length === 0 ? (
          <p className="grid min-h-[50svh] w-full place-items-center text-sm text-[#141414]/50">
            No stories in this rail.
          </p>
        ) : (
          cards.map((card, index) => (
            <article
              key={`${card.title}-${index}`}
              data-tide-card
              className="flex w-[88vw] shrink-0 snap-center flex-col md:w-[70vw] lg:w-[58vw]"
            >
              <div className="relative min-h-[48svh] flex-1 overflow-hidden bg-[#d9d3c4]">
                {card.image ? (
                  <img
                    src={card.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full min-h-[48svh] place-items-center text-xs uppercase tracking-[0.3em] text-[#141414]/40">
                    No image
                  </div>
                )}
              </div>
              <div className="border-t border-[#141414] bg-[#f3efe4] px-4 py-5 md:px-6">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#141414]/40">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight md:text-4xl">{card.title}</h3>
                {card.body ? (
                  <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-[#141414]/70 md:text-base">
                    {card.body}
                  </p>
                ) : null}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
