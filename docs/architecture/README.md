# Architecture

The target architecture is a single Astro-first application that owns the public site shell, route entry points, and typed content assembly. Legacy Nunjucks and bridge scripts remain only until each route family is fully rehomed.

## System Shape

- `apps/site` becomes the production route host.
- Typed content and route metadata replace implicit coupling between pages, data, and static assets.
- Interactive surfaces stay isolated by experience family instead of being spread across one-off page implementations.
- Public URLs and aliases stay stable until migration gates say otherwise.

## Route Ownership

- Curriculum indexes, textbooks, unit plans, and shell pages should have explicit owners and route manifests.
- Legacy passthrough pages are temporary compatibility layers, not long-term source of truth.
- Static assets and downloadables need explicit ownership, not ad hoc publication through generated output.

## Internal Contracts

Use these as the canonical vocabulary for the refactor:

- `RouteManifest`
- `ContentSchemas`
- `ExperienceManifest`
- `AssetManifest`
- `DesignTokens`

See [contracts.md](contracts.md) for the contract definitions used by the refactor plan.
