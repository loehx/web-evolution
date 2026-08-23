# ChiselStrikeForm

## Creative direction

**Style:** Brutalist
**Typography:** Chiseled block letters for title; mono field labels like stone mason marks
**Layout:** A limestone slab stage where each form field is carved with a chisel strike on focus
**Color:** Limestone `#e8e0d4` + charcoal `#2a2a2a` + strike orange `#d35400`
**Motion:** Chisel strike animation on focus/validation; dust particles on valid input
**Signature:** Stone-carving contact ritual where each keystroke leaves a chisel mark in the slab

## Role

- contact form

## Look

Not a card form. A quarry wall you inscribe. Fields are carved grooves; validation strikes glow orange.

## Motion

- Role: primary interaction
- Moves: strike-in on focus, fade-up on submit
- Durations: `motionDuration.standard` for strikes
- prefers-reduced-motion: instant focus states, no particle dust

## Page behavior

- Root: `min-h-[100svh] w-full`
- Form is the entire stage

## Neighbors

- Above: VellumPressSplit
- Below: CobblePathFloor

## Width model

- Full browser width; form content centered but stage is full bleed

## Image ratios

- N/A

## Headlines

- Title as HTML h2 block letters

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked fields, full-width strike bars, no hover
- Tablet: same layout, larger type
- Desktop / large: wider strike grooves, larger chisel marks
- Touch-first validation feedback

## 3D

- N/A
