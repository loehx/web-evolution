import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
  type PreviewVariant,
} from '../../src/previews/types'
import type { MercurySlideCarouselProps } from './MercurySlideCarousel'

const SAMPLE_CARDS = [
  {
    image: PLACEHOLDER_LANDSCAPE,
    title: 'Liquid slide',
    body: 'Stories glide on the reflective mercury trough.',
  },
  {
    image: PLACEHOLDER_PORTRAIT,
    title: 'Silver meniscus',
    body: 'Swipe to advance through the liquid surface.',
  },
  {
    image: PLACEHOLDER_LANDSCAPE,
    title: 'Mirror ripple',
    body: 'Active card rises from the mercury pool.',
  },
]

export const mercurySlideCarouselVariants: PreviewVariant<MercurySlideCarouselProps>[] = [
  { id: 1, label: 'Single card', props: { cards: [{ title: 'One drop' }] } },
  {
    id: 2,
    label: 'Three cards default',
    props: { eyebrow: 'Mercury', title: 'Liquid slide', cards: SAMPLE_CARDS },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'STORIES GLIDE ON A REFLECTIVE MERCURY TROUGH',
      cards: SAMPLE_CARDS,
    },
  },
  { id: 4, label: 'No section title', props: { eyebrow: 'Slide', cards: SAMPLE_CARDS } },
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
          body: 'The mercury is not decoration — each card rides the silver meniscus while the trough stays reflective. Swipe left or right to advance; arrows work on desktop. Mobile uses a single centered card.',
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
    props: { cards: [{ title: 'No image', body: 'Mercury placeholder.' }] },
  },
  {
    id: 11,
    label: 'Broken image URL',
    props: {
      cards: [{ title: 'Broken', body: 'Fallback.', image: PLACEHOLDER_BROKEN }],
    },
  },
  {
    id: 12,
    label: 'Two cards only',
    props: {
      cards: [
        { title: 'First', body: 'Pair.', image: PLACEHOLDER_LANDSCAPE },
        { title: 'Second', body: 'Pair.', image: PLACEHOLDER_PORTRAIT },
      ],
    },
  },
  {
    id: 13,
    label: 'Five cards',
    props: {
      cards: [
        ...SAMPLE_CARDS,
        { title: 'Fourth', body: 'Extra.', image: PLACEHOLDER_LANDSCAPE },
        { title: 'Fifth', body: 'Extra.', image: PLACEHOLDER_PORTRAIT },
      ],
    },
  },
  {
    id: 14,
    label: 'Initial index 1',
    props: { cards: SAMPLE_CARDS, initialIndex: 1 },
  },
  {
    id: 15,
    label: 'Eyebrow only',
    props: { eyebrow: 'Chapter II', cards: SAMPLE_CARDS },
  },
  {
    id: 16,
    label: 'Stat in card body',
    props: {
      cards: [{ title: '−38.83°C', body: 'Mercury freezing point in Celsius.', image: PLACEHOLDER_LANDSCAPE }],
    },
  },
  {
    id: 17,
    label: 'Quote in card body',
    props: {
      cards: [
        {
          title: 'Reflect',
          body: '"Mercury holds every image it touches." — Alchemist proverb',
          image: PLACEHOLDER_LANDSCAPE,
        },
      ],
    },
  },
  {
    id: 18,
    label: 'Code in card body',
    props: {
      cards: [
        {
          title: 'Hg',
          body: 'const slide = mercury.glide({ card: active, surface: "reflective" })',
          image: PLACEHOLDER_LANDSCAPE,
        },
      ],
    },
  },
  {
    id: 19,
    label: 'Empty cards array',
    props: { title: 'Empty', cards: [] },
  },
  {
    id: 20,
    label: 'Full carousel',
    props: {
      eyebrow: 'Mercury Slide',
      title: 'Liquid carousel',
      cards: SAMPLE_CARDS,
    },
  },
]
