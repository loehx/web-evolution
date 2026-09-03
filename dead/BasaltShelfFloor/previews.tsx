import type { PreviewVariant } from '../../src/previews/types'
import type { BasaltShelfFloorProps } from './BasaltShelfFloor'

const DEFAULT_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const basaltShelfFloorVariants: PreviewVariant<BasaltShelfFloorProps>[] = [
  { id: 1, label: 'Brand only', props: { brand: 'BASALT' } },
  {
    id: 2,
    label: 'Brand + tagline',
    props: {
      brand: 'BASALT',
      tagline: 'Navigation links descend on basalt shelf slabs below the crest.',
    },
  },
  {
    id: 3,
    label: 'Very long brand',
    props: { brand: 'BASALTCLIFF', tagline: 'Long brand name on crest shelf.' },
  },
  {
    id: 4,
    label: 'Brand + links',
    props: { brand: 'STONE', links: DEFAULT_LINKS },
  },
  {
    id: 5,
    label: 'Brand + links + legal',
    props: {
      brand: 'SHELF',
      links: DEFAULT_LINKS,
      legal: '© 2026 Basalt Shelf Floor',
    },
  },
  {
    id: 6,
    label: 'Long tagline',
    props: {
      brand: 'CLIFF',
      tagline:
        'A brutalist cliff footer where each navigation link sits on a descending basalt shelf slab stepping down from the dark crest where the brand stamp lives.',
      links: DEFAULT_LINKS,
    },
  },
  { id: 7, label: 'Empty tagline', props: { brand: 'ROCK', links: DEFAULT_LINKS } },
  {
    id: 8,
    label: 'Single link',
    props: { brand: 'ONE', links: [{ label: 'Home', href: '/' }] },
  },
  {
    id: 9,
    label: 'Five links',
    props: {
      brand: 'FIVE',
      links: [
        { label: 'Work', href: '#work' },
        { label: 'About', href: '#about' },
        { label: 'Blog', href: '#blog' },
        { label: 'Docs', href: '#docs' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  },
  { id: 10, label: 'No links', props: { brand: 'EMPTY', tagline: 'Crest only, no shelf links.' } },
  {
    id: 11,
    label: 'Long link labels',
    props: {
      brand: 'WIDE',
      links: [
        { label: 'Documentation portal', href: '#docs' },
        { label: 'Customer support center', href: '#support' },
      ],
    },
  },
  {
    id: 12,
    label: 'Legal only',
    props: { brand: 'LEGAL', legal: 'All rights reserved. Basalt Shelf Floor demo.' },
  },
  {
    id: 13,
    label: 'Short brand',
    props: { brand: 'B', links: DEFAULT_LINKS },
  },
  {
    id: 14,
    label: 'Two-char brand',
    props: { brand: 'BS', links: DEFAULT_LINKS, tagline: 'Minimal crest.' },
  },
  {
    id: 15,
    label: 'No legal',
    props: { brand: 'PLAIN', links: DEFAULT_LINKS, tagline: 'No legal line.' },
  },
  {
    id: 16,
    label: 'Long legal',
    props: {
      brand: 'FULL',
      links: DEFAULT_LINKS,
      legal: '© 2026 Basalt Industries Ltd. · Privacy · Terms · Cookies',
    },
  },
  {
    id: 17,
    label: 'Stat tagline',
    props: {
      brand: 'DEPTH',
      tagline: 'Shelf depth: 4 tiers · Basalt density: 2.9 g/cm³',
      links: DEFAULT_LINKS,
    },
  },
  {
    id: 18,
    label: 'Quote tagline',
    props: {
      brand: 'STONE',
      tagline: '"The cliff remembers every shelf it carved." — Geologist proverb',
      links: DEFAULT_LINKS,
    },
  },
  {
    id: 19,
    label: 'External links',
    props: {
      brand: 'LINK',
      links: [
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'Twitter', href: 'https://twitter.com' },
      ],
    },
  },
  {
    id: 20,
    label: 'Full footer',
    props: {
      brand: 'BASALT',
      tagline: 'Full brutalist cliff footer with brand, links, and legal.',
      links: DEFAULT_LINKS,
      legal: '© 2026 Basalt Shelf Floor · All rights reserved',
    },
  },
]
