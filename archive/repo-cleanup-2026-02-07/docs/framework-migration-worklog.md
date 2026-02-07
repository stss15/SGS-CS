# Framework Migration Worklog

Date: 2026-02-06
Program: Full framework deployment (branch-first)

## Status

- Phase: 5 (native template replacement), 6 (interactive feature hardening), 7 (static rationalization), 8 (CI/CD cutover), 9 (optimization + hardening)
- Overall: Completed (framework-first deploy path active; full migration/quality/performance/smoke gates passing)
- Branch status: Active on `codex/framework-full-migration`

## Completed

- Created architectural evaluation:
  - `docs/framework-future-proofing-evaluation.md`
- Created full deployment plan:
  - `docs/framework-deployment-plan.md`
- Added migration route tooling:
  - `scripts/migration/generate-legacy-route-baseline.js`
  - `scripts/migration/check-route-parity.js`
- Added npm migration scripts in `package.json`.
- Generated legacy route baseline:
  - `meta/migration/legacy-route-baseline.json` (398 routes)
- Verified route parity checker against current legacy output.
- Added framework workspace scaffold:
  - `apps/site/` (Astro)
  - `packages/ui/` (shared UI primitives)
  - `packages/content-schema/` (typed pilot route models)
- Added pilot route definition:
  - `meta/migration/pilot-routes.json`
- Added pilot route parity checker:
  - `scripts/migration/check-pilot-route-parity.js`
- Added pilot content parity checker:
  - `scripts/migration/check-pilot-content-parity.js`
  - `meta/migration/pilot-content-expectations.json`
- Added framework and pilot scripts in root `package.json`.
- Added framework migration gate command:
  - `npm run migration:framework-gate`
- Added pilot Astro route shells:
  - `apps/site/src/pages/index.astro`
  - `apps/site/src/pages/igcse/index.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-1/unit-plan.astro`
- Installed workspace dependencies successfully (`npm install`).
- Verified framework build succeeds:
  - `npm run framework:build`
- Verified pilot parity against framework output:
  - `node scripts/migration/check-pilot-route-parity.js --target=apps/site/dist`
- Verified pilot content parity against legacy output:
  - `npm run migration:content-parity:pilot`
- Verified consolidated framework gate:
  - `npm run migration:framework-gate`
- Mapped pilot routes to legacy source data:
  - Home cards from `src/pages/index.njk` frontmatter
  - IGCSE listing from `src/data/site.json`
  - Unit plan from `src/pages/ib-2027/sl/unit-1/unit-plan.njk` frontmatter
- Added migration debug changelog:
  - `docs/framework-debug-changelog.md`
- Extracted shared Astro UI components for pilot pages:
  - `apps/site/src/components/HeroPanel.astro`
  - `apps/site/src/components/FeatureLinkGrid.astro`
  - `apps/site/src/components/TopicSectionGrid.astro`
  - `apps/site/src/components/DetailSection.astro`
  - `apps/site/src/components/SideCard.astro`
- Added Wave 2 candidate route migration:
  - `apps/site/src/pages/ib-2027/sl/unit-1/index.astro`
- Added Wave 2 additional route migrations:
  - `apps/site/src/pages/ib-2027/sl/unit-2/index.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-3/index.astro`
- Added Wave 2 additional route migrations:
  - `apps/site/src/pages/ib-2027/sl/unit-4/index.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-5/index.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-6/index.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-7/index.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-8/index.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-9/index.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-10/index.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-11/index.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-12/index.astro`
- Completed Wave 2 route family scope for SL unit indexes:
  - `/ib-2027/sl/unit-{1..12}/index.html`
- Added Wave 2 additional route migrations:
  - `apps/site/src/pages/ib-2027/sl/unit-2/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-3/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-4/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-5/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-6/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-7/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-8/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-9/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-10/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-11/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-12/unit-plan.astro`
- Completed Wave 2 route family scope for SL unit plans:
  - `/ib-2027/sl/unit-{1..12}/unit-plan.html`
