---
description: Full-scale refactoring of IB section from chapter-based (A1-A4, B1-B4) to unit-based (SL Unit 1-12, HL Unit 1-12) learning structure.
---

# IB Unit-Based Curriculum Refactor

> **IMPORTANT**: This is a major, multi-phase refactor. Execute phases in order. Complete each phase fully before proceeding. Run `npm run build` after template changes. Test locally before committing.

---

## Overview

### Current Structure (LEGACY)
```
public/ib/
├── index.html              # Lists Theme A + Theme B (A1-A4, B1-B4)
├── A1/ → A4/               # Chapter folders
└── B1/ → B4/               # Chapter folders
    ├── index.html          # Chapter landing (Specification, Flashcards, Teacher Resources)
    ├── specification.html  # IB spec points
    ├── flashcards.html     # Chapter-based flashcard app (LINKS ONLY - NO ACTUAL FILE)
    └── X.Y.Z_topic.html    # Slide decks
```

### Target Structure (NEW)
```
public/ib/
├── index.html              # UPDATED: Add "IB 2027" section with SL/HL pathways
├── sl/                     # NEW: Standard Level track
│   ├── index.html          # Lists SL Units 1-12
│   └── unit-1/ → unit-12/  # Individual unit folders
│       ├── index.html      # Unit landing page
│       ├── unit-plan.html  # Student-friendly unit overview (replaces specification)
│       ├── flashcards.html # Unit-based flashcard app
│       ├── questions.json  # Flashcard data for this unit
│       └── slides/         # Multiple smaller slide decks
│           ├── part-1-*.html
│           └── part-2-*.html
│       └── teacher/        # Teacher resources
│           ├── index.html  # Teacher resource hub
│           ├── assessments.html
│           └── activities.html
└── hl/                     # NEW: Higher Level track (same structure)
    ├── index.html
    └── unit-1/ → unit-11/
```

### Content Sources
| Type | Location |
|------|----------|
| Unit Plans (structure) | `docs/content/ib-content/Unit Plans/SL/` and `/HL/` (.docx files) |
| Textbook Content | `docs/content/ib-content/Textbook Chapters PDF/` (A1-B4.pdf) |
| Existing Slide Decks | `public/ib/A1/` - `public/ib/B4/` (for reference/adaptation) |

---

## Phase 0: Preparation

### 0.1 Create Task Tracking File
```bash
# Create task.md in artifacts directory
```
Create and maintain `task.md` in the artifacts directory to track progress.

### 0.2 Backup Check
- [ ] Confirm git is clean: `git status`
- [ ] Create a feature branch: `git checkout -b feature/ib-unit-refactor`

### 0.3 Verify Build System Works
```bash
npm run build
npx serve public
# Verify site works at http://localhost:3000
```

---

## Phase 1: Directory Structure Creation

### 1.1 Create SL Directory Structure

// turbo
```bash
# Create all SL unit directories
mkdir -p public/ib/sl/unit-{1..12}/{slides,teacher}
```

### 1.2 Create HL Directory Structure

// turbo
```bash
# Create all HL unit directories
mkdir -p public/ib/hl/unit-{1..11}/{slides,teacher}
```

### 1.3 Verify Structure

// turbo
```bash
find public/ib/sl -type d | head -30
find public/ib/hl -type d | head -30
```

---

## Phase 2: Main Index Page Update

### 2.1 Update Main Site Index

**File**: `src/pages/index.njk`

Add a new card for "IB 2027" or update existing IB card to point to new structure.

**ACTION**: Edit `src/pages/index.njk` to add an "IB 2027 Curriculum" card alongside or replacing the existing IB card:

```html
<a href="ib-2027/index.html" class="card" id="card-ib-2027">
    <div class="card-icon"><i class="fa-solid fa-graduation-cap"></i></div>
    <h2 class="card-title">IB 2027 Curriculum</h2>
    <p class="card-desc">New unit-based learning for SL and HL students. First assessment 2027.</p>
</a>
```

### 2.2 Create IB 2027 Hub Page

**File**: `src/pages/ib-2027/index.njk` (NEW)

Create a hub page that offers two pathways: SL and HL.

