# Agent Textbook Skill Guide

## Purpose

This guide defines how an AI agent should research, plan, write, review, and format student-facing textbook content for a school-owned digital learning platform. It is intended to be converted into a `SKILL.md` file or used as a design and implementation reference for textbook-generation workflows.

The system is designed for Computer Science textbook content across KS3, IGCSE, and IB, with the IB Diploma Programme as the most demanding reference case. It prioritises conceptual clarity, pedagogical rigour, structural consistency, and digital readability over decorative or generic web-writing habits.

---

## Why this guide exists

OpenAI’s current guidance for GPT-5.4 and agentic workflows emphasises three things that matter here:

1. the model performs best when the output contract is explicit,
2. completion criteria and verification loops are stated plainly,
3. reusable skills should place instructions in `SKILL.md`, with clear name/description metadata and concrete operating rules rather than vague advice.

This guide therefore turns textbook research and style decisions into a durable agent skill rather than a loose prompt.

---

## Scope

This skill governs:

- textbook chapter planning,
- textbook subsection drafting,
- digital textbook page structure,
- use of examples, tables, figures, code, pseudocode, callouts, and summaries,
- consistency controls across a large codebase,
- anti-repetition safeguards for AI-generated textbook prose,
- human review requirements before publication.

This skill does **not** govern:

- worksheet design,
- slide deck pedagogy,
- branding or palette decisions,
- decorative marketing copy,
- assessment-item generation unless explicitly requested.

---

## Core design goal

Produce digital textbook content that feels like a proper student-facing textbook reader rather than:

- a revision guide,
- a blog post,
- a slide deck transcript,
- a worksheet,
- or a generic AI summary.

The final pages should support sustained reading, careful concept-building, and technical accuracy.

---

## Non-negotiable principles

### 1. Syllabus-first accuracy
All content must map directly to the supplied curriculum or source pack. The agent must not invent syllabus content, requirements, terminology, or assessment expectations.

### 2. Textbook, not revision notes
The output must explain, sequence, and build understanding. It must not collapse into bullet-heavy notes unless the section genuinely calls for a short list.

### 3. Clarity without simplification theatre
The prose should be clear and accessible, especially for EAL learners, but must not become patronising, over-cheerful, or empty.

### 4. Consistency of system, variation of rhetoric
The textbook should have a stable structural grammar, but individual chapters and sections must not sound cloned.

### 5. Cognitive economy
Remove needless visual and textual clutter. Every block, table, figure, and callout must earn its place.

### 6. Concrete-to-abstract movement
Difficult concepts should usually move from example, process, or mechanism toward formal terminology and synthesis, unless the content specifically demands a different route.

### 7. Worked thinking over content dumping
Procedural or algorithmic ideas must be shown in motion through examples, traces, tables, staged logic, or annotated walkthroughs.

### 8. Human review before publication
AI-generated textbook content must not be published unreviewed.

---

## Textbook voice and tone

### Required tone
- authoritative,
- calm,
- direct,
- academically serious,
- student-facing,
- technically precise.

### Forbidden tone features
- faux-friendly cheerleading,
- marketing language,
- blog-style hype,
- forced rhetorical questions,
- repeated “In summary”, “Let’s dive in”, “Imagine if”, “As we have seen”,
- exclamation marks unless part of quoted source material,
- filler transitions with no instructional value.

### Prose expectations
- Prefer active voice unless passive is genuinely clearer.
- Keep sentence structures varied but controlled.
- Avoid arbitrary synonym swapping for technical terms.
- Define domain-specific terminology on first meaningful use.
- Use metadiscourse sparingly but deliberately to signal contrast, sequence, consequence, and reference.

---

## Audience assumptions

Default audience:

- secondary and pre-university learners,
- many working in English as an additional language,
- novice to intermediate readers of technical content,
- capable of serious thought but still building disciplinary vocabulary and schema.

Implications:

- reduce unnecessary linguistic complexity,
- keep paragraph logic explicit,
- do not assume hidden prior knowledge beyond the supplied curriculum sequence,
- do not conflate “accessible” with “casual”.

---

## Standard chapter architecture

A textbook chapter or major section should usually follow this logic.

### Phase 1: Orientation
Purpose: situate the reader.

Possible contents:
- chapter label,
- chapter title,
- short overview,
- brief statement of what the chapter connects or solves,
- optional contents block linking to internal sections.

### Phase 2: Exposition
Purpose: explain the core concept or mechanism.

