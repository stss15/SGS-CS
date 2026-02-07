# Docs Structure (Canonical)

Date: 2026-02-06

## Goal

Keep one canonical location for non-code source materials (`.md`, `.txt`, `.pdf`) and avoid duplicate trees with conflicting content.

## Canonical Content Paths

- `docs/content/ks3/`
- `docs/content/igcse/chapter-text-files/`
- `docs/content/ib-content/`
- `docs/curriculum content guides/`
- `docs/agent/`

## Legacy Paths (Deprecated)

- `docs/igcse-content/` (duplicate of `docs/content/igcse/`)
- `docs/Year 7 Unit Plans/` (duplicate of `docs/content/ks3/`)
- `docs/content/ib/` (non-canonical path used in older docs; canonical is `docs/content/ib-content/`)

## What Changed

- Internal references were normalized to canonical paths.
- Duplicate trees were moved (not deleted) to:
  - `archive/docs-legacy/igcse-content-duplicate-2026-02-06/`
  - `archive/docs-legacy/year7-unit-plans-duplicate-2026-02-06/`
- `scripts/apply_igcse_keywords.py` now points to `docs/content/igcse/chapter-text-files`.

## Path Safety Notes

- Build/runtime HTML/CSS/JS paths were not moved in this cleanup.
- This cleanup targets non-code documentation/content sources only.
- If any tooling or docs still reference deprecated paths, update to canonical paths above.
- `diagnosis/` reports are historical snapshots and may intentionally contain legacy paths.
