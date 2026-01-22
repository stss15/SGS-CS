# WORKSHEET_TEMPLATE_SPEC_FINAL.md

**Purpose**: Define the exact structure and layout for every student-facing HTML worksheet.

**Date**: 2026-01-10  
**Status**: FROZEN

---

## Core Rule

**ZERO Python code on worksheets.** This is non-negotiable.

- No code snippets
- No partial methods
- No examples with `def` or `class`
- No `pass` placeholders
- No code blocks of any kind

---

## Allowed Content Types

| Allowed | Example |
|---------|---------|
| Plain text method signatures | `take_damage(amount: int) -> None` |
| UML diagrams (images) | Class diagrams, sequence diagrams |
| Keywords with definitions | Table format |
| Maps and visuals | Room layouts, item art |
| Step-by-step task lists | Numbered instructions |
| Success criteria checklists | Bulleted pass/fail criteria |
| Download buttons/links | ZIP file for level |
| Real-world connection text | Brief game dev parallels |

---

## Required Sections (In Order)

### 1. Header Block

```html
<header class="worksheet-header">
  <h1>Level [X]: [Display Name]</h1>
  <p class="tagline">[One-line hook/tagline]</p>
  <div class="meta">
    <span class="time">⏱️ Estimated: [X] lessons</span>
    <span class="prereq">📋 Prerequisites: [Level Y]</span>
  </div>
</header>
```

### 2. Objectives

```html
<section class="objectives">
  <h2>🎯 Learning Objectives</h2>
  <ul>
    <li>By the end of this level, you will be able to...</li>
    <li>3-5 objectives, action verbs</li>
  </ul>
</section>
```

### 3. Keywords & Definitions

```html
<section class="keywords">
  <h2>📚 Key Terms</h2>
  <table>
    <thead>
      <tr><th>Keyword</th><th>Definition</th></tr>
    </thead>
    <tbody>
      <tr><td>Class</td><td>A blueprint for creating objects...</td></tr>
      <!-- 4-8 keywords per level -->
    </tbody>
  </table>
</section>
```

### 4. Concept Box (Learning Box)

```html
<section class="concept-box">
  <h2>💡 What You Need to Understand</h2>
  <div class="concept-content">
    <p>Before you start coding, make sure you understand...</p>
    <!-- 2-4 paragraphs explaining the core concept -->
    <!-- NO code examples -->
    <!-- Use analogies, diagrams, plain English -->
  </div>
</section>
```

### 5. UML / Diagrams

```html
<section class="diagrams">
  <h2>📊 Class Design</h2>
  <figure>
    <img src="assets/uml/[level]_class_diagram.png" alt="Class diagram for [Level]">
    <figcaption>UML class diagram showing [description]</figcaption>
  </figure>
</section>
```

### 6. World Briefing (Narrative Context)

```html
<section class="world-briefing">
  <h2>🌌 Station Log</h2>
  <div class="narrative">
    <p><em>The emergency lights flicker as you regain consciousness...</em></p>
    <!-- 3-5 sentences setting the scene -->
    <!-- What's happening in the story? -->
    <!-- Why does this level matter? -->
  </div>
  <figure>
    <img src="assets/maps/[level]_map.png" alt="Map for this level">
    <figcaption>Current location and accessible areas</figcaption>
  </figure>
</section>
```

### 7. What You Must Build (Requirements)

```html
<section class="requirements">
  <h2>🔧 Your Task</h2>
  
  <h3>Class: [ClassName]</h3>
  <p>Create a class called <strong>[ClassName]</strong> with the following:</p>
  
  <h4>Attributes</h4>
  <ul>
    <li><strong>name</strong> (str) — The player's name</li>
    <li><strong>health</strong> (int) — Current health points</li>
  </ul>
  
  <h4>Methods</h4>
  <table class="method-table">
    <thead>
      <tr>
        <th>Method Name</th>
        <th>Parameters</th>
        <th>Returns</th>
        <th>What It Does</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>get_status</code></td>
        <td>none</td>
        <td>str</td>
        <td>Returns a string showing the player's name and current health</td>
      </tr>
    </tbody>
  </table>
  
  <h4>Constraints</h4>
  <ul class="constraints">
    <li>❌ Health must never go below 0</li>
    <li>❌ Health must never exceed max_health</li>
    <li>✅ The class must be called exactly <code>Player</code></li>
  </ul>
</section>
```

### 8. Success Criteria Checklist