```njk
---
layout: layouts/base.njk
title: "IB Computer Science 2027 - SGS Computer Science"
description: "IB Computer Science curriculum for first assessment 2027. Choose your pathway: Standard Level or Higher Level."
activeSection: "ib"
breadcrumbs:
  - { label: "Home", href: "index.html" }
  - { label: "IB 2027" }
---

<div class="hero-text">
    <h1 class="hero-title">IB Computer Science 2027</h1>
    <p class="hero-subtitle">Choose your pathway to begin your learning journey.</p>
</div>

<div class="cards-container pathway-cards">
    <a href="sl/index.html" class="card pathway-card" id="card-sl">
        <div class="card-icon"><i class="fa-solid fa-book"></i></div>
        <h2 class="card-title">Standard Level (SL)</h2>
        <p class="card-desc">12 units covering core computational thinking and programming.</p>
    </a>
    
    <a href="hl/index.html" class="card pathway-card" id="card-hl">
        <div class="card-icon"><i class="fa-solid fa-brain"></i></div>
        <h2 class="card-title">Higher Level (HL)</h2>
        <p class="card-desc">11 units with advanced topics including ADTs, recursion, and ML.</p>
    </a>
</div>
```

### 2.3 Build and Verify

```bash
npm run build
# Verify new page exists at public/ib-2027/index.html
```

---

## Phase 3: SL Index and Unit Landing Pages

### 3.1 Create SL Index Page

**File**: `src/pages/ib-2027/sl/index.njk` (NEW)

```njk
---
layout: layouts/base.njk
title: "IB Computer Science SL - SGS Computer Science"
description: "Standard Level IB Computer Science units for first assessment 2027."
activeSection: "ib"
breadcrumbs:
  - { label: "Home", href: "index.html" }
  - { label: "IB 2027", href: "ib-2027/index.html" }
  - { label: "Standard Level" }
extraStyles:
  - "css/resource-style.css"
---

<div class="hero-text">
    <h1 class="hero-title">Standard Level (SL)</h1>
    <p class="hero-subtitle">12 units covering the IB CS SL curriculum.</p>
</div>

<div class="papers-wrapper">
    <section class="paper-section">
        <div class="paper-header">
            <h2 class="paper-title">Year 12</h2>
            <p class="paper-subtitle">Foundation Units</p>
        </div>
        <ul class="topic-list">
            <li>
                <a href="unit-1/index.html" class="topic-item">
                    <span class="topic-number">Unit 1</span>
                    <span class="topic-name">Computational Thinking</span>
                    <i class="fa-solid fa-chevron-right topic-arrow"></i>
                </a>
            </li>
            <li>
                <a href="unit-2/index.html" class="topic-item">
                    <span class="topic-number">Unit 2</span>
                    <span class="topic-name">Programming Fundamentals</span>
                    <i class="fa-solid fa-chevron-right topic-arrow"></i>
                </a>
            </li>
            <li>
                <a href="unit-3/index.html" class="topic-item">
                    <span class="topic-number">Unit 3</span>
                    <span class="topic-name">Data Structures & Logic</span>
                    <i class="fa-solid fa-chevron-right topic-arrow"></i>
                </a>
            </li>
            <li>
                <a href="unit-4/index.html" class="topic-item">
                    <span class="topic-number">Unit 4</span>
                    <span class="topic-name">Algorithmic Control</span>
                    <i class="fa-solid fa-chevron-right topic-arrow"></i>
                </a>
            </li>
            <li>
                <a href="unit-5/index.html" class="topic-item">
                    <span class="topic-number">Unit 5</span>
                    <span class="topic-name">The OOP Paradigm</span>
                    <i class="fa-solid fa-chevron-right topic-arrow"></i>
                </a>
            </li>
            <li>
                <a href="unit-6/index.html" class="topic-item">
                    <span class="topic-number">Unit 6</span>
                    <span class="topic-name">Data & Information</span>
                    <i class="fa-solid fa-chevron-right topic-arrow"></i>
                </a>
            </li>
        </ul>
    </section>
    
    <section class="paper-section">
        <div class="paper-header">
            <h2 class="paper-title">Year 13</h2>
            <p class="paper-subtitle">Advanced & Exam Prep</p>
        </div>
        <ul class="topic-list">
            <li>
                <a href="unit-7/index.html" class="topic-item">
                    <span class="topic-number">Unit 7</span>
                    <span class="topic-name">Machine Intelligence</span>
                    <i class="fa-solid fa-chevron-right topic-arrow"></i>
                </a>
            </li>
            <li>
                <a href="unit-8/index.html" class="topic-item">
                    <span class="topic-number">Unit 8</span>
                    <span class="topic-name">The IA Cycle</span>
                    <i class="fa-solid fa-chevron-right topic-arrow"></i>
                </a>
            </li>
            <li>
                <a href="unit-9/index.html" class="topic-item">
                    <span class="topic-number">Unit 9</span>
                    <span class="topic-name">Computer Systems</span>
                    <i class="fa-solid fa-chevron-right topic-arrow"></i>
                </a>
            </li>
            <li>
                <a href="unit-10/index.html" class="topic-item">
                    <span class="topic-number">Unit 10</span>
                    <span class="topic-name">Binary Logic & Circuits</span>
                    <i class="fa-solid fa-chevron-right topic-arrow"></i>
                </a>
            </li>
            <li>
                <a href="unit-11/index.html" class="topic-item">
                    <span class="topic-number">Unit 11</span>
                    <span class="topic-name">Global Networking</span>
                    <i class="fa-solid fa-chevron-right topic-arrow"></i>
                </a>
            </li>
            <li>
                <a href="unit-12/index.html" class="topic-item">
                    <span class="topic-number">Unit 12</span>
                    <span class="topic-name">Case Study Inquiry</span>
                    <i class="fa-solid fa-chevron-right topic-arrow"></i>
                </a>
            </li>
        </ul>
    </section>
</div>
```

