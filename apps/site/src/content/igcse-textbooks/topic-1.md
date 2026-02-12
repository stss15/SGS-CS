---
topicNumber: 1
topicName: "Data Representation"
summary: "Everything a computer processes—from your favourite song to the code running this website—boils down to ones and zeros. In this unit, we peel back the layers to understand how computers translate our complex world (numbers, text, sound, and images) into simple binary states."
subtopics:
  - code: "1.1"
    title: "Number Representation"
  - code: "1.2"
    title: "Text, Sound & Images"
  - code: "1.3"
    title: "Data Storage & Compression"
sourcePolicy: igcse_textbook_then_syllabus_then_slides
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| bit | The smallest unit of data, with value `0` or `1`. |
| nibble | Four bits. |
| byte | Eight bits. |
| binary number system | Base-2 number system using only `0` and `1`. |
| denary number system | Base-10 number system used in everyday counting. |
| hexadecimal number system | Base-16 number system using `0-9` and `A-F`. |
| overflow error | A result that is too large for the fixed bit-width available. |
| logical shift | Bit movement left or right, with `0` shifted into empty positions. |
| two's complement | Method for representing negative binary integers. |
| MAC address | Device identifier often written in hexadecimal pairs. |
| error code | Numeric/hex code used by systems to report faults. |
| character set | A defined mapping between characters and numeric codes. |
| ASCII | A 7-bit character set (128 codes) for letters, digits, symbols, and control codes. |
| Unicode | A universal character set that supports world languages and symbols. |
| sampling rate | Number of sound samples taken each second. |
| sampling resolution (bit depth) | Number of bits used to represent each sound sample. |
| bitmap image | An image made from pixels arranged in a grid. |
| pixel | Short for picture element: the smallest unit in a bitmap image. |
| image resolution | The number of pixels across width and height. |
| colour depth | Number of bits used to represent one pixel's colour. |
| compression | File-size reduction by removing redundancy or less-important data. |
| lossy compression | Compression where some original data is permanently removed. |
| lossless compression | Compression where the original data can be reconstructed exactly. |
| run length encoding (RLE) | Lossless compression that stores repeated values as a value-count pair. |
| bandwidth | The maximum data transfer rate over a network. |

## 1.1 Number Representation

### Overview

<div class="reader-section-body reader-section-body--concept">

This part of the course is about translation. Computers only store and process binary states (`0` and `1`), but humans need denary and hexadecimal to read, communicate, and debug those values quickly. If you are revisiting this topic after a long break, the key idea is simple: every method in this section is a repeatable routine, not a trick.

The specification expects you to do four things confidently:

- convert between denary, binary, and hexadecimal
- add positive 8-bit binary values and identify overflow
- perform logical shifts on positive 8-bit values
- represent and interpret signed 8-bit values using two's complement

</div>

### Place value model: the foundation that everything uses

<div class="reader-section-body reader-section-body--apply">

In 8-bit binary, each column has a fixed value:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `2^7` | `2^6` | `2^5` | `2^4` | `2^3` | `2^2` | `2^1` | `2^0` |

Example reading:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 1 | 1 | 0 | 1 | 0 | 1 |

`10110101` = `128 + 32 + 16 + 4 + 1 = 181`

This same place-value idea scales to 12-bit, 16-bit, or larger values; only the headings change.

</div>

### Converting between denary, binary, and hexadecimal

<div class="reader-section-body reader-section-body--example">

Use this as your exam method checklist:

| Conversion | Method | Example |
| --- | --- | --- |
| Denary -> Binary | Work left to right through place values and subtract where possible. | `156` -> `10011100` |
| Binary -> Denary | Add headings where the bit is `1`. | `11101110` -> `238` |
| Binary -> Hex | Group into nibbles (groups of 4 bits). | `10011100` -> `1001 1100` -> `9C` |
| Hex -> Binary | Convert each hex digit to a 4-bit nibble. | `3C` -> `0011 1100` |
| Denary -> Hex | Divide by 16 and map remainders (`10=A` ... `15=F`). | `94` -> `5E` |
| Hex -> Denary | Multiply by powers of 16 and add. | `3C` -> `(3 x 16) + 12 = 60` |

