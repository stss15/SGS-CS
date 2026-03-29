# TASK 1B — Build the Shared Textbook Component System and Data Model

You are now completing the **second part of Task 1**.

The architecture refactor should already be in place.

Your job now is to define and implement the shared textbook component/data model that all rebuilt textbook pages will use.

## Primary references

Read and apply these files:

- `agent_style_guide.html`
- `agent_textbook_skill_guide.md`
- `IB_Writing_Style.html`

Use them to derive structure, readability rules, component logic, and writing constraints.

## Why this task exists

Do **not** let chapter pages invent their own layout or formatting one by one.

Before rewriting content, the codebase needs a consistent textbook system that defines:

- what a textbook page is made of,
- which elements are required,
- which elements are optional,
- how content is structured,
- how component usage stays consistent across the site.

## Required result

Create a reusable textbook component system and content model that supports digital textbook reading and can be applied across IB, IGCSE, and KS3.

## Mandatory component inventory

The textbook system must explicitly support, where relevant:

- page title,
- chapter/subchapter labels,
- chapter overview,
- page-level contents block with jump links,
- H2/H3 content hierarchy,
- running body text,
- key-term or definition blocks,
- worked example blocks,
- code or pseudocode blocks,
- table blocks,
- figure/image blocks,
- captions,
- misconception / pitfall callouts,
- recap / key takeaway boxes,
- section dividers,
- previous/next navigation.

## Mandatory data-model work

Define how the rebuilt textbook content is stored and assembled.

At minimum, determine:

- chapter metadata fields,
- section metadata fields,
- anchor / id rules,
- ordering fields,
- optional vs required fields,
- human-readable chapter names,
- code / pseudocode content handling,
- image / figure reference handling,
- SL / HL visibility flags if needed.

Use the actual codebase conventions where possible. Do not invent a completely separate storage pattern unless necessary.

## IB-specific requirement

The IB implementation must support these shell-level chapter nodes:

- `A1`
- `A2`
- `A3`
- `A4`
- `B1`
- `B2`
- `B3`
- `B4`

Each chapter page must support a top-of-page contents block linking to its major internal subchapters, for example:

- `A1.1`
- `A1.2`
- `A1.3`
- `A1.4`

Do not place every tiny `A1.1.1`-style syllabus item into the main shell.

## Naming hierarchy rule

Implement this hierarchy consistently:

- **Shell level:** chapter label + chapter title, e.g. `A1 Computer fundamentals`
- **Page contents level:** subchapter label + subchapter title, e.g. `A1.1 Computer hardware and operation`
- **Body heading level:** syllabus statement level, where appropriate

Use human-readable names from `IB Comp Sci 2027.pdf` where available.

## SL / HL rule

Use `IB Comp Sci 2027.pdf` to preserve HL-only distinctions.

Do not present HL-only material as universal IB content.

Where relevant, the component/data model must allow:

- HL-only labelling,
- shared SL/HL pages with marked sections,
- or a clean visibility rule.

## Non-negotiable rules

- Do not hard-code a one-off layout only for A1.
- Do not let each chapter invent a different contents structure.
- Do not create card soup.
- Do not collapse textbook content into giant unstructured text walls.
- Do not proceed to full content migration until the shared pattern is stable.

## Completion criteria

Task 1B is complete only if:

- a shared textbook page/component pattern exists,
- a reusable content/data model exists,
- IB chapter navigation and subchapter contents can be driven from that model,
- the system is ready to accept rewritten textbook content one chapter at a time.

## Required checkpoint output

Before moving on, produce a short handoff note containing:

1. the components created or updated,
2. the data/content model introduced,
3. how chapter navigation is driven,
4. how SL/HL distinctions are represented,
5. any remaining gaps before content migration.
