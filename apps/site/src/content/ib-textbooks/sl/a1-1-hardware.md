---
level: sl
unitNumber: 20
unitName: Computer Hardware and Operation
summary: How a computer's hardware works at system level — CPU architecture, registers, buses, GPUs, memory hierarchy, the fetch–decode–execute cycle, storage technologies, compression, and cloud services.
subtopics:
  - code: A1.1.1
    title: CPU components (ALU, CU, registers, buses)
  - code: A1.1.2
    title: Role of a graphics processing unit
  - code: A1.1.4
    title: Primary memory (RAM, ROM, cache, registers)
  - code: A1.1.5
    title: The fetch–decode–execute cycle
  - code: A1.1.7
    title: Secondary storage (internal and external)
  - code: A1.1.8
    title: Compression
  - code: A1.1.9
    title: Cloud computing services
sourcePolicy: ib_content_md_first
---

## A1.1.1 CPU components and interactions

### The central processing unit

The <span data-def="The main processor in a computer, responsible for executing instructions by performing arithmetic, logic, and control operations.">central processing unit (CPU)</span> carries out the vast majority of processing inside a computer. It reads instructions from memory, decodes them, and carries them out — millions or billions of times per second.

Internally, the CPU is built from two main functional units that work in concert: the control unit and the arithmetic logic unit.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Control unit (CU)</p>
  <p class="ib-textbook-defn__body">The component of the CPU that manages the fetch–decode–execute cycle. It sends timing and control signals to coordinate memory, the ALU, and input/output devices so that each responds at the correct moment. The CU does not perform calculations itself.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Arithmetic logic unit (ALU)</p>
  <p class="ib-textbook-defn__body">The component of the CPU that performs all arithmetic operations (addition, subtraction, multiplication, division) and logic operations (AND, OR, NOT, XOR, comparisons). Every calculation the processor executes passes through the ALU.</p>
</div>

### Registers

<span data-def="Tiny, extremely fast storage locations built directly into the CPU. Each register holds a single value and is used during instruction execution.">Registers</span> are small storage locations built directly onto the CPU chip. Because they sit on the processor die itself, they are the fastest form of memory in the entire system — but also the smallest. Each register typically holds a single data value or address.

The key registers to know are:

- **Program counter (PC)** — holds the memory address of the *next* instruction to be fetched. After each fetch the PC updates automatically so the processor always knows where to look next.
- **Instruction register (IR)** — holds the instruction that is currently being decoded and executed.
- **Memory address register (MAR)** — holds the address of the memory location the CPU is about to read from or write to. This value is sent to memory via the address bus.
- **Memory data register (MDR)** — holds data that has just been read from memory, or data that is about to be written to memory. It acts as a buffer between the CPU and main memory.
- **Accumulator (ACC)** — stores intermediate results produced by the ALU so they can be used in subsequent operations.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Students sometimes confuse the MAR and MDR. Remember: the MAR holds an <em>address</em> (where to look), while the MDR holds the <em>data</em> found at that address (what was found there). The MAR points; the MDR carries.</p>
</div>

### Buses

<span data-def="Communication pathways that transfer data, addresses, and control signals between the CPU, memory, and peripherals.">Buses</span> are the electrical pathways that connect the CPU to memory, storage, and peripherals. Their width, measured in bits, determines how much information can travel in a single transfer.

There are three main buses:

**Data bus** — carries the actual data being processed: instructions, numbers, characters, and any other values the CPU works with. A wider data bus (32-bit vs 16-bit, for example) allows more data to be transferred per operation. The data bus is **bidirectional** because data flows both to and from memory.

**Address bus** — carries the memory address that identifies where data should be read from or written to. The width of the address bus determines how much memory the system can address: a 32-bit address bus can reference 2<sup>32</sup> (about 4.3 billion) unique locations. The address bus is **unidirectional** — addresses flow only from the CPU outward.

**Control bus** — carries command and timing signals: read/write commands, interrupt requests, and the clock signal that synchronises all components. The control bus is **bidirectional** because the CPU sends commands out, but components also send status and interrupt signals back.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Exam focus</p>
  <p class="ib-textbook-note__body">Be ready to state the direction of each bus and what it carries. A common exam question asks you to explain the role of each bus during a specific stage of the fetch–decode–execute cycle.</p>
</div>

### How the components interact

