import type { PreviewVariant } from '../../src/previews/types'
import type { MonsoonDelugeFormProps } from './MonsoonDelugeForm'

export const monsoonDelugeFormVariants: PreviewVariant<MonsoonDelugeFormProps>[] = [
  { id: 1, label: 'Title only', props: { title: 'Monsoon' } },
  {
    id: 2,
    label: 'Title + body',
    props: {
      eyebrow: 'Deluge',
      title: 'Storm send',
      body: 'Full-viewport contact ritual with rain streaks behind each field.',
    },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'SEND YOUR MESSAGE THROUGH THE MONSOON DELUGE CONTACT RITUAL',
      body: 'Long uppercase title wraps inside the storm panel.',
    },
  },
  { id: 4, label: 'Missing body', props: { title: 'Deluge', eyebrow: 'Contact' } },
  { id: 5, label: 'Short body', props: { title: 'Rain', body: 'Brief instructions.' } },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Monsoon',
      title: 'Deluge form',
      body: 'The rain streaks are not decoration — each field sits inside the monsoon current with cyan lightning on focus. Mobile stacks fields vertically; desktop centers the storm panel.',
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
      title: 'Full deluge',
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
      nameLabel: 'Storm chaser',
      emailLabel: 'Radar',
      messageLabel: 'Forecast',
      submitLabel: 'Transmit signal',
    },
  },
  { id: 15, label: 'No eyebrow', props: { title: 'Plain rain', body: 'Eyebrow omitted.' } },
  { id: 16, label: 'Eyebrow only', props: { eyebrow: 'Category V', title: 'The deluge' } },
  {
    id: 17,
    label: 'Stat in body',
    props: {
      title: '250mm',
      body: 'Average rainfall during peak monsoon season in this region.',
    },
  },
  {
    id: 18,
    label: 'Quote in body',
    props: {
      title: 'Storm',
      body: '"The rain does not ask permission before it falls." — Monsoon proverb',
    },
  },
  {
    id: 19,
    label: 'Code in body',
    props: {
      title: 'rain',
      body: 'const deluge = monsoon.fall({ intensity: 1.0, fields: active })',
    },
  },
  {
    id: 20,
    label: 'Full form',
    props: {
      eyebrow: 'Weather contact',
      title: 'Monsoon deluge form',
      body: 'Complete form with all fields populated for review.',
      submitLabel: 'Send inquiry',
    },
  },
]
