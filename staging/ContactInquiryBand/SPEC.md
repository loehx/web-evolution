# ContactInquiryBand

## Content scenario

**Contact form** — name, email, message fields with submit button for inquiry, support, and lead-capture sections.

Prop slots:

| Slot | Purpose |
|------|---------|
| `eyebrow` | Small label above headline |
| `headlineLines` | Primary title via `ResponsiveHeadline` |
| `intro` | Supporting paragraph |
| `fields[]` | `{ name, label, type?, placeholder?, required? }` |
| `submitLabel` | Button text |
| `successMessage` | Shown after mock submit |
| `layout` | `split` (copy + form) or `stacked` |
| `sideNote` | Extra copy under intro (hours, phone) |

## Look

- Full-width dark band with bordered form card
- Violet focus rings and submit button
- Success state with emerald confirmation panel

## Page behavior

- Mock submit with loading state (no real backend)
- Split layout: sticky intro column on desktop

## Neighbors

- Above: FAQ, pricing, or map section
- Below: footer or newsletter band

## Width model

- Root `<section>` is `w-full` only
- Stacked layout constrains form to `max-w-xl` for readability

## Image ratios

- None

## Headlines

- Primary title uses `ResponsiveHeadline`

## Viewport and resize

| Tier | Range | Layout |
|------|-------|--------|
| Mobile | < 768px | Stacked intro then form |
| Tablet | 768–1023px | Stacked |
| Desktop | ≥ 1024px | Split two-column when `layout="split"` |

- `prefers-reduced-motion`: loading state only, no decorative motion
