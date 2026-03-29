---
level: hl
unitNumber: 54
unitName: Data Preprocessing
summary: How machine-learning datasets are cleaned, reduced, and refined before training so that models learn from useful information rather than from noise.
subtopics:
  - code: A4.2.1
    title: Significance of data cleaning
  - code: A4.2.2
    title: Role of feature selection
  - code: A4.2.3
    title: Importance of dimensionality reduction
sourcePolicy: ib_content_md_first
---

## A4.2.1 Significance of data cleaning

Data cleaning is the stage where raw data is checked, corrected, and prepared before training begins. Its significance is not cosmetic. A model learns from the patterns present in the training set, so if the training set contains missing values, duplicates, inconsistent formats, or incorrect records, the model may treat those defects as meaningful evidence.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Data cleaning</p>
  <p class="ib-textbook-defn__body">The process of detecting and correcting problems in a dataset so that it becomes accurate, consistent, and suitable for analysis or training.</p>
</div>

### What usually needs cleaning

Several recurring problems appear in raw datasets.

| Problem | Why it matters | Typical response |
|---|---|---|
| Missing values | The model may not be able to interpret empty fields | Remove the record, impute a value, or use a default if that is justified |
| Duplicate records | The model may overweight repeated cases | Remove duplicates so the dataset is not biased |
| Incorrect values | The model learns false patterns from bad input | Correct the record if the true value is known |
| Inconsistent formats | Different spellings or date formats prevent reliable comparison | Standardise the format |
| Outliers | Extreme values may distort training or indicate an error | Investigate, cap, transform, or remove when appropriate |
| Irrelevant data | Unrelated fields add noise and slow training | Remove fields that do not support the task |

Cleaning matters because the model does not know which rows are trustworthy. It will use whatever is present. That is why poor preprocessing often produces poor predictions even when the algorithm itself is appropriate.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Cleaning a student-support dataset</p>
  <div class="ib-textbook-worked__body">
    <p>Suppose a school is building a model to predict whether a student is likely to need extra support.</p>
    <table>
      <tr><th>StudentID</th><th>Attendance</th><th>LateHomework</th><th>NeedsSupport</th><th>Issue</th></tr>
      <tr><td>101</td><td>92%</td><td>4</td><td>Yes</td><td>Valid row</td></tr>
      <tr><td>101</td><td>92%</td><td>4</td><td>Yes</td><td>Duplicate row</td></tr>
      <tr><td>102</td><td></td><td>1</td><td>No</td><td>Missing attendance</td></tr>
      <tr><td>103</td><td>0.87</td><td>-2</td><td>No</td><td>Mixed format and impossible negative count</td></tr>
      <tr><td>104</td><td>95%</td><td>57</td><td>No</td><td>Possible outlier to investigate</td></tr>
    </table>
    <p>The duplicate row for Student 101 should be removed so one student is not counted twice. Student 102's missing attendance value cannot simply be ignored without a decision: the record might be removed, or the value might be imputed if that is justified. Student 103 uses a different attendance format and contains an impossible value for late homework, so the record needs correction or manual checking. Student 104 may represent a genuine extreme case or a data-entry error; that has to be investigated before training.</p>
    <p>After cleaning, the dataset is smaller but more trustworthy. That is the real goal.</p>
  </div>
</div>

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Garbage in, garbage out</p>
  <p class="ib-textbook-warning__body">A model is not magically more reliable than the data it receives. If the training set contains errors, those errors become part of the model’s view of the world. Good preprocessing reduces that risk before training begins.</p>
</div>

### Why cleaning comes first

Cleaning affects both reliability and interpretation:

1. it removes errors that would distort the learned pattern
2. it reduces bias caused by duplicated or badly sampled records
3. it standardises representation so similar cases are treated as similar cases
4. it makes later stages, such as feature selection and dimensionality reduction, more meaningful

A feature-selection method cannot judge relevance properly if the dataset still contains incorrect labels or inconsistent formats. A dimensionality-reduction method cannot compress structure well if the structure itself is corrupted. Cleaning is therefore a prerequisite, not an optional extra.

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.2.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Data cleaning improves the reliability of a dataset before training begins.</li>
      <li>Common issues include missing values, duplicates, incorrect values, inconsistent formats, outliers, and irrelevant data.</li>
      <li>Cleaning matters because poor data leads directly to poor model behaviour.</li>
    </ul>
  </div>
</div>


## A4.2.2 Role of feature selection

<span data-def="The process of choosing the most relevant input variables for a machine-learning model and discarding features that add little value, create noise, or increase complexity unnecessarily.">Feature selection</span> decides which inputs should remain in the training data. A feature is worth keeping only if it contributes useful information about the target. More features do not automatically produce a better model.

Extra features can create noise, increase computational cost, and make the model harder to interpret. In some cases they also make the model less fair, because the feature may act as a weak proxy for something that should not be driving the prediction.

### Why select features?

Feature selection matters for four practical reasons.

| Benefit | Explanation |
|---|---|
| Better generalisation | Removing irrelevant features can reduce overfitting and help the model perform better on new data |
| Lower complexity | Fewer inputs usually mean a simpler model that is easier to train and test |
| Faster processing | Less data to analyse means lower computational cost |
| Better interpretability | It is easier to explain a model when the important inputs are clearer |

### Relevance depends on the task

