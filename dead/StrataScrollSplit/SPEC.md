# StrataScrollSplit

## Creative direction

**Style:** Editorial
**Typography:** Serif headline embedded in a stratum band; sans body in a lighter layer
**Layout:** Horizontal geological bands stack the viewport; image lives inside one sediment layer
**Color:** Ochre, slate, clay, chalk — earth tones, no SaaS violet
**Motion:** Content — scroll-linked parallax shifts each stratum at different rates
**Signature:** Geological strata as the layout system for image + copy

## Role

- image + text

## Look

- Five horizontal sediment bands fill the viewport; one band carries a cropped image, another carries headline and body.
- Scroll gently shears layers — depth without scroll-jacking the whole page.

## Motion

- Role: content
- Moves: parallax per stratum, fade-in on enter viewport
- Durations: emphasis for parallax range, standard for text reveal
- prefers-reduced-motion: layers static, no parallax offset

## Page behavior

- Root: `min-h-[100svh] w-full` (taller internally if many strata)
- min-height ensures at least one viewport visible

## Neighbors

- Above: card slider
- Below: contact form

## Width model

- Full browser width; strata span edge to edge

## Image ratios

- Stratum image slot: 16/10 — cropped with RatioImage

## Headlines

- Primary: ResponsiveHeadline in the headline stratum
- Body: HTML paragraphs

## Responsive (mobile → tablet → desktop → large)

- Mobile: fewer visible strata, image band full width, text below
- Tablet: image band 60% width
- Desktop: image in middle stratum left-aligned 55%, text in offset stratum
- Large: wider image crop, larger headline SVG

## 3D

- None
