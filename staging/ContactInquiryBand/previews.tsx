import type { PreviewVariant } from '../../src/previews/types'
import type { ContactInquiryBandProps } from './ContactInquiryBand'

export const contactInquiryBandVariants: PreviewVariant<ContactInquiryBandProps>[] = [
  {
    id: 1,
    label: 'Headline only default fields',
    props: {
      headlineLines: ['Get in touch'],
      fields: [
        { name: 'name', label: 'Name', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'message', label: 'Message', type: 'textarea', required: true },
      ],
      submitLabel: 'Send',
    },
  },
  {
    id: 2,
    label: 'Eyebrow + headline + intro split layout',
    props: {
      eyebrow: 'Contact',
      headlineLines: ['Let us', 'hear from you'],
      intro: 'Questions about pricing, partnerships, or custom components — we read every message.',
      sideNote: 'Office hours: Mon–Fri, 9am–6pm CET',
      layout: 'split',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      headlineLines: [
        'Reach out for enterprise',
        'deployments and custom design systems',
      ],
      intro: 'Our solutions team responds within 24 hours.',
    },
  },
  {
    id: 4,
    label: 'Missing headline',
    props: {
      eyebrow: 'Support',
      intro: 'File a ticket and we will follow up.',
      submitLabel: 'Submit ticket',
    },
  },
  {
    id: 5,
    label: 'Short intro',
    props: {
      headlineLines: ['Say hello'],
      intro: 'We are friendly.',
    },
  },
  {
    id: 6,
    label: 'Long intro',
    props: {
      headlineLines: ['Partner with us'],
      intro:
        'We work with agencies, startups, and enterprise design teams to evolve component libraries. Tell us about your stack, timeline, and brand constraints — the more context, the better we can help.',
    },
  },
  {
    id: 7,
    label: 'Empty intro',
    props: {
      headlineLines: ['Contact form'],
    },
  },
  {
    id: 8,
    label: 'Stacked layout',
    props: {
      headlineLines: ['Quick question?'],
      intro: 'Stacked layout for narrow pages.',
      layout: 'stacked',
    },
  },
  {
    id: 9,
    label: 'Single field',
    props: {
      headlineLines: ['Email us'],
      fields: [
        {
          name: 'email',
          label: 'Your email',
          type: 'email',
          placeholder: 'you@example.com',
          required: true,
        },
      ],
      submitLabel: 'Request callback',
    },
  },
  {
    id: 10,
    label: 'Extra phone field',
    props: {
      headlineLines: ['Book a call'],
      fields: [
        { name: 'name', label: 'Name', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 555 0100' },
        { name: 'message', label: 'Agenda', type: 'textarea' },
      ],
      submitLabel: 'Schedule',
    },
  },
  {
    id: 11,
    label: 'No submit label',
    props: {
      headlineLines: ['Incomplete config'],
      submitLabel: '',
    },
  },
  {
    id: 12,
    label: 'Empty fields array',
    props: {
      headlineLines: ['Form disabled'],
      fields: [],
    },
  },
  {
    id: 13,
    label: 'Unicode labels',
    props: {
      headlineLines: ['Contactez-nous'],
      fields: [
        { name: 'nom', label: 'Nom', required: true },
        { name: 'courriel', label: 'Courriel', type: 'email', required: true },
        { name: 'msg', label: 'Message', type: 'textarea', required: true },
      ],
      submitLabel: 'Envoyer',
      successMessage: 'Merci — nous vous répondrons bientôt.',
    },
  },
  {
    id: 14,
    label: 'Custom success message',
    props: {
      headlineLines: ['Join waitlist'],
      fields: [{ name: 'email', label: 'Email', type: 'email', required: true }],
      submitLabel: 'Join',
      successMessage: 'You are on the list! Watch your inbox for launch day.',
    },
  },
  {
    id: 15,
    label: 'Side note only no intro',
    props: {
      headlineLines: ['Visit us'],
      sideNote: '123 Market St, San Francisco — walk-ins welcome Tue–Thu.',
    },
  },
  {
    id: 16,
    label: 'All optional fields',
    props: {
      headlineLines: ['Optional everything'],
      fields: [
        { name: 'name', label: 'Name', required: false },
        { name: 'email', label: 'Email', type: 'email', required: false },
        { name: 'notes', label: 'Notes', type: 'textarea', required: false },
      ],
      submitLabel: 'Submit',
    },
  },
  {
    id: 17,
    label: 'Long placeholders',
    props: {
      fields: [
        {
          name: 'name',
          label: 'Full legal name',
          placeholder: 'First and last name as it appears on contracts',
          required: true,
        },
        {
          name: 'message',
          label: 'Project brief',
          type: 'textarea',
          placeholder: 'Describe goals, audience, timeline, and any reference links…',
          required: true,
        },
      ],
    },
  },
  {
    id: 18,
    label: 'Eyebrow only',
    props: {
      eyebrow: 'Hiring',
    },
  },
  {
    id: 19,
    label: 'Split with long side note',
    props: {
      headlineLines: ['Sales'],
      intro: 'Tell us about your team size and use case.',
      sideNote:
        'For urgent issues, email support@example.com. For press, press@example.com. We do not offer phone support on the free tier.',
      layout: 'split',
    },
  },
  {
    id: 20,
    label: 'Minimal two-field form',
    props: {
      headlineLines: ['News tip'],
      fields: [
        { name: 'email', label: 'Your email', type: 'email', required: true },
        { name: 'tip', label: 'Tip', type: 'textarea', required: true },
      ],
      submitLabel: 'Send tip',
      layout: 'stacked',
    },
  },
]
