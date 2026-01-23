const path = require('path');
const fs = require('fs-extra');
const fg = require('fast-glob');
const matter = require('gray-matter');
const nunjucks = require('nunjucks');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src/pages');
const TEMPLATE_DIR = path.join(ROOT_DIR, 'src/templates');
const SITE_DATA_PATH = path.join(ROOT_DIR, 'src/data/site.json');
const TOPICS_DATA_PATH = path.join(ROOT_DIR, 'src/data/topics.json');
const STATIC_DIR = path.join(ROOT_DIR, 'src/static');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public');
const MANIFEST_PATH = path.join(ROOT_DIR, 'meta/site-manifest.json');

const toPosix = (filePath) => filePath.split(path.sep).join('/');
const buildTimestamp = new Date().toISOString();
const manifest = [];
let siteData = {};

// Configure Nunjucks to load templates from ./src/templates
const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(TEMPLATE_DIR, { noCache: true }),
    { autoescape: false }
);

env.addGlobal('buildTime', buildTimestamp);
env.addFilter('json', (value, spaces = 0) => JSON.stringify(value, null, spaces));

const loadSiteData = async () => {
    siteData = {};
    const dataFiles = [SITE_DATA_PATH, TOPICS_DATA_PATH];

    for (const filePath of dataFiles) {
        if (await fs.pathExists(filePath)) {
            const nextData = await fs.readJson(filePath);
            siteData = {
                ...siteData,
                ...nextData,
                topics: {
                    ...(siteData.topics || {}),
                    ...(nextData.topics || {})
                }
            };
        }
    }

    env.addGlobal('site', siteData);
};

const computeBasePath = (permalink) => {
    const normalized = toPosix(permalink);
    const dir = path.posix.dirname(normalized);
    if (!dir || dir === '.') return './';
    const depth = dir.split('/').filter(Boolean).length;
    return '../'.repeat(depth);
};

const dropEmpty = (obj) =>
    Object.fromEntries(
        Object.entries(obj).filter(([, value]) => {
            if (value === undefined || value === null) return false;
            if (Array.isArray(value) && value.length === 0) return false;
            if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) return false;
            return true;
        })
    );

const recordManifest = ({ permalink, outPath, layout, data, basePath, sourcePath }) => {
    const entry = dropEmpty({
        source: toPosix(path.relative(ROOT_DIR, sourcePath)),
        output: toPosix(path.relative(ROOT_DIR, outPath)),
        permalink: toPosix(permalink),
        layout,
        title: data.title || null,
        description: data.description || null,
        basePath,
        bodyClass: data.bodyClass || null,
        hero: data.hero || null,
        backLink: data.backLink || null,
        cards: data.cards || null,
        resources: data.resources || null,
        resourcesSecondary: data.resourcesSecondary || null,
        sections: data.sections || null,
        extraStyles: data.extraStyles || [],
        scripts: data.scripts || []
    });

    manifest.push(entry);
};

