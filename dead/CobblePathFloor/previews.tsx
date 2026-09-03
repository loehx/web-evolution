import type { PreviewVariant } from '../../src/previews/types'
import type { CobblePathFloorProps } from './CobblePathFloor'

const sampleLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: '#blog' },
]

export const cobblePathFloorVariants: PreviewVariant<CobblePathFloorProps>[] = [
  { id: 1, label: 'Brand only', props: { brand: 'Cobble' } },
  {
    id: 2,
    label: 'Brand + tagline',
    props: {
      brand: 'Path & Co',
      tagline: 'Step by step — a playful footer for village brands.',
    },
  },
  {
    id: 3,
    label: 'Very long brand',
    props: {
      brand: 'The Old Cobblestone Lane',
      tagline: 'Long brand name wraps inside the crest medallion.',
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
    props: { brand: 'Lane', tagline: 'Walk on.' },
  },
  {
    id: 6,
    label: 'Long tagline',
    props: {
      brand: 'Village',
      tagline:
        'Every stone remembers a thousand footsteps — a longer tagline to test wrapping inside the cobble path footer stage.',
    },
  },
  {
    id: 7,
    label: 'Empty tagline',
    props: { brand: 'Stone', links: sampleLinks },
  },
  {
    id: 8,
    label: 'Four links',
    props: { brand: 'Cobble', links: sampleLinks },
  },
  {
    id: 9,
    label: 'Two links',
    props: {
      brand: 'Path',
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
      brand: 'Lane',
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
      brand: 'Cobble',
      links: sampleLinks,
      legal: '© 2026 Path & Co. All rights reserved.',
    },
  },
  {
    id: 13,
    label: 'Long legal line',
    props: {
      brand: 'Village',
      legal:
        '© 2026 The Old Cobblestone Lane. Privacy Policy · Terms of Service · Cookie Settings · Accessibility',
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
      brand: 'Cobble',
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
      brand: 'Step',
      links: [{ label: 'Enter', href: '#enter' }],
    },
  },
  {
    id: 17,
    label: 'Tagline + legal only',
    props: {
      brand: 'Lane',
      tagline: 'Winding.',
      legal: '© 2026 Lane Labs',
    },
  },
  {
    id: 18,
    label: 'Full block no tagline',
    props: {
      brand: 'Village',
      links: sampleLinks,
      legal: '© 2026 Village Inc.',
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
      brand: 'Cobble Path',
      tagline: 'Where brands lay stones and visitors find their way.',
      links: sampleLinks,
      legal: '© 2026 Cobble Path Studio. Walk with care.',
    },
  },
]
