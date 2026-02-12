---
level: sl
unitNumber: 9
unitName: Computer Systems
summary: Revise Computer Systems with exam-focused coverage of A1.1.1, A1.1.4, A1.1.5, A1.1.7, A1.1.9, including exact command-term expectations and applied examples.
subtopics:
  - code: A1.1.1
    title: CPU components (ALU, CU, registers, buses)
  - code: A1.1.4
    title: Primary memory (RAM, ROM, Cache, Registers)
  - code: A1.1.5
    title: Machine instruction cycle
  - code: A1.1.7
    title: Secondary storage (Internal/External)
  - code: A1.1.9
    title: Cloud computing services
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| ALU (Arithmetic Logic Unit) | CPU component that performs arithmetic and logical operations. |
| Control Unit (CU) | CPU component that decodes instructions and coordinates data movement and control signals. |
| Register | Very fast CPU storage used for immediate instruction/data handling during execution. |
| Instruction Register (IR) | Holds the current instruction being decoded/executed. |
| Program Counter (PC) | Holds the address of the next instruction to fetch. |
| MAR (Memory Address Register) | Holds the memory address currently being accessed. |
| MDR (Memory Data Register) | Holds data read from memory or to be written to memory. |
| Accumulator (ACC) | Holds intermediate arithmetic/logic results from ALU operations. |
| Address bus | Carries memory addresses from CPU to memory/devices (typically one-way). |
| Data bus | Carries data between CPU, memory, and devices (typically two-way). |
| Control bus | Carries control signals (read/write/clock/interrupt). |
| RAM | Volatile primary memory for active programs and data. |
| ROM | Non-volatile memory storing fixed firmware/boot instructions. |
| Cache (L1/L2/L3) | Small, fast memory storing frequently accessed data close to the CPU. |
| Secondary storage | Non-volatile storage for persistent data (for example SSD, HDD, optical, flash, NAS). |
| SaaS / PaaS / IaaS | Cloud service models: software use, platform deployment, and infrastructure provisioning. |


## A1.1.1 CPU Components (ALU, CU, Registers, Buses)

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to **describe** how CPU components function and interact. In strong answers, you do not list parts separately; you explain how they cooperate while instructions are executed.

| Component | Main role | Interaction you must be able to describe |
| --- | --- | --- |
| **CU** | Directs operations | Sends control signals for fetch, decode, execute stages |
| **ALU** | Performs arithmetic/logic | Uses operand data from registers/MDR and returns results to ACC/registers |
| **Registers** | Very fast temporary storage | Hold addresses, instructions, data, and intermediate results |
| **Buses** | Move addresses/data/signals | Connect CPU to memory and peripherals during each instruction cycle |

</div>

### Worked example: one instruction in motion

<div class="reader-section-body reader-section-body--example">

Imagine memory address `120` stores instruction `ADD 205`.

| Stage | What happens | Key hardware involved |
| --- | --- | --- |
| 1. Fetch address | PC value (`120`) is copied to MAR | PC, MAR, address bus |
| 2. Fetch instruction | Memory returns `ADD 205` into MDR, then IR | MDR, IR, data bus, control bus |
| 3. Update pointer | PC increments to `121` | PC |
| 4. Decode | CU interprets opcode `ADD` and operand address `205` | CU, IR |
| 5. Execute | Data from address `205` is fetched and added in ALU | MAR, MDR, ALU, ACC |

This is what "interaction of CPU components" means in practice: each part has a specific role, but performance depends on how cleanly they coordinate.

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

- The **CU does not do arithmetic**; the ALU does.
- Registers are not the same as RAM. Registers are far smaller and far faster.
- The PC usually points to the **next** instruction, not the current one.
- Buses are not interchangeable: address, data, and control buses carry different information.

</div>


## A1.1.4 Primary Memory (RAM, ROM, Cache, Registers)

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

The IB expects you to **explain** the purpose of different primary memory types. "Explain" means linking each memory type to a clear reason it exists in the system.

| Memory type | Volatile? | Purpose | Typical use |
| --- | --- | --- | --- |
| **Registers** | Yes | Immediate CPU working values | Current instruction/data |
| **Cache (L1/L2/L3)** | Yes | Reduce average access time to frequently needed data | CPU reuse of hot data |
| **RAM** | Yes | Main workspace for running programs | OS, app code, active files |
| **ROM** | No | Store startup firmware and low-level boot code | Device initialization |

The hierarchy exists because speed, capacity, and cost cannot all be maximized at once.

</div>

### In real systems

<div class="reader-section-body reader-section-body--apply">

