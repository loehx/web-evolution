# MercurySlideCarousel

## Creative direction

**Style:** Futuristic
**Typography:** Sleek condensed card titles; chrome mono eyebrow
**Layout:** Liquid mercury trough with cards sliding on reflective silver surface
**Color:** Mirror silver `#c0c8d0` + deep void `#0a0c10` + mercury glow `#e8f0f8`
**Motion:** Mercury surface ripple on card change; cards slide with liquid inertia
**Signature:** Stories ride a liquid mercury trough — cards glide on a reflective silver meniscus

## Role

- card slider (image + text per card)

## Look

Not a horizontal scroll rail. Cards sit on a liquid mercury trough and slide with reflective inertia — the active card rises from the silver meniscus.

## Motion

- Role: primary interaction
- Moves: slide-in for cards, mercury ripple pulse on change
- Durations: `motionDuration.standard` for card transitions; `motionDuration.emphasis` for ripple
- prefers-reduced-motion: instant card swap, no ripple

## Page behavior

- Root: `min-h-[100svh] w-full`
- Centered mercury trough stage

## Neighbors

- Above: GneissStormHero
- Below: SiltLayerSplit

## Width model

- Full browser width; no max-width on root

## Image ratios

- Card image: 16/10 — cropped with object-cover via RatioImage

## Headlines

- Section title: HTML h2

## Responsive (mobile → tablet → desktop → large)

- Mobile: single card, swipe gesture, smaller trough
- Tablet: same layout, larger cards
- Desktop: arrow controls + swipe
- Large: trough spans full width with generous card scale
