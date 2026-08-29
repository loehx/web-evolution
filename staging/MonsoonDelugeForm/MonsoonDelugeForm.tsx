import { type FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface MonsoonDelugeFormProps {
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

function RainStreaks({ animate }: { animate: boolean }) {
  const streaks = Array.from({ length: 40 }, (_, i) => ({
    left: `${(i * 2.7) % 100}%`,
    delay: (i * 0.08) % 2,
    height: 40 + (i % 5) * 20,
    duration: 0.6 + (i % 4) * 0.2,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {streaks.map((s, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-px bg-gradient-to-b from-transparent via-[#00d4ff]/30 to-transparent"
          style={{ left: s.left, height: s.height }}
          animate={
            animate
              ? { y: ['-100%', '120vh'], opacity: [0, 0.6, 0] }
              : { opacity: 0.15, y: `${(i * 7) % 100}%` }
          }
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: animate ? Infinity : 0,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

function StormField({
  label,
  active,
  valid,
  reduceMotion,
  children,
}: {
  label: string
  active: boolean
  valid: boolean
  reduceMotion: boolean | null
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="relative border-b border-[#00d4ff]/20 py-4"
      animate={{
        boxShadow: active
          ? '0 0 20px rgba(0,212,255,0.2)'
          : valid
            ? '0 0 10px rgba(0,212,255,0.1)'
            : 'none',
      }}
      transition={{ duration: reduceMotion ? 0 : motionDuration.standard }}
    >
      <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00d4ff]/60">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </motion.div>
  )
}

export function MonsoonDelugeForm({
  eyebrow,
  title,
  body,
  nameLabel = 'Name',
  emailLabel = 'Email',
  messageLabel = 'Message',
  submitLabel = 'Send through the storm',
  showName = true,
  showEmail = true,
  showMessage = true,
  disabled = false,
  onSubmit,
  className,
}: MonsoonDelugeFormProps) {
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

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0a1a2e] px-4 py-16 text-[#e8f4ff]',
        className,
      )}
    >
      <RainStreaks animate={!reduceMotion} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1a2e]/80 via-transparent to-[#0a1a2e]/90" aria-hidden />

      <motion.div
        className="relative z-10 w-full max-w-lg border border-[#00d4ff]/20 bg-[#0a1a2e]/60 p-8 backdrop-blur-sm md:p-10"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionDuration.standard }}
      >
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#00d4ff]/60">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
        {body ? <p className="mt-4 text-sm text-[#e8f4ff]/70">{body}</p> : null}

        <form className="mt-8 space-y-2" onSubmit={handleSubmit} noValidate>
          {showName ? (
            <StormField
              label={nameLabel}
              active={activeField === 'name'}
              valid={nameValid}
              reduceMotion={reduceMotion}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField(null)}
                disabled={disabled}
                className="w-full bg-transparent text-[#e8f4ff] outline-none placeholder:text-[#e8f4ff]/30"
                placeholder="Your name"
              />
            </StormField>
          ) : null}

          {showEmail ? (
            <StormField
              label={emailLabel}
              active={activeField === 'email'}
              valid={emailValid}
              reduceMotion={reduceMotion}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
                disabled={disabled}
                className="w-full bg-transparent text-[#e8f4ff] outline-none placeholder:text-[#e8f4ff]/30"
                placeholder="you@example.com"
              />
            </StormField>
          ) : null}

          {showMessage ? (
            <StormField
              label={messageLabel}
              active={activeField === 'message'}
              valid={messageValid}
              reduceMotion={reduceMotion}
            >
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setActiveField('message')}
                onBlur={() => setActiveField(null)}
                disabled={disabled}
                rows={4}
                className="w-full resize-none bg-transparent text-[#e8f4ff] outline-none placeholder:text-[#e8f4ff]/30"
                placeholder="Your message rides the monsoon current…"
              />
            </StormField>
          ) : null}

          <button
            type="submit"
            disabled={disabled}
            className={cn(
              'mt-6 w-full border border-[#00d4ff] py-3 text-xs uppercase tracking-[0.3em] transition-colors',
              disabled
                ? 'pointer-events-none opacity-40'
                : 'hover:bg-[#00d4ff]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d4ff]',
            )}
          >
            {submitted ? 'Sent through the storm' : submitLabel}
          </button>
        </form>
      </motion.div>
    </section>
  )
}
