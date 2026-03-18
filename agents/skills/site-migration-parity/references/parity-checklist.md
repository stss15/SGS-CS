# SGS Migration Parity Checklist

## Before Migration

- Identify the current route family and its canonical source file.
- Inventory the published routes and aliases.
- Inventory the required assets, JSON, media, and downloadable files.
- Record the current browser behavior at desktop and mobile widths.

## During Migration

- Keep the legacy path available until the new path is proven.
- Move one family at a time.
- Prefer typed adapters, manifests, and explicit route wrappers.
- Avoid changing content structure while replacing the shell.

## Before Removal

- Confirm every route resolves.
- Confirm every required asset still loads.
- Confirm content coverage matches the prior family.
- Confirm browser smoke tests pass.
- Confirm accessibility and responsive behavior are still intact.

## Stop Conditions

- A missing alias.
- A broken downloadable asset.
- A content section that no longer appears.
- A browser-only regression.
- An undocumented URL or route dependency.
