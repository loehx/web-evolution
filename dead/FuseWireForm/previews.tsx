import type { PreviewVariant } from '../../src/previews/types'
import type { FuseWireFormProps } from './FuseWireForm'

export const fuseWireFormVariants: PreviewVariant<FuseWireFormProps>[] = [
  { id: 1, label: 'Title only', props: { title: 'Fuse' } },
  {
    id: 2,
    label: 'Title + body',
    props: {
      eyebrow: 'Panel',
      title: 'Close circuit',
      body: 'Full-viewport futuristic contact ritual with glowing wire connections between terminals.',
    },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'CONNECT YOUR MESSAGE THROUGH THE FUSE PANEL',
      body: 'Long uppercase title wraps inside the fuse box.',
    },
  },
  { id: 4, label: 'Missing body', props: { title: 'Wire', eyebrow: 'Contact' } },
  { id: 5, label: 'Short body', props: { title: 'Spark', body: 'Brief instructions.' } },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Circuit',
      title: 'Fuse box',
      body: 'The wires are not decoration — they track where your attention lands. Name, email, and message each sit inside a terminal that glows on focus. Mobile stacks fields vertically; desktop centers the panel.',
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
      title: 'Full panel',
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
      nameLabel: 'Terminal A',
      emailLabel: 'Terminal B',
      messageLabel: 'Signal',
      submitLabel: 'Transmit',
    },
  },
  { id: 15, label: 'No eyebrow', props: { title: 'Plain panel', body: 'Eyebrow omitted.' } },
  {
    id: 16,
    label: 'Eyebrow only',
    props: { eyebrow: 'Circuit VII', title: 'The fuse' },
  },
  {
    id: 17,
    label: 'Stat in body',
    props: {
      title: '240V',
      body: 'Standard fuse panel voltage for industrial contact terminals.',
    },
  },
  {
    id: 18,
    label: 'Quote in body',
    props: {
      title: 'Spark',
      body: '"Every connection carries the weight of intention." — Electrician proverb',
    },
  },
  {
    id: 19,
    label: 'Code in body',
    props: {
      title: 'POST /fuse',
      body: 'const response = await fuse.close({ name, email, message })',
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Fuse Wire',
      title: 'Contact us',
      body: 'Full futuristic contact ritual with all fields, custom labels, and submit.',
      submitLabel: 'Close circuit',
    },
  },
]
