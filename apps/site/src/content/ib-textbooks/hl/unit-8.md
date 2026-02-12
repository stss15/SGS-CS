---
level: hl
unitNumber: 8
unitName: Supervised & Unsupervised
summary: Revise Supervised & Unsupervised with source-bounded coverage of A4.3.4, A4.3.5, A4.3.6, and A4.3.7 through pattern-discovery models, agent learning, and evolutionary optimization.
subtopics:
  - code: A4.3.4
    title: Clustering (Unsupervised)
  - code: A4.3.5
    title: Association Rules
  - code: A4.3.6
    title: Reinforcement Learning
  - code: A4.3.7
    title: Genetic Algorithms
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| clustering | Grouping data points by feature similarity without predefined labels. |
| centroid | Central representative point of a cluster in algorithms such as k-means. |
| association rule | Pattern of the form "if X then Y" found in co-occurrence data. |
| support | Proportion of records containing an itemset/rule components. |
| confidence | Conditional probability that Y appears when X appears. |
| reinforcement learning agent | Decision-making system that learns through interaction with an environment. |
| reward signal | Numeric feedback guiding agent behavior improvement. |
| exploration vs exploitation | Trade-off between trying new actions and using known high-reward actions. |
| genetic algorithm | Optimization method inspired by evolution over populations of candidate solutions. |
| mutation | Random change in candidate solution to preserve diversity and avoid local traps. |

## A4.3.4 Clustering (Unsupervised)

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

Clustering description should explain that groups are formed from similarity, not pre-labeled answers.

| Characteristic | Clustering behavior |
| --- | --- |
| Labels required | No |
| Output | Group assignments by similarity |
| Typical use | Segmentation, anomaly grouping, exploratory structure discovery |

A clear description states what defines similarity (distance or feature-space closeness).

</div>

### The domain matrix

<div class="reader-section-body reader-section-body--apply">

| Domain | Possible clustering use |
| --- | --- |
| Retail | Segment customers by purchase frequency and basket value |
| Education | Group learners by engagement patterns |
| Healthcare | Group patient histories by symptom profiles |

These uses are descriptive grouping tasks, not label-prediction tasks.

</div>

### Worked example: two-cluster grouping with concrete points

<div class="reader-section-body reader-section-body--example">

Points: `(1,1), (1,2), (2,1), (8,8), (9,8), (8,9)`

Using `k=2`, one stable outcome is:

| Cluster | Members | Approx centroid |
| --- | --- | --- |
| C1 | `(1,1), (1,2), (2,1)` | `(1.33, 1.33)` |
| C2 | `(8,8), (9,8), (8,9)` | `(8.33, 8.33)` |

The grouping emerges from spatial proximity, not predefined class names.

</div>

## A4.3.5 Association Rules

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

Association rules describe co-occurrence patterns in large datasets.

| Rule form | Interpretation |
| --- | --- |
| `X -> Y` | When X appears, Y often appears too |

A strong description includes support and confidence rather than verbal claims alone.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

In basket analysis, rules guide layout and recommendation strategies.

Example pattern:

- Many orders containing pasta also contain sauce.
- Confidence quantifies how often that co-occurrence happens among pasta orders.

Association describes relationship frequency, not direct causation.

</div>

### Worked example: support and confidence

<div class="reader-section-body reader-section-body--example">

From 500 transactions:

- 120 contain `bread`
- 90 contain `butter`
- 72 contain both

Rule: `bread -> butter`

| Metric | Calculation | Value |
| --- | --- | --- |
| Support | `72 / 500` | `0.144` |
| Confidence | `72 / 120` | `0.60` |

Interpretation: 60% of bread purchases also included butter in this sample.

</div>

## A4.3.6 Reinforcement Learning

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

Reinforcement learning describes an interaction loop between agent and environment.

| Element | Role |
| --- | --- |
| State | Current situation seen by agent |
| Action | Choice made by agent |
| Reward | Feedback score after action |
| Policy | Strategy mapping states to actions |

Learning occurs by adjusting policy to maximize long-term reward.

</div>

### In real systems

<div class="reader-section-body reader-section-body--apply">

A warehouse robot can learn route decisions:

- State: current location and obstacle map.
- Actions: move directions.
- Reward: positive for reaching target quickly, negative for collisions/delays.

Over many episodes, policy improves from trial outcomes.

</div>

### Worked trace: small grid reward sequence

<div class="reader-section-body reader-section-body--example">

Goal at `(2,2)` on a 3x3 grid. Rewards: `+10` goal, `-5` obstacle, `-1` move cost.

| Step | State | Action | Reward |
| --- | --- | --- | --- |
| 1 | `(0,0)` | Right | `-1` |
| 2 | `(1,0)` | Up | `-1` |
| 3 | `(1,1)` | Up | `-1` |
| 4 | `(1,2)` | Right | `+10` |

Total episode reward: `+7`

The trace shows how reward accumulates over action sequence, not one isolated decision.

</div>

## A4.3.7 Genetic Algorithms

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

Genetic algorithms describe iterative improvement of solution populations.

| Phase | Purpose |
| --- | --- |
| Selection | Prefer higher-fitness candidates |
| Crossover | Combine parent traits |
| Mutation | Introduce variation |
| Evaluation | Recompute fitness and repeat |

This search process is useful when exact optimization is difficult or search spaces are very large.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

A route-planning problem can encode candidate routes as chromosomes. Fitness penalizes long travel time and constraint violations.

Mutation prevents the population from collapsing into one local pattern too early.

</div>

### Worked example: one generation update

<div class="reader-section-body reader-section-body--example">

Candidate fitness scores:

| Candidate | Fitness |
| --- | --- |
| A | 72 |
| B | 91 |
| C | 65 |
| D | 88 |

Selection chooses B and D as strong parents.

After crossover + mutation, child `E` scores `94` on the same fitness function.

Result: population best fitness improved from `91` to `94` in one generation.

</div>
