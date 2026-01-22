# IB Slide Deck Creation Plan

> Legacy task plan: For current project rules and build workflow, start with `docs/agent/AGENT_GUIDE.md`.

> **Purpose:** Complete instructions for creating IB Computer Science slide decks from scratch, following the same high-quality, enquiry-first style as the upgraded IGCSE decks.

---

## Table of Contents

1. [Overview](#overview)
2. [Required Reading](#required-reading)
3. [Source Content](#source-content)
4. [Folder & File Structure](#folder--file-structure)
5. [Complete Slide Deck List](#complete-slide-deck-list)
6. [IB-Specific Requirements](#ib-specific-requirements)
7. [Slide Deck Template](#slide-deck-template)
8. [Keyword System for IB](#keyword-system-for-ib)
9. [Step-by-Step Creation Process](#step-by-step-creation-process)
10. [Quality Checklist](#quality-checklist)
11. [Example Agent Prompt](#example-agent-prompt)
12. [Progress Tracker](#progress-tracker)

---

## Overview

### What We're Building

A complete set of IB Computer Science slide decks covering:
- **Strand A:** A1, A2, A3, A4 (Computer Fundamentals, Networks, Databases, Machine Learning)
- **Strand B:** B1, B2, B3, B4 (Computational Thinking, Programming, OOP, ADTs)

### Key Principles

| Principle | Description |
|-----------|-------------|
| **Enquiry-First** | Every concept starts with a question, not a statement |
| **No Activities** | Content delivery only — no tasks, worksheets, or "do this now" |
| **Engaging** | "Did you know?", real-world examples, connections to other topics |
| **HL Marked** | Higher Level content clearly labeled with `<span class="hl-badge">HL</span>` |
| **Keywords** | Technical terms in red with click-to-define modals |
| **Reveal.js** | Full use of fragments, r-stack, vertical slides, auto-animate |

### Style Reference

Use the upgraded IGCSE slide deck as your gold standard:
```
public/igcse/topic5/5.1_the_internet_and_the_www_v2.html
```

---

## Required Reading

Before creating ANY IB slide deck, read these documents:

| Document | Path | Purpose |
|----------|------|---------|
| **IB Guide** | `docs/IB_GUIDE.md` | IB-specific requirements, HL/SL, command terms |
| **IGCSE Guide** | `docs/IGCSE_GUIDE.md` | Core slide deck philosophy (same applies to IB) |
| **Reveal Techniques** | `docs/REVEAL_TECHNIQUES.md` | All Reveal.js techniques with code |
| **Content Writing** | `docs/curriculum content guides/agent_content.md` | IB writing style (academic, rigorous) |
| **Upgrade Task** | `docs/IGCSE_SLIDE_UPGRADE_TASK.md` | Transformation patterns to apply |

---

## Source Content

### Educator Guides (Condensed)

These HTML files contain the key concepts, terminology, and HL extensions:

| File | Topic | Status |
|------|-------|--------|
| `docs/content/ib/textbooks/IB Text AI/A1.html` | Computer Fundamentals | ✅ Complete |
| `docs/content/ib/textbooks/IB Text AI/A2.html` | Networks | ✅ Complete |
| `docs/content/ib/textbooks/IB Text AI/A3.html` | Databases | ⬜ Empty |
| `docs/content/ib/textbooks/IB Text AI/A4.html` | Machine Learning | ⬜ Empty |
| `docs/content/ib/textbooks/IB Text AI/B1.html` | Computational Thinking | ✅ Partial |
| `docs/content/ib/textbooks/IB Text AI/B2.html` | Programming | ⬜ Empty |
| `docs/content/ib/textbooks/IB Text AI/B3.html` | OOP | ✅ Complete |
| `docs/content/ib/textbooks/IB Text AI/B4.html` | ADTs (HL) | ⬜ Empty |

### Full Textbook Extracts

For complete content, refer to:

| File | Lines | Topic |
|------|-------|-------|
| `docs/content/ib/textbooks/A1.txt` | ~10,000 | Computer Fundamentals |
| `docs/content/ib/textbooks/A2.txt` | ~TBD | Networks |
| `docs/content/ib/textbooks/A3.txt` | ~TBD | Databases |
| `docs/content/ib/textbooks/A4.txt` | ~8,800 | Machine Learning |
| `docs/content/ib/textbooks/B1.txt` | ~800 | Computational Thinking |
| `docs/content/ib/textbooks/B2.txt` | ~10,500 | Programming |
| `docs/content/ib/textbooks/B3.txt` | ~TBD | OOP |
| `docs/content/ib/textbooks/B4.txt` | ~13,200 | ADTs (HL) |

---

## Folder & File Structure

### Target Directory Structure

```
public/ib/
├── index.html                          # IB landing page
│
├── A1/                                 # Computer Fundamentals
│   ├── index.html                      # A1 topic index
│   ├── A1.1_computer_hardware.html     # Slide deck
│   ├── A1.2_data_representation.html   # Slide deck
│   ├── A1.3_operating_systems.html     # Slide deck (HL expanded)
│   └── A1.4_translation.html           # Slide deck (HL)
│
├── A2/                                 # Networks
│   ├── index.html
│   ├── A2.1_network_fundamentals.html
│   ├── A2.2_network_architecture.html
│   ├── A2.3_data_transmission.html
│   └── A2.4_network_security.html
│
├── A3/                                 # Databases
│   ├── index.html
│   ├── A3.1_database_fundamentals.html
│   ├── A3.2_database_design.html
│   ├── A3.3_database_programming.html
│   └── A3.4_alternative_databases.html
│
├── A4/                                 # Machine Learning
│   ├── index.html
│   ├── A4.1_introduction_to_ml.html
│   ├── A4.2_supervised_learning.html
│   ├── A4.3_unsupervised_learning.html
│   └── A4.4_neural_networks.html
│
├── B1/                                 # Computational Thinking
│   ├── index.html
│   ├── B1.1_problem_specification.html
│   ├── B1.2_computational_thinking.html
│   ├── B1.3_flowcharts_pseudocode.html
│   └── B1.4_algorithm_design.html
│
├── B2/                                 # Programming
│   ├── index.html
│   ├── B2.1_programming_fundamentals.html
│   ├── B2.2_control_structures.html
│   ├── B2.3_procedures_functions.html
│   └── B2.4_file_handling.html
│
├── B3/                                 # OOP
│   ├── index.html
│   ├── B3.1_oop_fundamentals.html
│   ├── B3.2_inheritance_polymorphism.html  # (HL)
│   └── B3.3_design_patterns.html           # (HL)
│
└── B4/                                 # ADTs (HL only)
    ├── index.html
    ├── B4.1_stacks_queues.html
    ├── B4.2_linked_lists.html
    ├── B4.3_trees.html
    └── B4.4_recursion.html
```

### File Naming Convention

```
[Topic].[Subtopic]_[descriptive_name].html

Examples:
- A1.1_computer_hardware.html
- B3.2_inheritance_polymorphism.html
```

---

## Complete Slide Deck List

### Strand A: Core Concepts

#### A1: Computer Fundamentals
| Code | Title | Level | Source |
|------|-------|-------|--------|
| A1.1 | Computer Hardware & Operation | SL/HL | A1.html section 1 |
| A1.2 | Data Representation & Logic | SL/HL | A1.html section 2 |
| A1.3 | Operating Systems & Control Systems | SL/HL + HL ext | A1.html section 3 |
| A1.4 | Translation | HL | A1.html section 4 |

#### A2: Networks
| Code | Title | Level | Source |
|------|-------|-------|--------|
| A2.1 | Network Fundamentals | SL/HL | A2.html section 1 |
| A2.2 | Network Architecture | SL/HL | A2.html section 2 |
| A2.3 | Data Transmission | SL/HL + HL ext | A2.html section 3 |
| A2.4 | Network Security | SL/HL + HL ext | A2.html section 4 |

#### A3: Databases
| Code | Title | Level | Source |
|------|-------|-------|--------|
| A3.1 | Database Fundamentals | SL/HL | A3.txt |
| A3.2 | Database Design | SL/HL | A3.txt |
| A3.3 | Database Programming | SL/HL | A3.txt |
| A3.4 | Alternative Databases | HL | A3.txt |

#### A4: Machine Learning
| Code | Title | Level | Source |
|------|-------|-------|--------|
| A4.1 | Introduction to ML | SL/HL | A4.txt |
| A4.2 | Supervised Learning | SL/HL | A4.txt |
| A4.3 | Unsupervised & Reinforcement | SL/HL | A4.txt |
| A4.4 | Neural Networks & Deep Learning | HL | A4.txt |

### Strand B: Practical Skills

#### B1: Computational Thinking
| Code | Title | Level | Source |
|------|-------|-------|--------|
| B1.1 | Problem Specification | SL/HL | B1.html, B1.txt |
| B1.2 | Computational Thinking Pillars | SL/HL | B1.html section 2 |
| B1.3 | Flowcharts & Pseudocode | SL/HL | B1.html section 4 |
| B1.4 | Algorithm Design | SL/HL | B1.txt |

#### B2: Programming
| Code | Title | Level | Source |
|------|-------|-------|--------|
| B2.1 | Programming Fundamentals | SL/HL | B2.txt |
| B2.2 | Control Structures | SL/HL | B2.txt |
| B2.3 | Procedures & Functions | SL/HL | B2.txt |
| B2.4 | File Handling | SL/HL | B2.txt |

#### B3: Object-Oriented Programming
| Code | Title | Level | Source |
|------|-------|-------|--------|
| B3.1 | OOP Fundamentals | SL/HL | B3.html section 1 |
| B3.2 | Inheritance & Polymorphism | HL | B3.html section 2 |
| B3.3 | Design Patterns | HL | B3.html section 3 |

#### B4: Abstract Data Types (HL Only)
| Code | Title | Level | Source |
|------|-------|-------|--------|
| B4.1 | Stacks & Queues | HL | B4.txt |
| B4.2 | Linked Lists | HL | B4.txt |
| B4.3 | Trees & Binary Search Trees | HL | B4.txt |
| B4.4 | Recursion | HL | B4.txt |

**Total: ~31 slide decks to create**

---

## IB-Specific Requirements

### 1. HL Content Marking

Always mark Higher Level content clearly:

```html
<section>
    <h3><span class="hl-badge">HL</span> Pipelining</h3>
    <p>This content is for Higher Level students only.</p>
</section>
```

CSS for HL badge (add to IB stylesheet):
```css
.hl-badge {
    background: var(--sg-gold);
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.7em;
    vertical-align: middle;
    margin-right: 8px;
}
```

### 2. IB Command Terms

Use correct IB command terms in formative questions:

| Command | Marks | Example |
|---------|-------|---------|
| **Define** | 1 | "Define the term 'encapsulation'" |
| **State** | 1 | "State two types of network" |
| **Outline** | 2-3 | "Outline the fetch-execute cycle" |
| **Describe** | 2-3 | "Describe the purpose of a cache" |
| **Explain** | 3-4 | "Explain how TCP ensures reliable delivery" |
| **Compare** | 4 | "Compare symmetric and asymmetric encryption" |
| **Evaluate** | 5-6 | "Evaluate the use of recursion vs iteration" |
| **Discuss** | 5-6 | "Discuss the ethical implications of AI" |

### 3. Complexity Analysis (for B4)

For ADT and algorithm topics, always include:

```html
<div class="box-blue fragment">
    <h4>Complexity Analysis</h4>
    <p><strong>Time:</strong> O(n) — linear traversal</p>
    <p><strong>Space:</strong> O(1) — no additional storage</p>
</div>
```

### 4. Academic Register

IB writing is more formal than IGCSE:

| IGCSE Style | IB Style |
|-------------|----------|
| "RAM is like your desk" | "RAM serves as the CPU's working memory, analogous to a workspace" |
| "It's super fast!" | "Access times are measured in nanoseconds" |
| "The CPU does three things" | "The processor executes a cyclic process comprising fetch, decode, and execute phases" |

### 5. Connections Across Syllabus

IB exams often ask about connections. Explicitly link topics:

```html
<div class="fragment box">
    <p><strong>🔗 Connection to A2:</strong> The TCP/IP model we studied in Networks 
    is implemented using sockets in this programming context.</p>
</div>
```

---

## Slide Deck Template

### HTML Skeleton for IB Slide Decks

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>{{CODE}} {{TITLE}} | IB Computer Science</title>

    <!-- Reveal.js CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reset.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/theme/white.min.css">

    <!-- Highlight.js (for code) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="../../css/slide-deck.css">
</head>
<body>
    <!-- Navigation -->
    <a href="index.html" id="back-btn" title="Back to {{TOPIC}}" class="back-nav">
        <i class="fa-solid fa-circle-arrow-left"></i>
    </a>
    <img src="../../images/Logo.png" id="sg-logo" alt="Logo">
    <div class="footer-text live-date" id="live-date-display"></div>
    <div class="footer-text course-footer">IB Computer Science</div>

    <div class="reveal">
        <div class="slides">

            <!-- 1. TITLE SLIDE -->
            <section>
                <div class="title-container">
                    <div class="title-line-top"></div>
                    <div>
                        <h1 class="main-title">{{CODE}} {{TITLE}}</h1>
                        <h3 class="sub-title">{{STRAND}}: {{TOPIC}} | {{SUBTITLE}}</h3>
                    </div>
                    <div class="title-line-bottom"></div>
                </div>
            </section>

            <!-- 2. RETRIEVAL PRACTICE (if not first lesson) -->
            <section>
                <section data-background="#e6f0fa">
                    <h3><i class="fa-solid fa-brain"></i> Retrieval Practice</h3>
                    <div class="box-blue">
                        <p class="small-text">Recall from {{PREVIOUS_TOPIC}} before we continue.</p>
                    </div>
                    <ol style="font-size:1.1em; line-height:1.6;">
                        <li>Question 1</li>
                        <li>Question 2</li>
                        <li>Question 3</li>
                    </ol>
                    <p class="small-text"><i class="fa-solid fa-arrow-down"></i> Press Down for answers</p>
                </section>
                <!-- Vertical slides for each answer -->
            </section>

            <!-- 3. THE HOOK (R-Stack) -->
            <section>
                <h2>The Big Question</h2>
                <div class="r-stack">
                    <div class="fragment fade-in-then-out">
                        <div class="question-box">
                            <p style="font-size:1.3em;">🤔 Engaging question...</p>
                        </div>
                    </div>
                    <div class="fragment fade-in-then-out">
                        <div class="box" style="background: #ffebee;">
                            <p>❌ Common misconception...</p>
                        </div>
                    </div>
                    <div class="fragment fade-in">
                        <div class="box-blue">
                            <p>✅ The key insight...</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 4+ CONCEPT SECTIONS -->
            <!-- Each concept: Question → Definition → Analogy → Deep Dive (vertical) -->

            <!-- QUICK CHECKS (throughout) -->

            <!-- HL SECTIONS (clearly marked) -->
            <section>
                <h3><span class="hl-badge">HL</span> Advanced Topic</h3>
                <!-- HL content -->
            </section>

            <!-- TRUE/FALSE MISCONCEPTION CHECK -->
            <section>
                <section>
                    <h2><i class="fa-solid fa-check-double"></i> Misconception Check</h2>
                    <!-- Statements -->
                </section>
                <!-- Vertical slides for answers -->
            </section>

            <!-- SUMMARY SLIDE -->
            <section data-background="linear-gradient(135deg, #0E214B 0%, #1a3a7a 100%)">
                <h2 style="color: white;">Key Takeaways</h2>
                <!-- Summary content -->
                <div class="box" style="background: rgba(255,255,255,0.1); color: white;">
                    <p><strong>Coming up:</strong> {{NEXT_TOPIC}}</p>
                </div>
            </section>

        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/plugin/highlight/highlight.min.js"></script>
    <script src="../../js/slide-deck.js"></script>
</body>
</html>
```

---

## Keyword System for IB

### Creating IB Keyword Files

Create keyword files for each strand:

```
docs/content/ib/keywords/
├── A1_keywords.txt
├── A2_keywords.txt
├── A3_keywords.txt
├── A4_keywords.txt
├── B1_keywords.txt
├── B2_keywords.txt
├── B3_keywords.txt
└── B4_keywords.txt
```

### Keyword File Format

```
term – definition text
ALU – Arithmetic Logic Unit: Performs calculations and logical comparisons
encapsulation – Bundling data and methods into a single unit and restricting direct access
polymorphism – The ability of different classes to be treated as instances of the same superclass
```

### Extract Keywords From Source

From each `IB Text AI/*.html` file, extract terms from the terminology tables:

```html
<!-- Source -->
<tr><td><strong>ALU</strong></td><td>Arithmetic Logic Unit: Performs calculations...</td></tr>

<!-- Convert to -->
ALU – Arithmetic Logic Unit: Performs calculations and logical comparisons
```

### Apply Keywords Script

Modify or create `public/ib/apply_ib_keywords.py` following the same pattern as the IGCSE script.

---

## Step-by-Step Creation Process

### For Each Slide Deck:

#### Phase 1: Preparation
1. **Read the source content**
   - Primary: `docs/content/ib/textbooks/IB Text AI/{{TOPIC}}.html`
   - Full: `docs/content/ib/textbooks/{{TOPIC}}.txt`

2. **Extract keywords** for this section
   - Add to `docs/content/ib/keywords/{{TOPIC}}_keywords.txt`

3. **Identify HL content** that needs marking

4. **Note connections** to other IB topics

#### Phase 2: Creation
5. **Copy the template** from above

6. **Fill in placeholders:**
   - `{{CODE}}`: e.g., "A1.1"
   - `{{TITLE}}`: e.g., "Computer Hardware & Operation"
   - `{{STRAND}}`: e.g., "Strand A"
   - `{{TOPIC}}`: e.g., "Computer Fundamentals"

7. **Build the hook** (r-stack with misconception)

8. **Create concept sections** using patterns from `REVEAL_TECHNIQUES.md`:
   - Question first
   - Key term definition
   - Analogy (if helpful)
   - Deep dive (vertical slide)
   - "Did you know?" facts

9. **Add quick checks** (2-3 throughout)

10. **Mark HL content** with `<span class="hl-badge">HL</span>`

11. **Add connections** to other topics

12. **Create True/False** misconception check

13. **Add summary slide**

#### Phase 3: Finalization
14. **Run keyword script:**
    ```bash
    python3 public/ib/apply_ib_keywords.py
    ```

15. **Test in browser:**
    - All fragments work
    - Keywords are red and clickable
    - HL badges display correctly
    - No overflow issues

16. **Verify syllabus coverage:**
    - Cross-check with source content
    - Ensure no key concepts missing

---

## Quality Checklist

### Before Submitting Each Slide Deck:

**Content:**
- [ ] All syllabus points from source are covered
- [ ] HL content is clearly marked
- [ ] Keywords extracted and added to keyword file
- [ ] Connections to other topics included
- [ ] IB command terms used correctly

**Engagement:**
- [ ] Hook uses r-stack myth-busting pattern
- [ ] At least 2 "Did you know?" facts
- [ ] At least 2 Quick Check slides throughout
- [ ] Comparisons use r-stack/cols
- [ ] Progressive reveals (not one-point-per-slide)

**Technical:**
- [ ] Follows HTML template structure
- [ ] All fragments work correctly
- [ ] Vertical slides have "Press Down" indicators
- [ ] Summary slide with gradient background
- [ ] Keyword script run successfully
- [ ] No JavaScript console errors
- [ ] No content overflow

**IB-Specific:**
- [ ] Academic register (formal language)
- [ ] Complexity analysis for algorithms (B4)
- [ ] HL badge CSS works
- [ ] Links back to topic index

---

## Agent Prompt: Full IB Slide Deck Creation

> **Copy everything below this line and paste to your AI agent.**

---

# 🎯 TASK: Create IB Computer Science Slide Decks

You are creating **IB Computer Science slide decks from scratch** following an established style guide.

---

## 📋 CRITICAL RULES (Read First!)

1. **ONE slide deck per SUBTOPIC** — Create `A1.1`, `A1.2`, etc. NOT one deck for all of A1
2. **Follow the IGCSE style** — The IB decks use the SAME engaging patterns as upgraded IGCSE decks
3. **Enquiry-first, NO activities** — Content delivery only. No "now do this" or worksheets
4. **Checkpoint after each deck** — STOP and report before moving to the next
5. **Log everything** — Update the changelog after every action

---

## 📖 REQUIRED READING (Before Starting)

Read these files IN ORDER before creating any slide deck:

| Priority | File | What to Learn |
|----------|------|---------------|
| 1 | `docs/IB_SLIDE_CREATION_PLAN.md` | Full instructions, file structure, template |
| 2 | `docs/IGCSE_GUIDE.md` | Core philosophy: enquiry-first, no activities |
| 3 | `docs/REVEAL_TECHNIQUES.md` | ALL Reveal.js patterns with code examples |
| 4 | `docs/IGCSE_SLIDE_UPGRADE_TASK.md` | Transformation patterns (r-stack, fragments, etc.) |
| 5 | `docs/IB_GUIDE.md` | IB-specific: HL marking, command terms |
| 6 | `docs/curriculum content guides/agent_content.md` | Writing style for IB students |

**GOLD STANDARD REFERENCE:**
```
public/igcse/topic5/5.1_the_internet_and_the_www_v2.html
```
Study this file. Your IB decks should match this quality and engagement level.

---

## 📁 SOURCE CONTENT LOCATIONS

### Educator Guides (Condensed, use first)
```
docs/content/ib/textbooks/IB Text AI/A1.html  → A1.1, A1.2, A1.3, A1.4
docs/content/ib/textbooks/IB Text AI/A2.html  → A2.1, A2.2, A2.3, A2.4
docs/content/ib/textbooks/IB Text AI/B1.html  → B1.1, B1.2, B1.3, B1.4
docs/content/ib/textbooks/IB Text AI/B3.html  → B3.1, B3.2, B3.3
```

### Full Textbooks (For deeper detail)
```
docs/content/ib/textbooks/A1.txt  (~10,000 lines)
docs/content/ib/textbooks/A2.txt
docs/content/ib/textbooks/B1.txt
... etc
```

---

## 🔄 WORKFLOW: Phase-by-Phase with Checkpoints

### PHASE 0: Setup (One-time)
```
□ Create folder structure: public/ib/A1/, A2/, A3/, A4/, B1/, B2/, B3/, B4/
□ Create changelog file: docs/IB_CHANGELOG.md
□ Create keyword directory: docs/content/ib/keywords/
□ CHECKPOINT: Report folder structure created
```

### PHASE 1: For Each Slide Deck

#### Step 1.1: Planning (5 mins)
```
□ Read educator guide section for this subtopic
□ Read relevant part of full textbook
□ List ALL syllabus points that MUST be covered
□ Identify which content is HL (Higher Level)
□ Extract keywords → add to keyword file
□ Note connections to other topics
```

**⏸️ CHECKPOINT 1:** Report your plan before creating:
```markdown
## Planning: [CODE] [TITLE]
- Syllabus points to cover: [list]
- HL content identified: [list]
- Keywords extracted: [count]
- Connections to: [topics]
- Estimated slides: [number]

Ready to proceed? [WAIT FOR APPROVAL]
```

#### Step 1.2: Creation (15-20 mins)
```
□ Copy HTML template from IB_SLIDE_CREATION_PLAN.md
□ Fill in metadata (CODE, TITLE, STRAND, etc.)
□ Create Title Slide
□ Create Retrieval Practice (if not first in topic)
□ Create Hook (r-stack myth-busting pattern)
□ Create concept sections with:
   - Question first (enquiry)
   - Definition with keyword
   - Analogy if helpful
   - Deep dive (vertical slide)
   - "Did you know?" facts
□ Add Quick Checks (2-3 throughout, NOT at end only)
□ Mark ALL HL content with <span class="hl-badge">HL</span>
□ Add cross-topic connections
□ Create True/False misconception check
□ Create Summary slide with gradient background
□ Save file to correct location
```

#### Step 1.3: Verification (5 mins)
```
□ Count slides — is it comprehensive?
□ Check all syllabus points covered
□ Verify HL content is marked
□ Check fragments work logically
□ Verify no content overflow
□ Run keyword script (if available)
□ Update changelog
```

**⏸️ CHECKPOINT 2:** Report completion:
```markdown
## Completed: [CODE] [TITLE]
- File: [path]
- Total slides: [number]
- Syllabus coverage: [✅ All points / ⚠️ Missing: X]
- HL sections: [count]
- Keywords added: [count]
- Engagement techniques used: [list]
- Issues encountered: [any problems]

Ready for review? [WAIT FOR APPROVAL or NEXT DECK]
```

---

## 📝 CHANGELOG FORMAT

Create and maintain: `docs/IB_CHANGELOG.md`

```markdown
# IB Slide Deck Creation Changelog

## Session: [DATE]

### [TIMESTAMP] - Setup
- Created folder structure: public/ib/A1/, A2/, ...
- Created keyword directory
- Files created: [list]

### [TIMESTAMP] - A1.1 Computer Hardware
- **Status:** ✅ Complete
- **File:** public/ib/A1/A1.1_computer_hardware.html
- **Slides:** 24
- **Syllabus Coverage:** All points from A1.html section 1
- **HL Content:** Pipelining (3 slides)
- **Keywords Added:** 12 (ALU, CU, MAR, MDR, PC, IR, AC, Bus, Register, Cache, Core, Pipeline)
- **Techniques Used:** r-stack hook, auto-animate FDE cycle, vertical deep dives, 3 quick checks
- **Connections:** Links to A1.2 (data representation in registers)
- **Issues:** None
- **Time:** 18 minutes

### [TIMESTAMP] - A1.2 Data Representation
- **Status:** 🔄 In Progress
- **Notes:** ...

### [TIMESTAMP] - Issue Encountered
- **Problem:** [Description]
- **File:** [path]
- **Resolution:** [what was done]
```

---

## 📊 SLIDE DECK ORDER

Create in this order (topics with complete educator guides first):

### Batch 1: A1 Computer Fundamentals
1. `A1.1_computer_hardware.html`
2. `A1.2_data_representation.html`
3. `A1.3_operating_systems.html`
4. `A1.4_translation.html` (HL only)

### Batch 2: A2 Networks
5. `A2.1_network_fundamentals.html`
6. `A2.2_network_architecture.html`
7. `A2.3_data_transmission.html`
8. `A2.4_network_security.html`

### Batch 3: B3 OOP
9. `B3.1_oop_fundamentals.html`
10. `B3.2_inheritance_polymorphism.html` (HL)
11. `B3.3_design_patterns.html` (HL)

### Batch 4: B1 Computational Thinking
12. `B1.1_problem_specification.html`
13. `B1.2_computational_thinking.html`
14. `B1.3_flowcharts_pseudocode.html`
15. `B1.4_algorithm_design.html`

### Remaining (after educator guides created)
- A3: Databases (4 decks)
- A4: Machine Learning (4 decks)
- B2: Programming (4 decks)
- B4: ADTs - HL only (4 decks)

---

## 🎨 QUICK REFERENCE: Key Patterns

### The Hook (R-Stack)
```html
<section>
    <h2>The Big Question</h2>
    <div class="r-stack">
        <div class="fragment fade-in-then-out">
            <p style="font-size:1.5em;">🤔 What if computers could think?</p>
        </div>
        <div class="fragment fade-in-then-out">
            <div class="box" style="background:#ffebee;">
                <p>❌ Common myth: AI is conscious</p>
            </div>
        </div>
        <div class="fragment fade-in">
            <div class="box-blue">
                <p>✅ Reality: AI recognizes patterns in data</p>
            </div>
        </div>
    </div>
</section>
```

### HL Badge
```html
<section>
    <h3><span class="hl-badge">HL</span> Pipelining</h3>
    <!-- HL-only content -->
</section>
```

### Quick Check (Throughout)
```html
<section data-background="#fff3e0">
    <h3>🧠 Quick Check</h3>
    <p><strong>Explain</strong> why a multi-core processor doesn't always 
    run twice as fast as a single-core.</p>
    <p class="fragment box-blue">Software must be written to utilize 
    multiple cores (parallelization).</p>
</section>
```

### Connection Box
```html
<div class="fragment box">
    <p><strong>🔗 Connection to A2:</strong> These registers store 
    IP addresses when processing network packets.</p>
</div>
```

---

## ⚠️ COMMON MISTAKES TO AVOID

| Mistake | Correct Approach |
|---------|------------------|
| Creating one mega-deck for A1 | Create separate A1.1, A1.2, A1.3, A1.4 files |
| Adding activities/tasks | Content delivery ONLY — no "do this now" |
| One bullet per slide | Progressive reveal with fragments |
| Missing HL badges | EVERY HL section needs `<span class="hl-badge">HL</span>` |
| Quick checks only at end | Distribute 2-3 throughout the deck |
| Skipping the hook | EVERY deck starts with r-stack myth-busting |
| Not logging changes | Update changelog after EVERY deck |
| Moving to next deck without checkpoint | STOP and report after each completion |

---

## 🚀 START COMMAND

Begin with:

```
PHASE 0: Create the folder structure and changelog file.
Then proceed to A1.1 and report your plan at CHECKPOINT 1.
```

---

**END OF AGENT PROMPT**

---

## Progress Tracker

### Strand A: Core Concepts

| Code | Title | Status | Notes |
|------|-------|--------|-------|
| A1.1 | Computer Hardware & Operation | ⬜ Pending | |
| A1.2 | Data Representation & Logic | ⬜ Pending | |
| A1.3 | Operating Systems & Control Systems | ⬜ Pending | HL expanded |
| A1.4 | Translation | ⬜ Pending | HL only |
| A2.1 | Network Fundamentals | ⬜ Pending | |
| A2.2 | Network Architecture | ⬜ Pending | |
| A2.3 | Data Transmission | ⬜ Pending | HL expanded |
| A2.4 | Network Security | ⬜ Pending | HL expanded |
| A3.1 | Database Fundamentals | ⬜ Pending | Need educator guide |
| A3.2 | Database Design | ⬜ Pending | Need educator guide |
| A3.3 | Database Programming | ⬜ Pending | Need educator guide |
| A3.4 | Alternative Databases | ⬜ Pending | HL, need educator guide |
| A4.1 | Introduction to ML | ⬜ Pending | Need educator guide |
| A4.2 | Supervised Learning | ⬜ Pending | Need educator guide |
| A4.3 | Unsupervised & Reinforcement | ⬜ Pending | Need educator guide |
| A4.4 | Neural Networks | ⬜ Pending | HL, need educator guide |

### Strand B: Practical Skills

| Code | Title | Status | Notes |
|------|-------|--------|-------|
| B1.1 | Problem Specification | ⬜ Pending | |
| B1.2 | Computational Thinking Pillars | ⬜ Pending | |
| B1.3 | Flowcharts & Pseudocode | ⬜ Pending | |
| B1.4 | Algorithm Design | ⬜ Pending | |
| B2.1 | Programming Fundamentals | ⬜ Pending | Need educator guide |
| B2.2 | Control Structures | ⬜ Pending | Need educator guide |
| B2.3 | Procedures & Functions | ⬜ Pending | Need educator guide |
| B2.4 | File Handling | ⬜ Pending | Need educator guide |
| B3.1 | OOP Fundamentals | ⬜ Pending | |
| B3.2 | Inheritance & Polymorphism | ⬜ Pending | HL |
| B3.3 | Design Patterns | ⬜ Pending | HL |
| B4.1 | Stacks & Queues | ⬜ Pending | HL only |
| B4.2 | Linked Lists | ⬜ Pending | HL only |
| B4.3 | Trees & BST | ⬜ Pending | HL only |
| B4.4 | Recursion | ⬜ Pending | HL only |

### Infrastructure

| Task | Status | Notes |
|------|--------|-------|
| Create `public/ib/` folder structure | ⬜ Pending | |
| Create topic index pages | ⬜ Pending | |
| Create IB keyword files | ⬜ Pending | |
| Create `apply_ib_keywords.py` script | ⬜ Pending | |
| Add HL badge CSS to stylesheet | ⬜ Pending | |

---

## Summary

**Total slide decks to create: ~31**

**Prerequisites:**
1. Complete educator guides for A3, A4, B2, B4 (currently empty)
2. Create folder structure
3. Create keyword system for IB

**Recommended order:**
1. A1 (has complete educator guide)
2. A2 (has complete educator guide)
3. B3 (has complete educator guide)
4. B1 (has partial educator guide)
5. Then remaining topics as educator guides are completed

**Time estimate:** 
- Per slide deck: 15-25 mins
- Total: ~10-15 hours
