import { ResponsiveHeadline } from '@/components/primitives'
import { cn } from '@/lib/utils'

export interface StatItem {
  id?: string
  value: string
  label: string
  suffix?: string
}

export interface StatsCounterRowProps {
  eyebrow?: string
  headlineLines?: string[]
  stats: StatItem[]
  variant?: 'default' | 'bordered' | 'glow'
  className?: string
}

/**
 * Full-width row of big metric numbers with labels for social proof bands.
 */
export function StatsCounterRow({
  eyebrow,
  headlineLines,
  stats,
  variant = 'default',
  className,
}: StatsCounterRowProps) {
  return (
    <section
      className={cn(
        'w-full px-6 py-16 sm:px-10 sm:py-20',
        variant === 'glow' && 'bg-gradient-to-b from-violet-950/40 to-zinc-950',
        variant !== 'glow' && 'bg-zinc-950',
        className,
      )}
    >
      {(eyebrow || headlineLines?.length) && (
        <div className="mb-12 text-center">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
              {eyebrow}
            </p>
          )}
          {headlineLines && headlineLines.length > 0 && (
            <div className={cn(eyebrow && 'mt-3')}>
              <ResponsiveHeadline
                level={2}
                lines={headlineLines}
                className="text-white"
              />
            </div>
          )}
        </div>
      )}

      {stats.length === 0 ? (
        <p className="text-center text-zinc-500 italic">No stats to display.</p>
      ) : (
        <div
          className={cn(
            'grid gap-8 text-center',
            stats.length === 1 && 'grid-cols-1',
            stats.length === 2 && 'grid-cols-2',
            stats.length === 3 && 'grid-cols-1 sm:grid-cols-3',
            stats.length >= 4 && 'grid-cols-2 lg:grid-cols-4',
          )}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.id ?? `${stat.label}-${index}`}
              className={cn(
                variant === 'bordered' &&
                  'rounded-2xl border border-white/10 bg-zinc-900/40 px-4 py-8',
                variant === 'glow' && 'px-4 py-6',
              )}
            >
              <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {stat.value}
                {stat.suffix && (
                  <span className="text-2xl text-violet-400 sm:text-3xl">{stat.suffix}</span>
                )}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
