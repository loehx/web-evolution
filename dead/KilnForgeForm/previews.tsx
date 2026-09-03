import type { PreviewVariant } from '../../src/previews/types'
import type { KilnForgeFormProps } from './KilnForgeForm'

export const kilnForgeFormVariants: PreviewVariant<KilnForgeFormProps>[] = [
  { id: 1, label: 'Title only', props: { title: 'Forge' } },
  {
    id: 2,
    label: 'Title + body',
    props: {
      eyebrow: 'Kiln',
      title: 'Send heat',
      body: 'Full-viewport brutalist contact ritual with heat bands behind each field.',
    },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'CONTACT THE FORGE AT THE END OF THE VALLEY',
      body: 'Long uppercase title wraps inside the kiln chamber.',
    },
  },
  {
    id: 4,
    label: 'Missing body',
    props: { title: 'Fire', eyebrow: 'Contact' },
  },
  {
    id: 5,
    label: 'Short body',
    props: { title: 'Heat', body: 'Brief instructions.' },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Ritual',
      title: 'Kiln door',
      body: 'The heat bands are not decoration — they track where your attention lands. Name, email, and message each sit inside a forge band that intensifies on focus. Mobile stacks fields vertically; desktop centers the chamber.',
    },
  },
  {
    id: 7,
    label: 'Empty body',
    props: { title: 'Fields only' },
  },
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
      title: 'Full forge',
      body: 'Name, email, and message.',
      showName: true,
      showEmail: true,
      showMessage: true,
    },
  },
  {
    id: 13,
    label: 'Disabled submit',
    props: { title: 'Cooling', body: 'Form disabled.', disabled: true },
  },
  {
    id: 14,
    label: 'Custom labels',
    props: {
      title: 'Custom',
      nameLabel: 'Smith',
      emailLabel: 'Anvil address',
      messageLabel: 'Ore request',
      submitLabel: 'Strike anvil',
    },
  },
  {
    id: 15,
    label: 'No eyebrow',
    props: { title: 'Plain kiln', body: 'Eyebrow omitted.' },
  },
  {
    id: 16,
    label: 'Eyebrow only',
    props: { eyebrow: 'Chapter VII', title: 'The forge' },
  },
  {
    id: 17,
    label: 'Stat in body',
    props: {
      title: '1,200°C',
      body: 'Operating temperature of the main kiln chamber.',
    },
  },
  {
    id: 18,
    label: 'Quote in body',
    props: {
      title: 'Fire',
      body: '"Every message is tempered in the heat of attention." — Forge proverb',
    },
  },
  {
    id: 19,
    label: 'Code in body',
    props: {
      title: 'POST /forge',
      body: 'const response = await kiln.send({ name, email, message })',
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Kiln Forge',
      title: 'Contact us',
      body: 'Full brutalist contact ritual with all fields, custom labels, and submit.',
      submitLabel: 'Send to forge',
    },
  },
]
