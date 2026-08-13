# TestimonialQuoteStack

## Content scenario

**Testimonial quote** — customer quotes with avatar, name, role, and company for social proof sections.

Prop slots:

| Slot | Purpose |
|------|---------|
| `eyebrow` | Small label above headline |
| `headlineLines` | Primary title via `ResponsiveHeadline` |
| `items[]` | `{ quote, name, role?, company?, avatarUrl? }` |
| `layout` | `stack` (equal cards) or `featured` (first quote enlarged) |

## Look

- Full-width dark band with quote cards and circular avatars
- Featured layout highlights first quote with violet border
- Grid of smaller cards for additional testimonials

## Page behavior

- Standard document-flow section
- No carousel or auto-rotation

## Neighbors

- Above: pricing table, hero, or stats row
- Below: CTA band, contact form, or logo marquee

## Width model

- Root `<section>` is `w-full` only

## Image ratios

| Slot | Ratio | Crop |
|------|-------|------|
| Avatar | `1/1` | `object-cover` via `RatioImage`, rounded-full |

## Headlines

- Primary title uses `ResponsiveHeadline`
- Quotes remain HTML blockquote

## Viewport and resize

| Tier | Range | Layout |
|------|-------|--------|
| Mobile | < 768px | Stacked cards |
| Tablet | 768–1023px | 2-column grid for secondary quotes |
| Desktop | ≥ 1024px | Up to 3-column grid |

- `prefers-reduced-motion`: no motion dependencies
