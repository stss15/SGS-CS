# Design System

The shared system should be implemented once and reused everywhere.

## Token Model

- `color-bg`
- `color-surface`
- `color-text`
- `color-muted`
- `color-border`
- `color-accent`
- `color-focus`
- `radius`
- `shadow`
- `space`
- `type-scale`

## Shared Components

- Site navigation
- Breadcrumbs
- Hero or page header
- Content cards
- Topic or resource lists
- Section headers
- Callouts
- Pills
- Empty states

## Specialization Rules

- Reader pages may have their own density and typography details, but not their own brand.
- Slide decks may have their own presentation chrome, but not a separate design language.
- Tools may have stronger app-like controls, but must still inherit the site shell and typography rules.

## Anti-Patterns

- Multiple competing shell styles
- Random font stacks per page
- Decorative effects that reduce readability
- Page-local token systems that drift from the site standard
