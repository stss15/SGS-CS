---
topicNumber: 8
topicName: "Programming"
summary: "Topic 7 taught you how to design algorithms; Topic 8 is about building them. This chapter covers the practical skills needed to write, test, and refine working computer programs. You will learn to control data flow with loops and logic, organise code with functions and procedures, and handle data persistence using files."
subtopics:
  - code: "8.1"
    title: "Programming Concepts"
  - code: "8.2"
    title: "Arrays"
  - code: "8.3"
    title: "File Handling"
sourcePolicy: igcse_textbook_then_syllabus_then_slides
---

## Unit Summary

Topic 7 taught you how to design algorithms; Topic 8 is about building them. This chapter covers the practical skills needed to write, test, and refine working computer programs. You will learn to control data flow with loops and logic, organise code with functions and procedures, and handle data persistence using files.

## Objectives and Outcomes

### Objectives

- Programming Concepts: Variables, constants, data types, input/output, and operators (Arithmetic, Logical, Boolean).
- Control Flow: Sequence, Selection (IF, CASE), and Iteration (FOR, REPEAT, WHILE).
- Data Handling: String manipulation (Length, Substring, Upper/Lower) and Library Routines (Random, Round).
- Subroutines: Creating and using Procedures and Functions, including parameters and local/global variables.
- Arrays: Using 1D and 2D arrays to store lists and tables of data.
- File Handling: Reading from and writing to external text files to save data permanently.

### Outcomes

- Write Code: Write small snippets of pseudocode or program code (Python/VB/Java) to solve specific problems (e.g., "Write a loop to output the first 10 square numbers").
- Debug: Identify logic errors or syntax errors in a given piece of code and correct them.
- Explain Concepts: Explain why you would use a constant instead of a variable, or why a loop is more efficient than repeating code.
- Trace Arrays: Manually trace the values in an array as a loop updates them (e.g., performing a Bubble Sort pass).
- Handle Files: Write the correct sequence of commands to open a file, write a string to it, and close it safely.

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Variable | Named memory location whose value can change during execution. |
| Constant | Named value that should not change during execution. |
| Data Type | Classification of data determining valid operations and storage form. |
| Sequence | Program statements executed in order. |
| Selection | Branching based on condition evaluation. |
| Iteration | Repetition of statements while a condition or count rule is satisfied. |
| Procedure | Named block of code performing a task without returning a value directly. |
| Function | Named block of code returning a value. |
| Parameter | Value passed into a procedure or function. |
| Array | Indexed data structure storing multiple values of the same type. |
| File Handling | Reading from and writing to persistent file storage. |
| Maintainable Code | Code that is readable, testable, and easy to modify safely. |

## 8.1 Programming Concepts

### Overview

- Programming concepts include variables, constants, data types, and control structures.
- Correct use of sequence, selection, and iteration forms the backbone of reliable logic.
- Readable naming and clear structure improve maintainability and debugging speed.
- Chapter 7. Just look at the section for the programming language you are using.

### Applied Understanding

- Use explicit data-type reasoning when combining numeric and string operations.
- Apply nested selection and loop structures carefully with explicit end statements.
- Use procedures and functions to avoid repeated logic blocks.

### Worked Example

**Worked maintainable input-output routine**

This routine uses clear identifiers and control flow to process and classify a score.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE Score : INTEGER
DECLARE Grade : STRING
INPUT Score
IF Score &gt;= 80 THEN
  Grade ← "Distinction"
ELSE
  IF Score &gt;= 50 THEN
    Grade ← "Pass"
  ELSE
    Grade ← "Fail"
  ENDIF
ENDIF
OUTPUT "Grade = ", Grade
</code></pre>

## 8.2 Arrays

### Overview

- Arrays store multiple values of one data type using index positions.
- One-dimensional and two-dimensional arrays support list and table data models.
- Iteration is used to populate, search, and process array contents efficiently.
- Arrays can also be populated as they are declared.

### Applied Understanding

- Declare index bounds explicitly so first element position is unambiguous.
- Use nested loops for two-dimensional array traversal.
- Prevent out-of-range access by validating index values.

### Worked Example

**Worked array population and search**

This routine fills an array and then performs a linear search for a target value.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE Values : ARRAY[1:5] OF INTEGER
DECLARE Index : INTEGER
DECLARE Target : INTEGER
FOR Index ← 1 TO 5
  INPUT Values[Index]
NEXT Index
INPUT Target
FOR Index ← 1 TO 5
  IF Values[Index] = Target THEN
    OUTPUT "Found at index ", Index
  ENDIF
NEXT Index
</code></pre>

## 8.3 File Handling

### Overview

- Files allow data persistence beyond program runtime.
- Read/write workflows require explicit opening mode and proper closing after use.
- Structured file operations improve data integrity and traceability.

### Applied Understanding

- Open files in correct mode before read/write operations.
- Handle data line by line using clear variable assignment.
- Close files as soon as operations are complete to avoid corruption risk.

### Worked Example

**Worked file copy routine**

This routine reads one value and writes it to a second file using explicit open and close commands.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE LineText : STRING
OPENFILE "Input.txt" FOR READ
OPENFILE "Output.txt" FOR WRITE
READFILE "Input.txt", LineText
WRITEFILE "Output.txt", LineText
CLOSEFILE "Input.txt"
CLOSEFILE "Output.txt"
OUTPUT "Copy complete"
</code></pre>

