import type { PreviewVariant } from '../../src/previews/types'
import type { CinderAshSplitProps } from './CinderAshSplit'

const PORTRAIT =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'
const LANDSCAPE =
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900&q=80'

export const cinderAshSplitVariants: PreviewVariant<CinderAshSplitProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Cinder'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Ash',
      titleLines: ['Volcanic', 'grid'],
      body: 'Editorial broken-grid split with ember ash drifting through the center gutter.',
      image: PORTRAIT,
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Every ember particle drifts through the broken volcanic grid seam'],
      body: 'Long headline wraps inside SVG lines.',
      image: PORTRAIT,
    },
  },
  { id: 4, label: 'Missing headline fallback', props: { titleLines: [], body: 'Empty title falls back.', image: PORTRAIT } },
  { id: 5, label: 'Short body', props: { titleLines: ['Ash'], body: 'Brief copy.', image: PORTRAIT } },
  {
    id: 6,
    label: 'Long body',
    props: {
      eyebrow: 'Volcanic',
      titleLines: ['Cinder', 'seam'],
      body:
        'The ash is not decoration — it drifts through the broken-grid gutter. Photograph shards overlap serif copy in an asymmetrical volcanic layout. Mobile stacks with an ember band between sections.',
      image: LANDSCAPE,
    },
  },
  { id: 7, label: 'Empty body', props: { titleLines: ['Image only'], eyebrow: 'Ash', image: PORTRAIT } },
  {
    id: 8,
    label: 'Portrait image',
    props: { titleLines: ['Portrait'], body: 'Tall 3/4 crop on left shard.', image: PORTRAIT },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: { titleLines: ['Landscape'], body: 'Wide source cropped to 3/4 column.', image: LANDSCAPE },
  },
  {
    id: 10,
    label: 'Missing image',
    props: { titleLines: ['No photo'], body: 'Placeholder ash field when image omitted.' },
  },
  {
    id: 11,
    label: 'Broken image URL',
    props: {
      titleLines: ['Broken'],
      body: 'Invalid URL — RatioImage fallback.',
      image: 'https://example.invalid/cinder.jpg',
    },
  },
  { id: 12, label: 'No CTA', props: { titleLines: ['Read'], body: 'No link.', image: PORTRAIT } },
  {
    id: 13,
    label: 'With CTA',
    props: {
      titleLines: ['Explore'],
      body: 'Descend into the ash field.',
      image: PORTRAIT,
      ctaLabel: 'View crater',
      ctaHref: '#crater',
    },
  },
  {
    id: 14,
    label: 'Quote in body',
    props: {
      titleLines: ['Ember'],
      body: '"From ash, new ground forms." — Volcanic proverb',
      image: PORTRAIT,
    },
  },
  {
    id: 15,
    label: 'Stat in body',
    props: {
      titleLines: ['1200°C'],
      body: 'Surface temperature of fresh volcanic cinder.',
      image: PORTRAIT,
    },
  },
  { id: 16, label: 'No eyebrow', props: { titleLines: ['Plain', 'ash'], body: 'Eyebrow omitted.', image: PORTRAIT } },
  {
    id: 17,
    label: 'Three-line headline',
    props: {
      titleLines: ['Cinder', 'ash', 'split'],
      body: 'Three stacked headline lines.',
      image: PORTRAIT,
    },
  },
  {
    id: 18,
    label: 'Code in body',
    props: {
      titleLines: ['ash'],
      body: 'const drift = cinder.particles({ count: 16, glow: "#e85d04" })',
      image: PORTRAIT,
    },
  },
  { id: 19, label: 'Minimal', props: { titleLines: ['C'], image: PORTRAIT } },
  {
    id: 20,
    label: 'Full split',
    props: {
      eyebrow: 'Editorial volcanic',
      titleLines: ['Cinder', 'ash split'],
      body: 'Complete image+text split with all fields populated for review.',
      image: PORTRAIT,
      ctaLabel: 'Read story',
      ctaHref: '#story',
    },
  },
]
