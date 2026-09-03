# ThresholdArchway

## Creative direction

**Style:** Playful
**Typography:** Keystone brand in oversized rounded serif; link labels carved small-caps on stones
**Layout:** Massive stone arch fills the lower viewport; brand sits in the keystone
**Color:** Warm limestone (#e8e0d0) + charcoal inscriptions (#2a2520)
**Motion:** Chrome — links bounce slightly on hover (desktop); keystone fade-up on enter
**Signature:** Footer as a walk-through archway with links on voussoir stones

## Role

- footer

## Look

- You stand before a full-width stone arch: keystone carries the brand, voussoir blocks hold navigation links, legal type runs along the footing.
- Playful but usable — every link is a large touch target on the arch curve.

## Motion

- Role: chrome
- Moves: fade-up keystone, micro hover lift on links
- Durations: standard entrance, micro hovers
- prefers-reduced-motion: static arch, no hover lift

## Page behavior

- Root: `min-h-[100svh] w-full`
- Arch SVG/CSS spans full width at bottom; negative space above for breathing room

## Neighbors

- Above: contact or content
- Below: end of page

## Width model

- Full browser width

## Image ratios

- N/A

## Headlines

- Brand in keystone: HTML with aria-label
- Tagline: optional HTML above arch

## Responsive (mobile → tablet → desktop → large)

- Mobile: arch simplified to two legs + keystone, links stacked inside arch opening
- Tablet: wider arch, links on inner curve
- Desktop: full semicircular arch with links on stones
- Large: keystone type scales with vw

## 3D

- None
