#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const UNIT_PLAN_ROOT = path.join(ROOT, 'src/pages/ib-2027');
const OUTPUT_ROOT = path.join(ROOT, 'apps/site/src/content/ib-textbooks');
const LOOKUP_FILE = path.join(ROOT, 'apps/site/src/lib/ib2027-unit-index.ts');

const argMap = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const token = process.argv[i];
  if (!token.startsWith('--')) continue;
  const key = token.slice(2);
  const value = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : 'true';
  argMap.set(key, value);
  if (value !== 'true') i += 1;
}

const overwrite = argMap.get('overwrite') === 'true';

const escapeInline = (value) =>
  String(value || '')
    .replace(/`/g, '')
    .replace(/\|/g, '\\|')
    .trim();

const extractLookup = () => {
  const text = fs.readFileSync(LOOKUP_FILE, 'utf8');
  const regex =
    /'([AB]\d\.\d(?:\.\d+)?)':\s*\{[\s\S]*?topic:\s*'([^']*)',[\s\S]*?expectedOutcome:\s*'([^']*)',[\s\S]*?source:\s*'([^']*)'[\s\S]*?\},/g;
  const out = new Map();
  let match;
  while ((match = regex.exec(text)) !== null) {
    out.set(match[1], {
      topic: match[2],
      expected: match[3],
      source: match[4]
    });
  }
  return out;
};

const lookup = extractLookup();

const SPECIAL_TOPICS = {
  'Crit A': { topic: 'Planning and requirements', expected: 'Define a clear client problem and measurable success criteria.' },
  'Crit B': { topic: 'Design and record of tasks', expected: 'Present a clear design model and structured development plan.' },
  'Crit C': { topic: 'Development evidence', expected: 'Document implementation choices and technical complexity clearly.' },
  'Crit D': { topic: 'Functionality evidence', expected: 'Demonstrate the product operating against defined success criteria.' },
  'Crit E': { topic: 'Evaluation', expected: 'Evaluate strengths, limitations, and justified future improvements.' },
  'Paper 1': { topic: 'Case study section requirements', expected: 'Apply researched case-study knowledge in structured exam responses.' },
  AO1: { topic: 'Understanding and knowledge', expected: 'Show accurate understanding of the case-study system and terminology.' },
  AO2: { topic: 'Application', expected: 'Apply syllabus concepts to the case-study context correctly.' },
  AO3: { topic: 'Evaluation and justification', expected: 'Evaluate strategies and justify decisions with balanced technical reasoning.' },
  HL: { topic: 'Higher-level depth', expected: 'Synthesize deeper technical evidence for higher-level case-study evaluation.' },
  'Internal Assessment': {
    topic: 'Research and project communication',
    expected: 'Use strong technical communication and evidence-backed project rationale.'
  }
};

const TERM_BANK = {
  A1: ['CPU', 'ALU', 'control unit', 'register', 'cache', 'fetch-decode-execute cycle', 'pipelining', 'translator'],
  A2: ['protocol', 'topology', 'routing', 'segmentation', 'firewall', 'vulnerability', 'countermeasure', 'TCP/IP'],
  A3: ['relational database', 'schema', 'normalization', 'SQL', 'transaction', 'ACID', 'data warehouse', 'NoSQL'],
  A4: ['machine learning', 'feature', 'data cleaning', 'classification', 'clustering', 'hyperparameter', 'neural network', 'bias'],
  B1: ['problem specification', 'stakeholder', 'constraint', 'abstraction', 'decomposition', 'pattern recognition', 'algorithm', 'trace table'],
  B2: ['variable', 'data structure', 'selection', 'iteration', 'algorithm efficiency', 'recursion', 'file processing', 'debugging'],
  B3: ['class', 'object', 'encapsulation', 'inheritance', 'polymorphism', 'abstraction', 'composition', 'design pattern'],
  B4: ['abstract data type', 'linked list', 'binary search tree', 'set', 'hashing', 'collision', 'rehashing', 'interface'],
  IA: ['success criteria', 'stakeholder', 'record of tasks', 'system model', 'complexity evidence', 'evaluation'],
  CASE: ['pre-seen case study', 'challenge question', 'technical evidence', 'operational constraints', 'synthesis', 'justification']
};

const normalizeTermKey = (value) => String(value || '').trim().toLowerCase();

const hashCode = (value) => {
  const text = String(value || '');
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const TERM_DEFINITIONS = new Map(
  Object.entries({
    CPU: 'The processor that executes instructions and controls most system operations.',
    ALU: 'The arithmetic logic unit in the CPU that performs calculations and logical comparisons.',
    'control unit': 'The CPU component that decodes instructions and coordinates data movement.',
    register: 'Very fast, very small CPU storage used during instruction execution.',
    cache: 'Fast memory that stores frequently used data to reduce access time.',
    'fetch-decode-execute cycle': 'The repeated process of fetching an instruction, decoding it, then executing it.',
    pipelining: 'Overlapping instruction stages to increase throughput.',
    translator: 'Software that converts source code into another form for execution.',
    protocol: 'A defined set of rules for communication between devices.',
    topology: 'The structure or layout of a network.',
    routing: 'Selecting and forwarding data along paths through a network.',
    segmentation: 'Dividing a network into smaller sections to improve performance or security.',
    firewall: 'A security control that filters network traffic based on rules.',
    vulnerability: 'A weakness that could be exploited to compromise a system.',
    countermeasure: 'A technical or procedural control used to reduce risk.',
    'TCP/IP': 'The protocol suite used for communication across the internet and many private networks.',
    'relational database': 'A database that stores data in related tables using keys and constraints.',
    schema: 'The formal structure of a database, including tables, fields, and relationships.',
    normalization: 'Structuring data to reduce redundancy and improve integrity.',
    SQL: 'Structured Query Language for defining, querying, and updating relational databases.',
    transaction: 'A unit of database work that should complete fully or not at all.',
    ACID: 'Transaction properties: Atomicity, Consistency, Isolation, and Durability.',
    'data warehouse': 'A large repository optimized for analysis of historical data.',
    NoSQL: 'Non-relational database approaches designed for flexibility and scale.',
    'machine learning': 'Methods that learn patterns from data to make predictions or decisions.',
    feature: 'An input variable used by a model.',
    'data cleaning': 'Preparing data by fixing errors, inconsistencies, or missing values.',
    classification: 'Predicting a category label from input data.',
    clustering: 'Grouping similar data points without predefined labels.',
    hyperparameter: 'A model setting chosen before training that influences behavior.',
    'neural network': 'A layered model that learns weighted transformations from data.',
    bias: 'Systematic skew that can affect data, models, or decisions.',
    'problem specification': 'A precise statement of the problem, constraints, inputs/outputs, and success criteria.',
    stakeholder: 'A person or group affected by, or involved in, the solution.',
    constraint: 'A limit the solution must respect (for example time, cost, legal, or hardware limits).',
    abstraction: 'Focusing on essential detail while ignoring irrelevant complexity.',
    decomposition: 'Breaking a complex problem into smaller manageable parts.',
    'pattern recognition': 'Identifying repeated structures that allow reuse of logic.',
    algorithm: 'A finite, ordered, unambiguous sequence of steps to solve a problem.',
    'trace table': 'A structured record of variable values as an algorithm executes.',
    variable: 'A named storage location whose value may change during execution.',
    'data structure': 'A way of organizing data to support efficient access and updates.',
    selection: 'Control flow that chooses between branches based on a condition.',
    iteration: 'Repeating a sequence of instructions while a condition holds.',
    'algorithm efficiency': 'How resource use (time or space) grows as input size increases.',
    recursion: 'Solving a problem by calling the same routine on a smaller instance.',
    'file processing': 'Reading, writing, and transforming data stored in files.',
    debugging: 'Identifying, isolating, and correcting defects in code.',
    class: 'A blueprint defining object attributes and behavior.',
    object: 'An instance of a class with its own state.',
    encapsulation: 'Restricting direct access to internal state through controlled interfaces.',
    inheritance: 'Defining a new class by extending an existing class.',
    polymorphism: 'Using a shared interface with type-specific behavior.',
    composition: 'Building complex objects from simpler component objects.',
    'design pattern': 'A reusable software design solution to a recurring problem.',
    'abstract data type': 'A data model defined by behavior, not by one concrete implementation.',
    'linked list': 'A node-based sequence where each node points to the next.',
    'binary search tree': 'A tree where left descendants are smaller and right descendants are larger than the parent.',
    set: 'A collection of unique elements.',
    hashing: 'Mapping a key to an index using a hash function.',
    collision: 'When different keys map to the same hash index.',
    rehashing: 'Rebuilding a hash structure, usually with larger capacity, to reduce collisions.',
    interface: 'A contract specifying available operations without fixing implementation details.',
    'success criteria': 'Measurable conditions used to judge whether a solution meets requirements.',
    'record of tasks': 'A chronological account of development work and decisions.',
    'system model': 'A representation of components, relationships, and behavior in a system.',
    'complexity evidence': 'Proof that the product includes sufficient technical challenge.',
    evaluation: 'A justified judgement of strengths, limitations, and improvements.',
    'pre-seen case study': 'The official context released before assessment for case-study examination work.',
    'challenge question': 'An assessment prompt requiring synthesis and justified decision making.',
    'technical evidence': 'Relevant technical detail used to support a claim or decision.',
    'operational constraints': 'Real-world limits such as cost, time, staffing, security, or regulation.',
    synthesis: 'Combining multiple ideas into a coherent explanation or judgement.',
    justification: 'Giving clear, evidence-based reasons for a chosen position.'
  }).map(([term, definition]) => [normalizeTermKey(term), definition])
);

const commandFromExpected = (expected, code) => {
  if (SPECIAL_TOPICS[code]) {
    return 'Apply';
  }
  const first = String(expected || '').trim().split(/\s+/)[0];
  if (!first) return 'Apply';
  const known = new Set([
    'Construct',
    'Describe',
    'Explain',
    'Trace',
    'Evaluate',
    'Discuss',
    'Compare',
    'Distinguish',
    'Outline',
    'Apply'
  ]);
  if (known.has(first)) return first;
  return 'Apply';
};

const familyFromCode = (code) => {
  if (/^Crit/i.test(code)) return 'IA';
  if (/^AO\d$/i.test(code) || /^Paper/i.test(code) || /^HL$/i.test(code) || /^Internal Assessment$/i.test(code)) return 'CASE';
  const match = String(code).toUpperCase().match(/^([AB]\d)/);
  return match ? match[1] : null;
};

const keywordDetail = (code, topic) => {
  const t = String(topic || '').toLowerCase();
  const hasWord = (pattern) => new RegExp(`\\b${pattern}\\b`, 'i').test(t);

  if (/^Crit/i.test(code))
    return 'Each criterion must be evidenced explicitly in the written solution and aligned to the official IA structure.';
  if (/^AO\d$/i.test(code) || /^Paper/i.test(code) || /^HL$/i.test(code) || /^Internal Assessment$/i.test(code))
    return 'Responses must stay case-specific and grounded in technical evidence rather than generic commentary.';

  if (code === 'B1.1.2') return 'The four concepts should remain distinct: each one solves a different part of the reasoning process.';
  if (code === 'B1.1.3')
    return 'You should be able to explain concept use in software, networking, machine learning, and databases with accurate terminology.';
  if (code === 'A1.4.2')
    return 'This includes bytecode execution models and runtime optimization pathways such as JIT, in line with mapped curriculum coverage.';
  if (code === 'A4.2.4')
    return 'Scaling and encoding transform raw data into model-ready numerical representations without changing target meaning.';
  if (code === 'B4.1.7')
    return 'Hashing maps keys to storage positions; collision handling and rehashing maintain correctness when clashes occur.';

  if (t.includes('variable')) return 'Scope, type, and update order determine whether program state remains valid during execution.';
  if (t.includes('substring')) return 'String indexing and bounds handling are essential to avoid off-by-one and range errors.';
  if (t.includes('exception')) return 'Exception handling separates normal control flow from error paths and prevents uncontrolled termination.';
  if (t.includes('debug')) return 'Debugging combines tracing, breakpoints, test data, and state inspection to isolate faults.';
  if (t.includes('stack')) return 'A stack uses Last-In First-Out access, making it suitable for nested calls and undo-style behavior.';
  if (t.includes('queue')) return 'A queue uses First-In First-Out access, supporting ordered processing and buffering.';
  if (t.includes('search')) return 'Search behavior depends on data ordering and structure, which affects both correctness and efficiency.';
  if (t.includes('sort')) return 'Sorting algorithms trade simplicity, stability, and time complexity depending on data size and distribution.';
  if (t.includes('file')) return 'File operations require careful handling of mode, structure, and error cases to preserve data integrity.';
  if (t.includes('encapsulation')) return 'Encapsulation protects object state by exposing controlled interfaces instead of raw internal data.';
  if (t.includes('inheritance')) return 'Inheritance models shared behavior across related classes while reducing duplicated logic.';
  if (t.includes('polymorphism')) return 'Polymorphism allows common interfaces with type-specific behavior at runtime.';
  if (t.includes('composition') || t.includes('aggregation'))
    return 'Composition and aggregation model has-a relationships with different ownership and lifecycle constraints.';
  if (t.includes('database')) return 'Database design decisions directly affect data consistency, query cost, and long-term maintainability.';
  if (t.includes('normal')) return 'Normalization removes redundancy and update anomalies by restructuring relations and dependencies.';
  if (t.includes('sql')) return 'SQL structure should reflect intent clearly: definition, retrieval, update, aggregation, or transaction control.';
  if (t.includes('transaction')) return 'Transaction handling protects consistency under concurrent access and failure conditions.';
  if (t.includes('cpu')) return 'Component interaction and execution flow determine throughput, latency, and practical workload suitability.';
  if (t.includes('memory')) return 'Memory hierarchy choices balance speed, persistence, and cost across different workloads.';
  if (t.includes('fetch') || t.includes('instruction cycle')) return 'Instruction-cycle stages must be understood in order, including where state is stored between stages.';
  if (t.includes('logic gate') || t.includes('truth')) return 'Boolean representation links symbolic logic to physical circuit behavior.';
  if (t.includes('operating system') || t.includes('scheduling'))
    return 'Operating-system control decisions affect responsiveness, fairness, and resource use under multi-process load.';
  if (t.includes('neural') || hasWord('ann') || hasWord('anns') || hasWord('cnn') || hasWord('cnns'))
    return 'Neural approaches rely on layered representation learning and should be matched to task structure.';
  if (t.includes('network')) return 'Network behavior should be explained across structure, addressing, transport, and security layers.';
  if (t.includes('routing')) return 'Routing choices determine path efficiency, resilience, and adaptability to topology changes.';
  if (t.includes('encryption') || t.includes('firewall') || t.includes('vulnerab'))
    return 'Security controls should be evaluated by threat coverage, operational limits, and deployment context.';
  if (t.includes('machine learning') || t.includes('classification') || t.includes('clustering'))
    return 'Model behavior must be linked to data quality, feature representation, and evaluation method.';
  if (t.includes('regression')) return 'Regression maps features to continuous outcomes and depends on fit quality and residual behavior.';
  if (t.includes('feature') || t.includes('dimensionality') || t.includes('clean'))
    return 'Preprocessing determines whether model input is informative, comparable, and robust to noise.';
  if (t.includes('genetic') || t.includes('reinforcement'))
    return 'Agent-based and evolutionary methods optimize behavior through iterative improvement under feedback.';

  return '';
};

const unitSummary = (unitName, subtopics) => {
  const labels = subtopics.map((s) => s.code).join(', ');
  return `Revise ${unitName} with exam-focused coverage of ${labels}, including exact command-term expectations and applied examples.`;
};

const coreIdea = (code, topic) => {
  const family = familyFromCode(code);
  const base = escapeInline(topic);
  const leadVariants = [
    `In this part of the unit, you need secure understanding of ${base.toLowerCase()}.`,
    `${base} is treated as applied reasoning, not only a definition.`,
    `For this syllabus point, focus on using ${base.toLowerCase()} accurately in context.`
  ];
  const lead = leadVariants[hashCode(code) % leadVariants.length];

  if (code === 'B1.1.1') {
    return 'A full problem specification defines what must be solved, under which constraints, with explicit inputs, outputs, and measurable success criteria. A complete response covers all five required components clearly and measurably.';
  }
  if (code === 'B1.1.4') {
    return 'Flowcharts represent algorithm logic visually, and tracing verifies correctness by recording variable state changes through each step.';
  }
  if (code === 'B1.1.2') {
    return 'Computational thinking concepts must remain distinct: abstraction removes non-essential detail, decomposition splits a problem into parts, pattern recognition finds reusable structure, and algorithmic design defines ordered steps.';
  }
  if (code === 'B1.1.3') {
    return 'Problem solving in computer science is the application of computational thinking concepts to domain-specific situations. Strong answers show the connection between concept and context, not just concept definitions.';
  }
  const detail = keywordDetail(code, topic);
  if (family === 'A1')
    return `${lead} Link it to hardware/system behavior, execution flow, performance, or translation.${detail ? ` ${detail}` : ''}`;
  if (family === 'A2')
    return `${lead} Connect it to communication flow, data movement, reliability, and security controls.${detail ? ` ${detail}` : ''}`;
  if (family === 'A3')
    return `${lead} Connect it to accurate data modeling, storage, querying, and consistency management.${detail ? ` ${detail}` : ''}`;
  if (family === 'A4')
    return `${lead} Connect it to machine-learning workflow, model behavior, and practical implications.${detail ? ` ${detail}` : ''}`;
  if (family === 'B1')
    return `${lead} Use it as part of computational thinking from analysis to algorithm design.${detail ? ` ${detail}` : ''}`;
  if (family === 'B2')
    return `${lead} Use it for reliable program control, data handling, and algorithmic precision.${detail ? ` ${detail}` : ''}`;
  if (family === 'B3')
    return `${lead} Use it in object-oriented design to build reusable and maintainable software.${detail ? ` ${detail}` : ''}`;
  if (family === 'B4')
    return `${lead} Use it to explain data-structure behavior, operations, and implementation trade-offs.${detail ? ` ${detail}` : ''}`;
  if (family === 'IA')
    return `${lead} Apply it within the internal-assessment cycle from planning to evaluation.${detail ? ` ${detail}` : ''}`;
  if (family === 'CASE')
    return `${lead} Apply it to case-study reasoning with technical evidence and justified decisions.${detail ? ` ${detail}` : ''}`;
  return `${base} is a required syllabus focus for this unit.${detail ? ` ${detail}` : ''}`;
};

const practiceBullets = (code, topic) => {
  const family = familyFromCode(code);
  const base = escapeInline(topic);

  if (code === 'B1.1.1') {
    return [
      'Separate the problem statement from solution details.',
      'Classify inputs by type (direct entry, manual entry, automatic/sensor entry) and outputs by type (temporary, permanent, or mechanical/electrical).',
      'State constraints concretely (for example device, cost, legal, and time constraints).',
      'Define success criteria that can be tested objectively.'
    ];
  }
  if (code === 'B1.1.2') {
    return [
      'Keep abstraction, decomposition, pattern recognition, and algorithmic design clearly distinct.',
      'Avoid the common error of defining decomposition as breaking code; it is breaking down the problem before coding.',
      'Use each concept in a matched context rather than listing terms without application.'
    ];
  }
  if (code === 'B1.1.3') {
    return [
      'Link each concept to a concrete CS context (for example software development, networking, machine learning, or databases).',
      'Use causal language: explain why a concept is used and what problem it solves.',
      'Show sequence from analysis to implementable algorithmic steps.'
    ];
  }
  if (code === 'B1.1.4') {
    return [
      'Label decision branches clearly (for example True/False).',
      'Trace loops in sequence and update variables only when assignments occur.',
      'Use a trace table that makes the final output justifiable.'
    ];
  }

  if (family === 'A1') {
    return [
      'Connect each concept to system performance, reliability, or compatibility.',
      `Use precise technical language when describing ${base.toLowerCase()}.`,
      'Distinguish role, function, and trade-off rather than memorizing labels.'
    ];
  }
  if (family === 'A2') {
    return [
      'Relate design choices to latency, reliability, and security impact.',
      'Differentiate architecture, addressing, and transmission concerns.',
      'Explain why a chosen approach fits a specific network context.'
    ];
  }
  if (family === 'A3') {
    return [
      'Model data structures before writing queries.',
      'Link schema choices to integrity, consistency, and query efficiency.',
      'Use SQL constructs that match the intended operation type.'
    ];
  }
  if (family === 'A4') {
    return [
      'Distinguish training, inference, and evaluation decisions clearly.',
      'Connect preprocessing choices to model quality and bias risk.',
      'Use technical evidence when comparing model approaches.'
    ];
  }
  if (family === 'B1') {
    return [
      'Move from ambiguity to explicit structure before implementation.',
      'Keep concept definitions distinct and context-appropriate.',
      'Show how logic can be verified, not just proposed.'
    ];
  }
  if (family === 'B2') {
    return [
      'Use clear control flow with predictable state changes.',
      'Select structures and algorithms that fit the task constraints.',
      'Validate behavior with tracing and debugging discipline.'
    ];
  }
  if (family === 'B3') {
    return [
      'Model responsibilities and relationships before coding.',
      'Use abstraction boundaries to reduce coupling.',
      'Ensure behavior is consistent with class design intent.'
    ];
  }
  if (family === 'B4') {
    return [
      'Compare structures using operation cost and access pattern.',
      'Separate interface behavior from implementation details.',
      'Explain storage and update trade-offs in context.'
    ];
  }
  if (family === 'IA') {
    return [
      'Keep requirements measurable and stakeholder-linked.',
      'Document design and implementation evidence with clear rationale.',
      'Evaluate outcomes directly against original criteria.'
    ];
  }
  if (family === 'CASE') {
    return [
      'Use case-study terminology accurately and consistently.',
      'Link claims to technical evidence rather than generic commentary.',
      'Balance feasibility, constraints, and impact in final justification.'
    ];
  }
  return [
    `Use precise terminology for ${base.toLowerCase()}.`,
    'Connect ideas to system behavior, not isolated definitions.',
    'Keep explanations bounded to mapped syllabus scope.'
  ];
};

const conciseExample = (code, topic) => {
  const family = familyFromCode(code);
  const base = escapeInline(topic);

  if (code === 'B1.1.1') {
    return `A complete problem specification for a school attendance system could look like this:\n\n| Component | Example entry |\n| --- | --- |\n| Problem statement | Teachers need faster and more accurate attendance logging in every lesson. |\n| Constraints and limitations | Must run on existing tablets, comply with school data-protection policy, and update within 2 seconds. |\n| Objectives and goals | Capture attendance reliably and provide immediate absence visibility. |\n| Input and output specification | Inputs: student ID, class, attendance mark. Outputs: attendance status list, absence alert, stored lesson record. |\n| Evaluation criteria | 100% of submitted entries are saved, retrievable, and visible to authorized staff. |`;
  }
  if (code === 'B1.1.2') {
    return `A route-planning problem can be framed through all four concepts:\n\n| Concept | Applied decision |\n| --- | --- |\n| Decomposition | Split work into map loading, path calculation, and route display. |\n| Abstraction | Ignore non-essential detail (for example building color) and keep only roads, distances, and junctions. |\n| Pattern recognition | Reuse shortest-path logic across repeated journey requests. |\n| Algorithmic design | Define exact ordered steps for choosing the next route node. |`;
  }
  if (code === 'B1.1.3') {
    return `Computational thinking concepts can be explained across domains:\n\n| CS context | Concept in use | Why it helps |\n| --- | --- | --- |\n| Software development | Decomposition | Splits large systems into manageable modules. |\n| Machine learning | Pattern recognition | Identifies repeated structure in data for prediction. |\n| Networks | Abstraction | Models traffic and security rules without every physical detail. |\n| Databases | Decomposition | Separates entities and relationships for clearer schema design. |`;
  }
  if (code === 'B1.1.4') {
    return `Common flowchart symbols you must recognize when tracing:\n\n| Symbol name | Use in the algorithm |\n| --- | --- |\n| Terminator (oval) | Start or end |\n| Input/Output (parallelogram) | Data entry or display |\n| Process (rectangle) | Calculation or assignment |\n| Decision (diamond) | Branching (for example True/False) |\n| Flowline (arrow) | Direction of control flow |\n\n\`\`\`python\nscore = 72\nif score >= 70:\n    grade = \"A\"\nelse:\n    grade = \"B\"\nprint(grade)\n\`\`\`\n\n| Step | score | condition (score >= 70) | grade | output |\n| --- | --- | --- | --- | --- |\n| 1 | 72 | True | A | A |`;
  }
  if (code === 'A1.1.3') {
    return `| Workload | Better fit | Why |\n| --- | --- | --- |\n| Word processing and system control | CPU | Low-latency branching and control logic |\n| Real-time image rendering | GPU | Thousands of parallel operations on similar data |`;
  }
  if (code === 'A1.4.1') {
    return `| Translator type | Typical behavior | Trade-off |\n| --- | --- | --- |\n| Compiler | Translates full program before execution | Slower build, faster runtime |\n| Interpreter | Translates and runs line by line | Faster iteration, slower runtime |`;
  }
  if (code === 'A1.4.2') {
    return `A cross-platform language can compile to **bytecode**, run on a **virtual machine**, then apply **JIT** to frequently used sections so runtime speed improves while portability is preserved.`;
  }
  if (code === 'A2.4.1') {
    return `A school firewall can block unauthorized inbound traffic and restrict risky outbound ports. It improves security posture, but it cannot stop all threats (for example phishing-based credential theft).`;
  }
  if (code === 'A4.4.1' || code === 'A4.4.2') {
    return `A recruitment model trained on historical hiring data may reproduce existing bias if protected groups are underrepresented. Ethical review therefore requires checking data quality, fairness metrics, and decision transparency.`;
  }

  if (code === 'B2.1.1') {
    return `\`\`\`python\nattempts = 3\nis_valid = attempts > 0\nprint(attempts, is_valid)\n\`\`\`\nVariables store typed values that can be updated and traced through program execution.`;
  }
  if (code === 'B2.4.2') {
    return `\`\`\`python\ndef linear_search(values, target):\n    for i, value in enumerate(values):\n        if value == target:\n            return i\n    return -1\n\`\`\`\nLinear search checks sequentially; binary search requires ordered data and halves the search space each step.`;
  }
  if (code === 'B2.4.3') {
    return `\`\`\`python\ndef bubble_pass(values):\n    for i in range(len(values) - 1):\n        if values[i] > values[i + 1]:\n            values[i], values[i + 1] = values[i + 1], values[i]\n\`\`\`\nEach pass moves larger elements toward the end of the list.`;
  }
  if (code === 'B2.5.1' || code === 'B2.5') {
    return `\`\`\`python\nwith open('scores.txt', 'r', encoding='utf-8') as f:\n    lines = [line.strip() for line in f]\n\`\`\`\nFile processing depends on correct read/write mode, parse logic, and error handling.`;
  }
  if (code === 'B3.1.4' || code === 'B3.2.2') {
    return `\`\`\`python\nclass User:\n    def __init__(self, name):\n        self.name = name\n\nstudent = User('Mia')\n\`\`\`\nClass definition creates a template; instantiation creates an object with state.`;
  }
  if (code === 'A3.3.1' || code === 'A3.3.2' || code === 'A3.3.4') {
    return `\`\`\`sql\nSELECT student_id, AVG(score) AS mean_score\nFROM results\nGROUP BY student_id;\n\`\`\`\nQuery structure should match the operation: selection, aggregation, and grouping.`;
  }
  if (code === 'B4.1.2' || code === 'B4.1.3') {
    return `\`\`\`text\nhead -> [12|next] -> [25|next] -> [41|null]\n\`\`\`\nLinked lists store nodes through references rather than contiguous array positions.`;
  }
  if (code === 'A4.3.1') {
    return `\`\`\`text\nprediction = b0 + b1 * x\n\`\`\`\nLinear regression estimates a continuous value by fitting a line to observed data.`;
  }
  if (code === 'B2.1.2') {
    return `\`\`\`python\nusername = 'sgs_student_2027'\ncohort = username[-4:]\nprint(cohort)\n\`\`\`\nSubstring extraction depends on correct start/end indexing and data-length checks.`;
  }
  if (code === 'B2.1.3') {
    return `\`\`\`python\ntry:\n    value = int(input_value)\nexcept ValueError:\n    value = 0\n\`\`\`\nException handling keeps control flow safe when input does not match expected format.`;
  }
  if (code === 'B2.1.4') {
    return `\`\`\`python\nprint('DEBUG total=', total)\n\`\`\`\nA targeted debug output lets you verify state at critical checkpoints.`;
  }
  if (code === 'B2.2.2') {
    return `\`\`\`python\nscores = [68, 74, 91]\nprint(scores[1])\n\`\`\`\nArray/list indexing provides direct element access when position is known.`;
  }
  if (code === 'B2.2.3') {
    return `\`\`\`python\nstack = []\nstack.append('A')\nstack.append('B')\nprint(stack.pop())  # B\n\`\`\`\nLast item inserted is the first item removed (LIFO).`;
  }
  if (code === 'B2.2.4') {
    return `\`\`\`python\nfrom collections import deque\nq = deque(['A', 'B'])\nprint(q.popleft())  # A\n\`\`\`\nFirst item inserted is the first item removed (FIFO).`;
  }
  if (code === 'B2.3.1') {
    return `\`\`\`python\nfor value in values:\n    if value > limit:\n        total += value\n\`\`\`\nSequence, selection, and iteration combine to produce controlled algorithm flow.`;
  }
  if (code === 'B3.1.5') {
    return `\`\`\`python\nclass BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance\n\`\`\`\nPrivate attributes enforce controlled access to object state.`;
  }
  if (code === 'B3.2.1') {
    return `\`\`\`python\nclass Vehicle: pass\nclass Bus(Vehicle): pass\n\`\`\`\nInheritance expresses an is-a relationship and supports behavior reuse.`;
  }
  if (code === 'B3.2.3') {
    return `\`\`\`python\nclass Shape:\n    def area(self):\n        raise NotImplementedError\n\`\`\`\nAbstraction exposes required behavior without fixing one concrete implementation.`;
  }
  if (code === 'B3.2.4') {
    return `\`\`\`python\nclass Engine: pass\nclass Car:\n    def __init__(self):\n        self.engine = Engine()\n\`\`\`\nComposition models a has-a relationship where one object owns another component.`;
  }
  if (code === 'A3.2.5') {
    return `\`\`\`text\n1NF -> remove repeating groups\n2NF -> remove partial dependency\n3NF -> remove transitive dependency\n\`\`\`\nNormalization reduces redundancy and update anomalies.`;
  }
  if (code === 'A1.2.3') {
    return `\`\`\`text\nA B | A AND B\n0 0 |   0\n0 1 |   0\n1 1 |   1\n\`\`\`\nLogic-gate behavior is defined by deterministic Boolean output rules.`;
  }
  if (code === 'A1.1.5') {
    return `\`\`\`text\nFetch -> Decode -> Execute -> (repeat)\n\`\`\`\nEach cycle stage updates register state before the next instruction is processed.`;
  }
  if (code === 'A2.3.4') {
    return `\`\`\`text\nStatic route: fixed path configured manually\nDynamic route: path updated by routing protocol\n\`\`\`\nDynamic routing adapts to topology change; static routing prioritizes predictability.`;
  }
  if (code === 'A4.2.4') {
    return `\`\`\`text\nNormalization: scale values to [0,1]\nOne-hot encoding: convert categories to binary indicator columns\n\`\`\`\nBoth steps convert heterogeneous raw data into model-compatible numeric features.`;
  }
  if (code === 'A4.3.8') {
    return `\`\`\`text\ninput -> hidden layer(s) -> output\n\`\`\`\nANNs learn weighted transformations that map features to predictions.`;
  }
  if (code === 'A4.3.10') {
    return `\`\`\`text\nModel A: higher accuracy, higher latency\nModel B: lower accuracy, lower latency\n\`\`\`\nModel selection compares performance, resource cost, and deployment constraints before final choice.`;
  }
  if (code === 'A4.3.9' || code === 'A4.3.11') {
    return `\`\`\`text\nconvolution -> activation -> pooling -> classification\n\`\`\`\nCNNs extract spatial features from image-like input hierarchically.`;
  }
  if (family === 'B2' || family === 'B3' || family === 'B4' || family === 'A3') {
    return `\`\`\`python\n# Minimal check for ${base}\nfor item in sample_data:\n    process(item)\n\`\`\`\nUse a short trace to confirm expected output for both normal and edge-case inputs.`;
  }
  if (family === 'A1' || family === 'A2' || family === 'A4') {
    return `In a real deployment, ${base.toLowerCase()} should be justified against at least one clear trade-off (for example speed vs accuracy, throughput vs latency, or security vs usability).`;
  }
  if (family === 'IA') {
    return 'A valid IA example links one stakeholder requirement to one measurable success criterion and one demonstrated product behavior.';
  }
  if (family === 'CASE') {
    return 'A valid case-study response links one challenge to concrete technical evidence and a justified strategic choice.';
  }
  return `Use a short, concrete scenario to show ${base.toLowerCase()} applied correctly with clear cause-and-effect reasoning.`;
};

