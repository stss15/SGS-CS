# IGCSE Slide Deck Agent Documentation

This directory contains all documentation and templates for creating pedagogically sound IGCSE Computer Science slide decks.

---

## ⚠️ Build & Deploy Workflow

**The CI workflow now handles keyword processing automatically!**

### For Production Deploys

Simply commit and push your changes:

```bash
git add -A
git commit -m "Description of changes"
git push origin main
```

The GitHub Actions workflow (`.github/workflows/pages.yml`) will:
1. Run `npm run build` (generates HTML from Nunjucks templates)
2. Run `python3 public/igcse/apply_keywords.py` (applies red keyword highlighting)
3. Deploy to GitHub Pages

### For Local Testing

If you want to test keyword highlighting locally:

```bash
npm run build
python3 public/igcse/apply_keywords.py
```

The keyword script:
- Reads definitions from `docs/igcse-content/chapter-text-files/Chapter X key words.txt`
- Wraps keywords in `<span class="keyword" data-def="...">` tags (red highlighting)
- Removes old yellow `<div class="key-term">` definition boxes
- Skips `<script>`, `<style>`, `<title>`, and existing keyword spans

### Verify Deployment
- Check GitHub Actions: https://github.com/stss15/SGS-CS/actions
- Wait for green checkmark
- **Hard refresh browser** (`Cmd+Shift+R`) to clear CSS cache

---

## 🧭 Navigation & Breadcrumbs

The site now uses a structured breadcrumb system in the header, replacing manual `backLink` definitions.

### Adding New Pages

When creating a new `.njk` page, you **must** define the `breadcrumbs` frontmatter.

**Example Frontmatter:**
```yaml
---
layout: layouts/base.njk
title: "Topic 1.1 Specification"
activeSection: "igcse"
breadcrumbs:
  - { label: "Home", href: "index.html" }
  - { label: "IGCSE", href: "igcse/index.html" }
  - { label: "Topic 1", href: "igcse/topic1/index.html" }
  - { label: "Specification", href: "igcse/topic1/specification.html" }
---
```

### Rules
1. **`activeSection`**: Matches the main nav link to highlight ('ks3', 'igcse', 'ib').
2. **`breadcrumbs`**: A list of objects with `label` and `href`.
   - The **last item** is the current page (it will be unlinked and grayed out automatically).
   - Use relative paths from the site root (e.g., `igcse/index.html` not `../index.html`). The build script computes relative paths automatically.

### Updating Existing Pages
If you move a page or change hierarchy, update the `breadcrumbs` list to reflect the new structure.

---

## Quick Start for Creating Slide Decks

**Read this first:** [`igcse-slide-deck-guide.md`](./igcse-slide-deck-guide.md)

This is the complete guide for creating slide decks. It includes:
- Standard deck structure
- Transformation rules
- Component library
- Pedagogical patterns
- Quality standards
- Common mistakes to avoid

## Template Files

**Master Template:** [`templates/igcse-slide-deck-template.html`](./templates/igcse-slide-deck-template.html)

This template shows all the patterns and structures you need. Copy and modify as needed.

**CSS Reference:** [`templates/slide-deck-template.css`](./templates/slide-deck-template.css)

Reference for styling classes and components.

**Live CSS (deployed):** `public/css/slide-deck.css` - This is the actual CSS used by deployed slides.

## Key Principles

1. **Question-First:** Every concept starts with a question
2. **Analogies:** Use real-world comparisons for abstract concepts
3. **Progressive Disclosure:** Reveal information with fragments
4. **Misconception Checks:** End every deck with True/False questions
5. **Engaging Hooks:** Create curiosity with "The Big Question"

## Reference Examples

Study these completed decks for examples:
- `public/igcse/topic1/1.1_number_representation.html`
- `public/igcse/topic2/2.1_data_transmission.html`
- `public/igcse/topic3/3.1_computer_architecture.html`
- `public/igcse/topic4/4.1_types_of_software_and_interrupts.html`
- `public/igcse/topic5/5.1_the_internet_and_the_www.html`
- `public/igcse/topic6/6.1_automated_systems.html`

## Directory Structure

```
docs/
├── agent/                          # AI Agent documentation
│   ├── README.md                   # This file
│   ├── build-deploy-log.md         # Deployment records
│   ├── igcse-slide-deck-guide.md   # Complete slide deck guide
│   ├── igcse-slide-deck-changelog.md
│   ├── reveal-slide-deck-sizing-guide.md
│   ├── plans/                      # Slide deck plans (*.md)
│   │   ├── 1.1_slide_plan.md
│   │   ├── 1.2_slide_plan.md
│   │   └── ...
│   ├── image-prompts/              # AI image generation prompts
│   │   ├── Chapter 1/
│   │   ├── Chapter 2/
│   │   └── ...
│   ├── templates/                  # HTML/CSS templates
│   └── workflows/                  # Step-by-step workflows
├── igcse-content/
│   └── chapter-text-files/         # Source content & keywords
│       ├── Chapter 1 key words.txt
│       ├── Chapter 1.txt
│       └── ...
└── ib-content/
    └── textbooks/                  # IB course textbooks
```

## Other Files

- **Changelog:** [`igcse-slide-deck-changelog.md`](./igcse-slide-deck-changelog.md) - History of changes
- **Build Log:** [`build-deploy-log.md`](./build-deploy-log.md) - Deployment records
- **Sizing Guide:** [`reveal-slide-deck-sizing-guide.md`](./reveal-slide-deck-sizing-guide.md) - Technical sizing details

---

**Remember:** The goal is not to display information. The goal is to create a learning experience that engages students, checks understanding, and builds knowledge progressively.
