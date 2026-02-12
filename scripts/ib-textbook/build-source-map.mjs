#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const IB_MD_ROOT = path.join(ROOT, 'docs/content/ib-content/IB_Content_MD');
const UNIT_PLANS_ROOT = path.join(ROOT, 'docs/content/ib-content/Unit Plans');
const OUTPUT_ROOT = path.join(ROOT, 'docs/content/ib-content/textbook-source-maps');

const argMap = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i];
  if (arg.startsWith('--')) {
    const key = arg.slice(2);
    const value = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : 'true';
    argMap.set(key, value);
    if (value !== 'true') {
      i += 1;
    }
  }
}

const level = String(argMap.get('level') || '').toLowerCase();
const unitNumber = Number(argMap.get('unit'));

if (!['sl', 'hl'].includes(level) || !Number.isInteger(unitNumber) || unitNumber < 1) {
  console.error('Usage: node scripts/ib-textbook/build-source-map.mjs --level <sl|hl> --unit <number>');
  process.exit(1);
}

const unitPlanPath = path.join(ROOT, `src/pages/ib-2027/${level}/unit-${unitNumber}/unit-plan.njk`);
if (!fs.existsSync(unitPlanPath)) {
  console.error(`Unit plan not found: ${unitPlanPath}`);
  process.exit(1);
}

const readPdfText = (pdfPath) => {
  const tmpPath = path.join(os.tmpdir(), `ib-source-${Date.now()}-${Math.random().toString(36).slice(2)}.txt`);
  execFileSync('pdftotext', ['-layout', pdfPath, tmpPath], { stdio: 'ignore' });
  const content = fs.readFileSync(tmpPath, 'utf8');
  fs.unlinkSync(tmpPath);
  return content;
};

const extractDocxText = (docxPath) => {
  try {
    return execFileSync('textutil', ['-convert', 'txt', '-stdout', docxPath], { encoding: 'utf8' });
  } catch {
    return '';
  }
};

const getUnitPlanDocx = () => {
  const levelDir = path.join(UNIT_PLANS_ROOT, level.toUpperCase());
  if (!fs.existsSync(levelDir)) return null;
  const candidates = fs.readdirSync(levelDir).filter((name) => {
    const re = new RegExp(`Unit Plan_\\s+${level.toUpperCase()} Unit ${unitNumber}\\b`, 'i');
    return re.test(name) && name.endsWith('.docx');
  });
  if (candidates.length === 0) return null;
  return path.join(levelDir, candidates[0]);
};

const getThemeKey = (code) => {
  const match = String(code).toUpperCase().match(/^([AB]\d)/);
  return match ? match[1] : null;
};

const getPdfCandidates = (code) => {
  const theme = getThemeKey(code);
  const all = [];

  if (level === 'sl') {
    all.push(path.join(IB_MD_ROOT, 'SL/IB_CS_2027_SL_Core.md.pdf'));
    if (theme === 'A1') all.push(path.join(IB_MD_ROOT, 'SL/Unit_A1_Structure_SL.md.pdf'));
    if (theme === 'A2') all.push(path.join(IB_MD_ROOT, 'SL/Unit_A2_Structure_SL.md.pdf'));
    if (theme === 'A3') all.push(path.join(IB_MD_ROOT, 'SL/Unit_A3_Structure_SL_Expanded.md.pdf'));
    if (theme === 'A4') all.push(path.join(IB_MD_ROOT, 'SL/Unit_A4_Key_Concepts_Cheatsheet.md.pdf'));
    if (theme === 'B1') all.push(path.join(IB_MD_ROOT, 'SL/Unit_B1_Structure.md.pdf'));
    if (theme === 'B2') all.push(path.join(IB_MD_ROOT, 'SL/Unit_B2_Structure_SL.md.pdf'));
    if (theme === 'B3') all.push(path.join(IB_MD_ROOT, 'SL/Unit_B3_Structure_SL.md.pdf'));
  } else {
    all.push(path.join(IB_MD_ROOT, 'HL/IB_CS_2027_HL_Extension.md.pdf'));
    if (theme === 'A1') all.push(path.join(IB_MD_ROOT, 'HL/Unit_A1_Structure_HL_Extension.md.pdf'));
    if (theme === 'A2') all.push(path.join(IB_MD_ROOT, 'HL/Unit_A2_Structure_HL_Extension.md.pdf'));
    if (theme === 'A3') all.push(path.join(IB_MD_ROOT, 'HL/Unit_A3_Structure_HL_Extension_Expanded.md.pdf'));
    if (theme === 'A4') all.push(path.join(IB_MD_ROOT, 'HL/Unit_A4_Structure_HL_Expanded.md.pdf'));
    if (theme === 'B2') all.push(path.join(IB_MD_ROOT, 'HL/Unit_B2_Structure_HL_Extension.md.pdf'));
    if (theme === 'B3') all.push(path.join(IB_MD_ROOT, 'HL/Unit_B3_Structure_HL_Extension.md.pdf'));
    if (theme === 'B4') all.push(path.join(IB_MD_ROOT, 'HL/Unit_B4_Structure_HL.md.pdf'));
  }

  return [...new Set(all)].filter((candidate) => fs.existsSync(candidate));
};

