# Reveal.js Slide Deck Skills

## Purpose
Use this as a practical reference for building stronger reveal.js decks: clear structure, deliberate pacing, and useful delivery features. Each section summarizes what the docs support and how to apply it effectively.

## 1) Core Structure

### Markup fundamentals
- Use the required hierarchy: `.reveal > .slides > section`.
- A top-level `<section>` is a horizontal slide; nesting `<section>` inside creates vertical slides.
- Use `data-state="your-state"` on a slide to add a class to the viewport while that slide is active for broad style changes.

```html
<div class="reveal">
  <div class="slides">
    <section>Slide 1</section>
    <section>
      <section>Vertical 1</section>
      <section>Vertical 2</section>
    </section>
  </div>
</div>
```

### Markdown workflow
- Add `data-markdown` to a slide and place content in `<textarea data-template>`.
- Keep indentation consistent; avoid mixing tabs and spaces.
- External markdown is supported via `data-markdown="file.md"` plus separators.
- Add attributes to markdown elements or slides using HTML comment syntax.
- Line highlighting uses bracket syntax in code fences; you can offset line numbers.

```html
<section data-markdown>
  <textarea data-template>
    ## Slide 1
    ---
    ## Slide 2
  </textarea>
</section>
```

```html
<section data-markdown="example.md"
         data-separator="^\n\n\n"
         data-separator-vertical="^\n\n"
         data-separator-notes="^Note:">
</section>
```

```html
<!--.slide: data-background="#1c1c1c" -->
- Item 1 <!--.element: class="fragment" data-fragment-index="2" -->
- Item 2 <!--.element: class="fragment" data-fragment-index="1" -->
```

## 2) Layout and Composition

### Layout helpers
- `r-stack` layers items for step-by-step reveals (great with fragments).
- `r-fit-text` auto-sizes large headlines to fit the slide.
- `r-stretch` expands one element to fill remaining vertical space (only one per slide, direct child).
- `r-frame` adds a visual frame to highlight content.

```html
<div class="r-stack">
  <img class="fragment" src="img-1.png" alt="Step 1">
  <img class="fragment" src="img-2.png" alt="Step 2">
</div>

<h2 class="r-fit-text">BIG TITLE</h2>

<h2>Title</h2>
<img class="r-stretch" src="diagram.png" alt="Diagram">

<img class="r-frame" src="logo.svg" alt="Logo">
```

### Presentation sizing
- Set `width`, `height`, `margin`, `minScale`, `maxScale` for consistent authoring.
- Set `center: false` to top-align slide content.
- Use `embedded: true` for multiple decks or constrained layouts; call `Reveal.layout()` after resizing.
- Set `disableLayout: true` for fully custom CSS layout (BYOL).

```js
Reveal.initialize({
  width: 960,
  height: 700,
  margin: 0.04,
  minScale: 0.2,
  maxScale: 2.0,
  center: true,
  embedded: false,
  disableLayout: false
});
```

## 3) Visual Styling and Backgrounds

### Themes
- Swap the theme stylesheet to change the visual system.
- Theme variables are exposed as CSS custom properties on `:root`.
- Build a custom theme in `/css/theme/README.md` if needed.

```html
<link rel="stylesheet" href="dist/theme/white.css">
```

### Backgrounds
- Use `data-background-*` for color, gradient, image, video, or iframe.
- Iframe backgrounds are non-interactive unless `data-background-interactive` is set.
- Preload background iframes with `data-preload` or `preloadIframes`.
- Control background transitions with `backgroundTransition`.
- Parallax backgrounds use `parallaxBackgroundImage` and related config.

```html
<section data-background-color="#0f172a"></section>
<section data-background-gradient="linear-gradient(#283b95, #17b2c3)"></section>
<section data-background-image="images/bg.png"
         data-background-size="cover"
         data-background-opacity="0.6"></section>
<section data-background-video="video.mp4"
         data-background-video-loop
         data-background-video-muted></section>
<section data-background-iframe="https://example.com"
         data-background-interactive></section>
```

```js
Reveal.initialize({
  backgroundTransition: "fade",
  parallaxBackgroundImage: "images/parallax.jpg",
  parallaxBackgroundSize: "2100px 900px",
  parallaxBackgroundHorizontal: 200,
  parallaxBackgroundVertical: 50
});
```

