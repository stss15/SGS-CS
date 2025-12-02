# IGCSE Self-Marking Assessment Template

This document describes the standard format for creating self-marking assessments for IGCSE Computer Science topics.

---

## Overview

Self-marking assessments are HTML-based interactive quizzes that:
- Track student attempts per question
- Require all answers correct before completion
- Generate a PDF feedback report upon completion
- Include reflection areas for student self-evaluation

---

## Modal Start Screen

The assessment begins with a modal overlay containing:

```html
<div id="startOverlay">
    <div id="startCard">
        <h2>Assessment</h2>
        <div class="test-name">[Topic Number] [Topic Title]</div>
        <p class="instructions">
            Answer all questions by selecting from dropdowns, dragging items, or choosing options. 
            You must get all answers correct to complete the assessment. 
            Your attempts are tracked and a feedback PDF will be generated upon completion.
        </p>
        <label for="teacherSelect">Select Your Teacher</label>
        <select id="teacherSelect">
            <option value="" disabled selected>Choose teacher...</option>
            <option value="Mr Stewart">Mr Stewart</option>
            <option value="Mr Watling">Mr Watling</option>
        </select>
        <button onclick="startAssessment()">Start Assessment</button>
    </div>
</div>
```

**Note:** No personal student information is collected (GDPR compliance). Only teacher selection is required.

---

## Question Types Supported

### 1. Dropdown Selection
```html
<select id="q2a" data-answer="correct_value">
    <option value="">---</option>
    <option value="correct_value">Option A</option>
    <option value="wrong">Option B</option>
</select>
```

### 2. True/False Grid
```html
<div class="tf-grid">
    <div class="tf-row">
        <div class="tf-statement">Statement text</div>
        <div class="tf-option" onclick="selectTF(1, true)" id="q1-1-t"></div>
        <div class="tf-option" onclick="selectTF(1, false)" id="q1-1-f"></div>
    </div>
</div>
```

### 3. Drag & Drop Categorisation
```html
<div class="draggable-source" id="q1-source">
    <div class="drag-item" draggable="true" ondragstart="drag(event)" id="s1">Item</div>
</div>
<div class="bucket-container">
    <div class="bucket" id="bucket-a" ondrop="drop(event)" ondragover="allowDrop(event)">
        <h4>Category A</h4>
    </div>
    <div class="bucket" id="bucket-b" ondrop="drop(event)" ondragover="allowDrop(event)">
        <h4>Category B</h4>
    </div>
</div>
```

### 4. Sortable Order List
```html
<ul class="sortable-list" id="my-list">
    <!-- Items injected via JavaScript shuffle -->
</ul>
```

### 5. Matching Pairs (Click-to-Link)
```html
<div class="match-grid">
    <div class="col-defs">
        <div class="match-def" data-id="1">Definition text</div>
    </div>
    <div class="col-terms">
        <div class="match-term" data-id="1">Term</div>
    </div>
</div>
```

---

## Tracking System

### Internal Tracking Variables

```javascript
const mistakeCounts = { q1: 0, q2: 0, q3: 0, ... };  // Per-question mistakes
const completed = { q1: false, q2: false, ... };      // Completion status
let totalAttempts = 0;                                 // Total submissions
let assessmentFinished = false;
```

### Question Metadata (for PDF)

```javascript
const questionMeta = [
    { 
        id: 'q1', 
        title: 'Question Title', 
        correctAnswer: 'The correct answer(s)',
        justification: 'Why this is correct'
    },
    // ...
];
```

---

## PDF Generation

The PDF includes two pages:

### Page 1: Answers
- Test name (title)
- Teacher and time taken
- Logo (top right)
- Each question with correct answer and justification

### Page 2: Feedback & Reflection
- Feedback key table (C/E/L/T/M codes)
- Question summary with attempts column
- Empty "Code" column for student input
- Student Reflection box (green border)
- Teacher Comment box (purple border)

### Feedback Key

| Code | Meaning |
|------|---------|
| C | Content gap - I didn't know it or forgot it |
| E | Exam technique - I didn't read or answer the question properly |
| L | Language/clarity - My answer wasn't clear or missed key words |
| T | Time/effort - I ran out of time or didn't finish |
| M | Misread/misapplied - I knew it but used it in the wrong way |

---

## CSS Color Variables

```css
:root {
    --sg-blue: #003366;
    --sg-gold: #D4AF37;
    --sg-text: #333333;
    --sg-light-blue: #e6f0fa;
    --sg-grey: #f4f6f8;
    --correct-green: #28a745;
    --wrong-red: #dc3545;
    --reflection-green: #28a745;
    --teacher-purple: #6f42c1;
}
```

---

## File Structure

```
public/igcse/topic[N]/
├── [N].1_assessment.html    # Sub-topic 1 assessment
├── [N].2_assessment.html    # Sub-topic 2 assessment  
├── assessments.html         # Assessment index page
└── Topic[N]_End_of_unit_Test.html  # Full unit test (different format)
```

---

## Checklist for New Assessments

- [ ] Modal with test name and teacher dropdown
- [ ] Timer starts on assessment begin
- [ ] All question types implemented correctly
- [ ] Answer validation with visual feedback (green/red)
- [ ] Attempt tracking per question
- [ ] Completion triggers PDF download
- [ ] PDF includes answers page and feedback page
- [ ] Reflection boxes in PDF (green student, purple teacher)
- [ ] Back button and logo positioned correctly

---

## Example Files

Reference implementations:
- `public/igcse/topic4/4.1_assessment.html`
- `public/igcse/topic4/4.2_assessment.html`


