# Source Map: HL Unit 9 - Agents & Neural Computing

## Scope
- Level: HL
- Unit: 9
- Unit name: Agents & Neural Computing
- Source policy: ib_content_md_first
- Out-of-scope rule: all non-mapped syllabus points are excluded.

## Mapped Subtopics
- A4.3.8: Reinforcement Learning
- A4.3.9: Genetic Algorithms
- A4.3.10: ANNs
- A4.3.11: CNNs (Vision)

## Source Files Used
- docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf
- docs/content/ib-content/IB_Content_MD/HL/Unit_A4_Structure_HL_Expanded.md.pdf
- docs/content/ib-content/Unit Plans/HL/Unit Plan_ HL Unit 9 - Agents & Neural Computing (A4.3).docx (unit plan context)

## Evidence Fragments
### A4.3.8 — Reinforcement Learning
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
A4.3.7    Genetic Algorithms          Describe application of
                                      genetic algorithms in
                                      real-world situations.

A4.3.8    ANNs (Neural Networks)      Outline structure/function
                                      of ANNs and multi-layer
                                      networks.

A4.3.9    CNNs (Convolutional NNs)    Describe how CNNs learn
                                      spatial hierarchies in
                                      images.

A4.3.10   Model Selection             Explain importance of
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_A4_Structure_HL_Expanded.md.pdf`
```text
Algorithms: Selection,
                    Crossover, Mutation,
                    Fitness Function (Natural
                    Selection analogy).

A4.3.8   Outline    Outline ANNs (Artificial
                    Neural Networks): Input
                    Layer, Hidden Layers,
                    Weights, Bias, Activation
                    Function, Output.

A4.3.9   Describe   Describe CNNs
                    (Convolutional Neural
                    Networks): Convolution
```

### A4.3.9 — Genetic Algorithms
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
A4.3.8    ANNs (Neural Networks)      Outline structure/function
                                      of ANNs and multi-layer
                                      networks.

A4.3.9    CNNs (Convolutional NNs)    Describe how CNNs learn
                                      spatial hierarchies in
                                      images.

A4.3.10   Model Selection             Explain importance of
                                      model selection and
                                      comparison.

B2.4.4    Recursion Concepts          Explain fundamental
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_A4_Structure_HL_Expanded.md.pdf`
```text
Neural Networks): Input
                    Layer, Hidden Layers,
                    Weights, Bias, Activation
                    Function, Output.

A4.3.9   Describe   Describe CNNs
                    (Convolutional Neural
                    Networks): Convolution
                    Layers, Pooling Layers,
                    Kernels/Filters. Used for
                                                               Image Recognition.

 A4.3.10                        Explain                        Explain Model Selection:
                                                               Choosing the right
```

### A4.3.10 — ANNs
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
A4.3.9    CNNs (Convolutional NNs)    Describe how CNNs learn
                                      spatial hierarchies in
                                      images.

A4.3.10   Model Selection             Explain importance of
                                      model selection and
                                      comparison.

B2.4.4    Recursion Concepts          Explain fundamental
                                      concept of recursion and
                                      applications.

B2.4.5    Recursive Algorithms        Construct and trace
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_A4_Structure_HL_Expanded.md.pdf`
```text
Networks): Convolution
                    Layers, Pooling Layers,
                    Kernels/Filters. Used for
                                                               Image Recognition.

 A4.3.10                        Explain                        Explain Model Selection:
                                                               Choosing the right
                                                               algorithm based on data
                                                               size, complexity, and
                                                               desired outcome (Accuracy
                                                               vs. Speed).
```

### A4.3.11 — CNNs (Vision)
- No direct code match found in selected IB_Content_MD PDFs. Use mapped unit-plan wording and bounded chapter references if needed.

## Unit Plan Extract (Context)
```text
Unit Plan: HL Unit 9 - Agents & Neural Computing (A4.3)
Subject: IB Computer Science (First Assessment 2027)
Grade: Year 13 (HL Only)
Duration: 4 Weeks (8 HL Lessons)
Theme: Theme A: Concepts of Computer Science
Unit Foundation
Concepts The unit focuses on Autonomous Decision-making and Bio-mimicry. It explores how computational systems can learn through trial and error, evolve through simulated natural selection, and process information using structures inspired by the human brain. Key themes include the Agent-Environment Loop, Evolutionary Optimisation, and Deep Hierarchical Learning.
Content - A4.3.8: Reinforcement Learning: The interaction between an Agent and an Environment. Defining States, Actions, and the Reward Signal. The exploration vs. exploitation trade-off.
	•	A4.3.9: Genetic Algorithms: Search and optimisation inspired by natural selection. Key mechanics: Population, Fitness Function, Selection, Crossover, and Mutation.
	•	A4.3.10: Artificial Neural Networks (ANN): Architecture involving Input, Hidden, and Output layers. The role of Weights, Biases, and Activation Functions.
	•	A4.3.11: Convolutional Neural Networks (CNN): Specialised architectures for image processing. Mechanics of Convolution, Pooling, and spatial feature extraction.
