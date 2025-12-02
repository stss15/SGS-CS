# Topic 8 End of Unit Test Plan

## Goal
Create a comprehensive self-marking assessment for Topic 8: Programming.

## Content Coverage
This test will cover sub-topics 8.1 to 8.3:
-   8.1 Programming Concepts (Variables, Constants, Loops, Selection)
-   8.2 Arrays (1D, 2D, Indexing)
-   8.3 File Handling (Read, Write, Open, Close)

## Question Design (10 Questions)

### Q1: Variable vs Constant (Drag & Drop)
-   **Topic**: 8.1
-   **Task**: Categorize items.
-   **Buckets**: Variable, Constant
-   **Items**: `Score`, `PlayerName`, `PI`, `TaxRate`.

### Q2: Data Types (Matching)
-   **Topic**: 8.1
-   **Task**: Match value to type.
-   **Pairs**:
    -   `10` -> Integer
    -   `10.5` -> Real
    -   `"Ten"` -> String
    -   `TRUE` -> Boolean

### Q3: Selection Logic (Multiple Choice)
-   **Topic**: 8.1
-   **Task**: Predict output.
-   **Snippet**: `IF X > 10 THEN OUTPUT "Big" ELSE OUTPUT "Small"` (X=5)
-   **Options**: Small (Correct), Big, Error, Nothing.

### Q4: Loop Purpose (Matching)
-   **Topic**: 8.1
-   **Task**: Match loop to use case.
-   **Pairs**:
    -   FOR -> Fixed number of iterations
    -   WHILE -> Pre-condition check
    -   REPEAT -> Post-condition check

### Q5: Array Indexing (Multiple Choice)
-   **Topic**: 8.2
-   **Task**: Value at index.
-   **Array**: `List = [5, 10, 15, 20]`
-   **Question**: `List[3]`?
-   **Options**: 20 (Correct), 15, 10, 5.

### Q6: 2D Array Concept (True/False Grid)
-   **Topic**: 8.2
-   **Statements**:
    -   2D arrays are like tables (True)
    -   You need two indices to access an element (True)
    -   All elements must be different types (False)

### Q7: Populating Array (Ordering)
-   **Topic**: 8.2
-   **Task**: Order loop code.
-   **Order**: `FOR i = 0 TO 9`, `INPUT Arr[i]`, `NEXT i`.

### Q8: File Modes (Multiple Choice)
-   **Topic**: 8.3
-   **Question**: Which mode overwrites existing data?
-   **Options**: WRITE (Correct), READ, APPEND, EDIT.

### Q9: File Operations (Matching)
-   **Topic**: 8.3
-   **Pairs**:
    -   OPEN -> Start
    -   CLOSE -> End
    -   READ -> Get data
    -   WRITE -> Save data

### Q10: Algorithm Trace (Multiple Choice)
-   **Topic**: 8.1
-   **Snippet**: `Total = 0`, `FOR i = 1 TO 3`, `Total = Total + i`, `NEXT i`
-   **Question**: Final Total?
-   **Options**: 6 (Correct), 3, 1, 0.

## Implementation Details
-   **File**: `public/igcse/topic8/Topic8_End_of_unit_Test.html`
-   **Template**: `public/igcse/topic6/Topic6_End_of_unit_Test.html`
