---
topicNumber: 3
topicName: "Hardware"
summary: "Hardware is the physical machinery that makes computing possible. While software provides the instructions, hardware does the heavy lifting. In this massive unit, we explore everything from the microscopic transistors inside a CPU to the sensors, printers, and storage devices that allow computers to interact with the physical world."
subtopics:
  - code: "3.1"
    title: "Computer Architecture"
  - code: "3.2"
    title: "Input & Output Devices"
  - code: "3.3"
    title: "Data Storage"
  - code: "3.4"
    title: "Network Hardware"
  - code: "3.5"
    title: "Review & Exam Prep"
sourcePolicy: igcse_textbook_then_syllabus_then_slides
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| central processing unit (CPU) | Processor that executes instructions and controls system operations. |
| integrated circuit | Microchip that contains electronic circuitry, often including the CPU. |
| von Neumann architecture | Stored-program architecture where data and instructions are both held in memory. |
| arithmetic and logic unit (ALU) | CPU component that handles arithmetic and logical operations. |
| control unit (CU) | CPU component that coordinates operations by issuing control signals. |
| accumulator (ACC) | Register used to hold intermediate ALU results. |
| memory address register (MAR) | Register storing the memory location currently being accessed. |
| memory data register (MDR) | Register storing data being read from or written to memory. |
| current instruction register (CIR) | Register holding the instruction currently being decoded/executed. |
| program counter (PC) | Register storing the address of the next instruction to fetch. |
| address bus | Bus carrying addresses, typically CPU to memory (unidirectional). |
| data bus | Bus carrying data between CPU, memory, and I/O (bidirectional). |
| control bus | Bus carrying control/timing signals from CU across the system. |
| word | Group of bits treated as one processing unit (for example 32-bit or 64-bit). |
| system clock | Component that provides timing pulses to synchronise operations. |
| clock speed | Number of clock cycles per second, often measured in GHz. |
| cache memory | Very fast memory in/near CPU for frequently used data/instructions. |
| core | Independent processing unit inside a CPU with ALU, CU, and registers. |
| overclocking | Running a CPU above designed clock speed to increase performance. |
| instruction set | Complete list of machine-level instructions a CPU can execute. |
| opcode | Part of an instruction defining the operation to perform. |
| operand | Part of an instruction specifying the data or location to use. |
| embedded system | Hardware and software designed for a specific dedicated function. |
| microcontroller | Single chip containing CPU, memory, and peripherals for embedded use. |
| system on chip (SoC) | Integrated chip containing CPU plus other major system components. |
| BIOS | Firmware used during startup/initialisation of a computer system. |
| immediate access store (IAS) | Another term for RAM used by CPU for active data/instructions. |

## 3.1 Computer Architecture

### The big picture: what architecture questions are really testing

<div class="reader-section-body reader-section-body--concept">

In exam questions, <strong>computer architecture</strong> is rarely just "name this part." You are usually being tested on movement:

- where an instruction is held
- which register changes next
- which bus is carrying what
- why a design choice improves (or limits) performance.

If you keep that "movement model" in mind, the whole subtopic becomes easier to recall under time pressure.

</div>

### CPU anatomy: one processor, different specialist roles

<div class="reader-section-body reader-section-body--apply">

The CPU is central to modern systems (desktop, laptop, tablet, smartphone). In the syllabus model, you should think of it as three cooperative parts:

| CPU part | Primary role | Typical exam language |
| --- | --- | --- |
| Control Unit (CU) | Directs operations by issuing signals over the control bus | "Synchronises instruction and data flow" |
| Arithmetic and Logic Unit (ALU) | Performs arithmetic and logical operations | "Carries out ADD/shift/AND/OR operations" |
| Registers | Hold immediate values/addresses/instructions during execution | "Stores intermediate data during FDE cycle" |

The ALU does not work in isolation; the CU decides <em>when</em> operations happen, and registers hold <em>what</em> is being worked on.

</div>

### Von Neumann architecture: why "stored program" changed everything

<div class="reader-section-body reader-section-body--concept">

