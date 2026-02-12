---
name: revealjs-slides
description: Use when creating, editing, or debugging a reveal.js slide deck. Covers HTML boilerplate, CDN setup, themes, slide markup (HTML and Markdown modes), code highlighting, math, fragments, backgrounds, auto-animate, transitions, vertical slides, speaker notes, layout helpers, media, and configuration.
---

# Creating a reveal.js Slide Deck

## When To Use

Use this skill for:
- Creating a new reveal.js presentation from scratch
- Adding or editing slides in an existing reveal.js deck
- Debugging rendering, transition, or plugin issues in a deck
- Converting content (lesson notes, outlines, curriculum material) into slides

---

## 1 — Scaffold: Minimal Working File

Every deck is a single self-contained HTML file. Use the CDN so no local install is needed.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PRESENTATION TITLE</title>

  <!-- reveal.js core CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.css" />
  <!-- Theme — swap the file name to change theme (see §3) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/white.css" />
  <!-- Code-highlight theme (needed for <pre><code>) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/highlight/monokai.css" />
</head>
<body>

<div class="reveal">
  <div class="slides">

    <!-- Each <section> = one slide -->
    <section>
      <h1>Slide 1</h1>
    </section>

    <section>
      <h2>Slide 2</h2>
      <p>Content here</p>
    </section>

  </div>
</div>

<!-- reveal.js + plugins -->
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/markdown/markdown.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/highlight/highlight.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/math/math.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/notes/notes.js"></script>
<script>
  Reveal.initialize({
    hash: true,
    slideNumber: true,
    plugins: [RevealMarkdown, RevealHighlight, RevealMath.KaTeX, RevealNotes]
  });
</script>
</body>
</html>
```

> **Critical**: The DOM hierarchy MUST be `.reveal > .slides > section`. Never break this nesting.

---

## 2 — Slide Authoring (HTML Mode)

### Basic Slide

```html
<section>
  <h2>Title</h2>
  <p>Body text</p>
</section>
```

### Two-Column Layout

Use an `r-hstack` or a flexbox wrapper:

```html
<section>
  <h2>Side by Side</h2>
  <div style="display: flex; gap: 2em;">
    <div style="flex: 1;">Left column</div>
    <div style="flex: 1;">Right column</div>
  </div>
</section>
```

### Layout Helper Classes

| Class | Effect |
|-------|--------|
| `r-fit-text` | Scales text to fill the slide without overflow |
| `r-stretch` | Stretches an element (image/video) to fill remaining vertical space |
| `r-stack` | Stacks children on top of each other (use with fragments) |
| `r-frame` | Adds a decorative border frame |

```html
<h2 class="r-fit-text">BIG TITLE</h2>
```

---

## 3 — Themes

Swap the theme CSS `<link>` in `<head>`. Built-in themes:

| Theme | File name |
|-------|-----------|
| Black (default) | `black.css` |
| White | `white.css` |
| League | `league.css` |
| Beige | `beige.css` |
| Night | `night.css` |
| Serif | `serif.css` |
| Simple | `simple.css` |
| Solarized | `solarized.css` |
| Moon | `moon.css` |
| Sky | `sky.css` |
| Blood | `blood.css` |
| Dracula | `dracula.css` |

Example:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/dracula.css" />
```

---

## 4 — Markdown Mode

Instead of raw HTML you can write slides in Markdown inside a single `<section>`.

```html
<section data-markdown>
  <textarea data-template>
## Slide One
A paragraph with a [link](https://example.com).

---

## Slide Two
- Bullet 1
- Bullet 2

---

## Slide Three
  </textarea>
</section>
```

**Rules:**
- `---` (horizontal rule surrounded by blank lines) separates horizontal slides.
- `--` (double dash surrounded by blank lines) separates vertical slides when `data-separator-vertical="^\n--\n"` is set.
- Indentation is significant — do NOT mix tabs and spaces.
- The `RevealMarkdown` plugin must be loaded.

### Adding Attributes in Markdown

```markdown
<!-- .slide: data-background-color="#4d7e65" -->
## Green Background Slide

- Item 1 <!-- .element: class="fragment" -->
- Item 2 <!-- .element: class="fragment" -->
```

### External Markdown File

```html
<section data-markdown="slides.md"
         data-separator="^\n\n\n"
         data-separator-vertical="^\n\n"
         data-separator-notes="^Note:">
</section>
```

---

## 5 — Code Highlighting

Wrap code in `<pre><code>`. Add `data-trim` to strip whitespace and a `class="language-xxx"` for the language.

```html
<section>
  <h2>Python Example</h2>
  <pre><code data-trim class="language-python">
def greet(name):
    return f"Hello, {name}!"
  </code></pre>
</section>
```

### Line Numbers & Step-by-Step Highlights

```html
<pre><code data-trim data-line-numbers="1|3-4|6">
import os

def main():
    path = os.getcwd()

    print(path)
</code></pre>
```

- `data-line-numbers` with no value → show all line numbers.
- Pipe-delimited ranges (`"1|3-4|6"`) create step-by-step highlight animations.
- `data-ln-start-from="7"` offsets the starting line number.

