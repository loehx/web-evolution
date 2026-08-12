import type { PreviewVariant } from '../../src/previews/types'
import type { PointerTiltShowcaseProps } from './PointerTiltShowcase'

export const pointerTiltShowcaseVariants: PreviewVariant<PointerTiltShowcaseProps>[] = [
  {
    id: 1,
    label: 'Default duck model + welcome headline',
    props: {
      eyebrow: 'Product spotlight',
      headlineLines: ['Meet the', 'Rubber Duck'],
      intro: 'Move your cursor or drag on mobile — the model tilts toward your pointer.',
      ctaLabel: 'Shop now',
      modelSrc: '/models/duck.glb',
    },
  },
  {
    id: 2,
    label: 'Avocado model',
    props: {
      eyebrow: 'Fresh drop',
      headlineLines: ['Perfectly ripe', 'in 3D'],
      intro: 'A glTF avocado that follows your finger on touch devices.',
      modelSrc: '/models/avocado.glb',
      modelScale: 2.2,
    },
  },
  {
    id: 3,
    label: 'Model on left',
    props: {
      headlineLines: ['Left-aligned', 'showcase'],
      intro: 'Model column flips to the leading side on desktop.',
      modelSide: 'left',
      ctaLabel: 'Learn more',
    },
  },
  {
    id: 4,
    label: 'Headline only',
    props: {
      headlineLines: ['Tilt toward', 'you'],
      modelSrc: '/models/duck.glb',
    },
  },
  {
    id: 5,
    label: 'Very long headline lines',
    props: {
      headlineLines: [
        'Interactive three-dimensional',
        'product storytelling',
      ],
      intro:
        'Long copy still sits beside a fixed-ratio viewport. The duck keeps tracking pointer position across the full section width.',
    },
  },
  {
    id: 6,
    label: 'Missing headline',
    props: {
      eyebrow: '3D preview',
      intro: 'No headline — intro and model only.',
      modelSrc: '/models/avocado.glb',
      modelScale: 2,
    },
  },
  {
    id: 7,
    label: 'Short intro',
    props: {
      headlineLines: ['Quick look'],
      intro: 'One sentence.',
    },
  },
  {
    id: 8,
    label: 'Long intro paragraph',
    props: {
      headlineLines: ['Crafted detail'],
      intro:
        'Every surface reacts to how you explore. On desktop, hover anywhere in the section. On phones and tablets, press and drag — the model orients toward your touch. Reduced-motion users get a gentle auto-rotate instead of pointer tracking.',
      ctaLabel: 'View specs',
    },
  },
  {
    id: 9,
    label: 'Empty intro',
    props: {
      headlineLines: ['No body copy'],
      ctaLabel: 'Get started',
    },
  },
  {
    id: 10,
    label: 'No CTA',
    props: {
      eyebrow: 'Editorial',
      headlineLines: ['Look closer'],
      intro: 'Layout without a button — model still interactive.',
    },
  },
  {
    id: 11,
    label: 'Square viewport ratio',
    props: {
      headlineLines: ['Square frame'],
      viewportRatio: '1/1',
      modelSrc: '/models/duck.glb',
    },
  },
  {
    id: 12,
    label: 'Wide 16/10 viewport',
    props: {
      headlineLines: ['Cinematic crop'],
      viewportRatio: '16/10',
      modelSrc: '/models/avocado.glb',
      modelScale: 2.4,
    },
  },
  {
    id: 13,
    label: 'High tilt sensitivity',
    props: {
      headlineLines: ['Big swings'],
      maxTilt: 0.9,
      intro: 'maxTilt cranked up for dramatic rotation.',
    },
  },
  {
    id: 14,
    label: 'Subtle tilt',
    props: {
      headlineLines: ['Gentle drift'],
      maxTilt: 0.25,
      intro: 'Low maxTilt keeps motion restrained.',
    },
  },
  {
    id: 15,
    label: 'Small model scale',
    props: {
      headlineLines: ['Compact prop'],
      modelScale: 0.8,
      modelSrc: '/models/duck.glb',
    },
  },
  {
    id: 16,
    label: 'Large model scale',
    props: {
      headlineLines: ['Hero scale'],
      modelScale: 2,
      modelSrc: '/models/duck.glb',
    },
  },
  {
    id: 17,
    label: 'Eyebrow only + model',
    props: {
      eyebrow: 'Coming soon',
      modelSrc: '/models/avocado.glb',
      modelScale: 2.1,
    },
  },
  {
    id: 18,
    label: 'Dual-line minimal',
    props: {
      headlineLines: ['Tap', 'Explore'],
      modelSide: 'left',
      viewportRatio: '4/5',
    },
  },
  {
    id: 19,
    label: 'CTA + avocado promo',
    props: {
      eyebrow: 'Limited run',
      headlineLines: ['Superfood', 'rendered'],
      intro: 'Real glTF mesh — not a video loop.',
      ctaLabel: 'Pre-order',
      modelSrc: '/models/avocado.glb',
      modelScale: 2.3,
    },
  },
  {
    id: 20,
    label: 'Full marketing stack',
    props: {
      eyebrow: 'Web evolution',
      headlineLines: ['Bold components', 'in real 3D'],
      intro:
        'Welcome text, SVG headline, and a pointer-driven model in one full-width band. Works on mobile, tablet, and desktop.',
      ctaLabel: 'Browse previews',
      modelSrc: '/models/duck.glb',
      modelScale: 1.5,
      viewportRatio: '16/10',
      modelSide: 'right',
    },
  },
]
