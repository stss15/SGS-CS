---
level: sl
unitNumber: 53
unitName: Machine Learning Fundamentals
summary: Types of machine learning, the kinds of problems each one solves, and the hardware choices that matter when those models are trained and deployed.
subtopics:
  - code: A4.1.1
    title: Types of machine learning and their applications
  - code: A4.1.2
    title: Hardware requirements for machine learning deployment
sourcePolicy: ib_content_md_first
---

## A4.1.1 Types of machine learning and their applications

<span data-def="A branch of artificial intelligence in which a system learns patterns from data and uses those patterns to make predictions, classifications, or decisions without being explicitly programmed with every rule.">Machine learning</span> is the part of AI that learns from examples rather than from hand-written rules. Instead of telling the system exactly what to do in every situation, the developer gives it data and a learning method. The model then adjusts itself so that it can recognise patterns, make predictions, or choose actions in new situations.

The important distinction is this: AI is the broad goal of making systems behave intelligently, while machine learning is one common way of achieving that goal. A machine-learning system is not “smart” because it memorises answers; it is useful because it generalises from data.

### Supervised, unsupervised, and reinforcement learning

The three core types of machine learning are distinguished by the kind of feedback the system receives.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Supervised learning</p>
  <p class="ib-textbook-defn__body">The model is trained on labelled examples, where each input already has the correct output attached. The model learns a mapping from input to output, then uses that mapping to predict unseen cases.</p>
</div>

Supervised learning is used when a clear target exists. A spam filter is trained on emails marked “spam” or “not spam”. A medical model may be trained on patient records with known diagnoses. A housing model may learn from previous house prices to estimate the price of a new property.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Unsupervised learning</p>
  <p class="ib-textbook-defn__body">The model is given data without labels and must find structure on its own. It looks for clusters, patterns, or relationships that were not explicitly provided.</p>
</div>

Unsupervised learning is useful when the point is discovery rather than prediction. Retailers use it to group customers with similar buying behaviour. Security systems use it to detect unusual activity that does not fit the normal pattern. Scientists use it to explore high-dimensional datasets before deciding what the main groupings might be.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Reinforcement learning</p>
  <p class="ib-textbook-defn__body">The model learns by interacting with an environment and receiving rewards or penalties for its actions. Over time it learns which actions lead to better long-term results.</p>
</div>

Reinforcement learning is used when the system must choose a sequence of actions rather than a single prediction. A game-playing agent learns by trying moves and observing the score. A robot learns by navigating a space and adjusting its behaviour when it reaches goals or encounters obstacles. In each case, the system improves through feedback from consequences, not through labelled answers.

### Choosing the right type

The learning type depends on the problem being solved. If the outcome is already known for past examples, supervised learning is usually appropriate. If the goal is to discover hidden structure, unsupervised learning is a better fit. If the system must act in a changing environment, reinforcement learning becomes more relevant.

| Problem type | Best-fit learning type | Typical example |
|---|---|---|
| Predict a known category or value | Supervised learning | Email spam detection, loan approval, house-price prediction |
| Find hidden groupings or patterns | Unsupervised learning | Customer segmentation, anomaly detection, topic grouping |
| Learn through trial and error | Reinforcement learning | Game agents, robotics, route optimisation |

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">What the command term expects</p>
  <p class="ib-textbook-note__body">To <em>describe</em> the types of machine learning, do more than name them. State what feedback each type uses, explain the kind of problem it suits, and give a realistic application. The strongest answers connect method to purpose.</p>
</div>

### A practical comparison

Consider three systems in one school:

1. An email filter that flags suspicious messages.
2. A library tool that groups books with similar borrowing patterns.
3. A robot vacuum that improves its route each time it cleans a room.

