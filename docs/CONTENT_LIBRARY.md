# Content Library

Canonical source materials are stored in:
- `docs/content`

Runtime/download assets used by live pages may still exist in `src/static` and are kept there so the build can publish them.

## Subfolders

- `docs/content/curriculum-guides`: Core curriculum PDFs.
- `docs/content/igcse`: IGCSE chapter text/keywords.
- `docs/content/ib-content`: IB textbooks, keywords, unit-plan sources.
- `docs/content/ks3`: KS3 text/unit-plan source materials.

## IGCSE Textbook Build Artifacts

- Per-topic source maps:
  - `docs/content/igcse/textbook-source-maps/topic-1.md` ... `topic-10.md`
- Migration/QA log:
  - `docs/content/igcse/textbook-source-maps/quality-log.md`

These are generated/maintained by `scripts/igcse-textbook/` and used to debug chapter coverage and mapping quality.

When adding new `.txt`, `.pdf`, or `.docx` source content, place it under the relevant `docs/content` subtree.
