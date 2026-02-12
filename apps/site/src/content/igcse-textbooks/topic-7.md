---
topicNumber: 7
topicName: "Algorithm Design and Problem-Solving"
summary: "Before a single line of code is written, a problem must be understood and solved logically. This topic covers the art of Computational Thinking: breaking big problems down into small pieces (decomposition), designing step-by-step solutions (algorithms), and ensuring those solutions are robust (testing and validation). This is the foundation of all programming."
subtopics:
  - code: "7.1"
    title: "Program Development Life Cycle"
  - code: "7.2"
    title: "Computer Systems & Subsystems"
  - code: "7.3"
    title: "Decomposition & Algorithms"
  - code: "7.4"
    title: "Methods of Solution"
  - code: "7.5"
    title: "Standard Methods of Solution"
  - code: "7.6"
    title: "Validation & Verification"
  - code: "7.7"
    title: "Testing"
  - code: "7.8"
    title: "Trace Tables"
  - code: "7.9"
    title: "Identifying Errors"
sourcePolicy: igcse_textbook_then_syllabus_then_slides
---

## Unit Summary

Before a single line of code is written, a problem must be understood and solved logically. This topic covers the art of Computational Thinking: breaking big problems down into small pieces (decomposition), designing step-by-step solutions (algorithms), and ensuring those solutions are robust (testing and validation). This is the foundation of all programming.

## Objectives and Outcomes

### Objectives

- The Development Cycle: The four key stages: Analysis, Design, Coding, and Testing.
- Decomposition: How to break computer systems into sub-systems and component parts.
- Standard Algorithms: Memorising the logic for Linear Search, Bubble Sort, Totalling, Counting, and finding Averages/Max/Min.
- Validation & Verification: Ensuring data input is both reasonable (Validation) and consistent (Verification).
- Testing: Using Trace Tables and different types of test data (Normal, Abnormal, Extreme, Boundary) to prove your algorithm works.

### Outcomes

- Draw Flowcharts: Create accurate flowcharts using the correct symbols (terminator, process, input/output, decision, flow line).
- Write Pseudocode: Write clear pseudocode for a given problem (e.g., "Write an algorithm to input 10 numbers and output the average").
- Trace Logic: Complete a trace table for a complex loop to show you understand exactly how the variables change.
- Spot Errors: Look at a broken piece of code (e.g., an infinite loop or incorrect logic) and identify exactly what is wrong and how to fix it.
- Define Checks: Clearly distinguish between a range check (is it between 1-100?) and a length check (is it 8 characters long?).

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Program Development Life Cycle | Structured stages from analysis to maintenance/testing review. |
| Decomposition | Breaking a complex problem into manageable components. |
| Flowchart | Diagrammatic algorithm representation using standard symbols. |
| Pseudocode | Structured language-like algorithm description independent of implementation language. |
| Validation | Checking whether input data is reasonable and within required rules. |
| Verification | Checking copied/transferred data matches the original source. |
| Boundary Test Data | Values at, just below, and just above limits. |
| Normal Test Data | Typical values expected in routine operation. |
| Abnormal Test Data | Invalid or unusual values used to test resilience. |
| Trace Table | Stepwise record of variable changes and outputs through an algorithm. |
| Linear Search | Sequential scan through data until target is found or list ends. |
| Bubble Sort | Sorting method using repeated adjacent swaps until ordered. |

## 7.1 Program Development Life Cycle

### Overview

- Program development follows clear stages: analysis, design, coding, and testing.
- Each stage produces outputs used by the next stage, reducing ambiguity and rework.
- Computational thinking supports stronger requirements and design decisions early in the cycle.

### Applied Understanding

- Use requirements statements that separate constraints, inputs, processing, and outputs.
- Show how design artifacts (flowcharts/pseudocode) reduce coding errors before implementation.
- Relate iterative testing to defect discovery and correction speed.

### Worked Example

**Worked life-cycle checkpoint routine**

This routine checks whether key development deliverables are complete before progression.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE AnalysisComplete : BOOLEAN
DECLARE DesignComplete : BOOLEAN
DECLARE CodingComplete : BOOLEAN
INPUT AnalysisComplete
INPUT DesignComplete
INPUT CodingComplete
IF AnalysisComplete AND DesignComplete AND CodingComplete THEN
  OUTPUT "Proceed to formal testing"
ELSE
  OUTPUT "Complete missing life-cycle stage"
ENDIF
</code></pre>

## 7.2 Computer Systems & Subsystems

### Overview

- Systems can be decomposed into subsystems and component parts with clear responsibilities.
- Inputs, processes, storage, and outputs should be identified for each subsystem.
- Structured decomposition supports modular design and clearer test planning.

### Applied Understanding

- Represent subsystem boundaries and data flow explicitly in diagrams and pseudocode.
- Explain how decomposition enables parallel team development.
- Keep subsystem interfaces clear to reduce integration errors.

### Worked Example

**Worked subsystem selector**

This routine routes requests to a chosen subsystem based on operation type.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE RequestArea : STRING
INPUT RequestArea
CASE OF RequestArea
  "Input" : OUTPUT "Route to capture subsystem"
  "Storage" : OUTPUT "Route to data subsystem"
  "Output" : OUTPUT "Route to presentation subsystem"
  OTHERWISE OUTPUT "Route to control subsystem"
ENDCASE
</code></pre>

## 7.3 Decomposition & Algorithms

### Overview

- An algorithm is an ordered finite set of steps that solves a defined problem.
- Decomposition helps transform broad tasks into algorithmic blocks that can be traced and tested.
- Algorithms should be unambiguous and deterministic for the same input conditions.

### Applied Understanding

