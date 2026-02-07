#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');

const ROOT_DIR = path.resolve(__dirname, '../..');
const DEFAULT_LEGACY = path.join(ROOT_DIR, 'public');
const DEFAULT_FRAMEWORK = path.join(ROOT_DIR, 'apps/site/dist');
const DEFAULT_EXPECTATIONS = path.join(ROOT_DIR, 'meta/migration/pilot-content-expectations.json');

const toPosix = (value) => value.split(path.sep).join('/');

const parseArgs = () => {
  const options = {
    legacy: DEFAULT_LEGACY,
    framework: DEFAULT_FRAMEWORK,
    expectations: DEFAULT_EXPECTATIONS
  };

  process.argv.slice(2).forEach((arg) => {
    if (arg.startsWith('--legacy=')) {
      options.legacy = path.resolve(ROOT_DIR, arg.replace('--legacy=', ''));
      return;
    }

    if (arg.startsWith('--framework=')) {
      options.framework = path.resolve(ROOT_DIR, arg.replace('--framework=', ''));
      return;
    }

    if (arg.startsWith('--expectations=')) {
      options.expectations = path.resolve(ROOT_DIR, arg.replace('--expectations=', ''));
    }
  });

  return options;
};

const routeToPath = (rootDir, route) => {
  const relative = route.startsWith('/') ? route.slice(1) : route;
  return path.join(rootDir, relative);
};

const getTitle = (html) => {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match ? match[1].trim() : null;
};

const decodeHtmlEntities = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const collectMissing = (html, expected, mode) => {
  const missing = [];
  const normalizedHtml = mode.includes('text') ? decodeHtmlEntities(html) : html;

  expected.forEach((value) => {
    const normalizedValue = mode.includes('text') ? decodeHtmlEntities(value) : value;
    if (!normalizedHtml.includes(normalizedValue)) {
      missing.push({ mode, value });
    }
  });
  return missing;
};

const run = async () => {
  const options = parseArgs();

  if (!(await fs.pathExists(options.legacy))) {
    console.error(`ERROR: legacy directory not found: ${toPosix(path.relative(ROOT_DIR, options.legacy))}`);
    process.exit(1);
  }

  if (!(await fs.pathExists(options.framework))) {
    console.error(`ERROR: framework directory not found: ${toPosix(path.relative(ROOT_DIR, options.framework))}`);
    process.exit(1);
  }

  if (!(await fs.pathExists(options.expectations))) {
    console.error(`ERROR: expectations file not found: ${toPosix(path.relative(ROOT_DIR, options.expectations))}`);
    process.exit(1);
  }

  const config = await fs.readJson(options.expectations);
  const routes = Object.entries(config.routes || {});

  if (routes.length === 0) {
    console.error('ERROR: no routes configured in pilot content expectations.');
    process.exit(1);
  }

  const failures = [];

  for (const [route, expectations] of routes) {
    const legacyPath = routeToPath(options.legacy, route);
    const frameworkPath = routeToPath(options.framework, route);

    if (!(await fs.pathExists(legacyPath))) {
      failures.push({ route, issue: `legacy file missing: ${toPosix(path.relative(ROOT_DIR, legacyPath))}` });
      continue;
    }

    if (!(await fs.pathExists(frameworkPath))) {
      failures.push({ route, issue: `framework file missing: ${toPosix(path.relative(ROOT_DIR, frameworkPath))}` });
      continue;
    }

    const legacyHtml = await fs.readFile(legacyPath, 'utf8');
    const frameworkHtml = await fs.readFile(frameworkPath, 'utf8');

    const legacyTitle = getTitle(legacyHtml);
    const frameworkTitle = getTitle(frameworkHtml);
    if (legacyTitle && frameworkTitle && decodeHtmlEntities(legacyTitle) !== decodeHtmlEntities(frameworkTitle)) {
      failures.push({ route, issue: `title mismatch (legacy: "${legacyTitle}" vs framework: "${frameworkTitle}")` });
    }

    const mustContainText = Array.isArray(expectations.mustContainText) ? expectations.mustContainText : [];
    const mustContainLinks = Array.isArray(expectations.mustContainLinks) ? expectations.mustContainLinks : [];

    const legacyMissingText = collectMissing(legacyHtml, mustContainText, 'legacy text');
    const frameworkMissingText = collectMissing(frameworkHtml, mustContainText, 'framework text');
    const legacyMissingLinks = collectMissing(legacyHtml, mustContainLinks, 'legacy link');
    const frameworkMissingLinks = collectMissing(frameworkHtml, mustContainLinks, 'framework link');

    [...legacyMissingText, ...legacyMissingLinks].forEach((failure) => {
      failures.push({ route, issue: `expectation missing in ${failure.mode}: ${failure.value}` });
    });

    [...frameworkMissingText, ...frameworkMissingLinks].forEach((failure) => {
      failures.push({ route, issue: `expectation missing in ${failure.mode}: ${failure.value}` });
    });
  }

  console.log(`Pilot routes checked: ${routes.length}`);

  if (failures.length > 0) {
    console.error(`Content parity failures: ${failures.length}`);
    failures.forEach((failure) => {
      console.error(`- ${failure.route}: ${failure.issue}`);
    });
    process.exit(1);
  }

  console.log('Pilot content parity check passed.');
};

run().catch((error) => {
  console.error('Failed to run pilot content parity check:', error);
  process.exit(1);
});
