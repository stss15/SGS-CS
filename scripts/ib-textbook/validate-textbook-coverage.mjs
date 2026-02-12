#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const PLAN_ROOT = path.join(ROOT, 'src/pages/ib-2027');
const BOOK_ROOT = path.join(ROOT, 'apps/site/src/content/ib-textbooks');

const levels = [
  { level: 'sl', max: 12 },
  { level: 'hl', max: 11 }
];

const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const failures = [];
let checkedUnits = 0;
let checkedCodes = 0;

for (const { level, max } of levels) {
  for (let unit = 1; unit <= max; unit += 1) {
    const planPath = path.join(PLAN_ROOT, level, `unit-${unit}`, 'unit-plan.njk');
    if (!fs.existsSync(planPath)) continue;

    const bookPath = path.join(BOOK_ROOT, level, `unit-${unit}.md`);
    if (!fs.existsSync(bookPath)) {
      failures.push(`${level.toUpperCase()} unit-${unit}: textbook markdown missing (${path.relative(ROOT, bookPath)})`);
      continue;
    }

    checkedUnits += 1;
    const planData = matter(fs.readFileSync(planPath, 'utf8')).data;
    const codes = (planData.syllabusPoints || []).map((item) => String(item.code || '').trim()).filter(Boolean);
    checkedCodes += codes.length;

    const bookText = fs.readFileSync(bookPath, 'utf8');

    if (!/^##\s+Key Terms and Definitions\s*$/m.test(bookText)) {
      failures.push(`${level.toUpperCase()} unit-${unit}: missing "Key Terms and Definitions" section`);
    }

    if (/^##\s+Command and Outcome Map\s*$/m.test(bookText)) {
      failures.push(`${level.toUpperCase()} unit-${unit}: "Command and Outcome Map" should be removed`);
    }

    for (const code of codes) {
      const codeRe = escapeRegExp(code);
      const hasHeading = new RegExp(`^##\\s+${codeRe}\\b`, 'm').test(bookText);
      const sectionMatch = bookText.match(new RegExp(`^##\\s+${codeRe}\\b[\\s\\S]*?(?=^##\\s+|(?![\\s\\S]))`, 'm'));
      const hasCommandTerm = sectionMatch ? /\*\*Command term:\*\*/i.test(sectionMatch[0]) : false;

      if (!hasHeading) {
        failures.push(`${level.toUpperCase()} unit-${unit}: missing subtopic section heading for ${code}`);
      }
      if (!hasCommandTerm) {
        failures.push(`${level.toUpperCase()} unit-${unit}: missing explicit command term inside ${code} section`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error('IB textbook coverage validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`IB textbook coverage validation passed. units=${checkedUnits} mapped_codes=${checkedCodes}`);
