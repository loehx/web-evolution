import { Link, useParams } from 'react-router-dom'
import type { StagedComponent } from '@/previews/types'

interface PreviewIndexProps {
  components: StagedComponent[]
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
                className="flex items-center justify-between py-4 transition hover:text-violet-300"
              >
                <span>{component.name}</span>
                <span className="text-sm text-zinc-500">{component.variants.length}</span>
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
    <main className="min-h-svh bg-zinc-950 px-6 py-12 text-zinc-50">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-sm text-zinc-500 hover:text-zinc-300">
          ← Components
        </Link>
        <h1 className="mt-6 text-2xl font-semibold">{component.name}</h1>

        <div className="mt-10 space-y-12">
          {component.variants.map((variant) => (
            <section key={variant.id}>
              <p className="mb-3 text-sm text-zinc-500">
                #{variant.id} · {variant.label}
              </p>
              <div
                className={`overflow-hidden rounded-lg border border-white/10 bg-zinc-900/40 ${
                  component.slug === 'ViewportSnapDeck' ? 'h-[70svh]' : ''
                } ${component.slug === 'ParallaxHero' ? 'min-h-[32rem]' : ''}`}
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