const termDefinition = (term) =>
  TERM_DEFINITIONS.get(normalizeTermKey(term)) || `Definition used in this unit's syllabus context for ${term}.`;

const termsForUnit = (subtopics) => {
  const collected = [];
  for (const sub of subtopics) {
    const family = familyFromCode(sub.code);
    if (family && TERM_BANK[family]) {
      collected.push(...TERM_BANK[family]);
    }
  }
  const uniq = [...new Set(collected)].slice(0, 12);
  return uniq.map((term) => ({ term, definition: termDefinition(term) }));
};

const orderedUnits = () => {
  const units = [];
  for (const [level, max] of [
    ['sl', 12],
    ['hl', 11]
  ]) {
    for (let unitNumber = 1; unitNumber <= max; unitNumber += 1) {
      const planPath = path.join(UNIT_PLAN_ROOT, level, `unit-${unitNumber}`, 'unit-plan.njk');
      if (!fs.existsSync(planPath)) continue;
      const fm = matter(fs.readFileSync(planPath, 'utf8')).data;
      const subtopics = (fm.syllabusPoints || []).map((row) => {
        const code = String(row.code || '').trim();
        const spec = lookup.get(code) || SPECIAL_TOPICS[code] || null;
        return {
          code,
          title: spec?.topic || String(row.topic || '').trim(),
          expected: spec?.expected || '',
          command: commandFromExpected(spec?.expected || '', code),
          originalTitle: String(row.topic || '').trim()
        };
      });
      units.push({
        level,
        unitNumber,
        unitName: String(fm.unitName || `Unit ${unitNumber}`),
        subtopics
      });
    }
  }
  return units;
};

