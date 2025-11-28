# AI Agent Guide: SGSD Templating System

This repo builds the site from Nunjucks templates and writes the compiled HTML to `public/`. Use this guide to generate or edit pages safely.

## Commands
- `npm install` (one-time)
- `npm run build` to render all templates into `public/` and refresh `meta/site-manifest.json`.

## Project Map
- `scripts/build.js` — builds `.njk` into `public/` and emits `meta/site-manifest.json`.
- `src/templates/layouts/` — layouts: `base`, `listing`, `arcade`, `slide-deck`, `ks3-slide` (KS3 macros inline here).
- `src/templates/components.njk` — cards, resources, topic lists, feature cards.
- `src/pages/` — source `.njk` pages; output is mirrored under `public/`.
- `public/css` — shared styles (`style.css`, `resource-style.css`, `specification.css`, `unit.css`, `toolkit.css`, `slide-deck.css`, `ks3-deck.css`, `igcse-deck.css`).
- `public/js` — shared scripts (`slide-deck.js`, `site.js`, `toolkit.js`).
- `public/images` — site imagery (logo, thumbnails).
- `public/` — built HTML plus standalone games/sims.
- Reference library: pattern + widget blocks inside `docs/agent/templates/KS3 Templates/KS3_Master_Tempalte.html`.

## Layouts & When to Use
- `layouts/base.njk` — generic content pages. Supports `hero`, `backLink`, `extraStyles`, `scripts`, `inlineScripts`.
- `layouts/listing.njk` — topic/year listing pages. Provide `sections` (title/subtitle/items) and optional `wrapperClass`.
- `layouts/arcade.njk` — arcade/landing pages with game cards + resource buttons. Provide `cards`, `resources`, `resourcesTitle`, `extraStyles`.
- `layouts/slide-deck.njk` — Reveal.js decks (IGCSE/IB) with `backHref`, `courseFooter`, optional `headContent` (inline CSS), `deckScripts` (deck-specific JS), `deckOptions`.
- `layouts/ks3-slide.njk` — KS3 decks (Years 7–9). Includes KS3 CSS and macros; accepts `lesson` object (see below) plus any custom HTML content.

## Base Page Fields (front matter)
```yaml
layout: layouts/base.njk
title: "Page Title"
description: "Meta description"
backLink:
  href: ks3/index.html
  label: "Back to KS3"
hero:
  title: "Hero Title"
  subtitle: "Hero Subtitle"
extraStyles:
  - css/resource-style.css
scripts:
  - js/site.js
inlineScripts: |
  <script>/* inline JS if needed */</script>
```

## Listing Page Example
```yaml
layout: layouts/listing.njk
title: "IGCSE Computer Science"
hero:
  title: "IGCSE Computer Science"
  subtitle: "Select a topic below"
sections:
  - title: Paper 1
    subtitle: Computer Systems
    items:
      - { href: topic1/index.html, number: 1, name: Data Representation }
      - { href: topic2/index.html, number: 2, name: Data Transmission }
  - title: Paper 2
    subtitle: Algorithms, Programming and Logic
    items:
      - { href: topic7/index.html, number: 7, name: Algorithm Design }
      - { href: topic8/index.html, number: 8, name: Programming }
```

## Arcade Page Example
```yaml
layout: layouts/arcade.njk
title: "4. Software Arcade"
backLink: { href: igcse/index.html, label: "Back to Topics" }
hero: { title: "4. Software Arcade", subtitle: "Interactive Learning Apps & Games" }
extraStyles: [css/resource-style.css]
cards:
  - { href: specification.html, title: Specification, image: images/specification_thumb.png }
  - { href: flashcards.html, title: Flashcards, image: images/flashcards_thumb.png }
resourcesTitle: "Teacher Resources"
resources:
  - { href: 4.1_types_of_software_and_interrupts.html, number: "4.1", name: "Types of Software & Interrupts", type: "Slide Deck • Presentation" }
  - { href: assessments.html, icon: fa-solid fa-clipboard-check, name: "Assessments", type: "Quizzes & Tests" }
```

