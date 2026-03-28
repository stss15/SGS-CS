---
level: sl
unitNumber: 10
unitName: Data Representation and Computer Logic
summary: A comprehensive textbook chapter covering number systems and conversions, binary encoding of text, images, audio, and video, integer representation schemes, floating-point arithmetic, logic gates, truth table construction, Boolean algebra, Karnaugh maps, and logic diagram design.
subtopics:
  - code: A1.2.1
    title: Number systems (binary, decimal, hexadecimal)
  - code: A1.2.2
    title: Binary data storage
  - code: A1.2.3
    title: Purpose and use of logic gates
  - code: A1.2.4
    title: Constructing and analysing truth tables
  - code: A1.2.5
    title: Logic diagrams
sourcePolicy: ib_content_md_first
---

## A1.2.1 Number systems

### Why different number systems exist

Humans count in base 10 — ten digits, 0 through 9 — almost certainly because we have ten fingers. Computers, however, are built from transistors that distinguish only two electrical states: on and off, high voltage and low voltage, 1 and 0. This physical reality forces digital hardware to operate in **binary** (base 2). A third system, **hexadecimal** (base 16), exists as a convenience layer between the two: it lets humans read and write binary values in a compact form without losing the direct correspondence to the underlying bits.

All three systems — decimal, binary, and hexadecimal — are **positional number systems**. In a positional system, each digit's contribution to the total value depends on its position in the number. The digit 3 means three in the ones column, thirty in the tens column, and three hundred in the hundreds column. The same principle applies in every base; only the multipliers change.

### Binary (base 2)

In binary, each position represents a successive power of 2, read from right to left:

| Position (right to left) | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---|---|---|---|---|---|---|---|---|
| Place value | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

The binary number `10110101` therefore represents:

128 + 0 + 32 + 16 + 0 + 4 + 0 + 1 = **181** in decimal.

A single binary digit is called a **bit**. Four bits form a **nibble**, and eight bits form a **byte**. A byte can represent 256 different values (2⁸ = 256), ranging from 0 (`00000000`) to 255 (`11111111`).

#### Converting decimal to binary: the division method

To convert a decimal number to binary, repeatedly divide by 2 and record each remainder. The binary result is the sequence of remainders read from bottom to top.

**Worked example — convert 77 to binary:**

| Step | Dividend | ÷ 2 | Quotient | Remainder |
|---|---|---|---|---|
| 1 | 77 | ÷ 2 | 38 | **1** |
| 2 | 38 | ÷ 2 | 19 | **0** |
| 3 | 19 | ÷ 2 | 9 | **1** |
| 4 | 9 | ÷ 2 | 4 | **1** |
| 5 | 4 | ÷ 2 | 2 | **0** |
| 6 | 2 | ÷ 2 | 1 | **0** |
| 7 | 1 | ÷ 2 | 0 | **1** |

Reading the remainders from bottom to top: **1001101**.

Verify: 64 + 0 + 0 + 8 + 4 + 0 + 1 = 77. ✓

#### Converting decimal to binary: the subtraction method

An alternative approach starts from the largest power of 2 that fits within the target number, then subtracts it and repeats with the remainder.

**Worked example — convert 200 to binary:**

200 − 128 = 72 → bit 7 is 1
72 − 64 = 8 → bit 6 is 1
8 < 32 → bit 5 is 0
8 < 16 → bit 4 is 0
8 − 8 = 0 → bit 3 is 1
0 remaining → bits 2, 1, 0 are all 0

Result: **11001000**.

Both methods produce the same answer. The division method is more mechanical and reliable for large numbers; the subtraction method can be faster when place values are memorised.

### Hexadecimal (base 16)

Hexadecimal uses sixteen symbols: the digits 0–9 and the letters A–F, where A = 10, B = 11, C = 12, D = 13, E = 14, and F = 15. Each hex digit corresponds to exactly one nibble (4 bits), which makes conversion between binary and hex straightforward.

