---
level: sl
unitNumber: 1
unitName: Computational Thinking
summary: Revise Computational Thinking with exam-focused coverage of B1.1.1, B1.1.2, B1.1.3, B1.1.4, including exact command-term expectations and applied examples.
subtopics:
  - code: B1.1.1
    title: Problem specification
  - code: B1.1.2
    title: Computational thinking concepts
  - code: B1.1.3
    title: Problem solving
  - code: B1.1.4
    title: Flowcharts
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Problem specification | A precise statement of the problem, constraints, inputs/outputs, and success criteria. |
| Stakeholder | A person or group affected by, or involved in, the solution. |
| Constraint | A limit the solution must respect (e.g. time, cost, legal, or hardware limits). |
| Abstraction | Focusing on essential detail while ignoring irrelevant complexity. |
| Decomposition | Breaking a complex problem into smaller manageable sub-problems — before coding. |
| Pattern recognition | Identifying similarities or repeated structures that allow reuse of logic. |
| Algorithmic thinking | Designing a finite, ordered, unambiguous sequence of steps to solve a problem. |
| Flowchart | A diagram that represents an algorithm using standard symbols and flow lines. |
| Trace table | A structured record of variable values and outputs as an algorithm executes step-by-step. |
| MOD | Returns the remainder after integer division (e.g. 17 MOD 5 = 2). |
| DIV | Integer division returning the quotient without remainder (e.g. 17 DIV 5 = 3). |
| Evaluation criteria | Specific, measurable metrics used to judge whether a final product succeeds. |


## B1.1.1 Building a Problem Specification

### Overview

The IB expects you to **construct** a problem specification — meaning you must actually produce one, not just describe what one contains. A full specification defines what must be solved, under which constraints, with explicit inputs, outputs, and measurable success criteria.

<div class="reader-section-body reader-section-body--concept">

Every specification must contain five components. Use this table as a checklist:

| Component | What to include | Example (school library system) |
| --- | --- | --- |
| **1. Problem statement** | Description of the issue, affected audience, and current shortcomings | "Students waste 10+ minutes searching shelves manually; there is no digital catalogue." |
| **2. Constraints & limitations** | Hardware/software limits, budget, time, legislation (e.g. GDPR), workforce | "Must run on existing tablets; budget under $500; must comply with GDPR for student records." |
| **3. Objectives & goals** | What the system must achieve — clear, non-vague targets | "Allow keyword search, know which books are available in real-time, send overdue reminders." |
| **4. Inputs & outputs** | Data entering and leaving the system — categorised by type | **Inputs:** barcode scan (automatic), student ID (manual). **Outputs:** on-screen catalogue (temporary), overdue email (permanent). |
| **5. Evaluation criteria** | How you will measure whether the solution succeeds — must be specific and testable | "Search must return results in under 2 seconds; 90% of students prefer it over the manual process." |

</div>

### Worked example

<div class="reader-section-body reader-section-body--example">

Imagine your school canteen wants to move from a paper ordering system to a digital kiosk. A student might draft:

> **Problem:** Queues last 15 minutes at lunch because staff take orders verbally. Students sometimes receive the wrong meal.
>
> **Constraints:** Budget of £800; must work offline during internet outages; food hygiene regulations require allergy flagging.
>
> **Objectives:** Reduce average queue time to under 5 minutes; eliminate order errors; flag allergens automatically.
>
> **Inputs:** Touchscreen selections (direct entry), student ID card tap (NFC — automatic entry).
>
> **Outputs:** Kitchen order ticket (permanent printout), on-screen confirmation (temporary).
>
> **Evaluation:** Timed queue comparison over one week; error log shows zero mismatches.

**Exam tip:** the command term *Construct* means you must actually produce the specification, not just describe what one contains. Practise writing them for different scenarios until the five components come naturally.

</div>


## B1.1.2 The Four Pillars of Computational Thinking

### Overview

The IB expects you to **describe** the four fundamental concepts of computational thinking. You need to define each pillar precisely and show how they are distinct — especially under exam conditions where vague overlap loses marks.

<div class="reader-section-body reader-section-body--concept">

Computational thinking is a problem-solving framework — a toolkit you apply *before* you write any code.

| Pillar | Core idea | Real-world analogy |
| --- | --- | --- |
| **Abstraction** | Strip away irrelevant detail to focus on what matters | The London Tube Map ignores real geography (curves, distances) and keeps only station connections — that makes it usable. |
| **Decomposition** | Break the *problem* into smaller, manageable sub-problems | Planning a school event: venue booking, catering, invitations, and entertainment are tackled separately. |
| **Pattern Recognition** | Spot similarities or repeating structures to reuse solutions | Noticing that every lesson plan follows the same structure lets you create a reusable template. |
| **Algorithmic Thinking** | Design a precise, ordered sequence of steps to solve the problem | A recipe: step 1 → step 2 → step 3. Every input produces a predictable output. |

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

- **Decomposition ≠ "breaking down a program into subroutines."** Decomposition happens at the *problem* level, before any code exists. You decompose the problem, not the program.
- **Abstraction ≠ "making things complicated."** It is the opposite — it means *removing* irrelevant detail. In OOP, a class hides implementation details. On a map, unnecessary roads are removed. Both simplify.

</div>

### Spot the pillar

<div class="reader-section-body reader-section-body--example">

Read each scenario and decide which pillar is being applied.

