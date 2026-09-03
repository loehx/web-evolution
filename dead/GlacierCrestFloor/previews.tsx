import type { PreviewVariant } from '../../src/previews/types'
import type { GlacierCrestFloorProps } from './GlacierCrestFloor'

const DEFAULT_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const glacierCrestFloorVariants: PreviewVariant<GlacierCrestFloorProps>[] = [
  { id: 1, label: 'Brand only', props: { brand: 'GLACIER' } },
  {
    id: 2,
    label: 'Brand + tagline',
    props: {
      brand: 'GLACIER',
      tagline: 'Navigation links descend on ice shelf slabs below the crystalline crest.',
    },
  },
  {
    id: 3,
    label: 'Very long brand',
    props: { brand: 'GLACIERCREST', tagline: 'Long brand name on ice crest.' },
  },
  {
    id: 4,
    label: 'Brand + links',
    props: { brand: 'FROST', links: DEFAULT_LINKS },
  },
  {
    id: 5,
    label: 'Brand + links + legal',
    props: {
      brand: 'CREST',
      links: DEFAULT_LINKS,
      legal: '© 2026 Glacier Crest Floor',
    },
  },
  {
    id: 6,
    label: 'Long tagline',
    props: {
      brand: 'ICE',
      tagline:
        'A luxury glacier footer where each navigation link sits on a descending ice shelf slab stepping down from the crystalline crest where the brand stamp lives.',
      links: DEFAULT_LINKS,
    },
  },
  { id: 7, label: 'Empty tagline', props: { brand: 'BLUE', links: DEFAULT_LINKS } },
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
    props: { brand: 'LEGAL', legal: 'All rights reserved. Glacier Crest Floor demo.' },
  },
  {
    id: 13,
    label: 'Short brand',
    props: { brand: 'G', links: DEFAULT_LINKS },
  },
  {
    id: 14,
    label: 'Two-char brand',
    props: { brand: 'GC', links: DEFAULT_LINKS, tagline: 'Minimal crest.' },
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
      legal: '© 2026 Glacier Industries Ltd. · Privacy · Terms · Cookies',
    },
  },
  {
    id: 17,
    label: 'Stat tagline',
    props: {
      brand: 'DEPTH',
      tagline: 'Ice shelf depth: 4 tiers · Glacier density: 0.92 g/cm³',
      links: DEFAULT_LINKS,
    },
  },
  {
    id: 18,
    label: 'Quote tagline',
    props: {
      brand: 'FROST',
      tagline: '"The glacier remembers every season it survived." — Glaciologist proverb',
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
      brand: 'GLACIER',
      tagline: 'Full luxury glacier footer with brand, links, and legal.',
      links: DEFAULT_LINKS,
      legal: '© 2026 Glacier Crest Floor · All rights reserved',
    },
  },
]
