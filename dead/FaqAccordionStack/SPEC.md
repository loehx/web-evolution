# FaqAccordionStack

## Content scenario

**FAQ accordion** — expandable question and answer pairs for help centers, product pages, pricing, and support sections.

Prop slots:

| Slot | Purpose |
|------|---------|
| `eyebrow` | Small label above headline (e.g. “Help center”) |
| `headlineLines` | Primary title via `ResponsiveHeadline` — one string per SVG line |
| `intro` | Supporting paragraph beside the accordion |
| `items[]` | `{ question, answer, id? }` pairs |
| `imageSrc` / `imageRatio` / `imageSide` | Optional side media column |
| `defaultOpenIds` | Which items start expanded |
| `allowMultiple` | Keep multiple answers open at once |
| `showNumbers` | Prefix items with 01, 02, … |

## Look

- Full-width dark band (`bg-zinc-950`) with horizontal padding only on the shell
- Accordion panel: rounded border card with numbered rows, violet chevron, and animated expand
- Optional `RatioImage` column flanking copy on tablet/desktop
- Typography: uppercase eyebrow, SVG headline, muted answer body

## Page behavior

- Standard document-flow section between marketing blocks
- Sticky headline column on desktop (no image) so questions stay visible while scrolling long lists
- No fixed positioning or viewport takeover

## Neighbors

- Above: hero, feature grid, or pricing table
- Below: contact CTA, newsletter band, or footer links

## Width model

- Root `<section>` is `w-full` only — no `max-w-*` or `container` on the component shell
- Inner flex/grid distributes columns; readable text width comes from column proportions, not a centered page container

## Image ratios

| Slot | Default ratio | Crop |
|------|---------------|------|
| Side image | `3/4` (portrait) | `object-cover` via `RatioImage` |
| Variants also use `16/9`, `4/3`, `1/1` | explicit per variant | center crop |

Image hidden below `md` when `imageSide` is set — mobile shows image above copy in the intro column.

## Headlines

- Primary title uses `ResponsiveHeadline` (SVG, width-linked line breaks)
- Eyebrow and intro remain HTML — secondary hierarchy

## Viewport and resize

| Tier | Range | Layout |
|------|-------|--------|
| Mobile | &lt; 768px | Stacked: eyebrow/headline/intro → optional image → accordion card |
| Tablet | 768–1023px | Side image visible when provided; two-column feel begins |
| Desktop | ≥ 1024px | Three-zone layout with image (optional) + sticky intro + accordion; or 2-col without image |

- `prefers-reduced-motion`: accordion height/opacity transitions disabled via `useReducedMotion`; chevron rotation remains instant-friendly