const writeManifest = async () => {
    const payload = {
        generatedAt: buildTimestamp,
        outputDir: toPosix(path.relative(ROOT_DIR, OUTPUT_DIR)) || '.',
        pageCount: manifest.length,
        pages: manifest.sort((a, b) => a.permalink.localeCompare(b.permalink))
    };

    await fs.ensureDir(path.dirname(MANIFEST_PATH));
    await fs.writeJson(MANIFEST_PATH, payload, { spaces: 2 });
    console.log(`Wrote manifest to ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
};

const buildRedirectHtml = (destination) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=${destination}">
    <title>Redirecting...</title>
    <link rel="canonical" href="${destination}">
</head>
<body>
    <p>Redirecting to <a href="${destination}">${destination}</a></p>
    <script>window.location.replace(${JSON.stringify(destination)});</script>
</body>
</html>
`;

const LEGACY_SLIDE_OVERRIDES = new Map([
    [
        'ib-2027/hl/slides/A4.3_machine_learning_approaches.html',
        '/ib-2027/hl/unit-7/slides/A4.3_machine_learning_approaches.html'
    ]
]);

const buildMissionControlPlaceholder = () => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="refresh" content="0; url=/coming-soon.html" />
    <link rel="canonical" href="/coming-soon.html" />
    <title>Mission Control - Coming Soon</title>
  </head>
  <body>
    <p>Mission Control is currently being rebuilt. <a href="/coming-soon.html">Continue</a>.</p>
  </body>
</html>
`;

const createLegacySlideAliases = async () => {
    const patterns = [
        'ib-2027/sl/unit-*/slides/*.html',
        'ib-2027/hl/unit-*/slides/*.html'
    ];
    const slideFiles = (await fg(patterns, { cwd: OUTPUT_DIR })).sort();
    if (!slideFiles.length) {
        return;
    }

    const aliasTargets = new Map();
    const duplicates = new Map();

    slideFiles.forEach((file) => {
        const normalized = toPosix(file);
        const parts = normalized.split('/');
        const level = parts[1];
        const filename = path.posix.basename(normalized);
        const alias = `ib-2027/${level}/slides/${filename}`;
        const overrideTarget = LEGACY_SLIDE_OVERRIDES.get(alias);
        const target = overrideTarget || `/${normalized}`;

        if (overrideTarget) {
            aliasTargets.set(alias, target);
            return;
        }

        if (aliasTargets.has(alias) && aliasTargets.get(alias) !== target) {
            const existing = duplicates.get(alias) || new Set([aliasTargets.get(alias)]);
            existing.add(target);
            duplicates.set(alias, existing);
            return;
        }

        aliasTargets.set(alias, target);
    });

    for (const [alias, targets] of duplicates.entries()) {
        console.warn(
            `Legacy slide alias ${alias} has multiple targets; using ${aliasTargets.get(alias)}. Other targets: ${Array.from(
                targets
            ).join(', ')}`
        );
    }

    await Promise.all(
        Array.from(aliasTargets.entries()).map(async ([alias, target]) => {
            const aliasPath = path.join(OUTPUT_DIR, alias);
            if (await fs.pathExists(aliasPath)) return;
            await fs.ensureDir(path.dirname(aliasPath));
            await fs.writeFile(aliasPath, buildRedirectHtml(target));
        })
    );

    console.log(`Created ${aliasTargets.size} legacy slide aliases.`);
};

const createLegacyScenarioAliases = async () => {
    const patterns = [
        'ib-2027/sl/unit-*/scenarios/*.html',
        'ib-2027/hl/unit-*/scenarios/*.html'
    ];
    const scenarioFiles = (await fg(patterns, { cwd: OUTPUT_DIR })).sort();
    if (!scenarioFiles.length) {
        return;
    }

    const aliasTargets = new Map();
    const duplicates = new Map();

    scenarioFiles.forEach((file) => {
        const normalized = toPosix(file);
        const parts = normalized.split('/');
        const level = parts[1];
        const filename = path.posix.basename(normalized);
        const alias = `ib-2027/${level}/scenarios/${filename}`;
        const target = `/${normalized}`;

        if (aliasTargets.has(alias) && aliasTargets.get(alias) !== target) {
            const existing = duplicates.get(alias) || new Set([aliasTargets.get(alias)]);
            existing.add(target);
            duplicates.set(alias, existing);
            return;
        }

        aliasTargets.set(alias, target);
    });

    for (const [alias, targets] of duplicates.entries()) {
        console.warn(
            `Legacy scenario alias ${alias} has multiple targets; using ${aliasTargets.get(alias)}. Other targets: ${Array.from(
                targets
            ).join(', ')}`
        );
    }

    await Promise.all(
        Array.from(aliasTargets.entries()).map(async ([alias, target]) => {
            const aliasPath = path.join(OUTPUT_DIR, alias);
            if (await fs.pathExists(aliasPath)) return;
            await fs.ensureDir(path.dirname(aliasPath));
            await fs.writeFile(aliasPath, buildRedirectHtml(target));
        })
    );

    console.log(`Created ${aliasTargets.size} legacy scenario aliases.`);
};

const ensureMissionControlPlaceholder = async () => {
    const placeholderPath = path.join(
        OUTPUT_DIR,
        'ib',
        'Learn Python Map',
        'ib-python-mission-control',
        'dist',
        'index.html'
    );

    if (await fs.pathExists(placeholderPath)) return;

    await fs.ensureDir(path.dirname(placeholderPath));
    await fs.writeFile(placeholderPath, buildMissionControlPlaceholder());
    console.log('Wrote Mission Control placeholder.');
};

const buildFile = async (relativePath) => {
    const sourcePath = path.join(SRC_DIR, relativePath);
    const raw = await fs.readFile(sourcePath, 'utf8');
    const { content, data } = matter(raw);

    const permalink = toPosix(data.permalink || relativePath.replace(/\.njk$/, '.html'));
    const outPath = path.join(OUTPUT_DIR, permalink);
    const basePath = data.basePath !== undefined ? data.basePath : computeBasePath(permalink);
    // For HTML files (slides), default to no layout if not specified
    const isHtml = relativePath.endsWith('.html');
    const layout = data.layout || (isHtml ? null : 'layouts/base.njk');
    const listingKey = data.listingKey;
    const listing = listingKey && siteData.listings ? siteData.listings[listingKey] : null;
    const resolvedSections = data.sections ?? (listing ? listing.sections : undefined);
    const resolvedWrapperClass = data.wrapperClass ?? (listing ? listing.wrapperClass : undefined);
    const topicKey = data.topicKey;
    const topic = topicKey && siteData.topics ? siteData.topics[topicKey] : null;
    const mergedData = topic ? { ...topic, ...data } : data;
    const resolvedCards = mergedData.cards;
    const resolvedResources = mergedData.resources;
    const resolvedResourcesTitle = mergedData.resourcesTitle;
    const resolvedExtraStyles =
        mergedData.extraStyles !== undefined
            ? mergedData.extraStyles
            : layout === 'layouts/arcade.njk'
                ? ['css/resource-style.css']
                : undefined;

    const context = {
        ...mergedData,
        cards: resolvedCards,
        resources: resolvedResources,
        resourcesTitle: resolvedResourcesTitle,
        sections: resolvedSections,
        wrapperClass: resolvedWrapperClass,
        basePath,
        currentYear: new Date().getFullYear(),
        site: siteData,
        extraStyles: resolvedExtraStyles
    };

    const renderedContent = env.renderString(content, context);
    const html = layout ? env.render(layout, { ...context, content: renderedContent }) : renderedContent;

    await fs.ensureDir(path.dirname(outPath));
    const marker = '<!-- GENERATED FILE - Edit source in src/pages/ instead -->\n';
    await fs.writeFile(outPath, marker + html);
    const manifestData = {
        ...mergedData,
        cards: resolvedCards ?? mergedData.cards,
        resources: resolvedResources ?? mergedData.resources,
        sections: resolvedSections ?? mergedData.sections,
        extraStyles: resolvedExtraStyles ?? mergedData.extraStyles
    };
    recordManifest({ permalink, outPath, layout, data: manifestData, basePath, sourcePath });
    console.log(`Built ${permalink}`);
};

const buildAll = async () => {
    await fs.emptyDir(OUTPUT_DIR);
    if (await fs.pathExists(STATIC_DIR)) {
        await fs.copy(STATIC_DIR, OUTPUT_DIR, { overwrite: true });
        console.log(`Copied static assets from ${path.relative(ROOT_DIR, STATIC_DIR)}`);
    }
    await loadSiteData();

    const files = await fg('**/*.{njk,html}', { cwd: SRC_DIR });
    if (!files.length) {
        console.warn('No templates found under src/pages');
        return;
    }

    await Promise.all(files.map((file) => buildFile(file)));
    await writeManifest();
    await createLegacySlideAliases();
    await createLegacyScenarioAliases();
    await ensureMissionControlPlaceholder();
};

buildAll().catch((err) => {
    console.error('Build failed:', err);
    process.exitCode = 1;
});