Possible contents:
- definitions in context,
- explanation paragraphs,
- small comparison tables,
- annotated diagrams,
- note or misconception callouts,
- short process breakdowns.

### Phase 3: Application
Purpose: show the concept in action.

Possible contents:
- worked examples,
- trace tables,
- pseudocode or code blocks,
- staged procedures,
- side-by-side “what happens / why it matters” tables.

### Phase 4: Synthesis
Purpose: consolidate and reconnect.

Possible contents:
- key takeaways,
- repacking into formal terminology,
- links to broader system themes,
- short bridge to the next concept.

This is the default architecture. It can compress or expand depending on topic complexity, but it should remain recognisable.

---

## Component inventory

The textbook system should support the following reusable components.

### Page-level components
- Chapter label
- Chapter title
- Chapter overview
- Chapter contents block with anchor links
- Previous / next navigation

### Content-level components
- H2 major section heading
- H3 subsection heading
- Body paragraph block
- Key term / definition block
- Worked example block
- Procedure / stage table
- Standard table
- Code block
- Pseudocode block
- Figure / image block
- Caption
- Note callout
- Warning / misconception callout
- Summary / recap block
- Divider / section separator
- Cross-reference block

---

## Component rules

### 1. Chapter label
**Purpose:** show curriculum code and context.

**Use:** at the top of the page.

**Rules:** keep concise; pair curriculum code with meaningful name where possible.

---

### 2. Chapter title
**Purpose:** identify the chapter clearly.

**Use:** once per page.

**Rules:** titles should be specific and content-led, not generic.

---

### 3. Chapter overview
**Purpose:** orient the reader without becoming a mini-essay.

**Use:** immediately below the title.

**Rules:** 2–5 sentences. Explain what the chapter covers, what it connects, and why it matters.

---

### 4. Chapter contents block
**Purpose:** provide anchor-based navigation inside the chapter.

**Use:** near the top of longer chapter pages.

**Rules:**
- list major internal sections only,
- use codes plus human-readable labels,
- do not dump tiny subpoints into the contents block,
- contents block answers “what is inside this chapter?”

---

### 5. H2 major section heading
**Purpose:** divide major conceptual steps.

**Use:** for the main logical segments of the chapter.

**Rules:** every H2 should represent a meaningful shift in concept, mechanism, or application.

---

### 6. H3 subsection heading
**Purpose:** break dense sections into manageable parts.

**Use:** beneath H2s where necessary.

**Rules:** do not stack headings without prose underneath. Avoid heading spam.

---

### 7. Body paragraph block
**Purpose:** carry the main explanation.

**Use:** throughout.

**Rules:**
- one central idea per paragraph,
- normally 2–5 sentences,
- break early on screen rather than too late,
- avoid long abstract build-ups without an example or mechanism.

---

### 8. Key term / definition block
**Purpose:** isolate formal terminology.

**Use:** when a term needs a precise definition.

**Rules:**
- define after or alongside meaningful context,
- do not flood pages with isolated glossary boxes,
- use consistently formatted labels.

---

### 9. Worked example block
**Purpose:** demonstrate reasoning or process in motion.

**Use:** whenever the student must perform, trace, convert, classify, normalise, calculate, or model something.

**Rules:**
- state the task,
- show each step,
- annotate the reason for each step,
- prefer progression over polished final answers.

---

### 10. Procedure / stage table
**Purpose:** show ordered process clearly.

**Use:** instruction cycle, algorithm trace, network flow, lifecycle stages, database procedures, etc.

**Rules:**
- columns must have distinct jobs,
- table must reduce cognitive load rather than duplicate prose,
- pair with explanatory text where necessary.

---

### 11. Standard table
**Purpose:** compare entities, roles, properties, or distinctions.

**Use:** hardware roles, protocol comparison, SQL command families, OOP relationships, etc.

**Rules:**
- every table needs a clear purpose,
- avoid oversized tables with weak contrast in meaning,
- accompany with interpretation when the meaning is not obvious.

---

### 12. Code block
**Purpose:** show executable or near-executable program text.

**Use:** when syntax is genuinely relevant.

**Rules:**
- code must support the explanation, not replace it,
- keep examples readable before optimised,
- annotate outside or alongside the code,
- do not overload one block with too many new ideas.

---

### 13. Pseudocode block
**Purpose:** foreground algorithmic logic independently of language.

**Use:** default for algorithm explanation where curriculum requires pseudocode-first understanding.

**Rules:**
- align with the target curriculum’s pseudocode conventions,
- use before language-specific syntax where appropriate,
- support with trace or explanation.

