# IB Syllabus Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the teaching-order navigation (SL Units 1–12, HL Units 1–11) with the official IB syllabus structure (Theme A: A1–A4, Theme B: B1–B4), making all content accessible via the syllabus path and removing "2027" from display text.

**Architecture:** Rewrite the Astro sidebar builder (`auto-shell.ts`) to produce Theme A / Theme B groups instead of SL/HL year groups. Update site.json to restructure the IB listing. Rewrite the Nunjucks landing page and unit index pages. Keep URL path `/ib-2027/` unchanged for backward compatibility but strip "2027" from all display text.

**Tech Stack:** Astro, Nunjucks, TypeScript, site.json data

---

## File Structure

| File | Role | Action |
|------|------|--------|
| `src/data/site.json` | Central curriculum data | Restructure `ib-2027` listing into Theme A / Theme B groups; remove `ib-2027-sl` and `ib-2027-hl` |
| `apps/site/src/lib/auto-shell.ts` | Astro sidebar builder | Rewrite `getIbRouteParts()`, `buildIbCourseGroups()`, `buildIbLocalGroups()`, `buildIbShell()` for syllabus structure |
| `apps/site/src/lib/ib2027-routes.ts` | IB route helpers | Rewrite to use syllabus unit codes (A1–B4) instead of SL/HL level+unitNumber |
| `packages/content-schema/src/index.ts` | Content data layer | Remove `IB_2027_PATHWAY_CARDS`, `getIb2027PathwayIndex()`; update `getIb2027SyllabusListing()` |
| `src/pages/ib-2027/index.njk` | Nunjucks landing page | Remove "2027" from display, keep Paper 1/Paper 2 card layout |
| `apps/site/src/pages/ib-2027/index.astro` | Astro landing page | Update to use new syllabus shell, drop "2027" |
| `src/pages/ib-2027/{A1..B4}/index.njk` | Unit index pages (×8) | Add `specification` frontmatter with guiding question, objectives, subtopics |
| `src/pages/ib-2027/{subtopics}/index.njk` | Subtopic pages (~28) | Update breadcrumbs to drop "2027" label |

---

### Task 1: Restructure site.json — Theme A / Theme B with disabled IA/EE/CS

**Files:**
- Modify: `src/data/site.json:103-191`

The `ib-2027` listing needs two structural changes: (1) rename sections from "Paper 1"/"Paper 2" to "Theme A"/"Theme B" with full titles, (2) mark IA/EE/CS items as `"disabled": true`, (3) delete `ib-2027-sl` and `ib-2027-hl` listings entirely.

- [ ] **Step 1: Rewrite the `ib-2027` listing**

Replace `src/data/site.json` lines 103–191 with:

```json
"ib-2027": {
  "sections": [
    {
      "title": "Theme A",
      "subtitle": "Concepts of Computer Science",
      "items": [
        { "href": "A1/index.html", "number": "A1", "name": "Computer Fundamentals", "meta": "SL: 11h | HL: 18h" },
        { "href": "A2/index.html", "number": "A2", "name": "Networks", "meta": "SL: 11h | HL: 18h" },
        { "href": "A3/index.html", "number": "A3", "name": "Databases", "meta": "SL: 11h | HL: 18h" },
        { "href": "A4/index.html", "number": "A4", "name": "Machine Learning", "meta": "SL: 5h | HL: 18h" }
      ]
    },
    {
      "title": "Theme B",
      "subtitle": "Computational Thinking and Problem-Solving",
      "items": [
        { "href": "B1/index.html", "number": "B1", "name": "Computational Thinking", "meta": "SL: 5h | HL: 5h" },
        { "href": "B2/index.html", "number": "B2", "name": "Programming", "meta": "SL: 40h | HL: 42h" },
        { "href": "B3/index.html", "number": "B3", "name": "Object-Oriented Programming", "meta": "SL: 7h | HL: 23h" },
        { "href": "B4/index.html", "number": "B4", "name": "Abstract Data Types", "meta": "HL Only | 23h" }
      ]
    },
    {
      "title": "Assessment",
      "subtitle": "",
      "items": [
        { "href": "ia/index.html", "number": "IA", "name": "Internal Assessment", "meta": "SL + HL", "disabled": true },
        { "href": "ee/index.html", "number": "EE", "name": "Extended Essay", "meta": "Optional", "disabled": true },
        { "href": "case-study/index.html", "number": "CS", "name": "Case Study", "meta": "SL + HL", "disabled": true }
      ]
    }
  ]
}
```

