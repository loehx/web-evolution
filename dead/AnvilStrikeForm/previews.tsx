import type { PreviewVariant } from '../../src/previews/types'
import type { AnvilStrikeFormProps } from './AnvilStrikeForm'

export const anvilStrikeFormVariants: PreviewVariant<AnvilStrikeFormProps>[] = [
  { id: 1, label: 'Title only', props: { title: 'Anvil' } },
  {
    id: 2,
    label: 'Title + body',
    props: {
      eyebrow: 'Forge',
      title: 'Strike send',
      body: 'Full-viewport brutalist contact ritual with forge-strike glow on each field.',
    },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'FORGE YOUR MESSAGE ON THE ANVIL OF CONTACT',
      body: 'Long uppercase title wraps inside the forge panel.',
    },
  },
  { id: 4, label: 'Missing body', props: { title: 'Strike', eyebrow: 'Contact' } },
  { id: 5, label: 'Short body', props: { title: 'Hammer', body: 'Brief instructions.' } },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Anvil',
      title: 'Forge form',
      body: 'The strike glow is not decoration — it flashes orange behind each field on focus and validates when complete. Name, email, and message each sit above a strike bar. Mobile stacks fields vertically; desktop centers the forge panel.',
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
    props: { title: 'Cold', body: 'Form disabled.', disabled: true },
  },
  {
    id: 14,
    label: 'Custom labels',
    props: {
      title: 'Custom',
      nameLabel: 'Smith',
      emailLabel: 'Furnace',
      messageLabel: 'Ingot',
      submitLabel: 'Quench',
    },
  },
  { id: 15, label: 'No eyebrow', props: { title: 'Plain forge', body: 'Eyebrow omitted.' } },
  {
    id: 16,
    label: 'Eyebrow only',
    props: { eyebrow: 'Forge VII', title: 'The anvil' },
  },
  {
    id: 17,
    label: 'Stat in body',
    props: {
      title: '1200°C',
      body: 'Typical forge temperature for iron work.',
    },
  },
  {
    id: 18,
    label: 'Quote in body',
    props: {
      title: 'Strike',
      body: '"Every message is forged on the anvil of intent." — Blacksmith proverb',
    },
  },
  {
    id: 19,
    label: 'Code in body',
    props: {
      title: 'POST /forge',
      body: 'const response = await anvil.strike({ name, email, message })',
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Anvil Strike',
      title: 'Contact us',
      body: 'Full brutalist contact ritual with all fields, custom labels, and submit.',
      submitLabel: 'Strike send',
    },
  },
]
