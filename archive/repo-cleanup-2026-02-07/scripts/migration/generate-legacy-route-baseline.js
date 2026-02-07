#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const fg = require('fast-glob');

const ROOT_DIR = path.resolve(__dirname, '../..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const MANIFEST_PATH = path.join(ROOT_DIR, 'meta/site-manifest.json');
const OUTPUT_PATH = path.join(ROOT_DIR, 'meta/migration/legacy-route-baseline.json');

const toPosix = (value) => value.split(path.sep).join('/');

const htmlFileToRoute = (absolutePath) => {
    const relative = toPosix(path.relative(PUBLIC_DIR, absolutePath));
    return `/${relative}`;
};

const toPrettyRoute = (route) => {
    if (route === '/index.html') return '/';
    if (route.endsWith('/index.html')) {
        return route.slice(0, -'index.html'.length);
    }
    return route;
};

const readManifestPermalinks = async () => {
    if (!(await fs.pathExists(MANIFEST_PATH))) {
        return [];
    }

    const manifest = await fs.readJson(MANIFEST_PATH);
    const pages = Array.isArray(manifest.pages) ? manifest.pages : [];
    return Array.from(
        new Set(
            pages
                .map((page) => page && page.permalink)
                .filter(Boolean)
                .map((permalink) => (permalink.startsWith('/') ? permalink : `/${permalink}`))
                .map((permalink) => toPosix(permalink))
        )
    ).sort();
};

const run = async () => {
    if (!(await fs.pathExists(PUBLIC_DIR))) {
        console.error('ERROR: public/ does not exist. Run `npm run build` first.');
        process.exit(1);
    }

    const htmlFiles = (await fg('**/*.html', { cwd: PUBLIC_DIR, absolute: true })).sort();
    const htmlRoutes = Array.from(new Set(htmlFiles.map(htmlFileToRoute))).sort();
    const prettyRoutes = Array.from(new Set(htmlRoutes.map(toPrettyRoute))).sort();
    const manifestPermalinks = await readManifestPermalinks();

    const payload = {
        generatedAt: new Date().toISOString(),
        source: {
            publicDir: toPosix(path.relative(ROOT_DIR, PUBLIC_DIR)),
            manifestPath: toPosix(path.relative(ROOT_DIR, MANIFEST_PATH)),
            manifestFound: await fs.pathExists(MANIFEST_PATH)
        },
        counts: {
            htmlRouteCount: htmlRoutes.length,
            prettyRouteCount: prettyRoutes.length,
            manifestPermalinkCount: manifestPermalinks.length
        },
        routes: {
            htmlPaths: htmlRoutes,
            prettyPaths: prettyRoutes,
            templatedPermalinks: manifestPermalinks
        }
    };

    await fs.ensureDir(path.dirname(OUTPUT_PATH));
    await fs.writeJson(OUTPUT_PATH, payload, { spaces: 2 });

    console.log(`Wrote legacy route baseline: ${toPosix(path.relative(ROOT_DIR, OUTPUT_PATH))}`);
    console.log(`Captured ${htmlRoutes.length} HTML route path(s).`);
};

run().catch((error) => {
    console.error('Failed to generate legacy route baseline:', error);
    process.exit(1);
});