None of these components operates in isolation. During every instruction, the CU coordinates a precise sequence involving registers, the ALU, and buses. The following worked example traces a single instruction through the system.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing the instruction ADD 205</p>
  <div class="ib-textbook-worked__body">
    <p>Suppose the program counter holds the value <code>120</code>, meaning the next instruction is stored at memory address 120.</p>
    <ol>
      <li><strong>Fetch:</strong> The value <code>120</code> is copied from the PC into the MAR and sent over the address bus. Memory returns the instruction <code>ADD 205</code> along the data bus into the MDR. The instruction is then loaded into the IR. The PC increments to <code>121</code>.</li>
      <li><strong>Decode:</strong> The CU examines the IR and determines that the opcode is <code>ADD</code> and the operand is the address <code>205</code>.</li>
      <li><strong>Execute:</strong> The address <code>205</code> is placed in the MAR. The data stored at address 205 is fetched into the MDR and passed to the ALU, which adds it to the current value in the accumulator. The result is stored back in the accumulator.</li>
    </ol>
    <p>This sequence — fetch, decode, execute — repeats for every instruction the processor runs.</p>
  </div>
</div>

### Cores and co-processors

A <span data-def="A single processing unit within a CPU, capable of independently fetching and executing instructions.">core</span> is an independent processing unit within the CPU. Early processors had a single core and could execute only one instruction at a time. Modern CPUs are **multi-core**: they contain two, four, eight, or more cores on one chip, each capable of running instructions independently.

Multi-core processors improve performance for tasks that can be divided into parallel workloads. However, adding more cores does not automatically make every program faster — the software must be designed to split its work across multiple cores.

A <span data-def="A specialised processor designed to handle a specific type of task, working alongside the main CPU.">co-processor</span> is a specialised chip built to offload particular types of work from the main CPU. The most well-known co-processor is the graphics processing unit, covered in the next section.

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A1.1.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>The CPU consists of a control unit (CU) that directs operations and an arithmetic logic unit (ALU) that performs calculations.</li>
      <li>Registers (PC, IR, MAR, MDR, accumulator) are the fastest memory, located on the CPU itself.</li>
      <li>Three buses connect CPU components: data bus (bidirectional), address bus (unidirectional), and control bus (bidirectional).</li>
      <li>Multi-core CPUs contain several independent processing units; co-processors offload specialised tasks.</li>
    </ul>
  </div>
</div>


## A1.1.2 The graphics processing unit

A <span data-def="A specialised processor designed to handle parallel mathematical operations, originally developed for rendering graphics but now used across many compute-intensive fields.">graphics processing unit (GPU)</span> is a specialised processor originally developed to accelerate the rendering of images, video, and animation. Where a CPU is optimised for sequential processing — handling a few complex tasks very quickly — a GPU is designed for **massive parallelism**: it contains thousands of smaller cores that can each handle a simple calculation simultaneously.

This design makes GPUs exceptionally efficient at tasks that involve applying the same operation to large sets of data. Rendering a 3D scene, for example, requires calculating lighting, shading, and colour for millions of pixels per frame. A CPU would process these one by one; a GPU processes thousands at once.

### Beyond graphics

Although GPUs were built for visual processing, their parallel architecture has proved valuable in several other domains:

- **Machine learning** — training neural networks involves multiplying large matrices, a task GPUs handle far more efficiently than CPUs.
- **Scientific simulation** — weather modelling, molecular dynamics, and physics simulations all benefit from GPU acceleration.
- **Cryptocurrency mining** — the hashing operations used in mining are highly parallelisable.
- **Video encoding and transcoding** — converting video between formats is a data-parallel workload.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Note</p>
  <p class="ib-textbook-note__body">The IB syllabus asks you to describe the <em>role</em> of a GPU. At SL, you do not need to compare CPU and GPU architectures in detail — that is an HL extension (A1.1.3).</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A1.1.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>A GPU is a specialised processor designed for parallel mathematical operations.</li>
      <li>GPUs contain thousands of small cores, each handling simple calculations simultaneously.</li>
      <li>Beyond graphics, GPUs accelerate machine learning, scientific simulation, video encoding, and other data-parallel workloads.</li>
    </ul>
  </div>
</div>


## A1.1.4 Primary memory

