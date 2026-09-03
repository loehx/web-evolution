import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
  type PreviewVariant,
} from '../../src/previews/types'
import type { VellumPressSplitProps } from './VellumPressSplit'

export const vellumPressSplitVariants: PreviewVariant<VellumPressSplitProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Vellum'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Press',
      titleLines: ['Ink', 'bleeds'],
      body: 'Editorial split with translucent vellum membrane and ink diffusion in the gutter.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Every letter pressed into vellum leaves a ghost of ink behind'],
      body: 'Long headline wraps inside the serif SVG lines.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 4,
    label: 'Missing headline fallback',
    props: { titleLines: [], body: 'Empty title falls back to Vellum press.', image: PLACEHOLDER_PORTRAIT },
  },
  {
    id: 5,
    label: 'Short body',
    props: { titleLines: ['Parchment'], body: 'Brief copy.', image: PLACEHOLDER_PORTRAIT },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Letterpress',
      titleLines: ['Hand', 'press'],
      body: 'The vellum is not decoration — it is the membrane between image and text. Photograph sits on one side while copy presses through the translucent gutter. Mobile stacks image above text; desktop places them side by side with ink bleeding in the center.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 7,
    label: 'Empty body',
    props: { titleLines: ['Ink only'], image: PLACEHOLDER_PORTRAIT },
  },
  {
    id: 8,
    label: 'Portrait image',
    props: {
      titleLines: ['Portrait', 'proof'],
      body: 'Tall 3:4 crop on mobile.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: {
      titleLines: ['Landscape', 'proof'],
      body: 'Wide source cropped to ratio.',
      image: PLACEHOLDER_LANDSCAPE,
    },
  },
  {
    id: 10,
    label: 'Missing image',
    props: {
      titleLines: ['No image'],
      body: 'Placeholder vellum panel.',
    },
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
      body: 'No link — ink only.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 13,
    label: 'Single CTA',
    props: {
      titleLines: ['Continue'],
      body: 'One underlined link.',
      image: PLACEHOLDER_PORTRAIT,
      ctaLabel: 'Read proof',
      ctaHref: '#proof',
    },
  },
  {
    id: 14,
    label: 'Eyebrow only',
    props: {
      eyebrow: 'Chapter IV',
      titleLines: ['The press'],
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 15,
    label: 'No eyebrow',
    props: {
      titleLines: ['Plain', 'vellum'],
      body: 'Eyebrow omitted.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 16,
    label: 'Stat in body',
    props: {
      titleLines: ['400', 'dpi'],
      body: 'Dots per inch in traditional letterpress printing.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 17,
    label: 'Quote in body',
    props: {
      titleLines: ['Craft'],
      body: '"The press remembers every impression of the type." — Printer proverb',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 18,
    label: 'Two-line title',
    props: {
      titleLines: ['Ink', 'proof'],
      body: 'Two explicit SVG lines.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 19,
    label: 'Three-line title',
    props: {
      titleLines: ['Press', 'the', 'page'],
      body: 'Three-line headline.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Vellum Press',
      titleLines: ['Pressed', 'stories'],
      body: 'Full editorial split with portrait image, body copy, and CTA link.',
      image: PLACEHOLDER_PORTRAIT,
      ctaLabel: 'View collection',
      ctaHref: '#collection',
    },
  },
]