### Transitions
- Set `transition` and `transitionSpeed` globally or per slide with `data-transition`.
- Use `data-background-transition` to override background transitions per slide.
- `transition` supports `none`, `fade`, `slide`, `convex`, `concave`, `zoom`.

```html
<section data-transition="zoom">Zoom in</section>
<section data-transition-speed="fast">Fast transition</section>
```

## 4) Motion, Pacing, and Focus

### Fragments
- Add `class="fragment"` to reveal elements step-by-step.
- Use fragment styles like `fade-up`, `fade-in-then-out`, `highlight-red`, `grow`, `shrink`, `strike`.
- Control ordering with `data-fragment-index`.
- Create custom fragments with CSS for ` .fragment.your-effect` and `.fragment.your-effect.visible`.
- Use `current-fragment` when only the active step should be emphasized.

```html
<p class="fragment fade-up">First</p>
<p class="fragment fade-up" data-fragment-index="2">Second</p>
<p class="fragment fade-up" data-fragment-index="1">Third</p>
```

```css
.fragment.blur { filter: blur(4px); }
.fragment.blur.visible { filter: none; }
.fragment.blur.current-fragment { filter: none; }
```

### Auto-animate
- Add `data-auto-animate` to adjacent slides to animate matching elements.
- Matching uses text + node type or media `src`; override with `data-id`.
- Control easing, duration, and unmatched behavior via data attributes or config.
- Group animations with `data-auto-animate-id`; break sequences with `data-auto-animate-restart`.
- Auto-animate supports code blocks (with `data-line-numbers`) and list items.

```html
<section data-auto-animate>
  <h1>Title</h1>
</section>
<section data-auto-animate>
  <h1 style="color: red;">Title</h1>
</section>
```

```js
Reveal.initialize({
  autoAnimateEasing: "ease-out",
  autoAnimateDuration: 0.8,
  autoAnimateUnmatched: false
});
```

## 5) Media and Interactivity

### Media playback and lazy loading
- Add `data-autoplay` to media to start when the slide appears.
- Control global autoplay with `autoPlayMedia` and per-element opt-out with `data-ignore`.
- Lazy load by swapping `src` for `data-src`; controlled by `viewDistance`.
- Iframes only load when visible unless `data-preload` or `preloadIframes` is set.

```html
<video data-autoplay src="video.mp4"></video>
<img data-src="image.png" alt="Lazy image">
<iframe data-src="https://example.com" data-preload></iframe>
```

### Lightbox
- Use `data-preview-image`, `data-preview-video`, or `data-preview-link`.
- Set `data-preview-fit` to `scale-down`, `contain`, or `cover`.
- Works on any element, not just images and video.
- Iframe previews require the target site to allow embedding.

```html
<img src="thumb.png" data-preview-image="full.png" alt="Preview">
<button data-preview-video="clip.mp4">Play video</button>
<a href="https://example.com" data-preview-link>Open link</a>
```

### Links and navigation
- Link to a slide by id: `href="#/my-slide"`.
- Link by index: `#/h` or `#/h/v`.
- Navigation buttons can use `navigate-left/right/up/down/prev/next`.

```html
<section id="finale">
  <a href="#/0">Back to start</a>
</section>
<button class="navigate-next">Next</button>
```

### Slide visibility
- Hide slides with `data-visibility="hidden"` (removed at init).
- Mark optional end slides as `data-visibility="uncounted"` to keep numbers/progress accurate.

## 6) Code and Math

### Code blocks
- Highlighting uses the highlight plugin (with a theme like `monokai.css`).
- Use `data-trim` to remove leading whitespace, `data-noescape` for raw HTML.
- Highlight specific lines with `data-line-numbers="3,8-10"` or step through with `|`.
- Offset line numbers with `data-ln-start-from`.
- Force language with `class="language-xxx"`.
- Avoid HTML entity escaping using `<script type="text/template">`.
- Customize highlight with `highlight.beforeHighlight`, or disable auto with `highlightOnLoad: false`.

```html
<pre><code class="language-js" data-trim data-line-numbers="1|2-3">
const sum = (a, b) => a + b;
console.log(sum(2, 3));
</code></pre>
```

