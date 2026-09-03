import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ModalSpotlightProps {
  open: boolean
  title?: string
  children?: ReactNode
  onClose?: () => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

/**
 * Centered modal with backdrop blur, scale-in animation, and basic focus trap.
 */
export function ModalSpotlight({
  open,
  title,
  children,
  onClose,
  size = 'md',
  className,
}: ModalSpotlightProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const previous = document.activeElement as HTMLElement | null
    panelRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previous?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.button
            type="button"
            aria-label="Close dialog backdrop"
            className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className={cn(
              'relative z-10 w-full rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl shadow-violet-500/10 outline-none',
              sizeClasses[size],
              className,
            )}
          >
            <div className="flex items-start justify-between gap-4">
              {title ? (
                <h2 id={titleId} className="text-lg font-semibold text-zinc-50">
                  {title}
                </h2>
              ) : (
                <span className="sr-only">Dialog</span>
              )}
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-white/5 hover:text-zinc-100"
                  aria-label="Close"
                >
                  ✕
                </button>
              )}
            </div>

            {children && (
              <div className={cn('text-sm leading-relaxed text-zinc-300', title && 'mt-4')}>
                {children}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
