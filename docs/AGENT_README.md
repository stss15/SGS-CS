# SGS Computer Science - AI Agent Guide

> **Read this first.** This is the entry point for all AI agents working on the SGS Computer Science website.

---

## What Is This Project?

SGS-CS is an educational website for St George's School Computer Science department, serving three curricula:

| Curriculum | Years | Ages | Folder |
|------------|-------|------|--------|
| **KS3** | 7-9 | 11-14 | `ks3/` |
| **IGCSE** | 10-11 | 14-16 | `igcse/` |
| **IB** | 12-13 | 16-18 | `ib/` |

The site contains slide decks (Reveal.js), interactive assessments, games, visualizers, and revision resources.

---

## Quick Start: Which Guide Do I Read?

| Your Task | Read This Guide |
|-----------|-----------------|
| Understand the codebase structure | This file (continue reading) |
| Build and deploy the site | [`BUILD_AND_DEPLOY.md`](./BUILD_AND_DEPLOY.md) |
| Create KS3 content (Years 7-9) | [`KS3_GUIDE.md`](./KS3_GUIDE.md) |
| Create IGCSE content (Years 10-11) | [`IGCSE_GUIDE.md`](./IGCSE_GUIDE.md) |
| Create IB content (Years 12-13) | [`IB_GUIDE.md`](./IB_GUIDE.md) |
| Understand writing style for each level | [`curriculum content guides/agent_content.md`](./curriculum%20content%20guides/agent_content.md) |
| **Make slides engaging (Reveal.js)** | [`REVEAL_TECHNIQUES.md`](./REVEAL_TECHNIQUES.md) |

---

## Directory Structure

```
SGS-CSC REMIX/
├── public/                      # OUTPUT - Deployed website
│   ├── css/                     # Stylesheets (80 files)
│   ├── js/                      # Scripts (67 files)
│   ├── images/                  # Logos, thumbnails
│   ├── ks3/                     # KS3 HTML pages
│   ├── igcse/                   # IGCSE HTML pages
│   └── ib/                      # IB HTML pages
│
├── src/                         # SOURCE - Nunjucks templates
│   ├── pages/                   # Page templates (.njk)
│   │   ├── ks3/
│   │   ├── igcse/
│   │   └── ib/
│   └── templates/               # Layout templates
│       └── layouts/             # base.njk, slide-deck.njk, etc.
│
├── docs/                        # DOCUMENTATION
│   ├── AGENT_README.md          # ← You are here
│   ├── BUILD_AND_DEPLOY.md      # Build & deploy guide
│   ├── KS3_GUIDE.md             # KS3 documentation
│   ├── IGCSE_GUIDE.md           # IGCSE documentation
│   ├── IB_GUIDE.md              # IB documentation
│   ├── curriculum content guides/
│   │   └── agent_content.md     # Writing style guide
│   ├── templates/               # HTML/CSS templates
│   ├── content/                 # Source content (text files)
│   ├── plans/                   # IGCSE slide plans
│   └── image-prompts/           # AI image generation prompts
│
├── scripts/                     # Build scripts
│   └── build.js                 # Nunjucks → HTML compiler
│
├── diagnosis/                   # Codebase analysis reports
│
├── meta/
│   └── site-manifest.json       # Generated page manifest
│
└── package.json                 # Dependencies
```

---

## Critical Rules

### 1. Generated vs Standalone Files

The site has TWO types of HTML files:

**Generated Files** (from Nunjucks templates):
- Have a `.njk` source in `src/pages/`
- Start with `<!-- GENERATED FILE - Edit source in src/pages/ instead -->`
- **NEVER edit these directly** — edit the `.njk` source instead
- Run `npm run build` after editing

**Standalone Files** (edit directly):
- No `.njk` source exists
- Games, visualizers, and interactive tools
- Examples: `recursion-visualizer.html`, `binary-addition-game.html`
- Listed in `public/README.md`

### 2. Build Process

```bash
# After editing .njk templates
npm run build

# The build:
# 1. Compiles src/pages/*.njk → public/*.html
# 2. Adds "GENERATED FILE" marker
# 3. Updates meta/site-manifest.json
```

### 3. CSS and JS Organization

