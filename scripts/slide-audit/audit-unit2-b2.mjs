import { appendFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

const deckRelativePath = 'src/pages/ib-2027/sl/unit-2/slides/B2.1_programming_fundamentals.html';
const logPath = path.join(
  repoRoot,
  'docs/content/ib-content/slide-refactor-logs/sl-unit-2-b2.1-refactor-log.md'
);

const requiredCoverage = [
  'variable',
  'type',
  'scope',
  'string',
  'slice',
  'for',
  'while',
  'try',
  'except',
  'trace',
  'debug'
];

const bannedRegexes = {
  retrievalPractice: /Retrieval Practice/gi,
  misconceptionCheck: /Misconception Check/gi,
  keyTakeaways: /Key Takeaways/gi,
  comingUp: /Coming up:/gi,
  worksheetMention: /\bworksheet\b/gi,
  activitiesMention: /\bactivities section\b/gi,
  keywordClass: /class="[^"]*\bkeyword\b[^"]*"/gi,
  clusterLabels: /\bCluster\s+[A-Z]\b/gi,
  teacherFrameworkLabels: /\bI do\b|\bWe do\b|\bYou do\b/gi
};

const appendEnabled = process.argv.includes('--append');
const isoTime = new Date().toISOString();

const countMatches = (pattern, text) => {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
};

const computeMaxSectionDepth = (html) => {
  const tagRegex = /<\/?section\b[^>]*>/gi;
  let match;
  let depth = 0;
  let maxDepth = 0;

  while ((match = tagRegex.exec(html)) !== null) {
    const tag = match[0].toLowerCase();
    if (tag.startsWith('</section')) {
      depth = Math.max(depth - 1, 0);
    } else {
      depth += 1;
      if (depth > maxDepth) {
        maxDepth = depth;
      }
    }
  }

  return maxDepth;
};

const evaluateCodeBlocks = (html) => {
  const codeBlockRegex = /<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/gi;
  let match;

  let blockCount = 0;
  let missingDataTrim = 0;
  let missingLanguage = 0;
  let tabsFound = 0;
  let tooLongLines = 0;
  let maxLineLength = 0;
  let maxLinesInBlock = 0;

  while ((match = codeBlockRegex.exec(html)) !== null) {
    blockCount += 1;
    const attrs = match[1] || '';
    const codeText = match[2] || '';

    if (!/\bdata-trim\b/i.test(attrs)) {
      missingDataTrim += 1;
    }

    if (!/\blanguage-[a-z0-9]+\b/i.test(attrs)) {
      missingLanguage += 1;
    }

    const lines = codeText.replace(/\r/g, '').split('\n');
    maxLinesInBlock = Math.max(maxLinesInBlock, lines.length);

    for (const line of lines) {
      if (line.includes('\t')) {
        tabsFound += 1;
      }
      const lineLength = line.length;
      maxLineLength = Math.max(maxLineLength, lineLength);
      if (lineLength > 88) {
        tooLongLines += 1;
      }
    }
  }

  return {
    blockCount,
    missingDataTrim,
    missingLanguage,
    tabsFound,
    tooLongLines,
    maxLineLength,
    maxLinesInBlock,
    pass:
      blockCount >= 8 &&
      missingDataTrim === 0 &&
      missingLanguage === 0 &&
      tabsFound === 0 &&
      tooLongLines === 0 &&
      maxLinesInBlock <= 14
  };
};

const evaluateDeck = async () => {
  const absolutePath = path.join(repoRoot, deckRelativePath);
  const html = await readFile(absolutePath, 'utf8');
  const lower = html.toLowerCase();

  const sectionOpen = countMatches(/<section\b/gi, html);
  const sectionClose = countMatches(/<\/section>/gi, html);
  const maxDepth = computeMaxSectionDepth(html);
  const bannedCounts = Object.fromEntries(
    Object.entries(bannedRegexes).map(([key, regex]) => [key, countMatches(regex, html)])
  );

  const missingCoverage = requiredCoverage.filter((term) => !lower.includes(term));
  const code = evaluateCodeBlocks(html);

  const checks = {
    balancedSections: sectionOpen === sectionClose,
    sectionDensity: sectionOpen >= 12 && sectionOpen <= 24,
    maxDepth: maxDepth <= 2,
    bannedText: Object.values(bannedCounts).every((count) => count === 0),
    footerText: html.includes('<div class="footer-text course-footer">SGS Computer Science</div>'),
    unit2Stylesheet: html.includes('/css/ib-2027-sl-unit2-master.css'),
    coverage: missingCoverage.length === 0,
    codeBlocks: code.pass
  };

  const pass = Object.values(checks).every(Boolean);

  return {
    sectionOpen,
    sectionClose,
    maxDepth,
    bannedCounts,
    missingCoverage,
    code,
    checks,
    pass
  };
};

const routeSmoke = async () => {
  const { getIb2027UnitSlideRoutes } = await import(path.join(repoRoot, 'packages/content-schema/src/index.ts'));
  const routes = await getIb2027UnitSlideRoutes();
  const unitSlides = routes
    .filter((route) => route.level === 'sl' && route.unitSegment === 'unit-2')
    .map((route) => route.slideSlug)
    .sort();

  const expected = ['B2.1_programming_fundamentals'];
  const pass = expected.every((slug) => unitSlides.includes(slug)) && unitSlides.length === expected.length;
  return { pass, expected, found: unitSlides };
};

const result = await evaluateDeck();
const routeResult = await routeSmoke();
const overallPass = result.pass && routeResult.pass;

console.log(`Slide audit run: ${isoTime}`);
console.log('\nB2.1_programming_fundamentals.html');
console.log(`  sectionOpen=${result.sectionOpen} sectionClose=${result.sectionClose} maxDepth=${result.maxDepth}`);
console.log(`  banned=${JSON.stringify(result.bannedCounts)}`);
if (result.missingCoverage.length) {
  console.log(`  missingCoverage=${result.missingCoverage.join(', ')}`);
}
console.log(`  code=${JSON.stringify(result.code)}`);
console.log(`  checks=${JSON.stringify(result.checks)}`);
console.log(`  result=${result.pass ? 'PASS' : 'FAIL'}`);

console.log('\nRoute smoke test');
console.log(`  expected=${routeResult.expected.join(', ')}`);
console.log(`  found=${routeResult.found.join(', ')}`);
console.log(`  result=${routeResult.pass ? 'PASS' : 'FAIL'}`);
console.log(`\nOverall=${overallPass ? 'PASS' : 'FAIL'}`);

if (appendEnabled) {
  const lines = [];
  lines.push(`\n### QA Snapshot - ${isoTime}`);
  lines.push('');
  lines.push('| Check | Result |');
  lines.push('| --- | --- |');
  lines.push(`| Deck checks | ${result.pass ? 'PASS' : 'FAIL'} |`);
  lines.push(`| Route smoke test | ${routeResult.pass ? 'PASS' : 'FAIL'} |`);
  lines.push(`| Overall | ${overallPass ? 'PASS' : 'FAIL'} |`);
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('| --- | --- |');
  lines.push(`| Sections | ${result.sectionOpen} |`);
  lines.push(`| Max section depth | ${result.maxDepth} |`);
  lines.push(`| Code blocks | ${result.code.blockCount} |`);
  lines.push(`| Max code line length | ${result.code.maxLineLength} |`);
  lines.push(`| Max lines in a code block | ${result.code.maxLinesInBlock} |`);
  lines.push('');
  lines.push(`- Route smoke found: ${routeResult.found.join(', ')}`);
  lines.push('');

  await appendFile(logPath, `${lines.join('\n')}\n`, 'utf8');
  console.log(`Appended QA snapshot to ${path.relative(repoRoot, logPath)}`);
}

if (!overallPass) {
  process.exitCode = 1;
}
