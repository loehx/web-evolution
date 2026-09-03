import type { PreviewVariant } from '../../src/previews/types'
import type { ChiselStrikeFormProps } from './ChiselStrikeForm'

export const chiselStrikeFormVariants: PreviewVariant<ChiselStrikeFormProps>[] = [
  { id: 1, label: 'Title only', props: { title: 'Chisel' } },
  {
    id: 2,
    label: 'Title + body',
    props: {
      eyebrow: 'Quarry',
      title: 'Strike send',
      body: 'Full-viewport brutalist contact ritual with chisel marks behind each field.',
    },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'INSCRIBE YOUR MESSAGE IN THE LIMESTONE WALL',
      body: 'Long uppercase title wraps inside the quarry slab.',
    },
  },
  {
    id: 4,
    label: 'Missing body',
    props: { title: 'Carve', eyebrow: 'Contact' },
  },
  {
    id: 5,
    label: 'Short body',
    props: { title: 'Stone', body: 'Brief instructions.' },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Ritual',
      title: 'Quarry wall',
      body: 'The chisel strikes are not decoration — they track where your attention lands. Name, email, and message each sit inside a carved groove that glows on focus. Mobile stacks fields vertically; desktop centers the slab.',
    },
  },
  { id: 7, label: 'Empty body', props: { title: 'Fields only' } },
  {
    id: 8,
    label: 'Name field only',
    props: { title: 'Name', showEmail: false, showMessage: false },
  },
  {
    id: 9,
    label: 'Email field only',
    props: { title: 'Email', showName: false, showMessage: false },
  },
  {
    id: 10,
    label: 'Message field only',
    props: { title: 'Message', showName: false, showEmail: false },
  },
  {
    id: 11,
    label: 'Name + email only',
    props: { title: 'Brief', showMessage: false },
  },
  {
    id: 12,
    label: 'All fields',
    props: {
      title: 'Full quarry',
      body: 'Name, email, and message.',
      showName: true,
      showEmail: true,
      showMessage: true,
    },
  },
  {
    id: 13,
    label: 'Disabled submit',
    props: { title: 'Sealed', body: 'Form disabled.', disabled: true },
  },
  {
    id: 14,
    label: 'Custom labels',
    props: {
      title: 'Custom',
      nameLabel: 'Mason',
      emailLabel: 'Quarry address',
      messageLabel: 'Inscription',
      submitLabel: 'Strike stone',
    },
  },
  { id: 15, label: 'No eyebrow', props: { title: 'Plain slab', body: 'Eyebrow omitted.' } },
  {
    id: 16,
    label: 'Eyebrow only',
    props: { eyebrow: 'Chapter VII', title: 'The quarry' },
  },
  {
    id: 17,
    label: 'Stat in body',
    props: {
      title: '2,400',
      body: 'Years since limestone was first quarried at this site.',
    },
  },
  {
    id: 18,
    label: 'Quote in body',
    props: {
      title: 'Stone',
      body: '"Every message is carved in the patience of stone." — Mason proverb',
    },
  },
  {
    id: 19,
    label: 'Code in body',
    props: {
      title: 'POST /quarry',
      body: 'const response = await chisel.send({ name, email, message })',
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Chisel Strike',
      title: 'Contact us',
      body: 'Full brutalist contact ritual with all fields, custom labels, and submit.',
      submitLabel: 'Send inscription',
    },
  },
]