Hex is heavily used because it is compact and maps exactly to binary nibbles:

- MAC addresses
- HTML/RGB colour codes
- system and error codes

</div>

### Binary addition, overflow, and logical shifts

<div class="reader-section-body reader-section-body--apply">

For binary addition, add column by column from right to left:

- `0 + 0 = 0`
- `0 + 1 = 1`
- `1 + 1 = 10` (write `0`, carry `1`)

<div class="igcse-widget" data-igcse-binary-adder>
  <p class="igcse-widget__title">Interactive binary addition (8-bit)</p>
  <p class="igcse-widget__hint">Change either value and the carry row, 8-bit stored result, and overflow check update instantly.</p>
  <div class="igcse-widget__controls">
    <label>
      First value (A)
      <input type="text" inputmode="numeric" maxlength="8" value="11110000" data-adder-a />
    </label>
    <label>
      Second value (B)
      <input type="text" inputmode="numeric" maxlength="8" value="01010000" data-adder-b />
    </label>
  </div>
  <div class="igcse-widget__board" data-adder-board></div>
  <p class="igcse-widget__result" data-adder-result></p>
</div>

Logical shifts for positive unsigned values:

- left shift by 1: multiply by 2
- right shift by 1: divide by 2 (remainder discarded)
- bits shifted out are lost, and zeros fill the gap

<div class="igcse-widget" data-igcse-shift-demo>
  <p class="igcse-widget__title">Interactive logical shift</p>
  <p class="igcse-widget__hint">Use this to see exactly which bits are lost and how the decimal value changes.</p>
  <div class="igcse-widget__controls">
    <label>
      Starting 8-bit value
      <input type="text" inputmode="numeric" maxlength="8" value="00110101" data-shift-bits />
    </label>
    <label>
      Direction
      <select data-shift-direction>
        <option value="left">Left shift</option>
        <option value="right">Right shift</option>
      </select>
    </label>
    <label>
      Places
      <input type="number" min="1" max="4" value="1" data-shift-places />
    </label>
  </div>
  <div class="igcse-widget__board" data-shift-board></div>
  <p class="igcse-widget__result" data-shift-result></p>
</div>

</div>

### Two's complement: full process for negative numbers

<div class="reader-section-body reader-section-body--example">

In 8-bit two's complement, the range is `-128` to `+127`.

To represent a negative number (for example `-25`):

1. Write `+25` in 8-bit binary: `00011001`
2. Invert all bits: `11100110`
3. Add `1`: `11100111`

So `-25` is `11100111`.

To decode a negative two's-complement value (for example `11100111`):

1. Most significant bit is `1`, so the number is negative.
2. Invert bits: `00011000`
3. Add `1`: `00011001` (which is `25`)
4. Apply sign -> `-25`

Students often remember only the "invert and add 1" direction.  
You need both directions for exam questions: building a negative value and interpreting one.

<div class="igcse-widget" data-igcse-twos-complement>
  <p class="igcse-widget__title">Interactive two's complement helper</p>
  <p class="igcse-widget__hint">Use both tools: denary to 8-bit two's complement, and 8-bit two's complement back to denary.</p>
  <div class="igcse-widget__controls">
    <label>
      Denary input (-128 to 127)
      <input type="number" min="-128" max="127" value="-25" data-tc-denary />
    </label>
    <label>
      8-bit binary input
      <input type="text" inputmode="numeric" maxlength="8" value="11100111" data-tc-binary />
    </label>
  </div>
  <div class="igcse-widget__split">
    <div data-tc-encode></div>
    <div data-tc-decode></div>
  </div>
</div>

</div>

### Common pitfalls

<div class="reader-section-body reader-section-body--apply">

- forgetting to keep fixed width (for example, dropping leading zeros in 8-bit work)
- writing `10` after `9` in hexadecimal instead of `A`
- treating overflow as a "maths error" rather than a register-size limit
- mixing up shift direction effects (left multiplies, right divides for positive unsigned values)
- using invert then subtract 1 for two's complement (it must be invert then add 1)

