import type { PreviewVariant } from '../../src/previews/types'
import type { WeirSpillFloorProps } from './WeirSpillFloor'

const sampleLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: '#blog' },
]

export const weirSpillFloorVariants: PreviewVariant<WeirSpillFloorProps>[] = [
  { id: 1, label: 'Brand only', props: { brand: 'Weir' } },
  {
    id: 2,
    label: 'Brand + tagline',
    props: {
      brand: 'Spill & Co',
      tagline: 'Water over stone — a brutalist footer for industrial brands.',
    },
  },
  {
    id: 3,
    label: 'Very long brand',
    props: {
      brand: 'The Great Concrete Dam',
      tagline: 'Long brand name wraps inside the crest slab.',
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
    props: { brand: 'Dam', tagline: 'Flow on.' },
  },
  {
    id: 6,
    label: 'Long tagline',
    props: {
      brand: 'Spillway',
      tagline:
        'Every drop remembers the height it fell from — a longer tagline to test wrapping inside the weir spill footer stage.',
    },
  },
  {
    id: 7,
    label: 'Empty tagline',
    props: { brand: 'Concrete', links: sampleLinks },
  },
  {
    id: 8,
    label: 'Four links',
    props: { brand: 'Weir', links: sampleLinks },
  },
  {
    id: 9,
    label: 'Two links',
    props: {
      brand: 'Spill',
      links: [
        { label: 'Home', href: '#' },
        { label: 'Shop', href: '#shop' },
      ],
    },
  },
  {
    id: 10,
    label: 'No links',
    props: { brand: 'Solo crest', tagline: 'No navigation links.' },
  },
  {
    id: 11,
    label: 'Many links',
    props: {
      brand: 'Dam',
      links: [
        ...sampleLinks,
        { label: 'Careers', href: '#careers' },
        { label: 'Press', href: '#press' },
      ],
    },
  },
  {
    id: 12,
    label: 'Legal line',
    props: {
      brand: 'Weir',
      links: sampleLinks,
      legal: '© 2026 Spill & Co. All rights reserved.',
    },
  },
  {
    id: 13,
    label: 'Long legal line',
    props: {
      brand: 'Spillway',
      legal:
        '© 2026 The Great Concrete Dam. Privacy Policy · Terms of Service · Cookie Settings · Accessibility',
    },
  },
  {
    id: 14,
    label: 'No legal',
    props: { brand: 'Flow', links: sampleLinks },
  },
  {
    id: 15,
    label: 'Long link labels',
    props: {
      brand: 'Weir',
      links: [
        { label: 'Sustainability', href: '#sustainability' },
        { label: 'Community', href: '#community' },
      ],
    },
  },
  {
    id: 16,
    label: 'Single link',
    props: {
      brand: 'Spill',
      links: [{ label: 'Enter', href: '#enter' }],
    },
  },
  {
    id: 17,
    label: 'Tagline + legal only',
    props: {
      brand: 'Dam',
      tagline: 'Overflowing.',
      legal: '© 2026 Dam Labs',
    },
  },
  {
    id: 18,
    label: 'Full block no tagline',
    props: {
      brand: 'Spillway',
      links: sampleLinks,
      legal: '© 2026 Spillway Inc.',
    },
  },
  {
    id: 19,
    label: 'Minimal',
    props: { brand: '·', links: [{ label: 'Go', href: '#' }] },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      brand: 'Weir Spill',
      tagline: 'Where brands dam the flow and visitors spill over the crest.',
      links: sampleLinks,
      legal: '© 2026 Weir Spill Studio. Flow with care.',
    },
  },
]
