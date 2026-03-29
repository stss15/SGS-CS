---
level: sl
unitNumber: 57
unitName: Ethical Considerations in Machine Learning
summary: The ethical questions that arise when machine-learning systems shape decisions, automate judgements, and become embedded in daily life.
subtopics:
  - code: A4.4.1
    title: Ethical implications of machine learning in real-world scenarios
  - code: A4.4.2
    title: Ethical aspects of the increasing integration of computer technologies into daily life
sourcePolicy: ib_content_md_first
---

## A4.4.1 Ethical implications of machine learning in real-world scenarios

Machine learning creates ethical issues because it can shift decisions from human judgement to statistical pattern recognition. That shift can bring real benefits, such as speed, consistency, and the ability to detect patterns at scale. It can also magnify harm when the pattern learned by the system is biased, opaque, or used in a context where people cannot challenge the result.

### Automated recruitment

Recruitment systems are a useful starting point because they show both the appeal and the danger of machine learning. A company may want automated screening because it can process thousands of applications quickly and apply the same rule to every candidate. On the surface, that looks fairer than rushed human judgement.

The ethical problem appears when the model is trained on historical hiring data. If past decisions reflected bias, the model may learn to reproduce that bias as if it were evidence of suitability. This was one of the concerns raised when Amazon abandoned an internal recruitment tool that appeared to disadvantage women. The issue was not simply that the tool was inaccurate. It was that the system risked automating an unfair pattern at scale.

### Surveillance and high-stakes decision-making

The ethical stakes become even higher in systems such as facial recognition, predictive policing, lending, or medical triage. These systems may improve efficiency or help allocate limited resources, but they also affect liberty, access, and life chances. A false positive in a music recommendation system is trivial. A false positive in law enforcement or healthcare is not.

In such contexts, three questions matter:

- Is the system fair, or does it disadvantage particular groups?
- Can the decision be explained and challenged?
- Who remains accountable when the model gets the judgement wrong?

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Evaluating a facial-recognition deployment</p>
  <div class="ib-textbook-worked__body">
    <p>A city proposes facial recognition in a transport hub to identify wanted suspects. The benefit is clear: police may find a dangerous person more quickly. The ethical risks are also clear. Travellers may be scanned without meaningful consent, false matches may affect innocent people, and error rates may differ across demographic groups.</p>
    <p>A strong IB discussion would not stop at saying "privacy is a concern". It would weigh the possible security benefit against fairness, accountability, consent, and the right to challenge a mistaken identification.</p>
  </div>
</div>

### Privacy, security, and environmental cost

Machine-learning systems also raise broader ethical questions about how data is collected and used. Large training sets may contain personal or sensitive information. In some cases the system can infer facts that the person never explicitly gave, which deepens the privacy issue. Security matters too: poisoned data, model evasion, and model inversion show that an insecure model can become ethically problematic even before it makes a decision.

There is also an environmental dimension. Training large models consumes electricity, hardware, and cooling resources. That does not mean machine learning is inherently unethical, but it does mean the social benefit should be weighed against the material cost.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Opaque systems create risk</p>
  <p class="ib-textbook-warning__body">A model can be statistically strong and still be ethically weak. If affected people cannot understand, challenge, or appeal a decision, the system may fail important standards of fairness and accountability.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.4.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Machine-learning systems can affect fairness, privacy, accountability, and security.</li>
      <li>Biased training data can produce unfair outcomes in real-world settings.</li>
      <li>Ethical use requires transparency, consent where appropriate, and responsibility for the consequences of automated decisions.</li>
    </ul>
  </div>
</div>


## A4.4.2 Ethical aspects of the increasing integration of computer technologies into daily life

As computer technologies become integrated into daily life, the ethical question changes. The issue is no longer only whether one isolated system is fair. It is whether a whole environment of devices, platforms, and automated services changes how people live, communicate, and exercise control over their own data.

### Everyday convenience versus constant observation

Smart speakers, wearables, location-enabled apps, connected cars, and home devices make daily life easier, but they also normalise continuous data collection. A person may appear anonymous in one system while becoming highly identifiable once multiple datasets are linked together. The Netflix prize dataset is a well-known reminder that "anonymised" data can sometimes be re-identified when combined with other public information.

The ethical concern is therefore not only collection, but function creep: data gathered for one purpose may later be used for profiling, advertising, policing, or insurance decisions.

### Dependence, exclusion, and power

When schools, banks, transport systems, or healthcare providers assume constant connectivity and constant device access, people who lack those things can be excluded. A technology that looks efficient from the provider's point of view may feel compulsory from the user's point of view.

That also changes power relationships. If everyday services depend on opaque digital platforms, individuals may have less practical ability to opt out, challenge decisions, or control how their data is used.

### Recommendation systems, misinformation, and harassment

Integrated technologies do not just collect data. They shape attention. Recommendation engines can create filter bubbles or echo chambers by repeatedly showing people content that matches previous behaviour. That may increase engagement, but it can also intensify misinformation, polarisation, and the feeling that alternative viewpoints barely exist.

The same infrastructure can support harm more directly. Machine learning can automate targeted harassment, enable stalking through location data, or generate convincing deepfakes. In those cases the ethical issue is not only privacy. It is also dignity, safety, and autonomy.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">A connected daily-life ecosystem</p>
  <div class="ib-textbook-worked__body">
    <p>Imagine one student using a smartwatch, a navigation app, a streaming platform, a school portal, and a social-media feed. Each service may seem minor by itself. Together, they create a detailed behavioural profile: location, routines, interests, contacts, and habits.</p>
    <p>The benefits are real: convenience, personalisation, faster access to services. The ethical concern is that daily life becomes easier to monitor, predict, and influence. A good discussion weighs both sides and recognises that the scale of integration changes the seriousness of the issue.</p>
  </div>
</div>

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Why reassessment matters</p>
  <p class="ib-textbook-note__body">Ethical judgement cannot be fixed once and then forgotten. A technology that seems harmless in a pilot can become far more consequential when it scales, connects to other systems, or becomes part of daily routine.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A4.4.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>As computer technologies become part of daily life, they can affect privacy, access, autonomy, and trust.</li>
      <li>Recommendation systems and connected devices can intensify misinformation, surveillance, and exclusion.</li>
      <li>Ethical judgement must be revisited as technology, scale, and context change.</li>
    </ul>
  </div>
</div>
