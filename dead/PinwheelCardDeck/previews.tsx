import type { PreviewVariant } from '../../src/previews/types'
import type { PinwheelCardDeckProps } from './PinwheelCardDeck'

const IMG_LAND =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
const IMG_PORT =
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'
const IMG_SQ =
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe89?w=800&q=80'

const threeCards = [
  { image: IMG_PORT, title: 'North spoke', body: 'Active at twelve-o-clock.' },
  { image: IMG_LAND, title: 'East story', body: 'Spin the hub.' },
  { image: IMG_SQ, title: 'South card', body: 'Swipe to rotate.' },
]

export const pinwheelCardDeckVariants: PreviewVariant<PinwheelCardDeckProps>[] = [
  { id: 1, label: 'Three cards', props: { cards: threeCards } },
  {
    id: 2,
    label: 'Eyebrow + title + cards',
    props: {
      eyebrow: 'Pinwheel',
      title: 'Stories on spokes',
      cards: threeCards,
    },
  },
  {
    id: 3,
    label: 'One card only',
    props: {
      cards: [{ image: IMG_PORT, title: 'Solo spoke', body: 'Still a full stage.' }],
    },
  },
  {
    id: 4,
    label: 'Empty deck',
    props: { eyebrow: 'No cards', title: 'Empty hub', cards: [] },
  },
  {
    id: 5,
    label: 'Cards without images',
    props: {
      cards: [
        { title: 'Text only', body: 'Placeholder slab.' },
        { title: 'Another', body: 'No photo.' },
      ],
    },
  },
  {
    id: 6,
    label: 'Long card titles',
    props: {
      cards: [
        {
          image: IMG_LAND,
          title: 'A headline that wraps inside the spoke panel',
          body: 'Pinwheel keeps cards readable.',
        },
        { image: IMG_PORT, title: 'Second long title for balance', body: 'Still spins.' },
      ],
    },
  },
  {
    id: 7,
    label: 'Long body text',
    props: {
      cards: [
        {
          image: IMG_SQ,
          title: 'Dense copy',
          body:
            'Each card can carry a full paragraph. The pinwheel does not shrink to a carousel strip — the hub owns the viewport.',
        },
      ],
    },
  },
  {
    id: 8,
    label: 'Five cards',
    props: {
      cards: [
        { image: IMG_PORT, title: '01', body: 'Five spokes.' },
        { image: IMG_LAND, title: '02', body: 'More rotation.' },
        { image: IMG_SQ, title: '03', body: 'Still playful.' },
        { image: IMG_PORT, title: '04', body: 'Coral accent.' },
        { image: IMG_LAND, title: '05', body: 'Full wheel.' },
      ],
    },
  },
  {
    id: 9,
    label: 'Six cards max wheel',
    props: {
      cards: Array.from({ length: 6 }, (_, i) => ({
        image: i % 2 ? IMG_PORT : IMG_LAND,
        title: `Spoke ${i + 1}`,
        body: 'Six-way pinwheel.',
      })),
    },
  },
  {
    id: 10,
    label: 'Initial index 2',
    props: { cards: threeCards, initialIndex: 2 },
  },
  {
    id: 11,
    label: 'German labels',
    props: {
      eyebrow: 'Rad',
      title: 'Geschichten',
      cards: [
        { image: IMG_PORT, title: 'Norden', body: 'Drehen.' },
        { image: IMG_LAND, title: 'Osten', body: 'Wischen.' },
      ],
    },
  },
  {
    id: 12,
    label: 'Portrait heavy',
    props: {
      cards: [
        { image: IMG_PORT, title: 'Tall crop', body: '4:5 ratio.' },
        { image: IMG_PORT, title: 'Another portrait', body: 'Consistent crop.' },
      ],
    },
  },
  {
    id: 13,
    label: 'Landscape images',
    props: {
      cards: [
        { image: IMG_LAND, title: 'Wide photo', body: 'Still cropped to 4:5.' },
        { image: IMG_LAND, title: 'Wide two', body: 'Center crop.' },
      ],
    },
  },
  {
    id: 14,
    label: 'Broken image URL',
    props: {
      cards: [
        { image: 'https://broken.invalid/photo.jpg', title: 'Broken', body: 'Fallback slab.' },
        { image: IMG_SQ, title: 'Valid', body: 'Next spoke.' },
      ],
    },
  },
  {
    id: 15,
    label: 'No section title',
    props: { cards: threeCards },
  },
  {
    id: 16,
    label: 'Title only cards',
    props: {
      cards: [
        { title: 'No body one' },
        { title: 'No body two' },
        { title: 'No body three' },
      ],
    },
  },
  {
    id: 17,
    label: 'Eight cards cap',
    props: {
      cards: Array.from({ length: 8 }, (_, i) => ({
        image: IMG_SQ,
        title: `Card ${i + 1}`,
        body: 'Max spokes.',
      })),
    },
  },
  {
    id: 18,
    label: 'Product features',
    props: {
      eyebrow: 'Forge tools',
      title: 'What ships',
      cards: [
        { image: IMG_LAND, title: 'Hammer', body: 'Titanium head.' },
        { image: IMG_PORT, title: 'Chisel', body: 'Replaceable edge.' },
        { image: IMG_SQ, title: 'Square', body: 'Machined brass.' },
      ],
    },
  },
  {
    id: 19,
    label: 'Travel stories',
    props: {
      cards: [
        { image: IMG_PORT, title: 'Lisbon', body: 'Morning light on tile.' },
        { image: IMG_LAND, title: 'Iceland', body: 'Black sand horizon.' },
      ],
    },
  },
  {
    id: 20,
    label: 'Minimal two cards',
    props: {
      eyebrow: 'Pair',
      cards: [
        { image: IMG_SQ, title: 'A', body: 'Binary spin.' },
        { image: IMG_PORT, title: 'B', body: 'Opposite spoke.' },
      ],
    },
  },
]
