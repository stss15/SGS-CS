# Agent Change Log

All AI-driven changes must add an entry here.
Use the format below and keep entries concise.

## 2026-01-21

- Extended the shared assessment runtime to support dropdown, true/false, sortable, and numeric question types with configurable containers and option sets.
- Added match container fallback support in the shared assessment runtime to handle legacy `col-defs`/`col-terms` IDs.
- Refreshed assessment documentation and scaling audit counts after completing the IGCSE assessment migration.
- Migrated `igcse/topic1/1.1_assessment.html`, `igcse/topic1/1.2_assessment.html`, and `igcse/topic1/1.3_assessment.html` to the shared assessment runtime with JSON data, removing legacy JS files.
- Migrated `igcse/topic2/2.1_assessment.html`, `igcse/topic2/2.2_assessment.html`, and `igcse/topic2/2.3_assessment.html` to the shared assessment runtime with JSON data, removing legacy JS files.
- Migrated `igcse/topic3/3.1_assessment.html`, `igcse/topic3/3.2_assessment.html`, `igcse/topic3/3.3_assessment.html`, and `igcse/topic3/3.4_assessment.html` to the shared assessment runtime with JSON data, removing legacy JS files.
- Migrated `igcse/topic4/4.1_assessment.html` and `igcse/topic4/4.2_assessment.html` to the shared assessment runtime with JSON data, removing legacy JS files and aligning the IDE labeling targets to runtime drag buckets.
- Migrated `igcse/topic5/5.1_assessment.html`, `igcse/topic5/5.2_assessment.html`, and `igcse/topic5/5.3_assessment.html` to the shared assessment runtime with JSON data, removing legacy JS files.
- Migrated `igcse/topic6/6.1_assessment.html`, `igcse/topic6/6.2_assessment.html`, and `igcse/topic6/6.3_assessment.html` to the shared assessment runtime with JSON data, removing legacy JS files.
- Migrated `igcse/topic7/7.1_assessment.html`, `igcse/topic8/8.2_assessment.html`, and `igcse/topic10/10.2_assessment.html` to the shared assessment runtime with JSON data, removing legacy JS files.
- Migrated `igcse/topic7/7.3_assessment.html` to the shared assessment runtime with JSON data in `src/static/data/assessments/igcse-topic7-7-3.json` and removed the legacy JS file.
- Refreshed assessment audit/doc counts to reflect the new pilot migration.
- Migrated `igcse/topic7/7.4_assessment.html` to the shared assessment runtime with JSON data in `src/static/data/assessments/igcse-topic7-7-4.json` and removed the legacy JS file.
- Migrated `igcse/topic7/7.5_assessment.html` to the shared assessment runtime with JSON data in `src/static/data/assessments/igcse-topic7-7-5.json` and removed the legacy JS file.
- Migrated `igcse/topic7/7.6_assessment.html` to the shared assessment runtime with JSON data in `src/static/data/assessments/igcse-topic7-7-6.json` and removed the legacy JS file.
- Added `expectedRemaining` support to the shared assessment runtime for drag questions with distractors.
- Migrated `igcse/topic7/7.7_assessment.html`, `igcse/topic7/7.8_assessment.html`, `igcse/topic7/7.9_assessment.html`, `igcse/topic8/8.1_assessment.html`, `igcse/topic9/9.1_assessment.html`, and `igcse/topic10/10.3_assessment.html` to the shared assessment runtime with JSON data, removing legacy JS files.
- Migrated IGCSE end-of-unit tests for topics 2, 3, 5, 6, 7, 8, 9, and 10 to the shared runtime with new JSON data files.
- Updated end-of-unit test HTML pages to load `js/assessment-runtime.js` and removed their legacy per-topic scripts for topics 2, 3, 5, 6, 7, 8, 9, and 10.
- Refreshed assessment audit outputs and scaling audit counts after the end-of-unit migration.
- Added a shared exam runtime (`js/exam-runtime.js`) and wired the Topic 4 end-of-unit test to it with JSON config, removing the last per-topic end-of-unit script.
- Restyled the Topic 4 end-of-unit test with shared exam-page UI styling and a proper start modal.
- Unified IGCSE Topic 1-3 and Topic 5 assessment menus onto the shared assessment menu styling to match navigation and layout.
- Tightened the exam header layout to reduce vertical space and align the timer/student info into two rows.
- Reworked the Topic 4 exam header layout to align title/subtitle left and timer/student info right with tighter spacing.

## 2026-01-20

