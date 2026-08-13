# StatsCounterRow

## Content scenario

**Stats row** — big numbers with short labels for traction, impact, and credibility bands.

Prop slots:

| Slot | Purpose |
|------|---------|
| `eyebrow` | Small label above headline |
| `headlineLines` | Optional centered title via `ResponsiveHeadline` |
| `stats[]` | `{ value, label, suffix? }` |
| `variant` | `default`, `bordered` (card cells), or `glow` (gradient bg) |

## Look

- Full-width band with responsive 1–4 column grid
- Large numeric values with uppercase labels
- Optional bordered cells or violet gradient background

## Page behavior

- Static display — no count-up animation (respects reduced motion)
- Centered when headline present

## Neighbors

- Above: hero or logo marquee
- Below: testimonial, pricing, or CTA

## Width model

- Root `<section>` is `w-full` only

## Image ratios

- None

## Headlines

- Optional `ResponsiveHeadline` centered above stats

## Viewport and resize

| Tier | Range | Layout |
|------|-------|--------|
| Mobile | < 768px | 1–2 columns |
| Tablet | 768–1023px | 2–3 columns |
| Desktop | ≥ 1024px | Up to 4 columns |

- `prefers-reduced-motion`: no animation
