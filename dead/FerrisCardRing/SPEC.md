# FerrisCardRing

## Creative direction

**Style:** Playful
**Typography:** Carnival display on cards; ticket-stub captions
**Layout:** Stories ride on a giant ferris wheel ring that rotates to bring each card to the top
**Color:** Midnight `#0f1729` + carnival gold `#f5c542` + cotton-candy pink `#ff6b9d`
**Motion:** Rotate ring on swipe/arrows; scale-in on active card
**Signature:** A full-viewport ferris wheel where the active story sits in the top gondola

## Role

- card slider

## Look

Not a horizontal scroll rail. A carnival wheel you spin — each gondola is an image+text card.

## Motion

- Role: primary interaction
- Moves: rotate ring, scale-in on active card
- Durations: `motionDuration.emphasis` for wheel spin
- prefers-reduced-motion: instant snap to next card

## Page behavior

- Root: `min-h-[100svh] w-full`
- Wheel centered; does not hijack vertical scroll

## Neighbors

- Above: hero
- Below: VellumPressSplit

## Width model

- Full browser width

## Image ratios

- Card image: `4/3` — cropped with object-cover

## Headlines

- Section title as HTML h2

## Responsive (mobile → tablet → desktop → large)

- Mobile: smaller wheel, swipe to rotate, no hover
- Tablet: medium wheel with visible neighbors
- Desktop / large: full wheel with arrow buttons as enhancement
- Touch swipe always works

## 3D

- N/A — CSS transform wheel