| Hex | Decimal | Binary |
|---|---|---|
| 0 | 0 | 0000 |
| 1 | 1 | 0001 |
| 2 | 2 | 0010 |
| 3 | 3 | 0011 |
| 4 | 4 | 0100 |
| 5 | 5 | 0101 |
| 6 | 6 | 0110 |
| 7 | 7 | 0111 |
| 8 | 8 | 1000 |
| 9 | 9 | 1001 |
| A | 10 | 1010 |
| B | 11 | 1011 |
| C | 12 | 1100 |
| D | 13 | 1101 |
| E | 14 | 1110 |
| F | 15 | 1111 |

Hexadecimal is not a different kind of data. It is simply a more compact way for humans to read binary values. A 32-bit memory address like `11000000101010000000000100000001` is far easier to work with as `C0A80101` — the same value, expressed in eight hex digits instead of thirty-two binary digits.

#### Converting binary to hexadecimal

Group the binary digits into nibbles from right to left, padding with leading zeros if necessary, then convert each nibble to its hex equivalent.

**Worked example — convert `110101011110` to hex:**

1. Group into nibbles: `1101 0101 1110`
2. Convert each nibble: D, 5, E
3. Result: **D5E**

#### Converting hexadecimal to decimal

Multiply each hex digit by its positional power of 16, then sum the results.

**Worked example — convert `2F3` to decimal:**

(2 × 16²) + (F × 16¹) + (3 × 16⁰)
= (2 × 256) + (15 × 16) + (3 × 1)
= 512 + 240 + 3
= **755**

### Where hexadecimal appears in practice

Programmers and system administrators encounter hex routinely:

- **Colour codes** — the web colour `#FF8800` encodes red = FF (255), green = 88 (136), blue = 00 (0).
- **Memory addresses** — debuggers display addresses like `0x7FFF5FBFF8A0` because the hex form is compact and aligns with byte boundaries.
- **MAC addresses** — network hardware identifiers such as `4A:3B:2C:1D:0E:FF` use hex pairs.
- **Error codes** — operating system error values like `0x80070005` are written in hex for brevity.

In each case, the underlying data is binary. Hexadecimal exists purely for human readability.


## A1.2.2 Binary data storage

Everything stored or transmitted by a computer — text, photographs, music, video — must ultimately be represented as sequences of binary digits. This section examines how different types of data are encoded into binary form and what trade-offs each encoding involves.

### Representing characters

#### ASCII

The American Standard Code for Information Interchange (ASCII) was established in the 1960s as one of the earliest standardised character encoding systems. The original ASCII standard uses 7 bits per character, providing 128 possible values (2⁷ = 128). These 128 code points include uppercase and lowercase English letters, digits, punctuation marks, and a set of control characters (such as newline and tab).

The extended ASCII standard uses 8 bits (one full byte) per character, expanding the range to 256 characters. The additional 128 values accommodate accented letters and special symbols used in Western European languages.

ASCII's limitation is fundamental: even with 8 bits, 256 characters cannot represent the writing systems of Chinese, Arabic, Hindi, Korean, or the many other scripts used worldwide.

#### Unicode

Unicode was created to solve this problem. Rather than a single encoding, Unicode is a universal character set — a catalogue that assigns a unique code point to every character in every known writing system, plus mathematical symbols, emoji, and historical scripts. The current Unicode standard defines over 150,000 characters.

A Unicode code point is written in the form U+XXXX, where XXXX is a hexadecimal value. For example, U+0041 is the Latin capital letter A, and U+4E16 is the Chinese character 世.

#### UTF-8

Unicode defines the character set, but a separate encoding is needed to store those code points as bytes. **UTF-8** is the most widely used Unicode encoding. It is a variable-length scheme: characters that appear in the original ASCII range (U+0000 to U+007F) use just one byte, making UTF-8 backward-compatible with ASCII. Characters outside that range use two, three, or four bytes depending on their code point.

| Code point range | Bytes used | Example characters |
|---|---|---|
| U+0000 to U+007F | 1 byte | A, z, 5, @ (basic Latin) |
| U+0080 to U+07FF | 2 bytes | é, ñ, ü (accented Latin, Greek, Cyrillic) |
| U+0800 to U+FFFF | 3 bytes | 中, 한, अ (CJK, Devanagari) |
| U+10000 to U+10FFFF | 4 bytes | 𝄞 (musical symbols), 😀 (emoji) |

