# Contracts

The refactor should move the site from implicit file conventions to explicit contracts that are easy for both engineers and agents to reason about.

## `RouteManifest`

Describe every canonical route and alias in one place.

- Route path
- Owning content entry
- Required assets
- Shell type
- Compatibility status

## `ContentSchemas`

Use typed schemas for the major content families.

- `CurriculumIndex`
- `UnitPlan`
- `Textbook`
- `SlideDeck`
- `Slide`
- `AssessmentSet`
- `FlashcardSet`
- `ToolDefinition`
- `DownloadableAsset`

## `ExperienceManifest`

Describe how each special experience loads and runs.

- Entry route
- Runtime type
- Data sources
- Asset bundle
- Shell type
- Client dependencies

## `AssetManifest`

Track published files as first-class content.

- ZIPs
- PDFs
- Images
- Source downloads
- JSON fixtures
- Teacher and student materials

## `DesignTokens`

Keep one token source for the whole site.

- Palette
- Type scale
- Spacing
- Radii
- Elevation
- Motion
- Shell widths
