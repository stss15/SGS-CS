# Full Framework Deployment Plan

Date: 2026-02-06
Owner: Framework migration stream (branch-first execution)

## 1. Objective

Deliver a full modern framework architecture that improves:

- Readability (clear component boundaries, typed interfaces, predictable file layout)
- Extensibility (new features added via reusable modules, not page-level copy/paste)
- Modularity (shared UI, shared content schema, isolated interactive features)
- Future-proofing (stable build, test, deployment, and migration guardrails)

Primary constraint: preserve existing public URL paths and core behavior while migrating gradually.

## 1.1 Implementation Status (2026-02-06)

The framework deployment plan is now implemented end-to-end on `codex/framework-full-migration`:

- Phase 0 completed: route baseline + parity tooling established.
- Phase 1 completed: Astro workspace + packages scaffolded and stable.
- Phase 2 completed: shared tokens/nav/breadcrumb/component foundation extracted.
- Phase 3 completed: typed content adapters/contracts + validation gate coverage expanded across migrated families.
- Phase 4 completed: Wave 2 parity/content gates expanded to full baseline route scope (398 routes).
- Phase 5 completed: raw route-level passthrough handling consolidated into reusable framework rendering components; fallback passthrough copies in postbuild remain `0`.
- Phase 6 completed: interactive runtime hardening shipped (runtime-generated inline handler strings removed from legacy JS hotspots, browser smoke checks added).
- Phase 7 completed: keep-static vs migrate classification operationalized through framework route handlers + static asset sync with no route collisions.
- Phase 8 completed: CI/CD cutover to framework-first deploy workflows with sequential migration/source/performance/smoke gates and rollback playbook.
- Phase 9 completed: production hardening artifacts in place (performance budgets, browser smoke suite, ownership map, contributor guidelines).

## 2. Chosen Target Architecture

Based on the evaluation and curated skill guidance:

- Framework shell: Astro (static-first output)
- Interactive layer: React islands for high-interactivity surfaces only
- Styling: Tailwind for new modules; preserve existing CSS variables/tokens during transition
- Build tooling: Node + npm workspaces + TypeScript for new framework code
- Testing: existing validation gate + Playwright smoke/regression suite

This is a full framework deployment target, executed incrementally to control risk.

## 3. Repository/Branch Strategy

Execution model:

1. Keep `stss15/SGS-CS` stable as production baseline.
2. Use dedicated long-lived migration branch: `codex/framework-full-migration`.
3. Run framework work in scoped sub-branches from migration branch as needed.
4. Merge into `main` only after quality gates pass.

Recommended remote structure:

- `origin` -> `https://github.com/stss15/SGS-CS.git`

Current status:

- Migration branch is active: `codex/framework-full-migration`.
- Fork is optional and can be added later if parallel external collaboration is required.

## 4. Program Phases

## Phase 0: Readiness and Guardrails

Goal:
- Freeze path contract and establish migration safety checks.

Deliverables:
- Legacy route baseline file (`meta/migration/legacy-route-baseline.json`)
- Route parity checker script against target build output
- Framework plan + worklog + decision docs

Exit criteria:
- Route baseline generated from current `public/`
- Parity check passes against legacy output
- CI-ready commands documented

## Phase 1: Monorepo and Framework Scaffold

Goal:
- Introduce framework workspace without replacing current production build.

Deliverables:
- `apps/site/` Astro scaffold
- `packages/ui/` shared component primitives
- `packages/content-schema/` typed content models
- Build commands for parallel output (legacy + framework)

Exit criteria:
- Framework app builds independently
- No impact to existing production deploy pipeline

## Phase 2: Design System Foundation

Goal:
- Standardize tokenized UI for migrated sections.

Deliverables:
- Shared token map (mapped from current CSS custom properties)
- Core components (layout shell, nav, breadcrumb, cards, resources, buttons)
- Tailwind config aligned to token map

Exit criteria:
- One migrated page family using shared primitives
- No ad-hoc style duplication in migrated pages

## Phase 3: Content Model and Data Layer

Goal:
- Replace ad-hoc frontmatter/shape drift with typed schemas.

Deliverables:
- Schema definitions for curriculum index, unit plans, cards/resources
- Content adapters for legacy data (`src/data/*.json`)
- Validation for required fields during build

Exit criteria:
- Schema validation blocks invalid content at build time
- Key templates consume typed models

