import { Link, useParams } from 'react-router-dom'
import { cn, formatAge } from '@/lib/utils'
import type { StagedComponent } from '@/previews/types'
import { sortByNewest } from '@/previews/types'

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

export function PreviewGallery({ components }: PreviewGalleryProps) {
  const { slug } = useParams()
  const component = components.find((entry) => entry.slug === slug)

  if (!component) {
    return (
      <main className="grid min-h-svh place-items-center bg-zinc-950 text-zinc-50">
        <p>Component not found.</p>
      </main>
    )
  }

  return (
    <main className="w-full bg-zinc-950 text-zinc-50">
      <div className="fixed left-4 right-4 top-4 z-50 flex items-start justify-between gap-4">
        <Link to="/" className="shrink-0 text-sm text-zinc-400 hover:text-zinc-100">
          ← Components
        </Link>
        {component.sourceUrl ? (
          <PreviewSourceLink
            sourceUrl={component.sourceUrl}
            sourceLabel={component.sourceLabel ?? 'Source'}
            className="shrink text-right"
          />
        ) : null}
      </div>

      {component.variants.map((variant, index) => (
        <section
          key={variant.id}
          id={`variant-${variant.id}`}
          className={cn(
            'relative h-[100svh] w-full overflow-hidden',
            index < component.variants.length - 1 && 'mb-[100svh]',
          )}
        >
          <p className="pointer-events-none absolute left-4 top-12 z-40 max-w-[min(90vw,40rem)] text-xs text-zinc-500">
            #{variant.id} · {variant.label}
          </p>
          {component.render(variant.props)}
        </section>
      ))}
    </main>
  )
}