This variable-length design is efficient: English text uses almost no more storage than plain ASCII, while text in other scripts uses only as many bytes as necessary. Two alternative encodings exist — **UTF-16** (2 or 4 bytes per character) and **UTF-32** (always 4 bytes per character) — but UTF-8 dominates web content and modern file systems because of its balance between compactness and universality.

### Representing images

#### Bitmap images

A bitmap image is a grid of individual picture elements — **pixels**. Each pixel stores a colour value, and the image is reconstructed by displaying these colour values in order across rows and columns.

Two properties determine the quality and size of a bitmap:

- **Resolution** — the number of pixels in the image, typically expressed as width × height (for example, 1920 × 1080). Higher resolution means more pixels, which produces finer detail but increases file size.
- **Colour depth** — the number of bits used to represent the colour of each pixel. A 1-bit colour depth allows only two colours (black and white). An 8-bit depth allows 256 colours. A 24-bit depth allows approximately 16.7 million colours (2²⁴), which is the standard for photographic images.

#### The RGB colour model

In the **RGB** model, each pixel's colour is defined by three components: red, green, and blue. With 24-bit colour, each component receives 8 bits, giving a range of 0–255 for each channel.

- Pure red: (255, 0, 0)
- Pure green: (0, 255, 0)
- Pure blue: (0, 0, 255)
- White: (255, 255, 255) — all channels at maximum
- Black: (0, 0, 0) — all channels off
- A specific orange: (255, 165, 0)

#### Calculating image file size

The uncompressed file size of a bitmap image can be calculated with a direct formula:

**File size = width × height × colour depth (in bits) ÷ 8**

The division by 8 converts bits to bytes.

**Worked example:** A photograph is 3000 × 2000 pixels with 24-bit colour depth.

File size = 3000 × 2000 × 24 ÷ 8
= 144,000,000 ÷ 8
= 18,000,000 bytes
= **18 MB** (approximately)

This explains why image compression is essential. An uncompressed photograph at this resolution occupies 18 megabytes — an impractical size for web delivery or large photo libraries.

### Representing audio

Sound in the physical world is a continuous (analogue) wave — a smooth, unbroken variation in air pressure over time. Computers cannot store continuous signals directly. Instead, the analogue waveform must be converted into a discrete (digital) representation through a process called **analogue-to-digital conversion (ADC)**.

#### Sampling

During ADC, the sound wave is measured at regular intervals. Each measurement captures the amplitude (height) of the wave at that instant in time. These measurements are called **samples**.

Two parameters govern the quality and size of the resulting digital audio:

- **Sampling rate** — the number of samples taken per second, measured in hertz (Hz). CD-quality audio uses 44,100 samples per second (44.1 kHz). A higher sampling rate captures more detail in the waveform but generates more data.
- **Bit depth** — the number of bits used to record each sample's amplitude. CD-quality audio uses 16 bits per sample, allowing 65,536 (2¹⁶) distinct amplitude levels. A higher bit depth means finer gradations between quiet and loud, reducing quantisation noise.

#### Calculating audio file size

**File size = sampling rate × bit depth × channels × duration (seconds) ÷ 8**

**Worked example:** Calculate the storage needed for one minute of CD-quality stereo audio.

- Sampling rate: 44,100 Hz
- Bit depth: 16 bits
- Channels: 2 (stereo)
- Duration: 60 seconds

File size = 44,100 × 16 × 2 × 60 ÷ 8
= 84,672,000 ÷ 8
= 10,584,000 bytes
≈ **10.1 MB**

One minute of uncompressed stereo audio occupies roughly 10 megabytes. A four-minute song therefore requires about 40 MB before compression, which is why formats like MP3 (lossy) and FLAC (lossless) are used in practice.

#### Audio file formats

