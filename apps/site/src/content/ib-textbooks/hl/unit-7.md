---
level: hl
unitNumber: 7
unitName: ML Preprocessing & Math
summary: Revise ML Preprocessing & Math with exam-focused coverage of A4.2.1, A4.2.4, A4.3.1, A4.3.3, including exact command-term expectations and applied examples.
subtopics:
  - code: A4.2.1
    title: Data Cleaning
  - code: A4.2.4
    title: Scaling and encoding
  - code: A4.3.1
    title: Linear Regression
  - code: A4.3.3
    title: Hyperparameter Tuning
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| machine learning | Methods that learn patterns from data to make predictions or decisions. |
| feature | An input variable used by a model. |
| data cleaning | Preparing data by fixing errors, inconsistencies, or missing values. |
| classification | Predicting a category label from input data. |
| clustering | Grouping similar data points without predefined labels. |
| hyperparameter | A model setting chosen before training that influences behavior. |
| neural network | A layered model that learns weighted transformations from data. |
| bias | Systematic skew that can affect data, models, or decisions. |

## A4.2.1 Data Cleaning

### Required response

> **Command term:** Describe
>
> Describe the significance of data cleaning.

### What this means

For this syllabus point, focus on using data cleaning accurately in context. Connect it to machine-learning workflow, model behavior, and practical implications. Preprocessing determines whether model input is informative, comparable, and robust to noise.

### System context

- Distinguish training, inference, and evaluation decisions clearly.
- Connect preprocessing choices to model quality and bias risk.
- Use technical evidence when comparing model approaches.

### Compact example

In a real deployment, data cleaning should be justified against at least one clear trade-off (for example speed vs accuracy, throughput vs latency, or security vs usability).

## A4.2.4 Scaling and encoding

### Required response

> **Command term:** Apply
>
> Apply normalization, standardization, and one-hot encoding to prepare data for machine learning.

### What this means

For this syllabus point, focus on using scaling and encoding accurately in context. Connect it to machine-learning workflow, model behavior, and practical implications. Scaling and encoding transform raw data into model-ready numerical representations without changing target meaning.

### System context

- Distinguish training, inference, and evaluation decisions clearly.
- Connect preprocessing choices to model quality and bias risk.
- Use technical evidence when comparing model approaches.

### Compact example

```text
Normalization: scale values to [0,1]
One-hot encoding: convert categories to binary indicator columns
```
Both steps convert heterogeneous raw data into model-compatible numeric features.

## A4.3.1 Linear Regression

### Exam requirement

> **Command term:** Explain
>
> Explain how linear regression predicts continuous outcomes.

### Core understanding

In this part of the unit, you need secure understanding of linear regression. Connect it to machine-learning workflow, model behavior, and practical implications. Regression maps features to continuous outcomes and depends on fit quality and residual behavior.

### In real systems

- Distinguish training, inference, and evaluation decisions clearly.
- Connect preprocessing choices to model quality and bias risk.
- Use technical evidence when comparing model approaches.

### Worked snapshot

```text
prediction = b0 + b1 * x
```
Linear regression estimates a continuous value by fitting a line to observed data.

## A4.3.3 Hyperparameter Tuning

### Required response

> **Command term:** Explain
>
> Explain role of hyperparameter tuning in evaluation.

### What this means

For this syllabus point, focus on using hyperparameter tuning accurately in context. Connect it to machine-learning workflow, model behavior, and practical implications.

### System context

- Distinguish training, inference, and evaluation decisions clearly.
- Connect preprocessing choices to model quality and bias risk.
- Use technical evidence when comparing model approaches.

### Compact example

In a real deployment, hyperparameter tuning should be justified against at least one clear trade-off (for example speed vs accuracy, throughput vs latency, or security vs usability).

