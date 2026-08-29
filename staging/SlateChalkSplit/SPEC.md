# SlateChalkSplit

## Reference

- **Source type:** award site
- **Awards URL:** https://www.awwwards.com/sites/studio-k95-3
- **Live / pen URL:** https://www.studiok95.com/
- **Site / pen name:** Studio K95 (SOTD Aug 11 2026)
- **Section lifted:** Editorial image+text spread — dark aesthetic with oversized display type crossing photograph boundary
- **Why it fits the role:** Asymmetric editorial split with bold typography as design element, not a centered two-column block
- **Adaptation notes:** Chalk-on-slate metaphor; white chalk type on dark slate board; image crosses seam like K95 editorial spreads

## Creative direction

**Reference:** https://www.studiok95.com/ — editorial image+text spread
**Style:** Editorial
**Typography:** Chalk-white serif display headlines with hand-drawn underline; compact body in chalk dust gray
**Layout:** 45/55 split with photograph bleeding across the slate seam into the copy column
**Color:** Slate `#2a3238` + chalk white `#f0ece4` + dust accent `#8a9aa8`
**Motion:** Chalk dust particles drift through center gutter; text-reveal on scroll
**Signature:** Oversized chalk headline crosses the slate seam while photograph intrudes into the copy column
**Faithful to reference:** Dark editorial aesthetic, asymmetric overlap, display type as spatial element
**Changed for repo:** Chalk/slate metaphor; props API; ResponsiveHeadline; reduced-motion

## Role

- image + text

## Look

Not a 50/50 grid. Chalk headline crosses the slate board seam while the photograph bleeds into the copy column — dust particles drift through the gutter.

## Motion

- Role: content
- Moves: fade-up for copy, chalk dust drift, image-reveal
- Durations: `motionDuration.standard` for copy; `motionDuration.emphasis` for dust
- prefers-reduced-motion: static layout, no dust drift

## Page behavior

- Root: `min-h-[100svh] w-full`
- Grid overlap on desktop; stacked on mobile

## Neighbors

- Above: TurbineBladeCarousel
- Below: MonsoonDelugeForm

## Width model

- Full browser width (`w-full`); no max-width on root

## Image ratios

- Photo: `3/4` — cropped with object-cover via RatioImage

## Headlines

- Primary: ResponsiveHeadline with explicit `lines[]`

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked image above copy, dust band between
- Tablet: same stack with larger type
- Desktop: 12-col grid with image overlap and headline crossing seam
- Large: extra headline scale; deeper image bleed

## 3D

- N/A
