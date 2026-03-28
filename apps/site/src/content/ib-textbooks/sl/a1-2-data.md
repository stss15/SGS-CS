---
level: sl
unitNumber: 21
unitName: Data Representation and Computer Logic
summary: How computers represent numbers, text, images, and sound using binary — and how logic gates, truth tables, and logic diagrams form the foundation of digital circuit design.
subtopics:
  - code: A1.2.1
    title: Number systems and data representation
  - code: A1.2.2
    title: Binary storage of data
  - code: A1.2.3
    title: Logic gates
  - code: A1.2.4
    title: Truth tables
  - code: A1.2.5
    title: Logic diagrams
sourcePolicy: ib_content_md_first
---

## A1.2.1 Number systems and data representation

All data inside a computer — whether it represents numbers, text, images, or sound — is stored as binary: sequences of 1s and 0s. Understanding how different number systems work and how to convert between them is fundamental to understanding how computers process information.

### Binary (base 2)

The <span data-def="A number system using only two digits, 0 and 1. Each digit position represents a power of 2. Binary is the native number system of digital computers.">binary</span> number system uses two digits: `0` and `1`. Each digit position represents a power of 2, starting from 2<sup>0</sup> on the right.

A single binary digit is called a **bit**. Eight bits form a **byte**, which can represent 2<sup>8</sup> = 256 different values (0–255).

| Position | 2<sup>7</sup> | 2<sup>6</sup> | 2<sup>5</sup> | 2<sup>4</sup> | 2<sup>3</sup> | 2<sup>2</sup> | 2<sup>1</sup> | 2<sup>0</sup> |
|----------|-------|-------|-------|-------|-------|-------|-------|-------|
| Value    | 128   | 64    | 32    | 16    | 8     | 4     | 2     | 1     |

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Converting binary to denary</p>
  <div class="ib-textbook-worked__body">
    <p>Convert <code>11010110</code> to denary (base 10).</p>
    <p>Write out the place values and add those where the bit is 1:</p>
    <p>128 + 64 + 0 + 16 + 0 + 4 + 2 + 0 = <strong>214</strong></p>
  </div>
</div>

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Converting denary to binary</p>
  <div class="ib-textbook-worked__body">
    <p>Convert <strong>77</strong> to binary.</p>
    <p>Find the largest power of 2 that fits, subtract, and repeat:</p>
    <ul>
      <li>77 − 64 = 13 → bit 6 is 1</li>
      <li>13 − 8 = 5 → bit 3 is 1</li>
      <li>5 − 4 = 1 → bit 2 is 1</li>
      <li>1 − 1 = 0 → bit 0 is 1</li>
    </ul>
    <p>Result: <code>01001101</code></p>
  </div>
</div>

### Hexadecimal (base 16)

<span data-def="A number system using sixteen symbols (0–9 and A–F). Each hexadecimal digit maps exactly to four binary digits, making it a compact way to represent binary values.">Hexadecimal</span> uses sixteen symbols: `0–9` and `A–F` (where A = 10, B = 11, C = 12, D = 13, E = 14, F = 15). Each hex digit represents exactly four binary bits, which makes hex a compact and human-readable way to express binary values.

| Hex | Binary | Denary |
|-----|--------|--------|
| 0   | 0000   | 0      |
| 1   | 0001   | 1      |
| 2   | 0010   | 2      |
| 3   | 0011   | 3      |
| 4   | 0100   | 4      |
| 5   | 0101   | 5      |
| 6   | 0110   | 6      |
| 7   | 0111   | 7      |
| 8   | 1000   | 8      |
| 9   | 1001   | 9      |
| A   | 1010   | 10     |
| B   | 1011   | 11     |
| C   | 1100   | 12     |
| D   | 1101   | 13     |
| E   | 1110   | 14     |
| F   | 1111   | 15     |

