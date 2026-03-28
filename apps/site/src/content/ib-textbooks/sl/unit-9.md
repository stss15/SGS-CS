---
level: sl
unitNumber: 9
unitName: Computer Hardware and Operation
summary: A comprehensive textbook chapter covering the architecture, memory systems, storage technologies, compression techniques, and cloud services that underpin modern computing.
subtopics:
  - code: A1.1.1
    title: CPU components (ALU, CU, registers, buses)
  - code: A1.1.2
    title: Role of a graphics processing unit
  - code: A1.1.4
    title: Primary memory (RAM, ROM, Cache, Registers)
  - code: A1.1.5
    title: Machine instruction cycle
  - code: A1.1.7
    title: Secondary storage (Internal/External)
  - code: A1.1.8
    title: Compression
  - code: A1.1.9
    title: Cloud computing services
sourcePolicy: ib_content_md_first
---

## A1.1.1 Function and interaction of the main CPU components

### What is the central processing unit?

The central processing unit (CPU) is the component that carries out the majority of processing inside a computer. It is made up of two main units that work together: the **control unit (CU)** and the **arithmetic logic unit (ALU)**.

The control unit directs the operations of the processor. It is responsible for managing the fetch-decode-execute cycle, coordinating the computer's memory, ALU, and input/output devices so that each responds at the right moment. Think of the CU as an orchestra conductor: it does not play any instrument itself, but without it the musicians would have no idea when or how to play together.

The arithmetic logic unit performs all arithmetic and logic operations. Arithmetic operations include addition, subtraction, multiplication, and division. Logic operations include comparisons such as AND, OR, XOR, and NOT. Every calculation your computer performs, from adding up a spreadsheet column to deciding whether a password matches, passes through the ALU.

### Registers

Registers are very small amounts of storage located directly on the CPU. They hold temporary data that the processor is actively working on, and because they sit on the chip itself, they are the fastest form of memory in the entire system.

There are several registers, each with a specific purpose:

- **Instruction Register (IR):** When an instruction is fetched from memory, it is placed in the IR. This register holds the instruction that is currently being decoded and executed.
- **Program Counter (PC):** The PC holds the memory address of the *next* instruction to be fetched. Once an instruction is fetched, the PC updates automatically so the processor always knows where to look next.
- **Memory Address Register (MAR):** The MAR holds the address of the memory location currently being accessed. When the CPU needs to read or write data, it copies the relevant address into the MAR, which is then sent to memory via the address bus.
- **Memory Data Register (MDR):** The MDR holds data that has just been read from memory or data that is about to be written to memory. It acts as a buffer between the CPU and the rest of the system.
- **Accumulator (AC):** The accumulator stores intermediate results produced by the ALU. After the ALU performs a calculation, the result is placed here so it can be used in the next operation.

### Buses

Buses are the communication pathways that connect the CPU to memory, storage, and peripherals. They transfer data as electrical signals, and their width (measured in bits) determines how much information can travel at once. There are three main types:

**The control bus** carries command and timing signals between the CPU and other components. Signals on the control bus include read/write commands, interrupt requests, and the clock signal that keeps every part of the system synchronised. Because signals need to travel in both directions (the CPU sends commands *out*, but components also send status signals *back*), the control bus is bidirectional.

**The data bus** carries the actual data being processed: instructions, numbers, characters, and anything else the CPU needs to work with. Common data bus widths are 8, 16, 32, and 64 bits. A wider data bus means more data can be transferred in a single operation. Like the control bus, the data bus is bidirectional because data needs to move both to and from memory.

**The address bus** carries the memory address that identifies where data should be read from or written to. Its width determines the maximum amount of memory the system can address. A 32-bit address bus, for example, can address 2<sup>32</sup> (roughly 4.3 billion) unique memory locations. Unlike the other two buses, the address bus is typically unidirectional: addresses flow from the CPU outward.

### How the components interact

None of these components works in isolation. During every single instruction, the CU coordinates a precise sequence involving registers, the ALU, and buses. Consider what happens when the CPU executes the instruction `ADD 205`, stored at memory address `120`:

