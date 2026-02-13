---
topicNumber: 3
topicName: "Hardware"
summary: "Hardware is the physical machinery that makes computing possible. In this topic, students move from CPU architecture to practical hardware decisions used in real systems."
subtopics:
  - code: "3.1"
    title: "Computer Architecture"
  - code: "3.2"
    title: "Input & Output Devices"
  - code: "3.3"
    title: "Data Storage"
  - code: "3.4"
    title: "Network Hardware"
sourcePolicy: igcse_textbook_then_syllabus_then_slides
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| central processing unit (CPU) | The processor responsible for executing instructions and controlling system operations. |
| integrated circuit | A microchip that contains electronic circuitry; CPUs are commonly packaged this way. |
| von Neumann architecture | Stored-program architecture where both data and instructions are held in memory. |
| arithmetic and logic unit (ALU) | CPU component that performs arithmetic and logical operations. |
| control unit (CU) | CPU component that coordinates activity by issuing control signals. |
| accumulator (ACC) | Register used to store intermediate ALU results. |
| memory address register (MAR) | Register holding the memory address currently being accessed. |
| memory data register (MDR) | Register holding data read from memory or about to be written to memory. |
| current instruction register (CIR) | Register holding the instruction currently being decoded/executed. |
| program counter (PC) | Register storing the address of the next instruction to fetch. |
| address bus | Bus carrying addresses, typically from CPU to memory. |
| data bus | Bus carrying data between CPU, memory, and I/O devices. |
| control bus | Bus carrying control and timing signals. |
| system clock | Generates pulses used to synchronise processing activity. |
| clock speed | Number of cycles per second (commonly measured in GHz). |
| cache memory | Very fast temporary memory used for frequently needed data/instructions. |
| core | An independent processing unit inside a CPU. |
| instruction set | Complete list of machine instructions a processor can execute. |
| opcode | The operation part of a machine instruction. |
| operand | The data value or address used by an operation. |
| embedded system | A computer system designed for one dedicated purpose. |
| immediate access store (IAS) | Another name for RAM used for active data and program storage. |
| input device | Hardware used to capture data and send it into a computer system. |
| output device | Hardware used to present processed data or trigger physical action. |
| sensor | Input device that measures a physical property from surroundings. |
| barcode scanner | Input device that reads line-based optical codes. |
| QR code scanner | Input method that reads matrix codes, usually with a camera. |
| optical character recognition (OCR) | Technology that converts scanned image text into editable text data. |
| actuator | Output device that converts electrical signals into mechanical movement. |
| analogue to digital converter (ADC) | Converts analogue sensor/media signals into digital values. |
| digital to analogue converter (DAC) | Converts digital values into analogue electrical signals. |
| resistive touch screen | Touch layer system requiring pressure to make contact between two layers. |
| capacitive touch screen | Touch technology detecting change in capacitance at contact point. |
| infra-red touch screen | Touch technology using infra-red beam interruption to detect position. |
| digital light projector (DLP) | Projector technology using micromirrors to create the image. |
| liquid crystal display (LCD) projector | Projector using LCD panels and colour-separated light paths. |
| light emitting diode (LED) screen | Display technology based on light-emitting diodes. |
| organic LED (OLED) | Display technology where organic layers emit light directly. |
| inkjet printer | Printer that sprays liquid ink droplets to form output. |
| laser printer | Printer using charged toner and drum-based electrostatic process. |

## 3.1 Computer Architecture

### Start with the real exam question underneath the topic title

<div class="reader-section-body reader-section-body--concept">

When examiners ask about computer architecture, they are testing whether you can track movement through the machine, not just list parts from memory. In practice, that means being able to explain:

- which register changes next
- what each bus is carrying
- how fetch-decode-execute repeats
- why some CPUs perform faster than others.

If you can narrate one full instruction journey clearly, most 3.1 questions become far easier.

</div>

### The CPU: one chip, coordinated specialist roles

<div class="reader-section-body reader-section-body--apply">

The CPU (often a microprocessor on an integrated circuit) sits at the center of processing. It combines three cooperating elements:

| CPU part | What it does in plain language | Mark-scheme style phrasing |
| --- | --- | --- |
| Control Unit (CU) | Directs the sequence of operations | Sends control signals, synchronises data flow |
| Arithmetic and Logic Unit (ALU) | Performs arithmetic and logic operations | Executes arithmetic/logic instructions |
| Registers | Hold instruction/address/data values temporarily | Stores values during FDE cycle |

A useful correction for students: the ALU does the calculation, but the CU decides timing and order, while registers hold the working state.

</div>

### Von Neumann architecture: the stored-program breakthrough

