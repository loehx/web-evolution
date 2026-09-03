# NexusCardHelix

## Creative direction

**Style:** Futuristic
**Typography:** Geometric sans titles, mono labels
**Layout:** Cards orbit a central nexus point on a double-helix path
**Color:** Deep space navy (#0a1628) + electric cyan (#00d4ff) + magenta accents
**Motion:** Helix rotation on swipe; active card scales to center
**Signature:** DNA-helix card carousel — stories spiral around a glowing nexus core

## Role

- card slider

## Look

- Full-viewport card helix: stories ride two intertwined orbital paths around a pulsing nexus core; swipe or arrows advance the helix instead of horizontal scroll.

## Motion

- Role: primary interaction
- Moves: scale-in, stagger, magnetic snap
- Durations: emphasis for card transition, standard for header
- prefers-reduced-motion: instant snap, no helix animation

## Page behavior

- Root: `min-h-[100svh] w-full`
- Scroll: self-contained stage

## Neighbors

- Above: hero
- Below: image+text split

## Width model

- Full browser width

## Image ratios

- Card image: 4/3 — cropped with object-cover

## Headlines

- Section title: HTML h2
- Card titles: HTML

## Responsive (mobile → tablet → desktop → large)

- Mobile: tighter helix radius, swipe gestures
- Tablet: medium radius
- Desktop: full helix spread with arrow controls
- Large: cards scale up, helix widens