- **WAV** and **AIFF** — uncompressed formats that preserve the original sample data without any loss.
- **MP3** (MPEG Audio Layer III) — a lossy format that reduces file size by discarding audio frequencies that are less perceptible to the human ear.
- **FLAC** (Free Lossless Audio Codec) — a lossless compressed format that reduces file size without discarding any data, allowing perfect reconstruction of the original.

### Representing video

A video file is an encapsulated container (such as MP4, MKV, or AVI) that bundles together several components: frames (visual data), audio tracks, metadata, and optionally subtitles.

#### Frames

Video is stored as a sequence of still images called **frames**. Played back in rapid succession — typically 24 to 60 frames per second — these still images create the illusion of continuous motion, much like a flipbook.

Each frame is stored as a bitmap image. In raw form, the storage required for video is therefore enormous:

**Worked example:** A 10-minute video at 30 fps, 1920 × 1080 resolution, and 24-bit colour depth (uncompressed).

Pixels per frame: 1920 × 1080 = 2,073,600
Bits per frame: 2,073,600 × 24 = 49,766,400 bits
Bytes per frame: 49,766,400 ÷ 8 = 6,220,800 bytes ≈ 6.2 MB
Total frames: 30 × 60 × 10 = 18,000
Total size: 6.2 × 18,000 ≈ 111,600 MB ≈ **109 GB**

This raw size is clearly impractical. Video compression is not optional — it is a fundamental requirement.

#### Spatial and temporal compression

Two complementary techniques make video storage feasible:

- **Spatial (intraframe) compression** reduces redundancy within a single frame. If a region of the frame contains a uniform blue sky, the colour data can be stored once rather than repeated for every pixel. This technique works well for frames with large areas of similar content.
- **Temporal (interframe) compression** reduces redundancy between consecutive frames. In most video, large portions of each frame are identical to the previous one — only moving objects change. Rather than storing every frame in full, temporal compression stores a complete **keyframe** periodically and then records only the differences (deltas) for the frames that follow. This is extremely effective for video with relatively static backgrounds.

To further improve compression efficiency, video frames are often converted from the RGB colour model to **YUV**, which separates brightness (luminance) from colour (chrominance). The human eye is more sensitive to variations in brightness than in colour, so chrominance data can be stored at lower resolution without noticeable quality loss.

### Different methods for storing integers

The binary number system introduced in A1.2.1 represents only non-negative integers. Computers also need to handle negative numbers, and several schemes exist for encoding signed integers in binary.

#### Unsigned binary

This is the straightforward system from A1.2.1. An 8-bit unsigned integer represents values from 0 to 255 (2⁸ − 1). All bits contribute to magnitude; there is no sign indicator.

#### Two's complement

Two's complement is the standard method used by virtually all modern processors for signed integer arithmetic. In this system, the most significant bit (MSB) indicates the sign: 0 for positive, 1 for negative. The range of an 8-bit two's complement number is −128 to +127.

To find the two's complement representation of a negative number, start with the positive form, invert every bit (change 0s to 1s and 1s to 0s), then add 1.

**Worked example — represent −45 in 8-bit two's complement:**

1. Start with +45: `00101101`
2. Invert all bits: `11010010`
3. Add 1: `11010011`

Result: **11010011** represents −45.

The advantage of two's complement is that addition and subtraction work with the same hardware circuitry for both positive and negative numbers. There is no special case for zero — it has a single representation (`00000000`), unlike some alternative schemes.

#### One's complement

One's complement inverts all bits to negate a number but does not add 1. This creates a simpler conversion process, but it has a significant drawback: zero has two representations — positive zero (`00000000`) and negative zero (`11111111`). This ambiguity complicates comparisons and arithmetic operations. The range is the same as two's complement for positive values (0 to +127) but differs slightly for negative values (−127 to 0). Modern hardware overwhelmingly uses two's complement instead.

#### Sign-magnitude

In sign-magnitude representation, the MSB serves purely as a sign flag (0 = positive, 1 = negative) and the remaining bits represent the magnitude. Converting +5 to −5 is straightforward: `00000101` becomes `10000101`.

