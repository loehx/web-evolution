# MonsoonDelugeForm

## Reference

- **Source type:** CodePen
- **Awards URL:** (n/a)
- **Live / pen URL:** https://codepen.io/dilums/pen/wvYgwzj
- **Site / pen name:** Rain effect with CSS animation
- **Section lifted:** Full-page rain animation overlay with dark atmospheric background — adapted as contact form ritual
- **Why it fits the role:** Immersive full-viewport atmosphere where form fields sit inside the deluge, not a card on a page
- **Adaptation notes:** Monsoon blue palette; rain streaks behind each field; fields glow cyan on focus like lightning

## Creative direction

**Reference:** https://codepen.io/dilums/pen/wvYgwzj — CSS rain animation overlay
**Style:** Futuristic
**Typography:** Mono field labels like weather telemetry; bold title in storm white
**Layout:** Centered form panel floating in monsoon rain — fields stack vertically with rain channels between
**Color:** Monsoon navy `#0a1a2e` + storm cyan `#00d4ff` + cloud white `#e8f4ff`
**Motion:** Rain streak fall; field lightning flash on focus; submit bar like clearing sky
**Signature:** Contact fields sit inside a monsoon deluge — rain streaks fall behind each input and cyan lightning validates on focus
**Faithful to reference:** Full-page rain atmosphere, animated streak overlay, dark moody background
**Changed for repo:** Form ritual structure; props API; reduced-motion static rain

## Role

- contact form

## Look

Not a card form. Name, email, and message fields float inside a monsoon deluge — rain streaks fall behind each input and cyan lightning flashes on focus.

## Motion

- Role: primary interaction
- Moves: rain fall, focus lightning, submit pulse
- Durations: `motionDuration.standard` for focus; `motionDuration.emphasis` for rain
- prefers-reduced-motion: static rain overlay, instant focus states

## Page behavior

- Root: `min-h-[100svh] w-full`
- Centered form panel with full-bleed rain behind

## Neighbors

- Above: SlateChalkSplit
- Below: PromontoryCrestFloor

## Width model

- Full browser width (`w-full`); no max-width on root

## Image ratios

- N/A

## Headlines

- Title: HTML h2

## Responsive (mobile → tablet → desktop → large)

- Mobile: full-width fields, reduced rain density
- Tablet: centered panel at 90% width
- Desktop: panel at max readable width centered in storm
- Large: extra title scale; denser rain at edges

## 3D

- N/A
