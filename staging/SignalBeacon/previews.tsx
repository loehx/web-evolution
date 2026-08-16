import type { PreviewVariant } from '../../src/previews/types'
import type { SignalBeaconProps } from './SignalBeacon'

export const signalBeaconVariants: PreviewVariant<SignalBeaconProps>[] = [
  { id: 1, label: 'Default transmit', props: {} },
  {
    id: 2,
    label: 'Custom title + body',
    props: {
      title: 'Ping us',
      body: 'Three fields. Bars show signal strength as you type.',
    },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      title: 'Send the message you have been drafting since January',
      body: 'Title wrap test.',
    },
  },
  { id: 4, label: 'Empty title', props: { title: '', body: 'Title hidden; form remains.' } },
  {
    id: 5,
    label: 'Short body',
    props: { title: 'Now', body: 'Go.' },
  },
  {
    id: 6,
    label: 'Long body',
    props: {
      title: 'Open channel',
      body: 'We read every transmission within two business days. This variant checks a longer preamble above the numbered signal fields so the tower still feels architectural.',
    },
  },
  { id: 7, label: 'Empty body', props: { title: 'Direct' } },
  {
    id: 8,
    label: 'Custom field labels',
    props: {
      title: 'Alias',
      nameLabel: 'Call sign',
      emailLabel: 'Return frequency',
      messageLabel: 'Payload',
    },
  },
  {
    id: 9,
    label: 'Custom placeholders',
    props: {
      title: 'Hints',
      namePlaceholder: 'Ada',
      emailPlaceholder: 'ada@studio.example',
      messagePlaceholder: 'Start anywhere.',
    },
  },
  {
    id: 10,
    label: 'Hide name field',
    props: { title: 'Anonymous', showName: false, body: 'Email and message only.' },
  },
  {
    id: 11,
    label: 'Hide message field',
    props: { title: 'Quick ping', showMessage: false, body: 'Name and email only.' },
  },
  {
    id: 12,
    label: 'Email only',
    props: {
      title: 'Subscribe',
      showName: false,
      showMessage: false,
      emailLabel: 'Email',
      submitLabel: 'Join list',
    },
  },
  {
    id: 13,
    label: 'Custom submit label',
    props: {
      title: 'Dispatch',
      submitLabel: 'Launch signal',
    },
  },
  {
    id: 14,
    label: 'Support intake',
    props: {
      title: 'Support',
      body: 'Describe the issue. Include steps to reproduce.',
      messageLabel: 'Issue details',
      submitLabel: 'Open ticket',
    },
  },
  {
    id: 15,
    label: 'Waitlist',
    props: {
      title: 'Waitlist',
      body: 'Early access for the spring release.',
      showMessage: false,
      submitLabel: 'Join waitlist',
    },
  },
  {
    id: 16,
    label: 'Partnership',
    props: {
      title: 'Partner',
      body: 'Studios, galleries, and fabricators.',
      messageLabel: 'Proposal',
    },
  },
  {
    id: 17,
    label: 'Press',
    props: {
      title: 'Press',
      nameLabel: 'Outlet',
      emailLabel: 'Desk email',
      messageLabel: 'Story angle',
    },
  },
  {
    id: 18,
    label: 'Minimal labels',
    props: {
      title: 'Go',
      nameLabel: 'N',
      emailLabel: 'E',
      messageLabel: 'M',
    },
  },
  {
    id: 19,
    label: 'All fields hidden except email',
    props: {
      title: 'Newsletter',
      showName: false,
      showMessage: false,
      body: 'Monthly field notes.',
    },
  },
  {
    id: 20,
    label: 'Full custom stack',
    props: {
      title: 'Transmit',
      body: 'Commission inquiries and residency applications.',
      nameLabel: 'Your name',
      emailLabel: 'Reply-to',
      messageLabel: 'Tell us more',
      submitLabel: 'Send transmission',
    },
  },
]
