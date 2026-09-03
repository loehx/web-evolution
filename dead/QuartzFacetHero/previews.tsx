import type { PreviewVariant } from '../../src/previews/types'
import type { QuartzFacetHeroProps } from './QuartzFacetHero'

export const quartzFacetHeroVariants: PreviewVariant<QuartzFacetHeroProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Quartz'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Crystal',
      titleLines: ['Facet', 'light'],
      subtitle: 'Luxury polar hero with grabable quartz octahedron casting spectral reflections.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Every facet refracts a different wavelength of frozen light'],
      subtitle: 'Long headline wraps inside SVG lines.',
    },
  },
  { id: 4, label: 'Missing headline fallback', props: { titleLines: [], subtitle: 'Empty title falls back.' } },
  {
    id: 5,
    label: 'Short subtitle',
    props: { titleLines: ['Ice'], subtitle: 'Brief copy.' },
  },
  {
    id: 6,
    label: 'Long subtitle',
    props: {
      eyebrow: 'Quartz',
      titleLines: ['Frozen', 'field'],
      subtitle:
        'The crystal is not decoration — it is the focal object. Copy anchors the frozen ground line while pointer orbit lets you inspect every facet. Mobile stacks copy above the crystal stage; desktop places them side by side.',
    },
  },
  { id: 7, label: 'Empty subtitle', props: { titleLines: ['Facet only'], eyebrow: 'Crystal' } },
  {
    id: 8,
    label: 'No CTA',
    props: {
      titleLines: ['Read', 'on'],
      subtitle: 'No button — crystal only.',
    },
  },
  {
    id: 9,
    label: 'Single CTA',
    props: {
      titleLines: ['Explore'],
      subtitle: 'One primary action.',
      ctaLabel: 'Inspect facets',
      ctaHref: '#facets',
    },
  },
  {
    id: 10,
    label: 'Dual CTA disabled',
    props: {
      titleLines: ['Locked'],
      subtitle: 'Disabled CTA state.',
      ctaLabel: 'Unavailable',
      ctaDisabled: true,
    },
  },
  {
    id: 11,
    label: 'Eyebrow only',
    props: { eyebrow: 'Chapter I', titleLines: ['The quartz'] },
  },
  {
    id: 12,
    label: 'Stat in subtitle',
    props: {
      titleLines: ['7.5 Mohs'],
      subtitle: 'Hardness rating for crystalline silica — harder than glass, softer than topaz.',
    },
  },
  {
    id: 13,
    label: 'Quote in subtitle',
    props: {
      titleLines: ['Clear'],
      subtitle: '"In quartz, clarity is not absence — it is structure." — Mineralogist proverb',
    },
  },
  {
    id: 14,
    label: 'Code in subtitle',
    props: {
      titleLines: ['SiO₂'],
      subtitle: 'const facet = quartz.refract({ wavelength: 580, angle: rotation.y })',
    },
  },
  {
    id: 15,
    label: 'No eyebrow',
    props: {
      titleLines: ['Plain', 'crystal'],
      subtitle: 'Eyebrow omitted.',
    },
  },
  {
    id: 16,
    label: 'Two-line headline',
    props: {
      eyebrow: 'Polar',
      titleLines: ['Ice', 'crown'],
      subtitle: 'Two-line SVG headline.',
      ctaLabel: 'Orbit',
      ctaHref: '#orbit',
    },
  },
  {
    id: 17,
    label: 'Three-line headline',
    props: {
      titleLines: ['Frozen', 'facet', 'field'],
      subtitle: 'Three stacked headline lines.',
    },
  },
  {
    id: 18,
    label: 'Marketing block',
    props: {
      eyebrow: 'Quartz Facet',
      titleLines: ['Bold', 'crystal'],
      subtitle: 'Full marketing hero with eyebrow, subtitle, and CTA.',
      ctaLabel: 'Begin',
      ctaHref: '#begin',
    },
  },
  {
    id: 19,
    label: 'Minimal',
    props: { titleLines: ['Q'] },
  },
  {
    id: 20,
    label: 'Full hero',
    props: {
      eyebrow: 'Luxury mineral',
      titleLines: ['Quartz', 'facet hero'],
      subtitle: 'Complete hero with all fields populated for review.',
      ctaLabel: 'Start orbit',
      ctaHref: '#start',
    },
  },
]
