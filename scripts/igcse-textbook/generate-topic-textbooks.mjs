#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {
  ROOT,
  allTopics,
  ensureDir,
  escapeHtml,
  extractEvidenceLines,
  parseBooleanFlag,
  readSourceText,
  relativeToRoot,
  resolveCanonicalTopic,
  resolveDiagramAsset,
  sourceFilesForSubtopic,
  sourcePolicy
} from './helpers.mjs';
import { normalizePseudocodeAssignments } from './topic-map.mjs';

const argMap = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const token = process.argv[i];
  if (!token.startsWith('--')) continue;
  const key = token.slice(2);
  const value = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : 'true';
  argMap.set(key, value);
  if (value !== 'true') i += 1;
}

const overwrite = parseBooleanFlag(argMap.get('overwrite'), false);
const outputRoot = path.join(ROOT, 'apps/site/src/content/igcse-textbooks');
ensureDir(outputRoot);

const dedupe = (items) => {
  const out = [];
  const seen = new Set();
  for (const item of items) {
    const cleaned = String(item || '').trim();
    if (!cleaned) continue;
    const key = cleaned.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(cleaned);
  }
  return out;
};

const isReadableEvidence = (line) => {
  const value = String(line || '').trim();
  if (!value) return false;
  if (value.length < 45 || value.length > 210) return false;
  if (value.split(/\s+/).length < 8) return false;
  if (!/^[A-Z]/.test(value)) return false;
  if (/^[A-Z]\s/.test(value)) return false;
  if (/^(Write|Find|Activity|Output)\b/i.test(value)) return false;
  if (/^[a-z0-9]/.test(value)) return false;
  if (/\?$/.test(value)) return false;
  return /[.!)]$/.test(value);
};

const yamlString = (value) => JSON.stringify(String(value || ''));

const sanitizePseudocode = (source) => {
  let code = normalizePseudocodeAssignments(String(source || ''));
  code = code.replace(/\r\n?/g, '\n').replace(/\t/g, '    ');
  code = code.replace(
    /FileSize\s*←\s*Width\s*\*\s*Height\s*\*\s*ColourDepth\s*DIV\(\s*8\s*,\s*1\s*\)/g,
    'FileSize ← DIV(Width * Height * ColourDepth, 8)'
  );
  code = code
    .split('\n')
    .map((line) => line.replace(/\s+$/g, ''))
    .join('\n')
    .trim();
  return code;
};

const toCodeBlock = (pseudocode) => {
  const clean = sanitizePseudocode(pseudocode);
  return [
    '<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">',
    escapeHtml(clean),
    '</code></pre>'
  ].join('\n');
};

const buildEvidencePool = (topic, subtopic) => {
  const sourceFiles = sourceFilesForSubtopic(topic, subtopic);
  const evidence = [];

  for (const sourceFile of sourceFiles.slice(0, 2)) {
    const sourceText = readSourceText(sourceFile);
    if (!sourceText) continue;

    const lines = extractEvidenceLines(sourceText, subtopic, 5);
    if (lines.length === 0) continue;

    const readable = lines.filter(isReadableEvidence);
    if (readable.length > 0) {
      evidence.push(...readable);
    }
    break;
  }

  return dedupe(evidence).slice(0, 5);
};

const buildTopicMarkdown = (topicInput) => {
  const topic = resolveCanonicalTopic(topicInput);
  const lines = [];

  lines.push('---');
  lines.push(`topicNumber: ${topic.topicNumber}`);
  lines.push(`topicName: ${yamlString(topic.topicName)}`);
  lines.push(`summary: ${yamlString(topic.unitSummary)}`);
  lines.push('subtopics:');
  for (const subtopic of topic.subtopics) {
    lines.push(`  - code: ${yamlString(subtopic.code)}`);
    lines.push(`    title: ${yamlString(subtopic.title)}`);
  }
  lines.push(`sourcePolicy: ${sourcePolicy}`);
  lines.push('---');
  lines.push('');

  lines.push('## Unit Summary');
  lines.push('');
  lines.push(topic.unitSummary);
  lines.push('');

  if (topic.objectives?.length || topic.outcomes?.length) {
    lines.push('## Objectives and Outcomes');
    lines.push('');

    if (topic.objectives?.length) {
      lines.push('### Objectives');
      lines.push('');
      for (const objective of topic.objectives) {
        lines.push(`- ${objective}`);
      }
      lines.push('');
    }

    if (topic.outcomes?.length) {
      lines.push('### Outcomes');
      lines.push('');
      for (const outcome of topic.outcomes) {
        lines.push(`- ${outcome}`);
      }
      lines.push('');
    }
  }

  lines.push('## Key Terms and Definitions');
  lines.push('');
  lines.push('| Term | Definition |');
  lines.push('| --- | --- |');
  for (const [term, definition] of topic.keyTerms || []) {
    lines.push(`| ${term} | ${definition} |`);
  }
  lines.push('');

  if (Array.isArray(topic.notes) && topic.notes.length > 0) {
    lines.push('## Topic Mapping Notes');
    lines.push('');
    for (const note of topic.notes) {
      lines.push(`- ${note}`);
    }
    lines.push('');
  }

  for (const subtopic of topic.subtopics) {
    const evidencePool = buildEvidencePool(topic, subtopic);
    const overviewBullets = dedupe([...(subtopic.overview || []), ...evidencePool.slice(0, 3)]);
    const appliedBullets = dedupe([...(subtopic.applied || []), ...evidencePool.slice(3, 8)]);

    lines.push(`## ${subtopic.code} ${subtopic.title}`);
    lines.push('');

    lines.push('### Overview');
    lines.push('');
    for (const bullet of overviewBullets) {
      lines.push(`- ${bullet}`);
    }
    lines.push('');

    lines.push('### Applied Understanding');
    lines.push('');
    for (const bullet of appliedBullets) {
      lines.push(`- ${bullet}`);
    }
    lines.push('');

    lines.push('### Worked Example');
    lines.push('');
    lines.push(`**${subtopic.worked?.title || 'Worked routine'}**`);
    lines.push('');
    lines.push(subtopic.worked?.explanation || 'Use this pattern to test your understanding and then adapt it to exam-style tasks.');
    lines.push('');
    lines.push(toCodeBlock(subtopic.pseudocode || 'OUTPUT "Example pending"'));
    lines.push('');

    const diagram = resolveDiagramAsset(subtopic.diagram);
    if (diagram) {
      lines.push(`![${diagram.caption}](${subtopic.diagram.path})`);
      lines.push('');
      lines.push(`*${diagram.caption}*`);
      lines.push('');
    }
  }

  return `${lines.join('\n')}\n`;
};

let written = 0;
let skipped = 0;

for (const topic of allTopics) {
  const outputPath = path.join(outputRoot, `topic-${topic.topicNumber}.md`);
  if (fs.existsSync(outputPath) && !overwrite) {
    skipped += 1;
    continue;
  }

  const body = buildTopicMarkdown(topic);
  fs.writeFileSync(outputPath, body, 'utf8');
  written += 1;
}

console.log(`Generated IGCSE textbook entries. written=${written} skipped=${skipped} overwrite=${overwrite}`);
console.log(`Output directory: ${relativeToRoot(outputRoot)}`);
