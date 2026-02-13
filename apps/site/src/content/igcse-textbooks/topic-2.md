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

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| data packet | A small part of a message that is sent across a network and later reassembled. |
| packet header | Section containing source and destination IP addresses, sequence number, and packet size. |
| payload | The actual data carried in the packet. |
| packet trailer | Section marking packet end and carrying error-check information such as CRC data. |
| packet switching | Transmission method where a message is split into packets that may travel by different routes. |
| node | A network stage that receives and forwards packets (routers are nodes). |
| simplex | Data flow in one direction only. |
| half-duplex | Data can move both ways, but not simultaneously. |
| full-duplex | Data can move both ways at the same time. |
| serial data transmission | Sending one bit at a time on one channel. |
| parallel data transmission | Sending multiple bits at the same time over multiple channels. |
| skewed data | Parallel bits arriving out of sync at the destination. |
| parity bit | Extra bit added to enforce odd or even parity. |
| checksum | Verification value calculated from a block of data and checked at the receiver. |
| echo check | Error check where data is returned to sender for comparison. |
| ARQ | Automatic Repeat reQuest using acknowledgements and timeouts. |
| check digit | Extra digit for data-entry validation, not packet-transmission validation. |
| plaintext | Readable original message before encryption. |
| ciphertext | Encrypted message after applying an algorithm. |
| symmetric encryption | Same key is used for both encryption and decryption. |
| asymmetric encryption | Uses a public key and a private key as a matched pair. |

## 2.1 Data Transmission

### Why packets are used in the first place

<div class="reader-section-body reader-section-body--concept">

If you send a large file as one uninterrupted stream, a single route fault can stall the whole transfer. Packet switching avoids that by splitting the message into manageable packets, each with enough metadata to travel independently and still be reassembled correctly.

| Packet part | What it contains | Why it matters |
| --- | --- | --- |
| Header | Source IP, destination IP, sequence number, packet size | Lets routers forward correctly and receiver rebuild in order |
| Payload | The user data | Core content being transmitted |
| Trailer | End marker + error-check information (for example CRC value) | Helps detect corruption and packet boundaries |

<figure>
  <img src="/igcse/topic2/2.1 images/data packet structure.png" alt="Data packet structure showing header, payload, and trailer fields." loading="lazy" decoding="async" />
  <figcaption>Packet anatomy used in exam explanations: header, payload, trailer.</figcaption>
</figure>

</div>

### Route selection and reassembly

<div class="reader-section-body reader-section-body--apply">

Routers make local decisions at each node. That is why packets from one message can arrive in a different order than they were sent.

- If one path is congested, later packets are routed elsewhere.
- If a line fails, packets can be redirected instead of abandoning the whole transfer.
- Destination device uses sequence numbers to reconstruct the original data.

This flexibility is a major strength, but it also creates two practical issues:

1. Delay while packets are reordered at destination.
2. Real-time streams (live audio/video) may stutter if late packets arrive out of sequence.

<figure>
  <img src="/igcse/topic2/2.1 images/packet switching.png" alt="Packet switching route diagram showing packets taking different network paths before reassembly." loading="lazy" decoding="async" />
  <figcaption>Packet switching in practice: independent routes, reassembled at destination.</figcaption>
</figure>

</div>

### Transmission mode and transmission method are different choices

<div class="reader-section-body reader-section-body--apply">

Students often mix these up. Mode is about direction. Method is about how bits travel physically.

| Category | Option | Typical context |
| --- | --- | --- |
| Direction mode | Simplex | Keyboard buffer to display, computer to printer |
| Direction mode | Half-duplex | Walkie-talkie style communication |
| Direction mode | Full-duplex | Broadband or phone call both ways simultaneously |
| Bit method | Serial | Longer distances, USB links, fewer synchronisation problems |
| Bit method | Parallel | Internal circuits and short distances where speed is critical |

Parallel is faster, but over longer runs its bits can become skewed (arriving out of sync). Serial is slower, but more reliable across distance.

<figure>
  <img src="/igcse/topic2/2.1 images/simplex, half and full duplex.png" alt="Simplex, half-duplex, and full-duplex data direction comparison." loading="lazy" decoding="async" />
  <figcaption>Direction modes: simplex, half-duplex, and full-duplex.</figcaption>
</figure>

<figure>
  <img src="/igcse/topic2/2.1 images/serial vs parallel.png" alt="Serial and parallel data transmission comparison over different channels and distances." loading="lazy" decoding="async" />
  <figcaption>Transmission methods: serial reliability over distance versus parallel short-range speed.</figcaption>
