import { type FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface GeyserVentFormProps {
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

function SteamPlumes({ animate, intensity }: { animate: boolean; intensity: number }) {
  const plumes = Array.from({ length: 24 }, (_, i) => ({
    left: `${(i * 4.3) % 100}%`,
    delay: (i * 0.12) % 2,
    height: 60 + (i % 5) * 30,
    duration: 0.8 + (i % 4) * 0.3,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {plumes.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 w-3 rounded-full bg-gradient-to-t from-[#00c9a7]/20 via-[#e8f4f0]/30 to-transparent blur-md"
          style={{ left: p.left, height: p.height * intensity }}
          animate={
            animate
              ? { y: ['0%', '-120%'], opacity: [0, 0.5 * intensity, 0], scale: [0.6, 1.2, 0.8] }
              : { opacity: 0.1 * intensity }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: animate ? Infinity : 0,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

function VentField({
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
      className="relative border-b border-[#00c9a7]/20 py-4"
      animate={{
        boxShadow: active
          ? '0 0 24px rgba(0,201,167,0.25)'
          : valid
            ? '0 0 12px rgba(0,201,167,0.12)'
            : 'none',
      }}
      transition={{ duration: reduceMotion ? 0 : motionDuration.standard }}
    >
      <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00c9a7]/60">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </motion.div>
  )
}

export function GeyserVentForm({
  eyebrow,
  title,
  body,
  nameLabel = 'Name',
  emailLabel = 'Email',
  messageLabel = 'Message',
  submitLabel = 'Seal the vent',
  showName = true,
  showEmail = true,
  showMessage = true,
  disabled = false,
  onSubmit,
  className,
}: GeyserVentFormProps) {
  const reduceMotion = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [activeField, setActiveField] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const steamIntensity = activeField ? 1.5 : 0.8

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (disabled) return
    onSubmit?.({ name, email, message })
    setSubmitted(true)
  }

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#1a1816] text-[#e8f4f0]',
        className,
      )}
    >
      <SteamPlumes animate={!reduceMotion} intensity={steamIntensity} />

      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg px-6 py-16 md:px-10"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionDuration.standard }}
      >
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#00c9a7]/70">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-3xl font-bold uppercase leading-[0.95] md:text-5xl">{title}</h2>
        {body ? (
          <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-[#e8f4f0]/70">{body}</p>
        ) : null}

        <div className="mt-10 space-y-2">
          {showName ? (
            <VentField
              label={nameLabel}
              active={activeField === 'name'}
              valid={name.length > 0}
              reduceMotion={reduceMotion}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField(null)}
                disabled={disabled}
                className="w-full bg-transparent text-[#e8f4f0] outline-none placeholder:text-[#e8f4f0]/30"
                placeholder="Your name"
              />
            </VentField>
          ) : null}

          {showEmail ? (
            <VentField
              label={emailLabel}
              active={activeField === 'email'}
              valid={isValidEmail(email)}
              reduceMotion={reduceMotion}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
                disabled={disabled}
                className="w-full bg-transparent text-[#e8f4f0] outline-none placeholder:text-[#e8f4f0]/30"
                placeholder="you@example.com"
              />
            </VentField>
          ) : null}

          {showMessage ? (
            <VentField
              label={messageLabel}
              active={activeField === 'message'}
              valid={message.length > 10}
              reduceMotion={reduceMotion}
            >
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setActiveField('message')}
                onBlur={() => setActiveField(null)}
                disabled={disabled}
                rows={4}
                className="w-full resize-none bg-transparent text-[#e8f4f0] outline-none placeholder:text-[#e8f4f0]/30"
                placeholder="Your message rises with the steam…"
              />
            </VentField>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={disabled}
          className={cn(
            'mt-8 w-full border border-[#00c9a7] py-4 text-xs uppercase tracking-[0.3em] transition-colors',
            disabled
              ? 'pointer-events-none opacity-40'
              : 'hover:bg-[#00c9a7]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00c9a7]',
          )}
        >
          {submitted ? 'Vent sealed' : submitLabel}
        </button>
      </motion.form>
    </section>
  )
}
