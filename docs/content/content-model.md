# Content Model

Use a file-based, typed content model that keeps the educational structure intact while reducing ambiguity for maintainers and agents.

## Proposed Organization

- `curriculum/`: route-level indexes, unit pages, and listing data
- `textbooks/`: textbook source and chapter content
- `slides/`: slide deck source and supporting assets
- `assessments/`: question sets, answer keys, and validation data
- `flashcards/`: flashcard question banks and render data
- `tools/`: tool-specific content and datasets
- `downloads/`: managed downloadable assets and teacher packs
- `printables/`: printable source files and PDF generation inputs

## Migration Rule

Do not reorganize content by implementation convenience. Reorganize it by educational role and route family so the site stays easy to navigate and easy to reason about.

## Minimum Metadata

Each content family should expose enough metadata to support routing and discovery.

- Title
- Level or track
- Route path
- Source file path
- Asset dependencies
- Compatibility notes
