import { type FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface SentinelGateFormProps {
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

export function SentinelGateForm({
  eyebrow,
  title,
  body,
  nameLabel = 'Name',
  emailLabel = 'Email',
  messageLabel = 'Message',
  submitLabel = 'Pass through',
  showName = true,
  showEmail = true,
  showMessage = true,
  disabled = false,
  onSubmit,
  className,
}: SentinelGateFormProps) {
  const reduceMotion = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (disabled) return
    onSubmit?.({ name, email, message })
  }

  const gateOpen = focused !== null || name.length > 0 || email.length > 0 || message.length > 0

  const fields = [
    showName && {
      key: 'name',
      label: nameLabel,
      value: name,
      onChange: setName,
      type: 'text' as const,
    },
    showEmail && {
      key: 'email',
      label: emailLabel,
      value: email,
      onChange: setEmail,
      type: 'email' as const,
    },
  ].filter(Boolean) as Array<{
    key: string
    label: string
    value: string
    onChange: (v: string) => void
    type: 'text' | 'email'
  }>

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#2a2d32] px-4 py-16 text-[#e8e4dc]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[12vw] max-w-[80px] bg-[#1a1c20]" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[12vw] max-w-[80px] bg-[#1a1c20]" aria-hidden />

      <motion.div
        className="pointer-events-none absolute inset-y-8 left-[10vw] w-3 bg-[#c45c26] md:left-[14vw]"
        animate={{ x: gateOpen && !reduceMotion ? -24 : 0 }}
        transition={{ duration: motionDuration.standard }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-y-8 right-[10vw] w-3 bg-[#c45c26] md:right-[14vw]"
        animate={{ x: gateOpen && !reduceMotion ? 24 : 0 }}
        transition={{ duration: motionDuration.standard }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-xl px-4">
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#c45c26]">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="mt-3 text-4xl font-black uppercase leading-[0.9] tracking-tight md:text-6xl">
          {title}
        </h2>

        {body ? (
          <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-[#e8e4dc]/65 md:text-base">
            {body}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {fields.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={`sentinel-${field.key}`}
                className="block font-mono text-[10px] uppercase tracking-[0.35em] text-[#e8e4dc]/55"
              >
                {field.label}
              </label>
              <input
                id={`sentinel-${field.key}`}
                type={field.type}
                value={field.value}
                disabled={disabled}
                onChange={(e) => field.onChange(e.target.value)}
                onFocus={() => setFocused(field.key)}
                onBlur={() => setFocused(null)}
                className="mt-2 w-full border-b-2 border-[#e8e4dc]/25 bg-transparent py-3 text-lg font-medium text-[#e8e4dc] outline-none transition-colors focus:border-[#c45c26]"
              />
            </div>
          ))}

          {showMessage ? (
            <div>
              <label
                htmlFor="sentinel-message"
                className="block font-mono text-[10px] uppercase tracking-[0.35em] text-[#e8e4dc]/55"
              >
                {messageLabel}
              </label>
              <textarea
                id="sentinel-message"
                value={message}
                disabled={disabled}
                rows={4}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                className="mt-2 w-full resize-none border-b-2 border-[#e8e4dc]/25 bg-transparent py-3 text-lg font-medium text-[#e8e4dc] outline-none transition-colors focus:border-[#c45c26]"
              />
            </div>
          ) : null}

          <motion.button
            type="submit"
            disabled={disabled}
            className={cn(
              'mt-4 w-full bg-[#c45c26] py-4 text-sm font-black uppercase tracking-[0.35em] text-[#1a1c20] transition-opacity',
              disabled && 'cursor-not-allowed opacity-40',
            )}
            whileTap={reduceMotion || disabled ? undefined : { scale: 0.98 }}
            transition={{ duration: motionDuration.micro }}
          >
            {submitLabel}
          </motion.button>
        </form>

        {showEmail && email.length > 0 && !isValidEmail(email) ? (
          <p className="mt-3 font-mono text-xs text-[#c45c26]">Invalid email format</p>
        ) : null}
      </div>
    </section>
  )
}
