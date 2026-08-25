# QuartzFacetHero

## Creative direction

**Style:** Luxury
**Typography:** Wide grotesk SVG headlines; whisper-thin mono eyebrow
**Layout:** Ice-field hero with copy anchored left and a floating quartz octahedron stage right
**Color:** Polar ice `#e8f4fc` + deep slate `#1a2332` + crystal cyan `#7ec8e3`
**Motion:** Slow prism shimmer on facets; hero fade-up for copy
**Signature:** A grabable quartz octahedron casting spectral facet reflections across a frozen field

## Role

- hero (3D orbit)

## Look

Not a centered SaaS hero. Copy anchors the frozen ground line while a luminous quartz crystal floats in the polar field — every facet catches a different spectral tone.

## Motion

- Role: hero
- Moves: fade-up for copy, facet shimmer on crystal
- Durations: `motionDuration.hero` for headline; `motionDuration.standard` for eyebrow
- prefers-reduced-motion: static crystal, no shimmer

## Page behavior

- Root: `min-h-[100svh] w-full`
- Two-column on desktop; stacked on mobile

## Neighbors

- Above: page top
- Below: RippleCardPool

## Width model

- Full browser width; no max-width on root

## Image ratios

- N/A (3D CSS crystal)

## Headlines

- Primary: ResponsiveHeadline with explicit lines

## Responsive (mobile → tablet → desktop → large)

- Mobile: copy above crystal stage
- Desktop: side-by-side grid
- Touch orbit on crystal; no hover-only content

## 3D

- CSS 3D octahedron via `usePointerOrbit`
- Click/tap-hold-drag orbits pitch and yaw
