import type { PreviewVariant } from '../../src/previews/types'
import type { SentinelGateFormProps } from './SentinelGateForm'

export const sentinelGateFormVariants: PreviewVariant<SentinelGateFormProps>[] = [
  {
    id: 1,
    label: 'Title only',
    props: { title: 'Sentinel gate' },
  },
  {
    id: 2,
    label: 'Title + body',
    props: {
      eyebrow: 'Contact',
      title: 'Pass through',
      body: 'The gate bars part when you focus a field. Brutalist contact ritual.',
    },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'Request access to the inner courtyard and workshop archives',
      body: 'Long titles wrap in uppercase.',
    },
  },
  {
    id: 4,
    label: 'Empty title fallback',
    props: { title: '' },
  },
  {
    id: 5,
    label: 'Short body',
    props: {
      title: 'Knock',
      body: 'Brief instruction.',
    },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      title: 'Inquire',
      body:
        'This form is the page — not a card dropped on a gradient. Iron bars frame each field. On focus, the gate wings slide apart. Submit is a heavy rust slab.',
    },
  },
  {
    id: 7,
    label: 'No body',
    props: {
      eyebrow: 'Gate',
      title: 'Open',
    },
  },
  {
    id: 8,
    label: 'All fields',
    props: {
      title: 'Full gate',
      body: 'Name, email, message.',
      showName: true,
      showEmail: true,
      showMessage: true,
    },
  },
  {
    id: 9,
    label: 'Email only',
    props: {
      title: 'Subscribe',
      showName: false,
      showEmail: true,
      showMessage: false,
      submitLabel: 'Join',
    },
  },
  {
    id: 10,
    label: 'Name + email',
    props: {
      title: 'Brief form',
      showName: true,
      showEmail: true,
      showMessage: false,
    },
  },
  {
    id: 11,
    label: 'Message only',
    props: {
      title: 'Note',
      showName: false,
      showEmail: false,
      showMessage: true,
      messageLabel: 'Your note',
    },
  },
  {
    id: 12,
    label: 'Custom labels',
    props: {
      title: 'Studio visit',
      nameLabel: 'Visitor',
      emailLabel: 'Reply-to',
      messageLabel: 'Purpose',
      submitLabel: 'Request slot',
    },
  },
  {
    id: 13,
    label: 'Disabled submit',
    props: {
      title: 'Closed',
      body: 'Gate is locked.',
      disabled: true,
    },
  },
  {
    id: 14,
    label: 'No eyebrow',
    props: {
      title: 'Direct',
      body: 'Eyebrow omitted.',
    },
  },
  {
    id: 15,
    label: 'Booking CTA',
    props: {
      eyebrow: 'Reservations',
      title: 'Book a tour',
      body: 'Weekday visits by appointment.',
      submitLabel: 'Send request',
    },
  },
  {
    id: 16,
    label: 'Support form',
    props: {
      eyebrow: 'Help',
      title: 'Report issue',
      messageLabel: 'Describe the problem',
      submitLabel: 'Transmit',
    },
  },
  {
    id: 17,
    label: 'Partnership inquiry',
    props: {
      title: 'Collaborate',
      body: 'Tell us about your project.',
      submitLabel: 'Propose',
    },
  },
  {
    id: 18,
    label: 'Minimal mono',
    props: {
      eyebrow: 'SG-01',
      title: 'Gate',
      showMessage: false,
    },
  },
  {
    id: 19,
    label: 'Long submit label',
    props: {
      title: 'Apply',
      submitLabel: 'Submit application for review',
    },
  },
  {
    id: 20,
    label: 'Full marketing stack',
    props: {
      eyebrow: 'Get in touch',
      title: 'Sentinel',
      body: 'We read every transmission. The gate opens on focus.',
      submitLabel: 'Pass through',
    },
  },
]
