import { type FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface ChiselStrikeFormProps {
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

export function ChiselStrikeForm({
  eyebrow,
  title,
  body,
  nameLabel = 'Name',
  emailLabel = 'Email',
  messageLabel = 'Message',
  submitLabel = 'Strike send',
  showName = true,
  showEmail = true,
  showMessage = true,
  disabled = false,
  onSubmit,
  className,
}: ChiselStrikeFormProps) {
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

  const fields = [
    showName && {
      key: 'name',
      label: nameLabel,
      value: name,
      onChange: setName,
      type: 'text' as const,
      valid: name.trim().length > 0,
    },
    showEmail && {
      key: 'email',
      label: emailLabel,
      value: email,
      onChange: setEmail,
      type: 'email' as const,
      valid: isValidEmail(email),
    },
    showMessage && {
      key: 'message',
      label: messageLabel,
      value: message,
      onChange: setMessage,
      type: 'textarea' as const,
      valid: message.trim().length > 5,
    },
  ].filter(Boolean) as Array<{
    key: string
    label: string
    value: string
    onChange: (v: string) => void
    type: 'text' | 'email' | 'textarea'
    valid: boolean
  }>

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#e8e0d4] px-4 py-16 text-[#2a2a2a]',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #2a2a2a 0px, #2a2a2a 1px, transparent 1px, transparent 8px)',
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-xl px-2">
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#d35400]">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="mt-3 text-4xl font-black uppercase leading-[0.9] tracking-tight md:text-6xl">
          {title}
        </h2>

        {body ? (
          <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-[#2a2a2a]/60 md:text-base">
            {body}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          {fields.map((field) => {
            const isFocused = focused === field.key
            const strikeLevel = isFocused ? 1 : field.valid ? 0.6 : 0.2

            return (
              <div key={field.key} className="relative">
                <motion.div
                  className="pointer-events-none absolute -inset-x-2 top-0 h-1 bg-[#d35400]"
                  animate={{
                    scaleX: strikeLevel,
                    opacity: reduceMotion ? strikeLevel : 1,
                  }}
                  transition={{ duration: motionDuration.standard }}
                  style={{ transformOrigin: 'left' }}
                  aria-hidden
                />
                {isFocused && !reduceMotion ? (
                  <motion.div
                    className="pointer-events-none absolute -right-2 top-2 h-2 w-2 rounded-full bg-[#d35400]/40"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0.6, 0], scale: [1, 2] }}
                    transition={{ duration: motionDuration.standard }}
                    aria-hidden
                  />
                ) : null}
                <label className="relative block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d35400]/80">
                    {field.label}
                  </span>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      onFocus={() => setFocused(field.key)}
                      onBlur={() => setFocused(null)}
                      rows={4}
                      disabled={disabled}
                      className="relative mt-2 w-full resize-none border-b-2 border-[#2a2a2a]/20 bg-transparent py-3 text-base text-[#2a2a2a] outline-none transition-colors focus:border-[#d35400]"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      onFocus={() => setFocused(field.key)}
                      onBlur={() => setFocused(null)}
                      disabled={disabled}
                      className="relative mt-2 w-full border-b-2 border-[#2a2a2a]/20 bg-transparent py-3 text-base text-[#2a2a2a] outline-none transition-colors focus:border-[#d35400]"
                    />
                  )}
                </label>
              </div>
            )
          })}

          <button
            type="submit"
            disabled={disabled}
            className="w-full bg-[#2a2a2a] py-4 text-xs font-bold uppercase tracking-[0.35em] text-[#e8e0d4] transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </section>
  )
}
