import { PLACEHOLDER_BROKEN, PLACEHOLDER_LANDSCAPE, PLACEHOLDER_PORTRAIT } from '../../src/previews/types'
import type { PreviewVariant } from '../../src/previews/types'
import type { FaqAccordionStackProps } from './FaqAccordionStack'

const shippingFaq = [
  {
    id: 'ship-1',
    question: 'How long does standard shipping take?',
    answer:
      'Orders leave our warehouse within 1–2 business days. Standard delivery is 3–5 business days in the continental US.',
  },
  {
    id: 'ship-2',
    question: 'Do you ship internationally?',
    answer:
      'Yes — we ship to Canada, the UK, and the EU. Duties and taxes are calculated at checkout based on your destination.',
  },
  {
    id: 'ship-3',
    question: 'Can I change my address after placing an order?',
    answer:
      'Contact support within one hour of checkout and we will update the address before the label is printed.',
  },
]

const pricingFaq = [
  {
    id: 'price-1',
    question: 'Is there a free plan?',
    answer: 'Yes. The Starter plan includes up to three projects and 1 GB of asset storage at no cost.',
  },
  {
    id: 'price-2',
    question: 'Can I switch plans mid-cycle?',
    answer:
      'Upgrades take effect immediately with prorated billing. Downgrades apply at the start of your next billing period.',
  },
  {
    id: 'price-3',
    question: 'Do you offer nonprofit discounts?',
    answer:
      'Qualified nonprofits receive 30% off annual Team plans. Email verify@example.org with your 501(c)(3) documentation.',
  },
  {
    id: 'price-4',
    question: 'What payment methods do you accept?',
    answer: 'Visa, Mastercard, Amex, ACH for annual invoices, and Apple Pay on supported devices.',
  },
]

const supportFaq = [
  {
    id: 'sup-1',
    question: 'How do I reset my password?',
    answer: 'Use “Forgot password” on the sign-in page. A reset link expires after 30 minutes for security.',
  },
  {
    id: 'sup-2',
    question: 'Where can I find my invoice history?',
    answer: 'Open Settings → Billing → Invoices. PDFs are available for every charge since account creation.',
  },
  {
    id: 'sup-3',
    question: 'How do I invite teammates?',
    answer:
      'Go to Settings → Team, enter email addresses, and choose a role. Invites expire after seven days if unused.',
  },
  {
    id: 'sup-4',
    question: 'Is two-factor authentication available?',
    answer: 'Yes. Enable TOTP or passkeys under Settings → Security. Admins can require 2FA for the whole workspace.',
  },
  {
    id: 'sup-5',
    question: 'How do I export my data?',
    answer:
      'Request a full export from Settings → Privacy. We email a ZIP within 48 hours containing projects and metadata.',
  },
]

