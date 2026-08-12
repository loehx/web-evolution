# Evolve Memory

Learnings from declined components. **Read this at the start of every `/evolve` run** before inventing or building.

When Alex declines a component and gives a reason, append an entry below. Format is defined in the `/evolve` skill reference (`.cursor/skills/evolve/reference.md`).

---

<!-- New entries go below this line, newest first -->

## 2026-08-12 — PayloadPanel (declined)

**Reason:** Too specific use case — more generic components are needed.
**Variant refs:** (none given)
**Lesson:** Avoid dev-tool / API-inspector patterns (endpoints, status badges, raw JSON drawers) as core library components. Prefer generic, content-agnostic building blocks: cards, media blocks, stat rows, CTAs, grids — reusable across marketing, product, and docs without a single domain baked in.
**Batch:** Initial evolved-web batch (words: viewport, payload, marquee, skeleton, parallax)