Before stored-program machines, computers needed substantial manual intervention while running. The von Neumann model introduced the architecture still used today:

- one CPU handling instruction processing
- direct CPU access to memory
- memory storing <strong>both</strong> data and instructions
- sequential execution through a program counter.

This is exactly why fetch-decode-execute is such a core concept: the architecture was designed around repeated instruction cycling.

![Von Neumann architecture overview.](/igcse/topic3/3.1 images/von neumann architecture.png)

</div>

### Registers and buses: the hand-off network inside the machine

<div class="reader-section-body reader-section-body--example">

The 3.1 register set appears repeatedly in mark schemes. Learn each one by function:

| Register | What it holds right now |
| --- | --- |
| `PC` | Address of the next instruction to fetch |
| `MAR` | Memory address currently being accessed |
| `MDR` | Data just read from memory, or data about to be written |
| `CIR` | Current instruction being decoded/executed |
| `ACC` | Temporary ALU result |

Bus behaviour is equally important:

| Bus | Direction | Purpose |
| --- | --- | --- |
| Address bus | Usually CPU -> memory (unidirectional) | Identifies memory locations |
| Data bus | Bidirectional | Moves instructions/data between CPU, memory, I/O |
| Control bus | Bidirectional signals | Carries timing/control instructions from CU |

Read example (memory -> CPU):
1. Address goes to `MAR`.
2. Read signal sent on control bus.
3. Memory value arrives in `MDR`.
4. Instruction copied to `CIR`.

Write example (CPU -> memory):
1. Target address in `MAR`.
2. Data to store in `MDR`.
3. Write signal sent on control bus.
4. Memory location updated.

</div>

### Interactive walkthrough: fetch-decode-execute

<div class="reader-section-body reader-section-body--example">

<div class="igcse-widget" data-igcse-fde-sim>
  <p class="igcse-widget__title">FDE stepper (register-by-register)</p>
  <p class="igcse-widget__hint">Move through each stage and watch how `PC`, `MAR`, `MDR`, `CIR`, and `ACC` change.</p>
  <div class="igcse-widget__actions">
    <button type="button" class="igcse-widget__btn" data-fde-prev>Previous</button>
    <button type="button" class="igcse-widget__btn" data-fde-next>Next</button>
    <button type="button" class="igcse-widget__btn igcse-widget__btn--ghost" data-fde-reset>Reset</button>
  </div>
  <p class="igcse-widget__mini-label" data-fde-stage-title>Loading stage...</p>
  <div class="igcse-widget__board" data-fde-register-board></div>
  <p class="igcse-widget__result" data-fde-stage-explain></p>
</div>

<p>In exam responses, use sequence words: <strong>first</strong>, <strong>then</strong>, <strong>next</strong>, <strong>finally</strong>. Marker clarity matters.</p>

</div>

### Performance is multi-factor, not just "more GHz"

<div class="reader-section-body reader-section-body--apply">

Students often over-focus on clock speed. 3.1 expects broader judgement:

| Factor | Why it can help | Why it is not unlimited |
| --- | --- | --- |
| Clock speed | More cycles per second | Heat/stability limits; overclocking can cause crashes |
| Bus width | More bits transferred per cycle | Wider buses alone do not fix poor architecture |
| Cache size | Faster access for frequently used data | Cache misses still fall back to slower RAM |
| Core count | Parallel task handling | Scaling overhead; doubling cores does not always double speed |

Overclocking is specifically worth mentioning in evaluation answers:
- can increase throughput
- can reduce reliability (timing issues, overheating)
- can shorten hardware life if unmanaged.

</div>

### Interactive performance sandbox

<div class="reader-section-body reader-section-body--example">

