# Source Map: HL Unit 7 - ML Preprocessing & Math

## Scope
- Level: HL
- Unit: 7
- Unit name: ML Preprocessing & Math
- Source policy: ib_content_md_first
- Out-of-scope rule: all non-mapped syllabus points are excluded.

## Mapped Subtopics
- A4.2.1: Data Cleaning (Imputation)
- A4.2.4: Scaling & Encoding
- A4.3.1: Linear Regression
- A4.3.3: Optimization (Gradient Descent)

## Source Files Used
- docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf
- docs/content/ib-content/IB_Content_MD/HL/Unit_A4_Structure_HL_Expanded.md.pdf
- docs/content/ib-content/Unit Plans/HL/Unit Plan_ HL Unit 7 - ML Preprocessing & Math (A4.2, A4.3).docx (unit plan context)

## Evidence Fragments
### A4.2.1 — Data Cleaning (Imputation)
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
intelligence.

A3.4.4   Distributed databases         Describe features of
                                       distributed databases.

A4.2.1   Data Cleaning                 Describe the significance
                                       of data cleaning.

A4.2.2   Feature Selection             Describe the role of
                                       feature selection.

A4.2.3   Dimensionality Reduction      Describe the importance
                                       of dimensionality
                                       reduction.
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_A4_Structure_HL_Expanded.md.pdf`
```text
Syllabus Point                 Command Term                   Student Expectation (The
                                                               "Do")


 A4.2.1                         Describe                       Describe Data Cleaning:
                                                               Handling Outliers, Missing
                                                               Data (Imputation/Deletion),
                                                               Duplicates, and
                                                               Normalization (Scaling).

 A4.2.2                         Describe                       Describe Feature Selection:
                                                               Filter, Wrapper, and
                                                               Embedded methods to
```

### A4.2.4 — Scaling & Encoding
- No direct code match found in selected IB_Content_MD PDFs. Use mapped unit-plan wording and bounded chapter references if needed.

### A4.3.1 — Linear Regression
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
A4.2.3   Dimensionality Reduction      Describe the importance
                                       of dimensionality
                                       reduction.

A4.3.1   Linear Regression             Explain how linear
                                       regression predicts
                                       continuous outcomes.

A4.3.2   Classification (Supervised)   Explain how classification
                                      techniques predict
                                      categorical outcomes.

A4.3.3    Hyperparameter Tuning       Explain role of
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_A4_Structure_HL_Expanded.md.pdf`
```text
Reduction: Reducing
                                                               variables to avoid the
                                                               Curse of Dimensionality
                                                               (Overfitting, sparsity).

 A4.3.1                         Explain                        Explain Linear Regression:
                                                               Predicting continuous
                                                               outcomes using the line of

                                                               best fit (            ).

                                                               Evaluation:   .

 A4.3.2                         Explain                        Explain Classification:
```

### A4.3.3 — Optimization (Gradient Descent)
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
A4.3.2   Classification (Supervised)   Explain how classification
                                      techniques predict
                                      categorical outcomes.

A4.3.3    Hyperparameter Tuning       Explain role of
                                      hyperparameter tuning in
                                      evaluation.

A4.3.4    Clustering (Unsupervised)   Describe how clustering
                                      groups data based on
                                      similarities.

A4.3.5    Association Rules           Describe how association
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_A4_Structure_HL_Expanded.md.pdf`
```text
K-Nearest Neighbours
                                                               (K-NN) (voting based on
                                                               distance) and Decision
                    Trees.

A4.3.3   Explain    Explain Hyperparameter
                    Tuning: Optimizing model
                    settings (e.g., k in K-NN).
                    Evaluation: Accuracy,
                    Precision, Recall, F1 Score.

A4.3.4   Describe   Describe Clustering:
                    Grouping data by feature
                    similarity (Unsupervised).
