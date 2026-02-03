# KS3 Textbook Template Rules

This document explains how to build content for the KS3 textbook template in `src/pages/ks3/Textbook/`.

Use these rules whenever you generate or edit a textbook chapter so the layout, pagination, and navigation work correctly.

## 1. Source Of Truth
- Template files: `textbook_template.html`, `textbook_template.css`, `textbook_template.js`.
- The app renders pages by reading `#rawContent` and inserting paginated `.page` elements into `#bookViewport`.
- Only edit HTML content inside `#rawContent` unless you are explicitly asked to change CSS/JS.

## 2. Navigation And Structure
- Do not add a contents page. Navigation is generated in the left sidebar from headings.
- The sidebar always starts with the title slide (cover page).
- H2 entries become collapsible topics. H3 and H4 entries become nested lesson links.
- Headings must be meaningful and ordered: H2 for topic, H3 for lesson, H4 for sub-lesson.
- Provide stable IDs on headings when possible. The template will auto-generate IDs, but explicit IDs make links stable.

## 3. Required Page Order
1) Cover page (title slide)
2) Unit header page (chapter header)
3) Main content pages

## 4. Cover Page Requirements
- First element in `#rawContent` must be `.cover-page`.
- Include `.cover-image`, `.cover-title-block`, and `.cover-logo`.
- Set `data-unit-number` and `data-unit-name` on the `<html>` element so the footer and sidebar reflect the unit.

Example:
```html
<div class="cover-page" id="book-cover">
  <img class="cover-image" src="..." alt="Cover image">
  <div class="cover-title-block">
    <div class="cover-chapter-number">Unit 1</div>
    <h1 class="cover-title">Unit Title</h1>
  </div>
  <img class="cover-logo" src="..." alt="St George's Logo">
</div>
<div class="page-break" data-sizes="all"></div>
```

## 5. Chapter Header Page
- Use `.chapter-page-header` as the first content header.
- Include `.chapter-number-badge` and `.chapter-page-title`.

Example:
```html
<div class="chapter-page-header" id="unit-1">
  <div class="chapter-number-badge">1</div>
  <h1 class="chapter-page-title">Unit Title</h1>
</div>
```

## 6. Pagination And Page Breaks
- Pagination is automatic based on `.page-break` markers.
- Use `<div class="page-break" data-sizes="all"></div>` to force a new page.
- Use `data-sizes="large xl reader"` if a break should only occur in larger text modes.
- Use `data-keep-with-next` on headings or elements that must stay with the following content.

## 7. Headings And IDs
- H2: top-level topic sections.
- H3: lesson sections under a topic.
- H4: sub-sections under a lesson.
- If you add IDs manually, keep them unique and stable across revisions.

Example:
```html
<h2 id="unit-1-section-1">1.1 Data Representation</h2>
<h3 id="unit-1-section-1-1">1.1.1 Binary Basics</h3>
<h4 id="unit-1-section-1-1-a">Worked Example</h4>
```

## 8. Common Content Blocks
Use the existing classes. Do not invent new inline styles.

Lists:
```html
<ul class="list-arrow">
  <li>Point one</li>
  <li>Point two</li>
</ul>
```

Key boxes:
```html
<div class="box-key">
  <div class="box-header">Key Idea</div>
  <p>Short explanation.</p>
</div>
```

Did you know / exam tips / common mistakes:
```html
<div class="box-did-you-know">...</div>
<div class="box-exam-tip">...</div>
<div class="box-common-mistake">...</div>
```

Keywords table:
```html
<div class="keywords-title">Keywords</div>
<table class="keywords-table">...</table>
```

Figures:
```html
<figure>
  <img src="..." alt="Descriptive alt text">
  <figcaption>Caption</figcaption>
</figure>
```

## 9. Interactives And Modals
- Keyword definitions use `.keyword-link` with `onclick="openDef('Term','Definition')"` for the modal.
- Use the existing binary and practice components exactly as shown in the template.
- Do not remove IDs or class names used by JS handlers.

## 10. JSON-Driven Mode (Optional)
- If `data-textbook-content` is set on `<html>`, the JS loads JSON and builds `#rawContent`.
- In that mode, do not manually edit `#rawContent`. Update the JSON instead.

## 11. Do Not Change
- Do not rename IDs or classes referenced by JS.
- Do not remove `#rawContent` or `#bookViewport`.
- Do not add a contents page. The sidebar replaces it.

## 12. Quick Checklist
- Cover page first, then a page break.
- No contents page.
- Headings in order (H2 -> H3 -> H4) with stable IDs.
- Page breaks used where needed.
- Images wrapped in figures with alt text.
- Only template classes used for boxes and layouts.
