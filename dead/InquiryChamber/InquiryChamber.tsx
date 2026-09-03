import { type FormEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { motionDuration } from '@/lib/motion'

export interface InquiryChamberProps {
  eyebrow?: string
  title: string
  body?: string
  nameLabel?: string
  emailLabel?: string
  messageLabel?: string
  submitLabel?: string
  namePlaceholder?: string
  emailPlaceholder?: string
  messagePlaceholder?: string
  showName?: boolean
  showEmail?: boolean
  showMessage?: boolean
  disabled?: boolean
  onSubmit?: (payload: { name: string; email: string; message: string }) => void
  className?: string
}

export function InquiryChamber({
  eyebrow,
  title,
  body,
  nameLabel = 'Name',
  emailLabel = 'Email',
  messageLabel = 'Message',
  submitLabel = 'Send',
  namePlaceholder,
  emailPlaceholder,
  messagePlaceholder,
  showName = true,
  showEmail = true,
  showMessage = true,
  disabled = false,
  onSubmit,
  className,
}: InquiryChamberProps) {
  const reduceMotion = useReducedMotion()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (disabled) return
    const data = new FormData(event.currentTarget)
    onSubmit?.({
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    })
  }

  const fields = [
    showName && {
      key: 'name',
      index: '01',
      label: nameLabel,
      name: 'name',
      type: 'text' as const,
      placeholder: namePlaceholder,
      autoComplete: 'name',
    },
    showEmail && {
      key: 'email',
      index: '02',
      label: emailLabel,
      name: 'email',
      type: 'email' as const,
      placeholder: emailPlaceholder,
      autoComplete: 'email',
    },
  ].filter(Boolean) as Array<{
    key: string
    index: string
    label: string
    name: string
    type: 'text' | 'email'
    placeholder?: string
    autoComplete: string
  }>

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col bg-[#050508] text-white',
        className,
      )}
    >
      <header className="px-5 pt-16 md:px-10 md:pt-20">
        {eyebrow ? (
          <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#c8ff3d]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 max-w-[18ch] text-4xl font-semibold leading-[0.9] tracking-tight md:text-6xl lg:text-7xl">
          {title}
        </h2>
        {body ? (
          <p className="mt-5 max-w-[46ch] text-sm text-white/55 md:text-base">{body}</p>
        ) : null}
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-1 flex-col"
        noValidate={false}
      >
        <div className="grid flex-1 gap-0 md:grid-cols-2">
          {fields.map((field, i) => (
            <motion.label
              key={field.key}
              className="flex flex-col border-t border-white/10 px-5 py-6 md:px-10"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionDuration.standard, delay: reduceMotion ? 0 : i * 0.08 }}
            >
              <span className="flex items-baseline gap-3 text-[10px] uppercase tracking-[0.35em] text-white/40">
                <span className="text-[#c8ff3d]">{field.index}</span>
                {field.label}
              </span>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                disabled={disabled}
                required={field.type === 'email'}
                className="mt-4 bg-transparent text-2xl text-white outline-none placeholder:text-white/20 md:text-4xl"
              />
            </motion.label>
          ))}
        </div>

        {showMessage ? (
          <motion.label
            className="flex flex-1 flex-col border-t border-white/10 px-5 py-6 md:px-10"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.standard, delay: reduceMotion ? 0 : 0.16 }}
          >
            <span className="flex items-baseline gap-3 text-[10px] uppercase tracking-[0.35em] text-white/40">
              <span className="text-[#c8ff3d]">03</span>
              {messageLabel}
            </span>
            <textarea
              name="message"
              placeholder={messagePlaceholder}
              disabled={disabled}
              rows={4}
              className="mt-4 min-h-[20svh] flex-1 resize-none bg-transparent text-xl text-white outline-none placeholder:text-white/20 md:text-3xl"
            />
          </motion.label>
        ) : null}

        <button
          type="submit"
          disabled={disabled}
          className="min-h-16 w-full bg-[#c8ff3d] px-5 py-5 text-left text-sm font-semibold uppercase tracking-[0.35em] text-[#050508] disabled:opacity-40 md:min-h-20 md:px-10 md:text-base"
        >
          {submitLabel}
        </button>
      </form>
    </section>
  )
}
