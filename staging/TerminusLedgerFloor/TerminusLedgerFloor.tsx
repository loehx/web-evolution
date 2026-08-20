import { cn } from '@/lib/utils'

export interface TerminusLink {
  label: string
  href: string
}

export interface TerminusLedgerFloorProps {
  brand: string
  tagline?: string
  links?: TerminusLink[]
  legal?: string
  ruleCount?: number
  className?: string
}

export function TerminusLedgerFloor({
  brand,
  tagline,
  links = [],
  legal,
  ruleCount = 12,
  className,
}: TerminusLedgerFloorProps) {
  const rules = Array.from({ length: Math.max(4, Math.min(ruleCount, 20)) })

  return (
    <footer
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col bg-[#f7f2e8] text-[#1c1916]',
        className,
      )}
    >
      <div className="relative flex flex-1 flex-col px-6 py-16 md:px-12 md:py-20 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div className="relative flex-1">
          {rules.map((_, i) => (
            <div
              key={i}
              className="border-b border-[#c9a962]/55"
              style={{ marginTop: i === 0 ? 0 : '2.75rem' }}
              aria-hidden
            />
          ))}

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div
              className="grid h-[min(28vw,200px)] w-[min(28vw,200px)] place-items-center rounded-full border-4 border-[#8b2942] bg-[#f7f2e8] shadow-[inset_0_0_0_6px_#c9a962]"
            >
              <p
                className="max-w-[12ch] text-center font-serif text-[clamp(1.25rem,4vw,2rem)] font-bold leading-tight text-[#8b2942]"
                aria-label={brand}
              >
                {brand || '—'}
              </p>
            </div>
          </div>
        </div>

        <aside className="mt-12 flex flex-col gap-4 lg:mt-0 lg:justify-center">
          {tagline ? (
            <p className="font-serif text-sm italic text-[#1c1916]/70">{tagline}</p>
          ) : null}
          {links.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              className="text-left text-sm font-medium tracking-wide text-[#1c1916] underline decoration-[#c9a962] decoration-2 underline-offset-4 hover:text-[#8b2942]"
            >
              {link.label}
            </a>
          ))}
        </aside>
      </div>

      {legal ? (
        <p className="border-t border-[#c9a962]/40 px-6 py-4 text-[10px] uppercase tracking-[0.28em] text-[#1c1916]/55 md:px-12">
          {legal}
        </p>
      ) : null}
    </footer>
  )
}
