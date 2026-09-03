import type { PreviewVariant } from '../../src/previews/types'
import type { StrataScrollSplitProps } from './StrataScrollSplit'

const imgWide = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&h=875&fit=crop'
const imgPortrait = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop'
const imgValley = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&h=875&fit=crop'

export const strataScrollSplitVariants: PreviewVariant<StrataScrollSplitProps>[] = [
  {
    id: 1,
    label: 'Headline only',
    props: { title: 'Sediment lines' },
  },
  {
    id: 2,
    label: 'Headline + body',
    props: {
      title: 'Strata study',
      body: 'Geological bands stack the viewport while copy sits in the chalk layer.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      title: 'When the cliff face records every season in ochre and slate',
      titleLines: ['When the cliff face', 'records every season in ochre and slate'],
      body: 'Long headline wrap.',
    },
  },
  {
    id: 4,
    label: 'Missing headline',
    props: { title: '', body: 'Image and strata only.', image: imgWide },
  },
  {
    id: 5,
    label: 'Short body',
    props: { title: 'Clay', body: 'Thin layer.', image: imgWide },
  },
  {
    id: 6,
    label: 'Long body',
    props: {
      title: 'Deep time',
      body: 'Each band marks a deposit: volcanic ash, river silt, windblown chalk. The editorial layout keeps image and copy in separate strata so neither competes for the same horizontal slice. Scroll gently shifts layers at different rates.',
      image: imgValley,
    },
  },
  {
    id: 7,
    label: 'Empty body',
    props: { title: 'No body', image: imgWide },
  },
  {
    id: 8,
    label: 'Portrait image',
    props: {
      title: 'Vertical cut',
      body: 'Portrait source cropped to 16/10.',
      image: imgPortrait,
    },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: {
      title: 'Horizon band',
      body: 'Wide valley crop.',
      image: imgValley,
    },
  },
  {
    id: 10,
    label: 'Missing image',
    props: {
      title: 'Empty stratum',
      body: 'Placeholder band when no image.',
    },
  },
  {
    id: 11,
    label: 'Broken image URL',
    props: {
      title: 'Fault line',
      body: 'Broken URL fallback.',
      image: 'https://example.invalid/strata.jpg',
    },
  },
  {
    id: 12,
    label: 'Eyebrow + headline',
    props: {
      eyebrow: 'Geology',
      title: 'Layer cake',
      body: 'Field notes from the quarry.',
      image: imgWide,
    },
  },
  {
    id: 13,
    label: 'Single CTA',
    props: {
      title: 'Read the wall',
      body: 'Book a guided walk.',
      ctaLabel: 'Reserve',
      image: imgWide,
    },
  },
  {
    id: 14,
    label: 'No CTA',
    props: {
      title: 'Static strata',
      body: 'No button in this variant.',
      image: imgValley,
    },
  },
  {
    id: 15,
    label: 'Explicit title lines',
    props: {
      titleLines: ['Chalk', 'and clay'],
      body: 'SVG headline control.',
      image: imgWide,
    },
  },
  {
    id: 16,
    label: 'Case study',
    props: {
      eyebrow: 'Client — Terra Museum',
      title: 'Wall narrative',
      body: 'We translated core samples into a scroll-driven exhibit band.',
      ctaLabel: 'View project',
      image: imgValley,
    },
  },
  {
    id: 17,
    label: 'Minimal copy',
    props: { title: 'Dust', image: imgWide },
  },
  {
    id: 18,
    label: 'Long eyebrow',
    props: {
      eyebrow: 'Residency — Atacama Desert, week three',
      title: 'Salt flats',
      body: 'White strata under violet sky.',
      image: imgWide,
    },
  },
  {
    id: 19,
    label: 'Image alt text',
    props: {
      title: 'Accessible',
      body: 'Alt on image slot.',
      image: imgValley,
      imageAlt: 'Misty valley at dawn',
    },
  },
  {
    id: 20,
    label: 'Full stack',
    props: {
      eyebrow: 'Chapter 4',
      titleLines: ['Earth', 'memory'],
      body: 'A editorial split where geology is the layout system.',
      ctaLabel: 'Download PDF',
      image: imgWide,
    },
  },
]
