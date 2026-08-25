import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface BasaltShelfLink {
  label: string
  href: string
}

export interface BasaltShelfFloorProps {
  brand: string
  tagline?: string
  links?: BasaltShelfLink[]
  legal?: string
  className?: string
}

function ShelfSlab({
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
        'relative flex items-center justify-center border-t border-[#5a5a60]/40 bg-gradient-to-b from-[#4a4a50] to-[#2a2a2e] px-6 py-5 shadow-[0_-4px_16px_rgba(0,0,0,0.35)]',
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

export function BasaltShelfFloor({
  brand,
  tagline,
  links = [],
  legal,
  className,
}: BasaltShelfFloorProps) {
  const reduceMotion = useReducedMotion()

  return (
    <footer
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a1a1e] via-[#2a2a2e] to-[#1a1a1e] text-[#e8e8ec]',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center gap-0 py-20">
        {tagline ? (
          <motion.p
            className="mb-8 max-w-[32ch] text-center text-sm text-[#e8e8ec]/50"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard }}
          >
            {tagline}
          </motion.p>
        ) : null}

        <motion.div
          className="relative mb-2 flex h-[min(28vw,140px)] w-[min(50vw,280px)] items-center justify-center border border-[#c45c26]/30 bg-gradient-to-b from-[#4a4a50] to-[#2a2a2e] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: motionDuration.emphasis }}
        >
          <span className="text-2xl font-black uppercase tracking-[0.15em] text-[#c45c26] md:text-4xl">
            {brand}
          </span>
        </motion.div>

        {links.length > 0 ? (
          <div className="flex flex-col items-center gap-0">
            {links.map((link, i) => (
              <ShelfSlab
                key={link.href}
                width={`min(${90 - i * 8}vw, ${480 - i * 40}px)`}
                delay={0.1 + i * 0.08}
                reduceMotion={reduceMotion}
              >
                <a
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-[0.35em] text-[#e8e8ec]/70 transition hover:text-[#c45c26]"
                >
                  {link.label}
                </a>
              </ShelfSlab>
            ))}
          </div>
        ) : null}

        {legal ? (
          <motion.p
            className="mt-10 text-center text-[10px] uppercase tracking-[0.3em] text-[#e8e8ec]/35"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionDuration.standard, delay: 0.5 }}
          >
            {legal}
          </motion.p>
        ) : null}
      </div>
    </footer>
  )
}