### 3.2 Create SL Unit Index Template

For each SL unit (`unit-1` through `unit-12`), create an index page.

**File Pattern**: `src/pages/ib-2027/sl/unit-X/index.njk`

**Template Structure**:
```njk
---
layout: layouts/base.njk
title: "SL Unit X: [UNIT_NAME] - SGS Computer Science"
description: "[UNIT_DESCRIPTION]"
activeSection: "ib"
breadcrumbs:
  - { label: "Home", href: "index.html" }
  - { label: "IB 2027", href: "ib-2027/index.html" }
  - { label: "SL", href: "ib-2027/sl/index.html" }
  - { label: "Unit X" }
extraStyles:
  - "css/resource-style.css"
---

<div class="hero-text">
    <h1 class="hero-title">Unit X: [UNIT_NAME]</h1>
    <p class="hero-subtitle">[UNIT_SUBTITLE] | [DURATION]</p>
</div>

<div class="arcade-grid">
    <a href="unit-plan.html" class="game-card">
        <img src="{{ basePath }}images/specification_thumb.png" alt="Unit Plan" class="game-thumb">
        <div class="game-info">
            <h3 class="game-title">Unit Plan</h3>
        </div>
    </a>
    
    <a href="flashcards.html" class="game-card">
        <img src="{{ basePath }}images/flashcards_thumb.png" alt="Flashcards" class="game-thumb">
        <div class="game-info">
            <h3 class="game-title">Flashcards</h3>
        </div>
    </a>
</div>

<div class="resource-section">
    <div class="resource-header">
        <h2 class="resource-title">Content Slides</h2>
        <div class="resource-line"></div>
    </div>
    
    <div class="resource-grid">
        <!-- SLIDE DECKS GO HERE - PLACEHOLDER -->
        <div class="placeholder-message">
            <p><i class="fa-solid fa-hammer"></i> Content slides coming soon.</p>
        </div>
    </div>
</div>

<div class="resource-section">
    <div class="resource-header">
        <h2 class="resource-title">Teacher Resources</h2>
        <div class="resource-line"></div>
    </div>
    
    <div class="resource-grid">
        <a href="teacher/index.html" class="resource-btn">
            <span class="resource-number"><i class="fa-solid fa-chalkboard-user"></i></span>
            <div class="resource-info">
                <span class="resource-name">Teacher Hub</span>
                <span class="resource-type">Slides, Activities, Assessments</span>
            </div>
            <i class="fa-solid fa-arrow-right resource-arrow"></i>
        </a>
    </div>
</div>
```

### 3.3 SL Unit Data Reference

Use this data when creating unit pages:

