---
topicNumber: 3
topicName: "Hardware"
summary: "Hardware is the physical machinery that makes computing possible. In this topic, students move from CPU architecture to practical hardware decisions used in real systems."
subtopics:
  - code: "3.1"
    title: "Computer Architecture"
  - code: "3.2"
    title: "Input & Output Devices"
  - code: "3.3"
    title: "Data Storage"
  - code: "3.4"
    title: "Network Hardware"
sourcePolicy: igcse_textbook_then_syllabus_then_slides
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| central processing unit (CPU) | The processor responsible for executing instructions and controlling system operations. |
| integrated circuit | A microchip that contains electronic circuitry; CPUs are commonly packaged this way. |
| von Neumann architecture | Stored-program architecture where both data and instructions are held in memory. |
| arithmetic and logic unit (ALU) | CPU component that performs arithmetic and logical operations. |
| control unit (CU) | CPU component that coordinates activity by issuing control signals. |
| accumulator (ACC) | Register used to store intermediate ALU results. |
| memory address register (MAR) | Register holding the memory address currently being accessed. |
| memory data register (MDR) | Register holding data read from memory or about to be written to memory. |
| current instruction register (CIR) | Register holding the instruction currently being decoded/executed. |
| program counter (PC) | Register storing the address of the next instruction to fetch. |
| address bus | Bus carrying addresses, typically from CPU to memory. |
| data bus | Bus carrying data between CPU, memory, and I/O devices. |
| control bus | Bus carrying control and timing signals. |
| system clock | Generates pulses used to synchronise processing activity. |
| clock speed | Number of cycles per second (commonly measured in GHz). |
| cache memory | Very fast temporary memory used for frequently needed data/instructions. |
| core | An independent processing unit inside a CPU. |
| instruction set | Complete list of machine instructions a processor can execute. |
| opcode | The operation part of a machine instruction. |
| operand | The data value or address used by an operation. |
| embedded system | A computer system designed for one dedicated purpose. |
| immediate access store (IAS) | Another name for RAM used for active data and program storage. |

## 3.1 Computer Architecture

### Start with the real exam question underneath the topic title

<div class="reader-section-body reader-section-body--concept">

When examiners ask about computer architecture, they are testing whether you can track movement through the machine, not just list parts from memory. In practice, that means being able to explain:

- which register changes next
- what each bus is carrying
- how fetch-decode-execute repeats
- why some CPUs perform faster than others.

If you can narrate one full instruction journey clearly, most 3.1 questions become far easier.

</div>

### The CPU: one chip, coordinated specialist roles

<div class="reader-section-body reader-section-body--apply">

The CPU (often a microprocessor on an integrated circuit) sits at the center of processing. It combines three cooperating elements:

| CPU part | What it does in plain language | Mark-scheme style phrasing |
| --- | --- | --- |
| Control Unit (CU) | Directs the sequence of operations | Sends control signals, synchronises data flow |
| Arithmetic and Logic Unit (ALU) | Performs arithmetic and logic operations | Executes arithmetic/logic instructions |
| Registers | Hold instruction/address/data values temporarily | Stores values during FDE cycle |

A useful correction for students: the ALU does the calculation, but the CU decides timing and order, while registers hold the working state.

</div>

### Von Neumann architecture: the stored-program breakthrough

<div class="reader-section-body reader-section-body--concept">

Before stored-program systems, early machines required much more manual intervention while running. Von Neumann architecture introduced the model still used today:

- CPU can access memory directly
- memory stores both instructions and data
- instructions are processed in sequence via the program counter.

That is exactly why fetch-decode-execute sits at the heart of this subtopic.

![Von Neumann architecture overview.](/igcse/topic3/3.1 images/von neumann architecture.png)

</div>

### Abstract FDE map (SVG)

<div class="reader-section-body reader-section-body--example">

