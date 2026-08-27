# FjordMistFloor

## Reference

- **Source type:** award site
- **Awards URL:** https://www.awwwards.com/sites/visit-norway
- **Live / pen URL:** https://www.visitnorway.com/
- **Site / pen name:** Visit Norway
- **Section lifted:** Page footer — layered cliff shelves descending into mist with navigation on each tier
- **Why it fits the role:** Full-viewport closing band with environmental depth, not a thin link row
- **Adaptation notes:** Fjord cliff tiers with drifting mist; brand on highest shelf; links on descending ledges

## Creative direction

**Reference:** https://www.visitnorway.com/ — footer closing band with landscape depth
**Style:** Editorial
**Typography:** Bold brand stamp; light uppercase link tracking
**Layout:** Descending fjord cliff shelves fading into mist at the bottom
**Color:** Slate cliff `#3a4a58` + mist white `#e8f0f4` + deep water `#1a2838`
**Motion:** Mist drift upward; shelf fade-in stagger
**Signature:** Navigation links sit on descending cliff shelves that fade into rising fjord mist
**Faithful to reference:** Layered landscape footer with depth and mist atmosphere
**Changed for repo:** Stylized cliff SVG tiers; props API; reduced-motion

## Role

- footer

## Look

Not a thin link row. Brand sits on the highest cliff shelf while navigation links descend on ledges that dissolve into rising fjord mist.

## Motion

- Role: chrome
- Moves: mist drift, shelf stagger fade-in
- Durations: `motionDuration.standard` for shelves; `motionDuration.emphasis` for mist
- prefers-reduced-motion: static mist, instant shelves

## Page behavior

- Root: `min-h-[100svh] w-full`
- Vertical cliff stack centered

## Neighbors

- Above: RivetWeldForm
- Below: page end

## Width model

- Full browser width

## Image ratios

- N/A (SVG cliff tiers)

## Headlines

- Brand: HTML text stamp (footer role)

## Responsive (mobile → tablet → desktop → large)

- Mobile: narrower shelves; stacked links
- Tablet: medium shelf widths
- Desktop: full descending cliff cascade
- Large: shelves widen proportionally
