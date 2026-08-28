import { type FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface ShaleBedFormProps {
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

function StratumLayer({
  index,
  active,
  valid,
  reduceMotion,
  children,
}: {
  index: number
  active: boolean
  valid: boolean
  reduceMotion: boolean | null
  children: React.ReactNode
}) {
  const shades = ['#4a4a4c', '#5a5a5c', '#6a6a6c', '#5a5a5c']
  return (
    <motion.div
      className="relative border-t border-[#e8e4dc]/10 px-6 py-5 md:px-8"
      style={{ backgroundColor: shades[index % shades.length] }}
      animate={{
        x: active && !reduceMotion ? 8 : 0,
        boxShadow: active
          ? 'inset 4px 0 0 #c9a227'
          : valid
            ? 'inset 4px 0 0 #c9a22780'
            : 'inset 0 0 0 transparent',
      }}
      transition={{ duration: reduceMotion ? 0 : motionDuration.standard }}
    >
      {children}
    </motion.div>
  )
}

export function ShaleBedForm({
  eyebrow,
  title,
  body,
  nameLabel = 'Name',
  emailLabel = 'Email',
  messageLabel = 'Message',
  submitLabel = 'Send inquiry',
  showName = true,
  showEmail = true,
  showMessage = true,
  disabled = false,
  onSubmit,
  className,
}: ShaleBedFormProps) {
  const reduceMotion = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [activeField, setActiveField] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const nameValid = name.trim().length > 1
  const emailValid = isValidEmail(email)
  const messageValid = message.trim().length > 10

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (disabled) return
    onSubmit?.({ name, email, message })
    setSubmitted(true)
  }

  let layerIndex = 0

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#3a3a3c] px-4 py-16 text-[#e8e4dc]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute inset-x-0 border-t border-[#e8e4dc]/10"
            style={{ top: `${15 + i * 14}%` }}
          />
        ))}
      </div>

      <header className="relative z-10 mb-8 max-w-lg text-center">
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#c9a227]/70">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-5xl">{title}</h2>
        {body ? <p className="mt-4 text-sm text-[#e8e4dc]/60">{body}</p> : null}
      </header>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg overflow-hidden shadow-2xl"
        noValidate
      >
        {showName ? (
          <StratumLayer
            index={layerIndex++}
            active={activeField === 'name'}
            valid={nameValid}
            reduceMotion={reduceMotion}
          >
            <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#c9a227]/80">
              {nameLabel}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setActiveField('name')}
              onBlur={() => setActiveField(null)}
              disabled={disabled}
              className="mt-2 w-full border-0 bg-transparent text-lg text-[#e8e4dc] outline-none placeholder:text-[#e8e4dc]/30"
              placeholder="Your name"
            />
          </StratumLayer>
        ) : null}

        {showEmail ? (
          <StratumLayer
            index={layerIndex++}
            active={activeField === 'email'}
            valid={emailValid}
            reduceMotion={reduceMotion}
          >
            <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#c9a227]/80">
              {emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setActiveField('email')}
              onBlur={() => setActiveField(null)}
              disabled={disabled}
              className="mt-2 w-full border-0 bg-transparent text-lg text-[#e8e4dc] outline-none placeholder:text-[#e8e4dc]/30"
              placeholder="you@studio.com"
            />
          </StratumLayer>
        ) : null}

        {showMessage ? (
          <StratumLayer
            index={layerIndex++}
            active={activeField === 'message'}
            valid={messageValid}
            reduceMotion={reduceMotion}
          >
            <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#c9a227]/80">
              {messageLabel}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setActiveField('message')}
              onBlur={() => setActiveField(null)}
              disabled={disabled}
              rows={4}
              className="mt-2 w-full resize-none border-0 bg-transparent text-lg text-[#e8e4dc] outline-none placeholder:text-[#e8e4dc]/30"
              placeholder="Describe your project..."
            />
          </StratumLayer>
        ) : null}

        <motion.button
          type="submit"
          disabled={disabled || submitted}
          className="w-full bg-[#c9a227] py-4 text-sm font-bold uppercase tracking-[0.3em] text-[#2a2a2c] disabled:opacity-40"
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          {submitted ? 'Sent — we will reply soon' : submitLabel}
        </motion.button>
      </form>
    </section>
  )
}