- Added Wave 2 additional route migrations:
  - `apps/site/src/pages/ib-2027/hl/unit-1/index.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-2/index.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-3/index.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-4/index.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-5/index.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-6/index.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-7/index.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-8/index.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-9/index.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-10/index.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-11/index.astro`
- Completed Wave 2 route family scope for HL unit indexes:
  - `/ib-2027/hl/unit-{1..11}/index.html`
- Added Wave 2 additional route migrations:
  - `apps/site/src/pages/ib-2027/hl/unit-1/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-2/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-3/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-4/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-5/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-6/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-7/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-8/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-9/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-10/unit-plan.astro`
  - `apps/site/src/pages/ib-2027/hl/unit-11/unit-plan.astro`
- Completed Wave 2 route family scope for HL unit plans:
  - `/ib-2027/hl/unit-{1..11}/unit-plan.html`
- Added Wave 2 parity/content gate configs:
  - `meta/migration/wave2-routes.json`
  - `meta/migration/wave2-content-expectations.json`
- Added Wave 2 gate commands:
  - `npm run migration:route-parity:wave2`
  - `npm run migration:content-parity:wave2`
  - `npm run migration:wave2-gate`
- Verified Wave 2 gate:
  - `npm run migration:wave2-gate`
- Added runtime content model validation:
  - `scripts/migration/validate-content-models.js`
  - `npm run migration:validate-content-models`
- Expanded content schema adapters/contracts for SL Unit 2 index:
  - `packages/content-schema/src/index.ts`
  - `packages/content-schema/README.md`
- Expanded content schema adapters/contracts for SL Unit 3 index:
  - `packages/content-schema/src/index.ts`
  - `packages/content-schema/README.md`
- Expanded content schema adapters/contracts to generic SL unit index loading:
  - `packages/content-schema/src/index.ts` (`getIbSlUnitIndex(unitNumber)`)
  - `packages/content-schema/README.md`
- Expanded content schema adapters/contracts to generic SL unit plan loading:
  - `packages/content-schema/src/index.ts` (`getIbSlUnitPlan(unitNumber)`)
  - `packages/content-schema/README.md`
- Expanded content schema adapters/contracts to generic HL unit index loading:
  - `packages/content-schema/src/index.ts` (`getIbHlUnitIndex(unitNumber)`)
  - `packages/content-schema/README.md`
- Expanded content schema adapters/contracts to generic HL unit plan loading:
  - `packages/content-schema/src/index.ts` (`getIbHlUnitPlan(unitNumber)`)
  - `packages/content-schema/README.md`
- Expanded content model validation coverage for Wave 2:
  - `scripts/migration/validate-content-models.js` (SL Unit 1 index + SL Unit 2 index + SL Unit 3 index)
- Expanded content model validation coverage to all SL unit indexes:
  - `scripts/migration/validate-content-models.js` (auto-discover `src/pages/ib-2027/sl/unit-*/index.njk`)
- Expanded content model validation coverage to all SL unit plans:
  - `scripts/migration/validate-content-models.js` (auto-discover `src/pages/ib-2027/sl/unit-*/unit-plan.njk`)
- Expanded content model validation coverage to both SL + HL unit indexes:
  - `scripts/migration/validate-content-models.js` (auto-discover `src/pages/ib-2027/sl/unit-*/index.njk` + `src/pages/ib-2027/hl/unit-*/index.njk`)
- Expanded content model validation coverage to both SL + HL unit plans:
  - `scripts/migration/validate-content-models.js` (auto-discover `src/pages/ib-2027/sl/unit-*/unit-plan.njk` + `src/pages/ib-2027/hl/unit-*/unit-plan.njk`)
- Hardened content parity checks for entity-normalized title/text matching:
  - `scripts/migration/check-pilot-content-parity.js`
