import type { PreviewVariant } from '../../src/previews/types'
import type { ArborRootFloorProps } from './ArborRootFloor'

const sampleLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: '#blog' },
]

export const arborRootFloorVariants: PreviewVariant<ArborRootFloorProps>[] = [
  { id: 1, label: 'Brand only', props: { brand: 'Arbor' } },
  {
    id: 2,
    label: 'Brand + tagline',
    props: {
      brand: 'Root & Co',
      tagline: 'Deep roots, tall branches — a playful footer for forest brands.',
    },
  },
  {
    id: 3,
    label: 'Very long brand',
    props: {
      brand: 'The Ancient Oak Collective',
      tagline: 'Long brand name wraps inside the trunk medallion.',
    },
  },
  {
    id: 4,
    label: 'Missing brand fallback',
    props: { brand: '', tagline: 'Empty brand shows em dash.' },
  },
  {
    id: 5,
    label: 'Short tagline',
    props: { brand: 'Moss', tagline: 'Grow slow.' },
  },
  {
    id: 6,
    label: 'Long tagline',
    props: {
      brand: 'Canopy',
      tagline:
        'The roots remember what the canopy forgets — a longer tagline to test wrapping inside the forest floor footer stage.',
    },
  },
  {
    id: 7,
    label: 'Empty tagline',
    props: { brand: 'Trunk', links: sampleLinks },
  },
  {
    id: 8,
    label: 'Four links',
    props: { brand: 'Arbor', links: sampleLinks },
  },
  {
    id: 9,
    label: 'Two links',
    props: {
      brand: 'Root',
      links: [
        { label: 'Home', href: '#' },
        { label: 'Shop', href: '#shop' },
      ],
    },
  },
  {
    id: 10,
    label: 'No links',
    props: { brand: 'Solo trunk', tagline: 'No navigation links.' },
  },
  {
    id: 11,
    label: 'Many links',
    props: {
      brand: 'Forest',
      links: [
        ...sampleLinks,
        { label: 'Careers', href: '#careers' },
        { label: 'Press', href: '#press' },
        { label: 'Legal', href: '#legal' },
      ],
    },
  },
  {
    id: 12,
    label: 'Legal line',
    props: {
      brand: 'Arbor',
      links: sampleLinks,
      legal: '© 2026 Root & Co. All rights reserved.',
    },
  },
  {
    id: 13,
    label: 'Long legal line',
    props: {
      brand: 'Canopy',
      legal:
        '© 2026 The Ancient Oak Collective. Privacy Policy · Terms of Service · Cookie Settings · Accessibility',
    },
  },
  {
    id: 14,
    label: 'No legal',
    props: { brand: 'Moss', links: sampleLinks },
  },
  {
    id: 15,
    label: 'Long link labels',
    props: {
      brand: 'Arbor',
      links: [
        { label: 'Sustainability Report', href: '#sustainability' },
        { label: 'Community Garden', href: '#garden' },
      ],
    },
  },
  {
    id: 16,
    label: 'Single link',
    props: {
      brand: 'Seed',
      links: [{ label: 'Plant', href: '#plant' }],
    },
  },
  {
    id: 17,
    label: 'Tagline + legal only',
    props: {
      brand: 'Soil',
      tagline: 'Grounded.',
      legal: '© 2026 Soil Labs',
    },
  },
  {
    id: 18,
    label: 'Full block no tagline',
    props: {
      brand: 'Grove',
      links: sampleLinks,
      legal: '© 2026 Grove Inc.',
    },
  },
  {
    id: 19,
    label: 'Minimal',
    props: { brand: '·', links: [{ label: 'Enter', href: '#' }] },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      brand: 'Arbor Root',
      tagline: 'Where brands put down roots and reach for light.',
      links: sampleLinks,
      legal: '© 2026 Arbor Root Studio. Crafted with care.',
    },
  },
]