<div class="reader-section-body reader-section-body--concept">

Before stored-program systems, early machines required much more manual intervention while running. Von Neumann architecture introduced the model still used today:

- CPU can access memory directly
- memory stores both instructions and data
- instructions are processed in sequence via the program counter.

That is exactly why fetch-decode-execute sits at the heart of this subtopic.

<figure>
  <img src="/igcse/topic3/3.1 images/von neumann architecture.png" alt="Diagram of Von Neumann architecture showing CPU, memory, buses, and key registers." loading="lazy" decoding="async" />
  <figcaption>Von Neumann architecture overview.</figcaption>
</figure>

</div>

### Registers and buses: trace one instruction cleanly

<div class="reader-section-body reader-section-body--example">

| Register | What it stores during processing |
| --- | --- |
| `PC` | Address of the next instruction |
| `MAR` | Address currently being accessed |
| `MDR` | Data read from memory or data waiting to be written |
| `CIR` | Current instruction being decoded/executed |
| `ACC` | Intermediate/final ALU results |

| Bus | Direction pattern | Main use |
| --- | --- | --- |
| Address bus | Usually CPU -> memory | Carries addresses |
| Data bus | Both directions | Carries data/instructions |
| Control bus | Signal traffic both ways | Carries read/write/timing signals |

<div class="igcse-widget">
  <p class="igcse-widget__title">Memory read vs memory write: quick distinction</p>
  <div class="igcse-widget__split">
    <div class="igcse-step-card">
      <h4>Read operation</h4>
      <ol>
        <li>CPU places target address in <code>MAR</code>.</li>
        <li>CU sends <code>READ</code> signal on control bus.</li>
        <li>Memory returns value into <code>MDR</code> via data bus.</li>
        <li>Instruction/data is then used by CU or ALU.</li>
      </ol>
    </div>
    <div class="igcse-step-card">
      <h4>Write operation</h4>
      <ol>
        <li>CPU places destination address in <code>MAR</code>.</li>
        <li>CPU puts value to store in <code>MDR</code>.</li>
        <li>CU sends <code>WRITE</code> signal on control bus.</li>
        <li>Memory updates that location.</li>
      </ol>
    </div>
  </div>
</div>

</div>

### Fetch-Decode-Execute: a six-line narrative you can reproduce in exams

<div class="reader-section-body reader-section-body--apply">

1. `PC` holds the address of the next instruction.
2. Address is copied into `MAR`.
3. CU sends a read signal; memory sends instruction to `MDR`.
4. Instruction is copied to `CIR`; `PC` increments.
5. CU decodes opcode and operand.
6. Execute stage runs (often using ALU), with result commonly ending in `ACC`.

That sequence is short enough to memorise and detailed enough for high-mark "describe" questions.

</div>

### Performance factors: avoid the "clock speed only" mistake

<div class="reader-section-body reader-section-body--apply">

| Factor | Why it can improve performance | Trade-off to mention |
| --- | --- | --- |
| Clock speed | More cycles per second | More heat, potential instability if overclocked |
| Core count | Better parallel task handling | Gains depend on software and workload |
| Cache size | Faster access to frequently used data | Larger cache increases chip complexity/cost |
| Bus width | More bits moved each cycle | Needs matching architecture to benefit fully |

A strong exam answer compares at least two factors and includes a limitation, not just a benefit.

</div>

### Instruction set, opcode, operand: what the CPU can actually execute

<div class="reader-section-body reader-section-body--concept">

An instruction set is the total machine-level command list available to a CPU. Every machine instruction typically has:

- an <strong>opcode</strong> (what to do)
- an <strong>operand</strong> (which value/address to use).

| Instruction part | Example | Meaning |
| --- | --- | --- |
| Opcode | `LDA` | Load data operation |
| Operand | `2048` | Memory address used by the operation |

This is why executable compatibility depends on processor family: instruction sets differ.

<figure>
  <img src="/igcse/topic3/3.1 images/machine code instruction breakdown.png" alt="Machine instruction format showing opcode and operand parts." loading="lazy" decoding="async" />
  <figcaption>Instruction format: opcode + operand.</figcaption>
</figure>

</div>

### Embedded systems: same principles, narrower purpose

<div class="reader-section-body reader-section-body--example">

Embedded systems combine hardware and software for one dedicated function. They still use CPU, memory, and I/O principles from 3.1, but with tighter design constraints.

| Device | Embedded or general-purpose? | Reason |
| --- | --- | --- |
| Washing machine controller | Embedded | Dedicated cycle control only |
| Car ABS module | Embedded | Single safety function with sensor feedback |
| Smartphone used for many apps | General-purpose | Broad task range, not one fixed function |
| Desktop PC | General-purpose | Designed for many unrelated programs |

