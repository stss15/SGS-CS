---
name: site-content-edit
description: Use when editing curriculum pages, lesson content, slide decks, or downloadable materials for the currently deployed SGS site.
---

# Site Content Editing

## When To Use

Use this skill for:
- Updating lesson pages, slides, and curriculum copy
- Updating static assets used by pages
- Updating downloadable curriculum material references

## Source of Truth

- Legacy-rendered pages and templates: `src/pages`
- Static site assets copied during legacy build: `src/static`
- Site-level listing data: `src/data/site.json`, `src/data/topics.json`
- Astro shell/layout/pages: `apps/site/src`

## Content Material Location

Keep curriculum source material (`.txt` / `.pdf`) in:
- `docs/content`

If new source files are added, place them under a relevant subfolder in `docs/content`.

## Workflow

1. Edit source content in `src/` and/or `apps/site/src/`.
2. If links/assets are affected, verify referenced files exist under `src/static`.
3. Rebuild:

```bash
npm run framework:build
```

4. Confirm key routes in generated output (`apps/site/dist`) match expected behavior.

## Guardrails

- Avoid editing generated output directly unless diagnosing build output.
- Avoid introducing duplicate content trees; archive superseded material.
- Keep naming/path conventions stable to avoid rewrite/redirect regressions.
