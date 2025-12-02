# Topic 7 End of Unit Test Plan

## Goal
Create a comprehensive self-marking assessment for Topic 7: Algorithm Design and Problem Solving.

## Content Coverage
This test will cover sub-topics 7.1 to 7.9:
-   7.1 Program Development Life Cycle
-   7.2 Computer Systems and Decomposition
-   7.3 Explaining the Purpose of an Algorithm
-   7.4 Standard Methods of Solution
-   7.5 Validation and Verification
-   7.6 Test Data
-   7.7 Trace Tables
-   7.8 Identifying Errors
-   7.9 Writing and Amending Algorithms

## Question Design (10 Questions)

### Q1: PDLC Stages (Ordering)
-   **Topic**: 7.1
-   **Task**: Order the stages of the Program Development Life Cycle.
-   **Items**: Analysis, Design, Coding, Testing, Maintenance.

### Q2: Decomposition (Matching)
-   **Topic**: 7.2
-   **Task**: Match terms to definitions.
-   **Pairs**:
    -   Decomposition -> Breaking down a complex problem
    -   Abstraction -> Removing unnecessary details
    -   Pattern Recognition -> Identifying similarities
    -   Algorithm -> Step-by-step solution

### Q3: Flowchart Symbols (Drag & Drop)
-   **Topic**: 7.2
-   **Task**: Categorize symbols by function.
-   **Buckets**: Input/Output, Process, Decision
-   **Items**: Parallelogram (I/O), Rectangle (Process), Diamond (Decision), Oval (Start/End - *Exclude to keep it simple or add Start/End bucket? Let's stick to 3 main ones*).

### Q4: Standard Algorithms (Matching)
-   **Topic**: 7.4
-   **Task**: Match algorithm name to description.
-   **Pairs**:
    -   Linear Search -> Checks each item in order
    -   Bubble Sort -> Swaps adjacent items if out of order
    -   Totalling -> Adding values to a running sum
    -   Counting -> Incrementing by 1

### Q5: Validation Checks (Multiple Choice)
-   **Topic**: 7.5
-   **Task**: Identify the correct check.
-   **Scenario**: Ensuring a password is at least 8 characters long.
-   **Options**: Length Check (Correct), Range Check, Type Check, Format Check.

### Q6: Test Data Types (Matching)
-   **Topic**: 7.6
-   **Task**: Match data type to example for range 1-100.
-   **Pairs**:
    -   Normal -> 50
    -   Boundary -> 1 or 100
    -   Abnormal -> 150
    -   Extreme -> *Avoid confusion with Boundary, stick to Normal/Abnormal/Boundary for this level or use specific definitions.* Let's use Normal, Abnormal, Boundary.
    -   **Revised Pairs**:
        -   Normal -> 50
        -   Boundary -> 1
        -   Abnormal -> "Ten" (Wrong type) or 150 (Out of range)

### Q7: Trace Table Logic (Multiple Choice)
-   **Topic**: 7.7
-   **Task**: Predict the output.
-   **Snippet**:
    ```
    X <- 5
    Y <- 10
    X <- Y
    Y <- X
    OUTPUT X, Y
    ```
-   **Options**:
    -   10, 10 (Correct)
    -   5, 10
    -   10, 5
    -   5, 5

### Q8: Identifying Errors (Multiple Choice)
-   **Topic**: 7.8
-   **Task**: Identify the logic error.
-   **Snippet**: `IF X > 10 AND X < 5 THEN ...`
-   **Question**: Why will this code never run?
-   **Options**: A number cannot be > 10 and < 5 at the same time (Correct), Syntax error, X is not defined, Needs an OR.

### Q9: Algorithm Efficiency (Multiple Choice)
-   **Topic**: 7.9
-   **Task**: Which loop is best for iterating through an array of known size?
-   **Options**: FOR Loop (Correct), WHILE Loop, REPEAT Loop, IF Statement.

### Q10: Verification (True/False Grid)
-   **Topic**: 7.5
-   **Task**: True/False statements about Verification.
-   **Statements**:
    -   Double entry is a verification check (True)
    -   Visual check is a verification check (True)
    -   Verification checks if data is reasonable (False - that's Validation)
    -   Verification ensures data matches the source (True)

## Implementation Details
-   **File**: `public/igcse/topic7/Topic7_End_of_unit_Test.html`
-   **Template**: `public/igcse/topic6/Topic6_End_of_unit_Test.html`
