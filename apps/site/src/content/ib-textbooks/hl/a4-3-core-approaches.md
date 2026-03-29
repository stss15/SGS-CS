---
level: hl
unitNumber: 55
unitName: Core Supervised and Unsupervised Approaches
summary: Core machine-learning approaches used to predict values, classify outcomes, cluster data, and uncover associations in large datasets.
subtopics:
  - code: A4.3.1
    title: Linear regression
  - code: A4.3.2
    title: Classification techniques
  - code: A4.3.3
    title: Hyperparameter tuning
  - code: A4.3.4
    title: Clustering techniques
  - code: A4.3.5
    title: Association rule learning
sourcePolicy: ib_content_md_first
---

## A4.3.1 Linear regression

<span data-def="A supervised learning technique that models the relationship between input variables and a continuous output by fitting a line or curve that best describes the data.">Linear regression</span> is used when the output is a continuous value rather than a category. The model learns a line of best fit from training data and then uses that line to estimate outputs for new inputs.

In the simplest case, the model chooses a straight line that keeps the prediction errors as small as possible overall. The difference between an actual value and the predicted value is called a residual.

### Why it is useful

Linear regression is valuable when the output changes in a broadly predictable way. Examples include:

- predicting house prices from floor area and location,
- estimating fuel consumption from distance and speed,
- forecasting sales from advertising spend,
- estimating temperature from time of day and season.

The model does not need the real-world relationship to be perfectly linear in every case. It needs to capture a useful approximation that lets it predict reasonably well.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing predictions and residuals</p>
  <div class="ib-textbook-worked__body">
    <p>Suppose a school is using study hours to predict a test score. A fitted line gives the following predictions:</p>
    <table>
      <tr><th>Study hours</th><th>Actual score</th><th>Predicted score</th><th>Residual</th></tr>
      <tr><td>1</td><td>52</td><td>53</td><td>-1</td></tr>
      <tr><td>2</td><td>58</td><td>57</td><td>+1</td></tr>
      <tr><td>3</td><td>61</td><td>61</td><td>0</td></tr>
      <tr><td>4</td><td>69</td><td>65</td><td>+4</td></tr>
    </table>
    <p>A negative residual means the prediction was slightly too high. A positive residual means the line underpredicted the real score. In this small example, the line captures the general upward trend, but the large residual at four study hours suggests the fit is not perfect.</p>
    <p>This is why linear regression is described as a best fit, not an exact rule for every point.</p>
  </div>
</div>

### What the model is doing

The model is not memorising individual examples. It is finding a mathematical relationship that summarises the trend in the data. That makes it useful for forecasting, provided the new data is similar enough to the data on which the model was trained.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">What to say in an explanation</p>
  <p class="ib-textbook-note__body">For linear regression, mention that it predicts a continuous outcome, uses a line of best fit, and bases the prediction on the relationship learned from training data. A strong answer also notes that the model works best when the trend is genuinely continuous and not just random.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.3.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Linear regression predicts continuous outcomes.</li>
      <li>It fits a line or curve that best matches the training data.</li>
      <li>Residuals show the difference between actual and predicted values.</li>
    </ul>
  </div>
</div>


## A4.3.2 Classification techniques in supervised learning

Classification is the supervised-learning task of assigning an input to a discrete category. Unlike linear regression, which predicts a number, classification predicts a label.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Classification</p>
  <p class="ib-textbook-defn__body">A supervised learning method that maps inputs to named categories such as spam/not spam, fraud/not fraud, or pass/fail.</p>
</div>

### Decision boundaries

Classification works by learning a boundary between classes. In a simple two-class problem, the boundary may be a line. In more complex problems, it may be a curved or multi-dimensional surface. When a new example arrives, the model checks which side of the boundary it falls on.

### Common examples

| Application | Output classes |
|---|---|
| Email filtering | Spam / not spam |
| Medical triage | High risk / low risk |
| Image recognition | Cat / dog / car / bicycle |
| Bank fraud detection | Fraudulent / legitimate |
| Student support system | Needs intervention / does not need intervention |

