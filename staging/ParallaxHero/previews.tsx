import type { PreviewVariant } from '../../src/previews/types'
import type { ParallaxHeroProps } from './ParallaxHero'

export const parallaxHeroVariants: PreviewVariant<ParallaxHeroProps>[] = [
  { id: 1, label: 'Headline only', props: { title: 'Ship faster' } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      title: 'Ship faster',
      subtitle: 'Bold hero copy with supporting sentence for product landing pages.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      title:
        'Design systems that scale across every breakpoint without sacrificing personality or performance',
      subtitle: 'Tests wrapping at md and lg breakpoints.',
    },
  },
  {
    id: 4,
    label: 'Minimal single word title',
    props: { title: 'Evolve', eyebrow: 'Studio' },
  },
  {
    id: 5,
    label: 'Short subtext',
    props: { title: 'Launch week', subtitle: 'Now live.' },
  },
  {
    id: 6,
    label: 'Long subtext block',
    props: {
      title: 'Infrastructure for creatives',
      subtitle:
        'We help teams publish cinematic landing pages, docs, and dashboards with a shared component language. This variant stress-tests paragraph length in the hero body slot.',
    },
  },
  { id: 7, label: 'No subtitle (empty)', props: { title: 'No body copy', subtitle: undefined } },
  {
    id: 8,
    label: 'Eyebrow + headline',
    props: { eyebrow: 'New release', title: 'Version 2.0', subtitle: 'Available today.' },
  },
  {
    id: 9,
    label: 'Long eyebrow',
    props: {
      eyebrow: 'Enterprise ready · SOC2 · GDPR',
      title: 'Trust at scale',
      subtitle: 'Security-first defaults.',
    },
  },
  {
    id: 10,
    label: 'Custom CTA label',
    props: { title: 'Start building', subtitle: 'Free tier available.', ctaLabel: 'Get API key' },
  },
  {
    id: 11,
    label: 'No CTA label override',
    props: { title: 'Default CTA', subtitle: 'Uses default button copy.' },
  },
  {
    id: 12,
    label: 'Emoji headline',
    props: { title: '⚡ Edge-first delivery', subtitle: 'Global POP network.' },
  },
  {
    id: 13,
    label: 'Numeric headline',
    props: { title: '99.99%', subtitle: 'Uptime last quarter.' },
  },
  {
    id: 14,
    label: 'Monospace tone title',
    props: { title: 'git push origin main', subtitle: 'Deploy in seconds.' },
  },
  {
    id: 15,
    label: 'All caps headline',
    props: { title: 'BREAK THROUGH NOISE', subtitle: 'Campaign landing pattern.' },
  },
  {
    id: 16,
    label: 'Question headline',
    props: { title: 'Ready to evolve?', subtitle: 'Pick your components.' },
  },
  {
    id: 17,
    label: 'Two-line title feel',
    props: { title: 'Build bold.\nShip fast.', subtitle: 'Newline in string (plain text).' },
  },
  {
    id: 18,
    label: 'German copy',
    props: { title: 'Webkomponenten neu gedacht', subtitle: 'Mutige Layouts für moderne Sites.' },
  },
  {
    id: 19,
    label: 'Japanese copy',
    props: { title: '大胆なヒーロー', subtitle: 'レスポンシブ対応のデモ。' },
  },
  {
    id: 20,
    label: 'Max density hero',
    props: {
      eyebrow: 'Case study',
      title: 'How we rebuilt evolved-web in one session',
      subtitle: 'Parallax, marquee, skeleton, payload, and snap deck — all from five random words.',
      ctaLabel: 'Read the skill',
    },
  },
]
