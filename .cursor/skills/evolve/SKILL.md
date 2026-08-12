---
name: evolve
description: >-
  Evolve bold web components in web-evolution: invent 5 content scenarios, build
  components around them, dedupe against alive/dead, read MEMORY.md for past declines,
  research online patterns, build 20 numbered preview variants each, email Alex for
  keep/die review, log decline reasons to MEMORY.md, then move survivors to alive/
  or dead/. Use when the user invokes /evolve or asks to evolve, curate, or review
  web components.
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
- [ ] Step 1: Invent 5 content scenarios (what the component holds)
- [ ] Step 2: Scan alive/ and dead/ for duplicates
- [ ] Step 3: Name 5 bold components (rename if duplicate design)
- [ ] Step 4: Write SPEC.md per component (look, page, neighbors, resize)
- [ ] Step 5: Research similar components online; adapt clean code
- [ ] Step 6: Implement in staging/<ComponentName>/
- [ ] Step 7: Create 20 numbered preview variants per component
- [ ] Step 8: Wire preview URLs; run dev server; verify all variants
- [ ] Step 9: Present creations with numbered use-case list
- [ ] Step 10: Email Alex (alexloehn@gmail.com)
- [ ] Step 11: Append batch to CHANGELOG.md
- [ ] Step 12: On human verdict — move folders to alive/ or dead/
```

---

## Step 0 — Read memory (mandatory)

Before inventing content or designing components, read **`MEMORY.md`** at the project root.

Apply past decline lessons to this batch:
- Avoid repeated mistakes (layout, motion, naming, content patterns)
- If a declined concept is revived, it must address the documented reason and use a new name if design differs

---

## Step 1 — Five content scenarios

Invent **5 distinct content scenarios** — real things a website section would show, not abstract web jargon.

State them explicitly before designing components. Each scenario describes **what content** the component is built around.

**Examples (pick different ones each batch; do not copy this list verbatim):**

| Scenario | What it contains |
|----------|------------------|
| Brand list | Logos or names in a row/grid |
| Welcome text | Greeting headline + intro paragraph |
| Image + text | Side-by-side or stacked media and copy |
| Contact form | Name, email, message fields + submit |
| Testimonial | Quote, avatar, name, role |
| Pricing table | Tiers, features, CTA per column |
| FAQ | Question / answer pairs |
| Team grid | Photos, names, titles |
| Stats row | Big numbers + labels |
| Newsletter signup | Headline + email field |
| Feature list | Icon + title + blurb per item |
| Event schedule | Date, time, title, location |
| Product card | Image, title, price, buy button |
| Location map + hours | Address block beside hours list |

Rules:

- **Content-first** — the scenario names the payload (brands, form fields, quotes), not a CSS trick or layout keyword.
- **Diverse** — mix media-heavy, text-heavy, and interactive (forms, CTAs) across the five.
- **Generic** — avoid domain-specific payloads (API JSON, dev tools, raw code inspectors).
- **One scenario → one component** — each of the five becomes its own boldly designed component.

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

## Step 3 — Five bold components

From the **5 content scenarios**, derive **5 bold web components** — one component per scenario. Name components for their **layout or role**, not the content itself (e.g. `LogoMarqueeStrip` for a brand list, `SplitMediaCopy` for image + text, `InquiryFormBand` for a contact form).

Use specific web component names when appropriate: `Hero`, `MarqueeRibbon`, `ViewportSnapDeck`, `SkeletonReveal`, etc. — but the **preview props and variants** must showcase the chosen content scenario with realistic sample copy.

## Step 4 — Component spec (SPEC.md)

For each component, document in `SPEC.md`:

1. **Look** — typography, color, spacing, motion, media slots
2. **Content scenario** — which Step 1 scenario this component serves; list prop slots (headline, items, fields, …)
3. **Page behavior** — scroll role, z-index, sticky/fixed, section flow
4. **Neighbor behavior** — how it interacts with components above/below
5. **Viewport / resize** — mobile, tablet, desktop (see `src/lib/breakpoints.ts`), `svh`/`dvh`, overflow, reduced motion
6. **Width model** — full browser width; no fixed outer container
7. **Image ratios** — aspect ratio per image slot and crop behavior
8. **Headlines** — SVG lines via `ResponsiveHeadline`, or HTML with rationale

## Step 5 — Research and implement

1. Search for similar components online (Aceternity, shadcn, community blocks, CSS-only patterns).
2. Adapt patterns — do not copy verbatim. Use project stack: **React + TypeScript + Tailwind + Motion** (unless project differs).
3. Standards: accessible markup, `prefers-reduced-motion`, typed props, `cn()` utility, no secrets in code.
4. **New component rules** (see `.cursor/rules/new-components.mdc`):
   - **Full width** — component shell spans the browser; no `max-w-*` / `container` on the root section.
   - **Images** — every slot has a declared aspect ratio; crop with `object-cover` via `RatioImage` when possible.
   - **Viewports** — mobile, tablet, and desktop layouts; document in `SPEC.md` using `src/lib/breakpoints.ts` ranges.
   - **Headlines** — primary titles may use `ResponsiveHeadline` (dynamic SVG) for controlled line breaks; SVG scales with container width.

## Step 6 — Twenty preview variants (mandatory)

Each component gets **≥ 20 numbered variants** in `previews.tsx`.

Variants must exercise different **content shapes** for that component's scenario:

- Headline only, long headline, missing headline
- Body text: short, long, rich text, empty
- Image: portrait, landscape, missing, broken URL
- Video: autoplay loop, poster only, missing
- CTAs: none, one, two, loading/disabled
- Lists, stats, quotes, form fields, table rows (as relevant to the scenario)

Use **realistic sample content** matching the scenario (actual-looking brand names, form labels, quotes) — not generic lorem or abstract placeholders.

Number variants **1–20** (continue if more needed). Each variant needs:

```ts
{ id: 12, label: 'Long headline + portrait image + no CTA', props: { ... } }
```

### Preview page layout (required)

**All variants for a component live on a single page** — not separate routes per variant.

Implement in `src/previews/PreviewGallery.tsx`:

1. One route per component: `/preview/<ComponentName>`
2. Map `component.variants` → one `<div id="variant-{id}">` per variant
3. Each div contains:
   - **Header row** — `#id` (mono) + human label
   - **Render area** — `{component.render(variant.props)}`
