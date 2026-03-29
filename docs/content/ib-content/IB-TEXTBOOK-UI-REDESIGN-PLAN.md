# IB Textbook UI Redesign Plan

> Date: 2026-03-29
> Status: Planning only
> Goal: Redesign the shared textbook reading UI globally without changing textbook content.

## Source Pack Used

- `docs/content/ib-content/IB-TEXTBOOK-PROGRESS.md`
- `docs/content/ib-content/IB Textbook Improvements/agent_style_guide.html`
- `docs/content/ib-content/IB Textbook Improvements/agent_textbook_skill_guide.md`
- `docs/content/ib-content/IB Textbook Improvements/IB_Writing_Style.html`
- Shared renderer files in `apps/site/src/pages/**/textbook*.astro`, `apps/site/src/layouts/ReaderShell.astro`, `src/static/css/reader.css`, `src/static/js/reader.js`

## Agent Research Runs

Three parallel `gpt-5.4` medium research passes were used to shape this plan:

1. Renderer audit
   Mapped the shared textbook surface from routes into `ReaderShell`, `BaseLayout`, `auto-shell`, `reader.css`, `reader.js`, and content collections.
2. Source-pack synthesis
   Extracted hard constraints and anti-patterns from the progress log, architecture prompt, component-model brief, style guide, and reader UX evaluation.
3. Visual-direction pass
   Diagnosed the current reading rhythm and proposed a calmer editorial direction using the shared reader system and the `frontend-skill` guardrails.

## Non-Negotiables

- Do not rewrite, trim, reorder, or paraphrase textbook content.
- Do not add chapter-specific CSS.
- Do not touch the shell sidebar, course explorer, or broader page-shell layout.
- Keep this as a shared textbook-system pass that affects IB and IGCSE textbook entries through the same reader surface.
- Treat the current chapter content files as fixed input and redesign only how they render.

## Current Global Implementation Map

| Area | Current file(s) | Why it matters |
| --- | --- | --- |
| Shared textbook shell | `apps/site/src/layouts/ReaderShell.astro` | Every current Astro textbook route renders through this shell. |
| Legacy Nunjucks reader shell | `src/templates/layouts/reader.njk` | Legacy textbook pages still load the same `/css/reader.css` and `/js/reader.js`, so global reader changes can affect them even if Astro routes are the main target. |
| IB textbook route | `apps/site/src/pages/ib-2027/[level]/textbook.astro` | Provides the IB chapter contents block and section wrappers. |
| IGCSE textbook routes | `apps/site/src/pages/igcse/[topic]/textbook.astro`, `apps/site/src/pages/igcse/[topic]/textbook/[chapter].html.astro` | These use the same reader surface, so the redesign must stay compatible. |
| Legacy textbook routes still on the shared reader assets | `src/pages/ks3/**/textbook.njk`, `src/pages/igcse/**/textbook.njk`, `src/pages/ib-2027/**/textbook.njk` | These are part of the real blast radius for any global reader CSS/JS pass. |
| Global reader CSS | `src/static/css/reader.css`, `public/css/reader.css` | This is the main leverage point for a site-wide textbook UI redesign. |
| Global reader JS | `src/static/js/reader.js`, `public/js/reader.js` | Handles anchor jumps and keyword definition modal behavior. |
| Shared shell routing + textbook nav state | `apps/site/src/layouts/BaseLayout.astro`, `apps/site/src/lib/auto-shell.ts`, `apps/site/src/lib/curriculum-shell.ts` | These own layout mode, sidebar context, and textbook child-link generation. They should stay untouched unless a tiny reader hook is unavoidable. |
| Content schema and chapter metadata | `apps/site/src/content/config.ts`, `apps/site/src/pages/igcse/[topic]/index.astro` | These define the collection shape and chapter-link source data that the reader surface must respect. |
| Newer IB component markup | `apps/site/src/content/ib-textbooks/sl/a1-1-hardware.md`, `apps/site/src/content/ib-textbooks/sl/b1-1-computational-thinking.md`, `apps/site/src/content/ib-textbooks/sl/b2-*.md`, `apps/site/src/content/ib-textbooks/sl/b3-1-oop-fundamentals.md`, `apps/site/src/content/ib-textbooks/hl/b2-4-recursion.md`, `apps/site/src/content/ib-textbooks/hl/b3-2-oop-advanced.md`, `apps/site/src/content/ib-textbooks/hl/b4-1-abstract-data-types.md` | Uses semantic `ib-textbook-*` blocks for definitions, notes, warnings, worked examples, and summaries. |
| Legacy textbook component markup still in active use | `apps/site/src/content/ib-textbooks/hl/unit-5.md`, `apps/site/src/content/ib-textbooks/hl/unit-7.md`, `apps/site/src/content/ib-textbooks/hl/unit-8.md`, `apps/site/src/content/ib-textbooks/hl/unit-9.md`, `apps/site/src/content/ib-textbooks/hl/unit-10.md`, `apps/site/src/content/ib-textbooks/hl/unit-11.md`, `apps/site/src/content/ib-textbooks/sl/unit-6.md`, `apps/site/src/content/ib-textbooks/sl/unit-7.md`, `apps/site/src/content/ib-textbooks/sl/unit-11.md`, `apps/site/src/content/igcse-textbooks/topic-1.md`, `apps/site/src/content/igcse-textbooks/topic-2.md`, `apps/site/src/content/igcse-textbooks/topic-3.md` | Uses `reader-section-body` wrappers, so the redesign must unify old and new textbook patterns. |

