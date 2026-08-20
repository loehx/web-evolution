import type { PreviewVariant } from '../../src/previews/types'
import type { TerminusLedgerFloorProps } from './TerminusLedgerFloor'

const links3 = [
  { label: 'Archive', href: '#archive' },
  { label: 'Studio', href: '#studio' },
  { label: 'Contact', href: '#contact' },
]

export const terminusLedgerFloorVariants: PreviewVariant<TerminusLedgerFloorProps>[] = [
  { id: 1, label: 'Brand only', props: { brand: 'Hall' } },
  {
    id: 2,
    label: 'Brand + tagline',
    props: { brand: 'Hall', tagline: 'Terminus of the scroll.' },
  },
  {
    id: 3,
    label: 'Very long brand',
    props: { brand: 'Northjettyatelier', tagline: 'Wraps inside stamp.' },
  },
  { id: 4, label: 'Empty brand', props: { brand: '', tagline: 'Missing stamp text.' } },
  {
    id: 5,
    label: 'Short tagline',
    props: { brand: 'Hall', tagline: 'End.' },
  },
  {
    id: 6,
    label: 'Long tagline',
    props: {
      brand: 'Hall',
      tagline:
        'A footer that reads like the last page of a ledger — ruled lines, wax stamp, marginalia links.',
    },
  },
  { id: 7, label: 'Three links', props: { brand: 'Hall', links: links3 } },
  {
    id: 8,
    label: 'Links + legal',
    props: { brand: 'Hall', links: links3, legal: '© 2026 Hall Ledger' },
  },
  {
    id: 9,
    label: 'One link',
    props: {
      brand: 'Hall',
      links: [{ label: 'Email', href: 'mailto:hi@example.com' }],
    },
  },
  { id: 10, label: 'No links', props: { brand: 'Hall', legal: 'Stamp only.' } },
  {
    id: 11,
    label: 'Many links',
    props: {
      brand: 'Hall',
      links: [
        { label: 'Work', href: '#work' },
        { label: 'Studio', href: '#studio' },
        { label: 'Notes', href: '#notes' },
        { label: 'Press', href: '#press' },
        { label: 'Careers', href: '#jobs' },
        { label: 'Terms', href: '#terms' },
      ],
    },
  },
  {
    id: 12,
    label: 'Long link labels',
    props: {
      brand: 'Hall',
      links: [
        { label: 'Everything we published this decade', href: '#decade' },
        { label: 'Visit the physical studio', href: '#visit' },
      ],
    },
  },
  {
    id: 13,
    label: 'Legal only',
    props: { brand: 'Hall', legal: 'VAT DE 000 000 · Berlin' },
  },
  {
    id: 14,
    label: 'Long legal',
    props: {
      brand: 'Hall',
      legal:
        '© 2026 Hall. Ledger terminus. All entries final. Do not scrape. Do not train. This is not a default footer.',
    },
  },
  { id: 15, label: 'No legal', props: { brand: 'Hall', links: links3, tagline: 'Unsigned page.' } },
  {
    id: 16,
    label: 'German copy',
    props: {
      brand: 'Halle',
      tagline: 'Ende des Buches.',
      links: [
        { label: 'Archiv', href: '#archiv' },
        { label: 'Kontakt', href: '#kontakt' },
      ],
      legal: '© 2026 Halle',
    },
  },
  {
    id: 17,
    label: 'Few rules',
    props: { brand: 'Min', ruleCount: 6, tagline: 'Sparse ledger.' },
  },
  {
    id: 18,
    label: 'Many rules',
    props: { brand: 'Max', ruleCount: 18, tagline: 'Dense ruled field.' },
  },
  {
    id: 19,
    label: 'Studio brand',
    props: {
      brand: 'Atelier',
      tagline: 'Paper first.',
      links: links3,
      legal: 'Est. 2012',
    },
  },
  {
    id: 20,
    label: 'Product brand',
    props: {
      brand: 'Forge',
      tagline: 'Tools that leave a mark.',
      links: [{ label: 'Catalog', href: '#catalog' }],
      legal: '© 2026 Forge Tools',
    },
  },
]