Delete the `"ib-2027-sl"` and `"ib-2027-hl"` objects entirely.

- [ ] **Step 2: Verify build still works**

Run: `cd "/Users/StevenStewart/SGS-CSC REMIX/.claude/worktrees/determined-golick" && node scripts/build.js 2>&1 | tail -5`
Expected: Build completes (the Nunjucks templates only read `site.listings["ib-2027"]`)

- [ ] **Step 3: Commit**

```bash
git add src/data/site.json
git commit -m "refactor: restructure site.json IB listing to Theme A/B, remove SL/HL listings"
```

---

### Task 2: Rewrite the Astro sidebar — Theme A / Theme B course-level navigation

**Files:**
- Modify: `apps/site/src/lib/auto-shell.ts:166-177` (getIbRouteParts)
- Modify: `apps/site/src/lib/auto-shell.ts:803-817` (buildIbCourseGroups)
- Modify: `apps/site/src/lib/auto-shell.ts:840-942` (buildIbLocalGroups)
- Modify: `apps/site/src/lib/auto-shell.ts:944-1050` (buildIbShell)
- Modify: `apps/site/src/lib/ib2027-routes.ts`

This is the core architectural change. The sidebar currently parses `/ib-2027/(sl|hl)/unit-N/...` paths and builds SL/HL navigation. It needs to parse `/ib-2027/(A1|A2|...|B4)/...` paths and build Theme A/B navigation.

- [ ] **Step 1: Rewrite `getIbRouteParts()` for syllabus paths**

Replace lines 166–177 in `auto-shell.ts`:

```typescript
const getIbRouteParts = (pathname: string) => {
  const norm = normalizeShellPath(pathname);

  // Match syllabus paths: /ib-2027/A1, /ib-2027/B2/B2.3/slides/...
  const syllabusMatch = norm.match(/^\/ib-2027\/([AB]\d)(?:\/(.+))?$/i);
  if (syllabusMatch) {
    const unitCode = syllabusMatch[1].toUpperCase(); // e.g. "A1", "B2"
    const rest = syllabusMatch[2] || null;            // e.g. "B2.3/slides/foo"
    const subtopicMatch = rest?.match(/^([AB]\d\.\d+)(?:\/(.+))?$/i);
    return {
      unitCode,
      subtopic: subtopicMatch ? subtopicMatch[1].toUpperCase() : null,
      leaf: subtopicMatch ? (subtopicMatch[2] || null) : rest
    };
  }

  // Legacy SL/HL paths — redirect stubs exist, but sidebar still needs to handle
  // if someone navigates to /ib-2027/sl/unit-1 (before redirect fires)
  const legacyMatch = norm.match(/^\/ib-2027\/(sl|hl)(?:\/(unit-\d+)(?:\/(.+))?)?$/i);
  if (legacyMatch) {
    return null; // Let these fall through to the default IB shell
  }

  return null;
};
```

- [ ] **Step 2: Rewrite `buildIbCourseGroups()` for Theme A/B**

Replace lines 803–817:

```typescript
const buildIbCourseGroups = async (): Promise<ShellNavGroup[]> => {
  const listing = await getListingByKey<ListingRecord>('ib-2027');
  const basePath = '/ib-2027';

  return (listing.sections || []).map((section) => {
    const isAssessment = section.title === 'Assessment';
    return {
      id: section.title.toLowerCase().replace(/\s+/g, '-'),
      label: `${section.title}: ${section.subtitle}`.replace(/:\s*$/, ''),
      courseLevel: true,
      collapsible: false, // Direct click items, no expand/collapse
      items: isAssessment
        ? (section.items || []).map((item) => ({
            label: `${item.number} ${item.name}`,
            href: ensureAbsoluteHref(basePath, item.href),
            disabled: true
          }))
        : (section.items || []).map((item) => ({
            label: `${item.number} ${item.name}`,
            href: ensureAbsoluteHref(basePath, item.href),
            meta: item.meta
          }))
    };
  });
};
```

