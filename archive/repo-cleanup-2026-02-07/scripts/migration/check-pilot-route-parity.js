#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const fg = require('fast-glob');

const ROOT_DIR = path.resolve(__dirname, '../..');
const DEFAULT_BASELINE = path.join(ROOT_DIR, 'meta/migration/legacy-route-baseline.json');
const DEFAULT_PILOT = path.join(ROOT_DIR, 'meta/migration/pilot-routes.json');
const DEFAULT_TARGET = path.join(ROOT_DIR, 'public-next');

const toPosix = (value) => value.split(path.sep).join('/');

const parseArgs = () => {
  const options = {
    baseline: DEFAULT_BASELINE,
    pilot: DEFAULT_PILOT,
    target: DEFAULT_TARGET
  };

  process.argv.slice(2).forEach((arg) => {
    if (arg.startsWith('--baseline=')) {
      options.baseline = path.resolve(ROOT_DIR, arg.replace('--baseline=', ''));
      return;
    }

    if (arg.startsWith('--pilot=')) {
      options.pilot = path.resolve(ROOT_DIR, arg.replace('--pilot=', ''));
      return;
    }

    if (arg.startsWith('--target=')) {
      options.target = path.resolve(ROOT_DIR, arg.replace('--target=', ''));
    }
  });

  return options;
};

const htmlFileToRoute = (targetDir, absolutePath) => {
  const relative = toPosix(path.relative(targetDir, absolutePath));
  return `/${relative}`;
};

const run = async () => {
  const options = parseArgs();

  if (!(await fs.pathExists(options.baseline))) {
    console.error(`ERROR: baseline file not found: ${toPosix(path.relative(ROOT_DIR, options.baseline))}`);
    process.exit(1);
  }

  if (!(await fs.pathExists(options.pilot))) {
    console.error(`ERROR: pilot route file not found: ${toPosix(path.relative(ROOT_DIR, options.pilot))}`);
    process.exit(1);
  }

  if (!(await fs.pathExists(options.target))) {
    console.error(`ERROR: target directory not found: ${toPosix(path.relative(ROOT_DIR, options.target))}`);
    process.exit(1);
  }

  const baseline = await fs.readJson(options.baseline);
  const baselineRoutes = new Set((baseline.routes && baseline.routes.htmlPaths) || []);

  const pilotConfig = await fs.readJson(options.pilot);
  const pilotRoutes = Array.isArray(pilotConfig.routes) ? pilotConfig.routes : [];

  if (pilotRoutes.length === 0) {
    console.error('ERROR: pilot route file has no routes.');
    process.exit(1);
  }

  const unknownPilotRoutes = pilotRoutes.filter((route) => !baselineRoutes.has(route));
  if (unknownPilotRoutes.length > 0) {
    console.error('ERROR: pilot routes missing from baseline definition:');
    unknownPilotRoutes.forEach((route) => console.error(`  - ${route}`));
    process.exit(1);
  }

  const targetHtmlFiles = (await fg('**/*.html', { cwd: options.target, absolute: true })).sort();
  const actualRoutes = new Set(targetHtmlFiles.map((filePath) => htmlFileToRoute(options.target, filePath)));

  const missing = pilotRoutes.filter((route) => !actualRoutes.has(route));

  console.log(`Pilot routes configured: ${pilotRoutes.length}`);
  console.log(`Target html routes:      ${actualRoutes.size}`);
  console.log(`Missing pilot routes:    ${missing.length}`);

  if (missing.length > 0) {
    console.error('\nMissing pilot route(s):');
    missing.forEach((route) => console.error(`  - ${route}`));
    process.exit(1);
  }

  console.log('\nPilot route parity check passed.');
};

run().catch((error) => {
  console.error('Failed to run pilot route parity check:', error);
  process.exit(1);
});
