import { Link, useParams } from 'react-router-dom'
import type { StagedComponent } from '@/previews/types'

interface PreviewIndexProps {
  components: StagedComponent[]
}

export function PreviewIndex({ components }: PreviewIndexProps) {
  return (
    <main className="min-h-svh bg-zinc-950 px-6 py-16 text-zinc-50">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">
          Evolve previews
        </p>
        <h1 className="mt-3 text-4xl font-bold">Staging components</h1>
        <p className="mt-4 text-zinc-400">
          Open a component to review all numbered variants on one page. Reference variant IDs in
          feedback (e.g. ParallaxHero #12).
        </p>
        <ul className="mt-10 space-y-4">
          {components.map((component) => (
            <li key={component.slug}>
              <Link
                to={`/preview/${component.slug}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition hover:bg-white/10"
              >
                <span className="font-semibold">{component.name}</span>
                <span className="text-sm text-zinc-500">{component.variants.length} variants</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/" className="mt-10 inline-block text-sm text-violet-300 hover:underline">
          ← Back to demo
        </Link>
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
    <main className="min-h-svh bg-zinc-950 text-zinc-50">
      <div className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <Link to="/preview" className="text-sm text-violet-300 hover:underline">
              ← All components
            </Link>
            <h1 className="mt-2 text-2xl font-bold">{component.name}</h1>
            <p className="mt-1 text-sm text-zinc-400">
              {component.variants.length} variants · scroll to compare
            </p>
          </div>
          <nav aria-label="Variant jump list" className="flex flex-wrap gap-2">
            {component.variants.map((variant) => (
              <a
                key={variant.id}
                href={`#variant-${variant.id}`}
                className="rounded-md border border-white/10 px-2 py-1 font-mono text-xs text-violet-300 hover:bg-white/5"
              >
                #{variant.id}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        {component.variants.map((variant) => (
          <div
            key={variant.id}
            id={`variant-${variant.id}`}
            className="scroll-mt-28 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-white/5 px-5 py-3">
              <span className="font-mono text-sm font-semibold text-violet-300">
                #{variant.id}
              </span>
              <span className="text-sm text-zinc-400">{variant.label}</span>
            </div>
            <div
              className={`relative isolate overflow-hidden bg-zinc-950 ${
                component.slug === 'ViewportSnapDeck' ? 'h-[70svh]' : ''
              } ${component.slug === 'ParallaxHero' ? 'min-h-[32rem]' : ''}`}
            >
              {component.render(variant.props)}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
