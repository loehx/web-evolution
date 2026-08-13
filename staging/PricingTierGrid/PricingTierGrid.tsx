import { ResponsiveHeadline } from '@/components/primitives'
import { cn } from '@/lib/utils'

export interface PricingTier {
  id?: string
  name: string
  price: string
  period?: string
  description?: string
  features: string[]
  ctaLabel?: string
  highlighted?: boolean
}

export interface PricingTierGridProps {
  eyebrow?: string
  headlineLines?: string[]
  intro?: string
  tiers: PricingTier[]
  className?: string
}

/**
 * Full-width pricing comparison grid with tier columns, feature lists, and CTAs.
 */
export function PricingTierGrid({
  eyebrow,
  headlineLines,
  intro,
  tiers,
  className,
}: PricingTierGridProps) {
  return (
    <section className={cn('w-full bg-zinc-950 px-6 py-16 sm:px-10 sm:py-20', className)}>
      {(eyebrow || headlineLines?.length || intro) && (
        <div className="mb-12 lg:mb-16">
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
          {intro && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">{intro}</p>
          )}
        </div>
      )}

      {tiers.length === 0 ? (
        <p className="text-center text-zinc-500 italic">No pricing tiers configured.</p>
      ) : (
        <div
          className={cn(
            'grid gap-6',
            tiers.length === 1 && 'max-w-md',
            tiers.length === 2 && 'md:grid-cols-2',
            tiers.length >= 3 && 'md:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {tiers.map((tier, index) => (
            <article
              key={tier.id ?? `${tier.name}-${index}`}
              className={cn(
                'flex flex-col rounded-2xl border p-6 sm:p-8',
                tier.highlighted
                  ? 'border-violet-500/60 bg-violet-950/30 shadow-lg shadow-violet-500/10'
                  : 'border-white/10 bg-zinc-900/50',
              )}
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                {tier.highlighted && (
                  <span className="rounded-full bg-violet-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                    Popular
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-bold tracking-tight text-white">{tier.price}</span>
                {tier.period && (
                  <span className="mb-1 text-sm text-zinc-400">/{tier.period}</span>
                )}
              </div>
              {tier.description && (
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{tier.description}</p>
              )}
              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-zinc-300">
                    <span className="mt-0.5 text-violet-400" aria-hidden>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              {tier.ctaLabel && (
                <button
                  type="button"
                  className={cn(
                    'mt-8 w-full rounded-full py-2.5 text-sm font-semibold transition',
                    tier.highlighted
                      ? 'bg-violet-500 text-white hover:bg-violet-400'
                      : 'border border-white/20 text-white hover:border-white/40',
                  )}
                >
                  {tier.ctaLabel}
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
