import { Link, useParams } from 'react-router-dom'
import { useCallback, useRef, useState } from 'react'
import { cn, formatAge } from '@/lib/utils'
import type { StagedComponent } from '@/previews/types'
import { sortByNewest } from '@/previews/types'
import {
  StaggeredTextReveal,
  type StaggeredTextRevealProps,
} from '../../staging/StaggeredTextReveal/StaggeredTextReveal'
import { DEFAULT_REVEAL_TIMING } from '../../staging/StaggeredTextReveal/revealMotion'

function formatSourceLinkLabel(sourceUrl: string, sourceLabel?: string) {
  if (sourceLabel) return sourceLabel
  try {
    const { hostname } = new URL(sourceUrl)
    return hostname.replace(/^www\./, '')
  } catch {
    return 'Reference'
  }
}

function PreviewSourceLink({
  sourceUrl,
  sourceLabel,
  className,
}: {
  sourceUrl: string
  sourceLabel?: string
  className?: string
}) {
  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex max-w-[min(50vw,20rem)] items-center gap-1 truncate text-sm text-zinc-400 underline-offset-2 transition hover:text-violet-300 hover:underline',
        className,
      )}
      title={sourceUrl}
    >
      <span className="truncate">{formatSourceLinkLabel(sourceUrl, sourceLabel)}</span>
      <span aria-hidden="true">↗</span>
    </a>
  )
}

interface PreviewIndexProps {
  components: StagedComponent[]
}

function ComponentAge({ createdAt }: { createdAt: string }) {
  return <span className="shrink-0 text-sm text-zinc-500">{formatAge(createdAt)}</span>
}