```

## Unit Plan Extract (Context)
```text
Unit Plan: HL Unit 7 - ML Preprocessing & Math (A4.2, A4.3)
Subject: IB Computer Science (First Assessment 2027)
Grade: Year 13 (HL Only)
Duration: 5 Weeks (10 HL Lessons)
Theme: Theme A: Concepts of Computer Science
Unit Foundation
Concepts
The unit focuses on Data Fidelity and Mathematical Modelling. It explores the critical phase where raw data is transformed into a usable format and the mathematical principles that allow machines to predict continuous values. Key themes include Feature Engineering, Dimensionality Reduction, and Statistical Optimisation.
Content
	•	A4.2.1: Data Cleaning: Methods for handling missing values (Imputation vs. Deletion), removing duplicates, and managing outliers/noise.
	•	A4.2.2: Feature Selection & Engineering: Identifying relevant predictors to reduce overfitting and improve model performance.
	•	A4.2.3: Dimensionality Reduction: Reducing the number of input variables while preserving essential information.
	•	A4.2.4: Scaling & Encoding: Normalisation, Standardisation, and handling categorical data (One-hot encoding).
	•	A4.3.1: Linear Regression: Principles of predicting continuous outcomes using a best-fit line ($y = mx + c$).
	•	A4.3.2: Cost Functions: Understanding Mean Squared Error (MSE) and how it quantifies prediction accuracy.
	•	A4.3.3: Optimisation: Conceptual overview of Gradient Descent to minimise the cost function.
Skills for Learning
	•	Thinking Skills: Evaluating the impact of "noisy" data on model bias and variance.
	•	Self-management Skills: Systematically following a preprocessing pipeline to ensure data integrity.
Approaches to Teaching
	•	Problem-based: Cleaning a "messy" real-world dataset (e.g., housing prices with missing entries) before attempting to model it.
	•	Visualisation: Using scatter plots to manually estimate a line of best fit before applying the Linear Regression algorithm.
	•	Incremental: Moving from simple 1D datasets to multi-feature data requiring dimensionality reduction.
Terminology
Preprocessing, Imputation, Outlier, Noise, Feature Selection, Dimensionality Reduction, Normalisation, Standardisation, One-hot Encoding, Linear Regression, Cost Function, Mean Squared Error (MSE), Gradient Descent, Overfitting.
Misconceptions
	•	More Data is Better: Believing all data is useful; students must understand that irrelevant features (noise) can degrade model performance.
	•	Cleaning as a One-off: Viewing cleaning as the first step only, rather than an iterative process throughout model development.
	•	Linearity: Assuming all relationships in nature are linear; identifying when Linear Regression is an inappropriate model.
Adaptive Strategies
	•	Visual Preprocessing: Use colour-coded spreadsheets to highlight missing data vs. outliers.
	•	Math Scaffolding: For students struggling with the $y=mx+c$ logic, use physical "Best-fit" string activities on physical scatter plots.
	•	ADHD-Aware Structure: Use a clear "Cleaning Checklist" (Duplicates -> Missing -> Outliers -> Scaling) to prevent skipping critical steps.
TOK Connections
	•	Bias in Selection: When we perform "Feature Selection," who decides what is "irrelevant"? Does our own bias in selecting data features influence the "truth" the model discovers?
	•	Simplification vs. Reality: Dimensionality reduction simplifies reality. Does this abstraction make our knowledge more useful, or just less accurate?
IBO Learner Profile
	•	Thinkers: Critically assessing the statistical validity of an ML model's predictions.
	•	Reflective: Evaluating how preprocessing choices (like imputation) might introduce unintended bias into a system.
CAS Connections
	•	Service: Helping a local charity or school department clean and organise their historical data to make it "ML-ready" for future forecasting.
Learning Overview (Lesson-by-Lesson)
Lesson
Core Knowledge
Description
Homework Opportunities
Assessment / Feedback
Number of Lessons
1-2
Data Cleaning
Handling missing values, noise, and outliers. Impact of "Garbage In, Garbage Out."
HW 1: Identify 3 common types of "noise" in a sensor-based dataset.
Lab Feedback: Cleaning a provided CSV with 15% missing data.
2
3
Feature Engineering
Selecting relevant features. One-hot encoding for categorical data.
HW 2: Research "Multicollinearity" and why it matters for feature selection.
Peer Review: Justifying the removal of specific features in a scenario.
1
4
Scaling & Standardisation
Normalising data ranges. Why models fail when features have vastly different scales.
N/A
Practical: Comparing model results on raw vs. scaled data.
1
5
Dimensionality Reduction
Concepts of simplifying complex data while retaining variance.
HW 3: Find a real-world example where PCA or dimensionality reduction is used (e.g., facial recognition).
Mid-Unit Quiz: Identifying preprocessing steps for 3 scenarios.
1
6-7
Linear Regression Math
Calculating the line of best fit ($y = mx + c$). Predicting continuous values.
HW 4: Solve 5 manual linear regression prediction problems.
Blackboard Trace: Ca
```
