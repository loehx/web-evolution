---
name: evolve
description: >-
  Evolve bold web components in web-evolution: build the five required roles
  (hero, card slider, image+text, contact form, footer) with at least one 3D
  orbit model, dedupe against alive/dead, read MEMORY.md, find real references
  online (CodePen, examples, or award-winning sites — pick a section from a
  random winner, do not invent from scratch), build 20 numbered preview variants
  each, email Alex for keep/die review, log decline reasons to MEMORY.md, then
  move survivors to alive/ or dead/. Register every component in the preview
  registry with sourceUrl (clickable in preview). Use when the user invokes /evolve or asks to
  evolve, curate, or review web components.
disable-model-invocation: true
---

# Evolve

End-to-end workflow for inventing, previewing, and curating bold web components in **web-evolution**.

## Project root

The repo that contains `alive/` and `dead/`. Call `move_agent_to_root` before editing if the workspace is elsewhere.

## Folder contract

| Path | Purpose |
|------|---------|
| `staging/<ComponentName>/` | New components awaiting human review |
| `alive/<ComponentName>/` | Kept components (survived review) |
| `dead/<ComponentName>/` | Discarded components |
| `MEMORY.md` | Decline reasons and lessons learned (read before each batch) |
| `src/previews/` | Preview gallery routes + variant registry |

Each component folder must contain:

```
<ComponentName>/
├── <ComponentName>.tsx      # component implementation
├── previews.tsx               # 20 numbered variant definitions
├── SPEC.md                    # look, behavior, viewport notes
└── index.ts                   # re-export
```

## Workflow checklist

Copy and track progress:

```
Evolve Progress:
- [ ] Step 0: Read MEMORY.md for past decline lessons
- [ ] Step 1: Confirm the five required roles (hero, card slider, image+text, contact, footer)
- [ ] Step 2: Scan alive/ and dead/ for duplicates
- [ ] Step 3: Hunt online references (CodePen, examples, or award sites — no inventing from scratch)
- [ ] Step 3b: Name components + creative direction anchored to each reference (before any code)
- [ ] Step 4: Write SPEC.md (reference links, look, motion, mobile→desktop, neighbors)
- [ ] Step 5: Implement from references, then responsive + motion + reduced-motion review
- [ ] Step 6: 20 variants, wire previews (include `sourceUrl` in registry), verify
- [ ] Step 7: Present creations with numbered use-case list
- [ ] Step 8: Email Alex (alexloehn@gmail.com)
- [ ] Step 9: Append batch to CHANGELOG.md
- [ ] Step 10: On human verdict — move folders to alive/ or dead/
```

---

## Step 0 — Read memory (mandatory)

Before naming or designing components, read **`MEMORY.md`** at the project root.

Apply past decline lessons to this batch:
- Avoid repeated mistakes (layout, motion, naming, content patterns)
- If a declined concept is revived, it must address the documented reason, use a new reference, and use a new name if design differs

---

## Step 1 — Five required roles

Do **not** invent five random concepts from words. Build **exactly these five roles**, each as a bold full-viewport stage (distinct names, not `Hero` / `Footer` clones):

1. **Hero**
2. **Slider of cards** (image + text per card)
3. **Image + text**
4. **Contact module + form**
5. **Footer**

**At least one** of the five must contain a **3D model** with click/tap-hold-drag orbit (`.cursor/rules/3d-orbit.mdc`).

State the five names and which one owns the 3D before designing.

## Step 2 — Dedupe against alive and dead

Before naming or building:

1. List every folder name in `alive/` and `dead/` (and `staging/` if present).
2. Read each `SPEC.md` and skim the component for **design intent** (layout, motion, role on page).
3. **Do not recreate** a component that already lived or still lives unless the design is materially different.
4. If the concept overlaps but design differs, use a distinct name (e.g. `Hero` → `HeroBigAndBold`, `MarqueeRibbon` → `MarqueeTickerNeon`).

Run helper (optional):

```bash
bash .cursor/skills/evolve/scripts/list-components.sh
```

## Step 3 — Hunt references online (mandatory, before naming or design)

**Do not invent a spatial or motion idea from imagination.** Past batches that “designed from scratch” produced weak stages. Every component must start from a **real reference** found online.

