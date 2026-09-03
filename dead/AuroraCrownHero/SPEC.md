# AuroraCrownHero

## Creative direction

**Style:** Futuristic
**Typography:** Wide grotesk headlines; mono eyebrow
**Layout:** Northern-lights curtain fills the sky; copy anchors lower-left while a grabable crystal crown floats in the aurora field
**Color:** Arctic night `#0a1628` + aurora green `#3dffa0` + violet `#8b5cf6` + ice white
**Motion:** Slow aurora shimmer; hero fade-up on copy; crystal orbit via pointer drag
**Signature:** A grabable ice-crystal crown suspended inside a living aurora curtain

## Role

- hero

## Look

Not a centered SaaS hero. The viewport is a polar night sky with animated aurora ribbons; a faceted crystal crown orbits in the luminous field while copy sits on the frozen ground line.

## Motion

- Role: hero
- Moves: fade-up on copy, aurora shimmer (CSS), pointer orbit on crystal
- Durations: `motionDuration.hero` for copy entrance; `motionDuration.standard` for aurora pulse
- prefers-reduced-motion: static aurora gradient; orbit still works

## Page behavior

- Root: `min-h-[100svh] w-full`
- Aurora fills background; crystal zone is interactive

## Neighbors

- Above: (page start)
- Below: SpoolReelCarousel

## Width model

- Full browser width

## Image ratios

- N/A — CSS 3D crystal, no photographic slots

## Headlines

- Primary: `ResponsiveHeadline` with explicit lines

## Responsive (mobile → tablet → desktop → large)

- Mobile: copy stacked above crystal zone; smaller crystal
- Tablet: split layout begins
- Desktop / large: copy left 40%, crystal right 60%
- Touch orbit always available

## 3D

- CSS 3D faceted crystal crown via `usePointerOrbit`
- Click/tap-hold-drag orbits X and Y on all faces
