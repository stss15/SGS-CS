# START HERE — Textbook Agent Run Order

Use the instruction files in this folder **in numeric order**.

The purpose of this run is to complete two linked tasks:

- **Task 1:** Refactor the textbook architecture so textbook navigation lives in the main base shell rather than an old duplicated textbook side-panel layout.
- **Task 2:** Rebuild the **IB 2027 textbook** inside that architecture, starting with the IB units and then rewriting the chapter pages one at a time using the writing and style guidance provided.

## Files you must use as reference

These files already exist and must be treated as the source pack for this run:

- `IB Comp Sci 2027.pdf` — controlling syllabus / structure authority for IB 2027
- `textbook-template-refactor-prompt.txt` — architecture intent for moving textbook navigation into the base shell
- `agent_textbook_skill_guide.md` — textbook-writing system, structure, components, workflow, and quality controls
- `agent_style_guide.html` — textbook component/style guidance for digital textbook reading experience
- `IB_Writing_Style.html` — IB content calibration / level / audience / tone guidance
- `A1.pdf`
- `A3.pdf`
- `A4.pdf`
- `B1.pdf`
- `B2.pdf`
- `B3.pdf`
- `B4.pdf`

## Required execution order

1. Read this file.
2. Execute `01_TASK_1_ARCHITECTURE_REFACTOR.md`.
3. Stop and verify before continuing.
4. Execute `02_TASK_1B_COMPONENT_AND_DATA_MODEL.md`.
5. Stop and verify before continuing.
6. Execute `03_TASK_2_IB_TEXTBOOK_REBUILD.md`.
7. Execute `04_FINAL_VALIDATION_AND_HANDOFF.md`.

## Important constraints

- Do **not** redesign the textbook UI chapter by chapter from scratch.
- Solve **architecture and component system first**.
- Only then migrate and rewrite chapter content within the shared system.
- The architecture change must be reusable across the codebase, not just for one IB page.
- The content rewrite in this run is focused on the **IB textbook system first**.
- Do not silently drift outside the IB guide.
- Do not break existing non-textbook shell behaviour unless required for architectural consistency.
- Do not continue past a checkpoint if the shared pattern is not stable.

## Core mental model

- **Main shell navigation** answers: _Where am I in the site?_
- **Page-level contents block** answers: _What is inside this chapter?_
- **Chapter body** delivers: _The textbook content itself._

## Output expectation for the full run

By the end of the run, the codebase should have:

- a reusable textbook architecture inside the base shell,
- a shared textbook component/data model,
- IB textbook chapter navigation in the shell,
- chapter pages with a top-of-page contents block,
- rewritten IB textbook pages that follow the style and writing rules from the supplied guides,
- a clear migration/validation summary.