| Unit | Name | IB Refs | Duration |
|------|------|---------|----------|
| 1 | Computational Thinking | B1 | 2 weeks |
| 2 | Programming Fundamentals | B2.1 | 3 weeks |
| 3 | Data Structures & Logic | B2.2 | 3 weeks |
| 4 | Algorithmic Control | B2.3, B2.4, B2.5 | 4 weeks |
| 5 | The OOP Paradigm | B3.1 | 3 weeks |
| 6 | Data & Information | A3.1, A3.2, A3.3 | 3 weeks |
| 7 | Machine Intelligence | A4.1, A4.4 | 3 weeks |
| 8 | The IA Cycle | Criteria A-E | 6 weeks |
| 9 | Computer Systems | A1.1 | 2 weeks |
| 10 | Binary Logic & Circuits | A1.2, A1.3 | 3 weeks |
| 11 | Global Networking | A2.1-A2.4 | 3 weeks |
| 12 | Case Study Inquiry | Case Study | 2 weeks |

---

## Phase 4: HL Index and Unit Landing Pages

### 4.1 Create HL Index Page

**File**: `src/pages/ib-2027/hl/index.njk` (NEW)

Same structure as SL index, but with HL units.

### 4.2 HL Unit Data Reference

| Unit | Name | IB Refs | Duration |
|------|------|---------|----------|
| 1 | Advanced Architecture | A1.1, A1.4 | 3 weeks |
| 2 | Systems Control | A1.3 | 2 weeks |
| 3 | Recursive Problem Solving | B2.4 | 3 weeks |
| 4 | Professional OOP Design | B3.2 | 3 weeks |
| 5 | Scalable Data Systems | A3.3, A3.4 | 3 weeks |
| 6 | Abstract Data Types | B4.1 | 7 weeks |
| 7 | ML Preprocessing & Math | A4.2, A4.3 | 3 weeks |
| 8 | Supervised & Unsupervised | A4.3 | 3 weeks |
| 9 | Agents & Neural Computing | A4.3 | 3 weeks |
| 10 | The HL Case Study | Case Study | 4 weeks |
| 11 | Advanced Networking | A2.1-A2.4 | 3 weeks |

---

## Phase 5: Unit Plan Pages (Student-Friendly Specifications)

### 5.1 Create Unit Plan Template

**File Pattern**: `src/pages/ib-2027/[sl|hl]/unit-X/unit-plan.njk`

This replaces the old `specification.html`. It should be **student-friendly** with:
- Clear learning objectives
- Key terminology list
- What you'll learn (content overview)
- Prerequisites
- Lesson breakdown (simplified)

**DO NOT INCLUDE**:
- Adaptive strategies
- TOK connections (unless student-relevant)
- Teacher-specific language

**Template Structure**:
```njk
---
layout: layouts/base.njk
title: "Unit Plan: [UNIT_NAME] - SGS Computer Science"
description: "Student-friendly overview of [UNIT_NAME]."
activeSection: "ib"
breadcrumbs:
  - { label: "Home", href: "index.html" }
  - { label: "IB 2027", href: "ib-2027/index.html" }
  - { label: "SL", href: "ib-2027/sl/index.html" }
  - { label: "Unit X", href: "ib-2027/sl/unit-X/index.html" }
  - { label: "Unit Plan" }
extraStyles:
  - "css/specification.css"
---

<div class="hero-text">
    <h1 class="hero-title">Unit X: [UNIT_NAME]</h1>
    <p class="hero-subtitle">Your roadmap for this unit</p>
</div>

<div class="content-box">
    <h2><i class="fa-solid fa-bullseye"></i> What You'll Learn</h2>
    <ul>
        <li>[LEARNING_OBJECTIVE_1]</li>
        <li>[LEARNING_OBJECTIVE_2]</li>
        <li>[LEARNING_OBJECTIVE_3]</li>
    </ul>
</div>

<div class="content-box">
    <h2><i class="fa-solid fa-book"></i> Key Terminology</h2>
    <p>These are the key terms you need to master in this unit:</p>
    <div class="term-grid">
        <span class="term">[TERM_1]</span>
        <span class="term">[TERM_2]</span>
        <!-- etc -->
    </div>
</div>

<div class="content-box">
    <h2><i class="fa-solid fa-road"></i> Journey Overview</h2>
    <table class="lesson-table">
        <thead>
            <tr>
                <th>Part</th>
                <th>Focus</th>
                <th>Duration</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Part 1</td>
                <td>[TOPIC_1]</td>
                <td>X lessons</td>
            </tr>
            <!-- etc -->
        </tbody>
    </table>
</div>

<div class="content-box">
    <h2><i class="fa-solid fa-lightbulb"></i> Watch Out For</h2>
    <p>Common misconceptions to avoid:</p>
    <ul>
        <li>[MISCONCEPTION_1]</li>
        <li>[MISCONCEPTION_2]</li>
    </ul>
</div>
```

