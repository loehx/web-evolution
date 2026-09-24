# StaggeredTextReveal

## Reference

- **Source type:** editorial pattern
- **Live / pen URL:** https://www.studiok95.com/
- **Site name:** Studio K95 — kinetic display type
- **Section lifted:** Oversized headline where copy arrives in a timed cascade, not as a static block
- **Why it fits the role:** Typography is the entire stage; motion is hierarchy, not decoration
- **Adaptation notes:** Stair-step line offsets + per-word unmask; scroll-triggered once; tokens + motion language

## Creative direction

**Style:** Editorial  
**Typography:** Display scale with tight leading; mono index for line count  
**Layout:** Full viewport ink field; lines hang at alternating indents like a proof sheet  
**Color:** Warm proof `#f3ece2` on press black `#0c0b0a` with a single vermillion registration mark  
**Motion:** text-reveal + stagger (loehx.com stage IntroHeadline timings)  
**Signature:** Masked uppercase lines — letters or words unmask on a 1500ms ease with 40ms / 50ms stagger  

## Modes

| Preview variant | `mode` prop |
|-----------------|-------------|
| Letter by letter — from top | `letter-from-top` (homepage default) |
| Letter by letter — from bottom | `letter-from-bottom` |
| Letter by letter — from left | `letter-from-left` |
| Word by word — from top | `word-from-top` |
| Word by word — from bottom | `word-from-bottom` |
| Word by word — from left | `word-from-left` |

Timings: intro 200ms, letter stagger 40ms, word stagger 50ms, reveal 1500ms, hidden offset 115%, ease `cubic-bezier(0, 1, 0.3, 1)`.

## Role

- typographic stage (scroll-in)

## Look

Not a centered hero. Copy climbs the viewport in a ragged column; the registration mark anchors the gutter while words surface one beat at a time.

## Motion

- Role: hero emphasis on first reveal; static after
- Moves: text-reveal, stagger
- Durations: `motionDuration.standard` per word; `motionDuration.emphasis` between lines
- prefers-reduced-motion: all lines visible immediately, no stagger

## Page behavior

- Root: `min-h-[100svh] w-full`
- Trigger: IntersectionObserver (~15% visible), animate once

## Neighbors

- Above: (page start)
- Below: (page end — sole component)

## Width model

- Mobile: lines full width, smaller display scale
- Desktop: lines max ~14ch with staggered `margin-left` steps

## Variants (preview)

1. Single line  
2. Two lines  
3. Long wrap stress  
4. Eyebrow + lines  
5. Footer kicker  
6. Right-hanging alignment  
7. Empty lines fallback  
8–20. Copy length / eyebrow / kicker permutations