```html
<section class="success-criteria">
  <h2>✅ Success Criteria</h2>
  <p>Your code is complete when:</p>
  <ul class="checklist">
    <li>☐ The <code>Player</code> class exists</li>
    <li>☐ Creating <code>Player("Test")</code> works without errors</li>
    <li>☐ <code>get_status()</code> returns a string containing the player's name</li>
    <li>☐ <code>take_damage(50)</code> reduces health by 50</li>
    <li>☐ <code>take_damage(999)</code> does NOT make health negative</li>
    <li>☐ <code>validate.py</code> returns PASS</li>
  </ul>
</section>
```

### 9. Validator Instructions

```html
<section class="validator">
  <h2>🧪 Running the Validator</h2>
  <ol>
    <li>Open the level folder in PyCharm</li>
    <li>Right-click <code>validate.py</code></li>
    <li>Select "Run 'validate'"</li>
    <li>Read the output carefully</li>
  </ol>
  
  <div class="validator-results">
    <h4>If you see PASS:</h4>
    <p>Congratulations! Move to the next level.</p>
    
    <h4>If you see FAIL:</h4>
    <p>Read the error message. It tells you exactly what's wrong.</p>
    <p>Fix the issue and run the validator again.</p>
  </div>
</section>
```

### 10. Download Area

```html
<section class="download">
  <h2>📥 Download Level Files</h2>
  <a href="downloads/level_[x]_[slug].zip" class="download-button">
    Download Level [X] Project Folder
  </a>
  
  <h4>What's in the ZIP:</h4>
  <ul class="file-list">
    <li>📁 <code>engine/</code> — Game engine (do not edit)</li>
    <li>📁 <code>student/</code> — Your code goes here</li>
    <li>📄 <code>validate.py</code> — Run this to check your work</li>
    <li>📄 <code>run_game.py</code> — Run this to play</li>
  </ul>
</section>
```

### 11. Extension (Optional)

```html
<section class="extension">
  <h2>🚀 Extension Challenge (Optional)</h2>
  <p>Already finished? Try this:</p>
  <ul>
    <li>Add a <code>get_stats()</code> method that returns a dictionary...</li>
    <li>This won't be validated but explores additional concepts</li>
  </ul>
</section>
```

### 12. Real-World Connection

```html
<section class="real-world">
  <h2>🌍 Real-World Connection</h2>
  <p>Professional game developers use the same concepts:</p>
  <ul>
    <li><strong>Unity</strong> uses classes for GameObjects and Components</li>
    <li><strong>Unreal Engine</strong> has Actor classes with health/damage systems</li>
    <li>Text adventures like <em>Zork</em> pioneered object-oriented game design</li>
  </ul>
</section>
```

---

## Image Assets Required Per Level

| Asset Type | Filename Pattern | Dimensions | Format |
|------------|-----------------|------------|--------|
| UML class diagram | `[level]_class_diagram.png` | 800x600 max | PNG |
| Room map | `[level]_map.png` | 600x400 | PNG |
| Character portrait | `character_[name].png` | 200x200 | PNG |
| Item icon | `item_[id].png` | 64x64 | PNG |
| Room art | `room_[id].png` | 400x300 | PNG |

---

## CSS Classes Reference

| Class | Purpose |
|-------|---------|
| `.worksheet-header` | Level title and meta |
| `.objectives` | Learning objectives |
| `.keywords` | Keywords table |
| `.concept-box` | Core concept explanation |
| `.diagrams` | UML and visual diagrams |
| `.world-briefing` | Narrative context |
| `.requirements` | Task specifications |
| `.method-table` | Method signature table |
| `.constraints` | Do/don't rules |
| `.success-criteria` | Checklist |
| `.validator` | How to run validator |
| `.download` | Download button area |
| `.extension` | Optional challenges |
| `.real-world` | Industry connections |

---

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Worksheet files | `level_[letter].html` | `level_a.html` |
| Download ZIPs | `level_[letter]_[slug].zip` | `level_a_player_class.zip` |
| UML images | `level_[letter]_class_diagram.png` | `level_a_class_diagram.png` |
| Map images | `level_[letter]_map.png` | `level_a_map.png` |

---

## Quality Checklist

Before publishing any worksheet:

- [ ] Zero Python code anywhere
- [ ] All 12 sections present
- [ ] Method signatures use plain text format
- [ ] UML diagram included
- [ ] Download link works
- [ ] Success criteria match validator checks
- [ ] Narrative connects to game story
- [ ] Keywords defined clearly
- [ ] Concept box uses analogies, not code
- [ ] Real-world connection is factual