## Measured Scope

The over-boxing problem is systemic, not anecdotal:

- Current IB Astro textbook content spans `25` markdown files and includes:
  - `66` definition blocks
  - `60` note blocks
  - `75` warning blocks
  - `152` worked-example blocks
  - `150` summary blocks
  - `212` legacy `reader-section-body` wrappers
- Current IGCSE Astro textbook content spans `10` markdown files and includes:
  - `158` legacy `reader-section-body` wrappers
  - `61` interactive `igcse-widget` blocks

Implication:

- The redesign cannot depend on manual content cleanup.
- The shared reader system has to reduce visual fragmentation by CSS and wrapper logic alone.

## Research Summary

### What is already solved

- The old duplicate textbook sidebar layout has already been removed from the page surface.
- IB chapter pages already use an in-page contents block instead of a second side panel.
- The newer IB textbook content is structurally strong and already uses a clear semantic component set.

### What is still wrong

1. The reader is over-boxed.
   H2 chapter sections, H3 subsection headings, the top contents block, `reader-section-body` wrappers, and `ib-textbook-*` callouts all present as bordered or shaded panels. The result is not one readable chapter. It is a stack of adjacent containers.

2. Structural hierarchy and semantic emphasis are competing with each other.
   Major section dividers are visually as loud as notes, warnings, worked examples, and summary blocks. Students have to decode chrome before they can read content.

3. The redesign is split across two textbook dialects.
   Older textbook files use `reader-section-body--concept/apply/example`. Newer IB files use `ib-textbook-defn/note/warning/worked/summary`. Both are valid content systems, but they currently create inconsistent rhythm.

4. Spacing is not doing enough of the hierarchy work.
   The UI relies on borders, gradient fills, shadows, and left accents instead of calm spacing, measure, and section separation.

5. Long-form reading still feels like a web page assembled from blocks.
   The source guides explicitly warn against “fragmented card soup,” oversized worksheet styling, and loose web-prose presentation. The current reader is closer to that failure mode than to a digital textbook reader.

6. Mobile inherits the same chrome density.
   Box-heavy treatments that are tolerable on desktop become cramped on narrow screens, especially around headings, tables, and stacked callouts.

## Validation Environment Note

- Visual baseline checks should use `https://sgs-science.web.app`, not only `apps/site` local dev.
- Current local Astro textbook routes can fail to load `/css/reader.css` and `/js/reader.js`, which means localhost is not a reliable visual reference for this redesign pass.
- If local-first validation is required during execution, fix reader-asset resolution first as a preflight task. That is a preview-environment issue, not part of the textbook UI redesign itself.

## Frontend Direction

### Visual Thesis

Build a calm editorial textbook surface: warm paper, strong typography, generous vertical rhythm, minimal chrome, and emphasis that comes from layout first and tint second.

### Content Plan

1. Orientation
   Quiet dochead with chapter identity, summary, and top contents block.
2. Section flow
   Major chapter sections act like editorial dividers, not cards.
3. Semantic support
   Notes, warnings, worked examples, definitions, and summaries read like inset teaching tools inside the chapter, not separate products.
4. Technical detail
   Code, tables, diagrams, and traces feel precise and deliberate, with enough breathing room to scan quickly.

### Interaction Thesis

1. The top contents block should show where the reader is in the chapter as they scroll.
2. Anchor jumps should feel precise and calm, with headings landing cleanly below the sticky site header.
3. Motion should stay limited to useful orientation cues: active section highlight, subtle anchor reveal, optional thin progress indicator.

## Design System Target

### 1. Reframe the page as a reading surface, not a collection of cards

Implementation intent:

- Keep `ReaderShell` as the shared shell, but add a textbook-specific frame class or data attribute if needed for tighter scoping.
- Shift the visual weight from borders and shadows to whitespace, measure, and divider logic.
- Remove most panel-like treatment from routine structure.

Execution rules:

- H1/dochead stays strong, but loses unnecessary framing.
- The main prose measure should sit in a sustained-reading range, not a wide app-content range.
- Default paragraph/list/table/code spacing should be recalibrated together, not patched one component at a time.

