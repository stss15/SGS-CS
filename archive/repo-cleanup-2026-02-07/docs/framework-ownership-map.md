# Framework Ownership Map

Date: 2026-02-06
Program: Full framework deployment

## Ownership Areas

| Area | Primary Responsibility | Key Paths |
|---|---|---|
| Framework routes/layouts | Route migration, Astro rendering parity, layout composition | `apps/site/src/pages/`, `apps/site/src/layouts/`, `apps/site/src/components/` |
| Content contracts/adapters | Typed content interfaces and legacy adapter boundaries | `packages/content-schema/src/index.ts`, `packages/content-schema/README.md` |
| Migration gates/parity tooling | Route/content parity checks, aliasing, model validation | `scripts/migration/*.js`, `meta/migration/*.json` |
| Legacy build compatibility | Legacy template/source checks and quality safeguards | `scripts/build.js`, `scripts/check-*.js`, `src/templates/`, `src/pages/` |
| Deployment and CI | Framework-first build/deploy workflows, rollback readiness | `.github/workflows/*.yml`, `firebase.json`, `docs/framework-rollback-playbook.md` |
| Interactive runtime quality | Browser smoke checks and runtime event-safety migration | `src/static/js/`, `scripts/migration/smoke-framework.js` |

## Contributor Guidelines

1. Preserve URL parity:
   - Do not change route paths without updating migration route configs and parity expectations.
2. Keep migration gates sequential:
   - `npm run migration:validate-content-models`
   - `npm run migration:framework-gate`
   - `npm run migration:wave2-gate`
3. Keep source checks green:
   - `npm run check:js-syntax`
   - `npm run check:source`
4. For production hardening changes, also run:
   - `npm run check:perf:framework`
   - `npm run smoke:framework`
5. Document every meaningful migration slice:
   - Add newest entry to `docs/framework-debug-changelog.md`.
   - Update status/checklists in `docs/framework-migration-worklog.md`.

## Change Acceptance Criteria

- Route parity and content parity remain green for the configured baseline.
- No new runtime-generated inline handler strings in `src/static/js`.
- Framework dist contains required static assets and critical routes load in smoke checks.
- Rollback path remains executable via `npm run deploy:rollback-legacy`.
