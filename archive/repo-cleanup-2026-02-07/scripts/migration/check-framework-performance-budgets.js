#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');

const ROOT_DIR = path.resolve(__dirname, '../..');
const DEFAULT_DIST = path.join(ROOT_DIR, 'apps/site/dist');
const DEFAULT_BUDGETS = path.join(ROOT_DIR, 'meta/migration/performance-budgets.json');

const toPosix = (value) => value.split(path.sep).join('/');

const parseArgs = () => {
  const options = {
    dist: DEFAULT_DIST,
    budgets: DEFAULT_BUDGETS
  };

  process.argv.slice(2).forEach((arg) => {
    if (arg.startsWith('--dist=')) {
      options.dist = path.resolve(ROOT_DIR, arg.replace('--dist=', ''));
      return;
    }

    if (arg.startsWith('--budgets=')) {
      options.budgets = path.resolve(ROOT_DIR, arg.replace('--budgets=', ''));
    }
  });

  return options;
};

const isRemoteResource = (assetPath) =>
  /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(assetPath) ||
  assetPath.startsWith('/__/') ||
  assetPath.startsWith('data:') ||
  assetPath.startsWith('mailto:') ||
  assetPath.startsWith('tel:');

const resolveAssetPath = (distDir, routePath, assetPath) => {
  if (assetPath.startsWith('/')) {
    return path.join(distDir, assetPath.slice(1));
  }

  const routeRelativePath = routePath.startsWith('/') ? routePath.slice(1) : routePath;
  const routeDirectory = path.dirname(routeRelativePath);
  return path.resolve(path.join(distDir, routeDirectory), assetPath);
};

const collectLocalAssets = (html, routePath, distDir) => {
  const jsAssets = new Set();
  const cssAssets = new Set();
  const missingAssets = [];

  const scriptMatches = [...html.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi)];
  scriptMatches.forEach((match) => {
    const src = match[1].trim();
    if (!src || isRemoteResource(src)) {
      return;
    }

    const sourcePath = resolveAssetPath(distDir, routePath, src);
    if (!fs.existsSync(sourcePath)) {
      missingAssets.push(src);
      return;
    }
    jsAssets.add(sourcePath);
  });

  const stylesheetMatches = [
    ...html.matchAll(/<link\b[^>]*\brel\s*=\s*["'][^"']*stylesheet[^"']*["'][^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi)
  ];
  stylesheetMatches.forEach((match) => {
    const href = match[1].trim();
    if (!href || isRemoteResource(href)) {
      return;
    }

    const sourcePath = resolveAssetPath(distDir, routePath, href);
    if (!fs.existsSync(sourcePath)) {
      missingAssets.push(href);
      return;
    }
    cssAssets.add(sourcePath);
  });

  return {
    missingAssets,
    jsAssets: Array.from(jsAssets),
    cssAssets: Array.from(cssAssets)
  };
};

const getByteSize = (absolutePath) => fs.statSync(absolutePath).size;

const formatBytes = (sizeInBytes) => `${sizeInBytes.toLocaleString()} bytes`;

const run = async () => {
  const options = parseArgs();

  if (!(await fs.pathExists(options.dist))) {
    console.error(`ERROR: dist directory not found: ${toPosix(path.relative(ROOT_DIR, options.dist))}`);
    process.exit(1);
  }

  if (!(await fs.pathExists(options.budgets))) {
    console.error(`ERROR: budgets file not found: ${toPosix(path.relative(ROOT_DIR, options.budgets))}`);
    process.exit(1);
  }

  const budgetConfig = await fs.readJson(options.budgets);
  const routes = Array.isArray(budgetConfig.routes) ? budgetConfig.routes : [];

  if (!routes.length) {
    console.error('ERROR: no routes configured in performance budget file.');
    process.exit(1);
  }

  const failures = [];

  routes.forEach((routeBudget) => {
    const routePath = routeBudget.path;
    if (typeof routePath !== 'string' || !routePath.startsWith('/')) {
      failures.push(`Invalid route path entry: ${JSON.stringify(routeBudget)}`);
      return;
    }

    const htmlPath = path.join(options.dist, routePath.slice(1));
    if (!fs.existsSync(htmlPath)) {
      failures.push(`${routePath}: missing route file in dist (${toPosix(path.relative(ROOT_DIR, htmlPath))})`);
      return;
    }

    const html = fs.readFileSync(htmlPath, 'utf8');
    const htmlBytes = Buffer.byteLength(html, 'utf8');
    const maxHtmlBytes = Number(routeBudget.maxHtmlBytes || 0);
    if (maxHtmlBytes > 0 && htmlBytes > maxHtmlBytes) {
      failures.push(`${routePath}: html size ${formatBytes(htmlBytes)} exceeds budget ${formatBytes(maxHtmlBytes)}`);
    }

    const assets = collectLocalAssets(html, routePath, options.dist);
    if (assets.missingAssets.length > 0) {
      failures.push(
        `${routePath}: missing local assets referenced in html (${assets.missingAssets
          .slice(0, 5)
          .join(', ')}${assets.missingAssets.length > 5 ? ', ...' : ''})`
      );
    }

    const jsBytes = assets.jsAssets.reduce((total, assetPath) => total + getByteSize(assetPath), 0);
    const cssBytes = assets.cssAssets.reduce((total, assetPath) => total + getByteSize(assetPath), 0);
    const maxLocalJsBytes = Number(routeBudget.maxLocalJsBytes || 0);
    const maxLocalCssBytes = Number(routeBudget.maxLocalCssBytes || 0);

    if (maxLocalJsBytes > 0 && jsBytes > maxLocalJsBytes) {
      failures.push(
        `${routePath}: local JS payload ${formatBytes(jsBytes)} exceeds budget ${formatBytes(maxLocalJsBytes)}`
      );
    }

    if (maxLocalCssBytes > 0 && cssBytes > maxLocalCssBytes) {
      failures.push(
        `${routePath}: local CSS payload ${formatBytes(cssBytes)} exceeds budget ${formatBytes(maxLocalCssBytes)}`
      );
    }
  });

  console.log(`Performance routes checked: ${routes.length}`);

  if (failures.length > 0) {
    console.error(`Performance budget failures: ${failures.length}`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }

  console.log('Framework performance budgets passed.');
};

run().catch((error) => {
  console.error('Failed to validate framework performance budgets:', error);
  process.exit(1);
});
