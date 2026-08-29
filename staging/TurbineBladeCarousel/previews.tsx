import type { PreviewVariant } from '../../src/previews/types'
import type { TurbineBladeCarouselProps } from './TurbineBladeCarousel'

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
const PORTRAIT_IMAGE =
  'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&q=80'
const LANDSCAPE_IMAGE =
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80'

const baseCards = [
  {
    image: SAMPLE_IMAGE,
    title: 'Blade one',
    body: 'First story mounted on the lowest turbine spoke — drag the rail to advance.',
    href: '#blade1',
  },
  {
    image: LANDSCAPE_IMAGE,
    title: 'Blade two',
    body: 'Second card rotates into center focus on the steel hub.',
    href: '#blade2',
  },
  {
    image: PORTRAIT_IMAGE,
    title: 'Blade three',
    body: 'Third blade — tallest lift when active in the snap rail.',
    href: '#blade3',
  },
]

export const turbineBladeCarouselVariants: PreviewVariant<TurbineBladeCarouselProps>[] = [
  { id: 1, label: 'Single card', props: { cards: [baseCards[0]] } },
  {
    id: 2,
    label: 'Three cards default',
    props: { eyebrow: 'Turbine', title: 'Blade carousel', cards: baseCards },
  },
  { id: 3, label: 'Title only header', props: { title: 'Stories on steel', cards: baseCards } },
  { id: 4, label: 'Eyebrow only', props: { eyebrow: 'Industrial rail', cards: baseCards } },
  { id: 5, label: 'No header', props: { cards: baseCards } },
  {
    id: 6,
    label: 'Long card body',
    props: {
      cards: [
        {
          image: SAMPLE_IMAGE,
          title: 'Power generation',
          body: 'The turbine rail does not flatten cards — each story mounts on a steel blade spoke radiating from the central hub. Drag horizontally or use arrows to snap the next blade to center. Active card lifts while inactive blades recede.',
        },
      ],
    },
  },
  {
    id: 7,
    label: 'Missing image',
    props: { cards: [{ title: 'Empty blade', body: 'No image — placeholder holds layout.' }] },
  },
  {
    id: 8,
    label: 'Portrait image',
    props: { cards: [{ image: PORTRAIT_IMAGE, title: 'Vertical shaft', body: 'Tall 4/5 crop.' }] },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: { cards: [{ image: LANDSCAPE_IMAGE, title: 'Wide rotor', body: 'Wide source cropped to 4/5.' }] },
  },
  {
    id: 10,
    label: 'Broken image URL',
    props: {
      cards: [{ image: 'https://example.invalid/turbine.jpg', title: 'Broken', body: 'Invalid URL fallback.' }],
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
        { image: SAMPLE_IMAGE, title: 'Blade four', body: 'Fourth spoke.' },
        { image: LANDSCAPE_IMAGE, title: 'Blade five', body: 'Fifth spoke.' },
      ],
    },
  },
  {
    id: 14,
    label: 'Two cards',
    props: { cards: baseCards.slice(0, 2), eyebrow: 'Pair', title: 'Dual blade' },
  },
  {
    id: 15,
    label: 'Long title',
    props: {
      cards: [{ image: SAMPLE_IMAGE, title: 'Hydroelectric turbine blade inspection report', body: 'Long title wraps.' }],
    },
  },
  {
    id: 16,
    label: 'Initial index 1',
    props: { cards: baseCards, initialIndex: 1, title: 'Start at blade 2' },
  },
  {
    id: 17,
    label: 'Stat in body',
    props: {
      cards: [{ image: SAMPLE_IMAGE, title: '3.2 MW', body: 'Rated output of the turbine unit on this blade.' }],
    },
  },
  {
    id: 18,
    label: 'Quote in body',
    props: {
      cards: [
        {
          image: PORTRAIT_IMAGE,
          title: 'Rotation',
          body: '"Every blade catches the wind at a different angle." — Turbine engineer',
        },
      ],
    },
  },
  {
    id: 19,
    label: 'Empty cards array',
    props: { eyebrow: 'Turbine', title: 'No blades', cards: [] },
  },
  {
    id: 20,
    label: 'Full carousel',
    props: {
      eyebrow: 'Industrial carousel',
      title: 'Turbine blade deck',
      cards: baseCards,
    },
  },
]
