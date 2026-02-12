---
level: hl
unitNumber: 1
unitName: Advanced Architecture
summary: Revise Advanced Architecture with exam-focused coverage of A1.1.3, A1.1.6, A1.4.1, A1.4.2, including exact command-term expectations and applied examples.
subtopics:
  - code: A1.1.3
    title: CPU vs GPU
  - code: A1.1.6
    title: Pipelining
  - code: A1.4.1
    title: Translation (Compilers/Interpreters)
  - code: A1.4.2
    title: Advanced translation (JIT, bytecode, virtual machines)
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| CPU | The processor that executes instructions and controls most system operations. |
| ALU | The arithmetic logic unit in the CPU that performs calculations and logical comparisons. |
| control unit | The CPU component that decodes instructions and coordinates data movement. |
| register | Very fast, very small CPU storage used during instruction execution. |
| cache | Fast memory that stores frequently used data to reduce access time. |
| fetch-decode-execute cycle | The repeated process of fetching an instruction, decoding it, then executing it. |
| pipelining | Overlapping instruction stages to increase throughput. |
| translator | Software that converts source code into another form for execution. |

## A1.1.3 CPU vs GPU

### Exam requirement

> **Command term:** Explain
>
> Explain differences between CPU and GPU.

### Core understanding

In this part of the unit, you need secure understanding of cpu vs gpu. Link it to hardware/system behavior, execution flow, performance, or translation. Component interaction and execution flow determine throughput, latency, and practical workload suitability.

### In real systems

- Connect each concept to system performance, reliability, or compatibility.
- Use precise technical language when describing cpu vs gpu.
- Distinguish role, function, and trade-off rather than memorizing labels.

### Worked snapshot

| Workload | Better fit | Why |
| --- | --- | --- |
| Word processing and system control | CPU | Low-latency branching and control logic |
| Real-time image rendering | GPU | Thousands of parallel operations on similar data |

## A1.1.6 Pipelining

### Exam requirement

> **Command term:** Describe
>
> Describe pipelining in multi-core architectures.

### Core understanding

In this part of the unit, you need secure understanding of pipelining. Link it to hardware/system behavior, execution flow, performance, or translation.

### In real systems

- Connect each concept to system performance, reliability, or compatibility.
- Use precise technical language when describing pipelining.
- Distinguish role, function, and trade-off rather than memorizing labels.

### Worked snapshot

In a real deployment, pipelining should be justified against at least one clear trade-off (for example speed vs accuracy, throughput vs latency, or security vs usability).

## A1.4.1 Translation (Compilers/Interpreters)

### What the command expects

> **Command term:** Evaluate
>
> Evaluate translation processes of interpreters and compilers.

### Key idea

Translation (Compilers/Interpreters) is treated as applied reasoning, not only a definition. Link it to hardware/system behavior, execution flow, performance, or translation.

### Applied in context

- Connect each concept to system performance, reliability, or compatibility.
- Use precise technical language when describing translation (compilers/interpreters).
- Distinguish role, function, and trade-off rather than memorizing labels.

### Quick worked example

| Translator type | Typical behavior | Trade-off |
| --- | --- | --- |
| Compiler | Translates full program before execution | Slower build, faster runtime |
| Interpreter | Translates and runs line by line | Faster iteration, slower runtime |

## A1.4.2 Advanced translation (JIT, bytecode, virtual machines)

### Required response

> **Command term:** Explain
>
> Explain how JIT, bytecode interpreters, and virtual machines support cross-platform software.

### What this means

For this syllabus point, focus on using advanced translation (jit, bytecode, virtual machines) accurately in context. Link it to hardware/system behavior, execution flow, performance, or translation. This includes bytecode execution models and runtime optimization pathways such as JIT, in line with mapped curriculum coverage.

### System context

- Connect each concept to system performance, reliability, or compatibility.
- Use precise technical language when describing advanced translation (jit, bytecode, virtual machines).
- Distinguish role, function, and trade-off rather than memorizing labels.

### Compact example

A cross-platform language can compile to **bytecode**, run on a **virtual machine**, then apply **JIT** to frequently used sections so runtime speed improves while portability is preserved.

