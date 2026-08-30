# GeyserVentForm

## Reference

- **Source type:** CodePen
- **Live / pen URL:** https://codepen.io/NadaSadek/pen/xxRgZbq
- **Site / pen name:** Nada Sadek — CSS Coffee Steam Animation
- **Section lifted:** Rising steam vapor particles with blur, stagger, and fade — adapted as geothermal vent plumes
- **Why it fits the role:** Atmospheric contact ritual where steam responds to field focus, not a boxed form card
- **Adaptation notes:** Steam vents behind each field; geothermal mineral palette; full viewport

## Creative direction

**Reference:** https://codepen.io/NadaSadek/pen/xxRgZbq — CSS steam vapor animation
**Style:** Futuristic
**Typography:** Mono field labels; bold uppercase title
**Layout:** Full-bleed geothermal basin with vent plumes rising behind each input
**Color:** Basalt `#1a1816` + mineral teal `#00c9a7` + steam white `#e8f4f0`
**Motion:** Steam plumes intensify on field focus; vent glow on valid input
**Signature:** Geothermal steam vents pulse behind each field as you type into the mineral basin
**Faithful to reference:** Blurred rising vapor particles with staggered animation delays
**Changed for repo:** Vent plumes per field; contact form props; reduced-motion static steam

## Role

- contact form

## Look

Not a white card form. Name, email, and message fields sit in a geothermal basin where steam vents intensify on focus before the mineral submit bar seals the vent.

## Motion

- Role: primary interaction
- Moves: steam rise, vent glow on focus, submit pulse
- Durations: `motionDuration.standard` for focus glow; `motionDuration.micro` for steam cycle
- prefers-reduced-motion: static steam opacity, no rise animation

## Page behavior

- Root: `min-h-[100svh] w-full`
- Centered form panel over full-bleed geothermal void

## Neighbors

- Above: IrisPetalSplit
- Below: CitadelParapetFloor

## Width model

- Full browser width (`w-full`)

## Image ratios

- N/A (CSS steam particles)

## Headlines

- Title: HTML h2

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked fields, full-width submit
- Tablet: wider panel, same stack
- Desktop: centered panel max ~48ch for fields only (inner panel, not root)
- Large: larger title scale
