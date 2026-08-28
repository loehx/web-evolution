import type { PreviewVariant } from '../../src/previews/types'
import type { PlinthCardPedestalProps } from './PlinthCardPedestal'

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
const PORTRAIT_IMAGE =
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80'
const LANDSCAPE_IMAGE =
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80'

const baseCards = [
  {
    image: SAMPLE_IMAGE,
    title: 'Summit plinth',
    body: 'First story on the lowest limestone pedestal — drag the rail to advance.',
    href: '#summit',
  },
  {
    image: LANDSCAPE_IMAGE,
    title: 'Ridge ascent',
    body: 'Second card rises higher on its stone plinth than the first.',
    href: '#ridge',
  },
  {
    image: PORTRAIT_IMAGE,
    title: 'Peak marker',
    body: 'Third pedestal — tallest stone base in the ascending sequence.',
    href: '#peak',
  },
]

export const plinthCardPedestalVariants: PreviewVariant<PlinthCardPedestalProps>[] = [
  { id: 1, label: 'Single card', props: { cards: [baseCards[0]] } },
  {
    id: 2,
    label: 'Three cards default',
    props: { eyebrow: 'Plinth', title: 'Card pedestal', cards: baseCards },
  },
  { id: 3, label: 'Title only header', props: { title: 'Stories on stone', cards: baseCards } },
  { id: 4, label: 'Eyebrow only', props: { eyebrow: 'Limestone rail', cards: baseCards } },
  { id: 5, label: 'No header', props: { cards: baseCards } },
  {
    id: 6,
    label: 'Long card body',
    props: {
      cards: [
        {
          image: SAMPLE_IMAGE,
          title: 'Monument base',
          body: 'The plinth rail does not flatten cards — each story ascends on a taller limestone pedestal. Drag horizontally or use arrows to snap the next card to center. Active card lifts while inactive cards recede.',
        },
      ],
    },
  },
  {
    id: 7,
    label: 'Missing image',
    props: { cards: [{ title: 'Empty plinth', body: 'No image — placeholder holds layout.' }] },
  },
  {
    id: 8,
    label: 'Portrait image',
    props: { cards: [{ image: PORTRAIT_IMAGE, title: 'Vertical peak', body: 'Tall 4/5 crop.' }] },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: { cards: [{ image: LANDSCAPE_IMAGE, title: 'Wide ridge', body: 'Wide source cropped to 4/5.' }] },
  },
  {
    id: 10,
    label: 'Broken image URL',
    props: {
      cards: [{ image: 'https://example.invalid/plinth.jpg', title: 'Broken', body: 'Invalid URL fallback.' }],
    },
  },
  { id: 11, label: 'No card body', props: { cards: [{ image: SAMPLE_IMAGE, title: 'Title only' }] } },
  { id: 12, label: 'No card href', props: { cards: [{ image: SAMPLE_IMAGE, title: 'Static', body: 'No link.' }] } },
  {
    id: 13,
    label: 'Five cards',
    props: {
      eyebrow: 'Gallery',
      title: 'Five plinths',
      cards: [
        ...baseCards,
        { image: SAMPLE_IMAGE, title: 'Fourth tier', body: 'Even taller plinth.' },
        { image: LANDSCAPE_IMAGE, title: 'Fifth crest', body: 'Highest pedestal.' },
      ],
    },
  },
  { id: 14, label: 'Empty cards array', props: { title: 'Empty rail', cards: [] } },
  {
    id: 15,
    label: 'Long card title',
    props: {
      cards: [{ image: SAMPLE_IMAGE, title: 'Every story deserves its own ascending limestone pedestal', body: 'Long title wraps.' }],
    },
  },
  {
    id: 16,
    label: 'Quote in body',
    props: {
      cards: [{ image: PORTRAIT_IMAGE, title: 'Stone', body: '"The plinth elevates what it carries." — Mason proverb' }],
    },
  },
  {
    id: 17,
    label: 'Stat in body',
    props: {
      cards: [{ image: SAMPLE_IMAGE, title: '2.4m', body: 'Height of the tallest plinth in the default sequence.' }],
    },
  },
  {
    id: 18,
    label: 'Initial index 1',
    props: { cards: baseCards, initialIndex: 1, title: 'Start at second' },
  },
  {
    id: 19,
    label: 'Two cards only',
    props: { eyebrow: 'Pair', cards: baseCards.slice(0, 2) },
  },
  {
    id: 20,
    label: 'Full deck',
    props: {
      eyebrow: 'Brutalist gallery',
      title: 'Plinth card pedestal',
      cards: baseCards,
    },
  },
]
