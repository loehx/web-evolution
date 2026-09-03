import type { PreviewVariant } from '../../src/previews/types'
import type { ReactNode } from 'react'
import type { SkeletonRevealProps } from './SkeletonReveal'

type SkeletonPreviewProps = SkeletonRevealProps & { children: ReactNode }

const loadedCard = (
  <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
    <h3 className="text-lg font-semibold text-white">Loaded content</h3>
    <p className="mt-2 text-sm text-zinc-400">Real card after skeleton crossfade.</p>
  </article>
)

const loadedWithImage = (
  <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
    <img
      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
      alt="Dashboard"
      className="mb-4 h-40 w-full rounded-lg object-cover"
    />
    <h3 className="text-lg font-semibold text-white">Analytics ready</h3>
  </article>
)

export const skeletonRevealVariants: PreviewVariant<SkeletonPreviewProps>[] = [
  { id: 1, label: 'Loading state', props: { isLoading: true, skeleton: undefined, children: loadedCard } },
  { id: 2, label: 'Loaded state', props: { isLoading: false, skeleton: undefined, children: loadedCard } },
  {
    id: 3,
    label: 'Loaded with image',
    props: { isLoading: false, skeleton: undefined, children: loadedWithImage },
  },
  {
    id: 4,
    label: 'Loading with image target',
    props: { isLoading: true, skeleton: undefined, children: loadedWithImage },
  },
  {
    id: 5,
    label: 'Long text loaded',
    props: {
      isLoading: false,
      skeleton: undefined,
      children: (
        <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
          <p className="text-sm text-zinc-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </article>
      ),
    },
  },
  {
    id: 6,
    label: 'Empty loaded card',
    props: {
      isLoading: false,
      skeleton: undefined,
      children: <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6" />,
    },
  },
  {
    id: 7,
    label: 'Headline-only loaded',
    props: {
      isLoading: false,
      skeleton: undefined,
      children: (
        <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
          <h3 className="text-2xl font-bold text-white">Headline</h3>
        </article>
      ),
    },
  },
  {
    id: 8,
    label: 'Stats loaded',
    props: {
      isLoading: false,
      skeleton: undefined,
      children: (
        <div className="grid grid-cols-3 gap-3">
          {['87ms', '94%', '42'].map((v) => (
            <div key={v} className="rounded-lg bg-zinc-800 p-4 text-center font-mono text-white">
              {v}
            </div>
          ))}
        </div>
      ),
    },
  },
  { id: 9, label: 'Loading stats target', props: { isLoading: true, skeleton: undefined, children: loadedCard } },
  { id: 10, label: 'Toggle demo — loading', props: { isLoading: true, skeleton: undefined, children: loadedCard } },
  { id: 11, label: 'Minimal loaded', props: { isLoading: false, skeleton: undefined, children: <p className="text-white">Done.</p> } },
  {
    id: 12,
    label: 'Video loaded',
    props: {
      isLoading: false,
      skeleton: undefined,
      children: (
        <video
          className="w-full rounded-xl"
          autoPlay
          muted
          loop
          playsInline
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        />
      ),
    },
  },
  {
    id: 13,
    label: 'Loading video target',
    props: {
      isLoading: true,
      skeleton: undefined,
      children: (
        <video
          className="w-full rounded-xl"
          muted
          playsInline
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        />
      ),
    },
  },
  {
    id: 14,
    label: 'List loaded',
    props: {
      isLoading: false,
      skeleton: undefined,
      children: (
        <ul className="space-y-2 text-sm text-zinc-300">
          {['Alpha', 'Beta', 'Gamma'].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
  },
  {
    id: 15,
    label: 'Form loaded',
    props: {
      isLoading: false,
      skeleton: undefined,
      children: (
        <form className="space-y-3">
          <input className="w-full rounded-lg bg-zinc-800 px-3 py-2 text-white" placeholder="Email" />
          <button type="button" className="rounded-lg bg-white px-4 py-2 text-zinc-900">
            Join
          </button>
        </form>
      ),
    },
  },
  {
    id: 16,
    label: 'Code block loaded',
    props: {
      isLoading: false,
      skeleton: undefined,
      children: (
        <pre className="overflow-auto rounded-lg bg-black/40 p-4 text-xs text-emerald-300">
          {`{\n  "status": "ready"\n}`}
        </pre>
      ),
    },
  },
  {
    id: 17,
    label: 'Broken image loaded',
    props: {
      isLoading: false,
      skeleton: undefined,
      children: (
        <img src="https://example.invalid/x.jpg" alt="" className="h-32 w-full rounded-lg bg-zinc-800 object-cover" />
      ),
    },
  },
  {
    id: 18,
    label: 'Portrait image loaded',
    props: {
      isLoading: false,
      skeleton: undefined,
      children: (
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop"
          alt=""
          className="mx-auto h-64 rounded-lg object-cover"
        />
      ),
    },
  },
  {
    id: 19,
    label: 'Dual CTA loaded',
    props: {
      isLoading: false,
      skeleton: undefined,
      children: (
        <div className="flex gap-3">
          <button type="button" className="rounded-full bg-white px-4 py-2 text-zinc-900">
            Primary
          </button>
          <button type="button" className="rounded-full border border-white/20 px-4 py-2 text-white">
            Secondary
          </button>
        </div>
      ),
    },
  },
  {
    id: 20,
    label: 'Full feature card loaded',
    props: { isLoading: false, skeleton: undefined, children: loadedWithImage },
  },
]
