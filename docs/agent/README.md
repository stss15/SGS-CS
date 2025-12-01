# IGCSE Slide Deck Agent Documentation

This directory contains all documentation and templates for creating pedagogically sound IGCSE Computer Science slide decks.

---

## ⚠️ CRITICAL: Build & Deploy Workflow

**After making ANY changes to IGCSE content, you MUST follow this complete workflow:**

### Step 1: Apply Keywords (Red Click-to-Define Highlighting)
```bash
cd /Users/StevenStewart/SGS-CSC
python3 public/igcse/apply_keywords.py
```

This script:
- Reads keyword definitions from `public/igcse/chapter text files/Chapter X key words.txt`
- Wraps all keywords in `<span class="keyword" data-def="...">` tags (red highlighting)
- Removes any old yellow `<div class="key-term">` definition boxes
- Processes all HTML files in topics 1-10

### Step 2: Build the Site (if using Nunjucks templates)
```bash
npm run build
```
This generates `public/` from `src/pages/` templates.

### Step 3: Commit and Push
```bash
git add -A
git commit -m "Description of changes"
git push origin main
```

### Step 4: Verify Deployment
- Check GitHub Actions: https://github.com/stss15/SGS-CS/actions
- Wait for green checkmark
- **Hard refresh browser** (`Cmd+Shift+R`) to clear CSS cache

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

## Other Files

- **Changelog:** [`igcse-slide-deck-changelog.md`](./igcse-slide-deck-changelog.md) - History of changes
- **Build Log:** [`build-deploy-log.md`](./build-deploy-log.md) - Deployment records
- **Sizing Guide:** [`reveal-slide-deck-sizing-guide.md`](./reveal-slide-deck-sizing-guide.md) - Technical sizing details

---

**Remember:** The goal is not to display information. The goal is to create a learning experience that engages students, checks understanding, and builds knowledge progressively.




