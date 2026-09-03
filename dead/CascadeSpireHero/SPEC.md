# CascadeSpireHero

## Creative direction

**Style:** Brutalist
**Typography:** Monument condensed headlines, mono micro labels
**Layout:** Asymmetric cascade — copy stacks in offset slabs left, 3D spire occupies right two-thirds
**Color:** Raw concrete `#c8c4bc`, charcoal `#1a1816`, acid lime accent `#c8ff3d`
**Motion:** Hero entrance stagger on slabs; spire is user-orbit (pointer); micro hovers on CTA
**Signature:** Stacked concrete slabs that step down like a waterfall of typography

## Role

- hero

## Look

- Vertical cascade of brutalist concrete slabs carries eyebrow, headline, and CTA while a grabable crystal spire floats in the right stage — not a centered SaaS hero.
- Hierarchy: spire draws the eye; copy anchors lower-left in stepped slabs.

## Motion

- Role: hero
- Moves: stagger, fade-up, scale-in
- Durations: hero entrance on slabs; micro on CTA
- prefers-reduced-motion: static layout, spire still orbitable

## Page behavior

- Root: `min-h-[100svh] w-full`
- Full-bleed brutalist stage; z-index neutral

## Neighbors

- Above: document start or prior section
- Below: content sections; cascade slabs visually “pour” toward next block

## Width model

- Full browser width; no max-width on root

## Image ratios

- None (3D CSS spire, no photographic slots)

## Headlines

- Primary: ResponsiveHeadline lines for multi-line control
- Secondary: HTML eyebrow mono

## Responsive (mobile → tablet → desktop → large)

- Mobile: spire top half, slabs below; smaller type, touch orbit
- Tablet: spire right 55%, slabs left
- Desktop: spire 60% right, larger slabs
- Large: extra spire scale, slabs keep left anchor

## 3D

- CSS octahedron spire via `usePointerOrbit` — click/tap-hold-drag orbits pitch and yaw
