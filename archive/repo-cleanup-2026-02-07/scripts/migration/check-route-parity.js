#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const fg = require('fast-glob');

const ROOT_DIR = path.resolve(__dirname, '../..');
const DEFAULT_BASELINE = path.join(ROOT_DIR, 'meta/migration/legacy-route-baseline.json');
const DEFAULT_TARGET = path.join(ROOT_DIR, 'public-next');

const toPosix = (value) => value.split(path.sep).join('/');

const parseArgs = () => {
    const args = process.argv.slice(2);
    const options = {
        baseline: DEFAULT_BASELINE,
        target: DEFAULT_TARGET,
        allowExtra: false
    };

    args.forEach((arg) => {
        if (arg.startsWith('--baseline=')) {
            options.baseline = path.resolve(ROOT_DIR, arg.replace('--baseline=', ''));
            return;
        }
        if (arg.startsWith('--target=')) {
            options.target = path.resolve(ROOT_DIR, arg.replace('--target=', ''));
            return;
        }
        if (arg === '--allow-extra') {
            options.allowExtra = true;
        }
    });

    return options;
};

const htmlFileToRoute = (publicDir, absolutePath) => {
    const relative = toPosix(path.relative(publicDir, absolutePath));
    return `/${relative}`;
};

const take = (items, max = 40) => items.slice(0, max);

const run = async () => {
    const options = parseArgs();

    if (!(await fs.pathExists(options.baseline))) {
        console.error(`ERROR: baseline file not found: ${toPosix(path.relative(ROOT_DIR, options.baseline))}`);
        console.error('Run `npm run migration:baseline-routes` first.');
        process.exit(1);
    }

    if (!(await fs.pathExists(options.target))) {
        console.error(`ERROR: target directory not found: ${toPosix(path.relative(ROOT_DIR, options.target))}`);
        process.exit(1);
    }

    const baseline = await fs.readJson(options.baseline);
    const expectedRoutes = new Set((baseline.routes && baseline.routes.htmlPaths) || []);

    const targetHtmlFiles = (await fg('**/*.html', { cwd: options.target, absolute: true })).sort();
    const actualRoutes = new Set(targetHtmlFiles.map((filePath) => htmlFileToRoute(options.target, filePath)));

    const missing = Array.from(expectedRoutes).filter((route) => !actualRoutes.has(route)).sort();
    const extra = Array.from(actualRoutes).filter((route) => !expectedRoutes.has(route)).sort();

    console.log(`Baseline routes: ${expectedRoutes.size}`);
    console.log(`Target routes:   ${actualRoutes.size}`);
    console.log(`Missing routes:  ${missing.length}`);
    console.log(`Extra routes:    ${extra.length}`);

    if (missing.length > 0) {
        console.error('\nMissing route(s):');
        take(missing).forEach((route) => console.error(`  - ${route}`));
        if (missing.length > 40) {
            console.error(`  - ... ${missing.length - 40} more`);
        }
    }

    if (extra.length > 0 && !options.allowExtra) {
        console.error('\nUnexpected extra route(s):');
        take(extra).forEach((route) => console.error(`  - ${route}`));
        if (extra.length > 40) {
            console.error(`  - ... ${extra.length - 40} more`);
        }
    }

    if (missing.length > 0 || (extra.length > 0 && !options.allowExtra)) {
        process.exit(1);
    }

    console.log('\nRoute parity check passed.');
};

run().catch((error) => {
    console.error('Failed to run route parity check:', error);
    process.exit(1);
});
