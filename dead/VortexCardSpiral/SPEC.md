# VortexCardSpiral

## Creative direction

**Style:** Playful
**Typography:** Rounded sans titles, tight card body
**Layout:** Cards spiral inward on concentric rings; active card scales at vortex center
**Color:** Deep teal background, coral and mint card accents
**Motion:** Emphasis spin on card change; stagger fade-in on load
**Signature:** Touch-swipe vortex that pulls the next story to the eye of the spiral

## Role

- card slider (image + text per card)

## Look

- Stories sit on a descending spiral path; swipe or arrows suck the next card to the center vortex instead of a horizontal rail.

## Motion

- Role: primary interaction
- Moves: scale-in, stagger, slide-in
- Durations: emphasis for vortex rotation, standard for card content

## Page behavior

- Root: `min-h-[100svh] w-full`; spiral occupies center field

## Neighbors

- Above: hero or band
- Below: image+text or form

## Width model

- Full viewport; spiral scales with vmin

## Image ratios

- Card image: 4/5 portrait crop

## Headlines

- Section title: HTML h2 (not primary SVG headline)

## Responsive

- Mobile: smaller spiral radius, swipe gestures
- Desktop: larger cards, arrow buttons visible

## 3D

- None
