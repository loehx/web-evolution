import type { PreviewVariant } from '../../src/previews/types'
import { PLACEHOLDER_BROKEN, PLACEHOLDER_PORTRAIT } from '../../src/previews/types'
import type { TestimonialQuoteStackProps } from './TestimonialQuoteStack'

const avatar1 = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
const avatar2 = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
const avatar3 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'

export const testimonialQuoteStackVariants: PreviewVariant<TestimonialQuoteStackProps>[] = [
  {
    id: 1,
    label: 'Single quote headline only',
    props: {
      headlineLines: ['Loved by builders'],
      items: [
        {
          quote: 'These components saved us weeks of polish work.',
          name: 'Jordan Lee',
          role: 'Design lead',
          company: 'Northwind',
          avatarUrl: avatar1,
        },
      ],
    },
  },
  {
    id: 2,
    label: 'Eyebrow + headline + three quotes featured',
    props: {
      eyebrow: 'Customers',
      headlineLines: ['What teams', 'are saying'],
      layout: 'featured',
      items: [
        {
          quote: 'We shipped our marketing site in a weekend using only evolved components.',
          name: 'Sam Rivera',
          role: 'Founder',
          company: 'Lumen Apps',
          avatarUrl: avatar2,
        },
        {
          quote: 'The preview variants caught every edge case before launch.',
          name: 'Alex Kim',
          role: 'Engineer',
          company: 'Stackline',
          avatarUrl: avatar3,
        },
        {
          quote: 'Bold without being gimmicky — exactly what we needed.',
          name: 'Morgan Chen',
          role: 'PM',
          company: 'Orbit',
          avatarUrl: avatar1,
        },
      ],
    },
  },
  {
    id: 3,
    label: 'Very long quote',
    props: {
      items: [
        {
          quote:
            'After evaluating a dozen libraries, this was the only one where every block felt production-ready on day one. The typography scales beautifully, motion respects reduced-motion preferences, and our brand team could swap content without touching layout code.',
          name: 'Priya Nair',
          role: 'VP Product',
          company: 'Helix',
          avatarUrl: avatar2,
        },
      ],
    },
  },
  {
    id: 4,
    label: 'Missing headline',
    props: {
      eyebrow: 'Social proof',
      items: [
        {
          quote: 'Clean, fast, and accessible.',
          name: 'Chris Ortiz',
          avatarUrl: avatar3,
        },
      ],
    },
  },
  {
    id: 5,
    label: 'Short quote',
    props: {
      headlineLines: ['Quick wins'],
      items: [{ quote: '10/10 would evolve again.', name: 'Taylor', role: 'Dev', avatarUrl: avatar1 }],
    },
  },
  {
    id: 6,
    label: 'Quote without avatar',
    props: {
      headlineLines: ['Anonymous feedback'],
      items: [
        {
          quote: 'Our conversion rate jumped after swapping the hero.',
          name: 'Verified buyer',
          role: 'E-commerce',
        },
      ],
    },
  },
  {
    id: 7,
    label: 'Empty items',
    props: {
      headlineLines: ['Testimonials'],
      items: [],
    },
  },
  {
    id: 8,
    label: 'Portrait avatar',
    props: {
      items: [
        {
          quote: 'The portrait crop on avatars still looks great.',
          name: 'Elena Voss',
          role: 'Art director',
          avatarUrl: PLACEHOLDER_PORTRAIT,
        },
      ],
    },
  },
  {
    id: 9,
    label: 'Broken avatar URL',
    props: {
      items: [
        {
          quote: 'Layout holds up when images fail.',
          name: 'QA Bot',
          role: 'Tester',
          avatarUrl: PLACEHOLDER_BROKEN,
        },
      ],
    },
  },
  {
    id: 10,
    label: 'Stack layout two quotes',
    props: {
      headlineLines: ['Reviews'],
      layout: 'stack',
      items: [
        {
          quote: 'First testimonial in a simple stack.',
          name: 'Jamie Fox',
          role: 'CTO',
          company: 'Relay',
          avatarUrl: avatar1,
        },
        {
          quote: 'Second one sits beside it on desktop.',
          name: 'Riley Park',
          role: 'Designer',
          company: 'Relay',
          avatarUrl: avatar2,
        },
      ],
    },
  },
  {
    id: 11,
    label: 'Name only no role',
    props: {
      items: [{ quote: 'Just a first name is enough sometimes.', name: 'Dana', avatarUrl: avatar3 }],
    },
  },
  {
    id: 12,
    label: 'Company without role',
    props: {
      items: [
        {
          quote: 'Company name only in attribution.',
          name: 'Robin Shaw',
          company: 'Acme Corp',
          avatarUrl: avatar1,
        },
      ],
    },
  },
  {
    id: 13,
    label: 'Unicode quote',
    props: {
      headlineLines: ['Témoignages'],
      items: [
        {
          quote: 'Des composants élégants — nous les recommandons vivement.',
          name: 'Marie Dubois',
          role: 'Directrice',
          company: 'Atelier',
          avatarUrl: avatar2,
        },
      ],
    },
  },
  {
    id: 14,
    label: 'Four quotes featured layout',
    props: {
      layout: 'featured',
      items: [
        {
          quote: 'Featured quote gets the spotlight treatment.',
          name: 'Lead voice',
          role: 'CEO',
          company: 'Primary',
          avatarUrl: avatar1,
        },
        { quote: 'Supporting quote one.', name: 'A', role: 'Eng', avatarUrl: avatar2 },
        { quote: 'Supporting quote two.', name: 'B', role: 'Design', avatarUrl: avatar3 },
        { quote: 'Supporting quote three.', name: 'C', role: 'Ops', avatarUrl: avatar1 },
      ],
    },
  },
  {
    id: 15,
    label: 'Eyebrow only',
    props: {
      eyebrow: '★★★★★',
      items: [
        {
          quote: 'Five stars from our beta cohort.',
          name: 'Beta user #42',
          avatarUrl: avatar3,
        },
      ],
    },
  },
  {
    id: 16,
    label: 'No CTA context pure quote',
    props: {
      items: [
        {
          quote: 'No buttons here — just social proof copy.',
          name: 'Minimalist',
          role: 'Reviewer',
          avatarUrl: avatar2,
        },
      ],
    },
  },
  {
    id: 17,
    label: 'Three equal stack cards',
    props: {
      headlineLines: ['Wall of love'],
      layout: 'stack',
      items: [
        { quote: 'Fast setup.', name: 'One', avatarUrl: avatar1 },
        { quote: 'Great docs.', name: 'Two', avatarUrl: avatar2 },
        { quote: 'Nice defaults.', name: 'Three', avatarUrl: avatar3 },
      ],
    },
  },
  {
    id: 18,
    label: 'Quote with special characters',
    props: {
      items: [
        {
          quote: 'It handles "quotes" & <angles> without breaking — 100% recommend.',
          name: 'Edge Case Fan',
          role: 'QA',
          avatarUrl: avatar1,
        },
      ],
    },
  },
  {
    id: 19,
    label: 'Long role and company',
    props: {
      items: [
        {
          quote: 'Attribution wraps gracefully on narrow screens.',
          name: 'Dr. Pat Ng',
          role: 'Head of Digital Experience',
          company: 'Continental Healthcare Partners',
          avatarUrl: avatar2,
        },
      ],
    },
  },
  {
    id: 20,
    label: 'Featured single quote hero',
    props: {
      eyebrow: 'Case study',
      headlineLines: ['Northwind', '3× faster'],
      layout: 'featured',
      items: [
        {
          quote: 'We replaced six bespoke sections with evolved blocks and cut maintenance in half.',
          name: 'Jordan Lee',
          role: 'Design lead',
          company: 'Northwind',
          avatarUrl: avatar1,
        },
      ],
    },
  },
]
