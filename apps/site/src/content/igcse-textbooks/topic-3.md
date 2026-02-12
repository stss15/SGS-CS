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

## Unit Summary

Hardware is the physical machinery that makes computing possible. While software provides the instructions, hardware does the heavy lifting. In this massive unit, we explore everything from the microscopic transistors inside a CPU to the sensors, printers, and storage devices that allow computers to interact with the physical world.

## Objectives and Outcomes

### Objectives

- Computer Architecture: The Von Neumann model, the Fetch-Decode-Execute cycle, and what makes a CPU fast (cores, cache, clock).
- Input & Output: The vast array of devices used to get data in (sensors, scanners) and out (screens, 3D printers).
- Data Storage: Where data lives when we aren't using it (HDD, SSD, Optical) and where it lives when we are (RAM, ROM).
- Network Hardware: The specialized kit (NICs, Routers) that connects our isolated machines to the world.

### Outcomes

- Describe Mechanics: Explain exactly how an HDD reads data (platters, electromagnets) versus how an Optical disc works (lasers, pits/lands).
- Trace the Cycle: Describe the Fetch-Decode-Execute cycle step-by-step, mentioning the specific registers (MAR, MDR, PC, etc.) involved at each stage.
- Select Devices: Given a scenario (e.g., "a blind person using a computer"), select the appropriate input/output devices and justify your choice.
- Differentiate Addresses: Explain the difference between a MAC address (physical, permanent) and an IP address (logical, changeable).

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| CPU | Processor responsible for executing instructions and controlling system operations. |
| ALU | Arithmetic and logic unit inside the CPU. |
| Control Unit | CPU component that coordinates instruction execution. |
| Fetch-Decode-Execute | Cycle used by the CPU to process each instruction. |
| Cache | Fast memory used to reduce access latency to frequently needed data. |
| Embedded System | Computer system designed for a dedicated function. |
| Sensor | Input device that measures physical conditions and converts them to data. |
| Actuator | Output device that causes a physical action. |
| RAM | Volatile primary storage for data and instructions currently in use. |
| ROM | Non-volatile memory used for startup firmware. |
| MAC Address | Unique hardware address assigned to a network interface. |
| IP Address | Logical network address used for routing packets. |

## 3.1 Computer Architecture

### Overview

- Von Neumann architecture stores data and instructions in memory for CPU processing.
- The CPU combines control flow, arithmetic logic, and register use during each instruction cycle.
- Performance is affected by clock speed, core count, cache, and instruction-set efficiency.

### Applied Understanding

- Trace the role of MAR, MDR, PC, and CIR during fetch-decode-execute.
- Explain why cache reduces repeated access delays compared with RAM-only workflows.
- Differentiate general-purpose systems and embedded systems by function and constraints.

### Worked Example

**Worked FDE cycle logger**

This routine logs simplified fetch-decode-execute stages for a fixed number of instructions.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE InstructionCounter : INTEGER
FOR InstructionCounter ← 1 TO 3
  OUTPUT "Fetch instruction " , InstructionCounter
  OUTPUT "Decode instruction " , InstructionCounter
  OUTPUT "Execute instruction " , InstructionCounter
NEXT InstructionCounter
</code></pre>

![Von Neumann architecture overview.](/igcse/topic3/3.1 images/von neumann architecture.png)

*Von Neumann architecture overview.*

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

