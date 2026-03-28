---
level: sl
unitNumber: 30
unitName: Approaches to Computational Thinking
summary: The computational-thinking toolkit that underpins the entire course — constructing problem specifications, applying abstraction, decomposition, pattern recognition, and algorithmic design, and tracing flowcharts.
subtopics:
  - code: B1.1.1
    title: Problem specification
  - code: B1.1.2
    title: Fundamental concepts of computational thinking
  - code: B1.1.3
    title: Applying computational thinking to solve problems
  - code: B1.1.4
    title: Tracing flowcharts
sourcePolicy: ib_content_md_first
---

## B1.1.1 Constructing a problem specification

Before any system is designed or any code is written, the problem itself must be clearly defined. A <span data-def="A precise, structured description of a problem that includes the problem statement, constraints, objectives, inputs/outputs, and measurable success criteria.">problem specification</span> is a structured document that states exactly what needs to be solved, under what conditions, and how success will be measured.

The IB command term here is *construct* — you must be able to produce a complete problem specification for a given scenario, not merely describe what one should contain.

### The five components

Every complete problem specification includes these five elements:

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">1. Problem statement</p>
  <p class="ib-textbook-defn__body">A clear description of the issue: what is going wrong, who is affected, and why the current situation is unsatisfactory. This describes the <em>problem</em>, not the solution.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">2. Constraints and limitations</p>
  <p class="ib-textbook-defn__body">The boundaries the solution must operate within: budget, time, hardware availability, legal requirements (e.g. data protection regulations), workforce skills, and any technical restrictions.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">3. Objectives and goals</p>
  <p class="ib-textbook-defn__body">What the system must achieve — stated as clear, specific targets. "Make the process faster" is too vague; "Reduce average queue time to under 5 minutes" is specific and testable.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">4. Inputs and outputs</p>
  <p class="ib-textbook-defn__body">The data entering and leaving the system. Inputs should be classified as manual (typed, clicked) or automatic (scanned, sensor-generated). Outputs should be classified as temporary (on-screen display) or permanent (printout, saved file).</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">5. Evaluation criteria</p>
  <p class="ib-textbook-defn__body">Specific, measurable metrics used to judge whether the solution succeeds. Good criteria are testable and quantifiable: "95% of users rate the interface as easy to use" rather than "users like it."</p>
</div>

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Canteen ordering system</p>
  <div class="ib-textbook-worked__body">
    <p>A school canteen wants to replace its paper ordering system with a digital kiosk.</p>
    <p><strong>Problem:</strong> Queues last 15 minutes at lunch because staff take orders verbally. Students sometimes receive the wrong meal.</p>
    <p><strong>Constraints:</strong> Budget of £800; must work offline during internet outages; food hygiene regulations require allergen flagging.</p>
    <p><strong>Objectives:</strong> Reduce average queue time to under 5 minutes; eliminate order errors; flag allergens automatically.</p>
    <p><strong>Inputs:</strong> Touchscreen menu selections (manual entry), student ID card tap via NFC (automatic entry).</p>
    <p><strong>Outputs:</strong> Kitchen order ticket (permanent printout), on-screen confirmation (temporary display).</p>
    <p><strong>Evaluation:</strong> Timed queue comparison over one week; error log shows zero mismatches; allergen flags tested against known dietary records.</p>
  </div>
</div>

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">A problem specification describes the <em>problem</em>, not the solution. "We will build an app with a database" is a solution statement. "Students cannot currently check book availability" is a problem statement. Keep the two distinct.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B1.1.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>A problem specification has five components: problem statement, constraints, objectives, inputs/outputs, and evaluation criteria.</li>
      <li>Each component must be specific, measurable, and focused on the problem rather than a particular solution.</li>
      <li>The command term <em>construct</em> means you must produce a complete specification, not just describe the concept.</li>
    </ul>
  </div>
</div>


## B1.1.2 Fundamental concepts of computational thinking

<span data-def="A problem-solving approach that uses concepts from computer science — abstraction, decomposition, pattern recognition, and algorithmic thinking — to formulate problems and design solutions before any code is written.">Computational thinking</span> is a problem-solving framework. It provides a structured way to approach complex problems *before* any code is written. The IB identifies four fundamental concepts, often called the four pillars.

### Abstraction