### 5.2 Content Extraction Process

For each unit plan page:
1. Open the corresponding `.docx` file from `docs/content/ib-content/Unit Plans/[SL|HL]/`
2. Extract:
   - **Content** section → "What You'll Learn"
   - **Terminology** section → "Key Terminology"
   - **Learning Overview** table → "Journey Overview"
   - **Misconceptions** section → "Watch Out For"
3. Rewrite in student-friendly language (avoid teacher jargon)

---

## Phase 6: Flashcard System

### 6.1 Create Flashcard Pages

For each unit, create a `flashcards.html` page that:
- Uses the existing `flashcards.css` and `flashcards.js`
- Loads a local `questions.json` file

**File Pattern**: `public/ib-2027/[sl|hl]/unit-X/flashcards.html`

**Template** (copy from `public/igcse/topic1/flashcards.html` and modify):
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unit X Flashcards | IB CS SL</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../../../css/flashcards.css">
</head>
<body>

    <div class="nav-overlay">
        <a href="index.html" class="nav-btn"><i class="fa-solid fa-arrow-left"></i> Back to Unit</a>
    </div>

    <div class="game-container">
        <div class="top-bar">
            <div id="progressText">Card 1 of 50</div>
            <div style="display: flex; gap: 10px;">
                <button class="restart-btn" onclick="shuffleRemaining()"><i class="fa-solid fa-shuffle"></i> Shuffle</button>
                <button class="restart-btn" onclick="fullReset()"><i class="fa-solid fa-rotate"></i> Restart</button>
            </div>
        </div>

        <div class="card-scene" onclick="flip()">
            <div class="card" id="flashcard">
                <div class="card-face card-front">
                    <div class="card-label">Question</div>
                    <div class="card-content" id="qText">Loading...</div>
                    <div style="margin-top:30px; color:#ccc; font-size:0.8rem"><i class="fa-solid fa-hand-pointer"></i> Tap to flip</div>
                </div>
                <div class="card-face card-back">
                    <div class="card-label">Answer</div>
                    <div class="card-content" id="aText">...</div>
                </div>
            </div>
        </div>

        <div class="controls-area">
            <div class="pile pile-unknown" id="pileUnknown" title="Cards to review">
                <div class="pile-count" id="countUnknown">0</div>
                <div>To Learn</div>
            </div>

            <div class="feedback-container" id="feedbackBtns">
                <button class="action-btn btn-miss" onclick="rateCard('miss', event)" title="Still Learning"><i class="fa-solid fa-xmark"></i></button>
                <button class="action-btn btn-got" onclick="rateCard('got', event)" title="I Know This"><i class="fa-solid fa-check"></i></button>
            </div>

            <div class="pile pile-known" id="pileKnown" title="Mastered cards">
                <div class="pile-count" id="countKnown">0</div>
                <div>Mastered</div>
            </div>
        </div>
    </div>

    <script src="../../../js/flashcards.js"></script>
</body>
</html>
```

### 6.2 Create Placeholder Questions.json Files

For each unit, create a `questions.json` with placeholder content:

**File Pattern**: `public/ib-2027/[sl|hl]/unit-X/questions.json`

```json
[
    {
        "q": "Placeholder question 1 for Unit X",
        "a": "Placeholder answer 1"
    },
    {
        "q": "Placeholder question 2 for Unit X",
        "a": "Placeholder answer 2"
    }
]
```

**CONTENT NOTE**: Real flashcard content should be extracted from:
1. The **Terminology** section of each Unit Plan
2. Key concepts from the relevant textbook PDF chapters

---

## Phase 7: Teacher Resources Section

### 7.1 Create Teacher Hub Page

**File Pattern**: `src/pages/ib-2027/[sl|hl]/unit-X/teacher/index.njk`

```njk
---
layout: layouts/base.njk
title: "Teacher Resources: Unit X - SGS Computer Science"
description: "Teacher resources for Unit X."
activeSection: "ib"
breadcrumbs:
  - { label: "Home", href: "index.html" }
  - { label: "IB 2027", href: "ib-2027/index.html" }
  - { label: "SL", href: "ib-2027/sl/index.html" }
  - { label: "Unit X", href: "ib-2027/sl/unit-X/index.html" }
  - { label: "Teacher Resources" }
extraStyles:
  - "css/resource-style.css"
---

