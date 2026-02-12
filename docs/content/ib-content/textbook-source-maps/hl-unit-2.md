# Source Map: HL Unit 2 - Systems Control

## Scope
- Level: HL
- Unit: 2
- Unit name: Systems Control
- Source policy: ib_content_md_first
- Out-of-scope rule: all non-mapped syllabus points are excluded.

## Mapped Subtopics
- A1.3.5: Multitasking & Deadlock
- A1.3.6: Control Systems (Sensors/Actuators)
- A1.3.7: Loop Types (Open/Closed)

## Source Files Used
- docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf
- docs/content/ib-content/IB_Content_MD/HL/Unit_A1_Structure_HL_Extension.md.pdf
- docs/content/ib-content/Unit Plans/HL/Unit Plan_ HL Unit 2 - Systems Control (A1.3).docx (unit plan context)

## Evidence Fragments
### A1.3.5 — Multitasking & Deadlock
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
between CPU and GPU.

 A1.1.6                           Pipelining                      Describe pipelining in
                                                                  multi-core architectures.

 A1.3.5                           Multitasking & Resources        Explain OS role in
                                                                  managing multitasking and
                                                                  resource allocation.

 A1.3.6                           Control System                  Describe the use of
                                  components                      control system
                                                                  components.

 A1.3.7                           Control Systems                 Explain use of control
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_A1_Structure_HL_Extension.md.pdf`
```text
A1.1.6                          Describe          Describe Pipelining
                                                   (fetch/decode/execute
                                                   overlap) in multi-core
                                                   architectures.

 A1.3.5                          Explain           Explain OS role in
                                                   multitasking: Resource
                                                   contention, Deadlock, and
                                                   Starvation.

 A1.3.6                          Describe          Describe Control System
                                                   components: Sensor ->
                                                   ADC -> Controller -> DAC
                                                   -> Actuator.
```
```text
○​ Benefit: Increases throughput (instructions completed per clock cycle).
Student Exam Action:
●​ Explanation: Explain why a GPU is better for rendering 3D graphics than a CPU (Parallel
   processing of pixels).

A1.3.5: Resource Management
Theory:
●​ Multitasking: The OS slices CPU time to create the illusion of parallel execution on a
   single core.
●​ Problems:
   ○​ Deadlock: Process A holds Resource 1, needs Resource 2. Process B holds Resource
      2, needs Resource 1.
   ○​ Starvation: Low-priority process never gets CPU time (solved by "Aging" priority).
Student Exam Action:
```

### A1.3.6 — Control Systems (Sensors/Actuators)
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
A1.3.5                           Multitasking & Resources        Explain OS role in
                                                                  managing multitasking and
                                                                  resource allocation.

 A1.3.6                           Control System                  Describe the use of
                                  components                      control system
                                                                  components.

 A1.3.7                           Control Systems                 Explain use of control
                                  applications                    systems in real-world
                                                                  applications.

 A1.4.1                           Translation                     Evaluate translation
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_A1_Structure_HL_Extension.md.pdf`
```text
A1.3.5                          Explain           Explain OS role in
                                                   multitasking: Resource
                                                   contention, Deadlock, and
                                                   Starvation.

 A1.3.6                          Describe          Describe Control System
                                                   components: Sensor ->
                                                   ADC -> Controller -> DAC
                                                   -> Actuator.

 A1.3.7                          Explain           Explain Open-Loop vs
                                                   Closed-Loop (Feedback)
                                                   systems in real contexts
                                                   (e.g., AC, Cruise Control).
```
```text
○​ Starvation: Low-priority process never gets CPU time (solved by "Aging" priority).
Student Exam Action:
●​ Scenario: Given a scenario of a frozen printer queue, identify if it is a Deadlock or
   Starvation issue.

A1.3.6 & A1.3.7: Control Systems
Theory:
●​ Open-Loop: No feedback. Action happens for a set time (e.g., Toaster, basic Sprinkler).
●​ Closed-Loop: Feedback used. System self-corrects (e.g., Thermostat, Cruise Control).
●​ Process: Sensor -> ADC -> Microprocessor (compares to pre-set value) -> DAC ->
   Actuator.
Student Exam Action:
●​ Diagram: Draw the block diagram for a Central Heating System (Sensor -> Processor ->
   Heater -> Output -> Sensor).
```

### A1.3.7 — Loop Types (Open/Closed)
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
A1.3.6                           Control System                  Describe the use of
                                  components                      control system
                                                                  components.

 A1.3.7                           Control Systems                 Explain use of control
                                  applications                    systems in real-world
                                                                  applications.

 A1.4.1                           Translation                     Evaluate translation
                                  (Compilers/Interpreters)        processes of interpreters
                                                                  and compilers.

 A2.1.5                           TCP/IP Model                    Describe the function of
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_A1_Structure_HL_Extension.md.pdf`
```text
A1.3.6                          Describe          Describe Control System
                                                   components: Sensor ->
                                                   ADC -> Controller -> DAC
                                                   -> Actuator.

 A1.3.7                          Explain           Explain Open-Loop vs
                                                   Closed-Loop (Feedback)
                                                   systems in real contexts
                                                   (e.g., AC, Cruise Control).

 A1.4.1                          Evaluate          Evaluate Interpreters vs
                                                   Compilers vs JIT
                                                                (Just-In-Time) regarding
                                                                speed, portability, and
```
```text
○​ Starvation: Low-priority process never gets CPU time (solved by "Aging" priority).
Student Exam Action:
●​ Scenario: Given a scenario of a frozen printer queue, identify if it is a Deadlock or
   Starvation issue.

