# SignalBeacon

## Creative direction

**Style:** Brutalist
**Typography:** Heavy uppercase labels; monospace input text
**Layout:** Vertical radio tower spine with signal bars beside each field
**Color:** Concrete gray (#d4d0c8) + hazard orange (#ff5c00) transmit bar
**Motion:** Primary — signal bars fill as fields gain content; transmit bar slides on submit
**Signature:** Contact form as a broadcast tower — field strength visualized as stacked bars

## Role

- contact form

## Look

- A brutalist transmission column: name, email, message fields each grow a signal-strength stack as you type; orange transmit slab at the base.
- Domain-agnostic — works for studio inquiries, product waitlists, or support.

## Motion

- Role: primary interaction
- Moves: scale-in bars, slide-in transmit, micro focus rings
- Durations: micro for bar growth, standard for submit state
- prefers-reduced-motion: bars jump to level instantly

## Page behavior

- Root: `min-h-[100svh] w-full`
- Form centered but stage is full bleed concrete field

## Neighbors

- Above: image+text
- Below: footer archway

## Width model

- Full browser width; form column max ~28rem centered inside stage (inner measure OK)

## Image ratios

- N/A

## Headlines

- Primary: HTML h1 uppercase
- Labels: HTML

## Responsive (mobile → tablet → desktop → large)

- Mobile: full-width form column with px-5, bars on left of each field
- Tablet: same with larger type
- Desktop: form offset left third, empty concrete on right
- Large: transmit bar spans form width with oversized label

## 3D

- None
