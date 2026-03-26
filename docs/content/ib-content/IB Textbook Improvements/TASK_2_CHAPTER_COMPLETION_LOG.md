# Task 2 Chapter Completion Log

Current status: all theme chapters `A1` to `A4` and `B1` to `B4` are now rebuilt into the shared IB textbook system.

## A1 Computer fundamentals

1. Chapter completed
   A1 Computer fundamentals has been rebuilt into the shared textbook system for `/ib-2027/a1/textbook/`.

2. Source files used
   - `docs/content/ib-content/IB Textbook Improvements/IB Comp Sci 2027.pdf`
   - `docs/content/ib-content/Textbook Chapters PDF/A1.pdf`
   - `docs/content/ib-content/IB Textbook Improvements/IB_Writing_Style.html`
   - `docs/content/ib-content/IB Textbook Improvements/agent_textbook_skill_guide.md`
   - `docs/content/ib-content/IB Textbook Improvements/agent_style_guide.html`

3. HL-only handling
   - `A1.1.3` and `A1.1.6` are grouped in an HL-only chunk inside `A1.1`.
   - `A1.3.5`, `A1.3.6`, and `A1.3.7` are grouped in an HL-only chunk inside `A1.3`.
   - `A1.4.1` remains HL only.
   - The rebuilt chapter does not carry forward legacy `A1.4.2` content because the official 2027 guide lists only `A1.4.1` under translation.

4. Major components used
   - `TextbookPageIntro`
   - `TextbookSectionBlock`
   - `TextbookChunk`
   - `TextbookCallout`
   - Standard reader tables, headings, and inline contents behaviour

5. Anything still missing or deferred
   - The rebuilt A1 chapter currently uses structured prose, tables, and callouts, but no custom figures yet.
   - Legacy IB unit markdown remains in the repo for transitional unit-level routes and as fallback for unrebuilt theme chapters.
   - A2, A3, A4, B1, B2, B3, and B4 still need full chapter rebuilds under Task 2.

## A3 Databases

1. Chapter completed
   A3 Databases has been rebuilt into the shared textbook system for `/ib-2027/a3/textbook/`.

2. Source files used
   - `docs/content/ib-content/IB Textbook Improvements/IB Comp Sci 2027.pdf`
   - `docs/content/ib-content/Textbook Chapters PDF/A3.pdf`
   - `docs/content/ib-content/IB Textbook Improvements/IB_Writing_Style.html`
   - `docs/content/ib-content/IB Textbook Improvements/agent_textbook_skill_guide.md`
   - `docs/content/ib-content/IB Textbook Improvements/agent_style_guide.html`

3. HL-only handling
   - `A3.3.4`, `A3.3.5`, and `A3.3.6` are grouped in an HL-only chunk inside `A3.3`.
   - `A3.4.1` to `A3.4.4` remain HL only in the rebuilt chapter.
   - The rebuilt chapter keeps OLAP, data mining, and distributed-database material inside the official HL section rather than spreading it into the SL design content.

4. Major components used
   - `TextbookPageIntro`
   - `TextbookSectionBlock`
   - `TextbookChunk`
   - `TextbookCallout`
   - Standard reader tables, headings, and SQL code blocks

5. Anything still missing or deferred
   - The rebuilt A3 chapter currently uses prose, tables, callouts, and SQL blocks, but no custom figures yet.
   - Legacy IB unit markdown remains in place for unrebuilt theme chapters and unit-level routes.
   - A2, A4, B1, B2, B3, and B4 still need full chapter rebuilds under Task 2.

## A4 Machine learning

1. Chapter completed
   A4 Machine learning has been rebuilt into the shared textbook system for `/ib-2027/a4/textbook/`.

2. Source files used
   - `docs/content/ib-content/IB Textbook Improvements/IB Comp Sci 2027.pdf`
   - `docs/content/ib-content/Textbook Chapters PDF/A4.pdf`
   - `docs/content/ib-content/IB Textbook Improvements/IB_Writing_Style.html`
   - `docs/content/ib-content/IB Textbook Improvements/agent_textbook_skill_guide.md`
   - `docs/content/ib-content/IB Textbook Improvements/agent_style_guide.html`

3. HL-only handling
   - `A4.2.1`, `A4.2.2`, and `A4.2.3` remain grouped as HL-only preprocessing content in `A4.2`.
   - All of `A4.3.1` to `A4.3.10` remains HL only inside the rebuilt `A4.3` section.
   - Legacy `A4.2.4` and `A4.3.11` content was not carried forward because those points are not present in the official 2027 guide.

