---
level: sl
unitNumber: 7
unitName: Machine Intelligence
summary: Revise Machine Intelligence with exam-focused coverage of A4.1.1, A4.1.2, A4.4.1, A4.4.2, including exact command-term expectations and applied examples.
subtopics:
  - code: A4.1.1
    title: ML types & applications
  - code: A4.1.2
    title: ML hardware requirements
  - code: A4.4.1
    title: Ethical implications of ML
  - code: A4.4.2
    title: Ethics of tech integration
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Artificial intelligence (AI) | Broad field of systems that perform tasks associated with intelligent behavior. |
| Narrow AI | AI designed for specific tasks (the form currently deployed in real systems). |
| General AI | Hypothetical AI with human-level flexibility across all domains. |
| Machine learning (ML) | A subset of AI where systems learn patterns from data rather than explicit fixed rules. |
| Supervised learning | Training with labeled examples (input + known output). |
| Unsupervised learning | Training without labels; the model discovers structure in data. |
| Reinforcement learning | Learning through interaction, using rewards/penalties to improve policy decisions. |
| Deep learning | ML approach using multi-layer neural networks. |
| Transfer learning | Reusing learned knowledge from one task to accelerate a related task. |
| CPU | General-purpose processor suitable for flexible sequential workloads. |
| GPU | Processor with many parallel cores, strong for matrix-heavy ML workloads. |
| TPU | Specialized processor optimized for tensor operations in ML workloads. |
| Edge computing | Running models locally on-device near data generation. |
| Cloud deployment | Running model training or inference on remote scalable infrastructure. |
| Algorithmic bias | Systematic unfairness in model outputs due to skewed data or design choices. |
| Accountability | Clarity about who is responsible for outcomes from automated decisions. |
| Consent | Permission for data collection/use, especially for model training. |
| Pervasive AI | AI integrated into many daily systems and environments continuously. |


## A4.1.1 Describing ML Types and Applications

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to describe major ML types and where they are applied. Strong description includes what data each type needs, how learning happens, and the kinds of tasks it supports.

Before type selection, distinguish:
- **AI** (umbrella field)
- **ML** (learning from data)
- **Deep learning** (subset of ML)

</div>

### The domain matrix

<div class="reader-section-body reader-section-body--apply">

| ML type | Data pattern | Typical output | Example application |
| --- | --- | --- | --- |
| Supervised | Labeled input-output pairs | Classification or regression | Email spam detection, medical risk scoring |
| Unsupervised | Unlabeled data | Clusters or associations | Customer segmentation, market basket patterns |
| Reinforcement | Environment + reward signal | Policy for action choices | Robot control, route optimization |
| Deep learning | Large datasets with layered neural models | Complex feature extraction | Image recognition, speech processing |
| Transfer learning | Pre-trained model adapted to new task | Faster learning with less new data | Adapting a generic image model to classify plant disease |

</div>

### Worked example

<div class="reader-section-body reader-section-body--example">

Scenario matching:

| Scenario | Best fit | Why |
| --- | --- | --- |
| Predict exam score from hours studied | Supervised (regression) | Target value is numeric and labeled in training data |
| Group music listeners by behavior | Unsupervised | No predefined category labels |
| Train a game bot to improve strategy | Reinforcement | Reward-driven trial and error |
| Detect objects in street-camera video | Deep learning | High-dimensional visual features |
| Reuse a traffic-sign model for a new city | Transfer learning | Existing model features are already useful |

Describing accurately means naming the type and linking it to its data and output structure.

</div>


## A4.1.2 Describing Hardware Requirements for ML

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to describe hardware needs across ML scenarios. You should match workload scale and latency needs to an appropriate platform and processor type.

There is no single best hardware choice. Requirement depends on model size, speed target, energy limits, and budget.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

