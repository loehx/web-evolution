import type { PreviewVariant } from '../../src/previews/types'
import type { FjordMistFloorProps } from './FjordMistFloor'

const DEFAULT_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const fjordMistFloorVariants: PreviewVariant<FjordMistFloorProps>[] = [
  { id: 1, label: 'Brand only', props: { brand: 'FJORD' } },
  {
    id: 2,
    label: 'Brand + tagline',
    props: {
      brand: 'FJORD',
      tagline: 'Navigation links descend on cliff shelves that fade into rising mist.',
    },
  },
  { id: 3, label: 'Very long brand', props: { brand: 'FJORDMIST', tagline: 'Long brand on cliff crest.' } },
  { id: 4, label: 'Brand + links', props: { brand: 'MIST', links: DEFAULT_LINKS } },
  {
    id: 5,
    label: 'Brand + links + legal',
    props: {
      brand: 'CLIFF',
      links: DEFAULT_LINKS,
      legal: '© 2026 Fjord Mist Floor',
    },
  },
  {
    id: 6,
    label: 'Long tagline',
    props: {
      brand: 'NORD',
      tagline:
        'An editorial fjord footer where each navigation link sits on a descending cliff shelf stepping down into rising mist below the brand stamp.',
      links: DEFAULT_LINKS,
    },
  },
  { id: 7, label: 'Empty tagline', props: { brand: 'SLATE', links: DEFAULT_LINKS } },
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
  { id: 10, label: 'No links', props: { brand: 'EMPTY', tagline: 'Crest only, no cliff links.' } },
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
    props: { brand: 'LEGAL', legal: 'All rights reserved. Fjord Mist Floor demo.' },
  },
  { id: 13, label: 'Short brand', props: { brand: 'F', links: DEFAULT_LINKS } },
  { id: 14, label: 'Two-char brand', props: { brand: 'FM', links: DEFAULT_LINKS, tagline: 'Minimal cliff.' } },
  { id: 15, label: 'No legal', props: { brand: 'PLAIN', links: DEFAULT_LINKS, tagline: 'No legal line.' } },
  {
    id: 16,
    label: 'Six links',
    props: {
      brand: 'DEEP',
      links: [
        { label: 'Products', href: '#products' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'About', href: '#about' },
        { label: 'Blog', href: '#blog' },
        { label: 'Careers', href: '#careers' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  },
  {
    id: 17,
    label: 'Quote tagline',
    props: {
      brand: 'NORWAY',
      tagline: '"The fjord remembers every ship that passed." — Coastal proverb',
      links: DEFAULT_LINKS,
    },
  },
  {
    id: 18,
    label: 'Stat tagline',
    props: {
      brand: '1300m',
      tagline: 'Average fjord depth along the western coast.',
      links: DEFAULT_LINKS,
    },
  },
  {
    id: 19,
    label: 'Minimal links',
    props: {
      brand: 'MIN',
      links: [{ label: 'Start', href: '#start' }],
    },
  },
  {
    id: 20,
    label: 'Full footer',
    props: {
      brand: 'FJORD MIST',
      tagline: 'Complete footer with brand, tagline, links, and legal for review.',
      links: DEFAULT_LINKS,
      legal: '© 2026 Fjord Mist Floor — all rights reserved',
    },
  },
]
