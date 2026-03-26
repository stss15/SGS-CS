import type { ShellContext, ShellPageLink } from './curriculum-shell';
import { buildPrevNextLinks } from './curriculum-shell';

export type IbThemeId = 'a1' | 'a2' | 'a3' | 'a4' | 'b1' | 'b2' | 'b3' | 'b4';
export type IbSectionLevel = 'sl' | 'mixed' | 'hl';

export interface IbSyllabusPoint {
  code: string;
  command: string;
  title: string;
  level: 'sl' | 'hl';
}

export interface IbThemeResource {
  label: string;
  href: string;
  meta?: string;
  disabled?: boolean;
  tone?: 'default' | 'hl';
}

export interface IbThemeSection {
  id: string;
  code: string;
  title: string;
  level: IbSectionLevel;
  overview: string;
  points: IbSyllabusPoint[];
  lessons: IbThemeResource[];
  activities: IbThemeResource[];
}

export interface IbTheme {
  id: IbThemeId;
  code: string;
  title: string;
  themeLabel: 'Theme A' | 'Theme B';
  hours: string;
  guidingQuestion: string;
  overview: string;
  objectives: string[];
  outcomes: string[];
  level: IbSectionLevel;
  sections: IbThemeSection[];
}

const point = (
  code: string,
  command: string,
  title: string,
  level: 'sl' | 'hl' = 'sl'
): IbSyllabusPoint => ({ code, command, title, level });

const resource = (
  label: string,
  href: string,
  meta?: string,
  tone: 'default' | 'hl' = 'default'
): IbThemeResource => ({ label, href, meta, tone });

const disabledResource = (label: string, meta?: string): IbThemeResource => ({
  label,
  href: '#',
  meta,
  disabled: true
});

export const getIbThemePath = (themeId: IbThemeId): string => `/ib-2027/${themeId}/index.html`;
export const getIbThemeTextbookPath = (themeId: IbThemeId): string => `/ib-2027/${themeId}/textbook/index.html`;
export const getIbSectionPath = (themeId: IbThemeId, sectionId: string): string =>
  `/ib-2027/${themeId}/${sectionId}/index.html`;

