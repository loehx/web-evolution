# EstuaryTidalFloor

## Reference

- **Source type:** award site (FWA)
- **Awards URL:** https://thefwa.com/cases/the-ocean-agency
- **Live / pen URL:** https://theoceanagency.org/
- **Site / pen name:** The Ocean Agency (FWA winner)
- **Section lifted:** Page footer / closing band — fluid tidal imagery with branching navigation paths
- **Why it fits the role:** Footer as an environmental closing stage with organic water-channel layout
- **Adaptation notes:** Estuary delta branching channels; navigation links on tidal sandbars; full viewport

## Creative direction

**Reference:** https://theoceanagency.org/ — ocean/tidal closing band with fluid navigation
**Style:** Editorial
**Typography:** Wide-track brand stamp; small caps navigation on sandbar shelves
**Layout:** Estuary delta with branching water channels; brand on highest sandbar, links on lower tiers
**Color:** Tidal teal `#2a6a6a` + sand `#e8dcc8` + deep water `#0a2838`
**Motion:** Slow tidal pulse in water channels; mist drift at waterline
**Signature:** Footer as estuary delta where navigation links sit on branching tidal sandbars
**Faithful to reference:** Fluid organic footer, environmental palette, tiered navigation
**Changed for repo:** Estuary delta metaphor, props API, reduced-motion

## Role

- footer

## Look

Not a link grid. Brand crests the highest sandbar while navigation paths branch down tidal channels into the estuary mist.

## Motion

- Role: chrome
- Moves: tidal pulse in channels, mist drift
- Durations: `motionDuration.emphasis` for tidal; `motionDuration.standard` for shelf entrance
- prefers-reduced-motion: static channels, no pulse

## Page behavior

- Root: `min-h-[100svh] w-full`
- Footer owns full viewport as closing stage

## Neighbors

- Above: ShaleBedForm
- Below: (page end)

## Width model

- Full browser width

## Image ratios

- N/A (SVG channels)

## Headlines

- Brand as text stamp, not ResponsiveHeadline

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked sandbars, single column links
- Tablet: two-column link branches
- Desktop: full delta branching layout
- Large: wider channel spread
