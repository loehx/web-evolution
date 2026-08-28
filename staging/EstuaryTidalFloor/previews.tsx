import type { PreviewVariant } from '../../src/previews/types'
import type { EstuaryTidalFloorProps } from './EstuaryTidalFloor'

const DEFAULT_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const estuaryTidalFloorVariants: PreviewVariant<EstuaryTidalFloorProps>[] = [
  { id: 1, label: 'Brand only', props: { brand: 'ESTUARY' } },
  {
    id: 2,
    label: 'Brand + tagline',
    props: {
      brand: 'ESTUARY',
      tagline: 'Navigation links branch down tidal sandbars into the estuary mist.',
    },
  },
  { id: 3, label: 'Very long brand', props: { brand: 'ESTUARYTIDAL', tagline: 'Long brand on highest sandbar.' } },
  { id: 4, label: 'Brand + links', props: { brand: 'TIDAL', links: DEFAULT_LINKS } },
  {
    id: 5,
    label: 'Brand + links + legal',
    props: {
      brand: 'DELTA',
      links: DEFAULT_LINKS,
      legal: '© 2026 Estuary Tidal Floor',
    },
  },
  {
    id: 6,
    label: 'Long tagline',
    props: {
      brand: 'CHANNEL',
      tagline:
        'An editorial estuary footer where each navigation link sits on a branching tidal sandbar descending into mist below the brand stamp.',
      links: DEFAULT_LINKS,
    },
  },
  { id: 7, label: 'Empty tagline', props: { brand: 'MUD', links: DEFAULT_LINKS } },
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
  { id: 10, label: 'No links', props: { brand: 'EMPTY', tagline: 'Sandbar only, no channel links.' } },
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
    props: { brand: 'LEGAL', legal: 'All rights reserved. Estuary Tidal Floor demo.' },
  },
  { id: 13, label: 'Short brand', props: { brand: 'E', links: DEFAULT_LINKS } },
  { id: 14, label: 'Two-char brand', props: { brand: 'ET', links: DEFAULT_LINKS, tagline: 'Minimal delta.' } },
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
      tagline: '"Where river meets sea, paths branch like water."',
      links: DEFAULT_LINKS,
    },
  },
  {
    id: 18,
    label: 'Stat tagline',
    props: {
      brand: '12km',
      tagline: 'Length of the estuary delta channel system.',
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
      brand: 'ESTUARY',
      tagline: 'Tidal navigation on branching sandbars.',
      links: DEFAULT_LINKS,
      legal: '© 2026 Estuary Tidal Floor — all channels reserved.',
    },
  },
]
