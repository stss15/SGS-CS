---
topicNumber: 10
topicName: "Boolean Logic"
summary: "At the deepest level, computers don't \"think\"—they just open and close billions of tiny electronic switches. Boolean Logic is the mathematical system that governs these switches. In this topic, you will learn how to control the flow of 1s and 0s using Logic Gates, creating circuits that can make decisions, do maths, and store data."
subtopics:
  - code: "10.1"
    title: "Logic Gates"
  - code: "10.2"
    title: "Logic Circuits"
  - code: "10.3"
    title: "Truth Tables"
sourcePolicy: igcse_textbook_then_syllabus_then_slides
---

## Unit Summary

At the deepest level, computers don't "think"—they just open and close billions of tiny electronic switches. Boolean Logic is the mathematical system that governs these switches. In this topic, you will learn how to control the flow of 1s and 0s using Logic Gates, creating circuits that can make decisions, do maths, and store data.

## Objectives and Outcomes

### Objectives

- Logic Gates: Identifying and defining the six standard gates: NOT, AND, OR, NAND, NOR, and XOR.
- Logic Circuits: Combining gates to solve specific problems or represent logic expressions.
- Truth Tables: Creating tables that map every possible input combination (1s and 0s) to a final output.
- Logic Expressions: Writing mathematical statements (e.g., A AND B) to represent circuits and problems.

### Outcomes

- Draw Accurately: Draw logic circuits cleanly. Ensure NOT gates are triangles with a small circle, and AND/OR gates are distinct (D-shape vs curved).
- Trace Inputs: Given a circuit and a set of inputs (e.g., A=1, B=0, C=1), trace the 1s and 0s through the gates to find the final output.
- Translate: Convert fluidly between the three forms: Words ("A is on AND B is off") Circuit Diagram Logic Expression.
- Fill Tables: Complete a blank column in a truth table based on a provided circuit diagram.

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Logic Gate | Digital component implementing a Boolean operation. |
| NOT Gate | Gate that inverts a single binary input. |
| AND Gate | Gate producing 1 only when all inputs are 1. |
| OR Gate | Gate producing 1 when at least one input is 1. |
| NAND Gate | NOT applied to AND output. |
| NOR Gate | NOT applied to OR output. |
| XOR Gate | Gate producing 1 when inputs are different. |
| Truth Table | Table listing all input combinations and resulting outputs. |
| Logic Expression | Symbolic representation of gate behaviour. |
| Circuit | Combined set of gates implementing a complete logic function. |
| Binary Input | Input signal represented as 0 or 1. |
| Boolean Algebra | Mathematical framework for logical operations. |

## 10.1 Logic Gates

### Overview

- Logic gates transform binary inputs into binary outputs based on defined Boolean rules.
- You must identify symbols and functions for NOT, AND, OR, NAND, NOR, and XOR gates.
- Single-gate truth tables provide the foundation for larger circuit analysis.

### Applied Understanding

- Associate each gate symbol with its output rule immediately.
- Remember NOT is single-input while the others at this level use two inputs.
- Check gate output using all input combinations before concluding behaviour.

### Worked Example

**Worked gate output evaluator**

This routine evaluates a simple AND gate for two binary inputs.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE A : INTEGER
DECLARE B : INTEGER
DECLARE OutputBit : INTEGER
INPUT A
INPUT B
IF A = 1 AND B = 1 THEN
  OutputBit ← 1
ELSE
  OutputBit ← 0
ENDIF
OUTPUT "AND output = ", OutputBit
</code></pre>

## 10.2 Logic Circuits

### Overview

- Logic circuits combine gates to perform larger decision functions.
- Circuit behaviour can be represented by diagrams or equivalent expressions.
- Evaluation requires tracing intermediate outputs through each stage in sequence.

### Applied Understanding

- Trace stage-by-stage outputs before deciding final circuit output.
- Translate between diagram form and expression form accurately.
- Use bracketed expressions to preserve operation order.

### Worked Example

**Worked two-stage circuit trace**

This routine computes an intermediate OR result, then combines it with NOT logic.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE A : INTEGER
DECLARE B : INTEGER
DECLARE C : INTEGER
DECLARE Stage1 : INTEGER
DECLARE Stage2 : INTEGER
INPUT A
INPUT B
INPUT C
IF A = 1 OR B = 1 THEN
  Stage1 ← 1
ELSE
  Stage1 ← 0
ENDIF
IF C = 0 THEN
  Stage2 ← 1
ELSE
  Stage2 ← 0
ENDIF
IF Stage1 = 1 AND Stage2 = 1 THEN
  OUTPUT "Circuit output = 1"
ELSE
  OUTPUT "Circuit output = 0"
ENDIF
</code></pre>

## 10.3 Truth Tables

### Overview

- Truth tables enumerate all possible binary input combinations and their outputs.
- Input count determines row count: 2^n combinations for n inputs.
- Circuit and expression equivalence can be checked by comparing full truth tables.

### Applied Understanding

- Generate row counts correctly for 2-input, 3-input, and 4-input tables.
- Compute intermediate columns to avoid final-column mistakes.
- Check expression-derived outputs against circuit-derived outputs for consistency.

### Worked Example

**Worked truth-table completion routine**

This routine outputs all combinations for two inputs and calculates XOR result.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE A : INTEGER
DECLARE B : INTEGER
DECLARE XorOut : INTEGER
FOR A ← 0 TO 1
  FOR B ← 0 TO 1
    IF A &lt;&gt; B THEN
      XorOut ← 1
    ELSE
      XorOut ← 0
    ENDIF
    OUTPUT A, B, XorOut
  NEXT B
NEXT A
</code></pre>

