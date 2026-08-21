import type { PreviewVariant } from '../../src/previews/types'
import type { VortexCardSpiralProps } from './VortexCardSpiral'

const IMG_LAND =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
const IMG_PORT =
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'
const IMG_SQ =
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe89?w=800&q=80'

const threeCards = [
  { image: IMG_PORT, title: 'Inner ring', body: 'Active at the vortex eye.' },
  { image: IMG_LAND, title: 'Mid spiral', body: 'Swipe to pull the next story in.' },
  { image: IMG_SQ, title: 'Outer orbit', body: 'Cards descend on concentric paths.' },
]

export const vortexCardSpiralVariants: PreviewVariant<VortexCardSpiralProps>[] = [
  { id: 1, label: 'Three cards', props: { cards: threeCards } },
  {
    id: 2,
    label: 'Eyebrow + title + cards',
    props: { eyebrow: 'Vortex', title: 'Stories spiral inward', cards: threeCards },
  },
  {
    id: 3,
    label: 'One card only',
    props: {
      cards: [{ image: IMG_PORT, title: 'Solo vortex', body: 'Still a full stage.' }],
    },
  },
  { id: 4, label: 'Empty deck', props: { eyebrow: 'Empty', title: 'No cards', cards: [] } },
  {
    id: 5,
    label: 'Cards without images',
    props: {
      cards: [
        { title: 'Text slab', body: 'No photo on this card.' },
        { title: 'Another', body: 'Placeholder panel.' },
        { title: 'Third', body: 'Still spirals.' },
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
          title: 'A headline that wraps inside the spiral card panel',
          body: 'Vortex keeps typography readable.',
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
            'Each card can carry a full paragraph. The vortex does not shrink to a carousel strip — the spiral owns the viewport and pulls the active card to center.',
        },
      ],
    },
  },
  {
    id: 8,
    label: 'Five cards',
    props: {
      cards: [
        { image: IMG_PORT, title: 'One', body: 'Ring 1' },
        { image: IMG_LAND, title: 'Two', body: 'Ring 2' },
        { image: IMG_SQ, title: 'Three', body: 'Ring 3' },
        { image: IMG_PORT, title: 'Four', body: 'Ring 4' },
        { image: IMG_LAND, title: 'Five', body: 'Ring 5' },
      ],
    },
  },
  {
    id: 9,
    label: 'Portrait images',
    props: {
      cards: [
        { image: IMG_PORT, title: 'Tall crop', body: '4/5 ratio.' },
        { image: IMG_PORT, title: 'Another portrait', body: 'Consistent crop.' },
      ],
    },
  },
  {
    id: 10,
    label: 'Landscape images',
    props: {
      cards: [
        { image: IMG_LAND, title: 'Wide photo', body: 'Center-cropped to 4/5.' },
        { image: IMG_LAND, title: 'Second wide', body: 'Still portrait slot.' },
      ],
    },
  },
  {
    id: 11,
    label: 'Broken image URL',
    props: {
      cards: [
        { image: 'https://example.invalid/photo.jpg', title: 'Broken', body: 'Shows placeholder.' },
        { image: IMG_SQ, title: 'Valid', body: 'Next card works.' },
      ],
    },
  },
  {
    id: 12,
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
    id: 13,
    label: 'Initial index 1',
    props: { cards: threeCards, initialIndex: 1 },
  },
  {
    id: 14,
    label: 'Eight cards max',
    props: {
      cards: Array.from({ length: 8 }, (_, i) => ({
        image: i % 2 === 0 ? IMG_PORT : IMG_LAND,
        title: `Card ${i + 1}`,
        body: `Spiral position ${i + 1}.`,
      })),
    },
  },
  {
    id: 15,
    label: 'Nine cards (truncated to 8)',
    props: {
      cards: Array.from({ length: 9 }, (_, i) => ({
        title: `Story ${i + 1}`,
        body: 'Ninth is dropped.',
      })),
    },
  },
  {
    id: 16,
    label: 'Case study teaser',
    props: {
      eyebrow: 'Work',
      title: 'Selected projects',
      cards: [
        { image: IMG_SQ, title: 'Harbor rebuild', body: 'Coastal infrastructure refresh.' },
        { image: IMG_PORT, title: 'Atlas app', body: 'Navigation for field teams.' },
        { image: IMG_LAND, title: 'Studio site', body: 'Brand and web system.' },
      ],
    },
  },
  {
    id: 17,
    label: 'Speaker lineup',
    props: {
      eyebrow: 'Summit',
      title: 'On stage',
      cards: [
        { image: IMG_PORT, title: 'Mira Chen', body: 'Opening keynote.' },
        { image: IMG_LAND, title: 'Jon Hale', body: 'Systems design.' },
        { image: IMG_SQ, title: 'Rosa Vega', body: 'Closing fireside.' },
      ],
    },
  },
  {
    id: 18,
    label: 'Product features',
    props: {
      title: 'Capabilities',
      cards: [
        { title: 'Sync', body: 'Real-time collaboration.' },
        { title: 'Vault', body: 'Encrypted storage.' },
        { title: 'Relay', body: 'Edge delivery.' },
      ],
    },
  },
  {
    id: 19,
    label: 'No section title',
    props: { cards: threeCards },
  },
  {
    id: 20,
    label: 'Quote cards',
    props: {
      eyebrow: 'Voices',
      title: 'What they said',
      cards: [
        { image: IMG_PORT, title: '"Transformed our launch."', body: '— North Studio' },
        { image: IMG_LAND, title: '"Bold and fast."', body: '— Field Co.' },
      ],
    },
  },
]
