import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface FjordMistLink {
  label: string
  href: string
}

export interface FjordMistFloorProps {
  brand: string
  tagline?: string
  links?: FjordMistLink[]
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
        'relative flex items-center justify-center border-t border-[#e8f0f4]/20 bg-gradient-to-b from-[#3a4a58]/90 to-[#2a3848]/95 px-6 py-5 shadow-[0_-4px_24px_rgba(0,0,0,0.3)]',
        className,
      )}
      style={{ width }}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionDuration.standard, delay }}
    >
      {children}
    </motion.div>
  )
}

function MistDrift({ animate }: { animate: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#e8f0f4]/25 via-[#e8f0f4]/10 to-transparent"
        animate={animate ? { opacity: [0.3, 0.6, 0.3], y: [0, -12, 0] } : { opacity: 0.4 }}
        transition={{ duration: motionDuration.emphasis * 2, repeat: animate ? Infinity : 0, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#e8f0f4]/15 to-transparent blur-xl"
        animate={animate ? { x: ['-5%', '5%', '-5%'] } : undefined}
        transition={{ duration: motionDuration.emphasis * 3, repeat: animate ? Infinity : 0, ease: 'easeInOut' }}
      />
    </div>
  )
}

export function FjordMistFloor({
  brand,
  tagline,
  links = [],
  legal,
  className,
}: FjordMistFloorProps) {
  const reduceMotion = useReducedMotion()

  return (
    <footer
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a2838] via-[#2a3848] to-[#1a2838] text-[#e8f0f4]',
        className,
      )}
    >
      <MistDrift animate={!reduceMotion} />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#3a4a58]/40 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center gap-0 py-20">
        {tagline ? (
          <motion.p
            className="mb-8 max-w-[32ch] text-center text-sm text-[#e8f0f4]/55"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard }}
          >
            {tagline}
          </motion.p>
        ) : null}

        <motion.div
          className="relative mb-2 flex h-[min(24vw,120px)] w-[min(48vw,260px)] items-center justify-center overflow-hidden border border-[#e8f0f4]/25 bg-gradient-to-b from-[#3a4a58] to-[#2a3848] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          style={{ clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)' }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: motionDuration.emphasis }}
        >
          <span className="relative z-10 text-xl font-black uppercase tracking-[0.12em] text-[#e8f0f4] md:text-3xl">
            {brand}
          </span>
        </motion.div>

        {links.length > 0 ? (
          <div className="flex flex-col items-center gap-0">
            {links.map((link, i) => (
              <CliffShelf
                key={link.href}
                width={`min(${92 - i * 7}vw, ${500 - i * 36}px)`}
                delay={0.1 + i * 0.08}
                reduceMotion={reduceMotion}
              >
                <a
                  href={link.href}
                  className="text-sm font-medium uppercase tracking-[0.2em] text-[#e8f0f4]/80 transition hover:text-[#e8f0f4]"
                >
                  {link.label}
                </a>
              </CliffShelf>
            ))}
          </div>
        ) : null}

        {legal ? (
          <motion.p
            className="mt-10 max-w-[40ch] text-center text-[10px] uppercase tracking-[0.25em] text-[#e8f0f4]/35"
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
