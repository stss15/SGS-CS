# IGCSE Topic 2 Textbook Authoring Playbook

## Purpose
Use this playbook to produce `Topic 2` at the same standard as the approved Topic 1 rewrite: strong pedagogy, full syllabus coverage, varied delivery, and clean reader UX.

## Scope
- Target topic: `2. Data Transmission`
- Required output file: `apps/site/src/content/igcse-textbooks/topic-2.md`
- Keep existing website subtopic labels and numbering.
- Do not migrate non-textbook pages in this step.

## Source Hierarchy (locked)
1. `docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/*.txt`
2. `docs/content/igcse/chapter-text-files/Chapter 2 key words.txt`
3. Cambridge syllabus PDF for specification confirmation
4. Existing SGS slides only for gap-fill/context

## Topic 2 Coverage Contract
Map content to these website headings (exact labels):
- `## 2.1 Data Transmission`
- `## 2.2 Error Checking`
- `## 2.3 Encryption`

All specification points for each subtopic must be present in teaching form (not just listed).

## Required Structure
- Start directly with `## Key Terms and Definitions`.
- Then one `##` block for each subtopic above.
- Inside each subtopic, use varied `###` headings (do not repeat a rigid pattern for every section).
- Each subtopic must include:
  - short conceptual framing (what/why)
  - method/process explanation students can follow after a long gap
  - at least one worked example
  - common errors/misconceptions where relevant

## Writing and Pedagogy Rules
- Write as a revision bridge between full textbook and flashcards.
- Keep language student-facing and concrete.
- Avoid artificial phrases like "conversion fluency" or "worked exam thread".
- Balance prose, bullets, and tables. Do not make every block look identical.
- Use tables when they genuinely improve comparison or method clarity.
- Show method steps, not just final answers.
- Include exam technique cues where useful (units, line-by-line method marks, justification structure).

## Delivery/UX Rules (Topic 1 baseline)
- Use reader section wrappers intentionally:
  - `.reader-section-body--concept`
  - `.reader-section-body--apply`
  - `.reader-section-body--example`
- Avoid long plain text walls.
- If a concept is hard to visualize, prefer an interactive or visual component over ASCII formatting.
- Add interactivity only where it improves understanding; do not add widgets for the sake of symmetry.

## Pseudocode Policy
- Topic 2 does **not** require algorithm-heavy pseudocode treatment.
- Keep `language-igcse-pseudocode` for topics where syllabus emphasis requires it (currently 7 and 8).
- Never introduce `language-python` into IGCSE textbook markdown.

## Authoring Workflow
1. Read Chapter 2 subfiles and keywords.
2. Build a quick checklist of every spec point under 2.1, 2.2, 2.3.
3. Draft content in `topic-2.md` using varied section design.
4. Add only high-value worked examples and tables.
5. Add/adjust interactive elements only if they clarify difficult concepts.
6. Run validation and build.
7. Update logs/changelog with what changed and why.

## Validation and Build Commands
Run in repo root:

```bash
npm run igcse:textbook:validate
npm run framework:build
```

If deploying:

```bash
firebase deploy --only hosting
```

## Logging Requirements
Update both:
- `docs/content/igcse/textbook-source-maps/quality-log.md`
- `CHANGELOG.md`

Include:
- what pedagogy gaps were fixed
- what coverage was added
- which interactive/delivery changes were introduced
- validation/build/deploy result

## Definition of Done (Topic 2)
- All Topic 2 specification points are covered clearly.
- Content reads like a high-quality textbook revision guide, not a scripted template.
- Layout uses mixed delivery patterns and remains easy to scan.
- Validator and framework build pass.
- Logs and changelog updated.
