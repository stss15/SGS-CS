# IGCSE Slide Deck Creation Guide

**Complete AI Agent Instructions for Creating Pedagogically Sound IGCSE Computer Science Slide Decks**

---

## Core Philosophy

**The slide deck is not a display of information; it is a mechanism for uncovering it.**

Every slide must:
- Lead with questions, not statements
- Use analogies to bridge abstract concepts to real-world understanding
- Reveal information progressively through fragments
- Check for misconceptions immediately
- Engage students actively, not passively

**Never copy-paste paragraphs. Transform them into learning experiences.**

---

## 1. Standard Deck Structure

Every IGCSE slide deck follows this exact sequence:

### 1.1 Title Slide
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

**Rules:**
- Main title: Topic number and name (e.g., "3.1 Computer Architecture")
- Subtitle: Topic category + engaging hook (e.g., "Topic 3: Hardware | The Brain of the Machine")
- Use the subtitle to create curiosity

### 1.2 Retrieval Practice (Skip for first lesson in a topic)

**Structure:** Vertical stack with overview + individual question slides

```html
<section>
    <!-- Overview Slide -->
    <section data-background="#e6f0fa">
        <h3><i class="fa-solid fa-brain"></i> Retrieval Practice</h3>
        <div class="box-blue">
            <p class="small-text" style="margin:0;">Recall [Previous Topic] before we move on.</p>
        </div>
        <ol style="font-size:1.1em; line-height:1.6; margin-top:1rem;">
            <li>Question 1 from previous topic</li>
            <li>Question 2 from previous topic</li>
            <li>Question 3 from previous topic</li>
        </ol>
        <p class="small-text" style="margin-top: 20px; color: #666;">
            <i class="fa-solid fa-arrow-down"></i> Press Down to check each answer
        </p>
    </section>

    <!-- Individual Question Slides -->
    <section>
        <h3>Question 1</h3>
        <div class="question-box">Question text here</div>
        <div class="fragment box-blue">
            <p><strong>Answer:</strong></p>
            <p>Answer text here</p>
        </div>
    </section>
    <!-- Repeat for each question -->
</section>
```

**Rules:**
- 3-5 questions maximum
- Questions should test key concepts from previous lesson/topic
- Answers revealed via fragments
- Use clear, concise questions

### 1.3 The Hook (The Big Question)

**Purpose:** Create curiosity and establish relevance

```html
<section>
    <h2>The Big Question</h2>
    <div class="question-box">
        <p style="font-size:1.2em; margin:0;">Engaging question that creates curiosity</p>
    </div>
    <div class="cols fragment" style="margin-top:20px;">
        <div class="box-blue">
            <h4><i class="fa-solid fa-[icon]"></i> The Problem/Scenario</h4>
            <p>Real-world context or mystery</p>
            <p class="small-text">Additional context</p>
        </div>
        <div class="box">
            <h4><i class="fa-solid fa-[icon]"></i> The Solution/Concept</h4>
            <p>How computer science addresses it</p>
            <p class="small-text">Key insight</p>
        </div>
    </div>
    <div class="fragment box" style="margin-top:20px; text-align:center; background:var(--sg-gold); color:white;">
        <strong>Key Idea:</strong> The core takeaway that connects the hook to the content
    </div>
</section>
```

**Rules:**
- Always start with a question
- Use analogies when possible (e.g., "Like a car without a driver")
- Make it relatable to students
- The "Key Idea" box should be the bridge between hook and content

### 1.4 Concept Sections (Repeat for each major concept)

Each concept follows this pattern:

#### A. Introduction with Question
```html
<section>
    <h2>Concept Name</h2>
    <div class="question-box">
        <p style="font-size:1.2em; margin:0;">What question does this concept answer?</p>
    </div>
    <!-- Content follows -->
</section>
```

#### B. Definition (Key Term Box)
```html
<div class="key-term fragment" style="margin-top:20px;">
    <h3>Term Name</h3>
    <p>Clear, concise definition</p>
</div>
```

#### C. Explanation with Analogy
```html
<div class="fragment box" style="margin-top:20px;">
    <p class="small-text"><strong>Analogy:</strong> [Real-world comparison]</p>
    <p class="small-text"><em>How it relates to the concept</em></p>
</div>
```

#### D. Deep Dive (Vertical Slide)
```html
<div style="margin-top: 20px; text-align: center;">
    <i class="fa-solid fa-arrow-down blue"></i> <span class="small-text blue">Deep Dive: [Topic]</span>
</div>
```

