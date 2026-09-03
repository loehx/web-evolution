# LoomWeaveSplit

## Creative direction

**Style:** Editorial
**Typography:** Serif headlines, small-caps labels
**Layout:** Warp and weft threads cross the viewport between image and text columns
**Color:** Natural linen (#f2ebe0) + indigo thread (#2e4057) + terracotta accent (#c45c26)
**Motion:** Threads draw in on scroll; image reveals behind the weave
**Signature:** Animated loom threads weaving between photograph and copy columns

## Role

- image+text

## Look

- Full-viewport editorial loom: photograph on one side, headline and body on the other, with SVG warp/weft threads crossing the gutter like a handloom in motion.

## Motion

- Role: content
- Moves: image-reveal, text-reveal, stagger
- Durations: emphasis for thread draw, standard for copy
- prefers-reduced-motion: static threads, no draw animation

## Page behavior

- Root: `min-h-[100svh] w-full`
- Scroll: self-contained slice

## Neighbors

- Above: card slider
- Below: contact form

## Width model

- Full browser width; two-column on desktop

## Image ratios

- Main image: 3/4 portrait on mobile stack, 4/5 on desktop

## Headlines

- Primary: ResponsiveHeadline with serif styling
- Secondary: HTML body

## Responsive (mobile → tablet → desktop → large)

- Mobile: image top, text bottom, threads simplified
- Tablet: same stack, threads more visible
- Desktop: side-by-side with threads in gutter
- Large: threads span full height
