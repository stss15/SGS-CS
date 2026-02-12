# IB 2027 Cram Guide Quality Log

## Date
- 2026-02-11

## Calibration Unit
- SL Unit 1 (B1.1.1 to B1.1.4)

## Comparison Sources
- `docs/content/ib-content/Textbook Chapters PDF/B1.pdf`
- `docs/content/ib-content/IB_Content_MD/SL/Unit_B1_Structure.md.pdf`
- `docs/content/ib-content/IB_Content_MD/SL/IB_CS_2027_SL_Core.md.pdf`
- `apps/site/src/content/ib-textbooks/sl/unit-1.md` (first draft)

## Findings
1. Structure and readability were strong, but the first draft was closer to a concise summary than a true revision-cram profile.
2. Command-term fidelity needed strengthening. Subtopics needed explicit command alignment (Construct, Describe, Explain, Trace).
3. Some high-yield detail was underrepresented:
   - input types (direct/manual/automatic)
   - output types (temporary/permanent/mechanical)
   - trace-table execution discipline for decisions and loops
4. Terminology density was too light for fast exam revision and retrieval.
5. Root cause: first-pass emphasis was readability-first, with insufficient weighting of command-term precision and high-yield detail retention.

## Corrective Actions
1. Add a **Command and Outcome Map** table in every unit entry.
2. Add a **Must-Know Terms** section in every unit entry.
3. Keep one `h2` section per mapped subtopic and include:
   - Command focus
   - Core idea
   - What this means in practice
   - Concise example
4. Enforce source boundary: mapped subtopics only; no extra syllabus inflation.
5. Use `docs/content/ib-content/textbook-source-maps/<level>-unit-<n>.md` as the per-unit compliance reference before sign-off.

## Anti-Regression Checklist (Apply to Every Unit)
- [ ] Every mapped subtopic code appears as an `h2`.
- [ ] Command term is explicit for each code.
- [ ] Core definitions are included for key terms.
- [ ] Content remains student-facing and non-teacher-facing.
- [ ] No activities, exam papers, tips lists, or scaffolding tasks are included.
- [ ] Coverage stays inside mapped scope.

## Revision 2 Findings (Student UX Pass)
- Date: 2026-02-11
- Trigger: student-facing review of rendered SL Unit 1 textbook page.

### New Issues Identified
1. Introductory "Unit focus" callout and generic opening paragraph added noise without improving revision value.
2. "Command and Outcome Map" duplicated information already present in unit plan + subtopic sections.
3. Color coding was present, but heading/content were visually disconnected (header tone and body not grouped as one unit).
4. Per-item boxed bullets created fragmentation and weak reading flow.
5. Generated prose became pattern-heavy ("template voice"), reducing engagement and perceived quality.

### Corrective Actions Applied
1. Remove route-level "Unit focus" callout.
2. Remove generic opening paragraph from generated textbook markdown.
3. Remove "Command and Outcome Map" from all generated textbook entries.
4. Keep command fidelity by requiring an explicit `**Command term:**` inside each subtopic section.
5. Change section UX to linked color groups:
   - toned header bar
   - matching outlined content container directly underneath
6. Replace per-bullet cards with container-level grouping and proper list indentation.
7. Increase content delivery variety in B1 patterns (tables + bullets + prose + code/trace where appropriate), while staying within mapped scope.

### Updated Anti-Regression Rules
- [ ] No route-level unit-focus callout on textbook pages.
- [ ] No generic "This cram guide is limited..." paragraph at the top of entries.
- [ ] No "Command and Outcome Map" section.
- [ ] Every mapped subtopic has explicit command term text and mapped-code `h2`.
- [ ] Each colored heading style has a linked content container in the same tone family.
- [ ] Bullet lists use clear indentation and are not rendered as disconnected per-item cards by default.

## Revision 3 Findings (Content Quality Overhaul)
- Date: 2026-02-11
- Trigger: Teacher review identified poor learning value, repetitive structure, and template voice in generated content.