const extractCodeSnippets = (text, code) => {
  const lines = text.split(/\r?\n/);
  const matches = [];
  const codeRe = new RegExp(`\\b${code.replace(/\./g, '\\.')}\\b`, 'i');

  for (let i = 0; i < lines.length; i += 1) {
    if (!codeRe.test(lines[i])) continue;
    const start = Math.max(0, i - 5);
    const end = Math.min(lines.length, i + 9);
    const block = lines.slice(start, end).join('\n').trim();
    if (block.length > 0) {
      matches.push(block);
    }
    if (matches.length >= 2) break;
  }

  return matches;
};

const plan = matter(fs.readFileSync(unitPlanPath, 'utf8')).data;
const subtopics = (plan.syllabusPoints || []).map((row) => ({
  code: String(row.code || '').trim(),
  title: String(row.topic || '').trim()
}));

const unitPlanDocx = getUnitPlanDocx();
const unitPlanText = unitPlanDocx ? extractDocxText(unitPlanDocx) : '';

const sourceMap = [];
const sourceFilesUsed = new Set();

for (const subtopic of subtopics) {
  const pdfs = getPdfCandidates(subtopic.code);
  const perSource = [];

  for (const pdfPath of pdfs) {
    sourceFilesUsed.add(pdfPath);
    const text = readPdfText(pdfPath);
    const snippets = extractCodeSnippets(text, subtopic.code);
    if (snippets.length > 0) {
      perSource.push({ source: pdfPath, snippets });
    }
  }

  sourceMap.push({
    ...subtopic,
    evidence: perSource
  });
}

const output = [];
output.push(`# Source Map: ${level.toUpperCase()} Unit ${unitNumber} - ${plan.unitName}`);
output.push('');
output.push('## Scope');
output.push(`- Level: ${level.toUpperCase()}`);
output.push(`- Unit: ${unitNumber}`);
output.push(`- Unit name: ${plan.unitName}`);
output.push(`- Source policy: ib_content_md_first`);
output.push('- Out-of-scope rule: all non-mapped syllabus points are excluded.');
output.push('');
output.push('## Mapped Subtopics');
for (const item of subtopics) {
  output.push(`- ${item.code}: ${item.title}`);
}
output.push('');
output.push('## Source Files Used');
for (const sourceFile of [...sourceFilesUsed].sort((a, b) => a.localeCompare(b))) {
  output.push(`- ${path.relative(ROOT, sourceFile)}`);
}
if (unitPlanDocx) {
  output.push(`- ${path.relative(ROOT, unitPlanDocx)} (unit plan context)`);
}
output.push('');

output.push('## Evidence Fragments');
for (const item of sourceMap) {
  output.push(`### ${item.code} — ${item.title}`);
  if (item.evidence.length === 0) {
    output.push('- No direct code match found in selected IB_Content_MD PDFs. Use mapped unit-plan wording and bounded chapter references if needed.');
    output.push('');
    continue;
  }

  for (const source of item.evidence) {
    output.push(`- Source: \`${path.relative(ROOT, source.source)}\``);
    for (const snippet of source.snippets) {
      output.push('```text');
      output.push(snippet);
      output.push('```');
    }
  }
  output.push('');
}

if (unitPlanText.trim().length > 0) {
  output.push('## Unit Plan Extract (Context)');
  output.push('```text');
  output.push(unitPlanText.slice(0, 5000).trim());
  output.push('```');
}

fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
const outputPath = path.join(OUTPUT_ROOT, `${level}-unit-${unitNumber}.md`);
fs.writeFileSync(outputPath, `${output.join('\n')}\n`, 'utf8');
console.log(`Wrote ${path.relative(ROOT, outputPath)}`);
