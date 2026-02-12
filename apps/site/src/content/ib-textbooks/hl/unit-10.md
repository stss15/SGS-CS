---
level: hl
unitNumber: 10
unitName: The HL Case Study
summary: Revise The HL Case Study with source-bounded coverage of Paper 1, Internal Assessment, and HL strategic depth, focusing on technical synthesis, evidence quality, and justified decision frameworks.
subtopics:
  - code: Paper 1
    title: Section B Technical Synthesis
  - code: Internal Assessment
    title: Research and Technical Communication
  - code: HL
    title: Strategic Evaluation at Higher Level
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| pre-seen case study | Published context used as the basis for Section B analysis. |
| technical synthesis | Combining evidence from multiple CS areas into one coherent solution argument. |
| operational constraint | Practical limit such as latency, power, cost, bandwidth, or environmental variability. |
| evidence quality | Reliability and relevance of sources used to support technical claims. |
| trade-off analysis | Structured comparison showing gains and losses between options. |
| feasibility | Practical likelihood that a proposed solution can be implemented effectively. |
| strategic justification | Defending a chosen approach with technical and contextual reasoning. |
| scalability | Ability to maintain performance as workload or deployment size increases. |
| risk profile | Distribution of likely technical failures and their severity. |
| balanced judgement | Final recommendation that acknowledges limitations and uncertainty. |

## Paper 1 Section B Technical Synthesis

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Apply

Applying case-study knowledge means selecting relevant technical concepts and connecting them to the presented scenario constraints.

| Synthesis component | What it should include |
| --- | --- |
| Problem definition | Technical challenge in system terms |
| Candidate approaches | At least two feasible technical options |
| Constraint mapping | Latency, power, reliability, security, cost |
| Recommendation | Evidence-backed choice with limitations |

Section B depth comes from linkage quality, not from listing isolated buzzwords.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

In autonomous inspection robotics, a response might connect:

- sensor fusion (A1/A2 context),
- data pipeline reliability (A3 context),
- model choice under compute limits (A4 context),
- structural software design choices (B3/B4 context).

The application is strongest when each concept is tied to one operational consequence.

</div>

### Worked example: short strategy matrix

<div class="reader-section-body reader-section-body--example">

Scenario: navigation in smoke-filled indoor environments.

| Option | Strength | Limitation |
| --- | --- | --- |
| LiDAR-first mapping | High structural accuracy | Sensor degradation in particulate-heavy air |
| Vision-first SLAM | Works with commodity cameras | Sensitive to low visibility/noise |
| Hybrid fusion | Better resilience across conditions | Higher compute and integration complexity |

Bounded conclusion: hybrid is strongest when reliability is mission-critical and compute budget is available.

</div>

## Internal Assessment Research and Technical Communication

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Apply

Applying IA research practice means translating technical findings into clear, traceable rationale.

| Communication requirement | Practical implementation |
| --- | --- |
| Claim traceability | Every major claim linked to evidence |
| Technical precision | Correct use of CS terminology and system behavior |
| Scope control | Keep analysis aligned to the defined problem boundary |
| Coherent structure | Problem -> method -> evidence -> conclusion |

Clarity is technical: the reader should reproduce your reasoning chain.

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

| Misconception | Correction |
| --- | --- |
| "More references automatically means stronger argument." | Source quality and relevance matter more than count. |
| "General ethical discussion is enough." | Technical mechanism and constraints must remain central. |
| "One benchmark result proves universal suitability." | Results must be interpreted against deployment context. |

</div>

### Worked example: evidence log snapshot

<div class="reader-section-body reader-section-body--example">

| Source | Claim supported | Limitation noted |
| --- | --- | --- |
| Industrial robotics benchmark report | Hybrid localization lowers drift in mixed environments | Dataset lacks heavy-smoke test cases |
| Peer-reviewed computer vision paper | CNN feature extraction robust under moderate lighting shift | Hardware target differs from case-study platform |

This format keeps conclusions accountable and avoids unsupported claims.

</div>

## HL Strategic Evaluation at Higher Level

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Evaluate

HL evaluation must include comparative judgement under conflicting criteria.

| Evaluation axis | Typical tension |
| --- | --- |
| Accuracy vs latency | More complex models may increase response time |
| Reliability vs cost | Redundancy improves resilience but raises budget |
| Security vs usability | Stricter controls may increase operational friction |
| Scalability vs simplicity | Simple systems may fail at larger deployment scale |

A high-quality evaluation ends with a bounded recommendation, not an absolute claim.

</div>

### In real systems

<div class="reader-section-body reader-section-body--apply">

A strategy can be technically superior but operationally infeasible due to battery, staffing, or maintenance constraints.

HL judgement should therefore integrate both engineering quality and delivery realism.

</div>

### Worked example: weighted decision score

<div class="reader-section-body reader-section-body--example">

Weights: reliability `0.4`, latency `0.3`, cost `0.3`

| Option | Reliability (0-10) | Latency (0-10) | Cost (0-10) | Weighted score |
| --- | --- | --- | --- | --- |
| A | 9 | 6 | 4 | `9*0.4 + 6*0.3 + 4*0.3 = 6.6` |
| B | 7 | 8 | 7 | `7*0.4 + 8*0.3 + 7*0.3 = 7.3` |

Option B wins under this constraint profile despite lower reliability score, because latency and cost requirements are also critical.

</div>