</figure>

<figure>
  <img src="/igcse/topic2/2.1 images/usb.png" alt="USB connection as a serial data transmission example in common computing devices." loading="lazy" decoding="async" />
  <figcaption>USB as a familiar real-world serial transmission interface.</figcaption>
</figure>

</div>

### Worked scenario: school server backup after lessons

<div class="reader-section-body reader-section-body--example">

A school sends a large media backup to a remote storage server each evening.

- The file is split into packets.
- Each packet gets source/destination addresses and sequence number.
- Routers forward packets over whichever route is currently practical.
- Some packets arrive out of order because routes differ.
- The destination reorders packets by sequence number and requests any missing packets again.

Why this is better than one continuous stream:

- Fault tolerance: route failures do not cancel the whole transfer.
- Scalability: multiple paths can be used.
- Control: missing/corrupt packets can be handled individually.

</div>

## 2.2 Error Checking

### Why transmission errors happen even on "good" networks

<div class="reader-section-body reader-section-body--concept">

Data can be corrupted by electrical interference, route disruption during packet switching, or synchronisation issues in parallel transfer. Computers cannot "guess" intended text the way humans can, so even small bit errors matter.

Error-check methods are therefore not optional extras; they are how systems decide whether received data is trustworthy.

</div>

### Parity, checksum, echo, ARQ: choose by purpose

<div class="reader-section-body reader-section-body--apply">

| Method | What it does | Strength | Limitation |
| --- | --- | --- | --- |
| Parity check | Adds one parity bit to enforce odd/even count of `1`s | Very fast and simple | Can miss errors if multiple bits flip in a way that keeps same parity |
| Checksum | Sends computed value from block; receiver recomputes and compares | Better block-level integrity checking | Detects mismatch but not exact bit location |
| Echo check | Receiver sends data back; sender compares | Direct comparison against original | Extra network traffic and delay |
| ARQ | Uses acknowledgement + timeout to trigger retransmission | Practical recovery workflow | Adds retransmission overhead |
| Check digit | Validates typed code number | Useful for data entry errors | Not a packet transmission check |

<figure>
  <img src="/igcse/topic2/2.2 images/check digit.png" alt="Check digit example used for validating entered code sequences." loading="lazy" decoding="async" />
  <figcaption>Check digit is a data-entry validation method, not a full transmission recovery method.</figcaption>
</figure>

<figure>
  <img src="/igcse/topic2/2.2 images/echo check.png" alt="Echo check process where received data is sent back for sender comparison." loading="lazy" decoding="async" />
  <figcaption>Echo check workflow: return and compare against original transmission.</figcaption>
</figure>

</div>

### Parity bit visual: even and odd in one glance

<div class="reader-section-body reader-section-body--example">

The parity bit is usually placed as the most significant bit (`P`).

<table class="igcse-bit-matrix">
  <thead>
    <tr>
      <th>Case</th>
      <th>P</th>
      <th>b1</th>
      <th>b2</th>
      <th>b3</th>
      <th>b4</th>
      <th>b5</th>
      <th>b6</th>
      <th>b7</th>
      <th>Total `1`s</th>
      <th>Parity target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data `1011001` with even parity</td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td>4</td>
      <td>Even met</td>
    </tr>
    <tr>
      <td>Data `1011001` with odd parity</td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td>5</td>
      <td>Odd met</td>
    </tr>
    <tr>
      <td>Data `1110000` with even parity</td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td>4</td>
      <td>Even met</td>
    </tr>
    <tr>
      <td>Data `1110000` with odd parity</td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">1</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td><span class="igcse-bit-chip">0</span></td>
      <td>3</td>
      <td>Odd met</td>
    </tr>
  </tbody>
</table>

<figure>
  <img src="/igcse/topic2/2.2 images/parity check.png" alt="Parity check illustration showing odd and even parity setup on binary data." loading="lazy" decoding="async" />
  <figcaption>Parity check concept: parity bit chosen to satisfy odd or even rule.</figcaption>
</figure>

</div>

### Worked parity walk-through

<div class="reader-section-body reader-section-body--example">

Assume even parity is agreed and you need to transmit `1110100` (7 bits):

- Current number of `1`s = 4 (already even).
- Even parity bit must therefore be `0`.
- Full transmitted byte is `01110100`.

Now suppose receiver gets `01100100`:

