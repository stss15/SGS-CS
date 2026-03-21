#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const fg = require('fast-glob');

const ROOT_DIR = path.resolve(__dirname, '../..');
const DEFAULT_TARGET = path.join(ROOT_DIR, 'apps/site/dist');
const DEFAULT_LEGACY = path.join(ROOT_DIR, 'public');
const DEFAULT_CONTRACT_ROUTES = path.join(ROOT_DIR, 'meta/contracts/routes.json');
const DEFAULT_REPORT = path.join(ROOT_DIR, 'meta/contracts/framework-route-source-report.json');

const toPosix = (value) => value.split(path.sep).join('/');

const parseArgs = () => {
  const options = {
    target: DEFAULT_TARGET,
    legacy: DEFAULT_LEGACY,
    contracts: DEFAULT_CONTRACT_ROUTES,
    pilot: null,
    wave2: null,
    report: DEFAULT_REPORT
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

    if (arg.startsWith('--contracts=')) {
      options.contracts = path.resolve(ROOT_DIR, arg.replace('--contracts=', ''));
      return;
    }

    if (arg.startsWith('--pilot=')) {
      options.pilot = path.resolve(ROOT_DIR, arg.replace('--pilot=', ''));
      return;
    }

    if (arg.startsWith('--wave2=')) {
      options.wave2 = path.resolve(ROOT_DIR, arg.replace('--wave2=', ''));
      return;
    }

    if (arg.startsWith('--report=')) {
      options.report = path.resolve(ROOT_DIR, arg.replace('--report=', ''));
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

const AUTO_HTML_ALIAS_SEGMENTS = ['textbook', 'unit-plan'];

const discoverAstroHtmlRoutes = async (targetDir) => {
  const routes = new Set();
  const htmlSegmentIndexFiles = await fg('**/*.html/index.html', {
    cwd: targetDir,
    onlyFiles: true,
    dot: true
  });
  const aliasSegmentIndexFiles = await fg(
    `**/{${AUTO_HTML_ALIAS_SEGMENTS.join(',')}}/index.html`,
    {
      cwd: targetDir,
      onlyFiles: true,
      dot: true
    }
  );

  htmlSegmentIndexFiles.forEach((relativePath) => {
    routes.add(`/${toPosix(relativePath).replace(/\/index\.html$/i, '')}`);
  });

  aliasSegmentIndexFiles.forEach((relativePath) => {
    routes.add(`/${toPosix(relativePath).replace(/\/index\.html$/i, '.html')}`);
  });

  return routes;
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

  if (options.pilot && !(await fs.pathExists(options.pilot))) {
    console.error(`ERROR: pilot route file not found: ${toPosix(path.relative(ROOT_DIR, options.pilot))}`);
    process.exit(1);
  }

  const routeSet = new Set();
  if (await fs.pathExists(options.contracts)) {
    const contracts = await fs.readJson(options.contracts);
    const contractEntries = Array.isArray(contracts.entries) ? contracts.entries : [];
    contractEntries.forEach((entry) => {
      if (entry && typeof entry.routePath === 'string') {
        routeSet.add(entry.routePath);
      }
    });
  }

  const routeConfigs = [options.pilot, options.wave2].filter(Boolean);

  for (const routeConfigPath of routeConfigs) {
    if (!(await fs.pathExists(routeConfigPath))) {
      continue;
    }
    const routeConfig = await fs.readJson(routeConfigPath);
    const routes = Array.isArray(routeConfig.routes) ? routeConfig.routes : [];
    routes.forEach((route) => routeSet.add(route));
  }

  const discoveredRoutes = await discoverAstroHtmlRoutes(options.target);
  discoveredRoutes.forEach((route) => routeSet.add(route));

  const pilotRoutes = Array.from(routeSet);
  let createdFromAstro = 0;
  let createdFromLegacy = 0;
  let skipped = 0;
  const createdFromAstroRoutes = [];
  const createdFromLegacyRoutes = [];
  const skippedRoutes = [];
  const astroCapableRoutes = [];
  const legacyDependentRoutes = [];
  const unresolvedRoutes = [];

  for (const route of pilotRoutes) {
    const expectedPath = routeToFilePath(options.target, route);
    const fallbackPath = routeToFallbackIndexPath(options.target, route);
    const nestedHtmlFallbackPath = routeToNestedHtmlIndexPath(options.target, route);
    const legacySourcePath = routeToFilePath(options.legacy, route);
    const exactTargetExists = await fs.pathExists(expectedPath);
    const fallbackExists = fallbackPath ? await fs.pathExists(fallbackPath) : false;
    const nestedFallbackExists = nestedHtmlFallbackPath ? await fs.pathExists(nestedHtmlFallbackPath) : false;
    const legacyExists = await fs.pathExists(legacySourcePath);

    if (exactTargetExists || fallbackExists || nestedFallbackExists) {
      astroCapableRoutes.push(route);
    } else if (legacyExists) {
      legacyDependentRoutes.push(route);
    } else {
      unresolvedRoutes.push(route);
    }

    if (exactTargetExists) {
      if (route.endsWith('.html') && (await collapseHtmlDirectoryRoute(expectedPath))) {
        createdFromAstro += 1;
        createdFromAstroRoutes.push(route);
        continue;
      }
      skipped += 1;
      skippedRoutes.push(route);
      continue;
    }

    if (fallbackPath && fallbackExists) {
      await fs.ensureDir(path.dirname(expectedPath));
      await fs.copyFile(fallbackPath, expectedPath);
      createdFromAstro += 1;
      createdFromAstroRoutes.push(route);
      continue;
    }

    if (nestedHtmlFallbackPath && nestedFallbackExists) {
      await fs.ensureDir(path.dirname(expectedPath));
      await fs.copyFile(nestedHtmlFallbackPath, expectedPath);
      createdFromAstro += 1;
      createdFromAstroRoutes.push(route);
      continue;
    }

    if (!legacyExists) {
      continue;
    }

    await fs.ensureDir(path.dirname(expectedPath));
    await fs.copyFile(legacySourcePath, expectedPath);
    createdFromLegacy += 1;
    createdFromLegacyRoutes.push(route);
  }

  console.log(`Framework route aliasing complete.`);
  console.log(`  Created aliases from Astro outputs: ${createdFromAstro}`);
  console.log(`  Created passthrough copies from legacy: ${createdFromLegacy}`);
  console.log(`  Already present: ${skipped}`);

  const staticAssets = await copyLegacyNonHtmlAssets(options.legacy, options.target);
  console.log(`Framework static asset sync complete.`);
  console.log(`  Copied non-HTML assets from legacy: ${staticAssets.copied}`);
  console.log(`  Existing non-HTML assets preserved: ${staticAssets.skipped}`);

  if (options.report) {
    await fs.outputJson(
      options.report,
      {
        target: toPosix(path.relative(ROOT_DIR, options.target)),
        generatedAt: new Date().toISOString(),
        counts: {
          createdFromAstro,
          createdFromLegacy,
          skipped,
          astroCapableRoutes: astroCapableRoutes.length,
          legacyDependentRoutes: legacyDependentRoutes.length,
          unresolvedRoutes: unresolvedRoutes.length,
          copiedLegacyAssets: staticAssets.copied,
          preservedAssets: staticAssets.skipped
        },
        routes: {
          createdFromAstro: createdFromAstroRoutes.sort(),
          createdFromLegacy: createdFromLegacyRoutes.sort(),
          alreadyPresent: skippedRoutes.sort(),
          astroCapable: astroCapableRoutes.sort(),
          legacyDependent: legacyDependentRoutes.sort(),
          unresolved: unresolvedRoutes.sort()
        }
      },
      { spaces: 2 }
    );
  }
};

run().catch((error) => {
  console.error('Failed to alias framework html routes:', error);
  process.exit(1);
});