Wait — `collapsible: false` means each section renders as a single direct-link group. But the design calls for Theme A as a non-clickable header with 4 clickable items underneath. The `CourseExplorer.astro` component already supports `<details>` groups with items. The theme headers should be `<details open>` groups that cannot be collapsed. Let me revise:

```typescript
const buildIbCourseGroups = async (): Promise<ShellNavGroup[]> => {
  const listing = await getListingByKey<ListingRecord>('ib-2027');
  const basePath = '/ib-2027';

  return (listing.sections || []).map((section) => {
    const isAssessment = section.title === 'Assessment';
    return {
      id: section.title.toLowerCase().replace(/\s+/g, '-'),
      label: isAssessment ? 'Assessment' : `${section.title}: ${section.subtitle}`,
      courseLevel: true,
      open: true,
      items: (section.items || []).map((item: any) => ({
        label: `${item.number} ${item.name}`,
        href: ensureAbsoluteHref(basePath, item.href),
        meta: isAssessment ? undefined : item.meta,
        disabled: Boolean(item.disabled)
      }))
    };
  });
};
```

- [ ] **Step 3: Rewrite `buildIbLocalGroups()` for syllabus unit pages**

This function builds the sidebar when you're inside a unit (e.g. `/ib-2027/B2/`). Replace lines 840–942:

