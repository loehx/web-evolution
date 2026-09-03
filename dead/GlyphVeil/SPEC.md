# GlyphVeil

## Creative direction

**Style:** Brutalist
**Typography:** `1rem` monospace only; the headline exists as a mosaic of its own letters, revealed by a torch
**Layout:** Blank full-viewport stage; no article field, cards, or hero copy stack
**Color:** Binary stage (`ink` black / `paper` white) + white mosaic glyphs via `mix-blend-mode: difference` + neon yellow `#F5FF3D` torch disc
**Motion:** No idle flicker. Pointer/touch torch reveals headline mosaics that stay until Reset
**Signature:** A blank stage — drag a yellow torch and the name crystallizes as letters made of letters

## Role

- hero (domain-agnostic; reusable as an atmospheric opener)

## Look

The stage is empty: solid black or white. A filled neon-yellow circle sits **behind** the canvas (`z-0`). Wherever the torch has passed, headline letterforms appear at full opacity — each letter is a mosaic of itself (an `S` made of `S`). Off-pixels in the trail are `.`. Unrevealed cells stay blank. Glyphs are white and invert through `mix-blend-difference` (complement over the torch).

## Motion

- Role: hero; primary interaction is pointer/touch torch reveal
- Moves: torch scale-in + fade-in (`hero`); hint fade-up (`hero`, delayed); Reset fade-up (`hero`). Ease `[0.16, 1, 0.3, 1]`.
- Durations: none
- `prefers-reduced-motion`: same (no idle animation)

## Page behavior

- Root: `relative min-h-[100svh] w-full overflow-hidden` + `touch-action: none`
- Yellow disc: `absolute`, `z-0`, `pointer-events-none`, `aria-hidden`
- Canvas: `absolute inset-0 z-10 mix-blend-difference`
- Pointer: torch starts centered and already reveals the cells under it; first move hides the hint and shows Reset
- Hint: `MOVE TO EXPLORE` sits above the torch until the pointer moves
- Reset chip: bottom-center (`z-20`), only after explore; restores the centered torch and center reveal
- `ResizeObserver` rebuilds the letter mosaic on layout change

## Neighbors

- Above: none (page start) or any full-bleed stage
- Below: normal scroll — no scroll-jacking

## Width model

- Full browser width (`w-full`); **no** `max-w-*` / `container` on the root

## Headline strategy

- **HTML:** visually hidden `<h1>` for screen readers
- **Canvas:** each headline glyph is rasterized alone; occupied cells store that letter
- **Not** `ResponsiveHeadline`: the headline is a bitmask mosaic, not DOM type

## Aspect ratios

- None — cols/rows derive from measured `1rem` mono cells

## Copy props

- `headline` — pixel wordmark (default `Alexander Löhn` / `Web & AI Developer`)
- `tone` — `ink` (black bg) | `paper` (white bg)
- `torchRadius` — optional CSS px radius; default is `6rem` (disc is `12rem`)

## Responsive (mobile → tablet → desktop → large)

- **Mobile:** full `100svh`; finger drag is the torch; `1rem` cells
- **Tablet:** identical interaction; grid grows with width
- **Desktop / large:** full bleed; no hover-only affordance
- Touch: `touch-action: none` so drag is not stolen by scroll

## Technical notes

- Revealed letterform cells draw that headline character; other revealed cells draw `.`
- Reset clears the reveal mask; the stage is blank again
