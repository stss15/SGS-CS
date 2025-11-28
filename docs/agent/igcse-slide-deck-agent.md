# IGCSE Slide Deck Agent Guide

Use this checklist to build consistent IGCSE slide decks that mirror the 4.1/4.2 examples without turning into a textbook.

## Canonical files
- Structure/style: `docs/agent/templates/igcse-slide-deck-template.html`, `docs/agent/templates/slide-deck-content.html`, `docs/agent/templates/slide-deck-pedagogy.html`, `docs/agent/templates/slide-deck-template.css`.
- Nunjucks layout + macros: `src/templates/layouts/slide-deck.njk`, `src/templates/igcse/macros.njk`.
- Live examples: `public/igcse/topic4/4.1_types_of_software_and_interrupts.html`, `public/igcse/topic4/4.2_languages_translators_and_IDEs.html`.

## Build steps for a new deck
1) Start the page  
   - Front matter: `layout: layouts/slide-deck.njk`, set `title`, `backHref`, `courseFooter`.  
   - Import macros at the top of the content:  
     `{% import "../../../templates/igcse/macros.njk" as ig %}` (adjust path if folder depth changes).

2) Retrieval (only if not first lesson in a topic)  
   - Use `ig.retrievalDeck([{question, answer}, ...], "Retrieval Practice", "Recall …")`.  
   - Overview slide lists every question; each vertical slide shows one question-box + fragment reveal for the answer.

3) Pedagogical sequence for each concept (repeat per spec point)  
   - **Define** with a key-term slide.  
   - **Why it exists / matters** (use a box explaining purpose/benefit).  
   - **How it works** with a vertical stepper (nested `<section>` stack). Each step should be large, single-focus text in a `question-box` or `box-blue`.  
   - **Clarification question** to probe understanding; make it student-facing (a question + revealed answer/example), not teacher notes.  
   - For steppers, start with a question slide (e.g., “How do we convert 94 to hex?”) before showing steps.  
   - Only then move to the next concept (e.g., Binary, Hex, Two’s complement, Shifts).

4) Visual aids for conversions/processes  
   - Provide mapping tables where helpful (e.g., binary↔hex, ASCII/Unicode samples, place-value tables).  
   - Break algorithms into vertical steps (one step per slide) instead of a long bullet list.
   - For media topics, include the core formulas/parameters (e.g., sound: sample rate × resolution × channels × duration; images: width × height × colour depth) and show them in a clear box.

5) Misconception check (mandatory end of deck)  
   - Use `ig.trueFalseDeck([{statement, answer, explanation}, ...], "True or False?")` as the last block.  
   - Target common errors surfaced during the deck.

6) Finishing touches  
   - Keep the back button/logo/footer intact; use the existing slide-number/date scripts.  
   - Code/examples in `pre > code` with highlight.js classes; keep fragments for stepwise reveal.  
   - If adding new widgets, prefer adding styles/behaviour to shared CSS/JS or macros so updates cascade to all decks.

## Using chapter text files (e.g., `public/igcse/chapter text files/Chapter 1 Subfiles/1.1.txt`)
- Parse the text into: keywords/definitions, worked examples, strengths vs weaknesses, misconceptions.
- Turn each bullet into prompts for the question-first pattern: lead with a question, then reveal the definition/explanation/evaluation.
- Maintain brevity on slides; push practice tasks outside the deck (these slides are coverage + clarity only).

## Ready-to-copy snippets
```njk
{% import "../../../templates/igcse/macros.njk" as ig %}

{{ ig.retrievalDeck([
  { question: "What is …?", answer: "…" },
  { question: "Why …?", answer: "…" }
], "Retrieval Practice", "Recall Topic X before we move on.") }}

{{ ig.trueFalseDeck([
  { statement: "\"X is always true.\"", answer: "False", explanation: "Because …" }
], "True or False?") }}
```

Stick to this workflow and any future widget/style change made in the templates/macros will propagate to every deck without editing 50+ files by hand.
