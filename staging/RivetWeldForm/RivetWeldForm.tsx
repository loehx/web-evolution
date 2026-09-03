import { type FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface RivetWeldFormProps {
  eyebrow?: string
  title: string
  body?: string
  nameLabel?: string
  emailLabel?: string
  messageLabel?: string
  submitLabel?: string
  showName?: boolean
  showEmail?: boolean
  showMessage?: boolean
  disabled?: boolean
  onSubmit?: (payload: { name: string; email: string; message: string }) => void
  className?: string
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function RivetMarker({
  active,
  valid,
  reduceMotion,
}: {
  active: boolean
  valid: boolean
  reduceMotion: boolean | null
}) {
  return (
    <div className="relative flex flex-col items-center" aria-hidden>
      <motion.div
        className="h-3 w-3 rounded-full border border-[#e8ecef]/30 bg-[#3a3e44]"
        animate={{
          scale: active ? 1.15 : 1,
          boxShadow: active
            ? '0 0 20px #e85d0480, inset 0 0 8px #e85d0440'
            : valid
              ? '0 0 12px #e85d0460'
              : '0 0 0px transparent',
        }}
        transition={{ duration: reduceMotion ? 0 : motionDuration.standard }}
      />
      <motion.div
        className="mt-1 h-6 w-px origin-top bg-[#e8ecef]/20"
        animate={{
          scaleY: active || valid ? 1 : 0.6,
          backgroundColor: active ? '#e85d0480' : valid ? '#e85d0460' : 'rgba(232,236,239,0.2)',
        }}
        transition={{ duration: reduceMotion ? 0 : motionDuration.standard }}
      />
    </div>
  )
}

function WeldGlow({
  active,
  valid,
  reduceMotion,
}: {
  active: boolean
  valid: boolean
  reduceMotion: boolean | null
}) {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 h-1 origin-left rounded-full"
      animate={{
        scaleX: active || valid ? 1 : 0,
        backgroundColor: valid ? '#e85d04' : active ? '#e85d0480' : 'transparent',
        boxShadow: active ? '0 0 20px #e85d0460' : '0 0 0px transparent',
      }}
      transition={{ duration: reduceMotion ? 0 : motionDuration.standard }}
      aria-hidden
    />
  )
}

export function RivetWeldForm({
  eyebrow,
  title,
  body,
  nameLabel = 'Name',
  emailLabel = 'Email',
  messageLabel = 'Message',
  submitLabel = 'Weld send',
  showName = true,
  showEmail = true,
  showMessage = true,
  disabled = false,
  onSubmit,
  className,
}: RivetWeldFormProps) {
  const reduceMotion = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [focused, setFocused] = useState<string | null>(null)
  const [pulse, setPulse] = useState(false)

  const nameValid = name.trim().length > 1
  const emailValid = isValidEmail(email)
  const messageValid = message.trim().length > 5

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (disabled) return
    setPulse(true)
    setTimeout(() => setPulse(false), 600)
    onSubmit?.({ name, email, message })
  }

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#1a1e24] px-6 py-20 text-[#e8ecef]',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(232,236,239,0.03) 2px, rgba(232,236,239,0.03) 4px)',
        }}
        aria-hidden
      />

      <motion.div
        className="relative w-full max-w-lg rounded-sm border border-[#e8ecef]/10 bg-[#2a2e34]/90 p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur-sm md:p-10"
        animate={pulse && !reduceMotion ? { scale: [1, 1.01, 1] } : { scale: 1 }}
        transition={{ duration: motionDuration.emphasis }}
      >
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#e8ecef]/50">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.05em] md:text-4xl">{title}</h1>

        {body ? (
          <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-[#e8ecef]/60">{body}</p>
        ) : null}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          {showName ? (
            <div className="flex gap-4">
              <RivetMarker
                active={focused === 'name'}
                valid={nameValid && focused !== 'name'}
                reduceMotion={reduceMotion}
              />
              <div className="relative flex-1">
                <label htmlFor="rivet-name" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e8ecef]/50">
                  {nameLabel}
                </label>
                <input
                  id="rivet-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  disabled={disabled}
                  className="mt-2 w-full border-b border-[#e8ecef]/20 bg-transparent py-2 text-[#e8ecef] outline-none transition focus:border-[#e85d04]/50"
                />
                <WeldGlow active={focused === 'name'} valid={nameValid} reduceMotion={reduceMotion} />
              </div>
            </div>
          ) : null}

          {showEmail ? (
            <div className="flex gap-4">
              <RivetMarker
                active={focused === 'email'}
                valid={emailValid && focused !== 'email'}
                reduceMotion={reduceMotion}
              />
              <div className="relative flex-1">
                <label htmlFor="rivet-email" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e8ecef]/50">
                  {emailLabel}
                </label>
                <input
                  id="rivet-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  disabled={disabled}
                  className="mt-2 w-full border-b border-[#e8ecef]/20 bg-transparent py-2 text-[#e8ecef] outline-none transition focus:border-[#e85d04]/50"
                />
                <WeldGlow active={focused === 'email'} valid={emailValid} reduceMotion={reduceMotion} />
              </div>
            </div>
          ) : null}

          {showMessage ? (
            <div className="flex gap-4">
              <RivetMarker
                active={focused === 'message'}
                valid={messageValid && focused !== 'message'}
                reduceMotion={reduceMotion}
              />
              <div className="relative flex-1">
                <label htmlFor="rivet-message" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e8ecef]/50">
                  {messageLabel}
                </label>
                <textarea
                  id="rivet-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  disabled={disabled}
                  rows={4}
                  className="mt-2 w-full resize-none border-b border-[#e8ecef]/20 bg-transparent py-2 text-[#e8ecef] outline-none transition focus:border-[#e85d04]/50"
                />
                <WeldGlow active={focused === 'message'} valid={messageValid} reduceMotion={reduceMotion} />
              </div>
            </div>
          ) : null}

          <motion.button
            type="submit"
            disabled={disabled}
            className={cn(
              'mt-4 w-full border border-[#e85d04]/50 bg-[#e85d04]/10 py-4 text-xs font-bold uppercase tracking-[0.35em] text-[#e85d04] transition hover:bg-[#e85d04]/20',
              disabled && 'pointer-events-none opacity-40',
            )}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            {submitLabel}
          </motion.button>
        </form>
      </motion.div>
    </section>
  )
}