<figure>
  <svg viewBox="0 0 940 360" role="img" aria-labelledby="fde-map-title fde-map-desc" xmlns="http://www.w3.org/2000/svg">
    <title id="fde-map-title">Fetch Decode Execute architecture flow</title>
    <desc id="fde-map-desc">A simplified flow showing memory, control unit, ALU, and key registers connected through buses during one instruction cycle.</desc>
    <defs>
      <style>
        .fde-box { fill: #f8fbff; stroke: #1f3f73; stroke-width: 2; rx: 14; }
        .fde-reg { fill: #eef4ff; stroke: #325a99; stroke-width: 1.6; rx: 10; }
        .fde-arrow { stroke: #1f3f73; stroke-width: 2.2; fill: none; marker-end: url(#arrowhead); }
        .fde-text { font-family: 'Source Sans 3', Arial, sans-serif; fill: #14284a; font-size: 17px; font-weight: 600; }
        .fde-small { font-family: 'Source Sans 3', Arial, sans-serif; fill: #29456f; font-size: 14px; }
      </style>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#1f3f73" />
      </marker>
    </defs>

    <rect class="fde-box" x="40" y="70" width="170" height="200" />
    <text class="fde-text" x="76" y="106">Memory</text>
    <text class="fde-small" x="62" y="138">Instructions + data</text>

    <rect class="fde-box" x="320" y="34" width="250" height="125" />
    <text class="fde-text" x="393" y="70">Control Unit</text>
    <text class="fde-small" x="372" y="100">Decode + control signals</text>

    <rect class="fde-box" x="320" y="198" width="250" height="125" />
    <text class="fde-text" x="410" y="235">ALU</text>
    <text class="fde-small" x="362" y="265">Arithmetic + logic work</text>

    <rect class="fde-reg" x="650" y="44" width="230" height="64" />
    <text class="fde-text" x="722" y="82">PC / MAR</text>

    <rect class="fde-reg" x="650" y="130" width="230" height="64" />
    <text class="fde-text" x="722" y="168">MDR / CIR</text>

    <rect class="fde-reg" x="650" y="216" width="230" height="64" />
    <text class="fde-text" x="752" y="254">ACC</text>

    <path class="fde-arrow" d="M210 120 C260 120, 280 90, 320 90" />
    <path class="fde-arrow" d="M570 90 C610 90, 620 76, 650 76" />
    <path class="fde-arrow" d="M765 108 L765 130" />
    <path class="fde-arrow" d="M765 194 L765 216" />
    <path class="fde-arrow" d="M650 248 C615 248, 605 260, 570 260" />
    <path class="fde-arrow" d="M320 260 C260 260, 240 220, 210 200" />

    <text class="fde-small" x="234" y="110">Address/Data bus</text>
    <text class="fde-small" x="590" y="86">Instruction flow</text>
    <text class="fde-small" x="780" y="122">Fetch</text>
    <text class="fde-small" x="782" y="208">Execute</text>
    <text class="fde-small" x="584" y="245">ALU result</text>
  </svg>
  <figcaption>A simplified memory-to-register-to-ALU flow for one instruction cycle.</figcaption>
</figure>

</div>

### Registers and buses: trace one instruction cleanly

<div class="reader-section-body reader-section-body--example">

| Register | What it stores during processing |
| --- | --- |
| `PC` | Address of the next instruction |
| `MAR` | Address currently being accessed |
| `MDR` | Data read from memory or data waiting to be written |
| `CIR` | Current instruction being decoded/executed |
| `ACC` | Intermediate/final ALU results |

| Bus | Direction pattern | Main use |
| --- | --- | --- |
| Address bus | Usually CPU -> memory | Carries addresses |
| Data bus | Both directions | Carries data/instructions |
| Control bus | Signal traffic both ways | Carries read/write/timing signals |

<div class="igcse-widget">
  <p class="igcse-widget__title">Memory read vs memory write: quick distinction</p>
  <div class="igcse-widget__split">
    <div class="igcse-step-card">
      <h4>Read operation</h4>
      <ol>
        <li>CPU places target address in <code>MAR</code>.</li>
        <li>CU sends <code>READ</code> signal on control bus.</li>
        <li>Memory returns value into <code>MDR</code> via data bus.</li>
        <li>Instruction/data is then used by CU or ALU.</li>
      </ol>
    </div>
    <div class="igcse-step-card">
      <h4>Write operation</h4>
      <ol>
        <li>CPU places destination address in <code>MAR</code>.</li>
        <li>CPU puts value to store in <code>MDR</code>.</li>
        <li>CU sends <code>WRITE</code> signal on control bus.</li>
        <li>Memory updates that location.</li>
      </ol>
    </div>
  </div>
</div>

</div>

### Fetch-Decode-Execute: a six-line narrative you can reproduce in exams

<div class="reader-section-body reader-section-body--apply">

1. `PC` holds the address of the next instruction.
2. Address is copied into `MAR`.
3. CU sends a read signal; memory sends instruction to `MDR`.
4. Instruction is copied to `CIR`; `PC` increments.
5. CU decodes opcode and operand.
6. Execute stage runs (often using ALU), with result commonly ending in `ACC`.

That sequence is short enough to memorise and detailed enough for high-mark "describe" questions.

</div>

### Performance factors: avoid the "clock speed only" mistake

<div class="reader-section-body reader-section-body--apply">

| Factor | Why it can improve performance | Trade-off to mention |
| --- | --- | --- |
| Clock speed | More cycles per second | More heat, potential instability if overclocked |
| Core count | Better parallel task handling | Gains depend on software and workload |
| Cache size | Faster access to frequently used data | Larger cache increases chip complexity/cost |
| Bus width | More bits moved each cycle | Needs matching architecture to benefit fully |

A strong exam answer compares at least two factors and includes a limitation, not just a benefit.

</div>

### Instruction set, opcode, operand: what the CPU can actually execute

<div class="reader-section-body reader-section-body--concept">

An instruction set is the total machine-level command list available to a CPU. Every machine instruction typically has:

- an <strong>opcode</strong> (what to do)
- an <strong>operand</strong> (which value/address to use).

| Instruction part | Example | Meaning |
| --- | --- | --- |
| Opcode | `LDA` | Load data operation |
| Operand | `2048` | Memory address used by the operation |

This is why executable compatibility depends on processor family: instruction sets differ.

![Machine instruction breakdown.](/igcse/topic3/3.1 images/machine code instruction breakdown.png)

</div>

### Embedded systems: same principles, narrower purpose

<div class="reader-section-body reader-section-body--example">

Embedded systems combine hardware and software for one dedicated function. They still use CPU, memory, and I/O principles from 3.1, but with tighter design constraints.

| Device | Embedded or general-purpose? | Reason |
| --- | --- | --- |
| Washing machine controller | Embedded | Dedicated cycle control only |
| Car ABS module | Embedded | Single safety function with sensor feedback |
| Smartphone used for many apps | General-purpose | Broad task range, not one fixed function |
| Desktop PC | General-purpose | Designed for many unrelated programs |

![Embedded systems in context.](/igcse/topic3/3.1 images/embedded systems.png)

<details>
  <summary><strong>Exam phrasing tip</strong></summary>
  In "identify and justify" questions, do not stop at naming the device type. Add one sentence about dedicated function, I/O loop, or constrained design.
</details>

</div>

### Final check before you move on

<div class="reader-section-body reader-section-body--apply">

You are ready for 3.1 if you can do all of these without notes:

- label CPU parts and explain their cooperation
- track `PC`, `MAR`, `MDR`, `CIR`, and `ACC` through one instruction cycle
- explain the role of address, data, and control buses
- compare at least two CPU performance factors with one trade-off
- distinguish embedded systems from general-purpose systems with a justified example.

</div>
