import type { PreviewVariant } from '../../src/previews/types'
import type { GradientMeshBandProps } from './GradientMeshBand'

export const gradientMeshBandVariants: PreviewVariant<GradientMeshBandProps>[] = [
  {
    id: 1,
    label: 'Headline only',
    props: { title: 'Build bold components' },
  },
  {
    id: 2,
    label: 'Eyebrow + headline + body',
    props: {
      eyebrow: 'New release',
      title: 'Evolve your design system',
      body: 'Ship polished UI blocks with preview variants and human review built in.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      title:
        'A gradient mesh band that still reads clearly when the headline wraps across three or more lines on mobile screens',
    },
  },
  {
    id: 4,
    label: 'Missing headline',
    props: { eyebrow: 'Announcement', body: 'We are hiring across design and engineering.' },
  },
  {
    id: 5,
    label: 'Short body',
    props: { title: 'Simple band', body: 'One sentence of supporting copy.' },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      title: 'Why gradients',
      body: 'Gradient meshes add depth without heavy imagery. They work behind typography, adapt to dark themes, and animate subtly to draw attention without distracting from the message. Use them for promos, CTAs, and section breaks.',
    },
  },
  {
    id: 7,
    label: 'Empty body',
    props: { title: 'Title without body', eyebrow: 'Featured' },
  },
  {
    id: 8,
    label: 'Center aligned',
    props: {
      align: 'center',
      eyebrow: 'Launch week',
      title: 'Five new components',
      body: 'Browse the latest batch and tell us which shall live.',
    },
  },
  {
    id: 9,
    label: 'Single CTA',
    props: {
      title: 'Start free trial',
      body: 'No credit card required.',
      ctaLabel: 'Get started',
    },
  },
  {
    id: 10,
    label: 'CTA only with title',
    props: { title: 'Ready?', ctaLabel: 'Contact sales' },
  },
  {
    id: 11,
    label: 'Eyebrow only',
    props: { eyebrow: 'Coming soon' },
  },
  {
    id: 12,
    label: 'All fields empty',
    props: {},
  },
  {
    id: 13,
    label: 'Unicode copy',
    props: {
      eyebrow: 'Nouveau ✨',
      title: 'Découvrez la collection',
      body: 'Des composants audacieux pour le web moderne.',
      ctaLabel: 'En savoir plus',
    },
  },
  {
    id: 14,
    label: 'No CTA with full copy',
    props: {
      eyebrow: 'Case study',
      title: 'Acme grew 3×',
      body: 'See how they shipped faster with a shared component library.',
    },
  },
  {
    id: 15,
    label: 'Stat-style short title',
    props: { title: '99.9%', body: 'Uptime across all regions.', align: 'center' },
  },
  {
    id: 16,
    label: 'Question headline',
    props: {
      title: 'Which ones shall live?',
      body: 'Review variants and reply with keep or die.',
      ctaLabel: 'Open previews',
    },
  },
  {
    id: 17,
    label: 'All caps eyebrow',
    props: {
      eyebrow: 'LIMITED TIME',
      title: 'Annual plan discount',
      ctaLabel: 'Claim offer',
    },
  },
  {
    id: 18,
    label: 'Minimal two-word title',
    props: { title: 'Go faster' },
  },
  {
    id: 19,
    label: 'Long eyebrow',
    props: {
      eyebrow: 'Product design · Engineering · Research',
      title: 'Cross-functional teams',
      body: 'One library, many surfaces.',
    },
  },
  {
    id: 20,
    label: 'Center + CTA + long body',
    props: {
      align: 'center',
      eyebrow: 'Web evolution',
      title: 'Curated components',
      body: 'Every batch invents five bold blocks, previews twenty variants each, and waits for your verdict.',
      ctaLabel: 'Browse /new',
    },
  },
]
