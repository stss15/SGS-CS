# Framework Future-Proofing Evaluation

Date: 2026-02-06

## Scope

Evaluate whether adopting a framework would improve readability, extensibility, modularity, and future-proofing for this codebase.

## Current State Snapshot

- Build system: custom Node + Nunjucks (`scripts/build.js`) with static copy from `src/static/` to `public/`.
- Source scale:
  - `src/pages` templates/pages: 209 files (`.njk` + `.html`)
  - `src/static` web assets (`.html/.js/.css`): 225 files
  - Standalone static HTML pages in `src/static`: 148 files
  - Shared JS files: 33
  - Shared CSS files: 36
- Complexity indicators:
  - Inline style attributes in source templates/pages/static HTML: 5126
  - Inline event bridge attributes (`data-sgs-on*`) present in source: high usage (legacy compatibility path)
  - Largest JS files exceed 700-1000 LOC in multiple places

## Agent Skills Guidance (Relevant)

From `agent_skills/curated_frontend`:

- `web-artifacts-builder`:
  - Recommends React + TypeScript + Vite + Tailwind + component primitives for complex UI.
  - Strong signal for modular UI development workflow.
- `react-best-practices`:
  - Strong guidance on bundle size, rendering, state, and performance.
  - Most useful once React is part of the architecture.
- `composition-patterns`:
  - Promotes scalable component APIs and avoiding boolean-prop sprawl.
  - Useful for long-term maintainability in component systems.
- `webapp-testing`:
  - Recommends browser-level automation (Playwright) for UI regression safety.
- `web-design-guidelines`:
  - Supports repeatable design/a11y quality auditing.

## Options

### Option A: Stay on custom Nunjucks + static HTML only

Pros:
- Lowest migration risk.
- No framework lock-in.
- Current workflows keep working.

Cons:
- Modularity ceiling is low for large interactive features.
- Increasing maintenance burden from duplicated markup/styles.
- Harder to apply reusable component/state patterns consistently.

Verdict:
- Good for short-term stability, weak for medium/long-term extensibility.

### Option B: Full rewrite to React/Next.js

Pros:
- Strong component model and mature ecosystem.
- Directly aligns with `react-best-practices` + `composition-patterns`.

Cons:
- High migration risk and long timeline.
- Large SEO/static-content migration complexity.
- High chance of regressions across existing educational pages/tools.

Verdict:
- Too risky as a first move for this codebase size and mixed content model.

### Option C: Hybrid static-first framework (recommended) with incremental migration

Recommendation:
- Use **Astro** as the framework shell.
- Keep static-first output.
- Add **React islands** only where interactive complexity justifies it.
- Keep Node toolchain; add TypeScript incrementally for tooling/scripts/components.
- Use Tailwind selectively for new UI modules, not a blanket rewrite.

Pros:
- Preserves static-site strengths while adding component architecture where needed.
- Supports gradual migration with minimal URL/path disruption.
- Enables React best-practice rules where React is actually used.
- Lower risk than full SPA/Next rewrite.

Cons:
- Temporary mixed architecture during migration.
- Requires clear conventions and boundaries.

Verdict:
- Best balance of future-proofing and delivery risk.

## Conclusion

Adopt a framework, but **not** via full rewrite.

Best path: **Astro hybrid architecture + selective React islands + incremental Tailwind usage for new modules**.

This improves modularity/extensibility while preserving existing static path behavior and reducing migration risk.

## Implementation Plan (Path-Safe)

### Phase 0: Guardrails and discovery (1-2 weeks)

1. Freeze URL/path contract:
   - Export current route manifest from `meta/site-manifest.json`.
   - Add route parity checks between old and new outputs.
2. Add baseline quality gates in CI:
   - Keep current `npm run validate`.
   - Add browser smoke tests for top routes and key interactives.
3. Define target architecture conventions:
   - `apps/site` (Astro app)
   - `packages/ui` (shared components/tokens)
   - `packages/content-schema` (typed frontmatter/content models)

### Phase 1: Scaffold framework without breaking production (1 week)

1. Initialize Astro app in parallel (do not replace current build yet).
2. Configure static passthrough for legacy assets/tools.
3. Mirror a small non-critical section (e.g., one index/listing page) into Astro.
4. Add route parity assertion for migrated pages.

### Phase 2: Component system and styling foundation (2-3 weeks)

1. Build shared primitives:
   - Header/nav, card grids, resource buttons, breadcrumb component.
2. Establish design tokens:
   - Keep existing CSS variables as source of truth.
3. Tailwind strategy:
   - Enable Tailwind for new components only.
   - Avoid mass conversion of legacy pages.
4. Add lint/format/type gates:
   - ESLint + Prettier + TypeScript for new framework code.

### Phase 3: Incremental page migration (4-8 weeks, parallelizable)

1. Migrate templates with highest duplication first:
   - Listing/index pages
   - Unit plan pages
   - Shared layout wrappers
2. Keep legacy standalone tools under static passthrough until individually refactored.
3. For complex interactives:
   - Move to React islands only when state/composition complexity warrants it.
   - Apply `react-best-practices` and `composition-patterns` rules.

### Phase 4: Legacy reduction and hardening (ongoing)

1. Retire inline style-heavy patterns in migrated sections.
2. Replace legacy inline event bridge usage in migrated sections with explicit listeners/components.
3. Expand Playwright coverage for curriculum-critical flows.
4. Remove old build paths only after route/content parity reaches target threshold.

## Path Conflict Controls (Critical)

To avoid breaking path-dependent HTML/resources:

1. Keep existing public URL structure unchanged during migration.
2. Use route parity tests:
   - Every migrated route must match legacy path.
3. Keep static asset roots stable (`/images`, `/css`, `/js`) until final cutover.
4. Add explicit redirect map for any unavoidable path changes.
5. Run link integrity checks against final built output before deploy.

## Success Criteria

- 100% route parity for migrated sections.
- No regressions in `npm run validate`.
- No critical Playwright smoke failures for key user journeys.
- Measurable duplication reduction in shared layouts/components.
- New feature delivery time improves due to reusable component architecture.

## Suggested First Technical Milestone

Pilot migration of one area:

- Migrate `index + one subject listing + one unit plan` to Astro.
- Keep all legacy URLs unchanged.
- Ship behind build flag/parallel output for comparison.
- Decide go/no-go for broader rollout based on parity + velocity results.