Primary memory is the memory the CPU can access directly during processing. It is connected to the processor via the system bus and provides the data and instructions the CPU needs at speed. There are several types, each with a distinct role.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">RAM (Random Access Memory)</p>
  <p class="ib-textbook-defn__body">Volatile read/write memory that stores the data and instructions the CPU is currently working with. "Volatile" means its contents are lost when power is removed. RAM can be read from and written to at high speed, and is available in large capacities (typically 8–64 GB in modern systems).</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">ROM (Read-Only Memory)</p>
  <p class="ib-textbook-defn__body">Non-volatile memory that retains its contents when power is removed. ROM stores firmware — the low-level instructions a computer needs to start up (such as the BIOS or UEFI). It is typically small and, in its strictest form, cannot be modified after manufacture.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Cache memory</p>
  <p class="ib-textbook-defn__body">A small amount of very high-speed memory positioned between the CPU and RAM. Cache stores copies of frequently or recently accessed data so the CPU can retrieve it without waiting for the slower main memory. Modern CPUs have multiple cache levels: L1 (smallest, fastest, on each core), L2 (larger, slightly slower), and sometimes L3 (shared across cores).</p>
</div>

### The memory hierarchy

These memory types form a hierarchy based on speed, capacity, and cost:

| Memory type | Speed | Capacity | Volatility | Typical use |
|-------------|-------|----------|------------|-------------|
| Registers | Fastest | A few bytes | Volatile | Holding values during execution |
| Cache (L1/L2/L3) | Very fast | KB to MB | Volatile | Frequently accessed data and instructions |
| RAM | Fast | GB | Volatile | Currently running programs and data |
| ROM | Moderate | KB to MB | Non-volatile | Boot firmware (BIOS/UEFI) |

As you move down this hierarchy, memory becomes slower and cheaper per byte, but available in larger quantities. The CPU accesses registers in a single clock cycle; accessing RAM may take tens or hundreds of cycles. Cache exists specifically to bridge this gap.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Do not confuse primary memory with storage. RAM and ROM are primary memory — the CPU accesses them directly via the system bus. Hard drives and SSDs are secondary storage — they hold data persistently but the CPU cannot execute instructions from them directly.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A1.1.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Primary memory includes registers, cache, RAM, and ROM — all directly accessible by the CPU.</li>
      <li>RAM is volatile and holds currently active programs and data.</li>
      <li>ROM is non-volatile and stores boot firmware.</li>
      <li>Cache bridges the speed gap between registers and RAM by storing frequently accessed data close to the CPU.</li>
      <li>The memory hierarchy trades speed for capacity: faster memory is smaller and more expensive.</li>
    </ul>
  </div>
</div>


## A1.1.5 The fetch–decode–execute cycle

Every instruction a CPU processes passes through the same three-stage cycle: fetch, decode, execute. This cycle repeats continuously from the moment the computer is powered on until it shuts down.

### Fetch

The CPU retrieves the next instruction from memory:

1. The **program counter (PC)** holds the address of the next instruction.
2. This address is copied into the **MAR** and sent along the **address bus** to memory.
3. Memory returns the instruction along the **data bus** into the **MDR**.
4. The instruction is copied from the MDR into the **instruction register (IR)**.
5. The PC is incremented to point to the following instruction.

### Decode

The **control unit** examines the instruction in the IR and determines:

- the **opcode** — what operation to perform (add, subtract, load, store, compare, etc.),
- the **operand** — the data value or memory address the operation should act on.

The CU then generates the appropriate control signals to set up the required components.

### Execute

The instruction is carried out. What happens depends on the opcode:

- An **arithmetic or logic** instruction sends data to the ALU, which performs the operation and stores the result in the accumulator.
- A **load** instruction fetches data from memory into a register.
- A **store** instruction writes data from a register to memory.
- A **branch** instruction changes the PC to a new address, altering the program flow.

After execution, the cycle returns to the fetch stage and repeats.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing the FDE cycle for LDA 300</p>
  <div class="ib-textbook-worked__body">
    <p>The program counter holds <code>150</code>. The instruction at address 150 is <code>LDA 300</code> (load the value at address 300 into the accumulator).</p>
    <p><strong>Fetch:</strong> PC (150) → MAR → address bus → memory returns <code>LDA 300</code> via data bus → MDR → IR. PC increments to 151.</p>
    <p><strong>Decode:</strong> CU reads the IR. Opcode = <code>LDA</code> (load). Operand = <code>300</code>.</p>
    <p><strong>Execute:</strong> Address <code>300</code> → MAR → address bus → memory returns the data at address 300 via data bus → MDR → accumulator.</p>
    <p>The accumulator now holds whatever value was stored at memory address 300. The cycle continues with the instruction at address 151.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A1.1.5</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>The FDE cycle has three stages: fetch (retrieve instruction), decode (interpret it), execute (carry it out).</li>
      <li>The PC, MAR, MDR, and IR each play a specific role during the fetch stage.</li>
      <li>The CU decodes instructions; the ALU executes arithmetic and logic operations.</li>
      <li>The cycle repeats continuously — it is the fundamental operating rhythm of every CPU.</li>
    </ul>
  </div>