Hexadecimal is widely used to represent memory addresses, colour codes (e.g., `#FF5733`), MAC addresses, and error codes — anywhere that raw binary would be impractically long.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Converting between hex and binary</p>
  <div class="ib-textbook-worked__body">
    <p><strong>Hex to binary:</strong> Convert <code>3F</code> to binary.</p>
    <p>Split each hex digit into four bits: <code>3</code> = <code>0011</code>, <code>F</code> = <code>1111</code>.</p>
    <p>Result: <code>00111111</code></p>
    <p><strong>Binary to hex:</strong> Convert <code>10110100</code> to hex.</p>
    <p>Group into nibbles (4 bits): <code>1011</code> = <code>B</code>, <code>0100</code> = <code>4</code>.</p>
    <p>Result: <code>B4</code></p>
  </div>
</div>

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Why hexadecimal?</p>
  <p class="ib-textbook-note__body">Hexadecimal exists for human convenience, not for the computer. The machine always operates in binary. Hex simply provides a shorter notation: the 8-bit binary value <code>11111111</code> is just <code>FF</code> in hex, and a 32-bit address becomes 8 hex digits instead of 32 binary digits.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A1.2.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Computers store all data in binary (base 2). Each bit is a 0 or 1; eight bits form a byte.</li>
      <li>Denary-to-binary conversion uses place values (powers of 2); binary-to-denary sums the active place values.</li>
      <li>Hexadecimal (base 16) provides a compact way to represent binary — each hex digit maps to exactly four bits.</li>
      <li>You must be able to convert fluently between binary, denary, and hexadecimal.</li>
    </ul>
  </div>
</div>


## A1.2.2 How binary is used to store data

Computers store all types of data — text, images, audio, video — as binary. What differs is the *encoding scheme*: the agreed rules that map binary patterns to meaningful information.

### Text encoding

Each character (letter, digit, punctuation mark, symbol) is assigned a unique binary code. The most important encoding systems are:

**ASCII** (American Standard Code for Information Interchange) uses 7 bits per character, giving 128 possible values (0–127). It covers uppercase and lowercase English letters, digits, punctuation, and control characters. For example, the character `A` is stored as `1000001` (65 in denary).

**Extended ASCII** uses 8 bits (one byte), allowing 256 characters. The extra 128 codes accommodate accented characters and additional symbols used in Western European languages.

**Unicode** is a universal standard that aims to represent every character from every writing system in the world — Latin, Cyrillic, Arabic, Chinese, Japanese, Korean, emoji, and more. Unicode defines over 149,000 characters.

<span data-def="A variable-length Unicode encoding that uses 1 to 4 bytes per character. It is backward-compatible with ASCII and is the dominant encoding on the web.">UTF-8</span> is the most common Unicode encoding. It uses 1 byte for standard ASCII characters and 2–4 bytes for other characters, making it efficient for text that is mostly English while still supporting the full Unicode range.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">ASCII and Unicode are not competing systems. Unicode is a superset that includes ASCII — the first 128 Unicode code points are identical to ASCII. UTF-8 is an <em>encoding</em> of Unicode, not a separate character set.</p>
</div>

### Image representation

Digital images are stored as a grid of <span data-def="The smallest addressable element of a digital image. Each pixel holds colour data for one point in the image.">pixels</span> (picture elements). Each pixel stores a colour value, and the entire grid forms the image.

Two key properties determine image quality and file size:

- **Resolution** — the number of pixels in the image, typically expressed as width × height (e.g., 1920 × 1080). Higher resolution means more detail but a larger file.
- **Colour depth** — the number of bits used to represent the colour of each pixel. A 1-bit image has two colours (black and white); an 8-bit image has 256 colours; a 24-bit image (8 bits each for red, green, blue) has over 16.7 million colours.

The file size of an uncompressed image can be calculated:

**File size = resolution (total pixels) × colour depth (bits per pixel)**

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Calculating image file size</p>
  <div class="ib-textbook-worked__body">
    <p>An image has a resolution of 800 × 600 pixels and a colour depth of 24 bits.</p>
    <p>Total pixels = 800 × 600 = 480,000</p>
    <p>Total bits = 480,000 × 24 = 11,520,000 bits</p>
    <p>Total bytes = 11,520,000 ÷ 8 = 1,440,000 bytes ≈ <strong>1.37 MB</strong></p>
  </div>
</div>

