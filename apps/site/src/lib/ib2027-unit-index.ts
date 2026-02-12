import type { UnitCard, UnitPlanFrontmatter } from '@sgs/content-schema';

export type SpecSource = 'IB CS 2027 SL Core' | 'IB CS 2027 HL Extension' | 'SGS Curriculum Mapping';

export interface SyllabusRow {
  code: string;
  topic: string;
  expectedOutcome: string;
  source: SpecSource;
}

interface SpecLookupEntry {
  topic: string;
  expectedOutcome: string;
  source: SpecSource;
}

const IB_SPEC_LOOKUP: Record<string, SpecLookupEntry> = {
  'A1.1.1': {
    topic: 'CPU components (ALU, CU, registers, buses)',
    expectedOutcome: 'Describe functions and interactions of CPU components.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.1.2': {
    topic: 'GPU (Graphics Processing Unit)',
    expectedOutcome: 'Describe the role of a GPU.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.1.4': {
    topic: 'Primary memory (RAM, ROM, Cache, Registers)',
    expectedOutcome: 'Explain the purposes of different primary memory types.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.1.5': {
    topic: 'Machine instruction cycle',
    expectedOutcome: 'Describe the fetch, decode, and execute cycle.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.1.7': {
    topic: 'Secondary storage (Internal/External)',
    expectedOutcome: 'Describe internal and external types of secondary storage.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.1.8': {
    topic: 'Compression',
    expectedOutcome: 'Describe the concept of compression.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.1.9': {
    topic: 'Cloud computing services',
    expectedOutcome: 'Describe different types of cloud services (SaaS, PaaS, IaaS).',
    source: 'IB CS 2027 SL Core'
  },
  'A1.2.1': {
    topic: 'Data representation methods',
    expectedOutcome: 'Describe principal methods (binary, hex, decimal) of representing data.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.2.2': {
    topic: 'Binary data storage',
    expectedOutcome: 'Explain how binary is used to store data (text, media, etc.).',
    source: 'IB CS 2027 SL Core'
  },
  'A1.2.3': {
    topic: 'Logic gates',
    expectedOutcome: 'Describe purpose and use of logic gates.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.2.4': {
    topic: 'Truth tables',
    expectedOutcome: 'Construct and analyse truth tables.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.2.5': {
    topic: 'Logic diagrams',
    expectedOutcome: 'Construct logic diagrams.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.3.1': {
    topic: 'Operating Systems (OS) role',
    expectedOutcome: 'Describe the role of operating systems.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.3.2': {
    topic: 'OS functions',
    expectedOutcome: 'Describe the functions of an operating system.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.3.3': {
    topic: 'Scheduling',
    expectedOutcome: 'Compare different approaches to scheduling.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.3.4': {
    topic: 'Polling vs. Interrupts',
    expectedOutcome: 'Evaluate the use of polling and interrupt handling.',
    source: 'IB CS 2027 SL Core'
  },
  'A2.1.1': {
    topic: 'Network purpose & characteristics',
    expectedOutcome: 'Describe the purpose and characteristics of networks.',
    source: 'IB CS 2027 SL Core'
  },
  'A2.1.2': {
    topic: 'Digital infrastructures',
    expectedOutcome: 'Describe purpose, benefits, and limitations of modern digital infrastructures.',
    source: 'IB CS 2027 SL Core'
  },
  'A2.1.3': {
    topic: 'Network devices',
    expectedOutcome: 'Describe the function of network devices.',
    source: 'IB CS 2027 SL Core'
  },
  'A2.1.4': {
    topic: 'Transport & App protocols',
    expectedOutcome: 'Describe network protocols used for transport and application.',
    source: 'IB CS 2027 SL Core'
  },
  'A2.2.1': {
    topic: 'Network topologies',
    expectedOutcome: 'Describe functions and practical applications of topologies.',
    source: 'IB CS 2027 SL Core'
  },
  'A2.2.3': {
    topic: 'Networking models',
    expectedOutcome: 'Compare and contrast networking models (Client-Server, P2P).',
    source: 'IB CS 2027 SL Core'
  },
  'A2.2.4': {
    topic: 'Network segmentation',
    expectedOutcome: 'Explain concepts and applications of segmentation (VLANs).',
    source: 'IB CS 2027 SL Core'
  },
  'A2.3.1': {
    topic: 'IP addressing',
    expectedOutcome: 'Describe different types of IP addressing (IPv4/v6, Static/Dynamic).',
    source: 'IB CS 2027 SL Core'
  },
  'A2.3.2': {
    topic: 'Transmission media',
    expectedOutcome: 'Compare types of media for data transmission (Wired/Wireless).',
    source: 'IB CS 2027 SL Core'
  },
  'A2.3.3': {
    topic: 'Packet switching',
    expectedOutcome: 'Explain how packet switching is used to send data.',
    source: 'IB CS 2027 SL Core'
  },
  'A2.4.1': {
    topic: 'Firewalls',
    expectedOutcome: 'Discuss the effectiveness of firewalls.',
    source: 'IB CS 2027 SL Core'
  },
  'A2.4.4': {
    topic: 'Encryption & Digital Certificates',
    expectedOutcome: 'Describe the process of encryption and digital certificates.',
    source: 'IB CS 2027 SL Core'
  },
  'A3.1.1': {
    topic: 'Relational databases',
    expectedOutcome: 'Explain features, benefits, and limitations of relational databases.',
    source: 'IB CS 2027 SL Core'
  },
  'A3.2.1': {
    topic: 'Database schemas',
    expectedOutcome: 'Describe database schemas.',
    source: 'IB CS 2027 SL Core'
  },
  'A3.2.2': {
    topic: 'ERDs (Entity Relationship Diagrams)',
    expectedOutcome: 'Construct ERDs.',
    source: 'IB CS 2027 SL Core'
  },
  'A3.2.3': {
    topic: 'Data types',
    expectedOutcome: 'Outline different data types in relational databases.',
    source: 'IB CS 2027 SL Core'
  },
  'A3.2.4': {
    topic: 'Tables',
    expectedOutcome: 'Construct tables for relational databases.',
    source: 'IB CS 2027 SL Core'
  },
  'A3.2.5': {
    topic: 'Normal forms',
    expectedOutcome: 'Explain the difference between normal forms (1NF, 2NF, 3NF).',
    source: 'IB CS 2027 SL Core'
  },
  'A3.2.6': {
    topic: 'Normalization (3NF)',
    expectedOutcome: 'Construct a database normalized to 3NF for real scenarios.',
    source: 'IB CS 2027 SL Core'
  },
  'A3.2.7': {
    topic: 'Denormalization',
    expectedOutcome: 'Evaluate the need for denormalizing databases.',
    source: 'IB CS 2027 SL Core'
  },
  'A3.3.1': {
    topic: 'SQL languages (DDL/DML)',
    expectedOutcome: 'Outline differences between data language types in SQL.',
    source: 'IB CS 2027 SL Core'
  },
  'A3.3.2': {
    topic: 'SQL Queries',
    expectedOutcome: 'Construct queries between two tables in SQL.',
    source: 'IB CS 2027 SL Core'
  },
  'A3.3.3': {
    topic: 'SQL Updates',
    expectedOutcome: 'Explain how SQL is used to update data.',
    source: 'IB CS 2027 SL Core'
  },
  'A4.1.1': {
    topic: 'ML types & applications',
    expectedOutcome: 'Describe types of machine learning and real-world applications.',
    source: 'IB CS 2027 SL Core'
  },
  'A4.1.2': {
    topic: 'ML hardware requirements',
    expectedOutcome: 'Describe hardware requirements for ML scenarios.',
    source: 'IB CS 2027 SL Core'
  },
  'A4.4.1': {
    topic: 'Ethical implications of ML',
    expectedOutcome: 'Discuss ethical implications of ML in real-world scenarios.',
    source: 'IB CS 2027 SL Core'
  },
  'A4.4.2': {
    topic: 'Ethics of tech integration',
    expectedOutcome: 'Discuss ethical aspects of increasing tech integration in daily life.',
    source: 'IB CS 2027 SL Core'
  },
  'B1.1.1': {
    topic: 'Problem specification',
    expectedOutcome: 'Construct a problem specification.',
    source: 'IB CS 2027 SL Core'
  },
  'B1.1.2': {
    topic: 'Computational thinking concepts',
    expectedOutcome: 'Describe fundamental concepts (Abstraction, Decomposition, etc.).',
    source: 'IB CS 2027 SL Core'
  },
  'B1.1.3': {
    topic: 'Problem solving',
    expectedOutcome: 'Explain how computational thinking is used to solve CS problems.',
    source: 'IB CS 2027 SL Core'
  },
  'B1.1.4': {
    topic: 'Flowcharts',
    expectedOutcome: 'Trace flowcharts for programming algorithms.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.1.1': {
    topic: 'Variables (Global/Local)',
    expectedOutcome: 'Construct and trace programs using global/local variables.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.1.2': {
    topic: 'Substrings',
    expectedOutcome: 'Construct programs that extract and manipulate substrings.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.1.3': {
    topic: 'Exception handling',
    expectedOutcome: 'Describe how programs use exception handling techniques.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.1.4': {
    topic: 'Debugging',
    expectedOutcome: 'Construct and use common debugging techniques.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.2.1': {
    topic: 'Static vs Dynamic data structures',
    expectedOutcome: 'Compare static and dynamic data structures.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.2.2': {
    topic: 'Arrays and Lists',
    expectedOutcome: 'Construct programs that apply arrays and Lists.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.2.3': {
    topic: 'Stacks (LIFO)',
    expectedOutcome: 'Explain the concept of a stack.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.2.4': {
    topic: 'Queues (FIFO)',
    expectedOutcome: 'Explain the concept of a queue.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.3.1': {
    topic: 'Sequence constructs',
    expectedOutcome: 'Construct programs implementing correct instruction sequences.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.3.2': {
    topic: 'Selection constructs',
    expectedOutcome: 'Construct programs utilizing selection structures (if/else).',
    source: 'IB CS 2027 SL Core'
  },
  'B2.3.3': {
    topic: 'Looping constructs',
    expectedOutcome: 'Construct programs utilizing looping structures.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.3.4': {
    topic: 'Functions & Modularization',
    expectedOutcome: 'Construct functions and modularization.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.4.1': {
    topic: 'Algorithm efficiency (Big O)',
    expectedOutcome: 'Describe efficiency of algorithms by calculating Big O.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.4.2': {
    topic: 'Linear & Binary Search',
    expectedOutcome: 'Construct and trace linear and binary search algorithms.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.4.3': {
    topic: 'Bubble & Selection Sort',
    expectedOutcome: 'Construct and trace bubble and selection sort algorithms.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.5.1': {
    topic: 'File processing',
    expectedOutcome: 'Construct code to perform file-processing operations.',
    source: 'IB CS 2027 SL Core'
  },
  'B2.5': {
    topic: 'File processing',
    expectedOutcome: 'Construct code to perform file-processing operations.',
    source: 'IB CS 2027 SL Core'
  },
  'B3.1.1': {
    topic: 'OOP Fundamentals',
    expectedOutcome: 'Evaluate the fundamentals of OOP.',
    source: 'IB CS 2027 SL Core'
  },
  'B3.1.2': {
    topic: 'Class design',
    expectedOutcome: 'Construct a design of classes, methods, and behaviour.',
    source: 'IB CS 2027 SL Core'
  },
  'B3.1.3': {
    topic: 'Static vs Non-static',
    expectedOutcome: 'Distinguish between static and non-static variables/methods.',
    source: 'IB CS 2027 SL Core'
  },
  'B3.1.4': {
    topic: 'Class definition & Instantiation',
    expectedOutcome: 'Construct code to define classes and instantiate objects.',
    source: 'IB CS 2027 SL Core'
  },
  'B3.1.5': {
    topic: 'Encapsulation',
    expectedOutcome: 'Explain and apply encapsulation and information hiding.',
    source: 'IB CS 2027 SL Core'
  },
  'A1.1.3': {
    topic: 'CPU vs GPU',
    expectedOutcome: 'Explain differences between CPU and GPU.',
    source: 'IB CS 2027 HL Extension'
  },
  'A1.1.6': {
    topic: 'Pipelining',
    expectedOutcome: 'Describe pipelining in multi-core architectures.',
    source: 'IB CS 2027 HL Extension'
  },
  'A1.3.5': {
    topic: 'Multitasking & Resources',
    expectedOutcome: 'Explain OS role in managing multitasking and resource allocation.',
    source: 'IB CS 2027 HL Extension'
  },
  'A1.3.6': {
    topic: 'Control System components',
    expectedOutcome: 'Describe the use of control system components.',
    source: 'IB CS 2027 HL Extension'
  },
  'A1.3.7': {
    topic: 'Control Systems applications',
    expectedOutcome: 'Explain use of control systems in real-world applications.',
    source: 'IB CS 2027 HL Extension'
  },
  'A1.4.1': {
    topic: 'Translation (Compilers/Interpreters)',
    expectedOutcome: 'Evaluate translation processes of interpreters and compilers.',
    source: 'IB CS 2027 HL Extension'
  },
  'A1.4.2': {
    topic: 'Advanced translation (JIT, bytecode, virtual machines)',
    expectedOutcome: 'Explain how JIT, bytecode interpreters, and virtual machines support cross-platform software.',
    source: 'SGS Curriculum Mapping'
  },
  'A2.1.5': {
    topic: 'TCP/IP Model',
    expectedOutcome: 'Describe the function of the TCP/IP model.',
    source: 'IB CS 2027 HL Extension'
  },
  'A2.2.2': {
    topic: 'Servers',
    expectedOutcome: 'Describe the function of servers.',
    source: 'IB CS 2027 HL Extension'
  },
  'A2.3.4': {
    topic: 'Routing (Static/Dynamic)',
    expectedOutcome: 'Explain how static and dynamic routing move data across LANs.',
    source: 'IB CS 2027 HL Extension'
  },
  'A2.4.2': {
    topic: 'Network vulnerabilities',
    expectedOutcome: 'Describe common network vulnerabilities.',
    source: 'IB CS 2027 HL Extension'
  },
  'A2.4.3': {
    topic: 'Network countermeasures',
    expectedOutcome: 'Describe common network countermeasures.',
    source: 'IB CS 2027 HL Extension'
  },
  'A3.3.4': {
    topic: 'SQL Aggregate functions',
    expectedOutcome: "Construct calculations using SQL's aggregate functions.",
    source: 'IB CS 2027 HL Extension'
  },
  'A3.3.5': {
    topic: 'Database Views',
    expectedOutcome: 'Describe different database views.',
    source: 'IB CS 2027 HL Extension'
  },
  'A3.3.6': {
    topic: 'Transactions (ACID)',
    expectedOutcome: 'Describe how transactions maintain data integrity.',
    source: 'IB CS 2027 HL Extension'
  },
  'A3.4.1': {
    topic: 'Alternative databases',
    expectedOutcome: 'Outline different types of databases (NoSQL, etc.).',
    source: 'IB CS 2027 HL Extension'
  },
  'A3.4.2': {
    topic: 'Data warehouses',
    expectedOutcome: 'Explain primary objectives of data warehouses.',
    source: 'IB CS 2027 HL Extension'
  },
  'A3.4.3': {
    topic: 'OLAP & Data Mining',
    expectedOutcome: 'Explain role of OLAP and data mining for business intelligence.',
    source: 'IB CS 2027 HL Extension'
  },
  'A3.4.4': {
    topic: 'Distributed databases',
    expectedOutcome: 'Describe features of distributed databases.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.2.1': {
    topic: 'Data Cleaning',
    expectedOutcome: 'Describe the significance of data cleaning.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.2.2': {
    topic: 'Feature Selection',
    expectedOutcome: 'Describe the role of feature selection.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.2.3': {
    topic: 'Dimensionality Reduction',
    expectedOutcome: 'Describe the importance of dimensionality reduction.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.2.4': {
    topic: 'Scaling and encoding',
    expectedOutcome: 'Apply normalization, standardization, and one-hot encoding to prepare data for machine learning.',
    source: 'SGS Curriculum Mapping'
  },
  'A4.3.1': {
    topic: 'Linear Regression',
    expectedOutcome: 'Explain how linear regression predicts continuous outcomes.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.3.2': {
    topic: 'Classification (Supervised)',
    expectedOutcome: 'Explain how classification techniques predict categorical outcomes.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.3.3': {
    topic: 'Hyperparameter Tuning',
    expectedOutcome: 'Explain role of hyperparameter tuning in evaluation.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.3.4': {
    topic: 'Clustering (Unsupervised)',
    expectedOutcome: 'Describe how clustering groups data based on similarities.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.3.5': {
    topic: 'Association Rules',
    expectedOutcome: 'Describe how association rules uncover relations in large data sets.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.3.6': {
    topic: 'Reinforcement Learning',
    expectedOutcome: 'Describe how an agent learns by interacting with its environment.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.3.7': {
    topic: 'Genetic Algorithms',
    expectedOutcome: 'Describe application of genetic algorithms in real-world situations.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.3.8': {
    topic: 'ANNs (Neural Networks)',
    expectedOutcome: 'Outline structure/function of ANNs and multi-layer networks.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.3.9': {
    topic: 'CNNs (Convolutional NNs)',
    expectedOutcome: 'Describe how CNNs learn spatial hierarchies in images.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.3.10': {
    topic: 'Model Selection',
    expectedOutcome: 'Explain importance of model selection and comparison.',
    source: 'IB CS 2027 HL Extension'
  },
  'A4.3.11': {
    topic: 'CNNs (Convolutional Neural Networks)',
    expectedOutcome: 'Explain how convolution, pooling, and spatial feature extraction are used in CNNs for image tasks.',
    source: 'SGS Curriculum Mapping'
  },
  'B2.4.4': {
    topic: 'Recursion Concepts',
    expectedOutcome: 'Explain fundamental concept of recursion and applications.',
    source: 'IB CS 2027 HL Extension'
  },
  'B2.4.5': {
    topic: 'Recursive Algorithms',
    expectedOutcome: 'Construct and trace recursive algorithms.',
    source: 'IB CS 2027 HL Extension'
  },
  'B3.2.1': {
    topic: 'Inheritance',
    expectedOutcome: 'Explain and apply inheritance to promote code reusability.',
    source: 'IB CS 2027 HL Extension'
  },
  'B3.2.2': {
    topic: 'Polymorphism',
    expectedOutcome: 'Construct code to model polymorphism (e.g., overriding).',
    source: 'IB CS 2027 HL Extension'
  },
  'B3.2.3': {
    topic: 'Abstraction',
    expectedOutcome: 'Explain the concept of abstraction in OOP.',
    source: 'IB CS 2027 HL Extension'
  },
  'B3.2.4': {
    topic: 'Composition/Aggregation',
    expectedOutcome: 'Explain role of composition and aggregation in class relationships.',
    source: 'IB CS 2027 HL Extension'
  },
  'B3.2.5': {
    topic: 'Design Patterns',
    expectedOutcome: 'Explain commonly used design patterns.',
    source: 'IB CS 2027 HL Extension'
  },
  'B4.1.1': {
    topic: 'ADT Fundamentals',
    expectedOutcome: 'Explain properties and purpose of ADTs.',
    source: 'IB CS 2027 HL Extension'
  },
  'B4.1.2': {
    topic: 'Linked Lists (Theory)',
    expectedOutcome: 'Evaluate linked lists.',
    source: 'IB CS 2027 HL Extension'
  },
  'B4.1.3': {
    topic: 'Linked Lists (Application)',
    expectedOutcome: 'Construct and apply linked lists (singly, doubly, circular).',
    source: 'IB CS 2027 HL Extension'
  },
  'B4.1.4': {
    topic: 'BSTs (Binary Search Trees)',
    expectedOutcome: 'Explain structures and properties of BSTs.',
    source: 'IB CS 2027 HL Extension'
  },
  'B4.1.5': {
    topic: 'Sets',
    expectedOutcome: 'Construct and apply sets as an ADT.',
    source: 'IB CS 2027 HL Extension'
  },
  'B4.1.6': {
    topic: 'ADT Core Principles',
    expectedOutcome: 'Explain core principles of ADTs (e.g., hash tables).',
    source: 'IB CS 2027 HL Extension'
  },
  'B4.1.7': {
    topic: 'Hash Tables',
    expectedOutcome: 'Explain hashing, collision handling, and rehashing in hash table implementations.',
    source: 'SGS Curriculum Mapping'
  }
};

const THEME_LABELS: Record<string, string> = {
  A1: 'A1 Computer Systems',
  A2: 'A2 Networking',
  A3: 'A3 Databases',
  A4: 'A4 Machine Learning',
  B1: 'B1 Computational Thinking',
  B2: 'B2 Programming',
  B3: 'B3 Object-Oriented Programming',
  B4: 'B4 Abstract Data Types'
};

const normalizeCode = (value: string | undefined): string => String(value || '').trim().toUpperCase();

const buildFallbackOutcome = (topic: string): string => {
  const cleanTopic = topic.trim();
  if (!cleanTopic) {
    return 'Build confidence with this syllabus area through classwork and exam-style practice.';
  }

  return `Apply ${cleanTopic.toLowerCase()} confidently in class and exam-style tasks.`;
};

export const buildSyllabusRows = (unitPlan: UnitPlanFrontmatter): SyllabusRow[] => {
  return (unitPlan.syllabusPoints || []).map((point) => {
    const code = normalizeCode(point.code);
    const topicFromPlan = String(point.topic || '').trim();
    const lookup = IB_SPEC_LOOKUP[code];

    if (lookup) {
      return {
        code,
        topic: lookup.topic,
        expectedOutcome: lookup.expectedOutcome,
        source: lookup.source
      };
    }

    return {
      code,
      topic: topicFromPlan || 'Curriculum focus',
      expectedOutcome: buildFallbackOutcome(topicFromPlan),
      source: 'SGS Curriculum Mapping'
    };
  });
};

export const getThemeLabels = (rows: SyllabusRow[]): string[] => {
  const labels: string[] = [];
  const seen = new Set<string>();

  for (const row of rows) {
    const themeCode = row.code.match(/^([AB]\d)/)?.[1];
    if (!themeCode || seen.has(themeCode)) {
      continue;
    }

    seen.add(themeCode);
    labels.push(THEME_LABELS[themeCode] || themeCode);
  }

  return labels;
};

export const getFlashcardsHref = (cards: UnitCard[] | undefined): string => {
  const flashcardCard = (cards || []).find((card) => /flashcards?/i.test(card.title || ''));
  return flashcardCard?.href || '/coming-soon.html';
};
