# RelaySwitchForm

## Creative direction

**Style:** Futuristic
**Typography:** Industrial mono labels; bold condensed title
**Layout:** Dark relay rack with toggle switches that flip on focus for each form field
**Color:** Rack black `#12141a` + relay amber `#f0a030` + contact green `#3dd68c`
**Motion:** Switch flip on focus; amber glow when field valid
**Signature:** A full-viewport relay rack where each field is a toggle switch that flips closed on focus

## Role

- contact form

## Look

Not a generic form card. An industrial relay rack where name, email, and message each sit behind a flip switch that toggles on focus.

## Motion

- Role: primary interaction
- Moves: switch flip, amber glow on valid
- Durations: `motionDuration.standard` for switch flip
- prefers-reduced-motion: static switch position reflects validation

## Page behavior

- Root: `min-h-[100svh] w-full`
- Centered relay rack on dark background

## Neighbors

- Above: VerdureCanopySplit
- Below: BasaltShelfFloor

## Width model

- Full browser width; form inset with px padding only

## Image ratios

- N/A

## Headlines

- Title as HTML h2

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked fields with vertical switch column
- Desktop: wider rack panel
- Touch focus works; no hover-only content

## 3D

- N/A
