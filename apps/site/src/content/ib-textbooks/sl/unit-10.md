---
level: sl
unitNumber: 10
unitName: Binary Logic & Circuits
summary: Revise Binary Logic & Circuits with exam-focused coverage of A1.2.1, A1.2.3, A1.2.5, A1.3.1, A1.3.3, including exact command-term expectations and applied examples.
subtopics:
  - code: A1.2.1
    title: Data representation methods
  - code: A1.2.3
    title: Logic gates
  - code: A1.2.5
    title: Logic diagrams
  - code: A1.3.1
    title: Operating Systems (OS) role
  - code: A1.3.3
    title: Scheduling
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Binary | Base-2 number system using digits 0 and 1. |
| Decimal | Base-10 number system using digits 0-9. |
| Hexadecimal | Base-16 number system using digits 0-9 and A-F. |
| Bit / Nibble / Byte | 1 bit = one binary digit; 1 nibble = 4 bits; 1 byte = 8 bits. |
| Logic gate | Circuit component that implements a Boolean operation on binary inputs. |
| Boolean expression | Logical statement built from variables and operators such as AND/OR/NOT. |
| Truth table | Table showing output for every possible input combination. |
| Logic diagram | Visual circuit representation using gate symbols and signal flow. |
| Operating system (OS) | System software that manages hardware resources and provides core services. |
| Scheduling | OS method for deciding process execution order and CPU time allocation. |
| FCFS | First Come First Served scheduling: non-preemptive, ordered by arrival. |
| Round Robin | Preemptive scheduling using fixed time slices (quantum). |
| Priority scheduling | Chooses process based on priority level (with starvation risk if unmanaged). |


## A1.2.1 Data Representation Methods

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to **describe** how binary, decimal, and hexadecimal represent data. Strong description includes conversion fluency and why hexadecimal is used in computing practice.

| System | Base | Digits used | Typical use |
| --- | --- | --- | --- |
| **Binary** | 2 | `0, 1` | Native machine-level representation |
| **Decimal** | 10 | `0-9` | Human arithmetic and everyday values |
| **Hexadecimal** | 16 | `0-9, A-F` | Compact human-readable form of binary |

Each hexadecimal digit maps exactly to 4 binary bits, which makes conversion direct.

</div>

### Worked example: conversions

<div class="reader-section-body reader-section-body--example">

| Decimal | Binary | Hexadecimal | Notes |
| --- | --- | --- | --- |
| 10 | `1010` | `A` | `1010` is one nibble, so hex is single digit `A` |
| 26 | `11010` | `1A` | Pad to `0001 1010`, then convert nibbles |
| 255 | `11111111` | `FF` | Max value in one byte |
| 1024 | `10000000000` | `400` | Group binary in sets of 4 from right |

Conversion method (binary to hex):
1. Group bits into 4 from right to left.
2. Convert each group to decimal value 0-15.
3. Map 10-15 to A-F.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

- Memory addresses and color values are often shown in hex because they are shorter than binary.
- `1111000010101100` is hard to read directly; `F0AC` is easier to inspect and debug.
- Hex is compact, but it still represents the same binary state.

</div>


## A1.2.3 Logic Gates

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to **describe** the purpose and use of logic gates. You should connect gate behavior to decision making inside digital circuits.

| Gate | Rule | Output is 1 when... |
| --- | --- | --- |
| AND | `A AND B` | both inputs are 1 |
| OR | `A OR B` | at least one input is 1 |
| NOT | `NOT A` | input is inverted |
| NAND | `NOT (A AND B)` | at least one input is 0 |
| NOR | `NOT (A OR B)` | both inputs are 0 |
| XOR | `A XOR B` | inputs are different |
| XNOR | `NOT (A XOR B)` | inputs are the same |

</div>

### Worked example: security rule

<div class="reader-section-body reader-section-body--example">

Access is granted only if:
- keycard is valid (`K = 1`) **and**
- PIN is correct (`P = 1`)

Boolean rule: `Access = K AND P`

| K | P | Access |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

This is exactly how hardware-level conditions are encoded.

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

