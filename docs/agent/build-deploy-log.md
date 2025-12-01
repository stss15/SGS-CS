# Build & Deploy Log

Use this file to record every full-site build and deploy. Append a new entry each time you run the build and push to main.

---

## Complete Build & Deploy Workflow

### Step 1: Apply Keyword Highlighting (IMPORTANT!)
```bash
python3 public/igcse/apply_keywords.py
```
This wraps keywords in red `<span class="keyword">` tags using definitions from `chapter text files/`.

### Step 2: Build Site (if using Nunjucks templates)
```bash
npm run build
```
Generates `public/` from `src/pages/` templates.

### Step 3: Commit and Push
```bash
git add -A
git commit -m "Description of changes"
git push origin main
```

### Step 4: Verify
- Check GitHub Actions: https://github.com/stss15/SGS-CS/actions
- Hard refresh browser (`Cmd+Shift+R`) to clear CSS cache

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `public/igcse/apply_keywords.py` | Python script to apply red keyword highlighting |
| `public/igcse/chapter text files/` | Keyword definitions for each chapter |
| `public/css/slide-deck.css` | Master CSS (includes `.keyword` red styling) |
| `src/pages/igcse/topicX/index.njk` | Nunjucks templates for topic index pages |
| `.github/workflows/pages.yml` | GitHub Actions deployment workflow |

---

## Known Issues & Solutions

### CSS Not Updating After Deploy
**Cause:** Browser caching CSS files.
**Solution:** Hard refresh with `Cmd+Shift+R` or open in incognito.

### Keyword Highlighting Not Red
**Cause:** CSS specificity - `.reveal h3` was overriding `.keyword` color.
**Solution:** Fixed in `slide-deck.css` with `.reveal h3 .keyword { color: var(--sg-red) !important; }`

### apply_keywords.py Not Finding Files
**Cause:** Incorrect `BASE_DIR` path in script.
**Solution:** Ensure path is `/Users/StevenStewart/SGS-CSC/public/igcse`

---

## Log entries (newest first)
- 2025-12-01: Fixed apply_keywords.py path typo (SGSD→SGS) and reapplied all keywords. Fixed CSS specificity for .keyword in Reveal.js headings.
- 2025-12-01: Updated IGCSE topic index pages with slide deck links, flashcard links, simulations, Teaching & Revision buttons.
- 2025-12-01: Built site (`npm run build`) and pushed `main` to stss15/SGS-CS to trigger GitHub Pages (first deploy on new repo).
- 2025-11-29: Complete pedagogical rebrand of all IGCSE slide decks. Consolidated documentation. Updated templates.
- 2025-11-29: Built site (`npm run build`), committed topic 1/6 resource sync and pushed to `main` (commit `941e132`). Triggered GitHub Pages deploy.
