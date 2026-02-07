# IGCSE Development Guide (Years 10-11)

> **Purpose:** Complete guide for creating IGCSE Computer Science content including slide decks and self-marking assessments.

---

## Table of Contents

1. [Student Profile](#student-profile)
2. [Writing Guidelines](#writing-guidelines)
3. [Slide Deck Creation](#slide-deck-creation)
4. [Assessment Creation](#assessment-creation)
5. [Keyword System](#keyword-system)
6. [File Locations](#file-locations)

---

## Student Profile

### Who Are IGCSE Students?

| Year | Age | Characteristics |
|------|-----|-----------------|
| Year 10 | 14-15 | Starting IGCSE course, building technical foundations |
| Year 11 | 15-16 | Exam preparation, consolidating knowledge |

**Key traits:**
- Completing Cambridge IGCSE 0478/0984
- Mixed ability with some strong programmers
- External exam pressure; need exam technique
- Can handle abstraction with support
- Preparing for A-Level/IB progression

---

## Writing Guidelines

For complete language and tone guidelines, see [`agent_content.md`](./curriculum%20content%20guides/agent_content.md) (IGCSE section).

### Quick Reference

| Aspect | Guideline |
|--------|-----------|
| **Sentence length** | 12-20 words typical |
| **Vocabulary** | Technical terms from syllabus with definitions |
| **Tone** | Academic but accessible, exam-focused |
| **Questions** | "Explain...", "Describe...", "Compare..." |
| **Analogies** | Helpful but note limitations |

### Exam Command Terms

| Command | Meaning | Marks |
|---------|---------|-------|
| **State** | Brief answer | 1 |
| **Identify** | Name or recognise | 1 |
| **Describe** | Give characteristics | 2-3 |
| **Explain** | Give reasons/how/why | 2-4 |
| **Compare** | Similarities and differences | 2-4 |
| **Discuss** | Different views/aspects | 4-6 |

---

## Slide Deck Creation

> **📖 Also read:** [`REVEAL_TECHNIQUES.md`](./REVEAL_TECHNIQUES.md) for making slides engaging with fragments, vertical slides, r-stack, and more.

### Core Philosophy

**The slide deck is BASELINE CONTENT DELIVERY — not activities.**

A slide deck is:
- **Enquiry-first** — every concept starts with a question
- **Complete syllabus coverage** — every syllabus point for the topic, nothing missed
- **Informative and engaging** — interesting facts, "Did you know?", real-world links
- **Formative questioning** — checks for understanding throughout
- **Fun and curiosity-driven** — fosters love of learning

A slide deck is **NOT**:
- ❌ Activities or tasks for students to complete
- ❌ Worksheets or "do this now" instructions
- ❌ Independent practice exercises
- ❌ Group work or pair activities

> **Think of it as:** An expert teacher delivering fascinating content through questions, stories, and connections — not setting homework.

---

### The Enquiry-First Rule

Every concept must be introduced through a question, not a statement.

❌ **Wrong approach:**
> "RAM stands for Random Access Memory. It is volatile memory that stores data temporarily."

✅ **Enquiry-first approach:**
> "You're working on an essay. The power cuts out. Your work is gone. But your saved files are still there. Why did one survive and not the other?"
> 
> *[Fragment reveals]* "The answer lies in understanding volatile vs non-volatile memory..."

---

### Content Engagement Techniques

Make content memorable through:

| Technique | Example |
|-----------|---------|
| **Did you know?** | "Did you know the first hard drive held only 5MB and weighed over a ton?" |
| **Real-world link** | "This is how Netflix streams video to millions simultaneously" |
| **Historical context** | "Before packet switching, phone calls needed a dedicated wire end-to-end" |
| **Future connection** | "We'll see this concept again when we study encryption in Topic 5" |
| **Past connection** | "Remember when we learned about binary? This is where it matters" |
| **Surprising fact** | "A single Google search uses more computing power than the Apollo 11 moon landing" |
| **Analogy** | "Think of RAM like a desk — you can only work on what's currently on it" |

---

### Formative Questioning (Not Activities)

Include questions throughout to **check understanding** — not to create tasks.

✅ **Good formative question:**
> "Based on what we just learned, which would be faster: reading from RAM or reading from an SSD?"
> *[Fragment reveals answer and explanation]*

❌ **This is an activity (don't include):**
> "Now complete the worksheet matching storage types to their characteristics"

✅ **Good check for understanding:**
> "If a file is 2GB and your RAM is 4GB, can the whole file be loaded? Why might this matter?"

❌ **This is a task (don't include):**
> "Calculate how many MP3 files fit on a 16GB USB drive"

---

### Syllabus Coverage Rule

**Every slide deck must cover ALL syllabus points for that topic.**

Before creating a slide deck:
1. Read the syllabus specification for that topic
2. List every bullet point that must be covered
3. Ensure each point appears in the deck
4. Check nothing is missed

The slide deck is the **baseline teaching material**. Students should be able to learn everything required for the exam from this content alone.

---

### Standard Deck Structure

Every IGCSE slide deck follows this sequence:

#### 1. Title Slide (Required)

Every deck starts with a title slide:

```html
<section>
    <div class="title-container">
        <div class="title-line-top"></div>
        <div>
            <h1 class="main-title">X.X Topic Name</h1>
            <h3 class="sub-title">Topic X: Category | Engaging Subtitle</h3>
        </div>
        <div class="title-line-bottom"></div>
    </div>
</section>
```

#### 2. Keywords (Red Highlighting) — CRITICAL!

All syllabus keywords appear in **red with click-to-define modals**. 

**⚠️ IMPORTANT: Keywords are NOT automatic!** You must run the keyword script after creating/editing any IGCSE HTML file:

```bash
python3 scripts/apply_igcse_keywords.py
```

This script:
1. Reads keywords from `docs/content/igcse/chapter-text-files/Chapter X key words.txt`
2. Finds matching terms in all IGCSE HTML files
3. Wraps them in `<span class="keyword" data-def="...">` tags
4. Clicking a keyword shows a popup modal with the definition

**Workflow:**
1. Create your slide deck HTML
2. Run `python3 scripts/apply_igcse_keywords.py`
3. Refresh browser to see red keywords

See [Keyword System](#keyword-system) for full details.

#### 3. Retrieval Practice (Skip for first lesson)

3-5 questions from previous topics in a vertical stack:

```html
<section>
    <section data-background="#e6f0fa">
        <h3><i class="fa-solid fa-brain"></i> Retrieval Practice</h3>
        <div class="box-blue">
            <p class="small-text">Recall what we learned before moving on.</p>
        </div>
        <ol style="font-size:1.1em; line-height:1.6;">
            <li>Question 1</li>
            <li>Question 2</li>
            <li>Question 3</li>
        </ol>
        <p class="small-text"><i class="fa-solid fa-arrow-down"></i> Press Down for answers</p>
    </section>
    
    <section>
        <h3>Question 1</h3>
        <div class="question-box">Question text</div>
        <div class="fragment box-blue">
            <p><strong>Answer:</strong> Answer text</p>
        </div>
    </section>
</section>
```

#### 4. The Hook (Big Question)

Create curiosity and establish relevance:

```html
<section>
    <h2>The Big Question</h2>
    <div class="question-box">
        <p style="font-size:1.2em;">Engaging question that creates curiosity</p>
    </div>
    <div class="cols fragment">
        <div class="box-blue">
            <h4><i class="fa-solid fa-question"></i> The Problem</h4>
            <p>Real-world context</p>
        </div>
        <div class="box">
            <h4><i class="fa-solid fa-lightbulb"></i> The Solution</h4>
            <p>How CS addresses it</p>
        </div>
    </div>
</section>
```

#### 5. Concept Sections

Each concept follows this pattern:

**A. Introduction with Question:**
```html
<div class="question-box">What question does this concept answer?</div>
```

**B. Key Term Definition:**
```html
<div class="key-term fragment">
    <h3>Term Name</h3>
    <p>Clear, concise definition</p>
</div>
```

**C. Analogy:**
```html
<div class="fragment box">
    <p class="small-text"><strong>Analogy:</strong> Real-world comparison</p>
    <p class="small-text"><em>How it relates</em></p>
</div>
```

**D. Deep Dive (Vertical Slide):**
```html
<section>
    <section>
        <!-- Main slide with indicator -->
        <div style="text-align:center;">
            <i class="fa-solid fa-arrow-down blue"></i>
            <span class="small-text blue">Deep Dive: Topic</span>
        </div>
    </section>
    <section data-background="#f4f6f8">
        <h3>Deep Dive: Topic</h3>
        <!-- Detailed content -->
    </section>
</section>
```

#### 6. True/False Misconception Check (Required at End)

**Every slide deck ends with a True/False misconception check.** This targets common student errors and exam pitfalls.

Design these statements to:
- Address common misconceptions about the topic
- Test edge cases students often get wrong
- Prepare students for exam trick questions

```html
<section>
    <section>
        <h2><i class="fa-solid fa-check-double"></i> True or False?</h2>
        <div class="box-blue"><p>Misconception Check</p></div>
        <ol>
            <li>"Statement 1"</li>
            <li>"Statement 2"</li>
            <li>"Statement 3"</li>
        </ol>
        <p class="small-text"><i class="fa-solid fa-arrow-down"></i> Press Down for answers</p>
    </section>
    
    <section>
        <h3>Question 1</h3>
        <div class="question-box">"Statement 1"</div>
        <div class="fragment box-blue">
            <p><strong>Answer: False</strong></p>
            <hr style="border-color: rgba(255,255,255,0.3);">
            <p>Explanation of why</p>
        </div>
    </section>
</section>
```

---

### Transformation Rules

#### Definitions
❌ Wrong: Title "What is RAM?" → Bullet: "RAM is volatile memory..."

✅ Right:
1. Present a puzzle: "Power cuts out. You lose your work. Why?"
2. Invite speculation
3. Reveal the concept as the solution
4. Then formalize with definition

#### Lists
❌ Wrong: Bulleted list of advantages

✅ Right:
- Group into categories (Cost, Speed, Convenience)
- Use scenario matching
- Force evaluation, not just reading

#### Processes
❌ Wrong: Numbered list of steps

✅ Right:
- Show diagram first
- Trace step-by-step with fragments
- Use vertical slides for detail
- Pause: "What happens next?"

#### Abstract Concepts
❌ Wrong: Technical diagram with labels

✅ Right:
- Always use analogies:
  - RAM = Desk workspace
  - HDD = Filing cabinet
  - Packet Switching = Mailing pages separately
- Ask: "Where does this analogy break down?"

---

### Component Library

#### Layout Boxes
```html
<div class="box">White box</div>
<div class="box-blue">Blue box</div>
<div class="question-box">Question container</div>
<div class="key-term">Keyword definition</div>
```

#### Grid Layouts
```html
<div class="cols">2 columns</div>
<div class="cols-3">3 columns</div>
```

#### Fragments
```html
<div class="fragment">Appears on click</div>
<div class="fragment fade-in-then-out">Disappears for next</div>
```

#### R-Stack (Layered Reveal)
```html
<div class="r-stack">
    <div class="fragment fade-in-then-out">First</div>
    <div class="fragment fade-in-then-out">Second</div>
    <div class="fragment fade-in">Final (stays)</div>
</div>
```

---

### Slide Deck Checklist

**Before building a deck:**
```
□ Read syllabus specification for this topic
□ List ALL syllabus points to cover
□ Check no points are missed
```

**Content rules:**
```
□ Title slide present
□ Every concept introduced with a question (enquiry-first)
□ NO activities or tasks — content delivery only
□ Formative questions check understanding (not "do this")
□ Analogies used for abstract concepts
□ Interesting facts / "Did you know?" / real-world links
□ Connections to past and future topics
□ All syllabus keywords will appear in red (auto-applied)
□ True/False misconception check at end
```

**Technical:**
```
□ Fragments reveal progressively
□ No walls of text
□ Vertical slides for complex topics
□ npm run build completes (if using .njk templates)
□ ⚠️ python3 scripts/apply_igcse_keywords.py — MUST RUN!
□ Refresh browser and verify keywords are RED
□ Click keywords to test modal popups work
□ Test full slide deck in browser
```

---

## Assessment Creation

### Overview

Self-marking assessments are interactive HTML quizzes that:
- Automatically validate answers
- Track attempts per question (internal)
- Require ALL correct before completion
- Generate PDF feedback reports
- Support student reflection

### Design Principles

- **10-15 questions** with multiple parts
- **Variety of question types** (at least 4 different types)
- **Shuffled answers** each session
- **Immediate visual feedback** (green/red)
- **Retryable** until all correct

---

### Question Types Catalogue

#### 1. Dropdown Selection (Cloze)
Best for: Vocabulary, definitions, completing sentences

```html
<div class="cloze-text">
    A <select id="q1a" data-answer="buffer"></select> temporarily stores data.
</div>
```

#### 2. True/False Grid
Best for: Factual recall, misconceptions

```html
<div class="tf-grid" id="tf-grid">
    <div class="tf-header">Statement</div>
    <div class="tf-header">True</div>
    <div class="tf-header">False</div>
    <!-- Rows populated by JavaScript -->
</div>
```

#### 3. Drag & Drop Categorisation
Best for: Classification, sorting into groups

```html
<div class="draggable-source" id="q-source"></div>
<div class="bucket-container">
    <div class="bucket" id="bucket-a"><h4>Category A</h4></div>
    <div class="bucket" id="bucket-b"><h4>Category B</h4></div>
</div>
```

#### 4. Sortable Ordering
Best for: Sequences, processes, algorithms

```html
<ul class="sortable-list" id="order-list">
    <!-- Items populated shuffled by JavaScript -->
</ul>
```

#### 5. Click-to-Match Pairs
Best for: Definitions, matching terms to meanings

```html
<div class="match-grid">
    <div class="col-defs" id="col-defs"></div>
    <div class="col-terms" id="col-terms"></div>
</div>
```

#### 6. Multiple Choice (Single)
Best for: Factual recall, single correct answer

```html
<div class="mcq-options" id="q-options">
    <!-- Options populated shuffled by JavaScript -->
</div>
```

#### 7. Multi-Select Checkboxes
Best for: "Select all that apply"

```html
<div class="checkbox-options" id="q-options">
    <!-- Checkboxes populated by JavaScript -->
</div>
```

#### 8. Numeric Input
Best for: Calculations, conversions

```html
<input type="text" id="q-input" class="numeric-input" 
       placeholder="Enter answer" autocomplete="off">
```

#### 9. Truth Table
Best for: Logic gates, Boolean algebra

```html
<table class="truth-table">
    <thead>
        <tr><th>A</th><th>B</th><th>Output</th></tr>
    </thead>
    <tbody id="truth-table-body"></tbody>
</table>
```

#### 10. Code Trace
Best for: Programming, algorithm understanding

```html
<div class="code-block">
    <pre><code>x = 5
y = x + 3
print(y)</code></pre>
</div>
<input type="text" id="q-output" class="output-input" data-answer="8">
```

---

### Assessment Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta, fonts, Font Awesome, jsPDF -->
    <style>/* CSS Variables and styles */</style>
</head>
<body>
    <!-- Start Modal -->
    <div id="startOverlay">
        <select id="teacherSelect">...</select>
        <button onclick="startAssessment()">Start</button>
    </div>
    
    <!-- Timer -->
    <div id="timerDisplay"><span id="timer">00:00</span></div>
    
    <!-- Navigation -->
    <a href="index.html" id="back-btn">...</a>
    
    <!-- Header -->
    <header>Assessment Title</header>
    
    <!-- Questions (hidden until start) -->
    <main style="display:none;">
        <div class="question-block" id="q1-block">
            <div class="q-header">
                <span>Q1. Title</span>
                <span class="q-status" id="q1-status">Unanswered</span>
            </div>
            <!-- Question content -->
        </div>
        <!-- More questions -->
        
        <!-- Submit -->
        <div class="controls">
            <button onclick="checkAnswers()">Submit Answers</button>
            <div id="finalScore"></div>
            <div id="completionMessage"></div>
        </div>
    </main>

    <script>
        // Tracking variables
        // Question data arrays
        // Initialization functions
        // Checking functions
        // PDF generation
    </script>
</body>
</html>
```

---

### PDF Generation

Assessments generate feedback PDFs with:
- Page 1: All questions with correct answers
- Page 2: Feedback table with attempt counts
- Editable teacher comment box
- Student reflection section

```javascript
async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Page 1: Answers
    questionMeta.forEach((q, idx) => {
        doc.text(`Q${idx + 1}. ${q.title}`, margin, yPos);
        doc.text(`Answer: ${q.correctAnswer}`, margin + 4, yPos + 6);
    });
    
    // Page 2: Feedback
    doc.addPage();
    // Table with attempts
    // Editable fields
    
    doc.save(`${testName}_Feedback.pdf`);
}
```

---

### Assessment Checklist

```
□ 10-15 questions with variety
□ At least 4 different question types
□ All answers shuffled on load
□ Visual feedback (green/red) works
□ Completion triggers PDF download
□ PDF has both pages
□ Editable fields work in PDF
□ Back button links correctly
□ Timer starts on begin
□ All questions have unique IDs
```

---

## Keyword System

> ⚠️ **This is a CRITICAL step!** All IGCSE slide decks MUST have keywords highlighted in red with click-to-define modals.

### What Are Keywords?

Syllabus terms that appear in **red** with a dashed underline. When clicked, a modal popup shows the definition.

### How It Works

1. **Keyword definitions** are stored in `docs/content/igcse/chapter-text-files/Chapter X key words.txt`
2. **The script** (`scripts/apply_igcse_keywords.py`) finds these terms in your HTML
3. **Wraps them** in `<span class="keyword" data-def="definition">term</span>`
4. **The CSS** makes them red, bold, and clickable
5. **The JS** (`slide-deck.js`) shows the modal when clicked

### Keyword File Format

Each line: `term – definition` (note the en-dash, not hyphen)

```
internet – the world-wide interconnection of networks; the internet makes use of TCP and IP protocols
World Wide Web – a massive collection of web pages and is based on hypertext transfer protocols (http and https)
cookie – a text file sent from a website to a user's browser; it is used to remember user preferences each time they visit the website
```

### Applying Keywords — MUST DO!

**After creating or editing ANY IGCSE HTML file:**

```bash
python3 scripts/apply_igcse_keywords.py
```

This:
- Scans all HTML files in `public/igcse/topic*/`
- Matches keywords for each topic (Chapter 1 keywords for Topic 1, etc.)
- Wraps matching terms with the keyword span
- Updates files in place

**On deployment:** This runs automatically via GitHub Actions, but you MUST run it locally to see keywords during development.

### Verifying Keywords Work

After running the script:
1. Refresh your browser (hard refresh: `Cmd+Shift+R`)
2. Look for **red terms** in the slide deck
3. Click a red term — a modal should appear with the definition
4. If no red terms appear, check the keyword file exists for that chapter

### CSS Styling

```css
.keyword {
    color: var(--sg-red) !important;
    cursor: pointer;
    font-weight: bold;
    border-bottom: 1px dashed var(--sg-red);
}
```

---

## File Locations

| Resource | Location |
|----------|----------|
| Slide templates | `src/templates/layouts/slide-deck.njk` |
| Page sources | `src/pages/igcse/` |
| Output HTML | `public/igcse/` |
| Slide CSS | `public/css/slide-deck.css`, `igcse-deck.css` |
| Slide JS | `public/js/slide-deck.js` |
| Keyword script | `scripts/apply_igcse_keywords.py` |
| Source content | `docs/content/igcse/` |
| Slide plans | `docs/plans/` |
| Assessment template | `docs/templates/igcse/assessment-template.md` |

---

## Reference Examples

### Slide Decks
- `public/igcse/topic1/1.1_number_representation.html`
- `public/igcse/topic2/2.1_data_transmission.html`
- `public/igcse/topic3/3.1_computer_architecture.html`
- `public/igcse/topic4/4.1_types_of_software_and_interrupts.html`

### Assessments
- `public/igcse/topic4/4.1_assessment.html`
- `public/igcse/topic4/4.2_assessment.html`

---

## Topic-Specific Question Ideas

### Topic 1: Data Representation
| Type | Example |
|------|---------|
| Binary Grid | Convert decimal to 8-bit binary |
| Numeric Input | Calculate file size |
| Dropdown | Complete conversion steps |

### Topic 2: Data Transmission
| Type | Example |
|------|---------|
| Matching | Protocols to functions |
| Categorisation | TCP vs UDP |
| Sortable | Packet transmission steps |

### Topic 3: Hardware
| Type | Example |
|------|---------|
| Matching | CPU components to functions |
| Sortable | Fetch-Execute cycle |
| Categorisation | Input vs Output devices |

### Topic 4: Software
| Type | Example |
|------|---------|
| Categorisation | System vs Application |
| True/False | Compiler vs Interpreter |
| Sortable | Interrupt handling sequence |

### Topic 5: Internet & WWW
| Type | Example |
|------|---------|
| Matching | HTML tags to purposes |
| Dropdown | URL components |
| Sortable | DNS resolution steps |

### Topic 6: Automated Systems
| Type | Example |
|------|---------|
| Matching | Sensors to applications |
| Categorisation | Sensors vs Actuators |
| Multiple Choice | ADC/DAC scenarios |

### Topic 7: Algorithms
| Type | Example |
|------|---------|
| Sortable | Algorithm steps |
| Code Trace | Variable values |
| Matching | Flowchart symbols |

### Topic 8: Programming
| Type | Example |
|------|---------|
| Code Trace | Output prediction |
| Categorisation | Data types |
| Multi-Select | Valid variable names |

### Topic 9: Databases
| Type | Example |
|------|---------|
| SQL Building | SELECT queries |
| Matching | SQL keywords |
| Categorisation | Primary vs Foreign keys |

### Topic 10: Boolean Logic
| Type | Example |
|------|---------|
| Truth Table | Gate outputs |
| Matching | Gate symbols to names |
| Multiple Choice | Equivalent expressions |
