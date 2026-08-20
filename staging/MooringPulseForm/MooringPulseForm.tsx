import { type FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface MooringPulseFormProps {
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

export function MooringPulseForm({
  eyebrow,
  title,
  body,
  nameLabel = 'Name',
  emailLabel = 'Email',
  messageLabel = 'Message',
  submitLabel = 'Cast line',
  showName = true,
  showEmail = true,
  showMessage = true,
  disabled = false,
  onSubmit,
  className,
}: MooringPulseFormProps) {
  const reduceMotion = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  const nameValid = showName && name.trim().length > 1
  const emailValid = showEmail && isValidEmail(email)
  const messageValid = showMessage && message.trim().length > 4
  const pulseLevel =
    (nameValid ? 1 : 0) + (emailValid ? 1 : 0) + (messageValid ? 1 : 0)

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
      valid: nameValid,
      type: 'text' as const,
    },
    showEmail && {
      key: 'email',
      label: emailLabel,
      value: email,
      onChange: setEmail,
      valid: emailValid,
      type: 'email' as const,
    },
  ].filter(Boolean) as Array<{
    key: string
    label: string
    value: string
    onChange: (v: string) => void
    valid: boolean
    type: 'text' | 'email'
  }>

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full bg-[#0a1628] text-[#c8d6e5]',
        className,
      )}
    >
      <div className="relative flex w-16 shrink-0 flex-col justify-center gap-8 border-r border-[#4ecdc4]/30 py-16 md:w-24">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative mx-auto h-10 w-10">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#4ecdc4]/40"
              animate={
                reduceMotion
                  ? { scale: pulseLevel > i ? 1.15 : 1, opacity: pulseLevel > i ? 0.9 : 0.35 }
                  : {
                      scale: pulseLevel > i ? [1, 1.2, 1] : 1,
                      opacity: pulseLevel > i ? [0.5, 1, 0.7] : 0.35,
                    }
              }
              transition={{
                duration: motionDuration.emphasis,
                repeat: reduceMotion ? 0 : pulseLevel > i ? Infinity : 0,
                repeatDelay: 1.2,
              }}
            />
            <div className="absolute inset-2 rounded-full bg-[#ffb347]" />
          </div>
        ))}
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-16 md:px-12 lg:px-16">
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#4ecdc4]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 max-w-[28ch] text-3xl font-bold tracking-tight text-white md:text-5xl">
          {title}
        </h2>
        {body ? (
          <p className="mt-4 max-w-[42ch] text-sm text-[#c8d6e5]/75 md:text-base">{body}</p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-10 max-w-xl space-y-6">
          {fields.map((field, index) => (
            <motion.div
              key={field.key}
              initial={reduceMotion ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: motionDuration.standard, delay: index * 0.08 }}
              className="relative"
            >
              <div
                className="absolute -left-6 top-1/2 h-px w-6 bg-[#4ecdc4]/60 md:-left-10 md:w-10"
                aria-hidden
              />
              <label className="block font-mono text-[10px] uppercase tracking-[0.35em] text-[#4ecdc4]">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.key}
                value={field.value}
                disabled={disabled}
                onFocus={() => setFocused(field.key)}
                onBlur={() => setFocused(null)}
                onChange={(e) => field.onChange(e.target.value)}
                className={cn(
                  'mt-2 w-full border-b-2 bg-transparent py-3 text-lg text-white outline-none transition-colors',
                  focused === field.key || field.valid
                    ? 'border-[#ffb347]'
                    : 'border-[#4ecdc4]/40',
                )}
              />
            </motion.div>
          ))}

          {showMessage ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: motionDuration.standard, delay: fields.length * 0.08 }}
              className="relative"
            >
              <div
                className="absolute -left-6 top-8 h-px w-6 bg-[#4ecdc4]/60 md:-left-10 md:w-10"
                aria-hidden
              />
              <label className="block font-mono text-[10px] uppercase tracking-[0.35em] text-[#4ecdc4]">
                {messageLabel}
              </label>
              <textarea
                name="message"
                rows={4}
                value={message}
                disabled={disabled}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                onChange={(e) => setMessage(e.target.value)}
                className={cn(
                  'mt-2 w-full resize-y border-b-2 bg-transparent py-3 text-lg text-white outline-none transition-colors',
                  focused === 'message' || messageValid
                    ? 'border-[#ffb347]'
                    : 'border-[#4ecdc4]/40',
                )}
              />
            </motion.div>
          ) : null}

          <motion.button
            type="submit"
            disabled={disabled}
            className="mt-4 w-full bg-[#ffb347] px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] text-[#0a1628] disabled:opacity-50"
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            {submitLabel}
          </motion.button>
        </form>
      </div>
    </section>
  )
}