### Problems Fixed
1. **Template voice** — every section followed identical rigid structure (Exam requirement → Core understanding → In real systems → Worked snapshot). Students could predict the next paragraph before reading it.
2. **Boring, flat prose** — read like machine-generated summaries with no teaching personality, analogies, or concrete scenarios.
3. **No delivery variety** — no tables, no code blocks, no trace-table walkthroughs, no interactive exercises, no domain matrices. Pure bullet-point walls.
4. **Thin on high-yield detail** — missed IB-critical content: input types (direct/manual/automatic), output types (temporary/permanent/mechanical), constraint categories, trace-table execution discipline.
5. **Key Terms section disconnected** — glossary dump at the top provided no context or learning value. Keywords should appear inline where they are being taught.
6. **Unimaginative titles** — just echoing syllabus codes with no hook or student-readable framing.

### New Content Principles (Apply to Every Unit)
1. **Each subtopic uses a different delivery method.** Rotate between: scenario walkthrough, analogy-driven table, domain matrix, worked trace table, pseudocode + trace, comparison table, annotated diagram, "spot the concept" exercise.
2. **Scenario-driven writing.** Ground every concept in a concrete context (school library, canteen kiosk, hospital system) so students can picture it.
3. **Inline keywords** via `data-def` attributes — definitions appear where the term is taught, not in a disconnected glossary dump. The reader's modal system handles the rest.
4. **Command term integration.** Each section opens with the command term in a `required-response` h3, but then the body content shows *how to actually do it* — not just *what it is*.
5. **Tables for structured data.** Use tables wherever content has 2+ parallel dimensions (components, pillars, domains, symbols). Never use bullet lists for tabular data.
6. **Exam technique tips.** End sections with practical advice on *how to answer* the command term, not just *what to know*.
7. **Interactive elements where possible.** "Spot the pillar" exercises, hidden-answer columns, trace tables that show the working.
8. **No filler.** Every sentence must teach something. No "In this section we will..." or "As we have seen..." preamble.

### Updated Anti-Regression Checklist (v3 — Apply to Every Unit)
- [ ] Each subtopic uses a *different* delivery format (do not repeat the same structure across sections).
- [ ] At least one table per unit (component table, comparison table, domain matrix, or trace table).
- [ ] At least one worked example per unit with concrete test data.
- [ ] Keywords appear inline with `data-def` attributes — no standalone glossary section at the top.
- [ ] Command term is stated in `required-response` h3, but the section body demonstrates *how* to execute that command.
- [ ] Prose is direct, second-person ("you"), with real scenarios — not "template voice."
- [ ] No consecutive sections share the same internal structure.
- [ ] Every section has content that would be genuinely useful for pre-reading or revision (not just re-stating the syllabus).
- [ ] Exam technique advice is included for each subtopic's command term.
- [ ] h2 IDs start with `b` to trigger CSS subtopic styling (e.g. `id="b1-1-1-problem-specification"`).

## Revision 4 Findings (Style & Structure Patterns)
- Date: 2026-02-11
- Trigger: Teacher review of live Unit 1 page. Feedback on keyword presentation, section titles, and visual separation.

### Changes from Revision 3
1. **Keywords as table, not modals.** The `data-def` inline keyword popovers were visually distracting (large coloured pills). Keywords now go in a standard **Key Terms and Definitions** table at the top of every unit. Remove all `data-def` attributes. Use `h2#key-terms-and-definitions` which has existing CSS.
2. **"Required response" removed.** This h3 title confused students. Command term info is now woven naturally into the **Overview** paragraph (e.g. "The IB expects you to **construct** a problem specification..."). No separate heading needed.
3. **"What this means" → "Overview".** More professional and neutral. The CSS selector `h3[id^="overview"]` now maps to the gold concept tone.
4. **Section body wrappers.** All content under a coloured h3 must be wrapped in `<div class="reader-section-body reader-section-body--variant">`. This ensures the entire section gets the coloured outline, not just the first paragraph. Four variants: `--command` (blue), `--concept` (gold), `--apply` (green), `--example` (purple).
5. **Subtopic dividers.** CSS now adds a gradient divider line above every `h2[id^="b"]` (except the Key Terms heading). No HTML changes needed — this is automatic.

