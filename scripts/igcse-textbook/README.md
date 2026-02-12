# IGCSE Textbook Pipeline

This toolchain generates and validates Astro content-collection textbook entries for IGCSE Topics 1-10.

## Source Policy

`igcse_textbook_then_syllabus_then_slides`

Hierarchy used by the generator:
1. `docs/content/igcse/chapter-text-files` (primary source)
2. `docs/content/curriculum-guides/IGCSE CS Syllabus.pdf` conventions (especially pseudocode style)
3. Existing `src/static/igcse/topic*` slide/page artifacts (fallback only)

## Commands

Build a source evidence map for one topic:

```bash
npm run igcse:textbook:source-map -- --topic 1
```

Generate all topic textbook markdown files:

```bash
npm run igcse:textbook:generate
```

Force overwrite existing markdown files:

```bash
npm run igcse:textbook:generate -- --overwrite true
```

Validate topic coverage and pseudocode compliance:

```bash
npm run igcse:textbook:validate
```

## Outputs

- Source maps:
  - `docs/content/igcse/textbook-source-maps/topic-<n>.md`
- Textbook content collection entries:
  - `apps/site/src/content/igcse-textbooks/topic-<n>.md`

## QA Rules Enforced

- Every topic file includes `## Key Terms and Definitions`.
- Every mapped subtopic has a section heading: `## <code> <title>`.
- Every subtopic includes:
  - `### Overview`
  - `### Applied Understanding`
  - `### Worked Example`
- `language-python` is disallowed in IGCSE textbook content.
- `language-igcse-pseudocode` is required (minimum for topics 7-10, and generator emits it for all subtopics).
- OCR assignment variants (`¨`, `<-`) are normalized to `←` in generated pseudocode.

## Locked Noise Exclusions

- `docs/content/igcse/chapter-text-files/Chapter 5 Subfiles/5123.txt`
- `docs/content/igcse/chapter-text-files/chapter 3 Subfiles/300.txt`
- `docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/780340.txt`
- `.DS_Store`
