# Reveal.js Techniques for Engaging Slides

> **Purpose:** Quick reference for AI agents creating slide decks. Use these techniques to make content engaging — don't just create "next slide, next slide" presentations.

---

## The Problem

AI models often default to:
- ❌ One slide per point (click → next slide → click → next slide)
- ❌ All content visible immediately
- ❌ Flat, linear navigation only
- ❌ No visual progression or surprise

This creates **boring, passive** presentations.

---

## The Solution: Pacing & Structure

Reveal.js offers powerful features for:
- **Pacing** — reveal content progressively within a single slide
- **Hierarchy** — use vertical slides for deep dives
- **Visual Interest** — animate, highlight, layer content
- **Engagement** — create moments of discovery

---

## 1. Fragments: Progressive Reveal

### Why Use Fragments?

Fragments reveal content **one piece at a time** on the same slide. This:
- Controls pacing (students can't read ahead)
- Creates anticipation
- Focuses attention on one thing at a time
- Allows questions before answers

### Basic Fragment

```html
<p class="fragment">This appears first</p>
<p class="fragment">Then this</p>
<p class="fragment">Finally this</p>
```

### Fragment Styles

| Class | Effect | Use For |
|-------|--------|---------|
| `fragment` | Fade in | Default reveal |
| `fragment fade-up` | Slide up + fade | List items, answers |
| `fragment fade-down` | Slide down + fade | Emphasis |
| `fragment fade-left` | Slide from right | Comparisons |
| `fragment fade-right` | Slide from left | Comparisons |
| `fragment fade-in-then-out` | Appear then disappear | Layered reveals |
| `fragment fade-in-then-semi-out` | Appear then dim | Focus progression |
| `fragment highlight-red` | Turn red | Emphasis, warnings |
| `fragment highlight-blue` | Turn blue | Key terms |
| `fragment highlight-green` | Turn green | Correct answers |
| `fragment highlight-current-red` | Red only while current | Temporary focus |
| `fragment highlight-current-blue` | Blue only while current | Temporary focus |
| `fragment grow` | Scale up | Important points |
| `fragment shrink` | Scale down | De-emphasis |
| `fragment strike` | Strikethrough | Corrections, myths |

### Fragment Order

Control the order fragments appear:

```html
<p class="fragment" data-fragment-index="2">Second</p>
<p class="fragment" data-fragment-index="1">First</p>
<p class="fragment" data-fragment-index="3">Third</p>
```

### Nested Fragments

Reveal parent, then children:

```html
<div class="fragment">
    <p>Parent appears first</p>
    <p class="fragment">Then this child</p>
    <p class="fragment">Then this one</p>
</div>
```

---

## 2. The Question-Answer Pattern

**Best practice:** Show question, pause, then reveal answer.

```html
<section>
    <h3>Quick Check</h3>
    <div class="question-box">
        <p>What type of memory loses its contents when power is off?</p>
    </div>
    <div class="fragment box-blue">
        <p><strong>Answer:</strong> RAM (Random Access Memory)</p>
        <p class="small-text">This is why it's called "volatile" memory</p>
    </div>
</section>
```

### Multiple Choice with Reveal

```html
<section>
    <h3>Which is faster?</h3>
    <div class="cols">
        <div class="box fragment highlight-current-blue" data-fragment-index="1">
            <p>A) Hard Drive</p>
        </div>
        <div class="box fragment highlight-current-blue" data-fragment-index="1">
            <p>B) SSD</p>
        </div>
        <div class="box fragment highlight-current-blue" data-fragment-index="1">
            <p>C) RAM</p>
        </div>
    </div>
    <div class="fragment box-blue" data-fragment-index="2">
        <p><strong>Answer: C) RAM</strong></p>
        <p>RAM is fastest because the CPU can access it directly</p>
    </div>
</section>
```

---

## 3. R-Stack: Layered Content

R-Stack lets you **layer content** on top of each other, showing one at a time.

### Basic R-Stack

```html
<div class="r-stack">
    <img class="fragment fade-in-then-out" src="step1.png">
    <img class="fragment fade-in-then-out" src="step2.png">
    <img class="fragment fade-in" src="step3.png">
</div>
```

### Progressive Diagram

Perfect for building up complex diagrams:

```html
<div class="r-stack">
    <div class="fragment fade-in-then-out">
        <h4>Step 1: Fetch</h4>
        <p>CPU retrieves instruction from memory</p>
    </div>
    <div class="fragment fade-in-then-out">
        <h4>Step 2: Decode</h4>
        <p>CPU interprets what the instruction means</p>
    </div>
    <div class="fragment fade-in">
        <h4>Step 3: Execute</h4>
        <p>CPU performs the operation</p>
    </div>
</div>
```

### Comparison Layers

Show "before vs after" or "wrong vs right":

```html
<div class="r-stack">
    <div class="fragment fade-in-then-out box" style="background: #fee;">
        <h4>❌ Common Mistake</h4>
        <p>"RAM stores files permanently"</p>
    </div>
    <div class="fragment fade-in box-blue">
        <h4>✅ Correct Understanding</h4>
        <p>"RAM only stores data while power is on"</p>
    </div>
</div>
```

---

## 4. Vertical Slides: Deep Dives

### Why Vertical Slides?

- **Horizontal (→)**: Move to next topic
- **Vertical (↓)**: Go deeper on same topic

This creates a **2D navigation** structure:

```
[Topic 1] → [Topic 2] → [Topic 3]
    ↓           ↓
[Detail]    [Detail]
    ↓           ↓
[More]      [More]
```

### ⚠️ CRITICAL: Correct Vertical Slide Structure

**The #1 mistake** that causes visual bugs (overlapping content) is mixing direct content with nested sections:

```html
<!-- ❌ WRONG: Content + nested section causes overlap! -->
<section>
    <h3>Main Topic</h3>
    <div class="cols">...</div>
    <section data-background="#fff3e0">
        <h3>Quick Check</h3>
    </section>
</section>

<!-- ✅ CORRECT: Wrap parent content in its own section -->
<section>
    <section>
        <h3>Main Topic</h3>
        <div class="cols">...</div>
        <p class="small-text"><i class="fa-solid fa-arrow-down"></i> Quick Check</p>
    </section>
    <section data-background="#fff3e0">
        <h3>Quick Check</h3>
    </section>
</section>
```

**Rule:** When using vertical slides, ALL content must be inside `<section>` tags. Never mix direct HTML content (like `<h3>`, `<div>`) with nested `<section>` tags in the same parent.

### Basic Vertical Stack

```html
<section>
    <!-- Main slide (horizontal) — wrapped in section -->
    <section>
        <h3>The CPU</h3>
        <p>The "brain" of the computer</p>
        <p class="small-text"><i class="fa-solid fa-arrow-down"></i> Press Down for details</p>
    </section>
    
    <!-- Vertical slide 1 -->
    <section>
        <h3>Component 1: ALU</h3>
        <p>Arithmetic Logic Unit - does calculations</p>
    </section>
    
    <!-- Vertical slide 2 -->
    <section>
        <h3>Component 2: Control Unit</h3>
        <p>Manages the fetch-execute cycle</p>
    </section>
    
    <!-- Vertical slide 3 -->
    <section>
        <h3>Component 3: Registers</h3>
        <p>Tiny, fast storage inside the CPU</p>
    </section>
</section>
```

### Deep Dive Indicator

Always tell students there's more content below:

```html
<section>
    <h3>Overview Topic</h3>
    <p>Main content here...</p>
    
    <div style="text-align:center; margin-top: 1em;">
        <i class="fa-solid fa-arrow-down blue"></i>
        <span class="small-text blue"> Deep Dive: Technical Details</span>
    </div>
</section>
```

### When to Use Vertical Slides

| Use Vertical For | Use Horizontal For |
|------------------|-------------------|
| Optional detail | Moving to next topic |
| Step-by-step processes | Different concepts |
| Q&A reveal (question → answer below) | Lesson structure |
| Examples that expand on theory | Core content flow |

---

## 5. Auto-Animate: Smooth Transitions

Auto-animate creates smooth transitions between slides by animating matching elements.

### Basic Auto-Animate

```html
<section data-auto-animate>
    <h2 style="margin-top: 200px;">Title</h2>
</section>

<section data-auto-animate>
    <h2 style="margin-top: 0px; font-size: 1.5em;">Title</h2>
    <p>Now there's more content</p>
</section>
```

### Moving Elements

```html
<section data-auto-animate>
    <div class="box" data-id="box1" style="width: 100px;">Small</div>
</section>

<section data-auto-animate>
    <div class="box" data-id="box1" style="width: 400px;">Expanded!</div>
</section>
```

### Code Animation

Highlight different lines progressively:

```html
<section data-auto-animate>
    <pre data-id="code"><code data-line-numbers>
def greet(name):
    message = "Hello, " + name
    return message
    </code></pre>
</section>

<section data-auto-animate>
    <pre data-id="code"><code data-line-numbers="1">
def greet(name):
    message = "Hello, " + name
    return message
    </code></pre>
    <p>Line 1: Define the function</p>
</section>

<section data-auto-animate>
    <pre data-id="code"><code data-line-numbers="2">
def greet(name):
    message = "Hello, " + name
    return message
    </code></pre>
    <p>Line 2: Create the message</p>
</section>
```

### Auto-Animate Settings

```html
<section data-auto-animate 
         data-auto-animate-duration="0.8"
         data-auto-animate-easing="ease-in-out">
```

---

## 6. Backgrounds: Visual Context

### Solid Color Backgrounds

```html
<section data-background="#e6f0fa">
    <h3>Blue background for emphasis</h3>
</section>

<section data-background="#f4f4f4">
    <h3>Light grey for neutral</h3>
</section>
```

### Image Backgrounds

```html
<section data-background-image="path/to/image.jpg" 
         data-background-opacity="0.3">
    <h3>Text over faded image</h3>
</section>
```

### Gradient Backgrounds

```html
<section data-background-gradient="linear-gradient(to bottom, #0E214B, #1a3a7a)">
    <h3 style="color: white;">Dark gradient</h3>
</section>
```

### When to Use Backgrounds

| Background | Use For |
|------------|---------|
| Light blue `#e6f0fa` | Questions, retrieval practice |
| Light grey `#f4f4f4` | Deep dive / detail slides |
| White (default) | Main content |
| Dark gradient | Title slides, section dividers |
| Image (faded) | Real-world context, case studies |

---

## 7. Code Highlighting

### Basic Syntax Highlighting

```html
<pre><code class="python">
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
</code></pre>
```

### Line Numbers

```html
<pre><code class="python" data-line-numbers>
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
</code></pre>
```

### Step-Through Code (Highlight Lines)

```html
<pre><code class="python" data-line-numbers="1|2-3|4">
def factorial(n):      # Click: highlight line 1
    if n <= 1:         # Click: highlight lines 2-3
        return 1
    return n * factorial(n - 1)  # Click: highlight line 4
</code></pre>
```

This is **incredibly powerful** for code traces — students see exactly which line you're discussing.

---

## 8. Speaker Notes

Add notes only you can see (press `S` to open speaker view):

```html
<section>
    <h3>Topic</h3>
    <p>Public content</p>
    
    <aside class="notes">
        - Ask students what they think first
        - Wait for answers before revealing
        - Common misconception: students think X, but actually Y
        - Spend ~3 minutes on this slide
    </aside>
</section>
```

---

## 9. Combining Techniques

### Example: Complete Question Slide

```html
<section>
    <!-- Question on main slide -->
    <section data-background="#e6f0fa">
        <h3><i class="fa-solid fa-question-circle"></i> Think About It</h3>
        <div class="question-box">
            <p>Why can't the CPU access the hard drive directly?</p>
        </div>
        <p class="small-text"><i class="fa-solid fa-arrow-down"></i> Press down for answer</p>
    </section>
    
    <!-- Answer on vertical slide -->
    <section>
        <h3>The Answer</h3>
        <div class="fragment box-blue">
            <p><strong>Speed difference!</strong></p>
            <p>The CPU operates in nanoseconds. Hard drives operate in milliseconds.</p>
        </div>
        <div class="fragment">
            <p class="small-text">That's why we need RAM as a "middleman"</p>
        </div>
    </section>
</section>
```

### Example: Progressive Concept Build

```html
<section>
    <h3>What is a Network?</h3>
    
    <div class="fragment">
        <p>🤔 Think of your home...</p>
    </div>
    
    <div class="fragment">
        <p>📱 Your phone connects to WiFi</p>
    </div>
    
    <div class="fragment">
        <p>💻 Your laptop connects to WiFi</p>
    </div>
    
    <div class="fragment">
        <p>🖨️ Your printer connects to WiFi</p>
    </div>
    
    <div class="fragment box-blue">
        <p><strong>That's a network!</strong></p>
        <p>Two or more devices connected together to share resources</p>
    </div>
</section>
```

### Example: Myth Busting with R-Stack

```html
<section>
    <h3>Common Misconception</h3>
    
    <div class="r-stack">
        <div class="fragment fade-in-then-out">
            <div class="box" style="background: #fee;">
                <h4>❌ "More RAM makes everything faster"</h4>
            </div>
        </div>
        
        <div class="fragment fade-in">
            <div class="box-blue">
                <h4>✅ The Truth</h4>
                <p>RAM only helps if you're running out of it.</p>
                <p class="small-text">16GB is plenty for most users. 8GB is fine for basic tasks.</p>
            </div>
        </div>
    </div>
</section>
```

---

## 10. Anti-Patterns to Avoid

### ❌ DON'T: Mix Direct Content with Nested Sections (CRITICAL!)

```html
<!-- BAD: Causes overlapping/visual bugs -->
<section>
    <h3>Topic</h3>
    <div>Content</div>
    <section data-background="#fff3e0">Quick Check</section>
</section>
```

### ✅ DO: Wrap All Content in Sections When Using Vertical Slides

```html
<!-- GOOD: Parent content wrapped properly -->
<section>
    <section>
        <h3>Topic</h3>
        <div>Content</div>
        <p class="small-text"><i class="fa-solid fa-arrow-down"></i> Quick Check</p>
    </section>
    <section data-background="#fff3e0">Quick Check</section>
</section>
```

### ❌ DON'T: One Point Per Slide

```html
<!-- BAD: Creates boring click-through -->
<section><p>Point 1</p></section>
<section><p>Point 2</p></section>
<section><p>Point 3</p></section>
```

### ✅ DO: Group Related Points with Fragments

```html
<!-- GOOD: Progressive reveal on one slide -->
<section>
    <h3>Key Points</h3>
    <p class="fragment">Point 1</p>
    <p class="fragment">Point 2</p>
    <p class="fragment">Point 3</p>
</section>
```

### ❌ DON'T: Show Answer Immediately

```html
<!-- BAD: No thinking time -->
<section>
    <p>Question: What is RAM?</p>
    <p>Answer: Random Access Memory</p>
</section>
```

### ✅ DO: Fragment the Answer

```html
<!-- GOOD: Creates pause for thinking -->
<section>
    <div class="question-box">What is RAM?</div>
    <div class="fragment box-blue">
        <p><strong>Random Access Memory</strong></p>
    </div>
</section>
```

### ❌ DON'T: Flat Structure Only

```html
<!-- BAD: Everything is horizontal -->
<section>Overview</section>
<section>Detail 1</section>
<section>Detail 2</section>
<section>Detail 3</section>
<section>Next Topic</section>
```

### ✅ DO: Use Vertical for Details

```html
<!-- GOOD: 2D navigation -->
<section>
    <section>Overview (with "press down" hint)</section>
    <section>Detail 1</section>
    <section>Detail 2</section>
</section>
<section>Next Topic</section>
```

---

## Quick Reference Summary

| Technique | Purpose | Key Code |
|-----------|---------|----------|
| **Fragment** | Reveal content progressively | `class="fragment"` |
| **Fragment fade-in-then-out** | Show then hide | `class="fragment fade-in-then-out"` |
| **Fragment highlight** | Emphasize text | `class="fragment highlight-red"` |
| **R-Stack** | Layer content | `<div class="r-stack">` |
| **Vertical Slides** | Deep dives | `<section><section>...</section></section>` |
| **Auto-Animate** | Smooth transitions | `data-auto-animate` |
| **Code Line Highlight** | Step through code | `data-line-numbers="1|2|3"` |
| **Background** | Visual context | `data-background="#e6f0fa"` |
| **Speaker Notes** | Private notes | `<aside class="notes">` |

---

## Checklist: Is My Slide Deck Engaging?

```
□ Questions appear BEFORE answers (fragments)
□ Related points are grouped (not one-per-slide)
□ Complex topics have vertical deep dives
□ Vertical slides have parent content wrapped in <section> (CRITICAL!)
□ Code uses line-by-line highlighting
□ Key terms use highlight fragments
□ R-stack used for layered reveals
□ Background colors distinguish question slides
□ "Press down" hints when vertical slides exist
□ No more than 6 click-points per slide
□ Answers hidden until click
```