<div class="hero-text">
    <h1 class="hero-title">Teacher Resources</h1>
    <p class="hero-subtitle">Unit X: [UNIT_NAME]</p>
</div>

<div class="resource-section">
    <div class="resource-header">
        <h2 class="resource-title">Slide Decks</h2>
        <div class="resource-line"></div>
    </div>
    
    <div class="resource-grid">
        <!-- LINKS TO SLIDE DECKS GO HERE -->
        <div class="placeholder-message">
            <p><i class="fa-solid fa-hammer"></i> Slide decks coming soon.</p>
        </div>
    </div>
</div>

<div class="resource-section">
    <div class="resource-header">
        <h2 class="resource-title">Activities</h2>
        <div class="resource-line"></div>
    </div>
    
    <div class="resource-grid">
        <a href="activities.html" class="resource-btn">
            <span class="resource-number"><i class="fa-solid fa-puzzle-piece"></i></span>
            <div class="resource-info">
                <span class="resource-name">Unit Activities</span>
                <span class="resource-type">Interactive learning tasks</span>
            </div>
            <i class="fa-solid fa-arrow-right resource-arrow"></i>
        </a>
    </div>
</div>

<div class="resource-section">
    <div class="resource-header">
        <h2 class="resource-title">Assessments</h2>
        <div class="resource-line"></div>
    </div>
    
    <div class="resource-grid">
        <a href="assessments.html" class="resource-btn">
            <span class="resource-number"><i class="fa-solid fa-clipboard-check"></i></span>
            <div class="resource-info">
                <span class="resource-name">Unit Assessments</span>
                <span class="resource-type">Quizzes & Tests</span>
            </div>
            <i class="fa-solid fa-arrow-right resource-arrow"></i>
        </a>
    </div>
</div>
```

### 7.2 Create Placeholder Activities and Assessments Pages

Create placeholder pages for `activities.html` and `assessments.html`.

---

## Phase 8: Slide Deck Creation (CONTENT PHASE)

> **NOTE**: This phase requires content creation. Execute AFTER skeleton is complete.

### 8.1 Slide Deck Workflow

For each unit, create multiple smaller slide decks based on the lesson breakdown in the Unit Plan.

**Naming Convention**: `part-X-[topic-slug].html`

**Example for SL Unit 1 (Computational Thinking)**:
- `part-1-problem-specification.html` (Lessons 1-2)
- `part-2-pillars-of-ct.html` (Lesson 3)
- `part-3-patterns-design.html` (Lesson 4)
- `part-4-flowcharting-tracing.html` (Lessons 5-6)

### 8.2 Slide Deck Content Guidelines

Use the existing `/generate_slides` workflow for each deck:
1. Extract content from relevant textbook PDF (e.g., `B1.pdf` for Computational Thinking)
2. Follow the IB slide structure from `docs/IB_GUIDE.md`
3. Apply these principles from the Unit Plan:
   - **Inquiry-based**: Start with questions, not answers
   - **Keywords in red**: Use `<span class="keyword">` for key terms
   - **Formative checks**: Include True/False or quick check slides
   - **Plenary**: Address misconceptions from Unit Plan

### 8.3 Back Button Path Update

Slide decks should link back to the unit index:
```html
<a href="../index.html" id="back-btn" title="Back" class="back-nav">
    <i class="fa-solid fa-circle-arrow-left"></i>
