# GlacierCrestFloor

## Creative direction

**Style:** Luxury
**Typography:** Ice-crystal brand lettering; frost-blue link text
**Layout:** Glacier crest footer with crystalline ice shelves descending from a blue crest
**Color:** Glacier blue `#a8d8ea` + ice white `#e8f4fc` + deep crevasse `#1a2838`
**Motion:** Slow ice shimmer on crest; shelf fade-in on load
**Signature:** Navigation links sit on descending ice shelf slabs below a crystalline glacier crest

## Role

- footer

## Look

Not a thin footer bar. A full-viewport glacier terminus where the brand lives on the ice crest and navigation links descend on crystalline shelf slabs.

## Motion

- Role: chrome
- Moves: fade-in for shelves, subtle ice shimmer on crest
- Durations: `motionDuration.standard` for shelves; `motionDuration.emphasis` for crest
- prefers-reduced-motion: static ice, no shimmer

## Page behavior

- Root: `min-h-[100svh] w-full`
- Centered crest with descending shelves

## Neighbors

- Above: AnvilStrikeForm
- Below: page end

## Width model

- Full browser width; no max-width on root

## Image ratios

- N/A

## Headlines

- Brand: HTML text on ice crest

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked shelves, smaller crest
- Tablet: same layout with larger type
- Desktop: centered ice formation
- Large: shelves use extra viewport width
