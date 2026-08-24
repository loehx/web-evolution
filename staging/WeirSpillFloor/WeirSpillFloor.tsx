import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface WeirSpillLink {
  label: string
  href: string
}

export interface WeirSpillFloorProps {
  brand: string
  tagline?: string
  links?: WeirSpillLink[]
  legal?: string
  className?: string
}

function WaterSpill({ animate }: { animate: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-[28%] h-[35%] w-full"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ecdc4" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#4ecdc4" stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="3" fill="#6b6b6b" />
      <motion.path
        d="M 0 3 Q 15 8, 25 5 T 50 7 T 75 4 T 100 6 L 100 40 L 0 40 Z"
        fill="url(#waterGrad)"
        initial={animate ? { opacity: 0.5 } : false}
        animate={
          animate
            ? {
                d: [
                  'M 0 3 Q 15 8, 25 5 T 50 7 T 75 4 T 100 6 L 100 40 L 0 40 Z',
                  'M 0 3 Q 15 5, 25 8 T 50 5 T 75 7 T 100 4 L 100 40 L 0 40 Z',
                  'M 0 3 Q 15 8, 25 5 T 50 7 T 75 4 T 100 6 L 100 40 L 0 40 Z',
                ],
              }
            : undefined
        }
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}

export function WeirSpillFloor({
  brand,
  tagline,
  links = [],
  legal,
  className,
}: WeirSpillFloorProps) {
  const reduceMotion = useReducedMotion()

  return (
    <footer
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-gradient-to-b from-[#8a8a8a] via-[#6b6b6b] to-[#4a4a4a] text-[#f0f0f0]',
        className,
      )}
    >
      <WaterSpill animate={!reduceMotion} />

      <div
        className="pointer-events-none absolute inset-x-0 top-[26%] h-4 bg-[#5a5a5a] shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20">
        {tagline ? (
          <motion.p
            className="mb-8 max-w-[32ch] text-center text-sm text-[#f0f0f0]/55"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard }}
          >
            {tagline}
          </motion.p>
        ) : null}

        <motion.div
          className="relative flex h-[min(36vw,180px)] w-[min(36vw,180px)] items-center justify-center"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: motionDuration.emphasis }}
        >
          <div
            className="absolute inset-0 rounded-sm bg-gradient-to-b from-[#7a7a7a] to-[#4a4a4a] shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
            aria-hidden
          />
          <div
            className="absolute inset-2 border border-[#c45c26]/30"
            aria-hidden
          />
          <p
            className="relative z-10 max-w-[10ch] text-center text-[clamp(1.1rem,3.5vw,1.8rem)] font-black uppercase leading-tight tracking-tight text-[#f0f0f0]"
            aria-label={brand}
          >
            {brand || '—'}
          </p>
        </motion.div>

        {links.length > 0 ? (
          <nav className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {links.map((link, i) => (
              <motion.a
                key={link.href + link.label}
                href={link.href}
                className="flex min-w-[5rem] items-center justify-center border border-[#4ecdc4]/20 bg-[#5a5a5a]/80 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4ecdc4] shadow-[0_4px_8px_rgba(0,0,0,0.3)] transition hover:border-[#4ecdc4]/50 hover:bg-[#5a5a5a]"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ duration: motionDuration.standard, delay: 0.15 + i * 0.08 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
        ) : (
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[#f0f0f0]/30">No links</p>
        )}
      </div>

      {legal ? (
        <p className="relative z-10 border-t border-[#4a4a4a] px-6 py-5 text-center text-[10px] uppercase tracking-[0.28em] text-[#f0f0f0]/35 md:px-12">
          {legal}
        </p>
      ) : null}
    </footer>
  )
}
