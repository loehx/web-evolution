# RivetWeldForm

## Reference

- **Source type:** CodePen
- **Live / pen URL:** https://codepen.io/stevefrost/pen/ExKpKqY
- **Site / pen name:** Steve Frost — Industrial form layout
- **Section lifted:** Full-bleed dark industrial form with bold field labels and accent glow on focus
- **Why it fits the role:** Contact module as a full-viewport ritual, not a card-in-a-page
- **Adaptation notes:** Rivet heads pulse orange weld glow behind each field on focus; steel plate background

## Creative direction

**Reference:** https://codepen.io/stevefrost/pen/ExKpKqY — industrial contact form
**Style:** Brutalist
**Typography:** Stamped uppercase labels; heavy title
**Layout:** Full-viewport steel plate with rivet-column field markers
**Color:** Gunmetal `#2a2e34` + weld orange `#e85d04` + steel white `#e8ecef`
**Motion:** Rivet weld glow on field focus; submit pulse across plate
**Signature:** Orange weld glow flashes behind each field as rivet heads heat on focus
**Faithful to reference:** Industrial full-bleed form with focus accent glow
**Changed for repo:** Rivet metaphor; props API; validation states; reduced-motion

## Role

- contact form

## Look

Not a white card form. Name, email, and message fields sit on a gunmetal steel plate with rivet heads that weld-glow orange when focused.

## Motion

- Role: primary interaction
- Moves: weld glow scale-in on focus, submit pulse
- Durations: `motionDuration.standard` for glow; `motionDuration.emphasis` for submit
- prefers-reduced-motion: instant glow, no pulse

## Page behavior

- Root: `min-h-[100svh] w-full`
- Centered form column on steel plate

## Neighbors

- Above: BrocadeLoomSplit
- Below: FjordMistFloor

## Width model

- Full browser width; form column max ~32rem centered

## Image ratios

- N/A

## Headlines

- Primary: HTML h1 (form title)

## Responsive (mobile → tablet → desktop → large)

- Mobile: full-width fields; smaller rivet markers
- Tablet: centered column
- Desktop: wide plate with rivet columns flanking fields
- Large: extra vertical spacing
