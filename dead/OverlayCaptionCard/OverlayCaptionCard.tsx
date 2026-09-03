import { cn } from '@/lib/utils'

export interface OverlayCaptionCardProps {
  imageUrl?: string
  title?: string
  subtitle?: string
  href?: string
  aspect?: 'landscape' | 'portrait' | 'square'
  className?: string
}

const aspectClasses = {
  landscape: 'aspect-[16/10]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
}

/**
 * Media card with bottom gradient overlay and caption text.
 */
export function OverlayCaptionCard({
  imageUrl,
  title,
  subtitle,
  href,
  aspect = 'landscape',
  className,
}: OverlayCaptionCardProps) {
  const content = (
    <figure
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900',
        aspectClasses[aspect],
        className,
      )}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-800" aria-hidden />
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"
      />

      <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        {title ? (
          <h3 className="text-lg font-semibold text-white sm:text-xl">{title}</h3>
        ) : (
          <p className="text-sm italic text-zinc-400">Untitled</p>
        )}
        {subtitle && <p className="mt-1 text-sm text-zinc-300">{subtitle}</p>}
      </figcaption>
    </figure>
  )

  if (href) {
    return (
      <a href={href} className="block transition hover:opacity-95">
        {content}
      </a>
    )
  }

  return content
}