</a>
```

---

## Phase 9: Build and Test

### 9.1 Build All Templates

```bash
npm run build
```

### 9.2 Verify All Pages

```bash
npx serve public
```

**Manual Verification Checklist**:
- [ ] `/ib-2027/index.html` shows SL and HL cards
- [ ] `/ib-2027/sl/index.html` lists all 12 units
- [ ] `/ib-2027/hl/index.html` lists all 11 units
- [ ] Each unit index page loads correctly
- [ ] Flashcard pages load and show placeholder questions
- [ ] Breadcrumb navigation works correctly
- [ ] No broken links or 404s

---

## Phase 10: Commit and Deploy

### 10.1 Commit Changes

```bash
git add -A
git commit -m "feat(ib): Add unit-based curriculum structure for IB 2027 (SL/HL)"
git push origin feature/ib-unit-refactor
```

### 10.2 Create Pull Request

Create a PR from `feature/ib-unit-refactor` to `main` for review.

---

## Appendix A: Complete SL Unit List

| Unit | Full Name | IB Spec | Duration | Key Content |
|------|-----------|---------|----------|-------------|
| 1 | Computational Thinking | B1 | 2 weeks | Problem specification, 4 pillars, flowcharts |
| 2 | Programming Fundamentals | B2.1 | 3 weeks | Variables, types, operations, input/output |
| 3 | Data Structures & Logic | B2.2 | 3 weeks | Static/dynamic, lists, stack, queue |
| 4 | Algorithmic Control | B2.3-B2.5 | 4 weeks | Selection, iteration, functions, file processing |
| 5 | The OOP Paradigm | B3.1 | 3 weeks | Classes, objects, encapsulation, inheritance |
| 6 | Data & Information | A3.1-A3.3 | 3 weeks | Databases, SQL, data integrity |
| 7 | Machine Intelligence | A4.1, A4.4 | 3 weeks | AI basics, ethics, applications |
| 8 | The IA Cycle | Criteria A-E | 6 weeks | Internal Assessment project |
| 9 | Computer Systems | A1.1 | 2 weeks | Hardware, CPU, memory |
| 10 | Binary Logic & Circuits | A1.2-A1.3 | 3 weeks | Binary, hex, logic gates, OS |
| 11 | Global Networking | A2.1-A2.4 | 3 weeks | Networks, protocols, security |
| 12 | Case Study Inquiry | Case Study | 2 weeks | Annual case study analysis |

---

## Appendix B: Complete HL Unit List

| Unit | Full Name | IB Spec | Duration | Key Content |
|------|-----------|---------|----------|-------------|
| 1 | Advanced Architecture | A1.1, A1.4 | 3 weeks | Extended CPU, translation |
| 2 | Systems Control | A1.3 | 2 weeks | Control systems, embedded |
| 3 | Recursive Problem Solving | B2.4 | 3 weeks | Recursion, call stack |
| 4 | Professional OOP Design | B3.2 | 3 weeks | Design patterns, polymorphism |
| 5 | Scalable Data Systems | A3.3-A3.4 | 3 weeks | Big data, distributed systems |
| 6 | Abstract Data Types | B4.1 | 7 weeks | Linked lists, BST, hash tables |
| 7 | ML Preprocessing & Math | A4.2-A4.3 | 3 weeks | Data prep, algorithms |
| 8 | Supervised & Unsupervised | A4.3 | 3 weeks | ML types, training |
| 9 | Agents & Neural Computing | A4.3 | 3 weeks | Neural networks, agents |
| 10 | The HL Case Study | Case Study | 4 weeks | HL-specific analysis |
| 11 | Advanced Networking | A2.1-A2.4 | 3 weeks | HL network extensions |

---

## Appendix C: File Path Quick Reference

### Source Templates (Edit These)
```
src/pages/ib-2027/
├── index.njk                      # Hub page
├── sl/
│   ├── index.njk                  # SL unit list
│   └── unit-X/
│       ├── index.njk              # Unit landing
│       ├── unit-plan.njk          # Student spec
│       └── teacher/
│           └── index.njk          # Teacher hub
└── hl/
    └── [same structure]
```

### Output Files (Generated)
```
public/ib-2027/
├── index.html
├── sl/
│   ├── index.html
│   └── unit-X/
│       ├── index.html
│       ├── unit-plan.html
│       ├── flashcards.html        # STANDALONE (not generated)
│       ├── questions.json         # STANDALONE
│       └── teacher/
│           └── index.html
└── hl/
    └── [same structure]
```

### Standalone Files (Edit Directly)
- `public/ib-2027/[sl|hl]/unit-X/flashcards.html`
- `public/ib-2027/[sl|hl]/unit-X/questions.json`
- `public/ib-2027/[sl|hl]/unit-X/slides/*.html` (slide decks)

---

## Appendix D: CSS Path Reference

Flashcard pages should use:
```html
<link rel="stylesheet" href="../../../css/flashcards.css">
```

Slide decks should use:
```html
<link rel="stylesheet" href="../../../../css/slide-deck.css">
```

---

## Notes for AI Agent Execution

1. **Execute phases sequentially** - Do not skip phases
2. **Build after template changes** - Always run `npm run build`
3. **Test locally first** - Use `npx serve public` before committing
4. **Standalone files** - Flashcards and slide decks are NOT generated from Nunjucks
5. **Content comes later** - Phase 8 (slide decks) requires separate content creation sessions
6. **Python examples only** - All code examples must be Python, not Java

---

**END OF WORKFLOW**
