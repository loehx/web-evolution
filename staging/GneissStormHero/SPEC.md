# GneissStormHero

## Creative direction

**Style:** Brutalist
**Typography:** Heavy condensed SVG headlines; storm-gray mono eyebrow
**Layout:** Tempest hero with copy anchored left and a banded gneiss boulder stage right
**Color:** Storm slate `#2a2f38` + banded pink-gray `#c4a4a4` + lightning white `#e8ecef`
**Motion:** Rain streak fall; hero fade-up for copy; boulder orbit on drag
**Signature:** A grabable banded gneiss boulder rotating in a diagonal rain curtain

## Role

- hero (3D orbit)

## Look

Not a centered SaaS hero. Copy clings to the storm wall while a banded gneiss boulder floats in diagonal rain — pink and gray foliation stripes visible on every face.

## Motion

- Role: hero
- Moves: fade-up for copy, rain streak fall, boulder orbit on pointer drag
- Durations: `motionDuration.hero` for headline; `motionDuration.standard` for rain
- prefers-reduced-motion: static boulder, no rain animation

## Page behavior

- Root: `min-h-[100svh] w-full`
- Two-column on desktop; stacked on mobile

## Neighbors

- Above: page top
- Below: MercurySlideCarousel

## Width model

- Full browser width; no max-width on root

## Image ratios

- N/A (3D CSS gneiss boulder)

## Headlines

- Primary: ResponsiveHeadline with explicit lines

## Responsive (mobile → tablet → desktop → large)

- Mobile: copy above boulder stage; smaller type; touch orbit
- Tablet: side-by-side with reduced boulder scale
- Desktop: full two-column; rain diagonal across viewport
- Large: boulder scales with viewport; copy uses extra left margin

## 3D

- Click/tap + hold + drag orbits X (pitch) and Y (yaw) via `usePointerOrbit`
- CSS 3D cube with banded gneiss face textures
