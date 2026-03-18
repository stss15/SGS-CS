# Content

The refactor should preserve every content family while making ownership and storage explicit.

## Content Families

- Curriculum landing pages and section indexes
- Textbooks and textbook chapter content
- Slide decks and slide HTML
- Assessments and answer data
- Flashcards and question sets
- Interactive tools and simulations
- Downloadable teacher and student assets
- Printables

## Source Of Truth

- Keep curriculum source materials in `docs/content`.
- Keep route-owned content in typed collections or explicit content modules instead of scattered page-local conventions.
- Keep downloadable assets in a managed asset location with a manifest, not as incidental files hidden in generated output.
- Keep legacy source folders only as migration inputs until each family is rehomed.

## Rules

- Every content family must have a clear owner.
- Every published asset must be traceable to a source file.
- Every migration step must preserve access paths and content order.

See [content-model.md](content-model.md) for the target organization.
