---
description: Create a high-quality slide deck by drafting a detailed Markdown plan first.
---

# Workflow: Create Slide Deck with Plan

This workflow outlines the process for creating high-quality, pedagogically sound slide decks by first drafting a detailed plan in Markdown. This approach ensures content coverage, proper structure, and "Question First" pedagogy before writing any HTML.

## 1. Analyze Source Material
- Read the source text (e.g., textbook chapter, notes, text files).
- Identify key definitions, concepts, and processes.
- Review existing slide decks or style guides to understand the required aesthetic and structure.

## 2. Draft Slide Plan
Create a new Markdown file named `[topic_id]_slide_plan.md` (e.g., `5.1_slide_plan.md`).
Structure the plan slide-by-slide:

### Format
```markdown
## [Slide Number]. [Slide Title]
- **Slide Type**: (e.g., Concept, Vertical Deep Dive, Question/Answer, Plenary)
- **Question**: The key question this slide answers (Question First pedagogy).
- **Content**: Bullet points of the exact text/content to include.
- **Visuals/Interactions**: Description of diagrams, tables, fragments, or animations.
```

### Key Considerations
- **Question First**: Start slides with a question to provoke thought.
- **Vertical Slides**: Use vertical stacks for deep dives or step-by-step processes (like DNS lookup).
- **Interactions**: Plan where to use `fragment` to reveal answers or steps.
- **Plenary**: Include a "True or False" or "Retrieval Practice" section at the end.

## 3. Review Plan
- Review the Markdown plan against the source text to ensure 100% coverage.
- Check that the flow makes logical sense.
- (Optional) Ask the user to review the plan.

## 4. Implement Slide Deck
- Create the HTML file (e.g., `[topic_id]_[topic_name].html`).
- Use the Markdown plan as a direct blueprint.
- Focus on implementing the structure and content defined in the plan.
- Apply the standard CSS/JS templates.

## 5. Verify
- Open the slide deck in the browser.
- Verify all content from the plan is present.
- Check all interactions (fragments, vertical scrolling) work as expected.
- Ensure the design matches the project's style.
