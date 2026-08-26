import { type FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface AnvilStrikeFormProps {
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

function StrikeBar({
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
      className="absolute inset-x-0 bottom-0 h-1 origin-left"
      animate={{
        scaleX: active || valid ? 1 : 0,
        backgroundColor: valid ? '#e85d04' : active ? '#e85d0480' : 'transparent',
        boxShadow: active ? '0 0 16px #e85d0460' : '0 0 0px transparent',
      }}
      transition={{ duration: reduceMotion ? 0 : motionDuration.standard }}
      aria-hidden
    />
  )
}

function AnvilBase({ pulse, reduceMotion }: { pulse: boolean; reduceMotion: boolean | null }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center" aria-hidden>
      <motion.div
        className="relative h-16 w-[min(80vw,400px)]"
        animate={
          pulse && !reduceMotion
            ? { scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] }
            : { scale: 1, opacity: 0.8 }
        }
        transition={{ duration: motionDuration.emphasis }}
      >
        <div className="absolute inset-x-[15%] bottom-0 h-8 bg-gradient-to-b from-[#4a4a50] to-[#2a2a2e] clip-path-anvil" />
        <div
          className="absolute inset-x-[25%] bottom-6 h-4 bg-[#3a3a40]"
          style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}
        />
        <div className="absolute inset-x-[5%] bottom-0 h-3 rounded-b-sm bg-[#1a1410]" />
      </motion.div>
    </div>
  )
}

export function AnvilStrikeForm({
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
}: AnvilStrikeFormProps) {
  const reduceMotion = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [focused, setFocused] = useState<string | null>(null)
  const [pulse, setPulse] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (disabled) return
    setPulse(true)
    setTimeout(() => setPulse(false), 600)
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
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#1a1410] px-6 py-20 pb-28 text-white',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,#e85d0408,transparent_50%)]"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-lg border border-[#e85d04]/20 bg-[#12100e]/90 p-8 md:p-10">
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#e85d04]/70">
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
            <div key={field.key} className="relative">
              <label
                htmlFor={`anvil-${field.key}`}
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#e85d04]/60"
              >
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={`anvil-${field.key}`}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  onFocus={() => setFocused(field.key)}
                  onBlur={() => setFocused(null)}
                  rows={4}
                  className="mt-2 w-full border-0 border-b border-white/10 bg-transparent px-0 py-2 text-sm text-white outline-none transition focus:border-[#e85d04]/50"
                />
              ) : (
                <input
                  id={`anvil-${field.key}`}
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  onFocus={() => setFocused(field.key)}
                  onBlur={() => setFocused(null)}
                  className="mt-2 w-full border-0 border-b border-white/10 bg-transparent px-0 py-2 text-sm text-white outline-none transition focus:border-[#e85d04]/50"
                />
              )}
              <StrikeBar
                active={focused === field.key}
                valid={field.valid}
                reduceMotion={reduceMotion}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={disabled}
            className={cn(
              'mt-4 w-full border px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] transition',
              disabled
                ? 'border-white/10 text-white/30'
                : 'border-[#e85d04]/50 bg-[#e85d04]/10 text-[#e85d04] hover:bg-[#e85d04]/20',
            )}
          >
            {submitLabel}
          </button>
        </form>
      </div>

      <AnvilBase pulse={pulse} reduceMotion={reduceMotion} />
    </section>
  )
}
