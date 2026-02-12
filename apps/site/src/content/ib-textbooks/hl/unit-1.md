---
level: hl
unitNumber: 1
unitName: Advanced Architecture
summary: Revise Advanced Architecture with source-bounded coverage of A1.1.3, A1.1.6, A1.4.1, and A1.4.2 through clear comparisons, throughput reasoning, and translation-model evaluation.
subtopics:
  - code: A1.1.3
    title: CPU vs GPU
  - code: A1.1.6
    title: Pipelining
  - code: A1.4.1
    title: Translation (Compilers, Interpreters, JIT)
  - code: A1.4.2
    title: Virtual Machines and Bytecode Execution
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| latency | Time taken to complete one operation from start to finish. |
| throughput | Amount of work completed per unit time. |
| parallel processing | Running many operations at the same time, usually across many cores. |
| pipelining | Overlapping instruction stages so different instructions are in different stages at once. |
| compiler | Translator that converts source code to machine code ahead of execution. |
| interpreter | Translator that reads and executes source statements during runtime. |
| bytecode | Intermediate code executed by a virtual machine rather than directly by hardware CPU instructions. |
| virtual machine (VM) | Software runtime that provides a consistent execution environment across different hardware/OS platforms. |
| JIT compilation | Runtime compilation of frequently used bytecode into native machine code. |
| SIMD | Single Instruction, Multiple Data; one instruction applied across many data elements in parallel. |

## A1.1.3 CPU vs GPU Architecture

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

A strong explanation compares architecture and workload fit, not just "CPU is general" and "GPU is fast."

| Aspect | CPU | GPU |
| --- | --- | --- |
| Core design | Few complex cores | Many simpler cores |
| Best workload type | Branch-heavy, sequential logic | Highly parallel numeric work |
| Strength | Low-latency control flow | High-throughput data processing |
| Typical examples | Operating systems, browser tabs, transaction logic | 3D rendering, matrix operations, image processing |

The core difference is coordination style: CPUs optimize decision-heavy execution, while GPUs optimize repeated operations over large datasets.

</div>

### In real systems

<div class="reader-section-body reader-section-body--apply">

A video-editing workstation usually uses both processors together:

- CPU handles timeline controls, file I/O, plugin coordination, and export orchestration.
- GPU applies pixel-level effects to millions of values in parallel.
- Final performance depends on matching task type to processor architecture.

Misclassification causes bottlenecks. Sending branch-heavy logic to a GPU or large vector math to a CPU typically wastes hardware capacity.

</div>

### Worked example: workload split for a 4K frame pipeline

<div class="reader-section-body reader-section-body--example">

A 4K frame has roughly 8.3 million pixels. Applying the same color transform to each pixel is data-parallel, while choosing export presets is control-heavy.

| Task | Better processor | Reason |
| --- | --- | --- |
| Choose codec and bitrate rules | CPU | Many branches and configuration checks |
| Apply the same filter to 8.3M pixels | GPU | Same arithmetic repeated massively |
| Merge render outputs into final file | CPU | File-system and process coordination |

This is the kind of explanation expected: architecture differences linked to concrete workload behavior.

</div>

## A1.1.6 Pipelining

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

Pipelining means instruction stages overlap. One instruction may be executing while another is decoding and a third is being fetched.

A simple pipeline view:

| Stage | Main action |
| --- | --- |
| Fetch | Read instruction from memory |
| Decode | Interpret opcode and operands |
| Execute | Perform ALU/control action |
| Write-back | Store result |

Description quality improves when you explicitly separate throughput and latency: pipelining increases completed instructions per time interval, but one instruction still passes through all stages.

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

| Misconception | Accurate statement |
| --- | --- |
| "Pipelining makes each instruction faster." | It mainly improves total instructions completed over time. |
| "More cores means no need for pipelining." | Core count and pipelining solve different performance limits. |
| "Any instruction mix pipelines perfectly." | Data and control dependencies can create stalls. |

