#!/usr/bin/env node

const http = require('http');
const path = require('path');
const fs = require('fs-extra');

const ROOT_DIR = path.resolve(__dirname, '../..');
const DEFAULT_DIST = path.join(ROOT_DIR, 'apps/site/dist');
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 4179;

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp'
};

const parseArgs = () => {
  const options = {
    dist: DEFAULT_DIST,
    host: DEFAULT_HOST,
    port: DEFAULT_PORT
  };

  process.argv.slice(2).forEach((arg) => {
    if (arg.startsWith('--dist=')) {
      options.dist = path.resolve(ROOT_DIR, arg.replace('--dist=', ''));
      return;
    }

    if (arg.startsWith('--host=')) {
      options.host = arg.replace('--host=', '').trim() || DEFAULT_HOST;
      return;
    }

    if (arg.startsWith('--port=')) {
      const parsedPort = Number(arg.replace('--port=', ''));
      if (Number.isInteger(parsedPort) && parsedPort > 0) {
        options.port = parsedPort;
      }
    }
  });

  return options;
};

const resolveStaticFilePath = (distDir, urlPathname) => {
  const decodedPath = decodeURIComponent(urlPathname.split('?')[0].split('#')[0]);
  const normalizedPath = decodedPath.replace(/\\/g, '/');
  if (normalizedPath.includes('..')) {
    return null;
  }

  let relativePath = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath;
  const candidates = [];

  if (!relativePath || relativePath.endsWith('/')) {
    candidates.push(path.join(relativePath, 'index.html'));
  } else if (!path.extname(relativePath)) {
    candidates.push(`${relativePath}.html`);
    candidates.push(path.join(relativePath, 'index.html'));
  } else {
    candidates.push(relativePath);
  }

  for (const candidate of candidates) {
    const absoluteCandidate = path.resolve(distDir, candidate);
    const distRoot = `${path.resolve(distDir)}${path.sep}`;
    if (!absoluteCandidate.startsWith(distRoot)) {
      continue;
    }

    if (fs.existsSync(absoluteCandidate) && fs.statSync(absoluteCandidate).isFile()) {
      return absoluteCandidate;
    }
  }

  return null;
};

const createStaticServer = (distDir) =>
  http.createServer((request, response) => {
    const requestPath = request.url || '/';
    const filePath = resolveStaticFilePath(distDir, requestPath);

    if (!filePath) {
      response.statusCode = 404;
      response.setHeader('Content-Type', 'text/plain; charset=utf-8');
      response.end('Not Found');
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.statusCode = 200;
    response.setHeader('Content-Type', MIME_TYPES[extension] || 'application/octet-stream');
    response.end(fs.readFileSync(filePath));
  });

const CRITICAL_ROUTE_CHECKS = [
  { path: '/index.html', requiredSelector: 'body' },
  { path: '/igcse/index.html', requiredSelector: 'body' },
  { path: '/ib/index.html', requiredSelector: 'body' },
  { path: '/ks3/index.html', requiredSelector: 'body' },
  { path: '/ib-2027/index.html', requiredSelector: 'body' },
  { path: '/ib-2027/sl/index.html', requiredSelector: 'body' },
  { path: '/ib-2027/hl/index.html', requiredSelector: 'body' }
];

const runRouteChecks = async (context, baseUrl, failures) => {
  for (const routeCheck of CRITICAL_ROUTE_CHECKS) {
    const page = await context.newPage();
    try {
      const response = await page.goto(`${baseUrl}${routeCheck.path}`, {
        waitUntil: 'domcontentloaded',
        timeout: 45000
      });

      if (!response || response.status() >= 400) {
        failures.push(`${routeCheck.path}: failed to load (status ${response ? response.status() : 'unknown'})`);
        continue;
      }

      await page.waitForSelector(routeCheck.requiredSelector, { timeout: 10000 });
    } catch (error) {
      failures.push(`${routeCheck.path}: ${error.message}`);
    } finally {
      await page.close();
    }
  }
};

const runInteractiveChecks = async (context, baseUrl, failures) => {
  const binaryAdditionPage = await context.newPage();
  try {
    await binaryAdditionPage.goto(`${baseUrl}/igcse/topic1/binary-addition-game.html`, {
      waitUntil: 'domcontentloaded',
      timeout: 45000
    });
    await binaryAdditionPage.waitForSelector('#q0', { timeout: 10000 });
    const result = await binaryAdditionPage.evaluate(() => {
      const bit = document.getElementById('q0');
      if (!bit || typeof toggleBit !== 'function') {
        return { before: '', after: '', missing: true };
      }

      const before = bit.textContent?.trim() || '';
      toggleBit(bit);
      const after = bit.textContent?.trim() || '';
      return { before, after, missing: false };
    });

    if (result.missing || result.before === result.after) {
      failures.push('/igcse/topic1/binary-addition-game.html: bit toggle did not update after click.');
    }
  } catch (error) {
    failures.push(`/igcse/topic1/binary-addition-game.html: ${error.message}`);
  } finally {
    await binaryAdditionPage.close();
  }

  const sigmaMapPage = await context.newPage();
  try {
    await sigmaMapPage.goto(`${baseUrl}/ib-2027/sl/unit-5/oop-project/level-a-player.html`, {
      waitUntil: 'domcontentloaded',
      timeout: 45000
    });
    await sigmaMapPage.waitForSelector('.show-map-btn', { timeout: 15000 });
    await sigmaMapPage.click('.show-map-btn');
    await sigmaMapPage.waitForSelector('#sigma7-map-modal.active', { timeout: 15000 });
    await sigmaMapPage.click('#map-svg-container .room.revealed[data-room]');
    await sigmaMapPage.waitForSelector('#map-room-panel.active', { timeout: 15000 });
  } catch (error) {
    failures.push(`/ib-2027/sl/unit-5/oop-project/level-a-player.html: ${error.message}`);
  } finally {
    await sigmaMapPage.close();
  }
};

const run = async () => {
  const options = parseArgs();

  if (!(await fs.pathExists(options.dist))) {
    console.error(`ERROR: dist directory not found: ${path.relative(ROOT_DIR, options.dist)}`);
    process.exit(1);
  }

  let playwright;
  try {
    playwright = require('playwright');
  } catch (error) {
    console.error('ERROR: playwright is not installed. Run `npm install` to install dependencies.');
    process.exit(1);
  }

  const server = createStaticServer(options.dist);
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(options.port, options.host, resolve);
  });

  const baseUrl = `http://${options.host}:${options.port}`;
  const failures = [];
  let browser;

  try {
    browser = await playwright.chromium.launch({
      headless: true
    });
    const context = await browser.newContext();

    await runRouteChecks(context, baseUrl, failures);
    await runInteractiveChecks(context, baseUrl, failures);
    await context.close();
  } finally {
    if (browser) {
      await browser.close();
    }
    await new Promise((resolve) => server.close(resolve));
  }

  console.log(`Framework smoke routes checked: ${CRITICAL_ROUTE_CHECKS.length}`);
  console.log('Framework smoke interactive checks: 2');

  if (failures.length > 0) {
    console.error(`Framework smoke check failures: ${failures.length}`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }

  console.log('Framework smoke checks passed.');
};

run().catch((error) => {
  console.error('Failed to run framework smoke checks:', error);
  process.exit(1);
});
