---
description: How to build a new KS3 lesson using the Master Template
---

# Build Workflow: Creating a New KS3 Lesson

Follow this 6-step process to create a new lesson slide deck.

## 1. Duplicate the Template
- Locate `docs/agent/templates/KS3 Templates/KS3_Master_Tempalte.html`.
- Duplicate this file.

## 2. Rename & Move
- Rename the duplicated file to your lesson name (e.g., `L1_digital_you.html`).
- Move it to the correct unit folder (e.g., `public/ks3/year7/unit2/`).

## 3. Phase 2: Mini Task
- Open the file.
- Scroll to the **OPTIONAL PATTERN LIBRARY** at the bottom.
- Choose **ONE** Mini Task widget (e.g., MCQ Grid, Spot the Error).
- Copy the widget HTML.
- Scroll up to **Phase 2: Mini Tasks**.
- Paste the widget into the slot, replacing the placeholder or existing example.
- **Crucial**: Ensure you uncomment the HTML if it was commented out.

## 4. Phase 3: Main Task
- Scroll to **Phase 3: Main Task**.
- Paste your main task content here.
- Use standard content boxes (`.box`, `.box-blue`) or split columns (`.cols`) as needed.

## 5. Phase 4: Plenary
- Scroll to the **OPTIONAL PATTERN LIBRARY** at the bottom.
- Choose **ONE** Plenary widget (e.g., Countdown Quiz, Tweet the Lesson).
- Copy the widget HTML.
- Scroll up to **Phase 4: Plenary**.
- Paste the widget into the slot.

## 6. Check & Save
- Open the file in your browser to verify.
- Check that:
    - The Hook slide looks correct.
    - The Mini Task works (interactivity).
    - The Plenary works.
    - No slides are overflowing (vertical scroll).
- Save the file.
