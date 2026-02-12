---
topicNumber: 5
topicName: "The Internet and its Uses"
summary: "Learn how the internet works, how data is exchanged on the web, and how security controls protect users across communication, finance, and cyber security contexts."
subtopics:
  - code: "5.1"
    title: "The Internet & WWW"
  - code: "5.2"
    title: "Digital Currency"
  - code: "5.3"
    title: "Cyber Security"
sourcePolicy: igcse_textbook_then_syllabus_then_slides
---

## Unit Summary

Learn how the internet works, how data is exchanged on the web, and how security controls protect users across communication, finance, and cyber security contexts.

## Objectives and Outcomes

### Objectives

- Build confident understanding of 5.1 The Internet & WWW.
- Build confident understanding of 5.2 Digital Currency.
- Build confident understanding of 5.3 Cyber Security.

### Outcomes

- Apply concepts from 5.1, 5.2, 5.3 in structured exam-style questions.
- Use precise subject vocabulary and clear written justification in your answers.
- Complete sub-topic checks and end-of-unit assessment activities as they are released.

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Internet | Global infrastructure of interconnected networks and devices. |
| WWW | Collection of linked web resources accessed over the internet. |
| URL | Address used to locate a resource on the web. |
| HTTP/HTTPS | Protocols for web transfer, with HTTPS adding encryption. |
| Cookie | Small data file stored by a browser for session or preference management. |
| Digital Currency | Digitally represented value used for transactions. |
| Blockchain | Distributed ledger of linked blocks recording transaction history. |
| Malware | Malicious software intended to disrupt, damage, or gain unauthorised access. |
| Phishing | Social engineering attack to trick users into revealing sensitive data. |
| Two-Step Verification | Authentication method using two independent evidence factors. |
| Biometric Authentication | Identity check based on physical or behavioural traits. |
| Firewall | Security control used to filter and regulate network traffic. |

## 5.1 The Internet & WWW

### Overview

- The internet is infrastructure; the World Wide Web is one service running on top of that infrastructure.
- URLs specify protocol, domain, path, and resource naming needed by browsers.
- HTTP and HTTPS define how requests and responses are transferred between client and server.

### Applied Understanding

- Separate internet hardware concepts from web content concepts in exam answers.
- Parse URLs into protocol, host, and path components accurately.
- Explain why HTTPS is required for secure form and transaction data.

### Worked Example

**Worked URL parser routine**

This routine checks whether a URL is secure and reports the protocol used.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE UrlText : STRING
INPUT UrlText
IF SUBSTRING(UrlText, 1, 8) = "https://" THEN
  OUTPUT "Secure protocol detected"
ELSE
  OUTPUT "Non-secure or unknown protocol"
ENDIF
</code></pre>

![URL structure: protocol, domain, and path.](/igcse/topic5/5.1 images/anatomy of a url.png)

*URL structure: protocol, domain, and path.*

## 5.2 Digital Currency

### Overview

- Digital currency records and transfers value electronically.
- Blockchain stores transactions in linked blocks, supporting tamper-evident history.
- Security and trust depend on verification mechanisms and key ownership.
- Digital currency is an accepted form of payment to pay for goods or services.

### Applied Understanding

- Differentiate fiat-backed digital systems and decentralised cryptocurrency models.
- Explain why transaction verification is required before block confirmation.
- Discuss practical strengths and constraints such as speed, cost, and traceability.

### Worked Example

**Worked transaction validation flow**

This routine models a simplified decision process before accepting a digital transaction.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE SenderValid : BOOLEAN
DECLARE ReceiverValid : BOOLEAN
DECLARE FundsAvailable : BOOLEAN
INPUT SenderValid
INPUT ReceiverValid
INPUT FundsAvailable
IF SenderValid AND ReceiverValid AND FundsAvailable THEN
  OUTPUT "Transaction approved"
ELSE
  OUTPUT "Transaction rejected"
ENDIF
</code></pre>

![Digital transaction and verification flow.](/igcse/topic5/5.2 images/crypto currency transaction process.png)

*Digital transaction and verification flow.*

## 5.3 Cyber Security

### Overview

- Cyber security protects systems and data from attack, misuse, and unauthorised access.
- Threats include malware, phishing, social engineering, brute force, and denial-of-service methods.
- Defences combine technical controls, authentication, updates, and user awareness.

### Applied Understanding

- Link each threat to a suitable prevention or mitigation strategy.
- Explain why software updates and patching are critical to reducing known vulnerabilities.
- Use authentication-layer examples such as biometrics and two-step verification.

### Worked Example

**Worked phishing filter routine**

This routine applies simple checks to flag suspicious message characteristics before user interaction.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE HasSuspiciousLink : BOOLEAN
DECLARE HasUrgentTone : BOOLEAN
DECLARE HasSpellingErrors : BOOLEAN
INPUT HasSuspiciousLink
INPUT HasUrgentTone
INPUT HasSpellingErrors
IF HasSuspiciousLink OR HasUrgentTone OR HasSpellingErrors THEN
  OUTPUT "Flag as potential phishing"
ELSE
  OUTPUT "No immediate phishing indicators"
ENDIF
</code></pre>

![Phishing and pharming attack comparison.](/igcse/topic5/5.3 images/phishing vs pharming.png)

*Phishing and pharming attack comparison.*

