# PromontoryCrestFloor

## Reference

- **Source type:** award site
- **Awards URL:** https://www.cssdesignawards.com/sites/trilha/45345
- **Live / pen URL:** https://trilha.rocket.new/
- **Site / pen name:** Trilha — Portugal adventure landing (CSS Design Awards)
- **Section lifted:** Cliff-edge footer band — brand on highest promontory crest with navigation stepping down cliff shelves into mist
- **Why it fits the role:** Dramatic closing band with layered terrain metaphor, not a flat link row
- **Adaptation notes:** Promontory cliff shelves instead of flat footer; brand on crest; links on descending ledges; mist at base

## Creative direction

**Reference:** https://trilha.rocket.new/ — cliff-edge closing section
**Style:** Editorial
**Typography:** Bold condensed brand on crest; small caps navigation on ledges
**Layout:** Descending cliff shelf tiers from promontory crest to misty base
**Color:** Cliff ochre `#c8a878` + slate rock `#4a4a48` + mist white `#e8e4e0`
**Motion:** Mist rise at base; shelf fade-in stagger; gentle parallax on crest
**Signature:** Brand stamps the highest promontory crest while navigation links descend on cliff shelf tiers into rising mist
**Faithful to reference:** Cliff-edge dramatic closing, layered terrain, brand at emotional peak
**Changed for repo:** SVG cliff shelves; props API; reduced-motion static mist

## Role

- footer

## Look

Not a flat link row. Brand crests the highest promontory while navigation links step down cliff shelf tiers into rising mist below.

## Motion

- Role: chrome
- Moves: shelf stagger fade-in, mist rise
- Durations: `motionDuration.standard` for shelves; `motionDuration.emphasis` for mist
- prefers-reduced-motion: static shelves, no mist animation

## Page behavior

- Root: `min-h-[100svh] w-full`
- Vertical cliff shelf stack centered

## Neighbors

- Above: MonsoonDelugeForm
- Below: (page end)

## Width model

- Full browser width (`w-full`); no max-width on root

## Image ratios

- N/A (SVG cliff geometry)

## Headlines

- Brand: HTML with large display type

## Responsive (mobile → tablet → desktop → large)

- Mobile: narrower shelves, stacked links
- Tablet: wider shelves, two-column link groups
- Desktop: full cliff width with three shelf tiers
- Large: extra brand scale on crest

## 3D

- N/A