<span data-def="The process of focusing on essential details while hiding or ignoring irrelevant complexity. Abstraction simplifies a problem to make it manageable.">Abstraction</span> means focusing on what matters and removing what does not. It simplifies a problem by stripping away unnecessary detail so that the essential structure becomes visible.

The London Underground map is a widely cited example: it ignores real geographical distances and curves, showing only station names and connections. This abstraction makes the map far easier to use for its purpose — planning a route — even though it is geographically inaccurate.

In computing, abstraction appears at every level. High-level programming languages abstract away machine code. APIs abstract away implementation details. A database view abstracts away the underlying table structure. In each case, the user works with a simpler model that hides complexity without losing the information they need.

### Decomposition

<span data-def="Breaking a complex problem into smaller, more manageable sub-problems that can be tackled independently.">Decomposition</span> means breaking a large, complex problem into smaller sub-problems that can each be understood, solved, and tested independently.

Planning a school event, for example, decomposes into: venue booking, catering, invitations, entertainment, and budget tracking. Each sub-problem can be assigned to a different person and worked on in parallel.

In software development, decomposition leads to modular design — systems built from independent components (functions, classes, modules) that each handle one part of the problem.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Decomposition is not the same as "breaking a program into subroutines." Decomposition happens at the <em>problem</em> level, before any code exists. You decompose the <em>problem</em>, not the program. Subroutines are an <em>implementation</em> of decomposition, not decomposition itself.</p>
</div>

### Pattern recognition

<span data-def="Identifying similarities, repeated structures, or trends within or across problems that allow solutions to be reused or generalised.">Pattern recognition</span> means identifying similarities or repeating structures that allow you to reuse existing solutions. If you recognise that a new problem shares the same structure as one you have already solved, you can adapt the existing solution rather than starting from scratch.

In code, pattern recognition leads to reusable functions and templates. If form validation logic is identical across five pages, recognising this pattern means you write the logic once and reuse it everywhere.

In machine learning, pattern recognition is the core goal: the system learns to recognise patterns in training data and applies them to new, unseen data.

### Algorithmic thinking

<span data-def="Designing a finite, ordered, unambiguous sequence of steps that solves a problem or completes a task. Each step must be precise enough to follow without interpretation.">Algorithmic thinking</span> means designing a precise, step-by-step procedure to solve a problem. An algorithm must be:

- **finite** — it terminates after a defined number of steps,
- **ordered** — the steps follow a specific sequence,
- **unambiguous** — each step has exactly one interpretation.

A cooking recipe is a simple analogy: step 1, step 2, step 3 — given the same ingredients and the same steps, the result is predictable.

In computing, algorithmic thinking is expressed through pseudocode, flowcharts, and eventually program code. The quality of the algorithm determines the quality of the solution: a well-designed algorithm is efficient, correct, and handles edge cases.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">How the pillars connect</p>
  <p class="ib-textbook-note__body">The four concepts are not used in isolation. A typical problem-solving process uses <strong>decomposition</strong> to break the problem apart, <strong>abstraction</strong> to simplify each sub-problem, <strong>pattern recognition</strong> to identify reusable solutions, and <strong>algorithmic thinking</strong> to design the step-by-step procedures. They work together as a toolkit, not as separate techniques applied one at a time.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B1.1.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li><strong>Abstraction</strong> removes irrelevant detail to focus on what matters.</li>
      <li><strong>Decomposition</strong> breaks a complex problem into smaller, manageable sub-problems.</li>
      <li><strong>Pattern recognition</strong> identifies similarities that allow solutions to be reused.</li>
      <li><strong>Algorithmic thinking</strong> designs precise, finite, step-by-step procedures.</li>
      <li>The four concepts work together as a problem-solving toolkit applied before coding begins.</li>
    </ul>
  </div>
</div>


## B1.1.3 Applying computational thinking to solve problems

The IB expects you to go beyond defining the four pillars. You must *explain* how computational thinking is used to approach and solve problems across different areas of computer science — connecting each concept to concrete applications and demonstrating why it matters.

### Computational thinking across CS domains

The same four concepts apply whether you are building software, designing a network, training a machine-learning model, or structuring a database. The table below maps each pillar to four major domains.

