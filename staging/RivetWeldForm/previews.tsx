import type { PreviewVariant } from '../../src/previews/types'
import type { RivetWeldFormProps } from './RivetWeldForm'

export const rivetWeldFormVariants: PreviewVariant<RivetWeldFormProps>[] = [
  { id: 1, label: 'Title only', props: { title: 'Rivet' } },
  {
    id: 2,
    label: 'Title + body',
    props: {
      eyebrow: 'Steel',
      title: 'Weld send',
      body: 'Full-viewport brutalist contact ritual with weld glow on each rivet field.',
    },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'WELD YOUR MESSAGE ON THE STEEL PLATE OF CONTACT',
      body: 'Long uppercase title wraps inside the rivet panel.',
    },
  },
  { id: 4, label: 'Missing body', props: { title: 'Weld', eyebrow: 'Contact' } },
  { id: 5, label: 'Short body', props: { title: 'Plate', body: 'Brief instructions.' } },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Rivet',
      title: 'Steel form',
      body: 'The weld glow is not decoration — it flashes orange behind each field on focus and validates when complete. Rivet markers heat beside name, email, and message. Mobile stacks fields vertically; desktop centers the steel panel.',
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
      title: 'Full plate',
      body: 'Name, email, and message.',
      showName: true,
      showEmail: true,
      showMessage: true,
    },
  },
  { id: 13, label: 'Disabled submit', props: { title: 'Cold', body: 'Form disabled.', disabled: true } },
  {
    id: 14,
    label: 'Custom labels',
    props: {
      title: 'Custom',
      nameLabel: 'Fabricator',
      emailLabel: 'Torch',
      messageLabel: 'Seam',
      submitLabel: 'Seal weld',
    },
  },
  { id: 15, label: 'No eyebrow', props: { title: 'Plain plate', body: 'Eyebrow omitted.' } },
  { id: 16, label: 'Eyebrow only', props: { eyebrow: 'Plate VII', title: 'The rivet' } },
  {
    id: 17,
    label: 'Stat in body',
    props: {
      title: '1800°C',
      body: 'Typical arc-weld temperature for structural steel.',
    },
  },
  {
    id: 18,
    label: 'Quote in body',
    props: {
      title: 'Weld',
      body: '"A good weld holds longer than the steel around it." — Shipyard proverb',
    },
  },
  {
    id: 19,
    label: 'Code in body',
    props: {
      title: 'rivet',
      body: 'const weld = rivet.heat({ field: focused, temp: 1800 })',
    },
  },
  {
    id: 20,
    label: 'Full form',
    props: {
      eyebrow: 'Industrial contact',
      title: 'Rivet weld form',
      body: 'Complete form with all fields populated for review.',
      submitLabel: 'Send weld',
    },
  },
]