Like one's complement, sign-magnitude suffers from two representations of zero (`00000000` and `10000000`) and requires separate logic for addition and subtraction depending on the operand signs. Its range with 8 bits is −127 to +127.

#### Binary-coded decimal (BCD)

BCD takes a fundamentally different approach. Rather than converting an entire decimal number into a single binary value, BCD encodes each decimal digit separately using 4 bits.

**Worked example — represent 45 in BCD:**

- Digit 4 → `0100`
- Digit 5 → `0101`
- BCD representation: `0100 0101`

Compare this with the standard binary representation of 45, which is `00101101` — a completely different bit pattern.

BCD is useful in applications where exact decimal representation matters, such as financial calculations and digital clock displays, because it avoids the rounding errors that can occur when converting between decimal and binary. The trade-off is lower storage efficiency: BCD requires more bits than pure binary to represent the same range of values, since each 4-bit group can only represent values 0–9, wasting the six combinations from 10–15.

#### Gray code (reflected binary code)

Gray code is a binary numbering system in which two successive values differ by exactly one bit. This property makes it particularly valuable in applications where data integrity during transitions matters — for example, rotary encoders on robotic arms, where mechanical vibrations could cause multiple bits to change simultaneously in standard binary, producing momentary incorrect readings.

| Decimal | Standard binary | Gray code |
|---|---|---|
| 0 | 000 | 000 |
| 1 | 001 | 001 |
| 2 | 010 | 011 |
| 3 | 011 | 010 |
| 4 | 100 | 110 |
| 5 | 101 | 111 |
| 6 | 110 | 101 |
| 7 | 111 | 100 |

Notice that in standard binary, moving from 3 (`011`) to 4 (`100`) changes all three bits simultaneously. In Gray code, the same transition from 3 (`010`) to 4 (`110`) changes only one bit, eliminating the risk of transient errors.

#### Excess-N (biased representation)

Excess-N adds a fixed bias to every value before encoding it in binary. To decode, you subtract the bias. This shifts the entire number line so that all stored values are non-negative binary numbers, which simplifies hardware comparison operations.

**Worked example using Excess-3:**

To encode the decimal number 2: add the bias (3), giving 5, then store 5 in binary: `0101`.
To encode −2: add the bias (3), giving 1, then store 1 in binary: `0001`.

In an 8-bit system, **Excess-127** is commonly used. The stored value 127 represents zero, values below 127 represent negative numbers, and values above 127 represent positive numbers. This scheme is used within the IEEE 754 floating-point format for the exponent field, as described below.

### Fixed-point representation

Fixed-point representation stores real numbers (numbers with fractional parts) by placing the binary point at a predetermined position within the bit sequence. A fixed number of bits represent the integer part, and the remaining bits represent the fractional part.

In the fractional portion, each bit position represents a successive negative power of 2:

| Position | −1 | −2 | −3 | −4 |
|---|---|---|---|---|
| Value | 0.5 | 0.25 | 0.125 | 0.0625 |

**Worked example — represent 5.25 in an 8-bit fixed-point format (4 integer bits, 4 fractional bits):**

- Integer part (5): `0101`
- Fractional part (0.25): `0100` (the second fractional bit, worth 0.25, is set)
- Combined: `0101.0100`

Fixed-point is simple and fast because it requires no special hardware to locate the binary point — its position is known in advance. The drawback is limited range: with only 4 integer bits (in a signed system), the representable range extends only from −8 to 7.9375, and the smallest fractional increment is 0.0625. For very large or very small numbers, fixed-point is inadequate.

### Floating-point representation

Floating-point representation solves the range limitation of fixed-point by allowing the binary point to "float" to different positions. A floating-point number consists of three components:

1. **Sign bit** (1 bit) — determines whether the number is positive or negative
2. **Exponent** (8 bits in single precision) — determines the scale (how far the binary point has moved)
3. **Mantissa** (23 bits in single precision) — stores the significant digits of the number

The **IEEE 754 single-precision** standard uses 32 bits arranged as: 1 sign bit, 8 exponent bits, 23 mantissa bits. The exponent is stored using Excess-127 bias.

