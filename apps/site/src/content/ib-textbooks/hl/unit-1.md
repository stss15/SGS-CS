---
level: hl
unitNumber: 1
unitName: Advanced Architecture and Translation
summary: A textbook chapter exploring CPU and GPU architectural differences, instruction pipelining in multi-core processors, and the trade-offs between compilers, interpreters, JIT compilation, and virtual machine execution.
subtopics:
  - code: A1.1.3
    title: Differences between the CPU and GPU
  - code: A1.1.6
    title: Pipelining in multi-core architectures
  - code: A1.4.1
    title: Translation (Compilers, Interpreters, JIT)
  - code: A1.4.2
    title: Virtual Machines and Bytecode Execution
sourcePolicy: ib_content_md_first
---

## A1.1.3 Differences between the CPU and the GPU

The CPU and GPU are both essential processors in a modern computer, but they are designed around fundamentally different philosophies. Understanding *why* they are different, and not just *how*, is the key to explaining when each is the better choice for a given workload.

### Design philosophies

CPUs are **general-purpose processors**. They are built to handle a wide variety of tasks: running the operating system, processing user input, managing file systems, and executing the branching, decision-heavy logic that most software requires. CPUs are optimised for situations where quick responses to unpredictable workloads matter, such as switching between browser tabs, handling transaction logic, or managing background services.

GPUs are **specialised processors**. They are designed for a specific class of work: performing the same operation on many pieces of data at the same time. When a video game needs to apply a lighting calculation to eight million pixels, or when a machine learning model needs to multiply two enormous matrices, the work is essentially the same arithmetic repeated millions of times. GPUs are purpose-built for exactly this kind of task.

### Core architecture

The CPU has a small number of powerful, complex cores. A typical consumer CPU might have 4 to 16 cores, though high-end server processors can have 64 or more. Each core is highly capable: it can handle many different types of instructions, perform branch prediction (guessing which instruction will come next to avoid delays), and execute instructions out of order to fill idle time. This makes each core extremely versatile, but it means the chip can only process a relatively small number of independent tasks simultaneously.

The GPU, by contrast, has many hundreds or thousands of much simpler cores. Each individual GPU core is far less powerful than a CPU core, but the sheer number of them, all working in parallel, means the GPU can process enormous volumes of similar calculations at once. A modern GPU might have over 10,000 cores, each applying the same shader calculation to a different pixel or the same matrix operation to a different data block.

### Memory access and power

The two processors also access memory differently. The CPU uses a small, high-speed cache hierarchy (L1, L2, L3) to get frequently needed data quickly. This suits workloads that access small amounts of data many times, such as running programs or handling user input.

The GPU uses its own dedicated memory called **VRAM (Video RAM)**, which has a very high bandwidth, the ability to move large amounts of data at once. This suits workloads that need to process large data blocks (images, video frames, tensors) in parallel. However, the GPU typically consumes more power than the CPU because it must drive thousands of cores and a high-bandwidth memory bus simultaneously.

### Comparison summary

| Aspect | CPU | GPU |
| --- | --- | --- |
| Processing style | General-purpose, versatile | Specialised, parallel |
| Core count | Few (4-64) powerful cores | Many (hundreds to thousands) simpler cores |
| Best workload type | Branch-heavy, sequential logic | Repeated operations on large datasets |
| Strength | Low-latency, complex decision-making | High-throughput, data-parallel processing |
| Memory strategy | Small, fast cache hierarchy | Large, high-bandwidth VRAM |
| Typical use | OS, applications, transaction logic | Rendering, video processing, AI training |

### Practical example: a video game frame

In a video game, the CPU and GPU work together on every frame:

1. **Player input:** The player presses a key. The CPU processes this input, updates the character's position based on game physics, and determines the new game state. This involves many conditional checks (Is the player on the ground? Is there a wall ahead? Is an enemy nearby?) that require the CPU's branching capabilities.
2. **Data preparation:** The CPU prepares the updated positions, lighting data, and game state and sends this to the GPU.
3. **Rendering:** The GPU takes the 3D scene data, vertex coordinates, and texture information, and applies the same lighting, shading, and texture-mapping calculations to millions of pixels simultaneously. This is massively parallel work that plays to the GPU's strengths.
4. **Display:** The finished frame is output to the screen.

Sending the branching game logic to the GPU or the pixel-level rendering to the CPU would be inefficient in both cases. The performance of the system depends on directing each type of work to the processor whose architecture matches it.


## A1.1.6 The process of pipelining in multi-core architectures

Pipelining is a technique that improves CPU performance by overlapping the execution of multiple instructions. Rather than waiting for one instruction to complete entirely before starting the next, a pipelined processor allows different stages of different instructions to execute simultaneously.

### The carwash analogy

Imagine a carwash with four stages: initial wash, detailed cleaning, rinse, and drying. Each stage takes five minutes.

**Without pipelining,** each car must complete all four stages before the next car can begin. Two cars take 2 x 20 = 40 minutes, an average of 20 minutes per car. While car A is being dried, the initial wash station sits idle.

**With pipelining,** as soon as car A moves from the initial wash to detailed cleaning, car B enters the initial wash. Both cars are being processed at the same time, just at different stages. Two cars now take only 25 minutes total (car A finishes at minute 20, car B finishes at minute 25), an average of 12.5 minutes per car.

The carwash has not gotten faster at any individual stage. What has changed is that idle time has been eliminated: every station is working on a car at every moment.

### How pipelining works in a CPU

The fetch-decode-execute cycle can be divided into distinct stages. A typical five-stage pipeline looks like this:

1. **Fetch (F):** Retrieve the instruction from memory.
2. **Decode (D):** Interpret the instruction to determine the required operation.
3. **Execute (E):** Perform the operation (ALU calculation, comparison, etc.).
4. **Memory access (M):** Read from or write to memory if needed.
5. **Write-back (W):** Store the result in a register.

In a pipelined CPU, these stages overlap across successive instructions:

| Cycle | Instruction A | Instruction B | Instruction C |
| --- | --- | --- | --- |
| 1 | Fetch | | |
| 2 | Decode | Fetch | |
| 3 | Execute | Decode | Fetch |
| 4 | Memory | Execute | Decode |
| 5 | Write-back | Memory | Execute |
| 6 | | Write-back | Memory |
| 7 | | | Write-back |

Without pipelining, three instructions would take 3 x 5 = 15 cycles. With pipelining, they complete in just 7 cycles. A well-optimised pipeline can approach a throughput of one completed instruction per cycle, even though each individual instruction still takes five cycles to pass through all stages.

This is the crucial distinction: **pipelining improves throughput (instructions completed per unit of time), not latency (the time for a single instruction to complete).** Each instruction still passes through all five stages, but because multiple instructions are in flight simultaneously, the overall rate of completion is much higher.

### Pipeline hazards

Pipelining does not always run perfectly. Certain situations, called **hazards**, can force the pipeline to stall:

- **Data hazards** occur when one instruction depends on the result of a previous instruction that has not yet completed. For example, if instruction B needs the value that instruction A is still computing, B must wait.
- **Control hazards** occur with branch instructions (if/else, loops). The pipeline may have already started fetching the next instruction before the branch decision is known. If the prediction is wrong, those partially processed instructions must be discarded.

Modern CPUs use techniques like **branch prediction** (guessing which path a branch will take) and **out-of-order execution** (processing ready instructions while others wait) to minimise these stalls.

### Independent and parallel execution in multi-core processors

In a multi-core processor, each core has its own pipeline and can execute instructions independently. This provides two levels of performance improvement:

**Independent execution** means each core can run a separate task. While core 1 is running a web browser, core 2 can handle a music player, and core 3 can process a file download. Each core fetches, decodes, and executes its own stream of instructions without waiting for any other core.

