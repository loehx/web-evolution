import type { PreviewVariant } from '../../src/previews/types'
import type { MooringPulseFormProps } from './MooringPulseForm'

export const mooringPulseFormVariants: PreviewVariant<MooringPulseFormProps>[] = [
  {
    id: 1,
    label: 'Default three fields',
    props: {
      title: 'Moor your message',
      body: 'Bollards pulse as fields become valid.',
    },
  },
  {
    id: 2,
    label: 'Eyebrow + full copy',
    props: {
      eyebrow: 'Harbor night',
      title: 'Cast a line',
      body: 'Cyan cables tether each field to the mooring rail. Amber rings climb when inputs hold weight.',
    },
  },
  {
    id: 3,
    label: 'Short title',
    props: { title: 'Hi' },
  },
  {
    id: 4,
    label: 'Long title',
    props: {
      title: 'A contact stage that refuses to be a floating card on a gray page',
      body: 'Full viewport. Full ritual.',
    },
  },
  {
    id: 5,
    label: 'No body',
    props: { title: 'No intro', eyebrow: 'Direct' },
  },
  {
    id: 6,
    label: 'Name only',
    props: {
      title: 'Name field',
      showEmail: false,
      showMessage: false,
      submitLabel: 'Send name',
    },
  },
  {
    id: 7,
    label: 'Email only',
    props: {
      title: 'Email capture',
      showName: false,
      showMessage: false,
      submitLabel: 'Subscribe',
    },
  },
  {
    id: 8,
    label: 'Message only',
    props: {
      title: 'Open note',
      showName: false,
      showEmail: false,
      submitLabel: 'Post',
    },
  },
  {
    id: 9,
    label: 'Disabled submit',
    props: {
      title: 'Locked harbor',
      disabled: true,
      submitLabel: 'Closed',
    },
  },
  {
    id: 10,
    label: 'Custom labels',
    props: {
      title: 'Studio inquiry',
      nameLabel: 'Your name',
      emailLabel: 'Reply-to',
      messageLabel: 'Project brief',
      submitLabel: 'Send brief',
    },
  },
  {
    id: 11,
    label: 'German copy',
    props: {
      eyebrow: 'Hafen',
      title: 'Nachricht werfen',
      body: 'Pulse-Ringe steigen.',
      submitLabel: 'Senden',
    },
  },
  {
    id: 12,
    label: 'Long body',
    props: {
      title: 'Explain the ritual',
      body:
        'Each mooring post represents a field tier. Valid inputs light the amber core and send a pulse along the cable — a contact form where completion is visible, not hidden behind a spinner.',
    },
  },
  {
    id: 13,
    label: 'Booking request',
    props: {
      eyebrow: 'Booking',
      title: 'Reserve a berth',
      body: 'Tell us your dates and crew size.',
      submitLabel: 'Request berth',
    },
  },
  {
    id: 14,
    label: 'Support ticket',
    props: {
      title: 'Report an issue',
      messageLabel: 'Describe the issue',
      submitLabel: 'Open ticket',
    },
  },
  {
    id: 15,
    label: 'Partnership',
    props: {
      eyebrow: 'Partners',
      title: 'Collaborate',
      body: 'We read every line that reaches the harbor.',
      submitLabel: 'Propose',
    },
  },
  {
    id: 16,
    label: 'Minimal title only',
    props: { title: 'Form' },
  },
  {
    id: 17,
    label: 'Press inquiry',
    props: {
      eyebrow: 'Press',
      title: 'Media desk',
      submitLabel: 'Send inquiry',
    },
  },
  {
    id: 18,
    label: 'No eyebrow long title',
    props: {
      title: 'Full viewport inquiry without eyebrow chrome',
      body: 'Still pulses.',
    },
  },
  {
    id: 19,
    label: 'Newsletter',
    props: {
      title: 'Dock notes',
      showName: false,
      messageLabel: 'Why subscribe?',
      submitLabel: 'Join list',
    },
  },
  {
    id: 20,
    label: 'Wholesale',
    props: {
      eyebrow: 'Wholesale',
      title: 'Order desk',
      body: 'Minimum twelve units per SKU.',
      submitLabel: 'Request quote',
    },
  },
]