### Audio representation

Sound is an analogue signal — a continuous wave of air pressure changes. To store it digitally, the wave must be converted into discrete binary values through a process called <span data-def="The process of converting an analogue signal into a digital representation by measuring (sampling) the signal at regular intervals and encoding each measurement as a binary number.">analogue-to-digital conversion (ADC)</span>.

Two key properties determine audio quality and file size:

- **Sample rate** — how many times per second the sound wave is measured (in hertz, Hz). CD-quality audio uses 44,100 Hz (44.1 kHz), meaning the wave is sampled 44,100 times per second.
- **Bit depth** (sample resolution) — the number of bits used to record each sample. A higher bit depth captures more detail in amplitude. CD audio uses 16-bit depth, providing 65,536 possible amplitude levels per sample.

The file size of uncompressed audio can be calculated:

**File size = sample rate × bit depth × duration (seconds) × number of channels**

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Calculating audio file size</p>
  <div class="ib-textbook-worked__body">
    <p>A stereo (2-channel) audio clip is 30 seconds long, recorded at 44,100 Hz with a 16-bit depth.</p>
    <p>Total samples = 44,100 × 30 = 1,323,000 per channel</p>
    <p>Total bits = 1,323,000 × 16 × 2 = 42,336,000 bits</p>
    <p>Total bytes = 42,336,000 ÷ 8 = 5,292,000 bytes ≈ <strong>5.05 MB</strong></p>
  </div>
</div>

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Note</p>
  <p class="ib-textbook-note__body">Increasing the sample rate or bit depth improves quality but increases file size proportionally. This trade-off is why audio and image compression (covered in A1.1.8) is so widely used.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A1.2.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Text is encoded using character sets: ASCII (7-bit, 128 characters), Extended ASCII (8-bit, 256 characters), or Unicode/UTF-8 (variable length, all world scripts).</li>
      <li>Images are grids of pixels; file size depends on resolution and colour depth.</li>
      <li>Audio is digitised by sampling the analogue wave; file size depends on sample rate, bit depth, duration, and channels.</li>
      <li>Higher quality settings always mean larger file sizes.</li>
    </ul>
  </div>
</div>


## A1.2.3 Logic gates

<span data-def="An electronic circuit that takes one or more binary inputs and produces a single binary output according to a fixed logical rule.">Logic gates</span> are the fundamental building blocks of digital circuits. Each gate takes one or more binary inputs (0 or 1) and produces a single binary output according to a specific Boolean rule.

All computer processing — from simple addition to complex AI — is ultimately built from combinations of logic gates.

### The basic gates

**AND gate** — outputs 1 only when *all* inputs are 1.

| A | B | A AND B |
|---|---|---------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**OR gate** — outputs 1 when *at least one* input is 1.

| A | B | A OR B |
|---|---|--------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**NOT gate** — has a single input and inverts it: 0 becomes 1, and 1 becomes 0.

| A | NOT A |
|---|-------|
| 0 | 1 |
| 1 | 0 |

### Derived gates

**NAND gate** — the inverse of AND. Outputs 0 only when all inputs are 1; outputs 1 otherwise.

| A | B | A NAND B |
|---|---|----------|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**NOR gate** — the inverse of OR. Outputs 1 only when all inputs are 0.

| A | B | A NOR B |
|---|---|---------|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

**XOR gate** (exclusive OR) — outputs 1 when the inputs are *different*.

| A | B | A XOR B |
|---|---|---------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Why NAND matters</p>
  <p class="ib-textbook-note__body">The NAND gate is described as a <strong>universal gate</strong> because any other logic gate can be constructed from combinations of NAND gates alone. The NOR gate is also universal. This property makes NAND and NOR the basis of most real-world digital circuit manufacturing.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A1.2.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>The basic gates are AND (all inputs 1), OR (at least one input 1), and NOT (inverts input).</li>
      <li>Derived gates include NAND (inverse of AND), NOR (inverse of OR), and XOR (different inputs).</li>
      <li>NAND and NOR are universal gates — all other gates can be built from them.</li>
      <li>All digital computation is ultimately constructed from combinations of logic gates.</li>
    </ul>
  </div>
