# KS3 Development Guide (Years 7-9)

> **Purpose:** Complete guide for creating KS3 Computer Science content for Years 7, 8, and 9.

---

## Student Profile

### Who Are KS3 Students?

| Year | Age | Characteristics |
|------|-----|-----------------|
| Year 7 | 11-12 | New to formal CS education, building foundations |
| Year 8 | 12-13 | Developing skills, more confident |
| Year 9 | 13-14 | Pre-IGCSE preparation, abstract thinking emerging |

**Key traits:**
- Diverse prior experience (some have coded at home, others haven't)
- Short attention spans; need variety and movement
- Respond well to games, challenges, and immediate feedback
- Developing abstract thinking; still need concrete examples
- May struggle with technical vocabulary without scaffolding

---

## Writing Guidelines

For complete language and tone guidelines, see [`agent_content.md`](./curriculum%20content%20guides/agent_content.md) (KS3 section).

### Quick Reference

| Aspect | Guideline |
|--------|-----------|
| **Sentence length** | 8-15 words maximum |
| **Vocabulary** | Everyday words first, then technical terms with explanation |
| **Tone** | Encouraging, curious, inclusive |
| **Questions** | "What is...?", "How does...?", "Give an example of..." |
| **Analogies** | Essential - use everyday objects |

### Example Transformation

❌ **Too complex:**
> "The fetch-execute cycle is the fundamental operational process by which a central processing unit retrieves program instructions from memory."

✅ **KS3 appropriate:**
> "Every second, the CPU does three things: it fetches (gets) an instruction, decodes (reads) it, and executes (does) it. This happens millions of times per second!"

---

## Lesson Structure

Every KS3 lesson follows this arc:

### 1. Title Slide
Auto-generated from frontmatter.

### 2. Retrieval Practice (5 Questions)
Recall questions from previous lessons/units.

### 3. Concepts & Skills
One core concept and one core skill for the lesson.

### 4. Lesson Objectives
3 clear objectives using active verbs (Define, Explain, Identify, Analyse).

### 5. The Hook (Big Question)
A provocative question to engage students.

### 6. Keywords (5 Terms)
Key terminology with simple definitions.

### 7. Mini Task
Short interactive activity (sorting, matching, identifying).

### 8. Main Task
The core learning activity.

### 9. Plenary
Assessment or reflection (Quiz, Discussion, True/False).

---

## Template System

### Build Process

KS3 uses Nunjucks templates:

```
src/pages/ks3/*.njk  →  npm run build  →  public/ks3/*.html
```

**NEVER edit HTML files in `public/ks3/` directly.** Edit the `.njk` source.

### Available Templates

| Template | Purpose | Use For |
|----------|---------|---------|
| `ks3-standalone.njk` | Full lesson with widgets | Lessons with timer, activities |
| `ks3-slide.njk` | Simple Reveal.js slides | Presentations |
| `base.njk` | Standard page layout | Index pages, resources |

### Frontmatter Structure

```yaml
---
layout: layouts/ks3-standalone.njk
title: "L2: Lesson Title | Year 7 Unit 2"
activeSection: "ks3"
backHref: ks3/year7/unit2.html
courseFooter: "Year 7 · Unit 2"

lesson:
  title: "Lesson Title"
  subtitle: "Unit 2: Becoming a Digital Citizen"
  
  recall:
    title: "Retrieval Practice"
    prompt: "Let's recall what we learned last lesson..."
    questions:
      - question: "What is a digital footprint?"
        answer: "The trail of data you leave online"
        
  objectives:
    - text: "Define what a digital citizen is"
    - text: "Identify examples of online behaviour"
    - text: "Explain why digital citizenship matters"
    
  concepts:
    - name: "Innovation"
      icon: "fa-lightbulb"
      definition: "How new technologies change communication"
      
  skills:
    - name: "Digital Literacy"
      icon: "fa-laptop"
      definition: "Understanding online spaces safely"
      
  hook:
    question: "What would people find if they searched for YOU online?"
    subtext: "Discuss with your partner for 60 seconds"
    timer: 60
    
  keywords:
    - term: "Digital Citizen"
      definition: "Someone who uses technology responsibly"
    - term: "Privacy"
      definition: "Keeping personal information safe"
      
  plenary:
    title: "True or False?"
    questions:
      - question: "Deleting a post removes it forever"
        answer: "False"
        reason: "Posts can be screenshotted and shared"
---

<!-- Custom HTML content goes here (Main Task, etc.) -->
```

---

## Creating a New Lesson

### Step 1: Duplicate Template

Copy an existing `.njk` file:
```
src/pages/ks3/year7/unit2/L1_digital_you.njk
```

### Step 2: Rename and Move

Rename to your lesson:
```
src/pages/ks3/year7/unit2/L2_digital_footprint.njk
```

### Step 3: Update Frontmatter

Edit the YAML data:
- Update `title`, `lesson.title`, `lesson.subtitle`
- Update `backHref` to point to unit index
- Fill in all lesson sections

### Step 4: Add Main Task Content

Below the `---` frontmatter, add custom HTML:

```html
<!-- MAIN TASK -->
<section>
    <h2>Main Task: Mapping Your Footprint</h2>
    <div class="cols">
        <div class="box">
            <h4>Step 1</h4>
            <p>List 5 apps you use regularly</p>
        </div>
        <div class="box-blue">
            <h4>Step 2</h4>
            <p>For each app, write what data it collects</p>
        </div>
    </div>
</section>
```

### Step 5: Build and Test

```bash
npm run build
# Open public/ks3/year7/unit2/L2_digital_footprint.html in browser
```

---

## Widget Library

### Timer Widget

The floating timer appears in the corner of KS3 slides:

```javascript
// Timer functions available globally:
toggleFloatingTimer()   // Start/pause
resetFloatingTimer()    // Reset to initial time
toggleTimerExpand()     // Show/hide timer panel
```

### Layout Components

**Two Column Layout:**
```html
<div class="cols">
    <div class="box">Left content</div>
    <div class="box-blue">Right content</div>
</div>
```

**Content Boxes:**
```html
<div class="box">White box with shadow</div>
<div class="box-blue">Blue background box</div>
<div class="box-yellow">Yellow/gold box</div>
```

**Question Box:**
```html
<div class="question-box">
    <p style="font-size:1.2em; margin:0;">The big question?</p>
</div>
```

### Fragments (Progressive Reveal)

```html
<p class="fragment fade-up">Appears on click</p>
<p class="fragment fade-in">Then this appears</p>
<p class="fragment">Then this</p>
```

### Vertical Slides (Deep Dives)

```html
<section>
    <section>
        <!-- Main slide -->
        <h3>Topic Overview</h3>
        <p>Press down for more detail</p>
    </section>
    <section>
        <!-- Vertical slide 1 -->
        <h3>Step 1</h3>
    </section>
    <section>
        <!-- Vertical slide 2 -->
        <h3>Step 2</h3>
    </section>
</section>
```

---

## Content Guidelines

### Keywords

Format each keyword with:
- Simple definition (10-15 words)
- Everyday language
- Icon for dual-coding

```yaml
keywords:
  - term: "Password"
    definition: "A secret word or phrase that only you know, used to log in"
  - term: "Data"
    definition: "Information stored or processed by a computer"
```

### Retrieval Practice

5 quick questions from previous learning:
- Mix of recall and application
- Clear, concise questions
- Short answers

```yaml
recall:
  questions:
    - question: "What is an input device?"
      answer: "A device that sends data INTO the computer"
    - question: "Give one example of an input device"
      answer: "Keyboard, mouse, microphone, etc."
```

### Plenary (True/False)

3 statements targeting common misconceptions:

```yaml
plenary:
  questions:
    - question: "Privacy settings make me 100% safe online"
      answer: "False"
      reason: "Settings help but aren't perfect - companies can still collect some data"
```

---

## Year 7 Unit Structure

### Unit 2: Becoming a Digital Citizen (Example)

| Lesson | Title | Focus |
|--------|-------|-------|
| L1 | What Is a Digital Citizen? | Digital citizenship, online behaviour |
| L2 | Understanding Your Digital Footprint | Active vs passive footprints |
| L3 | Public vs Private Information | Data categories, safety |
| L4 | How Platforms Collect Data | Algorithms, filter bubbles |
| L5 | Online Identity & Reputation | Long-term impact |
| L6 | Misinformation & Fake News | Source evaluation |
| L7 | Cyberbullying & Harmful Contact | Safety, reporting |
| L8 | Project Workshop: "Digital Me" | Creative artefact |
| L9 | Final Project & Reflection | Peer review |

---

## Accessibility Considerations

### ADHD
- Use short video hooks followed by brief discussion
- Timers for sorting tasks
- Break activities into small, numbered steps

### Dyslexia
- All text compatible with Immersive Reader
- Dual-coded icons for keywords
- Simple diagrams for concepts

### EAL
- Pre-teach 5 essential terms
- Use image-led scenarios
- Provide sentence starters

### Low Floor / High Ceiling

Every activity should offer:

- **Low floor:** Entry point accessible to all
  - Example: Sort 10 items into Public/Private

- **High ceiling:** Extension for advanced students
  - Example: Analyse a real privacy policy and identify 3 data practices

---

## CSS Reference

KS3 slides use `public/css/ks3-deck.css` which extends `slide-deck.css`.

### Key Classes

```css
.box           /* White content box */
.box-blue      /* Blue background box */
.box-yellow    /* Gold/yellow box */
.cols          /* Two-column grid */
.cols-3        /* Three-column grid */
.question-box  /* Styled question container */
.key-term      /* Keyword definition box */
.small-text    /* Smaller font size */
```

---

## File Locations

| Resource | Location |
|----------|----------|
| Templates | `src/templates/layouts/ks3-*.njk` |
| Page sources | `src/pages/ks3/` |
| Output HTML | `public/ks3/` |
| CSS | `public/css/ks3-deck.css` |
| JS | `public/js/ks3-widgets.js` |
| Content plans | `docs/content/ks3/` |
| Master template | `docs/templates/ks3/master-template.html` |

---

## Quick Checklist

Before publishing a KS3 lesson:

```
□ Title and objectives are clear
□ Retrieval practice has 5 questions
□ Hook creates curiosity
□ Keywords have simple definitions
□ Mini task is interactive
□ Main task has clear instructions
□ Plenary checks for misconceptions
□ Low floor AND high ceiling options
□ No jargon without explanation
□ Timer works (if used)
□ All fragments reveal correctly
□ Mobile view works
□ npm run build completes
```

---

## Reference Examples

Study these completed lessons:
- `public/ks3/year7/unit2/L1_digital_you.html`
- `public/ks3/year7/unit2/L2_the_trail_you_leave_behind.html`
- `public/ks3/year7/unit2/L3_what_will_people_think.html`

