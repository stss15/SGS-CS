---
name: site-layout-patterns
description: Choose the correct SGS page shell and source of truth across the hybrid Astro plus legacy site. Use when creating or editing curriculum pages, topic indexes, textbooks, unit plans, slide pages, or route-level UI and you need to know whether to work in `apps/site/src`, `src/pages`, `src/templates`, or content collections.
---

# SGS Layout Patterns

Start by determining which route family owns the page. Edit authoritative source files only, not generated build output.

## Workflow Decision Tree

1. Determine the source of truth.
- IGCSE topic indexes and most legacy curriculum pages live in `src/pages/...` and render through Nunjucks.
- IGCSE textbooks are Astro-first and live in `apps/site/src/content/igcse-textbooks/`; treat legacy textbook `.njk` files as placeholders during migration.
- Astro shells, route wrappers, and modern components live in `apps/site/src/...`.
- Data adapters and passthrough discovery live in `packages/content-schema`.
- `public/` and `apps/site/dist` are build artifacts.

2. Choose the page shell.
- Use `src/templates/layouts/base.njk` for general legacy pages.
- Use `src/templates/layouts/arcade.njk` for sectioned topic indexes and resource landing pages.
- Use `src/templates/layouts/reader.njk` for long-form reader experiences.
- Use `src/templates/layouts/slide-deck.njk`, `src/templates/layouts/ks3-slide.njk`, or `src/templates/layouts/igcse-slide.njk` for slide decks.
- Use `src/templates/layouts/unit-plan.njk` for unit plans.
- Use `apps/site/src/layouts/BaseLayout.astro` for Astro pages and tool wrappers.

3. Preserve route compatibility.
- When migrating or wrapping legacy content, confirm whether Astro is rendering authored data directly or passing through built HTML via `LegacyHtmlDocument.astro`.
- Keep `.html` aliases and legacy route expectations working when touched.

4. Rebuild and confirm the rendered route.
- Run `npm run framework:build`.
- Check the exact route family that changed rather than assuming parity across Astro and legacy surfaces.

## References

Read `references/source-of-truth.md` when route ownership or layout choice is unclear.