- Expanded Wave 2 parity/content expectation scope:
  - `meta/migration/wave2-routes.json` (12 SL unit index routes)
  - `meta/migration/wave2-content-expectations.json` (expectations for all 12 routes)
- Expanded Wave 2 parity/content expectation scope:
  - `meta/migration/wave2-routes.json` (24 SL routes: unit indexes + unit plans)
  - `meta/migration/wave2-content-expectations.json` (expectations for all 24 routes)
- Expanded Wave 2 parity/content expectation scope:
  - `meta/migration/wave2-routes.json` (35 IB routes: SL indexes + SL unit plans + HL indexes)
  - `meta/migration/wave2-content-expectations.json` (expectations for all 35 routes)
- Expanded Wave 2 parity/content expectation scope:
  - `meta/migration/wave2-routes.json` (46 IB routes: SL indexes/plans + HL indexes/plans)
  - `meta/migration/wave2-content-expectations.json` (expectations for all 46 routes)
- Matched legacy empty-resource rendering behavior:
  - Astro SL unit index pages now render `Content Slides` section when `resourcesTitle` exists, even if `resources` is empty.
- Extended postbuild `.html` aliasing support to Wave 2 route config:
  - `scripts/migration/alias-framework-html-routes.js` now consumes pilot + Wave 2 route definitions.
- Wired content model validation into migration gates:
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
- Added content schema contract reference:
  - `packages/content-schema/README.md`
- Verified required migration/source checks after Unit 2 migration:
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Verified required migration/source checks after Unit 3 migration:
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Verified required migration/source checks after SL unit index family completion:
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Verified required migration/source checks after SL unit plan family completion:
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Verified required migration/source checks after HL unit index family completion:
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Verified required migration/source checks after HL unit plan family completion:
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Migrated IB curriculum index routes:
  - `apps/site/src/pages/ib-2027/index.astro`
  - `apps/site/src/pages/ib-2027/sl/index.astro`
  - `apps/site/src/pages/ib-2027/hl/index.astro`
- Extracted shared nav/breadcrumb Astro components and wired through base layout:
  - `apps/site/src/components/SiteNav.astro`
  - `apps/site/src/components/Breadcrumbs.astro`
  - `apps/site/src/layouts/BaseLayout.astro`
  - `apps/site/src/styles/tokens.css`
- Expanded content schema adapters/contracts for IB curriculum indexes:
  - `packages/content-schema/src/index.ts` (`getIb2027PathwayIndex`, `getIbSlCurriculumIndex`, `getIbHlCurriculumIndex`)
  - `packages/content-schema/README.md`
- Expanded content model validation coverage for IB 2027 curriculum index frontmatter + listing-key references:
  - `scripts/migration/validate-content-models.js`
- Expanded Wave 2 scope to include IB curriculum indexes:
  - `meta/migration/wave2-routes.json` (49 IB routes)
  - `meta/migration/wave2-content-expectations.json` (expectations for all 49 routes)
- Verified required migration/source checks after IB curriculum index + nav/breadcrumb extraction:
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Migrated SL Unit 5 scenario routes:
  - `apps/site/src/pages/ib-2027/sl/unit-5/scenarios/scenario-1-animals.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-5/scenarios/scenario-2-university.astro`
  - `apps/site/src/pages/ib-2027/sl/unit-5/scenarios/scenario-3-themepark.astro`
- Expanded base layout compatibility for legacy-rich pages:
  - `apps/site/src/layouts/BaseLayout.astro` (`extraStyles` support)
- Expanded content schema adapters/contracts for SL Unit 5 scenario pages:
  - `packages/content-schema/src/index.ts` (`getIbSlUnit5Scenario(scenarioSlug)`)
  - `packages/content-schema/README.md`
- Expanded content model validation coverage for SL Unit 5 scenarios:
  - `scripts/migration/validate-content-models.js` (auto-discover `src/pages/ib-2027/sl/unit-5/scenarios/scenario-*.njk`)
