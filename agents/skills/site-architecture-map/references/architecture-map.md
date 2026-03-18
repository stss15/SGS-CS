# SGS Architecture Map

## Canonical Surfaces

- `apps/site/src`: Astro route wrappers, components, layouts, and typed content routes.
- `packages/content-schema`: adapters that bridge legacy content into typed Astro data.
- `src/pages`: legacy Nunjucks curriculum pages and route families still in production.
- `src/templates`: shared legacy layouts and fragments.
- `src/static`: published assets, standalone interactive experiences, and downloadable files.
- `docs/content`: raw curriculum source files only.
- `scripts`: build, migration, and coverage utilities.

## Route Ownership

| Family | Edit here first |
| --- | --- |
| Astro utility pages | `apps/site/src/pages` |
| IGCSE textbooks | `apps/site/src/content/igcse-textbooks` and related Astro routes |
| Legacy curriculum pages | `src/pages` and `src/templates` |
| Standalone tools and games | `src/static/js`, `src/static/css`, `src/static/data`, `src/static/...` |
| Shared route adapters | `packages/content-schema` |

## Decision Rules

- Edit the smallest source that owns the change.
- Prefer typed content collections or adapters over ad hoc page logic when the route family can support it.
- Treat generated output as disposable.
- If ownership is ambiguous, trace from the public route back to the source file and stop there.

## Useful Pairs

- `site-layout-patterns`: choose the shell once ownership is known.
- `site-migration-parity`: preserve the public contract during a move.
- `site-web-qa`: verify the browser surface after changes.
