import { Link, useParams } from 'react-router-dom'
import { formatAge, cn } from '@/lib/utils'
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

const constrainedSlugs: Record<string, string> = {
  ViewportSnapDeck: 'h-[70svh]',
  ParallaxHero: 'min-h-[32rem]',
  ModalSpotlight: 'min-h-[24rem]',
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

  const constraintClass = constrainedSlugs[component.slug] ?? ''

  return (
    <main className="min-h-svh bg-zinc-950 px-6 py-12 text-zinc-50">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-sm text-zinc-500 hover:text-zinc-300">
          ← Components
        </Link>
        <h1 className="mt-6 text-2xl font-semibold">{component.name}</h1>

        <nav
          aria-label="Variant jump links"
          className="sticky top-0 z-20 -mx-2 mt-6 overflow-x-auto bg-zinc-950/95 px-2 py-3 backdrop-blur-sm"
        >
          <ul className="flex gap-2">
            {component.variants.map((variant) => (
              <li key={variant.id}>
                <a
                  href={`#variant-${variant.id}`}
                  className="inline-block rounded-md border border-white/10 px-2.5 py-1 font-mono text-xs text-zinc-400 transition hover:border-violet-400/40 hover:text-violet-300"
                >
                  #{variant.id}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 space-y-12">
          {component.variants.map((variant) => (
            <section
              key={variant.id}
              id={`variant-${variant.id}`}
              className="scroll-mt-28"
            >
              <p className="mb-3 font-mono text-sm text-zinc-500">
                #{variant.id} · {variant.label}
              </p>
              <div
                className={cn(
                  'overflow-hidden rounded-lg border border-white/10 bg-zinc-900/40',
                  constraintClass,
                )}
              >
                {component.render(variant.props)}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
