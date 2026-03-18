# SGS-CSC Remix

Current source and build pipeline for the SGS Computer Science site.

This repository is in a hybrid transition state. The current production build still spans legacy Nunjucks content, Astro routes, shared static assets, and migration scripts. The target is a single, typed, Astro-first site with a small number of isolated interactive experiences.

## Start Here

```bash
npm ci
npm run framework:dev
npm run framework:build
npm run deploy
```

## Where To Read First

- [Docs index](docs/README.md)
- [Architecture](docs/architecture/README.md)
- [Content model](docs/content/README.md)
- [UI system](docs/ui/README.md)
- [Migration plan](docs/migration/README.md)

## Repository Layout

- `apps/site`: Astro app and route shell for the refactored site.
- `packages/content-schema`: Current typed adapters and content contracts.
- `src`: Legacy source that still powers part of the production build during migration.
- `docs`: Agent-facing architecture, content, UI, and migration docs.
- `docs/content`: Canonical curriculum source materials (`.txt`, `.pdf`, `.docx`).
- `archive/repo-cleanup-2026-02-07`: Retired legacy material kept out of the active path.

## Build Path

The repo still builds through a bridge layer until migration phases are complete:

1. Legacy render into `public/`.
2. Astro build into `apps/site/dist`.
3. Route aliasing and non-HTML asset sync.
4. Dist hardening for public hosting.

See [docs/architecture/README.md](docs/architecture/README.md) and [docs/migration/README.md](docs/migration/README.md) for the target state and the exit path from that bridge.