- Expanded Wave 2 scope to include SL Unit 5 scenario pages:
  - `meta/migration/wave2-routes.json` (52 IB routes)
  - `meta/migration/wave2-content-expectations.json` (expectations for all 52 routes)
- Verified required migration/source checks after SL Unit 5 scenario migration:
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Migrated SL Unit 5 OOP project routes:
  - `apps/site/src/pages/ib-2027/sl/unit-5/oop-project/**/*.astro` (learner + teacher route family)
- Expanded content schema adapters/contracts for SL Unit 5 OOP project pages:
  - `packages/content-schema/src/index.ts` (`getIbSlUnit5OopProjectPage(pagePath)`)
  - `packages/content-schema/README.md`
- Expanded Wave 2 scope to include SL Unit 5 OOP project pages:
  - `meta/migration/wave2-routes.json` (78 IB routes)
  - `meta/migration/wave2-content-expectations.json` (expectations for all 78 routes)
- Migrated SL/HL unit slide routes via raw-HTML passthrough:
  - `apps/site/src/pages/ib-2027/[level]/[unit]/slides/[slide].astro`
- Expanded content schema adapters/contracts for IB unit slide route discovery + passthrough:
  - `packages/content-schema/src/index.ts` (`getIb2027UnitSlideRoutes`, `getIb2027UnitSlideHtml`)
  - `packages/content-schema/README.md`
- Expanded content model validation coverage for IB unit slide source files:
  - `scripts/migration/validate-content-models.js` (auto-discover `src/pages/ib-2027/{sl,hl}/unit-*/slides/*.html`)
- Expanded Wave 2 scope to include all SL/HL unit slide routes:
  - `meta/migration/wave2-routes.json` (116 IB routes)
  - `meta/migration/wave2-content-expectations.json` (expectations for all 116 routes)
- Verified required migration/source checks after OOP project + unit slide migration:
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Migrated remaining IB 2027 alias routes:
  - `apps/site/src/pages/ib-2027/[level]/slides/[slide].astro` (`/ib-2027/{sl,hl}/slides/*.html`)
  - `apps/site/src/pages/ib-2027/[level]/scenarios/[scenario].astro` (`/ib-2027/{sl,hl}/scenarios/*.html`)
  - `apps/site/src/pages/ib-2027/hl/unit-4/scenarios/[scenario].astro` (`/ib-2027/hl/unit-4/scenarios/*.html`)
- Expanded content schema adapters/contracts for IB 2027 alias route passthrough:
  - `packages/content-schema/src/index.ts` (`getIb2027SlideAliasRoutes`, `getIb2027ScenarioAliasRoutes`, `getIb2027AliasRouteHtml`)
  - `packages/content-schema/README.md`
- Expanded content model validation coverage for IB 2027 alias route source HTML:
  - `scripts/migration/validate-content-models.js` (auto-discover `public/ib-2027/{sl,hl}/slides/*.html` and alias scenario files)
- Expanded Wave 2 scope to full IB 2027 route parity family:
  - `meta/migration/wave2-routes.json` (157 IB routes)
  - `meta/migration/wave2-content-expectations.json` (expectations for all 157 routes)
- Expanded Wave 2 scope from IB-only to full legacy baseline parity coverage:
  - `meta/migration/wave2-routes.json` (398 routes)
  - `meta/migration/wave2-content-expectations.json` (expectations for all 398 routes)
- Extended framework postbuild aliasing with legacy fallback passthrough for missing configured routes:
  - `scripts/migration/alias-framework-html-routes.js` (`--legacy` support + direct copy fallback from `public/`)
- Stabilized Wave 2 content parity expectations for legacy multiline title formatting:
  - `meta/migration/wave2-content-expectations.json` (4 IGCSE route title expectations switched to stable text fragments)
- Migrated Nunjucks-backed `/ib` route family to native Astro passthrough:
  - `apps/site/src/pages/ib/index.astro`
  - `apps/site/src/pages/ib/[section]/[page].astro`
