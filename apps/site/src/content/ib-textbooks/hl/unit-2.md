---
level: hl
unitNumber: 2
unitName: Multitasking and Control Systems
summary: A comprehensive textbook chapter covering the OS role in multitasking and resource allocation (concurrency, synchronisation, deadlock), control system components (sensors, actuators, transducers, controllers, ADC/DAC), open-loop and closed-loop architectures, and real-world control system applications.
subtopics:
  - code: A1.3.5
    title: Multitasking and resource allocation
  - code: A1.3.6
    title: Control system components
  - code: A1.3.7
    title: Uses of control systems
sourcePolicy: ib_content_md_first
---

## A1.3.5 Multitasking and resource allocation

### The challenge of running multiple processes

At the standard level, scheduling algorithms determine which process receives the CPU next. At the higher level, the focus shifts to a deeper question: what happens when multiple processes need the same resources simultaneously, and how does the operating system prevent that from going wrong?

**Multitasking** is the appearance of simultaneous execution. On a single-core processor, only one process actually runs at any instant — the OS switches between them so rapidly that they appear concurrent. On a multi-core processor, genuine parallelism is possible, but the fundamental co-ordination problems remain: processes still share memory, files, network connections, and devices that cannot serve two masters at once.

The OS must balance three concerns: keeping the CPU busy (high utilisation), giving interactive tasks quick responses (low latency), and ensuring that every process eventually gets the resources it needs (fairness). Failures in this balance produce three distinct pathologies: **resource contention**, **starvation**, and **deadlock**.

### Resource contention and mutual exclusion

**Resource contention** occurs when multiple processes compete for the same limited resource — a file, a database connection, a printer, or a region of shared memory. If two processes write to the same file simultaneously without co-ordination, the result is data corruption: their outputs interleave unpredictably.

The solution is **mutual exclusion** — ensuring that only one process accesses a shared resource at a time. The OS and programming languages provide several mechanisms for this:

#### Semaphores

A semaphore is an integer variable that controls access to a shared resource. Two operations are defined on it: **wait** (decrement the value; if the result is negative, the process blocks) and **signal** (increment the value; if a process is waiting, unblock it).

**Binary semaphores** (also called mutexes) toggle between 0 and 1, enforcing exclusive access. Consider two processes that need to write to the same log file:

1. The semaphore starts at 1 (the file is available).
2. Process A calls wait — the semaphore drops to 0, and A proceeds to write.
3. Process B calls wait — the semaphore would drop below 0, so B blocks.
4. Process A finishes writing and calls signal — the semaphore returns to 1, and B unblocks.
5. Process B writes to the file, then signals when done.

**Counting semaphores** manage resources with multiple identical instances. If a database server allows three simultaneous connections, the semaphore starts at 3. Each process that connects decrements it; each process that disconnects increments it. When the count reaches 0, the next requester blocks until a connection is released.

#### Locks and monitors

**Locks** are the simplest mutual exclusion mechanism: a process acquires a lock before entering a critical section and releases it when done. **Readers-writer locks** allow multiple processes to read a resource simultaneously (since reading does not cause corruption) but require exclusive access for writing.

**Monitors** encapsulate shared data and the code that accesses it into a single construct. When a process enters a monitor, no other process can enter it until the first one leaves. Monitors also support **condition variables** that allow a process to wait inside the monitor until a specific condition is met, and to notify other waiting processes when that condition changes. This makes monitors less error-prone than raw semaphores because the locking is automatic.

### Deadlock

**Deadlock** occurs when two or more processes are each waiting for a resource held by another, creating a circular dependency from which none can escape without external intervention.

**Worked example:**

Process A locks the printer, then requests the scanner.
Process B locks the scanner, then requests the printer.

| Time | Process A | Process B |
|---|---|---|
| t1 | Acquires printer lock | — |
| t2 | — | Acquires scanner lock |
| t3 | Requests scanner — blocked | — |
| t4 | — | Requests printer — blocked |

At t4, both processes wait forever. Neither will release the resource it holds because it cannot proceed without the other resource. This is deadlock.

The OS can address deadlock through four strategies:

- **Prevention** — design the system so that deadlock is structurally impossible. For example, require all processes to request resources in the same fixed order (if every process requests the printer before the scanner, the circular wait cannot form).
- **Avoidance** — before granting a resource, check whether doing so could lead to deadlock. The **Banker's algorithm** tracks available resources and only grants requests that leave the system in a safe state where all processes can still complete.
- **Detection** — allow deadlocks to occur but periodically scan for circular wait chains. When one is found, the OS can terminate one of the deadlocked processes to break the cycle.
- **Recovery** — once deadlock is detected, the OS may forcibly reclaim resources from one process, roll it back to an earlier state, or terminate it entirely.