4. Major components used
   - `TextbookPageIntro`
   - `TextbookSectionBlock`
   - `TextbookChunk`
   - `TextbookCallout`
   - Standard reader tables and inline contents behaviour

5. Anything still missing or deferred
   - The rebuilt A4 chapter currently uses prose, tables, and callouts, but no custom figures yet.
   - Legacy IB unit markdown remains in place for unrebuilt theme chapters and unit-level routes.
   - A2, B1, B2, B3, and B4 still need full chapter rebuilds under Task 2.

## B1 Computational thinking

1. Chapter completed
   B1 Computational thinking has been rebuilt into the shared textbook system for `/ib-2027/b1/textbook/`.

2. Source files used
   - `docs/content/ib-content/IB Textbook Improvements/IB Comp Sci 2027.pdf`
   - `docs/content/ib-content/Textbook Chapters PDF/B1.pdf`
   - `docs/content/ib-content/IB Textbook Improvements/IB_Writing_Style.html`
   - `docs/content/ib-content/IB Textbook Improvements/agent_textbook_skill_guide.md`
   - `docs/content/ib-content/IB Textbook Improvements/agent_style_guide.html`

3. HL-only handling
   - B1 remains entirely SL in the official 2027 guide, so the rebuilt chapter does not create HL-only chunks.
   - Flowchart tracing remains inside `B1.1.4` rather than being expanded into later programming-syllabus material from `B2`.

4. Major components used
   - `TextbookPageIntro`
   - `TextbookSectionBlock`
   - `TextbookChunk`
   - `TextbookCallout`
   - Standard reader tables and inline contents behaviour

5. Anything still missing or deferred
   - The rebuilt B1 chapter currently uses prose, tables, and callouts, but no custom figures yet.
   - Legacy IB unit markdown remains in place for unrebuilt theme chapters and unit-level routes.
   - A2, B2, B3, and B4 still need full chapter rebuilds under Task 2.

## B2 Programming

1. Chapter completed
   B2 Programming has been rebuilt into the shared textbook system for `/ib-2027/b2/textbook/`.

2. Source files used
   - `docs/content/ib-content/IB Textbook Improvements/IB Comp Sci 2027.pdf`
   - `docs/content/ib-content/Textbook Chapters PDF/B2.pdf`
   - `docs/content/ib-content/IB Textbook Improvements/IB_Writing_Style.html`
   - `docs/content/ib-content/IB Textbook Improvements/agent_textbook_skill_guide.md`
   - `docs/content/ib-content/IB Textbook Improvements/agent_style_guide.html`
   - Existing mapped transitional content in `apps/site/src/content/ib-textbooks/sl` and `apps/site/src/content/ib-textbooks/hl`

3. HL-only handling
   - `B2.4.4` and `B2.4.5` remain grouped as an HL-only recursion chunk inside `B2.4`.
   - `B2.1` to `B2.3` and `B2.5` remain SL in the rebuilt chapter.
   - Legacy quicksort-linked `B2.5` material was not carried forward because the official 2027 guide defines `B2.5` as file processing.

4. Major components used
   - `TextbookPageIntro`
   - `TextbookSectionBlock`
   - `TextbookChunk`
   - `TextbookCallout`
   - Standard reader tables, inline contents behaviour, and Python code blocks

5. Anything still missing or deferred
   - The rebuilt B2 chapter currently uses prose, tables, callouts, and short Python examples, but no custom figures yet.
   - Legacy IB unit markdown remains in place for unrebuilt theme chapters and unit-level routes.
   - A2, B3, and B4 still need full chapter rebuilds under Task 2.

## B3 Object-oriented programming

1. Chapter completed
   B3 Object-oriented programming has been rebuilt into the shared textbook system for `/ib-2027/b3/textbook/`.

2. Source files used
   - `docs/content/ib-content/IB Textbook Improvements/IB Comp Sci 2027.pdf`
   - `docs/content/ib-content/Textbook Chapters PDF/B3.pdf`
   - `docs/content/ib-content/IB Textbook Improvements/IB_Writing_Style.html`
   - `docs/content/ib-content/IB Textbook Improvements/agent_textbook_skill_guide.md`
   - `docs/content/ib-content/IB Textbook Improvements/agent_style_guide.html`
   - Existing mapped transitional content in `apps/site/src/content/ib-textbooks/sl/unit-5.md` and `apps/site/src/content/ib-textbooks/hl/unit-4.md`