- Expanded content schema adapters/contracts for `/ib` route discovery + passthrough:
  - `packages/content-schema/src/index.ts` (`getIbLegacyNunjucksRoutes`, `getIbLegacyRouteHtml`)
  - `packages/content-schema/README.md`
- Expanded content model validation coverage for `/ib` source families:
  - `scripts/migration/validate-content-models.js` (auto-discover `src/pages/ib/**/*.njk`, validate mapped `public/ib/*.html` source parity inputs)
- Migrated `/igcse` legacy route family to native Astro passthrough:
  - `apps/site/src/pages/igcse/[...route].astro` (all `/igcse/**/*.html` except `/igcse/index.html`, which remains dedicated Astro)
- Expanded content schema adapters/contracts for IGCSE legacy passthrough discovery:
  - `packages/content-schema/src/index.ts` (`getIgcseLegacyRoutes`, `getIgcseLegacyRouteHtml`)
  - `packages/content-schema/README.md`
- Expanded content model validation coverage for IGCSE legacy route source HTML:
  - `scripts/migration/validate-content-models.js` (auto-discover `public/igcse/**/*.html`)
- Verified required migration/source checks after IB 2027 alias route migration:
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Verified required migration/source checks after Wave 2 full baseline expansion (sequential):
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Verified required migration/source checks after `/ib` native route migration (sequential):
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Verified required migration/source checks after `/igcse` native route migration (sequential):
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Migrated remaining Wave 2 fallback families to native framework route handlers:
  - `apps/site/src/pages/ks3/[...route].astro`
  - `apps/site/src/pages/ib/[...route].astro`
  - `apps/site/src/pages/404.astro`
  - `apps/site/src/pages/admin.astro`
  - `apps/site/src/pages/coming-soon.astro`
- Expanded content schema adapters/contracts for final legacy route families:
  - `packages/content-schema/src/index.ts` (`getIbLegacyAllRoutes`, `getKs3LegacyRoutes`, `getKs3LegacyRouteHtml`, `getRootLegacyRouteHtml`)
  - `packages/content-schema/README.md`
- Expanded content model validation coverage for final Wave 2 families:
  - `scripts/migration/validate-content-models.js` (adds `public/ib/**/*.html`, `public/ks3/**/*.html`, `public/{404,admin,coming-soon}.html`)
- Hardened postbuild alias normalization for Astro-emitted `*.html/index.html` directories:
  - `scripts/migration/alias-framework-html-routes.js` (collapses directory-form `*.html` outputs to canonical file routes)
- Verified required migration/source checks after fallback elimination (sequential):
  - `npm run migration:validate-content-models`
  - `npm run migration:framework-gate`
  - `npm run migration:wave2-gate`
  - `npm run check:js-syntax`
  - `npm run check:source`
- Converted runtime-generated inline handler strings to delegated/native event listeners in shared legacy JS:
  - `src/static/js/activity-igcse-topic1-negative-numbers.js`
  - `src/static/js/game-binary-stacker.js`
  - `src/static/js/game-binary-addition.js`
  - `src/static/js/sigma7-map.js`
  - `src/static/js/flashcards.js`
- Added source-hygiene enforcement for runtime-generated inline handler strings:
  - `scripts/check-source-hygiene.js`
- Replaced repeated page-level raw passthrough rendering with reusable framework componentized rendering:
  - `apps/site/src/components/LegacyHtmlDocument.astro`
  - `apps/site/src/pages/404.astro`
  - `apps/site/src/pages/admin.astro`
  - `apps/site/src/pages/coming-soon.astro`
  - `apps/site/src/pages/ib/index.astro`
  - `apps/site/src/pages/ib/[section]/[page].astro`
  - `apps/site/src/pages/ib/[...route].astro`
  - `apps/site/src/pages/igcse/[...route].astro`
  - `apps/site/src/pages/ks3/[...route].astro`
  - `apps/site/src/pages/ib-2027/[level]/[unit]/slides/[slide].astro`
  - `apps/site/src/pages/ib-2027/[level]/slides/[slide].astro`
  - `apps/site/src/pages/ib-2027/[level]/scenarios/[scenario].astro`
  - `apps/site/src/pages/ib-2027/hl/unit-4/scenarios/[scenario].astro`
