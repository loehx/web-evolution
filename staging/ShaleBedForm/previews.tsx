import type { PreviewVariant } from '../../src/previews/types'
import type { ShaleBedFormProps } from './ShaleBedForm'

export const shaleBedFormVariants: PreviewVariant<ShaleBedFormProps>[] = [
  { id: 1, label: 'Title only', props: { title: 'Shale' } },
  {
    id: 2,
    label: 'Title + body',
    props: {
      eyebrow: 'Bedrock',
      title: 'Bed send',
      body: 'Full-viewport brutalist contact ritual with stratum shift on each field.',
    },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'CARVE YOUR MESSAGE INTO THE SHALE BED LAYERS OF CONTACT',
      body: 'Long uppercase title wraps inside the stratum panel.',
    },
  },
  { id: 4, label: 'Missing body', props: { title: 'Bed', eyebrow: 'Contact' } },
  { id: 5, label: 'Short body', props: { title: 'Strata', body: 'Brief instructions.' } },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Shale',
      title: 'Bedrock form',
      body: 'The stratum shift is not decoration — each field sits on its own sedimentary layer that slides on focus. Mineral amber highlights validate when complete. Mobile stacks fields vertically; desktop centers the quarry panel.',
    },
  },
  { id: 7, label: 'Empty body', props: { title: 'Fields only' } },
  { id: 8, label: 'Name field only', props: { title: 'Name', showEmail: false, showMessage: false } },
  { id: 9, label: 'Email field only', props: { title: 'Email', showName: false, showMessage: false } },
  { id: 10, label: 'Message field only', props: { title: 'Message', showName: false, showEmail: false } },
  { id: 11, label: 'Name + email only', props: { title: 'Brief', showMessage: false } },
  {
    id: 12,
    label: 'All fields',
    props: {
      title: 'Full bed',
      body: 'Name, email, and message.',
      showName: true,
      showEmail: true,
      showMessage: true,
    },
  },
  { id: 13, label: 'Disabled submit', props: { title: 'Frozen', body: 'Form disabled.', disabled: true } },
  {
    id: 14,
    label: 'Custom labels',
    props: {
      title: 'Custom',
      nameLabel: 'Geologist',
      emailLabel: 'Survey',
      messageLabel: 'Stratum',
      submitLabel: 'Deposit layer',
    },
  },
  { id: 15, label: 'No eyebrow', props: { title: 'Plain bed', body: 'Eyebrow omitted.' } },
  { id: 16, label: 'Eyebrow only', props: { eyebrow: 'Layer VII', title: 'The shale' } },
  {
    id: 17,
    label: 'Stat in body',
    props: {
      title: '400 Ma',
      body: 'Age of the shale bedrock formation referenced in the form metaphor.',
    },
  },
  {
    id: 18,
    label: 'Quote in body',
    props: {
      title: 'Bed',
      body: '"Every layer tells a story older than the surface above it." — Geological proverb',
    },
  },
  {
    id: 19,
    label: 'Code in body',
    props: {
      title: 'shale',
      body: 'const layer = shale.shift({ field: focused, depth: index })',
    },
  },
  {
    id: 20,
    label: 'Full form',
    props: {
      eyebrow: 'Geological contact',
      title: 'Shale bed form',
      body: 'Complete form with all fields populated for review.',
      submitLabel: 'Send inquiry',
    },
  },
]
