# QuakPondHero

## Creative direction

**Style:** Playful
**Typography:** Two stacked QUAK glyphs as a viewport-square SVG, ultra-black condensed grotesk, not a marketing H1 stack
**Layout:** Full-bleed 3D flock on grass; 2D sky wash behind; type is a non-interactive stamp sized to `min(100vw, 100svh)`
**Color:** Rubber-duck yellow + orange beak, grass green ground, smooth 2D sky blue + soft cloud ellipses
**Motion:** Flock waddle (content), pick-up follow (primary), gravity drop (emphasis), optional world orbit on empty drag; clouds drift slowly in 2D
**Signature:** A pickable crowd of hundreds of ducks filling the lower half of the sky

## Role

- hero

## Look

A 3D flock on a grass lawn is the page; the sky is a smooth 2D gradient with soft blurred cloud shapes (not 3D). Ducks fill the lower half. The headline is a square SVG stamp — QUAK over QUAK — scaled to the smaller of viewport width or height, and it never intercepts pointer input.

## Motion

- Role: hero stage; primary interaction is pick-and-drop
- Moves: fade-in (canvas mount), magnetic (duck follows pointer while held), no marquee
- Durations: canvas fade-in `motionDuration.hero`; drop is physics (gravity), not a tween; waddle is continuous sine
- prefers-reduced-motion: skip waddle and 2D cloud drift; pick-up, drop, and orbit stay (user-initiated)

## Page behavior

- Root: `min-h-[100svh] w-full` (no max-width on the stage)
- Opening stage; 2D sky sits behind a transparent WebGL canvas (`absolute inset-0`); headline overlay `z-10` with `pointer-events: none`
- Preview pages mount the canvas only while the section is near the viewport (IntersectionObserver) so stacked variants do not spawn 20 GPU scenes

## Neighbors

- Above: none (page start)
- Below: any content stage — this slice does not scroll-jack; orbit/pick use `touch-action: none` only on the canvas

## Width model

- Full browser width (`w-full`); no `max-w-*` / `container` on the root section
- Headline SVG uses `width` and `height` of `min(100vw, 100svh)` so the square is the smaller viewport axis

## Image ratios

- No raster image slots. Sky/clouds are 2D CSS/SVG; grass and ducks are live 3D.

## Headlines

- Primary: dedicated SVG (not `ResponsiveHeadline`) so the glyph is a square of `min(100vw, 100svh)` rather than width-linked wrapping lines
- Default copy: `QUAK` / `QUAK`
- Accessible fallback: visually hidden text
- `pointer-events: none` on the headline overlay — never clickable

## Responsive (mobile → tablet → desktop → large)

- Mobile: ~80–100 ducks; tighter lawn; tap-hold to pick and drag; tap-hold empty sky/grass to orbit; no hover requirement
- Tablet: ~160 ducks; same gestures
- Desktop: ~220+ ducks; hover cursor grab/grabbing; drag empty space to orbit the flock
- Large: lawn and flock use the extra width; the QUAK square still keys off `min(vw, svh)` so it does not explode on ultrawide
- Per breakpoint: flock count and lawn radius change; type is always the square SVG; interaction is pointer-driven on all sizes

## 3D

- Empty sky/lawn: click/tap + hold + drag orbits pitch (X) and yaw (Y) via `usePointerOrbit` on the stage (full orbit, not a tiny tilt)
- A duck hit steals the gesture: pick up, drag, release to fall back into the crowd
- Touch: `touch-action: none` on the hit target
- Idle auto-rotate is off; waddle is flock behavior, not camera spin
- Three.js + R3F is required: hundreds of independently pickable 3D ducks with gravity cannot be done in Motion