---

### 14. Figure / image block
**Purpose:** support understanding through visual representation.

**Use:** for diagrams, state changes, architecture, memory layout, network layers, UI sketches, model relationships.

**Rules:**
- image must clarify, not decorate,
- image must be placed near the relevant explanation,
- avoid purely decorative stock imagery,
- ensure adequate size and legibility.

---

### 15. Caption
**Purpose:** tell the reader what the figure or table shows and why it matters.

**Use:** with all figures and tables unless the meaning is utterly obvious.

**Rules:**
- caption should interpret, not merely label,
- be concise,
- use consistent prefixing if your design system uses figure numbering.

---

### 16. Note callout
**Purpose:** provide useful side information without breaking the main explanation.

**Use:** historical context, practical nuance, extra clarification.

**Rules:**
- should be optional to the main reading path,
- should not contain core explanation the student cannot miss.

---

### 17. Warning / misconception callout
**Purpose:** correct likely misunderstanding.

**Use:** where students commonly confuse two ideas or misread a symbol, process, or rule.

**Rules:**
- name the mistake clearly,
- explain why it is wrong,
- give the corrected model.

---

### 18. Summary / recap block
**Purpose:** consolidate the section or chapter.

**Use:** at the end of substantial sections or the chapter.

**Rules:**
- should distil, not repeat,
- avoid robotic summary openers,
- link back to the central mechanism or conceptual distinction.

---

### 19. Divider / section separator
**Purpose:** mark shifts in reading rhythm.

**Use:** between major sections where the page would otherwise become visually exhausting.

**Rules:** subtle, structural, not ornamental.

---

### 20. Previous / next navigation
**Purpose:** preserve textbook flow.

**Use:** bottom of page.

**Rules:** should reinforce linear progression through the curriculum.

---

## Typography and hierarchy rules

### Heading hierarchy
- H1: chapter title only
- H2: major thematic sections
- H3: internal subtopics, worked examples, focused mechanisms
- never skip heading levels for cosmetic reasons

### Body text
- reading-first sizing,
- moderate line length,
- comfortable line spacing,
- avoid oversized body text that makes the page feel childish or like a worksheet.

### Emphasis
- **Bold** for term emphasis, labels, and genuinely important distinctions.
- *Italic* for limited technical nuance, titles where needed, and contrastive emphasis.
- avoid overusing either.

### Labels
Use a stable label system for items like:
- Overview
- Worked example
- Common pitfall
- Key takeaway
- Figure
- Table

The label language should be consistent across KS3, IGCSE, and IB.

---

## Layout and reading rules

### Reading width
The main text column should prioritise sustained reading rather than wide dashboard-style sprawl.

### Section rhythm
Pages should alternate naturally between:
- prose,
- visual support,
- examples,
- structured reference blocks.

Avoid both extremes:
- giant uninterrupted text walls,
- fragmented card soup.

### Spacing
Spacing should signal hierarchy and transitions.

Use more space:
- before new major sections,
- around worked examples,
- around figures and tables,
- around synthesis blocks.

Use less space:
- between tightly connected heading-content pairs.

### Density control
When a section is dense:
- add subheadings,
- insert a figure or trace table,
- break one concept from the next,
- use a misconception or key-term block where it genuinely helps.

---

## Technical content rules for Computer Science

### Algorithms
- teach logic before optimisation,
- use pseudocode and trace tables where appropriate,
- show how state changes across steps,
- annotate the decision-making, not just the final code.

### Systems and architecture
- rely on process diagrams, state tables, staged sequences,
- explain invisible processes through visible structure.

### Networking
- use layers, packets, encapsulation/decapsulation, addressing, protocol responsibilities,
- show flow rather than static descriptions alone.

### Databases
- separate conceptual modelling from implementation,
- sequence from entities/relationships to schemas to normalisation to querying.

### OOP
- pair code with structural explanation,
- use diagrams or tables to distinguish class/object, inheritance/composition, method/state relationships.

### Machine learning and data topics
- define model purpose, data flow, training/evaluation distinction, and limitations clearly,
- avoid pseudo-mathematical handwaving.

---

## Standardisation vs flexibility

### Must be standard
- chapter entry structure,
- heading hierarchy,
- label vocabulary,
- caption rules,
- table and code treatment,
- callout taxonomy,
- bottom navigation pattern,
- general reading width and spacing rhythm.

