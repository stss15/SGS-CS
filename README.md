# SGS-CSC Remix

Current site source and build pipeline for the Firebase-hosted SGS Computer Science site.

## Active Build Path

1. `npm run build:legacy`
- Renders `src/pages` + `src/static` into `public/` via `scripts/build.js`.

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
- `packages/ui`: Shared React UI primitives.
- `src`: Legacy source-of-truth templates/content still used in active build pipeline.
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
- `agents/skills/repo-archive-cleanup/SKILL.md`
