import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
  type PreviewVariant,
} from '../../src/previews/types'
import type { SiltLayerSplitProps } from './SiltLayerSplit'

export const siltLayerSplitVariants: PreviewVariant<SiltLayerSplitProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Silt'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Sediment',
      titleLines: ['Layered', 'earth'],
      body: 'Editorial split with horizontal silt bands threading through the gutter.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Sediment settles in layers that tell the story of every flood season'],
      body: 'Long headline wraps inside serif SVG lines.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 4,
    label: 'Missing headline fallback',
    props: { titleLines: [], body: 'Empty title falls back.', image: PLACEHOLDER_PORTRAIT },
  },
  {
    id: 5,
    label: 'Short body',
    props: { titleLines: ['Clay'], body: 'Brief copy.', image: PLACEHOLDER_PORTRAIT },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'River',
      titleLines: ['Silt', 'band'],
      body: 'The bands are not decoration — they thread through the center gutter between photograph and copy. Mobile stacks image above text; desktop places them side by side with drifting sediment layers.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  { id: 7, label: 'Empty body', props: { titleLines: ['Bands only'], image: PLACEHOLDER_PORTRAIT } },
  {
    id: 8,
    label: 'Portrait image',
    props: {
      titleLines: ['Portrait', 'bank'],
      body: 'Tall 3:4 crop.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: {
      titleLines: ['Wide', 'delta'],
      body: 'Wide source cropped to ratio.',
      image: PLACEHOLDER_LANDSCAPE,
    },
  },
  {
    id: 10,
    label: 'Missing image',
    props: { titleLines: ['No image'], body: 'Sediment placeholder.' },
  },
  {
    id: 11,
    label: 'Broken image URL',
    props: {
      titleLines: ['Broken'],
      body: 'Image fails gracefully.',
      image: PLACEHOLDER_BROKEN,
    },
  },
  {
    id: 12,
    label: 'No CTA',
    props: {
      titleLines: ['Read', 'on'],
      body: 'No link — bands only.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 13,
    label: 'Single CTA',
    props: {
      titleLines: ['Explore'],
      body: 'One underlined link.',
      image: PLACEHOLDER_PORTRAIT,
      ctaLabel: 'Follow the river',
      ctaHref: '#river',
    },
  },
  {
    id: 14,
    label: 'Eyebrow only',
    props: {
      eyebrow: 'Chapter III',
      titleLines: ['The silt'],
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 15,
    label: 'No eyebrow',
    props: {
      titleLines: ['Plain', 'earth'],
      body: 'Eyebrow omitted.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 16,
    label: 'Stat in body',
    props: {
      titleLines: ['0.05mm'],
      body: 'Average grain size for fine silt sediment deposits.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 17,
    label: 'Quote in body',
    props: {
      titleLines: ['Settle'],
      body: '"In silt, patience is measured in millimeters per century." — Hydrologist proverb',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 18,
    label: 'Code in body',
    props: {
      titleLines: ['sediment'],
      body: 'const layer = silt.deposit({ grain: 0.05, flood: season })',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 19,
    label: 'Two-line headline',
    props: {
      titleLines: ['River', 'clay'],
      body: 'Two-line SVG headline.',
      image: PLACEHOLDER_PORTRAIT,
      ctaLabel: 'Dig deeper',
      ctaHref: '#dig',
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Silt Layer',
      titleLines: ['Bold', 'sediment'],
      body: 'Full editorial split with all fields populated.',
      image: PLACEHOLDER_PORTRAIT,
      ctaLabel: 'Begin survey',
      ctaHref: '#survey',
    },
  },
]
