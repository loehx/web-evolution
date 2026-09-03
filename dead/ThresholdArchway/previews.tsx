import type { PreviewVariant } from '../../src/previews/types'
import type { ThresholdArchwayProps } from './ThresholdArchway'

const defaultLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Contact', href: '#contact' },
  { label: 'Archive', href: '#archive' },
]

export const thresholdArchwayVariants: PreviewVariant<ThresholdArchwayProps>[] = [
  { id: 1, label: 'Brand only', props: { brand: 'Threshold' } },
  {
    id: 2,
    label: 'Brand + tagline',
    props: { brand: 'Threshold', tagline: 'Walk through to what comes next.' },
  },
  {
    id: 3,
    label: 'Very long brand',
    props: { brand: 'Archipelago Studio Collective', tagline: 'Long keystone wrap.' },
  },
  { id: 4, label: 'Empty brand', props: { brand: '', tagline: 'Missing brand test.' } },
  {
    id: 5,
    label: 'Short tagline',
    props: { brand: 'Stone', tagline: 'Go.' },
  },
  {
    id: 6,
    label: 'Long tagline',
    props: {
      brand: 'Keystone',
      tagline:
        'A footer shaped like a limestone arch — links carved into the voussoir blocks, legal type along the footing.',
    },
  },
  { id: 7, label: 'Empty tagline', props: { brand: 'Arch', links: defaultLinks } },
  {
    id: 8,
    label: 'Four links',
    props: { brand: 'Threshold', links: defaultLinks },
  },
  {
    id: 9,
    label: 'Two links',
    props: {
      brand: 'Gate',
      links: [
        { label: 'Privacy', href: '#privacy' },
        { label: 'Terms', href: '#terms' },
      ],
    },
  },
  {
    id: 10,
    label: 'Many links',
    props: {
      brand: 'Forum',
      links: [
        { label: 'Work', href: '#1' },
        { label: 'People', href: '#2' },
        { label: 'News', href: '#3' },
        { label: 'Jobs', href: '#4' },
        { label: 'Legal', href: '#5' },
        { label: 'Cookies', href: '#6' },
      ],
    },
  },
  {
    id: 11,
    label: 'No links',
    props: { brand: 'Monolith', tagline: 'End of page.', legal: '© 2026' },
  },
  {
    id: 12,
    label: 'Legal line',
    props: {
      brand: 'Threshold',
      links: defaultLinks.slice(0, 3),
      legal: '© 2026 Threshold Studio — All rights reserved',
    },
  },
  {
    id: 13,
    label: 'Long legal',
    props: {
      brand: 'Arch',
      legal: 'Registered in Oregon. Built with care. No cookies without consent.',
    },
  },
  {
    id: 14,
    label: 'Single link',
    props: {
      brand: 'Exit',
      links: [{ label: 'Home', href: '/' }],
    },
  },
  {
    id: 15,
    label: 'External links',
    props: {
      brand: 'Portal',
      links: [
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'Are.na', href: 'https://are.na' },
      ],
    },
  },
  {
    id: 16,
    label: 'Long link labels',
    props: {
      brand: 'Passage',
      links: [
        { label: 'Sustainability report', href: '#esg' },
        { label: 'Accessibility statement', href: '#a11y' },
      ],
    },
  },
  {
    id: 17,
    label: 'Minimal legal',
    props: { brand: '—', legal: '© 2026' },
  },
  {
    id: 18,
    label: 'Tagline + legal only',
    props: {
      brand: 'Lintel',
      tagline: 'Thanks for visiting.',
      legal: 'Made in Portland',
    },
  },
  {
    id: 19,
    label: 'One-word brand',
    props: { brand: 'Arc', links: defaultLinks, legal: '©' },
  },
  {
    id: 20,
    label: 'Full footer stack',
    props: {
      brand: 'Threshold',
      tagline: 'Design that holds the weight.',
      links: defaultLinks,
      legal: '© 2026 Threshold Studio',
    },
  },
]
