# CitadelParapetFloor

## Reference

- **Source type:** award site
- **Awards URL:** https://www.cssdesignawards.com/sites/the-reach-creative-agency/45345/
- **Live / pen URL:** https://thereach.eu/
- **Site / pen name:** The Reach — Creative Agency (CSS Design Awards)
- **Section lifted:** Bold typographic footer with high-contrast brand stamp and direct contact placement
- **Why it fits the role:** Full-viewport closing band where brand dominates, not a thin link strip
- **Adaptation notes:** Castle parapet battlements silhouette; stone rampart shelf tiers for links; medieval palette

## Creative direction

**Reference:** https://thereach.eu/ — bold typographic footer with brand dominance
**Style:** Luxury
**Typography:** Massive embossed brand crest; small caps navigation on rampart shelves
**Layout:** Parapet battlements crown the crest; navigation links on descending stone rampart tiers
**Color:** Castle stone `#4a4a48` + gold crest `#c9a227` + mist `#e8e4e0`
**Motion:** Mist rise from rampart base; shelf fade-in stagger
**Signature:** Brand crests the highest parapet while navigation links descend battlements into rising mist
**Faithful to reference:** Bold brand typography as footer centerpiece, clear navigation hierarchy
**Changed for repo:** Medieval citadel metaphor; SVG parapet silhouette; full viewport

## Role

- footer

## Look

Not a thin link strip. The brand stamps the highest parapet crest while navigation links sit on descending stone rampart tiers fading into mist below.

## Motion

- Role: chrome
- Moves: shelf fade-in, mist drift
- Durations: `motionDuration.standard` for shelf reveal; `motionDuration.emphasis` for mist
- prefers-reduced-motion: static mist, instant shelf layout

## Page behavior

- Root: `min-h-[100svh] w-full`
- Vertical centering with parapet silhouette at top

## Neighbors

- Above: GeyserVentForm
- Below: (page end)

## Width model

- Full browser width (`w-full`)

## Image ratios

- N/A (SVG parapet silhouette)

## Headlines

- Brand: large display text

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked crest then links on narrow shelves
- Tablet: wider shelves, larger crest
- Desktop: tiered rampart shelves with centered crest
- Large: maximum crest scale
