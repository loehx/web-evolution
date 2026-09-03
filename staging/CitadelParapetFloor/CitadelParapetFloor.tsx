import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface CitadelParapetLink {
  label: string
  href: string
}

export interface CitadelParapetFloorProps {
  brand: string
  tagline?: string
  links?: CitadelParapetLink[]
  legal?: string
  className?: string
}

function RampartShelf({
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
        'relative flex flex-wrap items-center justify-center gap-4 border-t border-[#c9a227]/20 bg-gradient-to-b from-[#5a5a58]/95 to-[#4a4a48]/95 px-6 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]',
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

function ParapetSilhouette() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full"
      viewBox="0 0 400 60"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0,60 L0,40 L20,40 L20,25 L40,25 L40,40 L60,40 L60,20 L80,20 L80,40 L100,40 L100,30 L120,30 L120,40 L140,40 L140,15 L160,15 L160,40 L180,40 L180,25 L200,25 L200,40 L220,40 L220,20 L240,20 L240,40 L260,40 L260,30 L280,30 L280,40 L300,40 L300,25 L320,25 L320,40 L340,40 L340,20 L360,20 L360,40 L380,40 L380,30 L400,30 L400,60 Z"
        fill="#3a3a38"
        opacity="0.8"
      />
    </svg>
  )
}

function MistLayer({ animate }: { animate: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#e8e4e0]/20 via-transparent to-transparent blur-sm"
        animate={animate ? { opacity: [0.15, 0.4, 0.15], y: [0, -8, 0] } : { opacity: 0.2 }}
        transition={{ duration: motionDuration.emphasis * 2, repeat: animate ? Infinity : 0 }}
      />
    </div>
  )
}

export function CitadelParapetFloor({
  brand,
  tagline,
  links = [],
  legal,
  className,
}: CitadelParapetFloorProps) {
  const reduceMotion = useReducedMotion()
  const linkGroups = [
    links.slice(0, Math.ceil(links.length / 2)),
    links.slice(Math.ceil(links.length / 2)),
  ]

  return (
    <footer
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#2a2826] via-[#3a3836] to-[#1a1816] text-[#e8e4e0]',
        className,
      )}
    >
      <ParapetSilhouette />
      <MistLayer animate={!reduceMotion} />

      <motion.div
        className="relative z-10 text-center"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: motionDuration.emphasis }}
      >
        <p className="text-[clamp(2.5rem,12vw,8rem)] font-bold uppercase leading-[0.85] tracking-tight text-[#c9a227]">
          {brand}
        </p>
        {tagline ? (
          <p className="mx-auto mt-4 max-w-[40ch] text-sm text-[#e8e4e0]/60">{tagline}</p>
        ) : null}
      </motion.div>

      <div className="relative z-10 mt-16 flex w-full flex-col items-center gap-0">
        {linkGroups.map((group, gi) =>
          group.length > 0 ? (
            <RampartShelf
              key={gi}
              width={`${100 - gi * 12}%`}
              delay={gi * 0.1}
              reduceMotion={reduceMotion}
            >
              {group.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.25em] text-[#e8e4e0]/80 transition-colors hover:text-[#c9a227]"
                >
                  {link.label}
                </a>
              ))}
            </RampartShelf>
          ) : null,
        )}
      </div>

      {legal ? (
        <p className="relative z-10 mt-8 px-6 text-center text-[10px] uppercase tracking-[0.3em] text-[#e8e4e0]/40">
          {legal}
        </p>
      ) : null}
    </footer>
  )
}
