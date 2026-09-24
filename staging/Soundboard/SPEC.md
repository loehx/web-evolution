# Soundboard

## Reference

- **Source type:** interactive art
- **Live URL:** https://patatap.com/
- **Site name:** Patatap (Lullatone / Jono Brandel)
- **Section lifted:** Full-screen tap-to-play sound palette — each touch is a micro-performance
- **Why it fits the role:** Playful touch-first instrument, not a content block; sound is the payoff
- **Adaptation notes:** Rising soap-bubble field instead of fullscreen flash; cursor/finger proximity pops bubbles; user-provided Stahltwiete field recordings as the sample bank

## Creative direction

**Reference:** Patatap — tap anywhere for instant sonic feedback
**Style:** Playful
**Typography:** None (pure instrument stage; optional mono hint overlay)
**Layout:** Full viewport bubble chamber — scattered spheres rising from below
**Color:** Deep ink `#0a0e1a` → twilight violet `#1a1030`; iridescent bubble rims (cyan/magenta/gold highlights)
**Motion:** Very slow vertical rise with gentle horizontal sway; burst ring + droplet scatter on contact
**Signature:** A living bubble reef you conduct with your finger — each pop releases a random field recording
**Faithful to reference:** Immediate audio reward on touch; no UI chrome between user and sound
**Changed for repo:** Bubbles as targets (not whole-screen flash); continuous slow drift; 16-sample pool

## Role

- interactive / playful instrument

## Look

Not a hero or card grid. The entire viewport is a dark aquarium of soap bubbles drifting upward. Touch or hover near a bubble and it bursts with a specular pop, playing one of sixteen short recordings.

## Motion

- Role: primary interaction
- Moves: bubble rise (12–28 px/s), horizontal sine sway, burst scale-out ring, droplet scatter
- Durations: burst uses `motionDuration.micro`–`motionDuration.standard`
- prefers-reduced-motion: bubbles rise slower; burst is instant opacity fade (no particle scatter)

## Page behavior

- Root: `min-h-[100svh] w-full`, `overflow-hidden`, `touch-none` on stage
- Pointer tracked globally on stage for hover (desktop) and touch (mobile)
- Audio unlocked on first pointer down (mobile autoplay policy)

## Neighbors

- Above: anything
- Below: anything — self-contained instrument

## Width model

- Full browser width; bubbles distributed across entire viewport width

## Image ratios

- N/A (procedural CSS bubbles)

## Headlines

- N/A — optional small fixed hint overlay only

## Responsive (mobile → tablet → desktop → large)

- Mobile: ~36 bubbles; finger touch pops; larger hit radius (1.35×)
- Tablet: ~44 bubbles; touch + optional hover
- Desktop: ~52 bubbles; cursor proximity pops; hover hit radius 1.2×
- Large: same count; bubbles scale slightly with viewport

## Audio

- 16 clips colocated in `staging/Soundboard/` (15 Stahltwiete + 1 Zähne putzen)
- Leading silence trimmed via `scripts/trim-soundboard-audio.sh start` (−60 dB, start only — ends left intact)
- Random selection per burst; `HTMLAudioElement` pool preloaded on first interaction