**Worked example — represent −5.75 in IEEE 754 single precision:**

1. Convert 5.75 to binary: 5 = `101`, 0.75 = `.11` (0.5 + 0.25), so 5.75 = `101.11`
2. Normalise to the form 1.xxxxx × 2ⁿ: `101.11` = `1.0111 × 2²`
3. Determine each component:
   - **Sign bit**: 1 (the number is negative)
   - **Exponent**: 2 + 127 = 129 → `10000001` in binary
   - **Mantissa**: `01110000000000000000000` (the leading 1 before the point is implicit and not stored)

4. Final representation: `1 10000001 01110000000000000000000`

Floating-point can represent both extremely large values (billions) and extremely small values (billionths) within the same 32-bit format. This versatility makes it essential for scientific computing, engineering simulations, and graphics processing. The trade-off is reduced precision: not all decimal values can be represented exactly in binary floating-point, which can lead to small rounding errors that accumulate over many calculations.


## A1.2.3 Purpose and use of logic gates

### From Boolean algebra to digital circuits

In the mid-19th century, the mathematician George Boole developed an algebraic system for representing logical propositions using variables and operators. A century later, Claude Shannon demonstrated that Boole's algebra could model electrical switching circuits. This insight — that logical true/false maps directly onto electrical on/off — became the foundation of all digital computing.

A **logic gate** is an electronic component that performs a Boolean operation on one or more binary inputs and produces a single binary output. Logic gates are constructed from transistors, which act as electrically controlled switches. When voltage is applied to a transistor's control terminal (the gate), current flows between its other two terminals (source and drain); when no voltage is applied, current is blocked.

### Basic gates

The three fundamental gates — AND, OR, and NOT — can express any Boolean function when combined.

#### AND gate

The AND gate outputs 1 only when **all** inputs are 1. If any input is 0, the output is 0. At the transistor level, an AND gate places two transistors in series: current can only reach the output if both transistors are switched on.

| Input A | Input B | Output X |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Boolean algebra notation:** X = A · B

#### OR gate

The OR gate outputs 1 when **at least one** input is 1. The output is 0 only when all inputs are 0. At the transistor level, an OR gate places two transistors in parallel: current reaches the output if either transistor is on.

| Input A | Input B | Output X |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**Boolean algebra notation:** X = A + B

#### NOT gate (inverter)

The NOT gate has a single input and produces the opposite value. If the input is 1, the output is 0, and vice versa. It is the simplest gate, requiring only one transistor.

| Input A | Output X |
|---|---|
| 0 | 1 |
| 1 | 0 |

**Boolean algebra notation:** X = Ā (A with an overbar, meaning "NOT A")

### Derived (complex) gates

Derived gates combine basic gates to produce more complex logic functions. Four derived gates appear in the IB syllabus.

#### NAND gate (NOT AND)

A NAND gate is an AND gate followed by a NOT gate. Its output is the inverse of AND: the output is 0 only when both inputs are 1; in all other cases, the output is 1.

| Input A | Input B | Output X |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Boolean algebra notation:** X = <span style="text-decoration:overline">A · B</span>

The NAND gate has a remarkable property: any Boolean function can be implemented using NAND gates alone. This makes NAND a **universal gate**, and it is the most commonly manufactured gate in integrated circuits.

#### NOR gate (NOT OR)

A NOR gate is an OR gate followed by a NOT gate. The output is 1 only when both inputs are 0.

| Input A | Input B | Output X |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

**Boolean algebra notation:** X = <span style="text-decoration:overline">A + B</span>

Like NAND, NOR is also a universal gate.

#### XOR gate (exclusive OR)

The XOR gate outputs 1 when the inputs are **different**. Unlike OR, XOR outputs 0 when both inputs are 1. This distinction is critical: OR means "one or both", while XOR means "one but not both".

| Input A | Input B | Output X |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Boolean algebra notation:** X = A ⊕ B

XOR is fundamental to binary addition (it produces the sum bit of a half-adder) and is widely used in error detection and encryption.

