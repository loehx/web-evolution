import type { PreviewVariant } from '../../src/previews/types'
import type { RelicOrbitHeroProps } from './RelicOrbitHero'

export const relicOrbitHeroVariants: PreviewVariant<RelicOrbitHeroProps>[] = [
  { id: 1, label: 'Headline only', props: { title: 'Hold the relic' } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      title: 'Hold the relic',
      subtitle: 'A bronze cube you can orbit. Drag to see every face.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      title: 'Artifacts that refuse to sit still in a centered marketing column',
      subtitle: 'Stress-tests wrapping against the 3D stage.',
    },
  },
  { id: 4, label: 'Missing headline fallback', props: { title: '', eyebrow: 'Chamber 04' } },
  {
    id: 5,
    label: 'Short body',
    props: { title: 'Zenith', subtitle: 'Look up.' },
  },
  {
    id: 6,
    label: 'Long body',
    props: {
      title: 'Nadir',
      subtitle:
        'This chamber stores a single object. Click or tap, keep holding, and move to rotate pitch and yaw. The labels on each face should remain readable as you turn the mass.',
    },
  },
  { id: 7, label: 'Empty body', props: { title: 'Silent mass', subtitle: undefined } },
  {
    id: 8,
    label: 'Eyebrow + title',
    props: { eyebrow: 'Object 12', title: 'Cube', subtitle: 'Six faces. Full orbit.' },
  },
  {
    id: 9,
    label: 'No CTA',
    props: { title: 'No doorway', subtitle: 'Explore with your hands.' },
  },
  {
    id: 10,
    label: 'Single CTA',
    props: { title: 'Enter the hall', subtitle: 'The cube is the map.', ctaLabel: 'Step inside' },
  },
  {
    id: 11,
    label: 'Custom CTA',
    props: { title: 'Provenance', ctaLabel: 'Read the ledger' },
  },
  {
    id: 12,
    label: 'Numeric title',
    props: { title: '0001', subtitle: 'First object in the hall.' },
  },
  {
    id: 13,
    label: 'All caps',
    props: { title: 'DO NOT TOUCH', subtitle: 'Please touch.' },
  },
  {
    id: 14,
    label: 'Question',
    props: { title: 'Which face is north?', subtitle: 'Rotate until you know.' },
  },
  {
    id: 15,
    label: 'German copy',
    props: { title: 'Greif das Relikt', subtitle: 'Ziehen, um jede Seite zu sehen.' },
  },
  {
    id: 16,
    label: 'Japanese copy',
    props: { title: '遺物を回せ', subtitle: '押したまま動かして回転。' },
  },
  {
    id: 17,
    label: 'Long eyebrow',
    props: {
      eyebrow: 'Collection · Hall B · Night hours',
      title: 'After hours',
      subtitle: 'The cube still turns.',
    },
  },
  {
    id: 18,
    label: 'Two-word punch',
    props: { title: 'Grab it', ctaLabel: 'Begin' },
  },
  {
    id: 19,
    label: 'Dense hero',
    props: {
      eyebrow: 'Studio object',
      title: 'A mass you can learn by turning',
      subtitle: 'Not a render. An instrument. Hold, drag, inspect zenith and nadir.',
      ctaLabel: 'Book a viewing',
    },
  },
  {
    id: 20,
    label: 'Minimal one glyph',
    props: { title: '■' },
  },
]