### Starvation and priority inversion

**Starvation** is distinct from deadlock. A starving process is not part of a circular wait — it is simply never selected by the scheduler because higher-priority work keeps arriving. The process could run if given the chance, but it never gets one.

**Priority inversion** is a related problem: a high-priority process is blocked because a low-priority process holds a resource it needs, but medium-priority processes keep preempting the low-priority one, preventing it from finishing and releasing the resource. The high-priority process is effectively demoted to the priority of the low-priority one.

Both problems are mitigated by **ageing** — gradually increasing the priority of processes that have been waiting a long time — and by **priority inheritance** — temporarily boosting a low-priority process to the priority of the highest-priority process waiting on it.


## A1.3.6 Control system components

### What a control system does

A control system automates a physical process by measuring conditions, making decisions, and driving actions — all without continuous human intervention. Control systems operate across a vast range of scales, from a simple thermostat maintaining room temperature to the guidance system of an autonomous vehicle.

Every control system, regardless of complexity, follows a common data flow:

**Input → Processing → Output**

The input is the desired state (the setpoint) or sensor data describing the current state. The processing stage compares actual conditions to desired conditions and decides what action to take. The output is the physical action that moves the system toward the desired state.

### Key components

#### Sensors

Sensors detect and measure physical quantities in the environment — temperature, pressure, light intensity, proximity, moisture level, speed, or position. They convert these physical measurements into electrical signals that the controller can process.

The accuracy and reliability of sensors directly determine the performance of the entire control system. A temperature sensor with poor precision will cause the controller to make incorrect decisions, regardless of how sophisticated the control algorithm is.

#### Actuators

Actuators convert the controller's electrical commands into physical action. They are the components that actually change the state of the system: a motor that turns a valve, a heater that raises temperature, a hydraulic piston that moves a robotic arm, or a speaker that produces sound.

The choice of actuator determines what physical effects the system can produce and with what precision. Industrial robotic arms require actuators capable of sub-millimetre positioning accuracy, while a simple irrigation valve needs only an open/closed binary state.

#### Transducers

Transducers convert one form of energy into another. In practice, sensors and actuators are often transducers themselves — a temperature sensor converts thermal energy into an electrical signal, and a motor converts electrical energy into mechanical motion. The term "transducer" is used when the emphasis is on the energy conversion rather than the sensing or acting function.

Two specific types of transducer are critical in control systems:

- **ADC (analogue-to-digital converter)** — converts the continuous analogue signal from a sensor into discrete digital values that a digital controller can process. The physical world is analogue; the controller is digital. The ADC bridges this gap.
- **DAC (digital-to-analogue converter)** — converts the digital output of the controller into an analogue signal that can drive certain actuators. Not all systems require a DAC — many actuators accept digital signals directly — but systems that drive analogue devices (variable-speed motors, dimmable heaters) depend on one.

#### Controller

The controller is the decision-making component. It receives input data (from sensors via ADC), compares it to the desired setpoint, calculates the difference (the **error**), and determines the appropriate output command to send to the actuators (via DAC if needed).

The **control algorithm** embedded in the controller determines how it responds to error. A simple on/off algorithm (like a basic thermostat) switches the actuator fully on when the temperature is below the setpoint and fully off when it is above. More sophisticated algorithms, such as **PID (Proportional-Integral-Derivative) control**, adjust the output proportionally to the error's magnitude, how long the error has persisted, and how fast the error is changing. PID produces smoother, more precise control with less oscillation.

### The complete data flow

**Worked example — greenhouse heating system:**

1. The setpoint is 22°C (the desired temperature).
2. A temperature sensor reads 19.2°C.
3. The ADC converts this analogue reading to a digital value.
4. The controller calculates the error: 22.0 − 19.2 = 2.8°C.
5. The control algorithm determines the heater should run at 70% power.
6. The DAC converts this digital command to an analogue voltage.
7. The heater actuator responds, increasing heat output.
8. The sensor continues to monitor, and the cycle repeats.

The data flows in a loop: sensor → ADC → controller → DAC → actuator → physical effect → sensor. This continuous cycling is what makes the system responsive to changing conditions.

### Open-loop vs closed-loop control

The distinction between open-loop and closed-loop is the most fundamental concept in control systems.

**Open-loop control** has no feedback path. The system receives an input, executes a predetermined action, and does not measure the result. A basic toaster timer runs the heating element for a fixed duration regardless of how brown the bread actually is. If conditions change (thicker bread, lower starting temperature), the output may not match the desired result.

**Closed-loop control** (also called feedback control) continuously measures the output and feeds that measurement back to the controller, which adjusts its actions accordingly. The home thermostat is the canonical example: it measures room temperature, compares it to the setpoint, and activates or deactivates heating based on the difference.

