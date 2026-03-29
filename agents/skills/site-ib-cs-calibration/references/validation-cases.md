# IB CS Validation Cases

Use this file to sanity-check whether `site-ib-cs-calibration` is scoped correctly and whether its instructions cover the intended task surface.

## Positive Cases

### 1. Write: IB textbook prose

Prompt shape:
- Write a short IB textbook section on `A3.4` data warehouses using the supplied IB extract.

Expected trigger:
- Yes

Expected behavior:
- stays anchored to the provided guide,
- uses textbook-like explanation rather than revision bullets,
- keeps examples bounded and relevant,
- avoids database-engineering deep dives,
- writes at IB level rather than IGCSE.

Manual result:
- Pass. The skill description and `Write` mode clearly cover IB textbook authoring and defer page structure to the textbook guide.

### 2. Edit: over-simplified draft

Prompt shape:
- Edit this student-facing explanation because it feels too basic and too IGCSE-like.

Expected trigger:
- Yes

Expected behavior:
- preserves the core meaning,
- increases abstraction and precision,
- restores formal IB terminology,
- removes babyish phrasing,
- stays readable for EAL learners.

Manual result:
- Pass. The skill has explicit `Edit` mode rules plus the IB vs IGCSE boundary checks.

### 3. Judge: overly advanced explanation

Prompt shape:
- Judge whether this IB CS paragraph on recursion is too advanced for the provided unit extract.

Expected trigger:
- Yes

Expected behavior:
- uses the fixed `Verdict / Why / Evidence / Fix` structure,
- flags mathematical formalism or unnecessary proof detail if out of scope,
- ties judgement to the provided syllabus extract,
- stays conservative if the extract is incomplete.

Manual result:
- Pass. The skill and wrapper both encode the required `Judge` format.

### 4. Convert: same concept, new output type

Prompt shape:
- Convert this IB textbook explanation into slide copy without changing the level boundary.

Expected trigger:
- Yes

Expected behavior:
- keeps the same syllabus anchor,
- changes structure for the new output type,
- does not simplify into lower-level teaching,
- does not add enrichment content.

Manual result:
- Pass. The skill includes a dedicated `Convert` mode with explicit boundary-preservation rules.

### 5. Style guide: future-facing standards

Prompt shape:
- Build a style guide for future IB CS revision-guide writers using the supplied guide extract.

Expected trigger:
- Yes

Expected behavior:
- includes audience, tone, level boundary, vocabulary expectations, sentence and paragraph expectations, inclusion and avoidance rules, examples, and a quality-control checklist,
- stays centered on IB CS rather than generic writing advice.

Manual result:
- Pass. The skill includes a dedicated `Style Guide` mode with the required section inventory.

## Negative Trigger Checks

### 1. KS3 content refresh

Prompt shape:
- Rewrite this Year 7 worksheet so it is clearer for KS3 students.

Expected trigger:
- No

Reason:
- the skill explicitly excludes KS3 and non-IB work.

### 2. IGCSE textbook rewrite

Prompt shape:
- Rewrite this IGCSE topic page to improve student readability.

Expected trigger:
- No

Reason:
- the skill explicitly excludes IGCSE content.

### 3. Frontend redesign

Prompt shape:
- Redesign this Astro landing page hero and improve the motion system.

Expected trigger:
- No

Reason:
- the skill is content-calibration only and explicitly excludes generic layout or frontend work.

## Static Checks

Manual static validation completed against the current files:

- `SKILL.md` frontmatter uses only `name` and `description`.
- Skill name is valid hyphen-case and under the 64-character limit.
- The description is specific to SGS IB CS calibration work and remains under the validator limit.
- `agents/openai.yaml` includes a `default_prompt` that explicitly mentions `$site-ib-cs-calibration`.
- `agents/openai.yaml` short description length is within the documented 25-64 character range.

## Validator Note

The bundled Codex `quick_validate.py` script could not be run directly in this environment because the local Python interpreter does not currently have `PyYAML` installed. Manual validation was used instead of mutating the environment.