### In Markdown Mode

````markdown
```python [1-2|3|4]
a = 1
b = 2
c = a + b
print(c)
```
````

---

## 6 — Math (LaTeX)

Requires the Math plugin (`RevealMath.KaTeX` or `RevealMath.MathJax3`).

### Inline HTML

```html
<section>
  <h2>Quadratic Formula</h2>
  \[ x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} \]
</section>
```

### In Markdown

```markdown
$$ E = mc^2 $$
```

---

## 7 — Fragments (Incremental Reveal)

Add `class="fragment"` to any element. It will fade in on the next click/keypress.

```html
<p class="fragment">Appears first</p>
<p class="fragment">Appears second</p>
```

### Fragment Styles

| Class | Effect |
|-------|--------|
| `fragment` | Fade in (default) |
| `fragment fade-out` | Fade out |
| `fragment fade-up` | Slide up while fading in |
| `fragment fade-down` | Slide down while fading in |
| `fragment fade-left` | Slide left while fading in |
| `fragment fade-right` | Slide right while fading in |
| `fragment fade-in-then-out` | Fade in, then out on next step |
| `fragment fade-in-then-semi-out` | Fade in, then semi-transparent |
| `fragment highlight-red` | Turn text red |
| `fragment highlight-green` | Turn text green |
| `fragment highlight-blue` | Turn text blue |
| `fragment highlight-current-red` | Turn red, revert on next step |
| `fragment current-visible` | Visible only on current step |
| `fragment semi-fade-out` | Fade to semi-transparent |
| `fragment strike` | Strikethrough |
| `fragment grow` | Scale up |
| `fragment shrink` | Scale down |

### Custom Order

```html
<p class="fragment" data-fragment-index="2">Second</p>
<p class="fragment" data-fragment-index="1">First</p>
```

---

## 8 — Backgrounds

Set per-slide backgrounds on the `<section>` element.

### Solid Color / Gradient
```html
<section data-background-color="#283b95">...</section>
<section data-background-gradient="linear-gradient(to bottom, #283b95, #17b2c3)">...</section>
```

### Image
```html
<section data-background-image="img/hero.jpg"
         data-background-size="cover"
         data-background-position="center"
         data-background-opacity="0.5">
  <h2>Slide with background image</h2>
</section>
```

### Video
```html
<section data-background-video="video.mp4"
         data-background-video-loop
         data-background-video-muted>
  <h2>Video background</h2>
</section>
```

### Iframe
```html
<section data-background-iframe="https://example.com"
         data-background-interactive>
  <h2>Live web page behind this slide</h2>
</section>
```

---

## 9 — Transitions

### Global (in `Reveal.initialize`)

```js
Reveal.initialize({
  transition: 'slide',           // none | fade | slide | convex | concave | zoom
  transitionSpeed: 'default',    // default | fast | slow
  backgroundTransition: 'fade',  // none | fade | slide | convex | concave | zoom
});
```

### Per-Slide Override

```html
<section data-transition="zoom">Zoom in!</section>
<section data-transition="slide-in fade-out">Slide in, fade out</section>
<section data-transition-speed="fast">Fast transition</section>
```

---

## 10 — Auto-Animate

Add `data-auto-animate` to two adjacent sections. Matching elements animate automatically.

```html
<section data-auto-animate>
  <h1>Hello</h1>
</section>
<section data-auto-animate>
  <h1 style="color: red; margin-top: 100px;">Hello</h1>
  <p>World</p>
</section>
```

Animatable CSS properties: `color`, `background-color`, `font-size`, `line-height`, `padding`, `margin`, `opacity`, `letter-spacing`, `border-width`, `border-color`, `border-radius`.

Use `data-id` to explicitly match elements:
```html
<section data-auto-animate>
  <div data-id="box" style="width:100px; height:100px; background:blue;"></div>
</section>
<section data-auto-animate>
  <div data-id="box" style="width:300px; height:300px; background:red; border-radius:50%;"></div>
</section>
```

---

## 11 — Vertical Slides

Nest `<section>` elements to create a vertical stack. The outer `<section>` is the horizontal position; inner `<section>`s stack vertically.

```html
<section>
  <section><h2>Vertical 1</h2></section>
  <section><h2>Vertical 2</h2></section>
  <section><h2>Vertical 3</h2></section>
</section>
```

Use vertical slides to group related sub-topics under a main topic.

---

## 12 — Speaker Notes

Press **S** during presentation to open the speaker view.

### HTML Mode
```html
<section>
  <h2>My Slide</h2>
  <aside class="notes">
    These are speaker notes — only visible in speaker view.
  </aside>
</section>
```

### Attribute Shorthand
```html
<section data-notes="Quick speaker note here.">
  <h2>Slide</h2>
</section>
```

### Markdown Mode
```markdown
## Slide Title
Content here.

Note:
These are speaker notes. Everything after "Note:" goes to speaker view.
```