| # | Scenario | Pillar |
| --- | --- | --- |
| 1 | A programmer ignores the CPU architecture details and writes Java code that runs on any machine. | Abstraction |
| 2 | A team splits a large app into: login, dashboard, database, and API modules. | Decomposition |
| 3 | A developer notices that form validation logic is identical across 5 pages and writes a single reusable function. | Pattern Recognition |
| 4 | A student writes step-by-step pseudocode for calculating the average of a list of numbers. | Algorithmic Thinking |

</div>


## B1.1.3 Applying Computational Thinking Across Domains

### Overview

The IB expects you to **explain** how computational thinking is used to solve problems across different areas of computer science. *Explain* is a higher-order command: you must connect each pillar to a concrete domain and show **why** it applies, not just **that** it does.

<div class="reader-section-body reader-section-body--concept">

Strong answers link CT concepts to non-programming contexts too — for instance, "How is abstraction used in network security?"

</div>

### The domain matrix

<div class="reader-section-body reader-section-body--apply">

This table maps each pillar to four major CS domains. In the exam, you may be given a scenario from any of these areas and asked to identify or explain the relevant CT concept.

| Domain | Abstraction | Decomposition | Pattern Recognition | Algorithmic Design |
| --- | --- | --- | --- | --- |
| **Software Development** | Libraries hide implementation details; high-level languages abstract hardware | Modularity — breaking a system into classes, functions, and packages | Reusable functions, shared components, design patterns | Flowcharts and pseudocode to plan logic before coding |
| **Machine Learning** | Feature selection — keeping only the data attributes that matter | Splitting the ML pipeline: data collection → preprocessing → training → evaluation | Classifying data into clusters; recognising trends to make predictions | Training algorithms (gradient descent, decision trees) follow precise iterative steps |
| **Networks** | The OSI model layers abstract lower-level details from higher layers | Separating security into firewall, encryption, authentication sub-problems | Intrusion detection: recognising attack signatures by comparing traffic patterns | Routing algorithms (e.g. Dijkstra) find the shortest path through a network |
| **Databases** | ER diagrams and views abstract the underlying table structure | Normalisation — breaking one large table into related smaller tables | Repeated data → candidate for a lookup table; SQL query templates | Query optimisation follows rule-based steps to retrieve data efficiently |

</div>

### Worked example

<div class="reader-section-body reader-section-body--example">

> **Exam-style prompt:** "A hospital wants to build a patient records system. Explain how decomposition and abstraction would be used during development."

**Model answer:**

- **Decomposition** — The overall problem ("manage patient records") would be broken into sub-problems: patient registration, appointment scheduling, medical history storage, prescription tracking, and billing. Each sub-problem can be developed and tested independently.
- **Abstraction** — A doctor does not need to see the database schema or network configuration. The system would present a simplified interface showing only patient name, diagnosis, and treatment plan — hiding the underlying complexity of how data is stored, replicated, and secured.

**Exam tip:** when answering *Explain* questions, always state the concept, give the concrete application, and then say *why* it helps — for example, "This reduces development time because…" or "This allows teams to work in parallel because…"

</div>


## B1.1.4 Flowcharts and Tracing

### Overview

The IB expects you to **trace** flowcharts for programming algorithms. This means following a flowchart step by step, recording every variable change and decision outcome in a trace table. You must know the standard symbols, be able to read a flowchart, and produce an accurate trace table for given test data.

### Standard flowchart symbols

<div class="reader-section-body reader-section-body--concept">

| Symbol | Shape | Purpose | Example |
| --- | --- | --- | --- |
| ⬭ | Oval (Terminator) | Start or End of the algorithm | `START`, `END` |
| ▱ | Parallelogram | Input or Output | `INPUT num`, `OUTPUT total` |
| ▭ | Rectangle (Process) | Calculation or assignment | `total = total + num` |
| ◇ | Diamond (Decision) | Yes/No or True/False branch | `Is num > 0?` |
| → | Arrow (Flowline) | Shows direction of flow between steps | Connects any two symbols |

**Common mistakes to avoid:**

- Forgetting to label decision branches — every diamond must have both **Yes** and **No** paths marked.
- Leaving flowlines disconnected — every line must terminate at another symbol.
- Omitting the terminator — every flowchart needs both `START` and `END` ovals.

</div>

### Worked trace: counting positive numbers

<div class="reader-section-body reader-section-body--example">

Consider a flowchart that reads three numbers and counts how many are positive. The algorithm in pseudocode:

```
START
  count ← 0
  LOOP 3 times
    INPUT num
    IF num > 0 THEN
      count ← count + 1
    END IF
  END LOOP
  OUTPUT count
END
```

Test data: **5, −2, 8**

| Step | Action | `count` | `num` | Decision (`num > 0?`) | Output |
| --- | --- | --- | --- | --- | --- |
| 1 | Initialise | 0 | — | — | — |
| 2 | INPUT 5 | 0 | 5 | Yes | — |
| 3 | count ← count + 1 | 1 | 5 | — | — |
| 4 | INPUT −2 | 1 | −2 | No | — |
| 5 | (skip increment) | 1 | −2 | — | — |
| 6 | INPUT 8 | 1 | 8 | Yes | — |
| 7 | count ← count + 1 | 2 | 8 | — | — |
| 8 | OUTPUT count | 2 | 8 | — | **2** |

**Trace table discipline:**

- Write one row per action — every time a variable changes or a decision is made.
- Copy unchanged variable values forward so every row shows the complete state.
- At a decision diamond, record the outcome (Yes/No) even if nothing else changes.
- Any value that hasn't been assigned yet is shown as `—` (not 0, not blank).

**Exam tip:** MOD and DIV operations are common exam favourites in tracing questions. For instance, `17 MOD 5 = 2` (the remainder) and `17 DIV 5 = 3` (the whole-number quotient).

</div>
