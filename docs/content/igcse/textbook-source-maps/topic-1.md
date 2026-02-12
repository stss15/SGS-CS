# IGCSE Textbook Source Map: Topic 1 - Data Representation

## Scope
- Topic: 1
- Topic name: Data Representation
- Source policy: igcse_textbook_then_syllabus_then_slides
- Source hierarchy: chapter text files -> Cambridge syllabus -> existing SGS slides (fallback only).

## Canonical Website Subtopics
- 1.1 Number Representation
- 1.2 Text, Sound & Images
- 1.3 Data Storage & Compression

## Mapped Source Files
- docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.1.txt
- docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.2.txt
- docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.3.txt
- docs/content/igcse/chapter-text-files/Chapter 1 key words.txt

## Locked Noise Exclusions
- docs/content/igcse/chapter-text-files/Chapter 5 Subfiles/5123.txt
- docs/content/igcse/chapter-text-files/chapter 3 Subfiles/300.txt
- docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/780340.txt
- docs/content/igcse/chapter-text-files/.DS_Store

## Evidence by Subtopic
### 1.1 Number Representation
- Source: `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.1.txt`
```text
Denary → binary (subtractive place values): write the place values; check if each fits the remaining number; e.g., 156 → 128 fits (1), 64 no (0), 32 no (0), 16 yes (1), 8 yes (1), 4 yes (1), 2 no (0), 1 no (0) → 10011100.
Big idea: computers only see ON/OFF states, so we map all data to number systems that suit the hardware and humans.
Purpose: represent negative numbers while using the same adder hardware.
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.2.txt`
```text
Big idea: all media becomes binary. We need shared code sets and numeric models to store text, sound, and pictures without losing meaning.
Question: How do we agree on which bits mean which characters? We map characters to numeric code points.
ASCII: 7-bit (128 codes). Covers English letters, digits, punctuation, control codes. Example: A = 65 (0x41), a = 97 (0x61).
Extended ASCII: 8-bit (256 codes) adds symbols/accents but is still limited and inconsistent across vendors.
Unicode: universal code points (e.g., U+0041 for A, U+1F600 for emoji). Needs an encoding to turn code points into bytes.
ASCII: fixed 7-bit (often stored as 1 byte with leading 0).
UTF-8: variable length (1-4 bytes). ASCII stays 1 byte; emojis and non-Latin scripts use more.
UTF-16: mostly 2 bytes; some symbols need 4.
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.3.txt`
```text
Stereo/multichannel: multiply by number of channels.
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 1 key words.txt`
```text
binary number system – a number system based on 2 and can only use the values 0 and 1
hexadecimal number system – a number system based on the value 16 which uses denary digits 0 to 9 and letters A to F
two's complement – a method of representing negative numbers in binary; when applied to an 8-bit system, the left-most
image resolution – the number of pixels in the X–Y direction of an image, for example, 4096 × 3192 pixels
sampling resolution – the number of bits used to represent sound amplitude in digital sound recording (also known as bit depth)
bit depth – the number of bits used to represent the smallest unit in a sound file
colour depth – the number of bits used to represent the colours of a pixel
sampling rate – the number of sound samples taken per second in digital sound recording
```

### 1.2 Text, Sound & Images
- Source: `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.2.txt`
```text
Big idea: all media becomes binary. We need shared code sets and numeric models to store text, sound, and pictures without losing meaning.
Why Unicode replaced ASCII: global language coverage, emojis, consistent cross-platform text.
How text becomes bits (model)
Vector images store shapes and formulas (lines, curves) rather than per-pixel data; scale without pixelation.
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.1.txt`
```text
Big idea: computers only see ON/OFF states, so we map all data to number systems that suit the hardware and humans.
Question: Why do computers prefer binary? Because millions of tiny switches (transistors) are either OFF (0) or ON (1), making binary reliable for storage and processing.
Key term: bit = single 0/1; nibble = 4 bits; byte = 8 bits.
How place values work: 128 64 32 16 8 4 2 1; add the positions where the bit is 1.
Example decode: 10110101 = 128 + 32 + 16 + 4 + 1 = 181.
Denary → binary (subtractive place values): write the place values; check if each fits the remaining number; e.g., 156 → 128 fits (1), 64 no (0), 32 no (0), 16 yes (1), 8 yes (1), 4 yes (1), 2 no (0), 1 no (0) → 10011100.
Clarify: more bits double the range each time (n bits → 0 to 2^n – 1 for unsigned).
Why use hex? It is shorter for humans and maps exactly to binary nibbles (1 hex digit = 4 bits).
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.3.txt`
```text
"Compression is only for images" (audio, video, text, and archives use it).
Lossy: discards less noticeable data for higher compression. Examples: JPEG, MP3, AAC, MP4. Not suitable for text/archival.
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 1 key words.txt`
```text
HTML – HyperText Mark-up Language is used in the design of web pages and to write, for example, http(s) protocols; in the
context of this chapter, colours used in web pages are assigned a hexadecimal code based on red, green and blue colours
sampling resolution – the number of bits used to represent sound amplitude in digital sound recording (also known as bit depth)
bit depth – the number of bits used to represent the smallest unit in a sound file
sampling rate – the number of sound samples taken per second in digital sound recording
audio compression – a method used to reduce the size of a sound file using perceptual music shaping
run length encoding (RLE) – a lossless file compression technique used to reduce the size of text and photo files in particular
```

### 1.3 Data Storage & Compression
- Source: `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.3.txt`
```text
Lossy: discards less noticeable data for higher compression. Examples: JPEG, MP3, AAC, MP4. Not suitable for text/archival.
Big idea: everything in storage is counted in bits. We need clear units, simple size formulas, and compression choices to keep files practical.
Clarify: Compression changes storage size, not the RAM requirement to edit/play; lossless keeps quality identical, lossy does not.
Lossy (e.g., JPEG/MP3 idea): transform data, remove high-frequency or less perceptible parts, then encode.
Purpose: reduce file size to save storage and speed up transfers.
Lossless: no data lost; file can be reconstructed exactly. Examples: RLE, Huffman, ZIP/PNG.
Metrics: compression ratio = original size / compressed size.
"Lossless and lossy give the same quality" (lossy removes data; lossless does not).
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.1.txt`
```text
Question: Why do computers prefer binary? Because millions of tiny switches (transistors) are either OFF (0) or ON (1), making binary reliable for storage and processing.
Big idea: computers only see ON/OFF states, so we map all data to number systems that suit the hardware and humans.
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.2.txt`
```text
Clarify: Increasing colour depth or resolution increases file size; compression can reduce stored size but not the raw bitmap formula.
Vector images store shapes and formulas (lines, curves) rather than per-pixel data; scale without pixelation.
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 1 key words.txt`
```text
compression – reduction of the size of a file by removing repeated or redundant pieces of data; this can be lossy or lossless
decompression process for example, JPEG, mp3
MP3 – a lossy file compression method used for music files
MP4 – a lossy file compression method used for multimedia files
bandwidth – the maximum rate of transfer of data across a network, measured in kilobits per second (kbps) or megabits
lossy (file compression) – a file compression method in which parts of the original file cannot be recovered during the
lossless (file compression) – a file compression method that allows the original file to be fully restored during the
decompression process, for example, run length encoding (RLE)
```

