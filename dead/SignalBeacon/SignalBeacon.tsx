import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { motionDuration } from '@/lib/motion'

export interface SignalBeaconProps {
  title?: string
  body?: string
  nameLabel?: string
  emailLabel?: string
  messageLabel?: string
  namePlaceholder?: string
  emailPlaceholder?: string
  messagePlaceholder?: string
  submitLabel?: string
  showName?: boolean
  showEmail?: boolean
  showMessage?: boolean
  onSubmit?: (data: { name: string; email: string; message: string }) => void
  className?: string
}

function SignalBars({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <div className="flex flex-col-reverse gap-0.5" aria-hidden>
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className={cn(
            'h-2 w-3 border border-[#2a2520]/30 transition-colors',
            i < level ? 'bg-[#ff5c00]' : 'bg-[#2a2520]/10',
          )}
        />
      ))}
    </div>
  )
}

function fieldLevel(value: string, min = 1, max = 5) {
  if (!value.trim()) return 0
  const len = value.trim().length
  return Math.min(max, Math.max(min, Math.ceil(len / 8)))
}

export function SignalBeacon({
  title = 'Transmit',
  body,
  nameLabel = 'Name',
  emailLabel = 'Email',
  messageLabel = 'Message',
  namePlaceholder = 'Your name',
  emailPlaceholder = 'you@studio.example',
  messagePlaceholder = 'What should we know?',
  submitLabel = 'Send signal',
  showName = true,
  showEmail = true,
  showMessage = true,
  onSubmit,
  className,
}: SignalBeaconProps) {
  const reduceMotion = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const levels = useMemo(
    () => ({
      name: fieldLevel(name),
      email: fieldLevel(email, 1, 5),
      message: fieldLevel(message, 1, 5),
    }),
    [name, email, message],
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ name, email, message })
    setSent(true)
  }

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full items-center bg-[#d4d0c8] px-5 py-16 text-[#2a2520] md:px-10',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-md md:mx-0 md:ml-[10vw]">
        {title ? (
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">{title}</h1>
        ) : null}
        {body ? (
          <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-[#2a2520]/75 md:text-base">
            {body}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {showName ? (
            <label className="flex gap-4">
              <SignalBars level={levels.name} />
              <span className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em]">
                  {nameLabel}
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={namePlaceholder}
                  className="mt-1 w-full border-b-2 border-[#2a2520] bg-transparent py-2 font-mono text-sm outline-none"
                  autoComplete="name"
                />
              </span>
            </label>
          ) : null}

          {showEmail ? (
            <label className="flex gap-4">
              <SignalBars level={levels.email} />
              <span className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em]">
                  {emailLabel}
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={emailPlaceholder}
                  className="mt-1 w-full border-b-2 border-[#2a2520] bg-transparent py-2 font-mono text-sm outline-none"
                  autoComplete="email"
                  required={showEmail}
                />
              </span>
            </label>
          ) : null}

          {showMessage ? (
            <label className="flex gap-4">
              <SignalBars level={levels.message} max={6} />
              <span className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em]">
                  {messageLabel}
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={messagePlaceholder}
                  rows={4}
                  className="mt-1 w-full resize-y border-b-2 border-[#2a2520] bg-transparent py-2 font-mono text-sm outline-none"
                  required={showMessage}
                />
              </span>
            </label>
          ) : null}

          <motion.button
            type="submit"
            disabled={sent}
            className="w-full bg-[#ff5c00] py-4 text-xs font-black uppercase tracking-[0.4em] text-[#2a2520] disabled:opacity-60"
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            animate={sent ? { x: [0, -4, 4, 0] } : {}}
            transition={{ duration: motionDuration.micro }}
          >
            {sent ? 'Signal sent' : submitLabel}
          </motion.button>
        </form>
      </div>

      <div
        className="pointer-events-none absolute right-[8vw] top-1/2 hidden h-[60%] w-px -translate-y-1/2 bg-[#2a2520]/20 md:block"
        aria-hidden
      />
    </section>
  )
}
