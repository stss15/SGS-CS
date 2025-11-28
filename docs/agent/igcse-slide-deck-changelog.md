# IGCSE Slide Deck Changes (2025-11-28)

- Shifted IGCSE retrieval practice to the KS3-style vertical stack (overview + one-question-per-slide) in:
  - `docs/agent/templates/igcse-slide-deck-template.html`
  - `docs/agent/templates/slide-deck-content.html`
  - `docs/agent/templates/slide-deck-pedagogy.html`
  - `public/igcse/topic4/4.1_types_of_software_and_interrupts.html`
  - `public/igcse/topic4/4.2_languages_translators_and_IDEs.html`
- Added end-of-deck True/False misconception checkers to the same templates and Topic 4.1/4.2 decks (HTML + NJK sources).
- Introduced reusable macros for retrieval and True/False blocks in `src/templates/igcse/macros.njk`, and wired Topic 4.1/4.2 NJK files to use them.
- Documented the AI build workflow in `docs/agent/igcse-slide-deck-agent.md` so new decks follow the question-first, non-textbook pattern automatically.
- Created new Topic 1 deck: `1.1 Number Representation` (`src/pages/igcse/topic1/1.1_number_representation.njk`, `public/igcse/topic1/1.1_number_representation.html`) covering binary/denary/hex conversions, addition & overflow, logical shifts, and two's complement with a True/False misconception check.
- Refined 1.1 deck pedagogy (definitions for hex/shifts/two's complement, vertical stepper conversions, clarification questions) and updated the agent guide to enforce the define → why → how (steps) → clarify pattern for all specs.
- Added Topic 1 deck: `1.2 Text, Sound & Images` (`src/pages/igcse/topic1/1.2_text_sound_images.njk`, `public/igcse/topic1/1.2_text_sound_images.html`) covering character sets, sound sampling, and bitmap images with stepper explanations, formulas, and True/False checks; linked from Topic 1 teacher resources.
- Agent guide now notes to include mapping tables for code sets and core media formulas (sound/image) with clear stepwise presentations.
- Added retrieval practice (5 Q) to 1.1 and enforced question-first steppers; agent guide updated to require a leading question before any step stack.
- Removed retrieval from 1.1 per request and ensured 1.2 steppers keep visible titles/question-first pattern on every step slide.