### h3 Title Naming Conventions (Apply to Every Unit)

| Category | Colour | Example h3 titles | CSS class / selector |
|----------|--------|-------------------|---------------------|
| Concept / Overview | Gold | "Overview" | `h3[id^="overview"]`, `reader-section-body--concept` |
| Application / Analysis | Green | "Common misconceptions", "The domain matrix", "Standard flowchart symbols" | `h3[id^="common-misconception"]`, `reader-section-body--apply` |
| Worked / Practice | Purple | "Worked example", "Spot the pillar", "Worked trace: counting positive numbers" | `h3[id^="worked-example"]`, `reader-section-body--example` |
| Command (legacy) | Blue | "Exam requirement" | `h3[id^="exam-requirement"]`, `reader-section-body--command` |

### Section Body Wrapper Template (Copy-Paste for Every Section)

In the `.md` content file, wrap ALL content under a coloured h3 like this:

```html
### Overview

<div class="reader-section-body reader-section-body--concept">

Markdown content goes here. Tables, lists, paragraphs — everything.

</div>
```

In the `.njk` file, use raw HTML throughout:

```html
<h3 id="overview">Overview</h3>
<div class="reader-section-body reader-section-body--concept">
  <p>HTML content goes here.</p>
</div>
```

### Content Source Reminder
- **Deployed site uses:** `apps/site/src/content/ib-textbooks/{level}/unit-{n}.md` (Astro content collection)
- **Legacy build uses:** `src/pages/ib-2027/{level}/unit-{n}/textbook.njk`
- **Both must be kept in sync** until the legacy build is removed.

### Updated Anti-Regression Checklist (v4 — Apply to Every Unit)
- [ ] Key Terms table at the top using `h2#key-terms-and-definitions`. No `data-def` attributes anywhere.
- [ ] No "Required response" or "What this means" headings. Use "Overview" instead.
- [ ] Every coloured h3 section's content is wrapped in `<div class="reader-section-body reader-section-body--{variant}">`.
- [ ] Each subtopic uses a *different* delivery format (do not repeat the same structure across sections).
- [ ] At least one table per unit (component table, comparison table, domain matrix, or trace table).
- [ ] At least one worked example per unit with concrete test data.
- [ ] Command term is stated naturally in the Overview paragraph, not as a separate heading.
- [ ] Prose is direct, second-person ("you"), with real scenarios — not "template voice."
- [ ] No consecutive sections share the same internal structure.
- [ ] Exam technique advice is included for each subtopic's command term.
- [ ] h2 IDs start with `b` to trigger CSS subtopic styling and automatic divider.
- [ ] Both `.md` and `.njk` files are updated in sync.

## Revision 5 Findings (Coverage + Rendering Regression)
- Date: 2026-02-11
- Trigger: Unit 2 review found missing iteration coverage and missing code token colours in rendered textbook pages.

### Root Causes
1. **Coverage mapping gap (Unit 2):** `B2.3.3` was not included in `src/pages/ib-2027/sl/unit-2/unit-plan.njk` `syllabusPoints`, so Unit 2 index outcomes and textbook scaffolding never required a dedicated iteration section.
2. **Syntax highlighting override:** Legacy stylesheet output contained:
   - `.reader-content pre.astro-code .line { color: ... !important; }`
   - `.reader-content pre.astro-code span { color: inherit !important; }`
   These rules overrode Shiki token colours and flattened syntax highlighting.

### Corrective Actions
1. Added `B2.3.3` to SL Unit 2 mapped syllabus points and inserted a dedicated **for/while iteration** section in `apps/site/src/content/ib-textbooks/sl/unit-2.md`.
2. Updated `docs/content/ib-content/textbook-source-maps/sl-unit-2.md` to include B2.3.3 evidence fragments.
3. Kept reader code styling rules non-destructive for Shiki tokens (no forced `span` color inheritance in code blocks).