- Describe how sub-problems map to sub-algorithms.
- Use clear condition checks and loop boundaries to prevent infinite loops.
- Prefer explicit variable naming so trace tables remain readable.

### Worked Example

**Worked decomposition to algorithm flow**

This routine counts positive values from a fixed-size list as a decomposed processing stage.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE Index : INTEGER
DECLARE Value : INTEGER
DECLARE PositiveCount : INTEGER
PositiveCount ← 0
FOR Index ← 1 TO 5
  INPUT Value
  IF Value &gt; 0 THEN
    PositiveCount ← PositiveCount + 1
  ENDIF
NEXT Index
OUTPUT "Positive values = ", PositiveCount
</code></pre>

## 7.4 Methods of Solution

### Overview

- Standard methods such as totalling, counting, and finding min/max/average are core exam patterns.
- These methods rely on consistent initialisation and controlled iteration.
- Search and sort methods require clear stop conditions and state updates.

### Applied Understanding

- Set accumulator and counter start values correctly before loops.
- Update max/min values only when condition checks are satisfied.
- Use linear-search stop rules to avoid unnecessary comparisons.

### Worked Example

**Worked average calculation pattern**

This routine applies total and count variables to compute an average after loop completion.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE Total : REAL
DECLARE Count : INTEGER
DECLARE Number : REAL
DECLARE Average : REAL
Total ← 0.0
Count ← 0
FOR Count ← 1 TO 4
  INPUT Number
  Total ← Total + Number
NEXT Count
Average ← Total / 4.0
OUTPUT "Average = ", Average
</code></pre>

## 7.5 Standard Methods of Solution

### Overview

- Standard methods should be transferable between pseudocode and program code.
- Exam questions often require adapting a known method to a new context.
- Robust solution methods include input checks and clear output formatting.

### Applied Understanding

- Adapt linear search and bubble sort templates to custom field names.
- Use clear loop structure for repeatable, testable logic.
- State assumptions such as sorted/unsorted data explicitly.

### Worked Example

**Worked linear-search template**

This routine performs a linear search and returns the first matching index.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE Index : INTEGER
DECLARE Target : INTEGER
DECLARE Item : INTEGER
DECLARE Found : BOOLEAN
Found ← FALSE
INPUT Target
FOR Index ← 1 TO 5
  INPUT Item
  IF Item = Target THEN
    OUTPUT "Found at position ", Index
    Found ← TRUE
  ENDIF
NEXT Index
IF NOT Found THEN
  OUTPUT "Target not found"
ENDIF
</code></pre>

## 7.6 Validation & Verification

### Overview

- Validation checks whether data is sensible before processing.
- Verification checks copied/transferred data matches the source.
- Using both reduces data-quality failures in system workflows.
- For instance, the set of test data used for Activity 7.6 was 7 and 18.

### Applied Understanding

- Match check type to field: range, length, format, and lookup checks.
- Describe double entry and visual checks for verification contexts.
- Explain why verification does not guarantee data is meaningful.

### Worked Example

**Worked input validation loop**

This routine repeats input until value satisfies required range constraints.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE Mark : INTEGER
REPEAT
  INPUT Mark
  IF Mark &lt; 0 OR Mark &gt; 100 THEN
    OUTPUT "Invalid mark"
  ENDIF
UNTIL Mark &gt;= 0 AND Mark &lt;= 100
OUTPUT "Accepted mark = ", Mark
</code></pre>

## 7.7 Testing

### Overview

- Testing checks algorithm correctness using carefully selected test data.
- Different test-data classes reveal different defect types.
- Expected results must be set before execution for objective evaluation.

### Applied Understanding

- Provide normal, abnormal, and boundary cases for each required input.
- Record expected and actual results in structured test tables.
- Use failures to refine either algorithm logic or validation rules.

### Worked Example

**Worked test-data classifier**

This routine labels each test input category based on a numeric boundary rule.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE Value : INTEGER
INPUT Value
IF Value &lt; 0 OR Value &gt; 100 THEN
  OUTPUT "Abnormal"
ELSE
  IF Value = 0 OR Value = 100 THEN
    OUTPUT "Boundary"
  ELSE
    OUTPUT "Normal"
  ENDIF
ENDIF
</code></pre>

## 7.8 Trace Tables

### Overview

- Trace tables show variable and output changes line by line during algorithm execution.
- They provide evidence for correctness and help isolate logic errors.
- Strong trace tables include all relevant variables and condition outcomes.
- Trace tables and test data can be used to identify and correct errors.

### Applied Understanding

- Write one row per meaningful state change.
- Carry unchanged values forward to keep full state visible.
- Include output and condition columns for branch-heavy logic.

### Worked Example

**Worked trace-ready loop**

This routine is intentionally small so each iteration can be traced fully in a table.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE Counter : INTEGER
DECLARE Total : INTEGER
Total ← 0
FOR Counter ← 1 TO 3
  Total ← Total + Counter
  OUTPUT Total
NEXT Counter
</code></pre>

## 7.9 Identifying Errors

### Overview

- Error identification includes syntax, logic, and runtime failures.
- Correction requires evidence from test outcomes and trace-table state changes.
- Algorithm amendments should preserve clarity while fixing defect causes.

### Applied Understanding

- Check loop-control variables carefully to avoid infinite loops and missed updates.
- Check arithmetic operator intent to avoid accidental multiplication/division errors.
- Validate conditional logic with boundary-focused test cases.

### Worked Example

**Worked algorithm amendment check**

This routine demonstrates replacing a faulty operator and verifying corrected output.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE Number : INTEGER
DECLARE Total : INTEGER
Total ← 0
FOR Number ← 1 TO 5
  Total ← Total + Number
NEXT Number
OUTPUT "Correct total = ", Total
</code></pre>

