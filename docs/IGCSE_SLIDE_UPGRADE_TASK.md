# IGCSE Slide Deck Upgrade Task

> **Purpose:** Complete instructions for an AI agent to upgrade existing IGCSE slide decks using better Reveal.js engagement techniques.

---

## Table of Contents

1. [Overview](#overview)
2. [Required Reading](#required-reading)
3. [Reference Example](#reference-example)
4. [Complete Slide Deck List](#complete-slide-deck-list)
5. [Transformation Patterns](#transformation-patterns)
6. [Step-by-Step Process](#step-by-step-process)
7. [After Editing Checklist](#after-editing-checklist)
8. [Example Agent Prompt](#example-agent-prompt)

---

## Overview

### What This Task Is

Upgrade existing IGCSE slide decks to use better Reveal.js engagement techniques:
- **R-stack** for layered reveals
- **Fragments** for progressive disclosure
- **"Did you know?"** facts for engagement
- **Quick checks** throughout (not just at the end)
- **Better analogies** and visual metaphors
- **Connections** to past and future topics

### What This Task Is NOT

- ❌ Creating new slide decks from scratch
- ❌ Changing the syllabus content
- ❌ Adding activities or tasks
- ❌ Removing any information

### Key Rule

**Edit in place.** Do not create duplicate files. The upgraded version replaces the original.

---

## Required Reading

Before starting ANY upgrade, read these documents completely:

| Document | Path | What You'll Learn |
|----------|------|-------------------|
| **IGCSE Guide** | `docs/IGCSE_GUIDE.md` | Core philosophy, structure, NO activities rule |
| **Reveal Techniques** | `docs/REVEAL_TECHNIQUES.md` | All available Reveal.js techniques with code |
| **Content Writing** | `docs/curriculum content guides/agent_content.md` | IGCSE writing style and tone |

---

## Reference Example

### The Gold Standard

Compare these two files to understand exactly what "upgraded" means:

| Version | Path | Description |
|---------|------|-------------|
| **Original** | `public/igcse/topic5/5.1_the_internet_and_the_www.html` | Before upgrade |
| **Upgraded** | `public/igcse/topic5/5.1_the_internet_and_the_www_v2.html` | After upgrade — **USE THIS AS YOUR TEMPLATE** |

### Key Differences in the Upgraded Version

1. **The Hook** uses r-stack with `fade-in-then-out` for myth-busting
2. **"Did you know?"** boxes with interesting facts
3. **Quick checks** appear throughout (not just at the end)
4. **Better analogies** (postcard vs locked box for HTTP/HTTPS)
5. **Connections** to other topics (cookies → RAM/Hard Drive from Topic 3)
6. **Summary slide** at the end with gradient background
7. **Compact layouts** that don't overflow

### How to Study the Reference

1. Open both files side by side in your browser
2. Click through each slide comparing structure
3. Look at the HTML source to see the patterns used
4. Note how r-stack, fragments, and vertical slides are combined

---

## Complete Slide Deck List

### Files to Upgrade (Main Teaching Slide Decks)

These are the core teaching slide decks that need the engagement upgrade:

#### Topic 1: Data Representation
| File | Content | Source Text |
|------|---------|-------------|
| `topic1/1.1_number_representation.html` | Binary, denary, hex conversions | `Chapter 1 Subfiles/1.1.txt` |
| `topic1/1.2_text_sound_images.html` | Text, sound, image representation | `Chapter 1 Subfiles/1.2.txt` |
| `topic1/1.3_data_storage_compression.html` | Storage, compression | `Chapter 1 Subfiles/1.3.txt` |

#### Topic 2: Data Transmission
| File | Content | Source Text |
|------|---------|-------------|
| `topic2/2.1_data_transmission.html` | Packets, protocols | `Chapter 2 Subfiles/2.1.txt` |
| `topic2/2.2_error_checking.html` | Parity, checksums | `Chapter 2 Subfiles/2.2.txt` |
| `topic2/2.3_encryption.html` | Symmetric, asymmetric | `Chapter 2 Subfiles/2.3.txt` |

#### Topic 3: Hardware
| File | Content | Source Text |
|------|---------|-------------|
| `topic3/3.1_computer_architecture.html` | CPU, FDE cycle | `Chapter 3 Subfiles/3.1.txt` |
| `topic3/3.2_input_and_output_devices.html` | I/O devices | `Chapter 3 Subfiles/3.2.txt` |
| `topic3/3.3_data_storage.html` | Primary, secondary storage | `Chapter 3 Subfiles/3.3.txt` |
| `topic3/3.4_network_hardware.html` | NICs, routers, switches | `Chapter 3 Subfiles/3.4.txt` |

#### Topic 4: Software
| File | Content | Source Text |
|------|---------|-------------|
| `topic4/4.1_types_of_software_and_interrupts.html` | System vs application, interrupts | `Chapter 4 Subfiles/4.1.txt` |
| `topic4/4.2_languages_translators_and_IDEs.html` | Compilers, interpreters | `Chapter 4 Subfiles/4.2.txt` |

#### Topic 5: Internet
| File | Content | Source Text |
|------|---------|-------------|
| `topic5/5.1_the_internet_and_the_www.html` | Internet vs WWW, DNS, cookies | `Chapter 5 Subfiles/5.1.txt` |
| `topic5/5.2_digital_currency.html` | Cryptocurrency, blockchain | `Chapter 5 Subfiles/5.2.txt` |
| `topic5/5.3_cyber_security.html` | Threats and protection | `Chapter 5 Subfiles/5.3.txt` |

#### Topic 6: Automated Systems
| File | Content | Source Text |
|------|---------|-------------|
| `topic6/6.1_automated_systems.html` | Sensors, actuators | `Chapter 6 Subfiles/6.1.txt` |
| `topic6/6.2_robotics.html` | Robotics applications | `Chapter 6 Subfiles/6.2.txt` |
| `topic6/6.3_artificial_intelligence.html` | AI concepts | `Chapter 6 Subfiles/6.3.txt` |

#### Topic 7: Algorithm Design
| File | Content | Source Text |
|------|---------|-------------|
| `topic7/7.1_program_development_life_cycle.html` | PDLC stages | `Chapter 7 Subfiles/7.1.txt` |
| `topic7/7.2_computer_systems_and_subsystems.html` | Top-down design | `Chapter 7 Subfiles/7.2.txt` |
| `topic7/7.3_decomposition_and_algorithms.html` | Decomposition | `Chapter 7 Subfiles/7.3.txt` |
| `topic7/7.4_methods_of_solution.html` | Flowcharts, pseudocode | `Chapter 7 Subfiles/7.4.txt` |
| `topic7/7.5_standard_methods_of_solution.html` | Sorting, searching | `Chapter 7 Subfiles/7.5.txt` |
| `topic7/7.6_validation_and_verification.html` | Input validation | `Chapter 7 Subfiles/7.6.txt` |
| `topic7/7.7_testing.html` | Test data types | `Chapter 7 Subfiles/7.7.txt` |
| `topic7/7.8_trace_tables.html` | Trace tables | `Chapter 7 Subfiles/7.8.txt` |
| `topic7/7.9_identifying_errors.html` | Syntax, logic, runtime | `Chapter 7 Subfiles/7.9.txt` |

#### Topic 8: Programming
| File | Content | Source Text |
|------|---------|-------------|
| `topic8/8.1_programming_concepts.html` | Variables, data types | `Chapter 8 Subfiles/8.1.txt` |
| `topic8/8.2_arrays.html` | 1D and 2D arrays | `Chapter 8 Subfiles/8.2.txt` |
| `topic8/8.3_file_handling.html` | Reading, writing files | `Chapter 8 Subfiles/8.3.txt` |

#### Topic 9: Databases
| File | Content | Source Text |
|------|---------|-------------|
| `topic9/9.1_databases.html` | Tables, keys, relationships | `Chapter 9 Subfiles/9.1.txt` |
| `topic9/9.2_sql.html` | SELECT, INSERT, UPDATE | `Chapter 9 Subfiles/9.2.txt` |

#### Topic 10: Boolean Logic
| File | Content | Source Text |
|------|---------|-------------|
| `topic10/10.1_logic_gates.html` | AND, OR, NOT, NAND, NOR, XOR | `Chapter 10 Subfiles/10.1.txt` |
| `topic10/10.2_logic_circuits.html` | Combining gates | `Chapter 10 Subfiles/10.2.txt` |
| `topic10/10.3_truth_tables.html` | Truth table construction | `Chapter 10 Subfiles/10.3.txt` |

### Files to SKIP (Not Slide Decks)

These are games, simulators, or tools — **do not modify**:

| File | Type | Why Skip |
|------|------|----------|
| `topic1/binary-addition-game.html` | Game | Interactive tool |
| `topic1/binary_game.html` | Game | Interactive tool |
| `topic1/negative-numbers.html` | Tool | Calculator/visualizer |
| `topic4/disk_defragmentation.html` | Simulation | Interactive demo |
| `topic4/software_game.html` | Game | Interactive tool |
| `topic6/logic-gate-simulator.html` | Simulator | Interactive tool |
| `topic6/nuclear_simulation.html` | Simulation | Interactive demo |
| `topic6/soil_simulation.html` | Simulation | Interactive demo |
| `topic9/sql-playground.html` | Tool | Interactive SQL |
| `topic3/3.5_review_and_exam_prep.html` | Review | Not core content |
| `topic4/teacher_toolkit.html` | Teacher resource | Not student-facing |
| `topic8/teacher_toolkit.html` | Teacher resource | Not student-facing |

---

## Transformation Patterns

### Pattern 1: The Hook (R-Stack Myth Busting)

**Before (boring):**
```html
<section>
    <h2>The Big Question</h2>
    <p>What is the difference between RAM and ROM?</p>
</section>
```

**After (engaging):**
```html
<section>
    <h2>The Big Question</h2>
    <div class="r-stack">
        <div class="fragment fade-in-then-out">
            <div class="question-box">
                <p style="font-size:1.3em;">🤔 Your computer has 16GB RAM and 512GB storage.</p>
                <p style="font-size:1.3em;">Why can't you just use all 512GB as memory?</p>
            </div>
        </div>
        <div class="fragment fade-in-then-out">
            <div class="box" style="background: #ffebee; padding: 30px;">
                <p style="font-size:1.2em;">❌ Common misconception...</p>
                <p class="small-text">"Storage and memory are the same thing"</p>
            </div>
        </div>
        <div class="fragment fade-in">
            <div class="box-blue" style="padding: 30px;">
                <p style="font-size:1.2em;">✅ The key difference is SPEED and VOLATILITY</p>
                <p class="small-text">RAM is fast but loses data when powered off. Storage is slow but permanent.</p>
            </div>
        </div>
    </div>
</section>
```

### Pattern 2: Did You Know? Boxes

Add interesting facts to increase engagement:

```html
<div class="cols">
    <div class="box">
        <h4><i class="fa-solid fa-microchip"></i> The Concept</h4>
        <p class="small-text">Technical explanation...</p>
    </div>
    <div class="box-blue">
        <h4><i class="fa-solid fa-lightbulb"></i> Did You Know?</h4>
        <p class="small-text fragment">The first hard drive (1956) held only 5MB and weighed over a ton!</p>
        <p class="small-text fragment">Your phone has more computing power than NASA used to land on the moon.</p>
    </div>
</div>
```

### Pattern 3: Quick Check (Throughout, Not Just End)

Add 2-3 quick checks during the content, not just True/False at the end:

```html
<section>
    <h3>Quick Check</h3>
    <div class="question-box">
        <p>A program needs to store a user's name.</p>
        <p>Which data type should it use?</p>
    </div>
    <div class="fragment box-blue" style="margin-top:20px;">
        <p><strong>String</strong> — because names are text, not numbers.</p>
    </div>
</section>
```

### Pattern 4: Connections to Other Topics

Explicitly link to past and future learning:

```html
<div class="fragment box">
    <p><strong>🔗 Connection to Topic 3:</strong></p>
    <p class="small-text">Remember RAM vs Hard Drive? Session cookies use RAM (volatile), persistent cookies use storage (non-volatile).</p>
</div>
```

```html
<div class="fragment box-blue">
    <p><strong>🔮 Coming in Topic 7:</strong></p>
    <p class="small-text">We'll use these data types when learning about algorithms and pseudocode.</p>
</div>
```

### Pattern 5: Progressive Build (Not One-Per-Slide)

**Before (boring click-through):**
```html
<section><p>Point 1</p></section>
<section><p>Point 2</p></section>
<section><p>Point 3</p></section>
```

**After (progressive reveal on one slide):**
```html
<section>
    <h3>Key Points</h3>
    <div class="fragment fade-up">
        <p>🔹 First point...</p>
    </div>
    <div class="fragment fade-up">
        <p>🔹 Second point...</p>
    </div>
    <div class="fragment fade-up">
        <p>🔹 Third point...</p>
    </div>
    <div class="fragment box-blue" style="margin-top:20px;">
        <p><strong>Key insight:</strong> Synthesis of the above...</p>
    </div>
</section>
```

### Pattern 6: Comparisons with R-Stack

For any "X vs Y" content (RAM vs ROM, HTTP vs HTTPS, etc.):

```html
<section>
    <h3>HTTP vs HTTPS</h3>
    <div class="r-stack">
        <div class="fragment fade-in-then-out">
            <div class="cols">
                <div class="box">
                    <h4>HTTP</h4>
                    <p style="font-size:4em;">📬</p>
                    <p>Like a <strong>postcard</strong></p>
                    <p class="small-text">Anyone can read it</p>
                </div>
                <div class="box-blue">
                    <h4>HTTPS</h4>
                    <p style="font-size:4em;">📦🔒</p>
                    <p>Like a <strong>locked box</strong></p>
                    <p class="small-text">Only recipient can open</p>
                </div>
            </div>
        </div>
        <div class="fragment fade-in">
            <div class="cols">
                <div class="box" style="background: #ffebee;">
                    <h4>HTTP</h4>
                    <p class="small-text"><strong>Hypertext Transfer Protocol</strong></p>
                    <p class="small-text">Data sent in plain text</p>
                    <p class="small-text">⚠️ Can be intercepted</p>
                </div>
                <div class="box-blue">
                    <h4>HTTPS</h4>
                    <p class="small-text"><strong>HTTP + Secure</strong></p>
                    <p class="small-text">SSL/TLS encryption</p>
                    <p class="small-text">✅ Look for the padlock!</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

### Pattern 7: Summary Slide at End

```html
<section data-background="linear-gradient(135deg, #0E214B 0%, #1a3a7a 100%)">
    <h2 style="color: white;">Key Takeaways</h2>
    <div class="cols" style="color: white;">
        <div class="box" style="background: rgba(255,255,255,0.1);">
            <p class="small-text">🔹 <strong>Point 1</strong> — Brief summary</p>
            <p class="small-text">🔹 <strong>Point 2</strong> — Brief summary</p>
            <p class="small-text">🔹 <strong>Point 3</strong> — Brief summary</p>
        </div>
        <div class="box" style="background: rgba(255,255,255,0.1);">
            <p class="small-text">🔹 <strong>Point 4</strong> — Brief summary</p>
            <p class="small-text">🔹 <strong>Point 5</strong> — Brief summary</p>
            <p class="small-text">🔹 <strong>Point 6</strong> — Brief summary</p>
        </div>
    </div>
    <div class="box" style="margin-top:20px; background: rgba(255,255,255,0.1); color: white;">
        <p><strong>Coming up next:</strong> X.Y Topic Name</p>
    </div>
</section>
```

### Pattern 8: Vertical Slide Indicator

Always tell users there's more content below:

```html
<div style="margin-top: 20px; text-align: center;">
    <i class="fa-solid fa-arrow-down blue"></i> 
    <span class="small-text blue">Deep Dive: Topic Details</span>
</div>
```

---

## Step-by-Step Process

### For Each Slide Deck:

1. **Read the source content**
   ```
   docs/content/igcse/chapter-text-files/Chapter X Subfiles/X.Y.txt
   ```
   Understand what syllabus points MUST be covered.

2. **Open the reference example**
   ```
   public/igcse/topic5/5.1_the_internet_and_the_www_v2.html
   ```
   Keep this open for comparison.

3. **Open the target slide deck**
   ```
   public/igcse/topicX/X.Y_name.html
   ```

4. **Apply transformations in order:**
   - [ ] Upgrade The Hook with r-stack
   - [ ] Add "Did You Know?" facts (research if needed)
   - [ ] Add 2-3 Quick Check slides throughout
   - [ ] Add connections to other topics
   - [ ] Convert single-point slides to progressive fragments
   - [ ] Upgrade comparisons with r-stack
   - [ ] Add summary slide at end
   - [ ] Ensure vertical slides have "Press Down" indicators

5. **Run keyword script**
   ```bash
   python3 public/igcse/apply_keywords.py
   ```

6. **Test in browser**
   - All fragments work
   - Keywords are red and clickable
   - No content overflow
   - Nothing is missing from syllabus

---

## After Editing Checklist

Run through this checklist for EVERY upgraded slide deck:

### Content Integrity
- [ ] All syllabus points from source text are still covered
- [ ] No information has been removed
- [ ] Keywords will be highlighted (script was run)

### Engagement Techniques
- [ ] Hook uses r-stack with fade-in-then-out
- [ ] At least 2 "Did You Know?" facts added
- [ ] At least 2 Quick Check slides throughout
- [ ] At least 1 connection to past/future topics
- [ ] Comparisons use r-stack layered reveals
- [ ] Summary slide at end with gradient background

### Technical Quality
- [ ] All fragments reveal correctly
- [ ] No content overflow on any slide
- [ ] Vertical slides have "Press Down" indicators
- [ ] Keywords are red and clickable
- [ ] No JavaScript console errors

---

## Example Agent Prompt

Use this template when asking an AI agent to upgrade a slide deck:

```
## Task: Upgrade IGCSE Slide Deck

Please upgrade the slide deck at:
`public/igcse/topic4/4.1_types_of_software_and_interrupts.html`

### Instructions
1. Read `docs/IGCSE_SLIDE_UPGRADE_TASK.md` for full instructions
2. Study the reference: `public/igcse/topic5/5.1_the_internet_and_the_www_v2.html`
3. Check source content: `docs/content/igcse/chapter-text-files/Chapter 4 Subfiles/4.1.txt`

### Requirements
- Edit the file IN PLACE (do not create a duplicate)
- Apply all transformation patterns from the task doc
- Maintain all syllabus content
- Add engagement techniques (r-stack, Did You Know, Quick Checks)

### After Editing
Run: `python3 public/igcse/apply_keywords.py`
Test in browser at: `http://localhost:8000/igcse/topic4/4.1_types_of_software_and_interrupts.html`
```

---

## Progress Tracker

Use this to track which slide decks have been upgraded:

| Topic | File | Status | Notes |
|-------|------|--------|-------|
| 1.1 | `1.1_number_representation.html` | ✅ Completed | |
| 1.2 | `1.2_text_sound_images.html` | ✅ Completed | |
| 1.3 | `1.3_data_storage_compression.html` | ✅ Completed | |
| 2.1 | `2.1_data_transmission.html` | ✅ Completed | |
| 2.2 | `2.2_error_checking.html` | ✅ Completed | |
| 2.3 | `2.3_encryption.html` | ✅ Completed | |
| 3.1 | `3.1_computer_architecture.html` | ✅ Completed | |
| 3.2 | `3.2_input_and_output_devices.html` | ✅ Completed | |
| 3.3 | `3.3_data_storage.html` | ✅ Completed | |
| 3.4 | `3.4_network_hardware.html` | ✅ Completed | |
| 4.1 | `4.1_types_of_software_and_interrupts.html` | ✅ Completed | |
| 4.2 | `4.2_languages_translators_and_IDEs.html` | ✅ Completed | |
| 5.1 | `5.1_the_internet_and_the_www.html` | ✅ Reference | v2 is the upgraded version |
| 5.2 | `5.2_digital_currency.html` | ✅ Completed | |
| 5.3 | `5.3_cyber_security.html` | ✅ Completed | |
| 6.1 | `6.1_automated_systems.html` | ✅ Completed | |
| 6.2 | `6.2_robotics.html` | ✅ Completed | |
| 6.3 | `6.3_artificial_intelligence.html` | ✅ Completed | |
| 7.1 | `7.1_program_development_life_cycle.html` | ✅ Completed | |
| 7.2 | `7.2_computer_systems_and_subsystems.html` | ✅ Completed | |
| 7.3 | `7.3_decomposition_and_algorithms.html` | ✅ Completed | |
| 7.4 | `7.4_methods_of_solution.html` | ✅ Completed | |
| 7.5 | `7.5_standard_methods_of_solution.html` | ✅ Completed | |
| 7.6 | `7.6_validation_and_verification.html` | ✅ Completed | |
| 7.7 | `7.7_testing.html` | ✅ Completed | |
| 7.8 | `7.8_trace_tables.html` | ✅ Completed | |
| 7.9 | `7.9_identifying_errors.html` | ✅ Completed | |
| 8.1 | `8.1_programming_concepts.html` | ✅ Completed | |
| 8.2 | `8.2_arrays.html` | ✅ Completed | |
| 8.3 | `8.3_file_handling.html` | ✅ Completed | |
| 9.1 | `9.1_databases.html` | ✅ Completed | |
| 9.2 | `9.2_sql.html` | ✅ Completed | |
| 10.1 | `10.1_logic_gates.html` | ✅ Completed | |
| 10.2 | `10.2_logic_circuits.html` | ✅ Completed | |
| 10.3 | `10.3_truth_tables.html` | ✅ Completed | |

**Total: 35 slide decks to upgrade**
