import type { PreviewVariant } from '../../src/previews/types'
import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
} from '../../src/previews/types'
import type { NewsletterCaptureBandProps } from './NewsletterCaptureBand'

export const newsletterCaptureBandVariants: PreviewVariant<NewsletterCaptureBandProps>[] = [
  {
    id: 1,
    label: 'Headline only centered',
    props: {
      headlineLines: ['Stay in the loop'],
      layout: 'centered',
      submitLabel: 'Subscribe',
    },
  },
  {
    id: 2,
    label: 'Eyebrow + headline + body split with image',
    props: {
      eyebrow: 'Newsletter',
      headlineLines: ['Weekly', 'design drops'],
      body: 'One email every Friday with new components, decline lessons, and preview links.',
      imageSrc: PLACEHOLDER_LANDSCAPE,
      imageRatio: '16/9',
      layout: 'split',
      privacyNote: 'No spam. Unsubscribe anytime.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      headlineLines: [
        'Get the evolved',
        'component digest in your inbox',
      ],
      body: 'Curated for builders who ship bold UI.',
      layout: 'centered',
    },
  },
  {
    id: 4,
    label: 'Missing headline',
    props: {
      eyebrow: 'Updates',
      body: 'Be first to know when new batches land.',
      layout: 'centered',
    },
  },
  {
    id: 5,
    label: 'Short body',
    props: {
      headlineLines: ['Join us'],
      body: 'Free forever.',
      layout: 'centered',
    },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      headlineLines: ['The evolve letter'],
      body:
        'Join thousands of designers and engineers who read our weekly roundup. We share what lived, what died, and why — plus early access to staging previews before Alex reviews them.',
      layout: 'centered',
      privacyNote: 'We never sell your email. GDPR-friendly.',
    },
  },
  {
    id: 7,
    label: 'Empty body',
    props: {
      headlineLines: ['Subscribe'],
      layout: 'centered',
    },
  },
  {
    id: 8,
    label: 'Portrait side image',
    props: {
      headlineLines: ['From the studio'],
      body: 'Behind-the-scenes shots and launch notes.',
      imageSrc: PLACEHOLDER_PORTRAIT,
      imageRatio: '3/4',
      layout: 'split',
    },
  },
  {
    id: 9,
    label: 'Missing image split layout',
    props: {
      headlineLines: ['No image'],
      body: 'Split layout without media falls back to copy only.',
      layout: 'split',
    },
  },
  {
    id: 10,
    label: 'Broken image URL',
    props: {
      headlineLines: ['Broken media'],
      imageSrc: PLACEHOLDER_BROKEN,
      layout: 'split',
    },
  },
  {
    id: 11,
    label: 'Custom placeholder',
    props: {
      headlineLines: ['Work email'],
      placeholder: 'name@company.com',
      layout: 'centered',
    },
  },
  {
    id: 12,
    label: 'No submit label',
    props: {
      headlineLines: ['Email only'],
      submitLabel: '',
      layout: 'centered',
    },
  },
  {
    id: 13,
    label: 'Unicode copy',
    props: {
      headlineLines: ['Restez informé'],
      body: 'Chaque semaine, de nouveaux composants audacieux.',
      submitLabel: "S'abonner",
      layout: 'centered',
    },
  },
  {
    id: 14,
    label: 'Square image',
    props: {
      headlineLines: ['Product updates'],
      imageSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8ab57e6f?w=800&h=800&fit=crop',
      imageRatio: '1/1',
      layout: 'split',
    },
  },
  {
    id: 15,
    label: 'Custom success message',
    props: {
      headlineLines: ['VIP list'],
      successMessage: 'Welcome to the VIP list — check your inbox for a confirmation link.',
      layout: 'centered',
    },
  },
  {
    id: 16,
    label: 'Eyebrow only',
    props: {
      eyebrow: 'Free',
      layout: 'centered',
    },
  },
  {
    id: 17,
    label: '16/10 landscape image',
    props: {
      headlineLines: ['Launch alerts'],
      body: 'Know the moment new components hit staging.',
      imageSrc: PLACEHOLDER_LANDSCAPE,
      imageRatio: '16/10',
      layout: 'split',
    },
  },
  {
    id: 18,
    label: 'Privacy note only',
    props: {
      headlineLines: ['Fine print test'],
      layout: 'centered',
      privacyNote: 'By subscribing you agree to our Terms and Privacy Policy.',
    },
  },
  {
    id: 19,
    label: 'CTA label join waitlist',
    props: {
      headlineLines: ['Waitlist'],
      body: 'We are opening spots in batches.',
      submitLabel: 'Join waitlist',
      layout: 'centered',
    },
  },
  {
    id: 20,
    label: 'Full split promo',
    props: {
      eyebrow: 'Limited spots',
      headlineLines: ['Early access', 'for reviewers'],
      body: 'Alex picks five readers each month to vote keep or die before the public sees new batches.',
      imageSrc: PLACEHOLDER_LANDSCAPE,
      imageRatio: '4/3',
      layout: 'split',
      submitLabel: 'Request invite',
      privacyNote: 'Invites sent on the 1st of each month.',
    },
  },
]