<div class="igcse-widget" data-igcse-cpu-performance>
  <p class="igcse-widget__title">CPU performance sandbox</p>
  <p class="igcse-widget__hint">Adjust architecture factors and compare the resulting performance profile and risk level.</p>
  <div class="igcse-widget__controls">
    <label>
      Clock speed
      <input type="range" min="2.0" max="5.0" step="0.1" value="3.5" data-cpu-clock />
      <span class="igcse-inline-value" data-cpu-clock-value>3.5 GHz</span>
    </label>
    <label>
      Data bus width
      <select data-cpu-bus>
        <option value="16">16-bit</option>
        <option value="32" selected>32-bit</option>
        <option value="64">64-bit</option>
      </select>
    </label>
    <label>
      Cache size
      <select data-cpu-cache>
        <option value="2">2 MB</option>
        <option value="4" selected>4 MB</option>
        <option value="8">8 MB</option>
        <option value="16">16 MB</option>
      </select>
    </label>
    <label>
      Core count
      <select data-cpu-cores>
        <option value="1">Single-core</option>
        <option value="2" selected>Dual-core</option>
        <option value="4">Quad-core</option>
        <option value="8">Octa-core</option>
      </select>
    </label>
    <label>
      Overclocking
      <select data-cpu-overclock>
        <option value="off" selected>Off</option>
        <option value="on">On</option>
      </select>
    </label>
  </div>
  <div class="igcse-widget__split">
    <div class="igcse-step-card" data-cpu-metric-card></div>
    <div class="igcse-step-card" data-cpu-risk-card></div>
  </div>
</div>

</div>

### Instruction set, opcode, operand: machine-level language

<div class="reader-section-body reader-section-body--concept">

High-level code eventually becomes machine-level instructions the CPU can execute. The instruction set is that allowed operation list.

| Part of instruction | Example | Meaning |
| --- | --- | --- |
| Opcode | `LDA` or `ADD` | Operation to perform |
| Operand | `#25` or memory address `2048` | Data/location used by the operation |

This is why different CPU families can run different binary executables: their instruction sets are not identical.

![Machine instruction breakdown.](/igcse/topic3/3.1 images/machine code instruction breakdown.png)

</div>

### Embedded systems: same architecture, one dedicated purpose

<div class="reader-section-body reader-section-body--apply">

An embedded system combines hardware and software for a <strong>specific</strong> function. It is not a general-purpose "do anything" computer.

| Embedded characteristic | Typical example |
| --- | --- |
| Dedicated task | Washing machine cycle control |
| Sensor + control loop | Security system reacting to movement/temperature |
| Compact low-power design | Car subsystem controller |
| Often microcontroller/SoC based | Vending machine control board |

Benefits include small size, low power, real-time feedback. Drawbacks include harder upgrade paths, specialist repair, and internet-connected security risks.

![Embedded systems in context.](/igcse/topic3/3.1 images/embedded systems.png)

</div>

### Interactive classifier: embedded or general-purpose?

<div class="reader-section-body reader-section-body--example">

<div class="igcse-widget" data-igcse-embedded-checker>
  <p class="igcse-widget__title">Embedded-system classifier</p>
  <p class="igcse-widget__hint">Pick a device and check whether it matches the "dedicated function" rule used in exams.</p>
  <div class="igcse-widget__controls">
    <label>
      Device scenario
      <select data-embedded-scenario>
        <option value="car-abs">Car ABS braking controller</option>
        <option value="set-top-box">Set-top box recording controller</option>
        <option value="gaming-pc">Gaming desktop PC</option>
        <option value="vending-machine">Vending machine controller</option>
        <option value="smartphone">Smartphone (general app use)</option>
      </select>
    </label>
  </div>
  <div class="igcse-widget__split">
    <div class="igcse-step-card" data-embedded-verdict></div>
    <div class="igcse-step-card" data-embedded-io></div>
  </div>
</div>

</div>

### 3.1 exam checklist

<div class="reader-section-body reader-section-body--apply">

- You can name CPU components and describe their roles without overlap.
- You can trace `PC`, `MAR`, `MDR`, `CIR`, `ACC` through fetch-decode-execute.
- You can explain address/data/control bus direction and purpose.
- You can compare performance factors beyond just clock speed.
- You can distinguish instruction set terms (`opcode`, `operand`) from high-level code.
- You can justify why a device is (or is not) an embedded system.

</div>

## 3.2 Input & Output Devices

### Overview

- Input devices capture data for processing, while output devices present processed information.
- Device selection depends on data type, environment, accessibility needs, and performance requirements.
- Sensors convert real-world measurements into signals suitable for digital systems.

