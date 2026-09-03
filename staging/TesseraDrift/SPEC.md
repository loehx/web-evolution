# TesseraDrift

## Creative direction

**Style:** Brutalist editorial  
**Typography:** No visible glyphs — the headline exists only as clustered square tesserae sampled from hidden canvas letterforms  
**Layout:** Full-viewport stage; wordmark centered; squares grouped into depth layers that shear on scroll  
**Color:** Warm ivory tesserae `#f4f1ea` on void black `#07080a`  
**Motion:** Scroll-linked parallax on group containers only (`translate3d`); no per-square motion  
**Signature:** A headline made of drifting tile clusters — letters you read without ever rendering type

## Role

- hero (domain-agnostic atmospheric opener)

## Look

The stage is a single `100svh` field. Each letter is raster-sampled into ~50–100 squares. Squares cluster into `groupCount` absolutely-positioned groups via k-means (or random when iterations = 0). Groups parallax at different depths as the user scrolls through optional `100svh` runways above and below the stage.

## Motion

- Role: hero; scroll parallax is the primary motion
- Moves: group `translate3d` driven by rAF reading viewport scroll — **never** `setState` on scroll
- Durations: continuous, proportional to stage offset from viewport center
- `prefers-reduced-motion`: parallax disabled; groups stay centered

## Page behavior

- Root: `relative w-full` + stage `min-h-[100svh]` — **no** `max-w-*` on root
- Runway toggle: identical `100svh` spacers top + bottom (same background) for scroll enter/exit testing
- Controls panel: fixed overlay (StarAscent pattern) with sliders + reshuffle
- Headline: visually hidden `<h1>` for screen readers; visible form is squares only

## Neighbors

- Above/below: optional runway spacers or any full-bleed stage
- No scroll-jacking beyond normal document flow

## Width model

- Full browser width; inner wordmark measure is intrinsic to sampled layout

## Headline strategy

- Canvas samples each glyph; threshold + subsample to `squareCount` per letter
- Not `ResponsiveHeadline` — the wordmark is pure geometry

## Copy props

- `headline` — default `DRIFT`
- All tessera tuning via settings / controls (square count, groups, parallax, colors, seed)

## Responsive (mobile → tablet → desktop → large)

- **Mobile:** centered wordmark; touch scroll drives parallax; controls scroll internally
- **Tablet / desktop:** same composition; wider tracking via `letterSpacing`
- **Large:** full bleed; parallax amplitude unchanged — depth comes from group weights

## Technical notes

- k-means clustering with `clusterIterations` (0 = random assignment)
- `clusterTightness` pulls squares toward group centroids post-cluster
- Parallax applies to group wrapper divs only; squares are absolute inside groups
- Seeded PRNG (`mulberry32`) for jitter and cluster init
