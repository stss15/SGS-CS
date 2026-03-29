---
name: site-ib-cs-calibration
description: Calibrate SGS IB Computer Science content against the supplied IB guide. Use when writing, editing, judging, converting, or style-guiding IB CS textbook, notes, worksheets, glossary entries, revision material, website copy, or assessment content so it stays faithful to syllabus boundaries, suitable for international/EAL learners, and bounded between IGCSE simplification and undergraduate depth.
---

# SGS IB CS Calibration

Use this skill for IB Computer Science content judgement and authoring standards. It is not a generic content-editing skill and it is not a textbook layout skill.

## When To Use

Use this skill when the task is to:
- write new IB CS content,
- edit draft content to correct level or terminology,
- judge whether content is too basic, too advanced, or appropriate,
- convert the same concept into another output type while keeping the same level,
- build an IB CS style guide or calibration standard.

Typical outputs:
- textbook sections,
- lesson notes,
- worksheet text,
- glossary entries,
- revision summaries,
- slide copy,
- assessment explanations,
- student-facing website copy,
- teacher-facing content standards,
- teacher planning summaries.

Do not use this skill for:
- KS3 or IGCSE content,
- generic frontend/layout work,
- pure proofreading with no IB calibration question,
- university-level enrichment or open-ended CS exposition.

If the task also changes repo files, pair this skill with:
- `site-content-edit` for content ownership and build workflow,
- `site-layout-patterns` for route and shell choice,
- `site-architecture-map` when ownership is unclear.

If the task is textbook-specific, also load:
- `docs/content/ib-content/IB Textbook Improvements/agent_textbook_skill_guide.md`

## Source Hierarchy

Apply sources in this order:

1. Supplied IB Computer Science guide, syllabus extract, unit specification, or teacher notes.
2. Repo source-pack guidance and SGS project rules.
3. Public-facing SGS context only for audience calibration.
4. General good practice in clear academic writing for international learners.

If sources conflict, the higher source wins. Never let house style override syllabus precision.

Use `references/source-pack.md` to find the canonical repo copies of the IB source pack. Load the smallest relevant files only.
Use `references/full-instruction-set.md` when you need the full long-form instruction contract rather than the distilled skill rules.
Use `references/validation-cases.md` for representative prompts, negative trigger checks, and the current manual validation note.

## Boundary Rules

Non-negotiable:
- Do not write for IGCSE unless explicitly asked.
- Do not write for undergraduates unless explicitly asked.
- Do not add extra theory just because it is correct.
- Do not import A-level, university, or industry detail unless it directly clarifies IB-required material without changing the level.
- Do not silently expand the syllabus.
- Do not replace formal IB terminology with vague pop-tech language.
- Do not simplify so far that precision is lost.

Calibration check:

IGCSE-like writing usually means:
- too procedural,
- too recall-heavy,
- too surface-level,
- too little abstraction,
- too much simplified "computers do this because..." explanation.

Undergraduate-like writing usually means:
- too much theory or formalism,
- too much implementation detail,
- too many edge cases and exceptions,
- too much disciplinary expansion beyond the guide,
- explanation aimed at specialists rather than students.

IB-appropriate writing should be:
- precise but bounded,
- conceptually rigorous,
- explicit about distinctions and definitions,
- deep enough for explain, compare, analyse, evaluate, and apply tasks where required,
- readable for intelligent non-specialists,
- formal enough for assessment preparation without becoming tertiary-level teaching.

## Audience Model

Default reader:
- an IB Computer Science student,
- studying in English, but not necessarily a native speaker,
- capable of abstract thinking,
- likely to benefit from clear structure and explicit vocabulary support,
- working in an international school context.

Write for:
- EAL/ESL accessibility,
- mixed prior educational backgrounds,
- independent study,
- academic confidence,
- precise but readable English.

This means:
- define terms cleanly,
- sequence ideas logically,
- keep paragraphs controlled,
- make important steps explicit when needed,
- preserve technical language rather than avoiding it.

## Workflow

1. Identify the syllabus anchor.
- Name the topic, subtopic, or concept.
- Decide what is clearly in scope and out of scope.

2. Identify the output type.
- Textbook, notes, worksheet, glossary, revision, slide copy, assessment, website copy, or style guide.

3. Calibrate the level.
- State internally what would make the response too IGCSE, too undergraduate, and correctly IB.

4. Draft or evaluate.
- Keep terminology consistent with the supplied materials.
- Use concrete examples only when they clarify syllabus content.

5. Run the verification check.
- Every important claim is syllabus-relevant.
- Depth is IB-appropriate.
- Wording is accessible for international learners.
- Terminology is precise.
- Nothing important has drifted outside scope.

6. Finalize.
- Tighten wording.
- Label any necessary assumptions.
- Keep the result directly reusable.

If the guide is missing or incomplete:
- proceed conservatively,
- make the smallest safe assumption,
- label the assumption,
- avoid confident claims about unconfirmed syllabus expectations.

## Response Modes

### Write
Use for new content.

Expect:
- compact headings,
- concise academic prose,
- structure that matches the requested output type,
- no unnecessary enrichment.

### Edit
Use when the user provides draft text that needs calibration.

Expect:
- preserved meaning where possible,
- corrected level and terminology,
- tightened language,
- removal of out-of-scope material.

### Judge
Use when the user asks whether content is too basic, too advanced, or appropriate.

Use this format exactly:

`Verdict:`
- `Too basic` / `Appropriate` / `Too advanced` / `Mixed`

`Why:`
- 3-6 precise bullets

`Evidence from the provided syllabus:`
- cite the relevant topic expectations if available
- if the syllabus extract is missing, state that the judgement is conservative

`Fix:`
- explain exactly what to remove, add, simplify, or tighten

### Convert
Use when the same idea must be rewritten for another output type without changing the level boundary.

Expect:
- same syllabus anchor,
- same conceptual depth,
- different structure only where the new format requires it.

### Style Guide
Use when the task is to define standards for future writers or agents.

Include:
- audience,
- level boundary,
- tone,
- vocabulary expectations,
- sentence and paragraph expectations,
- what to include,
- what to avoid,
- examples of good and bad phrasing,
- a final quality-control checklist.

Use `references/task-wrapper.md` when you need a reusable prompt frame for one of these modes.

## Output Rules

Prefer:
- short to medium sentences,
- explicit topic sentences,
- direct definitions,
- clear distinctions between similar ideas,
- concrete examples only when they genuinely help,
- compact structure with headings or bullets where useful.

Avoid:
- chatty filler,
- motivational tone,
- culturally narrow references,
- rhetorical waffle,
- unexplained acronyms,
- generic AI transitions,
- copied textbook-layout rules that belong in the textbook guide.

For textbook tasks, keep this skill focused on level calibration and defer page-structure decisions to the textbook source pack.

Default output style unless the user specifies otherwise:
- use headings,
- use tight bullet points where useful,
- keep prose compact,
- prioritize clarity over flourish,
- make the result directly reusable by a teacher, curriculum writer, or content agent.

## Final Verification Checklist

Before returning the answer, confirm that it is:
- tied to the supplied IB CS syllabus material,
- suitable for IB students,
- not pitched at IGCSE level,
- not pitched at undergraduate level,
- clear for an international-school audience,
- precise in terminology,
- concise without becoming thin,
- free from unnecessary tangents,
- usable in a real SGS school context.
