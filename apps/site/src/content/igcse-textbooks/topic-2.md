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

</div>

### ARQ sequence you should be able to explain

<div class="reader-section-body reader-section-body--apply">

1. Sender transmits data block.
2. Sender waits for acknowledgement.
3. If acknowledgement arrives in time, send next block.
4. If timeout occurs, automatically retransmit.
5. Repeat until acknowledgement confirms successful receipt.

In exam responses, explicitly mention both `acknowledgement` and `timeout`; those two terms are the core of ARQ marks.

</div>

## 2.3 Encryption

### What encryption solves and what it does not

<div class="reader-section-body reader-section-body--concept">

On public networks, interception risk is always present. Encryption converts plaintext into ciphertext so intercepted data is unreadable without the correct key. It protects confidentiality, but it does not stop interception itself.

</div>

### Symmetric and asymmetric compared directly

<div class="reader-section-body reader-section-body--apply">

| Feature | Symmetric encryption | Asymmetric encryption |
| --- | --- | --- |
| Keys used | One shared key for both encrypt and decrypt | Public key encrypts, matching private key decrypts |
| Main advantage | Fast for large volumes of data | Solves shared-secret distribution problem |
| Main risk | Shared key must be exchanged securely | More complex key infrastructure |
| Typical classroom explanation | "Same key both sides" | "Public to lock, private to unlock" |

</div>

### Visual key flow: symmetric vs asymmetric

<div class="reader-section-body reader-section-body--example">

<div class="igcse-widget__split">
  <div class="igcse-step-card">
    <h4>Symmetric flow</h4>
    <p><code>Plaintext -> Encrypt(shared key K) -> Ciphertext -> Decrypt(shared key K) -> Plaintext</code></p>
    <ul>
      <li>Same key on both sides.</li>
      <li>Main risk is secure key sharing.</li>
    </ul>
  </div>
  <div class="igcse-step-card">
    <h4>Asymmetric flow</h4>
    <p><code>Plaintext -> Encrypt(receiver public key) -> Ciphertext -> Decrypt(receiver private key) -> Plaintext</code></p>
    <ul>
      <li>Public key can be shared openly.</li>
      <li>Private key stays with one user.</li>
    </ul>
  </div>
</div>

</div>

### Worked communication flow: Tom sends a confidential file to Jane

<div class="reader-section-body reader-section-body--example">

1. Jane generates a matched public/private key pair.
2. Jane shares only her public key with Tom.
3. Tom encrypts the file using Jane's public key.
4. Tom sends ciphertext over the network.
5. Jane decrypts using her private key.

Why this is secure in transit: knowing Jane's public key is not enough to derive her private key in practical time.

This is the critical distinction from symmetric encryption, where both sides need the same secret key and that key exchange becomes the weak point.

</div>

### Asymmetric sequence visual (Tom -> Jane)

<div class="reader-section-body reader-section-body--apply">

| Step | Tom (sender) | Network | Jane (receiver) |
| --- | --- | --- | --- |
| 1 | Requests Jane's public key | Public key can travel openly | Sends public key |
| 2 | Encrypts message using Jane's public key | Ciphertext transmitted | Receives ciphertext |
| 3 | Cannot decrypt with public key | Intercepted text still unreadable | Decrypts with Jane's private key |
| 4 | - | - | Recovers original plaintext |

</div>

### Vocabulary checkpoints that often lose marks

<div class="reader-section-body reader-section-body--apply">

- `plaintext` is the original readable message.
- `ciphertext` is the encrypted output.
- `encryption algorithm` is the process, not the key.
- `public key` can be shared.
- `private key` must never be shared.
- `check digit` is data-entry validation, not encryption and not packet integrity.

</div>