| Domain | Abstraction | Decomposition | Pattern recognition | Algorithmic thinking |
|--------|-------------|---------------|--------------------|--------------------|
| **Software development** | High-level languages abstract hardware; APIs hide implementation details | Modular design: functions, classes, and packages each handle one responsibility | Reusable components, shared libraries, design patterns | Flowcharts and pseudocode plan logic before coding |
| **Machine learning** | Feature selection keeps only relevant data attributes | ML pipeline splits into: data collection → preprocessing → training → evaluation | Classifying data into clusters; recognising trends for prediction | Training algorithms (gradient descent, decision trees) follow precise iterative steps |
| **Networks** | OSI layers abstract lower-level details from higher layers | Security splits into firewall, encryption, and authentication sub-problems | Intrusion detection recognises attack signatures by comparing traffic patterns | Routing algorithms (e.g. Dijkstra) find shortest paths through a network |
| **Databases** | Views and ER diagrams abstract the underlying table structure | Normalisation breaks one large table into smaller, related tables | Repeated data suggests a candidate for a lookup table | Query optimisation follows rule-based steps to retrieve data efficiently |

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Hospital patient records system</p>
  <div class="ib-textbook-worked__body">
    <p><strong>Scenario:</strong> A hospital wants to build a digital patient records system.</p>
    <p><strong>Decomposition:</strong> The overall problem ("manage patient records") is broken into sub-problems: patient registration, appointment scheduling, medical history storage, prescription tracking, and billing. Each sub-problem can be developed and tested independently, and different teams can work on them in parallel.</p>
    <p><strong>Abstraction:</strong> A doctor using the system does not need to see the database schema or network configuration. The interface presents only patient name, diagnosis, and treatment plan — hiding the complexity of how data is stored, replicated across hospital sites, and secured against unauthorised access.</p>
    <p><strong>Pattern recognition:</strong> The registration process for outpatient appointments, inpatient admissions, and emergency arrivals all follow a similar pattern (collect personal details → verify identity → assign to department). Recognising this means a single reusable registration module can serve all three contexts.</p>
    <p><strong>Algorithmic thinking:</strong> The appointment scheduling component requires a step-by-step algorithm: check doctor availability → compare with patient preferences → allocate time slot → send confirmation → update calendar. Each step is unambiguous and the sequence is fixed.</p>
  </div>
</div>

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Answering "explain" questions</p>
  <p class="ib-textbook-note__body">The command term <em>explain</em> requires more than naming a concept and stating its definition. A strong answer (1) states the concept, (2) gives a concrete application in the given context, and (3) says <em>why</em> it helps — for example, "This reduces development time because each module can be built and tested independently."</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B1.1.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Computational thinking applies across all areas of CS: software development, machine learning, networks, and databases.</li>
      <li>Strong answers connect a CT concept to a specific application and explain <em>why</em> it is useful in that context.</li>
      <li>The four pillars are used together — decomposition breaks the problem, abstraction simplifies it, pattern recognition reuses solutions, and algorithmic thinking designs the procedures.</li>
    </ul>
  </div>
</div>


## B1.1.4 Tracing flowcharts

A <span data-def="A diagram that represents an algorithm using standardised symbols (ovals, rectangles, diamonds, parallelograms) and arrows showing the flow of execution.">flowchart</span> is a visual representation of an algorithm. Each step is shown as a symbol, and arrows indicate the order of execution. The IB expects you to *trace* flowcharts — follow them step by step, recording variable values and decision outcomes in a <span data-def="A table that records the value of every variable and every output at each step of an algorithm's execution, used to verify that the algorithm produces the correct result.">trace table</span>.

### Standard flowchart symbols

| Symbol | Shape | Purpose | Example |
|--------|-------|---------|---------|
| Terminator | Oval | Start or end of the algorithm | START, END |
| Input/Output | Parallelogram | Data entering or leaving the system | INPUT num, OUTPUT total |
| Process | Rectangle | Calculation or assignment | total ← total + num |
| Decision | Diamond | Yes/No or True/False branch | Is num > 0? |
| Flowline | Arrow | Direction of flow between steps | Connects any two symbols |

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistakes</p>
  <p class="ib-textbook-warning__body">Three errors appear repeatedly in student flowcharts: (1) decision diamonds with unlabelled branches — every diamond must have both Yes and No paths clearly marked; (2) disconnected flowlines that do not terminate at a symbol; (3) missing terminators — every flowchart needs both a START and an END oval.</p>
