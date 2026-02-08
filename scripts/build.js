const path = require('path');
const fs = require('fs-extra');
const fg = require('fast-glob');
const matter = require('gray-matter');
const nunjucks = require('nunjucks');
const { buildPdfs } = require('./build-pdfs');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src/pages');
const TEMPLATE_DIR = path.join(ROOT_DIR, 'src/templates');
const SITE_DATA_PATH = path.join(ROOT_DIR, 'src/data/site.json');
const TOPICS_DATA_PATH = path.join(ROOT_DIR, 'src/data/topics.json');
const STATIC_DIR = path.join(ROOT_DIR, 'src/static');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public');
const MANIFEST_PATH = path.join(ROOT_DIR, 'meta/site-manifest.json');
const AUTH_GATE_MARKER = 'data-sgs-auth-gate';
const LEGACY_INLINE_EVENTS_MARKER = 'data-sgs-inline-events';
const LEGACY_INLINE_EVENTS_SCRIPT = '/js/legacy-inline-events.js';
const DEFAULT_META_DESCRIPTION =
    "SGS Education resources for KS3, IGCSE, and IB students and teachers.";
const DEFAULT_VIEWPORT_META = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
const AUTH_HEAD_SNIPPET = `
    <!-- ${AUTH_GATE_MARKER} -->
    <link rel="stylesheet" href="/css/auth-gate.css">
    <script>document.documentElement.classList.add('auth-pending');</script>`;
const AUTH_BODY_SNIPPET = `
    <!-- ${AUTH_GATE_MARKER} -->
    <script src="/__/firebase/10.13.2/firebase-app-compat.js"></script>
    <script src="/__/firebase/10.13.2/firebase-auth-compat.js"></script>
    <script src="/__/firebase/init.js"></script>
    <script src="/js/auth-gate.js"></script>`;

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

const injectAuthGate = (html) => {
    if (html.includes(AUTH_GATE_MARKER)) return html;

    let updated = html;
    if (/<\/head>/i.test(updated)) {
        updated = updated.replace(/<\/head>/i, `${AUTH_HEAD_SNIPPET}\n</head>`);
    } else {
        updated = `${AUTH_HEAD_SNIPPET}\n${updated}`;
    }

    if (/<\/body>/i.test(updated)) {
        updated = updated.replace(/<\/body>/i, `${AUTH_BODY_SNIPPET}\n</body>`);
    } else {
        updated = `${updated}\n${AUTH_BODY_SNIPPET}`;
    }

    return updated;
};

const injectHeadMeta = (html, metaTag) => {
    if (/<\/head>/i.test(html)) {
        return html.replace(/<\/head>/i, `    ${metaTag}\n</head>`);
    }

    return `${metaTag}\n${html}`;
};

const escapeHtmlAttribute = (value) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

const transformInlineEventsInFragment = (fragment) => {
    let replacements = 0;
    const transformed = fragment.replace(
        /\s(on[a-z]+)\s*=\s*("([^"]*)"|'([^']*)')/gi,
        (_, eventName, _quoted, doubleQuotedValue, singleQuotedValue) => {
            const expression = doubleQuotedValue !== undefined ? doubleQuotedValue : singleQuotedValue || '';
            replacements += 1;
            return ` data-sgs-${eventName.toLowerCase()}="${escapeHtmlAttribute(expression)}"`;
        }
    );

    return { transformed, replacements };
};

const convertLegacyInlineHandlers = (html) => {
    const nonTransformBlocks = /<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi;

    let output = '';
    let lastIndex = 0;
    let totalReplacements = 0;

    let match = nonTransformBlocks.exec(html);
    while (match) {
        const before = html.slice(lastIndex, match.index);
        const converted = transformInlineEventsInFragment(before);
        output += converted.transformed;
        totalReplacements += converted.replacements;

        output += match[0];
        lastIndex = match.index + match[0].length;
        match = nonTransformBlocks.exec(html);
    }

    const tail = html.slice(lastIndex);
    const convertedTail = transformInlineEventsInFragment(tail);
    output += convertedTail.transformed;
    totalReplacements += convertedTail.replacements;

    return { html: output, replacements: totalReplacements };
};