### 2. Redesign the top contents block into a chapter index, not a card grid

Current problem:

- The IB contents block still reads like a set of small hover cards.

Target:

- A quiet chapter index with code, title, and active-state emphasis.
- More list-like than card-like.
- Stronger scan rhythm on desktop and a clean stacked list on mobile.

Execution rules:

- Remove heavy panel feel from `.ib-textbook-contents`.
- Reduce hover movement and visual bounce.
- Add active/current section styling driven by scroll position.
- Preserve the existing anchor-link behavior.

### 3. Make H2 section dividers editorial, not boxed

Current problem:

- Major IB section headers use gradient fills, left bars, and shadow, which makes each chapter section look like a card header.

Target:

- A cleaner chapter-break treatment built from spacing, a top rule, code label, and tighter heading composition.

Execution rules:

- Keep syllabus code visible and prominent.
- Use one divider language for major sections across textbook routes.
- Let the section overview sit as a quiet bridge under the heading, not as part of the chrome.

### 4. Simplify H3 and legacy `reader-section-body` sections into one calm subsection pattern

Current problem:

- H3s are boxed and color-coded.
- Legacy `reader-section-body` content then adds another bordered block immediately below.
- That produces a heading card on top of a content card.

Target:

- H3 becomes a lightweight subsection signal.
- Its associated body becomes a softer inset section that feels connected, not separately boxed.

Execution rules:

- Treat `h3 + .reader-section-body` as one visual unit.
- Keep semantic color differences, but reduce saturation and hard edges.
- Map `--concept`, `--apply`, `--example`, and `--command` to a unified inset system.
- Avoid shadows and full-rectangle boxing for routine subsection content.

### 5. Unify newer `ib-textbook-*` blocks into the same visual family

Current problem:

- Definitions, notes, warnings, worked examples, and summaries each use their own full box treatment.

Target:

- Shared callout anatomy with one base structure and controlled variation by role.

Execution rules:

- Use a common internal layout model:
  - small label/eyebrow,
  - optional title,
  - calm body container,
  - one accent channel per role.
- Definitions should feel the lightest.
- Notes and warnings should feel informative, not alarm-heavy.
- Worked examples should feel deliberate and procedural.
- Summaries should feel conclusive, not decorative.

### 6. Improve prose rhythm before adding more UI

Execution rules:

- Rebalance margins around paragraphs, lists, headings, tables, and code.
- Increase separation before major shifts.
- Tighten spacing inside tightly related heading-content pairs.
- Make list spacing calmer so bullets feel like part of the chapter, not isolated blocks.

### 7. Upgrade code, table, and figure treatment for dense technical content

Code blocks:

- Keep the dark code theme.
- Improve outer spacing so code does not feel squeezed between cards.
- Keep language chips, but reduce any ornamental treatment around them.

Tables:

- Improve surrounding spacing and overflow handling.
- Make tables feel like reference tools embedded in the chapter.
- Reduce excessive border emphasis.
- Ensure mobile routes use horizontal scrolling gracefully.

Figures and captions:

- Captions should sit closer to figures and read as interpretive support.
- Figure treatment should align with the same calm inset language as the rest of the reader.

### 8. Add only low-noise interaction improvements

Allowed interaction work:

- Active section highlight inside the top contents block.
- Thin reading progress indicator at the top of the content surface.
- Optional back-to-top control inside the textbook surface only if it stays discreet.

Not allowed:

- Any change to the main sidebar behavior.
- Floating secondary navigation that recreates the old double-nav problem.

## Concrete File Plan

### Primary files to edit during execution

- `apps/site/src/layouts/ReaderShell.astro`
- `src/static/css/reader.css`
- `src/static/js/reader.js`
- `public/css/reader.css`
- `public/js/reader.js`

### Route files to touch only if wrapper hooks are required

- `apps/site/src/pages/ib-2027/[level]/textbook.astro`
- `apps/site/src/pages/igcse/[topic]/textbook.astro`
- `apps/site/src/pages/igcse/[topic]/textbook/[chapter].html.astro`

### Legacy parity hook to touch only if unavoidable

- `src/templates/layouts/reader.njk`

Reason:

- If the final design needs one extra reader-level class/data attribute for scoping, it must be mirrored here as well, otherwise legacy textbook pages will drift from Astro textbook pages.

### Files not to touch

- Any textbook markdown content in `apps/site/src/content/ib-textbooks/**`
- Any textbook markdown content in `apps/site/src/content/igcse-textbooks/**`
- `apps/site/src/components/CourseExplorer.astro`
- `apps/site/src/layouts/BaseLayout.astro`
- `apps/site/src/styles/tokens.css`
- Individual legacy textbook page files under `src/pages/**/textbook.njk`