- Number of `1`s is now 3 (odd), which breaks even parity agreement.
- Receiver flags transmission error and can request retransmission.

Important limitation: if two bits changed, parity might still look correct. That is why parity is usually combined with stronger checks such as checksum and ARQ in real systems.

</div>

### Parity block visual: finding the exact wrong bit

<div class="reader-section-body reader-section-body--example">

Even parity can detect an error in one byte, but parity block helps you locate the bit by combining:

- horizontal parity check (each byte row)
- vertical parity check (each column), stored as a parity byte.

Example block (even parity):

<p><span class="igcse-status igcse-status--ok">PASS state: all parity checks match</span></p>

<table class="igcse-bit-matrix igcse-bit-matrix--parity-pass">
  <thead>
    <tr>
      <th>Byte</th>
      <th>P</th>
      <th>b1</th>
      <th>b2</th>
      <th>b3</th>
      <th>b4</th>
      <th>b5</th>
      <th>b6</th>
      <th>b7</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Byte 1</td>
      <td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td>
    </tr>
    <tr>
      <td>Byte 2</td>
      <td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td>
    </tr>
    <tr>
      <td>Byte 3</td>
      <td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">0</span></td>
    </tr>
    <tr>
      <td>Byte 4</td>
      <td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td>
    </tr>
    <tr>
      <td>Parity byte (vertical)</td>
      <td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td>
    </tr>
  </tbody>
</table>

<p><span class="igcse-status igcse-status--warn">FAIL state: one bit flips during transmission</span></p>

<table class="igcse-bit-matrix igcse-bit-matrix--parity-fail">
  <thead>
    <tr>
      <th>Byte</th>
      <th>P</th>
      <th>b1</th>
      <th>b2</th>
      <th>b3</th>
      <th>b4</th>
      <th>b5</th>
      <th class="igcse-col-heading--warn">b6</th>
      <th>b7</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Byte 1</td>
      <td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td class="igcse-col--warn"><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td>
    </tr>
    <tr>
      <td>Byte 2</td>
      <td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td class="igcse-col--warn"><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td>
    </tr>
    <tr class="igcse-row--warn">
      <td>Byte 3 (row fails)</td>
      <td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td class="igcse-col--warn igcse-cell--warn-strong"><span class="igcse-bit-chip igcse-bit-chip--warn">1</span></td><td><span class="igcse-bit-chip">0</span></td>
    </tr>
    <tr>
      <td>Byte 4</td>
      <td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">1</span></td><td class="igcse-col--warn"><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td>
    </tr>
    <tr>
      <td>Parity byte (vertical)</td>
      <td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td><td class="igcse-col--warn"><span class="igcse-bit-chip">0</span></td><td><span class="igcse-bit-chip">1</span></td>
    </tr>
  </tbody>
</table>

Suppose received Byte 3 changes from `11100100` to `11100110` (bit `b6` flips `0 -> 1`):

- Horizontal check: Byte 3 fails (red row).
- Vertical check: column `b6` fails (red column).
- Intersection (dark red cell) identifies the incorrect bit immediately.

This is the key teaching point: parity block can locate a single-bit error, not just report that "something is wrong."

<figure>
  <img src="/igcse/topic2/2.2 images/parity block.png" alt="Parity block grid showing row and column parity checks to locate a bit error." loading="lazy" decoding="async" />
  <figcaption>Parity block method: intersect failing row and column to find the corrupted bit.</figcaption>
</figure>

</div>

### ARQ sequence you should be able to explain

<div class="reader-section-body reader-section-body--apply">

1. Sender transmits data block.
2. Sender waits for acknowledgement.
3. If acknowledgement arrives in time, send next block.
4. If timeout occurs, automatically retransmit.
5. Repeat until acknowledgement confirms successful receipt.

In exam responses, explicitly mention both `acknowledgement` and `timeout`; those two terms are the core of ARQ marks.

<figure>
  <img src="/igcse/topic2/2.2 images/arq.png" alt="ARQ sequence diagram using acknowledgement and retransmission after timeout." loading="lazy" decoding="async" />
  <figcaption>ARQ sequence: send, wait for ACK, retransmit on timeout.</figcaption>
</figure>

</div>

## 2.3 Encryption

### Start with the purpose statement examiners look for

<div class="reader-section-body reader-section-body--concept">

Encryption is needed because transmitted data can be intercepted on public networks. It does not stop interception, but it transforms readable data into unreadable data for anyone without the correct key.

If you are writing a 2.3 answer, use this language:

- plaintext: original readable message
- ciphertext: encrypted unreadable output
- encryption algorithm: process that transforms plaintext
- key: value used to lock and unlock the message.

<figure>
  <img src="/igcse/topic2/2.3 images/encryption terminology.png" alt="Encryption terminology showing plaintext, ciphertext, encryption, and decryption." loading="lazy" decoding="async" />
  <figcaption>Core encryption terminology used in exam questions.</figcaption>
</figure>

</div>

### Symmetric encryption: efficient, but key sharing is the weak point

<div class="reader-section-body reader-section-body--apply">

Symmetric encryption uses one shared key for both encryption and decryption.

Chapter 2.3 models this with a repeated numeric key pattern, where letters are shifted by different amounts in sequence.

<div class="igcse-widget__split">
  <div class="igcse-step-card">
    <h4>Symmetric flow</h4>
    <ol>
      <li>Sender and receiver agree the same secret key.</li>
      <li>Sender encrypts plaintext using that key.</li>
      <li>Ciphertext is transmitted.</li>
      <li>Receiver decrypts using the same key.</li>
    </ol>
  </div>
  <div class="igcse-step-card">
    <h4>Risk to mention</h4>
    <ul>
      <li>The key has to be shared somehow.</li>
      <li>If the key exchange is intercepted, confidentiality fails.</li>
      <li>This is called the key distribution problem.</li>
    </ul>
  </div>
</div>

<figure>
  <img src="/igcse/topic2/2.3 images/symmetric encryption.png" alt="Symmetric encryption process using one shared key for both locking and unlocking." loading="lazy" decoding="async" />
  <figcaption>Symmetric encryption: one key, both directions.</figcaption>
</figure>

</div>

### Asymmetric encryption: public to lock, private to unlock

<div class="reader-section-body reader-section-body--example">

Asymmetric encryption was designed to reduce key-sharing risk. It uses a mathematically linked pair:

- public key: can be shared openly
- private key: kept secret by the owner.

<figure>
  <img src="/igcse/topic2/2.3 images/asymetric encryption.png" alt="Asymmetric encryption using public key for encryption and private key for decryption." loading="lazy" decoding="async" />
  <figcaption>Asymmetric encryption key pair model.</figcaption>
</figure>

</div>

### Worked communication sequence: Tom sends an encrypted file to Jane

<div class="reader-section-body reader-section-body--example">

| Step | Tom (sender) | Jane (receiver) | Security point |
| --- | --- | --- | --- |
| 1 | Requests Jane's public key | Generates and shares public key | Public key is shareable |
| 2 | Encrypts file with Jane's public key | - | Only matching private key can decrypt |
| 3 | Sends ciphertext over network | Receives ciphertext | Interception gives unreadable text |
| 4 | - | Decrypts with Jane's private key | Private key never leaves Jane |

Important clarification: Jane cannot decrypt with her own public key. Decryption requires the matching private key.

<figure>
  <img src="/igcse/topic2/2.3 images/how encryption works.png" alt="End-to-end encryption journey from plaintext to ciphertext and back to plaintext." loading="lazy" decoding="async" />
  <figcaption>Encryption workflow from sender to receiver.</figcaption>
</figure>

</div>

### Symmetric vs asymmetric: direct decision table

<div class="reader-section-body reader-section-body--apply">

| Feature | Symmetric encryption | Asymmetric encryption |
| --- | --- | --- |
| Keys used | One shared key | Public + private key pair |
| Speed | Usually faster for large data | Usually slower |
| Key distribution | Harder to secure | Easier public-key sharing |
| Main weakness | Shared key exposure risk | More complex infrastructure |
| Best one-line explanation | Same key both sides | Public key encrypts, private key decrypts |

</div>

### What to write for full marks in 2.3

<div class="reader-section-body reader-section-body--command">

- State clearly that encryption protects confidentiality during transmission.
- Distinguish plaintext and ciphertext accurately.
- Explain symmetric and asymmetric using key ownership, not just names.
- Include public/private key roles explicitly when describing asymmetric encryption.
- Mention that asymmetric encryption addresses key distribution problems found in symmetric methods.

</div>

### Common errors to avoid

<div class="reader-section-body reader-section-body--apply">

- saying encryption prevents interception (it does not)
- confusing `algorithm` with `key`
- claiming public and private keys are the same thing
- saying public key decrypts received ciphertext in the receiver model
- mixing encryption terms with error-checking terms like parity or checksum.

</div>
