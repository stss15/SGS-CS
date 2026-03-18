# SGS Smoke Routes

## Default Route Matrix

Use the touched route first, then add nearby pages from this matrix when the same shell, assets, or adapters are involved:

| Route | Why it matters |
| --- | --- |
| `/index.html` | Shared home shell and top-level navigation |
| `/igcse/index.html` | IGCSE landing shell |
| `/igcse/topic1/index.html` | `arcade.njk` topic index pattern |
| `/igcse/topic1/textbook.html` | Astro IGCSE textbook reader route |
| `/igcse/topic1/textbook/1-1.html` | Chapter-split textbook route pattern |
| `/ks3/index.html` | KS3 landing page behavior |
| `/ib/index.html` | Legacy IB passthrough family |
| `/ib-2027/index.html` | Modern IB 2027 pathway landing page |
| `/ib-2027/sl/unit-2/index.html` | SL unit index pattern |
| `/ib-2027/hl/unit-5/index.html` | HL unit index pattern |
| `/tools/sql-playground.html` | App-like interactive tool route |
| `/ai-prompt-generator/index.html` | Astro utility page with shared shell |

## What To Check

- No console errors.
- No failed stylesheet, script, image, or JSON requests.
- Shared nav renders and active state still makes sense.
- Mobile layout holds together around 375 px width.
- Desktop layout holds together around 1280 px width.
- Focus order and modal or drawer escape paths still work.
- Text remains readable and controls remain tappable.

## When To Expand Coverage

- If `src/templates/layouts/base.njk` changes, retest at least one route from each major section.
- If `apps/site/src/layouts/BaseLayout.astro` changes, retest Astro-first pages and at least one legacy passthrough page.
- If `src/static/js/reader.js` or reader CSS changes, retest textbook readers and any other reader-like pages.
- If `packages/content-schema` changes, retest the route family backed by that adapter plus one neighboring route.