## Execution Sequence

### Phase 1. Shared reader tokens and surface cleanup

- Add or revise reader-specific CSS custom properties for spacing, prose measure, divider tone, and callout tinting.
- Strip back shadows, over-strong borders, and gradient-heavy framing from routine textbook structure.
- Keep the modal and definition-chip system intact.

### Phase 2. Structural hierarchy pass

- Redesign `.reader-dochead`.
- Redesign `.ib-textbook-contents`.
- Redesign `.ib-textbook-section > h2`, `.ib-textbook-section__overview`, and `.ib-textbook-entry`.
- Adjust prose heading styles so H2 and H3 clearly occupy different roles.

### Phase 3. Semantic block unification

- Create one calmer visual family for:
  - `.reader-section-body*`
  - `.ib-textbook-defn*`
  - `.ib-textbook-note*`
  - `.ib-textbook-warning*`
  - `.ib-textbook-worked*`
  - `.ib-textbook-summary*`
- Ensure legacy IGCSE and older IB routes benefit automatically.

### Phase 4. Technical content pass

- Refine tables, code blocks, list spacing, captions, and figure blocks.
- Verify long algorithm and data-structure sections still scan cleanly.

### Phase 5. Interaction polish

- Add current-section highlight for the chapter contents block.
- Optionally add a thin progress line and/or back-to-top control if they remain understated.
- Keep reduced-motion compliance.

### Phase 6. Verification

- Run build/check.
- QA representative textbook routes.
- Confirm there are zero content file diffs.

## Verification Matrix

Use these representative pages when executing:

| Route type | Example route | Why it matters |
| --- | --- | --- |
| Newer IB semantic blocks | `/ib-2027/b2/textbook.html` | Definitions, notes, worked examples, summaries, code, tables. |
| Newer IB A-theme content | `/ib-2027/a1/textbook.html` | Dense definitions and callouts in the new pattern. |
| Newer IB HL technical content | `/ib-2027/b4/textbook.html` | Heavy code/table/ADT content. |
| Legacy IB reader-section-body pattern | An HL A4 unit page backed by `apps/site/src/content/ib-textbooks/hl/unit-8.md` or `unit-9.md` | Ensures old wrapper-based content still renders well. |
| Legacy IGCSE full-topic reader | `/igcse/topic1/textbook.html` | Confirms the shared reader redesign remains cross-site safe. |
| Legacy IGCSE chapter reader | `/igcse/topic1/textbook/1-1.html` or another mapped chapter | Confirms chapter extraction route still reads cleanly. |
| Legacy Nunjucks / KS3 reader | `/ks3/year7/unit2/textbook.html` | Confirms the shared reader assets do not regress older textbook pages still using `src/templates/layouts/reader.njk`. |

Viewport checks:

- Desktop: 1440px wide
- Tablet: 1024px wide
- Mobile: 390px wide

Interaction checks:

- Contents block anchor jumps
- Header offset after anchor jump
- Definition modal open/close and keyboard handling
- Table overflow on mobile
- No duplicate navigation introduced

Content integrity checks:

- `git diff -- apps/site/src/content/ib-textbooks apps/site/src/content/igcse-textbooks` must stay empty.
- Textbook markdown, headings, lists, tables, and code must remain unchanged.

## Acceptance Criteria

- The textbook page reads like one continuous editorial chapter rather than stacked cards.
- Major hierarchy is driven by spacing and typographic structure first.
- Semantic teaching blocks remain distinct, but no longer dominate the page chrome.
- Both `reader-section-body` legacy content and `ib-textbook-*` newer content feel like one shared system.
- The redesign is global to textbook entries through the shared reader files.
- No sidebar changes are made.
- No textbook content changes are made.

## Risks and Controls

### Risk 1. Breaking legacy textbook markup while improving new IB pages

Control:

- Design the CSS around both active component dialects from the start.
- QA at least one legacy IGCSE page and one legacy IB unit-backed page.

### Risk 2. Over-correcting into plain web prose

Control:

- Keep visible section dividers and semantic teaching blocks.
- Remove box noise, not hierarchy.

### Risk 3. Styling drift between `src/static` and `public`

Control:

- Make `src/static/*` the primary edit target.
- Mirror to `public/*` if the current build/deploy flow still requires parity.

### Risk 4. Mobile degradation on dense technical pages

Control:

- Treat mobile as a first-class pass, especially for table overflow, heading density, and callout padding.

## Recommended Output of the Execution Pass

When this plan is executed, the deliverable should include:

- the shared reader UI changes,
- screenshots or route checks for the verification matrix,
- confirmation that textbook content files were untouched,
- confirmation that the sidebar and shell navigation were untouched,
- build/check results,
- any unresolved edge cases limited to textbook rendering.
