# Build & Deploy Log

Use this file to record every full-site build and deploy. Append a new entry each time you run the build and push to main.

---

## Complete Build & Deploy Workflow

**The CI workflow now handles everything automatically!**

### For Production (just push!)
```bash
git add -A
git commit -m "Description of changes"
git push origin main
```

GitHub Actions (`.github/workflows/pages.yml`) will automatically:
1. Run `npm run build` (generates HTML from templates)
2. Run `python3 public/igcse/apply_keywords.py` (applies red keywords)
3. Deploy to GitHub Pages

### For Local Testing
```bash
npm run build
python3 public/igcse/apply_keywords.py
# Then open public/igcse/topicX/file.html in browser
```

### Verify Deployment
- Check GitHub Actions: https://github.com/stss15/SGS-CS/actions
- Hard refresh browser (`Cmd+Shift+R`) to clear CSS cache

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `public/igcse/apply_keywords.py` | Python script to apply red keyword highlighting |
| `docs/igcse-content/chapter-text-files/` | Keyword definitions for each chapter |
| `docs/agent/plans/` | Slide deck plans (*.md) |
| `docs/agent/image-prompts/` | AI image generation prompts |
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
**Cause:** Incorrect path to chapter-text-files.
**Solution:** Script now uses relative paths. Keyword files are in `docs/igcse-content/chapter-text-files/`

---

## Log entries (newest first)
- 2025-12-01: **Major reorganization:** Moved all .md/.txt files out of public/ into docs/. Image prompts → docs/agent/image-prompts/, Slide plans → docs/agent/plans/, Chapter text files → docs/igcse-content/chapter-text-files/, IB textbooks → docs/ib-content/textbooks/. Updated apply_keywords.py paths.
- 2025-12-01: Fixed CI workflow to include apply_keywords.py as part of build process. Keywords now automatically applied on every deploy.
- 2025-12-01: Fixed apply_keywords.py path typo (SGSD→SGS) and reapplied all keywords. Fixed CSS specificity for .keyword in Reveal.js headings.
- 2025-12-01: Updated IGCSE topic index pages with slide deck links, flashcard links, simulations, Teaching & Revision buttons.
- 2025-12-01: Built site (`npm run build`) and pushed `main` to stss15/SGS-CS to trigger GitHub Pages (first deploy on new repo).
- 2025-11-29: Complete pedagogical rebrand of all IGCSE slide decks. Consolidated documentation. Updated templates.
- 2025-11-29: Built site (`npm run build`), committed topic 1/6 resource sync and pushed to `main` (commit `941e132`). Triggered GitHub Pages deploy.
