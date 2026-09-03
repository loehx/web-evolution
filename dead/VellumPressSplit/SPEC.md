# VellumPressSplit

## Creative direction

**Style:** Editorial
**Typography:** Old-style serif headlines; ink-stained body in small caps
**Layout:** A vellum sheet is pressed between image and text; ink bleeds through the translucent center gutter
**Color:** Parchment `#f4ead5` + sepia ink `#3d2914` + press red `#8b2500`
**Motion:** Ink-bleed reveal on scroll-in; text-reveal stagger
**Signature:** Translucent vellum membrane with ink diffusion between photograph and copy columns

## Role

- image+text

## Look

An antique letterpress proof. Image on one side, headline on the other, with a vellum membrane bleeding ink in the gutter.

## Motion

- Role: content
- Moves: image-reveal, text-reveal, stagger
- Durations: `motionDuration.emphasis` for ink bleed
- prefers-reduced-motion: static layout, no bleed animation

## Page behavior

- Root: `min-h-[100svh] w-full`
- Two-column split on desktop; stacked on mobile

## Neighbors

- Above: FerrisCardRing
- Below: ChiselStrikeForm

## Width model

- Full browser width

## Image ratios

- Photo slot: `3/4` on mobile, `4/5` on desktop — cropped with object-cover

## Headlines

- Primary: `ResponsiveHeadline` lines

## Responsive (mobile → tablet → desktop → large)

- Mobile: image top, vellum strip, text bottom; no hover
- Tablet: simplified split with narrower gutter
- Desktop / large: true two-column with animated ink bleed in gutter
- Touch-first; hover optional on CTA

## 3D

- N/A