1. The PC contains `120`. This value is copied into the MAR and sent over the address bus to locate the instruction in memory.
2. Memory returns the instruction `ADD 205` along the data bus into the MDR, and the instruction is then loaded into the IR.
3. The PC increments to `121`, ready for the next fetch.
4. The CU decodes the IR and determines that the opcode is `ADD` and the operand address is `205`.
5. The address `205` is placed in the MAR. The data at that address is fetched into the MDR and passed to the ALU, which adds it to the current value in the accumulator.

This example illustrates the most important idea in this section: the CPU's power comes not from any one component, but from the seamless coordination between them all.

### Cores and co-processors

Modern CPUs come in several configurations. A **single-core processor** has one processing unit and can handle one task at a time. While it can run multiple programs by rapidly switching between them, only one instruction is truly executing at any given moment.

A **multi-core processor** contains two or more cores on a single chip, each capable of running instructions independently. Dual-core, quad-core, and octa-core processors are common today. Multi-core designs excel at multitasking and at running software that has been written to divide its workload across multiple cores. However, simply adding more cores does not automatically make every program faster: the software must be designed to take advantage of them, and many older programs are not.

A **co-processor** is a specialised processor built to support the main CPU with a specific type of task. By offloading particular work to a co-processor, both chips can operate in parallel, improving overall system throughput. The most well-known co-processor is the graphics processing unit (GPU), covered in the next section.


## A1.1.2 Role of a graphics processing unit

A graphics processing unit (GPU) is a specialised electronic circuit designed to accelerate the rendering of images, videos, and animations by performing rapid mathematical calculations. Originally developed to handle the demanding graphical workloads of video games and visual applications, GPUs have evolved to play a vital role in fields far beyond graphics.

### Graphics processing

Modern video games render millions of pixels every second. Each frame requires calculations for lighting, shading, texture mapping, and geometry. The GPU's architecture, consisting of thousands of small, efficient cores, allows it to process many of these calculations simultaneously. This **parallel processing** capability is what makes real-time 3D graphics possible.

### Video processing

GPUs also assist in decoding and encoding video files. Tasks such as playback, streaming, and editing benefit from the GPU's ability to process large blocks of pixel data at once. This is especially important for high-resolution content at 4K and above, where the sheer volume of data would overwhelm a CPU working alone.

### Artificial intelligence and machine learning

In the early 2000s, researchers discovered that GPUs were remarkably well suited to the kind of mathematics that underpins machine learning: multiplying large matrices and processing vast datasets in parallel. By the mid-2000s, GPUs had become essential tools for training AI models, dramatically reducing the time required to train complex neural networks. Today, GPU clusters are the backbone of large-scale AI research and deployment.

### How the CPU and GPU work together

In a typical video game, the CPU and GPU divide the workload according to their strengths:

1. **Player input:** The player presses a key. The CPU processes this input, updates the character's position based on game physics, and determines the new game state.
2. **Data preparation:** The CPU prepares the updated position and state data and sends it to the GPU.
3. **Rendering:** The GPU takes the game's 3D models, applies lighting, shading, and textures, and renders the scene as a two-dimensional image.
4. **Display:** The rendered frame is sent to the screen, providing immediate visual feedback to the player.

The CPU handles the decision-heavy, branching logic (game rules, AI behaviour, input processing), while the GPU handles the massively parallel numerical work (rendering millions of pixels). Performance depends on matching each task to the processor whose architecture suits it best.


## A1.1.4 Purposes of different primary memory types

Primary memory stores the data and instructions that the CPU needs in order to process tasks. Unlike secondary storage (covered in A1.1.7), primary memory is accessed directly by the CPU, which means speed is everything. There are several types of primary memory, each serving a different purpose in the system.

### RAM (Random Access Memory)

RAM holds the instructions and data for programs that are currently running. When you open an application on your phone or computer, the program's code and data are loaded from secondary storage into RAM so that the CPU can access them quickly.

RAM is **volatile**, which means it loses its contents when the power is turned off. This is why unsaved work is lost during a power cut, and why you must save your progress when playing a game: the save process writes data from volatile RAM to persistent secondary storage.

A real-world example of RAM in action is smartphone multitasking. When you switch away from an app, it stays in RAM so you can return to it instantly without reloading from scratch. Devices with more RAM can keep more apps ready in the background.

### ROM (Read-Only Memory)

