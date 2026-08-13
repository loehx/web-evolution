import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
  type PreviewVariant,
} from '../../src/previews/types'
import type { ShearSplitProps } from './ShearSplit'

const landscape = PLACEHOLDER_LANDSCAPE
const portrait = PLACEHOLDER_PORTRAIT

export const shearSplitVariants: PreviewVariant<ShearSplitProps>[] = [
  { id: 1, label: 'Headline only', props: { title: 'Cut through', image: landscape } },
  {
    id: 2,
    label: 'Headline + body',
    props: {
      title: 'Cut through',
      body: 'Image and type share a diagonal, never a polite column.',
      image: landscape,
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      title: 'A shear so long it has to wrap against the remaining wedge of the stage',
      image: landscape,
    },
  },
  { id: 4, label: 'Empty title', props: { title: '', body: 'Title missing.', image: landscape } },
  {
    id: 5,
    label: 'Short body',
    props: { title: 'Edge', body: 'Thin copy.', image: landscape },
  },
  {
    id: 6,
    label: 'Long body',
    props: {
      title: 'Measure',
      body: 'Luxury is not more gold. It is a cut you can feel. This paragraph checks whether the wedge still holds a long measure without colliding with the photograph.',
      image: landscape,
    },
  },
  { id: 7, label: 'Empty body', props: { title: 'No copy', image: landscape } },
  {
    id: 8,
    label: 'Portrait image',
    props: { title: 'Tall plate', body: 'Cover crop on a portrait.', image: portrait },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: { title: 'Wide plate', body: 'Cover crop on a landscape.', image: landscape },
  },
  { id: 10, label: 'Missing image', props: { title: 'No plate', body: 'Fallback field.' } },
  {
    id: 11,
    label: 'Broken image URL',
    props: { title: 'Broken plate', body: 'Error state in the shear.', image: PLACEHOLDER_BROKEN },
  },
  {
    id: 12,
    label: 'Image on the left',
    props: {
      title: 'Other wedge',
      body: 'Shear reversed.',
      image: landscape,
      imageSide: 'left',
    },
  },
  {
    id: 13,
    label: 'No CTA',
    props: { title: 'Look only', body: 'No button.', image: landscape },
  },
  {
    id: 14,
    label: 'Single CTA',
    props: { title: 'Continue', body: 'One action.', image: landscape, ctaLabel: 'Read the cut' },
  },
  {
    id: 15,
    label: 'Eyebrow + CTA',
    props: {
      eyebrow: 'Atelier',
      title: 'Evening steel',
      body: 'Champagne on charcoal.',
      image: landscape,
      ctaLabel: 'See the edition',
    },
  },
  {
    id: 16,
    label: 'German copy',
    props: {
      title: 'Schrägschnitt',
      body: 'Bild und Text teilen sich keine Box.',
      image: landscape,
    },
  },
  {
    id: 17,
    label: 'Alt text present',
    props: {
      title: 'Named plate',
      image: portrait,
      imageAlt: 'Portrait photograph used as the shear media',
      body: 'Accessible image.',
    },
  },
  {
    id: 18,
    label: 'Eyebrow only extra',
    props: { eyebrow: 'Chapter II', title: 'After the cut', image: landscape },
  },
  {
    id: 19,
    label: 'Left + missing image',
    props: { title: 'Hollow left', imageSide: 'left', body: 'Fallback on the left shear.' },
  },
  {
    id: 20,
    label: 'Dense luxury',
    props: {
      eyebrow: 'Lookbook 08',
      title: 'The room is the garment',
      body: 'A single photograph, a single sentence, a single cut.',
      image: portrait,
      ctaLabel: 'Enter the room',
    },
  },
]