```typescript
const buildIbLocalGroups = async (
  unitCode: string,
  currentPath: string
): Promise<ShellNavGroup[]> => {
  const unitBasePath = `/ib-2027/${unitCode}`;

  // Read the unit index frontmatter to get subtopic listing
  const unitIndexPath = `src/pages/ib-2027/${unitCode}/index.njk`;
  let unitFrontmatter: LegacyTopicFrontmatter = { title: unitCode };
  try {
    unitFrontmatter = await readSourceFrontmatter<LegacyTopicFrontmatter>(unitIndexPath);
  } catch { /* unit page may not exist yet */ }

  const overviewItems: ShellNavItem[] = [
    { label: 'Overview', href: `${unitBasePath}/index.html` }
  ];

  const overviewGroup = buildSectionGroup('unit-overview', 'Overview', overviewItems, {
    sequence: true,
    open: true,
    collapsible: false
  });

  // Build subtopic links from resources (which list subtopics)
  const subtopicItems: ShellNavItem[] = (unitFrontmatter.resources || [])
    .filter((resource) => isValidStudentHref(resource.href))
    .map((resource) => ({
      label: `${resource.number} ${resource.name}`,
      href: ensureAbsoluteHref(unitBasePath, resource.href)
    }));

  const subtopicGroup = buildSectionGroup('subtopics', 'Subtopics', subtopicItems, {
    sequence: true,
    open: true
  });

  // Build resource links (textbook, homework, assessment, revision)
  const resourceItems: ShellNavItem[] = [];

  // Textbook
  const textbookPath = path.join(repoRoot, `src/pages/ib-2027/${unitCode}/textbook.njk`);
  if (existsSync(textbookPath)) {
    resourceItems.push({
      label: 'Textbook',
      href: `${unitBasePath}/textbook.html`,
      icon: 'fa-solid fa-book'
    });
  }

  // Specification
  const specPath = path.join(repoRoot, `src/pages/ib-2027/${unitCode}/specification.njk`);
  if (existsSync(specPath)) {
    resourceItems.push({
      label: 'Specification',
      href: `${unitBasePath}/specification.html`,
      icon: 'fa-solid fa-clipboard-list'
    });
  }

  // Student resources
  const studentResourcesPath = path.join(repoRoot, `src/pages/ib-2027/${unitCode}/student-resources.njk`);
  if (existsSync(studentResourcesPath)) {
    resourceItems.push({
      label: 'Student Resources',
      href: `${unitBasePath}/student-resources.html`,
      icon: 'fa-solid fa-graduation-cap'
    });
  }

  const resourceGroup = buildSectionGroup('unit-resources', 'Resources', resourceItems, {
    open: currentPath.includes('/textbook') || currentPath.includes('/specification')
  });

  // Special route groups (OOP project, SQL worksheets, scenarios)
  const specialGroups: ShellNavGroup[] = [];
  const specialRoutePatterns = ['oop-project', 'sql-worksheets', 'sql-project', 'nosql-project', 'scenarios'];

  for (const pattern of specialRoutePatterns) {
    if (!currentPath.includes(`/${pattern}`)) continue;

    // Search in unit-level OR subtopic-level directories
    const searchPaths = [
      path.join(repoRoot, `src/pages/ib-2027/${unitCode}/${pattern}`),
      // Check subtopics too (e.g. B3/B3.1/oop-project)
      ...((unitFrontmatter.resources || []).map((r) => {
        const subtopicDir = r.href?.replace(/\/index\.html$/i, '');
        return subtopicDir ? path.join(repoRoot, `src/pages/ib-2027/${unitCode}/${subtopicDir}/${pattern}`) : '';
      }).filter(Boolean))
    ];

    for (const searchPath of searchPaths) {
      if (!existsSync(searchPath)) continue;

      const routeBase = searchPath.replace(path.join(repoRoot, 'src/pages'), '').replace(/\.njk$/i, '');
      const projectLinks = await readDirectoryLinks(searchPath, routeBase);
      const projectGroup = buildSectionGroup(
        `${pattern}-links`,
        humanizeRouteLabel(pattern),
        projectLinks.filter((link) => !link.href.includes('/teacher/')),
        { sequence: true, open: true }
      );
      if (projectGroup) specialGroups.push(projectGroup);

      const teacherLinks = await readDirectoryLinks(path.join(searchPath, 'teacher'), `${routeBase}/teacher`);
      const teacherGroup = buildSectionGroup('teacher-links', 'Teacher', teacherLinks, {
        open: currentPath.includes('/teacher/')
      });
      if (teacherGroup) specialGroups.push(teacherGroup);
      break; // Found it, stop searching
    }
  }

  return [
    overviewGroup,
    subtopicGroup,
    resourceGroup,
    ...specialGroups
  ].filter((group): group is ShellNavGroup => Boolean(group));
};
```

- [ ] **Step 4: Rewrite `buildIbShell()` main orchestrator**

Replace lines 944–1050:

```typescript
const buildIbShell = async (pathname: string): Promise<{
  shellContext: ShellContext;
  layoutMode: ShellMode;
  breadcrumbs?: ShellBreadcrumb[];
  prevLink?: ShellPageLink;
  nextLink?: ShellPageLink;
}> => {
  const routeParts = getIbRouteParts(pathname);
  const courseGroups = await buildIbCourseGroups();

  // Landing page or unrecognised IB path — show just course groups
  if (!routeParts) {
    return {
      shellContext: {
        title: 'IB Computer Science',
        groups: courseGroups
      },
      layoutMode: 'worksheet',
      breadcrumbs: [{ label: 'IB Computer Science' }]
    };
  }

  // Unit page (e.g. /ib-2027/A1/ or /ib-2027/B2/B2.3/slides/...)
  const currentPath = normalizeShellPath(pathname);
  const localGroups = await buildIbLocalGroups(routeParts.unitCode, currentPath);
  const { prevLink, nextLink } = buildPrevNextLinks(localGroups, currentPath);
  const currentLocation = findCurrentLocation(localGroups, currentPath);

  const layoutMode: ShellMode = /textbook/i.test(currentPath)
    ? 'reading'
    : /(slides|sql|scenario|oop-project|project|worksheet)/i.test(currentPath)
    ? 'workspace'
    : 'worksheet';

  const unitOverviewHref = `/ib-2027/${routeParts.unitCode}/index.html`;
  const breadcrumbs: ShellBreadcrumb[] = [
    { label: 'IB Computer Science', href: '/ib-2027/index.html' },
    { label: routeParts.unitCode, href: unitOverviewHref }
  ];

  if (routeParts.subtopic) {
    breadcrumbs.push({
      label: routeParts.subtopic,
      href: `/ib-2027/${routeParts.unitCode}/${routeParts.subtopic}/index.html`
    });
  }

  if (currentLocation.item && !hrefMatchesCurrentPath(unitOverviewHref, currentPath)) {
    const lastBreadcrumbHref = breadcrumbs[breadcrumbs.length - 1]?.href;
    if (!lastBreadcrumbHref || !hrefMatchesCurrentPath(lastBreadcrumbHref, currentPath)) {
      breadcrumbs.push({ label: currentLocation.item.label });
    }
  }

  return {
    shellContext: {
      title: routeParts.unitCode,
      meta: undefined, // Will be populated by unit frontmatter title later
      groups: [...localGroups, ...courseGroups]
    },
    layoutMode,
    breadcrumbs,
    prevLink,
    nextLink
  };
};
```