ROM stores instructions that are rarely, if ever, changed. Its most important role is holding the BIOS (Basic Input/Output System) or UEFI firmware: the low-level code that initialises and tests the computer's hardware components when you press the power button, then loads the operating system from secondary storage into RAM.

ROM is **non-volatile**, meaning it retains its contents without power. While traditional ROM was truly read-only, most modern computers use flash-based ROM that can be updated (a process called "flashing the firmware"), allowing manufacturers to release improvements after the device has been sold.

In smartphones, ROM stores the operating system and core applications. These do not change unless you perform a system update, and they are preserved even when the battery runs flat. This is what ensures your phone boots up reliably every time.

### Cache (L1, L2, and L3)

Cache memory is a small, extremely fast type of memory that sits between the CPU and RAM. Its purpose is to store copies of data and instructions that the CPU is likely to need again soon, reducing the number of times the processor has to wait for the slower main memory.

Cache is organised into three levels, each trading size for speed:

- **L1 cache** is the smallest and fastest. It sits directly on the CPU core itself and is typically only a few tens of kilobytes per core (32 KB to 128 KB). Each core usually has its own L1 cache, split into separate sections for instructions and data. Accessing L1 is almost instantaneous.
- **L2 cache** is larger (256 KB to 2 MB per core) and slightly slower. It may be located on the CPU die or very close to it, and it provides a second layer of frequently used data when the L1 cache does not contain what is needed.
- **L3 cache** is the largest (2 MB to 64 MB or more) and slowest of the three, but it is still significantly faster than RAM. L3 cache is often shared across all cores in a multi-core processor.

The terms **cache hit** and **cache miss** describe what happens when the CPU looks for data. A cache hit occurs when the data is found in the cache, resulting in fast access. A cache miss means the data was not found, forcing the CPU to fetch it from the slower RAM or even from secondary storage. Systems with higher cache hit rates perform better because the CPU spends less time waiting for data.

Modern CPUs also use **prefetching**, a technique where the processor predicts what data will be needed next and loads it into cache ahead of time. Effective prefetching reduces cache misses and keeps the CPU working at closer to its full speed.

### The memory hierarchy

Together, registers, cache, RAM, and ROM form a **memory hierarchy**. At the top sit registers: tiny in capacity but blindingly fast. At the bottom sits RAM: vastly larger but slower to access. The hierarchy exists because of an inescapable engineering trade-off: memory that is very fast is also very expensive and physically large per bit, so it cannot be built in large quantities at reasonable cost. The system compensates by using small amounts of fast memory for the most critical data and larger amounts of slower memory for everything else.

| Level | Speed | Capacity | Volatile? | Primary role |
| --- | --- | --- | --- | --- |
| Registers | Fastest | Bytes | Yes | Immediate CPU working values |
| L1 Cache | Very fast | ~32-128 KB | Yes | Most frequently reused data |
| L2 Cache | Fast | ~256 KB-2 MB | Yes | Second-tier reused data |
| L3 Cache | Moderate-fast | ~2-64 MB | Yes | Shared across cores |
| RAM | Moderate | 4-64+ GB | Yes | Active programs and data |
| ROM | Moderate | Small (MB) | No | Firmware and boot code |


## A1.1.5 The fetch-decode-execute cycle

The fetch-decode-execute cycle (also called the machine instruction cycle) is the fundamental process by which a CPU executes every instruction in a program. No matter how complex a piece of software might appear, it ultimately reduces to this cycle, repeated billions of times per second.

### The three stages

1. **Fetch:** The CPU retrieves the next instruction from memory. The program counter (PC) provides the address, the address is placed in the MAR, and the instruction is returned via the data bus into the MDR and then the IR. The PC increments to point to the following instruction.
2. **Decode:** The control unit examines the instruction in the IR and determines what operation is required and what data (if any) is needed. This involves interpreting the opcode (the operation) and the operand (the data or address to operate on).
3. **Execute:** The CPU carries out the decoded instruction. This might involve the ALU performing a calculation, data being read from or written to memory, or a control flow change such as a jump to a different instruction.

The cycle then repeats with the next instruction pointed to by the updated PC. This continues until the program ends or the system halts.

### A worked example using Little Man Computer

The **Little Man Computer (LMC)** is an educational CPU model that uses a simplified assembly language to demonstrate how the fetch-decode-execute cycle works in practice. Each instruction is represented by a three-digit code stored in memory.

