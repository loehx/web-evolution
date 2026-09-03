import { cn } from '@/lib/utils'

export interface ColophonLink {
  label: string
  href: string
}

export interface ColophonFloorProps {
  brand: string
  tagline?: string
  links?: ColophonLink[]
  legal?: string
  className?: string
}

export function ColophonFloor({
  brand,
  tagline,
  links = [],
  legal,
  className,
}: ColophonFloorProps) {
  return (
    <footer
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#ff4d3a] text-black',
        className,
      )}
    >
      <div className="flex flex-wrap gap-x-8 gap-y-4 px-5 pt-16 md:px-10 md:pt-20">
        {links.map((link) => (
          <a
            key={link.href + link.label}
            href={link.href}
            className="text-2xl font-semibold tracking-tight underline decoration-black/30 underline-offset-4 md:text-4xl"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="px-3 pb-4 md:px-4">
        {tagline ? (
          <p className="mb-4 max-w-[40ch] px-2 text-sm text-black/70 md:text-base">{tagline}</p>
        ) : null}
        <p
          className="origin-bottom-left text-[22vw] font-semibold leading-[0.75] tracking-tighter text-black"
          aria-label={brand}
        >
          {brand}
        </p>
        {legal ? (
          <p className="mt-4 border-t border-black/30 pt-3 text-[10px] uppercase tracking-[0.28em] text-black/70">
            {legal}
          </p>
        ) : null}
      </div>
    </footer>
  )
}
