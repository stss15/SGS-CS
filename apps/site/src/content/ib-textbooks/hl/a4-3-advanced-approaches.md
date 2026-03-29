---
level: hl
unitNumber: 56
unitName: Advanced Machine Learning Approaches
summary: Reinforcement learning, genetic algorithms, artificial neural networks, convolutional neural networks, and model selection in machine learning.
subtopics:
  - code: A4.3.6
    title: Reinforcement learning
  - code: A4.3.7
    title: Genetic algorithms
  - code: A4.3.8
    title: Artificial neural networks
  - code: A4.3.9
    title: Convolutional neural networks
  - code: A4.3.10
    title: Model selection and comparison
sourcePolicy: ib_content_md_first
---

## A4.3.6 Reinforcement learning

Reinforcement learning is the machine-learning approach where an agent learns by acting in an environment and observing the consequences. The model is not handed the correct answer in advance. Instead, it tries actions, receives feedback in the form of rewards or penalties, and gradually learns which choices lead to better long-term outcomes.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Agent</p>
  <p class="ib-textbook-defn__body">The decision-making entity that performs actions.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Environment</p>
  <p class="ib-textbook-defn__body">The external system the agent interacts with.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Reward</p>
  <p class="ib-textbook-defn__body">The feedback signal that tells the agent whether an action improved or worsened the outcome.</p>
</div>

### Learning through interaction

The agent observes a state, chooses an action, receives a reward, and then updates its strategy. Over time it builds a policy: a rule for choosing actions in different situations. A major challenge is balancing exploration and exploitation. The agent must sometimes try new actions to discover better strategies, but it must also use what it already knows to avoid unnecessary loss.

### Typical applications

- game-playing systems,
- robotics and navigation,
- resource allocation,
- adaptive control systems,
- traffic signal optimisation.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Robot vacuum cleaner</p>
  <div class="ib-textbook-worked__body">
    <p>A robot vacuum learns how to clean a room efficiently. If it follows a route that covers more floor space with less battery use, it receives a higher reward. If it gets stuck or wastes time revisiting the same area, it receives a lower reward.</p>
    <p>After many runs, the robot learns which routes usually produce the best result. The improvement comes from repeated interaction with the room, not from a fixed set of hand-coded instructions.</p>
  </div>
</div>

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Why it is powerful</p>
  <p class="ib-textbook-note__body">Reinforcement learning is useful when decisions matter over time. A single action may not be good or bad in isolation; what matters is whether the action helps the agent reach a better overall outcome across many steps.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.3.6</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Reinforcement learning uses rewards and penalties to guide behaviour.</li>
      <li>An agent learns by interacting with an environment over time.</li>
      <li>Exploration and exploitation must be balanced.</li>
    </ul>
  </div>
</div>


## A4.3.7 Genetic algorithms

Genetic algorithms are search and optimisation methods inspired by biological evolution. Instead of examining every possible solution one by one, they evolve a population of candidate solutions over many generations.

### Core ideas

The process uses a few simple mechanisms:

| Term | Meaning |
|---|---|
| Population | A set of candidate solutions |
| Fitness | A score showing how good a candidate is |
| Selection | Choosing the better candidates to reproduce |
| Crossover | Combining parts of two candidates to create a new one |
| Mutation | Randomly changing a small part of a candidate |
| Generation | One cycle of selection, crossover, and mutation |

The algorithm begins with a population, scores each candidate, keeps the strongest solutions, and creates new candidates from them. Over many generations, the population tends to improve.

### Why this approach is useful

Genetic algorithms are valuable when the search space is very large or when the best solution is not obvious. They are used in scheduling, engineering design, route planning, and optimisation problems where a perfect brute-force search would take too long.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Random does not mean careless</p>
  <p class="ib-textbook-warning__body">Mutation introduces randomness, but the process is still directed by fitness. The algorithm keeps the useful changes and discards weak ones, so the randomness helps exploration without removing structure.</p>
