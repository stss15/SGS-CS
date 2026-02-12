#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { ROOT, allTopics, resolveCanonicalTopic, sourcePolicy } from './helpers.mjs';

const BOOK_ROOT = path.join(ROOT, 'apps/site/src/content/igcse-textbooks');
const PSEUDOCODE_REQUIRED_TOPICS = new Set([7, 8]);
const MODERN_STYLE_TOPICS = new Set([1]);

const failures = [];
let checkedTopics = 0;
let checkedSubtopics = 0;

const hasHeading = (markdown, headingText) => {
  const re = new RegExp(`^${headingText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'm');
  return re.test(markdown);
};

const getSectionBody = (markdown, headingText) => {
  const needle = `${headingText}\n`;
  const start = markdown.indexOf(needle);
  if (start < 0) return '';
  const from = markdown.slice(start + needle.length);
  const nextMatch = from.match(/\n##\s+\d+\.\d+\s+/);
  return nextMatch ? from.slice(0, nextMatch.index + 1) : from;
};

for (const mappedTopic of allTopics) {
  const topic = resolveCanonicalTopic(mappedTopic);
  const filePath = path.join(BOOK_ROOT, `topic-${topic.topicNumber}.md`);

  if (!fs.existsSync(filePath)) {
    failures.push(`topic-${topic.topicNumber}: textbook markdown missing (${path.relative(ROOT, filePath)})`);
    continue;
  }

  checkedTopics += 1;
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  const frontmatter = parsed.data || {};
  const body = parsed.content || '';

  if (Number(frontmatter.topicNumber) !== topic.topicNumber) {
    failures.push(`topic-${topic.topicNumber}: frontmatter topicNumber mismatch`);
  }

  if (String(frontmatter.topicName || '').trim() !== topic.topicName) {
    failures.push(`topic-${topic.topicNumber}: frontmatter topicName mismatch`);
  }

  if (String(frontmatter.sourcePolicy || '').trim() !== sourcePolicy) {
    failures.push(`topic-${topic.topicNumber}: sourcePolicy must be ${sourcePolicy}`);
  }

  if (!/^##\s+Key Terms and Definitions\s*$/m.test(body)) {
    failures.push(`topic-${topic.topicNumber}: missing "Key Terms and Definitions" section`);
  }

  if (MODERN_STYLE_TOPICS.has(topic.topicNumber)) {
    if (/^##\s+Unit Summary\s*$/m.test(body)) {
      failures.push(`topic-${topic.topicNumber}: contains legacy "Unit Summary" section`);
    }

    if (/^##\s+Objectives and Outcomes\s*$/m.test(body)) {
      failures.push(`topic-${topic.topicNumber}: contains legacy "Objectives and Outcomes" section`);
    }
  }

  if (/language-python/i.test(body)) {
    failures.push(`topic-${topic.topicNumber}: contains disallowed language-python blocks`);
  }

  const pseudocodeCount = (body.match(/language-igcse-pseudocode/g) || []).length;
  if (PSEUDOCODE_REQUIRED_TOPICS.has(topic.topicNumber) && pseudocodeCount < 1) {
    failures.push(`topic-${topic.topicNumber}: requires at least one language-igcse-pseudocode block`);
  }

  for (const subtopic of topic.subtopics) {
    checkedSubtopics += 1;
    const heading = `## ${subtopic.code} ${subtopic.title}`;

    if (!hasHeading(body, heading)) {
      failures.push(`topic-${topic.topicNumber}: missing subtopic heading \"${heading}\"`);
      continue;
    }

    const section = getSectionBody(body, heading);
    if (!/^###\s+/m.test(section)) {
      failures.push(`topic-${topic.topicNumber} ${subtopic.code}: requires at least one level-3 section heading`);
    }
  }
}

if (failures.length > 0) {
  console.error('IGCSE textbook coverage validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`IGCSE textbook coverage validation passed. topics=${checkedTopics} subtopics=${checkedSubtopics}`);