const themes: Record<IbThemeId, IbTheme> = {
  a1: {
    id: 'a1',
    code: 'A1',
    title: 'Computer fundamentals',
    themeLabel: 'Theme A',
    hours: 'SL 11 hours · HL 18 hours',
    guidingQuestion:
      'What principles underpin the operation of a computer, from low-level hardware functionality to operating system interactions?',
    overview:
      'A1 brings together hardware architecture, memory, data representation, operating system behaviour, and HL translation so students can connect low-level components to system performance and control.',
    objectives: [
      'Know the role of CPU components, memory, storage, compression, and cloud services in a working computer system.',
      'Know how binary, hexadecimal, logic gates, truth tables, and logic diagrams represent and manipulate data.',
      'Know how operating systems manage resources, scheduling, interrupts, and HL control systems.',
      'Know how interpreters, compilers, bytecode, and JIT fit into translation at HL.'
    ],
    outcomes: [
      'Describe and explain how computer hardware, memory, and instruction cycles work together.',
      'Construct and analyse data-representation and logic artefacts accurately under exam conditions.',
      'Compare scheduling and event-handling approaches in realistic operating-system contexts.',
      'Evaluate translation strategies and HL-only control-system scenarios with clear technical reasoning.'
    ],
    level: 'mixed',
    sections: [
      {
        id: 'a1-1',
        code: 'A1.1',
        title: 'Computer hardware and operation',
        level: 'mixed',
        overview:
          'This section covers the CPU, GPU, memory hierarchy, storage, compression, and cloud-service models so students can explain how modern computer systems process and store data.',
        points: [
          point('A1.1.1', 'Describe', 'the functions and interactions of the main CPU components.'),
          point('A1.1.2', 'Describe', 'the role of a GPU.'),
          point('A1.1.3', 'Explain', 'the differences between the CPU and the GPU.', 'hl'),
          point('A1.1.4', 'Explain', 'the purposes of different types of primary memory.'),
          point('A1.1.5', 'Describe', 'the fetch, decode and execute cycle.'),
          point('A1.1.6', 'Describe', 'the process of pipelining in multi-core architectures.', 'hl'),
          point('A1.1.7', 'Describe', 'internal and external types of secondary memory storage.'),
          point('A1.1.8', 'Describe', 'the concept of compression.'),
          point('A1.1.9', 'Describe', 'the different types of services in cloud computing.')
        ],
        lessons: [
          resource('SL computer hardware deck', '/ib-2027/sl/slides/A1.1_computer_hardware.html', 'Standard level lesson'),
          resource('HL architecture extension deck', '/ib-2027/hl/slides/A1.1_computer_hardware.html', 'Higher-level extension', 'hl')
        ],
        activities: []
      },
      {
        id: 'a1-2',
        code: 'A1.2',
        title: 'Data representation and computer logic',
        level: 'sl',
        overview:
          'This section focuses on binary and hexadecimal representation, binary storage, logic gates, truth tables, and logic diagrams used in computer systems.',
        points: [
          point('A1.2.1', 'Describe', 'the principal methods of representing data.'),
          point('A1.2.2', 'Explain', 'how binary is used to store data.'),
          point('A1.2.3', 'Describe', 'the purpose and use of logic gates.'),
          point('A1.2.4', 'Construct and analyse', 'truth tables.'),
          point('A1.2.5', 'Construct', 'logic diagrams.')
        ],
        lessons: [resource('Data representation and logic deck', '/ib-2027/sl/slides/A1.2_data_representation.html', 'Lesson sequence')],
        activities: []
      },
      {
        id: 'a1-3',
        code: 'A1.3',
        title: 'Operating systems and control systems',
        level: 'mixed',
        overview:
          'This section explores the role of operating systems, scheduling, interrupts, multitasking, and HL control-system concepts used in automated and embedded systems.',
        points: [
          point('A1.3.1', 'Describe', 'the role of operating systems.'),
          point('A1.3.2', 'Describe', 'the functions of an operating system.'),
          point('A1.3.3', 'Compare', 'different approaches to scheduling.'),
          point('A1.3.4', 'Evaluate', 'the use of polling and interrupt handling.'),
          point('A1.3.5', 'Explain', 'the role of the operating system in managing multitasking and resource allocation.', 'hl'),
          point('A1.3.6', 'Describe', 'the use of the control system components.', 'hl'),
          point('A1.3.7', 'Explain', 'the use of control systems in a range of real-world applications.', 'hl')
        ],
        lessons: [
          resource('SL operating systems deck', '/ib-2027/sl/slides/A1.3_operating_systems.html', 'Standard level lesson'),
          resource('HL operating systems and control deck', '/ib-2027/hl/slides/A1.3_operating_systems.html', 'Higher-level extension', 'hl')
        ],
        activities: []
      },
      {
        id: 'a1-4',
        code: 'A1.4',
        title: 'Translation',
        level: 'hl',
        overview:
          'This HL-only section covers interpreters, compilers, bytecode, and JIT so students can evaluate translation strategies for different programming contexts.',
        points: [point('A1.4.1', 'Evaluate', 'the translation processes of interpreters and compilers.', 'hl')],
        lessons: [resource('Translation deck', '/ib-2027/hl/slides/A1.4_translation.html', 'Higher-level lesson', 'hl')],
        activities: []
      }
    ]
  },
  a2: {
    id: 'a2',
    code: 'A2',
    title: 'Networks',
    themeLabel: 'Theme A',
    hours: 'SL 11 hours · HL 18 hours',
    guidingQuestion: 'What are the principles and concepts that underpin how networks operate?',
    overview:
      'A2 covers network types, digital infrastructure, architecture, transmission, routing, and security so students can explain how data moves safely and efficiently across networks.',
    objectives: [
      'Know the purpose and characteristics of networks, modern infrastructure, and TCP/IP concepts.',
      'Know how topologies, servers, segmentation, addressing, media, and routing affect network design.',
      'Know the purpose and limits of firewalls, vulnerabilities, countermeasures, and encryption.'
    ],
    outcomes: [
      'Describe and compare network models, devices, protocols, and transmission methods.',
      'Explain how addressing, packet switching, routing, and segmentation move data across a network.',
      'Discuss the effectiveness of network-security controls using realistic scenarios and tradeoffs.'
    ],
    level: 'mixed',
    sections: [
      {
        id: 'a2-1',
        code: 'A2.1',
        title: 'Network fundamentals',
        level: 'mixed',
        overview:
          'This section introduces network types, digital infrastructure, devices, protocols, and the HL TCP/IP model.',
        points: [
          point('A2.1.1', 'Describe', 'the purpose and characteristics of networks.'),
          point('A2.1.2', 'Describe', 'the purpose, benefits and limitations of modern digital infrastructures.'),
          point('A2.1.3', 'Describe', 'the function of network devices.'),
          point('A2.1.4', 'Describe', 'the network protocols used for transport and application.'),
          point('A2.1.5', 'Describe', 'the function of the TCP/IP model.', 'hl')
        ],
        lessons: [
          resource('SL network fundamentals deck', '/ib-2027/sl/slides/A2.1_network_fundamentals.html', 'Standard level lesson'),
          resource('HL network fundamentals deck', '/ib-2027/hl/slides/A2.1_network_fundamentals.html', 'Higher-level extension', 'hl')
        ],
        activities: []
      },
      {
        id: 'a2-2',
        code: 'A2.2',
        title: 'Network architecture',
        level: 'mixed',
        overview:
          'This section focuses on topologies, servers, networking models, and segmentation strategies used to balance performance, reliability, and security.',
        points: [
          point('A2.2.1', 'Describe', 'the functions and practical applications of network topologies.'),
          point('A2.2.2', 'Describe', 'the function of servers.', 'hl'),
          point('A2.2.3', 'Compare and contrast', 'networking models.'),
          point('A2.2.4', 'Explain', 'the concepts and applications of network segmentation.')
        ],
        lessons: [
          resource('SL network architecture deck', '/ib-2027/sl/slides/A2.2_network_architecture.html', 'Standard level lesson'),
          resource('HL network architecture deck', '/ib-2027/hl/slides/A2.2_network_architecture.html', 'Higher-level extension', 'hl')
        ],
        activities: []
      },
      {
        id: 'a2-3',
        code: 'A2.3',
        title: 'Data transmissions',
        level: 'mixed',
        overview:
          'This section covers addressing, media, packet switching, and HL routing so students can explain how network traffic is transmitted and directed.',
        points: [
          point('A2.3.1', 'Describe', 'different types of IP addressing.'),
          point('A2.3.2', 'Compare', 'types of media for data transmission.'),
          point('A2.3.3', 'Explain', 'how packet switching is used to send data across a network.'),
          point('A2.3.4', 'Explain', 'how static routing and dynamic routing move data across local area networks.', 'hl')
        ],
        lessons: [
          resource('SL data transmission deck', '/ib-2027/sl/slides/A2.3_data_transmission.html', 'Standard level lesson'),
          resource('HL data transmission deck', '/ib-2027/hl/slides/A2.3_data_transmission.html', 'Higher-level extension', 'hl')
        ],
        activities: []
      },
      {
        id: 'a2-4',
        code: 'A2.4',
        title: 'Network security',
        level: 'mixed',
        overview:
          'This section examines firewalls, vulnerabilities, countermeasures, and encryption so students can evaluate security controls in context.',
        points: [
          point('A2.4.1', 'Discuss', 'the effectiveness of firewalls at protecting a network.'),
          point('A2.4.2', 'Describe', 'common network vulnerabilities.', 'hl'),
          point('A2.4.3', 'Describe', 'common network countermeasures.', 'hl'),
          point('A2.4.4', 'Describe', 'the process of encryption and digital certificates.')
        ],
        lessons: [
          resource('SL network security deck', '/ib-2027/sl/slides/A2.4_network_security.html', 'Standard level lesson'),
          resource('HL network security deck', '/ib-2027/hl/slides/A2.4_network_security.html', 'Higher-level extension', 'hl')
        ],
        activities: []
      }
    ]
  },
  a3: {
    id: 'a3',
    code: 'A3',
    title: 'Databases',
    themeLabel: 'Theme A',
    hours: 'SL 11 hours · HL 18 hours',
    guidingQuestion: 'What are the principles, structures, and operations that form the basis of database systems?',
    overview:
      'A3 organizes the course around relational databases, schema design, SQL, transactions, and HL database alternatives so students can build and query structured data systems.',
    objectives: [
      'Know the principles of relational databases, schemas, keys, normalization, and denormalization.',
      'Know how SQL definitions, queries, updates, views, transactions, and HL analytics/database models work.',
      'Know how to relate database design decisions to performance, integrity, and scalability.'
    ],
    outcomes: [
      'Construct ERDs, normalized tables, and SQL queries that match realistic database scenarios.',
      'Explain how database programming, aggregation, transactions, and data warehouses support reliable analysis.',
      'Evaluate when alternative or distributed databases are more appropriate than a strictly relational model.'
    ],
    level: 'mixed',
    sections: [
      {
        id: 'a3-1',
        code: 'A3.1',
        title: 'Database fundamentals',
        level: 'sl',
        overview:
          'This section introduces the benefits, features, and constraints of relational databases as the foundation for the rest of Theme A3.',
        points: [point('A3.1.1', 'Explain', 'the features, benefits and limitations of a relational database.')],
        lessons: [resource('Database fundamentals deck', '/ib-2027/sl/slides/A3.1_database_fundamentals.html', 'Lesson sequence')],
        activities: [
          resource('SQL worksheet hub', '/ib-2027/sl/unit-6/sql-worksheets/index.html', 'A3.1-A3.3 worksheet sequence'),
          resource('School library worksheet', '/ib-2027/sl/unit-6/sql-worksheets/school-library.html', 'Exact worksheet support')
        ]
      },
      {
        id: 'a3-2',
        code: 'A3.2',
        title: 'Database design',
        level: 'sl',
        overview:
          'This section focuses on schema design, ERDs, data types, tables, normalization, and denormalization for realistic database models.',
        points: [
          point('A3.2.1', 'Describe', 'database schemas.'),
          point('A3.2.2', 'Construct', 'ERDs.'),
          point('A3.2.3', 'Outline', 'the different data types used in relational databases.'),
          point('A3.2.4', 'Construct', 'tables for relational databases.'),
          point('A3.2.5', 'Explain', 'the difference between normal forms.'),
          point('A3.2.6', 'Construct', 'a database normalized to 3NF for a range of real-world scenarios.'),
          point('A3.2.7', 'Evaluate', 'the need for denormalizing databases.')
        ],
        lessons: [resource('Database design deck', '/ib-2027/sl/slides/A3.2_database_design.html', 'Lesson sequence')],
        activities: [
          resource('Campus clubs worksheet', '/ib-2027/sl/unit-6/sql-worksheets/campus-clubs.html', 'ERDs and relational design'),
          resource('Canteen orders worksheet', '/ib-2027/sl/unit-6/sql-worksheets/canteen-orders.html', 'Table design and normalization'),
          resource('School library worksheet', '/ib-2027/sl/unit-6/sql-worksheets/school-library.html', 'Schema and table design'),
          resource('SQL project', '/ib-2027/sl/unit-6/sql-project/index.html', 'Stage-by-stage project journey')
        ]
      },
      {
        id: 'a3-3',
        code: 'A3.3',
        title: 'Database programming',
        level: 'mixed',
        overview:
          'This section covers SQL language types, joins, updates, aggregation, views, and transactions across the SL and HL database sequence.',
        points: [
          point('A3.3.1', 'Outline', 'the differences between data language types within SQL.'),
          point('A3.3.2', 'Construct', 'queries between two tables in SQL.'),
          point('A3.3.3', 'Explain', 'how SQL can be used to update data in a database.'),
          point('A3.3.4', 'Construct', 'calculations within a database using SQL aggregate functions.', 'hl'),
          point('A3.3.5', 'Describe', 'different database views.', 'hl'),
          point('A3.3.6', 'Describe', 'how transactions maintain data integrity in a database.', 'hl')
        ],
        lessons: [
          resource('SL database programming deck', '/ib-2027/sl/slides/A3.3_database_programming.html', 'Standard level lesson'),
          resource('HL database programming deck', '/ib-2027/hl/slides/A3.3_database_programming.html', 'Higher-level extension', 'hl')
        ],
        activities: [
          resource('SL SQL worksheet hub', '/ib-2027/sl/unit-6/sql-worksheets/index.html', 'Core SQL practice'),
          resource('HL SQL worksheet hub', '/ib-2027/hl/unit-5/sql-worksheets/index.html', 'Aggregate functions and reporting', 'hl'),
          resource('SQL playground', '/tools/sql-playground.html?dataset=campus-clubs', 'Shared query tool'),
          resource('SQL project', '/ib-2027/sl/unit-6/sql-project/index.html', 'Stage-by-stage project journey'),
          resource('Course enrolment worksheet', '/ib-2027/hl/unit-5/sql-worksheets/course-enrolment.html', 'HL aggregate functions', 'hl'),
          resource('House competition worksheet', '/ib-2027/hl/unit-5/sql-worksheets/house-competition.html', 'HL reporting challenge', 'hl')
        ]
      },
      {
        id: 'a3-4',
        code: 'A3.4',
        title: 'Alternative databases and data warehouses',
        level: 'hl',
        overview:
          'This HL-only section explores NoSQL, cloud and in-memory models, data warehouses, OLAP, data mining, and distributed databases.',
        points: [
          point('A3.4.1', 'Outline', 'the different types of databases as approaches to storing data.', 'hl'),
          point('A3.4.2', 'Explain', 'the primary objectives of data warehouses in data management and business intelligence.', 'hl'),
          point('A3.4.3', 'Explain', 'the role of online analytical processing and data mining for business intelligence.', 'hl'),
          point('A3.4.4', 'Describe', 'the features of distributed databases.', 'hl')
        ],
        lessons: [resource('Alternative databases and data warehouses deck', '/ib-2027/hl/slides/A3.4_alternative_databases_and_data_warehouses.html', 'Higher-level lesson', 'hl')],
        activities: [resource('NoSQL project', '/ib-2027/hl/unit-5/nosql-project/index.html', 'Stage-by-stage project journey', 'hl')]
      }
    ]
  },
  a4: {
    id: 'a4',
    code: 'A4',
    title: 'Machine learning',
    themeLabel: 'Theme A',
    hours: 'SL 5 hours · HL 18 hours',
    guidingQuestion: 'What principles and approaches should be considered to ensure machine learning models produce accurate results ethically?',
    overview:
      'A4 moves from ML fundamentals into HL preprocessing and model approaches before returning to the ethical questions that surround real-world machine-learning systems.',
    objectives: [
      'Know the major machine-learning paradigms, hardware contexts, and ethical considerations used in the syllabus.',
      'Know the HL preprocessing and model-selection ideas that shape feature-rich machine-learning systems.',
      'Know how algorithm choice, evaluation, and ethics interact in applied ML scenarios.'
    ],
    outcomes: [
      'Describe how machine-learning systems are trained, deployed, and evaluated in real contexts.',
      'Explain HL preprocessing, supervised and unsupervised methods, neural-network ideas, and model comparison.',
      'Discuss the ethical implications of machine learning and wider computer-technology integration with balance and precision.'
    ],
    level: 'mixed',
    sections: [
      {
        id: 'a4-1',
        code: 'A4.1',
        title: 'Machine learning fundamentals',
        level: 'sl',
        overview:
          'This section introduces the main machine-learning approaches and the hardware requirements needed to run them in real-world scenarios.',
        points: [
          point('A4.1.1', 'Describe', 'the types of machine learning and their applications in the real world.'),
          point('A4.1.2', 'Describe', 'the hardware requirements for various scenarios where machine learning is deployed.')
        ],
        lessons: [resource('Machine learning fundamentals deck', '/ib-2027/sl/slides/A4.1_machine_learning_fundamentals.html', 'Lesson sequence')],
        activities: []
      },
      {
        id: 'a4-2',
        code: 'A4.2',
        title: 'Data preprocessing',
        level: 'hl',
        overview:
          'This HL-only section focuses on cleaning data, selecting informative features, and reducing dimensionality before model training.',
        points: [
          point('A4.2.1', 'Describe', 'the significance of data cleaning.', 'hl'),
          point('A4.2.2', 'Describe', 'the role of feature selection.', 'hl'),
          point('A4.2.3', 'Describe', 'the importance of dimensionality reduction.', 'hl')
        ],
        lessons: [resource('Data preprocessing deck', '/ib-2027/hl/slides/A4.2_data_preprocessing.html', 'Higher-level lesson', 'hl')],
        activities: []
      },
      {
        id: 'a4-3',
        code: 'A4.3',
        title: 'Machine learning approaches',
        level: 'hl',
        overview:
          'This HL-only section covers regression, classification, clustering, association rules, reinforcement learning, genetic algorithms, neural networks, CNNs, and model comparison.',
        points: [
          point('A4.3.1', 'Explain', 'how linear regression is used to predict continuous outcomes.', 'hl'),
          point('A4.3.2', 'Explain', 'how classification techniques in supervised learning are used to predict discrete categorical outcomes.', 'hl'),
          point('A4.3.3', 'Explain', 'the role of hyperparameter tuning when evaluating supervised learning algorithms.', 'hl'),
          point('A4.3.4', 'Describe', 'how clustering techniques in unsupervised learning are used to group data based on similarities in features.', 'hl'),
          point('A4.3.5', 'Describe', 'how learning techniques using the association rule are used to uncover relations between different attributes in large data sets.', 'hl'),
          point('A4.3.6', 'Describe', 'how an agent learns to make decisions by interacting with its environment in reinforcement learning.', 'hl'),
          point('A4.3.7', 'Describe', 'the application of genetic algorithms in various real-world situations.', 'hl'),
          point('A4.3.8', 'Outline', 'the structure and function of ANNs and how multi-layer networks are used to model complex patterns in data sets.', 'hl'),
          point('A4.3.9', 'Describe', 'how CNNs are designed to adaptively learn spatial hierarchies of features in images.', 'hl'),
          point('A4.3.10', 'Explain', 'the importance of model selection and comparison in machine learning.', 'hl')
        ],
        lessons: [resource('Machine learning approaches deck', '/ib-2027/hl/slides/A4.3_machine_learning_approaches.html', 'Higher-level lesson', 'hl')],
        activities: []
      },
      {
        id: 'a4-4',
        code: 'A4.4',
        title: 'Ethical considerations',
        level: 'sl',
        overview:
          'This section focuses on bias, fairness, accountability, privacy, security, and the wider impact of increasingly integrated computer technologies.',
        points: [
          point('A4.4.1', 'Discuss', 'the ethical implications of machine learning in real-world scenarios.'),
          point('A4.4.2', 'Discuss', 'ethical aspects of the increasing integration of computer technologies into daily life.')
        ],
        lessons: [resource('Ethical considerations deck', '/ib-2027/sl/slides/A4.4_ethical_considerations.html', 'Lesson sequence')],
        activities: []
      }
    ]
  },
  b1: {
    id: 'b1',
    code: 'B1',
    title: 'Computational thinking',
    themeLabel: 'Theme B',
    hours: 'SL 5 hours · HL 5 hours',
    guidingQuestion: 'How can we apply a computational solution to a real-world problem?',
    overview:
      'B1 establishes the computational-thinking toolkit used across the course: problem specifications, abstraction, decomposition, pattern recognition, algorithmic design, and flowcharts.',
    objectives: [
      'Know the structure of a clear problem specification.',
      'Know the fundamental concepts of computational thinking and the value of flowcharts in planning.'
    ],
    outcomes: [
      'Construct a problem specification from a messy real-world scenario.',
      'Explain how computational-thinking strategies shape computer-science problem solving.',
      'Trace flowcharts accurately and connect them to algorithm design.'
    ],
    level: 'sl',
    sections: [
      {
        id: 'b1-1',
        code: 'B1.1',
        title: 'Approaches to computational thinking',
        level: 'sl',
        overview:
          'This section gathers the B1 lesson sequence around specifications, the pillars of computational thinking, and flowchart tracing.',
        points: [
          point('B1.1.1', 'Construct', 'a problem specification.'),
          point('B1.1.2', 'Describe', 'the fundamental concepts of computational thinking.'),
          point('B1.1.3', 'Explain', 'how applying computational thinking to fundamental concepts is used to approach and solve problems in computer science.'),
          point('B1.1.4', 'Trace', 'flowcharts for a range of programming algorithms.')
        ],
        lessons: [
          resource('Problem specification deck', '/ib-2027/sl/slides/B1.1_problem_specification.html', 'Lesson 1'),
          resource('Computational thinking deck', '/ib-2027/sl/slides/B1.2_computational_thinking.html', 'Lesson 2'),
          resource('Flowcharts and pseudocode deck', '/ib-2027/sl/slides/B1.3_flowcharts_pseudocode.html', 'Lesson 3'),
          resource('Algorithm design deck', '/ib-2027/sl/slides/B1.4_algorithm_design.html', 'Lesson 4')
        ],
        activities: []
      }
    ]
  },
  b2: {
    id: 'b2',
    code: 'B2',
    title: 'Programming',
    themeLabel: 'Theme B',
    hours: 'SL 40 hours · HL 42 hours',
    guidingQuestion: 'How can we apply computer programming to solve problems?',
    overview:
      'B2 reorganizes the programming course into fundamentals, data structures, constructs, algorithms, and file processing so students can see the full syllabus rather than a unit-by-unit teaching order.',
    objectives: [
      'Know the syntax, data structures, control structures, and modular design ideas needed to build working programs.',
      'Know the search, sort, complexity, recursion, and file-processing concepts expected by the syllabus.',
      'Know where the HL recursion content extends the SL programming sequence.'
    ],
    outcomes: [
      'Construct, trace, and debug code that uses the correct programming structures for the task.',
      'Explain how data structures and algorithms affect program behaviour and efficiency.',
      'Apply search, sort, recursion, and file-processing techniques in exam-style scenarios.'
    ],
    level: 'mixed',
    sections: [
      {
        id: 'b2-1',
        code: 'B2.1',
        title: 'Programming fundamentals',
        level: 'sl',
        overview:
          'This section covers variables, substrings, exception handling, and debugging techniques used in early programming tasks.',
        points: [
          point('B2.1.1', 'Construct and trace', 'programs using a range of global and local variables of various data types.'),
          point('B2.1.2', 'Construct', 'programs that can extract and manipulate substrings.'),
          point('B2.1.3', 'Describe', 'how programs use common exception handling techniques.'),
          point('B2.1.4', 'Construct and use', 'common debugging techniques.')
        ],
        lessons: [resource('Programming fundamentals deck', '/ib-2027/sl/slides/B2.1_programming_fundamentals.html', 'Lesson sequence')],
        activities: []
      },
      {
        id: 'b2-2',
        code: 'B2.2',
        title: 'Data structures',
        level: 'sl',
        overview:
          'This section covers static and dynamic structures, arrays, lists, stacks, and queues used in practical programming problems.',
        points: [
          point('B2.2.1', 'Compare', 'static and dynamic data structures.'),
          point('B2.2.2', 'Construct', 'programs that apply arrays and Lists.'),
          point('B2.2.3', 'Explain', 'the concept of a stack as a LIFO data structure.'),
          point('B2.2.4', 'Explain', 'the concept of a queue as a FIFO data structure.')
        ],
        lessons: [resource('Data structures deck', '/ib-2027/sl/slides/B2.2_data_structures.html', 'Lesson sequence')],
        activities: [resource('Stacks and queues extension', '/ib-2027/sl/unit-5/oop-project/level-p1-stacks-queues.html', 'Crossover practical')]
      },
      {
        id: 'b2-3',
        code: 'B2.3',
        title: 'Programming constructs',
        level: 'sl',
        overview:
          'This section focuses on sequencing, selection, looping, and modular functions as the backbone of structured programs.',
        points: [
          point('B2.3.1', 'Construct', 'programs that implement the correct sequence of code instructions to meet program objectives.'),
          point('B2.3.2', 'Construct', 'programs utilizing appropriate selection structures.'),
          point('B2.3.3', 'Construct', 'programs that utilize looping structures to perform repeated actions.'),
          point('B2.3.4', 'Construct', 'functions and modularization.')
        ],
        lessons: [resource('Programming constructs deck', '/ib-2027/sl/slides/B2.3_programming_constructs.html', 'Lesson sequence')],
        activities: []
      },
      {
        id: 'b2-4',
        code: 'B2.4',
        title: 'Programming algorithms',
        level: 'mixed',
        overview:
          'This section covers Big O, linear and binary search, sort algorithms, and the HL recursion extension.',
        points: [
          point('B2.4.1', 'Describe', 'the efficiency of specific algorithms by calculating their Big O notation to analyse their scalability.'),
          point('B2.4.2', 'Construct and trace', 'algorithms to implement a linear search and a binary search for data retrieval.'),
          point('B2.4.3', 'Construct and trace', 'algorithms to implement bubble sort and selection sort, evaluating their time and space complexities.'),
          point('B2.4.4', 'Explain', 'the fundamental concept of recursion and its applications in programming.', 'hl'),
          point('B2.4.5', 'Construct and trace', 'recursive algorithms in a programming language.', 'hl')
        ],
        lessons: [
          resource('SL programming algorithms deck', '/ib-2027/sl/slides/B2.4_programming_algorithms.html', 'Standard level lesson'),
          resource('HL recursion extension deck', '/ib-2027/hl/slides/B2.4_programming_algorithms.html', 'Higher-level extension', 'hl')
        ],
        activities: [resource('Log search extension', '/ib-2027/sl/unit-5/oop-project/level-p2-log-search.html', 'Searching crossover practical')]
      },
      {
        id: 'b2-5',
        code: 'B2.5',
        title: 'File processing',
        level: 'sl',
        overview:
          'This section focuses on opening, reading, writing, appending, and closing files accurately in code.',
        points: [point('B2.5.1', 'Construct', 'code to perform file-processing operations.')],
        lessons: [resource('File processing deck', '/ib-2027/sl/slides/B2.5_file_processing.html', 'Lesson sequence')],
        activities: [resource('Save and load extension', '/ib-2027/sl/unit-5/oop-project/level-h-save-load.html', 'Persistence crossover practical')]
      }
    ]
  },
  b3: {
    id: 'b3',
    code: 'B3',
    title: 'Object-oriented programming',
    themeLabel: 'Theme B',
    hours: 'SL 7 hours · HL 23 hours',
    guidingQuestion: 'Is object-oriented programming an appropriate paradigm for solving complex problems?',
    overview:
      'B3 groups the single-class and multi-class OOP sequence together so students can see where classes, objects, inheritance, composition, and design patterns sit in the full syllabus.',
    objectives: [
      'Know the core OOP ideas of classes, objects, methods, constructors, encapsulation, and information hiding.',
      'Know the HL extensions into inheritance, polymorphism, abstraction, composition, aggregation, and design patterns.',
      'Know how the scenario and project work contributes practical OOP practice.'
    ],
    outcomes: [
      'Evaluate when OOP is an appropriate approach for a programming problem.',
      'Construct class designs and code that model both single-class and multi-class OOP situations.',
      'Explain how inheritance, polymorphism, abstraction, composition, and design patterns improve reusable software design.'
    ],
    level: 'mixed',
    sections: [
      {
        id: 'b3-1',
        code: 'B3.1',
        title: 'Fundamentals of OOP for a single class',
        level: 'sl',
        overview:
          'This section introduces classes, objects, methods, constructors, static vs non-static members, and encapsulation within a single-class context.',
        points: [
          point('B3.1.1', 'Evaluate', 'the fundamentals of OOP.'),
          point('B3.1.2', 'Construct', 'a design of classes, their methods and behaviour.'),
          point('B3.1.3', 'Distinguish', 'between static and non-static variables and methods.'),
          point('B3.1.4', 'Construct', 'code to define classes and instantiate objects.'),
          point('B3.1.5', 'Explain and apply', 'the concepts of encapsulation and information hiding in OOP.')
        ],
        lessons: [resource('OOP fundamentals deck', '/ib-2027/sl/unit-5/slides/B3.1_oop_fundamentals.html', 'Lesson sequence')],
        activities: [
          resource('OOP project launch', '/ib-2027/sl/unit-5/oop-project/index.html', 'Main practical sequence'),
          resource('Animal kingdom scenario', '/ib-2027/sl/unit-5/scenarios/scenario-1-animals.html', 'Classroom scenario'),
          resource('University system scenario', '/ib-2027/sl/unit-5/scenarios/scenario-2-university.html', 'Classroom scenario'),
          resource('Theme park manager scenario', '/ib-2027/sl/unit-5/scenarios/scenario-3-themepark.html', 'Classroom scenario')
        ]
      },
      {
        id: 'b3-2',
        code: 'B3.2',
        title: 'Fundamentals of OOP for multiple classes',
        level: 'hl',
        overview:
          'This HL-only section extends the OOP model into inheritance, polymorphism, abstraction, composition, aggregation, and design patterns.',
        points: [
          point('B3.2.1', 'Explain and apply', 'the concept of inheritance in OOP to promote code reusability.', 'hl'),
          point('B3.2.2', 'Construct', 'code to model polymorphism and its various forms, such as method overriding.', 'hl'),
          point('B3.2.3', 'Explain', 'the concept of abstraction in OOP.', 'hl'),
          point('B3.2.4', 'Explain', 'the role of composition and aggregation in class relationships.', 'hl'),
          point('B3.2.5', 'Explain', 'commonly used design patterns in OOP.', 'hl')
        ],
        lessons: [resource('Inheritance and polymorphism deck', '/ib-2027/hl/slides/B3.2_inheritance_polymorphism.html', 'Higher-level lesson', 'hl')],
        activities: [
          resource("Darwin's museum scenario", '/ib-2027/hl/unit-4/scenarios/scenario-darwin-museum.html', 'Inheritance and polymorphism', 'hl'),
          resource('University system scenario', '/ib-2027/sl/unit-5/scenarios/scenario-2-university.html', 'Composition and aggregation crossover', 'hl')
        ]
      }
    ]
  },
  b4: {
    id: 'b4',
    code: 'B4',
    title: 'Abstract data types',
    themeLabel: 'Theme B',
    hours: 'HL 23 hours',
    guidingQuestion: 'Which abstract data types are most appropriate for different situations?',
    overview:
      'B4 is the HL-only ADT unit covering linked lists, binary search trees, sets, and the core ideas behind hash-based structures.',
    objectives: [
      'Know the purpose of ADTs and the mechanics of linked lists, BSTs, sets, and hash-based structures.',
      'Know which official HL-only ADT ideas are expected beyond the current legacy unit mapping.'
    ],
    outcomes: [
      'Evaluate which abstract data type best suits a problem and justify that choice.',
      'Explain how linked lists, BSTs, sets, and hash-based approaches behave and what operations they support.'
    ],
    level: 'hl',
    sections: [
      {
        id: 'b4-1',
        code: 'B4.1',
        title: 'Fundamentals of ADTs',
        level: 'hl',
        overview:
          'This HL-only section covers the purpose of ADTs and the major abstract structures used for linked, tree-based, set-based, and hash-based organization.',
        points: [
          point('B4.1.1', 'Explain', 'the properties and purpose of ADTs in programming.', 'hl'),
          point('B4.1.2', 'Evaluate', 'linked lists.', 'hl'),
          point('B4.1.3', 'Construct and apply', 'linked lists: singly, doubly and circular.', 'hl'),
          point('B4.1.4', 'Explain', 'the structures and properties of BSTs.', 'hl'),
          point('B4.1.5', 'Construct and apply', 'sets as an ADT.', 'hl'),
          point('B4.1.6', 'Explain', 'the core principles of ADTs.', 'hl')
        ],
        lessons: [resource('Fundamentals of ADTs deck', '/ib-2027/hl/slides/B4.1_fundamentals_of_ADTs.html', 'Higher-level lesson', 'hl')],
        activities: []
      }
    ]
  }
};

