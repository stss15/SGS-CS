---
description: Build an OOP worksheet for a level of the Sigma-7 text adventure project
---

# Build OOP Worksheet

This workflow creates a single worksheet for the OOP text adventure project. Each worksheet includes a Nunjucks HTML page, a student download folder with skeleton code, and a ZIP archive.

---

## PHASE 1: Read the Level Specification

1. Read the level spec from `public/ib-2027/sl/unit-5/OOP Project/levels/specs/LEVEL_[X]_*.md`
2. Identify:
   - **OOP concepts** being taught (inheritance, composition, etc.)
   - **Student files** they must create/modify
   - **Method signatures** required (exact names matter for validation)
   - **Engine files** they need access to (if any)

---

## PHASE 2: Create the Worksheet HTML

Create `src/pages/ib-2027/sl/unit-5/oop-project/level-[x]-[name].njk`

### Required Sections

1. **Hero Section** — Level title, subtitle, AI-generated image
2. **Learning Objectives** — 3-4 cards with numbered goals
3. **Key Terms** — Table of OOP terms relevant to this level
4. **UML Diagram** — Using `.uml-class` CSS (see Level A for pattern)
5. **Structure Guide** — Collapsible `<details>` blocks (see below)
6. **Challenge Section** — Mission description + download button
7. **Level Navigation** — Previous / Next level links

### Structure Guide Rules

> [!IMPORTANT]
> DO NOT use Python-specific syntax in the skeleton. Use pseudocode keywords.

Each collapsible block uses this pattern:
```html
<details class="skeleton-block">
    <summary class="skeleton-summary">
        <span class="skeleton-step">1</span>
        <span class="skeleton-title">Constructor</span>
        <i class="fa-solid fa-chevron-down skeleton-chevron"></i>
    </summary>
    <div class="skeleton-content">
        <div class="skeleton-line code">CONSTRUCTOR(name):</div>
        <div class="skeleton-desc">
            <strong>Receives:</strong> the player's name<br>
            <strong>Must do:</strong>
            <ul>
                <li>Store the name in this object</li>
                <li>...</li>
            </ul>
        </div>
    </div>
</details>
```

**Splitting rules:**
- One block per METHOD if level is about writing methods
- One block per CLASS if level involves multiple classes
- One block per CONCEPT if level is about understanding (e.g., code reading)

---

## PHASE 3: Create the Student Download Folder

Create folder at: `public/ib-2027/sl/unit-5/OOP Project/downloads/level_[x]_[name]/`

### Folder Structure
```
level_[x]_[name]/
├── student/
│   ├── __init__.py
│   └── [classname].py    # Skeleton for students
├── engine/               # Minimal engine files needed
│   ├── __init__.py
│   └── [only files needed for this level]
├── run_game.py           # Entry point
├── validate.py           # Level-specific validation
└── README.md             # Brief instructions
```

### Student Code Template Rules

> [!IMPORTANT]
> Keep templates MINIMAL. Students should practice writing code from scratch.

Pattern for `student/[classname].py`:
```python
class ClassName:

    # CONSTRUCTOR

    # METHOD_NAME_1
    method_name_1()

    # METHOD_NAME_2
    method_name_2()
```

**Rules:**
- NO docstrings (info is on the website)
- NO type hints (students add these)
- NO `pass` statements (students write the body)
- Just the class name, method names as comments, and blank method stubs
- Method names MUST match the validator exactly

---

## PHASE 4: Create the Validator

Create `validate.py` with checks specific to this level.

Pattern:
```python
#!/usr/bin/env python3
"""Validator for Level [X]"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# ... validation logic ...

if __name__ == "__main__":
    main()
```

Validator should check:
- Class can be imported
- Required attributes exist
- Required methods exist and work correctly
- Edge cases (clamping, empty lists, etc.)

---

## PHASE 5: Create the ZIP Archive

// turbo
```bash
cd "public/ib-2027/sl/unit-5/OOP Project/downloads"
zip -r level_[x]_[name].zip level_[x]_[name] -x "*.pyc" -x "*__pycache__*"
```

---

## PHASE 6: Update OOP Project Index

If not already linked, add the level to `src/pages/ib-2027/sl/unit-5/oop-project/index.njk`

---

## PHASE 7: Build and Verify

// turbo
```bash
cd "/Users/StevenStewart/SGS-CSC REMIX" && npm run build
```

Verify:
1. Worksheet renders correctly in browser
2. Download button works
3. Collapsible sections expand/collapse
4. `python3 validate.py` runs without import errors

---

## Reference Files

- **Level A template**: `src/pages/ib-2027/sl/unit-5/oop-project/level-a-player.njk`
- **CSS styles**: `public/css/oop-worksheet.css`
- **Level specs**: `public/ib-2027/sl/unit-5/OOP Project/levels/specs/`
- **Reference code**: `public/ib-2027/sl/unit-5/OOP Project/level_x_final_game/student_reference/`
