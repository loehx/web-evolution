# SiltLayerSplit

## Creative direction

**Style:** Editorial
**Typography:** Serif SVG headlines; warm earth mono eyebrow
**Layout:** Sediment split with horizontal silt bands threading between photograph and copy
**Color:** River clay `#8b7355` + silt tan `#c4b49a` + deep loam `#2a2418`
**Motion:** Slow silt band drift; image-reveal on scroll entry
**Signature:** Horizontal sediment layers drift through the gutter between image and text columns

## Role

- image + text

## Look

Not a simple 50/50 split. Horizontal silt bands thread through the center gutter — photograph on one side, serif copy on the other, sediment layers binding them.

## Motion

- Role: content
- Moves: fade-in for copy, slow horizontal drift on silt bands
- Durations: `motionDuration.emphasis` for bands; `motionDuration.standard` for copy
- prefers-reduced-motion: static bands, no drift

## Page behavior

- Root: `min-h-[100svh] w-full`
- Two-column on desktop; stacked on mobile

## Neighbors

- Above: MercurySlideCarousel
- Below: AnvilStrikeForm

## Width model

- Full browser width; no max-width on root

## Image ratios

- Photo: 3/4 portrait on mobile, 4/5 on desktop — cropped with object-cover

## Headlines

- Primary: ResponsiveHeadline with explicit lines

## Responsive (mobile → tablet → desktop → large)

- Mobile: image above text; bands horizontal across full width
- Tablet: same stack with larger type
- Desktop: side-by-side with bands in center gutter
- Large: extra band spacing; image uses full column width
