import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface EstuaryTidalLink {
  label: string
  href: string
}

export interface EstuaryTidalFloorProps {
  brand: string
  tagline?: string
  links?: EstuaryTidalLink[]
  legal?: string
  className?: string
}

function Sandbar({
  width,
  delay,
  reduceMotion,
  children,
  className,
}: {
  width: string
  delay: number
  reduceMotion: boolean | null
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={cn(
        'relative flex flex-wrap items-center justify-center gap-4 border-t border-[#e8dcc8]/25 bg-gradient-to-b from-[#c8b898]/90 to-[#a89878]/95 px-6 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]',
        className,
      )}
      style={{ width }}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionDuration.standard, delay }}
    >
      {children}
    </motion.div>
  )
}

function TidalChannels({ animate }: { animate: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full opacity-30"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M0,120 Q100,80 200,120 T400,120 L400,200 L0,200 Z"
        fill="#2a8a8a"
        animate={animate ? { d: ['M0,120 Q100,80 200,120 T400,120 L400,200 L0,200 Z', 'M0,125 Q100,90 200,115 T400,125 L400,200 L0,200 Z', 'M0,120 Q100,80 200,120 T400,120 L400,200 L0,200 Z'] } : undefined}
        transition={{ duration: motionDuration.emphasis * 2, repeat: animate ? Infinity : 0, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0,150 Q80,130 160,155 T320,145 L400,160 L400,200 L0,200 Z"
        fill="#1a6a6a"
        animate={animate ? { opacity: [0.4, 0.7, 0.4] } : undefined}
        transition={{ duration: motionDuration.emphasis * 2.5, repeat: animate ? Infinity : 0 }}
      />
    </svg>
  )
}

function MistLayer({ animate }: { animate: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#e8dcc8]/20 via-transparent to-transparent blur-sm"
        animate={animate ? { opacity: [0.2, 0.5, 0.2], y: [0, -8, 0] } : { opacity: 0.3 }}
        transition={{ duration: motionDuration.emphasis * 2, repeat: animate ? Infinity : 0 }}
      />
    </div>
  )
}

export function EstuaryTidalFloor({
  brand,
  tagline,
  links = [],
  legal,
  className,
}: EstuaryTidalFloorProps) {
  const reduceMotion = useReducedMotion()
  const linkGroups = [
    links.slice(0, Math.ceil(links.length / 2)),
    links.slice(Math.ceil(links.length / 2)),
  ]

  return (
    <footer
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a2838] via-[#1a4858] to-[#0a2838] text-[#e8dcc8]',
        className,
      )}
    >
      <TidalChannels animate={!reduceMotion} />
      <MistLayer animate={!reduceMotion} />

      <div className="relative z-10 flex flex-col items-center gap-0">
        <Sandbar width="min(90%, 480px)" delay={0} reduceMotion={reduceMotion}>
          <div className="text-center">
            <p className="text-2xl font-bold uppercase tracking-[0.2em] md:text-4xl">{brand}</p>
            {tagline ? (
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#e8dcc8]/60">{tagline}</p>
            ) : null}
          </div>
        </Sandbar>

        {linkGroups.map((group, gi) =>
          group.length > 0 ? (
            <Sandbar
              key={gi}
              width={`min(${85 - gi * 8}%, ${420 - gi * 40}px)`}
              delay={0.1 + gi * 0.1}
              reduceMotion={reduceMotion}
            >
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {group.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-xs uppercase tracking-[0.2em] text-[#e8dcc8]/80 hover:text-[#e8dcc8]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </Sandbar>
          ) : null,
        )}
      </div>

      {legal ? (
        <p className="relative z-10 mt-12 px-6 text-center text-[10px] uppercase tracking-[0.25em] text-[#e8dcc8]/40">
          {legal}
        </p>
      ) : null}
    </footer>
  )
}
