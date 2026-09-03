# PatinaOxideSplit

## Creative direction

**Style:** Luxury
**Typography:** Elegant serif headlines; small-caps eyebrow
**Layout:** Oxidized copper plate on left, verdigris bleed in center gutter, copy on right
**Color:** Warm copper `#b87333` + verdigris `#3d7a6a` + cream `#f8f4ec`
**Motion:** Slow verdigris diffusion in gutter; image-reveal on photograph
**Signature:** A copper patina oxidation seam where green oxide bleeds between image and text

## Role

- image+text

## Look

Not a generic 50/50 split. A luxury copper plate with verdigris oxidation bleeding through the center seam between photograph and serif copy.

## Motion

- Role: content
- Moves: image-reveal, verdigris bleed animation
- Durations: `motionDuration.emphasis` for image; `motionDuration.standard` for copy
- prefers-reduced-motion: static verdigris gradient

## Page behavior

- Root: `min-h-[100svh] w-full`
- Two-column split on desktop; stacked on mobile

## Neighbors

- Above: SpoolReelCarousel
- Below: FuseWireForm

## Width model

- Full browser width

## Image ratios

- Photograph: `4/5` on desktop, `3/4` on mobile — cropped with object-cover

## Headlines

- Primary: `ResponsiveHeadline` with explicit lines

## Responsive (mobile → tablet → desktop → large)

- Mobile: image top, copy bottom, verdigris band between
- Tablet: same stack with larger type
- Desktop / large: side-by-side with center oxidation gutter
- No hover-dependent content

## 3D

- N/A