- Created canonical Agent HQ docs in `docs/agent/` (guide, site map, build/deploy, dependencies, templating).
- Added legacy stub docs to satisfy references (`igcse-slide-deck-guide.md`, templates stubs).
- Updated root and docs README pointers to the canonical Agent HQ.
- Established refactor worktree baseline and link-check snapshot (47 missing targets recorded).
- Centralized listing content in `src/data/site.json` and wired `scripts/build.js` to inject shared site data into templates.
- Updated KS3/IGCSE/IB + IB 2027 HL/SL listing pages to use `listingKey` instead of inline section markup.
- Documented shared listing data usage in `docs/agent/TEMPLATING.md`.
- Added `docs/agent/SCALING_AUDIT.md` with CSS/JS duplication inventory and consolidation targets.
- Expanded `docs/agent/SCALING_AUDIT.md` with template inventory and duplication notes.
- Added legacy notices to older agent docs and updated the KS3 template stub to point at Agent HQ.
- Documented link integrity risks and missing-target clusters in `docs/agent/SCALING_AUDIT.md`.
- Made `scripts/link_audit.py` path-agnostic and documented link audit + regression checklist in `docs/agent/BUILD_DEPLOY.md`.
- Routed missing KS3/IB/IB-2027 resources to `/coming-soon.html` and updated Mission Control to redirect to `/coming-soon.html` until built.
- Tightened `scripts/link_audit.py` to avoid false positives on missing non-HTML assets; latest report shows 0 broken links.
- Centralized arcade topic cards/resources in `src/data/topics.json` and wired `topicKey` support into `scripts/build.js`.
- Slimmed IB/IGCSE arcade topic pages to reference `topicKey` instead of inline `cards`/`resources`.
- Updated `docs/agent/AGENT_GUIDE.md` to point to shared data sources under `src/data/`.
- Moved IB/IGCSE arcade metadata (title, description, breadcrumbs, hero, extraStyles) into `src/data/topics.json`.
- Reduced IB/IGCSE arcade front matter to minimal keys (`layout`, `activeSection`, `topicKey`).
- Refactored IB 2027 unit index pages to use `layouts/arcade.njk` with front-matter cards/resources and a new secondary resource section.
- Added optional `target` support for resource links and a secondary resource block in `layouts/arcade.njk`.
- Documented arcade secondary resources and resource item fields in `docs/agent/TEMPLATING.md`.
- Defaulted `layouts/arcade.njk` pages to `css/resource-style.css` when `extraStyles` is omitted.
- Deduped IGCSE topic 9 assessments styling by pointing it at `css/assessments-igcse-topic8.css` and removing the duplicate stylesheet.
- Expanded `docs/agent/SCALING_AUDIT.md` with static HTML inventory details and refreshed CSS counts.
- Added `scripts/static_html_audit.py` and documented it in `docs/agent/BUILD_DEPLOY.md` to track HTML outside the build pipeline.
- Added a `src/static/` pipeline in `scripts/build.js` and moved standalone HTML sources out of `public/`.
- Extended `scripts/static_html_audit.py` to verify `src/static` coverage and updated `meta/static_html_report.md`.
- Moved `public/README.md` into `src/static/README.md` and refreshed static-file guidance.
- Updated Agent HQ docs (`docs/agent/AGENT_GUIDE.md`, `docs/agent/SITE_MAP.md`, `docs/agent/TEMPLATING.md`, `docs/agent/BUILD_DEPLOY.md`) to reflect the static source workflow.
- Moved `public/css`, `public/js`, and `public/images` into `src/static/` so assets are sourced from a single location.
- Moved remaining non-HTML assets from `public/` into `src/static/` so `public/` is fully build output.
- Consolidated IGCSE topics 6-10 assessment menu styling into `css/assessments-igcse-menu.css` with body variants, and removed per-topic menu stylesheets.
- Updated assessment menu HTML (topics 6-10) to use the consolidated stylesheet and body variant classes.
- Updated `docs/agent/SCALING_AUDIT.md` with refreshed CSS counts and assessment menu notes.
- Removed Python bytecode caches from IB 2027 downloads and added `__pycache__/` + `*.pyc` to `.gitignore`.
- Updated `scripts/build.js` to clear `public/` before copying static assets and rendering templates; documented the behavior in Agent docs.
- Added `scripts/assessment_audit.py` with report output in `meta/assessment_audit.md` and created `docs/agent/ASSESSMENTS.md` for the assessment refactor roadmap.
- Added `src/static/js/assessment-runtime.js` and migrated pilot assessments to JSON-driven data (`igcse/topic10/10.1_assessment.html`, `igcse/topic8/8.3_assessment.html`).
- Migrated `igcse/topic7/7.2_assessment.html` to the shared assessment runtime with JSON data in `src/static/data/assessments/igcse-topic7-7-2.json` and removed the legacy JS file.
- Updated assessment audit/docs to reflect the new pilot migration and current JS counts.

## 2026-01-22

- Added Firebase Hosting redirects/rewrites to preserve legacy `/hl`/`/sl` paths, normalize course entry points, and route missing curriculum links to `/coming-soon.html`.
- Disabled `trailingSlash` in `firebase.json` to avoid mismatched trailing-slash redirects on HTML paths.
