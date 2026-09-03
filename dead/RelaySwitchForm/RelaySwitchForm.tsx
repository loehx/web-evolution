import { type FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface RelaySwitchFormProps {
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

function RelaySwitch({
  active,
  valid,
  reduceMotion,
}: {
  active: boolean
  valid: boolean
  reduceMotion: boolean | null
}) {
  return (
    <div className="flex h-10 w-16 items-center" aria-hidden>
      <motion.div
        className={cn(
          'relative h-6 w-12 rounded-sm border',
          valid ? 'border-[#3dd68c]/50 bg-[#3dd68c]/10' : 'border-[#f0a030]/30 bg-[#12141a]',
        )}
      >
        <motion.div
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-sm',
            active || valid ? 'bg-[#f0a030]' : 'bg-[#2a2d35]',
          )}
          animate={{
            left: active || valid ? 'calc(100% - 22px)' : '2px',
            boxShadow: active ? '0 0 12px #f0a030' : '0 0 0px transparent',
          }}
          transition={{ duration: reduceMotion ? 0 : motionDuration.standard }}
        />
      </motion.div>
    </div>
  )
}

export function RelaySwitchForm({
  eyebrow,
  title,
  body,
  nameLabel = 'Name',
  emailLabel = 'Email',
  messageLabel = 'Message',
  submitLabel = 'Close relay',
  showName = true,
  showEmail = true,
  showMessage = true,
  disabled = false,
  onSubmit,
  className,
}: RelaySwitchFormProps) {
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
      valid: message.trim().length > 3,
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
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0a0b0e] px-6 py-20 text-white',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#f0a03008,transparent_60%)]"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-lg border border-[#f0a030]/20 bg-[#12141a]/90 p-8 md:p-10">
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#f0a030]/70">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
          {title}
        </h2>

        {body ? (
          <p className="mt-4 text-sm leading-relaxed text-white/55">{body}</p>
        ) : null}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.key} className="flex items-start gap-4">
              <RelaySwitch
                active={focused === field.key}
                valid={field.valid}
                reduceMotion={reduceMotion}
              />
              <div className="flex-1">
                <label
                  htmlFor={`relay-${field.key}`}
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#f0a030]/60"
                >
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={`relay-${field.key}`}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onFocus={() => setFocused(field.key)}
                    onBlur={() => setFocused(null)}
                    rows={4}
                    className="mt-2 w-full border border-white/10 bg-[#0a0b0e] px-3 py-2 text-sm text-white outline-none transition focus:border-[#f0a030]/50"
                  />
                ) : (
                  <input
                    id={`relay-${field.key}`}
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onFocus={() => setFocused(field.key)}
                    onBlur={() => setFocused(null)}
                    className="mt-2 w-full border border-white/10 bg-[#0a0b0e] px-3 py-2 text-sm text-white outline-none transition focus:border-[#f0a030]/50"
                  />
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={disabled}
            className={cn(
              'mt-4 w-full border px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] transition',
              disabled
                ? 'border-white/10 text-white/30'
                : 'border-[#3dd68c]/50 bg-[#3dd68c]/10 text-[#3dd68c] hover:bg-[#3dd68c]/20',
            )}
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </section>
  )
}