The key LMC instructions are:

| Instruction | Code | What it does |
| --- | --- | --- |
| INP | 901 | Input a value and store it in the accumulator |
| OUT | 902 | Output the value from the accumulator |
| LDA | 5XX | Load the value at address XX into the accumulator |
| STA | 3XX | Store the accumulator's value at address XX |
| ADD | 1XX | Add the value at address XX to the accumulator |
| SUB | 2XX | Subtract the value at address XX from the accumulator |
| HLT | 000 | Halt the program |
| BRA | 6XX | Branch (jump) to address XX |
| BRZ | 7XX | Branch to address XX if the accumulator is zero |
| BRP | 8XX | Branch to address XX if the accumulator is positive |
| DAT | N/A | Define a data value at this address |

Consider this small program:

```
LDA 4
ADD 5
STA 5
HLT
DAT 23
DAT 12
```

When assembled into memory, this becomes:

| Address | Code | Instruction |
| --- | --- | --- |
| 0 | 504 | LDA 4 |
| 1 | 105 | ADD 5 |
| 2 | 305 | STA 5 |
| 3 | 000 | HLT |
| 4 | 023 | DAT 23 |
| 5 | 012 | DAT 12 |

Now let us trace through the execution cycle by cycle:

**Cycle 1 (LDA 4):**
- **Fetch:** PC is 0. The instruction at address 0 (504) is fetched. The opcode `5` is stored in the instruction register and `04` in the address register. PC increments to 1.
- **Decode:** The CU interprets opcode `5` as "load into accumulator." The address register shows the data is at address 4.
- **Execute:** Address 4 is accessed. The value 23 is retrieved and placed in the accumulator.

**Cycle 2 (ADD 5):**
- **Fetch:** PC is 1. The instruction at address 1 (105) is fetched. `1` goes to the instruction register and `05` to the address register. PC increments to 2.
- **Decode:** Opcode `1` is decoded as "add to accumulator." The data to add is at address 5.
- **Execute:** Address 5 is accessed. The value 12 is fetched. The ALU adds 12 to the accumulator's current value of 23, producing 35. The accumulator now holds 35.

**Cycle 3 (STA 5):**
- **Fetch:** PC is 2. The instruction at address 2 (305) is fetched. PC increments to 3.
- **Decode:** Opcode `3` is decoded as "store accumulator to address." The target address is 5.
- **Execute:** The accumulator's value (35) is written to memory address 5, overwriting the previous value of 12.

**Cycle 4 (HLT):**
- **Fetch:** PC is 3. The instruction at address 3 (000) is fetched. PC increments to 4.
- **Decode:** Opcode `0` is decoded as "halt."
- **Execute:** The computer halts all operations and the program ends.

### Why the program counter updates during fetch, not execute

A common mistake is assuming the PC updates after the execute stage. In fact, the PC increments during (or immediately after) the fetch stage. This ensures the CPU always knows where to find the next instruction *before* the current one has even been decoded. If a branch instruction redirects execution to a different address, it overwrites the PC during the execute stage, but the default behaviour is always to increment during fetch.


## A1.1.7 Internal and external types of secondary memory storage

While primary memory provides fast, temporary storage for active programs, **secondary storage** is where data lives permanently. Secondary storage is non-volatile, meaning it retains information even when the power is turned off. It is where your operating system, applications, documents, photos, and everything else is stored long-term.

### Internal storage

Internal storage devices are built into or permanently installed inside a computer.

**Hard Disk Drives (HDD)** are an older but still widely used technology. Inside an HDD, data is stored on spinning magnetic platters. A read/write head moves across the platters to access different locations. HDDs offer large capacities at low cost, making them suitable for storing large media files, backups, and archives where access speed is less critical. However, because they rely on moving mechanical parts, they are slower, noisier, more power-hungry, and more vulnerable to physical damage than solid-state alternatives.

**Solid State Drives (SSD)** use flash memory with no moving parts. This makes them significantly faster than HDDs (typically 200-500 MB/s compared to 50-150 MB/s for HDDs), more durable, lighter, and silent in operation. SSDs are ideal for operating systems, applications, and games because their fast read and write speeds reduce boot times and loading screens. The trade-off is cost: SSDs are more expensive per gigabyte than HDDs, although the gap has been narrowing.

