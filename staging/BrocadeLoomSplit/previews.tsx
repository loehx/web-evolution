import type { PreviewVariant } from '../../src/previews/types'
import type { BrocadeLoomSplitProps } from './BrocadeLoomSplit'

const PORTRAIT =
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80'
const LANDSCAPE =
  'https://images.unsplash.com/photo-1582794543139-8ac89243add3?w=900&q=80'

export const brocadeLoomSplitVariants: PreviewVariant<BrocadeLoomSplitProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Brocade'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Loom',
      titleLines: ['Gold', 'thread'],
      body: 'Luxury editorial split with animated brocade weave in the center gutter.',
      image: PORTRAIT,
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Every gold thread crosses the gutter like a loom shuttle weaving silk'],
      body: 'Long headline wraps inside SVG lines.',
      image: PORTRAIT,
    },
  },
  { id: 4, label: 'Missing headline fallback', props: { titleLines: [], body: 'Empty title falls back.', image: PORTRAIT } },
  { id: 5, label: 'Short body', props: { titleLines: ['Weave'], body: 'Brief copy.', image: PORTRAIT } },
  {
    id: 6,
    label: 'Long body',
    props: {
      eyebrow: 'Textile',
      titleLines: ['Brocade', 'seam'],
      body:
        'The brocade is not decoration — it is the center seam. Photograph and serif copy occupy opposing columns while gold threads weave through the gutter. Mobile stacks with a brocade band between sections.',
      image: LANDSCAPE,
    },
  },
  { id: 7, label: 'Empty body', props: { titleLines: ['Image only'], eyebrow: 'Loom', image: PORTRAIT } },
  {
    id: 8,
    label: 'Portrait image',
    props: {
      titleLines: ['Portrait'],
      body: 'Tall 3/4 crop on left column.',
      image: PORTRAIT,
    },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: {
      titleLines: ['Landscape'],
      body: 'Wide source cropped to 3/4 column.',
      image: LANDSCAPE,
    },
  },
  {
    id: 10,
    label: 'Missing image',
    props: {
      titleLines: ['No photo'],
      body: 'Placeholder loom label when image omitted.',
    },
  },
  {
    id: 11,
    label: 'Broken image URL',
    props: {
      titleLines: ['Broken'],
      body: 'Invalid URL — RatioImage fallback.',
      image: 'https://example.invalid/brocade.jpg',
    },
  },
  { id: 12, label: 'No CTA', props: { titleLines: ['Read'], body: 'No link.', image: PORTRAIT } },
  {
    id: 13,
    label: 'With CTA',
    props: {
      titleLines: ['Commission'],
      body: 'Custom brocade for your atelier.',
      image: PORTRAIT,
      ctaLabel: 'Request sample',
      ctaHref: '#sample',
    },
  },
  {
    id: 14,
    label: 'Quote in body',
    props: {
      titleLines: ['Silk'],
      body: '"The loom does not hurry — each thread finds its place in the pattern." — Master weaver',
      image: PORTRAIT,
    },
  },
  {
    id: 15,
    label: 'No eyebrow',
    props: {
      titleLines: ['Plain', 'split'],
      body: 'Eyebrow omitted.',
      image: PORTRAIT,
    },
  },
  {
    id: 16,
    label: 'Two-line headline',
    props: {
      eyebrow: 'Atelier',
      titleLines: ['Gold', 'weft'],
      body: 'Two-line SVG headline.',
      image: PORTRAIT,
      ctaLabel: 'View loom',
      ctaHref: '#loom',
    },
  },
  {
    id: 17,
    label: 'Three-line headline',
    props: {
      titleLines: ['Brocade', 'gold', 'thread'],
      body: 'Three stacked headline lines.',
      image: LANDSCAPE,
    },
  },
  {
    id: 18,
    label: 'Marketing block',
    props: {
      eyebrow: 'Luxury textile',
      titleLines: ['Editorial', 'brocade'],
      body: 'Full marketing split with eyebrow, body, image, and CTA.',
      image: PORTRAIT,
      ctaLabel: 'Begin',
      ctaHref: '#begin',
    },
  },
  { id: 19, label: 'Minimal', props: { titleLines: ['B'], image: PORTRAIT } },
  {
    id: 20,
    label: 'Full split',
    props: {
      eyebrow: 'Brocade loom',
      titleLines: ['Woven', 'editorial'],
      body: 'Complete split with all fields populated for review.',
      image: PORTRAIT,
      ctaLabel: 'Explore weave',
      ctaHref: '#weave',
      imageAlt: 'Gold brocade fabric close-up',
    },
  },
]
