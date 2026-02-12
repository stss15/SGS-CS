---
topicNumber: 4
topicName: "Software"
summary: "If hardware is the body, software is the mind. In this topic, we bridge the gap between human ideas and electronic pulses. You will learn about the different types of software that keep a system running, the vital role of the Operating System (OS), and how the code you write (High-Level Language) is translated into the binary (Machine Code) that the processor actually understands."
subtopics:
  - code: "4.1"
    title: "Types of Software & Interrupts"
  - code: "4.2"
    title: "Languages, Translators and IDEs"
sourcePolicy: igcse_textbook_then_syllabus_then_slides
---

## Unit Summary

If hardware is the body, software is the mind. In this topic, we bridge the gap between human ideas and electronic pulses. You will learn about the different types of software that keep a system running, the vital role of the Operating System (OS), and how the code you write (High-Level Language) is translated into the binary (Machine Code) that the processor actually understands.

## Objectives and Outcomes

### Objectives

- Software Types: The distinction between System Software (OS, utilities) and Application Software (word processors, games).
- The Operating System: Its critical roles, from managing memory and multitasking to handling interrupts.
- Programming Languages: The difference between High-Level Languages (Python, Java) and Low-Level Languages (Assembly, Machine Code).
- Translators: How Compilers, Interpreters, and Assemblers turn your code into executable programs.
- IDEs: The tools developers use to write, test, and debug code efficiently.

### Outcomes

- Classify Software: Correctly identify whether a given program (e.g., a spreadsheet or a disk defragmenter) is system or application software.
- Justify Choices: Explain why a programmer might choose a Low-Level language (speed, hardware control) versus a High-Level language (portability, ease of use).
- Explain Translation: Describe the difference between how a compiler and an interpreter handle errors and code execution.
- Describe Interrupts: Explain the sequence of events when an interrupt signal is sent to the CPU (e.g., current cycle finishes -> state saved -> ISR runs -> state restored).

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| System Software | Software that manages hardware and provides a platform for applications. |
| Application Software | Software built to perform user-focused tasks. |
| Operating System | Core system software managing resources and process execution. |
| Utility Program | System software tool for maintenance, security, or optimisation. |
| Interrupt | Signal that temporarily changes normal CPU instruction flow. |
| Interrupt Service Routine | Code executed in response to an interrupt. |
| High-Level Language | Human-readable programming language. |
| Low-Level Language | Language closer to machine instructions, such as assembly. |
| Compiler | Translator that converts complete source code before execution. |
| Interpreter | Translator that executes source statements line by line. |
| Assembler | Translator that converts assembly language into machine code. |
| IDE | Integrated Development Environment with coding, debugging, and build tools. |

## 4.1 Types of Software & Interrupts

### Overview

- Software is broadly grouped into system software and application software.
- Operating systems coordinate memory, files, process scheduling, and interfaces.
- Interrupt handling allows urgent events to be processed safely during normal execution.
- Please refer to Section 4.1.4 for a discussion on interrupts.

### Applied Understanding

- Classify examples accurately as application or system software in exam scenarios.
- Describe interrupt generation, ISR execution, and return to the original task state.
- Explain why interrupt priorities matter when multiple events occur close together.

### Worked Example

**Worked interrupt handling routine**

This routine models a simplified software interrupt workflow with state-save and state-restore steps.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE InterruptRaised : BOOLEAN
INPUT InterruptRaised
IF InterruptRaised THEN
  OUTPUT "Complete current CPU cycle"
  OUTPUT "Save state"
  OUTPUT "Run interrupt service routine"
  OUTPUT "Restore state"
ENDIF
OUTPUT "Continue main program"
</code></pre>

![Software and hardware hierarchy chart.](/igcse/topic4/4.1 images/Software and Hardware Hierachy.png)

*Software and hardware hierarchy chart.*

## 4.2 Languages, Translators and IDEs

### Overview

- High-level and low-level languages are selected based on readability, control, and performance requirements.
- Compilers, interpreters, and assemblers convert source forms into executable forms.
- IDEs improve development speed using tools such as code completion, syntax checking, and debugging.

### Applied Understanding

- Compare compiler and interpreter behaviour for execution speed and error handling.
- Explain when low-level code control is worth the extra complexity.
- Describe how IDE tools reduce development and debugging time.

### Worked Example

**Worked translator choice matrix**

This routine selects a translation approach based on deployment and debugging priorities.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE NeedsFastRuntime : BOOLEAN
DECLARE NeedsRapidTesting : BOOLEAN
INPUT NeedsFastRuntime
INPUT NeedsRapidTesting
IF NeedsFastRuntime AND NOT NeedsRapidTesting THEN
  OUTPUT "Prefer compiler"
ELSE
  IF NeedsRapidTesting THEN
    OUTPUT "Prefer interpreter"
  ELSE
    OUTPUT "Review mixed approach"
  ENDIF
ENDIF
</code></pre>

![Compiler and interpreter comparison.](/igcse/topic4/4.2 images/compiler vs interpreter.png)

*Compiler and interpreter comparison.*