<figure>
  <img src="/igcse/topic3/3.1 images/embedded systems.png" alt="Examples of embedded systems in everyday devices." loading="lazy" decoding="async" />
  <figcaption>Embedded systems in context.</figcaption>
</figure>

<details>
  <summary><strong>Exam phrasing tip</strong></summary>
  In "identify and justify" questions, do not stop at naming the device type. Add one sentence about dedicated function, I/O loop, or constrained design.
</details>

</div>

### Final check before you move on

<div class="reader-section-body reader-section-body--apply">

You are ready for 3.1 if you can do all of these without notes:

- label CPU parts and explain their cooperation
- track `PC`, `MAR`, `MDR`, `CIR`, and `ACC` through one instruction cycle
- explain the role of address, data, and control buses
- compare at least two CPU performance factors with one trade-off
- distinguish embedded systems from general-purpose systems with a justified example.

</div>

## 3.2 Input & Output Devices

### Begin with purpose: why these devices matter

<div class="reader-section-body reader-section-body--concept">

Topic 3.2 is not just a list of gadgets. The core idea is that every computing system needs a bridge between digital processing and the real world:

- <strong>input devices</strong> capture data for processing
- <strong>output devices</strong> present results or trigger physical action.

In exam questions, marks come from matching the device to the context and explaining why it fits that context better than alternatives.

</div>

### Input and output at the checkout: barcode and QR in one system

<div class="reader-section-body reader-section-body--example">

A supermarket till is a useful model because many device types operate together.

| Device | Input or output | Job in the system |
| --- | --- | --- |
| barcode scanner | Input | Reads product key field |
| keypad/touchscreen | Input | Manual entry and item selection |
| monitor | Output | Shows item details and running total |
| speaker | Output | Audible success/error feedback |
| receipt printer | Output | Produces itemised paper record |

When a barcode is scanned:

1. Laser/LED light reflects from light and dark bars.
2. Sensors detect the reflected pattern.
3. Pattern is converted into digital data.
4. Product code is looked up in stock database.
5. Price and stock updates are returned to the till.

<figure>
  <img src="/igcse/topic3/3.2 images/barcode vs qr code.png" alt="Comparison of traditional barcodes and QR codes." loading="lazy" decoding="async" />
  <figcaption>Barcode vs QR: structure and practical use.</figcaption>
</figure>

</div>

### QR codes: why they are different from barcodes

<div class="reader-section-body reader-section-body--apply">

| Feature | Traditional barcode | QR code |
| --- | --- | --- |
| Data capacity | Lower | Much higher |
| Read direction | Line-based orientation rules | Matrix, easier orientation handling |
| Typical reader | Laser/LED scanner | Smartphone camera + app |
| Error handling | Limited redundancy | Better built-in error correction |

QR codes are especially useful for quick links (web pages, contacts, boarding passes), but they bring security risks too. A malicious QR code can redirect users to unsafe sites (often called attagging in classroom discussions).

</div>

### Capturing media input: digital camera and microphone

<div class="reader-section-body reader-section-body--concept">

A digital camera and a microphone both begin in the analogue world and end as digital values.

| Device | Physical input | Conversion route |
| --- | --- | --- |
| digital camera | Light | CCD/photodiodes -> electric charge -> ADC -> digital image |
| microphone | Sound wave | diaphragm movement -> electric current -> ADC -> digital sound |

This is the exam link back to Chapter 1 representation: the capture device and the file-size/quality model are connected.

<figure>
  <img src="/igcse/topic3/3.2 images/inside digital camera.png" alt="Digital camera internals showing sensor and processing flow." loading="lazy" decoding="async" />
  <figcaption>Digital camera capture pipeline.</figcaption>
</figure>

</div>

### Pointer, scanner, and touch input: selecting the right method

<div class="reader-section-body reader-section-body--apply">

An optical mouse remains a strong choice for precise pointing on desktop systems. It uses reflected light and image sampling (via CMOS/DSP) to track movement.

Scanners are chosen by task type:

- <strong>2D scanner</strong>: digitises paper documents/images
- <strong>3D scanner</strong>: captures shape data (x, y, z) for CAD/manufacturing models.

Touchscreens are a frequent comparison point:

| Touch technology | Detection principle | Strength | Limitation |
| --- | --- | --- | --- |
| resistive | pressure brings two layers into contact | works with finger, stylus, gloves | lower optical clarity, weaker multi-touch |
| capacitive | change in capacitance at touch point | high clarity and durability | may need conductive touch method |
| infra-red | beam interruption grid | multi-touch and unaffected by minor scratches | can be affected by moisture/light interference |