### Pacing Timer
```js
Reveal.initialize({
  // seconds per slide (pacing timer turns green/red in speaker view)
  defaultTiming: 120,
  // or set a total presentation length
  // totalTime: 2400,
});
```

---

## 13 — Media

### Images
```html
<img src="photo.jpg" alt="Description" />
```

### Lazy Loading (use for heavy decks)
```html
<img data-src="photo.jpg" alt="Description" />
<video><source data-src="clip.mp4" type="video/mp4" /></video>
<iframe data-src="https://example.com"></iframe>
```

### Auto-Play Video/Audio
```html
<video data-autoplay src="clip.mp4"></video>
<audio data-autoplay src="music.mp3"></audio>
```

---

## 14 — Useful Config Options

These go inside `Reveal.initialize({ ... })`:

```js
Reveal.initialize({
  // Appearance
  hash: true,              // Add slide number to URL hash
  slideNumber: true,       // Show slide number (true | 'c/t' | 'h.v')
  controls: true,          // Arrow controls
  progress: true,          // Progress bar
  center: true,            // Vertically center slide content

  // Behavior
  loop: false,             // Loop back to first slide at end
  shuffle: false,          // Randomize slide order
  fragments: true,         // Enable fragments globally
  touch: true,             // Touch navigation on mobile
  mouseWheel: false,       // Navigate with scroll wheel
  keyboard: true,          // Keyboard shortcuts
  overview: true,          // Overview mode (Esc key)
  help: true,              // Help overlay (? key)

  // Transitions
  transition: 'slide',
  transitionSpeed: 'default',
  backgroundTransition: 'fade',

  // Auto-Animate defaults
  autoAnimate: true,
  autoAnimateEasing: 'ease',
  autoAnimateDuration: 1.0,

  // Auto-Slide (ms, 0 = off)
  autoSlide: 0,
  autoSlideStoppable: true,

  // View distance (how many slides to pre-render)
  viewDistance: 3,
  mobileViewDistance: 2,

  // PDF export
  pdfSeparateFragments: true,
  pdfMaxPagesPerSlide: Number.POSITIVE_INFINITY,

  // Plugins
  plugins: [RevealMarkdown, RevealHighlight, RevealMath.KaTeX, RevealNotes]
});
```

---

## 15 — PDF Export

1. Append `?print-pdf` to the presentation URL (e.g. `file:///deck.html?print-pdf`).
2. Open browser print dialog (**Cmd+P** / **Ctrl+P**).
3. Set **Destination** → Save as PDF.
4. Set **Layout** → Landscape.
5. Set **Margins** → None.
6. Enable **Background graphics**.
7. Click **Save**.

---

## Agent Checklist — Building a Deck

When asked to create a reveal.js presentation, follow these steps in order:

1. **Create the HTML file** using the scaffold in §1. Place it in the location specified by the user or where it logically belongs in the project.
2. **Choose a theme** (§3) that fits the audience/topic. Default to `white.css` for classroom use or `dracula.css` for code-heavy decks.
3. **Decide HTML vs Markdown mode** (§2 vs §4). Use Markdown mode when the content is primarily text/bullet-heavy. Use HTML mode when precise layout, backgrounds per slide, or complex fragments are needed. You can mix both in the same deck.
4. **Structure slides logically**:
   - Title slide first.
   - Group sub-topics as vertical slides (§11).
   - Use fragments (§7) for step-by-step reveals — especially for lists, definitions, and build-up diagrams.
   - Use auto-animate (§10) for smooth visual transitions between related slides.
5. **Add code blocks** (§5) with syntax highlighting and step-by-step line highlights.
6. **Add math** (§6) where the content includes formulas or equations.
7. **Set backgrounds** (§8) on key slides (title, section dividers, callout slides) for visual variety.
8. **Add speaker notes** (§12) with talking points for the presenter. This is especially important for teacher-facing decks.
9. **Configure** (§14) the deck with sensible defaults (`hash: true`, `slideNumber: true`, appropriate transition).
10. **Test** by opening the file in a browser and stepping through every slide. Verify:
    - All slides render and are readable.
    - Fragments animate in the correct order.
    - Code highlights step correctly.
    - Math renders (LaTeX compiles).
    - Speaker notes appear when pressing **S**.

---

## Common Pitfalls

| Problem | Fix |
|---------|-----|
| Slides don't appear | Ensure `.reveal > .slides > section` nesting is correct |
| Markdown not rendering | Check `RevealMarkdown` is in the `plugins` array and the `<textarea data-template>` wrapper is present |
| Code not highlighted | Ensure `RevealHighlight` plugin is loaded and `monokai.css` (or another theme) is linked |
| Math not rendering | Ensure `RevealMath.KaTeX` (or MathJax variant) plugin is loaded |
| Fragments fire in wrong order | Use `data-fragment-index` to set explicit order |
| Background image too dark/bright behind text | Add `data-background-opacity="0.3"` to dim the image |
| Vertical slides not navigable | Make sure inner `<section>` elements are nested inside an outer `<section>` |
| Print to PDF looks wrong | Append `?print-pdf` to URL before printing; set Landscape + No Margins |
