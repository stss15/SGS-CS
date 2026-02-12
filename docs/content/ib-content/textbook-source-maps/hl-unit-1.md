# Source Map: HL Unit 1 - Advanced Architecture

## Scope
- Level: HL
- Unit: 1
- Unit name: Advanced Architecture
- Source policy: ib_content_md_first
- Out-of-scope rule: all non-mapped syllabus points are excluded.

## Mapped Subtopics
- A1.1.3: CPU vs GPU Architecture
- A1.1.6: Pipelining
- A1.4.1: Translators (Compilers/Interpreters)
- A1.4.2: Virtual Machines & JIT

## Source Files Used
- docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf
- docs/content/ib-content/IB_Content_MD/HL/Unit_A1_Structure_HL_Extension.md.pdf
- docs/content/ib-content/Unit Plans/HL/Unit Plan_ HL Unit 1 - Advanced Architecture (A1.1, A1.4).docx (unit plan context)

## Evidence Fragments
### A1.1.3 — CPU vs GPU Architecture
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
Syllabus Point                   Content Covered                 Student Expected
                                                                  Outcome


 A1.1.3                           CPU vs GPU                      Explain differences
                                                                  between CPU and GPU.

 A1.1.6                           Pipelining                      Describe pipelining in
                                                                  multi-core architectures.

 A1.3.5                           Multitasking & Resources        Explain OS role in
                                                                  managing multitasking and
                                                                  resource allocation.
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_A1_Structure_HL_Extension.md.pdf`
```text
Syllabus Point                  Command Term      Student Expectation (The
                                                   "Do")


 A1.1.3                          Explain           Explain differences
                                                   between CPU (few
                                                   powerful cores, serial
                                                   tasks) and GPU (thousands
                                                   of smaller cores, parallel
                                                   tasks).

 A1.1.6                          Describe          Describe Pipelining
                                                   (fetch/decode/execute
```
```text
process (Closed-Loop).
●​ Compiler: Translates entire source code to machine code before execution.
●​ Interpreter: Translates and executes source code line-by-line.

3. Core Content & Exam Actions
A1.1.3 & A1.1.6: Advanced Architecture
Theory:
●​ CPU vs GPU:
   ○​ CPU: Low latency, complex logic, branch prediction. Good for OS, serial code.
   ○​ GPU: High throughput, SIMD (Single Instruction Multiple Data). Good for graphics,
      ML, matrix math.
●​ Pipelining:
   ○​ Concept: Like a factory assembly line.
   ○​ Stages: Fetch -> Decode -> Execute -> Write Back.
```

### A1.1.6 — Pipelining
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
A1.1.3                           CPU vs GPU                      Explain differences
                                                                  between CPU and GPU.

 A1.1.6                           Pipelining                      Describe pipelining in
                                                                  multi-core architectures.

 A1.3.5                           Multitasking & Resources        Explain OS role in
                                                                  managing multitasking and
                                                                  resource allocation.

 A1.3.6                           Control System                  Describe the use of
                                  components                      control system
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_A1_Structure_HL_Extension.md.pdf`
```text
powerful cores, serial
                                                   tasks) and GPU (thousands
                                                   of smaller cores, parallel
                                                   tasks).

 A1.1.6                          Describe          Describe Pipelining
                                                   (fetch/decode/execute
                                                   overlap) in multi-core
                                                   architectures.

 A1.3.5                          Explain           Explain OS role in
                                                   multitasking: Resource
                                                   contention, Deadlock, and
                                                   Starvation.
```
```text
process (Closed-Loop).
●​ Compiler: Translates entire source code to machine code before execution.
●​ Interpreter: Translates and executes source code line-by-line.

3. Core Content & Exam Actions
A1.1.3 & A1.1.6: Advanced Architecture
Theory:
●​ CPU vs GPU:
   ○​ CPU: Low latency, complex logic, branch prediction. Good for OS, serial code.
   ○​ GPU: High throughput, SIMD (Single Instruction Multiple Data). Good for graphics,
      ML, matrix math.
●​ Pipelining:
   ○​ Concept: Like a factory assembly line.
   ○​ Stages: Fetch -> Decode -> Execute -> Write Back.
```

### A1.4.1 — Translators (Compilers/Interpreters)
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
A1.3.7                           Control Systems                 Explain use of control
                                  applications                    systems in real-world
                                                                  applications.

 A1.4.1                           Translation                     Evaluate translation
                                  (Compilers/Interpreters)        processes of interpreters
                                                                  and compilers.

 A2.1.5                           TCP/IP Model                    Describe the function of
                                                                  the TCP/IP model.

 A2.2.2                           Servers                         Describe the function of
                                                                  servers.
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_A1_Structure_HL_Extension.md.pdf`
```text
A1.3.7                          Explain           Explain Open-Loop vs
                                                   Closed-Loop (Feedback)
                                                   systems in real contexts
                                                   (e.g., AC, Cruise Control).

 A1.4.1                          Evaluate          Evaluate Interpreters vs
                                                   Compilers vs JIT
                                                                (Just-In-Time) regarding
                                                                speed, portability, and
                                                                error detection.



2. Key Terminology & Definitions
```
```text
Actuator.
Student Exam Action:
●​ Diagram: Draw the block diagram for a Central Heating System (Sensor -> Processor ->
   Heater -> Output -> Sensor).

A1.4.1: Translators (Compilers vs Interpreters)
Theory:
●​ Compiler:
    ○​ Pros: Fast execution, code is hidden (binary), optimized.
    ○​ Cons: Slow compilation, platform dependent.
●​ Interpreter:
    ○​ Pros: Starts immediately, easy debugging, platform independent source.
    ○​ Cons: Slower execution, source code visible.
●​ Java: Hybrid. Compiles to Bytecode (intermediate), then interpreted by JVM (Java
```

### A1.4.2 — Virtual Machines & JIT
- No direct code match found in selected IB_Content_MD PDFs. Use mapped unit-plan wording and bounded chapter references if needed.

## Unit Plan Extract (Context)
```text
Unit Plan: HL Unit 1 - Advanced Architecture (A1.1, A1.4)
Subject: IB Computer Science (First Assessment 2027)
Grade: Year 12 (HL Only)
Duration: 4 Weeks (8 HL Lessons)
Theme: Theme A: Concepts of Computer Science
Unit Foundation
Concepts The unit focuses on Specialisation and Concurrency. It explores how architectural design shifts from general-purpose processing (CPU) to massive parallelism (GPU). Key themes include the Optimisation of Throughput (Pipelining) and the Abstraction of execution environments (Intermediate code/Virtual Machines).
Content - A1.1.3: CPU vs GPU design philosophies: core architecture, processing power, memory access, and power efficiency. Coordination of execution.
	•	A1.1.6: Pipelining in multi-core architectures: Fetch, Decode, Execute, and Write-back stages. Parallel vs independent core operation.
	•	A1.4.1: Translation mechanics: Interpreters vs Compilers. Error detection, portability, and performance-critical applications.
	•	A1.4.1: Advanced translation: Just-in-Time (JIT) compilation, bytecode interpreters, and cross-platform development.
Skills for Learning - Thinking Skills: Evaluating hardware suitability for non-graphics tasks (e.g., Machine Learning or large-scale simulations).
	•	Self-management Skills: Breaking down the multi-stage pipeline process into discrete time-sequenced events.
Approaches to Teaching - Conceptual: Comparing a CPU to a "Swiss Army Knife" (versatility) and a GPU to a "Chainsaw" (raw power for specific tasks).
	•	Inquiry-based: Analysing why Python or Java use intermediate bytecode instead of direct machine code compilation.
	•	Differentiated: Using "Pipeline Simulators" to show how throughput increases even when individual latency does not.
Terminology Core Architecture, ALU Density, Throughput, Latency, Pipelining, Write-back, Multi-core, Parallelism, JIT Compilation, Bytecode, Virtual Machine, Portability, Interpretation.
Misconceptions - GPU Speed: Believing a GPU is "faster" than a CPU for all tasks; it is only faster for tasks that can be parallelised.
	•	Pipeline Latency: Assuming pipelining makes a single instruction finish faster. It increases throughput (total output), not individual speed.
	•	Compilers vs Interpreters: Thinking a compiler is always "better" because it's faster, ignoring the development time and portability benefits of interpreters.
Adaptive Strategies - Visual Parallelism: Use a grid of 100 students vs 1 student to demonstrate core density in GPUs vs CPUs for simple math tasks.
	•	Kinesthetic Pipeline: A "Laundry Analogy" physical activity (Wash, Dry, Fold, Put Away) to demonstrate how 4 people working in a pipeline complete 4 loads faster than 1 person doing them sequentially.
	•	Scaffolded Comparison: Provide a "Translation Matrix" comparing JIT, Bytecode, and Machine Code for students to populate based on provided performance data.
TOK Connections - The Limits of Language: Does the dominance of English-based high-level languages and their translation into machine code create a barrier to "knowledge" for non-English speakers?
	•	Reliability of Knowledge: To what extent can we trust "Just-in-Time" compiled code to be as secure and consistent as pre-compiled code?
IBO Learner Profile - Inquirers: Investigating the coordination between CPU and GPU in modern AI deployment.
	•	Risk-takers: Exploring low-level assembly-style logic to understand the hardware-software interface.
CAS Connections - Creativity: Creating a technical blog post or video explaining "Why your GPU matters for AI" to demystify hardware for non-CS students.
Learning Overview (Lesson-by-Lesson)
Lesson
Core Knowledge
Description
Homework Opportunities
Assessment / Feedback
Number of Lessons
1-2
CPU vs GPU Design
Architectural differences: Core counts, ALU density, and memory access. Task division and execution coordination.
HW 1: Research "General-Purpose GPU (GPGPU)" computing. List 3 non-graphics uses.
Group Feedback: Comparing CPU/GPU specs for a self-driving car scenario.
2
3-4
Pipelining
Multi-core pipelining stages (Fetch, Decode, Execute, Write-back). Calculating throughput gains.
HW 2: Diagram a 4-stage pipeline showing 5 instructions. Identify the point of maximum throughput.
Mid-Unit Assessment: Solving throughput calculation problems.
2
5-6
Translation Mechanics
Deep-dive into Compilers vs Interpreters. Trade-offs in error detection and execution time.
HW 3: Compare the translation process of Python vs C++. Which is better for a flight controller?
Peer review of "Portability vs Speed" evaluations.
2
7-8
JIT & Bytecode
The role of the JVM/PVM. Just-in-Time compilation and its role in cross-platform development.
HW 4: Research JIT compilation in web browsers (V8 engine). Why does it matter for web apps?
End-Unit Assessment: Paper-based test on HL Architecture and Translation.
2
```
