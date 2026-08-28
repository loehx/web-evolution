# CinderAshSplit

## Reference

- **Source type:** award site
- **Awards URL:** https://www.awwwards.com/inspiration/offgrid-layout-hotel-jagerhof
- **Live / pen URL:** https://www.hotel-jagerhof.com/
- **Site / pen name:** Hotel Jägerhof (broken grid editorial)
- **Section lifted:** Off-grid editorial layout — photograph overlaps copy columns with asymmetrical broken grid placement
- **Why it fits the role:** Image+text split with editorial broken-grid composition, not a symmetric 50/50
- **Adaptation notes:** Volcanic cinder/ash palette; drifting ember particles in center gutter; full viewport

## Creative direction

**Reference:** https://www.hotel-jagerhof.com/ — broken grid editorial image+copy block
**Style:** Editorial
**Typography:** Oversized serif headlines offset from image; compact body in ash-gray column
**Layout:** Broken grid with image shard overlapping copy; ember glow in the gutter seam
**Color:** Volcanic ash `#3a3632` + ember orange `#e85d04` + smoke `#e8e4e0`
**Motion:** Drifting ash particles in gutter; parallax offset on scroll (subtle)
**Signature:** A volcanic ash editorial split where ember particles drift through the broken-grid gutter seam
**Faithful to reference:** Asymmetrical broken grid, image overlap, editorial type hierarchy
**Changed for repo:** Cinder/ash metaphor, props API, reduced-motion, mobile stack

## Role

- image + text

## Look

Not a symmetric split. Photograph shards overlap serif copy in a broken volcanic grid — ember ash drifts through the center seam.

## Motion

- Role: content
- Moves: fade-in for columns, ash particle drift in gutter
- Durations: `motionDuration.standard` for reveals; `motionDuration.emphasis` for ash
- prefers-reduced-motion: static layout, no particle drift

## Page behavior

- Root: `min-h-[100svh] w-full`
- Broken grid fills viewport

## Neighbors

- Above: PlinthCardPedestal
- Below: ShaleBedForm

## Width model

- Full browser width

## Image ratios

- Hero image: 3/4 — cropped with object-cover via RatioImage

## Headlines

- Primary: ResponsiveHeadline with explicit `lines[]`

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked — image then copy with ash band between
- Tablet: partial overlap begins
- Desktop: full broken-grid overlap with offset columns
- Large: wider image shard, larger headline
