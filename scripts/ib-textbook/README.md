# IB Textbook Source Maps

Generate a source evidence map for a single IB 2027 unit textbook entry.

## Command

```bash
npm run ib:textbook:source-map -- --level sl --unit 1
```

Generate all textbook markdown entries from mapped unit plans:

```bash
npm run ib:textbook:generate
```

Force overwrite existing files:

```bash
npm run ib:textbook:generate -- --overwrite true
```

Validate that each textbook includes all mapped codes, key terms, and per-section command terms:

```bash
npm run ib:textbook:validate
```

## Output

Generated file:

```text
docs/content/ib-content/textbook-source-maps/<level>-unit-<number>.md
```

The output includes:

- mapped subtopics from `unit-plan.njk`
- source files used from `docs/content/ib-content/IB_Content_MD`
- extracted text fragments for each mapped subtopic code
- unit plan extract for bounded context
