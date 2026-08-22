import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface ArborRootLink {
  label: string
  href: string
}

export interface ArborRootFloorProps {
  brand: string
  tagline?: string
  links?: ArborRootLink[]
  legal?: string
  className?: string
}

function RootSvg({ animate }: { animate: boolean }) {
  const branches = [
    'M 50 30 C 30 50, 15 70, 10 90',
    'M 50 30 C 70 50, 85 70, 90 90',
    'M 50 30 C 40 55, 25 75, 20 95',
    'M 50 30 C 60 55, 75 75, 80 95',
    'M 50 30 C 35 60, 30 80, 28 98',
    'M 50 30 C 65 60, 70 80, 72 98',
  ]

  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {branches.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="#5c4033"
          strokeWidth={1.5 - i * 0.1}
          strokeOpacity={0.6}
          initial={animate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: motionDuration.emphasis, delay: i * 0.08 }}
        />
      ))}
    </svg>
  )
}

export function ArborRootFloor({
  brand,
  tagline,
  links = [],
  legal,
  className,
}: ArborRootFloorProps) {
  const reduceMotion = useReducedMotion()

  return (
    <footer
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-gradient-to-b from-[#3d5a4c] via-[#2d4a3e] to-[#1a2e24] text-[#e8f0e4]',
        className,
      )}
    >
      <RootSvg animate={!reduceMotion} />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20">
        {tagline ? (
          <motion.p
            className="mb-8 max-w-[32ch] text-center font-serif text-sm italic text-[#e8f0e4]/55"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard }}
          >
            {tagline}
          </motion.p>
        ) : null}

        <motion.div
          className="relative flex h-[min(50vw,260px)] w-[min(50vw,260px)] items-center justify-center"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: motionDuration.emphasis }}
        >
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-b from-[#5c4033] to-[#3d2817] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            aria-hidden
          />
          <p
            className="relative z-10 max-w-[10ch] text-center font-serif text-[clamp(1.2rem,4vw,2rem)] font-semibold leading-tight text-[#e8f0e4]"
            aria-label={brand}
          >
            {brand || '—'}
          </p>
        </motion.div>

        {links.length > 0 ? (
          <nav className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4">
            {links.map((link, i) => (
              <motion.a
                key={link.href + link.label}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.25em] text-[#7cb342] transition-colors hover:text-[#e8f0e4]"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionDuration.standard, delay: 0.2 + i * 0.06 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
        ) : (
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[#e8f0e4]/35">No links</p>
        )}
      </div>

      {legal ? (
        <p className="relative z-10 border-t border-[#7cb342]/20 px-6 py-5 text-center text-[10px] uppercase tracking-[0.28em] text-[#e8f0e4]/40 md:px-12">
          {legal}
        </p>
      ) : null}
    </footer>
  )
}
