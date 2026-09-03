import type { PreviewVariant } from '../../src/previews/types'
import type { BreadcrumbTrailProps } from './BreadcrumbTrail'

export const breadcrumbTrailVariants: PreviewVariant<BreadcrumbTrailProps>[] = [
  {
    id: 1,
    label: 'Three-level marketing path',
    props: {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Analytics Suite' },
      ],
    },
  },
  {
    id: 2,
    label: 'Two levels only',
    props: {
      items: [{ label: 'Blog', href: '/blog' }, { label: 'Latest post' }],
    },
  },
  {
    id: 3,
    label: 'Deep five-level path',
    props: {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Docs', href: '/docs' },
        { label: 'Components', href: '/docs/components' },
        { label: 'Navigation', href: '/docs/components/nav' },
        { label: 'BreadcrumbTrail' },
      ],
    },
  },
  {
    id: 4,
    label: 'Single current page only',
    props: { items: [{ label: 'Dashboard' }] },
  },
  {
    id: 5,
    label: 'Empty items array',
    props: { items: [] },
  },
  {
    id: 6,
    label: 'Chevron separator',
    props: {
      separator: 'chevron',
      items: [
        { label: 'Store', href: '/store' },
        { label: 'Shoes', href: '/store/shoes' },
        { label: 'Running' },
      ],
    },
  },
  {
    id: 7,
    label: 'Dot separator',
    props: {
      separator: 'dot',
      items: [
        { label: 'Settings', href: '/settings' },
        { label: 'Profile', href: '/settings/profile' },
        { label: 'Security' },
      ],
    },
  },
  {
    id: 8,
    label: 'Very long labels',
    props: {
      items: [
        { label: 'Enterprise Resource Planning', href: '/erp' },
        { label: 'Human Capital Management Modules', href: '/erp/hcm' },
        { label: 'Employee Self-Service Portal Configuration' },
      ],
    },
  },
  {
    id: 9,
    label: 'No href on ancestors',
    props: {
      items: [{ label: 'Archive' }, { label: '2024' }, { label: 'August' }],
    },
  },
  {
    id: 10,
    label: 'Numeric segments',
    props: {
      items: [
        { label: 'Order', href: '/orders' },
        { label: '#10482', href: '/orders/10482' },
        { label: 'Shipping' },
      ],
    },
  },
  {
    id: 11,
    label: 'Unicode and emoji',
    props: {
      items: [
        { label: '🏠 Home', href: '/' },
        { label: 'Café ☕', href: '/cafe' },
        { label: 'Résumé' },
      ],
    },
  },
  {
    id: 12,
    label: 'All caps labels',
    props: {
      items: [
        { label: 'HOME', href: '/' },
        { label: 'API', href: '/api' },
        { label: 'REFERENCE' },
      ],
    },
  },
  {
    id: 13,
    label: 'Duplicate label names',
    props: {
      items: [
        { label: 'Projects', href: '/projects' },
        { label: 'Projects', href: '/projects/2' },
        { label: 'Overview' },
      ],
    },
  },
  {
    id: 14,
    label: 'Single character segments',
    props: {
      items: [{ label: 'A', href: '/a' }, { label: 'B', href: '/a/b' }, { label: 'C' }],
    },
  },
  {
    id: 15,
    label: 'Whitespace padded labels',
    props: {
      items: [
        { label: '  Home  ', href: '/' },
        { label: '  About  ', href: '/about' },
        { label: '  Team  ' },
      ],
    },
  },
  {
    id: 16,
    label: 'URL-like segments',
    props: {
      items: [
        { label: 'evolved.dev', href: 'https://evolved.dev' },
        { label: 'staging', href: '/staging' },
        { label: 'preview' },
      ],
    },
  },
  {
    id: 17,
    label: 'Many short crumbs',
    props: {
      items: [
        { label: 'A', href: '/a' },
        { label: 'B', href: '/a/b' },
        { label: 'C', href: '/a/b/c' },
        { label: 'D', href: '/a/b/c/d' },
        { label: 'E', href: '/a/b/c/d/e' },
        { label: 'F' },
      ],
    },
  },
  {
    id: 18,
    label: 'Punctuation in labels',
    props: {
      items: [
        { label: 'Q&A', href: '/qa' },
        { label: 'Pricing — FAQ', href: '/qa/pricing' },
        { label: 'Enterprise?' },
      ],
    },
  },
  {
    id: 19,
    label: 'Mixed href presence',
    props: {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Draft folder' },
        { label: 'Untitled document' },
      ],
    },
  },
  {
    id: 20,
    label: 'Slash separator explicit default',
    props: {
      separator: 'slash',
      items: [
        { label: 'Music', href: '/music' },
        { label: 'Playlists', href: '/music/playlists' },
        { label: 'Focus Flow' },
      ],
    },
  },
]