const themeOrder = Object.keys(themes) as IbThemeId[];

export const getIbThemes = (): IbTheme[] => themeOrder.map((themeId) => themes[themeId]);

export const getIbTheme = (themeId: string): IbTheme | undefined => themes[themeId as IbThemeId];

export const getIbThemeOrThrow = (themeId: string): IbTheme => {
  const theme = getIbTheme(themeId);
  if (!theme) {
    throw new Error(`Unknown IB syllabus theme: ${themeId}`);
  }
  return theme;
};

export const getIbSection = (themeId: string, sectionId: string): IbThemeSection | undefined =>
  getIbTheme(themeId)?.sections.find((section) => section.id === sectionId);

export const getIbSectionOrThrow = (themeId: string, sectionId: string): IbThemeSection => {
  const section = getIbSection(themeId, sectionId);
  if (!section) {
    throw new Error(`Unknown IB syllabus section: ${themeId}/${sectionId}`);
  }
  return section;
};

export const getIbThemeStaticPaths = () =>
  getIbThemes().map((theme) => ({
    params: { theme: theme.id },
    props: { themeId: theme.id }
  }));

export const getIbSectionStaticPaths = () =>
  getIbThemes().flatMap((theme) =>
    theme.sections.map((section) => ({
      params: {
        theme: theme.id,
        section: section.id
      },
      props: {
        themeId: theme.id,
        sectionId: section.id
      }
    }))
  );

