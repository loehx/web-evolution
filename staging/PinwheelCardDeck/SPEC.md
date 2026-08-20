# PinwheelCardDeck

## Creative direction

**Style:** Playful
**Typography:** Rounded grotesk card titles, hand-numbered indices
**Layout:** Radial pinwheel — cards on spokes around a center hub; active card faces north
**Color:** Cream `#faf6ee`, ink `#121212`, coral `#ff6b4a`, sky `#7ec8e3`
**Motion:** Emphasis rotation on spoke change; stagger on card reveal; micro on nav dots
**Signature:** Pinwheel hub with numbered spokes — swipe or buttons spin the deck, not horizontal scroll

## Role

- card slider (image + text per card)

## Look

- Cards radiate from a center hub like a pinwheel; the spoke at twelve-o-clock is the reading position — not a horizontal snap rail.
- Each card carries image, title, and optional body on its spoke panel.

## Motion

- Role: primary interaction
- Moves: rotate (custom), stagger, fade-in
- Durations: emphasis on spin; standard on content
- prefers-reduced-motion: jump to card without spin animation

## Page behavior

- Root: `min-h-[100svh] w-full`
- Hub centered; spokes fill viewport height

## Neighbors

- Above: hero or intro band
- Below: editorial split or contact — pinwheel visually releases to linear flow

## Width model

- Full browser width

## Image ratios

- Card image: 4/5 portrait — cropped object-cover

## Headlines

- Card titles as HTML; section title optional ResponsiveHeadline

## Responsive

- Mobile: smaller hub, touch swipe rotates; one card readable at top
- Tablet: larger spokes, arrow buttons visible
- Desktop: full pinwheel with hover on nav
- Large: wider spokes, bigger card crops

## 3D

- None (2D radial rotation)
