import { Link, useParams } from 'react-router-dom'
import { formatAge } from '@/lib/utils'
import type { StagedComponent } from '@/previews/types'
import { sortByNewest } from '@/previews/types'

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
                <span>{component.name}</span>
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
                <span>{component.name}</span>
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
      <Link
        to="/"
        className="fixed left-4 top-4 z-50 text-sm text-zinc-400 hover:text-zinc-100"
      >
        ← Components
      </Link>

      {component.variants.map((variant) => (
        <section
          key={variant.id}
          id={`variant-${variant.id}`}
          className="relative min-h-[100svh] w-full overflow-hidden [&>*]:min-h-[100svh] [&>*]:w-full"
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