export const getIbThemeTone = (level: IbSectionLevel): 'default' | 'hl' => (level === 'hl' ? 'hl' : 'default');

export const getIbLevelLabel = (level: IbSectionLevel): string =>
  level === 'hl' ? 'HL only' : level === 'mixed' ? 'SL + HL' : 'SL core';

export const getIbThemeShell = (themeId: IbThemeId): ShellContext => {
  const theme = getIbThemeOrThrow(themeId);

  return {
    title: `${theme.code} ${theme.title}`,
    meta: `${theme.themeLabel} · ${theme.hours}`,
    icon: 'fa-solid fa-graduation-cap',
    collapsible: false,
    groups: [
      {
        id: `${theme.id}-overview`,
        label: 'Overview',
        collapsible: false,
        sequence: true,
        items: [{ label: 'Unit overview', href: getIbThemePath(theme.id) }]
      },
      {
        id: `${theme.id}-sections`,
        label: 'Subtopics',
        static: true,
        sequence: true,
        items: theme.sections.map((section) => ({
          label: section.title,
          href: getIbSectionPath(theme.id, section.id),
          number: section.code,
          meta: section.level === 'hl' ? 'HL only' : undefined,
          tone: getIbThemeTone(section.level)
        }))
      },
      {
        id: `${theme.id}-resources`,
        label: 'Resources',
        static: true,
        items: [
          { label: 'Textbook', href: getIbThemeTextbookPath(theme.id) },
          disabledResource('Revision'),
          disabledResource('Assessment'),
          disabledResource('Independent tasks')
        ]
      }
    ]
  };
};

