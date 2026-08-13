import type { PreviewVariant } from '../../src/previews/types'
import type { PricingTierGridProps } from './PricingTierGrid'

const starterFeatures = ['5 projects', 'Email support', '1 GB storage']
const proFeatures = ['Unlimited projects', 'Priority support', '50 GB storage', 'Team seats (5)']
const enterpriseFeatures = [
  'Everything in Pro',
  'Dedicated manager',
  'SSO & audit logs',
  'Custom SLA',
  'On-prem option',
]

export const pricingTierGridVariants: PreviewVariant<PricingTierGridProps>[] = [
  {
    id: 1,
    label: 'Headline only + single tier',
    props: {
      headlineLines: ['Simple pricing'],
      tiers: [{ name: 'Solo', price: '$9', period: 'mo', features: starterFeatures, ctaLabel: 'Start' }],
    },
  },
  {
    id: 2,
    label: 'Eyebrow + headline + intro + three tiers',
    props: {
      eyebrow: 'Plans',
      headlineLines: ['Pick your', 'pace'],
      intro: 'Start free, upgrade when your team grows. No hidden fees.',
      tiers: [
        {
          name: 'Starter',
          price: '$0',
          period: 'mo',
          description: 'For side projects and experiments.',
          features: ['3 projects', 'Community support', '500 MB storage'],
          ctaLabel: 'Get started',
        },
        {
          name: 'Pro',
          price: '$29',
          period: 'mo',
          description: 'For growing teams shipping weekly.',
          features: proFeatures,
          ctaLabel: 'Start trial',
          highlighted: true,
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          description: 'For regulated industries and large orgs.',
          features: enterpriseFeatures,
          ctaLabel: 'Talk to sales',
        },
      ],
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      headlineLines: [
        'Transparent pricing that',
        'scales with your ambition',
      ],
      tiers: [
        { name: 'Basic', price: '$12', period: 'mo', features: starterFeatures, ctaLabel: 'Choose Basic' },
        { name: 'Plus', price: '$39', period: 'mo', features: proFeatures, ctaLabel: 'Choose Plus', highlighted: true },
      ],
    },
  },
  {
    id: 4,
    label: 'Missing headline',
    props: {
      eyebrow: 'Membership',
      tiers: [
        { name: 'Monthly', price: '$19', period: 'mo', features: ['All classes', 'Cancel anytime'], ctaLabel: 'Join' },
        { name: 'Annual', price: '$149', period: 'yr', features: ['All classes', '2 months free'], ctaLabel: 'Join', highlighted: true },
      ],
    },
  },
  {
    id: 5,
    label: 'Short intro',
    props: {
      headlineLines: ['Two plans'],
      intro: 'Pick one.',
      tiers: [
        { name: 'Free', price: '$0', features: ['Read-only'], ctaLabel: 'Sign up' },
        { name: 'Paid', price: '$5', period: 'mo', features: ['Full access'], ctaLabel: 'Upgrade' },
      ],
    },
  },
  {
    id: 6,
    label: 'Long intro text',
    props: {
      headlineLines: ['Built for teams'],
      intro:
        'Whether you are a solo founder validating an idea or a fifty-person product org, our plans grow with you. Every tier includes SSL, daily backups, and access to our component library preview gallery.',
      tiers: [
        { name: 'Team', price: '$49', period: 'mo', features: proFeatures, ctaLabel: 'Start trial' },
      ],
    },
  },
  {
    id: 7,
    label: 'Empty intro, tiers only',
    props: {
      headlineLines: ['Pricing'],
      tiers: [
        { name: 'Hobby', price: '$0', features: ['1 site'], ctaLabel: 'Deploy' },
        { name: 'Pro', price: '$20', period: 'mo', features: proFeatures, ctaLabel: 'Deploy', highlighted: true },
      ],
    },
  },
  {
    id: 8,
    label: 'Tier without CTA',
    props: {
      headlineLines: ['Compare'],
      tiers: [
        { name: 'Preview', price: 'Free', features: ['Browse variants', 'No account'] },
        { name: 'Ship', price: '$99', period: 'mo', features: enterpriseFeatures, ctaLabel: 'Contact us' },
      ],
    },
  },
  {
    id: 9,
    label: 'Single CTA highlighted tier',
    props: {
      tiers: [
        {
          name: 'Launch',
          price: '$79',
          period: 'mo',
          description: 'Everything you need on day one.',
          features: ['Unlimited seats', 'White-label', 'API access'],
          ctaLabel: 'Buy now',
          highlighted: true,
        },
      ],
    },
  },
  {
    id: 10,
    label: 'Dual tier no highlight',
    props: {
      headlineLines: ['Studio rates'],
      tiers: [
        { name: 'Day rate', price: '$1,200', features: ['8 hours', '2 revisions'], ctaLabel: 'Book' },
        { name: 'Retainer', price: '$4,500', period: 'mo', features: ['40 hours', 'Slack channel'], ctaLabel: 'Book' },
      ],
    },
  },
  {
    id: 11,
    label: 'Eyebrow only with tiers',
    props: {
      eyebrow: '2026 rates',
      tiers: [
        { name: 'Standard', price: '$15', period: 'mo', features: starterFeatures, ctaLabel: 'Select' },
      ],
    },
  },
  {
    id: 12,
    label: 'Empty tiers array',
    props: {
      headlineLines: ['Coming soon'],
      intro: 'Pricing will be announced at launch.',
      tiers: [],
    },
  },
  {
    id: 13,
    label: 'Unicode currency copy',
    props: {
      headlineLines: ['Tarifs'],
      tiers: [
        { name: 'Essentiel', price: '€9', period: 'mois', features: ['5 projets', 'Support email'], ctaLabel: 'Commencer' },
        { name: 'Pro', price: '€29', period: 'mois', features: proFeatures, ctaLabel: 'Essai gratuit', highlighted: true },
      ],
    },
  },
  {
    id: 14,
    label: 'Many features per tier',
    props: {
      headlineLines: ['All-in'],
      tiers: [
        {
          name: 'Complete',
          price: '$199',
          period: 'mo',
          features: [
            'Unlimited projects',
            'Priority support',
            'Custom domains',
            'Analytics dashboard',
            'A/B testing',
            'Webhooks',
            'Audit logs',
            'SOC 2 report',
            'Dedicated CSM',
          ],
          ctaLabel: 'Get Complete',
          highlighted: true,
        },
      ],
    },
  },
  {
    id: 15,
    label: 'Custom price enterprise',
    props: {
      headlineLines: ['Enterprise'],
      intro: 'Volume discounts and procurement-friendly billing.',
      tiers: [
        {
          name: 'Enterprise',
          price: 'Custom',
          description: 'Tailored contracts for 500+ seats.',
          features: enterpriseFeatures,
          ctaLabel: 'Request quote',
        },
      ],
    },
  },
  {
    id: 16,
    label: 'Three tiers middle highlighted',
    props: {
      headlineLines: ['Choose wisely'],
      tiers: [
        { name: 'Lite', price: '$5', period: 'mo', features: ['1 user'], ctaLabel: 'Try Lite' },
        { name: 'Standard', price: '$25', period: 'mo', features: ['5 users', 'Reports'], ctaLabel: 'Try Standard', highlighted: true },
        { name: 'Max', price: '$75', period: 'mo', features: ['25 users', 'API'], ctaLabel: 'Try Max' },
      ],
    },
  },
  {
    id: 17,
    label: 'No period suffix',
    props: {
      tiers: [
        { name: 'Workshop', price: '$299', features: ['Full day', 'Materials included'], ctaLabel: 'Reserve' },
        { name: 'Course', price: '$1,499', features: ['6 weeks', 'Certificate'], ctaLabel: 'Enroll', highlighted: true },
      ],
    },
  },
  {
    id: 18,
    label: 'Minimal feature lists',
    props: {
      headlineLines: ['Bare bones'],
      tiers: [
        { name: 'A', price: '$1', period: 'mo', features: ['One thing'], ctaLabel: 'Go' },
        { name: 'B', price: '$2', period: 'mo', features: ['Two things'], ctaLabel: 'Go' },
      ],
    },
  },
  {
    id: 19,
    label: 'Four feature bullets only',
    props: {
      headlineLines: ['Founder plan'],
      tiers: [
        {
          name: 'Founder',
          price: '$49',
          period: 'mo',
          features: ['Lifetime updates', 'Private Slack', 'Office hours', 'Roadmap votes'],
          ctaLabel: 'Claim spot',
          highlighted: true,
        },
      ],
    },
  },
  {
    id: 20,
    label: 'Annual savings callout',
    props: {
      eyebrow: 'Save 20%',
      headlineLines: ['Annual billing'],
      intro: 'Pay yearly and get two months free on every plan.',
      tiers: [
        { name: 'Personal', price: '$96', period: 'yr', features: starterFeatures, ctaLabel: 'Subscribe' },
        { name: 'Business', price: '$288', period: 'yr', features: proFeatures, ctaLabel: 'Subscribe', highlighted: true },
      ],
    },
  },
]
