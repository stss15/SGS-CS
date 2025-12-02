# Topic 2 End of Unit Assessment Plan

## Goal
Create a comprehensive self-marking assessment for Topic 2 (Data Transmission) covering 2.1, 2.2, and 2.3.

## Content Source
-   `docs/igcse-content/chapter-text-files/Chapter 2 Subfiles/2.1.txt`
-   `docs/igcse-content/chapter-text-files/Chapter 2 Subfiles/2.2.txt`
-   `docs/igcse-content/chapter-text-files/Chapter 2 Subfiles/2.3.txt`

## Question Design

### Q1: Data Transmission Terminology (Matching)
**Concept**: Definitions from 2.1.
-   **Pairs**:
    -   Simplex -> Data flows in one direction only
    -   Half-Duplex -> Data flows in both directions, but not at the same time
    -   Full-Duplex -> Data flows in both directions simultaneously
    -   Serial -> Data is sent one bit at a time over a single wire
    -   Parallel -> Data is sent multiple bits at a time over multiple wires

### Q2: Packet Switching (Ordering)
**Concept**: The process of packet switching from 2.1.
-   **Order**:
    1.  Data is broken down into packets
    2.  Each packet is given a header with IP addresses and sequence number
    3.  Packets are sent independently via different routes
    4.  Routers control the path of each packet
    5.  Packets arrive at the destination and are reordered
    6.  Corrupt or missing packets are requested again

### Q3: USB Features (True/False Drag)
**Concept**: Benefits and drawbacks of USB from 2.1.
-   **True**:
    -   It is an industry standard.
    -   Devices are automatically detected (plug and play).
    -   Connectors fit only one way (preventing incorrect connections).
    -   Can power devices as well as transmit data.
-   **False**:
    -   It uses parallel data transmission.
    -   It is only used for printers.
    -   It allows data to travel faster than fibre optic cables.

### Q4: Error Checking (Categorisation)
**Concept**: Distinguishing between error checks from 2.2.
-   **Buckets**: Parity Check, Checksum, Check Digit
-   **Items**:
    -   Uses an extra bit to make 1s even or odd (Parity Check)
    -   Can be horizontal and vertical (Parity Check)
    -   Calculated value sent at end of data block (Checksum)
    -   Uses an algorithm agreed by sender and receiver (Checksum)
    -   Final digit calculated from other digits (Check Digit)
    -   Used for ISBNs and barcodes (Check Digit)

### Q5: Encryption (Dropdown Gap Fill)
**Concept**: Symmetric vs Asymmetric from 2.3.
-   **Text**:
    -   (Symmetric) encryption uses a single key.
    -   (Asymmetric) encryption uses a public and private key.
    -   The (Public) key is shared with everyone.
    -   The (Private) key is kept secret.
    -   (Plaintext) is the original message.
    -   (Ciphertext) is the encrypted message.

### Q6: Error Detection Scenarios (Dropdown)
**Concept**: Applying knowledge to scenarios.
-   **Scenario**:
    -   A barcode scanner beeps to indicate an error. This is likely a (Check Digit) error.
    -   A file download fails because the calculated value doesn't match. This is a (Checksum) error.
    -   A single bit flips during transmission. A (Parity Check) might detect this.
    -   Data is sent back to the sender to check. This is an (Echo Check).

## Implementation Details
-   **File**: `public/igcse/topic2/topic2_assessment.html`
-   **Template**: `docs/agent/templates/igcse-assessment-template.md`