### May vary by chapter
- exact number of sections,
- whether the chapter opens with example-first or definition-first framing,
- how many figures are needed,
- how many worked examples are necessary,
- whether a comparison table or a process table is the better explanatory device,
- whether a misconception block is needed in every major section.

---

## Failure modes to prevent

The agent must actively avoid these patterns.

### 1. Web blob mode
Long undifferentiated prose with weak hierarchy.

### 2. Worksheet mode
Oversized text, too much empty boxing, simplistic formatting, underdeveloped prose.

### 3. Slide deck mode
Too many short fragments, no narrative through-line, over-reliance on labels and boxes.

### 4. Revision guide mode
Dense bullets instead of explanation.

### 5. Decorative UI mode
Visual panels and images that add aesthetic noise but no instructional value.

### 6. AI sameness mode
Repeated openings, repeated transitions, identical section rhythms, generic recap phrases.

### 7. Unanchored figure mode
Images or tables left to “speak for themselves” without explanatory integration.

### 8. Terminology drift
Switching between near-synonyms for the same technical concept merely for stylistic variation.

---

## AI workflow requirements

This skill should drive a multi-step workflow, not one-pass chapter dumping.

### Stage 1: Analyse the task
The agent must inspect:
- source pack,
- target curriculum scope,
- current chapter position,
- any prior chapter outputs,
- style requirements.

### Stage 2: Produce a planning block
Before drafting, generate a short plan containing:
- target concept,
- section structure,
- hardest conceptual difficulty,
- proposed explanation strategy,
- worked example plan,
- likely misconception,
- assets needed (table, figure, code, pseudocode, etc.),
- anti-repetition note versus recent chapters.

### Stage 3: Draft the section
Write only after the planning block is coherent.

### Stage 4: Audit the draft
Check:
- factual scope,
- syllabus alignment,
- tone compliance,
- repetition,
- readability,
- component use,
- adequacy of examples,
- whether the page feels like a textbook rather than a content blob.

### Stage 5: Output revision if needed
If the audit identifies weak points, revise before finalising.

---

## Anti-repetition controls

The agent must monitor and vary:
- opening strategy,
- transition style,
- paragraph rhythm,
- example style,
- section ordering where appropriate,
- summary phrasing.

The agent must avoid reusing the same stock phrases across chapters.

Maintain a running “style memory” note including:
- recent section openings used,
- recent example types,
- repeated phrases to suppress,
- overused callout patterns,
- tone drift warnings.

---

## Publication checklist

Before a section is considered publishable, the reviewer should be able to answer yes to the following.

- Does the section match the supplied curriculum scope?
- Does it explain rather than merely list?
- Does it use the right component types for the content?
- Are technical terms introduced clearly?
- Are examples doing real explanatory work?
- Are figures/tables integrated with the prose?
- Is the tone authoritative and clear without fluff?
- Is the section visually readable on screen?
- Does it avoid obvious AI repetition?
- Does it feel like a textbook page rather than a worksheet, slide deck, or note dump?

---

## Suggested `SKILL.md` operating skeleton

The following is the practical shape this guide should become.

### Name
`textbook_writer`

### Description
Writes student-facing digital textbook chapters and subsections for Computer Science curricula using a consistent textbook structure, strong pedagogical sequencing, and codebase-wide style rules.

### Inputs expected
- curriculum or syllabus source pack,
- chapter code and title,
- target section/subsection,
- platform style constraints,
- prior chapter context where relevant,
- approved terminology conventions,
- allowed component set.

### Output types
- planning block,
- draft subsection,
- revised subsection,
- chapter contents block,
- optional component recommendations.

### Required behaviour
- analyse first,
- plan before drafting,
- follow the textbook component system,
- use concrete-to-abstract sequencing where suitable,
- include examples and technical supports when needed,
- self-audit before final output,
- avoid template-like prose repetition.

### Refusal / escalation conditions
The agent should stop and flag an issue if:
- the source pack is incomplete,
- the requested section exceeds the supplied syllabus scope,
- required terminology conventions are missing,
- curriculum alignment is ambiguous,
- the task asks for unsupported factual invention.

---

## Implementation notes for the site

This guide pairs with the textbook UI/component style prompt.

The frontend system should distinguish between:

1. **shell navigation** — where the user is in the curriculum,
2. **chapter contents block** — what is inside the current chapter,
3. **content body components** — how the material is taught.

This prevents the textbook from behaving like a duplicate mini-app inside the main shell.

---

## Final instruction to any agent using this guide

Build explanations, not just sections.
Build chapter rhythm, not just isolated blocks.
Build a textbook system, not just compliant prose.
