# Source Of Truth And Layout Map

## Never Edit Build Artifacts

Do not hand-edit:

- `public/`
- `apps/site/dist`

Those are generated outputs.

## Route Families

| Route family | Authoritative source | Typical shell | Notes |
| --- | --- | --- | --- |
| Global shell and site chrome | `src/templates/layouts/base.njk`, `apps/site/src/layouts/BaseLayout.astro` | base layout | Use when the change affects nav, footer, fonts, or shared head assets. |
| IGCSE topic indexes | `src/pages/igcse/topic*/index.njk` | `src/templates/layouts/arcade.njk` | Shared section ordering and resource cards live here. |
| IGCSE textbooks | `apps/site/src/content/igcse-textbooks/topic-*.md` plus Astro textbook routes | Astro reader-style route | Treat `src/pages/igcse/topic*/textbook.njk` as migration-era placeholders. |
| IB 2027 unit indexes | `src/pages/ib-2027/{sl,hl}/unit-*/index.njk` | legacy index layouts | Many Astro routes wrap or expose these through adapters. |
| IB 2027 unit plans | `src/pages/ib-2027/{sl,hl}/unit-*/unit-plan.njk` | `src/templates/layouts/unit-plan.njk` | Preserve existing frontmatter structure. |
| Legacy IB, IGCSE, and KS3 passthrough pages | `src/pages/...` and built legacy HTML discovered by `packages/content-schema` | passthrough via `LegacyHtmlDocument.astro` or legacy route | Confirm whether Astro is wrapping authored HTML or serving a dedicated Astro page. |
| Tool pages | Astro route in `apps/site/src/pages/...` plus assets in `src/static/js`, `src/static/css`, `src/static/data` | `BaseLayout.astro` | `tools/sql-playground.html` is the clearest example. |

## Layout Cheatsheet

- `src/templates/layouts/base.njk`: general-purpose legacy pages.
- `src/templates/layouts/arcade.njk`: topic indexes and sectioned resource hubs.
- `src/templates/layouts/reader.njk`: long-form reading experiences.
- `src/templates/layouts/slide-deck.njk`: general slide deck wrapper.
- `src/templates/layouts/ks3-slide.njk`: KS3 slide decks.
- `src/templates/layouts/igcse-slide.njk`: IGCSE slide decks.
- `src/templates/layouts/unit-plan.njk`: unit plans.
- `apps/site/src/layouts/BaseLayout.astro`: shared Astro page shell.
- `apps/site/src/components/LegacyHtmlDocument.astro`: render built legacy HTML inside Astro when needed.

## Route Ownership Hints

- If the page is an IGCSE textbook reader, start in the Astro content collection.
- If the page is a classic topic index or curriculum landing page, start in `src/pages/...` and its Nunjucks layout.
- If the page is a utility or app-like tool, start in an Astro route and its static assets.
- If ownership is unclear, inspect `packages/content-schema/README.md` before editing.
