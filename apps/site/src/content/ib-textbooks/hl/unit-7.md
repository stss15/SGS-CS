---
level: hl
unitNumber: 7
unitName: ML Preprocessing & Math
summary: Revise ML Preprocessing & Math with source-bounded coverage of A4.2.1, A4.2.4, A4.3.1, and A4.3.3, emphasizing data quality, feature preparation, regression mechanics, and tuning trade-offs.
subtopics:
  - code: A4.2.1
    title: Data Cleaning
  - code: A4.2.4
    title: Scaling and Encoding
  - code: A4.3.1
    title: Linear Regression
  - code: A4.3.3
    title: Hyperparameter Tuning
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| imputation | Replacing missing values with estimated values (for example mean/median). |
| outlier | Data point that is far from the rest of the distribution. |
| normalization | Scaling values to a fixed range, commonly 0 to 1. |
| standardization | Rescaling values to zero mean and unit variance. |
| one-hot encoding | Representing categories as binary indicator columns. |
| linear regression | Model predicting a continuous value with a linear function of inputs. |
| residual | Difference between actual value and predicted value. |
| mean squared error (MSE) | Average squared residual used as a regression error metric. |
| hyperparameter | Model configuration chosen before training (for example `k`, max depth, learning rate). |
| overfitting | Model captures noise and performs poorly on unseen data. |

## A4.2.1 Data Cleaning

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

Data cleaning description should cover why quality defects directly affect model behavior.

| Data issue | Typical handling approach |
| --- | --- |
| Missing values | Imputation or row removal |
| Duplicates | Deduplicate repeated records |
| Outliers | Investigate, cap, transform, or remove if invalid |
| Inconsistent formats | Normalize units/date formats before modeling |

Dirty inputs produce unstable patterns, regardless of algorithm sophistication.

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

| Misconception | Accurate view |
| --- | --- |
| "More rows always helps." | Low-quality rows can reduce model reliability. |
| "Imputation is always neutral." | Imputation changes distribution and can introduce bias. |
| "Cleaning is one step at the start." | Cleaning is iterative across data updates and validation cycles. |

</div>

### Worked example: cleaning a small housing dataset

<div class="reader-section-body reader-section-body--example">

Raw rows (`size_m2`, `price_k`):

| row | size_m2 | price_k |
| --- | --- | --- |
| 1 | 60 | 220 |
| 2 | 75 | 260 |
| 3 | 75 | 260 |
| 4 | 90 |  |
| 5 | 4000 | 950 |

Cleaning decisions:

- Row 3 removed as duplicate of row 2.
- Row 4 `price_k` imputed with median (`260`).
- Row 5 flagged as likely outlier for typical urban apartment scope.

Result: model training sees more consistent signal and lower variance from erroneous extremes.

</div>

## A4.2.4 Scaling and Encoding

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Apply

Applying scaling/encoding means performing concrete transformations that make features numerically compatible for model training.

| Transformation | When useful |
| --- | --- |
| Normalization (`0..1`) | Features with bounded interpretation |
| Standardization (z-score) | Features with different units/scales |
| One-hot encoding | Categorical fields such as city/type |

These steps change representation, not the real-world meaning of the data.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

Suppose a model uses features `age` (years), `salary` (USD), and `department` (category).

- Without scaling, large salary values dominate distance-based algorithms.
- Without encoding, category labels cannot be interpreted numerically in a meaningful way.

Correct application keeps each feature usable without distorting relationships.

</div>

### Worked example: concrete feature transformation

<div class="reader-section-body reader-section-body--example">

```python
# Raw values
age = [20, 40, 60]
salary = [30000, 80000, 130000]
team = ["sales", "engineering", "sales"]

# Simple normalization example for age
age_norm = [(x - 20) / (60 - 20) for x in age]  # [0.0, 0.5, 1.0]
```

One-hot encoding for `team`:

| team | sales | engineering |
| --- | --- | --- |
| sales | 1 | 0 |
| engineering | 0 | 1 |
| sales | 1 | 0 |

</div>

## A4.3.1 Linear Regression

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

Linear regression explains continuous prediction using a line (or hyperplane) fitted to data.

For one feature:

`prediction = b0 + b1 * x`

| Component | Meaning |
| --- | --- |
| `b0` | Intercept |
| `b1` | Slope (effect of one-unit increase in `x`) |
| residual | `actual - predicted` |

Explain not only formula but also fit quality and residual behavior.

</div>

### In real systems

<div class="reader-section-body reader-section-body--apply">

Linear regression is suitable when relationship is approximately linear and prediction target is numeric (for example energy demand, price estimate, temperature).

It is less suitable when relationships are strongly nonlinear unless feature engineering transforms the input space.

</div>

### Worked example: predict rent from floor area

<div class="reader-section-body reader-section-body--example">

Given fitted model:

`rent = 350 + 12 * area_m2`

| area_m2 | predicted rent |
| --- | --- |
| 40 | 830 |
| 55 | 1010 |
| 70 | 1190 |

If actual rent for `55 m2` is `980`, residual is `980 - 1010 = -30`.

A large pattern of residuals can indicate model mismatch or missing features.

</div>

## A4.3.3 Hyperparameter Tuning

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

Hyperparameter tuning explains how pre-training settings influence generalization.

| Hyperparameter example | Effect |
| --- | --- |
| `k` in K-NN | Small `k` can overfit; large `k` can oversmooth boundaries |
| tree depth | Deep trees can memorize noise |
| learning rate | Too high may diverge; too low may converge too slowly |

Good tuning balances bias and variance rather than maximizing one metric blindly.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

Use validation data to compare settings with multiple metrics:

- Accuracy alone can hide minority-class failure.
- Precision and recall expose different error costs.
- F1 balances precision and recall for asymmetric problems.

Explanation quality improves when metric choice is justified by problem risk.

</div>

### Worked example: selecting `k` for K-NN

<div class="reader-section-body reader-section-body--example">

Validation results on the same dataset:

| k | accuracy | precision | recall | F1 |
| --- | --- | --- | --- | --- |
| 1 | 0.94 | 0.90 | 0.71 | 0.79 |
| 5 | 0.92 | 0.86 | 0.83 | 0.84 |
| 15 | 0.88 | 0.81 | 0.76 | 0.78 |

Even though `k=1` has the highest accuracy, `k=5` gives stronger balance by improving recall and F1.

</div>