### Applied Understanding

- Select suitable input/output devices for a given scenario and justify trade-offs.
- Compare output technologies such as laser vs inkjet and LCD vs OLED for practical usage.
- Relate sensor output to controlled actions in automated systems.

### Worked Example

**Worked device-choice filter**

This routine classifies a device request as input, output, or mixed usage.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE RequestType : STRING
INPUT RequestType
CASE OF RequestType
  "Capture" : OUTPUT "Select input device"
  "Display" : OUTPUT "Select output device"
  OTHERWISE OUTPUT "Check if both input and output are required"
ENDCASE
</code></pre>

![Sensor categories and capture types.](/igcse/topic3/3.2 images/sensors cheat sheet.png)

*Sensor categories and capture types.*

## 3.3 Data Storage

### Overview

- Primary storage supports active processing while secondary storage supports long-term retention.
- Magnetic, optical, and solid-state media differ in speed, durability, and cost per capacity.
- Virtual memory extends apparent RAM using storage, but introduces slower access than real RAM.

### Applied Understanding

- Compare RAM and ROM by volatility, role, and mutability.
- Select appropriate secondary storage based on access pattern and reliability needs.
- Explain cloud-storage benefits and risks in availability, dependence, and security.

### Worked Example

**Worked storage-tier decision**

This routine chooses a storage tier from access-speed and permanence requirements.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE NeedsPersistence : BOOLEAN
DECLARE NeedsFastAccess : BOOLEAN
INPUT NeedsPersistence
INPUT NeedsFastAccess
IF NeedsFastAccess AND NOT NeedsPersistence THEN
  OUTPUT "Use RAM"
ELSE
  IF NeedsPersistence THEN
    OUTPUT "Use secondary storage"
  ELSE
    OUTPUT "Review requirement"
  ENDIF
ENDIF
</code></pre>

![RAM and ROM comparison chart.](/igcse/topic3/3.3 images/ram vs rom.png)

*RAM and ROM comparison chart.*

## 3.4 Network Hardware

### Overview

- Network interface hardware enables data exchange between devices and networks.
- MAC and IP addressing play different roles: local identity vs routable logical addressing.
- Routers forward packets between networks using addressing and route information.

### Applied Understanding

- Explain why MAC addresses are fixed at manufacture and IP addresses may change.
- Describe router responsibilities in forwarding and destination selection.
- Compare IPv4 and IPv6 addressing capacity and notation.

### Worked Example

**Worked address validation flow**

This routine checks whether a destination should be routed locally or via a router.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE IsLocalNetwork : BOOLEAN
INPUT IsLocalNetwork
IF IsLocalNetwork THEN
  OUTPUT "Send directly using MAC resolution"
ELSE
  OUTPUT "Forward packet to router"
ENDIF
</code></pre>

![Router role in forwarding packets.](/igcse/topic3/3.4 images/Role of a router.png)

*Router role in forwarding packets.*

## 3.5 Review & Exam Prep

### Overview

- Topic 3 combines architecture, devices, storage, and networking in integrated system questions.
- Exam responses should move from definition to mechanism, then to context-specific justification.
- Precise terminology improves marks in explain and compare command terms.

### Applied Understanding

- Revise component interactions instead of isolated definitions.
- Use short trace-style sequences to explain hardware workflows.
- Check answers for correct distinctions, for example RAM vs ROM and MAC vs IP.

### Worked Example

**Worked integrated system check**

This routine confirms that each section of an exam answer includes architecture, storage, and networking evidence.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE HasArchitecturePoint : BOOLEAN
DECLARE HasStoragePoint : BOOLEAN
DECLARE HasNetworkPoint : BOOLEAN
INPUT HasArchitecturePoint
INPUT HasStoragePoint
INPUT HasNetworkPoint
IF HasArchitecturePoint AND HasStoragePoint AND HasNetworkPoint THEN
  OUTPUT "Answer has complete Topic 3 coverage"
ELSE
  OUTPUT "Add missing coverage area"
ENDIF
</code></pre>