</div>

## 1.2 Text, Sound & Images

### Overview

<div class="reader-section-body reader-section-body--concept">

This is one of the highest-yield sections in Topic 1 because it combines understanding and calculation.
The same exam pattern appears repeatedly: identify the representation model, apply the size method, and justify the quality trade-off.

Use these three mental models:

- text: character -> code point -> encoded bytes
- sound: waveform -> sampled values over time
- image: pixel grid -> bits per pixel

</div>

### Text: from characters to bytes

<div class="reader-section-body reader-section-body--apply">

A character set defines which symbol maps to which numeric code.
An encoding defines how those codes are stored as bytes.

| Standard | What it covers | Typical storage pattern |
| --- | --- | --- |
| ASCII | 128 characters (English letters, digits, punctuation, control codes) | 7 bits (often stored in 1 byte) |
| Extended ASCII | 256 values, but vendor-dependent mappings | 8 bits, inconsistent across systems |
| Unicode | Global script support, symbols, emoji | Encoded as UTF-8, UTF-16, or UTF-32 |

ASCII appears frequently in IGCSE questions because it is easy to calculate.
Unicode is what modern systems use because text must work across many languages and devices.

The key distinction students often forget:
- character set answers "which number means this character?"
- encoding answers "how many bytes are used to store that number?"

</div>

### ASCII patterns you can use quickly in exams

<div class="reader-section-body reader-section-body--concept">

You do not need to memorise all ASCII values. These anchor ranges are enough:

| Character group | Denary range | Pattern worth noticing |
| --- | --- | --- |
| Digits `0` to `9` | 48 to 57 | starts at 48 |
| Uppercase `A` to `Z` | 65 to 90 | starts at 65 |
| Lowercase `a` to `z` | 97 to 122 | exactly 32 above uppercase |
| Space | 32 | common in decode questions |

Useful mini-reference:

| Character | Denary | 7-bit binary | Hex |
| --- | --- | --- | --- |
| `A` | 65 | 1000001 | 41 |
| `C` | 67 | 1000011 | 43 |
| `a` | 97 | 1100001 | 61 |
| `0` | 48 | 0110000 | 30 |
| `Space` | 32 | 0100000 | 20 |

</div>

### Text worked examples: encode and decode

<div class="reader-section-body reader-section-body--apply">

Example 1: encode **CAT** in ASCII

| Character | Denary | Binary | Hex |
| --- | --- | --- | --- |
| C | 67 | 1000011 | 43 |
| A | 65 | 1000001 | 41 |
| T | 84 | 1010100 | 54 |

Example 2: decode **72 105 33** (denary ASCII)

- 72 -> `H`
- 105 -> `i`
- 33 -> `!`
- decoded text = **Hi!**

Exam habit: always write one line per character so marker can see method, not just the final word.

</div>

### Interactive text explorer and encoding size comparison

<div class="reader-section-body reader-section-body--example">

<div class="igcse-widget" data-igcse-ascii-explorer>
  <p class="igcse-widget__title">ASCII/Unicode explorer</p>
  <p class="igcse-widget__hint">Type one character or enter a denary code to see its binary and hexadecimal forms.</p>
  <div class="igcse-widget__controls">
    <label>
      Character input
      <input type="text" maxlength="1" value="A" data-ascii-char />
    </label>
    <label>
      Denary code (0-127 for ASCII)
      <input type="number" min="0" max="127" value="65" data-ascii-decimal />
    </label>
  </div>
  <div class="igcse-widget__board" data-ascii-board></div>
  <p class="igcse-widget__result" data-ascii-result></p>
</div>

<div class="igcse-widget" data-igcse-encoding-compare>
  <p class="igcse-widget__title">Encoding size checker</p>
  <p class="igcse-widget__hint">Compare how the same text is stored in ASCII, UTF-8, UTF-16, and UTF-32.</p>
  <div class="igcse-widget__controls">
    <label>
      Text sample
      <input type="text" value="Data 2026" maxlength="40" data-encoding-text />
    </label>
  </div>
  <div class="igcse-widget__board" data-encoding-board></div>
  <p class="igcse-widget__result" data-encoding-result></p>
