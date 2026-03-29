# TASK 2 — Rebuild the IB 2027 Textbook Inside the New System

You are now completing **Task 2**.

The architecture and shared textbook component/data model should already exist.

Your job is to rebuild the IB 2027 textbook inside that system, using the supplied IB guide, split textbook PDFs, and writing/style rules.

## Primary references

You must use these files as the source pack:

- `IB Comp Sci 2027.pdf` — controlling syllabus and naming authority
- `IB_Writing_Style.html` — IB-level calibration, audience, and writing boundaries
- `agent_textbook_skill_guide.md` — textbook-writing workflow, structure, anti-repetition controls, and quality checks
- `agent_style_guide.html` — component/style guidance for digital textbook layout
- `A1.pdf`
- `A3.pdf`
- `A4.pdf`
- `B1.pdf`
- `B2.pdf`
- `B3.pdf`
- `B4.pdf`

Use the PDFs as reference inputs for content coverage, sequencing, explanation quality, and useful examples.
Do **not** copy wording.
Do **not** treat the legacy PDFs as the sole authority over what is in scope.
The IB guide remains the primary scope authority.

## Goal

Rebuild the IB textbook so that:

- chapter navigation appears in the main shell,
- each chapter page has a top-of-page contents block for major subchapters,
- the body content is rewritten into the new textbook system,
- the writing is student-facing, syllabus-bounded, IB-level, and digitally readable,
- the pages feel like a coherent digital textbook rather than a legacy content dump.

## Migration order

Migrate **one chapter at a time**.

Recommended order:

1. `A1`
2. `A3`
3. `A4`
4. `B1`
5. `B2`
6. `B3`
7. `B4`

Use `IB Comp Sci 2027.pdf` to confirm chapter and subchapter names.

## For each chapter, follow this workflow

### Step 1 — identify the scope
Use `IB Comp Sci 2027.pdf` to identify:

- chapter title,
- major subchapter names,
- what is clearly in scope,
- what is clearly HL only,
- what must not be expanded beyond the syllabus.

### Step 2 — inspect the reference PDF
Read the relevant textbook PDF for that chapter.

Extract from it only what is useful for:

- conceptual sequencing,
- useful examples,
- helpful distinctions,
- worked-example ideas,
- diagrams/tables worth preserving in improved form.

Do not imitate weak phrasing or stale layout habits.

### Step 3 — plan the rebuilt chapter
Before drafting, determine:

- chapter overview,
- page-level contents block items,
- body section order,
- where a worked example is needed,
- where a misconception note is needed,
- where a table/figure/code block actually adds value,
- where an HL-only distinction must be shown.

### Step 4 — write the content
Write student-facing textbook content that is:

- IB-level,
- bounded by the guide,
- readable for international learners,
- precise in terminology,
- chunked for digital reading,
- not a revision sheet,
- not undergraduate exposition,
- not generic web copy.

### Step 5 — map into the component system
Implement the rewritten content using the shared textbook component/data model.

### Step 6 — verify the chapter
Check:

- shell navigation works,
- page-level contents jump links work,
- headings are consistent,
- writing stays within IB scope,
- HL-only material is labelled properly,
- the chapter reads like a coherent textbook page.

### Step 7 — log completion
Record what was migrated, what source files were used, and any unresolved issues.

## Writing and level rules

Follow the guidance in:

- `IB_Writing_Style.html`
- `agent_textbook_skill_guide.md`

This means, among other things:

- no drift down to IGCSE,
- no drift up to undergraduate depth,
- no faux-friendly fluff,
- no generic AI transitions,
- no giant text walls,
- no shallow bullet-point revision style unless explicitly needed,
- no unexplained jargon,
- no syllabus expansion beyond what is justified.

## Language / code / pseudocode policy

Use a consistent policy across all rebuilt IB chapters.

Default rule:

- teach algorithmic logic and process using clear explanations and pseudocode where appropriate,
- use language-specific code examples only where they genuinely add value and where the system already supports them consistently,
- do not switch format arbitrarily from chapter to chapter.

If the site already has a project-wide language preference, align to it. Otherwise stay consistent and conservative.

## Non-negotiable rules

- Do not redesign the component system while rewriting individual chapters unless a serious defect is discovered.
- Do not let each chapter invent a different reading pattern.
- Do not keep legacy content dumps sitting beside the new structure unless clearly marked as transitional.
- Do not continue if shell/component behaviour breaks.

## Completion criteria

Task 2 is complete only if:

- the IB chapter navigation is properly represented in the shell,
- each rebuilt chapter page uses the shared textbook system,
- chapter pages include top-of-page contents blocks,
- content is rewritten in line with the supplied writing/style guides,
- the rebuilt IB textbook is structurally coherent and ready for further expansion.

## Required chapter-completion note

After each chapter, record:

1. chapter completed,
2. source files used,
3. HL-only handling,
4. major components used,
5. anything still missing or deferred.
