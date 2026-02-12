#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {
  ROOT,
  allTopics,
  asPosix,
  ensureDir,
  extractEvidenceLines,
  readSourceText,
  relativeToRoot,
  resolveCanonicalTopic,
  sourceFilesForSubtopic,
  sourcePolicy
} from './helpers.mjs';
import { NOISE_FILES } from './topic-map.mjs';

const argMap = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const token = process.argv[i];
  if (!token.startsWith('--')) continue;
  const key = token.slice(2);
  const value = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : 'true';
  argMap.set(key, value);
  if (value !== 'true') i += 1;
}

const topicNumber = Number(argMap.get('topic'));
if (!Number.isInteger(topicNumber) || topicNumber < 1 || topicNumber > 10) {
  console.error('Usage: node scripts/igcse-textbook/build-source-map.mjs --topic <1-10>');
  process.exit(1);
}

const sourceTopic = allTopics.find((topic) => topic.topicNumber === topicNumber);
if (!sourceTopic) {
  console.error(`Topic ${topicNumber} not found in topic map.`);
  process.exit(1);
}

const topic = resolveCanonicalTopic(sourceTopic);
const outputLines = [];

outputLines.push(`# IGCSE Textbook Source Map: Topic ${topic.topicNumber} - ${topic.topicName}`);
outputLines.push('');
outputLines.push('## Scope');
outputLines.push(`- Topic: ${topic.topicNumber}`);
outputLines.push(`- Topic name: ${topic.topicName}`);
outputLines.push(`- Source policy: ${sourcePolicy}`);
outputLines.push('- Source hierarchy: chapter text files -> Cambridge syllabus -> existing SGS slides (fallback only).');
outputLines.push('');
outputLines.push('## Canonical Website Subtopics');
for (const subtopic of topic.subtopics) {
  outputLines.push(`- ${subtopic.code} ${subtopic.title}`);
}
outputLines.push('');
outputLines.push('## Mapped Source Files');
for (const sourceFile of topic.sourceFiles) {
  outputLines.push(`- ${asPosix(sourceFile)}`);
}
outputLines.push('');
outputLines.push('## Locked Noise Exclusions');
for (const noiseFile of NOISE_FILES) {
  outputLines.push(`- ${asPosix(noiseFile)}`);
}
outputLines.push('');

outputLines.push('## Evidence by Subtopic');
for (const subtopic of topic.subtopics) {
  outputLines.push(`### ${subtopic.code} ${subtopic.title}`);
  const subtopicSources = sourceFilesForSubtopic(topic, subtopic);

  let foundEvidence = false;
  for (const sourceFile of subtopicSources) {
    const text = readSourceText(sourceFile);
    if (!text) continue;

    const evidence = extractEvidenceLines(text, subtopic, 8);
    if (evidence.length === 0) continue;

    foundEvidence = true;
    outputLines.push(`- Source: \`${asPosix(sourceFile)}\``);
    outputLines.push('```text');
    outputLines.push(...evidence);
    outputLines.push('```');
  }

  if (!foundEvidence) {
    outputLines.push('- No direct evidence lines extracted. Use mapped chapter files and syllabus conventions for manual pass.');
  }

  outputLines.push('');
}

const outputDir = path.join(ROOT, 'docs/content/igcse/textbook-source-maps');
ensureDir(outputDir);
const outputPath = path.join(outputDir, `topic-${topic.topicNumber}.md`);
fs.writeFileSync(outputPath, `${outputLines.join('\n')}\n`, 'utf8');

console.log(`Wrote ${relativeToRoot(outputPath)}`);