</div>

### How to trace a flowchart

Tracing means following the algorithm step by step with specific input values, recording the state of every variable after each action. The result is a trace table.

Rules for building a trace table:

1. Create a column for each variable, plus columns for decisions and outputs.
2. Write one row per action — every time a variable changes or a decision is evaluated.
3. Copy unchanged variable values forward so every row shows the complete current state.
4. Record the outcome of every decision (Yes/No), even when no variable changes.
5. Show unassigned variables as `—`, not as 0 or blank.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing a positive-number counter</p>
  <div class="ib-textbook-worked__body">
    <p>The following algorithm reads three numbers and counts how many are positive:</p>
    <pre><code>count ← 0
LOOP 3 times
    INPUT num
    IF num &gt; 0 THEN
        count ← count + 1
    END IF
END LOOP
OUTPUT count</code></pre>
    <p><strong>Test data:</strong> 5, −2, 8</p>
    <table>
      <tr><th>Step</th><th>Action</th><th>count</th><th>num</th><th>num &gt; 0?</th><th>Output</th></tr>
      <tr><td>1</td><td>Initialise</td><td>0</td><td>—</td><td>—</td><td>—</td></tr>
      <tr><td>2</td><td>INPUT 5</td><td>0</td><td>5</td><td>Yes</td><td>—</td></tr>
      <tr><td>3</td><td>count ← count + 1</td><td>1</td><td>5</td><td>—</td><td>—</td></tr>
      <tr><td>4</td><td>INPUT −2</td><td>1</td><td>−2</td><td>No</td><td>—</td></tr>
      <tr><td>5</td><td>(skip increment)</td><td>1</td><td>−2</td><td>—</td><td>—</td></tr>
      <tr><td>6</td><td>INPUT 8</td><td>1</td><td>8</td><td>Yes</td><td>—</td></tr>
      <tr><td>7</td><td>count ← count + 1</td><td>2</td><td>8</td><td>—</td><td>—</td></tr>
      <tr><td>8</td><td>OUTPUT count</td><td>2</td><td>8</td><td>—</td><td><strong>2</strong></td></tr>
    </table>
    <p>The algorithm correctly outputs 2, since two of the three input values (5 and 8) are positive.</p>
  </div>
</div>

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing with MOD and DIV</p>
  <div class="ib-textbook-worked__body">
    <p>The following algorithm extracts and outputs the individual digits of a two-digit number:</p>
    <pre><code>INPUT number
tens ← number DIV 10
units ← number MOD 10
OUTPUT tens
OUTPUT units</code></pre>
    <p><strong>Test data:</strong> 47</p>
    <table>
      <tr><th>Step</th><th>Action</th><th>number</th><th>tens</th><th>units</th><th>Output</th></tr>
      <tr><td>1</td><td>INPUT 47</td><td>47</td><td>—</td><td>—</td><td>—</td></tr>
      <tr><td>2</td><td>tens ← 47 DIV 10</td><td>47</td><td>4</td><td>—</td><td>—</td></tr>
      <tr><td>3</td><td>units ← 47 MOD 10</td><td>47</td><td>4</td><td>7</td><td>—</td></tr>
      <tr><td>4</td><td>OUTPUT tens</td><td>47</td><td>4</td><td>7</td><td><strong>4</strong></td></tr>
      <tr><td>5</td><td>OUTPUT units</td><td>47</td><td>4</td><td>7</td><td><strong>7</strong></td></tr>
    </table>
    <p><strong>MOD</strong> returns the remainder after integer division: <code>47 MOD 10 = 7</code>. <strong>DIV</strong> returns the integer quotient: <code>47 DIV 10 = 4</code>.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B1.1.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Flowcharts use five standard symbols: terminator (oval), input/output (parallelogram), process (rectangle), decision (diamond), and flowline (arrow).</li>
      <li>Tracing means following a flowchart step by step with test data and recording every variable change in a trace table.</li>
      <li>Trace tables must show one action per row, carry forward unchanged values, and record every decision outcome.</li>
      <li>MOD (remainder) and DIV (integer quotient) are commonly tested in tracing questions.</li>
    </ul>
  </div>
</div>