| Hardware option | Best use case | Strength | Constraint |
| --- | --- | --- | --- |
| Standard laptop (CPU-focused) | Learning, prototyping, small models | Accessible and flexible | Slow for large training tasks |
| Workstation with GPU | Medium-to-large model training | Strong parallel processing | Higher local cost and power draw |
| Cloud GPU/TPU | Large-scale training and deployment | Elastic scaling and specialist hardware on demand | Ongoing provider cost and external dependency |
| Edge device (NPU/ASIC) | Real-time on-device inference | Low latency and reduced data transfer | Limited memory and model size |
| HPC center | Research-scale workloads | Very high compute capability | Access and scheduling constraints |

</div>

### Worked example

<div class="reader-section-body reader-section-body--example">

Deployment choices for three scenarios:

| Scenario | Recommended setup | Reasoning |
| --- | --- | --- |
| Classroom model exploring small datasets | Laptop CPU (optional entry GPU) | Fast setup and sufficient for educational scale |
| School district model retrained monthly on large data | Cloud GPU/TPU | Training bursts need scalable parallel resources |
| Bus route safety model running continuously in vehicles | Edge device with specialized accelerator | Decisions need low-latency local inference even with unstable networks |

A good description explicitly states the workload and then justifies the hardware choice.

</div>


## A4.4.1 Discussing Ethical Implications of ML

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Discuss

The IB expects you to discuss ethical implications in real scenarios. Discussion requires more than one perspective: benefits, risks, and responsibility boundaries.

ML systems influence high-impact decisions in hiring, lending, healthcare, policing, and transport. Ethical quality is therefore part of technical quality.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

| Ethical issue | How it appears in ML practice | Example impact |
| --- | --- | --- |
| Accountability | Unclear responsibility when an automated decision causes harm | Disputes over who is liable in autonomous-vehicle incidents |
| Fairness and bias | Historical data patterns embed social bias | Hiring systems disadvantaging underrepresented groups |
| Consent | Data used without informed permission | Health or platform data reused for model training |
| Privacy | Models infer sensitive traits from behavioral traces | De-anonymization of users from location/activity data |
| Security | Models exposed to adversarial manipulation or data leaks | Compromised model outputs in critical services |
| Environmental cost | Large-scale training consumes significant energy | Increased electricity demand from compute-intensive systems |

</div>

### Worked example

<div class="reader-section-body reader-section-body--example">

Case: automated recruitment screening.

- Benefit: faster processing of high application volumes.
- Risk: model learns historical hiring bias and filters qualified applicants unfairly.
- Accountability question: employer, model vendor, and data pipeline team all influence the outcome.

A defensible ethical response includes:
1. bias audits on training and output,
2. transparent decision criteria for appeal,
3. human review for high-impact rejection decisions.

That is a discussion, not a one-sided statement.

</div>


## A4.4.2 Discussing Ethics of Increasing Tech Integration

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Discuss

The IB expects you to discuss how ethics changes as technology becomes embedded in everyday life. Your answer should show that ethical rules must be revisited as capabilities and social impact evolve.

As integration increases, systems move from optional tools to continuous infrastructure affecting identity, privacy, and agency.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

| Integration area | Opportunity | Ethical tension |
| --- | --- | --- |
| Pervasive AI services | Personalized support and automation | Continuous surveillance and data extraction risk |
| AR/VR environments | Rich learning and simulation | Manipulation of perception and behavioral tracking |
| Public-space analytics | Better traffic/safety planning | Consent and proportionality in monitoring citizens |
| Personalized feeds and recommendations | Relevance and engagement | Filter bubbles, manipulation, and uneven information exposure |

Discussion should balance utility with rights: convenience does not remove obligations around consent, transparency, and fairness.

</div>

### Worked example

<div class="reader-section-body reader-section-body--example">

Case: city-scale AI integration for transport, policing, and citizen apps.

A strong discussion includes competing viewpoints:
- Public-service case: faster response times and improved infrastructure planning.
- Rights-based case: expanded surveillance footprint and unclear long-term data ownership.

Ethical reassessment cycle:
1. deploy with explicit scope,
2. monitor harms and unintended effects,
3. revise policy, data practices, and technical controls,
4. repeat as systems and social context change.

</div>