Then create a vertical slide:
```html
<section>
    <section>
        <!-- Main slide with deep dive indicator -->
    </section>
    
    <!-- Vertical Deep Dive -->
    <section data-background="#f4f6f8">
        <h3>Deep Dive: [Topic]</h3>
        <div class="question-box">
            <p style="font-size:1.1em; margin:0;">What specific question does this answer?</p>
        </div>
        <!-- Detailed content with fragments -->
    </section>
</section>
```

**Rules:**
- Always lead with a question
- Use analogies to explain abstract concepts
- Break complex processes into step-by-step vertical slides
- Use fragments for progressive disclosure
- Deep dives should answer "how" or "why" questions

### 1.5 True/False Misconception Check (End of Deck)

**Structure:** Vertical stack with overview + individual question slides

```html
<section>
    <section>
        <h2><i class="fa-solid fa-check-double"></i> True or False?</h2>
        <div class="box-blue">
            <p style="margin:0;">Misconception Check</p>
        </div>
        <ol style="font-size:1.1em; line-height:1.6; margin-top: 20px;">
            <li>"Common misconception statement"</li>
            <li>"Another misconception statement"</li>
            <li>"Third misconception statement"</li>
        </ol>
        <p class="small-text" style="margin-top: 20px; color: #666;">
            <i class="fa-solid fa-arrow-down"></i> Press Down to reveal answers
        </p>
    </section>

    <section>
        <h3>Question 1</h3>
        <div class="question-box">"Misconception statement"</div>
        <div class="fragment box-blue">
            <p><strong>Answer: True/False</strong></p>
            <hr style="border-color: rgba(255,255,255,0.3);">
            <p>Clear explanation of why it's true/false</p>
        </div>
    </section>
    <!-- Repeat for each question -->
</section>
```

**Rules:**
- 3-5 questions targeting common misconceptions
- Statements should be plausible but incorrect (or correct but commonly misunderstood)
- Explanations must be clear and address the misconception directly

---

## 2. Transformation Rules

### 2.1 Definition Transformation

**❌ Wrong:** Title "What is RAM?" → Bullet: "RAM is volatile memory..."

**✅ Right:**
1. Present a puzzle/scenario: "You're typing an essay. Power cuts out. You lose your work. Why?"
2. Invite speculation
3. Reveal the concept as the solution
4. Then formalize with definition

### 2.2 List Transformation

**❌ Wrong:** Bulleted list of 5 advantages

**✅ Right:**
- Group items into categories (Cost, Speed, Convenience)
- Use scenario matching: "Here are 3 scenarios. Which advantage matters most for each?"
- Force evaluation, not just reading

### 2.3 Process Transformation

**❌ Wrong:** Numbered list of steps

**✅ Right:**
- Show diagram first
- Trace the signal/process step-by-step
- Use fragments to reveal each step
- Stop halfway: "What happens next?" (prediction)
- Use vertical slides for detailed steps

### 2.4 Abstract Concept Transformation

**❌ Wrong:** Abstract diagram with technical labels

**✅ Right:**
- Always use analogies:
  - Packet Switching = Mailing pages of a book separately
  - Variables = Labeled boxes
  - RAM = Desk workspace
  - HDD = Filing cabinet
- Ask: "Where does this analogy break down?" (refines understanding)

### 2.5 Comparison Transformation

**❌ Wrong:** Side-by-side lists

**✅ Right:**
- Use question: "Which is better? It depends on what you need!"
- Show trade-offs clearly
- Use scenarios: "When would you use X vs Y?"
- Use r-stack for interactive comparison

---

## 3. Component Library

### 3.1 Layout Components

**Standard Box:**
```html
<div class="box">Content</div>
```

**Emphasized Box:**
```html
<div class="box-blue">Content</div>
```

**Question Box:**
```html
<div class="question-box">
    <p style="font-size:1.2em; margin:0;">Question text</p>
</div>
```

**Key Term Box:**
```html
<div class="key-term fragment">
    <h3>Term Name</h3>
    <p>Definition</p>
</div>
```

**2-Column Grid:**
```html
<div class="cols">
    <div class="box">Left content</div>
    <div class="box-blue">Right content</div>
</div>
```

**3-Column Grid:**
```html
<div class="cols-3">
    <div class="box">Column 1</div>
    <div class="box-blue">Column 2</div>
    <div class="box">Column 3</div>
</div>
```

### 3.2 Interactive Elements

**Fragment Reveal:**
```html
<div class="fragment">Content appears on click</div>
```

**R-Stack (Layered Reveal):**
```html
<div class="r-stack">
    <div class="fragment fade-in-then-out">First item</div>
    <div class="fragment fade-in-then-out">Second item</div>
    <div class="fragment fade-in">Final item</div>
</div>
```