For **each** of the five roles, find and document one reference using this order:

### Source priority (use the first that yields a strong, full-stage reference)

1. **Award-winning websites** (preferred when the role is a page section)
   - Open an awards index: [Awwwards](https://www.awwwards.com/websites/), [FWA](https://thefwa.com/), [CSS Design Awards](https://www.cssdesignawards.com/), or [Site Inspire](https://www.siteinspire.com/)
   - **Pick a random recent winner** (shuffle / pick from a different date bucket each batch — do not always use the #1 site)
   - Open the live site, scroll it, and **lift one existing section** that matches the role (hero, card slider, image+text block, contact module, footer)
   - Record: site name, awards URL, live URL, which section you copied, and what makes it bold
2. **CodePen** — search pens for the role (`hero scroll`, `card slider`, `contact form`, `footer layout`, `image text split`, etc.). Prefer pens with HTML/CSS/JS you can read, not thumbnail-only demos.
3. **Other examples** — official docs demos, `codepen.io/trending`, [Codrops](https://tympanus.net/codrops/), GitHub example repos, conference talk demos — only when awards + CodePen did not yield a usable reference for that role.

### Rules

- **Five references minimum** — one per role. Different source sites when possible (do not lift all five sections from the same award winner unless unavoidable).
- **Reference must be visual and spatial** — a layout, motion, or interaction you can see, not a abstract mood board or “inspired by minimalism”.
- **No shadcn / Aceternity / Tailwind UI as the reference** — those are implementation shortcuts, not design sources. You may still use repo primitives after you have a real reference.
- If a reference is a small widget, **scale the idea up** to `min-h-[100svh] w-full` — but keep the composition faithful to the source.
- Paste **URLs in SPEC.md** before writing creative direction. If you cannot find a reference for a role after two source attempts, say so in chat and pick a different award site or CodePen query — still do not freestyle.

See [reference.md](reference.md) → **Online reference hunt** for URL patterns and logging template.

## Step 3b — Name + creative direction (mandatory, before code)

Map each required **role** to a distinctive component name. Names come **after** references, not before.

For **each** of the five names, write a `CREATIVE DIRECTION` block in `SPEC.md` (template in [reference.md](reference.md)) that **cites the reference URL** and states what you are adapting vs. changing. Pick one style per component. Five signatures in a batch must differ. Do not open the implementation file until this exists.

Each component is a **full-viewport stage**, not a widget:

- Root: `min-h-[100svh] w-full` — no `max-w-*` on the root
- If it still works as a 400×300 card, it is too small — scale the reference up
- **Forbidden looks:** centered SaaS hero (H1 + subtitle + CTAs + orbs), 2–3 feature cards, logo cloud, FAQ, thin marquee, shadcn/Aceternity clones, reskins of existing alive/dead/staging components, **and anything with no documented online reference**
- Name the spatial or motion idea in one sentence **from the reference**. If that sentence is only “hero”, “cards”, or “marquee”, find a different reference

`MEMORY.md` “generic” means domain-agnostic, **not** visually generic.

Layout/type primitives (FullBleed, Display, Reveal, …) may be composed **inside** a stage. They must not become a stock landing-page section. Follow `.cursor/rules/design-motion-system.mdc`.

## Step 4 — Component spec (SPEC.md)

For each component, document in `SPEC.md`:

1. **Reference** — source type (award site / CodePen / other), URLs, section name, screenshot note (Step 3)
2. **Creative direction** — style, type, layout, color, motion, signature — **anchored to the reference** (Step 3b)
3. **Look** — the one-sentence spatial/motion idea **from the reference**, hierarchy, whitespace
4. **Motion** — role (hero / primary / content / chrome), named moves, durations from `src/lib/motion.ts`
5. **Page behavior** — the component **is** the page slice: `min-h-[100svh] w-full`, scroll role, z-index
6. **Neighbor behavior** — how it interacts with components above/below
7. **Responsive** — mobile → tablet → desktop → large: layout, type, spacing, crop, interaction, animation. Hover/mouse-follow desktop-only.
8. **Width / images / headlines** — full browser width; declared image ratios; `ResponsiveHeadline` when primary titles need SVG line control (see `.cursor/rules/new-components.mdc` if present)

## Step 5 — Implement from references

References were chosen in Step 3. Do not swap to a new visual idea here.

1. Re-open each reference URL and match **layout hierarchy, spacing rhythm, and motion character** — adapt to React/Tailwind/Motion, do not paste minified CodePen HTML wholesale.
2. Stack: **Vite + React + TypeScript + Tailwind + Motion**. Tokens in `src/index.css`. Durations in `src/lib/motion.ts`.
3. Standards: accessible markup, `prefers-reduced-motion`, typed props, `cn()` utility, no secrets in code.
4. After implementation, review: mobile independent of desktop, motion hierarchy, touch (no hover-required content), reduced motion.
5. If the stage includes **3D**, wire `usePointerOrbit` (`src/lib/usePointerOrbit.ts`): click/tap-hold-drag rotates X and Y so the model can be seen from all sides. See `.cursor/rules/3d-orbit.mdc`.
6. **New component rules** (see `.cursor/rules/new-components.mdc` when present): full-width root, declared image ratios / `RatioImage`, mobile-tablet-desktop, `ResponsiveHeadline` when needed.

## Step 6 — Twenty preview variants (mandatory)

Each component gets **≥ 20 numbered variants** in `previews.tsx`.

Variants must exercise different **content shapes**:

- Headline only, long headline, missing headline
- Body text: short, long, rich text, empty
- Image: portrait, landscape, missing, broken URL
- Video: autoplay loop, poster only, missing
- CTAs: none, one, two, loading/disabled
- Lists, stats, quotes, form fields, table rows (as relevant)

Use **realistic sample content** — not generic lorem or abstract placeholders.

Number variants **1–20** (continue if more needed). Each variant needs:

```ts
{ id: 12, label: 'Long headline + portrait image + no CTA', props: { ... } }
```

### Preview page layout (required)

**All variants for a component live on a single page** — not separate routes per variant.

Implement in `src/previews/PreviewGallery.tsx`:

1. One route per component: `/<ComponentName>`
2. Map `component.variants` → one `<section id="variant-{id}">` per variant
3. Each section is **full bleed**: `min-h-[100svh] w-full` — no `max-w-*`, no page padding, no bordered card around the render
4. Overlay chrome only: back link + **clickable source reference link** (`sourceUrl` from registry) + `#id` · label (`fixed` / `absolute`)
5. Do **not** shrink variants to `h-[70svh]` / `min-h-[32rem]` to pack the list — each variant owns at least one viewport

Do **not** create `/preview/<ComponentName>/<variantId>` pages. Old links should redirect to the component page.

Register in `src/previews/registry.tsx`; list only `staging/` components.

**Every registry entry must include `sourceUrl`** — the same live reference URL logged in `SPEC.md` (award site, CodePen, or other). Optional `sourceLabel` gives a short human label for the preview overlay (e.g. `Awwwards — Studio Name, hero section`). The preview gallery renders this as a fixed overlay link so Alex can open the original reference while reviewing variants. **Do not register a component without `sourceUrl`.**

Example registry entry:

```tsx
{
  name: 'GneissStormHero',
  slug: 'GneissStormHero',
  createdAt: BATCH_16_CREATED,
  sourceUrl: 'https://www.awwwards.com/sites/example-studio/',
  sourceLabel: 'Awwwards — Example Studio, hero',
  variants: gneissStormHeroVariants,
  render: (props) => <GneissStormHero {...(props as GneissStormHeroProps)} />,
},
```

Preview URLs:

```
http://localhost:5173/preview              # component index
http://localhost:5173/preview/ComponentName   # all variants, stacked divs
http://localhost:5173/preview/ComponentName#variant-12   # deep link
```

After implementation, **run the dev server** and scroll the full variant list. Spot-check edge variants (empty content, long text, missing media).

## Step 7 — Present to human

Output a catalog:

```markdown
## Evolve batch — <date>

**Roles:** hero, card slider, image+text, contact form, footer

### 1. ComponentName
- Reference: <award site / CodePen URL> — <section lifted>
- Preview: http://localhost:5173/preview/ComponentName (all 20 variants on one page)
- Jump link example: http://localhost:5173/preview/ComponentName#variant-7
- Variants: 1–20 listed in separate divs (call out fragile ones, e.g. "#7: empty headline")
- One-line use case summary

### 2. ...
```

Tell the human: *"Refer to variant numbers when giving feedback (e.g. 'PayloadPanel #14 — truncate breaks')."*

Ask: **Which ones shall live and which shall die?**

## Step 8 — Email Alex

Read [reference.md](reference.md) for the exact email template.

Send via **Resend** (read `resend` skill first):

- **To:** `alexloehn@gmail.com`
- **Subject:** `5x new components for my king`
- **Body:** use verbatim template; include the **five roles** from Step 1, **one link** to `<preview>/new`, and **always** include this run's Cursor agent chat URL (`cursor-cloud` MCP `run-info` → `url`) so Alex can return to this conversation

If Resend is not configured, draft the email in chat and tell Alex to connect Resend or run send manually.

## Step 9 — Changelog

Append the batch to **`CHANGELOG.md`** at the project root (newest batches first). Use the format in [reference.md](reference.md) → CHANGELOG.md.

Include all five components with a ~20-word summary each. List the batch's **roles**. For declined components, append the decline reason after an em dash.

## Step 10 — Keep or die

When the human decides:

| Verdict | Action |
|---------|--------|
| **Keep** | `git mv staging/<Name> alive/<Name>` (or move folder); update preview registry + barrel exports |
| **Die** | `git mv staging/<Name> dead/<Name>`; remove from active preview index (keep preview code in dead for archaeology) |

### Decline with reason → MEMORY.md

If Alex **declines** a component and gives an explanation (with or without variant numbers):

1. **Append an entry to `MEMORY.md`** before or immediately after moving to `dead/`. Newest entries first.
2. Capture verbatim (or faithfully paraphrased) **why** it was declined.
3. Add a **Lesson** line: what to do differently in future batches.
4. Include **variant refs** if provided (e.g. `#14 truncate breaks`).
5. Optionally save a short copy as `dead/<Name>/DECLINE.md` pointing to the MEMORY entry.

Do **not** skip MEMORY.md when a reason was given. If declined with no reason, still log `{ declined, no reason given }` so the batch is traceable.

On the **next** `/evolve`, Step 0 requires reading MEMORY.md and citing relevant lessons when designing replacements.

After moves:

1. Update `src/components/index.ts` (or project barrel) to export only `alive/` components.
2. Confirm build passes: `npm run build`
3. Summarize what lived and what died.

---

## Anti-patterns

- **Designing from imagination** without a documented CodePen, example, or award-site reference
- **Always using the same awards site or #1 winner** — randomize winners and sources across batches
- Skipping the alive/dead scan
- Fewer than 20 variants per component
- Variants that only change color — vary **content shape**, not just theme
- Duplicating an alive component under the same name
- Preview containers (`max-w-*`, padded cards) that clip the component from the browser edges
- Components shorter or narrower than the viewport
- Registering in `src/previews/registry.tsx` without `sourceUrl` (must match SPEC.md reference)
- Boring / template UI (generic heroes, card grids, thin ribbons)
- Using Aceternity/shadcn/Tailwind UI as the **design** reference instead of a real site or pen
- Coding before reference URLs and creative direction are in SPEC.md
- Random animation (no named move / duration token)
- Hover-only information; compressed-desktop “responsive”
- Five components in one batch sharing the same visual signature
- 3D that cannot be grabbed and orbit-rotated on pointer drag
- **Separate routes or pages per variant** — all variants must be stacked divs on one page
- Sending email before preview URLs work
- **Omitting the Cursor agent chat link** from the email to Alex
- Moving to alive/dead before human explicitly chooses
- **Declining without writing to MEMORY.md** when a reason was provided
- **Fixed outer containers** (`max-w-*`, `container`) on new component root sections
- **Images without a declared ratio** or with `object-contain` / stretch instead of crop
- **Headlines only as fixed-px HTML** when primary title needs width-linked SVG line control
- **Empty or lorem-only previews** — variants must use realistic sample content

## Additional resources

- Email template, SPEC, motion language, design rules: [reference.md](reference.md)
- Changelog format: [reference.md](reference.md) → CHANGELOG.md
- Decline memory format: [reference.md](reference.md) → MEMORY.md
- List alive/dead/staging: [scripts/list-components.sh](scripts/list-components.sh)