Different algorithms can perform classification, but the core idea stays the same: the model uses labelled examples to learn how to separate categories.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Do not confuse this with clustering</p>
  <p class="ib-textbook-warning__body">Classification uses labelled data and predicts a known set of categories. Clustering uses unlabelled data and tries to discover groups that were not provided in advance.</p>
</div>

### Why classification matters

Classification is one of the most common machine-learning tasks because many real-world decisions are categorical. The result is often a yes/no decision, a class label, or a ranked likelihood that an item belongs to a category.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Turning labelled examples into a class decision</p>
  <div class="ib-textbook-worked__body">
    <p>Suppose a school trains a model using two features: attendance and missed homework. Past students are labelled either <code>needs intervention</code> or <code>does not need intervention</code>.</p>
    <table>
      <tr><th>Attendance</th><th>Missed homework</th><th>Label</th></tr>
      <tr><td>96%</td><td>0</td><td>Does not need intervention</td></tr>
      <tr><td>93%</td><td>1</td><td>Does not need intervention</td></tr>
      <tr><td>78%</td><td>6</td><td>Needs intervention</td></tr>
      <tr><td>74%</td><td>8</td><td>Needs intervention</td></tr>
    </table>
    <p>A new student with 76% attendance and 7 missed homework tasks is placed on the side of the learned decision boundary that corresponds to <code>needs intervention</code>. That is classification in action: the model uses labelled examples to decide which category best fits the new case.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.3.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Classification predicts discrete categories rather than continuous values.</li>
      <li>It uses labelled training data and learns decision boundaries.</li>
      <li>It is appropriate for tasks such as spam detection, fraud detection, and image labelling.</li>
    </ul>
  </div>
</div>


## A4.3.3 Hyperparameter tuning

<span data-def="The process of adjusting model settings that are chosen before training starts, in order to improve performance on unseen data.">Hyperparameter tuning</span> is the process of choosing the best values for a model’s settings. A hyperparameter is not learned directly from the data in the same way as weights or coefficients. It is a control setting that influences how the learning algorithm behaves.

### Parameter versus hyperparameter

| Term | Meaning |
|---|---|
| Parameter | A value learned from the data during training |
| Hyperparameter | A value chosen by the designer before or during training to control the learning process |

Examples of hyperparameters include the learning rate, the depth of a decision tree, the number of clusters in k-means, and the number of hidden layers in a neural network.

### Why tuning matters

A model can be trained with the same data and still behave very differently depending on its hyperparameters. If the settings are too restrictive, the model may underfit and miss the pattern in the data. If they are too flexible, the model may overfit and perform well on the training set but poorly on new data.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Evaluation is the key idea</p>
  <p class="ib-textbook-note__body">Tuning is part of model evaluation because the goal is not to make the training score look impressive. The goal is to find settings that generalise. A model should be judged on validation or test data, not just on the examples it has already seen.</p>
</div>

### Common tuning strategies

| Strategy | Description | Strength |
|---|---|---|
| Manual tuning | Change one setting at a time and observe the result | Simple, but slow |
| Grid search | Test every combination from a defined list of values | Thorough, but expensive |
| Random search | Sample combinations at random | Often cheaper and surprisingly effective |

### A practical interpretation

Imagine a classifier that detects whether a transaction is fraudulent. A shallow decision tree may miss important patterns, while a very deep tree may memorise noise. Hyperparameter tuning helps identify a balance that gives reliable predictions on new transactions rather than just perfect results on the training sample.

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.3.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Hyperparameters are settings chosen to control how a model learns.</li>
      <li>Tuning improves the chance that the model generalises beyond the training data.</li>
      <li>Good tuning compares models using validation or test data, not only training performance.</li>
    </ul>
  </div>
</div>


## A4.3.4 Clustering techniques in unsupervised learning

<span data-def="An unsupervised learning method that groups data points according to similarity so that items within the same group are more alike than items in different groups.">Clustering</span> groups data points based on similarity. Because the data is unlabelled, the algorithm does not know the correct answer in advance. It must discover a useful grouping by analysing the structure in the dataset.

### How clustering works

