# IrisPetalSplit

## Reference

- **Source type:** award site
- **Live / pen URL:** https://toteme.com/
- **Site / pen name:** Totême (Stockholm fashion brand — Qode Interactive split-screen feature)
- **Section lifted:** Split-screen editorial block — thin grid lines, image and text in alternating panels
- **Why it fits the role:** Editorial image+text with asymmetric overlap, not a centered two-column card
- **Adaptation notes:** Iris petal curves frame the gutter seam; violet-gold botanical palette; full viewport

## Creative direction

**Reference:** https://toteme.com/ — split-screen editorial sections with grid lines
**Style:** Editorial
**Typography:** Oversized serif display crossing the petal seam; compact body
**Layout:** Asymmetric split with iris petal SVG curves bleeding through center gutter
**Color:** Deep violet `#2a1a3a` + gold `#c9a227` + cream `#f5f0e8`
**Motion:** Petal unfurl on scroll; chalk-dust pollen drift through gutter
**Signature:** Oversized display type crosses an iris-petal seam between photograph and copy columns
**Faithful to reference:** Split editorial rhythm, thin grid discipline, image-text tension
**Changed for repo:** Botanical petal motif; ResponsiveHeadline; RatioImage; full viewport

## Role

- image+text

## Look

Not a 50/50 card. An editorial photograph sits beneath overlapping iris petal silhouettes while serif headlines cross the violet seam into the copy column.

## Motion

- Role: content
- Moves: fade-in columns, petal unfurl, pollen drift in gutter
- Durations: `motionDuration.standard` for reveals; `motionDuration.emphasis` for petal motion
- prefers-reduced-motion: static petals, no pollen drift

## Page behavior

- Root: `min-h-[100svh] w-full`
- Grid split on desktop; stacked bands on mobile

## Neighbors

- Above: PylonCardArray
- Below: GeyserVentForm

## Width model

- Full browser width (`w-full`)

## Image ratios

- Editorial image: `3/4` — cropped with object-cover

## Headlines

- Primary: ResponsiveHeadline with explicit `lines[]`

## Responsive (mobile → tablet → desktop → large)

- Mobile: image band then copy band with petal divider
- Tablet: same stack, larger type
- Desktop: 12-col grid with negative overlap
- Large: headline scales with viewport width