#### XNOR gate (exclusive NOR)

The XNOR gate is an XOR gate followed by a NOT gate. It outputs 1 when the inputs are the **same** — both 0 or both 1.

| Input A | Input B | Output X |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Boolean algebra notation:** X = <span style="text-decoration:overline">A ⊕ B</span>

XNOR is useful in comparison circuits that test whether two bits are equal.


## A1.2.4 Constructing and analysing truth tables

### Truth tables for logic circuits

A truth table lists every possible combination of inputs alongside the corresponding output. For a circuit with *n* inputs, the table has 2ⁿ rows. A two-input circuit produces 4 rows; a three-input circuit produces 8 rows.

When a circuit contains multiple gates connected in stages, construct the truth table by working through the circuit from input to output, computing intermediate values at each stage.

**Worked example — three-input circuit:**

Consider a circuit with inputs A, B, and C that operates in three stages:
- Stage 1: P = A AND B
- Stage 2: Q = B NOR C
- Stage 3: R = P OR Q
- Output: X = C XOR R

Step 1 — List all input combinations. With three inputs, alternate the rightmost column every row, the middle column every two rows, and the leftmost column every four rows:

| A | B | C |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |
| 1 | 1 | 1 |

Step 2 — Add columns for each intermediate value and the final output, then compute row by row:

| A | B | C | P (A AND B) | Q (B NOR C) | R (P OR Q) | X (C XOR R) |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 | 1 | 1 |
| 0 | 0 | 1 | 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 | 0 | 0 | 1 |
| 1 | 0 | 0 | 0 | 1 | 1 | 1 |
| 1 | 0 | 1 | 0 | 0 | 0 | 1 |
| 1 | 1 | 0 | 1 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 | 1 | 0 |

The key technique is patience: identify the intermediate signals, label them clearly, and compute each column before moving to the next.

### Truth tables from problem descriptions

In examination questions, the logic circuit is often described in plain English rather than given as a diagram. The task is to identify the inputs, determine the logical relationships, and build the truth table.

**Worked example — baby alarm system:**

*A baby alarm sounds when the device is switched on AND either the baby is crying OR the room temperature is too cold.*

1. Identify inputs: A = switch (on/off), B = baby crying (yes/no), C = room too cold (yes/no).
2. Identify the logical structure: the alarm requires A AND (B OR C).
3. Name the intermediate value: P = B OR C.
4. Final output: X = A AND P.

| A (switch) | B (crying) | C (cold) | P (B OR C) | X (A AND P) |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 |

Notice that whenever the switch is off (A = 0), the alarm never sounds regardless of the other inputs. This matches the problem description — the device must be switched on before it can trigger.

### Logical expressions and order of operations

A logic circuit can be expressed as a **Boolean expression** using the operators AND (·), OR (+), and NOT (overbar). For the baby alarm example: X = A · (B + C).

Parentheses indicate which operations are performed first. When no parentheses are present, the standard order of operations applies:

1. **NOT** is evaluated first
2. **AND** (including NAND) is evaluated second
3. **OR** (including NOR and XOR) is evaluated last

This hierarchy parallels the BODMAS convention in arithmetic, where multiplication is performed before addition.

### Karnaugh maps

A **Karnaugh map** (K-map) is a visual tool for simplifying Boolean expressions. Instead of manipulating algebra, you plot the truth table outputs on a grid and group adjacent 1s to find a simpler equivalent expression. Simpler expressions translate directly into circuits with fewer gates, reducing hardware cost, power consumption, and signal propagation delay.

#### Two-variable K-maps

A two-variable K-map is a 2×2 grid. One variable labels the rows, the other labels the columns.

**Worked example — simplify the expression A · B + A · B̄:**

First, construct the truth table:

| A | B | X |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

Place the outputs in the K-map:

| A \ B | B = 0 | B = 1 |
|---|---|---|
| A = 0 | 0 | 0 |
| A = 1 | 1 | 1 |

The two 1s in the bottom row can be grouped. Within this group, A is always 1, but B changes between 0 and 1. Since B varies, it is eliminated from the expression. The simplified result is simply **X = A**.