3. HL-only handling
   - `B3.1.1` to `B3.1.5` remain inside the SL single-class OOP section.
   - All of `B3.2.1` to `B3.2.5` remain grouped under the HL-only multi-class OOP section.
   - The rebuilt chapter keeps design patterns in scope, but does not expand the PDF's brief interface tangent into a separate syllabus area because the official guide does not require that depth here.

4. Major components used
   - `TextbookPageIntro`
   - `TextbookSectionBlock`
   - `TextbookChunk`
   - `TextbookCallout`
   - Standard reader tables, inline contents behaviour, and Python code blocks

5. Anything still missing or deferred
   - The rebuilt B3 chapter currently uses prose, tables, callouts, UML-style text blocks, and short Python examples, but no custom figures yet.
   - Legacy IB unit markdown remains in place for unrebuilt theme chapters and unit-level routes.
   - A2 and B4 still need full chapter rebuilds under Task 2.

## B4 Abstract data types

1. Chapter completed
   B4 Abstract data types has been rebuilt into the shared textbook system for `/ib-2027/b4/textbook/`.

2. Source files used
   - `docs/content/ib-content/IB Textbook Improvements/IB Comp Sci 2027.pdf`
   - `docs/content/ib-content/Textbook Chapters PDF/B4.pdf`
   - `docs/content/ib-content/IB Textbook Improvements/IB_Writing_Style.html`
   - `docs/content/ib-content/IB Textbook Improvements/agent_textbook_skill_guide.md`
   - `docs/content/ib-content/IB Textbook Improvements/agent_style_guide.html`
   - Existing mapped transitional content in `apps/site/src/content/ib-textbooks/hl/unit-6.md`

3. HL-only handling
   - B4 remains entirely HL only in the official 2027 guide, so the rebuilt chapter does not create any SL chunks.
   - Linked lists, BSTs, sets, and hash-based core-principle material all stay inside the single HL section `B4.1`.
   - Legacy `B4.1.7` hash-table numbering was not carried forward because the official 2027 guide places that content within `B4.1.6` as part of the core principles of ADTs.

4. Major components used
   - `TextbookPageIntro`
   - `TextbookSectionBlock`
   - `TextbookChunk`
   - `TextbookCallout`
   - Standard reader tables, inline contents behaviour, and Python or text code blocks

5. Anything still missing or deferred
   - The rebuilt B4 chapter currently uses prose, tables, callouts, and short code or text examples, but no custom figures yet.
   - Legacy IB unit markdown remains in place for any remaining unit-level routes and historical fallback material.
   - A2 is still the remaining unreworked theme chapter under Task 2.

## A2 Networks

1. Chapter completed
   A2 Networks has been rebuilt into the shared textbook system for `/ib-2027/a2/textbook/`.

2. Source files used
   - `docs/content/ib-content/IB Textbook Improvements/IB Comp Sci 2027.pdf`
   - `docs/content/ib-content/IB Textbook Improvements/IB_Writing_Style.html`
   - `docs/content/ib-content/IB Textbook Improvements/agent_textbook_skill_guide.md`
   - `docs/content/ib-content/IB Textbook Improvements/agent_style_guide.html`
   - Existing mapped transitional content in `apps/site/src/content/ib-textbooks/sl/unit-11.md` and `apps/site/src/content/ib-textbooks/hl/unit-11.md`
   - Note: no `A2.pdf` chapter file was present in the repo source pack, so the rebuild stayed conservative and treated the IB guide as the controlling scope authority.

3. HL-only handling
   - `A2.1.5`, `A2.2.2`, and `A2.3.4` remain discrete HL-only chunks in the rebuilt chapter.
   - `A2.4.2` and `A2.4.3` are grouped together as an HL-only vulnerabilities-and-countermeasures chunk because the ideas are paired in application.
   - All other A2 sections remain available to both SL and HL, with the section-level labels preserved as `SL + HL`.

4. Major components used
   - `TextbookPageIntro`
   - `TextbookSectionBlock`
   - `TextbookChunk`
   - `TextbookCallout`
   - Standard reader tables and inline contents behaviour

5. Anything still missing or deferred
   - The rebuilt A2 chapter currently uses prose, tables, and callouts, but no custom figures yet.
   - Legacy IB unit markdown remains in place for historical unit-level routes and bridge content.
   - Task 2 chapter migration is now complete for the eight main IB theme chapters.
