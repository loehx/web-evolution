import { type FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface FuseWireFormProps {
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

function WireSegment({
  active,
  valid,
  reduceMotion,
}: {
  active: boolean
  valid: boolean
  reduceMotion: boolean | null
}) {
  const glow = active ? 1 : valid ? 0.7 : 0.25

  return (
    <motion.div
      className="relative mx-auto h-8 w-px bg-[#f5a623]/30"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 w-px bg-[#f5a623]"
        animate={{
          scaleY: glow,
          opacity: reduceMotion ? glow : 1,
          boxShadow: active ? '0 0 12px #00d4ff' : '0 0 0px transparent',
        }}
        transition={{ duration: motionDuration.standard }}
        style={{ transformOrigin: 'top' }}
      />
      {active && !reduceMotion ? (
        <motion.div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00d4ff]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [1, 0], scale: [1, 2.5] }}
          transition={{ duration: motionDuration.standard }}
        />
      ) : null}
    </motion.div>
  )
}

export function FuseWireForm({
  eyebrow,
  title,
  body,
  nameLabel = 'Name',
  emailLabel = 'Email',
  messageLabel = 'Message',
  submitLabel = 'Close circuit',
  showName = true,
  showEmail = true,
  showMessage = true,
  disabled = false,
  onSubmit,
  className,
}: FuseWireFormProps) {
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
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0d0d0f] px-4 py-16 text-[#e8e8ea]',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, #f5a623 0px, #f5a623 1px, transparent 1px, transparent 24px)',
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-xl rounded-sm border border-[#f5a623]/20 bg-[#141416] px-6 py-10 shadow-[0_0_60px_rgba(245,166,35,0.08)] md:px-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-[#f5a623] shadow-[0_0_8px_#f5a623]" aria-hidden />
          <div className="h-3 w-3 rounded-full bg-[#f5a623]/40" aria-hidden />
          <div className="h-3 w-3 rounded-full bg-[#f5a623]/20" aria-hidden />
        </div>

        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#00d4ff]/70">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="mt-3 text-3xl font-black uppercase leading-[0.9] tracking-tight text-[#f5a623] md:text-5xl">
          {title}
        </h2>

        {body ? (
          <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-[#e8e8ea]/50 md:text-base">
            {body}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-10">
          {fields.map((field, index) => {
            const isFocused = focused === field.key

            return (
              <div key={field.key}>
                {index > 0 ? (
                  <WireSegment
                    active={isFocused}
                    valid={field.valid}
                    reduceMotion={reduceMotion}
                  />
                ) : null}
                <div className="relative rounded border border-[#f5a623]/15 bg-[#0d0d0f]/80 p-4">
                  <motion.div
                    className="pointer-events-none absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#f5a623]"
                    animate={{
                      boxShadow: isFocused
                        ? '0 0 16px #00d4ff'
                        : field.valid
                          ? '0 0 8px #f5a623'
                          : '0 0 0px transparent',
                    }}
                    transition={{ duration: motionDuration.standard }}
                    aria-hidden
                  />
                  <label className="relative block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#f5a623]/80">
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
                        className="relative mt-2 w-full resize-none border-b border-[#f5a623]/20 bg-transparent py-3 text-base text-[#e8e8ea] outline-none transition-colors focus:border-[#00d4ff]"
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        onFocus={() => setFocused(field.key)}
                        onBlur={() => setFocused(null)}
                        disabled={disabled}
                        className="relative mt-2 w-full border-b border-[#f5a623]/20 bg-transparent py-3 text-base text-[#e8e8ea] outline-none transition-colors focus:border-[#00d4ff]"
                      />
                    )}
                  </label>
                </div>
              </div>
            )
          })}

          <button
            type="submit"
            disabled={disabled}
            className="mt-8 w-full border border-[#f5a623]/40 bg-[#f5a623]/10 py-4 text-xs font-bold uppercase tracking-[0.35em] text-[#f5a623] transition hover:bg-[#f5a623]/20 disabled:opacity-40"
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </section>
  )
}
