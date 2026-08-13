import { ResponsiveHeadline } from '@/components/primitives'
import { cn } from '@/lib/utils'
import { useState, type FormEvent } from 'react'

export interface ContactField {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'textarea'
  placeholder?: string
  required?: boolean
}

export interface ContactInquiryBandProps {
  eyebrow?: string
  headlineLines?: string[]
  intro?: string
  fields?: ContactField[]
  submitLabel?: string
  successMessage?: string
  layout?: 'split' | 'stacked'
  sideNote?: string
  className?: string
}

const defaultFields: ContactField[] = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Alex Morgan', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com', required: true },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Tell us about your project…',
    required: true,
  },
]

/**
 * Full-width contact inquiry form with configurable fields and split/stacked layouts.
 */
export function ContactInquiryBand({
  eyebrow,
  headlineLines,
  intro,
  fields = defaultFields,
  submitLabel = 'Send message',
  successMessage = 'Thanks — we will reply within one business day.',
  layout = 'split',
  sideNote,
  className,
}: ContactInquiryBandProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  const split = layout === 'split'

  return (
    <section className={cn('w-full bg-zinc-950 px-6 py-16 sm:px-10 sm:py-20', className)}>
      <div
        className={cn(
          split && 'lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start',
          !split && 'max-w-xl',
        )}
      >
        <div className={cn(split && 'lg:sticky lg:top-8')}>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
              {eyebrow}
            </p>
          )}
          {headlineLines && headlineLines.length > 0 && (
            <div className={cn(eyebrow && 'mt-3')}>
              <ResponsiveHeadline level={2} lines={headlineLines} className="text-white" />
            </div>
          )}
          {intro && (
            <p className="mt-4 text-base leading-relaxed text-zinc-400">{intro}</p>
          )}
          {sideNote && (
            <p className="mt-6 text-sm text-zinc-500">{sideNote}</p>
          )}
        </div>

        <div className={cn(split ? 'mt-10 lg:mt-0' : 'mt-8')}>
          {submitted ? (
            <div
              role="status"
              className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-8 text-emerald-200"
            >
              {successMessage}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-white/10 bg-zinc-900/50 p-6 sm:p-8"
            >
              {fields.length === 0 ? (
                <p className="text-zinc-500 italic">No form fields configured.</p>
              ) : (
                fields.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-zinc-300">
                      {field.label}
                      {field.required && <span className="text-violet-400"> *</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={4}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                      />
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type ?? 'text'}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                      />
                    )}
                  </div>
                ))
              )}
              {submitLabel && fields.length > 0 && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-violet-500 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Sending…' : submitLabel}
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