export const faqAccordionStackVariants: PreviewVariant<FaqAccordionStackProps>[] = [
  {
    id: 1,
    label: 'Standard shipping FAQ — headline + intro',
    props: {
      eyebrow: 'Help center',
      headlineLines: ['Questions', 'answered'],
      intro: 'Everything you need to know about delivery, returns, and order changes.',
      items: shippingFaq,
    },
  },
  {
    id: 2,
    label: 'Pricing FAQ — four items, numbers hidden',
    props: {
      eyebrow: 'Plans & billing',
      headlineLines: ['Pricing FAQ'],
      intro: 'Transparent plans with no hidden fees.',
      items: pricingFaq,
      showNumbers: false,
    },
  },
  {
    id: 3,
    label: 'Support FAQ — eight items',
    props: {
      headlineLines: ['Account &', 'support'],
      items: [
        ...supportFaq,
        {
          id: 'sup-6',
          question: 'What browsers do you support?',
          answer: 'Latest two versions of Chrome, Firefox, Safari, and Edge on desktop and mobile.',
        },
        {
          id: 'sup-7',
          question: 'Can I use my own domain?',
          answer: 'Custom domains are included on Pro and Team plans. Point a CNAME to publish.example.net.',
        },
        {
          id: 'sup-8',
          question: 'Where is my data stored?',
          answer: 'Primary storage is US-East with optional EU residency on Enterprise contracts.',
        },
      ],
    },
  },
  {
    id: 4,
    label: 'Single question only',
    props: {
      headlineLines: ['One quick answer'],
      items: [
        {
          question: 'Do you offer live chat?',
          answer: 'Yes — weekdays 9am–6pm ET. Look for the chat bubble in the lower-right corner.',
        },
      ],
    },
  },
  {
    id: 5,
    label: 'Empty items list',
    props: {
      eyebrow: 'Coming soon',
      headlineLines: ['FAQ'],
      intro: 'We are drafting answers for launch week.',
      items: [],
      defaultOpenIds: [],
    },
  },
  {
    id: 6,
    label: 'Very long question text',
    props: {
      headlineLines: ['Returns policy'],
      items: [
        {
          question:
            'What happens if my package arrives damaged, partially opened, or missing items that were clearly listed on the packing slip but are not inside the box?',
          answer:
            'Photograph the packaging and contents within 48 hours, then open a claim from your order page. We ship replacements at no charge once verified.',
        },
      ],
    },
  },
  {
    id: 7,
    label: 'Very long answer text',
    props: {
      headlineLines: ['Privacy'],
      items: [
        {
          question: 'How do you use analytics cookies?',
          answer:
            'We use first-party analytics to understand feature adoption and fix broken flows. Session replay is off by default. Marketing pixels load only after you accept optional cookies in the banner. You can withdraw consent anytime under Settings → Privacy, which clears non-essential cookies on your next visit. Enterprise customers may disable all third-party scripts via a custom data processing agreement.',
        },
      ],
    },
  },
  {
    id: 8,
    label: 'Short Q&A pairs',
    props: {
      headlineLines: ['Quick hits'],
      items: [
        { question: 'Free trial?', answer: '14 days, no card.' },
        { question: 'Cancel anytime?', answer: 'Yes — self-serve in billing.' },
        { question: 'Refunds?', answer: 'Pro-rated within 30 days.' },
      ],
    },
  },
  {
    id: 9,
    label: 'Missing headline — eyebrow + intro only',
    props: {
      eyebrow: 'Beta program',
      intro: 'Early access details for invited teams.',
      items: pricingFaq.slice(0, 2),
      defaultOpenIds: [],
    },
  },
  {
    id: 10,
    label: 'Long multi-line headline',
    props: {
      headlineLines: [
        'Everything you wanted',
        'to ask but were',
        'afraid to email us',
      ],
      intro: 'Honest answers about shipping, billing, and support.',
      items: shippingFaq,
    },
  },
  {
    id: 11,
    label: 'Portrait image left',
    props: {
      eyebrow: 'Studio visit',
      headlineLines: ['Visit us'],
      intro: 'Book a tour of our Portland showroom.',
      imageSrc: PLACEHOLDER_PORTRAIT,
      imageAlt: 'Team member at reception desk',
      imageRatio: '3/4',
      imageSide: 'left',
      items: [
        {
          question: 'Do I need an appointment?',
          answer: 'Walk-ins welcome Tue–Fri 10am–4pm. Saturdays are appointment-only.',
        },
        {
          question: 'Is parking available?',
          answer: 'Validated garage parking on SW 4th — bring your ticket to the front desk.',
        },
      ],
    },
  },
  {
    id: 12,
    label: 'Landscape image right',
    props: {
      headlineLines: ['Product care'],
      intro: 'Keep your gear in great shape season after season.',
      imageSrc: PLACEHOLDER_LANDSCAPE,
      imageAlt: 'Outdoor gear laid on a table',
      imageRatio: '16/9',
      imageSide: 'right',
      items: [
        {
          question: 'How do I wash the shell jacket?',
          answer: 'Machine wash cold, gentle cycle. Hang dry — never use fabric softener.',
        },
        {
          question: 'Is re-waxing required?',
          answer: 'Every 12–18 months depending on use. Our care kit includes food-grade wax.',
        },
        {
          question: 'Lifetime repair policy?',
          answer: 'We repair manufacturing defects free of charge for the life of the product.',
        },
      ],
    },
  },
  {
    id: 13,
    label: 'Missing image — text-only layout',
    props: {
      headlineLines: ['General FAQ'],
      items: supportFaq.slice(0, 3),
    },
  },
  {
    id: 14,
    label: 'Broken image URL',
    props: {
      headlineLines: ['With media slot'],
      imageSrc: PLACEHOLDER_BROKEN,
      imageAlt: 'Broken placeholder',
      imageRatio: '4/3',
      items: shippingFaq.slice(0, 2),
    },
  },
  {
    id: 15,
    label: 'All panels closed initially',
    props: {
      headlineLines: ['Self-serve answers'],
      intro: 'Tap a question to expand.',
      items: supportFaq,
      defaultOpenIds: [],
    },
  },
  {
    id: 16,
    label: 'Multiple panels open (allowMultiple)',
    props: {
      headlineLines: ['Compare topics'],
      items: pricingFaq,
      allowMultiple: true,
      defaultOpenIds: ['price-1', 'price-3'],
    },
  },
  {
    id: 17,
    label: 'Unicode and special characters',
    props: {
      eyebrow: 'International 🌍',
      headlineLines: ['Preguntas frecuentes'],
      intro: 'Réponses en français et español — English below.',
      items: [
        {
          question: '¿Hay soporte en español?',
          answer: 'Sí — chat y correo en español de lunes a viernes.',
        },
        {
          question: 'Est-ce que vous facturez en € ?',
          answer: 'Oui, les clients UE voient les prix TTC en euros.',
        },
      ],
    },
  },
  {
    id: 18,
    label: 'No eyebrow, no intro — headline + items',
    props: {
      headlineLines: ['FAQ'],
      items: shippingFaq,
    },
  },
  {
    id: 19,
    label: 'Square image, numbers off, single default open',
    props: {
      eyebrow: 'Membership',
      headlineLines: ['Member perks'],
      imageSrc: PLACEHOLDER_PORTRAIT,
      imageRatio: '1/1',
      imageSide: 'left',
      showNumbers: false,
      defaultOpenIds: ['member-1'],
      items: [
        {
          id: 'member-1',
          question: 'What do members get?',
          answer: 'Early access drops, free shipping, and exclusive colorways.',
        },
        {
          id: 'member-2',
          question: 'Can I gift a membership?',
          answer: 'Yes — gift codes deliver instantly by email.',
        },
      ],
    },
  },
  {
    id: 20,
    label: 'Minimal — two short items, no chrome',
    props: {
      items: [
        { question: 'Hours?', answer: 'Mon–Fri 9–5 ET.' },
        { question: 'Phone?', answer: '+1 (555) 014-2200.' },
      ],
      showNumbers: false,
      defaultOpenIds: [],
    },
  },
]