const subsectionHeadings = (code) => {
  const variants = [
    {
      requirement: 'Exam requirement',
      understanding: 'Core understanding',
      application: 'In real systems',
      example: 'Worked snapshot'
    },
    {
      requirement: 'What the command expects',
      understanding: 'Key idea',
      application: 'Applied in context',
      example: 'Quick worked example'
    },
    {
      requirement: 'Required response',
      understanding: 'What this means',
      application: 'System context',
      example: 'Compact example'
    }
  ];
  return variants[hashCode(code) % variants.length];
};

const mdForUnit = (unit) => {
  const lines = [];
  lines.push('---');
  lines.push(`level: ${unit.level}`);
  lines.push(`unitNumber: ${unit.unitNumber}`);
  lines.push(`unitName: ${unit.unitName}`);
  lines.push(`summary: ${unitSummary(unit.unitName, unit.subtopics)}`);
  lines.push('subtopics:');
  for (const topic of unit.subtopics) {
    lines.push(`  - code: ${topic.code}`);
    lines.push(`    title: ${topic.title}`);
  }
  lines.push('sourcePolicy: ib_content_md_first');
  lines.push('---');
  lines.push('');
  const terms = termsForUnit(unit.subtopics);
  if (terms.length > 0) {
    lines.push('## Key Terms and Definitions');
    lines.push('');
    lines.push('| Term | Definition |');
    lines.push('| --- | --- |');
    for (const entry of terms) {
      lines.push(`| ${escapeInline(entry.term)} | ${escapeInline(entry.definition)} |`);
    }
    lines.push('');
  }

  for (const topic of unit.subtopics) {
    const expected = topic.expected || `Apply ${topic.title.toLowerCase()} accurately in this unit context.`;
    const headings = subsectionHeadings(topic.code);
    lines.push(`## ${topic.code} ${topic.title}`);
    lines.push('');
    lines.push(`### ${headings.requirement}`);
    lines.push('');
    lines.push(`> **Command term:** ${topic.command}`);
    lines.push('>');
    lines.push(`> ${expected}`);
    lines.push('');
    lines.push(`### ${headings.understanding}`);
    lines.push('');
    lines.push(coreIdea(topic.code, topic.title));
    lines.push('');
    lines.push(`### ${headings.application}`);
    lines.push('');
    for (const bullet of practiceBullets(topic.code, topic.title)) {
      lines.push(`- ${bullet}`);
    }
    lines.push('');
    lines.push(`### ${headings.example}`);
    lines.push('');
    lines.push(conciseExample(topic.code, topic.title));
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
};

fs.mkdirSync(path.join(OUTPUT_ROOT, 'sl'), { recursive: true });
fs.mkdirSync(path.join(OUTPUT_ROOT, 'hl'), { recursive: true });

const units = orderedUnits();
let written = 0;
let skipped = 0;

for (const unit of units) {
  const outPath = path.join(OUTPUT_ROOT, unit.level, `unit-${unit.unitNumber}.md`);
  if (fs.existsSync(outPath) && !overwrite) {
    skipped += 1;
    continue;
  }

  const body = mdForUnit(unit);
  fs.writeFileSync(outPath, body, 'utf8');
  written += 1;
}

console.log(`Generated textbook entries. written=${written} skipped=${skipped} overwrite=${overwrite}`);
