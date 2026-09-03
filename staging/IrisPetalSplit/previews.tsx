import type { PreviewVariant } from '../../src/previews/types'
import type { IrisPetalSplitProps } from './IrisPetalSplit'

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1490750967868-88edc4487cba?w=800&q=80'
const PORTRAIT_IMAGE =
  'https://images.unsplash.com/photo-1525310072745-f49212b5c6db?w=600&q=80'
const LANDSCAPE_IMAGE =
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89d7?w=900&q=80'

export const irisPetalSplitVariants: PreviewVariant<IrisPetalSplitProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Iris'] } },
  {
    id: 2,
    label: 'Headline + body',
    props: {
      eyebrow: 'Botanical',
      titleLines: ['Petal', 'seam'],
      body: 'Editorial split with iris petal curves framing the gutter between photograph and serif copy.',
      image: SAMPLE_IMAGE,
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Oversized display type crosses the iris petal seam between photograph and copy columns'],
      body: 'Long headline wraps inside SVG lines.',
      image: SAMPLE_IMAGE,
    },
  },
  { id: 4, label: 'Missing headline fallback', props: { titleLines: [], body: 'Empty title falls back.', image: SAMPLE_IMAGE } },
  { id: 5, label: 'Short body', props: { titleLines: ['Bloom'], body: 'Brief copy.', image: SAMPLE_IMAGE } },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Iris',
      titleLines: ['Petal', 'split'],
      body: 'The petal curves are not decoration — they frame the editorial seam. Mobile stacks image above copy; desktop overlaps columns with pollen drift in the gutter.',
      image: PORTRAIT_IMAGE,
    },
  },
  { id: 7, label: 'Empty body', props: { titleLines: ['Petal only'], image: SAMPLE_IMAGE } },
  { id: 8, label: 'Portrait image', props: { titleLines: ['Tall'], body: 'Portrait 3/4 crop.', image: PORTRAIT_IMAGE } },
  { id: 9, label: 'Landscape image', props: { titleLines: ['Wide'], body: 'Landscape source cropped to 3/4.', image: LANDSCAPE_IMAGE } },
  { id: 10, label: 'Missing image', props: { titleLines: ['No bloom'], body: 'Placeholder holds layout.' } },
  {
    id: 11,
    label: 'Broken image URL',
    props: {
      titleLines: ['Broken'],
      body: 'Invalid URL fallback.',
      image: 'https://example.invalid/iris.jpg',
    },
  },
  { id: 12, label: 'No CTA', props: { titleLines: ['Split'], body: 'No button.', image: SAMPLE_IMAGE } },
  {
    id: 13,
    label: 'Single CTA',
    props: {
      titleLines: ['Read'],
      body: 'One primary action.',
      ctaLabel: 'View collection',
      ctaHref: '#collection',
      image: SAMPLE_IMAGE,
    },
  },
  {
    id: 14,
    label: 'Dual line headline',
    props: {
      eyebrow: 'Editorial',
      titleLines: ['Iris', 'garden'],
      body: 'Two-line SVG headline.',
      image: PORTRAIT_IMAGE,
    },
  },
  {
    id: 15,
    label: 'Three line headline',
    props: {
      titleLines: ['Violet', 'petal', 'unfurl'],
      body: 'Three explicit lines.',
      image: SAMPLE_IMAGE,
    },
  },
  {
    id: 16,
    label: 'Stat in body',
    props: {
      titleLines: ['200+'],
      body: 'Iris species cultivated in the botanical garden featured in this editorial.',
      image: LANDSCAPE_IMAGE,
    },
  },
  {
    id: 17,
    label: 'Quote in body',
    props: {
      titleLines: ['Bloom'],
      body: '"Every petal opens at its own pace toward the light." — Botanical curator',
      image: SAMPLE_IMAGE,
    },
  },
  {
    id: 18,
    label: 'Full split',
    props: {
      eyebrow: 'Botanical editorial',
      titleLines: ['Iris', 'petal'],
      body: 'Complete split with eyebrow, body, CTA, and image.',
      ctaLabel: 'Explore garden',
      ctaHref: '#garden',
      image: PORTRAIT_IMAGE,
    },
  },
  {
    id: 19,
    label: 'Eyebrow only',
    props: { eyebrow: 'Spring collection', titleLines: ['Iris'], image: SAMPLE_IMAGE },
  },
  {
    id: 20,
    label: 'No eyebrow full',
    props: {
      titleLines: ['Petal', 'seam'],
      body: 'No eyebrow — image and copy only.',
      ctaLabel: 'Read more',
      ctaHref: '#read',
      image: LANDSCAPE_IMAGE,
    },
  },
]
