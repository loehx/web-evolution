# BasaltShelfFloor

## Creative direction

**Style:** Brutalist
**Typography:** Heavy condensed brand stamp; mono navigation links
**Layout:** Layered basalt cliff shelves stepping down from a dark crest; brand on top shelf, links on lower slabs
**Color:** Basalt charcoal `#2a2a2e` + shelf gray `#4a4a50` + accent rust `#c45c26`
**Motion:** Slow shelf shadow drift; brand stamp scale-in
**Signature:** A brutalist cliff footer where navigation links sit on descending basalt shelf slabs

## Role

- footer

## Look

Not a thin footer bar. A full-viewport basalt cliff with layered shelf slabs stepping down — brand on the crest, links on each shelf tier.

## Motion

- Role: chrome
- Moves: shelf shadow drift, brand scale-in
- Durations: `motionDuration.emphasis` for brand; `motionDuration.standard` for links
- prefers-reduced-motion: static shelves

## Page behavior

- Root: `min-h-[100svh] w-full`
- Vertical shelf stack centered

## Neighbors

- Above: RelaySwitchForm
- Below: page end

## Width model

- Full browser width

## Image ratios

- N/A

## Headlines

- Brand as heavy HTML text

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked shelf tiers, smaller brand
- Desktop: wider shelf spans
- Touch links work; no hover-only content

## 3D

- N/A