The exact method depends on the algorithm, but the core idea is the same: similar items end up in the same cluster. In k-means, for example, the algorithm places points around centroids and repeatedly adjusts the centroids until the clusters stabilise.

| Step | What happens |
|---|---|
| 1 | Choose how many groups are needed, if the algorithm requires it |
| 2 | Measure similarity or distance between data points |
| 3 | Assign points to the nearest cluster or group |
| 4 | Update cluster representatives |
| 5 | Repeat until the groups stop changing much |

### Where clustering is used

- grouping customers with similar buying behaviour,
- organising documents by topic,
- identifying unusual data points that do not fit any group,
- compressing a large dataset into manageable regions for analysis.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Customer segmentation</p>
  <div class="ib-textbook-worked__body">
    <p>An online store wants to group customers by behaviour. The dataset includes average spend, number of visits, and product categories purchased.</p>
    <p>The clustering algorithm may produce one group of frequent low-spend customers, another of infrequent high-spend customers, and a third of seasonal shoppers. The store can then tailor promotions to each group.</p>
    <p>The clusters are not pre-labelled by the system. They emerge from the similarities in the feature values.</p>
  </div>
</div>

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Why clustering is different</p>
  <p class="ib-textbook-note__body">Clustering does not try to predict a known label. It tries to reveal structure. That makes it valuable for exploration, data compression, and discovery when the categories are not already known.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.3.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Clustering is an unsupervised method that groups similar items together.</li>
      <li>It is used when the data has no labels and the goal is discovery.</li>
      <li>Customer segmentation, document grouping, and anomaly discovery are common applications.</li>
    </ul>
  </div>
</div>


## A4.3.5 Association rule learning

Association rule learning looks for co-occurrence in large datasets. It is used when the aim is to discover that certain items, attributes, or events tend to appear together more often than expected.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Association rule learning</p>
  <p class="ib-textbook-defn__body">A machine-learning approach that finds patterns of co-occurrence, often written as rules such as “if item A appears, item B is also likely to appear.”</p>
</div>

### How the rules are interpreted

The classic use case is market basket analysis. A supermarket may discover that customers who buy pasta also often buy sauce, or that people who buy a printer often buy ink. The rule is not causal by itself. It describes a repeated association in the data.

Three terms are central:

- **support**: the proportion of all records that contain the itemset
- **confidence**: how often the consequent appears when the antecedent appears
- **lift**: how much more likely the consequent is, compared with its baseline frequency in the full dataset

### Why it matters

Association rules help businesses identify cross-selling opportunities, plan product placement, and understand purchasing behaviour. They are also used in recommendation systems and in analysing large logs where hidden relationships may matter.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Calculating support, confidence, and lift</p>
  <div class="ib-textbook-worked__body">
    <p>Suppose a shop analyses 10 baskets:</p>
    <p>In 7 baskets, customers buy pasta. In 6 baskets, customers buy sauce. In 5 baskets, they buy both pasta and sauce.</p>
    <p>For the rule <code>pasta → sauce</code>:</p>
    <ul>
      <li><strong>Support</strong> = 5 / 10 = 0.50. Half of all baskets contain both items.</li>
      <li><strong>Confidence</strong> = 5 / 7 ≈ 0.71. If a customer buys pasta, there is about a 71% chance that sauce is also in the basket.</li>
      <li><strong>Lift</strong> = 0.71 / 0.60 ≈ 1.18. Customers who buy pasta are about 1.18 times as likely to buy sauce as a randomly chosen customer.</li>
    </ul>
    <p>A lift above 1 suggests a positive association. The rule may therefore be useful for recommendation or store-layout decisions.</p>
  </div>
</div>

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Correlation is not causation</p>
  <p class="ib-textbook-warning__body">Association rules show co-occurrence, not proof that one item causes the other. A strong rule may still be driven by a hidden factor, so the result must be interpreted carefully.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.3.5</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Association rule learning finds items or attributes that appear together frequently.</li>
      <li>Support, confidence, and lift help describe the strength of a rule.</li>
      <li>The technique is common in market basket analysis and recommendation-style analysis.</li>
    </ul>
  </div>
</div>
