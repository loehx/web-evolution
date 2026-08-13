# PricingTierGrid

## Content scenario

**Pricing table** — tier columns with plan name, price, feature bullets, and CTA buttons for SaaS, memberships, and service packages.

Prop slots:

| Slot | Purpose |
|------|---------|
| `eyebrow` | Small label above headline |
| `headlineLines` | Primary title via `ResponsiveHeadline` |
| `intro` | Supporting paragraph |
| `tiers[]` | `{ name, price, period?, description?, features[], ctaLabel?, highlighted? }` |

## Look

- Full-width dark band with responsive 1–3 column grid
- Highlighted tier gets violet border, glow, and filled CTA
- Checkmark feature list with violet accents

## Page behavior

- Standard document-flow section; no sticky or fixed positioning
- Grid collapses to single column on mobile

## Neighbors

- Above: hero, feature list, or testimonial
- Below: FAQ, contact form, or footer

## Width model

- Root `<section>` is `w-full` only — no `max-w-*` or `container` on the shell
- Single-tier variant uses `max-w-md` on the grid only for readability

## Image ratios

- None — text and pricing only

## Headlines

- Primary title uses `ResponsiveHeadline` (SVG, width-linked line breaks)
- Tier names remain HTML `h3`

## Viewport and resize

| Tier | Range | Layout |
|------|-------|--------|
| Mobile | < 768px | Stacked single column |
| Tablet | 768–1023px | 2 columns for 2+ tiers |
| Desktop | ≥ 1024px | Up to 3 columns |

- `prefers-reduced-motion`: no motion dependencies
