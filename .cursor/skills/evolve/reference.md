# Evolve — Reference

## Online reference hunt (mandatory before design)

Every component needs a **real URL** you opened in the browser. Do not proceed to creative direction until all five roles have a logged reference.

### Awards workflow (preferred for page sections)

1. Open one awards index (rotate each batch):
   - [Awwwards — Websites](https://www.awwwards.com/websites/)
   - [The FWA](https://thefwa.com/)
   - [CSS Design Awards](https://www.cssdesignawards.com/)
   - [Site Inspire](https://www.siteinspire.com/)
2. **Pick a random winner** — e.g. scroll to a random offset, use “Honorable Mention” / “Site of the Day” from a non-consecutive day, or pick from the 5th–15th result. Avoid reusing the same site name in `MEMORY.md` / `CHANGELOG.md` when possible.
3. Open the **live site** (not just the awards profile).
4. Identify one section that fits the role:
   - Hero → first viewport or primary intro band
   - Card slider → horizontal card/track/carousel block
   - Image + text → split, overlap, or editorial image+copy block
   - Contact → form module, inquiry panel, or booking block
   - Footer → page footer or closing band
5. Log what you are lifting: composition (columns, type scale), motion (scroll, hover, reveal), and one distinctive detail.

### CodePen workflow (when the role needs motion/CSS craft)

Search examples:

| Role | Example queries |
|------|-----------------|
| Hero | `hero scroll animation`, `fullscreen hero`, `typography hero` |
| Card slider | `card slider`, `horizontal scroll cards`, `carousel drag` |
| Image + text | `image text split`, `editorial layout`, `overlap image text` |
| Contact | `contact form layout`, `inquiry form`, `split contact` |
| Footer | `footer layout`, `mega footer`, `minimal footer` |

Prefer pens with **viewable HTML/CSS/JS** and a live preview. Open the pen before citing it.

### Other example sources

- [Codrops](https://tympanus.net/codrops/) tutorials with demos
- [CodePen Trending](https://codepen.io/trending)
- Conference / product launch sites linked from awards profiles

### Reference log template (paste into each SPEC.md)

```markdown
## Reference

- **Source type:** award site | CodePen | other
- **Awards URL:** (if applicable)
- **Live / pen URL:** https://…
- **Site / pen name:**
- **Section lifted:** e.g. “homepage hero — staggered display type + full-bleed video”
- **Why it fits the role:** one sentence
- **Adaptation notes:** what stays faithful vs. what changes for this repo (tokens, full viewport, props)
```

### What counts as a bad reference

- No URL, or URL you did not open
- shadcn / Aceternity / Tailwind UI block gallery as the only source
- Thumbnail-only inspiration with no inspectable layout
- A concept you “made up” after glancing at trends
- A tiny widget you cannot scale to full viewport without inventing a new layout

---

## Email template (verbatim)

Use this exact wording. Replace `<preview>` with the deploy preview base URL (e.g. `https://deploy-preview-1--web-evolution-2026.netlify.app`) and `<agentUrl>` with this run's Cursor agent chat URL (from `cursor-cloud` MCP `run-info` → `url`):

```
<preview>/new
<agentUrl>
```

```
Subject: 5x new components for my king

Your Majesty,

I've created 5 components after your instructions.
The roles were: hero, card slider, image+text, contact form, footer.

Check them out here:

<preview>/new

Continue the review in this chat:

<agentUrl>

Which ones shall live and which ones shall die?

Best regards,
Your MrRobotoOtto
```

### Resend send example

Before sending, call `cursor-cloud` MCP **`run-info`** and use the returned `url` as `agentUrl`.

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const previewUrl = 'https://deploy-preview-1--web-evolution-2026.netlify.app/new'
const agentUrl = 'https://cursor.com/agents/bc-…' // from cursor-cloud run-info
const roles = ['hero', 'card slider', 'image+text', 'contact form', 'footer']

const { data, error } = await resend.emails.send({
  from: 'Evolved Web <onboarding@resend.dev>', // replace with verified domain
  to: ['alexloehn@gmail.com'],
  subject: '5x new components for my king',
  text: `Your Majesty,

I've created 5 components after your instructions.
The roles were: ${roles.join(', ')}.

Check them out here:

${previewUrl}

Continue the review in this chat:

${agentUrl}

Which ones shall live and which ones shall die?

Best regards,
Your MrRobotoOtto`,
})

if (error) console.error(error)
else console.log('Sent:', data?.id)
```

---

## Content scenario bank

Use as inspiration for Step 1. **Pick five different scenarios each batch** — do not repeat the same set across batches when avoidable.

| Category | Scenarios |
|----------|-----------|
| **Marketing** | Welcome text, hero CTA, promo band, newsletter signup, stats row |
| **Media** | Image + text, full-bleed gallery, video + caption, before/after pair |
| **Social proof** | Testimonial, logo / brand list, review stars, case study teaser |
| **Commerce** | Product card, pricing table, comparison table, cart summary |
| **People** | Team grid, speaker lineup, author bio, avatar + quote |
| **Navigation / info** | FAQ, feature list, step-by-step how-it-works, timeline |
| **Contact** | Contact form, location + hours, map + address, booking CTA |
| **Content** | Article excerpt, pull quote, code snippet block, download link |

Each scenario must map to **one component** with props and preview variants filled with realistic sample content for that scenario.

---

Use as a checklist when building `previews.tsx`. Combine types across variants — not every component needs every row, but cover all relevant rows and reach **≥ 20 unique combinations**.

| # | Content focus | What to test |
|---|---------------|--------------|
| 1 | Headline only | Minimal hero / title-only |
| 2 | Headline + subtext | Standard marketing copy |
| 3 | Very long headline | Wrap, balance, overflow |
| 4 | Missing headline | Fallback / aria-label |
| 5 | Short body text | Single sentence |
| 6 | Long body text | Multi-paragraph wrap |
| 7 | Empty body | Graceful empty state |
| 8 | Portrait image | Tall aspect ratio |
| 9 | Landscape image | Wide banner |
| 10 | Missing image | Placeholder or layout collapse |
| 11 | Broken image URL | Error fallback |
| 12 | Video background | autoplay muted loop |
| 13 | Video + poster | before play |
| 14 | No CTA | layout without buttons |
| 15 | Single CTA | primary action |
| 16 | Dual CTA | primary + secondary |
| 17 | Disabled / loading CTA | interaction states |
| 18 | Stat / metric block | numbers + labels |
| 19 | List / bullet content | many items |
| 20 | Code / monospace block | dev-facing content |

Add component-specific variants (e.g. PayloadPanel: streaming status, error status, huge JSON).

---

## Creative direction template (write before code)

Reference URLs from Step 3 must appear in SPEC.md first.

```markdown
## Creative direction

**Reference:** <live or pen URL> — <section lifted>
**Style:** Editorial | Brutalist | Futuristic | Luxury | Playful  (pick one — match the reference)
**Typography:** e.g. huge grotesk headlines, compact body (from reference)
**Layout:** e.g. asymmetric, wide margins, full-bleed stage (from reference)
**Color:** e.g. off-white + black + one accent (from reference)
**Motion:** e.g. slow image-reveal, fast micro hovers, scroll text (from reference)
**Signature:** one motif from the reference you can name (not “gradient orbs + Inter”)
**Faithful to reference:** layout hierarchy, spacing rhythm, motion character
**Changed for repo:** tokens, full viewport, props API, reduced-motion, touch
```

Five components in a batch must not share the same **Signature**.

## SPEC.md template

```markdown
# ComponentName

## Reference
- Source type / URLs / section lifted / adaptation notes (see reference hunt template)

## Creative direction
- Reference URL, Style / Typography / Layout / Color / Motion / Signature
- Faithful to reference vs. changed for repo

## Role
- hero | card slider | image+text | contact form | footer

## Look
- One-sentence spatial or motion idea **from the reference** (not “hero”, “cards”, or “marquee”)
- Hierarchy, type as a design element, intentional whitespace

## Motion
- Role: hero | primary interaction | content | chrome
- Moves: fade-up | fade-in | scale-in | slide-in | image-reveal | text-reveal | stagger | parallax | magnetic | marquee
- Durations: use `motionDuration` from `src/lib/motion.ts` (micro / standard / emphasis / hero)
- prefers-reduced-motion: instant static layout, no essential info in motion

## Page behavior
- Root: `min-h-[100svh] w-full` (no max-width on the stage)
- Scroll / z-index / sticky

## Neighbors
- Above: ...
- Below: ...

## Width model
- Full browser width (`w-full`); no `max-w-*` / `container` on root section

## Image ratios
- <slot name>: <ratio> — cropped with object-cover

## Headlines
- Primary: ResponsiveHeadline lines `[...]` OR HTML with reason
- Secondary: ...

## Responsive (mobile → tablet → desktop → large)
- Mobile: 1-col, smaller type, no hover-dependent UI, reduced animation
- Tablet: simplified layout, reduced type, simplified hover
- Desktop: extra columns only if the idea needs them; hover / mouse-follow OK
- Large: use the extra width; do not letterbox in a centered column
- Per breakpoint: layout, type scale, spacing, image crop, interaction, animation

## 3D (if any)
- Click/tap + hold + drag orbits X (pitch) and Y (yaw) via `usePointerOrbit`
- Touch works; hover-only spin is not enough
```

## Motion language

| Token | Time | Use |
|-------|------|-----|
| `motionDuration.micro` | 150–250ms | Hover, focus, small UI |
| `motionDuration.standard` | 300–500ms | Reveals, most transitions |
| `motionDuration.emphasis` | 600–1000ms | Primary interaction |
| `motionDuration.hero` | 1000–1500ms | Stage entrance only |

Hierarchy: **hero highly animated → primary noticeable → content subtle → chrome restrained**. A bold stage is not one where everything moves.

## Design rules (enforce in review)

1. Never a generic SaaS landing page or repeated identical cards.
2. **Every stage traces to a logged online reference** — no freestyle invention.
3. Concept before components. Asymmetry and large type are allowed; decoration without composition is not.
4. Animation must communicate hierarchy or interaction — never because it is possible.
5. Every interaction works on touch. Hover never required to understand content.
6. `prefers-reduced-motion`. Mobile is designed independently, not compressed desktop.
7. Reuse tokens and named moves; do not make every stage visually identical.

---

## New component implementation standards

| Rule | Requirement | Primitive |
|------|-------------|-----------|
| Images | Fixed aspect ratio; center-crop unlike sources | `RatioImage` from `@/components/primitives` |
| Width | No fixed outer container; span full viewport | Root `section` uses `w-full` only |
| Viewports | Mobile, tablet, desktop layouts | Breakpoints in `src/lib/breakpoints.ts`; Tailwind `md:` / `lg:` |
| Headlines | Controlled line breaks; scale with width | `ResponsiveHeadline` — SVG `width="100%"`, explicit `lines[]` |

### RatioImage example

```tsx
import { RatioImage } from '@/components/primitives'

<RatioImage src={imageUrl} alt="" ratio="16/10" />
```

### ResponsiveHeadline example

```tsx
import { ResponsiveHeadline } from '@/components/primitives'

<ResponsiveHeadline
  level={1}
  lines={['Bold web', 'components']}
  className="text-white"
/>
```

---

## Dedup decision tree

```
Same name in alive/ or dead/?
├─ Yes → Do not reuse name; pick new name or skip concept
└─ No → Similar layout/motion/role to existing component?
    ├─ Yes, design differs materially → New name (HeroBigAndBold)
    └─ Yes, essentially same → Skip; do not build
```

---

## Preview URL conventions

| URL | Purpose |
|-----|---------|
| `/new` | Latest staging creations (email link target) |
| `/preview` | Index of all staging components |
| `/preview/ComponentName` | **Single page** — all variants 1–20 in separate stacked divs |
| `/preview/ComponentName#variant-12` | In-page jump to variant #12 |

### Variant section structure (full bleed)

```tsx
{component.variants.map((variant) => (
  <section
    key={variant.id}
    id={`variant-${variant.id}`}
    className="relative min-h-[100svh] w-full overflow-hidden [&>*]:min-h-[100svh] [&>*]:w-full"
  >
    <p className="pointer-events-none absolute left-4 top-12 z-40 text-xs">
      #{variant.id} · {variant.label}
    </p>
    {component.render(variant.props)}
  </section>
))}
```

No `max-w-*` wrapper. No bordered preview card. Overlay labels only.

No per-variant routes. The email links to `/new`; humans reference component names and variant numbers (e.g. `#7`, `#14`) in feedback.

---

## MEMORY.md — decline learnings

**Path:** `MEMORY.md` (project root)

### When to write

Append when Alex declines a component and explains why. Read the full file at the **start** of every `/evolve` run.

### Entry format (newest first)

```markdown
## YYYY-MM-DD — ComponentName (declined)

**Reason:** <Alex's explanation, verbatim or faithful paraphrase>
**Variant refs:** #7, #14 (omit if none given)
**Lesson:** <One concrete rule for future batches — what to avoid or do instead>
**Batch:** optional short context, e.g. "evolve batch 3, content: brand list, welcome text, contact form, FAQ, stats row"
```

### Example

```markdown
## 2026-08-12 — PayloadPanel (declined)

**Reason:** JSON drawer feels too dev-tooly for marketing pages; want something more visual.
**Variant refs:** #14
**Lesson:** Payload-style panels should lead with visual summary, hide raw JSON behind a secondary affordance or drop it entirely for promo contexts.
```

### Optional per-component file

When moving to `dead/`, you may add:

```markdown
# dead/ComponentName/DECLINE.md

Declined 2026-08-12. See MEMORY.md entry "ComponentName (declined)".
```

For remote review, deploy preview (Netlify) or tunnel local dev (`ngrok`, Cloudflare Tunnel) and put `<preview>/new` in the email.

---

## CHANGELOG.md — batch history

**Path:** `CHANGELOG.md` (project root)

### When to write

Append after emailing Alex (Step 9). One section per evolve batch, newest first.

### Entry format

```markdown
## YYYY-MM-DD

**Roles:** hero, card slider, image+text, contact form, footer

* **ComponentName** - ~20-word summary of look, behavior, and page role.
* **AnotherComponent** - ...
```

### Example

```markdown
## 2026-08-12

**Content:** welcome hero, scrolling brand logos, image + copy split, inquiry form, customer quote

* **ParallaxHero** - Full-viewport hero with scroll-linked parallax layers for eyebrow, headline, subtitle, and CTA — adds depth and motion without scroll-jacking the page.
* **PayloadPanel** - Dev-tool panel showing API endpoint, streaming status, labeled fields, and an expandable raw JSON drawer — declined as too domain-specific for a generic component library.
```

For declined components, append the reason after an em dash on the same line. Do not remove declined entries when moving to `dead/`.
