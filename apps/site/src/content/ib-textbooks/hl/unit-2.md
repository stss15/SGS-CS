---
level: hl
unitNumber: 2
unitName: Systems Control
summary: Revise Systems Control with source-bounded coverage of A1.3.5, A1.3.6, and A1.3.7, including concurrency risks and control-loop architecture in realistic systems.
subtopics:
  - code: A1.3.5
    title: Multitasking and Resource Allocation
  - code: A1.3.6
    title: Control System Components
  - code: A1.3.7
    title: Open-Loop and Closed-Loop Systems
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| multitasking | Running multiple tasks by sharing processor time and other resources. |
| resource contention | Multiple processes competing for the same limited resource. |
| deadlock | Two or more processes permanently waiting on each other to release resources. |
| starvation | A process waits indefinitely because other processes keep receiving priority. |
| sensor | Component that detects a physical condition (for example temperature or light). |
| actuator | Component that produces physical action (for example motor movement or heating). |
| ADC | Analogue-to-digital conversion stage used to digitize physical signals for processing. |
| DAC | Digital-to-analogue conversion stage used when digital control signals must drive analogue outputs. |
| open-loop control | Control with no feedback from output to adjust future action. |
| closed-loop control | Control that measures output and uses feedback to correct behavior. |

## A1.3.5 Multitasking and Resource Allocation

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

To explain OS multitasking, describe both scheduling and risk management. The OS allocates CPU time, memory, and device access so multiple processes can progress without corrupting shared state.

| OS role | Why it matters |
| --- | --- |
| Scheduling | Shares CPU time across tasks |
| Memory/resource management | Prevents uncontrolled conflicts |
| Synchronization support | Coordinates safe access to shared resources |
| Priority handling | Reduces starvation risk |

Without resource management, multitasking turns into contention and potential system freeze states.

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

| Misconception | Correction |
| --- | --- |
| "Deadlock is just temporary slowness." | Deadlock is a waiting cycle that does not resolve without intervention. |
| "More CPU cores eliminate contention." | Contention still exists for locks, files, memory regions, and devices. |
| "Starvation and deadlock are the same." | Deadlock is circular waiting; starvation is unfair scheduling over time. |

A precise explanation distinguishes these failure modes clearly.

</div>

### Worked trace: lock conflict in two processes

<div class="reader-section-body reader-section-body--example">

Process A locks `Printer`, then requests `Scanner`.
Process B locks `Scanner`, then requests `Printer`.

| Time | Process A | Process B | State |
| --- | --- | --- | --- |
| t1 | lock Printer |  | running |
| t2 |  | lock Scanner | running |
| t3 | waits for Scanner |  | waiting |
| t4 |  | waits for Printer | waiting |

At `t4`, both wait indefinitely: this is deadlock.

```python
# Minimal deadlock pattern using two locks
from threading import Lock

printer = Lock()
scanner = Lock()
```

The code objects are simple; the problem is ordering and dependency, not syntax.

</div>

## A1.3.6 Control System Components

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

Description quality depends on sequence accuracy. A control system typically follows this chain:

`Sensor -> ADC -> Controller -> DAC -> Actuator`

| Component | Function |
| --- | --- |
| Sensor | Measures physical input |
| ADC | Converts analogue signal to digital data |
| Controller | Applies control logic to measured input |
| DAC | Converts digital output to analogue signal when required |
| Actuator | Produces physical output |

Descriptions should include both data conversion and physical action.

</div>

### Applied in context: greenhouse heating

<div class="reader-section-body reader-section-body--apply">

In a greenhouse controller:

- Sensor reads `19.2°C`.
- ADC converts sensor voltage to digital value.
- Controller compares value to setpoint (`22.0°C`).
- DAC sends proportional signal.
- Actuator increases heater power.

This is a complete component-level description, not just a list of device names.

</div>

### Worked example: component data flow snapshot

<div class="reader-section-body reader-section-body--example">

| Step | Value |
| --- | --- |
| Measured temperature | 19.2°C |
| Setpoint | 22.0°C |
| Error (`setpoint - measured`) | 2.8°C |
| Controller decision | Increase heating |
| Actuator command | Heater output = 70% |

Concrete values make the control chain explicit and testable.

</div>

## A1.3.7 Open-Loop and Closed-Loop Systems

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

Explaining loop type means showing whether feedback changes future action.

| Loop type | Feedback used? | Typical behavior |
| --- | --- | --- |
| Open-loop | No | Executes preset action regardless of result |
| Closed-loop | Yes | Measures output and self-corrects |

Open-loop is often cheaper and simpler. Closed-loop is often more accurate under changing conditions.

</div>

### In real systems

<div class="reader-section-body reader-section-body--apply">

| System | Loop type | Reason |
| --- | --- | --- |
| Basic toaster timer | Open-loop | Fixed heating time, no bread-quality measurement |
| Home thermostat | Closed-loop | Room temperature is repeatedly measured and corrected |
| Highway cruise control | Closed-loop | Speed error drives throttle adjustment |

The explanation is strongest when feedback path is explicit.

</div>

### Worked example: temperature drift scenario

<div class="reader-section-body reader-section-body--example">

Target room temperature: `21°C`.
Outside temperature drops suddenly.

| System type | Observed result after 10 min |
| --- | --- |
| Open-loop heater (fixed 40% output) | Room drops to 18.5°C |
| Closed-loop heater (sensor feedback) | Controller raises output to 65%, room stabilizes near 21.1°C |

Closed-loop behavior is adaptive because current output is measured and re-used in the next decision cycle.

</div>
