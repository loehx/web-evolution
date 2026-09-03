# RippleCardPool

## Creative direction

**Style:** Playful
**Typography:** Rounded bold card titles; soft body copy
**Layout:** Concentric ripple rings expanding from a pool center; cards ride the ring crests
**Color:** Deep teal pool `#0a3d4a` + ripple cyan `#4ecdc4` + foam white `#f0faf9`
**Motion:** Ripple pulse on card change; cards scale up when active
**Signature:** Stories float on concentric ripple rings that pulse outward from a still pool center

## Role

- card slider

## Look

Not horizontal scroll. Cards sit on expanding ripple ring crests; swipe or arrows advance to the next ring position.

## Motion

- Role: primary interaction
- Moves: ripple pulse, card scale-in
- Durations: `motionDuration.emphasis` for ring pulse; `motionDuration.standard` for card transition
- prefers-reduced-motion: instant card swap, static rings

## Page behavior

- Root: `min-h-[100svh] w-full`
- Centered ripple pool stage

## Neighbors

- Above: QuartzFacetHero
- Below: VerdureCanopySplit

## Width model

- Full browser width

## Image ratios

- Card image: 16/10 cropped with RatioImage

## Headlines

- Section title as HTML h2 when provided

## Responsive (mobile → tablet → desktop → large)

- Mobile: swipe gesture; smaller ring radius
- Desktop: arrow buttons + swipe
- Touch swipe works; no hover-only content

## 3D

- N/A
