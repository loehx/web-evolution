import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
  type PreviewVariant,
} from '../../src/previews/types'
import type { FerrisCardRingProps } from './FerrisCardRing'

const sampleCards = [
  {
    image: PLACEHOLDER_LANDSCAPE,
    title: 'Cotton candy views',
    body: 'Stories ride the ferris wheel — each gondola carries image and copy to the top.',
  },
  {
    image: PLACEHOLDER_PORTRAIT,
    title: 'Midway lights',
    body: 'Swipe or spin the wheel to bring the next story to the top gondola.',
  },
  {
    image: PLACEHOLDER_LANDSCAPE,
    title: 'Golden hour',
    body: 'Portrait and landscape images crop cleanly inside the 4:3 gondola frame.',
  },
  {
    image: PLACEHOLDER_LANDSCAPE,
    title: 'Carnival peak',
    body: 'The wheel hub glows while gondolas orbit the midnight sky.',
  },
]

export const ferrisCardRingVariants: PreviewVariant<FerrisCardRingProps>[] = [
  { id: 1, label: 'Headline only', props: { title: 'Ferris', cards: sampleCards } },
  {
    id: 2,
    label: 'Headline + subtext header',
    props: { eyebrow: 'Carnival', title: 'Card ring', cards: sampleCards },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'Stories that ride a giant ferris wheel to the top of the page',
      cards: sampleCards,
    },
  },
  { id: 4, label: 'No section title', props: { eyebrow: 'Midway', cards: sampleCards } },
  {
    id: 5,
    label: 'Short card body',
    props: {
      title: 'Wheel',
      cards: [{ image: PLACEHOLDER_LANDSCAPE, title: 'Brief', body: 'Short.' }, ...sampleCards.slice(1)],
    },
  },
  {
    id: 6,
    label: 'Long card body',
    props: {
      title: 'Full ride',
      cards: [
        {
          image: PLACEHOLDER_LANDSCAPE,
          title: 'Extended narrative',
          body: 'This gondola carries a longer body paragraph to test line clamping inside the ferris frame. The wheel should not break when copy runs long — only two lines show before truncation.',
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
      title: 'Full wheel',
      cards: [
        ...sampleCards,
        { image: PLACEHOLDER_LANDSCAPE, title: 'Fifth', body: 'Extra gondola.' },
        { image: PLACEHOLDER_PORTRAIT, title: 'Sixth', body: 'More stories.' },
        { image: PLACEHOLDER_LANDSCAPE, title: 'Seventh', body: 'Wheel grows.' },
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
        title: 'An extraordinarily long gondola title that must wrap inside the ferris frame',
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
        { title: 'Alpha', body: 'First gondola.' },
        { title: 'Beta', body: 'Second gondola.' },
      ],
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Ferris Ring',
      title: 'Spin the wheel',
      cards: sampleCards,
    },
  },
]