Pipeline design is an overlap strategy, not a guarantee of perfect parallel execution.

</div>

### Worked trace: five instructions on a four-stage pipeline

<div class="reader-section-body reader-section-body--example">

Assume 4 stages (F, D, E, W) and 5 instructions with no hazards.

| Cycle | I1 | I2 | I3 | I4 | I5 |
| --- | --- | --- | --- | --- | --- |
| 1 | F |  |  |  |  |
| 2 | D | F |  |  |  |
| 3 | E | D | F |  |  |
| 4 | W | E | D | F |  |
| 5 |  | W | E | D | F |
| 6 |  |  | W | E | D |
| 7 |  |  |  | W | E |
| 8 |  |  |  |  | W |

Sequential execution would take 20 stage steps; pipelining finishes in 8 cycles under these assumptions.

</div>

## A1.4.1 Translation (Compilers, Interpreters, JIT)

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Evaluate

Evaluation requires a justified decision using criteria. For translators, the core criteria are runtime speed, portability, startup behavior, debugging flow, and distribution/security constraints.

| Translator model | Strengths | Limitations |
| --- | --- | --- |
| Compiler | Fast execution, distributable binary | Compile step required, platform-specific outputs |
| Interpreter | Fast iteration, easy step-by-step debugging | Slower repeated execution |
| JIT-enabled runtime | Improves speed on hot paths while retaining portability | Warm-up cost, runtime complexity |

A valid evaluation always ties criteria to a specific deployment context.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

For a closed-source game engine shipped to one known platform, ahead-of-time compilation usually wins: strong runtime performance and binary-only distribution.

For data analysis scripts changed daily across mixed operating systems, interpreted execution often wins: rapid iteration and portability of source.

For long-running cross-platform services, bytecode + VM + JIT is often a balanced choice: portable distribution with runtime optimization once execution hotspots are identified.

</div>

### Worked example: translator choice matrix

<div class="reader-section-body reader-section-body--example">

Scenario: a school analytics tool must run on macOS and Windows, starts every morning, and processes 2 million log rows.

| Criterion | Compiler | Interpreter | VM + JIT |
| --- | --- | --- | --- |
| Cross-platform deployment | Low (per-target binaries) | High | High |
| Startup speed | High | High | Medium (JIT warm-up) |
| Long-run throughput | High | Medium | High after warm-up |
| Ease of rapid updates | Medium | High | High |

Bounded judgement: VM + JIT is strongest if runtime workload is large enough to benefit from optimization; interpreter-first may still be preferable for small daily workloads.

</div>

## A1.4.2 Virtual Machines and Bytecode Execution

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

Virtual-machine execution inserts an abstraction layer between source code and hardware. Source is translated to bytecode, and the VM executes that bytecode consistently on different devices.

Typical flow:

1. Source code is translated to bytecode.
2. VM reads bytecode instructions.
3. Frequently used bytecode paths may be JIT-compiled to native machine code.

This explains why one codebase can run across platforms while still improving speed at runtime.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

| Deployment need | Why VM/bytecode helps |
| --- | --- |
| Same application on multiple OS targets | Runtime abstraction hides hardware/OS differences |
| Frequent updates without rebuilding per architecture | Bytecode package can remain platform-independent |
| Long-running services | JIT can optimize repeated execution paths |

The trade-off is extra runtime overhead versus pure native code, especially during startup or before JIT optimization stabilizes.

</div>

### Worked example: portable release with runtime optimization

<div class="reader-section-body reader-section-body--example">

A classroom simulator is distributed once as bytecode and run on 120 devices across two operating systems.

- Day 1 startup: VM interpretation dominates, so initial runs are moderate in speed.
- Repeated use: hot methods (physics update and path checks) are JIT-compiled.
- By week 2: average frame update time drops from 18 ms to 11 ms on identical inputs.

The mechanism is not magical speed gain; it is portability first, then runtime specialization for repeatedly executed code.

</div>
