# SpoolReelCarousel

## Creative direction

**Style:** Editorial
**Typography:** Film-slate mono captions; bold condensed card titles
**Layout:** Stories stack as film frames on a vertical reel spool; swipe or arrows unwind the next frame from the top
**Color:** Darkroom black `#141210` + silver reel `#c0c0c0` + amber sprocket `#e8a838`
**Motion:** Reel rotation on swipe; frame slide-down on advance
**Signature:** A full-viewport film spool where the active story peels off the reel like a developing print

## Role

- card slider

## Look

Not a horizontal scroll rail. A vertical film reel you unwind — each frame is an image+text card peeling from the spool hub.

## Motion

- Role: primary interaction
- Moves: reel rotate, frame slide-down
- Durations: `motionDuration.emphasis` for reel advance
- prefers-reduced-motion: instant snap to next card

## Page behavior

- Root: `min-h-[100svh] w-full`
- Reel centered; does not hijack vertical scroll

## Neighbors

- Above: AuroraCrownHero
- Below: PatinaOxideSplit

## Width model

- Full browser width

## Image ratios

- Card image: `16/10` — cropped with object-cover

## Headlines

- Section title as HTML h2

## Responsive (mobile → tablet → desktop → large)

- Mobile: vertical reel, swipe to advance
- Tablet: larger reel with visible frame stack
- Desktop / large: reel left, active frame right
- Touch swipe always works

## 3D

- N/A — CSS transform reel
