import { RatioImage, ResponsiveHeadline } from '@/components/primitives'
import { cn } from '@/lib/utils'

export interface TestimonialItem {
  id?: string
  quote: string
  name: string
  role?: string
  company?: string
  avatarUrl?: string
}

export interface TestimonialQuoteStackProps {
  eyebrow?: string
  headlineLines?: string[]
  items: TestimonialItem[]
  layout?: 'stack' | 'featured'
  className?: string
}

/**
 * Customer testimonial section with quote cards, avatars, and attribution.
 */
export function TestimonialQuoteStack({
  eyebrow,
  headlineLines,
  items,
  layout = 'stack',
  className,
}: TestimonialQuoteStackProps) {
  const featured = layout === 'featured' && items.length > 0
  const primary = featured ? items[0] : null
  const rest = featured ? items.slice(1) : items

  return (
    <section className={cn('w-full bg-zinc-950 px-6 py-16 sm:px-10 sm:py-20', className)}>
      {(eyebrow || headlineLines?.length) && (
        <div className="mb-12">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
              {eyebrow}
            </p>
          )}
          {headlineLines && headlineLines.length > 0 && (
            <div className={cn(eyebrow && 'mt-3')}>
              <ResponsiveHeadline level={2} lines={headlineLines} className="text-white" />
            </div>
          )}
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-center text-zinc-500 italic">No testimonials yet.</p>
      ) : (
        <div className="space-y-6">
          {primary && (
            <figure className="rounded-2xl border border-violet-500/30 bg-violet-950/20 p-8 sm:p-10">
              <blockquote className="text-xl font-medium leading-relaxed text-white sm:text-2xl">
                &ldquo;{primary.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <RatioImage
                  src={primary.avatarUrl}
                  alt=""
                  ratio="1/1"
                  className="h-14 w-14 shrink-0 rounded-full"
                  imgClassName="rounded-full"
                />
                <div>
                  <cite className="not-italic font-semibold text-white">{primary.name}</cite>
                  {(primary.role || primary.company) && (
                    <p className="text-sm text-zinc-400">
                      {[primary.role, primary.company].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
              </figcaption>
            </figure>
          )}

          {rest.length > 0 && (
            <div
              className={cn(
                'grid gap-6',
                rest.length >= 2 && 'md:grid-cols-2',
                rest.length >= 3 && 'lg:grid-cols-3',
              )}
            >
              {rest.map((item, index) => (
                <figure
                  key={item.id ?? `${item.name}-${index}`}
                  className="flex flex-col rounded-2xl border border-white/10 bg-zinc-900/50 p-6"
                >
                  <blockquote className="flex-1 text-base leading-relaxed text-zinc-200">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                    <RatioImage
                      src={item.avatarUrl}
                      alt=""
                      ratio="1/1"
                      className="h-10 w-10 shrink-0 rounded-full"
                      imgClassName="rounded-full"
                    />
                    <div>
                      <cite className="not-italic text-sm font-semibold text-white">
                        {item.name}
                      </cite>
                      {(item.role || item.company) && (
                        <p className="text-xs text-zinc-500">
                          {[item.role, item.company].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
