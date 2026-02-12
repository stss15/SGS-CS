# SGS-CSC Remix

Current site source and build pipeline for the Firebase-hosted SGS Computer Science site.

## Active Build Path

1. `npm run build:legacy`
- Renders `src/pages` + `src/static` into `public/` via `scripts/build.js`.
- Compiles LaTeX printables from `src/printables` into `public/` (PDF downloads).

2. `npm run build --workspace @sgs/site`
- Builds Astro app in `apps/site`.

3. `npm run framework:postbuild-routes`
- Adds legacy-compatible route aliases and copies required non-HTML assets into `apps/site/dist`.

4. `npm run framework:harden-dist`
- Applies auth/meta/header hardening to generated HTML in `apps/site/dist`.

Firebase deploys from `apps/site/dist` (`firebase.json`).

## Primary Commands

```bash
npm ci
npm run framework:dev
npm run framework:build
npm run deploy
```

## Repository Layout

- `apps/site`: Astro framework app (deploy target output in `apps/site/dist`).
- `packages/content-schema`: Typed adapters that map legacy source/content into Astro routes.
- `src`: Legacy source-of-truth templates/content still used in active build pipeline.
- `src/printables`: LaTeX source for printable PDFs generated into `public/`.
- `scripts/build.js`: Legacy render step used before Astro build.
- `scripts/migration/alias-framework-html-routes.js`: Alias and asset sync step.
- `scripts/migration/harden-framework-dist.js`: Dist hardening step.
- `docs/content`: Curriculum source materials (`.txt`, `.pdf`, `.docx`).
- `agents`: Agent operating guide and repo-specific skills.
- `archive/repo-cleanup-2026-02-07`: Archived legacy/bloat content removed from active path.

## Agent Entry Point

Use:
- `agents/README.md`

And the skills under:
- `agents/skills/site-build-deploy/SKILL.md`
- `agents/skills/site-content-edit/SKILL.md`

## IGCSE Topic Index Pattern (2026-02)

- `src/pages/igcse/topic1` to `src/pages/igcse/topic10` now use sectioned index pages rendered by `layouts/arcade.njk`.
- Each topic index now starts with a boxed specification write-up (`Unit Summary`, `Unit Objectives`, `Learning Outcomes`, `Subtopic Focus`).
- Each topic index follows the same section order: `Textbook`, `Slide Decks`, `Student Activities`, `Assessments`, `Homework`, `Independent Tasks`, `Revision`.
- Blank textbook reader templates now exist at `src/pages/igcse/topic*/textbook.njk`.
- Revision visuals now open in an in-page modal carousel (no standalone image-page navigation).
- Intermediate menu pages were removed from `src/static/igcse/topic*/assessments.html` and `src/static/igcse/topic*/teaching-and-revision.html`; index pages now link directly to assessment files and revision artifacts.

## IGCSE Textbooks (Astro Content Collection)

- IGCSE textbook pages are now Astro-first and content-collection driven:
  - Route: `apps/site/src/pages/igcse/[topic]/textbook.astro`
  - Content: `apps/site/src/content/igcse-textbooks/topic-1.md` ... `topic-10.md`
  - Collection schema: `apps/site/src/content/config.ts` (`igcse-textbooks`)
- Legacy IGCSE catch-all route excludes textbook aliases so Astro is authoritative:
  - `apps/site/src/pages/igcse/[...route].astro`
- Legacy `.html` compatibility for textbook links is preserved through migration alias routes:
  - `meta/migration/wave2-routes.json` includes `/igcse/topic1/textbook.html` ... `/igcse/topic10/textbook.html`
- Textbook authoring/QA scripts:
  - `npm run igcse:textbook:source-map -- --topic <1-10>`
  - `npm run igcse:textbook:generate -- --overwrite true`
  - `npm run igcse:textbook:validate`
  - scripts live in `scripts/igcse-textbook/`