</div>

</div>

### Sound: sampling, quality, and file size

<div class="reader-section-body reader-section-body--apply">

Digital sound is built from samples of an analogue wave.
Each sample stores an amplitude value.

| Variable | Meaning | What happens when it increases |
| --- | --- | --- |
| Sampling rate | samples per second (Hz) | captures higher frequencies; larger file |
| Sampling resolution (bit depth) | bits used per sample value | finer amplitude precision; larger file |
| Channels | mono, stereo, multichannel | file size multiplies by channel count |
| Duration | recording length in seconds | file size increases linearly |

Nyquist reminder: sampling rate should be at least twice the highest frequency you want to capture clearly.

Uncompressed sound bits:

- sample rate x sampling resolution x channels x duration

</div>

### Sampling model (visual)

<div class="reader-section-body reader-section-body--example">

<div class="igcse-widget" data-igcse-sampling-demo>
  <p class="igcse-widget__title">Sampling and Nyquist visualiser</p>
  <p class="igcse-widget__hint">Green is the original wave. Blue points are sampled values.</p>
  <div class="igcse-widget__controls">
    <label>
      Signal frequency (Hz)
      <input type="number" min="100" max="5000" step="100" value="1000" data-sampling-signal />
    </label>
    <label>
      Sample rate (Hz)
      <input type="number" min="500" max="48000" step="100" value="8000" data-sampling-rate />
    </label>
  </div>
  <div class="igcse-widget__board" data-sampling-board></div>
  <p class="igcse-widget__result" data-sampling-result></p>
</div>

</div>

### Sound file-size calculations (simple to exam scale)

<div class="reader-section-body reader-section-body--apply">

Example A (short voice note): 8000 Hz, 8-bit, mono, 30 s

1. bits = 8000 x 8 x 1 x 30 = 1,920,000 bits  
2. bytes = 1,920,000 / 8 = 240,000 bytes  
3. KiB = 240,000 / 1024 = 234.38 KiB

Example B (CD-quality clip): 44,100 Hz, 16-bit, stereo, 10 s

1. bits = 44,100 x 16 x 2 x 10 = 14,112,000 bits  
2. bytes = 14,112,000 / 8 = 1,764,000 bytes  
3. MiB = 1,764,000 / 1,048,576 = 1.68 MiB

Notice the method is identical. Only the values and units change.

</div>

### Interactive sound file-size calculator

<div class="reader-section-body reader-section-body--example">

<div class="igcse-widget" data-igcse-sound-calc>
  <p class="igcse-widget__title">Sound size calculator</p>
  <p class="igcse-widget__hint">Change recording settings and see the exact storage impact.</p>
  <div class="igcse-widget__controls">
    <label>
      Sample rate (Hz)
      <input type="number" min="1000" step="100" value="44100" data-sound-rate />
    </label>
    <label>
      Sample resolution (bits)
      <input type="number" min="1" max="32" value="16" data-sound-depth />
    </label>
    <label>
      Channels
      <select data-sound-channels>
        <option value="1">Mono (1)</option>
        <option value="2" selected>Stereo (2)</option>
      </select>
    </label>
    <label>
      Duration (seconds)
      <input type="number" min="1" step="1" value="10" data-sound-duration />
    </label>
  </div>
  <div class="igcse-widget__board" data-sound-board></div>
  <p class="igcse-widget__result" data-sound-result></p>
</div>

</div>

### Images: pixel grids, colour depth, and RGB/hex

<div class="reader-section-body reader-section-body--example">