| Property | Open-loop | Closed-loop |
|---|---|---|
| Feedback | None | Continuous |
| Accuracy | Depends on initial calibration | Self-correcting |
| Complexity | Simpler, cheaper | More complex |
| Adaptability | Cannot respond to disturbances | Adjusts to changing conditions |
| Example | Toaster timer, basic washing machine cycle | Thermostat, cruise control |

Closed-loop systems are essential wherever accuracy matters and conditions are unpredictable. Open-loop systems are adequate when the relationship between input and output is stable and well-understood.


## A1.3.7 Uses of control systems

Control systems appear throughout modern life. The examples below illustrate how the components from A1.3.6 — sensors, actuators, controllers, and feedback mechanisms — combine in real applications.

### Home thermostat

A home thermostat maintains a target room temperature using a closed-loop control system. A temperature sensor continuously monitors the room and sends readings to the controller. The controller compares each reading to the user-defined setpoint. When the temperature drops below the setpoint, the controller activates the heating system; when the temperature exceeds it, the controller deactivates or reduces heating.

The feedback loop ensures that the system adapts to external changes — an open window, a sudden drop in outside temperature, or heat from cooking — without human intervention. The sensor provides the feedback that closes the loop and makes the system self-correcting.

### Automatic elevator

An elevator control system manages movement between floors by processing input from multiple sensors: position sensors that track the car's location in the shaft, load sensors that detect passenger weight, and door sensors that determine whether the doors are clear to close.

The controller processes floor requests (button presses), determines the optimal sequence of stops, and commands the motor actuator to move the car. As the car approaches a requested floor, position sensors provide continuous feedback to the controller, which decelerates the motor to stop precisely at floor level. This closed-loop positioning prevents the car from over-shooting or under-shooting the target floor.

### Autonomous vehicle

An autonomous vehicle represents one of the most complex control systems in existence. Multiple sensor types — cameras, LiDAR, radar, GPS, and ultrasonic sensors — continuously gather data about the vehicle's environment: road boundaries, other vehicles, pedestrians, traffic signals, and obstacles.

The controller (powered by sophisticated algorithms including machine learning models) fuses data from all sensors to build a real-time model of the environment. It makes decisions about steering, acceleration, and braking, issuing commands to the appropriate actuators (steering motor, throttle, brake system).

The system operates as a closed-loop: sensors continuously monitor the effects of each action and feed updated data back to the controller. If the vehicle drifts toward a lane boundary, the steering adjusts. If an obstacle appears, the braking system activates. Transducers convert between sensor signals and the digital representations the controller requires, and between digital commands and the analogue signals the actuators need.

### Automatic washing machine

A washing machine uses a control system to manage the wash cycle. Sensors monitor water level, water temperature, drum speed, and load weight. The controller determines the appropriate sequence of actions: filling the drum, heating the water, agitating the clothes, draining, and spinning.

During the fill phase, a water-level sensor provides feedback to the controller. When the water reaches the required level, the controller closes the inlet valve. During the spin phase, a speed sensor feeds back the drum's rotation rate so the controller can adjust motor power. This closed-loop approach adapts the cycle to the actual conditions — a heavier load receives a longer spin, and water heating stops precisely at the target temperature.

### Traffic signal control system

A traffic signal system manages vehicle flow through intersections. Sensors embedded in the road surface (inductive loops) or mounted above the intersection (cameras) detect the presence and volume of vehicles and pedestrians.

The controller uses this sensor data to determine optimal signal timing — extending the green phase for a congested approach, or triggering a pedestrian crossing when a button is pressed. The system operates as a closed loop: sensors continuously report traffic conditions, and the controller adjusts signal timing in response. This adaptive approach reduces congestion and improves safety compared to fixed-timer (open-loop) systems.

### Irrigation control system

An agricultural irrigation system automates watering by monitoring soil moisture levels, weather data, and sometimes the time of day. Moisture sensors in the soil provide continuous feedback to the controller. When soil moisture drops below a threshold, the controller opens water valves (actuators) to deliver irrigation. When the moisture level returns to the target range, the valves close.

This closed-loop design prevents both under-watering (which damages crops) and over-watering (which wastes water and can cause root rot). The system responds dynamically to actual soil conditions rather than following a rigid schedule.

### Home security system

A home security system processes input from door and window sensors, motion detectors, and cameras. The controller evaluates these inputs against the system's armed/disarmed state and triggers appropriate responses: sounding an alarm, sending a notification to the homeowner, recording camera footage, or contacting emergency services.

The system uses a closed-loop mechanism: sensors continuously update the controller on the status of entry points and monitored areas. If a sensor detects an intrusion, the controller's response is immediate. Once the threat is resolved — the door is closed, the homeowner disarms the system — the feedback loop returns the system to its monitoring state.