</div>

### A practical interpretation

If a delivery company needs to plan routes for many vehicles, there may be too many possible combinations to test directly. A genetic algorithm can start with several route plans, keep the ones that travel less distance, combine useful route segments, and gradually improve the overall plan.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">One generation of route evolution</p>
  <div class="ib-textbook-worked__body">
    <p>Imagine four candidate delivery routes. After measuring total distance, the two shortest routes receive the highest fitness scores. Those two are selected as parents for the next generation.</p>
    <p>During crossover, the first part of one route is combined with the second part of the other to create a child route. Then a mutation swaps two delivery stops in that child. The new route is evaluated again. If it is better than weaker routes already in the population, it survives into the next generation.</p>
    <p>The process does not guarantee a perfect route immediately, but repeated generations can move the population toward better solutions.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.3.7</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Genetic algorithms evolve candidate solutions over generations.</li>
      <li>Selection, crossover, and mutation drive the search process.</li>
      <li>They are useful for large optimisation problems where exhaustive search is impractical.</li>
    </ul>
  </div>
</div>


## A4.3.8 Artificial neural networks

<span data-def="A machine-learning model inspired by the structure of the brain, made up of interconnected processing units that transform input values into outputs through weighted connections and activation functions.">Artificial neural networks (ANNs)</span> are built from layers of connected nodes. Each node receives inputs, applies weights, adds a bias, and passes the result through an activation function. The network then combines many such simple calculations to model complex patterns.

### Structure and function

The basic elements are:

- an **input layer** that receives the data,
- one or more **hidden layers** that transform the data,
- an **output layer** that produces the prediction.

Each connection has a weight that controls the influence of one node on another. During training, the network adjusts these weights so that its outputs become closer to the expected answers.

### Why multi-layer networks matter

One layer can learn simple relationships. Multiple layers can learn more complex patterns by combining lower-level features into higher-level ones. That is why multi-layer networks are used for tasks where the input-output relationship is too complicated for a simple linear model.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Recognising handwritten digits</p>
  <div class="ib-textbook-worked__body">
    <p>The input layer receives pixel values from an image of a digit. Hidden layers combine those values into increasingly abstract features, and the output layer predicts which digit is present.</p>
    <p>The model improves by comparing its prediction with the known answer and adjusting its internal weights so that later predictions are more accurate.</p>
  </div>
</div>

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">What “outline” means here</p>
  <p class="ib-textbook-note__body">For ANNs, the syllabus expects you to outline the main structure and explain the function of the layers, weights, and activation process. You do not need a deep mathematical derivation to show understanding.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.3.8</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>ANNs consist of input, hidden, and output layers connected by weighted links.</li>
      <li>Activation functions and adjusted weights allow the network to learn non-trivial patterns.</li>
      <li>Multi-layer networks are effective when the relationship in the data is complex.</li>
    </ul>
  </div>
</div>


## A4.3.9 Convolutional neural networks

Convolutional neural networks (CNNs) are designed for data with spatial structure, especially images. They extend a standard neural network by adding convolution and pooling stages before the final fully connected layers. The aim is to detect useful local patterns first and then build those into higher-level recognition.

### Why CNNs are different from ordinary ANNs

If a raw image is fed directly into a fully connected network, the number of inputs becomes very large very quickly. More importantly, the network loses the local structure of the image. In an image, one pixel only makes sense relative to nearby pixels. CNNs keep that local structure by scanning small regions of the image with filters.

### From pixels to feature maps

A convolutional layer applies a small filter, or kernel, across the image. Each time the filter moves, it produces one value showing how strongly that local patch matches the pattern the filter is looking for. The collection of those outputs is a feature map.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Detecting a vertical edge</p>
  <div class="ib-textbook-worked__body">
    <p>Consider this 3 × 3 image patch, where <code>0</code> is dark and <code>1</code> is bright:</p>
    <pre><code>0 0 1
