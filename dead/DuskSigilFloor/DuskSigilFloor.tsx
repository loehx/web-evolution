import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface DuskSigilLink {
  label: string
  href: string
}

export interface DuskSigilFloorProps {
  brand: string
  tagline?: string
  links?: DuskSigilLink[]
  legal?: string
  className?: string
}

export function DuskSigilFloor({
  brand,
  tagline,
  links = [],
  legal,
  className,
}: DuskSigilFloorProps) {
  const reduceMotion = useReducedMotion()
  const linkCount = links.length

  return (
    <footer
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-gradient-to-b from-[#4a3f5c] via-[#2d2640] to-[#1a1528] text-[#f0e8dc]',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#c9a962]/15 to-transparent"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-20">
        {tagline ? (
          <p className="mb-8 max-w-[32ch] text-center font-serif text-sm italic text-[#f0e8dc]/60">
            {tagline}
          </p>
        ) : null}

        <motion.div
          className="relative flex h-[min(70vw,380px)] w-[min(70vw,380px)] items-center justify-center"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: motionDuration.emphasis }}
        >
          <div
            className="absolute inset-0 rounded-full border-2 border-[#c9a962]/40 shadow-[inset_0_0_40px_rgba(201,169,98,0.15)]"
            aria-hidden
          />

          {links.map((link, i) => {
            const angle = linkCount > 0 ? (i / linkCount) * 360 - 90 : 0
            const radius = 42
            return (
              <a
                key={link.href + link.label}
                href={link.href}
                className="absolute text-center text-xs font-medium uppercase tracking-[0.2em] text-[#f0e8dc]/80 transition-colors hover:text-[#c9a962] md:text-sm"
                style={{
                  left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * radius}%)`,
                  top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * radius}%)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {link.label}
              </a>
            )
          })}

          <div className="relative z-10 grid h-[min(40vw,200px)] w-[min(40vw,200px)] place-items-center rounded-full bg-gradient-to-br from-[#c9a962] to-[#8b7355] shadow-[0_8px_32px_rgba(201,169,98,0.35)]">
            <p
              className="max-w-[10ch] text-center font-serif text-[clamp(1.1rem,3.5vw,1.75rem)] font-semibold leading-tight text-[#1a1528]"
              aria-label={brand}
            >
              {brand || '—'}
            </p>
          </div>
        </motion.div>

        {linkCount === 0 ? (
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[#f0e8dc]/40">
            No links
          </p>
        ) : null}
      </div>

      {legal ? (
        <p className="border-t border-[#c9a962]/20 px-6 py-5 text-center text-[10px] uppercase tracking-[0.28em] text-[#f0e8dc]/45 md:px-12">
          {legal}
        </p>
      ) : null}
    </footer>
  )
}