### Math
- Enable math with the math plugin (KaTeX, MathJax 2, or MathJax 3).
- Use display delimiters like `$$...$$` or inline `$...$`.
- For offline use, set a local library path.

```js
Reveal.initialize({ plugins: [ RevealMath.KaTeX ] });
```

```html
<section>
  $$ E = mc^2 $$
</section>
```

## 7) Delivery Features

### Auto-slide
- Set `autoSlide` in ms to progress automatically.
- Override per slide/fragment with `data-autoslide`.
- Use `autoSlideStoppable: false` to prevent pauses.
- Override navigation via `autoSlideMethod`.

```js
Reveal.initialize({ autoSlide: 5000, loop: true });
```

### Speaker view and notes
- Press `S` to open speaker view (requires a local server).
- Notes via `<aside class="notes">...</aside>` or `data-notes`.
- Markdown notes with `data-separator-notes`.
- Set `showNotes: true` (or `"separate-page"`) to print/share notes.
- Use `defaultTiming`, `totalTime`, and `data-timing` for pacing.

### Scroll view
- Enable scroll view with `view: "scroll"` or `?view=scroll` in the URL.
- Control scrollbar visibility with `scrollProgress`.
- Configure snapping with `scrollSnap` and layout with `scrollLayout`.
- Auto-enable on mobile using `scrollActivationWidth` (set to `null` to disable).

### Slide numbers
- Enable with `slideNumber: true` or formats like `"h.v"` or `"c/t"`.
- Control context with `showSlideNumber` (all, print, speaker).
- Provide a custom function for full control.

### Jump to slide
- Press `G`, type a slide number or id, and press Enter.
- Disable with `jumpToSlide: false`.

### Touch navigation
- Swipe for navigation; disable with `touch: false`.
- Use `data-prevent-swipe` on elements that need touch interaction.

### PDF export
- Print with `?print-pdf`, then use Chrome print to PDF.
- Enable notes with `showNotes` (or `"separate-page"`).
- Control page expansion via `pdfMaxPagesPerSlide`.
- Control fragment printing with `pdfSeparateFragments`.

### Overview and fullscreen
- Overview mode: press `ESC` or `O`, or call `Reveal.toggleOverview()`.
- Fullscreen: press `F`, exit with `ESC`.

## 8) API and Automation

### Initialization
- Use `Reveal.initialize(config)` for single-deck pages (returns a Promise).
- Use `new Reveal(element, config)` for multiple decks, with `embedded: true`.
- For ES modules, import `reveal.esm.js` and plugin ESM bundles.
- Call `Reveal.destroy()` to uninitialize.
- Update configuration at runtime with `Reveal.configure()`.

```js
Reveal.configure({ autoSlide: 0 });
Reveal.configure({ autoSlide: 5000 });
```

### API highlights
- Navigation: `Reveal.slide(h, v, f)`, `Reveal.next()`, `Reveal.prev()`, `Reveal.navigateFragment()`.
- Layout: `Reveal.layout()`, `Reveal.sync()`, `Reveal.shuffle()`.
- State/metadata: `Reveal.getIndices()`, `Reveal.getTotalSlides()`, `Reveal.getConfig()`,
  `Reveal.getComputedSlideSize()`, `Reveal.getCurrentSlide()`.

### Events
- Core: `ready`, `slidechanged`, `slidetransitionend`, `resize`.
- Feature events: fragment events, auto-slide events, auto-animate events, overview events.

### Keyboard bindings
- Override with `keyboard` config (map keycodes to functions, strings, or null).
- Add or remove bindings with `Reveal.addKeyBinding()` and `Reveal.removeKeyBinding()`.

### Presentation state
- Save and restore with `Reveal.getState()` and `Reveal.setState(state)`.

### postMessage
- Control a deck in another window by posting `{"method":"slide","args":[2]}`.
- Receive bubbled events from iframes when `postMessageEvents: true`.
- Read callback results from postMessage responses.

## 9) Practical Defaults to Start From

```js
Reveal.initialize({
  controls: true,
  progress: true,
  slideNumber: "c/t",
  hash: true,
  transition: "slide",
  backgroundTransition: "fade",
  viewDistance: 3,
  autoAnimate: true,
  autoSlide: 0
});
```
