#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const parseArgs = () => {
  const options = {
    target: path.join(ROOT_DIR, 'public'),
    routes: path.join(ROOT_DIR, 'meta/contracts/routes.json'),
    assets: path.join(ROOT_DIR, 'meta/contracts/assets.json'),
    report: ''
  };

  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--target=')) {
      options.target = path.resolve(ROOT_DIR, arg.replace('--target=', ''));
      continue;
    }

    if (arg.startsWith('--routes=')) {
      options.routes = path.resolve(ROOT_DIR, arg.replace('--routes=', ''));
      continue;
    }

    if (arg.startsWith('--assets=')) {
      options.assets = path.resolve(ROOT_DIR, arg.replace('--assets=', ''));
      continue;
    }

    if (arg.startsWith('--report=')) {
      options.report = path.resolve(ROOT_DIR, arg.replace('--report=', ''));
    }
  }

  return options;
};

const readJson = async (filePath) => JSON.parse(await readFile(filePath, 'utf8'));
const resolveTargetPath = (targetDir, publicPath) => path.join(targetDir, publicPath.replace(/^\/+/, ''));

const buildMissingEntries = (entries, targetDir, pathKey) =>
  entries.filter((entry) => !existsSync(resolveTargetPath(targetDir, entry[pathKey])));

const summariseByFamily = (entries, pathKey) => {
  const grouped = new Map();

  for (const entry of entries) {
    const familyId = entry.familyId || 'root';
    const current = grouped.get(familyId) || [];
    current.push(entry[pathKey]);
    grouped.set(familyId, current);
  }

  return Array.from(grouped.entries())
    .map(([familyId, paths]) => ({
      familyId,
      missingCount: paths.length,
      samplePaths: paths.slice(0, 5)
    }))
    .sort((left, right) => right.missingCount - left.missingCount || left.familyId.localeCompare(right.familyId));
};

const formatSummary = (label, missingEntries, pathKey) => {
  if (missingEntries.length === 0) {
    return `${label}: complete`;
  }

  const grouped = summariseByFamily(missingEntries, pathKey).slice(0, 12);
  const lines = [`${label}: missing ${missingEntries.length}`];

  for (const group of grouped) {
    lines.push(`  ${group.familyId}: ${group.missingCount}`);
    for (const samplePath of group.samplePaths) {
      lines.push(`    - ${samplePath}`);
    }
  }

  return lines.join('\n');
};

const run = async () => {
  const options = parseArgs();

  if (!existsSync(options.target)) {
    throw new Error(`Target directory not found: ${path.relative(ROOT_DIR, options.target)}`);
  }

  const [routesManifest, assetsManifest] = await Promise.all([
    readJson(options.routes),
    readJson(options.assets)
  ]);

  const missingRoutes = buildMissingEntries(routesManifest.entries, options.target, 'routePath');
  const missingAssets = buildMissingEntries(assetsManifest.entries, options.target, 'assetPath');

  const report = {
    targetDir: path.relative(ROOT_DIR, options.target) || '.',
    checkedAt: new Date().toISOString(),
    routeCount: routesManifest.count,
    assetCount: assetsManifest.count,
    missingRoutes: {
      count: missingRoutes.length,
      families: summariseByFamily(missingRoutes, 'routePath')
    },
    missingAssets: {
      count: missingAssets.length,
      families: summariseByFamily(missingAssets, 'assetPath')
    }
  };

  if (options.report) {
    await mkdir(path.dirname(options.report), { recursive: true });
    await writeFile(options.report, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  }

  console.log(`Site parity target: ${report.targetDir}`);
  console.log(`Routes checked: ${report.routeCount}`);
  console.log(`Assets checked: ${report.assetCount}`);
  console.log(formatSummary('Routes', missingRoutes, 'routePath'));
  console.log(formatSummary('Assets', missingAssets, 'assetPath'));

  if (missingRoutes.length || missingAssets.length) {
    process.exitCode = 1;
    return;
  }

  console.log('Site parity check passed.');
};

run().catch((error) => {
  console.error('Failed to check site parity:', error);
  process.exit(1);
});
