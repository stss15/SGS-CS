---
level: hl
unitNumber: 9
unitName: Agents & Neural Computing
summary: Revise Agents & Neural Computing with source-bounded coverage of A4.3.8, A4.3.9, A4.3.10, and A4.3.11, focusing on ANN structure, CNN image processing, model selection trade-offs, and vision-focused deployment reasoning.
subtopics:
  - code: A4.3.8
    title: Artificial Neural Networks (ANNs)
  - code: A4.3.9
    title: Convolutional Neural Networks (CNNs)
  - code: A4.3.10
    title: Model Selection
  - code: A4.3.11
    title: CNNs for Vision Systems
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| neuron (perceptron) | Computational unit that combines weighted inputs, bias, and activation function output. |
| hidden layer | Intermediate ANN layer learning internal feature representations. |
| weight | Parameter controlling influence of one input on neuron output. |
| bias | Offset term that shifts activation threshold. |
| activation function | Nonlinear function applied to neuron input sum. |
| convolution | Sliding filter operation extracting local spatial features from an image. |
| kernel/filter | Small matrix used in convolution to detect features such as edges/textures. |
| pooling | Down-sampling operation reducing feature map size while preserving strong signals. |
| model selection | Choosing algorithm based on data shape, constraints, and performance metrics. |
| inference latency | Time taken by trained model to produce one prediction. |

## A4.3.8 Artificial Neural Networks (ANNs)

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Outline

An outline gives structure and purpose without full training derivation.

| ANN part | Function |
| --- | --- |
| Input layer | Receives feature values |
| Hidden layers | Transform features into learned representations |
| Output layer | Produces final prediction |
| Weights and bias | Control contribution and threshold behavior |

ANNs are useful when relationships are nonlinear and feature interactions are complex.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

For credit-risk prediction, engineered features (income ratio, repayment history, utilization) are fed to an ANN.

Hidden layers combine these inputs into latent patterns that are often difficult to model with one linear equation.

</div>

### Worked example: single-neuron forward pass

<div class="reader-section-body reader-section-body--example">

Inputs: `x1=0.6`, `x2=0.2`, weights: `w1=1.4`, `w2=-0.5`, bias `b=0.1`

Linear sum:

`z = (0.6 * 1.4) + (0.2 * -0.5) + 0.1 = 0.84`

Using sigmoid activation:

`output = 1 / (1 + e^-0.84) ≈ 0.70`

This is one forward calculation in a network; deeper ANNs repeat this pattern across many neurons/layers.

</div>

## A4.3.9 Convolutional Neural Networks (CNNs)

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

CNN descriptions should identify spatial feature extraction pipeline.

| Layer type | Role |
| --- | --- |
| Convolution layer | Detects local patterns (edges, textures, shapes) |
| Activation layer | Adds nonlinearity |
| Pooling layer | Reduces dimension and noise sensitivity |
| Dense/output layer | Maps extracted features to final class/probability |

CNNs preserve local spatial structure better than flatten-first ANN pipelines.

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

| Misconception | Correction |
| --- | --- |
| "Convolution and pooling are identical." | Convolution extracts features; pooling compresses feature maps. |
| "CNNs only detect full objects at first layer." | Early layers usually detect simple local patterns first. |
| "More layers always improves accuracy." | Deeper models can overfit or exceed compute limits without proper tuning. |

</div>

### Worked example: 3x3 filter on a 5x5 image patch

<div class="reader-section-body reader-section-body--example">

Given 3x3 filter emphasizing vertical edges:

```text
[ 1  0 -1 ]
[ 1  0 -1 ]
[ 1  0 -1 ]
```

Applied over one 3x3 region of pixel intensities:

```text
[ 9  3  1 ]
[ 8  2  1 ]
[ 7  2  1 ]
```

Convolution output for that region:

`(9+8+7) - (1+1+1) = 21`

Large positive value indicates a strong vertical edge signal in that local patch.

</div>

## A4.3.10 Model Selection

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

Model selection explanation links algorithm choice to constraints and objectives.

| Selection factor | Questions to answer |
| --- | --- |
| Data size and type | Is data tabular, temporal, image, text, mixed? |
| Accuracy target | What error level is acceptable? |
| Inference latency | How fast must predictions be? |
| Compute budget | What training/deployment hardware is available? |
| Explainability | Is transparent reasoning required? |

Good selection balances performance quality and operational feasibility.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

A hospital triage assistant may prefer a slightly less accurate but explainable model for legal and clinical review.

A camera-based defect detector on a manufacturing line may prioritize fast, high-accuracy CNN inference with GPU acceleration.

Model choice is context-sensitive, not a leaderboard-only decision.

</div>

### Worked example: choose between three candidates

<div class="reader-section-body reader-section-body--example">

| Model | Validation accuracy | Inference latency | Explainability |
| --- | --- | --- | --- |
| Linear model | 0.86 | 2 ms | High |
| Tree ensemble | 0.91 | 9 ms | Medium |
| CNN | 0.95 | 38 ms | Low |

Deployment requirement: mobile app must respond under 15 ms.

Bounded choice: tree ensemble best satisfies both quality and latency constraints; CNN exceeds latency budget despite higher raw accuracy.

</div>

## A4.3.11 CNNs for Vision Systems

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

In vision systems, CNN pipelines must connect feature extraction to real deployment constraints such as scale, lighting variation, and inference speed.

| Vision stage | CNN contribution |
| --- | --- |
| Early feature extraction | Edges and textures |
| Mid-level representation | Shapes and parts |
| High-level representation | Object/category-specific patterns |

Explanation quality improves when spatial hierarchy is connected to final system behavior.

</div>

### In real systems

<div class="reader-section-body reader-section-body--apply">

A traffic-camera vision system must classify vehicles under rain, glare, and partial occlusion.

CNN robustness depends on training diversity and preprocessing consistency. If deployment conditions shift heavily from training data, accuracy can drop even with a strong architecture.

</div>

### Worked example: confusion snapshot for road-sign model

<div class="reader-section-body reader-section-body--example">

Validation set of 1,000 images:

| Class | True count | Correct predictions |
| --- | --- | --- |
| Speed limit signs | 400 | 372 |
| Stop signs | 300 | 291 |
| Yield signs | 300 | 258 |

Overall accuracy: `(372 + 291 + 258) / 1000 = 0.921`

Yield signs under low-light conditions produced most errors. This indicates where data expansion and augmentation should focus for deployment readiness.

</div>