4. Sticky top bar with jump links `#variant-1` … `#variant-20`
5. Full-viewport components (e.g. `ParallaxHero`, `ViewportSnapDeck`) get a **constrained height** in the list so 20 variants stay scrollable (e.g. `min-h-[32rem]` or `h-[70svh]`)

Do **not** create `/preview/<ComponentName>/<variantId>` pages. Old links should redirect to the component page.

Register in `src/previews/registry.tsx`; list only `staging/` components.

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

**Content scenarios:** brand list, welcome text, image + text, contact form, testimonial

### 1. ComponentName
- Scenario: <which content type this serves>
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
- **Body:** use verbatim template; include the **five content scenarios** from Step 1, **one link** to `<preview>/new` so Alex can browse the latest creations, and **always** include this run's Cursor agent chat URL (`cursor-cloud` MCP `run-info` → `url`) so Alex can return to this conversation

If Resend is not configured, draft the email in chat and tell Alex to connect Resend or run send manually.

## Step 9 — Changelog

Append the batch to **`CHANGELOG.md`** at the project root (newest batches first). Use the format in [reference.md](reference.md) → CHANGELOG.md.

Include all five components with a ~20-word summary each. List the batch's **content scenarios** (not web jargon words). For declined components, append the decline reason after an em dash.

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

- Skipping the alive/dead scan
- Fewer than 20 variants per component
- Variants that only change color — vary **content shape**, not just theme
- Duplicating an alive component under the same name
- **Separate routes or pages per variant** — all variants must be stacked divs on one page
- Sending email before preview URLs work
- **Omitting the Cursor agent chat link** from the email to Alex
- Moving to alive/dead before human explicitly chooses
- **Declining without writing to MEMORY.md** when a reason was provided
- **Fixed outer containers** (`max-w-*`, `container`) on new component root sections
- **Images without a declared ratio** or with `object-contain` / stretch instead of crop
- **Headlines only as fixed-px HTML** when primary title needs width-linked SVG line control
- **Abstract web jargon as Step 1 input** (viewport, payload, cache) instead of concrete content scenarios
- **Empty or lorem-only previews** — variants must use realistic sample content for the scenario (brand names, form labels, quotes)

## Additional resources

- Email template + variant matrix: [reference.md](reference.md)
- Changelog format: [reference.md](reference.md) → CHANGELOG.md
- Decline memory format: [reference.md](reference.md) → MEMORY.md
- List alive/dead/staging: [scripts/list-components.sh](scripts/list-components.sh)
