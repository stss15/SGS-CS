---
topicNumber: 2
topicName: "Data Transmission"
summary: "Data is frequently transferred from one device to another. The two devices could be in the same building or thousands of kilometres away. Irrespective of the distance travelled, the transmission of data needs to be considered carefully. In this unit, we explore how data travels, how we catch errors during the journey, and how we keep it safe from prying eyes."
subtopics:
  - code: "2.1"
    title: "Data Transmission"
  - code: "2.2"
    title: "Error Checking"
  - code: "2.3"
    title: "Encryption"
sourcePolicy: igcse_textbook_then_syllabus_then_slides
---

## Unit Summary

Data is frequently transferred from one device to another. The two devices could be in the same building or thousands of kilometres away. Irrespective of the distance travelled, the transmission of data needs to be considered carefully. In this unit, we explore how data travels, how we catch errors during the journey, and how we keep it safe from prying eyes.

## Objectives and Outcomes

### Objectives

- Data Transmission: How data is broken into packets, routed across networks, and the different physical methods of sending bits (Serial vs Parallel, Simplex vs Duplex).
- Error Detection: The clever methods computers use to ensure the data received is exactly what was sent (Parity, Checksums, ARQ).
- Encryption: How we use mathematics (Symmetric and Asymmetric keys) to make data unreadable to unauthorised users.

### Outcomes

- Describe Processes: Clearly describe how packet switching works, including the role of the router, and how ARQ handles timeouts.
- Justify Choices: Explain why a specific transmission method (e.g., Serial vs Parallel) is suitable for a given scenario (e.g., sending data to a printer vs internal CPU data transfer).
- Calculate Parity: Given a byte of data, determine the correct parity bit for odd or even parity.
- Explain Encryption: Distinguish clearly between symmetric and asymmetric encryption, specifically mentioning the role of public and private keys.

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Packet | A block of transmitted data containing header, payload, and trailer. |
| Packet Header | Packet metadata such as source/destination addressing and sequence information. |
| Payload | The actual user data carried inside a packet. |
| Serial Transmission | Bits sent one after another along a channel. |
| Parallel Transmission | Multiple bits sent at the same time over multiple channels. |
| Simplex | One-way communication only. |
| Duplex | Two-way communication channel. |
| Parity Check | Error-detection method based on odd/even bit counts. |
| Checksum | Calculated value used to verify integrity of transferred data. |
| ARQ | Automatic Repeat reQuest protocol for retransmission after detected errors. |
| Symmetric Encryption | Same key used for encryption and decryption. |
| Asymmetric Encryption | Different public and private keys used for secure communication. |

## 2.1 Data Transmission

### Overview

- Large messages are broken into packets so routing can adapt to network congestion and failures.
- Transmission methods and modes affect speed, reliability, and practical cable length.
- Packet headers and sequence information allow packets to be reassembled correctly at the destination.

### Applied Understanding

- Use serial links for long-distance reliability and reduced crosstalk.
- Use packet sequence numbers to restore original message order after routing differences.
- Describe simplex, half-duplex, and full-duplex behaviour with real communication examples.

### Worked Example

**Worked packet-sequencing check**

This routine validates that incoming packet sequence numbers are continuous.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE ExpectedSequence : INTEGER
DECLARE ReceivedSequence : INTEGER
ExpectedSequence ← 1
REPEAT
  INPUT ReceivedSequence
  IF ReceivedSequence &lt;&gt; ExpectedSequence THEN
    OUTPUT "Packet out of sequence"
  ENDIF
  ExpectedSequence ← ExpectedSequence + 1
UNTIL ReceivedSequence = 0
</code></pre>

![Packet structure with header, payload, and trailer.](/igcse/topic2/2.1 images/data packet structure.png)

*Packet structure with header, payload, and trailer.*

## 2.2 Error Checking

### Overview

- Transmission and data entry can introduce errors that must be detected before processing.
- Parity, checksum, and check digits provide different strengths for different scenarios.
- ARQ combines checking with retransmission logic to maintain message integrity.
- This is why error checking is such an important part of computer technology.

### Applied Understanding

- Use parity and checksum for transmission integrity checks.
- Use check digits in identifiers like ISBN where manual entry errors are common.
- Explain timeout and acknowledgment behaviour in ARQ workflows.

### Worked Example

**Worked parity and ARQ decision**

This routine checks parity and requests retransmission when validation fails.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE OneCount : INTEGER
DECLARE IsParityValid : BOOLEAN
DECLARE Retry : BOOLEAN
INPUT OneCount
IsParityValid ← MOD(OneCount, 2) = 0
IF IsParityValid THEN
  OUTPUT "ACK"
  Retry ← FALSE
ELSE
  OUTPUT "NACK"
  Retry ← TRUE
ENDIF
OUTPUT "Retry required = ", Retry
</code></pre>

![ARQ acknowledgment and retransmission flow.](/igcse/topic2/2.2 images/arq.png)

*ARQ acknowledgment and retransmission flow.*

## 2.3 Encryption

### Overview

- Encryption protects data confidentiality by transforming readable plaintext into ciphertext.
- Symmetric methods use one shared key, while asymmetric methods use paired public/private keys.
- Practical security depends on key management as much as algorithm selection.

### Applied Understanding

- Use asymmetric methods to exchange keys securely over untrusted networks.
- Use symmetric methods for bulk data once a shared key is established.
- Justify why plaintext transmission is risky on public infrastructure.

### Worked Example

**Worked hybrid encryption flow**

This routine models a simplified hybrid process where a session key is protected first, then used for payload encryption.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE PublicKeyAvailable : BOOLEAN
DECLARE SessionKeyReady : BOOLEAN
INPUT PublicKeyAvailable
IF PublicKeyAvailable THEN
  OUTPUT "Encrypt session key with public key"
  SessionKeyReady ← TRUE
ELSE
  SessionKeyReady ← FALSE
ENDIF
IF SessionKeyReady THEN
  OUTPUT "Encrypt payload with symmetric session key"
ELSE
  OUTPUT "Cannot transmit securely"
ENDIF
</code></pre>

![Encryption workflow from plaintext to ciphertext.](/igcse/topic2/2.3 images/how encryption works.png)

*Encryption workflow from plaintext to ciphertext.*

