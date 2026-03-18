---
name: site-architecture-map
description: Map SGS architecture, route ownership, and source-of-truth boundaries during the refactor. Use when you need to identify which workspace, route family, content model, or subsystem owns a change, or when you are planning migration work and need the authoritative files without loading the whole repo.
---

# SGS Architecture Map

Use this skill before editing when ownership is unclear or the task crosses `src/`, `apps/site/`, `packages/content-schema/`, and `docs/content/`.

## Workflow

1. Identify the route family.
- `apps/site/src/pages` owns Astro routes and wrappers.
- `src/pages` owns legacy Nunjucks pages and most curriculum shells.
- `src/static` owns published assets and standalone experiences.
- `packages/content-schema` owns typed adapters and route discovery.
- `docs/content` owns raw source material only.

2. Identify the editing boundary.
- If the task changes routing or route ownership, start with the route family.
- If the task changes content shape, start with the content model.
- If the task changes browser behavior, start with the runtime file and its asset set.
- If the task changes presentation only, defer to the design system skills.

3. Stop at the smallest canonical source.
- Edit the source file that owns the route or asset, not the generated output.
- Avoid following adapters into build artifacts unless you are explicitly debugging a parity failure.

4. Cross-check with sibling skills.
- Use `site-layout-patterns` for shell choice once ownership is clear.
- Use `site-migration-parity` when the task involves moving or replacing a route family.
- Use `site-web-qa` when browser validation is needed.

## References

Read `references/architecture-map.md` when route ownership or subsystem boundaries are unclear.