## Specification Page Example
```yaml
layout: layouts/base.njk
title: "Topic 1: Data Representation Specification - SGSD Computer Science"
description: "Complete specification for IGCSE Computer Science Topic 1: Data Representation (0478, 2026-2028)"
backLink: { href: igcse/topic1/index.html, label: "Back to Topic 1" }
extraStyles: [css/specification.css]
```
Body: paste the specification HTML inside (content stays untouched); styling comes from `specification.css`.

## Slide Decks (IGCSE/IB)
Use `layouts/slide-deck.njk`.
```yaml
layout: layouts/slide-deck.njk
title: "4.1 Types of Software & Interrupts | St George's CS"
backHref: igcse/topic4/index.html
courseFooter: "IGCSE Computer Science"
headContent: |
  <style>/* deck-specific CSS */</style>
deckScripts: |
  // deck-specific JS (Reveal.initialize handled globally)
```
Body: only `<section>` slides; Reveal CSS/JS and date/footer/logo are handled by the layout.

## KS3 Slide Decks (Years 7–9)
Use `layouts/ks3-slide.njk`. It pulls in `ks3-deck.css` (source: `docs/agent/templates/KS3 Templates/ks3-theme.css`) and contains the KS3 macros inline. Provide a `lesson` object to auto-render the standard arc; add extra `<section>` slides below if needed.
```yaml
layout: layouts/ks3-slide.njk
title: "L1: Digital You | Year 7 Unit 2"
backHref: ks3/year7/unit2.html
courseFooter: "Year 7 Computer Science"
lesson:
  title: "Lesson 1: What Is a 'Digital You'?"
  subtitle: "Year 7 Unit 2: Becoming a Digital Citizen"
  recall:
    prompt: "Answer these from last lesson:"
    questions:
      - { question: "Which memory is volatile?", answer: "RAM" }
      - { question: "Device converting analogue sound?", answer: "ADC" }
  concept: { title: "Innovation", detail: "How tech shapes identity." }
  skill: { title: "Digital Literacy", detail: "Offline vs online self." }
  objectives:
    - "Define digital identity."
    - "Compare offline and online selves."
    - "Identify parts of an online profile."
  hook:
    question: "If you could be anyone online, would you still be you?"
    background: images/digital_mirror.png
    duration: 30
  keyTerm:
    term: "Digital Identity"
    definition: "Who you are on the internet, built from what you share and what you do."
  miniTask:
    title: "Hinge Question"
    prompt: "Discuss Image A vs Image B."
  mainTask:
    title: "Profile Builder"
    overview: "Design a balanced online profile."
    steps:
      - "Choose an avatar and username."
      - "Write a bio that is safe and authentic."
    time: "15 mins"
    grouping: "Pairs"
    resource: "Worksheet 1.1"
  plenary:
    title: "Exit Ticket"
    items:
      - "One thing learned"
      - "One question"
      - "One action"
```
- KS3 styling lives in `css/ks3-deck.css` (source of truth: `docs/agent/templates/KS3 Templates/ks3-theme.css`).
- Standard deck structure and widget/pattern library live in `docs/agent/templates/KS3 Templates/KS3_Master_Tempalte.html`.

## Password-Protected Links
Use `js/site.js` via `scripts` and add `password`/`protectedMessage` to a resource item. Example (arcade resources):
```yaml
resources:
  - { href: Topic4_End_of_unit_Test.html, icon: fa-solid fa-file-signature, name: End of Unit Test, type: Topic 4 Final Exam, password: "softwar3!" }
scripts: [js/site.js]
```

## Build Notes
- `scripts/build.js` auto-computes `basePath` for assets relative to page depth and outputs to `public/`.
- `meta/site-manifest.json` lists every templated page (title, layout, paths) for quick navigation.
- Do not edit generated HTML directly; change the corresponding `.njk` and run `npm run build`.
- Standalone games/sims remain raw HTML in `public/` (e.g., `binary_game.html`, `software_game.html`); skip templating unless explicitly requested.
