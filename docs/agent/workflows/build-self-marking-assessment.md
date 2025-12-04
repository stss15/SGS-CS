# Building Self-Marking IGCSE Assessments

## Complete Guide for AI Agents

This comprehensive guide provides everything needed to create self-marking subtopic assessments for IGCSE Computer Science. Follow each section precisely to ensure consistent, functional assessments that integrate with the GitHub Pages deployment.

---

## Table of Contents

1. [Overview & Purpose](#1-overview--purpose)
2. [File Structure & Deployment](#2-file-structure--deployment)
3. [Assessment Architecture](#3-assessment-architecture)
4. [Question Types Catalogue](#4-question-types-catalogue)
5. [Topic-Specific Question Ideas](#5-topic-specific-question-ideas)
6. [Complete Build Process](#6-complete-build-process)
7. [Tracking & Scoring System](#7-tracking--scoring-system)
8. [PDF Generation System](#8-pdf-generation-system)
9. [Validation & Quality Checklist](#9-validation--quality-checklist)
10. [Deployment & Integration](#10-deployment--integration)

---

## 1. Overview & Purpose

### What Are Self-Marking Assessments?

Self-marking assessments are interactive HTML-based quizzes that:
- Automatically validate student answers
- Track attempts per question (internal, not visible to student)
- Require ALL answers correct before completion
- Generate a comprehensive PDF feedback report
- Support student reflection and teacher feedback

### Design Principles

1. **10-15 questions** with multiple parts per question
2. **Variety of question types** to test different cognitive skills
3. **Shuffled answers** each session to prevent copying
4. **Immediate visual feedback** (green/red) on submission
5. **Retryable** - students keep trying until all correct
6. **No personal data** collected (GDPR compliant) - only teacher selection

### Target Assessments

Each IGCSE topic has subtopics, each requiring one assessment:
- `[N].1_assessment.html` - First subtopic
- `[N].2_assessment.html` - Second subtopic (if applicable)
- etc.

---

## 2. File Structure & Deployment

### Directory Structure

```
public/igcse/topic[N]/
├── index.html                      # Topic index (generated from Nunjucks)
├── [N].1_assessment.html           # Subtopic 1 assessment
├── [N].2_assessment.html           # Subtopic 2 assessment
├── assessments.html                # Assessment index page
└── Topic[N]_End_of_unit_Test.html  # Full unit test (different format)
```

### GitHub Pages Deployment

Assessments are static HTML files - no Nunjucks templating required. They deploy directly when pushed:

```bash
git add public/igcse/topic[N]/[N].X_assessment.html
git commit -m "Add [N].X assessment: [Topic Description]"
git push origin main
```

The GitHub Actions workflow will deploy automatically. No additional build steps needed for assessment files.

### Linking to Assessments

Update `src/pages/igcse/topic[N]/assessments.njk` to include links:

```yaml
resources:
  - name: "[N].1 Assessment"
    href: "[N].1_assessment.html"
    type: "Subtopic Assessment"
    icon: "fa-solid fa-clipboard-check"
```

---

## 3. Assessment Architecture

### HTML Structure Overview

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta, title, fonts, Font Awesome, jsPDF -->
    <style>
        /* All CSS variables and styles */
    </style>
</head>
<body>
    <!-- Start Modal (teacher selection) -->
    <div id="startOverlay">...</div>
    
    <!-- Timer Display -->
    <div id="timerDisplay">...</div>
    
    <!-- Navigation -->
    <a href="index.html" id="back-btn">...</a>
    <img src="../../images/Logo.png" id="sg-logo">
    
    <!-- Header -->
    <header>...</header>
    
    <!-- Main Content (hidden until start) -->
    <main style="display:none;">
        <!-- Question blocks -->
        <div class="question-block" id="q1-block">...</div>
        <div class="question-block" id="q2-block">...</div>
        <!-- ... more questions ... -->
        
        <!-- Submit controls -->
        <div class="controls">
            <button class="btn-submit" onclick="checkAnswers()">Submit Answers</button>
            <div id="finalScore"></div>
            <div class="completion-message" id="completionMessage">...</div>
        </div>
    </main>

    <script>
        // All JavaScript: tracking, question logic, PDF generation
    </script>
</body>
</html>
```

### Required CSS Variables

```css
:root {
    --sg-blue: #003366;
    --sg-gold: #D4AF37;
    --sg-text: #333333;
    --sg-light-blue: #e6f0fa;
    --sg-grey: #f4f6f8;
    --correct-green: #28a745;
    --wrong-red: #dc3545;
    --paired-amber: #f0ad4e;      /* For matching pairs */
    --reflection-green: #28a745;
    --teacher-purple: #6f42c1;
}
```

### Required External Libraries

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

---

## 4. Question Types Catalogue

### 4.1 Dropdown Selection (Cloze/Gap-Fill)

**Best for:** Vocabulary, definitions, completing sentences, choosing correct terms

**Cognitive Level:** Knowledge, Comprehension

```html
<div class="question-block" id="q2-block">
    <div class="q-header">
        <span>Q2. Complete the Sentence</span>
        <span class="q-status" id="q2-status">Unanswered</span>
    </div>
    <p>Fill in the gaps with the correct terms.</p>
    <div class="cloze-text">
        A <select id="q2a" data-answer="buffer"></select> temporarily stores data 
        while a <select id="q2b" data-answer="register"></select> is used by the CPU.
    </div>
</div>
```

**JavaScript - Populate with shuffled options:**
```javascript
const q2Options = {
    q2a: ['buffer', 'cache', 'register', 'stack'],
    q2b: ['register', 'buffer', 'accumulator', 'memory']
};

function populateDropdown(id, options) {
    const select = document.getElementById(id);
    select.innerHTML = '<option value="">---</option>';
    shuffle(options).forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
    });
}
```

**Marking Logic:**
```javascript
function checkSelect(id) {
    const el = document.getElementById(id);
    const correct = el.dataset.answer;
    if (el.value === correct) {
        el.classList.add('correct');
        el.classList.remove('wrong');
        return 1;
    } else {
        el.classList.add('wrong');
        el.value = "";
        return 0;
    }
}
```

---

### 4.2 True/False Grid

**Best for:** Testing understanding of concepts, common misconceptions, factual recall

**Cognitive Level:** Knowledge, Comprehension

```html
<div class="question-block" id="q1-block">
    <div class="q-header">
        <span>Q1. True or False</span>
        <span class="q-status" id="q1-status">Unanswered</span>
    </div>
    <p>Select True or False for each statement.</p>
    
    <div class="tf-grid" id="tf-grid">
        <div class="tf-header">Statement</div>
        <div class="tf-header">True</div>
        <div class="tf-header">False</div>
        <!-- Rows populated by JavaScript -->
    </div>
</div>
```

**CSS:**
```css
.tf-grid {
    display: grid;
    grid-template-columns: 1fr 80px 80px;
    gap: 10px;
    align-items: center;
}

.tf-option {
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    height: 100%;
    min-height: 40px;
    border-radius: 5px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s;
}

.tf-option.selected { background: var(--sg-blue); color: white; }
.tf-option.correct { background: var(--correct-green); color: white; pointer-events: none; }
.tf-option.wrong { background: var(--wrong-red); color: white; }
```

**JavaScript:**
```javascript
const tfStatements = [
    { id: 1, text: 'RAM is volatile memory.', answer: true },
    { id: 2, text: 'ROM can be written to by the user.', answer: false },
    // ... more statements
];

let tfSelections = {};

function selectTF(row, val) {
    document.getElementById(`q1-${row}-t`).classList.remove('selected');
    document.getElementById(`q1-${row}-f`).classList.remove('selected');
    
    if (val === true) document.getElementById(`q1-${row}-t`).classList.add('selected');
    else document.getElementById(`q1-${row}-f`).classList.add('selected');
    
    tfSelections[row] = val;
}

// Populate grid (shuffled)
function initTFGrid() {
    const grid = document.getElementById('tf-grid');
    shuffle(tfStatements).forEach(stmt => {
        const row = document.createElement('div');
        row.className = 'tf-row';
        row.innerHTML = `
            <div class="tf-statement">${stmt.text}</div>
            <div class="tf-option" onclick="selectTF(${stmt.id}, true)" id="q1-${stmt.id}-t"></div>
            <div class="tf-option" onclick="selectTF(${stmt.id}, false)" id="q1-${stmt.id}-f"></div>
        `;
        grid.appendChild(row);
    });
}
```

---

### 4.3 Drag & Drop Categorisation (2 Categories)

**Best for:** Classification, sorting into groups, comparing two concepts

**Cognitive Level:** Comprehension, Analysis

```html
<div class="question-block" id="q3-block">
    <div class="q-header">
        <span>Q3. Categorise the Items</span>
        <span class="q-status" id="q3-status">Unanswered</span>
    </div>
    <p>Drag each item into the correct category.</p>
    
    <div class="draggable-source" id="q3-source" ondrop="drop(event)" ondragover="allowDrop(event)">
        <!-- Items populated by JavaScript -->
    </div>
    
    <div class="bucket-container">
        <div class="bucket" id="bucket-a" ondrop="drop(event)" ondragover="allowDrop(event)">
            <h4>Category A</h4>
        </div>
        <div class="bucket" id="bucket-b" ondrop="drop(event)" ondragover="allowDrop(event)">
            <h4>Category B</h4>
        </div>
    </div>
</div>
```

**JavaScript:**
```javascript
const q3Items = [
    { id: 'item1', text: 'Item Text 1', correct: 'a' },
    { id: 'item2', text: 'Item Text 2', correct: 'b' },
    // ...
];

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }

function drop(ev) {
    ev.preventDefault();
    if (ev.target.classList.contains('bucket') || ev.target.classList.contains('draggable-source')) {
        const data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
}

// Populate draggable items (shuffled)
function initDragItems() {
    const source = document.getElementById('q3-source');
    shuffle(q3Items).forEach(item => {
        const div = document.createElement('div');
        div.className = 'drag-item';
        div.draggable = true;
        div.id = item.id;
        div.textContent = item.text;
        div.ondragstart = drag;
        source.appendChild(div);
    });
}
```

---

### 4.4 Multi-Category Drag & Drop (3+ Categories)

**Best for:** Complex classification, OSI layers, multiple data types

**Cognitive Level:** Analysis, Evaluation

```html
<div class="bucket-container" style="flex-wrap: wrap;">
    <div class="bucket" id="bucket-1" ondrop="drop(event)" ondragover="allowDrop(event)" style="flex: 1 1 30%; min-width: 200px;">
        <h4>Category 1</h4>
    </div>
    <div class="bucket" id="bucket-2" ondrop="drop(event)" ondragover="allowDrop(event)" style="flex: 1 1 30%; min-width: 200px;">
        <h4>Category 2</h4>
    </div>
    <div class="bucket" id="bucket-3" ondrop="drop(event)" ondragover="allowDrop(event)" style="flex: 1 1 30%; min-width: 200px;">
        <h4>Category 3</h4>
    </div>
</div>
```

---

### 4.5 Sortable Ordering List

**Best for:** Sequences, processes, steps in algorithms, fetch-execute cycle

**Cognitive Level:** Comprehension, Application

```html
<div class="question-block" id="q4-block">
    <div class="q-header">
        <span>Q4. Order the Steps</span>
        <span class="q-status" id="q4-status">Unanswered</span>
    </div>
    <p>Drag the items into the correct order from first to last.</p>
    
    <ul class="sortable-list" id="order-list">
        <!-- Items populated by JavaScript (shuffled) -->
    </ul>
</div>
```

**JavaScript:**
```javascript
const orderItems = [
    { id: 'step1', text: 'Fetch instruction from memory' },
    { id: 'step2', text: 'Decode the instruction' },
    { id: 'step3', text: 'Execute the instruction' },
    { id: 'step4', text: 'Store the result' }
];

const correctOrder = ['step1', 'step2', 'step3', 'step4'];

function initSortable() {
    const list = document.getElementById('order-list');
    shuffle([...orderItems]).forEach(item => {
        const li = document.createElement('li');
        li.className = 'sortable-item';
        li.draggable = true;
        li.id = item.id;
        li.innerHTML = `<span>${item.text}</span><i class="fa-solid fa-grip-lines"></i>`;
        
        li.addEventListener('dragstart', () => li.classList.add('dragging'));
        li.addEventListener('dragend', () => li.classList.remove('dragging'));
        
        list.appendChild(li);
    });
    
    list.addEventListener('dragover', handleDragOver);
}

function handleDragOver(e) {
    e.preventDefault();
    const list = e.currentTarget;
    const dragging = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(list, e.clientY);
    
    if (afterElement == null) {
        list.appendChild(dragging);
    } else {
        list.insertBefore(dragging, afterElement);
    }
}

function getDragAfterElement(container, y) {
    const elements = [...container.querySelectorAll('.sortable-item:not(.dragging)')];
    return elements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Check order
function checkOrder() {
    const items = document.querySelectorAll('#order-list li');
    const currentOrder = Array.from(items).map(li => li.id);
    return JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
}
```

---

### 4.6 Click-to-Match Pairs

**Best for:** Definitions, matching terms to meanings, protocols to functions

**Cognitive Level:** Knowledge, Comprehension

```html
<div class="question-block" id="q5-block">
    <div class="q-header">
        <span>Q5. Match the Pairs</span>
        <span class="q-status" id="q5-status">Unanswered</span>
    </div>
    <p>Click a definition on the left, then the matching term on the right. Matched pairs turn <span style="color: var(--paired-amber); font-weight: bold;">amber</span>.</p>
    
    <div class="match-grid">
        <div class="col-defs" id="col-defs">
            <!-- Populated by JavaScript -->
        </div>
        <div class="col-terms" id="col-terms">
            <!-- Populated by JavaScript -->
        </div>
    </div>
</div>
```

**CSS for Matching:**
```css
.match-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.col-defs, .col-terms {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.match-def, .match-term {
    background: white;
    padding: 15px;
    border: 2px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
}

.match-def:hover, .match-term:hover {
    border-color: var(--sg-gold);
    background: var(--sg-light-blue);
}

.match-selected {
    background: var(--sg-blue) !important;
    color: white !important;
    border-color: var(--sg-blue) !important;
}

.match-paired {
    background: #fff3cd !important;
    border-color: var(--paired-amber) !important;
    color: #856404 !important;
}

.match-solved {
    background: var(--correct-green) !important;
    color: white !important;
    border-color: var(--correct-green) !important;
    opacity: 0.8;
    pointer-events: none;
}
```

**JavaScript:**
```javascript
const matchDefs = [
    { id: '1', text: 'Definition 1' },
    { id: '2', text: 'Definition 2' },
    // ...
];

const matchTerms = [
    { id: '1', text: 'Term 1' },  // id matches definition id
    { id: '2', text: 'Term 2' },
    // ...
];

let selectedDefId = null;
let matchPairs = {};  // { defId: termId }

function initMatching() {
    const colDefs = document.getElementById('col-defs');
    const colTerms = document.getElementById('col-terms');
    
    // Shuffle and populate definitions
    shuffle(matchDefs).forEach(def => {
        const div = document.createElement('div');
        div.className = 'match-def';
        div.dataset.id = def.id;
        div.textContent = def.text;
        div.onclick = () => selectDef(def.id);
        colDefs.appendChild(div);
    });
    
    // Shuffle and populate terms
    shuffle(matchTerms).forEach(term => {
        const div = document.createElement('div');
        div.className = 'match-term';
        div.dataset.id = term.id;
        div.textContent = term.text;
        div.onclick = () => selectTerm(term.id);
        colTerms.appendChild(div);
    });
}

function selectDef(defId) {
    const def = document.querySelector(`.match-def[data-id="${defId}"]`);
    if (def.classList.contains('match-solved')) return;
    
    document.querySelectorAll('.match-def').forEach(d => d.classList.remove('match-selected'));
    def.classList.add('match-selected');
    selectedDefId = defId;
}

function selectTerm(termId) {
    if (!selectedDefId) return;
    
    const term = document.querySelector(`.match-term[data-id="${termId}"]`);
    const def = document.querySelector(`.match-def[data-id="${selectedDefId}"]`);
    
    if (term.classList.contains('match-solved')) return;
    
    // Remove previous pairings
    Object.keys(matchPairs).forEach(dId => {
        if (matchPairs[dId] === termId) {
            delete matchPairs[dId];
            document.querySelector(`.match-def[data-id="${dId}"]`).classList.remove('match-paired');
        }
    });
    
    if (matchPairs[selectedDefId]) {
        document.querySelector(`.match-term[data-id="${matchPairs[selectedDefId]}"]`).classList.remove('match-paired');
    }
    
    // Create new pairing (amber color)
    matchPairs[selectedDefId] = termId;
    def.classList.remove('match-selected');
    def.classList.add('match-paired');
    term.classList.add('match-paired');
    
    selectedDefId = null;
}

// Check matching (called on submit)
function checkMatching() {
    let correct = 0;
    Object.keys(matchPairs).forEach(defId => {
        const termId = matchPairs[defId];
        const defEl = document.querySelector(`.match-def[data-id="${defId}"]`);
        const termEl = document.querySelector(`.match-term[data-id="${termId}"]`);
        
        if (defId === termId) {
            correct++;
            defEl.classList.remove('match-paired');
            termEl.classList.remove('match-paired');
            defEl.classList.add('match-solved');
            termEl.classList.add('match-solved');
        } else {
            defEl.classList.remove('match-paired');
            termEl.classList.remove('match-paired');
            delete matchPairs[defId];
        }
    });
    return correct;
}
```

---

### 4.7 Multiple Choice (Single Select)

**Best for:** Factual recall, single correct answer, quick assessment

**Cognitive Level:** Knowledge, Comprehension

```html
<div class="question-block" id="q6-block">
    <div class="q-header">
        <span>Q6. Select the Correct Answer</span>
        <span class="q-status" id="q6-status">Unanswered</span>
    </div>
    <p>What is the binary representation of decimal 13?</p>
    
    <div class="mcq-options" id="q6-options">
        <!-- Options populated by JavaScript (shuffled) -->
    </div>
</div>
```

**CSS:**
```css
.mcq-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
}

.mcq-option {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    background: white;
    border: 2px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
}

.mcq-option:hover {
    border-color: var(--sg-gold);
    background: var(--sg-light-blue);
}

.mcq-option.selected {
    border-color: var(--sg-blue);
    background: var(--sg-light-blue);
}

.mcq-option.correct {
    border-color: var(--correct-green);
    background: #e8f5e9;
}

.mcq-option.wrong {
    border-color: var(--wrong-red);
    background: #fdecea;
}

.mcq-radio {
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mcq-option.selected .mcq-radio {
    border-color: var(--sg-blue);
}

.mcq-option.selected .mcq-radio::after {
    content: '';
    width: 10px;
    height: 10px;
    background: var(--sg-blue);
    border-radius: 50%;
}
```

**JavaScript:**
```javascript
const q6Options = [
    { value: '1101', correct: true },
    { value: '1011', correct: false },
    { value: '1110', correct: false },
    { value: '1001', correct: false }
];

let q6Selection = null;

function initMCQ() {
    const container = document.getElementById('q6-options');
    shuffle(q6Options).forEach((opt, idx) => {
        const div = document.createElement('div');
        div.className = 'mcq-option';
        div.dataset.value = opt.value;
        div.dataset.correct = opt.correct;
        div.innerHTML = `<div class="mcq-radio"></div><span>${opt.value}</span>`;
        div.onclick = () => selectMCQ('q6', opt.value);
        container.appendChild(div);
    });
}

function selectMCQ(qId, value) {
    document.querySelectorAll(`#${qId}-options .mcq-option`).forEach(opt => {
        opt.classList.remove('selected');
    });
    const selected = document.querySelector(`#${qId}-options .mcq-option[data-value="${value}"]`);
    selected.classList.add('selected');
    q6Selection = value;
}

function checkMCQ() {
    const correctOpt = q6Options.find(o => o.correct);
    if (q6Selection === correctOpt.value) {
        document.querySelector(`#q6-options .mcq-option[data-value="${q6Selection}"]`).classList.add('correct');
        return true;
    } else {
        document.querySelector(`#q6-options .mcq-option.selected`)?.classList.add('wrong');
        document.querySelectorAll('#q6-options .mcq-option').forEach(o => o.classList.remove('selected'));
        q6Selection = null;
        return false;
    }
}
```

---

### 4.8 Multi-Select Checkboxes

**Best for:** Multiple correct answers, "Select all that apply"

**Cognitive Level:** Comprehension, Analysis

```html
<div class="question-block" id="q7-block">
    <div class="q-header">
        <span>Q7. Select All That Apply</span>
        <span class="q-status" id="q7-status">Unanswered</span>
    </div>
    <p>Which of the following are input devices? Select all that apply.</p>
    
    <div class="checkbox-options" id="q7-options">
        <!-- Options populated by JavaScript -->
    </div>
</div>
```

**CSS:**
```css
.checkbox-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
}

.checkbox-option {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    background: white;
    border: 2px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
}

.checkbox-option:hover {
    border-color: var(--sg-gold);
}

.checkbox-option.checked {
    border-color: var(--sg-blue);
    background: var(--sg-light-blue);
}

.checkbox-box {
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 4px;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}

.checkbox-option.checked .checkbox-box {
    background: var(--sg-blue);
    border-color: var(--sg-blue);
    color: white;
}

.checkbox-option.checked .checkbox-box::after {
    content: '✓';
}
```

**JavaScript:**
```javascript
const q7Options = [
    { value: 'Keyboard', correct: true },
    { value: 'Monitor', correct: false },
    { value: 'Mouse', correct: true },
    { value: 'Printer', correct: false },
    { value: 'Microphone', correct: true }
];

let q7Selections = new Set();

function initCheckboxes() {
    const container = document.getElementById('q7-options');
    shuffle(q7Options).forEach(opt => {
        const div = document.createElement('div');
        div.className = 'checkbox-option';
        div.dataset.value = opt.value;
        div.innerHTML = `<div class="checkbox-box"></div><span>${opt.value}</span>`;
        div.onclick = () => toggleCheckbox('q7', opt.value, div);
        container.appendChild(div);
    });
}

function toggleCheckbox(qId, value, element) {
    if (q7Selections.has(value)) {
        q7Selections.delete(value);
        element.classList.remove('checked');
    } else {
        q7Selections.add(value);
        element.classList.add('checked');
    }
}

function checkMultiSelect() {
    const correctValues = new Set(q7Options.filter(o => o.correct).map(o => o.value));
    const isCorrect = q7Selections.size === correctValues.size && 
                      [...q7Selections].every(v => correctValues.has(v));
    
    if (!isCorrect) {
        // Reset wrong selections
        q7Selections.clear();
        document.querySelectorAll('#q7-options .checkbox-option').forEach(opt => {
            opt.classList.remove('checked');
        });
    }
    return isCorrect;
}
```

---

### 4.9 Numeric Input with Validation

**Best for:** Calculations, conversions, number systems, data sizes

**Cognitive Level:** Application, Analysis

```html
<div class="question-block" id="q8-block">
    <div class="q-header">
        <span>Q8. Calculate the Value</span>
        <span class="q-status" id="q8-status">Unanswered</span>
    </div>
    <p>Convert the following binary number to decimal: <strong>10110</strong></p>
    
    <div class="numeric-input-container">
        <input type="text" id="q8-input" class="numeric-input" placeholder="Enter your answer" autocomplete="off">
        <span class="numeric-hint">Enter a number</span>
    </div>
</div>
```

**CSS:**
```css
.numeric-input-container {
    margin-top: 15px;
}

.numeric-input {
    width: 200px;
    padding: 12px 15px;
    font-size: 1.1rem;
    border: 2px solid var(--sg-blue);
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
}

.numeric-input:focus {
    outline: none;
    border-color: var(--sg-gold);
}

.numeric-input.correct {
    border-color: var(--correct-green);
    background: #e8f5e9;
}

.numeric-input.wrong {
    border-color: var(--wrong-red);
    background: #fdecea;
}

.numeric-hint {
    display: block;
    margin-top: 5px;
    font-size: 0.85rem;
    color: #666;
}
```

**JavaScript:**
```javascript
function checkNumericInput(inputId, correctAnswer, tolerance = 0) {
    const input = document.getElementById(inputId);
    const value = parseFloat(input.value.trim());
    
    if (isNaN(value)) {
        input.classList.add('wrong');
        input.value = '';
        return false;
    }
    
    const isCorrect = Math.abs(value - correctAnswer) <= tolerance;
    
    if (isCorrect) {
        input.classList.add('correct');
        input.classList.remove('wrong');
        input.disabled = true;
        return true;
    } else {
        input.classList.add('wrong');
        input.value = '';
        return false;
    }
}

// For binary/hex inputs, validate format
function checkBinaryInput(inputId, correctBinary) {
    const input = document.getElementById(inputId);
    const value = input.value.trim();
    
    // Validate binary format
    if (!/^[01]+$/.test(value)) {
        input.classList.add('wrong');
        input.value = '';
        return false;
    }
    
    if (value === correctBinary) {
        input.classList.add('correct');
        input.disabled = true;
        return true;
    } else {
        input.classList.add('wrong');
        input.value = '';
        return false;
    }
}
```

---

### 4.10 Truth Table Completion

**Best for:** Logic gates, Boolean algebra, conditions

**Cognitive Level:** Application, Analysis

```html
<div class="question-block" id="q9-block">
    <div class="q-header">
        <span>Q9. Complete the Truth Table</span>
        <span class="q-status" id="q9-status">Unanswered</span>
    </div>
    <p>Complete the truth table for an AND gate.</p>
    
    <table class="truth-table">
        <thead>
            <tr>
                <th>A</th>
                <th>B</th>
                <th>Output (A AND B)</th>
            </tr>
        </thead>
        <tbody id="truth-table-body">
            <!-- Rows populated by JavaScript -->
        </tbody>
    </table>
</div>
```

**CSS:**
```css
.truth-table {
    width: 100%;
    max-width: 400px;
    border-collapse: collapse;
    margin-top: 15px;
}

.truth-table th, .truth-table td {
    border: 2px solid #ccc;
    padding: 12px;
    text-align: center;
}

.truth-table th {
    background: var(--sg-blue);
    color: white;
}

.truth-table td {
    background: white;
}

.truth-cell-select {
    width: 60px;
    padding: 8px;
    border: 2px solid var(--sg-blue);
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
}

.truth-cell-select.correct {
    border-color: var(--correct-green);
    background: #e8f5e9;
}

.truth-cell-select.wrong {
    border-color: var(--wrong-red);
    background: #fdecea;
}
```

**JavaScript:**
```javascript
const truthTableData = [
    { a: 0, b: 0, output: 0 },
    { a: 0, b: 1, output: 0 },
    { a: 1, b: 0, output: 0 },
    { a: 1, b: 1, output: 1 }
];

function initTruthTable() {
    const tbody = document.getElementById('truth-table-body');
    
    // Shuffle row order
    shuffle(truthTableData).forEach((row, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.a}</td>
            <td>${row.b}</td>
            <td>
                <select class="truth-cell-select" id="tt-${idx}" data-correct="${row.output}">
                    <option value="">?</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function checkTruthTable() {
    let allCorrect = true;
    document.querySelectorAll('.truth-cell-select').forEach(select => {
        const correct = select.dataset.correct;
        if (select.value === correct) {
            select.classList.add('correct');
            select.classList.remove('wrong');
            select.disabled = true;
        } else {
            select.classList.add('wrong');
            select.value = '';
            allCorrect = false;
        }
    });
    return allCorrect;
}
```

---

### 4.11 Code Trace/Output Prediction

**Best for:** Programming concepts, algorithm understanding, variable tracing

**Cognitive Level:** Application, Analysis

```html
<div class="question-block" id="q10-block">
    <div class="q-header">
        <span>Q10. Predict the Output</span>
        <span class="q-status" id="q10-status">Unanswered</span>
    </div>
    <p>What will be the output of this code?</p>
    
    <div class="code-block">
        <pre><code>x = 5
y = 3
x = x + y
y = x - y
x = x - y
print(x, y)</code></pre>
    </div>
    
    <div class="output-prediction">
        <label>x = </label>
        <input type="text" id="q10-x" class="output-input" data-answer="3" autocomplete="off">
        <label style="margin-left: 20px;">y = </label>
        <input type="text" id="q10-y" class="output-input" data-answer="5" autocomplete="off">
    </div>
</div>
```

**CSS:**
```css
.code-block {
    background: #1e1e1e;
    border-radius: 8px;
    padding: 15px;
    margin: 15px 0;
    overflow-x: auto;
}

.code-block pre {
    margin: 0;
}

.code-block code {
    color: #e0e0e0;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
}

.output-prediction {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
}

.output-input {
    width: 80px;
    padding: 10px;
    font-size: 1rem;
    border: 2px solid var(--sg-blue);
    border-radius: 5px;
    text-align: center;
    font-family: 'Consolas', monospace;
}

.output-input.correct {
    border-color: var(--correct-green);
    background: #e8f5e9;
}

.output-input.wrong {
    border-color: var(--wrong-red);
    background: #fdecea;
}
```

---

### 4.12 SQL Query Building

**Best for:** Database queries, SQL syntax

**Cognitive Level:** Application, Synthesis

```html
<div class="question-block" id="q11-block">
    <div class="q-header">
        <span>Q11. Build the SQL Query</span>
        <span class="q-status" id="q11-status">Unanswered</span>
    </div>
    <p>Build a query to select all students with a score greater than 80.</p>
    
    <div class="sql-builder">
        <select id="sql-1" data-answer="SELECT" class="sql-part">
            <option value="">...</option>
        </select>
        <span class="sql-fixed">*</span>
        <select id="sql-2" data-answer="FROM" class="sql-part">
            <option value="">...</option>
        </select>
        <span class="sql-fixed">Students</span>
        <select id="sql-3" data-answer="WHERE" class="sql-part">
            <option value="">...</option>
        </select>
        <span class="sql-fixed">Score</span>
        <select id="sql-4" data-answer=">" class="sql-part">
            <option value="">...</option>
        </select>
        <span class="sql-fixed">80</span>
    </div>
</div>
```

**CSS:**
```css
.sql-builder {
    background: #1e1e1e;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    font-family: 'Consolas', monospace;
    font-size: 1rem;
}

.sql-fixed {
    color: #e0e0e0;
}

.sql-part {
    padding: 8px 12px;
    border: 2px solid var(--sg-gold);
    border-radius: 5px;
    background: #2d2d2d;
    color: #4ec9b0;
    font-family: 'Consolas', monospace;
    font-size: 1rem;
    cursor: pointer;
}

.sql-part.correct {
    border-color: var(--correct-green);
    background: #1a3d1a;
}

.sql-part.wrong {
    border-color: var(--wrong-red);
    background: #3d1a1a;
}
```

---

### 4.13 Flowchart Symbol Matching

**Best for:** Algorithm design, flowchart understanding

**Cognitive Level:** Comprehension, Application

Create a visual grid where students match flowchart shapes to their meanings using the click-to-match system described in 4.6, but with symbols rendered using CSS shapes or Unicode characters.

---

### 4.14 Network Packet Ordering

**Best for:** Data transmission, protocols, TCP/IP

**Cognitive Level:** Analysis

Use the sortable ordering (4.5) with packet segments that need to be arranged in transmission order, including headers, data, and checksums.

---

### 4.15 Binary/Hex Grid Input

**Best for:** Number representation, data storage

**Cognitive Level:** Application

```html
<div class="question-block" id="q12-block">
    <div class="q-header">
        <span>Q12. Convert to Binary</span>
        <span class="q-status" id="q12-status">Unanswered</span>
    </div>
    <p>Convert decimal 45 to an 8-bit binary number.</p>
    
    <div class="binary-grid" id="binary-grid">
        <!-- 8 bit cells populated by JavaScript -->
    </div>
    <div class="binary-labels">
        <span>128</span><span>64</span><span>32</span><span>16</span>
        <span>8</span><span>4</span><span>2</span><span>1</span>
    </div>
</div>
```

**CSS:**
```css
.binary-grid {
    display: flex;
    gap: 5px;
    margin-top: 15px;
}

.bit-cell {
    width: 50px;
    height: 50px;
    border: 2px solid var(--sg-blue);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    background: white;
    transition: all 0.2s;
}

.bit-cell.on {
    background: var(--sg-blue);
    color: white;
}

.binary-labels {
    display: flex;
    gap: 5px;
    margin-top: 5px;
}

.binary-labels span {
    width: 50px;
    text-align: center;
    font-size: 0.8rem;
    color: #666;
}
```

**JavaScript:**
```javascript
const correctBinary = '00101101';  // 45 in binary
let binaryState = ['0','0','0','0','0','0','0','0'];

function initBinaryGrid() {
    const grid = document.getElementById('binary-grid');
    for (let i = 0; i < 8; i++) {
        const cell = document.createElement('div');
        cell.className = 'bit-cell';
        cell.dataset.index = i;
        cell.textContent = '0';
        cell.onclick = () => toggleBit(i);
        grid.appendChild(cell);
    }
}

function toggleBit(index) {
    const cell = document.querySelector(`.bit-cell[data-index="${index}"]`);
    if (binaryState[index] === '0') {
        binaryState[index] = '1';
        cell.textContent = '1';
        cell.classList.add('on');
    } else {
        binaryState[index] = '0';
        cell.textContent = '0';
        cell.classList.remove('on');
    }
}

function checkBinary() {
    return binaryState.join('') === correctBinary;
}
```

---

## 5. Topic-Specific Question Ideas

### Topic 1: Data Representation

| Question Type | Example |
|--------------|---------|
| Binary Grid (4.15) | Convert decimal to 8-bit binary |
| Numeric Input (4.9) | Calculate file size in KB/MB |
| Dropdown (4.1) | Complete number conversion steps |
| Sortable (4.5) | Order hexadecimal digits by value |
| True/False (4.2) | Statements about two's complement |
| Multi-Select (4.8) | Select valid Unicode representations |

### Topic 2: Data Transmission

| Question Type | Example |
|--------------|---------|
| Matching (4.6) | Match protocols to their functions |
| Categorisation (4.3) | Sort into TCP vs UDP characteristics |
| Sortable (4.5) | Order packet transmission steps |
| True/False (4.2) | Error detection method facts |
| Dropdown (4.1) | Complete network diagram labels |
| MCQ (4.7) | Identify bandwidth calculations |

### Topic 3: Hardware

| Question Type | Example |
|--------------|---------|
| Matching (4.6) | CPU components to functions |
| Sortable (4.5) | Fetch-Execute cycle steps |
| Categorisation (4.3) | Input vs Output devices |
| Multi-Category (4.4) | Primary/Secondary/Cache storage |
| True/False (4.2) | RAM vs ROM characteristics |
| Dropdown (4.1) | Complete bus system description |

### Topic 4: Software

| Question Type | Example |
|--------------|---------|
| Categorisation (4.3) | System vs Application software |
| Matching (4.6) | OS functions to descriptions |
| True/False (4.2) | Compiler vs Interpreter facts |
| Dropdown (4.1) | IDE feature identification |
| Sortable (4.5) | Interrupt handling sequence |
| MCQ (4.7) | Utility software identification |

### Topic 5: The Internet & WWW

| Question Type | Example |
|--------------|---------|
| Matching (4.6) | HTML tags to purposes |
| Dropdown (4.1) | URL component identification |
| Categorisation (4.3) | Client-side vs Server-side |
| True/False (4.2) | HTTP vs HTTPS security |
| Multi-Select (4.8) | Select valid IP addresses |
| Sortable (4.5) | DNS resolution steps |

### Topic 6: Automated Systems

| Question Type | Example |
|--------------|---------|
| Matching (4.6) | Sensors to applications |
| Categorisation (4.3) | Sensors vs Actuators |
| Dropdown (4.1) | Feedback loop completion |
| True/False (4.2) | Robotics applications |
| Sortable (4.5) | Control system process order |
| MCQ (4.7) | ADC/DAC scenarios |

### Topic 7: Algorithms

| Question Type | Example |
|--------------|---------|
| Sortable (4.5) | Algorithm steps in order |
| Code Trace (4.11) | Predict variable values |
| Matching (4.6) | Flowchart symbols to meanings |
| Dropdown (4.1) | Complete pseudocode |
| True/False (4.2) | Algorithm efficiency statements |
| Numeric Input (4.9) | Trace table final values |

### Topic 8: Programming

| Question Type | Example |
|--------------|---------|
| Code Trace (4.11) | Output prediction |
| Categorisation (4.3) | Data types classification |
| Matching (4.6) | Operators to descriptions |
| Dropdown (4.1) | Syntax correction |
| Multi-Select (4.8) | Valid variable names |
| True/False (4.2) | Scope and lifetime facts |

### Topic 9: Databases

| Question Type | Example |
|--------------|---------|
| SQL Building (4.12) | Construct SELECT queries |
| Matching (4.6) | SQL keywords to functions |
| Dropdown (4.1) | Normalization steps |
| Categorisation (4.3) | Primary vs Foreign keys |
| True/False (4.2) | Database design rules |
| Code Trace (4.11) | Query result prediction |

### Topic 10: Boolean Logic

| Question Type | Example |
|--------------|---------|
| Truth Table (4.10) | Complete gate outputs |
| Matching (4.6) | Gate symbols to names |
| Binary Grid (4.15) | Input combinations |
| Dropdown (4.1) | Boolean expression completion |
| Sortable (4.5) | Logic gate evaluation order |
| MCQ (4.7) | Equivalent expressions |

---

## 6. Complete Build Process

### Step 1: Create the HTML File

```bash
# File location
public/igcse/topic[N]/[N].X_assessment.html
```

### Step 2: Copy the Template Structure

Use `public/igcse/topic4/4.1_assessment.html` as the base template.

### Step 3: Modify the Metadata

```javascript
const testName = "[N].X [Subtopic Title]";

const questionMeta = [
    { id: 'q1', title: 'Question 1 Title', correctAnswer: '...' },
    { id: 'q2', title: 'Question 2 Title', correctAnswer: '...' },
    // ... 10-15 questions
];

const mistakeCounts = { q1: 0, q2: 0, q3: 0, /* ... */ };
const completed = { q1: false, q2: false, q3: false, /* ... */ };
```

### Step 4: Build Each Question Block

For each question:
1. Add the HTML structure with unique IDs
2. Add data arrays for shuffling
3. Add initialization function
4. Add checking function

### Step 5: Wire Up the Initialization

```javascript
function initializeShuffledContent() {
    initQ1();  // True/False
    initQ2();  // Dropdowns
    initQ3();  // Drag & Drop
    // ... etc
}

function startAssessment() {
    // ... validation ...
    initializeShuffledContent();
    // ... timer, display ...
}
```

### Step 6: Build the checkAnswers Function

```javascript
function checkAnswers() {
    totalAttempts++;
    let score = 0;
    
    // Q1
    const q1Correct = checkQ1();
    updateStatus('q1', q1Correct);
    if (q1Correct) score++;
    
    // Q2
    const q2Correct = checkQ2();
    updateStatus('q2', q2Correct);
    if (q2Correct) score++;
    
    // ... continue for all questions ...
    
    // Track mistakes
    const correctness = { q1: q1Correct, q2: q2Correct, /* ... */ };
    Object.keys(correctness).forEach(key => {
        if (!correctness[key] && !completed[key]) {
            mistakeCounts[key]++;
        }
        if (correctness[key]) {
            completed[key] = true;
        }
    });
    
    // Show score
    const totalQuestions = Object.keys(mistakeCounts).length;
    document.getElementById('finalScore').style.display = 'block';
    document.getElementById('finalScore').innerText = 
        `Score: ${score} / ${totalQuestions} — ${score < totalQuestions ? 'Keep trying!' : ''}`;
    
    // Check completion
    if (score === totalQuestions && !assessmentFinished) {
        assessmentFinished = true;
        clearInterval(timerInterval);
        document.getElementById('completionMessage').style.display = 'block';
        document.getElementById('btnSubmit').style.display = 'none';
        generatePDF();
    }
}
```

---

## 7. Tracking & Scoring System

### Global Tracking Variables

```javascript
// Timing
let startTime;
let timerInterval;
let timeTakenStr = "";

// Teacher/Test info
let teacherName = "";
const testName = "[N].X [Topic Title]";

// Per-question mistake tracking (internal)
const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };

// Completion tracking
const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };

// Global state
let totalAttempts = 0;
let assessmentFinished = false;
```

### Timer Implementation

```javascript
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const delta = Date.now() - startTime;
        const seconds = Math.floor((delta / 1000) % 60);
        const minutes = Math.floor((delta / (1000 * 60)) % 60);
        const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer').innerText = timeStr;
        timeTakenStr = timeStr;
    }, 1000);
}
```

### Status Update Function

```javascript
function updateStatus(qId, isCorrect) {
    const el = document.getElementById(qId + '-status');
    if (isCorrect) {
        el.innerText = "Correct";
        el.className = "q-status correct";
    } else {
        el.innerText = "Incorrect";
        el.className = "q-status wrong";
    }
}
```

---

## 8. PDF Generation System

### Required Library

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

### Complete PDF Generation Function

```javascript
async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let yPos = 20;

    // Helper: Page break check
    function checkPageBreak(heightNeeded) {
        if (yPos + heightNeeded > pageHeight - margin) {
            doc.addPage();
            yPos = 20;
        }
    }

    // ============ PAGE 1: ANSWERS ============
    
    // Logo (top right)
    try {
        const logo = await getBase64ImageFromUrl('../../images/Logo.png');
        doc.addImage(logo, 'PNG', pageWidth - 35, 8, 22, 22);
    } catch (e) { console.warn('Logo failed', e); }

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor('#003366');
    doc.text(testName, margin, yPos);
    yPos += 8;

    // Metadata line
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor('#666666');
    doc.text(`Teacher: ${teacherName}  |  Time: ${timeTakenStr}  |  Date: ${new Date().toLocaleDateString()}`, margin, yPos);
    yPos += 12;

    // Questions with answers
    questionMeta.forEach((q, idx) => {
        checkPageBreak(25);
        
        // Question title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor('#003366');
        doc.text(`Q${idx + 1}. ${q.title}`, margin, yPos);
        yPos += 6;
        
        // Correct answer
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor('#333');
        
        // Handle multi-line answers
        const answerLines = doc.splitTextToSize(`Answer: ${q.correctAnswer}`, contentWidth - 8);
        answerLines.forEach(line => {
            doc.text(line, margin + 4, yPos);
            yPos += 4.5;
        });
        yPos += 3;
    });

    // ============ PAGE 2: FEEDBACK ============
    
    doc.addPage();
    yPos = 20;

    // Logo on feedback page
    try {
        const logo = await getBase64ImageFromUrl('../../images/Logo.png');
        doc.addImage(logo, 'PNG', pageWidth - 35, 8, 22, 22);
    } catch (e) {}

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor('#003366');
    doc.text('Feedback & Reflection', margin, yPos);
    yPos += 10;

    // Feedback Key
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#666');
    doc.text('Key: C = Content gap | E = Exam technique | L = Language/clarity | T = Time/effort | M = Misread/misapplied', margin, yPos);
    yPos += 8;

    // ============ FEEDBACK TABLE ============
    
    const colWidths = [12, 70, 25, 30];
    const rowHeight = 8;
    const tableX = margin;

    // Table Header
    doc.setFillColor(0, 51, 102);  // SG Blue
    doc.rect(tableX, yPos, contentWidth, rowHeight, 'F');
    doc.setTextColor('#FFFFFF');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    
    // Centered header text
    doc.text('Q', tableX + colWidths[0]/2, yPos + 5.5, { align: 'center' });
    doc.text('Topic', tableX + colWidths[0] + colWidths[1]/2, yPos + 5.5, { align: 'center' });
    doc.text('Attempts', tableX + colWidths[0] + colWidths[1] + colWidths[2]/2, yPos + 5.5, { align: 'center' });
    doc.text('Code', tableX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3]/2, yPos + 5.5, { align: 'center' });
    yPos += rowHeight;

    // Table Rows
    doc.setTextColor('#000');
    doc.setFont('helvetica', 'normal');
    
    questionMeta.forEach((q, idx) => {
        const attempts = (mistakeCounts[q.id] || 0) + 1;
        
        // Alternating row background
        if (idx % 2 === 0) {
            doc.setFillColor(245, 245, 245);
            doc.rect(tableX, yPos, contentWidth, rowHeight, 'F');
        }

        // Cell borders
        doc.setDrawColor(200);
        let cellX = tableX;
        colWidths.forEach(w => {
            doc.rect(cellX, yPos, w, rowHeight, 'S');
            cellX += w;
        });

        // Cell content (centered)
        doc.setFontSize(9);
        doc.text(`${idx + 1}`, tableX + colWidths[0]/2, yPos + 5.5, { align: 'center' });
        doc.text(q.title.substring(0, 35), tableX + colWidths[0] + 3, yPos + 5.5);
        doc.text(`${attempts}`, tableX + colWidths[0] + colWidths[1] + colWidths[2]/2, yPos + 5.5, { align: 'center' });

        // Editable Code field
        const codeField = new doc.AcroFormTextField();
        codeField.Rect = [
            tableX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
            yPos + 1,
            colWidths[3] - 4,
            rowHeight - 2
        ];
        codeField.fieldName = `code_q${idx + 1}`;
        codeField.maxFontSize = 9;
        codeField.textAlign = 'center';
        doc.addField(codeField);

        yPos += rowHeight;
    });

    yPos += 8;

    // Total Attempts
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`Total Submission Attempts: ${totalAttempts}`, margin, yPos);
    yPos += 12;

    // ============ STUDENT REFLECTION BOX (Editable) ============
    
    checkPageBreak(50);
    const reflectionHeight = 45;
    
    doc.setDrawColor(40, 167, 69);  // Green
    doc.setLineWidth(1.5);
    doc.rect(margin, yPos, contentWidth, reflectionHeight, 'S');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor('#28a745');
    doc.text('Student Reflection', margin + 4, yPos + 8);
    
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor('#666');
    doc.text('Using the codes above, identify your main problem area(s) and explain what you will focus on to improve.', margin + 4, yPos + 14);

    // Editable reflection field
    const reflectionField = new doc.AcroFormTextField();
    reflectionField.Rect = [margin + 2, yPos + 17, contentWidth - 4, reflectionHeight - 20];
    reflectionField.fieldName = 'student_reflection';
    reflectionField.multiline = true;
    reflectionField.maxFontSize = 10;
    doc.addField(reflectionField);

    yPos += reflectionHeight + 8;

    // ============ TEACHER COMMENT BOX ============
    
    checkPageBreak(40);
    const teacherHeight = 35;
    
    doc.setDrawColor(111, 66, 193);  // Purple
    doc.setLineWidth(1.5);
    doc.rect(margin, yPos, contentWidth, teacherHeight, 'S');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor('#6f42c1');
    doc.text('Teacher Comment', margin + 4, yPos + 8);

    // Save PDF
    doc.save(`${testName.replace(/[^a-zA-Z0-9]/g, '_')}_Feedback.pdf`);
}

// Helper: Load image as base64
function getBase64ImageFromUrl(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = url;
    });
}
```

---

## 9. Validation & Quality Checklist

### Before Finalizing

- [ ] **10-15 questions** with multiple parts
- [ ] **Variety of question types** (at least 4 different types)
- [ ] All questions have **unique IDs** (q1, q2, q3...)
- [ ] All **data arrays defined** with correct answers
- [ ] All answers **shuffled** on page load
- [ ] **initializeShuffledContent()** calls all init functions
- [ ] **checkAnswers()** checks all questions
- [ ] **mistakeCounts** and **completed** objects include all questions
- [ ] **questionMeta** array has all questions with titles and answers
- [ ] **Timer** starts correctly
- [ ] **Visual feedback** (green/red) works for all question types
- [ ] **Completion detection** triggers PDF download
- [ ] **PDF generates** with both pages
- [ ] **PDF editable fields** work (Code column, Reflection box)
- [ ] **Back button** links to index.html
- [ ] **Logo** displays correctly

### Testing Checklist

1. Open assessment fresh (clear cache)
2. Verify modal appears with teacher dropdown
3. Select teacher, click Start
4. Verify timer starts
5. Verify all questions display correctly
6. Verify answer shuffling (reload page, compare order)
7. Answer some questions wrong, submit
8. Verify red highlighting on wrong answers
9. Verify wrong answers reset appropriately
10. Complete all questions correctly
11. Verify PDF downloads
12. Open PDF, verify:
    - Page 1: All questions with correct answers
    - Page 2: Feedback table with attempts
    - Editable Code fields work
    - Editable Reflection box works
    - Logo appears on both pages

---

## 10. Deployment & Integration

### Commit and Push

```bash
cd /path/to/SGS-CSC
git add public/igcse/topic[N]/[N].X_assessment.html
git commit -m "Add [N].X assessment: [Topic Description]"
git push origin main
```

### Update Assessment Index

If needed, update `public/igcse/topic[N]/assessments.html` or the corresponding Nunjucks template in `src/pages/igcse/topic[N]/assessments.njk`:

```yaml
resources:
  - name: "[N].1 Assessment"
    href: "[N].1_assessment.html"
    type: "System Software & Interrupts"
    icon: "fa-solid fa-clipboard-check"
  - name: "[N].2 Assessment"
    href: "[N].2_assessment.html"
    type: "Languages & IDEs"
    icon: "fa-solid fa-clipboard-check"
```

### Verify Deployment

After pushing:
1. Wait 2-3 minutes for GitHub Actions
2. Visit: `https://[username].github.io/[repo]/igcse/topic[N]/[N].X_assessment.html`
3. Test the assessment in production

---

## Reference Implementations

- `public/igcse/topic4/4.1_assessment.html` - System Software & Interrupts
- `public/igcse/topic4/4.2_assessment.html` - Languages, Translators & IDEs

These serve as the canonical examples. New assessments should follow their structure while adapting question types for the specific topic.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v4 | 2024 | Added amber matching pairs, shuffled answers, editable PDF fields |
| v3 | 2024 | Added GDPR-compliant modal, attempt tracking, PDF generation |
| v2 | 2024 | Initial self-marking implementation |



