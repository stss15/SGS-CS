# Topic 10 End of Unit Test Plan

## Goal
Create a comprehensive self-marking assessment for Topic 10: Boolean Logic.

## Content Coverage
This test will cover Topic 10.1, 10.2, and 10.3:
-   Logic Gate Symbols (NOT, AND, OR, NAND, NOR, XOR)
-   Logic Gate Functions & Truth Tables
-   Logic Circuits & Expressions
-   Problem Statements

## Question Design (10 Questions)

### Q1: Gate Symbols (Matching)
-   **Task**: Match symbol to name.
-   **Pairs**:
    -   Triangle with circle -> NOT
    -   D-shape -> AND
    -   Curved D-shape -> OR
    -   Curved D-shape with line -> XOR

### Q2: AND Gate Logic (Multiple Choice)
-   **Task**: Identify AND behavior.
-   **Question**: When does an AND gate output 1?
-   **Options**: Only when both inputs are 1 (Correct), When any input is 1, When inputs are different, Never.

### Q3: Truth Table - OR (Ordering)
-   **Task**: Order rows for OR gate.
-   **Order**: 0,0->0; 0,1->1; 1,0->1; 1,1->1.

### Q4: NAND Logic (Multiple Choice)
-   **Task**: Identify NAND behavior.
-   **Question**: Which gate is the opposite of AND?
-   **Options**: NAND (Correct), NOR, XOR, OR.

### Q5: Logic Expression (Multiple Choice)
-   **Task**: Convert text to logic.
-   **Scenario**: "Fan is ON if Temp > 20 OR (Switch is ON AND Timer is OFF)".
-   **Options**: T OR (S AND NOT Ti) (Correct), T AND (S OR Ti), etc.

### Q6: Circuit Analysis (Multiple Choice)
-   **Task**: Determine output.
-   **Circuit**: `(A AND B) OR C`. Inputs: A=1, B=0, C=1.
-   **Calculation**: (1 AND 0) = 0. 0 OR 1 = 1.
-   **Options**: 1 (Correct), 0.

### Q7: XOR Truth Table (True/False Grid)
-   **Statements**:
    -   0, 0 -> 0 (True)
    -   0, 1 -> 1 (True)
    -   1, 1 -> 1 (False)

### Q8: Logic Notation (Matching)
-   **Task**: Match notation to gate.
-   **Pairs**:
    -   `A . B` -> AND
    -   `A + B` -> OR
    -   `NOT A` -> NOT
    -   `A XOR B` -> XOR

### Q9: Problem Solving (Multiple Choice)
-   **Task**: Identify correct gate for scenario.
-   **Scenario**: "A light should turn on if either switch A is pressed OR switch B is pressed, but not both."
-   **Options**: XOR (Correct), OR, AND, NAND.

### Q10: Complex Expression (Ordering)
-   **Task**: Order operations for `NOT (A OR B)`.
-   **Steps**:
    1.  Take inputs A and B
    2.  Apply OR gate
    3.  Apply NOT gate to result
    4.  Output final value

## Implementation Details
-   **File**: `public/igcse/topic10/Topic10_End_of_unit_Test.html`
-   **Template**: `public/igcse/topic6/Topic6_End_of_unit_Test.html`
