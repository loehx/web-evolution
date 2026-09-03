# EmberRiseHero

## Creative direction

**Style:** Futuristic
**Typography:** Condensed grotesk headlines, mono eyebrow
**Layout:** Vertical ash gradient with rising ember crystal on the right
**Color:** Charcoal ash (#1a1410) + molten ember (#ff4500, #ff6b35) + white smoke
**Motion:** Slow hero fade-up for copy; ember glow pulses; orbit on drag
**Signature:** Grabable glowing ember octahedron rising from volcanic ash

## Role

- hero

## Look

- Full-viewport volcanic rise stage: copy anchors left, grabable ember crystal floats in the ash plume on the right — not a centered SaaS hero.

## Motion

- Role: hero
- Moves: fade-up, scale-in, glow pulse
- Durations: hero entrance for copy, standard for CTA, micro for orbit hint
- prefers-reduced-motion: static layout, orbit still works

## Page behavior

- Root: `min-h-[100svh] w-full`
- Scroll: first slice; z-index default

## Neighbors

- Above: none (typically first)
- Below: lighter section or card slider

## Width model

- Full browser width; no max-width on root section

## Image ratios

- N/A (CSS 3D ember crystal)

## Headlines

- Primary: ResponsiveHeadline with explicit lines
- Secondary: HTML subtitle

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked — copy top, ember below, smaller type
- Tablet: same stack with larger ember
- Desktop: two-column grid, ember right
- Large: ember scales with viewport

## 3D

- CSS 3D octahedron with usePointerOrbit — click/tap-hold-drag orbits X and Y