Skills for Learning - Thinking Skills: Evaluating which biologically inspired algorithm is best suited for a specific complex problem (e.g., pathfinding vs. image recognition).
	•	Research Skills: Investigating the "Explainability" crisis in deep neural networks (the Black Box problem).
Approaches to Teaching - Visualisation: Using interactive demos (e.g., Google's Teachable Machine or Neural Network Playgrounds) to see weights adjust in real-time.
	•	Inquiry-based: Simulating a simple Genetic Algorithm with paper-based "chromosomes" to see how fitness improves over generations.
	•	Analogy: Comparing CNN layers to the human visual cortex—moving from edges and lines to complex shapes and faces.
Terminology Agent, Environment, State, Reward, Policy, Genetic Algorithm, Chromosome, Fitness Function, Crossover, Mutation, ANN, Hidden Layer, Weight, Bias, Activation Function, CNN, Convolution, Pooling.
Misconceptions - RL as Supervised Learning: Believing RL requires labelled data; it actually requires a reward signal from the environment.
	•	Neural Network "Understanding": Assuming ANNs understand concepts like humans do, rather than performing complex non-linear regressions.
	•	Mutation in GA: Viewing mutation as "bad"; students must see it as a vital mechanism for maintaining genetic diversity and preventing local optima.
Adaptive Strategies - Visual Call Stacks: Use physical diagrams of CNN filters to show how a "window" moves across an image to extract features.
	•	Scaffolded Logic: Provide the "Fitness Function" logic for a Genetic Algorithm and have students manually calculate the fitness of two potential parents.
	•	ADHD-Aware Breakdowns: Use the "State-Action-Reward" loop as a repetitive visual anchor for all Reinforcement Learning lessons.
TOK Connections - The Limits of Bio-mimicry: Just because a computer mimics the brain (ANN), does that mean it functions like a mind? Is "intelligence" a process or a result?
	•	Creativity: Can a Genetic Algorithm that "evolves" a new architectural design be considered creative, or is it merely an exhaustive search of a solution space?
IBO Learner Profile - Inquirers: Investigating the boundaries of what autonomous agents can achieve without human intervention.
	•	Balanced: Assessing the ethical risks of deploying deep learning models in high-stakes environments like autonomous weaponry or medical triage.
CAS Connections - Creativity: Building a simple Reinforcement Learning agent (e.g., using a basic library) to solve a simple game or puzzle.
Learning Overview (Lesson-by-Lesson)
Lesson
Core Knowledge
Description
Homework Opportunities
Assessment / Feedback
Number of Lessons
1-2
Reinforcement Learning
The Agent-Environment loop. Defining Rewards and Policies. Applications in robotics and gaming.
HW 1: Define the State, Action, and Reward for an autonomous vacuum cleaner.
Exit Ticket: Diagramming the RL loop for a provided scenario.
2
3-4
Genetic Algorithms
Evolutionary steps: Selection, Crossover, and Mutation. Using fitness functions to solve optimisation problems.
HW 2: Research a real-world use of GA in engineering (e.g., antenna design).
Practical: Manually performing "Crossover" on two binary chromosomes.
2
5-6
ANN Architectures
Input, Hidden, and Output layers. The purpose of Weights and Activation Functions (e.g., Sigmoid/ReLU).
HW 3: Sketch an ANN for a simple 3-input logic problem. Label the weights.
Mid-Unit Quiz: Identifying ANN components and data flow.
2
7
CNNs for Images
Feature extraction through Convolution and Pooling layers. Spatial hierarchies.
HW 4: Explain why a CNN is better than a standard ANN for recognizing a cat in a photo.
Diagram Check: Tracing a 3x3 filter across a simple pixel grid.
1
8
Evalua
```
