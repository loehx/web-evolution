import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
  type PreviewVariant,
} from '../../src/previews/types'
import type { NexusCardHelixProps } from './NexusCardHelix'

const sampleCards = [
  {
    image: PLACEHOLDER_LANDSCAPE,
    title: 'Orbital sync',
    body: 'Stories converge at the nexus — each card rides a helix path around the core.',
  },
  {
    image: PLACEHOLDER_PORTRAIT,
    title: 'Signal weave',
    body: 'Swipe or use arrows to spin the helix and bring the next story to center.',
  },
  {
    image: PLACEHOLDER_LANDSCAPE,
    title: 'Data helix',
    body: 'Portrait and landscape images crop cleanly inside the 4:3 card frame.',
  },
  {
    image: PLACEHOLDER_LANDSCAPE,
    title: 'Nexus point',
    body: 'The glowing core pulses while cards orbit on intertwined paths.',
  },
]

export const nexusCardHelixVariants: PreviewVariant<NexusCardHelixProps>[] = [
  { id: 1, label: 'Headline only', props: { title: 'Helix', cards: sampleCards } },
  {
    id: 2,
    label: 'Headline + subtext header',
    props: { eyebrow: 'Nexus', title: 'Card helix', cards: sampleCards },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'Stories that spiral around a single point of convergence',
      cards: sampleCards,
    },
  },
  { id: 4, label: 'No section title', props: { eyebrow: 'Carousel', cards: sampleCards } },
  {
    id: 5,
    label: 'Short card body',
    props: {
      title: 'Helix',
      cards: [{ image: PLACEHOLDER_LANDSCAPE, title: 'Brief', body: 'Short.' }, ...sampleCards.slice(1)],
    },
  },
  {
    id: 6,
    label: 'Long card body',
    props: {
      title: 'Deep helix',
      cards: [
        {
          image: PLACEHOLDER_LANDSCAPE,
          title: 'Extended narrative',
          body: 'This card carries a longer body paragraph to test line clamping inside the helix frame. The helix path should not break when copy runs long — only three lines show before truncation.',
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
      title: 'Full helix',
      cards: [
        ...sampleCards,
        { image: PLACEHOLDER_LANDSCAPE, title: 'Fifth', body: 'Extra card.' },
        { image: PLACEHOLDER_PORTRAIT, title: 'Sixth', body: 'More stories.' },
        { image: PLACEHOLDER_LANDSCAPE, title: 'Seventh', body: 'Helix grows.' },
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
        title: 'An extraordinarily long card title that must wrap inside the helix frame',
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
        { title: 'Alpha', body: 'First orbit.' },
        { title: 'Beta', body: 'Second orbit.' },
      ],
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Nexus Helix',
      title: 'Spin the story',
      cards: sampleCards,
    },
  },
]
