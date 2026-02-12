export const TOPIC_SOURCE_POLICY = 'igcse_textbook_then_syllabus_then_slides';

export const NOISE_FILES = [
  'docs/content/igcse/chapter-text-files/Chapter 5 Subfiles/5123.txt',
  'docs/content/igcse/chapter-text-files/chapter 3 Subfiles/300.txt',
  'docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/780340.txt',
  'docs/content/igcse/chapter-text-files/.DS_Store'
];

export const TOPIC_MAP = [
  {
    topicNumber: 1,
    topicName: 'Data Representation',
    sourceFiles: [
      'docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.1.txt',
      'docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.2.txt',
      'docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.3.txt',
      'docs/content/igcse/chapter-text-files/Chapter 1 key words.txt'
    ],
    keyTerms: [
      ['Binary', 'Base-2 representation using only 0 and 1.'],
      ['Denary', 'Base-10 number system used in everyday mathematics.'],
      ['Hexadecimal', 'Base-16 number system using digits 0-9 and A-F.'],
      ['Overflow', 'When a result is too large for the fixed bit width available.'],
      ["Two\'s Complement", 'Method for representing signed integers in binary.'],
      ['Sample Rate', 'Number of sound samples captured per second.'],
      ['Sample Resolution', 'Bits used per sound sample.'],
      ['Resolution', 'Total number of pixels in an image.'],
      ['Colour Depth', 'Bits used to represent each pixel colour.'],
      ['Lossy Compression', 'Compression that permanently removes some data.'],
      ['Lossless Compression', 'Compression that reduces size without losing original data.'],
      ['KiB', 'A kibibyte, equal to 1024 bytes.']
    ],
    subtopics: [
      {
        code: '1.1',
        title: 'Number Representation',
        overview: [
          'Computers represent all data using binary states because electronic hardware reliably stores ON/OFF values.',
          'You need fluent conversion between binary, denary, and hexadecimal, including fixed-width formats.',
          'Logical shifts and two\'s complement connect representation directly to arithmetic behaviour in processors.'
        ],
        applied: [
          'Use place-value subtraction to convert denary to binary quickly in exam conditions.',
          'Use 4-bit grouping to convert between binary and hexadecimal accurately.',
          'When adding 8-bit values, always check whether a carry leaves the left side of the register.',
          'Remember left shift multiplies by 2 and right shift divides by 2 for positive unsigned values.'
        ],
        worked: {
          title: 'Worked conversion and overflow routine',
          explanation:
            'This routine converts a denary value to 8-bit binary, adds another 8-bit number, and reports if overflow occurs.'
        },
        pseudocode: `DECLARE ValueA : INTEGER
DECLARE ValueB : INTEGER
DECLARE Sum : INTEGER
DECLARE OverflowFlag : BOOLEAN
INPUT ValueA
INPUT ValueB
Sum <- ValueA + ValueB
IF Sum > 255 THEN
  OverflowFlag <- TRUE
  Sum <- MOD(Sum, 256)
ELSE
  OverflowFlag <- FALSE
ENDIF
OUTPUT "8-bit result = ", Sum
OUTPUT "Overflow = ", OverflowFlag`,
        diagram: {
          path: '/igcse/topic1/1.1 images/binary to denary.png',
          caption: 'Binary to denary place-value expansion chart.'
        }
      },
      {
        code: '1.2',
        title: 'Text, Sound & Images',
        overview: [
          'Text uses character sets such as ASCII and Unicode to map symbols to numeric codes.',
          'Sound is digitised by sampling over time, so quality depends on sample rate and sample resolution.',
          'Bitmap images are stored as pixels where resolution and colour depth determine quality and file size.'
        ],
        applied: [
          'Unicode increases language coverage compared with ASCII but often uses more storage per character.',
          'Higher sample rate or resolution improves sound fidelity but increases storage and transmission cost.',
          'Increasing image resolution or colour depth improves detail while making files larger.'
        ],
        worked: {
          title: 'Worked media quality decision',
          explanation:
            'This decision routine chooses high or standard capture settings based on available storage in MiB.'
        },
        pseudocode: `DECLARE StorageMiB : REAL
DECLARE Mode : STRING
INPUT StorageMiB
IF StorageMiB >= 512.0 THEN
  Mode <- "HighQuality"
ELSE
  Mode <- "StandardQuality"
ENDIF
OUTPUT "Capture mode = ", Mode`,
        diagram: {
          path: '/igcse/topic1/1.2 images/resolution.png',
          caption: 'Resolution and pixel grid comparison.'
        }
      },
      {
        code: '1.3',
        title: 'Data Storage & Compression',
        overview: [
          'Storage units in this course follow binary multiples: 1 KiB = 1024 bytes, not 1000.',
          'File-size calculations require combining dimensions, colour depth, duration, sample rate, and sample resolution.',
          'Compression reduces transfer time and storage use; method choice depends on acceptable data loss.'
        ],
        applied: [
          'State units clearly in answers and convert with powers of 1024 where required.',
          'Use lossless methods when exact restoration is required, for example code or database backups.',
          'Use lossy methods for media where some quality reduction is acceptable for major size reduction.'
        ],
        worked: {
          title: 'Worked file-size checker',
          explanation:
            'This routine computes image size in bytes and reports if compression is required to fit a given limit.'
        },
        pseudocode: `DECLARE Width : INTEGER
DECLARE Height : INTEGER
DECLARE ColourDepth : INTEGER
DECLARE LimitBytes : INTEGER
DECLARE FileSize : INTEGER
INPUT Width
INPUT Height
INPUT ColourDepth
INPUT LimitBytes
FileSize <- DIV(Width * Height * ColourDepth, 8)
IF FileSize > LimitBytes THEN
  OUTPUT "Compression required"
ELSE
  OUTPUT "No compression required"
ENDIF
OUTPUT "Estimated size (bytes) = ", FileSize`,
        diagram: {
          path: '/igcse/topic1/1.3 images/file size formula.png',
          caption: 'Image file-size calculation formula reference.'
        }
      }
    ]
  },
  {
    topicNumber: 2,
    topicName: 'Data Transmission',
    sourceFiles: [
      'docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.1.txt',
      'docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.2.txt',
      'docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.3.txt',
      'docs/content/igcse/chapter-text-files/Chapter 2 key words.txt'
    ],
    keyTerms: [
      ['Packet', 'A block of transmitted data containing header, payload, and trailer.'],
      ['Packet Header', 'Packet metadata such as source/destination addressing and sequence information.'],
      ['Payload', 'The actual user data carried inside a packet.'],
      ['Serial Transmission', 'Bits sent one after another along a channel.'],
      ['Parallel Transmission', 'Multiple bits sent at the same time over multiple channels.'],
      ['Simplex', 'One-way communication only.'],
      ['Duplex', 'Two-way communication channel.'],
      ['Parity Check', 'Error-detection method based on odd/even bit counts.'],
      ['Checksum', 'Calculated value used to verify integrity of transferred data.'],
      ['ARQ', 'Automatic Repeat reQuest protocol for retransmission after detected errors.'],
      ['Symmetric Encryption', 'Same key used for encryption and decryption.'],
      ['Asymmetric Encryption', 'Different public and private keys used for secure communication.']
    ],
    subtopics: [
      {
        code: '2.1',
        title: 'Data Transmission',
        overview: [
          'Large messages are broken into packets so routing can adapt to network congestion and failures.',
          'Transmission methods and modes affect speed, reliability, and practical cable length.',
          'Packet headers and sequence information allow packets to be reassembled correctly at the destination.'
        ],
        applied: [
          'Use serial links for long-distance reliability and reduced crosstalk.',
          'Use packet sequence numbers to restore original message order after routing differences.',
          'Describe simplex, half-duplex, and full-duplex behaviour with real communication examples.'
        ],
        worked: {
          title: 'Worked packet-sequencing check',
          explanation:
            'This routine validates that incoming packet sequence numbers are continuous.'
        },
        pseudocode: `DECLARE ExpectedSequence : INTEGER
DECLARE ReceivedSequence : INTEGER
ExpectedSequence <- 1
REPEAT
  INPUT ReceivedSequence
  IF ReceivedSequence <> ExpectedSequence THEN
    OUTPUT "Packet out of sequence"
  ENDIF
  ExpectedSequence <- ExpectedSequence + 1
UNTIL ReceivedSequence = 0`,
        diagram: {
          path: '/igcse/topic2/2.1 images/data packet structure.png',
          caption: 'Packet structure with header, payload, and trailer.'
        }
      },
      {
        code: '2.2',
        title: 'Error Checking',
        overview: [
          'Transmission and data entry can introduce errors that must be detected before processing.',
          'Parity, checksum, and check digits provide different strengths for different scenarios.',
          'ARQ combines checking with retransmission logic to maintain message integrity.'
        ],
        applied: [
          'Use parity and checksum for transmission integrity checks.',
          'Use check digits in identifiers like ISBN where manual entry errors are common.',
          'Explain timeout and acknowledgment behaviour in ARQ workflows.'
        ],
        worked: {
          title: 'Worked parity and ARQ decision',
          explanation:
            'This routine checks parity and requests retransmission when validation fails.'
        },
        pseudocode: `DECLARE OneCount : INTEGER
DECLARE IsParityValid : BOOLEAN
DECLARE Retry : BOOLEAN
INPUT OneCount
IsParityValid <- MOD(OneCount, 2) = 0
IF IsParityValid THEN
  OUTPUT "ACK"
  Retry <- FALSE
ELSE
  OUTPUT "NACK"
  Retry <- TRUE
ENDIF
OUTPUT "Retry required = ", Retry`,
        diagram: {
          path: '/igcse/topic2/2.2 images/arq.png',
          caption: 'ARQ acknowledgment and retransmission flow.'
        }
      },
      {
        code: '2.3',
        title: 'Encryption',
        overview: [
          'Encryption protects data confidentiality by transforming readable plaintext into ciphertext.',
          'Symmetric methods use one shared key, while asymmetric methods use paired public/private keys.',
          'Practical security depends on key management as much as algorithm selection.'
        ],
        applied: [
          'Use asymmetric methods to exchange keys securely over untrusted networks.',
          'Use symmetric methods for bulk data once a shared key is established.',
          'Justify why plaintext transmission is risky on public infrastructure.'
        ],
        worked: {
          title: 'Worked hybrid encryption flow',
          explanation:
            'This routine models a simplified hybrid process where a session key is protected first, then used for payload encryption.'
        },
        pseudocode: `DECLARE PublicKeyAvailable : BOOLEAN
DECLARE SessionKeyReady : BOOLEAN
INPUT PublicKeyAvailable
IF PublicKeyAvailable THEN
  OUTPUT "Encrypt session key with public key"
  SessionKeyReady <- TRUE
ELSE
  SessionKeyReady <- FALSE
ENDIF
IF SessionKeyReady THEN
  OUTPUT "Encrypt payload with symmetric session key"
ELSE
  OUTPUT "Cannot transmit securely"
ENDIF`,
        diagram: {
          path: '/igcse/topic2/2.3 images/how encryption works.png',
          caption: 'Encryption workflow from plaintext to ciphertext.'
        }
      }
    ]
  },
  {
    topicNumber: 3,
    topicName: 'Hardware',
    sourceFiles: [
      'docs/content/igcse/chapter-text-files/chapter 3 Subfiles/3.1.txt',
      'docs/content/igcse/chapter-text-files/chapter 3 Subfiles/3.2.txt',
      'docs/content/igcse/chapter-text-files/chapter 3 Subfiles/3.3.txt',
      'docs/content/igcse/chapter-text-files/chapter 3 Subfiles/3.4.txt',
      'docs/content/igcse/chapter-text-files/chapter 3 Subfiles/3.5.txt',
      'docs/content/igcse/chapter-text-files/Chapter 3 key words.txt'
    ],
    keyTerms: [
      ['CPU', 'Processor responsible for executing instructions and controlling system operations.'],
      ['ALU', 'Arithmetic and logic unit inside the CPU.'],
      ['Control Unit', 'CPU component that coordinates instruction execution.'],
      ['Fetch-Decode-Execute', 'Cycle used by the CPU to process each instruction.'],
      ['Cache', 'Fast memory used to reduce access latency to frequently needed data.'],
      ['Embedded System', 'Computer system designed for a dedicated function.'],
      ['Sensor', 'Input device that measures physical conditions and converts them to data.'],
      ['Actuator', 'Output device that causes a physical action.'],
      ['RAM', 'Volatile primary storage for data and instructions currently in use.'],
      ['ROM', 'Non-volatile memory used for startup firmware.'],
      ['MAC Address', 'Unique hardware address assigned to a network interface.'],
      ['IP Address', 'Logical network address used for routing packets.']
    ],
    subtopics: [
      {
        code: '3.1',
        title: 'Computer Architecture',
        overview: [
          'Von Neumann architecture stores data and instructions in memory for CPU processing.',
          'The CPU combines control flow, arithmetic logic, and register use during each instruction cycle.',
          'Performance is affected by clock speed, core count, cache, and instruction-set efficiency.'
        ],
        applied: [
          'Trace the role of MAR, MDR, PC, and CIR during fetch-decode-execute.',
          'Explain why cache reduces repeated access delays compared with RAM-only workflows.',
          'Differentiate general-purpose systems and embedded systems by function and constraints.'
        ],
        worked: {
          title: 'Worked FDE cycle logger',
          explanation:
            'This routine logs simplified fetch-decode-execute stages for a fixed number of instructions.'
        },
        pseudocode: `DECLARE InstructionCounter : INTEGER
FOR InstructionCounter <- 1 TO 3
  OUTPUT "Fetch instruction " , InstructionCounter
  OUTPUT "Decode instruction " , InstructionCounter
  OUTPUT "Execute instruction " , InstructionCounter
NEXT InstructionCounter`,
        diagram: {
          path: '/igcse/topic3/3.1 images/von neumann architecture.png',
          caption: 'Von Neumann architecture overview.'
        }
      },
      {
        code: '3.2',
        title: 'Input & Output Devices',
        overview: [
          'Input devices capture data for processing, while output devices present processed information.',
          'Device selection depends on data type, environment, accessibility needs, and performance requirements.',
          'Sensors convert real-world measurements into signals suitable for digital systems.'
        ],
        applied: [
          'Select suitable input/output devices for a given scenario and justify trade-offs.',
          'Compare output technologies such as laser vs inkjet and LCD vs OLED for practical usage.',
          'Relate sensor output to controlled actions in automated systems.'
        ],
        worked: {
          title: 'Worked device-choice filter',
          explanation:
            'This routine classifies a device request as input, output, or mixed usage.'
        },
        pseudocode: `DECLARE RequestType : STRING
INPUT RequestType
CASE OF RequestType
  "Capture" : OUTPUT "Select input device"
  "Display" : OUTPUT "Select output device"
  OTHERWISE OUTPUT "Check if both input and output are required"
ENDCASE`,
        diagram: {
          path: '/igcse/topic3/3.2 images/sensors cheat sheet.png',
          caption: 'Sensor categories and capture types.'
        }
      },
      {
        code: '3.3',
        title: 'Data Storage',
        overview: [
          'Primary storage supports active processing while secondary storage supports long-term retention.',
          'Magnetic, optical, and solid-state media differ in speed, durability, and cost per capacity.',
          'Virtual memory extends apparent RAM using storage, but introduces slower access than real RAM.'
        ],
        applied: [
          'Compare RAM and ROM by volatility, role, and mutability.',
          'Select appropriate secondary storage based on access pattern and reliability needs.',
          'Explain cloud-storage benefits and risks in availability, dependence, and security.'
        ],
        worked: {
          title: 'Worked storage-tier decision',
          explanation:
            'This routine chooses a storage tier from access-speed and permanence requirements.'
        },
        pseudocode: `DECLARE NeedsPersistence : BOOLEAN
DECLARE NeedsFastAccess : BOOLEAN
INPUT NeedsPersistence
INPUT NeedsFastAccess
IF NeedsFastAccess AND NOT NeedsPersistence THEN
  OUTPUT "Use RAM"
ELSE
  IF NeedsPersistence THEN
    OUTPUT "Use secondary storage"
  ELSE
    OUTPUT "Review requirement"
  ENDIF
ENDIF`,
        diagram: {
          path: '/igcse/topic3/3.3 images/ram vs rom.png',
          caption: 'RAM and ROM comparison chart.'
        }
      },
      {
        code: '3.4',
        title: 'Network Hardware',
        overview: [
          'Network interface hardware enables data exchange between devices and networks.',
          'MAC and IP addressing play different roles: local identity vs routable logical addressing.',
          'Routers forward packets between networks using addressing and route information.'
        ],
        applied: [
          'Explain why MAC addresses are fixed at manufacture and IP addresses may change.',
          'Describe router responsibilities in forwarding and destination selection.',
          'Compare IPv4 and IPv6 addressing capacity and notation.'
        ],
        worked: {
          title: 'Worked address validation flow',
          explanation:
            'This routine checks whether a destination should be routed locally or via a router.'
        },
        pseudocode: `DECLARE IsLocalNetwork : BOOLEAN
INPUT IsLocalNetwork
IF IsLocalNetwork THEN
  OUTPUT "Send directly using MAC resolution"
ELSE
  OUTPUT "Forward packet to router"
ENDIF`,
        diagram: {
          path: '/igcse/topic3/3.4 images/Role of a router.png',
          caption: 'Router role in forwarding packets.'
        }
      },
      {
        code: '3.5',
        title: 'Review & Exam Prep',
        overview: [
          'Topic 3 combines architecture, devices, storage, and networking in integrated system questions.',
          'Exam responses should move from definition to mechanism, then to context-specific justification.',
          'Precise terminology improves marks in explain and compare command terms.'
        ],
        applied: [
          'Revise component interactions instead of isolated definitions.',
          'Use short trace-style sequences to explain hardware workflows.',
          'Check answers for correct distinctions, for example RAM vs ROM and MAC vs IP.'
        ],
        worked: {
          title: 'Worked integrated system check',
          explanation:
            'This routine confirms that each section of an exam answer includes architecture, storage, and networking evidence.'
        },
        pseudocode: `DECLARE HasArchitecturePoint : BOOLEAN
DECLARE HasStoragePoint : BOOLEAN
DECLARE HasNetworkPoint : BOOLEAN
INPUT HasArchitecturePoint
INPUT HasStoragePoint
INPUT HasNetworkPoint
IF HasArchitecturePoint AND HasStoragePoint AND HasNetworkPoint THEN
  OUTPUT "Answer has complete Topic 3 coverage"
ELSE
  OUTPUT "Add missing coverage area"
ENDIF`
      }
    ]
  },
  {
    topicNumber: 4,
    topicName: 'Software',
    sourceFiles: [
      'docs/content/igcse/chapter-text-files/Chapter 4 Subfiles/4.1.txt',
      'docs/content/igcse/chapter-text-files/Chapter 4 Subfiles/4.2.txt',
      'docs/content/igcse/chapter-text-files/Chapter 4 key words.txt'
    ],
    keyTerms: [
      ['System Software', 'Software that manages hardware and provides a platform for applications.'],
      ['Application Software', 'Software built to perform user-focused tasks.'],
      ['Operating System', 'Core system software managing resources and process execution.'],
      ['Utility Program', 'System software tool for maintenance, security, or optimisation.'],
      ['Interrupt', 'Signal that temporarily changes normal CPU instruction flow.'],
      ['Interrupt Service Routine', 'Code executed in response to an interrupt.'],
      ['High-Level Language', 'Human-readable programming language.'],
      ['Low-Level Language', 'Language closer to machine instructions, such as assembly.'],
      ['Compiler', 'Translator that converts complete source code before execution.'],
      ['Interpreter', 'Translator that executes source statements line by line.'],
      ['Assembler', 'Translator that converts assembly language into machine code.'],
      ['IDE', 'Integrated Development Environment with coding, debugging, and build tools.']
    ],
    subtopics: [
      {
        code: '4.1',
        title: 'Types of Software & Interrupts',
        overview: [
          'Software is broadly grouped into system software and application software.',
          'Operating systems coordinate memory, files, process scheduling, and interfaces.',
          'Interrupt handling allows urgent events to be processed safely during normal execution.'
        ],
        applied: [
          'Classify examples accurately as application or system software in exam scenarios.',
          'Describe interrupt generation, ISR execution, and return to the original task state.',
          'Explain why interrupt priorities matter when multiple events occur close together.'
        ],
        worked: {
          title: 'Worked interrupt handling routine',
          explanation:
            'This routine models a simplified software interrupt workflow with state-save and state-restore steps.'
        },
        pseudocode: `DECLARE InterruptRaised : BOOLEAN
INPUT InterruptRaised
IF InterruptRaised THEN
  OUTPUT "Complete current CPU cycle"
  OUTPUT "Save state"
  OUTPUT "Run interrupt service routine"
  OUTPUT "Restore state"
ENDIF
OUTPUT "Continue main program"`,
        diagram: {
          path: '/igcse/topic4/4.1 images/Software and Hardware Hierachy.png',
          caption: 'Software and hardware hierarchy chart.'
        }
      },
      {
        code: '4.2',
        title: 'Languages, Translators and IDEs',
        overview: [
          'High-level and low-level languages are selected based on readability, control, and performance requirements.',
          'Compilers, interpreters, and assemblers convert source forms into executable forms.',
          'IDEs improve development speed using tools such as code completion, syntax checking, and debugging.'
        ],
        applied: [
          'Compare compiler and interpreter behaviour for execution speed and error handling.',
          'Explain when low-level code control is worth the extra complexity.',
          'Describe how IDE tools reduce development and debugging time.'
        ],
        worked: {
          title: 'Worked translator choice matrix',
          explanation:
            'This routine selects a translation approach based on deployment and debugging priorities.'
        },
        pseudocode: `DECLARE NeedsFastRuntime : BOOLEAN
DECLARE NeedsRapidTesting : BOOLEAN
INPUT NeedsFastRuntime
INPUT NeedsRapidTesting
IF NeedsFastRuntime AND NOT NeedsRapidTesting THEN
  OUTPUT "Prefer compiler"
ELSE
  IF NeedsRapidTesting THEN
    OUTPUT "Prefer interpreter"
  ELSE
    OUTPUT "Review mixed approach"
  ENDIF
ENDIF`,
        diagram: {
          path: '/igcse/topic4/4.2 images/compiler vs interpreter.png',
          caption: 'Compiler and interpreter comparison.'
        }
      }
    ]
  },
  {
    topicNumber: 5,
    topicName: 'The Internet and its Uses',
    sourceFiles: [
      'docs/content/igcse/chapter-text-files/Chapter 5 Subfiles/5.1.txt',
      'docs/content/igcse/chapter-text-files/Chapter 5 Subfiles/5.2.txt',
      'docs/content/igcse/chapter-text-files/Chapter 5 Subfiles/5.3.txt',
      'docs/content/igcse/chapter-text-files/Chapter 5 key words.txt'
    ],
    keyTerms: [
      ['Internet', 'Global infrastructure of interconnected networks and devices.'],
      ['WWW', 'Collection of linked web resources accessed over the internet.'],
      ['URL', 'Address used to locate a resource on the web.'],
      ['HTTP/HTTPS', 'Protocols for web transfer, with HTTPS adding encryption.'],
      ['Cookie', 'Small data file stored by a browser for session or preference management.'],
      ['Digital Currency', 'Digitally represented value used for transactions.'],
      ['Blockchain', 'Distributed ledger of linked blocks recording transaction history.'],
      ['Malware', 'Malicious software intended to disrupt, damage, or gain unauthorised access.'],
      ['Phishing', 'Social engineering attack to trick users into revealing sensitive data.'],
      ['Two-Step Verification', 'Authentication method using two independent evidence factors.'],
      ['Biometric Authentication', 'Identity check based on physical or behavioural traits.'],
      ['Firewall', 'Security control used to filter and regulate network traffic.']
    ],
    subtopics: [
      {
        code: '5.1',
        title: 'The Internet & WWW',
        overview: [
          'The internet is infrastructure; the World Wide Web is one service running on top of that infrastructure.',
          'URLs specify protocol, domain, path, and resource naming needed by browsers.',
          'HTTP and HTTPS define how requests and responses are transferred between client and server.'
        ],
        applied: [
          'Separate internet hardware concepts from web content concepts in exam answers.',
          'Parse URLs into protocol, host, and path components accurately.',
          'Explain why HTTPS is required for secure form and transaction data.'
        ],
        worked: {
          title: 'Worked URL parser routine',
          explanation:
            'This routine checks whether a URL is secure and reports the protocol used.'
        },
        pseudocode: `DECLARE UrlText : STRING
INPUT UrlText
IF SUBSTRING(UrlText, 1, 8) = "https://" THEN
  OUTPUT "Secure protocol detected"
ELSE
  OUTPUT "Non-secure or unknown protocol"
ENDIF`,
        diagram: {
          path: '/igcse/topic5/5.1 images/anatomy of a url.png',
          caption: 'URL structure: protocol, domain, and path.'
        }
      },
      {
        code: '5.2',
        title: 'Digital Currency',
        overview: [
          'Digital currency records and transfers value electronically.',
          'Blockchain stores transactions in linked blocks, supporting tamper-evident history.',
          'Security and trust depend on verification mechanisms and key ownership.'
        ],
        applied: [
          'Differentiate fiat-backed digital systems and decentralised cryptocurrency models.',
          'Explain why transaction verification is required before block confirmation.',
          'Discuss practical strengths and constraints such as speed, cost, and traceability.'
        ],
        worked: {
          title: 'Worked transaction validation flow',
          explanation:
            'This routine models a simplified decision process before accepting a digital transaction.'
        },
        pseudocode: `DECLARE SenderValid : BOOLEAN
DECLARE ReceiverValid : BOOLEAN
DECLARE FundsAvailable : BOOLEAN
INPUT SenderValid
INPUT ReceiverValid
INPUT FundsAvailable
IF SenderValid AND ReceiverValid AND FundsAvailable THEN
  OUTPUT "Transaction approved"
ELSE
  OUTPUT "Transaction rejected"
ENDIF`,
        diagram: {
          path: '/igcse/topic5/5.2 images/crypto currency transaction process.png',
          caption: 'Digital transaction and verification flow.'
        }
      },
      {
        code: '5.3',
        title: 'Cyber Security',
        overview: [
          'Cyber security protects systems and data from attack, misuse, and unauthorised access.',
          'Threats include malware, phishing, social engineering, brute force, and denial-of-service methods.',
          'Defences combine technical controls, authentication, updates, and user awareness.'
        ],
        applied: [
          'Link each threat to a suitable prevention or mitigation strategy.',
          'Explain why software updates and patching are critical to reducing known vulnerabilities.',
          'Use authentication-layer examples such as biometrics and two-step verification.'
        ],
        worked: {
          title: 'Worked phishing filter routine',
          explanation:
            'This routine applies simple checks to flag suspicious message characteristics before user interaction.'
        },
        pseudocode: `DECLARE HasSuspiciousLink : BOOLEAN
DECLARE HasUrgentTone : BOOLEAN
DECLARE HasSpellingErrors : BOOLEAN
INPUT HasSuspiciousLink
INPUT HasUrgentTone
INPUT HasSpellingErrors
IF HasSuspiciousLink OR HasUrgentTone OR HasSpellingErrors THEN
  OUTPUT "Flag as potential phishing"
ELSE
  OUTPUT "No immediate phishing indicators"
ENDIF`,
        diagram: {
          path: '/igcse/topic5/5.3 images/phishing vs pharming.png',
          caption: 'Phishing and pharming attack comparison.'
        }
      }
    ]
  },
  {
    topicNumber: 6,
    topicName: 'Automated and Emerging Technologies',
    sourceFiles: [
      'docs/content/igcse/chapter-text-files/Chapter 6 Subfiles/6.1.txt',
      'docs/content/igcse/chapter-text-files/Chapter 6 Subfiles/6.2.txt',
      'docs/content/igcse/chapter-text-files/Chapter 6 Subfiles/6.3.txt',
      'docs/content/igcse/chapter-text-files/Chapter 6 key words.txt'
    ],
    keyTerms: [
      ['Automated System', 'System that operates with minimal direct human intervention.'],
      ['Feedback Loop', 'Cycle where sensor input informs control decisions continuously.'],
      ['Actuator', 'Device that performs physical action from a control signal.'],
      ['Robotics', 'Design and use of programmable machines for task execution.'],
      ['Control Program', 'Software logic that governs automated or robotic behaviour.'],
      ['Artificial Intelligence', 'Methods that simulate intelligent behaviour in software systems.'],
      ['Expert System', 'AI system using a knowledge base and inference engine for decisions.'],
      ['Machine Learning', 'AI approach where models improve from data-based training.'],
      ['Training Data', 'Dataset used to build model behaviour.'],
      ['Inference Engine', 'Expert-system component applying rules to known facts.'],
      ['Sensor Fusion', 'Combining multiple sensor inputs for improved state estimation.'],
      ['Autonomy', 'Degree to which a system can operate without external control.']
    ],
    subtopics: [
      {
        code: '6.1',
        title: 'Automated Systems',
        overview: [
          'Automated systems combine sensors, processing logic, and actuators to control outcomes.',
          'Monitoring and control workflows differ by whether outputs only report status or actively change conditions.',
          'Reliability depends on calibration, thresholds, and safe fallback behaviour.'
        ],
        applied: [
          'Map real scenarios to sensor-input and actuator-output stages.',
          'Explain how microprocessor logic uses sensor values to trigger actions.',
          'Evaluate advantages and disadvantages such as precision, safety, and employment impact.'
        ],
        worked: {
          title: 'Worked greenhouse control loop',
          explanation:
            'This routine reads temperature and controls a cooling actuator when threshold values are exceeded.'
        },
        pseudocode: `DECLARE Temperature : REAL
DECLARE CoolingOn : BOOLEAN
INPUT Temperature
IF Temperature > 30.0 THEN
  CoolingOn <- TRUE
ELSE
  CoolingOn <- FALSE
ENDIF
OUTPUT "Cooling status = ", CoolingOn`,
        diagram: {
          path: '/igcse/topic6/6.1 images/6.1_automated_system_loop.png',
          caption: 'Automated control loop from sensor to actuator.'
        }
      },
      {
        code: '6.2',
        title: 'Robotics',
        overview: [
          'Robots integrate sensing, control logic, and actuation to perform repeated or hazardous tasks.',
          'Industrial, medical, and agricultural roles show different design constraints and autonomy levels.',
          'Robot benefits include precision and endurance, while risks include cost and workforce disruption.'
        ],
        applied: [
          'Describe robot characteristics in terms of sensors, program control, and repeatable output.',
          'Compare independent and dependent robot operation models.',
          'Evaluate social and economic implications with scenario-specific evidence.'
        ],
        worked: {
          title: 'Worked robot task scheduler',
          explanation:
            'This routine selects robot action based on sensor state from a production line.'
        },
        pseudocode: `DECLARE SensorState : STRING
INPUT SensorState
CASE OF SensorState
  "ItemDetected" : OUTPUT "Pick and place item"
  "FaultDetected" : OUTPUT "Stop and alert supervisor"
  OTHERWISE OUTPUT "Continue standby scan"
ENDCASE`,
        diagram: {
          path: '/igcse/topic6/6.2 images/6.2_robot_characteristics.png',
          caption: 'Common robot characteristics and control requirements.'
        }
      },
      {
        code: '6.3',
        title: 'Artificial Intelligence',
        overview: [
          'AI systems simulate intelligent behaviour through rule-based or data-driven methods.',
          'Expert systems use explicit rules; machine-learning systems infer patterns from data.',
          'System quality depends on data quality, model design, and output evaluation.'
        ],
        applied: [
          'Differentiate AI categories by how decisions are generated.',
          'Describe expert-system components: knowledge base, inference engine, and interface.',
          'Discuss strengths and limitations such as bias, explainability, and maintenance cost.'
        ],
        worked: {
          title: 'Worked expert-system rule chain',
          explanation:
            'This routine demonstrates simple rule-based recommendations using symptom checks.'
        },
        pseudocode: `DECLARE HasFever : BOOLEAN
DECLARE HasCough : BOOLEAN
INPUT HasFever
INPUT HasCough
IF HasFever AND HasCough THEN
  OUTPUT "Rule match: advise medical review"
ELSE
  OUTPUT "Rule match: monitor symptoms"
ENDIF`,
        diagram: {
          path: '/igcse/topic6/6.3 images/Expert System.png',
          caption: 'Expert-system architecture diagram.'
        }
      }
    ]
  },
  {
    topicNumber: 7,
    topicName: 'Algorithm Design and Problem-Solving',
    sourceFiles: [
      'docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/7.1.txt',
      'docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/7.2.txt',
      'docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/7.3.txt',
      'docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/7.4.txt',
      'docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/7.5.txt',
      'docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/7.6.txt',
      'docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/7.7.txt',
      'docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/7.8.txt',
      'docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/7.9.txt',
      'docs/content/igcse/chapter-text-files/Chapter 7 key words.txt'
    ],
    keyTerms: [
      ['Program Development Life Cycle', 'Structured stages from analysis to maintenance/testing review.'],
      ['Decomposition', 'Breaking a complex problem into manageable components.'],
      ['Flowchart', 'Diagrammatic algorithm representation using standard symbols.'],
      ['Pseudocode', 'Structured language-like algorithm description independent of implementation language.'],
      ['Validation', 'Checking whether input data is reasonable and within required rules.'],
      ['Verification', 'Checking copied/transferred data matches the original source.'],
      ['Boundary Test Data', 'Values at, just below, and just above limits.'],
      ['Normal Test Data', 'Typical values expected in routine operation.'],
      ['Abnormal Test Data', 'Invalid or unusual values used to test resilience.'],
      ['Trace Table', 'Stepwise record of variable changes and outputs through an algorithm.'],
      ['Linear Search', 'Sequential scan through data until target is found or list ends.'],
      ['Bubble Sort', 'Sorting method using repeated adjacent swaps until ordered.']
    ],
    subtopics: [
      {
        code: '7.1',
        title: 'Program Development Life Cycle',
        overview: [
          'Program development follows clear stages: analysis, design, coding, and testing.',
          'Each stage produces outputs used by the next stage, reducing ambiguity and rework.',
          'Computational thinking supports stronger requirements and design decisions early in the cycle.'
        ],
        applied: [
          'Use requirements statements that separate constraints, inputs, processing, and outputs.',
          'Show how design artifacts (flowcharts/pseudocode) reduce coding errors before implementation.',
          'Relate iterative testing to defect discovery and correction speed.'
        ],
        worked: {
          title: 'Worked life-cycle checkpoint routine',
          explanation:
            'This routine checks whether key development deliverables are complete before progression.'
        },
        pseudocode: `DECLARE AnalysisComplete : BOOLEAN
DECLARE DesignComplete : BOOLEAN
DECLARE CodingComplete : BOOLEAN
INPUT AnalysisComplete
INPUT DesignComplete
INPUT CodingComplete
IF AnalysisComplete AND DesignComplete AND CodingComplete THEN
  OUTPUT "Proceed to formal testing"
ELSE
  OUTPUT "Complete missing life-cycle stage"
ENDIF`
      },
      {
        code: '7.2',
        title: 'Computer Systems & Subsystems',
        overview: [
          'Systems can be decomposed into subsystems and component parts with clear responsibilities.',
          'Inputs, processes, storage, and outputs should be identified for each subsystem.',
          'Structured decomposition supports modular design and clearer test planning.'
        ],
        applied: [
          'Represent subsystem boundaries and data flow explicitly in diagrams and pseudocode.',
          'Explain how decomposition enables parallel team development.',
          'Keep subsystem interfaces clear to reduce integration errors.'
        ],
        worked: {
          title: 'Worked subsystem selector',
          explanation:
            'This routine routes requests to a chosen subsystem based on operation type.'
        },
        pseudocode: `DECLARE RequestArea : STRING
INPUT RequestArea
CASE OF RequestArea
  "Input" : OUTPUT "Route to capture subsystem"
  "Storage" : OUTPUT "Route to data subsystem"
  "Output" : OUTPUT "Route to presentation subsystem"
  OTHERWISE OUTPUT "Route to control subsystem"
ENDCASE`
      },
      {
        code: '7.3',
        title: 'Decomposition & Algorithms',
        overview: [
          'An algorithm is an ordered finite set of steps that solves a defined problem.',
          'Decomposition helps transform broad tasks into algorithmic blocks that can be traced and tested.',
          'Algorithms should be unambiguous and deterministic for the same input conditions.'
        ],
        applied: [
          'Describe how sub-problems map to sub-algorithms.',
          'Use clear condition checks and loop boundaries to prevent infinite loops.',
          'Prefer explicit variable naming so trace tables remain readable.'
        ],
        worked: {
          title: 'Worked decomposition to algorithm flow',
          explanation:
            'This routine counts positive values from a fixed-size list as a decomposed processing stage.'
        },
        pseudocode: `DECLARE Index : INTEGER
DECLARE Value : INTEGER
DECLARE PositiveCount : INTEGER
PositiveCount <- 0
FOR Index <- 1 TO 5
  INPUT Value
  IF Value > 0 THEN
    PositiveCount <- PositiveCount + 1
  ENDIF
NEXT Index
OUTPUT "Positive values = ", PositiveCount`
      },
      {
        code: '7.4',
        title: 'Methods of Solution',
        overview: [
          'Standard methods such as totalling, counting, and finding min/max/average are core exam patterns.',
          'These methods rely on consistent initialisation and controlled iteration.',
          'Search and sort methods require clear stop conditions and state updates.'
        ],
        applied: [
          'Set accumulator and counter start values correctly before loops.',
          'Update max/min values only when condition checks are satisfied.',
          'Use linear-search stop rules to avoid unnecessary comparisons.'
        ],
        worked: {
          title: 'Worked average calculation pattern',
          explanation:
            'This routine applies total and count variables to compute an average after loop completion.'
        },
        pseudocode: `DECLARE Total : REAL
DECLARE Count : INTEGER
DECLARE Number : REAL
DECLARE Average : REAL
Total <- 0.0
Count <- 0
FOR Count <- 1 TO 4
  INPUT Number
  Total <- Total + Number
NEXT Count
Average <- Total / 4.0
OUTPUT "Average = ", Average`
      },
      {
        code: '7.5',
        title: 'Standard Methods of Solution',
        overview: [
          'Standard methods should be transferable between pseudocode and program code.',
          'Exam questions often require adapting a known method to a new context.',
          'Robust solution methods include input checks and clear output formatting.'
        ],
        applied: [
          'Adapt linear search and bubble sort templates to custom field names.',
          'Use clear loop structure for repeatable, testable logic.',
          'State assumptions such as sorted/unsorted data explicitly.'
        ],
        worked: {
          title: 'Worked linear-search template',
          explanation:
            'This routine performs a linear search and returns the first matching index.'
        },
        pseudocode: `DECLARE Index : INTEGER
DECLARE Target : INTEGER
DECLARE Item : INTEGER
DECLARE Found : BOOLEAN
Found <- FALSE
INPUT Target
FOR Index <- 1 TO 5
  INPUT Item
  IF Item = Target THEN
    OUTPUT "Found at position ", Index
    Found <- TRUE
  ENDIF
NEXT Index
IF NOT Found THEN
  OUTPUT "Target not found"
ENDIF`
      },
      {
        code: '7.6',
        title: 'Validation & Verification',
        overview: [
          'Validation checks whether data is sensible before processing.',
          'Verification checks copied/transferred data matches the source.',
          'Using both reduces data-quality failures in system workflows.'
        ],
        applied: [
          'Match check type to field: range, length, format, and lookup checks.',
          'Describe double entry and visual checks for verification contexts.',
          'Explain why verification does not guarantee data is meaningful.'
        ],
        worked: {
          title: 'Worked input validation loop',
          explanation:
            'This routine repeats input until value satisfies required range constraints.'
        },
        pseudocode: `DECLARE Mark : INTEGER
REPEAT
  INPUT Mark
  IF Mark < 0 OR Mark > 100 THEN
    OUTPUT "Invalid mark"
  ENDIF
UNTIL Mark >= 0 AND Mark <= 100
OUTPUT "Accepted mark = ", Mark`
      },
      {
        code: '7.7',
        title: 'Testing',
        overview: [
          'Testing checks algorithm correctness using carefully selected test data.',
          'Different test-data classes reveal different defect types.',
          'Expected results must be set before execution for objective evaluation.'
        ],
        applied: [
          'Provide normal, abnormal, and boundary cases for each required input.',
          'Record expected and actual results in structured test tables.',
          'Use failures to refine either algorithm logic or validation rules.'
        ],
        worked: {
          title: 'Worked test-data classifier',
          explanation:
            'This routine labels each test input category based on a numeric boundary rule.'
        },
        pseudocode: `DECLARE Value : INTEGER
INPUT Value
IF Value < 0 OR Value > 100 THEN
  OUTPUT "Abnormal"
ELSE
  IF Value = 0 OR Value = 100 THEN
    OUTPUT "Boundary"
  ELSE
    OUTPUT "Normal"
  ENDIF
ENDIF`
      },
      {
        code: '7.8',
        title: 'Trace Tables',
        overview: [
          'Trace tables show variable and output changes line by line during algorithm execution.',
          'They provide evidence for correctness and help isolate logic errors.',
          'Strong trace tables include all relevant variables and condition outcomes.'
        ],
        applied: [
          'Write one row per meaningful state change.',
          'Carry unchanged values forward to keep full state visible.',
          'Include output and condition columns for branch-heavy logic.'
        ],
        worked: {
          title: 'Worked trace-ready loop',
          explanation:
            'This routine is intentionally small so each iteration can be traced fully in a table.'
        },
        pseudocode: `DECLARE Counter : INTEGER
DECLARE Total : INTEGER
Total <- 0
FOR Counter <- 1 TO 3
  Total <- Total + Counter
  OUTPUT Total
NEXT Counter`
      },
      {
        code: '7.9',
        title: 'Identifying Errors',
        overview: [
          'Error identification includes syntax, logic, and runtime failures.',
          'Correction requires evidence from test outcomes and trace-table state changes.',
          'Algorithm amendments should preserve clarity while fixing defect causes.'
        ],
        applied: [
          'Check loop-control variables carefully to avoid infinite loops and missed updates.',
          'Check arithmetic operator intent to avoid accidental multiplication/division errors.',
          'Validate conditional logic with boundary-focused test cases.'
        ],
        worked: {
          title: 'Worked algorithm amendment check',
          explanation:
            'This routine demonstrates replacing a faulty operator and verifying corrected output.'
        },
        pseudocode: `DECLARE Number : INTEGER
DECLARE Total : INTEGER
Total <- 0
FOR Number <- 1 TO 5
  Total <- Total + Number
NEXT Number
OUTPUT "Correct total = ", Total`
      }
    ]
  },
  {
    topicNumber: 8,
    topicName: 'Programming',
    sourceFiles: [
      'docs/content/igcse/chapter-text-files/Chapter 8 Subfiles/8.1.txt',
      'docs/content/igcse/chapter-text-files/Chapter 8 Subfiles/8.2.txt',
      'docs/content/igcse/chapter-text-files/Chapter 8 Subfiles/8.3.txt',
      'docs/content/igcse/chapter-text-files/Chapter 8 key words.txt'
    ],
    keyTerms: [
      ['Variable', 'Named memory location whose value can change during execution.'],
      ['Constant', 'Named value that should not change during execution.'],
      ['Data Type', 'Classification of data determining valid operations and storage form.'],
      ['Sequence', 'Program statements executed in order.'],
      ['Selection', 'Branching based on condition evaluation.'],
      ['Iteration', 'Repetition of statements while a condition or count rule is satisfied.'],
      ['Procedure', 'Named block of code performing a task without returning a value directly.'],
      ['Function', 'Named block of code returning a value.'],
      ['Parameter', 'Value passed into a procedure or function.'],
      ['Array', 'Indexed data structure storing multiple values of the same type.'],
      ['File Handling', 'Reading from and writing to persistent file storage.'],
      ['Maintainable Code', 'Code that is readable, testable, and easy to modify safely.']
    ],
    subtopics: [
      {
        code: '8.1',
        title: 'Programming Concepts',
        overview: [
          'Programming concepts include variables, constants, data types, and control structures.',
          'Correct use of sequence, selection, and iteration forms the backbone of reliable logic.',
          'Readable naming and clear structure improve maintainability and debugging speed.'
        ],
        applied: [
          'Use explicit data-type reasoning when combining numeric and string operations.',
          'Apply nested selection and loop structures carefully with explicit end statements.',
          'Use procedures and functions to avoid repeated logic blocks.'
        ],
        worked: {
          title: 'Worked maintainable input-output routine',
          explanation:
            'This routine uses clear identifiers and control flow to process and classify a score.'
        },
        pseudocode: `DECLARE Score : INTEGER
DECLARE Grade : STRING
INPUT Score
IF Score >= 80 THEN
  Grade <- "Distinction"
ELSE
  IF Score >= 50 THEN
    Grade <- "Pass"
  ELSE
    Grade <- "Fail"
  ENDIF
ENDIF
OUTPUT "Grade = ", Grade`
      },
      {
        code: '8.2',
        title: 'Arrays',
        overview: [
          'Arrays store multiple values of one data type using index positions.',
          'One-dimensional and two-dimensional arrays support list and table data models.',
          'Iteration is used to populate, search, and process array contents efficiently.'
        ],
        applied: [
          'Declare index bounds explicitly so first element position is unambiguous.',
          'Use nested loops for two-dimensional array traversal.',
          'Prevent out-of-range access by validating index values.'
        ],
        worked: {
          title: 'Worked array population and search',
          explanation:
            'This routine fills an array and then performs a linear search for a target value.'
        },
        pseudocode: `DECLARE Values : ARRAY[1:5] OF INTEGER
DECLARE Index : INTEGER
DECLARE Target : INTEGER
FOR Index <- 1 TO 5
  INPUT Values[Index]
NEXT Index
INPUT Target
FOR Index <- 1 TO 5
  IF Values[Index] = Target THEN
    OUTPUT "Found at index ", Index
  ENDIF
NEXT Index`
      },
      {
        code: '8.3',
        title: 'File Handling',
        overview: [
          'Files allow data persistence beyond program runtime.',
          'Read/write workflows require explicit opening mode and proper closing after use.',
          'Structured file operations improve data integrity and traceability.'
        ],
        applied: [
          'Open files in correct mode before read/write operations.',
          'Handle data line by line using clear variable assignment.',
          'Close files as soon as operations are complete to avoid corruption risk.'
        ],
        worked: {
          title: 'Worked file copy routine',
          explanation:
            'This routine reads one value and writes it to a second file using explicit open and close commands.'
        },
        pseudocode: `DECLARE LineText : STRING
OPENFILE "Input.txt" FOR READ
OPENFILE "Output.txt" FOR WRITE
READFILE "Input.txt", LineText
WRITEFILE "Output.txt", LineText
CLOSEFILE "Input.txt"
CLOSEFILE "Output.txt"
OUTPUT "Copy complete"`
      }
    ]
  },
  {
    topicNumber: 9,
    topicName: 'Databases',
    sourceFiles: [
      'docs/content/igcse/chapter-text-files/chapter 9 Subfiles/9.1.txt',
      'docs/content/igcse/chapter-text-files/chapter 9.txt',
      'docs/content/igcse/chapter-text-files/Chapter 9 key words.txt',
      'src/static/igcse/topic9/9.2_sql.html',
      'src/static/igcse/topic9/9.3_building_databases.html'
    ],
    keyTerms: [
      ['Database', 'Structured collection of related data for retrieval and update.'],
      ['Table', 'Collection of records arranged in rows and columns.'],
      ['Record', 'A complete row describing one entity instance.'],
      ['Field', 'A column representing one attribute in each record.'],
      ['Primary Key', 'Field used to uniquely identify each record.'],
      ['Data Type', 'Constraint defining allowed values in a field.'],
      ['SQL', 'Structured Query Language used for database operations.'],
      ['SELECT', 'SQL command to retrieve data.'],
      ['WHERE', 'SQL clause to filter records by conditions.'],
      ['ORDER BY', 'SQL clause to sort query output.'],
      ['COUNT', 'SQL aggregate function for counting matching records.'],
      ['Validation Rule', 'Constraint used to reject invalid field input.']
    ],
    notes: [
      'Topic 9 website labels include 9.2 and 9.3 even though chapter text is mainly grouped as 9.1 in source extracts.',
      'Coverage for 9.2 and 9.3 uses chapter content plus existing site SQL/building-database artifacts under source policy.'
    ],
    subtopics: [
      {
        code: '9.1',
        title: 'Databases',
        overview: [
          'Databases structure data into fields and records for efficient retrieval.',
          'Single-table database understanding is central at IGCSE level.',
          'Primary keys and data types improve integrity and avoid ambiguous records.'
        ],
        applied: [
          'Choose suitable field data types for realistic entity data.',
          'Identify a field that is unique and stable for primary-key usage.',
          'Explain why duplicated records create consistency issues.'
        ],
        worked: {
          title: 'Worked table design check',
          explanation:
            'This routine validates whether a candidate primary key value already exists before insertion.'
        },
        pseudocode: `DECLARE ExistingId : INTEGER
DECLARE NewId : INTEGER
DECLARE IsDuplicate : BOOLEAN
INPUT ExistingId
INPUT NewId
IF ExistingId = NewId THEN
  IsDuplicate <- TRUE
ELSE
  IsDuplicate <- FALSE
ENDIF
OUTPUT "Primary key duplicate = ", IsDuplicate`
      },
      {
        code: '9.2',
        title: 'SQL',
        overview: [
          'SQL retrieves and manipulates table data using precise command syntax.',
          'Core operations include selecting fields, filtering records, sorting output, and counting rows.',
          'Query clarity depends on correct clause order and condition logic.'
        ],
        applied: [
          'Use SELECT-FROM-WHERE-ORDER BY structure correctly for exam-style tasks.',
          'Combine AND/OR conditions with parentheses where precedence matters.',
          'Interpret query output from given dataset snapshots.'
        ],
        worked: {
          title: 'Worked SQL query builder',
          explanation:
            'This routine outputs a simple query string from supplied condition fragments.'
        },
        pseudocode: `DECLARE FieldName : STRING
DECLARE TableName : STRING
DECLARE ConditionText : STRING
INPUT FieldName
INPUT TableName
INPUT ConditionText
OUTPUT "SELECT ", FieldName, " FROM ", TableName, " WHERE ", ConditionText`
      },
      {
        code: '9.3',
        title: 'Building Databases',
        overview: [
          'Building databases requires schema planning, validation rules, and test data insertion.',
          'Design should support intended query needs while keeping structure simple and accurate.',
          'Input forms and validation improve data quality from first capture.'
        ],
        applied: [
          'Define field names, data types, and key constraints before population.',
          'Apply validation checks such as range, length, and lookup constraints.',
          'Test forms and queries with normal and boundary values before release.'
        ],
        worked: {
          title: 'Worked validation-rule assignment',
          explanation:
            'This routine checks field length before accepting a value into a database workflow.'
        },
        pseudocode: `DECLARE Username : STRING
DECLARE IsValidLength : BOOLEAN
INPUT Username
IF LENGTH(Username) >= 5 AND LENGTH(Username) <= 12 THEN
  IsValidLength <- TRUE
ELSE
  IsValidLength <- FALSE
ENDIF
OUTPUT "Length valid = ", IsValidLength`
      }
    ]
  },
  {
    topicNumber: 10,
    topicName: 'Boolean Logic',
    sourceFiles: [
      'docs/content/igcse/chapter-text-files/Chapter 10 Subfiles/10.1.txt',
      'docs/content/igcse/chapter-text-files/Chapter 10 Subfiles/10.2.txt',
      'docs/content/igcse/chapter-text-files/Chapter 10 Subfiles/10.3.txt',
      'docs/content/igcse/chapter-text-files/Chapter 10 key words.txt'
    ],
    keyTerms: [
      ['Logic Gate', 'Digital component implementing a Boolean operation.'],
      ['NOT Gate', 'Gate that inverts a single binary input.'],
      ['AND Gate', 'Gate producing 1 only when all inputs are 1.'],
      ['OR Gate', 'Gate producing 1 when at least one input is 1.'],
      ['NAND Gate', 'NOT applied to AND output.'],
      ['NOR Gate', 'NOT applied to OR output.'],
      ['XOR Gate', 'Gate producing 1 when inputs are different.'],
      ['Truth Table', 'Table listing all input combinations and resulting outputs.'],
      ['Logic Expression', 'Symbolic representation of gate behaviour.'],
      ['Circuit', 'Combined set of gates implementing a complete logic function.'],
      ['Binary Input', 'Input signal represented as 0 or 1.'],
      ['Boolean Algebra', 'Mathematical framework for logical operations.']
    ],
    subtopics: [
      {
        code: '10.1',
        title: 'Logic Gates',
        overview: [
          'Logic gates transform binary inputs into binary outputs based on defined Boolean rules.',
          'You must identify symbols and functions for NOT, AND, OR, NAND, NOR, and XOR gates.',
          'Single-gate truth tables provide the foundation for larger circuit analysis.'
        ],
        applied: [
          'Associate each gate symbol with its output rule immediately.',
          'Remember NOT is single-input while the others at this level use two inputs.',
          'Check gate output using all input combinations before concluding behaviour.'
        ],
        worked: {
          title: 'Worked gate output evaluator',
          explanation:
            'This routine evaluates a simple AND gate for two binary inputs.'
        },
        pseudocode: `DECLARE A : INTEGER
DECLARE B : INTEGER
DECLARE OutputBit : INTEGER
INPUT A
INPUT B
IF A = 1 AND B = 1 THEN
  OutputBit <- 1
ELSE
  OutputBit <- 0
ENDIF
OUTPUT "AND output = ", OutputBit`
      },
      {
        code: '10.2',
        title: 'Logic Circuits',
        overview: [
          'Logic circuits combine gates to perform larger decision functions.',
          'Circuit behaviour can be represented by diagrams or equivalent expressions.',
          'Evaluation requires tracing intermediate outputs through each stage in sequence.'
        ],
        applied: [
          'Trace stage-by-stage outputs before deciding final circuit output.',
          'Translate between diagram form and expression form accurately.',
          'Use bracketed expressions to preserve operation order.'
        ],
        worked: {
          title: 'Worked two-stage circuit trace',
          explanation:
            'This routine computes an intermediate OR result, then combines it with NOT logic.'
        },
        pseudocode: `DECLARE A : INTEGER
DECLARE B : INTEGER
DECLARE C : INTEGER
DECLARE Stage1 : INTEGER
DECLARE Stage2 : INTEGER
INPUT A
INPUT B
INPUT C
IF A = 1 OR B = 1 THEN
  Stage1 <- 1
ELSE
  Stage1 <- 0
ENDIF
IF C = 0 THEN
  Stage2 <- 1
ELSE
  Stage2 <- 0
ENDIF
IF Stage1 = 1 AND Stage2 = 1 THEN
  OUTPUT "Circuit output = 1"
ELSE
  OUTPUT "Circuit output = 0"
ENDIF`
      },
      {
        code: '10.3',
        title: 'Truth Tables',
        overview: [
          'Truth tables enumerate all possible binary input combinations and their outputs.',
          'Input count determines row count: 2^n combinations for n inputs.',
          'Circuit and expression equivalence can be checked by comparing full truth tables.'
        ],
        applied: [
          'Generate row counts correctly for 2-input, 3-input, and 4-input tables.',
          'Compute intermediate columns to avoid final-column mistakes.',
          'Check expression-derived outputs against circuit-derived outputs for consistency.'
        ],
        worked: {
          title: 'Worked truth-table completion routine',
          explanation:
            'This routine outputs all combinations for two inputs and calculates XOR result.'
        },
        pseudocode: `DECLARE A : INTEGER
DECLARE B : INTEGER
DECLARE XorOut : INTEGER
FOR A <- 0 TO 1
  FOR B <- 0 TO 1
    IF A <> B THEN
      XorOut <- 1
    ELSE
      XorOut <- 0
    ENDIF
    OUTPUT A, B, XorOut
  NEXT B
NEXT A`
      }
    ]
  }
];

export const topicByNumber = new Map(TOPIC_MAP.map((topic) => [topic.topicNumber, topic]));

export const topicBySlug = new Map(TOPIC_MAP.map((topic) => [`topic${topic.topicNumber}`, topic]));

export const normalizePseudocodeAssignments = (value) => String(value || '').replace(/¨|<-/g, '←');
