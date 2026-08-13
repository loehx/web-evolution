import { RatioImage, ResponsiveHeadline } from '@/components/primitives'
import { cn } from '@/lib/utils'
import { useState, type FormEvent } from 'react'

export interface NewsletterCaptureBandProps {
  eyebrow?: string
  headlineLines?: string[]
  body?: string
  placeholder?: string
  submitLabel?: string
  successMessage?: string
  imageSrc?: string
  imageRatio?: '16/9' | '16/10' | '4/3' | '3/4' | '1/1'
  layout?: 'split' | 'centered'
  privacyNote?: string
  className?: string
}

/**
 * Newsletter signup band with email field, optional side image, and success state.
 */
export function NewsletterCaptureBand({
  eyebrow,
  headlineLines,
  body,
  placeholder = 'you@company.com',
  submitLabel = 'Subscribe',
  successMessage = 'You are subscribed. Welcome aboard!',
  imageSrc,
  imageRatio = '4/3',
  layout = 'split',
  privacyNote,
  className,
}: NewsletterCaptureBandProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const centered = layout === 'centered'
  const hasImage = Boolean(imageSrc) && !centered

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 500)
  }

  return (
    <section className={cn('w-full bg-zinc-950 px-6 py-16 sm:px-10 sm:py-20', className)}>
      <div
        className={cn(
          hasImage && 'lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center',
          centered && 'text-center',
        )}
      >
        {hasImage && imageSrc && (
          <RatioImage
            src={imageSrc}
            alt=""
            ratio={imageRatio}
            className="mb-10 rounded-2xl lg:mb-0"
          />
        )}

        <div className={cn(centered && 'mx-auto max-w-xl')}>
          {eyebrow && (
            <p
              className={cn(
                'text-xs font-semibold uppercase tracking-[0.2em] text-violet-300',
                centered && 'mx-auto',
              )}
            >
              {eyebrow}
            </p>
          )}
          {headlineLines && headlineLines.length > 0 && (
            <div className={cn(eyebrow && 'mt-3')}>
              <ResponsiveHeadline level={2} lines={headlineLines} className="text-white" />
            </div>
          )}
          {body && (
            <p
              className={cn(
                'mt-4 text-base leading-relaxed text-zinc-400',
                centered && 'mx-auto max-w-md',
              )}
            >
              {body}
            </p>
          )}

          <div className={cn('mt-8', centered && 'flex flex-col items-center')}>
            {submitted ? (
              <p
                role="status"
                className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-6 py-4 text-emerald-200"
              >
                {successMessage}
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={cn(
                  'flex flex-col gap-3 sm:flex-row',
                  centered && 'w-full max-w-md justify-center',
                )}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder={placeholder}
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-zinc-900 px-5 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                />
                {submitLabel && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="shrink-0 rounded-full bg-violet-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:opacity-60"
                  >
                    {loading ? '…' : submitLabel}
                  </button>
                )}
              </form>
            )}
            {privacyNote && !submitted && (
              <p className="mt-3 text-xs text-zinc-500">{privacyNote}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
