---
topicNumber: 6
topicName: "Automated and Emerging Technologies"
summary: "From the sensors that control the temperature in your home to the AI algorithms that recommend your next movie, automated technologies are reshaping our world. In this topic, you will explore how computers sense the world, how robots are built, and how artificial intelligence simulates human thought."
subtopics:
  - code: "6.1"
    title: "Automated Systems"
  - code: "6.2"
    title: "Robotics"
  - code: "6.3"
    title: "Artificial Intelligence"
sourcePolicy: igcse_textbook_then_syllabus_then_slides
---

## Unit Summary

From the sensors that control the temperature in your home to the AI algorithms that recommend your next movie, automated technologies are reshaping our world. In this topic, you will explore how computers sense the world, how robots are built, and how artificial intelligence simulates human thought.

## Objectives and Outcomes

### Objectives

- 6.1 Automated Systems: How sensors, microprocessors, and actuators work together.
- 6.2 Robotics: The characteristics, roles, and impact of robots in society.
- 6.3 Artificial Intelligence: Understanding AI, Expert Systems, and Machine Learning.

### Outcomes

- Analyze Scenarios: Given a real-world situation (e.g., a smart greenhouse), identify the sensors and actuators needed and explain the process.
- Evaluate Impact: Discuss the pros and cons of replacing humans with robots in specific industries.
- Differentiate AI: Clearly distinguish between standard programming, expert systems, and machine learning.
- Identify Components: Label or describe the parts of an expert system (Knowledge Base, Inference Engine, etc.).

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Automated System | System that operates with minimal direct human intervention. |
| Feedback Loop | Cycle where sensor input informs control decisions continuously. |
| Actuator | Device that performs physical action from a control signal. |
| Robotics | Design and use of programmable machines for task execution. |
| Control Program | Software logic that governs automated or robotic behaviour. |
| Artificial Intelligence | Methods that simulate intelligent behaviour in software systems. |
| Expert System | AI system using a knowledge base and inference engine for decisions. |
| Machine Learning | AI approach where models improve from data-based training. |
| Training Data | Dataset used to build model behaviour. |
| Inference Engine | Expert-system component applying rules to known facts. |
| Sensor Fusion | Combining multiple sensor inputs for improved state estimation. |
| Autonomy | Degree to which a system can operate without external control. |

## 6.1 Automated Systems

### Overview

- Automated systems combine sensors, processing logic, and actuators to control outcomes.
- Monitoring and control workflows differ by whether outputs only report status or actively change conditions.
- Reliability depends on calibration, thresholds, and safe fallback behaviour.

### Applied Understanding

- Map real scenarios to sensor-input and actuator-output stages.
- Explain how microprocessor logic uses sensor values to trigger actions.
- Evaluate advantages and disadvantages such as precision, safety, and employment impact.

### Worked Example

**Worked greenhouse control loop**

This routine reads temperature and controls a cooling actuator when threshold values are exceeded.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE Temperature : REAL
DECLARE CoolingOn : BOOLEAN
INPUT Temperature
IF Temperature &gt; 30.0 THEN
  CoolingOn ← TRUE
ELSE
  CoolingOn ← FALSE
ENDIF
OUTPUT "Cooling status = ", CoolingOn
</code></pre>

![Automated control loop from sensor to actuator.](/igcse/topic6/6.1 images/6.1_automated_system_loop.png)

*Automated control loop from sensor to actuator.*

## 6.2 Robotics

### Overview

- Robots integrate sensing, control logic, and actuation to perform repeated or hazardous tasks.
- Industrial, medical, and agricultural roles show different design constraints and autonomy levels.
- Robot benefits include precision and endurance, while risks include cost and workforce disruption.

### Applied Understanding

- Describe robot characteristics in terms of sensors, program control, and repeatable output.
- Compare independent and dependent robot operation models.
- Evaluate social and economic implications with scenario-specific evidence.

### Worked Example

**Worked robot task scheduler**

This routine selects robot action based on sensor state from a production line.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE SensorState : STRING
INPUT SensorState
CASE OF SensorState
  "ItemDetected" : OUTPUT "Pick and place item"
  "FaultDetected" : OUTPUT "Stop and alert supervisor"
  OTHERWISE OUTPUT "Continue standby scan"
ENDCASE
</code></pre>

![Common robot characteristics and control requirements.](/igcse/topic6/6.2 images/6.2_robot_characteristics.png)

*Common robot characteristics and control requirements.*

## 6.3 Artificial Intelligence

### Overview

- AI systems simulate intelligent behaviour through rule-based or data-driven methods.
- Expert systems use explicit rules; machine-learning systems infer patterns from data.
- System quality depends on data quality, model design, and output evaluation.
- Explain how machine learning and artificial intelligence (AI) differ.

### Applied Understanding

- Differentiate AI categories by how decisions are generated.
- Describe expert-system components: knowledge base, inference engine, and interface.
- Discuss strengths and limitations such as bias, explainability, and maintenance cost.

### Worked Example

**Worked expert-system rule chain**

This routine demonstrates simple rule-based recommendations using symptom checks.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE HasFever : BOOLEAN
DECLARE HasCough : BOOLEAN
INPUT HasFever
INPUT HasCough
IF HasFever AND HasCough THEN
  OUTPUT "Rule match: advise medical review"
ELSE
  OUTPUT "Rule match: monitor symptoms"
ENDIF
</code></pre>

![Expert-system architecture diagram.](/igcse/topic6/6.3 images/Expert System.png)

*Expert-system architecture diagram.*

