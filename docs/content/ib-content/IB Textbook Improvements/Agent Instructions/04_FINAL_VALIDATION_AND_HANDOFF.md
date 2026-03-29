# FINAL VALIDATION AND HANDOFF

You are now at the end of the run.

Your job is to validate that the architecture refactor and IB textbook rebuild actually satisfy the intended system.

## Files to reference

Use the following reference files when validating:

- `textbook-template-refactor-prompt.txt`
- `agent_style_guide.html`
- `agent_textbook_skill_guide.md`
- `IB_Writing_Style.html`
- `IB Comp Sci 2027.pdf`

## Required final checks

### Architecture checks
Confirm that:

- textbook pages no longer rely on the old duplicated textbook side-panel layout,
- textbook navigation is owned by the main shell,
- textbook pages render inside the shared shell,
- the solution is reusable rather than a one-off IB patch,
- non-textbook shell behaviour has not been damaged.

### Component/data-model checks
Confirm that:

- a shared textbook page pattern exists,
- required textbook components exist,
- chapter and subchapter navigation are driven by the shared model,
- page-level contents blocks and anchors work,
- chapter naming is human-readable and consistent,
- SL/HL distinctions are represented correctly.

### IB content checks
Confirm that:

- the rebuilt IB chapters are bounded by `IB Comp Sci 2027.pdf`,
- they read like textbook chapters rather than revision dumps,
- they are suitable for international-school learners,
- they are not too IGCSE-like,
- they are not too undergraduate-like,
- technical examples, code/pseudocode, tables, and callouts are used deliberately rather than decoratively.

### Route and migration checks
Confirm that:

- important routes still resolve,
- old textbook routes are preserved or deliberately bridged,
- the migration path is clear for remaining textbook instances outside IB, if any.

## Required final output

Produce a final handoff summary with these headings:

1. `Completed architecture changes`
2. `Completed component/data-model changes`
3. `Completed IB textbook migration work`
4. `Validation results`
5. `Known limitations or deferred items`
6. `Next recommended migration steps`

## Final rule

Be honest.
Do not claim the system is complete if only a partial or reference implementation exists.
If the architecture is solved but full migration is incomplete, say so clearly.
