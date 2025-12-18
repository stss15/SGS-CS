# Assessment PDF Generation Guide

## Overview
This document outlines the standard for generating feedback PDFs for IGCSE assessments. The goal is to produce a high-quality, educational document that serves as a revision resource, rather than just a simple score report.

## The Problem (Previous Approach)
Previously, the `generatePDF` function was generic. It often:
- Omitted the full text of the questions.
- Displayed answers in a raw or unformatted state (e.g., just "True" or "False" without context).
- Used a static rectangle for the "Teacher Comment" section, which required printing and handwriting feedback.
- Lacked visual hierarchy and clear separation between questions.

## The Solution (New Standard)
The new standard requires a bespoke `generatePDF` function for each assessment that:
1.  **Explicitly formats each question**: Includes the full question text and the correct answer in a clear, readable layout.
2.  **Uses visual aids**: Utilizes boxes, arrows, and bold text to explain answers (e.g., matching pairs, cycles, categories).
3.  **Provides Editable Feedback**: Uses `AcroFormTextField` to create an interactive "Teacher Comment" box that can be typed into directly within the PDF viewer.

## Reference Implementations
The following files serve as the **Gold Standard** for this implementation. Refer to them when updating other assessments:

- **Topic 4.1**: [`public/igcse/topic4/4.1_assessment.html`](../../public/igcse/topic4/4.1_assessment.html)
- **Topic 4.2**: [`public/igcse/topic4/4.2_assessment.html`](../../public/igcse/topic4/4.2_assessment.html)

## Implementation Details

### 1. Helper Functions
Define these helpers inside `generatePDF` to maintain consistency and reduce code duplication:

```javascript
// Check if a page break is needed based on content height
function checkPageBreak(heightNeeded) {
    if (yPos + heightNeeded > pageHeight - margin) {
        doc.addPage();
        yPos = 20;
    }
}

// Add a standard section header
function addSectionHeader(title) {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor('#003366'); // SG Blue
    doc.text(title, margin, yPos);
    yPos += 7;
}

// Add wrapped question text
function addQuestionText(text) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor('#333333');
    const splitText = doc.splitTextToSize(text, contentWidth);
    checkPageBreak(splitText.length * 5);
    doc.text(splitText, margin, yPos);
    yPos += (splitText.length * 5) + 3;
}

// (Optional) Helper for boxed answers (e.g., for Drag & Drop)
function addAnswerBox(label, items, color = '#e6f0fa') {
    // ... implementation for drawing rounded rects with text ...
}
```

### 2. Question Formatting Patterns

#### True/False
List the statement followed by the correct status (True/False) in bold.
```javascript
doc.text('1. Statement text... ', margin, yPos);
doc.setFont('helvetica', 'bold');
doc.text('→ TRUE', margin + 130, yPos);
```

#### Matching / Pairs
Use an arrow symbol (`→`) to connect the left side to the right side.
```javascript
doc.text('Left Item', margin, yPos);
doc.text('→ Right Item', margin + 80, yPos);
```

#### Ordering / Cycles
List items with numbered steps.
```javascript
const steps = ['1. Step One', '2. Step Two', ...];
steps.forEach(step => {
    doc.text(step, margin + 20, yPos);
    yPos += 7;
});
```

### 3. Editable Fields
Use `AcroFormTextField` for the Student Reflection and Teacher Comment boxes.

```javascript
// Draw the visual border first
doc.setDrawColor(111, 66, 193); // Purple for Teacher
doc.rect(margin, yPos, contentWidth, boxHeight, 'S');

// Add the interactive field on top
const teacherField = new doc.AcroFormTextField();
teacherField.Rect = [margin + 2, yPos + 12, contentWidth - 4, boxHeight - 16];
teacherField.fieldName = 'teacher_comment';
teacherField.multiline = true;
teacherField.maxFontSize = 10;
doc.addField(teacherField);
```

## Checklist for Updating Assessments
- [ ] **Full Text**: Are all questions fully written out?
- [ ] **Correct Answers**: Are the correct answers clearly shown?
- [ ] **Visuals**: Are complex questions (Drag & Drop, Diagrams) presented visually (e.g., using boxes or columns)?
- [ ] **Teacher Comment**: Is the teacher comment box editable?
- [ ] **Page Breaks**: logic prevents content from being cut off at the bottom of the page?
