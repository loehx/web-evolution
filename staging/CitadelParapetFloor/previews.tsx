import type { PreviewVariant } from '../../src/previews/types'
import type { CitadelParapetFloorProps } from './CitadelParapetFloor'

const DEFAULT_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const citadelParapetFloorVariants: PreviewVariant<CitadelParapetFloorProps>[] = [
  { id: 1, label: 'Brand only', props: { brand: 'CITADEL' } },
  {
    id: 2,
    label: 'Brand + tagline',
    props: {
      brand: 'CITADEL',
      tagline: 'Navigation links descend rampart shelf tiers from the highest parapet into mist.',
    },
  },
  { id: 3, label: 'Very long brand', props: { brand: 'CITADELPARAPET', tagline: 'Long brand on highest parapet.' } },
  { id: 4, label: 'Brand + links', props: { brand: 'RAMPART', links: DEFAULT_LINKS } },
  {
    id: 5,
    label: 'Brand + links + legal',
    props: {
      brand: 'BASTION',
      links: DEFAULT_LINKS,
      legal: '© 2026 Citadel Parapet Floor',
    },
  },
  {
    id: 6,
    label: 'Long tagline',
    props: {
      brand: 'KEEP',
      tagline:
        'An editorial castle footer where each navigation link sits on a descending stone rampart tier fading into mist below the gold crest.',
      links: DEFAULT_LINKS,
    },
  },
  { id: 7, label: 'Empty tagline', props: { brand: 'STONE', links: DEFAULT_LINKS } },
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
  { id: 10, label: 'No links', props: { brand: 'EMPTY', tagline: 'Parapet only, no rampart links.' } },
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
    props: { brand: 'LEGAL', legal: 'All rights reserved. Citadel Parapet Floor demo.' },
  },
  { id: 13, label: 'Short brand', props: { brand: 'C', links: DEFAULT_LINKS } },
  { id: 14, label: 'Two-char brand', props: { brand: 'CP', links: DEFAULT_LINKS, tagline: 'Minimal parapet.' } },
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
        { label: 'Careers', href: '#careers' },
        { label: 'Press', href: '#press' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  },
  {
    id: 17,
    label: 'Stat in tagline',
    props: {
      brand: 'KEEP',
      tagline: 'Founded 1247 — guarding the northern pass for seven centuries.',
      links: DEFAULT_LINKS,
    },
  },
  {
    id: 18,
    label: 'Quote in tagline',
    props: {
      brand: 'WALL',
      tagline: '"Every stone remembers the siege it survived." — Castle chronicler',
      links: DEFAULT_LINKS,
    },
  },
  {
    id: 19,
    label: 'Two links',
    props: {
      brand: 'DUO',
      links: [
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Contact', href: '#contact' },
      ],
      tagline: 'Minimal rampart pair.',
    },
  },
  {
    id: 20,
    label: 'Full footer',
    props: {
      brand: 'CITADEL',
      tagline: 'Complete parapet footer with crest, links, and legal.',
      links: DEFAULT_LINKS,
      legal: '© 2026 Citadel Parapet Floor — all ramparts reserved.',
    },
  },
]