</div>


## A1.2.4 Truth tables

A <span data-def="A table that lists every possible combination of inputs to a logic circuit alongside the corresponding output for each combination.">truth table</span> systematically lists every possible combination of input values and the resulting output for a logic expression or circuit. For *n* inputs, a truth table has 2<sup>n</sup> rows.

Truth tables are essential for:

- verifying that a circuit produces the correct output for all input combinations,
- comparing two circuits to determine whether they are logically equivalent,
- deriving a Boolean expression from a set of requirements.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Constructing a truth table for (A AND B) OR (NOT C)</p>
  <div class="ib-textbook-worked__body">
    <p>There are three inputs (A, B, C), so the table has 2<sup>3</sup> = 8 rows. Work through intermediate columns to keep the logic clear.</p>
    <table>
      <tr><th>A</th><th>B</th><th>C</th><th>A AND B</th><th>NOT C</th><th>Output</th></tr>
      <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
      <tr><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
      <tr><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
      <tr><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
      <tr><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
      <tr><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
      <tr><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
      <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
    </table>
    <p>The output column is derived by applying OR to the "A AND B" and "NOT C" columns.</p>
  </div>
</div>

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">When constructing truth tables, always include intermediate columns for sub-expressions. Jumping straight to the final output invites errors and makes it harder for an examiner to follow your reasoning.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A1.2.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>A truth table lists all possible input combinations and the corresponding output.</li>
      <li>For <em>n</em> inputs, the table has 2<sup>n</sup> rows.</li>
      <li>Always include intermediate columns for sub-expressions to show your working clearly.</li>
    </ul>
  </div>
</div>


## A1.2.5 Logic diagrams

A <span data-def="A visual representation of a logic circuit using standardised symbols for each gate type, showing how inputs flow through gates to produce outputs.">logic diagram</span> is a visual representation of a logic circuit. Each gate type has a standard symbol, and wires connect inputs through gates to outputs. Logic diagrams allow engineers and students to see the structure of a circuit at a glance.

### Standard gate symbols

Each gate has a distinctive shape recognised internationally:

- **AND** — a flat-backed D shape
- **OR** — a curved, shield-like shape
- **NOT** — a triangle with a small circle (bubble) at the output
- **NAND** — AND shape with a bubble at the output
- **NOR** — OR shape with a bubble at the output
- **XOR** — OR shape with an additional curved line at the input side

### Reading and constructing logic diagrams

To **read** a logic diagram, trace the inputs from left to right through each gate, applying the gate's rule at each stage. To **construct** one from a Boolean expression:

1. Identify the final operation — this is the outermost gate in the expression and produces the circuit's output.
2. Work backwards, adding gates for each sub-expression.
3. Connect inputs to the appropriate gates with labelled wires.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Drawing a logic diagram for (A AND B) OR (NOT C)</p>
  <div class="ib-textbook-worked__body">
    <ol>
      <li>The final operation is OR, so draw an OR gate for the output.</li>
      <li>One input to the OR gate comes from an AND gate (inputs A and B).</li>
      <li>The other input comes from a NOT gate (input C).</li>
      <li>Connect: A and B feed into the AND gate; C feeds into the NOT gate; the outputs of both gates feed into the OR gate.</li>
    </ol>
    <p>This diagram directly corresponds to the truth table constructed in the previous section — you can verify the circuit by tracing any input combination through the gates and checking the output.</p>
  </div>
</div>

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Exam technique</p>
  <p class="ib-textbook-note__body">When asked to construct a logic diagram from a Boolean expression, work from the output backwards. Identify the last operation first (it produces the final output), then work inward to each sub-expression. This approach prevents wiring errors.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A1.2.5</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Logic diagrams use standardised symbols to represent circuits visually.</li>
      <li>Read diagrams left to right, applying each gate's rule in sequence.</li>
      <li>Construct diagrams from the output gate backwards, adding gates for each sub-expression.</li>
      <li>A logic diagram and its truth table describe the same circuit — use one to verify the other.</li>
    </ul>
  </div>
</div>
