import type { PreviewVariant } from '../../src/previews/types'
import type { InquiryChamberProps } from './InquiryChamber'

export const inquiryChamberVariants: PreviewVariant<InquiryChamberProps>[] = [
  { id: 1, label: 'Headline only', props: { title: 'Write us' } },
  {
    id: 2,
    label: 'Headline + body',
    props: { title: 'Write us', body: 'Three fields. The page is the form.' },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      title: 'Tell us the thing you have been circling for months without sending',
      body: 'Wrap test for the chamber title.',
    },
  },
  { id: 4, label: 'Empty title', props: { title: '', body: 'Title missing; fields remain.' } },
  {
    id: 5,
    label: 'Short body',
    props: { title: 'Ping', body: 'Now.' },
  },
  {
    id: 6,
    label: 'Long body',
    props: {
      title: 'Slow mail',
      body: 'We read everything. This variant checks a long preamble above the numbered fields so the chamber still feels like architecture, not a tiny widget.',
    },
  },
  { id: 7, label: 'Empty body', props: { title: 'No preamble' } },
  {
    id: 8,
    label: 'Custom field labels',
    props: {
      title: 'Alias',
      nameLabel: 'What should we call you',
      emailLabel: 'Where to reply',
      messageLabel: 'The note',
    },
  },
  {
    id: 9,
    label: 'Placeholders',
    props: {
      title: 'Hints',
      namePlaceholder: 'Ada',
      emailPlaceholder: 'ada@studio.example',
      messagePlaceholder: 'Start anywhere.',
    },
  },
  {
    id: 10,
    label: 'Missing name field',
    props: { title: 'No name', showName: false, body: 'Email and message only.' },
  },
  {
    id: 11,
    label: 'Missing email field',
    props: { title: 'No email', showEmail: false, body: 'Name and message only.' },
  },
  {
    id: 12,
    label: 'Missing message field',
    props: { title: 'No letter', showMessage: false, body: 'Identity only.' },
  },
  {
    id: 13,
    label: 'Disabled / loading',
    props: { title: 'Closed', body: 'Not accepting notes.', disabled: true, submitLabel: 'Closed' },
  },
  {
    id: 14,
    label: 'Custom submit',
    props: { title: 'Transmit', submitLabel: 'Transmit note' },
  },
  {
    id: 15,
    label: 'Eyebrow + all fields',
    props: { eyebrow: 'Chamber', title: 'Leave a mark', body: 'Numbered ritual.' },
  },
  {
    id: 16,
    label: 'German copy',
    props: {
      title: 'Schreib uns',
      nameLabel: 'Name',
      emailLabel: 'E-Mail',
      messageLabel: 'Nachricht',
      submitLabel: 'Senden',
    },
  },
  {
    id: 17,
    label: 'Japanese copy',
    props: {
      title: '連絡する',
      nameLabel: '名前',
      emailLabel: 'メール',
      messageLabel: '本文',
      submitLabel: '送信',
    },
  },
  {
    id: 18,
    label: 'Long submit label',
    props: { title: 'Verbose action', submitLabel: 'Send this note into the chamber' },
  },
  {
    id: 19,
    label: 'Only message',
    props: { title: 'Anonymous', showName: false, showEmail: false, messageLabel: 'Unsigned' },
  },
  {
    id: 20,
    label: 'Dense chamber',
    props: {
      eyebrow: 'Desk 03',
      title: 'Commission a piece',
      body: 'Name, mail, and a letter. Nothing else.',
      namePlaceholder: 'Full name',
      emailPlaceholder: 'studio@example.com',
      messagePlaceholder: 'Scale, material, deadline.',
      submitLabel: 'File the inquiry',
    },
  },
]