const injectLegacyInlineEventsRuntime = (html) => {
    if (html.includes(LEGACY_INLINE_EVENTS_MARKER) || html.includes(LEGACY_INLINE_EVENTS_SCRIPT)) {
        return html;
    }

    const snippet = `
    <!-- ${LEGACY_INLINE_EVENTS_MARKER} -->
    <script src="${LEGACY_INLINE_EVENTS_SCRIPT}"></script>`;

    if (/<\/body>/i.test(html)) {
        return html.replace(/<\/body>/i, `${snippet}\n</body>`);
    }

    return `${html}${snippet}`;
};

const hasLegacyDataEventAttributes = (html) => /\sdata-sgs-on[a-z]+\s*=\s*["'][^"']*["']/i.test(html);

const ensureBlankTargetRelSecurity = (html) =>
    html.replace(/<a\b[^>]*\btarget\s*=\s*["']_blank["'][^>]*>/gi, (tag) => {
        const relMatch = tag.match(/\brel\s*=\s*["']([^"']*)["']/i);
        const secureTokens = ['noopener', 'noreferrer'];

        if (!relMatch) {
            return tag.replace(/>$/, ' rel="noopener noreferrer">');
        }

        const existingTokens = relMatch[1]
            .split(/\s+/)
            .map((token) => token.trim().toLowerCase())
            .filter(Boolean);
        const mergedTokens = Array.from(new Set([...existingTokens, ...secureTokens]));
        const mergedRel = `rel="${mergedTokens.join(' ')}"`;

        return tag.replace(/\brel\s*=\s*["'][^"']*["']/i, mergedRel);
    });

const ensureImageDecoding = (html) => {
    const nonTransformBlocks = /<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi;
    let output = '';
    let lastIndex = 0;
    let match = nonTransformBlocks.exec(html);

    const transformFragment = (fragment) =>
        fragment.replace(/<img\b[^>]*>/gi, (tag) => {
            if (/\bdecoding\s*=\s*["'][^"']*["']/i.test(tag)) return tag;
            return tag.replace(/>$/, ' decoding="async">');
        });

    while (match) {
        output += transformFragment(html.slice(lastIndex, match.index));
        output += match[0];
        lastIndex = match.index + match[0].length;
        match = nonTransformBlocks.exec(html);
    }

    output += transformFragment(html.slice(lastIndex));
    return output;
};

const ensureCoreMetaTags = (html) => {
    let updated = html;
    if (!/<meta[^>]+name=["']viewport["']/i.test(updated)) {
        updated = injectHeadMeta(updated, DEFAULT_VIEWPORT_META);
    }

    if (!/<meta[^>]+name=["']description["']/i.test(updated)) {
        updated = injectHeadMeta(
            updated,
            `<meta name="description" content="${DEFAULT_META_DESCRIPTION}">`
        );
    }

    return updated;
};

const applyAuthGateToOutput = async () => {
    const htmlFiles = await fg('**/*.html', { cwd: OUTPUT_DIR });
    let inlineHandlerReplacements = 0;

    await Promise.all(
        htmlFiles.map(async (relativePath) => {
            const filePath = path.join(OUTPUT_DIR, relativePath);
            const source = await fs.readFile(filePath, 'utf8');
            let updated = injectAuthGate(source);
            updated = ensureCoreMetaTags(updated);
            updated = ensureBlankTargetRelSecurity(updated);
            updated = ensureImageDecoding(updated);
            const converted = convertLegacyInlineHandlers(updated);
            updated = converted.html;
            if (converted.replacements > 0 || hasLegacyDataEventAttributes(updated)) {
                inlineHandlerReplacements += converted.replacements;
                updated = injectLegacyInlineEventsRuntime(updated);
            }
            if (updated !== source) {
                await fs.writeFile(filePath, updated);
            }
        })
    );
    console.log(
        `Injected auth gate and quality upgrades into ${htmlFiles.length} HTML files (${inlineHandlerReplacements} inline handlers migrated).`
    );
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
    await buildPdfs();
    await writeManifest();
    await createLegacySlideAliases();
    await createLegacyScenarioAliases();
    await ensureMissionControlPlaceholder();
    await applyAuthGateToOutput();
};

buildAll().catch((err) => {
    console.error('Build failed:', err);
    process.exitCode = 1;
});
