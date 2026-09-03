# WeirSpillFloor

## Creative direction

**Style:** Brutalist
**Typography:** Heavy condensed brand; mono legal text
**Layout:** Concrete dam weir with water spilling over the crest; navigation links on spillway slabs
**Color:** Concrete grey `#6b6b6b` + water cyan `#4ecdc4` + rust accent `#c45c26`
**Motion:** Animated water spill over weir crest; stagger on link slabs
**Signature:** A full-viewport brutalist dam where navigation links sit on concrete spillway slabs beneath overflowing water

## Role

- footer

## Look

Not a generic link list. A brutalist dam weir with animated water spilling over the crest while brand and navigation sit on concrete slabs below the spillway.

## Motion

- Role: chrome
- Moves: water flow animation, stagger on links
- Durations: `motionDuration.emphasis` for water; `motionDuration.standard` for links
- prefers-reduced-motion: static water gradient

## Page behavior

- Root: `min-h-[100svh] w-full`
- Footer as terminal page slice

## Neighbors

- Above: FuseWireForm
- Below: (page end)

## Width model

- Full browser width

## Image ratios

- N/A

## Headlines

- Brand as HTML text in crest medallion

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked slabs, smaller water animation
- Tablet / desktop: horizontal slab row below spillway
- Touch links always accessible

## 3D

- N/A
