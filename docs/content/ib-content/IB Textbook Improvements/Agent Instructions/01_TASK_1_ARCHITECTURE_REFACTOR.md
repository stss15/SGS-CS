# TASK 1 — Refactor Textbook Architecture into the Main Base Shell

You are now completing **Task 1**.

Your job is to refactor the textbook architecture across the codebase so textbook pages no longer behave like a separate mini-app with a duplicated side contents panel.

## Primary references

Read and apply these files before editing:

- `textbook-template-refactor-prompt.txt`
- `agent_style_guide.html`
- `agent_textbook_skill_guide.md`

Use these files to infer intent, but inspect the actual codebase before changing anything.

## Problem to solve

The current textbook system is an old Astro template pattern that introduces a second textbook-side contents panel on top of the main shell navigation.

This creates:

- duplicated navigation,
- visual clutter,
- inconsistent layout behaviour,
- a textbook experience that feels bolted on rather than native to the platform.

## Required result

Refactor the architecture so that:

- textbook pages render **inside the standard base shell**,
- textbook chapter navigation lives in the **main base shell left navigation**,
- the old duplicated textbook contents side panel is removed from the page layout,
- textbook pages use a **page-level contents block** near the top of the page for internal chapter navigation,
- the new architecture is reusable across all textbook instances in the codebase.

## Scope

This is a **system-level template refactor**, not a one-page patch.

Treat the change as affecting textbook instances across:

- KS3 / Year 7–9,
- IGCSE,
- IB.

However, the first concrete implementation target for the rebuilt behaviour is **IB 2027**.

## Required execution sequence

### Step 1 — inspect
Inspect and identify:

- the main base shell/layout,
- the current textbook template(s),
- any textbook-specific side-panel logic,
- where textbook navigation data currently lives,
- whether textbook routes differ across KS3 / IGCSE / IB.

Do not guess. Inspect actual files.

### Step 2 — diagnose
Produce a concise internal diagnosis covering:

- what file(s) or pattern(s) cause the duplicate layout,
- what must change centrally,
- what can remain untouched,
- what migration risk exists.

### Step 3 — design the new ownership model
Implement the following separation:

- **Base shell** owns chapter navigation.
- **Textbook page** owns top-of-page chapter contents.
- **Textbook body** owns headings, sections, examples, figures, and content blocks.

### Step 4 — refactor centrally
Change shared templates/components so that:

- the old textbook side panel is removed,
- textbook pages use the standard shell,
- textbook navigation is surfaced through the main shell,
- the architecture is not hard-coded only for A1.

### Step 5 — preserve stability
Do not break:

- non-textbook shell behaviour,
- existing non-textbook routes,
- textbook URLs unless a deliberate migration path is implemented,
- route structure unless required.

If legacy compatibility is required, create a bridge rather than a silent break.

## Non-negotiable rules

- Do not implement a cosmetic patch while leaving the old abstraction intact.
- Do not solve this by hiding the extra panel in CSS only.
- Do not create a separate IB-only architecture if a shared textbook abstraction can be built.
- Do not continue to Task 2 until the architecture is stable.

## Completion criteria

Task 1 is complete only if:

- textbook pages no longer depend on the old duplicated textbook-side layout,
- textbook navigation can live in the main shell,
- the page layout supports a top-of-page contents block,
- the refactor is reusable at the template/component level,
- the system is ready for IB textbook chapter migration.

## Required checkpoint output

Before moving on, produce a brief handoff note containing:

1. files/components changed,
2. what central abstraction now controls textbook pages,
3. what legacy textbook behaviour has been removed or bridged,
4. any unresolved migration risks.

Do not move to the next file until this checkpoint passes.
