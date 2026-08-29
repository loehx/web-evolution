import type { PreviewVariant } from '../../src/previews/types'
import type { PromontoryCrestFloorProps } from './PromontoryCrestFloor'

const DEFAULT_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const promontoryCrestFloorVariants: PreviewVariant<PromontoryCrestFloorProps>[] = [
  { id: 1, label: 'Brand only', props: { brand: 'PROMONTORY' } },
  {
    id: 2,
    label: 'Brand + tagline',
    props: {
      brand: 'PROMONTORY',
      tagline: 'Navigation links descend cliff shelf tiers from the highest crest into mist.',
    },
  },
  { id: 3, label: 'Very long brand', props: { brand: 'PROMONTORYCREST', tagline: 'Long brand on highest cliff.' } },
  { id: 4, label: 'Brand + links', props: { brand: 'CREST', links: DEFAULT_LINKS } },
  {
    id: 5,
    label: 'Brand + links + legal',
    props: {
      brand: 'CLIFF',
      links: DEFAULT_LINKS,
      legal: '© 2026 Promontory Crest Floor',
    },
  },
  {
    id: 6,
    label: 'Long tagline',
    props: {
      brand: 'LEDGE',
      tagline:
        'An editorial cliff footer where each navigation link sits on a descending promontory shelf tier fading into mist below the brand stamp.',
      links: DEFAULT_LINKS,
    },
  },
  { id: 7, label: 'Empty tagline', props: { brand: 'ROCK', links: DEFAULT_LINKS } },
  { id: 8, label: 'Single link', props: { brand: 'ONE', links: [{ label: 'Home', href: '/' }] } },
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
    props: { brand: 'LEGAL', legal: 'All rights reserved. Promontory Crest Floor demo.' },
  },
  { id: 13, label: 'Short brand', props: { brand: 'P', links: DEFAULT_LINKS } },
  { id: 14, label: 'Two-char brand', props: { brand: 'PC', links: DEFAULT_LINKS, tagline: 'Minimal crest.' } },
  { id: 15, label: 'No legal', props: { brand: 'PLAIN', links: DEFAULT_LINKS, tagline: 'No legal line.' } },
  {
    id: 16,
    label: 'Six links',
    props: {
      brand: 'SIX',
      links: [
        { label: 'Work', href: '#work' },
        { label: 'About', href: '#about' },
        { label: 'Blog', href: '#blog' },
        { label: 'Docs', href: '#docs' },
        { label: 'Careers', href: '#careers' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  },
  {
    id: 17,
    label: 'Quote tagline',
    props: {
      brand: 'MIST',
      tagline: '"From the highest crest, every path descends toward the sea."',
      links: DEFAULT_LINKS,
    },
  },
  {
    id: 18,
    label: 'Stat tagline',
    props: {
      brand: '340m',
      tagline: 'Elevation of the promontory crest above sea level.',
      links: DEFAULT_LINKS,
    },
  },
  {
    id: 19,
    label: 'Two links',
    props: {
      brand: 'PAIR',
      links: [
        { label: 'Studio', href: '#studio' },
        { label: 'Press', href: '#press' },
      ],
    },
  },
  {
    id: 20,
    label: 'Full footer',
    props: {
      brand: 'PROMONTORY',
      tagline: 'Cliff shelf navigation from the highest crest.',
      links: DEFAULT_LINKS,
      legal: '© 2026 Promontory Crest Floor — all ledges reserved.',
    },
  },
]
