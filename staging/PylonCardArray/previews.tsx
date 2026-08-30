import type { PreviewVariant } from '../../src/previews/types'
import type { PylonCardArrayProps } from './PylonCardArray'

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80'
const PORTRAIT_IMAGE =
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80'
const LANDSCAPE_IMAGE =
  'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=900&q=80'

const baseCards = [
  {
    image: SAMPLE_IMAGE,
    title: 'Cross-arm one',
    body: 'First story mounted on the lowest pylon spoke — drag the rail to advance.',
    href: '#arm1',
  },
  {
    image: LANDSCAPE_IMAGE,
    title: 'Cross-arm two',
    body: 'Second card rotates into center focus on the steel tower hub.',
    href: '#arm2',
  },
  {
    image: PORTRAIT_IMAGE,
    title: 'Cross-arm three',
    body: 'Third arm — tallest lift when active in the snap rail.',
    href: '#arm3',
  },
]

export const pylonCardArrayVariants: PreviewVariant<PylonCardArrayProps>[] = [
  { id: 1, label: 'Single card', props: { cards: [baseCards[0]] } },
  {
    id: 2,
    label: 'Three cards default',
    props: { eyebrow: 'Pylon', title: 'Cross-arm array', cards: baseCards },
  },
  { id: 3, label: 'Title only header', props: { title: 'Stories on steel', cards: baseCards } },
  { id: 4, label: 'Eyebrow only', props: { eyebrow: 'Grid telemetry', cards: baseCards } },
  { id: 5, label: 'No header', props: { cards: baseCards } },
  {
    id: 6,
    label: 'Long card body',
    props: {
      cards: [
        {
          image: SAMPLE_IMAGE,
          title: 'High-voltage transmission',
          body: 'The pylon rail does not flatten cards — each story mounts on a steel cross-arm spoke radiating from the central tower. Drag horizontally or use arrows to snap the next card to center.',
        },
      ],
    },
  },
  {
    id: 7,
    label: 'Missing image',
    props: { cards: [{ title: 'Empty arm', body: 'No image — placeholder holds layout.' }] },
  },
  {
    id: 8,
    label: 'Portrait image',
    props: { cards: [{ image: PORTRAIT_IMAGE, title: 'Vertical tower', body: 'Tall 4/5 crop.' }] },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: { cards: [{ image: LANDSCAPE_IMAGE, title: 'Wide grid', body: 'Wide source cropped to 4/5.' }] },
  },
  {
    id: 10,
    label: 'Broken image URL',
    props: {
      cards: [{ image: 'https://example.invalid/pylon.jpg', title: 'Broken', body: 'Invalid URL fallback.' }],
    },
  },
  { id: 11, label: 'No card body', props: { cards: [{ image: SAMPLE_IMAGE, title: 'Title only' }] } },
  { id: 12, label: 'No card href', props: { cards: [{ image: SAMPLE_IMAGE, title: 'Static', body: 'No link.' }] } },
  {
    id: 13,
    label: 'Five cards',
    props: {
      cards: [
        ...baseCards,
        { image: SAMPLE_IMAGE, title: 'Arm four', body: 'Fourth spoke.' },
        { image: LANDSCAPE_IMAGE, title: 'Arm five', body: 'Fifth spoke.' },
      ],
    },
  },
  {
    id: 14,
    label: 'Two cards',
    props: { cards: baseCards.slice(0, 2), eyebrow: 'Pair', title: 'Dual arm' },
  },
  {
    id: 15,
    label: 'Long title',
    props: {
      cards: [{ image: SAMPLE_IMAGE, title: 'Transmission line inspection report for sector seven', body: 'Long title wraps.' }],
    },
  },
  {
    id: 16,
    label: 'Initial index 1',
    props: { cards: baseCards, initialIndex: 1, title: 'Start at arm 2' },
  },
  {
    id: 17,
    label: 'Stat in body',
    props: {
      cards: [{ image: SAMPLE_IMAGE, title: '765 kV', body: 'Voltage rating of the transmission line on this pylon.' }],
    },
  },
  {
    id: 18,
    label: 'Quote in body',
    props: {
      cards: [
        {
          image: PORTRAIT_IMAGE,
          title: 'Current',
          body: '"Every cross-arm carries power at a different angle." — Grid engineer',
        },
      ],
    },
  },
  {
    id: 19,
    label: 'Empty cards array',
    props: { eyebrow: 'Pylon', title: 'No arms', cards: [] },
  },
  {
    id: 20,
    label: 'Full carousel',
    props: {
      eyebrow: 'Industrial array',
      title: 'Pylon cross-arm deck',
      cards: baseCards,
    },
  },
]