**Never add inline CSS/JS to new files.** Use external files:

```
public/css/
├── style.css              # Global site styles
├── slide-deck.css         # Reveal.js base
├── ks3-deck.css           # KS3 slide overrides
├── igcse-deck.css         # IGCSE slide overrides
├── activity-*.css         # Activity-specific
├── assessment-*.css       # Assessment-specific
├── game-*.css             # Game-specific
└── visualizer-*.css       # Visualizer-specific

public/js/
├── nav.js                 # Navigation
├── feedback.js            # Bug report modals
├── slide-deck.js          # Reveal.js initialization
└── [type]-[name].js       # Feature-specific scripts
```

### 4. Navigation

Use **breadcrumbs** (not `backLink`) for navigation:

```yaml
# In .njk frontmatter:
breadcrumbs:
  - { label: "Home", href: "index.html" }
  - { label: "IGCSE", href: "igcse/index.html" }
  - { label: "Topic 1", href: "igcse/topic1/index.html" }
  - { label: "Current Page" }  # No href = current page
```

### 5. Active Section

Set `activeSection` to highlight the correct nav link:

```yaml
activeSection: "ks3"    # or "igcse" or "ib"
```

---

## Key Commands

```bash
# Build the site (after template changes)
npm run build

# Apply IGCSE keyword highlighting
python3 public/igcse/apply_keywords.py

# Serve locally for testing
npx serve public

# Deploy (just push - CI handles the rest)
git add -A && git commit -m "message" && git push origin main
```

---

## Content Sources

| Curriculum | Source Location | Description |
|------------|-----------------|-------------|
| KS3 | `docs/content/ks3/` | Year 7-9 unit plans |
| IGCSE | `docs/content/igcse/` | Chapter text and keywords |
| IB | `docs/content/ib/` | Textbook content |

---

## Templates

| Curriculum | Template Location |
|------------|-------------------|
| KS3 | `docs/templates/ks3/` |
| IGCSE | `docs/templates/igcse/` |
| IB | `docs/templates/ib/` |

---

## Common Tasks

### Creating a New Slide Deck

1. Read the appropriate guide (KS3_GUIDE, IGCSE_GUIDE, or IB_GUIDE)
2. Check writing guidelines in `agent_content.md`
3. Use the template from `docs/templates/`
4. Follow the pedagogical patterns (question-first, analogies, etc.)
5. Run `npm run build`
6. Test in browser

### Creating a New Assessment

1. Read `IGCSE_GUIDE.md` (assessments section)
2. Copy template from `docs/templates/igcse/assessment-template.md`
3. Implement question types from the catalogue
4. Test all interactions
5. Verify PDF generation works

### Modifying Existing Content

1. Check if file is generated or standalone
2. If generated: edit the `.njk` source, then `npm run build`
3. If standalone: edit the HTML directly
4. Test all functionality
5. Commit and push

---

## Deployment

GitHub Actions automatically:
1. Runs `npm run build`
2. Runs `python3 public/igcse/apply_keywords.py`
3. Deploys to GitHub Pages

Just push to `main` and wait for the green checkmark.

---

## Need More Detail?

| Topic | Document |
|-------|----------|
| Build system, Reveal.js, deployment | [`BUILD_AND_DEPLOY.md`](./BUILD_AND_DEPLOY.md) |
| KS3 lessons, widgets, templates | [`KS3_GUIDE.md`](./KS3_GUIDE.md) |
| IGCSE slides, assessments, keywords | [`IGCSE_GUIDE.md`](./IGCSE_GUIDE.md) |
| IB slides, HL/SL content | [`IB_GUIDE.md`](./IB_GUIDE.md) |
| Writing style for each age group | [`agent_content.md`](./curriculum%20content%20guides/agent_content.md) |
| Codebase diagnosis/refactoring | [`diagnosis/`](../diagnosis/) |

---

## Golden Rules

1. **Never edit generated HTML** — edit the `.njk` source
2. **Always run `npm run build`** after template changes
3. **No inline CSS/JS** — use external files in `public/css/` and `public/js/`
4. **Use breadcrumbs** for navigation (not backLink)
5. **Question-first pedagogy** — every concept starts with a question
6. **Test before pushing** — verify in browser first

