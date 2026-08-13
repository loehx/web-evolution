import type { PreviewVariant } from '../../src/previews/types'
import type { PlantOrbitHeroProps } from './PlantOrbitHero'

export const plantOrbitHeroVariants: PreviewVariant<PlantOrbitHeroProps>[] = [
  { id: 1, label: 'Headline only', props: { title: 'Turn the specimen' } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      title: 'Turn the specimen',
      subtitle: 'A living model you can orbit. Drag to see every leaf and stem.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      title: 'Botanical monuments that refuse to sit still in a centered marketing column',
      subtitle: 'Stress-tests wrapping against the 3D vitrine stage.',
    },
  },
  { id: 4, label: 'Missing headline fallback', props: { title: '', eyebrow: 'Wing C · Case 12' } },
  {
    id: 5,
    label: 'Anthurium',
    props: {
      plant: 'anthurium_botany_01',
      title: 'Tropical crown',
      subtitle: 'Lush anthurium under glass.',
    },
  },
  {
    id: 6,
    label: 'Fern',
    props: {
      plant: 'fern_02',
      title: 'Frond study',
      subtitle: 'Delicate arching leaves.',
    },
  },
  {
    id: 7,
    label: 'Shrub sorrel',
    props: {
      plant: 'shrub_sorrel_01',
      title: 'Ground cover',
      subtitle: 'Low, dense, tactile.',
    },
  },
  {
    id: 8,
    label: 'Succulent',
    props: {
      plant: 'cheiridopsis_succulent',
      title: 'Desert bloom',
      subtitle: 'Compact geometry in warm light.',
    },
  },
  { id: 9, label: 'Empty body', props: { title: 'Silent growth', subtitle: undefined } },
  {
    id: 10,
    label: 'Eyebrow + title',
    props: {
      eyebrow: 'Specimen 07',
      title: 'Pachira',
      subtitle: 'Full orbit. Every angle.',
      plant: 'pachira_aquatica_01',
    },
  },
  {
    id: 11,
    label: 'No CTA',
    props: { title: 'No label', subtitle: 'Explore with your hands.' },
  },
  {
    id: 12,
    label: 'Single CTA',
    props: {
      title: 'Enter the atrium',
      subtitle: 'The plant is the map.',
      ctaLabel: 'Step inside',
    },
  },
  {
    id: 13,
    label: 'Custom CTA',
    props: { title: 'Provenance', ctaLabel: 'Read the ledger' },
  },
  {
    id: 14,
    label: 'Numeric title',
    props: { title: '0007', subtitle: 'Seventh specimen in the hall.' },
  },
  {
    id: 15,
    label: 'All caps',
    props: { title: 'DO NOT WATER', subtitle: 'Please orbit.' },
  },
  {
    id: 16,
    label: 'Question',
    props: { title: 'Which side faces the sun?', subtitle: 'Rotate until you know.' },
  },
  {
    id: 17,
    label: 'German copy',
    props: {
      title: 'Dreh die Pflanze',
      subtitle: 'Ziehen, um jede Seite zu sehen.',
      plant: 'fern_02',
    },
  },
  {
    id: 18,
    label: 'Japanese copy',
    props: {
      title: '標本を回せ',
      subtitle: '押したまま動かして回転。',
      plant: 'anthurium_botany_01',
    },
  },
  {
    id: 19,
    label: 'Dense hero',
    props: {
      eyebrow: 'Greenhouse collection',
      title: 'A living mass you can learn by turning',
      subtitle:
        'Not a render. A specimen. Hold, drag, inspect crown and roots. The vitrine stays still; the plant obeys your hand.',
      ctaLabel: 'Book a viewing',
      plant: 'pachira_aquatica_01',
    },
  },
  {
    id: 20,
    label: 'Minimal one glyph',
    props: { title: '❧', plant: 'cheiridopsis_succulent' },
  },
]