A1.3.6 & A1.3.7: Control Systems
Theory:
●​ Open-Loop: No feedback. Action happens for a set time (e.g., Toaster, basic Sprinkler).
●​ Closed-Loop: Feedback used. System self-corrects (e.g., Thermostat, Cruise Control).
●​ Process: Sensor -> ADC -> Microprocessor (compares to pre-set value) -> DAC ->
   Actuator.
Student Exam Action:
●​ Diagram: Draw the block diagram for a Central Heating System (Sensor -> Processor ->
   Heater -> Output -> Sensor).
```

## Unit Plan Extract (Context)
```text
Unit Plan: HL Unit 2 - Systems Control (A1.3)
Subject: IB Computer Science (First Assessment 2027)
Grade: Year 12 (HL Only)
Duration: 3 Weeks (6 HL Lessons)
Theme: Theme A: Concepts of Computer Science
Unit Foundation
Concepts The unit focuses on Concurrency and Feedback. It examines how operating systems manage the chaos of competing tasks and how automated systems maintain stability through logical loops. Key focus: the thin line between system efficiency and total failure (Deadlock).
Content - A1.3.5: Multitasking and resource allocation: task scheduling, resource contention, and the conditions for deadlock.
	•	A1.3.6: Control system components: input, process, output, and feedback mechanisms. Hardware: controller, sensors, actuators, transducers, and control algorithms.
	•	A1.3.6: Loop types: Open-loop (no feedback) vs. Closed-loop (feedback-driven).
	•	A1.3.7: Real-world applications: autonomous vehicles, thermostats, elevator controllers, and industrial irrigation.
Skills for Learning - Thinking Skills: Evaluating the reliability of automated systems in safety-critical environments.
	•	Communication Skills: Designing clear input-process-output (IPO) diagrams for complex hardware-software interactions.
Approaches to Teaching - Contextualised: Using the "Autonomous Vehicle" scenario to explain sensor-actuator feedback.
	•	Inquiry-based: Deducing why a domestic washing machine is often open-loop while a thermostat is closed-loop.
	•	Problem-based: Simulating resource contention to identify the Coffman conditions for deadlock.
Terminology Multitasking, Resource Contention, Deadlock, Open-loop, Closed-loop, Controller, Sensor, Actuator, Transducer, Control Algorithm, Feedback, Latency, Real-time.
Misconceptions - Deadlock: Believing a deadlock is just "lag." Students must understand it as a total logic freeze where processes are permanently waiting for each other.
	•	Hardware Roles: Confusing actuators (which do the work, e.g., a motor) with sensors (which get the data).
	•	Open vs. Closed: Assuming open-loop systems are "bad." They are often chosen for simplicity and cost in predictable environments.
Adaptive Strategies - Kinesthetic Contention: A physical "Resource Game" where students must hold specific markers (resources) to complete a task; if they refuse to release them, the game reaches a deadlock.
	•	Diagram Scaffolding: Providing partially completed IPO flowcharts for industrial systems (e.g., automated irrigation) for students to map sensors and actuators.
	•	ADHD-Aware Focus: Breaking down the 5 stages of control (Input -> Transducer -> Controller -> Actuator -> Output) into a clear visual sequence.
TOK Connections - Reliability of Knowledge: When an autonomous system (closed-loop) makes a life-or-death decision, who is the "knower"—the programmer or the algorithm?
	•	Intent vs. Outcome: If a system reaches deadlock, has it "failed," or is it simply obeying its logical rules with perfect consistency?
IBO Learner Profile - Thinkers: Critically assessing the environmental and social impacts of fully automated control systems (e.g., smart cities).
	•	Reflective: Evaluating the limitations of sensors in "messy" real-world environments compared to digital logic.
CAS Connections - Activity/Service: Programming a simple automated control system (e.g., an Arduino-based plant waterer) to support a school garden or community project.
Learning Overview (Lesson-by-Lesson)
Lesson
Core Knowledge
Description
Homework Opportunities
Assessment / Feedback
Number of Lessons
1
Multitasking & Contentions
How OS kernels manage shared resources. Concepts of time-sharing and resource contention.
N/A
Peer review of process-scheduling scenarios.
1
2
Deadlock Conditions
The four conditions for deadlock. Identifying and preventing logic "freezes" in software.
HW 1: Research the "Dining Philosophers Problem." Write a 200-word summary of the solution.
Whiteboard trace of a resource-allocation graph.
1
3
Control Components
Controllers, Sensors, Actuators, and Transducers. Defining the control algorithm.
N/A
Mid-Unit Assessment: Identify the 5 hardware components in a provided scenario (e.g., automatic lift).
1
4
Open vs. Closed Loops
The role of feedback. Differentiating open-loop vs. closed-loop logic with real-world triggers.
HW 2: Research an "Autonomous Vehicle" sensor array (LiDAR/Radar). List 3 sensors and their corresponding actuators.
Checklist check: Correct identification of feedback paths in diagrams.
1
5
Real-world Applications
Deep-dive into specific industrial and domestic systems (Thermostats, Irrigation, Security).
N/A
Teacher feedback on "Control Logic" design for a smart home system.
1
6
Unit Evaluation
Assessing safety, efficiency, and reliability in automated control. Unit Review.
HW 3 (Final Prep): Complete the HL Systems Control practice paper.
End-Unit Assessment: Mixed theory paper on Multitasking, Deadlock, and Loop design.
1
```
