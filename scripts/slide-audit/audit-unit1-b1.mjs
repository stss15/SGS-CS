import { appendFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

const deckFiles = [
  'src/pages/ib-2027/sl/unit-1/slides/B1.1_problem_specification.html',
  'src/pages/ib-2027/sl/unit-1/slides/B1.2_computational_thinking.html',
  'src/pages/ib-2027/sl/unit-1/slides/B1.3_flowcharts_pseudocode.html',
  'src/pages/ib-2027/sl/unit-1/slides/B1.4_algorithm_design.html'
];

const requiredCoverage = {
  'B1.1_problem_specification.html': [
    'problem specification',
    'stakeholder',
    'constraints',
    'input',
    'output',
    'evaluation criteria'
  ],
  'B1.2_computational_thinking.html': [
    'abstraction',
    'decomposition',
    'pattern recognition',
    'algorithmic thinking',
    'machine learning',
    'networks',
    'databases'
  ],
  'B1.3_flowcharts_pseudocode.html': ['flowchart', 'pseudocode', 'decision', 'branch', 'algorithm'],
  'B1.4_algorithm_design.html': ['trace', 'mod', 'div', 'debug', 'test data']
};

const bannedRegexes = {
  retrievalPractice: /Retrieval Practice/gi,
  misconceptionCheck: /Misconception Check/gi,
  keyTakeaways: /Key Takeaways/gi,
  comingUp: /Coming up:/gi,
  keywordClass: /class="[^"]*\bkeyword\b[^"]*"/gi,
  clusterLabels: /\bCluster\s+[A-Z]\b/gi,
  teacherFrameworkLabels: /\bI do\b|\bWe do\b|\bYou do\b/gi,
  worksheetHandoffHeading: /Worksheet handoff/gi,
  visibleYouDoClass: /you-do-placeholder/gi
};

const now = new Date();
const isoTime = now.toISOString();
const appendEnabled = process.argv.includes('--append');
const logPath = path.join(
  repoRoot,
  'docs/content/ib-content/slide-refactor-logs/sl-unit-1-b1.1-b1.4-refactor-log.md'
);

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

const evaluateDeck = async (relativePath) => {
  const absolutePath = path.join(repoRoot, relativePath);
  const filename = path.basename(relativePath);
  const html = await readFile(absolutePath, 'utf8');
  const lower = html.toLowerCase();

  const sectionOpen = countMatches(/<section\b/gi, html);
  const sectionClose = countMatches(/<\/section>/gi, html);
  const maxDepth = computeMaxSectionDepth(html);
  const worksheetCueCount = countMatches(/\bworksheet\b/gi, html);

  const bannedCounts = Object.fromEntries(
    Object.entries(bannedRegexes).map(([key, regex]) => [key, countMatches(regex, html)])
  );

  const coverageTerms = requiredCoverage[filename] || [];
  const missingCoverage = coverageTerms.filter((term) => !lower.includes(term));

  const checks = {
    balancedSections: sectionOpen === sectionClose,
    sectionDensity: sectionOpen >= 10 && sectionOpen <= 16,
    maxDepth: maxDepth <= 2,
    bannedText: Object.values(bannedCounts).every((count) => count === 0),
    worksheetCuesPresent: worksheetCueCount >= 2,
    footerText: html.includes('<div class="footer-text course-footer">SGS Computer Science</div>'),
    masterStylesheet: html.includes('/css/ib-2027-sl-unit1-master.css'),
    coverage: missingCoverage.length === 0
  };

  const pass = Object.values(checks).every(Boolean);

  return {
    filename,
    relativePath,
    sectionOpen,
    sectionClose,
    maxDepth,
    worksheetCueCount,
    bannedCounts,
    missingCoverage,
    checks,
    pass
  };
};

const routeSmoke = async () => {
  const { getIb2027UnitSlideRoutes } = await import(path.join(repoRoot, 'packages/content-schema/src/index.ts'));
  const routes = await getIb2027UnitSlideRoutes();
  const unit1Slides = routes
    .filter((route) => route.level === 'sl' && route.unitSegment === 'unit-1')
    .map((route) => route.slideSlug)
    .sort();

  const expected = [
    'B1.1_problem_specification',
    'B1.2_computational_thinking',
    'B1.3_flowcharts_pseudocode',
    'B1.4_algorithm_design'
  ];

  const pass = expected.every((slug) => unit1Slides.includes(slug)) && unit1Slides.length === expected.length;
  return { pass, expected, found: unit1Slides };
};

const formatRow = (name, ok) => `| ${name} | ${ok ? 'PASS' : 'FAIL'} |`;

const results = await Promise.all(deckFiles.map(evaluateDeck));
const routeResult = await routeSmoke();
const allDecksPass = results.every((result) => result.pass);
const overallPass = allDecksPass && routeResult.pass;

console.log(`Slide audit run: ${isoTime}`);
for (const result of results) {
  console.log(`\n${result.filename}`);
  console.log(`  sectionOpen=${result.sectionOpen} sectionClose=${result.sectionClose} maxDepth=${result.maxDepth}`);
  console.log(`  worksheetCueCount=${result.worksheetCueCount}`);
  console.log(`  banned=${JSON.stringify(result.bannedCounts)}`);
  if (result.missingCoverage.length) {
    console.log(`  missingCoverage=${result.missingCoverage.join(', ')}`);
  }
  console.log(`  checks=${JSON.stringify(result.checks)}`);
  console.log(`  result=${result.pass ? 'PASS' : 'FAIL'}`);
}

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
  lines.push(formatRow('All deck checks', allDecksPass));
  lines.push(formatRow('Route smoke test', routeResult.pass));
  lines.push(formatRow('Overall', overallPass));
  lines.push('');
  lines.push('| Deck | Sections | Max depth | Worksheet cues | Result |');
  lines.push('| --- | ---: | ---: | ---: | --- |');
  for (const result of results) {
    lines.push(
      `| ${result.filename} | ${result.sectionOpen} | ${result.maxDepth} | ${result.worksheetCueCount} | ${result.pass ? 'PASS' : 'FAIL'} |`
    );
  }
  lines.push('');
  lines.push(`- Route smoke found: ${routeResult.found.join(', ')}`);
  lines.push('');

  await appendFile(logPath, `${lines.join('\n')}\n`, 'utf8');
  console.log(`Appended QA snapshot to ${path.relative(repoRoot, logPath)}`);
}

if (!overallPass) {
  process.exitCode = 1;
}
