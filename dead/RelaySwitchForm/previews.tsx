import type { PreviewVariant } from '../../src/previews/types'
import type { RelaySwitchFormProps } from './RelaySwitchForm'

export const relaySwitchFormVariants: PreviewVariant<RelaySwitchFormProps>[] = [
  { id: 1, label: 'Title only', props: { title: 'Relay' } },
  {
    id: 2,
    label: 'Title + body',
    props: {
      eyebrow: 'Rack',
      title: 'Flip switch',
      body: 'Full-viewport futuristic contact ritual with toggle relay switches for each field.',
    },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'CLOSE THE RELAY CIRCUIT FOR YOUR MESSAGE',
      body: 'Long uppercase title wraps inside the rack panel.',
    },
  },
  { id: 4, label: 'Missing body', props: { title: 'Switch', eyebrow: 'Contact' } },
  { id: 5, label: 'Short body', props: { title: 'Flip', body: 'Brief instructions.' } },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Relay',
      title: 'Switch rack',
      body: 'The switches are not decoration — they flip on focus and glow amber when the field validates. Name, email, and message each sit behind a toggle. Mobile stacks fields vertically; desktop centers the rack panel.',
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
      title: 'Full rack',
      body: 'Name, email, and message.',
      showName: true,
      showEmail: true,
      showMessage: true,
    },
  },
  {
    id: 13,
    label: 'Disabled submit',
    props: { title: 'Tripped', body: 'Form disabled.', disabled: true },
  },
  {
    id: 14,
    label: 'Custom labels',
    props: {
      title: 'Custom',
      nameLabel: 'Relay A',
      emailLabel: 'Relay B',
      messageLabel: 'Signal',
      submitLabel: 'Transmit',
    },
  },
  { id: 15, label: 'No eyebrow', props: { title: 'Plain rack', body: 'Eyebrow omitted.' } },
  {
    id: 16,
    label: 'Eyebrow only',
    props: { eyebrow: 'Relay VII', title: 'The switch' },
  },
  {
    id: 17,
    label: 'Stat in body',
    props: {
      title: '24V',
      body: 'Standard relay coil voltage for industrial contact terminals.',
    },
  },
  {
    id: 18,
    label: 'Quote in body',
    props: {
      title: 'Closed',
      body: '"Every relay waits for the moment to close." — Electrician proverb',
    },
  },
  {
    id: 19,
    label: 'Code in body',
    props: {
      title: 'POST /relay',
      body: 'const response = await relay.close({ name, email, message })',
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Relay Switch',
      title: 'Contact us',
      body: 'Full futuristic contact ritual with all fields, custom labels, and submit.',
      submitLabel: 'Close relay',
    },
  },
]
