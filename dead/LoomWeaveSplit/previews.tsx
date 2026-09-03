import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
  type PreviewVariant,
} from '../../src/previews/types'
import type { LoomWeaveSplitProps } from './LoomWeaveSplit'

export const loomWeaveSplitVariants: PreviewVariant<LoomWeaveSplitProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Weave'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Loom',
      titleLines: ['Thread', 'by thread'],
      body: 'Editorial split with animated warp and weft crossing the gutter.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Every sentence is a shuttle passing through the warp'],
      body: 'Long headline wraps inside the serif SVG lines.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 4,
    label: 'Missing headline fallback',
    props: { titleLines: [], body: 'Empty title falls back to Woven words.', image: PLACEHOLDER_PORTRAIT },
  },
  {
    id: 5,
    label: 'Short body',
    props: { titleLines: ['Linen'], body: 'Brief copy.', image: PLACEHOLDER_PORTRAIT },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Editorial',
      titleLines: ['Hand', 'loom'],
      body: 'The threads are not decoration — they are the structure of the stage. Photograph sits behind the warp while copy weaves through the weft. Mobile stacks image above text; desktop places them side by side with threads in the gutter.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 7,
    label: 'Empty body',
    props: { titleLines: ['Threads only'], image: PLACEHOLDER_PORTRAIT },
  },
  {
    id: 8,
    label: 'Portrait image',
    props: {
      titleLines: ['Portrait', 'weave'],
      body: 'Tall 3:4 crop on mobile.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: {
      titleLines: ['Landscape', 'weave'],
      body: 'Wide source cropped to ratio.',
      image: PLACEHOLDER_LANDSCAPE,
    },
  },
  {
    id: 10,
    label: 'Missing image',
    props: {
      titleLines: ['No image'],
      body: 'Placeholder warp panel.',
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
      body: 'No link — threads only.',
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
      ctaLabel: 'Read essay',
      ctaHref: '#essay',
    },
  },
  {
    id: 14,
    label: 'Eyebrow only',
    props: {
      eyebrow: 'Chapter IV',
      titleLines: ['The loom'],
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 15,
    label: 'No eyebrow',
    props: {
      titleLines: ['Plain', 'linen'],
      body: 'Eyebrow omitted.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 16,
    label: 'Stat in body',
    props: {
      titleLines: ['12,000', 'threads'],
      body: 'Threads per square inch in traditional linen weave.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 17,
    label: 'Quote in body',
    props: {
      titleLines: ['Craft'],
      body: '"The loom remembers every pass of the shuttle." — Weaver proverb',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 18,
    label: 'Two-line title',
    props: {
      titleLines: ['Warp', 'weft'],
      body: 'Two explicit SVG lines.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 19,
    label: 'Three-line title',
    props: {
      titleLines: ['Thread', 'the', 'needle'],
      body: 'Three-line headline.',
      image: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Loom Weave',
      titleLines: ['Woven', 'stories'],
      body: 'Full editorial split with portrait image, body copy, and CTA link.',
      image: PLACEHOLDER_PORTRAIT,
      ctaLabel: 'Explore collection',
      ctaHref: '#collection',
    },
  },
]
