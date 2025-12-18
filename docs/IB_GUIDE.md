# IB Development Guide (Years 12-13)

> **Purpose:** Complete guide for creating IB Computer Science content for Higher Level (HL) and Standard Level (SL) students.

---

## Table of Contents

1. [Student Profile](#student-profile)
2. [IB Syllabus Overview](#ib-syllabus-overview)
3. [Writing Guidelines](#writing-guidelines)
4. [Slide Deck Creation](#slide-deck-creation)
5. [HL vs SL Differentiation](#hl-vs-sl-differentiation)
6. [File Locations](#file-locations)

---

## Student Profile

### Who Are IB Students?

| Year | Age | Level | Characteristics |
|------|-----|-------|-----------------|
| Year 12 | 16-17 | SL/HL | Starting IB Diploma, building on IGCSE |
| Year 13 | 17-18 | SL/HL | Exam preparation, IA completion |

**Key traits:**
- High academic ability and motivation
- Can handle abstract reasoning
- Expected to make connections independently
- Preparing for university-level study
- Internal Assessment (IA) requires research skills
- Fluent with technical vocabulary

---

## IB Syllabus Overview

The IB Computer Science syllabus (First assessment 2027) is organized into:

### Strand A: Computational Thinking (SL & HL)

| Topic | Focus |
|-------|-------|
| **A1** | Binary representations, logic |
| **A2** | Algorithms and algorithmic thinking |
| **A3** | Programming fundamentals |
| **A4** | Data structures |

### Strand B: Computer Systems (SL & HL Core, HL Extensions)

| Topic | Focus | Level |
|-------|-------|-------|
| **B1** | Computer organization | SL & HL |
| **B2** | Programming | SL & HL |
| **B3** | Networks | SL & HL |
| **B4** | Abstract data types | HL only |

### Internal Assessment

- 30% of final grade (SL) / 20% of final grade (HL)
- Computational solution to a problem
- Requires documentation and reflection

---

## Writing Guidelines

For complete language and tone guidelines, see [`agent_content.md`](./curriculum%20content%20guides/agent_content.md) (IB section).

### Quick Reference

| Aspect | Guideline |
|--------|-----------|
| **Sentence length** | Variable (15-25 words), complex structures allowed |
| **Vocabulary** | Full technical vocabulary, academic register |
| **Tone** | Scholarly, challenging, nuanced |
| **Questions** | "Evaluate...", "Analyse...", "To what extent..." |
| **Analogies** | Optional - assume prior knowledge |

### IB Command Terms

| Command | Meaning | Depth |
|---------|---------|-------|
| **Define** | Precise meaning | Brief, exact |
| **Outline** | Brief account | Key features only |
| **Describe** | Detailed account | Characteristics, not reasons |
| **Explain** | Detailed account with reasons | How and why |
| **Analyse** | Break down components | Structure and connections |
| **Evaluate** | Make judgement | Balanced conclusion |
| **Discuss** | Balanced review | Multiple perspectives |
| **Compare** | Similarities and differences | Reference to both |
| **To what extent** | Merits and limitations | Conclude with degree |

---

## Slide Deck Creation

> **📖 Also read:** [`REVEAL_TECHNIQUES.md`](./REVEAL_TECHNIQUES.md) for making slides engaging with fragments, vertical slides, r-stack, and more.

### Template Structure

IB slide decks follow this HTML skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TOPIC_CODE}} {{TOPIC_TITLE}} | IB Computer Science</title>

    <!-- Reveal.js CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reset.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/theme/white.min.css">

    <!-- Highlight.js -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="../../css/slide-deck.css">
</head>
<body>
    <!-- Navigation -->
    <a href="../../ib/{{TOPIC_FOLDER}}/index.html" id="back-btn" class="back-nav">
        <i class="fa-solid fa-circle-arrow-left"></i>
    </a>
    <img src="../../images/Logo.png" id="sg-logo" alt="Logo">
    <div class="footer-text live-date" id="live-date-display"></div>
    <div class="footer-text course-footer">IB Computer Science</div>

    <div class="reveal">
        <div class="slides">
            <!-- SLIDES CONTENT -->
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/plugin/highlight/highlight.min.js"></script>
    <script src="../../js/slide-deck.js"></script>
    <script>
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('live-date-display').innerText = new Date().toLocaleDateString('en-GB', dateOptions);
    </script>
</body>
</html>
```

---

### Slide Types

#### 1. Title Slide

```html
<section>
    <div class="title-container">
        <div class="title-line-top"></div>
        <div>
            <h1 class="main-title">B2.1 Programming Fundamentals</h1>
            <h3 class="sub-title">Topic B2: Programming | Variables, Types & Operations</h3>
        </div>
        <div class="title-line-bottom"></div>
    </div>
</section>
```

#### 2. The Hook / Big Question

```html
<section>
    <h2>The Big Question</h2>
    <div class="question-box">
        <p style="font-size:1.2em;">Why do programming languages need different data types?</p>
    </div>
    <div class="cols fragment">
        <div class="box-blue">
            <h4><i class="fa-solid fa-microchip"></i> The Problem</h4>
            <p>Computers store everything as binary. How do we represent text, numbers, and logic?</p>
        </div>
        <div class="box">
            <h4><i class="fa-solid fa-code"></i> The Solution</h4>
            <p>Type systems enable meaningful interpretation of binary data.</p>
        </div>
    </div>
</section>
```

#### 3. Standard Content Slide

```html
<section>
    <h3>Slide Title</h3>
    <div class="cols">
        <div class="box">
            <p>Left content with key points...</p>
        </div>
        <div class="box-blue fragment">
            <p>Right content (appears on click)...</p>
        </div>
    </div>
</section>
```

#### 4. Key Terms

```html
<div class="key-term fragment">
    <h3>Recursion</h3>
    <p>A programming paradigm where a function invokes itself with modified parameters, progressing toward a base case.</p>
</div>
```

#### 5. Step-by-Step (Vertical Slides)

```html
<section>
    <section data-background="#e6f0fa">
        <div class="question-box">
            <p><strong>How does recursion work?</strong></p>
            <p class="small-text">Press Down to see each step.</p>
        </div>
    </section>
    <section>
        <div class="question-box">
            <p><strong>Step 1:</strong> Function calls itself with smaller input</p>
        </div>
    </section>
    <section>
        <div class="question-box">
            <p><strong>Step 2:</strong> Base case reached</p>
        </div>
    </section>
    <section>
        <div class="question-box">
            <p><strong>Step 3:</strong> Results propagate back up the call stack</p>
        </div>
    </section>
</section>
```

#### 6. Code Examples

```html
<section>
    <h3>Recursive Factorial</h3>
    <pre><code class="python" data-trim>
def factorial(n):
    if n <= 1:          # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case
    </code></pre>
    <div class="fragment box-blue">
        <p><strong>Time Complexity:</strong> O(n)</p>
        <p><strong>Space Complexity:</strong> O(n) due to call stack</p>
    </div>
</section>
```

#### 7. True or False Check

```html
<section>
    <section>
        <h2><i class="fa-solid fa-check-double"></i> True or False?</h2>
        <ol>
            <li>Recursion always uses less memory than iteration</li>
            <li>Every recursive function needs a base case</li>
            <li>Tail recursion can be optimized by compilers</li>
        </ol>
        <p class="small-text"><i class="fa-solid fa-arrow-down"></i> Press Down for answers</p>
    </section>
    <section>
        <h3>Question 1</h3>
        <div class="question-box">Recursion always uses less memory than iteration</div>
        <div class="fragment box-blue">
            <p><strong>False</strong></p>
            <p>Recursion typically uses more memory due to call stack overhead.</p>
        </div>
    </section>
</section>
```

---

### Content Transformation

#### IB-Level Definitions

Transform simple definitions into analytical content:

❌ **Too simple:**
> "Recursion is when a function calls itself."

✅ **IB appropriate:**
> "Recursion is a programming paradigm where a function invokes itself with modified parameters, progressing toward a base case that terminates the recursive chain. Recursive solutions often provide elegant implementations for inherently recursive structures (trees, graphs) and divide-and-conquer algorithms, though they may incur stack overhead compared to iterative alternatives."

#### Algorithm Analysis

Always include complexity analysis for IB:

```html
<div class="box-blue fragment">
    <h4>Complexity Analysis</h4>
    <p><strong>Time:</strong> O(n log n) - divide and conquer</p>
    <p><strong>Space:</strong> O(n) - auxiliary array</p>
    <p><strong>Stability:</strong> Stable (preserves relative order)</p>
</div>
```

#### Comparative Analysis

Use tables for comparing approaches:

```html
<table>
    <thead>
        <tr><th>Aspect</th><th>Recursion</th><th>Iteration</th></tr>
    </thead>
    <tbody>
        <tr><td>Readability</td><td>Often clearer for tree structures</td><td>Better for linear processes</td></tr>
        <tr><td>Memory</td><td>O(n) stack space</td><td>O(1) typically</td></tr>
        <tr><td>Performance</td><td>Function call overhead</td><td>Generally faster</td></tr>
    </tbody>
</table>
```

---

## HL vs SL Differentiation

### Topics by Level

| Topic | SL | HL Extension |
|-------|-----|--------------|
| A1-A4 | Core content | Deeper analysis |
| B1-B3 | Core content | Extended topics |
| B4 | Not required | **HL Only** - ADTs |

### HL-Only Content

When creating HL content, clearly mark it:

```html
<section>
    <h3><span class="hl-badge">HL</span> Abstract Data Types</h3>
    <p>This content is for Higher Level students only.</p>
</section>
```

With CSS:
```css
.hl-badge {
    background: var(--sg-gold);
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.7em;
    vertical-align: middle;
}
```

### B4: Abstract Data Types (HL Only)

Key topics to cover:
- Linked Lists
- Stacks and Queues
- Binary Search Trees
- Recursion in data structures
- Time/space complexity analysis

---

## Pedagogical Approach

### Conceptual Connections

Explicitly link topics across the syllabus:

```html
<div class="box fragment">
    <p><strong>Connection:</strong> This is an example of <em>abstraction</em> (A1), 
    applied to <em>algorithm design</em> (A2), implemented through 
    <em>programming constructs</em> (B2).</p>
</div>
```

### Thinking Skills Integration

Every IB lesson should develop:
- Abstract thinking
- Pattern generalisation
- Algorithm design
- Computational complexity analysis
- Ethical reasoning

### IA Connection Points

Where relevant, note how content connects to the Internal Assessment:

```html
<div class="box-blue fragment">
    <h4><i class="fa-solid fa-clipboard"></i> IA Connection</h4>
    <p>Recursion could be used in your IA for tree traversal, 
    file system navigation, or game AI decision trees.</p>
</div>
```

---

## Component Library

### Standard Boxes
```html
<div class="box">White box</div>
<div class="box-blue">Blue emphasis box</div>
<div class="question-box">Question container</div>
<div class="key-term">Definition box</div>
```

### Code Blocks
```html
<pre><code class="python" data-trim>
def example():
    return "Syntax highlighted"
</code></pre>
```

### Two-Column Comparison
```html
<div class="cols">
    <div class="box">Approach A</div>
    <div class="box-blue">Approach B</div>
</div>
```

### Fragments for Progressive Disclosure
```html
<p class="fragment">Appears first</p>
<p class="fragment">Then this</p>
<p class="fragment">Finally this</p>
```

---

## File Locations

| Resource | Location |
|----------|----------|
| Page sources | `src/pages/ib/` |
| Output HTML | `public/ib/` |
| Slide CSS | `public/css/slide-deck.css` |
| Slide JS | `public/js/slide-deck.js` |
| Source content | `docs/content/ib/` |
| IB workflow | `.agent/workflows/generate_slides.md` |

---

## Content Sources

IB textbook content is in `docs/content/ib/textbooks/`:

| File | Content |
|------|---------|
| `A1.txt` | Computational thinking |
| `A2.txt` | Algorithms |
| `A3.txt` | Programming fundamentals |
| `A4.txt` | Data structures |
| `B1.txt` | Computer organization |
| `B2/` | Programming (with subfiles) |
| `B3.txt` | Networks |
| `B4.txt` | Abstract data types (HL) |

Keywords are in `B2/B2_X_keywords.txt` files.

---

## Slide Deck Checklist

Before publishing an IB slide deck:

```
□ Uses IB command terms correctly
□ Includes complexity analysis (where applicable)
□ HL content clearly marked
□ Connections to other topics explicit
□ IA relevance noted (where applicable)
□ Code examples use correct syntax highlighting
□ Ethical/societal implications discussed
□ Past paper question reference included
□ Academic register throughout
□ npm run build completes
```

---

## Reference Examples

### Existing IB Content
- `public/ib/B2/index.html` - Topic B2 index
- `public/ib/B2/B2.1_programming_fundamentals.html` - Programming fundamentals
- `public/ib/B4/LL_Visualisation.html` - Linked list visualizer
- `public/ib/B4/BST_Visualisation.html` - Binary search tree visualizer

### Visualizers
- `public/ib/B2/recursion-visualizer.html` - Recursion visualization
- `public/ib/B2/Big_0_notation.html` - Big O complexity

---

## Exam Preparation

### Past Paper Integration

Reference past paper questions in slides:

```html
<div class="box fragment">
    <h4><i class="fa-solid fa-file-lines"></i> Exam Practice</h4>
    <p><strong>May 2023, Paper 1, Q5:</strong> "Explain how a stack could be implemented using a linked list."</p>
    <p class="small-text">This is a 6-mark question requiring implementation detail.</p>
</div>
```

### Mark Scheme Language

Use precise language that matches mark schemes:

```html
<div class="key-term">
    <h3>Stack</h3>
    <p>A <strong>Last-In-First-Out (LIFO)</strong> abstract data type 
    that supports <strong>push</strong> (add to top) and 
    <strong>pop</strong> (remove from top) operations.</p>
</div>
```

---

## Quality Standards

An IB slide deck should:

✅ Use IB command terms correctly
✅ Include algorithm complexity analysis
✅ Connect concepts across syllabus strands
✅ Differentiate HL from SL content
✅ Reference exam-style questions
✅ Use academic, precise language
✅ Include code with syntax highlighting
✅ Address ethical implications
✅ Support independent learning

❌ Never:
- Oversimplify complex concepts
- Omit complexity analysis
- Mix HL/SL without labeling
- Use casual language for definitions
- Skip exam preparation links

