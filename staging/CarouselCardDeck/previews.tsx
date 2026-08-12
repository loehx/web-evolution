import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
} from '../../src/previews/types'
import type { PreviewVariant } from '../../src/previews/types'
import type { CarouselCardDeckProps } from './CarouselCardDeck'

const sampleCards = [
  {
    title: 'Design systems',
    description: 'Tokens, primitives, and patterns that scale.',
    imageUrl: PLACEHOLDER_LANDSCAPE,
    href: '#design',
  },
  {
    title: 'Motion craft',
    description: 'Subtle animation without scroll-jacking.',
    imageUrl: PLACEHOLDER_PORTRAIT,
    href: '#motion',
  },
  {
    title: 'Accessibility',
    description: 'Keyboard, screen readers, and reduced motion.',
    imageUrl: PLACEHOLDER_LANDSCAPE,
  },
]

export const carouselCardDeckVariants: PreviewVariant<CarouselCardDeckProps>[] = [
  { id: 1, label: 'Three cards with images', props: { items: sampleCards } },
  {
    id: 2,
    label: 'Single card',
    props: {
      items: [{ title: 'Only one', description: 'Carousel still renders.', imageUrl: PLACEHOLDER_LANDSCAPE }],
    },
  },
  { id: 3, label: 'Empty items', props: { items: [] } },
  {
    id: 4,
    label: 'Title only cards',
    props: {
      items: [
        { title: 'Alpha' },
        { title: 'Beta' },
        { title: 'Gamma' },
      ],
    },
  },
  {
    id: 5,
    label: 'Long titles',
    props: {
      items: [
        {
          title: 'Enterprise-grade workflow automation for distributed teams',
          description: 'Short body.',
          imageUrl: PLACEHOLDER_LANDSCAPE,
        },
        {
          title: 'Another extremely long headline that must wrap inside the card',
          imageUrl: PLACEHOLDER_PORTRAIT,
        },
      ],
    },
  },
  {
    id: 6,
    label: 'Long descriptions',
    props: {
      items: [
        {
          title: 'Deep dive',
          description:
            'This description is intentionally verbose to test line-clamp behavior across three lines before truncation kicks in on smaller card widths.',
          imageUrl: PLACEHOLDER_LANDSCAPE,
        },
        {
          title: 'Second card',
          description: 'More copy here to fill space and test horizontal scroll with varied content lengths.',
          imageUrl: PLACEHOLDER_PORTRAIT,
        },
        { title: 'Third', description: 'Brief.', imageUrl: PLACEHOLDER_LANDSCAPE },
      ],
    },
  },
  {
    id: 7,
    label: 'Missing descriptions',
    props: {
      items: [
        { title: 'Image only context', imageUrl: PLACEHOLDER_LANDSCAPE },
        { title: 'No body copy', imageUrl: PLACEHOLDER_PORTRAIT },
      ],
    },
  },
  {
    id: 8,
    label: 'Portrait images',
    props: {
      items: [
        { title: 'Portrait A', imageUrl: PLACEHOLDER_PORTRAIT },
        { title: 'Portrait B', imageUrl: PLACEHOLDER_PORTRAIT },
        { title: 'Portrait C', imageUrl: PLACEHOLDER_PORTRAIT },
      ],
    },
  },
  {
    id: 9,
    label: 'Landscape images',
    props: {
      items: [
        { title: 'Wide A', imageUrl: PLACEHOLDER_LANDSCAPE },
        { title: 'Wide B', imageUrl: PLACEHOLDER_LANDSCAPE },
      ],
    },
  },
  {
    id: 10,
    label: 'Missing images',
    props: {
      items: [
        { title: 'No art', description: 'Placeholder block shows.' },
        { title: 'Also missing', description: 'Still scrollable.' },
      ],
    },
  },
  {
    id: 11,
    label: 'Broken image URLs',
    props: {
      items: [
        { title: 'Broken', imageUrl: PLACEHOLDER_BROKEN },
        { title: 'Valid', imageUrl: PLACEHOLDER_LANDSCAPE },
      ],
    },
  },
  {
    id: 12,
    label: 'All with href links',
    props: {
      items: sampleCards.map((c) => ({ ...c, href: '#linked' })),
    },
  },
  {
    id: 13,
    label: 'No href links',
    props: {
      items: sampleCards.map(({ href: _h, ...rest }) => rest),
    },
  },
  {
    id: 14,
    label: 'No arrow controls',
    props: { items: sampleCards, showArrows: false },
  },
  {
    id: 15,
    label: 'Many cards stress test',
    props: {
      items: Array.from({ length: 8 }, (_, i) => ({
        title: `Card ${i + 1}`,
        description: `Item number ${i + 1}`,
        imageUrl: i % 2 === 0 ? PLACEHOLDER_LANDSCAPE : PLACEHOLDER_PORTRAIT,
      })),
    },
  },
  {
    id: 16,
    label: 'Numeric titles',
    props: {
      items: [
        { title: '01', description: 'First', imageUrl: PLACEHOLDER_LANDSCAPE },
        { title: '02', description: 'Second', imageUrl: PLACEHOLDER_LANDSCAPE },
        { title: '03', description: 'Third', imageUrl: PLACEHOLDER_LANDSCAPE },
      ],
    },
  },
  {
    id: 17,
    label: 'Emoji titles',
    props: {
      items: [
        { title: '🎨 Design', imageUrl: PLACEHOLDER_LANDSCAPE },
        { title: '⚡ Speed', imageUrl: PLACEHOLDER_PORTRAIT },
        { title: '🔒 Trust', imageUrl: PLACEHOLDER_LANDSCAPE },
      ],
    },
  },
  {
    id: 18,
    label: 'Mixed image presence',
    props: {
      items: [
        { title: 'With image', imageUrl: PLACEHOLDER_LANDSCAPE },
        { title: 'Without image', description: 'Text only card' },
        { title: 'Broken', imageUrl: PLACEHOLDER_BROKEN },
      ],
    },
  },
  {
    id: 19,
    label: 'Two cards only',
    props: {
      items: [
        { title: 'Start', description: 'Beginning of deck', imageUrl: PLACEHOLDER_LANDSCAPE },
        { title: 'End', description: 'Last card', imageUrl: PLACEHOLDER_PORTRAIT },
      ],
    },
  },
  {
    id: 20,
    label: 'Whitespace padded titles',
    props: {
      items: [
        { title: '  Padded  ', description: '  Also padded  ', imageUrl: PLACEHOLDER_LANDSCAPE },
        { title: 'Normal', description: 'Clean labels', imageUrl: PLACEHOLDER_PORTRAIT },
      ],
    },
  },
]
