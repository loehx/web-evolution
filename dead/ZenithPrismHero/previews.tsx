import type { PreviewVariant } from '../../src/previews/types'
import type { ZenithPrismHeroProps } from './ZenithPrismHero'

export const zenithPrismHeroVariants: PreviewVariant<ZenithPrismHeroProps>[] = [
  {
    id: 1,
    label: 'Headline only',
    props: { title: 'Light bends here' },
  },
  {
    id: 2,
    label: 'Headline + subtitle',
    props: {
      title: 'Spectral zenith',
      subtitle: 'Grab the prism. Every facet refracts a different story.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      title: 'When geometry catches the last photon before dusk settles on the ridge',
      titleLines: ['When geometry catches', 'the last photon before dusk settles on the ridge'],
      subtitle: 'Long headline wrap test.',
    },
  },
  {
    id: 4,
    label: 'Missing headline',
    props: { title: '', subtitle: 'Prism stage without title copy.' },
  },
  {
    id: 5,
    label: 'Short subtitle',
    props: { title: 'Prism', subtitle: 'Drag.' },
  },
  {
    id: 6,
    label: 'Long subtitle',
    props: {
      title: 'Refraction chamber',
      subtitle:
        'Luxury editorial hero with a grabable glass prism. This variant tests a longer subtitle block that should wrap cleanly in the left column without colliding with the orbit stage on desktop.',
    },
  },
  {
    id: 7,
    label: 'Empty subtitle',
    props: { title: 'No subtitle', eyebrow: 'Zenith' },
  },
  {
    id: 8,
    label: 'Eyebrow + headline',
    props: {
      eyebrow: 'Studio opening',
      title: 'First light',
      titleLines: ['First', 'light'],
    },
  },
  {
    id: 9,
    label: 'Eyebrow only context',
    props: {
      eyebrow: 'Chapter 01 — Optics',
      title: 'Prism study',
      subtitle: 'Minimal CTA below.',
    },
  },
  {
    id: 10,
    label: 'Single CTA',
    props: {
      title: 'Enter the spectrum',
      subtitle: 'One action only.',
      ctaLabel: 'View work',
    },
  },
  {
    id: 11,
    label: 'No CTA',
    props: {
      title: 'Silent prism',
      subtitle: 'Layout without a button.',
    },
  },
  {
    id: 12,
    label: 'Explicit title lines',
    props: {
      eyebrow: 'Commission',
      titleLines: ['Bend', 'the beam'],
      subtitle: 'ResponsiveHeadline line control.',
      ctaLabel: 'Inquire',
    },
  },
  {
    id: 13,
    label: 'Two-word headline',
    props: { title: 'Glass noon', subtitle: 'Compact title.' },
  },
  {
    id: 14,
    label: 'Marketing CTA',
    props: {
      title: 'Launch week',
      subtitle: 'Tickets drop Friday at noon.',
      ctaLabel: 'Reserve seat',
    },
  },
  {
    id: 15,
    label: 'Product hero',
    props: {
      eyebrow: 'Series IV',
      title: 'Optic lens',
      subtitle: 'Machined titanium housing. Hand-polished crown.',
      ctaLabel: 'Configure',
    },
  },
  {
    id: 16,
    label: 'Editorial feature',
    props: {
      eyebrow: 'Cover story',
      titleLines: ['The color', 'of distance'],
      subtitle: 'A profile of alpine light and the photographers who chase it.',
    },
  },
  {
    id: 17,
    label: 'Short eyebrow',
    props: { eyebrow: 'Now', title: 'Open', ctaLabel: 'Tour' },
  },
  {
    id: 18,
    label: 'Long eyebrow',
    props: {
      eyebrow: 'International symposium on perceptual color — Reykjavík',
      title: 'Keynote',
      subtitle: 'Dr. Maren Solberg on prismatic memory.',
    },
  },
  {
    id: 19,
    label: 'Minimal all fields',
    props: {
      eyebrow: '—',
      title: 'A',
      subtitle: 'B',
      ctaLabel: 'Go',
    },
  },
  {
    id: 20,
    label: 'Full marketing stack',
    props: {
      eyebrow: 'Atelier Nord',
      titleLines: ['Crafted', 'refraction'],
      subtitle: 'Bespoke optical installations for galleries and private collections.',
      ctaLabel: 'Book a visit',
    },
  },
]
