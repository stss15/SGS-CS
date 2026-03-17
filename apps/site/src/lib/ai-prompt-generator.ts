export type PromptTypeId = 'planning' | 'feedback' | 'spag' | 'viva';

export interface PromptTypeConfig {
  label: string;
  helper: string;
}

export interface PromptInput {
  type: PromptTypeId;
  subject: string;
  taskType: string;
  work: string;
}

export interface GuideRequestRow {
  safe: string;
  unsafe: string;
}

export interface GuideContent {
  intro: string;
  purpose: string;
  doUseAiFor: string[];
  doNotUseAiFor: string[];
  beforeYouUsePrompt: string[];
  requestPairs: GuideRequestRow[];
  finalReminderTitle: string;
  finalReminder: string[];
}

export const DEFAULT_PROMPT_TYPE: PromptTypeId = 'feedback';

export const PROMPT_TYPE_ORDER: PromptTypeId[] = ['planning', 'feedback', 'spag', 'viva'];

export const PROMPT_TYPES: Record<PromptTypeId, PromptTypeConfig> = {
  planning: {
    label: 'Planning and narrowing',
    helper: 'Use this when you already have ideas and need help organising or narrowing them.'
  },
  feedback: {
    label: 'Draft feedback',
    helper: 'Use this when you want issues identified in your own draft without rewriting.'
  },
  spag: {
    label: 'SPAG diagnosis',
    helper: 'Use this when you want grammar, spelling, punctuation, and clarity issues flagged only.'
  },
  viva: {
    label: 'Viva preparation',
    helper: 'Use this when you want questions that test whether you can explain your own choices.'
  }
};

export const CONTEXT_STAGE_BY_TYPE: Record<PromptTypeId, string> = {
  planning: 'planning',
  feedback: 'in progress',
  spag: 'in progress',
  viva: 'in progress'
};

export const PLACEHOLDERS: Record<PromptTypeId, string> = {
  planning:
    'Paste your rough notes, bullet points, possible direction, and questions here. Keep it to the section you actually want help with.',
  feedback:
    'Paste the section of your draft you want checked. Do not paste the whole assignment unless you genuinely need the whole thing reviewed.',
  spag: 'Paste the paragraph or section you want checked for grammar, spelling, punctuation, and clarity.',
  viva: 'Paste the section you want to practise explaining and defending.'
};

export const GUIDE_CONTENT: GuideContent = {
  intro: 'Use AI to support your work without outsourcing your thinking.',
  purpose:
    'These prompts are designed to help you use AI safely while keeping full ownership of your coursework, decisions, and wording.',
  doUseAiFor: [
    'planning your own next steps',
    'checking whether your explanation is clear',
    'flagging unsupported claims or weak links',
    'diagnosing SPAG issues without rewriting',
    'testing whether you can explain your choices aloud'
  ],
  doNotUseAiFor: [
    'rewriting your paragraphs or sentences',
    'adding arguments, examples, or angles you did not think of',
    'making your work sound more academic than you can explain',
    'producing text you could submit',
    'hiding how much of the thinking came from AI'
  ],
  beforeYouUsePrompt: [
    'Paste only the part of your work you actually want feedback on.',
    'Be honest about whether you are still planning or already writing.',
    'Keep a record of what help you asked for if your course requires AI use to be declared.',
    'Do not keep pushing the model until it gives you wording you can copy.',
    'If the response feels too polished, too advanced, or not really yours, stop using it.'
  ],
  requestPairs: [
    {
      safe: 'Can you point out which paragraph is unclear and ask me a question about it?',
      unsafe: 'Can you rewrite this paragraph so it sounds more academic?'
    },
    {
      safe: 'Can you show me where my claim is unsupported?',
      unsafe: 'Can you suggest a stronger argument I could use here?'
    },
    {
      safe: 'Can you identify grammar issues without correcting them?',
      unsafe: 'Can you fix the grammar and improve the flow?'
    },
    {
      safe: 'Can you ask me viva questions about this section?',
      unsafe: 'Can you give me ideal answers to possible viva questions?'
    },
    {
      safe: 'Can you help me compare the ideas I have already listed?',
      unsafe: 'Can you give me three better ideas to use instead?'
    }
  ],
  finalReminderTitle: 'You are responsible for what you submit.',
  finalReminder: [
    'AI can help you reflect, organise, and check. It must not become the hidden author of your work.',
    'You should still be able to explain every decision, every argument, and every key phrase in your own words.',
    'If your prompt or the AI response starts doing the thinking for you, stop and reset.'
  ]
};

