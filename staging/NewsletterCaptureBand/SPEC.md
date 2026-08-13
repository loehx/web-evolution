# NewsletterCaptureBand

## Content scenario

**Newsletter signup** — headline, supporting copy, email field, and subscribe button for list growth.

Prop slots:

| Slot | Purpose |
|------|---------|
| `eyebrow` | Small label above headline |
| `headlineLines` | Primary title via `ResponsiveHeadline` |
| `body` | Supporting paragraph |
| `placeholder` | Email input placeholder |
| `submitLabel` | Button text |
| `successMessage` | Shown after mock subscribe |
| `imageSrc` / `imageRatio` | Optional side image in split layout |
| `layout` | `split` (with image) or `centered` |
| `privacyNote` | Fine print under form |

## Look

- Full-width dark band with pill email input and violet CTA
- Optional `RatioImage` column in split layout
- Centered variant for footer-style signup

## Page behavior

- Mock submit with loading state
- Image hidden in centered layout

## Neighbors

- Above: article content, pricing, or footer links
- Below: site footer

## Width model

- Root `<section>` is `w-full` only
- Centered copy uses `max-w-xl` on inner block only

## Image ratios

| Slot | Default | Crop |
|------|---------|------|
| Side image | `4/3` | `object-cover` via `RatioImage` |
| Variants use `16/9`, `3/4`, `1/1` | per variant | center crop |

## Headlines

- Primary title uses `ResponsiveHeadline`

## Viewport and resize

| Tier | Range | Layout |
|------|-------|--------|
| Mobile | < 768px | Stacked image above copy |
| Tablet | 768–1023px | Stacked |
| Desktop | ≥ 1024px | Split two-column with image |

- `prefers-reduced-motion`: loading state only
