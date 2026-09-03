import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
  type PreviewVariant,
} from '../../src/previews/types'
import type { SpoolReelCarouselProps } from './SpoolReelCarousel'

const sampleCards = [
  {
    image: PLACEHOLDER_LANDSCAPE,
    title: 'First exposure',
    body: 'Stories unwind from the film reel — each frame carries image and copy off the spool.',
  },
  {
    image: PLACEHOLDER_PORTRAIT,
    title: 'Darkroom glow',
    body: 'Swipe or unwind the reel to bring the next story to the developing tray.',
  },
  {
    image: PLACEHOLDER_LANDSCAPE,
    title: 'Silver halide',
    body: 'Portrait and landscape images crop cleanly inside the 16:10 frame.',
  },
  {
    image: PLACEHOLDER_LANDSCAPE,
    title: 'Final print',
    body: 'The reel hub glows amber while frames stack above the spool.',
  },
]

export const spoolReelCarouselVariants: PreviewVariant<SpoolReelCarouselProps>[] = [
  { id: 1, label: 'Headline only', props: { title: 'Spool', cards: sampleCards } },
  {
    id: 2,
    label: 'Headline + subtext header',
    props: { eyebrow: 'Darkroom', title: 'Reel carousel', cards: sampleCards },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'Stories that unwind from a giant film reel at the top of the page',
      cards: sampleCards,
    },
  },
  { id: 4, label: 'No section title', props: { eyebrow: 'Film', cards: sampleCards } },
  {
    id: 5,
    label: 'Short card body',
    props: {
      title: 'Reel',
      cards: [{ image: PLACEHOLDER_LANDSCAPE, title: 'Brief', body: 'Short.' }, ...sampleCards.slice(1)],
    },
  },
  {
    id: 6,
    label: 'Long card body',
    props: {
      title: 'Full roll',
      cards: [
        {
          image: PLACEHOLDER_LANDSCAPE,
          title: 'Extended narrative',
          body: 'This frame carries a longer body paragraph to test wrapping inside the developing tray. The reel should not break when copy runs long — the active frame shows the full text on desktop.',
        },
        ...sampleCards.slice(1),
      ],
    },
  },
  {
    id: 7,
    label: 'Empty card body',
    props: {
      title: 'No body',
      cards: sampleCards.map((c) => ({ ...c, body: undefined })),
    },
  },
  {
    id: 8,
    label: 'Portrait images',
    props: {
      title: 'Portrait crop',
      cards: sampleCards.map((c) => ({ ...c, image: PLACEHOLDER_PORTRAIT })),
    },
  },
  {
    id: 9,
    label: 'Landscape images',
    props: {
      title: 'Landscape crop',
      cards: sampleCards.map((c) => ({ ...c, image: PLACEHOLDER_LANDSCAPE })),
    },
  },
  {
    id: 10,
    label: 'Missing images',
    props: {
      title: 'No images',
      cards: sampleCards.map((c) => ({ ...c, image: undefined })),
    },
  },
  {
    id: 11,
    label: 'Broken image URL',
    props: {
      title: 'Broken',
      cards: [{ ...sampleCards[0], image: PLACEHOLDER_BROKEN }, ...sampleCards.slice(1)],
    },
  },
  { id: 12, label: 'Single card', props: { title: 'Solo', cards: [sampleCards[0]] } },
  { id: 13, label: 'Two cards', props: { title: 'Pair', cards: sampleCards.slice(0, 2) } },
  {
    id: 14,
    label: 'Eight cards max',
    props: {
      title: 'Full reel',
      cards: [
        ...sampleCards,
        { image: PLACEHOLDER_LANDSCAPE, title: 'Fifth', body: 'Extra frame.' },
        { image: PLACEHOLDER_PORTRAIT, title: 'Sixth', body: 'More stories.' },
        { image: PLACEHOLDER_LANDSCAPE, title: 'Seventh', body: 'Reel grows.' },
        { image: PLACEHOLDER_PORTRAIT, title: 'Eighth', body: 'Max capacity.' },
        { image: PLACEHOLDER_LANDSCAPE, title: 'Ninth trimmed', body: 'Should not appear.' },
      ],
    },
  },
  { id: 15, label: 'No cards', props: { title: 'Empty', cards: [] } },
  {
    id: 16,
    label: 'Initial index 2',
    props: { title: 'Start at 3', cards: sampleCards, initialIndex: 2 },
  },
  {
    id: 17,
    label: 'Long card titles',
    props: {
      title: 'Long titles',
      cards: sampleCards.map((c) => ({
        ...c,
        title: 'An extraordinarily long frame title that must wrap inside the developing tray',
      })),
    },
  },
  {
    id: 18,
    label: 'Mixed image states',
    props: {
      title: 'Mixed media',
      cards: [
        { image: PLACEHOLDER_PORTRAIT, title: 'Portrait', body: 'Tall crop.' },
        { image: undefined, title: 'Missing', body: 'No image slot.' },
        { image: PLACEHOLDER_BROKEN, title: 'Broken', body: 'Failed load.' },
        { image: PLACEHOLDER_LANDSCAPE, title: 'Landscape', body: 'Wide crop.' },
      ],
    },
  },
  {
    id: 19,
    label: 'Eyebrow + minimal cards',
    props: {
      eyebrow: 'Stories',
      cards: [
        { title: 'Alpha', body: 'First frame.' },
        { title: 'Beta', body: 'Second frame.' },
      ],
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Spool Reel',
      title: 'Unwind the reel',
      cards: sampleCards,
    },
  },
]
