import type { PreviewVariant } from '../../src/previews/types'
import type { OrreryPlanetDeckProps } from './OrreryPlanetDeck'

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80'
const PORTRAIT_IMAGE =
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80'
const LANDSCAPE_IMAGE =
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=900&q=80'

const baseCards = [
  {
    image: SAMPLE_IMAGE,
    title: 'Mercury orbit',
    body: 'First planet on the brass ring — closest to the central sun.',
  },
  {
    image: LANDSCAPE_IMAGE,
    title: 'Venus glow',
    body: 'Second ring position with thick cloud atmosphere.',
  },
  {
    image: PORTRAIT_IMAGE,
    title: 'Earth blue',
    body: 'Third orbit — the habitable zone story.',
  },
]

export const orreryPlanetDeckVariants: PreviewVariant<OrreryPlanetDeckProps>[] = [
  { id: 1, label: 'Single card', props: { cards: [baseCards[0]] } },
  {
    id: 2,
    label: 'Three cards default',
    props: { eyebrow: 'Orrery', title: 'Planet deck', cards: baseCards },
  },
  {
    id: 3,
    label: 'Title only header',
    props: { title: 'Stories in orbit', cards: baseCards },
  },
  { id: 4, label: 'Eyebrow only', props: { eyebrow: 'Brass mechanism', cards: baseCards } },
  { id: 5, label: 'No header', props: { cards: baseCards } },
  {
    id: 6,
    label: 'Long card body',
    props: {
      cards: [
        {
          image: SAMPLE_IMAGE,
          title: 'Saturn rings',
          body: 'The orrery does not scroll horizontally — it spins. Each story sits on an elliptical brass ring and advances when you swipe or press the orbit buttons. The active card faces forward while background rings rotate to suggest planetary motion.',
        },
      ],
    },
  },
  {
    id: 7,
    label: 'Missing image',
    props: {
      cards: [{ title: 'Dark planet', body: 'No image — layout holds with placeholder.' }],
    },
  },
  {
    id: 8,
    label: 'Portrait image',
    props: {
      cards: [{ image: PORTRAIT_IMAGE, title: 'Nebula portrait', body: 'Tall crop on card.' }],
    },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: {
      cards: [{ image: LANDSCAPE_IMAGE, title: 'Galaxy wide', body: 'Wide banner crop.' }],
    },
  },
  {
    id: 10,
    label: 'Broken image URL',
    props: {
      cards: [
        {
          image: 'https://example.invalid/orrery.jpg',
          title: 'Broken feed',
          body: 'Broken URL — RatioImage fallback.',
        },
      ],
    },
  },
  { id: 11, label: 'Title only card', props: { cards: [{ title: 'Nameless world' }] } },
  {
    id: 12,
    label: 'Five cards',
    props: {
      eyebrow: 'Full deck',
      title: 'Solar tour',
      cards: [
        ...baseCards,
        { image: SAMPLE_IMAGE, title: 'Mars rust', body: 'Fourth orbit — red dust storms.' },
        { image: LANDSCAPE_IMAGE, title: 'Jupiter storm', body: 'Fifth ring — gas giant bands.' },
      ],
    },
  },
  {
    id: 13,
    label: 'Initial index 2',
    props: { cards: baseCards, initialIndex: 2 },
  },
  {
    id: 14,
    label: 'Short titles',
    props: {
      cards: [
        { image: SAMPLE_IMAGE, title: 'Io', body: 'Volcanic moon.' },
        { image: LANDSCAPE_IMAGE, title: 'Europa', body: 'Ice shell.' },
      ],
    },
  },
  {
    id: 15,
    label: 'Long titles',
    props: {
      cards: [
        {
          image: SAMPLE_IMAGE,
          title: 'The great red spot of Jupiter observed from orbit',
          body: 'Long title wraps inside card.',
        },
      ],
    },
  },
  { id: 16, label: 'Empty cards array', props: { title: 'Empty orrery', cards: [] } },
  {
    id: 17,
    label: 'Two cards',
    props: {
      eyebrow: 'Binary',
      cards: [
        { image: SAMPLE_IMAGE, title: 'Alpha', body: 'First of two.' },
        { image: PORTRAIT_IMAGE, title: 'Beta', body: 'Second of two.' },
      ],
    },
  },
  {
    id: 18,
    label: 'No body text',
    props: {
      cards: baseCards.map((c) => ({ image: c.image, title: c.title })),
    },
  },
  {
    id: 19,
    label: 'Science block',
    props: {
      eyebrow: 'Observatory',
      title: 'Night watch',
      cards: [
        {
          image: LANDSCAPE_IMAGE,
          title: 'Transit of Venus',
          body: 'Rare alignment captured from the brass dome — next transit in 105 years.',
        },
        {
          image: SAMPLE_IMAGE,
          title: 'Lunar eclipse',
          body: 'Earth shadow crosses the moon face on the third ring.',
        },
      ],
    },
  },
  {
    id: 20,
    label: 'Full deck review',
    props: {
      eyebrow: 'Planetarium',
      title: 'Orrery stories',
      cards: baseCards,
    },
  },
]