</div>


## A1.1.7 Secondary storage

Secondary storage holds data persistently — it retains information even when the computer is powered off. Unlike primary memory, the CPU cannot execute instructions directly from secondary storage; data must first be loaded into RAM.

Secondary storage is divided into **internal** devices (installed inside the computer) and **external** devices (connected via ports or wirelessly).

### Internal storage

<span data-def="A storage device that uses spinning magnetic platters and a read/write head to store data. Offers high capacity at low cost but is slower than solid-state alternatives.">Hard disk drives (HDDs)</span> store data on spinning magnetic platters. A read/write head moves across the surface to access data. HDDs offer large capacities (1–20 TB) at low cost per gigabyte, but their mechanical parts make them slower and more vulnerable to physical damage than solid-state alternatives.

<span data-def="A storage device that uses flash memory chips with no moving parts. Faster, more durable, and more energy-efficient than HDDs, but more expensive per gigabyte.">Solid-state drives (SSDs)</span> store data in interconnected flash memory chips with no moving parts. This makes them significantly faster than HDDs for both reading and writing, as well as quieter, lighter, and more resistant to physical shock. SSDs cost more per gigabyte but are increasingly the standard for primary storage.

### External storage

- **USB flash drives** — small, portable solid-state devices connected via USB. Convenient for transferring files between machines.
- **External hard drives / SSDs** — full-capacity drives in enclosures, connected via USB, Thunderbolt, or other ports. Used for backups and large file transport.
- **Optical discs** (CD, DVD, Blu-ray) — data is read and written using a laser. Largely replaced by faster alternatives for everyday use, but still used for media distribution and archival.
- **Network-attached storage (NAS)** — storage devices connected over a local network, providing shared file access to multiple users.

### Comparing storage types

| Feature | HDD | SSD | USB flash drive | Optical disc |
|---------|-----|-----|-----------------|--------------|
| Speed | Moderate | Fast | Moderate | Slow |
| Capacity | Very high (up to 20 TB) | High (up to 8 TB) | Low–moderate (up to 1 TB) | Low (up to 128 GB) |
| Durability | Fragile (moving parts) | Durable (no moving parts) | Durable | Fragile (scratches) |
| Portability | Low (internal) | Low–moderate | High | High |
| Cost per GB | Low | Moderate | Moderate | Low |

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A1.1.7</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Secondary storage is non-volatile — data persists without power.</li>
      <li>Internal storage includes HDDs (high capacity, low cost, mechanical) and SSDs (fast, durable, no moving parts).</li>
      <li>External storage includes USB drives, external HDDs/SSDs, optical discs, and network-attached storage.</li>
      <li>The choice of storage depends on speed, capacity, durability, portability, and cost requirements.</li>
    </ul>
  </div>
</div>


## A1.1.8 Compression

<span data-def="The process of reducing the size of a file by encoding its data more efficiently, making it faster to transmit and requiring less storage space.">Compression</span> reduces the size of a file so it takes up less storage space and can be transmitted faster across a network. There are two fundamentally different approaches.

### Lossless compression

<span data-def="A compression method that reduces file size without discarding any data. The original file can be perfectly reconstructed from the compressed version.">Lossless compression</span> encodes data more efficiently without removing any information. The original file can be perfectly reconstructed from the compressed version.

Lossless algorithms work by identifying and eliminating redundancy. For example, **run-length encoding (RLE)** replaces repeated sequences with a count and a single instance: the string `AAAAAABBCC` becomes `6A2B2C`. More sophisticated algorithms, such as those used in ZIP and PNG formats, find patterns across entire files.

Lossless compression is essential where data integrity matters: text documents, program code, spreadsheets, and medical images all require exact reconstruction.

### Lossy compression

<span data-def="A compression method that achieves greater size reduction by permanently discarding data deemed less important to human perception. The original file cannot be perfectly reconstructed.">Lossy compression</span> achieves much greater size reductions by permanently removing data that is considered less important to human perception. The original cannot be fully recovered.