## Phase 4: Route-Parity Pilot Migration

Goal:
- Migrate one representative vertical safely.

Pilot set:
- Home page
- One curriculum index
- One unit-plan page family

Deliverables:
- Equivalent framework routes with identical output URLs
- Link integrity and route parity checks passing

Exit criteria:
- 100% parity for pilot routes
- Visual and functional smoke tests pass

## Phase 5: Core Template Migration

Goal:
- Migrate high-duplication template families first.

Order:
1. Listing/index patterns
2. Unit plan layouts
3. Shared page shells

Exit criteria:
- Majority of generated pages moved to framework rendering path
- Legacy template surface reduced measurably

## Phase 6: Interactive Feature Migration

Goal:
- Migrate high-value interactive surfaces into React islands.

Targets:
- Reusable quiz/assessment components
- Shared modal/tooling systems
- Selected simulations where maintainability gain is highest

Exit criteria:
- Legacy inline event bridge no longer required for migrated surfaces
- Shared interactive component library established

## Phase 7: Legacy Static Rationalization

Goal:
- Retain static passthrough where appropriate, migrate only what benefits from framework.

Deliverables:
- Inventory classification: keep-static vs migrate
- Deletion/archival plan for obsolete standalone pages

Exit criteria:
- No dead or duplicated framework/static route collisions

## Phase 8: CI/CD Cutover

Goal:
- Make framework build the primary deploy path.

Deliverables:
- Updated CI workflow for framework build + checks
- Route parity gate in CI for migration period
- Rollback playbook

Exit criteria:
- Production deploy succeeds from framework pipeline
- Rollback procedure validated

## Phase 9: Optimization and Hardening

Goal:
- Improve performance, accessibility, maintainability after cutover.

Deliverables:
- Performance budgets (LCP/CLS/JS payload targets)
- Expanded e2e suite
- Modular ownership map and contributor guidelines

Exit criteria:
- SLO targets met
- Legacy migration backlog closed or explicitly deferred

## 5. Workstreams and Ownership

Workstream A: Architecture + Build
- Workspace setup, framework build, CI integration, route parity tooling.

Workstream B: UI System
- Shared components, token system, layout migration.

Workstream C: Content + Templates
- Schema definitions, content adapters, template migration.

Workstream D: Interactivity
- React island architecture, event bridge retirement, shared runtime utilities.

Workstream E: Testing + Quality
- Playwright smoke/regression, route/link parity, accessibility checks.

## 6. Quality Gates (Must Pass)

Per PR in migration branch:

1. Legacy validation gate:
   - `npm run validate`
2. Migration guardrail:
   - route baseline generation (as needed)
   - route parity check for migrated target output
   - pilot content parity check between legacy and framework outputs
   - consolidated gate command: `npm run migration:framework-gate`
3. Smoke tests:
   - critical route load checks
   - key interactive behavior checks

## 7. Risk Register

Risk: URL/path regressions
- Mitigation: route baseline + parity checker + redirect map.

Risk: prolonged mixed architecture complexity
- Mitigation: strict migration wave boundaries and deprecation checkpoints.

Risk: CSS drift during partial Tailwind adoption
- Mitigation: token mapping + “new modules only” Tailwind policy until core migration.

Risk: content model breakages
- Mitigation: typed schema validation and compatibility adapters.

Risk: migration stalls due scale
- Mitigation: vertical pilot milestones and phase-based acceptance criteria.

## 8. Branch Rollout Cadence

Weekly cadence:

1. Sync migration branch with `main`
2. Execute one scoped phase milestone
3. Run gates and publish status in migration worklog
4. Merge phase output to `main` only when exit criteria pass

## 9. Operational Next Actions

1. Keep production gate green before deploy:
   - `npm run migration:production-gate`
2. Maintain route/content parity contracts as pages evolve:
   - update `meta/migration/wave2-routes.json`
   - update `meta/migration/wave2-content-expectations.json`
3. Use framework-first deploy path for release:
   - Firebase/GitHub Actions workflows now deploy from `apps/site/dist`
4. If an emergency rollback is required:
   - follow `docs/framework-rollback-playbook.md`

## 10. Debug Changelog

- Canonical migration debug log:
  - `docs/framework-debug-changelog.md`
- Update this changelog after each meaningful migration change set.
- Include:
  - phase number
  - files changed
  - validation commands and outcomes
  - known risks/regressions