The original expression required two AND gates, a NOT gate, and an OR gate. The simplified expression requires no gates at all — just a direct connection from input A to the output.

#### Three-variable K-maps

With three variables, the K-map becomes a 2×4 grid. One variable labels the rows, and the other two label the columns. The column headings must follow **Gray code order** (00, 01, 11, 10) — not standard binary counting — so that adjacent columns differ by only one bit. This ensures that physically adjacent cells in the map are also logically adjacent, which is the entire basis for correct grouping.

**Rules for grouping 1s in a K-map:**

- Groups must contain a power-of-2 number of cells: 1, 2, 4, 8, or 16
- Groups must be rectangular (no diagonal grouping)
- Groups should be as large as possible to maximise simplification
- Groups may overlap — a cell can belong to more than one group
- The map wraps around its edges: the leftmost column is adjacent to the rightmost column

To read the simplified expression from a group: if a variable stays constant across all cells in the group, keep that variable in the expression. If a variable changes within the group, discard it. Combine the terms from each group with OR.

**Worked example — simplify Ā · B · C + A · B̄ · C + A · B · C:**

Plotting on a three-variable K-map (C on rows, AB on columns in Gray code order):

| C \ AB | 00 | 01 | 11 | 10 |
|---|---|---|---|---|
| C = 0 | 0 | 0 | 0 | 0 |
| C = 1 | 0 | 1 | 1 | 1 |

The three 1s in the bottom row can be grouped as follows:

- **Group 1** (cells at AB=01 and AB=11, C=1): C stays 1, B stays 1, A varies → term is B · C
- **Group 2** (cells at AB=11 and AB=10, C=1): C stays 1, A stays 1, B varies → term is A · C

Simplified expression: **X = B · C + A · C**

This reduces three AND terms and an OR to just two AND terms and an OR — a meaningful reduction in gate count.


## A1.2.5 Logic diagrams

### Constructing a circuit from a Boolean expression

A logic diagram is a visual representation of a Boolean expression using standard gate symbols and connecting wires. To construct a logic diagram:

1. **Parse the expression** — identify the operations and their order based on parentheses and the precedence rules (NOT first, then AND, then OR).
2. **Build from inputs to output** — draw the gates in the order they are evaluated, connecting the output of each stage to the input of the next.
3. **Verify with a truth table** — check a few input combinations against the expected output to confirm correctness.

**Worked example — draw the circuit for X = A · (B + C):**

1. The expression has two operations: OR (B + C) is evaluated first (it is inside parentheses), then AND combines the result with A.
2. Stage 1: connect inputs B and C to an OR gate; label its output P.
3. Stage 2: connect input A and signal P to an AND gate; label its output X.

The circuit uses two gates and three inputs. Any truth-table row can verify it: when A = 1, B = 0, C = 1, we expect P = 0 + 1 = 1, then X = 1 · 1 = 1 — the alarm sounds because the switch is on and the room is cold.

### Simplification before drawing

When two Boolean expressions are logically equivalent, the simpler form should always be used before drawing the circuit. A simpler expression means fewer gates, lower manufacturing cost, reduced power consumption, and shorter signal propagation delay.

**Worked example:**

The expression (A AND B) OR (A AND NOT B) can be simplified:

- A AND B covers the case where both A and B are 1.
- A AND NOT B covers the case where A is 1 and B is 0.
- Together, these cover every case where A is 1, regardless of B.
- Simplified: **X = A**

The original expression requires two AND gates, one NOT gate, and one OR gate. The simplified version requires no gates at all. This is exactly the kind of simplification that K-maps help to identify systematically, and it demonstrates why Boolean simplification is a practical engineering concern, not merely an academic exercise.

### From problem to circuit

In practice, circuit design follows a sequence: state the problem, identify inputs and outputs, build a truth table, derive the Boolean expression, simplify it (using algebra or a K-map), and then draw the logic diagram. Each step feeds into the next, and errors at any stage propagate forward. Careful, methodical work at each stage prevents cascading mistakes.