JPEG image compression, for example, discards fine colour detail the human eye is unlikely to notice. MP3 audio compression removes frequencies most listeners cannot hear. The result is a much smaller file with a quality reduction that, at moderate compression levels, is difficult to perceive.

Lossy compression is standard for media distribution — streaming video, music libraries, and web images all rely on it.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Do not describe lossy compression as "removing unimportant data" without qualification. The data removed <em>is</em> real — it is discarded because human perception is unlikely to notice its absence, not because it has no value. Repeated lossy compression degrades quality further each time.</p>
</div>

### Choosing a compression method

| Criterion | Lossless | Lossy |
|-----------|----------|-------|
| Data loss | None | Permanent |
| File size reduction | Moderate (typically 20–60%) | High (up to 90%+) |
| Reversibility | Fully reversible | Not reversible |
| Best for | Text, code, databases, medical imaging | Photos, music, video, web media |
| Common formats | ZIP, PNG, FLAC | JPEG, MP3, MP4, AAC |

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A1.1.8</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Compression reduces file size for more efficient storage and transmission.</li>
      <li>Lossless compression preserves all original data and is fully reversible (ZIP, PNG).</li>
      <li>Lossy compression permanently discards perceptually less important data for greater size reduction (JPEG, MP3).</li>
      <li>The choice depends on whether exact data reconstruction is required.</li>
    </ul>
  </div>
</div>


## A1.1.9 Cloud computing services

<span data-def="The delivery of computing resources — servers, storage, databases, networking, software — over the internet on a pay-as-you-go or subscription basis, rather than owning and maintaining local hardware.">Cloud computing</span> delivers computing resources over the internet rather than from local hardware. Instead of purchasing and maintaining physical servers, organisations rent capacity from a cloud provider and pay for what they use.

Cloud services are commonly categorised into three models, each offering a different level of abstraction.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Infrastructure as a Service (IaaS)</p>
  <p class="ib-textbook-defn__body">The provider supplies virtualised computing resources — servers, storage, and networking — over the internet. The customer manages the operating system, middleware, and applications. Examples: Amazon Web Services (AWS) EC2, Microsoft Azure Virtual Machines, Google Compute Engine.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Platform as a Service (PaaS)</p>
  <p class="ib-textbook-defn__body">The provider supplies a managed platform for developing, running, and managing applications. The customer writes and deploys code without managing the underlying infrastructure. Examples: Google App Engine, Heroku, Microsoft Azure App Service.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Software as a Service (SaaS)</p>
  <p class="ib-textbook-defn__body">The provider delivers a complete, ready-to-use application over the internet. The customer simply uses the software, with no responsibility for infrastructure, platform, or maintenance. Examples: Google Workspace, Microsoft 365, Salesforce.</p>
</div>

### Comparing service models

| Aspect | IaaS | PaaS | SaaS |
|--------|------|------|------|
| Customer manages | OS, apps, data | Apps, data | Data only |
| Provider manages | Hardware, virtualisation | Hardware, OS, runtime | Everything |
| Flexibility | Highest | Moderate | Lowest |
| Technical skill required | High | Moderate | Low |
| Example | AWS EC2 | Google App Engine | Google Docs |

### Benefits and limitations of cloud computing

**Benefits:**

- **Scalability** — resources can be increased or decreased on demand without purchasing physical hardware.
- **Cost** — pay-per-use pricing avoids large upfront capital expenditure.
- **Accessibility** — data and applications can be accessed from anywhere with an internet connection.
- **Reliability** — major providers offer high uptime guarantees and automatic backups.

**Limitations:**

- **Internet dependency** — cloud services require a stable internet connection; outages disrupt access.
- **Security and privacy** — data is stored on third-party servers, raising concerns about unauthorised access and regulatory compliance.
- **Ongoing costs** — subscription fees accumulate over time and may exceed the cost of local infrastructure for some workloads.
- **Vendor lock-in** — migrating between providers can be technically complex and expensive.

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A1.1.9</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Cloud computing provides computing resources over the internet on a pay-as-you-go basis.</li>
      <li>IaaS provides raw infrastructure; PaaS provides a managed development platform; SaaS provides ready-to-use software.</li>
      <li>Benefits include scalability, cost flexibility, and accessibility; limitations include internet dependency, security concerns, and vendor lock-in.</li>
    </ul>
  </div>
</div>
