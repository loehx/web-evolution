import type { PreviewVariant } from '../../src/previews/types'
import type { ColophonFloorProps } from './ColophonFloor'

const links3 = [
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Index', href: '#index' },
]

export const colophonFloorVariants: PreviewVariant<ColophonFloorProps>[] = [
  { id: 1, label: 'Brand only', props: { brand: 'Hall' } },
  {
    id: 2,
    label: 'Brand + tagline',
    props: { brand: 'Hall', tagline: 'End of the page. Still a room.' },
  },
  {
    id: 3,
    label: 'Very long brand',
    props: { brand: 'Northjettyatelier', tagline: 'Wraps as a floorboard.' },
  },
  { id: 4, label: 'Empty brand', props: { brand: '', tagline: 'Brand missing.' } },
  {
    id: 5,
    label: 'Short tagline',
    props: { brand: 'Hall', tagline: 'Bye.' },
  },
  {
    id: 6,
    label: 'Long tagline',
    props: {
      brand: 'Hall',
      tagline:
        'A footer that refuses to collapse into four columns of sitemap chrome. The name is the floor. The links are stones.',
    },
  },
  { id: 7, label: 'No tagline', props: { brand: 'Hall', links: links3 } },
  {
    id: 8,
    label: 'Three links',
    props: { brand: 'Hall', links: links3, legal: '© 2026 Hall' },
  },
  {
    id: 9,
    label: 'One link',
    props: { brand: 'Hall', links: [{ label: 'Email', href: 'mailto:hi@example.com' }] },
  },
  { id: 10, label: 'No links', props: { brand: 'Hall', legal: 'No map. Just the floor.' } },
  {
    id: 11,
    label: 'Many links',
    props: {
      brand: 'Hall',
      links: [
        { label: 'Work', href: '#work' },
        { label: 'Studio', href: '#studio' },
        { label: 'Index', href: '#index' },
        { label: 'Notes', href: '#notes' },
        { label: 'Press', href: '#press' },
        { label: 'Careers', href: '#jobs' },
      ],
    },
  },
  {
    id: 12,
    label: 'Long link labels',
    props: {
      brand: 'Hall',
      links: [
        { label: 'Everything we made this decade', href: '#decade' },
        { label: 'Visit the physical room', href: '#visit' },
      ],
    },
  },
  {
    id: 13,
    label: 'Legal only extra',
    props: { brand: 'Hall', legal: 'VAT 000 000 000 · Berlin' },
  },
  {
    id: 14,
    label: 'Long legal',
    props: {
      brand: 'Hall',
      legal:
        '© 2026 Hall. All photographs remain with their makers. Do not scrape. Do not train. Do not pretend this was a default footer.',
    },
  },
  {
    id: 15,
    label: 'No legal',
    props: { brand: 'Hall', links: links3, tagline: 'Unsigned horizon.' },
  },
  {
    id: 16,
    label: 'German copy',
    props: {
      brand: 'Halle',
      tagline: 'Ende der Seite.',
      links: [
        { label: 'Arbeit', href: '#arbeit' },
        { label: 'Atelier', href: '#atelier' },
      ],
      legal: '© 2026 Halle',
    },
  },
  {
    id: 17,
    label: 'Single glyph brand',
    props: { brand: 'H', links: links3, legal: '©' },
  },
  {
    id: 18,
    label: 'Numeric brand',
    props: { brand: '2026', tagline: 'Year as floor.' },
  },
  {
    id: 19,
    label: 'Mailto + external',
    props: {
      brand: 'Hall',
      links: [
        { label: 'Mail', href: 'mailto:hi@example.com' },
        { label: 'Are.na', href: 'https://example.com' },
      ],
    },
  },
  {
    id: 20,
    label: 'Dense colophon',
    props: {
      brand: 'Hall',
      tagline: 'Leave through the floor.',
      links: links3,
      legal: '© 2026 Hall · Imprint · Privacy',
    },
  },
]
