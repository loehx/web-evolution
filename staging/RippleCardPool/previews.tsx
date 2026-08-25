import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
  type PreviewVariant,
} from '../../src/previews/types'
import type { RippleCardPoolProps } from './RippleCardPool'

const SAMPLE_CARDS = [
  {
    image: PLACEHOLDER_LANDSCAPE,
    title: 'Tidal shift',
    body: 'Stories ride the crest of each ripple ring.',
  },
  {
    image: PLACEHOLDER_PORTRAIT,
    title: 'Pool depth',
    body: 'Swipe to advance through concentric rings.',
  },
  {
    image: PLACEHOLDER_LANDSCAPE,
    title: 'Foam edge',
    body: 'Active card scales up at the pool center.',
  },
]

export const rippleCardPoolVariants: PreviewVariant<RippleCardPoolProps>[] = [
  { id: 1, label: 'Single card', props: { cards: [{ title: 'One ripple' }] } },
  {
    id: 2,
    label: 'Three cards default',
    props: { eyebrow: 'Pool', title: 'Ripple ring', cards: SAMPLE_CARDS },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'STORIES FLOAT ON CONCENTRIC RIPPLE RINGS',
      cards: SAMPLE_CARDS,
    },
  },
  { id: 4, label: 'No section title', props: { eyebrow: 'Ripple', cards: SAMPLE_CARDS } },
  {
    id: 5,
    label: 'Short card body',
    props: {
      cards: [{ title: 'Brief', body: 'Short.', image: PLACEHOLDER_LANDSCAPE }],
    },
  },
  {
    id: 6,
    label: 'Long card body',
    props: {
      cards: [
        {
          title: 'Long copy',
          body: 'The ripple is not decoration — each card rides a ring crest while the pool center stays still. Swipe left or right to advance; arrows work on desktop. Mobile uses smaller ring radii.',
          image: PLACEHOLDER_LANDSCAPE,
        },
      ],
    },
  },
  { id: 7, label: 'Empty card body', props: { cards: [{ title: 'No body', image: PLACEHOLDER_LANDSCAPE }] } },
  {
    id: 8,
    label: 'Portrait image',
    props: {
      cards: [{ title: 'Portrait', body: 'Tall crop.', image: PLACEHOLDER_PORTRAIT }],
    },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: {
      cards: [{ title: 'Landscape', body: 'Wide crop.', image: PLACEHOLDER_LANDSCAPE }],
    },
  },
  {
    id: 10,
    label: 'Missing image',
    props: { cards: [{ title: 'No image', body: 'Placeholder panel.' }] },
  },
  {
    id: 11,
    label: 'Broken image URL',
    props: {
      cards: [{ title: 'Broken', body: 'Fails gracefully.', image: PLACEHOLDER_BROKEN }],
    },
  },
  {
    id: 12,
    label: 'Five cards',
    props: {
      title: 'Full pool',
      cards: [
        { title: 'Ring 1', body: 'First.', image: PLACEHOLDER_LANDSCAPE },
        { title: 'Ring 2', body: 'Second.', image: PLACEHOLDER_PORTRAIT },
        { title: 'Ring 3', body: 'Third.', image: PLACEHOLDER_LANDSCAPE },
        { title: 'Ring 4', body: 'Fourth.', image: PLACEHOLDER_PORTRAIT },
        { title: 'Ring 5', body: 'Fifth.', image: PLACEHOLDER_LANDSCAPE },
      ],
    },
  },
  {
    id: 13,
    label: 'Eight cards max',
    props: {
      cards: Array.from({ length: 8 }, (_, i) => ({
        title: `Card ${i + 1}`,
        body: `Story ${i + 1} on ring ${i + 1}.`,
        image: i % 2 === 0 ? PLACEHOLDER_LANDSCAPE : PLACEHOLDER_PORTRAIT,
      })),
    },
  },
  { id: 14, label: 'Empty cards array', props: { title: 'Empty', cards: [] } },
  {
    id: 15,
    label: 'No eyebrow',
    props: { title: 'Plain pool', cards: SAMPLE_CARDS },
  },
  {
    id: 16,
    label: 'Eyebrow only',
    props: { eyebrow: 'Chapter II', cards: SAMPLE_CARDS },
  },
  {
    id: 17,
    label: 'Initial index 2',
    props: { cards: SAMPLE_CARDS, initialIndex: 2 },
  },
  {
    id: 18,
    label: 'Stat card',
    props: {
      cards: [{ title: '42 rings', body: 'Maximum ripple depth in the prototype pool.', image: PLACEHOLDER_LANDSCAPE }],
    },
  },
  {
    id: 19,
    label: 'Quote card',
    props: {
      cards: [
        {
          title: 'Still water',
          body: '"The deepest pools ripple least at the center." — Pond proverb',
          image: PLACEHOLDER_LANDSCAPE,
        },
      ],
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Ripple Pool',
      title: 'Stories on rings',
      cards: SAMPLE_CARDS,
    },
  },
]