export function PreviewNew({ components }: PreviewIndexProps) {
  const latest = sortByNewest(components)

  return (
    <main className="min-h-svh bg-zinc-950 px-6 py-12 text-zinc-50">
      <div className="mx-auto max-w-lg">
        <Link to="/" className="text-sm text-zinc-500 hover:text-zinc-300">
          ← All components
        </Link>
        <h1 className="mt-6 text-2xl font-semibold">Latest creations</h1>
        <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {latest.map((component) => (
            <li key={component.slug}>
              <Link
                to={`/${component.slug}`}
                className="flex items-center justify-between gap-4 py-4 transition hover:text-violet-300"
              >
                <span className="min-w-0">
                  <span className="block">{component.name}</span>
                  {component.sourceUrl ? (
                    <PreviewSourceLink
                      sourceUrl={component.sourceUrl}
                      sourceLabel={component.sourceLabel}
                      className="mt-1 text-xs"
                    />
                  ) : null}
                </span>
                <ComponentAge createdAt={component.createdAt} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export function PreviewIndex({ components }: PreviewIndexProps) {
  return (
    <main className="min-h-svh bg-zinc-950 px-6 py-12 text-zinc-50">
      <div className="mx-auto max-w-lg">
        <h1 className="text-2xl font-semibold">Components</h1>
        <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {components.map((component) => (
            <li key={component.slug}>
              <Link
                to={`/${component.slug}`}
                className="flex items-center justify-between gap-4 py-4 transition hover:text-violet-300"
              >
                <span className="min-w-0">
                  <span className="block">{component.name}</span>
                  {component.sourceUrl ? (
                    <PreviewSourceLink
                      sourceUrl={component.sourceUrl}
                      sourceLabel={component.sourceLabel}
                      className="mt-1 text-xs"
                    />
                  ) : null}
                </span>
                <ComponentAge createdAt={component.createdAt} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

interface PreviewGalleryProps {
  components: StagedComponent[]
}

function StaggeredTextRevealPreviewControls({
  letterAnimMs,
  letterStaggerMs,
  onLetterAnimMsChange,
  onLetterStaggerMsChange,
  onReplay,
}: {
  letterAnimMs: number
  letterStaggerMs: number
  onLetterAnimMsChange: (value: number) => void
  onLetterStaggerMsChange: (value: number) => void
  onReplay: () => void
}) {
  return (
    <div className="pointer-events-auto fixed inset-x-0 bottom-0 z-[60] w-full border-t border-white/15 bg-zinc-950/95 shadow-[0_-8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md">
      <div className="grid w-full gap-4 px-4 py-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:gap-6 sm:px-8 sm:py-5">
        <label className="flex min-w-0 flex-col gap-2">
          <span className="flex items-baseline justify-between gap-3 font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 sm:text-sm">
            Transition speed
            <span className="tabular-nums text-violet-300">{letterAnimMs}ms</span>
          </span>
          <input
            type="range"
            min={200}
            max={3000}
            step={50}
            value={letterAnimMs}
            onChange={(event) => onLetterAnimMsChange(Number(event.target.value))}
            className="h-2 w-full cursor-pointer accent-violet-400"
          />
        </label>

        <label className="flex min-w-0 flex-col gap-2">
          <span className="flex items-baseline justify-between gap-3 font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 sm:text-sm">
            Stagger delay
            <span className="tabular-nums text-violet-300">{letterStaggerMs}ms</span>
          </span>
          <input
            type="range"
            min={0}
            max={120}
            step={5}
            value={letterStaggerMs}
            onChange={(event) => onLetterStaggerMsChange(Number(event.target.value))}
            className="h-2 w-full cursor-pointer accent-violet-400"
          />
        </label>

        <button
          type="button"
          onClick={onReplay}
          className="h-11 shrink-0 rounded-md border border-white/15 bg-white/5 px-5 text-sm font-medium text-zinc-100 transition hover:border-violet-400/40 hover:bg-violet-500/10 sm:h-12 sm:text-base"
        >
          Repeat animation
        </button>
      </div>
    </div>
  )
}

export function PreviewGallery({ components }: PreviewGalleryProps) {
  const { slug } = useParams()
  const component = components.find((entry) => entry.slug === slug)
  const isStaggeredTextReveal = component?.slug === 'StaggeredTextReveal'

  const [letterAnimMs, setLetterAnimMs] = useState(DEFAULT_REVEAL_TIMING.letterAnimMs)
  const [letterStaggerMs, setLetterStaggerMs] = useState(DEFAULT_REVEAL_TIMING.letterStaggerMs)
  const replayHandlersRef = useRef(new Set<() => void>())

  const registerStaggeredReplay = useCallback((replay: () => void) => {
    replayHandlersRef.current.add(replay)
    return () => {
      replayHandlersRef.current.delete(replay)
    }
  }, [])

  const triggerStaggeredReplay = useCallback(() => {
    replayHandlersRef.current.forEach((replay) => replay())
  }, [])

  if (!component) {
    return (
      <main className="grid min-h-svh place-items-center bg-zinc-950 text-zinc-50">
        <p>Component not found.</p>
      </main>
    )
  }

  const variantCount = component.variants.length

  function renderVariant(props: unknown, entry: StagedComponent) {
    if (entry.slug === 'StaggeredTextReveal') {
      return (
        <StaggeredTextReveal
          {...(props as StaggeredTextRevealProps)}
          letterAnimMs={letterAnimMs}
          letterStaggerMs={letterStaggerMs}
          wordStaggerMs={letterStaggerMs}
          onReplayMount={registerStaggeredReplay}
        />
      )
    }
    return entry.render(props)
  }

  return (
    <main className={cn('w-full bg-zinc-950 text-zinc-50', isStaggeredTextReveal && 'pb-28 sm:pb-32')}>
      {component.variants.map((variant, index) => (
        <section
          key={variant.id}
          id={`variant-${variant.id}`}
          data-variant-section
          className="relative w-full"
        >
          <div className="sticky top-0 z-50 w-full border-b border-white/15 bg-zinc-950/95 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <div className="flex w-full flex-col gap-3 px-4 py-4 sm:px-8 sm:py-5">
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                <Link
                  to="/"
                  className="text-sm font-medium text-zinc-400 transition hover:text-zinc-100 sm:text-base"
                >
                  ← Components
                </Link>
                <span className="font-mono text-sm tabular-nums text-zinc-400 sm:text-base">
                  Variant {index + 1} / {variantCount}
                </span>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 sm:text-sm">
                    {component.name}
                  </p>
                  <h2 className="mt-1 text-balance text-xl font-semibold leading-snug text-zinc-50 sm:text-2xl md:text-3xl">
                    <span className="tabular-nums text-violet-400">#{variant.id}</span>
                    <span className="text-zinc-600"> · </span>
                    {variant.label}
                  </h2>
                </div>
                {component.sourceUrl ? (
                  <PreviewSourceLink
                    sourceUrl={component.sourceUrl}
                    sourceLabel={component.sourceLabel ?? 'Source'}
                    className="max-w-[min(100%,20rem)] shrink-0 text-base text-zinc-400 sm:max-w-md sm:text-lg"
                  />
                ) : null}
              </div>
            </div>
          </div>

          <div className="relative min-h-[100svh] w-full overflow-hidden">
            {renderVariant(variant.props, component)}
          </div>
        </section>
      ))}

      {isStaggeredTextReveal ? (
        <StaggeredTextRevealPreviewControls
          letterAnimMs={letterAnimMs}
          letterStaggerMs={letterStaggerMs}
          onLetterAnimMsChange={setLetterAnimMs}
          onLetterStaggerMsChange={setLetterStaggerMs}
          onReplay={triggerStaggeredReplay}
        />
      ) : null}
    </main>
  )
}
