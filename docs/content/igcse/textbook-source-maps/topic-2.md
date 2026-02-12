# IGCSE Textbook Source Map: Topic 2 - Data Transmission

## Scope
- Topic: 2
- Topic name: Data Transmission
- Source policy: igcse_textbook_then_syllabus_then_slides
- Source hierarchy: chapter text files -> Cambridge syllabus -> existing SGS slides (fallback only).

## Canonical Website Subtopics
- 2.1 Data Transmission
- 2.2 Error Checking
- 2.3 Encryption

## Mapped Source Files
- docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.1.txt
- docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.2.txt
- docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.3.txt
- docs/content/igcse/chapter-text-files/Chapter 2 key words.txt

## Locked Noise Exclusions
- docs/content/igcse/chapter-text-files/Chapter 5 Subfiles/5123.txt
- docs/content/igcse/chapter-text-files/chapter 3 Subfiles/300.txt
- docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/780340.txt
- docs/content/igcse/chapter-text-files/.DS_Store

## Evidence by Subtopic
### 2.1 Data Transmission
- Source: `docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.1.txt`
```text
2 Which types of data transmission are being described:
can support different data transmission rates (from 1.5 Mbps to 5 Gbps)
Full-duplex data transmission involves sending 8 bits of data at a time
Packet switching is a method of data transmission in which a message is broken
a high data transmission rate is possible.
Data transmission can be either over a short distance (for example, computer
the direction of data transmission (for example, can data transmit in one
Serial and parallel data transmission
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.2.txt`
```text
problem to a computer. Figure 2.13 could be the result of some data corruption
1 The following block of data was received after transmission from a remote
2 The following block of data was received after transmission from a remote
transmission (this is typically a Cyclic Redundancy Check – refer to Section 2.1.1);
Errors can occur during data transmission due to:
skewing of data (this occurs during parallel data transmission and can cause
corrupted following data transmission. This method is based on the number of
bit in the byte was changed during data transmission?
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.3.txt`
```text
✔ types of data transmission (serial, parallel, simplex, half-duplex and full-duplex)
transmission all the data packets are reassembled to form the original message/data
packet switching – a method of transmission in which a message is broken into many data
real time streaming – the transmission of data over a network for live events where the
serial data transmission – sending data down one channel/wire one bit at a time
parallel data transmission – sending data down several channels/wires several bits at a
universal serial bus (USB) – a type of serial data transmission which has become the
error-free; check digit is a data entry check and not a data transmission check
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 2 key words.txt`
```text
transmission all the data packets are reassembled to form the original message/data
packet switching – a method of transmission in which a message is broken into many data
real time streaming – the transmission of data over a network for live events where the
serial data transmission – sending data down one channel/wire one bit at a time
parallel data transmission – sending data down several channels/wires several bits at a
universal serial bus (USB) – a type of serial data transmission which has become the
error-free; check digit is a data entry check and not a data transmission check
parity bit – a bit (either 0 or 1) added to a byte of data in the most significant bit position;
```

### 2.2 Error Checking
- Source: `docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.2.txt`
```text
Checking for errors is important since computers are unable to understand text,
This is why error checking is such an important part of computer technology.
to locate the error using parity checking.
complement parity when it comes to error checking to ensure errors are never
in the first place, or if the error occurred when sending the data back for checking.
errors, so that you don't end up with text as shown in Figure 2.13 above!
1 Which of the following received bytes indicate an error has occurred following
2 In each case, in question 1, where an error occurred, can you work out which
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.1.txt`
```text
3 a The trailer in a packet will use one form of error checking.
an error checking method; cyclic redundancy checks (CRCs) are used to check
Packets don't require any form of error checking
– if the two values match, then no transmission errors have occurred;
the method is more prone to errors with real-time streaming (for example, a
USB protocol notifies the transmitter to re- transmit data if any errors are
detected; this leads to error-free data transmission
USBs use a protocol that allows for error-free data transmission between
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.3.txt`
```text
cyclic redundancy check (CRC) – an error checking method in which all the 1-bits in
is possible to match 1, 2, 3 or none of the error-checking methods.
automatic repeat request (ARQ) – a method of checking transmitted data for errors; it
suitable error checking method in this application.
description to the error-checking technique. For each description, it
b Five statements about checksum error checking are given below, but
b Identify and describe two methods of error checking that
1 Using Figure 2.22 as your template, draw a new diagram showing the public
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 2 key words.txt`
```text
cyclic redundancy check (CRC) – an error checking method in which all the 1-bits in
automatic repeat request (ARQ) – a method of checking transmitted data for errors; it
correctly (used in the ARQ error detection method)
the ARQ error detection method)
error-free; check digit is a data entry check and not a data transmission check
```

### 2.3 Encryption
- Source: `docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.3.txt`
```text
uses a 10-digit denary encryption key (this gives 1 × 1010 possible codes); and a
process would be the reverse of encryption and each letter would be shifted –4,
seconds. To try to combat this, we now use 256-bit binary encryption keys that
2 Explain why this method is much more secure than symmetric encryption.
5 a Describe what is meant by symmetric encryption.[2]
b Describe what is meant by asymmetric encryption.[3]
encryption helps to minimise this risk.
Encryption alters data into a form that is unreadable by anybody for whom the
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.1.txt`
```text
Suppose our photograph (Figure 2.3) has been split up into five packets that have
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.2.txt`
```text
A careful study of Table 2.3 shows the following:
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 2 key words.txt`
```text
encryption – the process of making data meaningless using encryption keys; without the
plaintext – the original text/message before it is put through an encryption algorithm
encryption algorithm – a complex piece of software that takes plaintext and generates an
symmetric encryption – a type of encryption in which the same encryption key is used both
asymmetric encryption – a type of encryption that uses public keys and private keys to
public key – a type of encryption key that is known to all users
private key – a type of encryption key which is known only to the single computer/user
```