- Hardened framework postbuild artifact for production deploy parity:
  - `scripts/migration/alias-framework-html-routes.js` (non-HTML asset sync from legacy output)
- Completed framework-first CI/CD cutover with parity + quality + hardening gates:
  - `.github/workflows/firebase-hosting.yml`
  - `.github/workflows/pages.yml`
  - `firebase.json` (hosting deploy target `apps/site/dist`)
  - `package.json` (`serve`, `deploy`, `preview`, rollback deploy path)
- Added rollback automation + playbook:
  - `scripts/migration/stage-legacy-rollback-artifact.js`
  - `docs/framework-rollback-playbook.md`
- Added performance budgets and browser smoke coverage:
  - `meta/migration/performance-budgets.json`
  - `scripts/migration/check-framework-performance-budgets.js`
  - `scripts/migration/smoke-framework.js`
  - `package.json` (`check:perf:framework`, `smoke:framework`, `migration:production-gate`)
- Added ownership map and contributor guidance:
  - `docs/framework-ownership-map.md`
- Updated deployment/migration planning docs for framework-first production operation:
  - `docs/BUILD_AND_DEPLOY.md`
  - `docs/framework-deployment-plan.md`
- Verified full production gate:
  - `npm run migration:production-gate`

## In Progress

- None.

## Next

1. Keep release quality checks green with the single command:
   - `npm run migration:production-gate`
2. For future route changes, update Wave 2 configs in lockstep:
   - `meta/migration/wave2-routes.json`
   - `meta/migration/wave2-content-expectations.json`
3. Use rollback playbook only for production incidents:
   - `docs/framework-rollback-playbook.md`

## Phase Checklist

## Phase 0

- [x] Framework decision documented
- [x] Full deployment plan documented
- [x] Route tooling created
- [x] Baseline generated and parity-validated
- [x] Branch workflow established

## Phase 1

- [x] Astro workspace scaffolded
- [x] Parallel build path configured
- [x] Pilot routes selected and mapped
- [x] Framework dependencies installed and build verified

## Phase 2

- [x] Shared tokenized styles established
- [x] Shared Astro pilot components extracted
- [x] Shared nav/breadcrumb components extracted

## Phase 4

- [x] Pilot routes migrated and parity-gated
- [x] Wave 2 first route added and parity-gated
- [x] Wave 2 additional routes migrated
- [x] Wave 2 coverage expanded to full legacy baseline gate set (398 routes)

## Phase 3

- [x] Schema contracts defined for migrated route families
- [x] Content adapters added for migrated route families
- [x] Build-time model validation gate added
- [x] Schema coverage expanded to next wave route families

## Phase 5

- [x] Remaining Wave 2 legacy fallback families replaced with framework outputs (postbuild passthrough copies: 0)
- [x] Raw-HTML passthrough rendering converted to componentized native templates for prioritized families

## Phase 6

- [x] Interactive runtime backlog closed for runtime-generated inline handler strings in shared legacy JS
- [x] Browser smoke checks added for representative interactive journeys

## Phase 7

- [x] Keep-static vs framework-managed route families rationalized with zero route collisions
- [x] Non-HTML legacy static assets synced into framework dist during postbuild

## Phase 8

- [x] Framework build is primary deploy path in CI/CD workflows
- [x] Parity/quality/performance/smoke gates enforced before deploy
- [x] Rollback playbook and rollback artifact staging path documented

## Phase 9

- [x] Performance budgets defined and automated
- [x] Expanded browser smoke suite active
- [x] Ownership map and contributor guidelines documented

## Notes

- Path safety remains mandatory: no route changes without explicit parity checks.
