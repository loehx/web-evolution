import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface PromontoryCrestLink {
  label: string
  href: string
}

export interface PromontoryCrestFloorProps {
  brand: string
  tagline?: string
  links?: PromontoryCrestLink[]
  legal?: string
  className?: string
}

function CliffShelf({
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
        'relative flex flex-wrap items-center justify-center gap-4 border-t border-[#e8e4e0]/20 bg-gradient-to-b from-[#8a7a68]/95 to-[#6a5a48]/95 px-6 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.25)]',
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

function CliffSilhouette() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-0 h-32 w-full"
      viewBox="0 0 400 80"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0,80 L0,60 L60,40 L120,55 L180,25 L240,50 L300,30 L360,45 L400,35 L400,80 Z"
        fill="#4a4a48"
        opacity="0.6"
      />
    </svg>
  )
}

function MistLayer({ animate }: { animate: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#e8e4e0]/25 via-transparent to-transparent blur-sm"
        animate={animate ? { opacity: [0.2, 0.5, 0.2], y: [0, -10, 0] } : { opacity: 0.3 }}
        transition={{ duration: motionDuration.emphasis * 2, repeat: animate ? Infinity : 0 }}
      />
    </div>
  )
}

export function PromontoryCrestFloor({
  brand,
  tagline,
  links = [],
  legal,
  className,
}: PromontoryCrestFloorProps) {
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
      <CliffSilhouette />
      <MistLayer animate={!reduceMotion} />

      <motion.div
        className="relative z-10 mb-8 text-center"
        initial={reduceMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionDuration.standard }}
      >
        <p className="text-4xl font-bold tracking-tight md:text-6xl">{brand}</p>
        {tagline ? (
          <p className="mt-3 max-w-[40ch] text-sm text-[#e8e4e0]/70">{tagline}</p>
        ) : null}
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-0">
        {linkGroups[0].length > 0 ? (
          <CliffShelf width="min(90vw, 36rem)" delay={0.1} reduceMotion={reduceMotion}>
            {linkGroups[0].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.25em] text-[#e8e4e0]/80 hover:text-[#c8a878]"
              >
                {link.label}
              </a>
            ))}
          </CliffShelf>
        ) : null}

        {linkGroups[1].length > 0 ? (
          <CliffShelf width="min(85vw, 30rem)" delay={0.2} reduceMotion={reduceMotion}>
            {linkGroups[1].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.25em] text-[#e8e4e0]/70 hover:text-[#c8a878]"
              >
                {link.label}
              </a>
            ))}
          </CliffShelf>
        ) : null}

        {legal ? (
          <CliffShelf width="min(80vw, 24rem)" delay={0.3} reduceMotion={reduceMotion}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#e8e4e0]/50">{legal}</p>
          </CliffShelf>
        ) : null}
      </div>
    </footer>
  )
}