- [ ] **Step 5: Update `ib2027-routes.ts` for syllabus structure**

This file provides helper functions used by Astro routes. Replace the entire file:

```typescript
import type { BreadcrumbItem } from '@sgs/content-schema';

export const buildIb2027Breadcrumbs = (
  unitCode?: string,
  subtopic?: string,
  currentLabel?: string
): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'IB Computer Science', href: '/ib-2027/index.html' }
  ];

  if (unitCode) {
    breadcrumbs.push({ label: unitCode, href: `/ib-2027/${unitCode}/index.html` });
  }

  if (subtopic) {
    breadcrumbs.push({ label: subtopic, href: `/ib-2027/${unitCode}/${subtopic}/index.html` });
  }

  if (currentLabel) {
    breadcrumbs.push({ label: currentLabel });
  }

  return breadcrumbs;
};
```

- [ ] **Step 6: Verify Astro build**

Run: `cd "/Users/StevenStewart/SGS-CSC REMIX/.claude/worktrees/determined-golick" && npm run build 2>&1 | tail -10`
Expected: Build completes. If there are import errors from removed functions, fix them.

- [ ] **Step 7: Commit**

```bash
git add apps/site/src/lib/auto-shell.ts apps/site/src/lib/ib2027-routes.ts
git commit -m "refactor: rewrite IB sidebar to Theme A/B syllabus structure"
```

---

### Task 3: Update content-schema — remove pathway cards, clean up SL/HL functions

**Files:**
- Modify: `packages/content-schema/src/index.ts`

Remove:
- `IB_2027_PATHWAY_CARDS` constant
- `getIb2027PathwayIndex()` function
- Keep `getIb2027SyllabusListing()`, `getIbSlCurriculumIndex()`, `getIbHlCurriculumIndex()` (still needed by legacy redirect pages)

- [ ] **Step 1: Remove pathway cards and index function**

Delete the `IB_2027_PATHWAY_CARDS` array and `getIb2027PathwayIndex()` function. Search for `Ib2027PathwayIndex` interface and remove it too.

- [ ] **Step 2: Fix any broken imports**

Search all `.astro` and `.ts` files for `getIb2027PathwayIndex` and `Ib2027PathwayIndex` and remove/replace those imports.

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -10`

- [ ] **Step 4: Commit**

```bash
git add packages/content-schema/src/index.ts apps/site/
git commit -m "refactor: remove IB pathway cards from content-schema"
```

---

### Task 4: Rewrite Nunjucks landing page — "IB Computer Science"

**Files:**
- Modify: `src/pages/ib-2027/index.njk`

- [ ] **Step 1: Update landing page**

The landing page already has Paper 1/Paper 2 card layout. Change:
1. Title: "IB Computer Science 2027" → "IB Computer Science"
2. Section headers: "Paper 1" → "Theme A: Concepts of Computer Science"
3. Section headers: "Paper 2" → "Theme B: Computational Thinking and Problem-Solving"
4. "Other" section → "Assessment" with greyed-out styling
5. Hero subtitle: update to student-friendly overview text

```njk
---
layout: layouts/base.njk
title: "IB Computer Science - SGS Computer Science"
description: "IB Computer Science course — organised by the official IB syllabus structure."
activeSection: "ib"
breadcrumbs:
  - { label: "Home", href: "index.html" }
  - { label: "IB Computer Science" }