export const getIbThemePrevNext = (themeId: IbThemeId, currentPath: string): { prevLink?: ShellPageLink; nextLink?: ShellPageLink } =>
  buildPrevNextLinks(getIbThemeShell(themeId).groups, currentPath);

export const getIbThemeTextbookShell = (themeId: IbThemeId): ShellContext => {
  const theme = getIbThemeOrThrow(themeId);
  const themeA = getIbThemes().filter((entry) => entry.themeLabel === 'Theme A');
  const themeB = getIbThemes().filter((entry) => entry.themeLabel === 'Theme B');

  const textbookChapterItems = (entries: IbTheme[]) =>
    entries.map((entry) => ({
      label: entry.title,
      href: getIbThemeTextbookPath(entry.id),
      number: entry.code,
      meta: entry.id === themeId ? 'Current chapter' : entry.level === 'hl' ? 'HL only' : undefined,
      tone: getIbThemeTone(entry.level)
    }));

  return {
    title: 'IB textbook',
    meta: `${theme.code} · ${theme.title}`,
    icon: 'fa-solid fa-book-open',
    collapsible: false,
    groups: [
      {
        id: `${theme.id}-textbook-context`,
        label: 'Current unit',
        static: true,
        items: [
          {
            label: 'Unit overview',
            href: getIbThemePath(theme.id),
            number: theme.code
          },
          {
            label: 'Textbook chapter',
            href: getIbThemeTextbookPath(theme.id),
            meta: theme.title
          }
        ]
      },
      {
        id: 'ib-textbook-theme-a',
        label: 'Theme A chapters',
        static: true,
        sequence: true,
        items: textbookChapterItems(themeA)
      },
      {
        id: 'ib-textbook-theme-b',
        label: 'Theme B chapters',
        static: true,
        sequence: true,
        items: textbookChapterItems(themeB)
      }
    ]
  };
};

