import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface GradientMeshBandProps {
  eyebrow?: string
  title?: string
  body?: string
  ctaLabel?: string
  onCtaClick?: () => void
  align?: 'left' | 'center'
  className?: string
}

/**
 * Content band over an animated multi-blob gradient mesh background.
 */
export function GradientMeshBand({
  eyebrow,
  title,
  body,
  ctaLabel,
  onCtaClick,
  align = 'left',
  className,
}: GradientMeshBandProps) {
  const centered = align === 'center'

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden rounded-2xl border border-white/10 px-6 py-16 sm:px-12 sm:py-20',
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 bg-zinc-950">
        <motion.div
          className="absolute -left-1/4 top-0 h-[120%] w-[70%] rounded-full bg-violet-600/40 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 h-[100%] w-[60%] rounded-full bg-fuchsia-500/30 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/3 top-1/3 h-[50%] w-[40%] rounded-full bg-cyan-500/20 blur-3xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-zinc-950/50" />
      </div>

      <div
        className={cn(
          'relative z-10 max-w-2xl',
          centered && 'mx-auto text-center',
        )}
      >
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
            {eyebrow}
          </p>
        )}
        {title ? (
          <h2
            className={cn(
              'text-3xl font-bold tracking-tight text-white sm:text-4xl',
              eyebrow && 'mt-3',
            )}
          >
            {title}
          </h2>
        ) : (
          !eyebrow && !body && !ctaLabel && (
            <p className="text-zinc-400 italic">Add headline or body content</p>
          )
        )}
        {body && (
          <p className={cn('mt-4 text-base leading-relaxed text-zinc-300', centered && 'mx-auto')}>
            {body}
          </p>
        )}
        {ctaLabel && (
          <button
            type="button"
            onClick={onCtaClick}
            className={cn(
              'mt-8 inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100',
              centered && 'mx-auto',
            )}
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </section>
  )
}
