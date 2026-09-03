import type { PreviewVariant } from '../../src/previews/types'
import type { DuskSigilFloorProps } from './DuskSigilFloor'

const links3 = [
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Contact', href: '#contact' },
]

const links5 = [
  { label: 'Archive', href: '#archive' },
  { label: 'Journal', href: '#journal' },
  { label: 'Shop', href: '#shop' },
  { label: 'Press', href: '#press' },
  { label: 'Careers', href: '#careers' },
]

export const duskSigilFloorVariants: PreviewVariant<DuskSigilFloorProps>[] = [
  { id: 1, label: 'Brand only', props: { brand: 'Dusk' } },
  {
    id: 2,
    label: 'Brand + tagline',
    props: { brand: 'Dusk', tagline: 'Where the page rests.' },
  },
  {
    id: 3,
    label: 'Very long brand',
    props: { brand: 'Northjettyatelier', tagline: 'Wraps inside sigil.' },
  },
  { id: 4, label: 'Empty brand', props: { brand: '', tagline: 'Missing sigil text.' } },
  {
    id: 5,
    label: 'Short tagline',
    props: { brand: 'Dusk', tagline: 'End.' },
  },
  {
    id: 6,
    label: 'Long tagline',
    props: {
      brand: 'Dusk',
      tagline:
        'A footer that reads like twilight — plum gradient, gold embossed sigil, links orbiting the seal.',
    },
  },
  { id: 7, label: 'Three links', props: { brand: 'Dusk', links: links3 } },
  {
    id: 8,
    label: 'Links + legal',
    props: { brand: 'Dusk', links: links3, legal: '© 2026 Dusk Studio' },
  },
  {
    id: 9,
    label: 'One link',
    props: {
      brand: 'Dusk',
      links: [{ label: 'Email', href: 'mailto:hi@example.com' }],
    },
  },
  { id: 10, label: 'No links', props: { brand: 'Dusk', legal: 'Sigil only.' } },
  {
    id: 11,
    label: 'Five links',
    props: { brand: 'Dusk', links: links5 },
  },
  {
    id: 12,
    label: 'Many links',
    props: {
      brand: 'Dusk',
      links: [
        { label: 'Work', href: '#work' },
        { label: 'Studio', href: '#studio' },
        { label: 'Notes', href: '#notes' },
        { label: 'Shop', href: '#shop' },
        { label: 'Press', href: '#press' },
        { label: 'Legal', href: '#legal' },
      ],
    },
  },
  {
    id: 13,
    label: 'Long link labels',
    props: {
      brand: 'Dusk',
      links: [
        { label: 'Privacy policy', href: '#privacy' },
        { label: 'Terms of service', href: '#terms' },
      ],
    },
  },
  {
    id: 14,
    label: 'Legal only',
    props: { brand: 'Dusk', legal: 'All rights reserved.' },
  },
  {
    id: 15,
    label: 'Tagline + links no legal',
    props: {
      brand: 'Hall',
      tagline: 'Twilight terminus.',
      links: links3,
    },
  },
  {
    id: 16,
    label: 'Single word brand',
    props: { brand: 'Seal', links: links3, legal: '© Seal' },
  },
  {
    id: 17,
    label: 'Two links',
    props: {
      brand: 'Dusk',
      links: [
        { label: 'Instagram', href: '#ig' },
        { label: 'LinkedIn', href: '#li' },
      ],
    },
  },
  {
    id: 18,
    label: 'Full footer stack',
    props: {
      brand: 'Dusk',
      tagline: 'The scroll ends here.',
      links: links5,
      legal: '© 2026 Dusk Studio · Crafted with care',
    },
  },
  {
    id: 19,
    label: 'Minimal legal',
    props: {
      brand: '—',
      legal: 'End',
    },
  },
  {
    id: 20,
    label: 'Studio footer',
    props: {
      brand: 'Atelier',
      tagline: 'Design systems for bold stages.',
      links: [
        { label: 'Work', href: '#work' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
      ],
      legal: '© 2026 Atelier',
    },
  },
]