**Vertical Slide Indicator:**
```html
<div style="margin-top: 20px; text-align: center;">
    <i class="fa-solid fa-arrow-down blue"></i> 
    <span class="small-text blue">Deep Dive: Topic Name</span>
</div>
```

### 3.3 Styling Rules

**Colors (Always use CSS variables):**
- Primary Blue: `var(--sg-blue)`
- Primary Gold: `var(--sg-gold)`
- Text: `var(--sg-text)`

**Icons:**
- Use FontAwesome: `<i class="fa-solid fa-[name]"></i>`
- Color with classes: `.blue`, `.gold`

**Text Sizing:**
- Headings: Default (h2, h3, h4)
- Body: Default or `.small-text` for smaller text
- Emphasis: `<strong>` for bold, `<em>` for italic

---

## 4. Pedagogical Patterns

### 4.1 Question-First Pattern

**Every concept section must start with a question:**

```html
<div class="question-box">
    <p style="font-size:1.2em; margin:0;">What question does this answer?</p>
</div>
```

### 4.2 Analogy Pattern

**Use analogies to explain abstract concepts:**

```html
<div class="fragment box" style="margin-top:20px;">
    <p class="small-text"><strong>Analogy:</strong> [Real-world comparison]</p>
    <p class="small-text"><em>How it relates to the concept</em></p>
</div>
```

**Common Analogies:**
- RAM = Desk (fast, temporary workspace)
- HDD = Filing cabinet (slow, permanent storage)
- CPU = Brain/conductor
- Network = Postal system
- Encryption = Lock and key
- Buffer = Water tank
- Interrupt = Knocking on door

### 4.3 Step-by-Step Pattern

**For processes, use vertical slides:**

```html
<section>
    <section>
        <!-- Main question -->
        <div class="question-box">How does [process] work?</div>
        <!-- Indicator for deep dive -->
    </section>
    
    <section data-background="#f4f6f8">
        <h3>Step-by-Step: [Process Name]</h3>
        <ol style="font-size: 0.9em; line-height:1.8;">
            <li class="fragment">Step 1 with explanation</li>
            <li class="fragment">Step 2 with explanation</li>
            <!-- etc -->
        </ol>
    </section>
</section>
```

### 4.4 Comparison Pattern

**For comparing concepts:**

```html
<section>
    <h2>Concept A vs Concept B</h2>
    <div class="question-box">
        <p style="font-size:1.2em; margin:0;">What's the difference?</p>
    </div>
    <div class="cols fragment" style="margin-top:20px;">
        <div class="box">
            <h4>Concept A</h4>
            <ul class="small-text">
                <li>Characteristic 1</li>
                <li>Characteristic 2</li>
            </ul>
            <p class="small-text"><em>Analogy for A</em></p>
        </div>
        <div class="box box-blue">
            <h4>Concept B</h4>
            <ul class="small-text">
                <li>Characteristic 1</li>
                <li>Characteristic 2</li>
            </ul>
            <p class="small-text"><em>Analogy for B</em></p>
        </div>
    </div>
</section>
```

---

## 5. Anti-Cognitive Load Rules

1. **One Idea, One Slide:** Never teach two new concepts on one slide
2. **Signal, Don't Noise:** Remove decorative elements that don't explain concepts
3. **Spatial Contiguity:** Put labels on diagrams, not beside them
4. **Progressive Disclosure:** Use fragments to reveal information step-by-step
5. **Chunk Information:** Break long lists into categories or groups

---

## 6. HTML Boilerplate

Every deck must start with this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>X.X Topic Name | St George's CS</title>

    <!-- Reveal.js CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reset.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/theme/white.min.css">

    <!-- Highlight.js -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <link rel="stylesheet" href="../../css/slide-deck.css">
</head>
<body>
    <a href="../../igcse/topicX/index.html" id="back-btn" title="Back" class="back-nav">
        <i class="fa-solid fa-circle-arrow-left"></i>
    </a>
    <img src="../../images/Logo.png" id="sg-logo" alt="Logo"
        onerror="this.src='https://via.placeholder.com/80/003366/ffffff?text=LOGO'">
    <div class="footer-text live-date" id="live-date-display"></div>
    <div class="footer-text course-footer">IGCSE Computer Science</div>

    <div class="reveal">
        <div class="slides">
            <!-- Slides go here -->
        </div>
    </div>

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

## 7. Workflow Checklist

When creating a new slide deck:

1. **Analyze Content:**
   - Identify 3-5 key concepts
   - Find definitions that need transformation
   - Identify processes that need step-by-step breakdown
   - Note abstract concepts that need analogies