<figure>
  <img src="/igcse/topic3/3.2 images/touch screen tech.png" alt="Overview of major touchscreen technologies and how they detect input." loading="lazy" decoding="async" />
  <figcaption>Touchscreen technologies: resistive, capacitive, infra-red.</figcaption>
</figure>

</div>

### Output devices: display, print, projection, and physical control

<div class="reader-section-body reader-section-body--example">

Output devices either show information or create physical effects.

| Output family | Typical devices | Core job |
| --- | --- | --- |
| visual display | LED screen, LCD screen, OLED | present graphics/text to users |
| projected display | DLP projector, LCD projector | scale image for room/class display |
| printed output | inkjet printer, laser printer, 3D printer | create physical records/objects |
| physical action | actuator, speaker | movement or sound output |

<figure>
  <img src="/igcse/topic3/3.2 images/inkjet vs laser.png" alt="Comparison between inkjet and laser printing methods." loading="lazy" decoding="async" />
  <figcaption>Inkjet vs laser: mechanism and best-fit use case.</figcaption>
</figure>

</div>

### Inkjet vs laser: choose by workload, not preference

<div class="reader-section-body reader-section-body--apply">

| Printing context | Better fit | Why |
| --- | --- | --- |
| occasional colour pages/photos | inkjet | strong one-off colour quality and lower initial hardware cost |
| high-volume office batches | laser | faster page throughput and larger toner/paper capacity |

Method knowledge that examiners like:

- inkjet: droplets are ejected by thermal bubble or piezoelectric action
- laser: charged drum + toner + fuser process prints full page efficiently.

</div>

### Displays and projection: avoid the common wording mix-up

<div class="reader-section-body reader-section-body--concept">

Students frequently confuse these terms:

- many "LED TVs" are actually <strong>LCD panels with LED backlighting</strong>
- <strong>OLED</strong> is self-emissive (no backlight needed).

| Technology | Light source model | Typical outcome |
| --- | --- | --- |
| LCD (LED-backlit) | liquid crystals modulate separate backlight | thin and bright mainstream displays |
| LED display | LEDs form display elements directly | strong brightness, common in large signage |
| OLED | each pixel emits light directly | high contrast and flexible screen possibilities |

For projectors:

- DLP uses micromirror switching
- LCD projector splits light into colour channels and recombines through prism.

<figure>
  <img src="/igcse/topic3/3.2 images/lcd vs oled.png" alt="LCD and OLED screen technology comparison." loading="lazy" decoding="async" />
  <figcaption>LCD versus OLED: how light generation differs.</figcaption>
</figure>

</div>

### Sensors in 3.2: what they capture and where they fit

<div class="reader-section-body reader-section-body--example">

3.2 expects you to identify sensor purpose, captured data type, and suitable context.

| Sensor | Data captured | Typical context |
| --- | --- | --- |
| temperature | heat level | central heating, industrial process |
| moisture | water content in material/soil | greenhouse irrigation |
| humidity | water vapour in air | room/greenhouse climate control |
| light | brightness level | street-light switching |
| pressure | force/pressure value | reactor or industrial monitoring |
| infra-red (active/passive) | beam interruption or thermal radiation | intrusion detection, temperature sensing |
| acoustic | sound intensity/pattern | security or leak detection |
| pH | acidity/alkalinity level | chemical and agricultural control |
| magnetic field | field change | wheel-speed/ABS systems |
| proximity | nearby object presence | phone screen off when near ear |

<figure>
  <img src="/igcse/topic3/3.2 images/sensors cheat sheet.png" alt="Sensor categories and typical applications." loading="lazy" decoding="async" />
  <figcaption>Sensor selection quick-reference.</figcaption>
</figure>

</div>

### Monitoring vs control: same inputs, different intent

<div class="reader-section-body reader-section-body--apply">

| Mode | What system does | Feedback effect |
| --- | --- | --- |
| monitoring | observes and reports/alarms if out of range | does not directly change the process |
| control | observes and actively adjusts actuators/outputs | output changes the next sensor reading |

This distinction appears repeatedly in questions about hospitals, security systems, street lighting, central heating, ABS braking, and greenhouse automation.

</div>

### Quick 3.2 exam filter

<div class="reader-section-body reader-section-body--command">

Before finalising an answer, check four things:

- you named a device that actually matches the required data type
- you explained a mechanism (not only a label)
- you gave a context-based reason for suitability
- where relevant, you distinguished monitoring from control.

</div>
