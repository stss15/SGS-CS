# IB CS Task Wrapper

Use this wrapper when a task needs a tight prompt contract for IB Computer Science calibration work. Pair it with `full-instruction-set.md` when the full role brief should be included verbatim.

## Standard Wrapper

```text
TASK

Use $site-ib-cs-calibration.

Use the instruction set above.

Task mode:
[write / edit / judge / convert / style-guide]

Here is the syllabus material you must treat as the primary authority:
[paste the IB CS guide / unit extract / syllabus notes]

Here is the content task:
[describe the task]

Output type:
[textbook page / student notes / worksheet / revision summary / website copy / glossary / assessment item / style guide / critique]

Audience:
IB Computer Science students in an international school setting.

Additional constraints:
[add any extra rules]

Before writing, silently calibrate the level:
- what would make this too IGCSE,
- what would make this too undergraduate,
- what would make it correctly IB.

Then produce the final answer only.
```

## Judge Mode Reminder

For `judge` tasks, the response must use:

```text
Verdict:
- Too basic / Appropriate / Too advanced / Mixed

Why:
- 3-6 precise bullets

Evidence from the provided syllabus:
- cite the relevant topic expectations if available

Fix:
- explain exactly what to remove, add, simplify, or tighten
```

## Scope Reminder

- Keep the skill focused on IB CS content calibration.
- Do not turn the wrapper into a generic CS explainer prompt.
- For textbook page structure, pair it with the textbook guide rather than embedding layout instructions here.
- If the syllabus extract is incomplete, proceed conservatively and label assumptions.
