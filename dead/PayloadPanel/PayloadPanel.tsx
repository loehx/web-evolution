import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface PayloadField {
  label: string
  value: string | number | boolean
  tone?: 'default' | 'success' | 'warning' | 'muted'
}

export interface PayloadPanelProps {
  title: string
  status?: 'idle' | 'streaming' | 'ready' | 'error'
  endpoint?: string
  fields: PayloadField[]
  rawPayload?: Record<string, unknown>
  className?: string
}

const statusStyles = {
  idle: 'bg-zinc-500/20 text-zinc-300',
  streaming: 'bg-amber-500/20 text-amber-200',
  ready: 'bg-emerald-500/20 text-emerald-200',
  error: 'bg-rose-500/20 text-rose-200',
} as const

const toneStyles = {
  default: 'text-zinc-100',
  success: 'text-emerald-300',
  warning: 'text-amber-300',
  muted: 'text-zinc-500',
} as const

/**
 * Structured API-style panel for displaying response payloads.
 */
export function PayloadPanel({
  title,
  status = 'ready',
  endpoint,
  fields,
  rawPayload,
  className,
}: PayloadPanelProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      className={cn(
        'overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 shadow-2xl shadow-black/40 backdrop-blur',
        className,
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 md:px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
            Payload
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
        </div>
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
            statusStyles[status],
          )}
        >
          {status}
        </span>
      </header>

      {endpoint ? (
        <div className="border-b border-white/5 px-5 py-3 md:px-6">
          <code className="block truncate text-xs text-cyan-300/90">{endpoint}</code>
        </div>
      ) : null}

      <dl className="grid gap-4 px-5 py-5 md:grid-cols-2 md:px-6">
        {fields.map((field) => (
          <div key={field.label} className="min-w-0">
            <dt className="text-xs uppercase tracking-wide text-zinc-500">{field.label}</dt>
            <dd className={cn('mt-1 truncate font-mono text-sm', toneStyles[field.tone ?? 'default'])}>
              {String(field.value)}
            </dd>
          </div>
        ))}
      </dl>

      {rawPayload ? (
        <div className="border-t border-white/10">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="flex w-full items-center justify-between px-5 py-3 text-left text-sm font-medium text-zinc-300 transition hover:bg-white/5 md:px-6"
          >
            Raw JSON
            <span aria-hidden className="text-zinc-500">
              {expanded ? '−' : '+'}
            </span>
          </button>
          {expanded ? (
            <pre className="max-h-64 overflow-auto border-t border-white/5 bg-black/30 px-5 py-4 text-xs leading-relaxed text-emerald-200/90 md:px-6">
              {JSON.stringify(rawPayload, null, 2)}
            </pre>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