export const getIbThemeTextbookPrevNext = (
  themeId: IbThemeId,
  currentPath: string
): { prevLink?: ShellPageLink; nextLink?: ShellPageLink } =>
  buildPrevNextLinks(getIbThemeTextbookShell(themeId).groups, currentPath);

export const getIbLandingShell = (): ShellContext => {
  const themeA = getIbThemes().filter((theme) => theme.themeLabel === 'Theme A');
  const themeB = getIbThemes().filter((theme) => theme.themeLabel === 'Theme B');

  return {
    title: 'IB Computer Science',
    meta: 'First assessment 2027',
    icon: 'fa-solid fa-book-open',
    collapsible: false,
    groups: [
      {
        id: 'theme-a',
        label: 'Theme A',
        static: true,
        items: themeA.map((theme) => ({
          label: theme.title,
          href: getIbThemePath(theme.id),
          number: theme.code,
          meta: theme.level === 'hl' ? 'HL only' : undefined,
          tone: getIbThemeTone(theme.level)
        }))
      },
      {
        id: 'theme-b',
        label: 'Theme B',
        static: true,
        items: themeB.map((theme) => ({
          label: theme.title,
          href: getIbThemePath(theme.id),
          number: theme.code,
          meta: theme.level === 'hl' ? 'HL only' : undefined,
          tone: getIbThemeTone(theme.level)
        }))
      },
      {
        id: 'assessment',
        label: 'Assessment',
        static: true,
        items: [
          disabledResource('IA'),
          disabledResource('EE'),
          disabledResource('Case study')
        ]
      }
    ]
  };
};

export const getIbLandingBreadcrumbs = () => [{ label: 'IB 2027' }];

export const getIbThemeBreadcrumbs = (themeId: IbThemeId, currentLabel?: string) => {
  const theme = getIbThemeOrThrow(themeId);
  const breadcrumbs = [
    { label: 'IB 2027', href: '/ib-2027/index.html' },
    { label: theme.code, href: getIbThemePath(theme.id) }
  ];

  return currentLabel ? [...breadcrumbs, { label: currentLabel }] : breadcrumbs;
};

export const getIbSectionBreadcrumbs = (themeId: IbThemeId, sectionId: string) => {
  const section = getIbSectionOrThrow(themeId, sectionId);
  return getIbThemeBreadcrumbs(themeId, section.code);
};

export const getIbThemeResourceLinks = (themeId: IbThemeId): IbThemeResource[] => [
  { label: 'Textbook', href: getIbThemeTextbookPath(themeId) },
  disabledResource('Revision'),
  disabledResource('Assessment'),
  disabledResource('Independent tasks')
];

export const getIbPointIndex = (theme: IbTheme, code: string): number => {
  const allCodes = theme.sections.flatMap((section) => section.points.map((pointItem) => pointItem.code));
  return allCodes.indexOf(code);
};