When you open a game:
- Boot instructions came from ROM when the device started.
- Game code/assets needed now are in RAM.
- Frequently reused instructions/data are copied into cache.
- The exact instruction and operands being processed are placed in registers.

A complete explanation should connect memory type to this execution flow.

</div>

### Worked example: cache hit vs cache miss

<div class="reader-section-body reader-section-body--example">

| Event | Data location found first | Effect on speed |
| --- | --- | --- |
| **Cache hit** | L1/L2/L3 cache | Fast response, low latency |
| **Cache miss** | Not in cache, fetched from RAM | Slower response, extra wait |

A system with higher cache hit rate spends less time waiting for RAM access, so overall throughput improves.

</div>


## A1.1.5 Machine Instruction Cycle

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to **describe** the fetch-decode-execute cycle in correct order. Your description should make register and bus activity explicit.

1. **Fetch:** get next instruction from memory.
2. **Decode:** interpret opcode and required operands.
3. **Execute:** perform operation and update state.
4. Repeat using the updated PC.

</div>

### Worked trace: two simple instructions

<div class="reader-section-body reader-section-body--example">

Assume:
- Address `00` stores `LOAD 20`
- Address `01` stores `ADD 21`
- Address `20` holds value `7`
- Address `21` holds value `5`

| Cycle step | PC | IR | ACC | Action |
| --- | --- | --- | --- | --- |
| Start | 00 | - | 0 | Ready to fetch first instruction |
| Fetch | 01 | `LOAD 20` | 0 | PC increments after fetch |
| Decode/Execute | 01 | `LOAD 20` | 7 | ACC gets value from address 20 |
| Fetch | 02 | `ADD 21` | 7 | Next instruction fetched |
| Decode/Execute | 02 | `ADD 21` | 12 | ALU adds value from address 21 |

You should be able to narrate each transition without skipping register updates.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

Why this matters:
- The cycle explains how every program is physically executed.
- Performance features (for example cache and pipelining) only make sense when you understand this baseline cycle.
- Tracing FDE behavior helps you diagnose low-level logic and state errors.

</div>


## A1.1.7 Secondary Storage (Internal/External)

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to **describe** internal and external secondary storage types. Your answer should include what each type is used for and the main trade-offs.

| Type | Example | Strength | Limitation |
| --- | --- | --- | --- |
| **Internal HDD** | Laptop/desktop hard drive | High capacity at low cost | Slower seek/access, moving parts |
| **Internal SSD** | NVMe/SATA SSD | Faster access, durable (no moving parts) | Higher cost per GB |
| **External flash** | USB drive, SD card | Portable and simple transfer | Lower sustained performance than internal NVMe |
| **Optical media** | DVD/Blu-ray | Useful for distribution/archive cases | Lower capacity/speed for modern workflows |
| **NAS** | Network attached storage box | Shared storage and backup for many users | Depends on network and management setup |

</div>

### Applied in context: selecting storage by need

<div class="reader-section-body reader-section-body--apply">

| Requirement | Better fit | Why |
| --- | --- | --- |
| Boot speed and app launch | SSD | Lower latency and faster random access |
| Very large, low-cost archive | HDD or NAS | Capacity per cost is stronger |
| Portable coursework transfer | USB flash/portable SSD | Easy external mobility |
| Shared department file access | NAS | Centralized storage over the network |

A "describe" response is strongest when the type is tied to a practical context.

</div>


## A1.1.9 Cloud Computing Services

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to **describe** cloud service models: SaaS, PaaS, and IaaS.

| Model | What you receive | You mainly manage |
| --- | --- | --- |
| **SaaS** | Ready-to-use software over the internet | User accounts, data usage settings |
| **PaaS** | Managed platform for deploying your apps | Application code and configuration |
| **IaaS** | Virtualized compute, storage, and networking | OS setup, runtime stack, app deployment |

</div>

### Applied in context: one school, three service models

<div class="reader-section-body reader-section-body--example">

| School need | Most suitable model | Rationale |
| --- | --- | --- |
| Staff email + documents | SaaS | Fast adoption, provider handles infrastructure |
| Student app deployment for coursework | PaaS | Students deploy code without managing servers |
| Custom analytics server with OS-level control | IaaS | Full control over runtime and infrastructure configuration |

</div>

### Applied in context: model boundaries

<div class="reader-section-body reader-section-body--apply">

- Cloud is still physical infrastructure in data centers.
- The service model changes **who manages what**, not whether hardware exists.
- Choosing the wrong model usually causes either unnecessary complexity or insufficient control.

</div>