<div class="igcse-widget" data-igcse-bitmap-demo>
  <p class="igcse-widget__title">Bitmap preview and storage model</p>
  <p class="igcse-widget__hint">Change colour depth and resolution to see how pixel range and file size change.</p>
  <div class="igcse-widget__controls">
    <label>
      Width (pixels)
      <input type="number" min="1" step="1" value="16" data-bitmap-width />
    </label>
    <label>
      Height (pixels)
      <input type="number" min="1" step="1" value="16" data-bitmap-height />
    </label>
    <label>
      Colour depth
      <select data-bitmap-depth>
        <option value="1">1-bit</option>
        <option value="2" selected>2-bit</option>
        <option value="4">4-bit</option>
        <option value="8">8-bit</option>
        <option value="24">24-bit (RGB)</option>
      </select>
    </label>
  </div>
  <div class="igcse-widget__split">
    <div>
      <p class="igcse-widget__mini-label">Preview grid</p>
      <div class="igcse-pixel-grid" data-bitmap-grid></div>
    </div>
    <div data-bitmap-stats></div>
  </div>
  <p class="igcse-widget__result" data-bitmap-result></p>
</div>

</div>

<div class="reader-section-body reader-section-body--apply">

A bitmap image is a grid of pixels. Every pixel stores a colour value using bits.

| Colour depth | Colour count | Typical use |
| --- | --- | --- |
| 1-bit | 2 colours | black/white masks |
| 2-bit | 4 colours | simple icons, tiny sprites |
| 4-bit | 16 colours | retro palettes |
| 8-bit | 256 colours | indexed graphics |
| 24-bit | 16,777,216 colours | true-colour photos |

Why 24-bit gives 16.7 million colours:

- 8 bits for red (0 to 255)
- 8 bits for green (0 to 255)
- 8 bits for blue (0 to 255)
- total combinations = 256 x 256 x 256 = 16,777,216

This links back to hexadecimal because each colour channel byte is often written in hex.
Example: R=63, G=167, B=214 -> **#3FA7D6**.

Bitmap size method:

- bits = width x height x colour depth
- bytes = bits / 8

</div>

### 4 x 4 bitmap walkthrough

<div class="reader-section-body reader-section-body--concept">

For a 2-bit image, each pixel stores one value from 0 to 3.

| y\x | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 1 | 0 |
| 1 | 0 | 2 | 2 | 0 |
| 2 | 0 | 3 | 3 | 0 |
| 3 | 0 | 0 | 0 | 0 |

Palette example (2-bit):

| Pixel value | Binary | Colour |
| --- | --- | --- |
| 0 | 00 | black |
| 1 | 01 | dark grey |
| 2 | 10 | light grey |
| 3 | 11 | white |

Storage comparison for the same 4 x 4 image:

- 2-bit: 4 x 4 x 2 = 32 bits = 4 bytes
- 24-bit: 4 x 4 x 24 = 384 bits = 48 bytes

Same pixels, very different file size because colour depth changed.

</div>

### Common mistakes in 1.2 questions

<div class="reader-section-body reader-section-body--concept">

- mixing up character set and encoding
- forgetting channels in sound calculations
- forgetting colour depth in bitmap calculations
- claiming ASCII supports all languages and symbols
- forgetting that sampling rate links to frequency capture (Nyquist idea)
- assuming higher quality settings keep file size unchanged

</div>

## 1.3 Data Storage & Compression

### Overview

<div class="reader-section-body reader-section-body--apply">

This subtopic combines arithmetic discipline with judgement.
Students are expected to calculate sizes accurately and choose sensible compression approaches for different file types.

The question to keep asking is:
what must stay exact, and what can be reduced to save space or bandwidth?

</div>

### Storage units and binary prefixes

<div class="reader-section-body reader-section-body--concept">

IGCSE file-size questions use binary multiples for computer memory and storage.

| Unit | Exact value |
| --- | --- |
| bit | 0 or 1 |
| nibble | 4 bits |
| byte | 8 bits |
| KiB | 1024 bytes |
| MiB | 1024 KiB = 1,048,576 bytes |
| GiB | 1024 MiB = 1,073,741,824 bytes |

Do not mix decimal and binary prefixes:

| Label | Multiplier |
| --- | --- |
| KB, MB, GB | powers of 1000 |
| KiB, MiB, GiB | powers of 1024 |

Method habit that avoids dropped marks:

1. write units on every line
2. convert one step at a time
3. round only at the final step, if the question asks

</div>

### File-size workflow: image and sound questions

<div class="reader-section-body reader-section-body--apply">

Core formulas:

- bitmap bits = width x height x colour depth
- sound bits = sample rate x sample resolution x channels x duration
- bytes = bits / 8

Image example: 1024 x 1080 at 32-bit

1. pixels = 1024 x 1080 = 1,105,920  
2. bits = 1,105,920 x 32 = 35,389,440 bits  
3. bytes = 35,389,440 / 8 = 4,423,680 bytes  
4. MiB = 4,423,680 / 1,048,576 = 4.22 MiB (approx)

Audio example: 44,100 Hz, 16-bit, stereo, 60 minutes

1. seconds = 60 x 60 = 3600  
2. bits = 44,100 x 16 x 2 x 3600 = 5,080,320,000 bits  
3. bytes = 5,080,320,000 / 8 = 635,040,000 bytes  
4. MiB = 635,040,000 / 1,048,576 = 605 MiB (approx)

Common exam error to avoid: forgetting to multiply by channels for stereo.

</div>

### Why compression matters in real systems

<div class="reader-section-body reader-section-body--apply">

| Context | Without compression | With compression |
| --- | --- | --- |
| Emailing a photo pack | Large attachments, slow upload | Smaller transfer size |
| Streaming music/video | More buffering and data usage | Smoother playback |
| Backing up files to cloud | Fewer files fit, higher cost | More files fit in same storage |
| Downloading on mobile data | High data usage | Lower data usage |

Compression changes stored/transmitted size.
It does not change the original capture formula that produced the raw data.

</div>

### Lossless and lossy: choosing the right approach

<div class="reader-section-body reader-section-body--apply">

Choose compression based on whether exact restoration is required.

| Type | What happens to original data | Typical formats | Best used for |
| --- | --- | --- | --- |
| Lossless | Fully recoverable after decompression | RLE, ZIP, PNG | Text, source code, archives, technical diagrams |
| Lossy | Some information is removed permanently | JPEG, MP3, MP4 | Photos, music, video where smaller size matters more than perfect recovery |

Compression ratio = original size / compressed size.
A ratio of 5:1 means the compressed file is one fifth of the original size.

</div>

### Run Length Encoding (RLE) method walkthrough

<div class="reader-section-body reader-section-body--concept">

RLE is lossless and works best when the same value repeats many times.

Example string: **AAAABBBCCDAA**

| Run | Symbol | Count | RLE chunk |
| --- | --- | --- | --- |
| 1 | A | 4 | 4A |
| 2 | B | 3 | 3B |
| 3 | C | 2 | 2C |
| 4 | D | 1 | 1D |
| 5 | A | 2 | 2A |

Encoded result: **4A3B2C1D2A**

Exam note: RLE is not always efficient.
If data has little repetition, encoded form can be similar size or even larger.

</div>

### Interactive RLE demonstrator

<div class="reader-section-body reader-section-body--example">

<div class="igcse-widget" data-igcse-rle-demo>
  <p class="igcse-widget__title">Run Length Encoding (RLE) demo</p>
  <p class="igcse-widget__hint">Enter a repeated pattern and compare original symbols to RLE output.</p>
  <div class="igcse-widget__controls">
    <label>
      Input pattern
      <input type="text" value="AAAAABBBCCDAA" data-rle-input />
    </label>
  </div>
  <div class="igcse-widget__board" data-rle-board></div>
  <p class="igcse-widget__result" data-rle-result></p>
</div>

</div>

### Exam response scaffold for compression questions

<div class="reader-section-body reader-section-body--apply">

Use this 4-line structure:

1. identify file type and usage (archive, stream, edit, publish)
2. decide whether exact restoration is needed
3. choose lossy or lossless
4. justify using quality, storage, and transfer-time trade-off

Typical calls:

- source code backup -> lossless
- photo gallery for web -> lossy usually acceptable
- archived legal or medical records -> lossless required
- music streaming -> lossy often acceptable

</div>