0 0 1
0 0 1</code></pre>
    <p>Now apply a vertical-edge filter:</p>
    <pre><code>-1 0 1
-1 0 1
-1 0 1</code></pre>
    <p>When the filter is multiplied with the patch and the results are added, the output is strongly positive because the patch changes from dark on the left to bright on the right. If the same filter were applied to a flat patch with no edge, the total would be much closer to zero.</p>
    <p>This is the central idea of a CNN: early layers learn to respond strongly to simple local patterns such as edges, corners, and textures.</p>
  </div>
</div>

### Pooling and hierarchy

After convolution, an activation function introduces non-linearity, and pooling reduces the size of the feature maps. In max pooling, for example, the strongest value in a small region is kept while weaker values are discarded. That reduces computation and makes the network less sensitive to tiny shifts or noise in individual pixels.

As the data moves through the network, the learned features become more abstract.

| Stage | What it tends to capture |
|---|---|
| Early layers | Edges, colour contrasts, simple textures |
| Middle layers | Combinations of features such as curves, corners, or object parts |
| Later layers | Higher-level structures such as faces, vehicles, or signs |

### Why CNNs are effective

CNNs are effective because they preserve spatial relationships instead of treating every input value as independent. A later layer can recognise a whole object because earlier layers have already extracted the smaller patterns that make that object visible.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Do not overstate the model</p>
  <p class="ib-textbook-warning__body">CNNs are powerful because they learn spatial structure, not because they “understand” images in a human sense. They detect patterns in pixel arrangements and use those patterns to classify or analyse the input.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.3.9</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>CNNs are built for spatial data such as images.</li>
      <li>Filters learn local features and combine them into higher-level feature hierarchies.</li>
      <li>They are effective when nearby data points jointly carry meaning.</li>
    </ul>
  </div>
</div>


## A4.3.10 Model selection and comparison

Model selection is the process of choosing the model that best fits the task. Comparison is the process of judging competing models against agreed criteria. The important point is that the “best” model is not simply the one with the highest training score.

### What should be compared?

| Criterion | What it tells you |
|---|---|
| Accuracy or error | How often the model is correct, or how far its predictions deviate |
| Generalisation | How well it performs on unseen data |
| Speed | How quickly it can train or make predictions |
| Complexity | How hard it is to understand, maintain, or deploy |
| Resource use | Memory, compute, and energy requirements |
| Interpretability | Whether humans can explain why it made a decision |

The correct choice depends on context. A model for medical triage may prioritise reliability and interpretability. A model for live translation may prioritise speed and low latency. A model for batch analysis may prioritise accuracy even if training is slow.

### Comparing models properly

Good comparison uses held-out data such as a validation or test set. That prevents the evaluation from being distorted by the same data used during training. It also helps reveal whether a model is overfitting, underfitting, or simply too expensive for the available hardware.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Choosing the right model for the context</p>
  <div class="ib-textbook-worked__body">
    <p>Imagine two models for loan-screening support. Model A is a decision tree with slightly lower accuracy, but it is fast and its decisions can be explained. Model B is a deeper neural network with slightly higher accuracy, but it is slower and harder to interpret.</p>
    <p>If the system is used in a high-stakes context where staff may need to justify or challenge a recommendation, Model A may be the better choice despite the lower score. Model selection is therefore about fit for purpose, not about chasing one headline metric.</p>
  </div>
</div>

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">The main idea</p>
  <p class="ib-textbook-note__body">Model selection is about fit for purpose. A smaller model may be the right answer if it is faster, cheaper, and easier to explain. A more complex model may be justified if the task really needs the extra accuracy.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.3.10</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Model selection compares competing models against task-specific criteria.</li>
      <li>The best model is not always the most accurate on the training data.</li>
      <li>Validation and test data are essential for fair comparison.</li>
      <li>Speed, complexity, interpretability, and resource use all matter alongside accuracy.</li>
    </ul>
  </div>
</div>