hero:
  title: IB Computer Science
  subtitle: Explore the course by theme, topic, and subtopic.
extraStyles:
  - "css/resource-style.css"
---

<div class="ib-syllabus-overview">

    <div class="ib-paper-group">
        <h2 class="ib-paper-title">
            <i class="fa-solid fa-file-lines" aria-hidden="true"></i>
            Theme A — Concepts of Computer Science
        </h2>
        <div class="resource-grid ib-unit-grid">
            {% for item in site.listings["ib-2027"].sections[0].items %}
            <a href="{{ item.href }}" class="resource-btn">
                <span class="resource-number">{{ item.number }}</span>
                <div class="resource-info">
                    <span class="resource-name">{{ item.name }}</span>
                    <span class="resource-type">{{ item.meta }}</span>
                </div>
                <i class="fa-solid fa-arrow-right resource-arrow" aria-hidden="true"></i>
            </a>
            {% endfor %}
        </div>
    </div>

    <div class="ib-paper-group">
        <h2 class="ib-paper-title">
            <i class="fa-solid fa-code" aria-hidden="true"></i>
            Theme B — Computational Thinking and Problem-Solving
        </h2>
        <div class="resource-grid ib-unit-grid">
            {% for item in site.listings["ib-2027"].sections[1].items %}
            <a href="{{ item.href }}" class="resource-btn">
                <span class="resource-number">{{ item.number }}</span>
                <div class="resource-info">
                    <span class="resource-name">{{ item.name }}</span>
                    <span class="resource-type">{{ item.meta }}</span>
                </div>
                <i class="fa-solid fa-arrow-right resource-arrow" aria-hidden="true"></i>
            </a>
            {% endfor %}
        </div>
    </div>

    <div class="ib-paper-group ib-paper-group--disabled">
        <h2 class="ib-paper-title ib-paper-title--muted">
            <i class="fa-solid fa-graduation-cap" aria-hidden="true"></i>
            Assessment
        </h2>
        <div class="resource-grid ib-unit-grid">
            {% for item in site.listings["ib-2027"].sections[2].items %}
            <span class="resource-btn resource-btn--disabled">
                <span class="resource-number">{{ item.number }}</span>
                <div class="resource-info">
                    <span class="resource-name">{{ item.name }}</span>
                    <span class="resource-type">Coming Soon</span>
                </div>
            </span>
            {% endfor %}
        </div>
    </div>

</div>

