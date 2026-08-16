# ZenithPrismHero

## Creative direction

**Style:** Luxury
**Typography:** Oversized condensed grotesk via ResponsiveHeadline; whisper-thin eyebrow caps
**Layout:** Asymmetric — copy pinned left third, prism stage dominates right two-thirds
**Color:** Deep midnight (#070b14) + spectral accent bands (magenta → cyan → gold)
**Motion:** Hero entrance — prism scale-in, headline text-reveal stagger; idle prism has subtle emphasis pulse on light bands
**Signature:** Refracted spectral ribbons bleeding from a grabable glass prism

## Role

- hero (owns 3D orbit)

## Look

- A floating triangular prism catches imaginary light; drag orbits pitch and yaw so every facet can be inspected while copy anchors the left edge.
- Hierarchy: eyebrow → headline → subtitle → optional CTA; prism is the visual zenith.

## Motion

- Role: hero
- Moves: scale-in, text-reveal, fade-up
- Durations: hero for prism entrance, standard for copy, micro for CTA hover
- prefers-reduced-motion: static prism at default angle, no pulse

## Page behavior

- Root: `min-h-[100svh] w-full`
- Full-bleed stage; prism hit target fills right column on desktop, centers on mobile

## Neighbors

- Above: nothing — this opens the page
- Below: card slider or image+text; dark-to-light handoff optional via props

## Width model

- Full browser width; no max-width on root section

## Image ratios

- N/A (CSS 3D prism, no raster hero image)

## Headlines

- Primary: ResponsiveHeadline with explicit `lines[]`
- Secondary: HTML subtitle

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked — headline above prism, prism min-h 55svh, touch orbit
- Tablet: same stack with larger type
- Desktop: 5/12 copy + 7/12 prism side-by-side
- Large: prism scales up; headline uses full left column width
- Per breakpoint: layout, type scale, spacing, interaction (orbit always available)

## 3D

- CSS preserve-3d triangular prism; `usePointerOrbit` on hit target
- Click/tap-hold-drag orbits X (pitch) and Y (yaw)
- Touch: `touch-action: none` on orbit surface
