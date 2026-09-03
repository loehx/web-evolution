# TideCardRail

## Creative direction

**Style:** Editorial
**Typography:** Newsprint display on cards; captions in compact serif-feel sans
**Layout:** A horizontal tide of oversized cards that bleed off both viewport edges
**Color:** Cream `#f3efe4` + ink `#141414`
**Motion:** Snap + image-reveal on the active card
**Signature:** One card is a wave crest (larger); neighbors peek in from the gutters

## Look

Not a 3-up feature grid. A filmstrip you swipe. Image fills the card; text sits as a caption slab.

## Motion

- Role: primary interaction
- Moves: slide-in / image-reveal
- Durations: `motionDuration.standard` for snap feel (native scroll)
- prefers-reduced-motion: still swipeable, no extra animation

## Page behavior

- Root: `min-h-[100svh] w-full` with horizontal snap overflow
- Does not hijack vertical page scroll outside the stage

## Neighbors

- Above: hero
- Below: ShearSplit — rail should end cleanly at the section bottom

## Responsive (mobile → tablet → desktop → large)

- Mobile: ~88vw cards, stacked caption under image, swipe only (no hover)
- Tablet: ~70vw cards
- Desktop / large: ~58vw crest card, neighbors visible
- Arrows on desktop as extra, not required