2. **Plan Structure:**
   - Title slide with engaging subtitle
   - Retrieval practice (if not first lesson)
   - Hook (The Big Question)
   - Concept sections (one per key concept)
   - True/False misconception check

3. **Transform Content:**
   - Convert definitions to question-first puzzles
   - Add analogies for abstract concepts
   - Break processes into vertical step slides
   - Create comparison slides with trade-offs

4. **Add Interactivity:**
   - Use fragments for progressive disclosure
   - Add vertical deep dives for complex topics
   - Include scenario checks where appropriate

5. **Validate:**
   - Every concept starts with a question
   - Analogies are used for abstract concepts
   - Fragments reveal information progressively
   - Misconception checks target common errors
   - No walls of text

---

## 8. Quality Standards

A well-created deck should:

✅ Start every concept with a question
✅ Use analogies to explain abstract concepts
✅ Reveal information progressively (fragments)
✅ Check for misconceptions at the end
✅ Use vertical slides for deep dives
✅ Include retrieval practice (when appropriate)
✅ Have an engaging hook that creates curiosity
✅ Break complex processes into steps
✅ Use visual hierarchy (boxes, colors, icons)
✅ Avoid walls of text

❌ Never copy-paste paragraphs
❌ Never show all information at once
❌ Never skip the question-first approach
❌ Never forget analogies for abstract concepts
❌ Never end without misconception checks

---

## 9. Reference Examples

**Excellent Examples:**
- `public/igcse/topic1/1.1_number_representation.html`
- `public/igcse/topic2/2.1_data_transmission.html`
- `public/igcse/topic3/3.1_computer_architecture.html`
- `public/igcse/topic4/4.1_types_of_software_and_interrupts.html`
- `public/igcse/topic5/5.1_the_internet_and_the_www.html`
- `public/igcse/topic6/6.1_automated_systems.html`

Study these for:
- Question-first approach
- Effective analogies
- Vertical deep dive structure
- Retrieval practice format
- True/False misconception checks
- Hook design

---

## 10. Common Mistakes to Avoid

1. **Starting with definitions instead of questions**
2. **Missing analogies for abstract concepts**
3. **Showing all information at once (no fragments)**
4. **Forgetting retrieval practice when appropriate**
5. **Skipping misconception checks**
6. **Using technical jargon without explanation**
7. **Creating walls of text**
8. **Not using vertical slides for complex topics**
9. **Missing the engaging hook**
10. **Not connecting concepts to real-world scenarios**

---

## 11. Keyword System (Red Click-to-Define Highlighting)

After creating or modifying slide decks, **you must run the keyword application script** to add red clickable definitions.

### How It Works
- Keywords are defined in `public/igcse/chapter text files/Chapter X key words.txt`
- The script `public/igcse/apply_keywords.py` wraps keywords in `<span class="keyword" data-def="...">` tags
- When clicked, these display a modal with the definition
- Keywords appear in **red** with a dashed underline

### When to Run
Run after ANY changes to IGCSE HTML content:
```bash
python3 public/igcse/apply_keywords.py
```

### Keyword File Format
Each line in the chapter keyword files follows this format:
```
term – definition text here
```

Example from Chapter 1:
```
bit – the basic computing element that is either 0 or 1
hexadecimal number system – a number system based on the value 16
```

### CSS for Keywords
The `.keyword` class is styled in `public/css/slide-deck.css`:
```css
.keyword,
.reveal .keyword,
.reveal h1 .keyword,
.reveal h2 .keyword,
.reveal h3 .keyword {
    color: var(--sg-red) !important;
    cursor: pointer;
    font-weight: bold;
    border-bottom: 1px dashed var(--sg-red);
}
```

### Important Notes
1. **Always run after editing** - The script removes old keyword wrapping and re-applies fresh
2. **Definition boxes removed** - Old `<div class="key-term">` yellow boxes are automatically removed
3. **Plurals handled** - Script automatically adds plural forms (keyword → keywords, keywordes)
4. **Case insensitive** - Keywords match regardless of capitalization

---

## 12. Post-Edit Checklist

After creating or modifying ANY IGCSE content:

- [ ] Run `python3 public/igcse/apply_keywords.py`
- [ ] Run `npm run build` (if modifying .njk templates)
- [ ] `git add -A && git commit -m "message" && git push origin main`
- [ ] Verify GitHub Actions deployment completes
- [ ] Hard refresh browser (`Cmd+Shift+R`) to test changes

---

**Remember:** The goal is not to display information. The goal is to create a learning experience that engages students, checks understanding, and builds knowledge progressively through questions, analogies, and interactive reveals.




