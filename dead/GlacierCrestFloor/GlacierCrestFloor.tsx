import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface GlacierCrestLink {
  label: string
  href: string
}

export interface GlacierCrestFloorProps {
  brand: string
  tagline?: string
  links?: GlacierCrestLink[]
  legal?: string
  className?: string
}

function IceShelf({
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
        'relative flex items-center justify-center border-t border-[#a8d8ea]/30 bg-gradient-to-b from-[#2a4060]/80 to-[#1a2838]/90 px-6 py-5 shadow-[0_-4px_20px_rgba(168,216,234,0.1)] backdrop-blur-sm',
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

function IceShimmer({ animate }: { animate: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      animate={animate ? { x: ['-100%', '200%'] } : undefined}
      transition={{ duration: motionDuration.emphasis * 2, repeat: animate ? Infinity : 0, ease: 'easeInOut' }}
      aria-hidden
    />
  )
}

export function GlacierCrestFloor({
  brand,
  tagline,
  links = [],
  legal,
  className,
}: GlacierCrestFloorProps) {
  const reduceMotion = useReducedMotion()

  return (
    <footer
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a2838] via-[#243850] to-[#1a2838] text-[#e8f4fc]',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#a8d8ea]/10 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center gap-0 py-20">
        {tagline ? (
          <motion.p
            className="mb-8 max-w-[32ch] text-center text-sm text-[#a8d8ea]/60"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard }}
          >
            {tagline}
          </motion.p>
        ) : null}

        <motion.div
          className="relative mb-2 flex h-[min(28vw,140px)] w-[min(50vw,280px)] items-center justify-center overflow-hidden border border-[#a8d8ea]/40 bg-gradient-to-b from-[#a8d8ea]/20 to-[#2a4060]/60 shadow-[0_8px_32px_rgba(168,216,234,0.2)]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: motionDuration.emphasis }}
        >
          <IceShimmer animate={!reduceMotion} />
          <span className="relative z-10 text-2xl font-black uppercase tracking-[0.15em] text-[#e8f4fc] md:text-4xl">
            {brand}
          </span>
        </motion.div>

        {links.length > 0 ? (
          <div className="flex flex-col items-center gap-0">
            {links.map((link, i) => (
              <IceShelf
                key={link.href}
                width={`min(${90 - i * 8}vw, ${480 - i * 40}px)`}
                delay={0.1 + i * 0.08}
                reduceMotion={reduceMotion}
              >
                <a
                  href={link.href}
                  className="text-sm font-medium uppercase tracking-[0.2em] text-[#a8d8ea] transition hover:text-[#e8f4fc]"
                >
                  {link.label}
                </a>
              </IceShelf>
            ))}
          </div>
        ) : null}

        {legal ? (
          <motion.p
            className="mt-10 max-w-[40ch] text-center text-[10px] uppercase tracking-[0.25em] text-[#a8d8ea]/40"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionDuration.standard, delay: 0.4 }}
          >
            {legal}
          </motion.p>
        ) : null}
      </div>
    </footer>
  )
}