### New Anti-Regression Checks
- [ ] For each unit, confirm mapped `syllabusPoints` includes every intended subtopic code before writing textbook content.
- [ ] For each mapped loop/iteration code, verify a dedicated section exists (not just passing mention).
- [ ] Never add `!important` colour overrides on `.astro-code span` in reader styles.
- [ ] After CSS edits, verify at least one rendered Python block shows distinct token colours (keywords, strings, numbers).
- [ ] Keep Python code block line spacing at `1.42` in both `.reader-content pre code` and `.reader-content pre.astro-code .line`.

## Revision 6 Findings (SL Units 5-7 Batch Standards)
- Date: 2026-02-11
- Trigger: Batch rewrite for SL Units 5-7 using approved Unit 1-4 structure and source-boundary policy.

### Batch Improvements Applied
1. Replaced generic template prose with command-term-specific explanations for each mapped code.
2. Removed abstract filler and added scenario-linked content in every section.
3. Enforced source-bounded coverage for each unit:
   - Unit 5: B3.1.1-B3.1.5 only
   - Unit 6: A3.1.1, A3.2.1, A3.2.5, A3.3.1 only
   - Unit 7: A4.1.1, A4.1.2, A4.4.1, A4.4.2 only
4. Increased delivery variety per unit (comparison tables, schema ladders, worked traces, applied scenario maps) without adding activities/questions.
5. Kept every section student-facing, technically precise, and directly tied to what students are expected to know and do.

### New Anti-Regression Checks (v6)
- [ ] Every mapped subtopic section includes `**Command term:**` with the exact command action required.
- [ ] Each unit includes at least one scenario-anchored worked example that stays inside mapped scope.
- [ ] Unit source map includes explicit out-of-scope exclusions for nearby syllabus points.
- [ ] Unit-plan frontmatter language remains student-facing and avoids teacher-planning phrasing.
- [ ] Avoid pattern lock: no full-unit copy-paste structure across all sections; vary explanation format while retaining UI consistency.

## Revision 7 Findings (SL Units 9-11 Batch)
- Date: 2026-02-12
- Trigger: Batch rewrite request for SL Units 9-11 to match approved Unit 1-7 quality/UI standard.

### Batch Issues Addressed
1. Units 9-11 were still on low-value template prose with weak command-term delivery and minimal concrete teaching value.
2. Key subtopics lacked scenario-linked explanation and practical, traceable examples.
3. Coverage presentation for Unit 11 had a topic-label mismatch risk around `A2.3.1` (code is IP addressing, not transmission media).

### Corrective Actions Applied
1. Rewrote:
   - `apps/site/src/content/ib-textbooks/sl/unit-9.md`
   - `apps/site/src/content/ib-textbooks/sl/unit-10.md`
   - `apps/site/src/content/ib-textbooks/sl/unit-11.md`
   using the approved cram-guide pattern (key terms + varied section formats + code/table/scenario integration).
2. Updated student-facing unit plan frontmatter for Units 9-11:
   - `src/pages/ib-2027/sl/unit-9/unit-plan.njk`
   - `src/pages/ib-2027/sl/unit-10/unit-plan.njk`
   - `src/pages/ib-2027/sl/unit-11/unit-plan.njk`
   to align intro language, concepts, terminology, misconceptions, and syllabus points with spec-bounded outcomes.
3. Refreshed source maps for Units 9-11 with explicit out-of-scope exclusions and evidence fragments from IB core, structure sheets, chapter PDFs, and unit plans.
4. Aligned Unit 11 source-map/topic language to IB code definition for `A2.3.1` (IP addressing) while preserving mapped code boundaries.

### Anti-Regression Checks (v7)
- [ ] For every rewritten unit, confirm each mapped code appears as an `h2` section in textbook content.
- [ ] Use at least two content-delivery formats per unit (for example tables + worked trace/scenario) to avoid text-wall regressions.
- [ ] Keep command terms explicit and action-oriented (describe/explain/construct/compare/discuss) without generic filler phrasing.
- [ ] Keep topic labels consistent with code definitions in IB source documents; if legacy naming differs, document the adjustment in source maps.
- [ ] Include explicit out-of-scope exclusions in each source map before sign-off.
