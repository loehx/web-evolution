import type { PreviewVariant } from '../../src/previews/types'
import type { StatsCounterRowProps } from './StatsCounterRow'

export const statsCounterRowVariants: PreviewVariant<StatsCounterRowProps>[] = [
  {
    id: 1,
    label: 'Three stats no headline',
    props: {
      stats: [
        { value: '10K+', label: 'Active users' },
        { value: '99.9%', label: 'Uptime' },
        { value: '4.9', label: 'App store rating', suffix: '★' },
      ],
    },
  },
  {
    id: 2,
    label: 'Eyebrow + headline + four stats bordered',
    props: {
      eyebrow: 'By the numbers',
      headlineLines: ['Trusted', 'worldwide'],
      variant: 'bordered',
      stats: [
        { value: '2M', label: 'Downloads' },
        { value: '150', label: 'Countries' },
        { value: '500+', label: 'Team members' },
        { value: '24/7', label: 'Support' },
      ],
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      headlineLines: ['Impact that speaks', 'for itself across every metric'],
      stats: [
        { value: '85%', label: 'Faster shipping' },
        { value: '3×', label: 'Conversion lift' },
      ],
    },
  },
  {
    id: 4,
    label: 'Missing headline',
    props: {
      eyebrow: '2026',
      stats: [{ value: '$12M', label: 'ARR' }],
    },
  },
  {
    id: 5,
    label: 'Single stat',
    props: {
      stats: [{ value: '1', label: 'Obsessive focus' }],
    },
  },
  {
    id: 6,
    label: 'Two stats glow variant',
    props: {
      headlineLines: ['Growing fast'],
      variant: 'glow',
      stats: [
        { value: '400%', label: 'YoY growth' },
        { value: '50K', label: 'Newsletter subs' },
      ],
    },
  },
  {
    id: 7,
    label: 'Empty stats',
    props: {
      headlineLines: ['Coming soon'],
      stats: [],
    },
  },
  {
    id: 8,
    label: 'Suffix on values',
    props: {
      stats: [
        { value: '98', label: 'NPS score', suffix: '+' },
        { value: '12', label: 'Awards', suffix: '🏆' },
        { value: '0', label: 'Downtime days' },
      ],
    },
  },
  {
    id: 9,
    label: 'Four default stats',
    props: {
      stats: [
        { value: '8', label: 'Years' },
        { value: '120', label: 'Clients' },
        { value: '1.2B', label: 'Requests/mo' },
        { value: '45ms', label: 'P95 latency' },
      ],
    },
  },
  {
    id: 10,
    label: 'Long labels',
    props: {
      stats: [
        { value: '67%', label: 'Reduction in support tickets' },
        { value: '14', label: 'Days average time to value' },
      ],
    },
  },
  {
    id: 11,
    label: 'Eyebrow only',
    props: {
      eyebrow: 'Live stats',
      stats: [{ value: '3,421', label: 'Online now' }],
    },
  },
  {
    id: 12,
    label: 'Unicode values',
    props: {
      stats: [
        { value: '€2.4M', label: 'Fundraised' },
        { value: '∞', label: 'Possibilities' },
      ],
    },
  },
  {
    id: 13,
    label: 'Very large numbers',
    props: {
      headlineLines: ['Scale'],
      stats: [
        { value: '1.5B', label: 'Page views' },
        { value: '320M', label: 'API calls' },
      ],
    },
  },
  {
    id: 14,
    label: 'Small numbers',
    props: {
      stats: [
        { value: '3', label: 'Founders' },
        { value: '7', label: 'Dog years of experience' },
      ],
    },
  },
  {
    id: 15,
    label: 'Bordered single stat',
    props: {
      variant: 'bordered',
      stats: [{ value: '100%', label: 'Remote team' }],
    },
  },
  {
    id: 16,
    label: 'Glow three stats',
    props: {
      eyebrow: 'Launch week',
      variant: 'glow',
      stats: [
        { value: '5', label: 'New components' },
        { value: '100', label: 'Preview variants' },
        { value: '1', label: 'Happy king' },
      ],
    },
  },
  {
    id: 17,
    label: 'Percent heavy',
    props: {
      stats: [
        { value: '92%', label: 'Would recommend' },
        { value: '78%', label: 'Repeat customers' },
        { value: '64%', label: 'Mobile traffic' },
      ],
    },
  },
  {
    id: 18,
    label: 'Time-based stats',
    props: {
      stats: [
        { value: '<2min', label: 'Setup time' },
        { value: '48h', label: 'Avg response' },
      ],
    },
  },
  {
    id: 19,
    label: 'Five stats wraps to grid',
    props: {
      stats: [
        { value: 'A', label: 'One' },
        { value: 'B', label: 'Two' },
        { value: 'C', label: 'Three' },
        { value: 'D', label: 'Four' },
        { value: 'E', label: 'Five' },
      ],
    },
  },
  {
    id: 20,
    label: 'Headline centered full set',
    props: {
      eyebrow: 'Social proof',
      headlineLines: ['Numbers', 'do not lie'],
      variant: 'bordered',
      stats: [
        { value: '4.8', label: 'G2 rating', suffix: '/5' },
        { value: '2,400', label: 'Reviews' },
        { value: '98%', label: 'Satisfaction' },
      ],
    },
  },
]
