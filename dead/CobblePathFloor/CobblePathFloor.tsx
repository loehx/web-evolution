import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface CobblePathLink {
  label: string
  href: string
}

export interface CobblePathFloorProps {
  brand: string
  tagline?: string
  links?: CobblePathLink[]
  legal?: string
  className?: string
}

const STONE_POSITIONS = [
  { left: '12%', bottom: '18%' },
  { left: '28%', bottom: '28%' },
  { left: '44%', bottom: '22%' },
  { left: '58%', bottom: '32%' },
  { left: '72%', bottom: '24%' },
  { left: '86%', bottom: '34%' },
]

function CobblePathSvg({ animate }: { animate: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] w-full"
      viewBox="0 0 100 60"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M 5 55 Q 20 45, 30 48 T 50 42 T 70 46 T 95 38"
        fill="none"
        stroke="#5a7247"
        strokeWidth={0.8}
        strokeOpacity={0.4}
        strokeDasharray="2 1"
        initial={animate ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: motionDuration.emphasis }}
      />
    </svg>
  )
}

export function CobblePathFloor({
  brand,
  tagline,
  links = [],
  legal,
  className,
}: CobblePathFloorProps) {
  const reduceMotion = useReducedMotion()
  const stones = links.slice(0, STONE_POSITIONS.length)

  return (
    <footer
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-gradient-to-b from-[#a8a29e] via-[#8b8680] to-[#6b6560] text-[#f5f0e8]',
        className,
      )}
    >
      <CobblePathSvg animate={!reduceMotion} />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20">
        {tagline ? (
          <motion.p
            className="mb-8 max-w-[32ch] text-center text-sm italic text-[#f5f0e8]/60"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard }}
          >
            {tagline}
          </motion.p>
        ) : null}

        <motion.div
          className="relative flex h-[min(40vw,200px)] w-[min(40vw,200px)] items-center justify-center"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: motionDuration.emphasis }}
        >
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-b from-[#5a7247] to-[#3d4f32] shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
            aria-hidden
          />
          <p
            className="relative z-10 max-w-[10ch] text-center text-[clamp(1.1rem,3.5vw,1.8rem)] font-semibold leading-tight text-[#f5f0e8]"
            aria-label={brand}
          >
            {brand || '—'}
          </p>
        </motion.div>

        {stones.length > 0 ? (
          <nav className="absolute inset-x-0 bottom-[12%] h-[40%]">
            {stones.map((link, i) => {
              const pos = STONE_POSITIONS[i]
              return (
                <motion.a
                  key={link.href + link.label}
                  href={link.href}
                  className="absolute flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#6b6560] text-[9px] font-medium uppercase tracking-[0.15em] text-[#f5f0e8] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)] transition hover:bg-[#5a7247] md:h-16 md:w-16"
                  style={{ left: pos.left, bottom: pos.bottom }}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: motionDuration.standard, delay: 0.15 + i * 0.08 }}
                >
                  {link.label}
                </motion.a>
              )
            })}
          </nav>
        ) : (
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[#f5f0e8]/35">No links</p>
        )}
      </div>

      {legal ? (
        <p className="relative z-10 border-t border-[#5a7247]/30 px-6 py-5 text-center text-[10px] uppercase tracking-[0.28em] text-[#f5f0e8]/40 md:px-12">
          {legal}
        </p>
      ) : null}
    </footer>
  )
}
