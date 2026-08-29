import type { PreviewVariant } from '../../src/previews/types'
import type { SlateChalkSplitProps } from './SlateChalkSplit'

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1513542789411-b6a5d4b31634?w=800&q=80'
const PORTRAIT_IMAGE =
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80'
const LANDSCAPE_IMAGE =
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80'

const baseProps: SlateChalkSplitProps = {
  eyebrow: 'Slate board',
  titleLines: ['Chalk', 'lines'],
  body: 'Editorial split with chalk-white display type crossing the slate seam between photograph and copy.',
  image: SAMPLE_IMAGE,
  imageAlt: 'Classroom slate board',
  ctaLabel: 'Read essay',
  ctaHref: '#essay',
}

export const slateChalkSplitVariants: PreviewVariant<SlateChalkSplitProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Slate'] } },
  { id: 2, label: 'Headline + body', props: { titleLines: ['Chalk', 'dust'], body: baseProps.body } },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Every chalk line crosses the slate seam between photograph and serif copy columns'],
      body: 'Long headline wraps inside SVG lines.',
    },
  },
  { id: 4, label: 'Missing headline fallback', props: { titleLines: [], body: 'Empty title falls back.' } },
  { id: 5, label: 'Short body', props: { titleLines: ['Board'], body: 'Brief copy.' } },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Editorial',
      titleLines: ['Slate', 'seam'],
      body: 'The chalk dust is not decoration — it drifts through the center gutter between photograph and copy. Mobile stacks image above text; desktop overlaps the image into the copy column like a magazine spread.',
    },
  },
  { id: 7, label: 'Empty body', props: { titleLines: ['Chalk only'], eyebrow: 'Slate' } },
  {
    id: 8,
    label: 'Portrait image',
    props: { titleLines: ['Vertical'], image: PORTRAIT_IMAGE, body: 'Tall 3/4 crop.' },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: { titleLines: ['Wide board'], image: LANDSCAPE_IMAGE, body: 'Wide source cropped to 3/4.' },
  },
  {
    id: 10,
    label: 'Missing image',
    props: { titleLines: ['No photo'], body: 'Placeholder slate board holds layout.' },
  },
  {
    id: 11,
    label: 'Broken image URL',
    props: {
      titleLines: ['Broken'],
      image: 'https://example.invalid/slate.jpg',
      body: 'Invalid URL fallback.',
    },
  },
  { id: 12, label: 'No CTA', props: { ...baseProps, ctaLabel: undefined, ctaHref: undefined } },
  { id: 13, label: 'Single CTA', props: baseProps },
  {
    id: 14,
    label: 'No eyebrow',
    props: { titleLines: ['Plain slate'], body: 'Eyebrow omitted.', image: SAMPLE_IMAGE },
  },
  {
    id: 15,
    label: 'Eyebrow only',
    props: { eyebrow: 'Section 04', titleLines: ['Essay'], body: 'Minimal eyebrow + title.' },
  },
  {
    id: 16,
    label: 'Three line headline',
    props: { titleLines: ['Chalk', 'on', 'slate'], body: 'Three explicit SVG lines.', image: SAMPLE_IMAGE },
  },
  {
    id: 17,
    label: 'Quote in body',
    props: {
      titleLines: ['Dust'],
      body: '"Every lesson leaves a trace of chalk in the air." — Classroom proverb',
      image: PORTRAIT_IMAGE,
    },
  },
  {
    id: 18,
    label: 'Stat in body',
    props: {
      titleLines: ['40 seats'],
      body: 'Capacity of the lecture hall where this slate board was photographed.',
      image: LANDSCAPE_IMAGE,
    },
  },
  {
    id: 19,
    label: 'Code in body',
    props: {
      titleLines: ['slate'],
      body: 'const dust = chalk.scatter({ gutter: center, opacity: 0.4 })',
      image: SAMPLE_IMAGE,
    },
  },
  { id: 20, label: 'Full split', props: baseProps },
]
