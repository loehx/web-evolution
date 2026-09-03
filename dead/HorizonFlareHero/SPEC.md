# HorizonFlareHero

## Creative direction

**Style:** Futuristic
**Typography:** Condensed grotesk headlines, mono eyebrow
**Layout:** Horizon line bisects viewport; copy floats above dusk gradient; 3D flare orb sits on the line
**Color:** Deep indigo sky → burnt orange horizon; white copy; molten gold orb
**Motion:** Slow hero fade-up for copy; orb has subtle idle shimmer; drag orbit is instant
**Signature:** Grabable solar flare cube orbiting on the horizon seam

## Role

- hero

## Look

- A full-viewport dusk sky cut by a razor horizon; a molten 3D flare orb you can orbit sits on the seam while headlines float in the upper atmosphere.

## Motion

- Role: hero
- Moves: fade-up, scale-in, text-reveal
- Durations: hero for stage entrance, standard for copy, micro for CTA hover
- prefers-reduced-motion: static layout, orb still orbitable

## Page behavior

- Root: `min-h-[100svh] w-full`
- Horizon at 62% viewport height; orb centered on seam

## Neighbors

- Above: nothing — first slice
- Below: content flows under the horizon gradient

## Width model

- Full browser width; gradient spans edge to edge

## Image ratios

- N/A — 3D CSS orb, no photos

## Headlines

- Primary: ResponsiveHeadline with explicit lines

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked — copy top 40%, orb on horizon center, smaller orb
- Tablet: same stack, larger type
- Desktop: copy left third, orb right two-thirds on horizon
- Large: orb scales up, headline uses full left column width

## 3D

- CSS preserve-3d molten cube with glow faces
- `usePointerOrbit` on orb hit target; touch-action: none