**Parallel execution** takes this further: a single large task can be split across multiple cores. In a multi-threaded application, different threads of the same program can run on different cores simultaneously. For example, a video editor might use one core to decode audio, another to process colour correction, and a third to apply effects, all on the same project at the same time.

Returning to the carwash analogy: independent execution is like having multiple carwash bays, each processing a different car. Parallel execution is like having multiple teams working on the same large vehicle, one team washing the exterior while another cleans the interior.

The combination of pipelining (overlapping stages *within* each core) and multi-core parallelism (running multiple pipelines simultaneously *across* cores) is what gives modern processors their enormous computational throughput.


## A1.4.1 Translation: compilers, interpreters, and JIT

Computers execute **machine code**: sequences of binary instructions specific to a particular processor architecture. Humans write **source code** in high-level languages like Python, Java, or C++. Translation is the process of converting one into the other, and the choice of translation method has significant consequences for performance, portability, and the development workflow.

### Compilers

A compiler translates an entire source code file into machine code *before* the program runs. The result is a standalone executable file (a binary) that can be run directly by the processor without any further translation.

**Strengths:**
- **Fast execution.** Because all translation happens before runtime, the compiled program runs at full native speed with no translation overhead.
- **Optimisation.** The compiler can analyse the entire program and apply sophisticated optimisations (reorganising instructions, eliminating redundant calculations, inlining functions) that would be impossible to do line by line.
- **Distribution.** The compiled binary can be distributed without revealing the original source code, protecting intellectual property.

**Limitations:**
- **Platform-specific output.** A program compiled for Windows will not run on macOS or Linux without recompilation. Each target platform needs its own compiled version.
- **Compile step required.** Every change to the source code requires recompilation before the new version can be tested. For large projects, this compilation step can take minutes or even hours.
- **Harder debugging.** Errors appear as machine-level issues that can be difficult to trace back to the original source code line.

**Example languages:** C, C++, Rust, Go.

### Interpreters

An interpreter translates and executes source code one statement at a time during runtime. There is no separate compilation step: the interpreter reads a line, translates it, executes it, then moves to the next line.

**Strengths:**
- **Rapid development.** Changes to the code can be tested immediately without waiting for compilation. This makes interpreters ideal for prototyping, scripting, and educational settings.
- **Easy debugging.** When an error occurs, the interpreter can report exactly which source code line caused the problem, in the original language.
- **Portability.** The same source code can run on any platform that has the interpreter installed, without modification.

**Limitations:**
- **Slower execution.** Every time the program runs, every line must be translated again. A loop that executes a million times translates the same line a million times. This overhead makes interpreted programs significantly slower than compiled ones for computation-heavy tasks.
- **Source code exposure.** The source code must be distributed to run the program, since the interpreter needs it at runtime.

**Example languages:** Python (standard CPython), Ruby, classic JavaScript (in early engines).

### Just-In-Time (JIT) compilation

JIT compilation is a hybrid approach. Source code is first compiled into an intermediate form called **bytecode** (not full machine code). At runtime, a JIT compiler monitors which parts of the bytecode are executed most frequently (called "hot paths" or "hot methods") and compiles those sections into native machine code on the fly. Code that runs only once or rarely stays as interpreted bytecode.

**Strengths:**
- **Portability with performance.** The bytecode is platform-independent, but the JIT-compiled native code runs at near-native speed once warmed up.
- **Adaptive optimisation.** The JIT compiler can make optimisation decisions based on actual runtime behaviour, information that an ahead-of-time compiler cannot access.

**Limitations:**
- **Warm-up cost.** The program starts slowly because the JIT compiler has not yet identified and compiled the hot paths. Performance improves over time as more code is optimised.
- **Runtime complexity.** The JIT compiler itself consumes memory and CPU time while it runs alongside the application.

**Example languages:** Java (via HotSpot JVM), C# (via .NET CLR), modern JavaScript (V8, SpiderMonkey).

### Evaluating translation approaches

The right choice depends on the deployment context. There is no universally superior method.