<style>
.ib-syllabus-overview { width: 100%; max-width: 900px; }
.ib-paper-group { margin-bottom: 2.5rem; }
.ib-paper-title {
    font-size: 1.1rem; color: var(--primary-dark); margin-bottom: 0.85rem;
    display: flex; align-items: center; gap: 0.6rem;
    font-family: var(--font-display); font-weight: 600;
}
.ib-paper-title i { color: var(--accent-color); font-size: 0.95rem; }
.ib-paper-title--muted { color: var(--text-muted, #888); }
.ib-paper-title--muted i { color: var(--text-muted, #888); }
.ib-unit-grid { display: flex; flex-direction: column; gap: 0.6rem; }
.resource-btn--disabled {
    opacity: 0.5; pointer-events: none; cursor: default;
}
</style>
```

- [ ] **Step 2: Verify Nunjucks build**

Run: `node scripts/build.js 2>&1 | tail -5`

- [ ] **Step 3: Commit**

```bash
git add src/pages/ib-2027/index.njk
git commit -m "refactor: rename IB landing page to 'IB Computer Science', use Theme A/B"
```

---

### Task 5: Update Astro landing page

**Files:**
- Modify: `apps/site/src/pages/ib-2027/index.astro`

- [ ] **Step 1: Simplify the Astro index page**

The page currently imports `getIb2027PathwayIndex` (which we're removing) and `getIb2027SyllabusListing`. Update to only use `getIb2027SyllabusListing`:

```astro
---
import CompactList from '../../components/CompactList.astro';
import CurriculumShell from '../../layouts/CurriculumShell.astro';
import { getIb2027SyllabusListing } from '@sgs/content-schema';

const syllabus = await getIb2027SyllabusListing();

const sections = (syllabus.sections || []).map((section) => ({
  title: section.title.includes('Theme')
    ? `${section.title}: ${section.subtitle}`
    : section.title,
  summary: section.subtitle,
  items: (section.items || []).map((item) => ({
    label: item.name,
    href: `/ib-2027/${item.href}`,
    meta: (item as any).disabled ? 'Coming Soon' : ((item as any).meta || `${item.number}`),
    disabled: (item as any).disabled
  }))
}));
---

<CurriculumShell
  title="IB Computer Science"
  description="IB Computer Science course — organised by the official IB syllabus structure."
  extraStyles={['css/resource-style.css']}
  activeSection="ib"
  breadcrumbs={[{ label: 'Home', href: '/index.html' }, { label: 'IB Computer Science' }]}
  eyebrow="IB"
  heroTitle="IB Computer Science"
  heroSubtitle="Explore the course by theme, topic, and subtopic."
  heroVariant="feature"
>
  {sections.map((section) => (
    <CompactList sections={[section]} />
  ))}
</CurriculumShell>
```

- [ ] **Step 2: Verify Astro build**

Run: `npm run build 2>&1 | tail -10`

- [ ] **Step 3: Commit**

```bash
git add apps/site/src/pages/ib-2027/index.astro
git commit -m "refactor: update Astro IB landing page to Theme A/B, remove 2027"
```

---

### Task 6: Update unit index pages — add specification/overview content

**Files:**
- Modify: `src/pages/ib-2027/{A1,A2,A3,A4,B1,B2,B3,B4}/index.njk` (×8)

Each unit index page needs:
1. Breadcrumbs updated: "IB 2027" → "IB Computer Science"
2. A `specification` block with the guiding question and SL/HL hours
3. Hero subtitle updated with guiding question

- [ ] **Step 1: Update all 8 unit index pages**

For each unit (A1 through B4), update the frontmatter. Example for B2:

```yaml
---
layout: layouts/arcade.njk
title: 'B2 Programming - SGS Computer Science'
description: 'Programming fundamentals, data structures, constructs, algorithms, and file processing.'
activeSection: ib
breadcrumbs:
  - label: Home
    href: index.html
  - label: IB Computer Science
    href: ib-2027/index.html
  - label: B2
hero:
  title: 'B2 Programming'
  subtitle: 'SL: 40 hours | HL: 42 hours'
specification:
  examCode: 'B2'
  unitSummary: 'How can we apply computer programming to solve problems?'
  subtopics:
    - 'B2.1 Programming Fundamentals'
    - 'B2.2 Data Structures'
    - 'B2.3 Programming Constructs'
    - 'B2.4 Programming Algorithms'
    - 'B2.5 File Processing'
resourcesTitle: Subtopics
resources:
  - href: B2.1/index.html
    number: B2.1
    name: Programming Fundamentals
    type: SL + HL
  - href: B2.2/index.html
    number: B2.2
    name: Data Structures
    type: SL + HL
  - href: B2.3/index.html
    number: B2.3
    name: Programming Constructs
    type: SL + HL
  - href: B2.4/index.html
    number: B2.4
    name: Programming Algorithms
    type: SL + HL
  - href: B2.5/index.html
    number: B2.5
    name: File Processing
    type: SL + HL
resourcesSecondaryTitle: Unit Resources
resourcesSecondary:
  - href: textbook.html
    icon: fa-solid fa-book
    name: Textbook
    type: Unit-level textbook reader
---
{# Content rendered by layout #}
```

Repeat for all 8 units using the guiding questions from the syllabus:
- **A1**: "What principles underpin the operation of a computer, from low-level hardware functionality to operating system interactions?"
- **A2**: "What are the principles and concepts that underpin how networks operate?"
- **A3**: "What are the principles, structures, and operations that form the basis of database systems?"
- **A4**: "What principles and approaches should be considered to ensure machine learning models produce accurate results ethically?"
- **B1**: "How can we apply a computational solution to a real-world problem?"
- **B2**: "How can we apply computer programming to solve problems?"
- **B3**: "Is object-oriented programming (OOP) an appropriate paradigm for solving complex problems?"
- **B4**: "Which abstract data types (ADTs) are most appropriate for different situations?"

- [ ] **Step 2: Update all ~28 subtopic index pages — fix breadcrumbs**

For every file matching `src/pages/ib-2027/*/[AB]*/index.njk`, change breadcrumb label from "IB 2027" to "IB Computer Science".

- [ ] **Step 3: Verify build**

Run: `node scripts/build.js 2>&1 | tail -5`

- [ ] **Step 4: Commit**

```bash
git add src/pages/ib-2027/
git commit -m "refactor: add specification content to unit pages, update breadcrumbs"
```

---

### Task 7: Fix broken imports and remove dead code

**Files:**
- Search all `.astro` and `.ts` files for references to removed functions/types

- [ ] **Step 1: Find and fix all broken references**

Search for:
- `getIb2027PathwayIndex` — remove imports, replace usage
- `Ib2027PathwayIndex` — remove type references
- `getIb2027LevelListing` — replace with `getListingByKey('ib-2027')`
- `getIb2027LevelStaticPaths` — remove if no longer needed
- `getIb2027UnitStaticPaths` — remove if no longer needed
- `IB_2027_PATHWAY_CARDS` — should already be removed
- `ib-2027-sl`, `ib-2027-hl` — any remaining references

- [ ] **Step 2: Check for orphaned Astro routes**

Look at `apps/site/src/pages/ib-2027/[level]/` — these Astro routes generate SL/HL pages. They should be kept for backward compat (they redirect), or removed if redirect stubs in `public/` handle it.

- [ ] **Step 3: Verify full build**

Run: `npm run build 2>&1 | tail -10`
Expected: Clean build, no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove dead SL/HL code and fix broken imports"
```

---

### Task 8: Full build, deploy, and visual verification

**Files:** None (verification only)

- [ ] **Step 1: Run full build**

```bash
cd "/Users/StevenStewart/SGS-CSC REMIX/.claude/worktrees/determined-golick"
npm run build
```

- [ ] **Step 2: Start preview server**

Use `preview_start` with `site-preview` configuration.

- [ ] **Step 3: Verify landing page**

Navigate to `/ib-2027/`. Confirm:
- Title says "IB Computer Science" (no "2027")
- Sidebar shows Theme A / Theme B with A1–B4 items
- Assessment section (IA/EE/CS) is greyed out
- Main content shows Theme A and Theme B card grids

- [ ] **Step 4: Verify unit page**

Navigate to `/ib-2027/B2/`. Confirm:
- Sidebar shows Overview, B2.1–B2.5 subtopic links, Textbook
- Main content shows unit overview with guiding question
- Clicking B2.3 navigates to subtopic page

- [ ] **Step 5: Verify subtopic page**

Navigate to `/ib-2027/A1/A1.1/`. Confirm:
- Sidebar still shows A1 unit nav context
- Slide deck link works

- [ ] **Step 6: Verify old URLs redirect**

Navigate to `/ib-2027/sl/unit-1/`. Confirm redirect to `/ib-2027/B1/`.

- [ ] **Step 7: Check console for errors**

Use `preview_console_logs` with `level: 'error'`.
