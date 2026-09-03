# KilnForgeForm

## Creative direction

**Style:** Brutalist
**Typography:** Heavy uppercase titles, mono field labels
**Layout:** Horizontal heat bands pulse behind each form field like a kiln chamber
**Color:** Soot black (#1c1c1c) + forge orange (#e85d04) + white ash text
**Motion:** Heat bands intensify on focus; fields glow when valid
**Signature:** Contact ritual inside a brutalist kiln — heat bands track field focus

## Role

- contact form

## Look

- Full-viewport forge contact stage: name, email, and message fields sit inside horizontal heat bands that intensify on focus — a form that is the kiln, not a card.

## Motion

- Role: primary interaction
- Moves: scale-in, fade-in
- Durations: standard for focus bands, micro for validation
- prefers-reduced-motion: instant band change, no pulse

## Page behavior

- Root: `min-h-[100svh] w-full`
- Scroll: self-contained

## Neighbors

- Above: image+text
- Below: footer

## Width model

- Full browser width; form inset with px padding only

## Image ratios

- N/A

## Headlines

- Primary: HTML h2 uppercase
- Labels: mono uppercase

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked fields, full-width bands
- Tablet: same with larger type
- Desktop: centered form column, wider bands
- Large: bands span full viewport width
