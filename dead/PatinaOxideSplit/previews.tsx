import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
  type PreviewVariant,
} from '../../src/previews/types'
import type { PatinaOxideSplitProps } from './PatinaOxideSplit'

export const patinaOxideSplitVariants: PreviewVariant<PatinaOxideSplitProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Patina'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Oxidation',
      titleLines: ['Verdigris', 'bleeds'],
      body: 'Luxury split with copper patina and verdigris diffusion in the center gutter.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Every copper surface eventually surrenders to the green of time'],
      body: 'Long headline wraps inside the serif SVG lines.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 4,
    label: 'Missing headline fallback',
    props: { titleLines: [], body: 'Empty title falls back to Patina oxide.', image: PLACEHOLDER_PORTRAIT },
  },
  {
    id: 5,
    label: 'Short body',
    props: { titleLines: ['Copper'], body: 'Brief copy.', image: PLACEHOLDER_PORTRAIT },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Patina',
      titleLines: ['Green', 'seam'],
      body: 'The oxidation is not decoration — it is the membrane between image and text. Photograph sits on one side while copy emerges through the verdigris gutter. Mobile stacks image above text; desktop places them side by side with copper bleeding in the center.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 7,
    label: 'Empty body',
    props: { titleLines: ['Oxide only'], image: PLACEHOLDER_PORTRAIT },
  },
  {
    id: 8,
    label: 'Portrait image',
    props: {
      titleLines: ['Portrait', 'plate'],
      body: 'Tall 3:4 crop on mobile.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: {
      titleLines: ['Landscape', 'plate'],
      body: 'Wide source cropped to ratio.',
      image: PLACEHOLDER_LANDSCAPE,
    },
  },
  {
    id: 10,
    label: 'Missing image',
    props: {
      titleLines: ['No image'],
      body: 'Placeholder copper panel.',
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
      body: 'No link — patina only.',
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
      ctaLabel: 'View plate',
      ctaHref: '#plate',
    },
  },
  {
    id: 14,
    label: 'Eyebrow only',
    props: {
      eyebrow: 'Chapter IX',
      titleLines: ['The oxide'],
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 15,
    label: 'No eyebrow',
    props: {
      titleLines: ['Plain', 'copper'],
      body: 'Eyebrow omitted.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 16,
    label: 'Stat in body',
    props: {
      titleLines: ['200', 'years'],
      body: 'Years for copper to develop full verdigris patina.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 17,
    label: 'Quote in body',
    props: {
      titleLines: ['Time'],
      body: '"Copper remembers every rain that touched its surface." — Metallurgist proverb',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 18,
    label: 'Two-line title',
    props: {
      titleLines: ['Green', 'proof'],
      body: 'Two explicit SVG lines.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 19,
    label: 'Three-line title',
    props: {
      titleLines: ['Oxide', 'the', 'seam'],
      body: 'Three-line headline.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Patina Oxide',
      titleLines: ['Oxidized', 'stories'],
      body: 'Full luxury split with portrait image, body copy, and CTA link.',
      image: PLACEHOLDER_PORTRAIT,
      ctaLabel: 'View collection',
      ctaHref: '#collection',
    },
  },
]