Relevance is partly statistical and partly contextual. In a model that predicts exam performance, attendance and prior assessment scores may be relevant. Favourite colour is not. In a credit-risk model, income and existing debt may matter, while a customer ID should not.

Feature selection is not value-neutral. The variables chosen determine how the model "sees" the world. A feature such as postcode or zip code may appear useful, but it can also import social or economic bias into the prediction.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Selection is not the same as cleaning</p>
  <p class="ib-textbook-note__body">Cleaning fixes problems in the data itself. Feature selection decides which cleaned attributes should remain in the training set. A dataset can be perfectly clean and still contain too many weak or irrelevant features.</p>
</div>

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Choosing features for a credit-risk model</p>
  <div class="ib-textbook-worked__body">
    <p>A bank wants to predict whether a customer is likely to miss repayments.</p>
    <table>
      <tr><th>Candidate feature</th><th>Keep?</th><th>Reason</th></tr>
      <tr><td>Income</td><td>Usually yes</td><td>Directly related to ability to repay</td></tr>
      <tr><td>Existing debt</td><td>Usually yes</td><td>Relevant to current financial pressure</td></tr>
      <tr><td>Customer ID</td><td>No</td><td>Unique identifier, not a meaningful predictive factor</td></tr>
      <tr><td>Export timestamp</td><td>No</td><td>Administrative detail, not part of the real-world problem</td></tr>
      <tr><td>Postcode</td><td>Use with caution</td><td>May act as a proxy for socio-economic bias rather than a legitimate risk factor</td></tr>
    </table>
    <p>This is the role of feature selection in practice: keep the variables that support the prediction, remove those that add noise, and question those that may be unfairly influential.</p>
  </div>
</div>

### Common approaches

Three broad approaches are commonly described:

- **filter methods**, which rank features using statistical measures
- **wrapper methods**, which test subsets of features against model performance
- **embedded methods**, where selection happens inside the training algorithm itself

At syllabus level, the key point is not to memorise algorithms for selection. It is to understand why selection improves performance, interpretability, and generalisation when it is done well.

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.2.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Feature selection chooses the most relevant inputs for the model.</li>
      <li>It improves speed, interpretability, and generalisation by removing noise and redundancy.</li>
      <li>Good selection depends on the target, the dataset, and the problem context.</li>
    </ul>
  </div>
</div>


## A4.2.3 Importance of dimensionality reduction

<span data-def="The process of reducing the number of variables or dimensions in a dataset while preserving as much useful information as possible.">Dimensionality reduction</span> compresses a dataset into fewer dimensions while trying to keep the important structure. It is related to feature selection, but it is not the same thing. Feature selection keeps some original features and removes others. Dimensionality reduction transforms the data into a smaller representation, often combining many original variables into fewer derived components.

### Why fewer dimensions can be better

High-dimensional data can be difficult for both the model and the human designer.

| Problem with too many dimensions | Result |
|---|---|
| Training takes longer | More computation is required |
| Visualisation becomes difficult | Humans cannot easily interpret very high-dimensional spaces |
| Noise accumulates | Irrelevant information can overwhelm useful patterns |
| Distance measures become less useful | Many algorithms depend on similarity, which becomes less informative as dimensions increase |
| Overfitting risk rises | The model may learn patterns that are specific to the training data rather than general trends |

This is sometimes described as the <span data-def="The tendency for machine-learning performance to degrade as the number of features grows and the available data becomes sparse relative to the number of dimensions.">curse of dimensionality</span>. As the number of dimensions rises, the available data becomes sparser relative to that space, which makes reliable generalisation harder.

### What reduction achieves

Dimensionality reduction is useful when the dataset is too large, too noisy, or too difficult to interpret directly.

1. It can make training faster by reducing the number of values the model must process.
2. It can improve generalisation by removing weak or redundant variation.
3. It can make visual exploration possible, especially when data needs to be plotted in two or three dimensions.
4. It can reveal deeper structure by concentrating the signal into a smaller representation.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Selection versus reduction</p>
  <p class="ib-textbook-note__body">If a dataset contains many weak features, feature selection may be enough. If the useful information is spread across many dimensions, dimensionality reduction can compress that information into fewer derived variables. The two techniques solve related but different problems.</p>
</div>

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Reducing a high-dimensional image dataset</p>
  <div class="ib-textbook-worked__body">
    <p>Imagine a handwritten-digit dataset in which each image is stored as 784 pixel values. Training directly on all 784 inputs may be slow and difficult to visualise. A dimensionality-reduction method can transform those 784 values into a much smaller number of components that still preserve most of the useful variation.</p>
    <p>The result is not just a smaller file. It can mean faster training, easier plotting in two or three dimensions, and a model that is less distracted by tiny pixel-level noise. That said, reduction is a trade-off: if too much information is discarded, the model may perform worse rather than better.</p>
  </div>
</div>

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Reduction is not automatic improvement</p>
  <p class="ib-textbook-warning__body">The goal of dimensionality reduction is simplification, not guaranteed higher accuracy. If the reduced representation removes important structure, the model may lose useful predictive power.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.2.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Dimensionality reduction compresses data into fewer dimensions while preserving useful structure.</li>
      <li>It helps with speed, interpretability, and generalisation.</li>
      <li>It is different from feature selection: selection removes features; reduction transforms them.</li>
      <li>Too many dimensions can increase noise and make learning less reliable.</li>
    </ul>
  </div>
</div>
