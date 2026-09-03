# BrocadeLoomSplit

## Reference

- **Source type:** other (Codrops)
- **Live / pen URL:** https://tympanus.net/Development/Scroll3DGrid/
- **Site / pen name:** Codrops — Scroll 3D Grid
- **Section lifted:** Editorial image+copy split with decorative grid texture in the gutter
- **Why it fits the role:** Asymmetric editorial block with ornamental center detail, not a plain 50/50 split
- **Adaptation notes:** Brocade crosshatch weave animates in the center gutter between photo and serif copy

## Creative direction

**Reference:** https://tympanus.net/Development/Scroll3DGrid/ — editorial split with ornamental gutter
**Style:** Luxury
**Typography:** Elegant serif SVG headlines; gold thread eyebrow
**Layout:** Two-column editorial split with animated brocade weave in center gutter
**Color:** Deep burgundy `#2a1420` + gold thread `#c9a227` + cream copy `#f0e8dc`
**Motion:** Weft threads slide horizontally; warp threads pulse vertically in gutter
**Signature:** Animated brocade crosshatch weaving through the center seam between photograph and copy
**Faithful to reference:** Editorial split with ornamental center detail
**Changed for repo:** Brocade textile metaphor; full viewport; props API; ResponsiveHeadline

## Role

- image + text

## Look

Not a plain 50/50 split. Gold brocade threads weave through the center gutter while photograph and serif copy occupy opposing columns.

## Motion

- Role: content
- Moves: thread weave animation, fade-up for copy
- Durations: `motionDuration.emphasis` for weave; `motionDuration.standard` for copy
- prefers-reduced-motion: static brocade pattern

## Page behavior

- Root: `min-h-[100svh] w-full`
- Two-column on lg; stacked on mobile

## Neighbors

- Above: OrreryPlanetDeck
- Below: RivetWeldForm

## Width model

- Full browser width

## Image ratios

- Editorial photo: `3/4` portrait on left column — cropped with RatioImage

## Headlines

- Primary: ResponsiveHeadline with explicit lines

## Responsive (mobile → tablet → desktop → large)

- Mobile: image above copy; brocade band between sections
- Tablet: side-by-side with narrower gutter
- Desktop: full split with animated brocade gutter
- Large: extra copy margin; image fills column