| Criterion | Compiler | Interpreter | JIT |
| --- | --- | --- | --- |
| Execution speed | Fastest | Slowest | Fast after warm-up |
| Startup speed | Fast (already compiled) | Fast (no compile step) | Slower (warm-up period) |
| Portability | Low (per-platform binaries) | High | High |
| Development speed | Slower (compile-test cycle) | Fastest | Fast |
| Source code protection | High (binary only) | Low (source distributed) | Medium (bytecode distributed) |

A game engine shipping on one known platform benefits from ahead-of-time compilation: maximum runtime performance and no source code exposure. A data scientist writing analysis scripts benefits from interpretation: rapid iteration and easy portability across lab machines. A long-running web service benefits from JIT: portable deployment with performance that improves over time as hot paths are identified and compiled.


## A1.4.2 Virtual machines and bytecode execution

A virtual machine (VM) in this context is not a full operating system running inside another (that is a system virtual machine). A **process virtual machine** is a software runtime that provides a consistent execution environment for programs, regardless of the underlying hardware or operating system. The Java Virtual Machine (JVM) and the .NET Common Language Runtime (CLR) are the most prominent examples.

### How it works

The translation and execution flow follows three stages:

1. **Source to bytecode:** The source code is compiled (ahead of time) into **bytecode**, an intermediate representation that is more compact and structured than source code but not tied to any specific processor architecture. Bytecode is sometimes called "p-code" or "intermediate language."
2. **Bytecode interpretation:** The virtual machine reads and executes the bytecode instructions. At this stage, the VM acts as an interpreter, processing bytecode one instruction at a time.
3. **JIT compilation of hot paths:** As the program runs, the VM's JIT compiler identifies bytecode methods that are executed frequently and compiles them directly into native machine code for the current processor. These compiled methods then execute at near-native speed on subsequent calls.

This architecture provides a powerful combination: the bytecode is platform-independent (write once, run anywhere), while the JIT-compiled native code delivers the performance benefits of compilation where it matters most.

### Why this matters

The virtual machine approach solves several practical problems that pure compilation and pure interpretation struggle with:

**Cross-platform deployment.** A program compiled to bytecode can be distributed as a single package and run on any device that has the appropriate VM installed, whether that device runs Windows, macOS, Linux, or something else. Without VMs, the developer would need to compile and distribute separate binaries for every target platform.

**Frequent updates without rebuilding.** Because the bytecode package is platform-independent, updates can be pushed once and run everywhere. There is no need to maintain separate build pipelines for each operating system.

**Runtime optimisation.** A JIT compiler can observe actual execution behaviour and make optimisation decisions that an ahead-of-time compiler cannot. For example, it might notice that a method is always called with integer arguments and generate a specialised fast path for that case, even if the source code allowed any type.

### The trade-off

The virtual machine adds an abstraction layer between the program and the hardware. This layer consumes memory and CPU time, creating overhead that pure native code does not have. The impact is most noticeable during startup and during the early minutes of execution, before the JIT compiler has had time to optimise the hot paths. For long-running applications like web servers, the warm-up cost is negligible compared to the hours or days the server will run. For short-lived scripts that start and stop quickly, the overhead may outweigh the benefits.

### Practical example: a classroom simulator

A school distributes a physics simulator as a bytecode package to 120 devices running two different operating systems.

- **Day 1:** The VM interprets the bytecode. The simulation runs correctly on all devices, but initial performance is moderate because the JIT compiler is still gathering profiling data.
- **Repeated use:** Over the next few sessions, the JIT compiler identifies the most frequently called methods (physics update, collision detection, render loop) and compiles them to native machine code.
- **By week 2:** The simulation's frame update time has dropped noticeably because the critical code paths now run as optimised native instructions rather than interpreted bytecode.

The school deployed one package, not two platform-specific builds. The VM handled platform differences automatically, and performance improved without any code changes, simply because the JIT compiler adapted to the actual workload.
