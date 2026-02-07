#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const fg = require('fast-glob');

const ROOT_DIR = path.resolve(__dirname, '../..');
const DEFAULT_TARGET = path.join(ROOT_DIR, 'apps/site/dist');
const DEFAULT_LEGACY = path.join(ROOT_DIR, 'public');
const DEFAULT_PILOT = path.join(ROOT_DIR, 'meta/migration/pilot-routes.json');
const DEFAULT_WAVE2 = path.join(ROOT_DIR, 'meta/migration/wave2-routes.json');

const toPosix = (value) => value.split(path.sep).join('/');

const parseArgs = () => {
  const options = {
    target: DEFAULT_TARGET,
    legacy: DEFAULT_LEGACY,
    pilot: DEFAULT_PILOT,
    wave2: DEFAULT_WAVE2
  };

  process.argv.slice(2).forEach((arg) => {
    if (arg.startsWith('--target=')) {
      options.target = path.resolve(ROOT_DIR, arg.replace('--target=', ''));
      return;
    }

    if (arg.startsWith('--legacy=')) {
      options.legacy = path.resolve(ROOT_DIR, arg.replace('--legacy=', ''));
      return;
    }

    if (arg.startsWith('--pilot=')) {
      options.pilot = path.resolve(ROOT_DIR, arg.replace('--pilot=', ''));
      return;
    }

    if (arg.startsWith('--wave2=')) {
      options.wave2 = path.resolve(ROOT_DIR, arg.replace('--wave2=', ''));
    }
  });

  return options;
};

const routeToFilePath = (targetDir, route) => {
  const relative = route.startsWith('/') ? route.slice(1) : route;
  return path.join(targetDir, relative);
};

const routeToFallbackIndexPath = (targetDir, route) => {
  if (!route.endsWith('.html')) return null;
  const fallbackRoute = route.replace(/\.html$/, '/index.html');
  return routeToFilePath(targetDir, fallbackRoute);
};

const routeToNestedHtmlIndexPath = (targetDir, route) => {
  if (!route.endsWith('.html')) return null;
  const fallbackRoute = `${route}/index.html`;
  return routeToFilePath(targetDir, fallbackRoute);
};

const collapseHtmlDirectoryRoute = async (expectedPath) => {
  const routeStat = await fs.stat(expectedPath);
  if (!routeStat.isDirectory()) {
    return false;
  }

  const nestedIndexPath = path.join(expectedPath, 'index.html');
  if (!(await fs.pathExists(nestedIndexPath))) {
    return false;
  }

  const nestedIndexStat = await fs.stat(nestedIndexPath);
  if (!nestedIndexStat.isFile()) {
    return false;
  }

  const html = await fs.readFile(nestedIndexPath);
  await fs.remove(expectedPath);
  await fs.outputFile(expectedPath, html);
  return true;
};

const copyLegacyNonHtmlAssets = async (legacyDir, targetDir) => {
  const legacyFiles = await fg('**/*', {
    cwd: legacyDir,
    onlyFiles: true,
    dot: true
  });

  let copied = 0;
  let skipped = 0;

  for (const relativePath of legacyFiles) {
    if (relativePath.toLowerCase().endsWith('.html')) {
      continue;
    }

    const sourcePath = path.join(legacyDir, relativePath);
    const destinationPath = path.join(targetDir, relativePath);

    if (await fs.pathExists(destinationPath)) {
      skipped += 1;
      continue;
    }

    await fs.ensureDir(path.dirname(destinationPath));
    await fs.copyFile(sourcePath, destinationPath);
    copied += 1;
  }

  return { copied, skipped };
};

const run = async () => {
  const options = parseArgs();

  if (!(await fs.pathExists(options.target))) {
    console.error(`ERROR: target directory not found: ${toPosix(path.relative(ROOT_DIR, options.target))}`);
    process.exit(1);
  }

  if (!(await fs.pathExists(options.legacy))) {
    console.error(`ERROR: legacy directory not found: ${toPosix(path.relative(ROOT_DIR, options.legacy))}`);
    process.exit(1);
  }

  if (!(await fs.pathExists(options.pilot))) {
    console.error(`ERROR: pilot route file not found: ${toPosix(path.relative(ROOT_DIR, options.pilot))}`);
    process.exit(1);
  }

  const routeSet = new Set();
  const routeConfigs = [options.pilot, options.wave2];

  for (const routeConfigPath of routeConfigs) {
    if (!(await fs.pathExists(routeConfigPath))) {
      continue;
    }
    const routeConfig = await fs.readJson(routeConfigPath);
    const routes = Array.isArray(routeConfig.routes) ? routeConfig.routes : [];
    routes.forEach((route) => routeSet.add(route));
  }

  const pilotRoutes = Array.from(routeSet);
  let createdFromAstro = 0;
  let createdFromLegacy = 0;
  let skipped = 0;

  for (const route of pilotRoutes) {
    const expectedPath = routeToFilePath(options.target, route);

    if (await fs.pathExists(expectedPath)) {
      if (route.endsWith('.html') && (await collapseHtmlDirectoryRoute(expectedPath))) {
        createdFromAstro += 1;
        continue;
      }
      skipped += 1;
      continue;
    }

    const fallbackPath = routeToFallbackIndexPath(options.target, route);
    if (fallbackPath && (await fs.pathExists(fallbackPath))) {
      await fs.ensureDir(path.dirname(expectedPath));
      await fs.copyFile(fallbackPath, expectedPath);
      createdFromAstro += 1;
      continue;
    }

    const nestedHtmlFallbackPath = routeToNestedHtmlIndexPath(options.target, route);
    if (nestedHtmlFallbackPath && (await fs.pathExists(nestedHtmlFallbackPath))) {
      await fs.ensureDir(path.dirname(expectedPath));
      await fs.copyFile(nestedHtmlFallbackPath, expectedPath);
      createdFromAstro += 1;
      continue;
    }

    const legacySourcePath = routeToFilePath(options.legacy, route);
    if (!(await fs.pathExists(legacySourcePath))) {
      continue;
    }

    await fs.ensureDir(path.dirname(expectedPath));
    await fs.copyFile(legacySourcePath, expectedPath);
    createdFromLegacy += 1;
  }

  console.log(`Framework route aliasing complete.`);
  console.log(`  Created aliases from Astro outputs: ${createdFromAstro}`);
  console.log(`  Created passthrough copies from legacy: ${createdFromLegacy}`);
  console.log(`  Already present: ${skipped}`);

  const staticAssets = await copyLegacyNonHtmlAssets(options.legacy, options.target);
  console.log(`Framework static asset sync complete.`);
  console.log(`  Copied non-HTML assets from legacy: ${staticAssets.copied}`);
  console.log(`  Existing non-HTML assets preserved: ${staticAssets.skipped}`);
};

run().catch((error) => {
  console.error('Failed to alias framework html routes:', error);
  process.exit(1);
});