- XOR is not the same as OR. OR allows `1,1`; XOR does not.
- NAND and NOR are not "extra" gates; they are widely used and can build complete circuits.
- Truth-table accuracy matters: one wrong row means the circuit logic is wrong.

</div>


## A1.2.5 Logic Diagrams

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Construct

The IB expects you to **construct** logic diagrams from Boolean expressions. "Construct" means you must produce a valid circuit layout, not only explain what the expression means.

A practical construction sequence:
1. Write/confirm the Boolean expression.
2. Identify required gate operations.
3. Build from input signals to output in clear stage order.
4. Check with a truth-table sample.

</div>

### Worked example: from statement to circuit

<div class="reader-section-body reader-section-body--example">

Condition:
- Alarm sounds when a door is open **and** motion is detected, **or** when emergency mode is on.

Expression:

```text
Alarm = (DoorOpen AND Motion) OR Emergency
```

Logic-diagram build plan:

| Stage | Inputs | Gate | Output label |
| --- | --- | --- | --- |
| 1 | `DoorOpen`, `Motion` | AND | `X` |
| 2 | `X`, `Emergency` | OR | `Alarm` |

You can verify by checking a few combinations. If `Emergency = 1`, output should be 1 regardless of the other inputs.

</div>

### Applied in context: simplification before drawing

<div class="reader-section-body reader-section-body--apply">

When two expressions are logically equivalent, use the simpler one before drawing.

Example:

```text
(A AND B) OR (A AND NOT B) = A
```

A simplified expression gives a simpler diagram with fewer gates, lower hardware cost, and lower delay.

</div>


## A1.3.1 Operating Systems (OS) Role

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to **describe** the role of the OS. A complete answer links the OS to resource management and user/application interaction.

| OS role | What it manages | Why it matters |
| --- | --- | --- |
| **CPU management** | Process execution and context switching | Keeps multiple tasks progressing |
| **Memory management** | Allocation, protection, virtual memory | Prevents conflicts and crashes |
| **Device management** | Drivers and I/O coordination | Standardizes hardware access |
| **File management** | Organization, storage, permissions | Maintains persistent, structured data |
| **User interface** | Command line and/or GUI | Lets users control applications and files |

</div>

### In real systems

<div class="reader-section-body reader-section-body--apply">

Opening a browser while downloading a file and listening to audio works because the OS:
- schedules CPU time between processes,
- manages RAM for each process,
- handles network and audio devices through drivers,
- writes downloaded data to file storage safely.

Without the OS, each app would need to control hardware directly, which is impractical and unsafe.

</div>


## A1.3.3 Scheduling

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Compare

The IB expects you to **compare** scheduling approaches. Comparison requires similarities and differences, then trade-offs in context.

| Policy | How it works | Strength | Limitation |
| --- | --- | --- | --- |
| **FCFS** | Runs in arrival order until completion | Simple and predictable | Long jobs can delay everything behind them |
| **Round Robin** | Each process gets a fixed time quantum in rotation | Fair share of CPU, good responsiveness | Overhead from frequent context switches |
| **Priority** | Highest-priority process runs first | Important tasks can run sooner | Low-priority tasks can starve |

</div>

### Worked trace: scheduling timeline

<div class="reader-section-body reader-section-body--example">

Processes arrive at time 0:
- `P1` needs 5 ms
- `P2` needs 3 ms
- `P3` needs 2 ms

Round Robin with quantum = 2 ms:

```text
0-2: P1 | 2-4: P2 | 4-6: P3 | 6-8: P1 | 8-9: P2 | 9-10: P1
```

FCFS with same jobs:

```text
0-5: P1 | 5-8: P2 | 8-10: P3
```

Round Robin improves responsiveness for later jobs, while FCFS keeps switching overhead low.

</div>

### Applied in context: scheduling comparison

<div class="reader-section-body reader-section-body--apply">

- Batch data processing often accepts FCFS simplicity.
- Interactive systems (desktops, shared school labs) usually prefer Round Robin.
- Priority scheduling is useful for urgent tasks but needs anti-starvation strategy.

A high-quality comparison always names both gain and cost for each policy.

</div>
