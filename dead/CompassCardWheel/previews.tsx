import type { PreviewVariant } from '../../src/previews/types'
import type { CompassCardWheelProps } from './CompassCardWheel'

const imgA = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=675&fit=crop'
const imgB = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&h=675&fit=crop'
const imgC = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&h=675&fit=crop'
const imgD = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&h=675&fit=crop'

const sampleCards = [
  { image: imgA, title: 'Coastal survey', body: 'Tide charts for the western shelf.', index: '01' },
  { image: imgB, title: 'Valley relay', body: 'Microwave link across the pass.', index: '02' },
  { image: imgC, title: 'Forest grid', body: 'Sensor nodes under the canopy.', index: '03' },
  { image: imgD, title: 'Lake mirror', body: 'Night calibration at altitude.', index: '04' },
]

export const compassCardWheelVariants: PreviewVariant<CompassCardWheelProps>[] = [
  { id: 1, label: 'Four cards default', props: { cards: sampleCards } },
  {
    id: 2,
    label: 'Section title + cards',
    props: { eyebrow: 'Field notes', title: 'Pick a bearing', cards: sampleCards },
  },
  {
    id: 3,
    label: 'Three cards',
    props: {
      title: 'Triad',
      cards: sampleCards.slice(0, 3),
    },
  },
  {
    id: 4,
    label: 'Six cards',
    props: {
      title: 'Full rose',
      cards: [
        ...sampleCards,
        { image: imgA, title: 'Harbor ping', body: 'Dock telemetry.', index: '05' },
        { image: imgB, title: 'Ridge echo', body: 'Snow line repeaters.', index: '06' },
      ],
    },
  },
  {
    id: 5,
    label: 'Cards without images',
    props: {
      title: 'Text only wheel',
      cards: sampleCards.map((c) => ({ ...c, image: undefined })),
    },
  },
  {
    id: 6,
    label: 'Long card titles',
    props: {
      cards: [
        {
          image: imgC,
          title: 'Emergency broadcast on the northern perimeter during storm season',
          body: 'Wrap test.',
          index: '01',
        },
        ...sampleCards.slice(1, 4),
      ],
    },
  },
  {
    id: 7,
    label: 'Empty cards array',
    props: { title: 'No cards', cards: [] },
  },
  {
    id: 8,
    label: 'Single card',
    props: {
      title: 'Solo bearing',
      cards: [sampleCards[0]],
    },
  },
  {
    id: 9,
    label: 'Missing card body',
    props: {
      cards: sampleCards.map((c) => ({ image: c.image, title: c.title, index: c.index })),
    },
  },
  {
    id: 10,
    label: 'Portrait-heavy images',
    props: {
      cards: [
        {
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop',
          title: 'Portrait slot',
          body: '4/3 crop from tall source.',
          index: '01',
        },
        ...sampleCards.slice(1),
      ],
    },
  },
  {
    id: 11,
    label: 'Broken image URL',
    props: {
      cards: [
        { image: 'https://example.invalid/broken.jpg', title: 'Broken', body: 'Fallback band.', index: '01' },
        ...sampleCards.slice(1, 3),
      ],
    },
  },
  {
    id: 12,
    label: 'Eyebrow only',
    props: { eyebrow: 'Navigation', cards: sampleCards.slice(0, 3) },
  },
  {
    id: 13,
    label: 'Very long section title',
    props: {
      title: 'Rotate the dial until the story you need faces north',
      cards: sampleCards,
    },
  },
  {
    id: 14,
    label: 'Two cards',
    props: {
      title: 'Binary',
      cards: sampleCards.slice(0, 2),
    },
  },
  {
    id: 15,
    label: 'Five cards',
    props: {
      title: 'Pentagon',
      cards: [...sampleCards, { image: imgC, title: 'Fifth point', body: 'Extra node.', index: '05' }],
    },
  },
  {
    id: 16,
    label: 'Short bodies',
    props: {
      cards: sampleCards.map((c) => ({ ...c, body: 'Ok.' })),
    },
  },
  {
    id: 17,
    label: 'Long bodies',
    props: {
      cards: sampleCards.map((c) => ({
        ...c,
        body: 'Extended field report describing terrain, weather, and relay uptime across a forty-eight hour window.',
      })),
    },
  },
  {
    id: 18,
    label: 'Custom indices',
    props: {
      cards: [
        { image: imgA, title: 'Alpha', body: 'First.', index: 'A' },
        { image: imgB, title: 'Beta', body: 'Second.', index: 'B' },
        { image: imgC, title: 'Gamma', body: 'Third.', index: 'G' },
      ],
    },
  },
  {
    id: 19,
    label: 'No section title',
    props: { eyebrow: 'Compass', cards: sampleCards },
  },
  {
    id: 20,
    label: 'Full header + five cards',
    props: {
      eyebrow: 'Expedition log',
      title: 'Bearings',
      cards: [
        ...sampleCards,
        { image: imgD, title: 'Summit', body: 'Final relay.', index: '05' },
      ],
    },
  },
]
