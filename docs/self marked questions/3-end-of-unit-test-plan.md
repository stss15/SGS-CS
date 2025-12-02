# Topic 3 End of Unit Test Plan

## Goal
Create a comprehensive self-marking assessment for the entire Topic 3 (Hardware).

## Content Coverage
-   3.1 Computer Architecture (CPU, Von Neumann, F-D-E Cycle)
-   3.2 Input & Output Devices (Sensors, Printers, Screens)
-   3.3 Data Storage (RAM/ROM, Secondary Storage, Cloud)
-   3.4 Network Hardware (NIC, MAC, IP, Routers)

## Question Design

### Q1: CPU Registers (Matching)
**Source**: 3.1
-   **Pairs**:
    -   PC -> Holds the address of the next instruction to be fetched
    -   MAR -> Holds the address of the memory location currently being accessed
    -   MDR -> Holds the data fetched from or to be written to memory
    -   ACC -> Holds the results of calculations from the ALU

### Q2: Fetch-Decode-Execute Cycle (Ordering)
**Source**: 3.1
-   **Order**:
    1.  PC address is copied to MAR
    2.  Instruction is fetched to MDR
    3.  Instruction is copied to CIR
    4.  Instruction is decoded by the CU
    5.  Instruction is executed

### Q3: Input vs Output (Categorisation)
**Source**: 3.2
-   **Buckets**: Input, Output
-   **Items**:
    -   Barcode Scanner (Input)
    -   Sensor (Input)
    -   Microphone (Input)
    -   Actuator (Output)
    -   3D Printer (Output)
    -   Projector (Output)

### Q4: Printers (Dropdown Gap Fill)
**Source**: 3.2
-   **Text**:
    -   (Inkjet) printers use liquid ink and are good for photos.
    -   (Laser) printers use toner and static electricity.
    -   (3D) printers use additive manufacturing.
    -   (Dot Matrix) is an impact printer type (distractor).

### Q5: RAM vs ROM (Categorisation)
**Source**: 3.3
-   **Buckets**: RAM, ROM
-   **Items**:
    -   Volatile (RAM)
    -   Read/Write (RAM)
    -   Larger Capacity (RAM)
    -   Non-Volatile (ROM)
    -   Read Only (ROM)
    -   Stores BIOS (ROM)

### Q6: Storage Hierarchy (Ordering - Speed)
**Source**: 3.3
-   **Order (Fastest to Slowest)**:
    1.  CPU Cache
    2.  RAM
    3.  SSD
    4.  HDD
    5.  Optical Disc

### Q7: Optical Media (Matching)
**Source**: 3.3
-   **Pairs**:
    -   CD -> Red laser, ~700MB capacity
    -   DVD -> Red laser, ~4.7GB capacity
    -   Blu-ray -> Blue laser, ~25GB+ capacity

### Q8: MAC vs IP (Dropdown Gap Fill)
**Source**: 3.4
-   **Text**:
    -   A MAC address is a (Physical) address assigned by the manufacturer.
    -   An IP address is a (Logical) address assigned by the network.
    -   MAC addresses are (48) bits long (Hexadecimal).
    -   IPv4 addresses are (32) bits long (Denary).

### Q9: Network Hardware (Matching)
**Source**: 3.4
-   **Pairs**:
    -   Router -> Connects LAN to WAN and directs packets
    -   NIC -> Connects a device to a network
    -   Switch -> Connects devices within a LAN (smart)
    -   WAP -> Provides wireless connectivity

### Q10: Cloud & Virtual Memory (True/False - Dropdown)
**Source**: 3.3
-   **Text**:
    -   Virtual memory uses (HDD/SSD) to extend RAM.
    -   (Thrashing) happens when disk is overworked.
    -   (Public) cloud is hosted by third-party providers.
    -   (Private) cloud is hosted on dedicated servers.

## Implementation Details
-   **File**: `public/igcse/topic3/Topic3_End_of_unit_Test.html`
-   **Template**: `public/igcse/topic3/3.4_assessment.html`
