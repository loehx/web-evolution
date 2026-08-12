# Evolve — Reference

## Email template (verbatim)

Use this exact wording. Replace `<link-to-preview>/<component-name>` with the **component preview page** (all variants on one page):

```
https://<link-to-preview>/preview/<component-name>
```

Example: `https://preview.example.com/preview/ParallaxHero` — not `/preview/ParallaxHero/12`.

```
Subject: 5x new components for my king

Your Majesty,

I've created 5 components after your instructions.
Here we go:

1. https://<link-to-preview>/preview/<component-name>
2. https://<link-to-preview>/preview/<component-name>
3. https://<link-to-preview>/preview/<component-name>
4. https://<link-to-preview>/preview/<component-name>
5. https://<link-to-preview>/preview/<component-name>

Which ones shall live and which ones shall die?

Best regards,
Your MrRobotoOtto
```

### Resend send example

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const { data, error } = await resend.emails.send({
  from: 'Evolved Web <onboarding@resend.dev>', // replace with verified domain
  to: ['alexloehn@gmail.com'],
  subject: '5x new components for my king',
  text: `Your Majesty,

I've created 5 components after your instructions.
Here we go:

1. https://preview.example.com/preview/ComponentOne
2. https://preview.example.com/preview/ComponentTwo
3. https://preview.example.com/preview/ComponentThree
4. https://preview.example.com/preview/ComponentFour
5. https://preview.example.com/preview/ComponentFive

Which ones shall live and which ones shall die?

Best regards,
Your MrRobotoOtto`,
})

if (error) console.error(error)
else console.log('Sent:', data?.id)
```

---

## Twenty-variant content matrix

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

## SPEC.md template

```markdown
# ComponentName

## Look
- ...

## Page behavior
- ...

## Neighbors
- Above: ...
- Below: ...

## Viewport and resize
- Mobile: ...
- Tablet: ...
- Desktop: ...
- prefers-reduced-motion: ...
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
| `/preview` | Index of all staging components |
| `/preview/ComponentName` | **Single page** — all variants 1–20 in separate stacked divs |
| `/preview/ComponentName#variant-12` | In-page jump to variant #12 |

### Variant div structure

```tsx
{component.variants.map((variant) => (
  <div key={variant.id} id={`variant-${variant.id}`} className="scroll-mt-28 ...">
    <div>{/* header: #{variant.id} + {variant.label} */}</div>
    <div>{component.render(variant.props)}</div>
  </div>
))}
```

No per-variant routes. Email links point to the component page; humans reference `#7`, `#14`, etc. in feedback.

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
**Batch:** optional short context, e.g. "evolve batch 2, words: cache modal gradient …"
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

For remote review, deploy preview (Vercel/Netlify) or tunnel local dev (`ngrok`, Cloudflare Tunnel) and put those URLs in the email.
