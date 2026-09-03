# CompassCardWheel

## Creative direction

**Style:** Futuristic
**Typography:** Monospace index numbers + geometric sans card titles
**Layout:** Radial dial — cards orbit a compass rose; active card locks to north
**Color:** Gunmetal (#1a1f2e) + phosphor green (#39ff88) accents on north tick
**Motion:** Primary — dial rotates with drag; active card scale-in; stagger on card content
**Signature:** Navigation by rotating a compass wheel instead of horizontal scroll

## Role

- card slider (image + text per card)

## Look

- Cards sit on a circular wheel; drag or arrow buttons spin the dial until the chosen story faces north.
- Not a horizontal rail — spatial idea is **radial carousel on a compass**.

## Motion

- Role: primary interaction
- Moves: rotate dial (custom), scale-in active card, stagger card innards
- Durations: standard for rotation settle, micro for tick highlights
- prefers-reduced-motion: snap without animated spin; buttons still work

## Page behavior

- Root: `min-h-[100svh] w-full`
- Wheel centered; optional section title top-left

## Neighbors

- Above: hero
- Below: image+text split or contact

## Width model

- Full browser width

## Image ratios

- Card image slot: 4/3 — cropped with object-cover

## Headlines

- Section title: HTML h2
- Card titles: HTML

## Responsive (mobile → tablet → desktop → large)

- Mobile: smaller wheel diameter, swipe to rotate, one card visible at north
- Tablet: medium wheel, touch + arrow buttons
- Desktop: large wheel with hover highlight on inactive cards
- Large: wheel scales to ~70vw max visual diameter while staying full-bleed stage

## 3D

- None (2D radial layout)