| Feature | HDD | SSD |
| --- | --- | --- |
| Storage technology | Spinning magnetic platters | Flash memory (no moving parts) |
| Speed | 50-150 MB/s typical | 200-500 MB/s typical |
| Durability | Vulnerable to physical shock | Resistant to physical shock |
| Noise | Audible (moving parts) | Silent |
| Power consumption | Higher | Lower |
| Cost per GB | Lower | Higher |
| Weight | Heavier | Lighter |

Modern SSDs come in several form factors. The **M.2 SSD** is particularly popular: roughly the size of a stick of chewing gum, it plugs directly into the motherboard. M.2 NVMe SSDs use the faster NVMe protocol rather than SATA, achieving read speeds well above 1,000 MB/s.

In low-cost devices like budget smartphones and entry-level laptops, **eMMC (Embedded MultiMediaCard)** storage is common. eMMC is a type of flash storage soldered directly onto the motherboard. While its speed and capacity do not match a dedicated SSD, it is adequate for basic computing tasks and keeps manufacturing costs low.

### External storage

External storage devices connect to a computer from outside and are designed to be portable or shared.

**External HDDs and SSDs** work identically to their internal counterparts but connect via USB or Thunderbolt. External SSDs are preferable when you need fast, portable access (transferring video footage on location, for example), while external HDDs suit large backups where speed matters less.

**Optical discs** such as CDs, DVDs, and Blu-Rays store data using laser-readable patterns on a reflective surface. While they are becoming increasingly rare in modern devices, they are still used for media distribution and long-term archiving. Optical discs are inexpensive per unit but have limited capacity and slow read/write speeds compared to flash-based storage. They are also susceptible to scratching and require a dedicated optical drive to read.

**Memory cards** (SD, microSD, CompactFlash) are compact flash-based storage devices commonly used in cameras, smartphones, and handheld gaming devices. They are durable, resistant to physical shocks and temperature extremes, and ideal for expanding storage in mobile devices. Their read/write speeds fall between optical discs and SSDs.

**Network Attached Storage (NAS)** is a dedicated file storage device connected to a local network. A NAS box typically contains multiple HDDs or SSDs configured in a RAID (Redundant Array of Independent Disks) setup for redundancy and performance. Multiple users and devices on the network can access the NAS simultaneously, making it ideal for centralised data storage, file sharing, and automated backups in homes and businesses. Capacity can be expanded by adding additional drives.


## A1.1.8 The concept of compression

Compression is the process of encoding information using fewer bits than the original representation. Smaller files take up less storage space and transfer faster across networks, making compression essential for efficient computing.

There are two fundamentally different approaches to compression: **lossless** and **lossy**.

### Lossless compression

Lossless compression reduces file size without losing any information. The original data can be perfectly reconstructed from the compressed version. This is critical for file types where every bit matters: text documents, spreadsheets, databases, source code, and executable programs. If even a single character were lost from a legal contract or a program's source code, the result could be meaningless or broken.

Lossless techniques work by identifying and eliminating **statistical redundancy**, patterns of repetition within the data that can be represented more efficiently.

### Run-length encoding (RLE)

Run-length encoding is one of the simplest lossless compression algorithms. It works by replacing consecutive repeated characters with a count-and-character pair.

For example, the string `AAAAABBBCCDAA` contains five runs of repeated characters:

- AAAAA (5 x A)
- BBB (3 x B)
- CC (2 x C)
- D (1 x D)
- AA (2 x A)

RLE encodes this as: `5A3B2C1D2A`

If each character takes 8 bits (1 byte), the original string is 13 bytes (104 bits). The encoded version is 10 bytes (80 bits), a 23% reduction.

RLE is extremely effective for data that contains long runs of identical values, such as simple graphics with large areas of solid colour. Fax machines historically used RLE to compress documents being sent over telephone lines, achieving compression ratios as high as 8:1 on text documents with large amounts of white space. However, for data without many repeated characters (such as a photograph), RLE can actually *increase* the file size, because every single character still needs a count digit in front of it.

### Lossy compression

Lossy compression achieves much greater reductions in file size by permanently discarding information that is considered less important. The original data cannot be perfectly reconstructed from a lossy-compressed file. This is acceptable for media files, images, audio, and video, where small losses in quality are often imperceptible to human senses.

