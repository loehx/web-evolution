import type { PreviewVariant } from '../../src/previews/types'
import type { GeyserVentFormProps } from './GeyserVentForm'

export const geyserVentFormVariants: PreviewVariant<GeyserVentFormProps>[] = [
  { id: 1, label: 'Title only', props: { title: 'Geyser' } },
  {
    id: 2,
    label: 'Title + body',
    props: {
      eyebrow: 'Vent',
      title: 'Steam send',
      body: 'Full-viewport contact ritual with geothermal steam behind each field.',
    },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'SEND YOUR MESSAGE THROUGH THE GEYSER VENT CONTACT RITUAL',
      body: 'Long uppercase title wraps inside the basin panel.',
    },
  },
  { id: 4, label: 'Missing body', props: { title: 'Vent', eyebrow: 'Contact' } },
  { id: 5, label: 'Short body', props: { title: 'Steam', body: 'Brief instructions.' } },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Geyser',
      title: 'Vent form',
      body: 'The steam plumes are not decoration — each field sits inside the geothermal basin with mineral glow on focus. Mobile stacks fields vertically; desktop centers the vent panel.',
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
      title: 'Full vent',
      body: 'Name, email, and message.',
      showName: true,
      showEmail: true,
      showMessage: true,
    },
  },
  { id: 13, label: 'Disabled submit', props: { title: 'Sealed', body: 'Form disabled.', disabled: true } },
  {
    id: 14,
    label: 'Custom labels',
    props: {
      title: 'Custom',
      nameLabel: 'Explorer',
      emailLabel: 'Basin ID',
      messageLabel: 'Steam note',
      submitLabel: 'Release pressure',
    },
  },
  { id: 15, label: 'No eyebrow', props: { title: 'Plain steam', body: 'Eyebrow omitted.' } },
  { id: 16, label: 'Eyebrow only', props: { eyebrow: 'Geothermal', title: 'The vent' } },
  {
    id: 17,
    label: 'Stat in body',
    props: {
      title: '93°C',
      body: 'Average vent temperature at the geothermal field in this region.',
    },
  },
  {
    id: 18,
    label: 'Quote in body',
    props: {
      title: 'Pressure',
      body: '"The earth exhales through every vent before it speaks." — Geologist proverb',
    },
  },
  {
    id: 19,
    label: 'Long submit label',
    props: {
      title: 'Seal',
      body: 'Extended submit text.',
      submitLabel: 'Seal the geothermal vent chamber',
    },
  },
  {
    id: 20,
    label: 'Full form',
    props: {
      eyebrow: 'Geothermal telemetry',
      title: 'Vent ritual',
      body: 'Complete form with all fields and custom submit.',
      submitLabel: 'Seal the vent',
    },
  },
]
