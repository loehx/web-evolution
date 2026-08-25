import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
  type PreviewVariant,
} from '../../src/previews/types'
import type { VerdureCanopySplitProps } from './VerdureCanopySplit'

export const verdureCanopySplitVariants: PreviewVariant<VerdureCanopySplitProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Verdure'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Canopy',
      titleLines: ['Dappled', 'light'],
      body: 'Editorial forest split with moving dappled light across the copy column.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Sunlight filters through the canopy in patterns that shift with the breeze'],
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
    props: { titleLines: ['Green'], body: 'Brief copy.', image: PLACEHOLDER_PORTRAIT },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Forest',
      titleLines: ['Leaf', 'filter'],
      body: 'The canopy is not decoration — it casts moving dappled light onto the copy column while the photograph sits beneath overlapping leaf silhouettes. Mobile stacks image above text; desktop places them side by side.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  { id: 7, label: 'Empty body', props: { titleLines: ['Canopy only'], image: PLACEHOLDER_PORTRAIT } },
  {
    id: 8,
    label: 'Portrait image',
    props: {
      titleLines: ['Portrait', 'grove'],
      body: 'Tall 3:4 crop.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: {
      titleLines: ['Wide', 'trail'],
      body: 'Wide source cropped to ratio.',
      image: PLACEHOLDER_LANDSCAPE,
    },
  },
  {
    id: 10,
    label: 'Missing image',
    props: { titleLines: ['No image'], body: 'Forest floor placeholder.' },
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
      body: 'No link — canopy only.',
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
      ctaLabel: 'Walk the trail',
      ctaHref: '#trail',
    },
  },
  {
    id: 14,
    label: 'Eyebrow only',
    props: {
      eyebrow: 'Chapter III',
      titleLines: ['The canopy'],
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 15,
    label: 'No eyebrow',
    props: {
      titleLines: ['Plain', 'forest'],
      body: 'Eyebrow omitted.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 16,
    label: 'Stat in body',
    props: {
      titleLines: ['40m'],
      body: 'Average canopy height in temperate deciduous forests.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 17,
    label: 'Quote in body',
    props: {
      titleLines: ['Green'],
      body: '"In verdure, patience is the only season." — Forester proverb',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 18,
    label: 'Code in body',
    props: {
      titleLines: ['photosynthesis'],
      body: 'const light = canopy.filter(sunlight, { dapple: true, wavelength: 580 })',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 19,
    label: 'Two-line headline',
    props: {
      titleLines: ['Forest', 'light'],
      body: 'Two-line SVG headline.',
      image: PLACEHOLDER_PORTRAIT,
      ctaLabel: 'Enter',
      ctaHref: '#enter',
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Verdure Canopy',
      titleLines: ['Bold', 'forest'],
      body: 'Full editorial split with all fields populated.',
      image: PLACEHOLDER_PORTRAIT,
      ctaLabel: 'Begin walk',
      ctaHref: '#walk',
    },
  },
]