For example, JPEG image compression works through a process called **transform coding**:

1. The image is divided into small blocks of pixels (typically 8 x 8).
2. A mathematical transform (the discrete cosine transform, or DCT) converts each block from pixel values into frequency components. Low-frequency components represent gradual changes in colour (broad areas), while high-frequency components represent fine detail and sharp edges.
3. A **quantiser** then reduces the precision of the high-frequency components more aggressively than the low-frequency ones. This is where data is permanently lost, but since the human eye is less sensitive to fine detail than to broad colour changes, the loss is often barely noticeable.
4. Finally, a symbol encoder applies further lossless compression (including RLE and Huffman coding) to the quantised data.

The result can be dramatic: a lossy-compressed JPEG might be 50% smaller than the original with almost no visible difference in quality to the human eye, while lossless compression of the same image might only achieve a 9% reduction.


## A1.1.9 Types of services in cloud implementation

Cloud computing has transformed how organisations manage their technology. Rather than buying and maintaining their own servers and infrastructure, businesses can rent computing resources over the internet, paying only for what they use. There are three primary cloud service models, each offering a different level of control and responsibility.

### Software as a Service (SaaS)

SaaS delivers complete, ready-to-use applications over the internet. Users access the software through a web browser without needing to install, maintain, or update anything locally. The cloud provider handles all infrastructure, maintenance, security patches, and updates behind the scenes.

SaaS is appealing because it is fast to adopt and requires minimal technical expertise. Users can access their software from any device with an internet connection, and subscription pricing is often cheaper than purchasing traditional software licences. Automatic updates mean users always have the latest features.

The trade-offs are real, however. SaaS depends entirely on an internet connection: without it, the software is inaccessible. Data security is also a concern, since all data is stored on the provider's servers rather than locally. And because the provider controls the software, there is limited ability to customise it to specific needs.

**Example:** Google Workspace provides Gmail, Google Docs, and Google Drive as SaaS products. Schools and businesses use them for email, document creation, and file storage without managing any of the underlying infrastructure.

### Platform as a Service (PaaS)

PaaS provides a cloud-based platform that allows developers to build, test, and deploy applications without managing the underlying infrastructure. The provider handles servers, storage, networking, and often databases and development tools. The developer focuses solely on writing and deploying application code.

PaaS accelerates software development because teams do not need to spend time configuring servers or installing runtime environments. It also makes scaling easier: as demand grows, the platform can automatically allocate more resources. However, PaaS can lead to **vendor lock-in**, where an application becomes difficult to move to a different platform because it depends on provider-specific tools and services.

**Example:** Microsoft Azure App Service is a PaaS offering. Developers can build and deploy web applications and APIs without managing the underlying servers, and the platform handles load balancing and scaling automatically.

### Infrastructure as a Service (IaaS)

IaaS provides the most fundamental cloud resources: virtualised computing power, storage, and networking. Users rent virtual machines and configure them with their own operating systems, software, and security settings. This gives organisations full control over their computing environment without the cost of purchasing and housing physical hardware.

IaaS is highly flexible and scalable. Businesses can spin up new virtual machines in minutes and shut them down when they are no longer needed, paying only for the time they were running. This model requires the most technical knowledge, however, because the user is responsible for managing the operating system, runtime environment, security, and applications.

**Example:** Amazon Web Services (AWS) EC2 allows businesses to create and manage virtual servers in the cloud. A startup might run its entire backend on EC2 instances, scaling up during traffic spikes and scaling down overnight to control costs.

### Choosing the right model

The three service models form a spectrum of control versus convenience:

| Aspect | SaaS | PaaS | IaaS |
| --- | --- | --- | --- |
| What you receive | Ready-to-use software | Development platform | Virtual infrastructure |
| What you manage | User accounts and data | Application code and config | OS, runtime, and applications |
| Technical expertise needed | Low | Medium | High |
| Flexibility / customisation | Low | Medium | High |
| Example | Google Workspace, Salesforce | Azure App Service, Heroku | AWS EC2, Google Compute Engine |

Regardless of the model, cloud computing is still physical infrastructure: real servers running in real data centres owned by the provider. What changes between the models is the boundary of responsibility, specifically who manages what, and how much control the user retains.
