# VerdureCanopySplit

## Creative direction

**Style:** Editorial
**Typography:** Elegant serif SVG headlines; soft green body copy
**Layout:** Forest canopy dappled-light split — photograph under leaves, copy in filtered light column
**Color:** Forest shadow `#1a2e1a` + leaf green `#4a7c59` + dapple gold `#d4a574`
**Motion:** Slow dappled light drift across copy column; image-reveal on photograph
**Signature:** Animated leaf canopy casts moving dappled light across the text column like sunlight through trees

## Role

- image+text

## Look

Not a generic 50/50 split. A forest canopy filters golden light onto the copy column while the photograph sits beneath overlapping leaf silhouettes.

## Motion

- Role: content
- Moves: dapple drift, image-reveal
- Durations: `motionDuration.emphasis` for dapple; `motionDuration.hero` for headline
- prefers-reduced-motion: static dapple pattern

## Page behavior

- Root: `min-h-[100svh] w-full`
- Two-column on desktop; stacked on mobile

## Neighbors

- Above: RippleCardPool
- Below: RelaySwitchForm

## Width model

- Full browser width

## Image ratios

- Photograph: 3/4 portrait crop with object-cover

## Headlines

- Primary: ResponsiveHeadline with explicit lines

## Responsive (mobile → tablet → desktop → large)

- Mobile: image above copy
- Desktop: side-by-side with canopy overlay
- No hover-only content

## 3D

- N/A