export const LOCAL_ONLY_NOTE =
  'Runs entirely in this browser tab. What you paste is not sent, saved, or stored in cookies or local storage.';

const SHARED_INSTRUCTION = 'If there is not enough information, ask brief clarifying questions instead of guessing.';

export const isPromptTypeId = (value: string): value is PromptTypeId =>
  Object.hasOwn(PROMPT_TYPES, value);

export const getContextStage = (type: PromptTypeId): string => CONTEXT_STAGE_BY_TYPE[type];

const buildContextLine = ({
  type,
  subject,
  taskType
}: Pick<PromptInput, 'type' | 'subject' | 'taskType'>): string =>
  `I am an IB or BTEC student aged 16-18 working on ${subject || '[subject + course]'} for ${taskType || '[task type]'}. My current stage is ${getContextStage(type)}. Keep all feedback suitable for this level. Do not make it childish, and do not move beyond upper-secondary level into undergraduate-level concepts, phrasing, or expectations unless I have already used them myself.`;

export const buildPrompt = ({ type, subject, taskType, work }: PromptInput): string => {
  const contextLine = buildContextLine({ type, subject, taskType });

  if (type === 'planning') {
    return `ROLE:
Act as a planning coach for academic work. Support my thinking process without generating ideas for me.

CONTEXT:
${contextLine} I need help turning my own rough thoughts into a plan I can explain and defend myself.

MY CURRENT IDEAS:
${work || '[Paste your rough notes, bullet points, possible direction, and questions here.]'}

OUTCOME:
Help me organise, narrow, and test my own ideas. I want to leave with a clearer plan, not with AI-generated content.

NON-NEGOTIABLE CONSTRAINTS:
Do not invent topic ideas for me from scratch.
Do not suggest new arguments, themes, case studies, or angles unless they already appear in my notes.
Do not produce a thesis statement for me.
Do not produce research questions for me unless I first draft my own attempts.
Do not choose the best idea for me.
Do not create an outline I could directly submit.
Do not give me content to copy into my coursework.
${SHARED_INSTRUCTION}

ALLOWED HELP:
You may:
- ask me narrowing questions
- compare the ideas I have already listed
- point out where one idea seems too broad, too vague, too descriptive, or too difficult
- help me identify what I already seem most interested in
- help me turn my own notes into a decision structure
- help me spot practical issues such as scope, access to evidence, feasibility, and clarity

RESPONSE FORMAT:
A. List the ideas I already mentioned in neutral language only.
B. For each idea, give:
   - scope risk
   - evidence or research risk
   - clarity risk
   - feasibility risk
C. Ask me 5 narrowing questions based only on my own notes.
D. Suggest a planning structure using placeholders only, not filled content.
E. Do not add any new content knowledge or new angles.

REFUSAL RULE:
If I ask you to give me a research question, argument, or angle directly, refuse and instead ask me to draft 2 or 3 of my own attempts first.

SELF-CHECK:
Do not output any idea that did not come from me first.
Do not output any sentence that could function as part of my final coursework.`;
  }

  if (type === 'feedback') {
    return `ROLE:
Act as an academic integrity feedback checker. Identify issues in my draft without rewriting it or adding new content.

CONTEXT:
${contextLine} I need help spotting problems while keeping full ownership of the writing, argument, and ideas.

TASK:
Read my draft and identify problems only. Do not fix them for me.

MY DRAFT:
${work || '[Paste draft here]'}

NON-NEGOTIABLE CONSTRAINTS:
Do not rewrite any sentence.
Do not rewrite any paragraph.
Do not provide an improved version.
Do not suggest better phrasing.
Do not make it sound more academic.
Do not add evidence, examples, theory, interpretations, counterarguments, or angles.
Do not tell me what to say instead.
Do not produce a model paragraph, model introduction, model conclusion, or model topic sentence.
Do not complete missing sections for me.
${SHARED_INSTRUCTION}

ALLOWED HELP:
You may:
- identify where something is unclear
- identify where reasoning jumps too quickly
- identify where a claim seems unsupported
- identify repetition
- identify where the paragraph focus is muddled
- identify where the structure does not flow logically
- identify where analysis becomes descriptive
- identify where I may struggle to explain my thinking in a viva or discussion

RESPONSE FORMAT:
1. Give a one-sentence overview of the main strengths and risks.
2. Create a table with these columns:
   - Location
   - Issue type
   - What the problem is
   - Why it matters
   - Question for me to answer
3. Allowed issue types:
   - unclear claim
   - weak link
   - unsupported point
   - over-description
   - repetition
   - structure problem
   - unclear terminology
   - off-task section
   - explain-this-better
4. In the Question for me to answer column, ask a question instead of giving a solution.
5. End with:
   - 3 places I should explain aloud to test authorship
   - 3 questions a teacher might ask me about my own reasoning

REFUSAL RULE:
If I ask you to show me how to rewrite any section, refuse and instead identify the issue and ask me a question I must answer myself.

SELF-CHECK:
Remove any sentence that could be copied into my submission.
Remove any new idea that did not appear in my original draft.`;
  }

  if (type === 'spag') {
    return `ROLE:
Act as a SPAG diagnostic checker only. Identify language issues without correcting them.

CONTEXT:
${contextLine} I want to improve grammar, spelling, punctuation, sentence control, and clarity without having any wording rewritten for me.

TEXT:
${work || '[Paste text here]'}

NON-NEGOTIABLE CONSTRAINTS:
Do not rewrite anything.
Do not provide corrected sentences.
Do not suggest replacement words.
Do not improve my style, tone, or register.
Do not combine or split sentences for me.
Do not make my writing more formal or academic.
Do not change wording even if it sounds awkward.
Only diagnose.
${SHARED_INSTRUCTION}

ALLOWED HELP:
You may:
- identify spelling issues
- identify punctuation issues
- identify grammar issues
- identify sentence-boundary issues
- identify agreement problems
- identify pronoun-reference problems
- identify awkward or confusing phrasing
- identify overly long or hard-to-follow sentences
- identify repetition at word or phrase level

RESPONSE FORMAT:
For each issue, use this structure only:
- Location: [sentence number / paragraph number / quoted short fragment]
- Issue category: [spelling / punctuation / grammar / sentence clarity / repetition / word form / agreement / reference]
- What seems wrong: [brief diagnosis only]
- Why it may confuse the reader: [brief explanation only]

Then finish with:
- Top 3 recurring patterns I need to look for myself
- 3 self-editing checks I should apply before resubmitting

REFUSAL RULE:
If I ask you to correct the sentences, refuse and remind me that you can only diagnose the issue, not repair the wording.

SELF-CHECK:
Do not output corrected wording.
Do not output an improved sentence.
Do not output a polished version of any phrase from my text.`;
  }

  return `ROLE:
Act as a viva preparation coach. Test whether I can explain my own thinking clearly.

CONTEXT:
${contextLine} I have written this work myself and I need to be able to explain and defend it in discussion with a teacher.

WORK OR EXCERPT:
${work || '[Paste section here]'}

NON-NEGOTIABLE CONSTRAINTS:
Do not improve the writing.
Do not suggest better arguments.
Do not provide ideal answers for me to memorise.
Do not put words in my mouth.
Only ask questions and identify places where I may struggle to explain myself.
${SHARED_INSTRUCTION}

OUTCOME:
Help me discover whether I really understand what I wrote.

RESPONSE FORMAT:
1. Ask me 8 short viva-style questions about:
   - why I chose this focus
   - what I meant by specific terms
   - why I included specific evidence or examples
   - how one paragraph links to the next
   - what my reasoning is at key points
2. Then list:
   - 3 places where I may not fully understand my own wording
   - 3 places where I should be ready to justify a decision
3. Do not answer the questions for me.

SELF-CHECK:
Do not provide model answers.
Do not provide a script.
Do not add any argument not already present in my work.`;
};

export const qualityChecks = ({ subject, taskType, work, type }: PromptInput): string[] => {
  const checks: string[] = [];

  if (!subject.trim()) {
    checks.push("Add the subject and course, for example 'IB Biology HL' or 'BTEC Business'.");
  }

  if (!taskType.trim()) {
    checks.push("Add the task type, for example 'IA', 'EE', 'essay', or 'report'.");
  }

  if (!work.trim()) {
    checks.push('Paste the section you want help with. The generator is only as good as the material you give it.');
  }

  const length = work.trim().length;

  if (type === 'planning' && length > 0 && length < 60) {
    checks.push('Your planning notes are very short. Add a few bullet points or questions of your own first.');
  }

  if ((type === 'feedback' || type === 'spag' || type === 'viva') && length > 0 && length < 120) {
    checks.push('This extract may be too short for useful feedback. Paste a full paragraph or a short section.');
  }

  if (length > 5000) {
    checks.push('This is quite long. In most cases, paste only the section you actually want checked.');
  }

  return checks;
};