Each system uses a different learning style. The email filter is supervised because the labels “spam” and “not spam” already exist. The library tool is unsupervised because it must discover the structure in borrowing behaviour. The robot vacuum is reinforcement-based because it learns by acting, observing reward, and adjusting future choices.

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.1.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Machine learning learns patterns from data rather than relying on explicit rules for every case.</li>
      <li>Supervised learning uses labelled data, unsupervised learning finds structure in unlabelled data, and reinforcement learning learns through reward and penalty.</li>
      <li>The best learning type depends on whether the task is prediction, discovery, or decision-making in an environment.</li>
    </ul>
  </div>
</div>


## A4.1.2 Hardware requirements for machine learning deployment

Machine learning is not just a software problem. The model, the data size, and the setting where the system runs all influence the hardware that is needed. A tiny model that classifies a few records locally has very different requirements from a large model that trains on millions of images.

### Training versus inference

The hardware used to train a model is often different from the hardware used to run it after deployment.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Training</p>
  <p class="ib-textbook-defn__body">The phase where the model learns from data, adjusts internal values, and searches for a good fit to the training examples. Training is usually computationally expensive.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Inference</p>
  <p class="ib-textbook-defn__body">The phase where a trained model is used to make a prediction or decision on new data. Inference usually needs less computation than training, but it may need to happen quickly and repeatedly.</p>
</div>

Training often benefits from large memory, strong parallel processing, and fast storage. Inference may prioritise low power use, low latency, and reliability.

### CPU, GPU, and memory

| Component | Role in machine learning | Why it matters |
|---|---|---|
| CPU | General-purpose processing, orchestration, preprocessing, control tasks | Good for logic and smaller workloads, but slower on large matrix operations |
| GPU | Highly parallel numerical processing | Suited to training and inference tasks that can be split into many repeated calculations |
| RAM | Temporary working memory for data and model state | Large datasets and complex models can fail or slow dramatically if memory is insufficient |
| Storage | Holds datasets, checkpoints, and model files | Fast storage reduces bottlenecks when moving large datasets into memory |
| Network | Transfers data between devices or cloud services | Important when training uses remote data or when models are deployed in distributed systems |

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common misconception</p>
  <p class="ib-textbook-warning__body">A faster CPU does not automatically solve every machine-learning workload. Some models depend far more on parallel processing than on single-thread speed. Hardware choice must match the shape of the task, not just the headline clock speed.</p>
</div>

### Deployment contexts

The same model can be deployed in different environments, and each environment changes the hardware requirements.

| Deployment context | Hardware priorities | Typical concern |
|---|---|---|
| Cloud server | Large-scale compute, scalable storage, strong cooling and power delivery | Cost and scalability |
| Desktop workstation | Balanced CPU and GPU, enough RAM for local work | Development and experimentation |
| Mobile or edge device | Low power consumption, small memory footprint, efficient inference | Battery life and latency |
| Embedded system | Very limited compute and memory | Tight size, power, and heat constraints |

An image classifier used in a phone must be much lighter than the same model running in a data centre. A server can afford to use a large model because power and cooling are managed centrally. A phone or wearable must make a prediction quickly without draining the battery.

### A deployment decision in practice

Suppose a clinic wants a model that flags possible abnormalities in scan images.

If the model is trained in the cloud, the clinic may need a GPU server, large storage for image datasets, and strong networking for secure upload. If the model is used at the bedside, the inference device needs enough compute to make a timely prediction but must also be reliable, portable, and easy to maintain. The right hardware therefore depends on *where* the model is trained, *where* it runs, and *how often* it is used.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">What to emphasise in an explanation</p>
  <p class="ib-textbook-note__body">For this syllabus point, the key is matching hardware to workload. Show that you understand the difference between training and inference, and explain why GPUs, memory, storage, and deployment location all change the requirement profile.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.1.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Training and inference have different hardware needs.</li>
      <li>GPUs are valuable for parallel number-crunching, while CPUs handle general-purpose control tasks.</li>
      <li>RAM, storage, network capacity, power use, and deployment location all affect what hardware is suitable.</li>
      <li>The best hardware choice depends on model size, workload, latency, and whether the system runs in the cloud, on a desktop, or at the edge.</li>
    </ul>
  </div>
</div>
