const path = require('path');
const fs = require('fs-extra');
const fg = require('fast-glob');
const matter = require('gray-matter');
const nunjucks = require('nunjucks');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src/pages');
const TEMPLATE_DIR = path.join(ROOT_DIR, 'src/templates');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public');
const MANIFEST_PATH = path.join(ROOT_DIR, 'meta/site-manifest.json');

const toPosix = (filePath) => filePath.split(path.sep).join('/');
const buildTimestamp = new Date().toISOString();
const manifest = [];

// Configure Nunjucks to load templates from ./src/templates
const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(TEMPLATE_DIR, { noCache: true }),
    { autoescape: false }
);

env.addGlobal('buildTime', buildTimestamp);
env.addFilter('json', (value, spaces = 0) => JSON.stringify(value, null, spaces));

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

const buildFile = async (relativePath) => {
    const sourcePath = path.join(SRC_DIR, relativePath);
    const raw = await fs.readFile(sourcePath, 'utf8');
    const { content, data } = matter(raw);

    const permalink = toPosix(data.permalink || relativePath.replace(/\.njk$/, '.html'));
    const outPath = path.join(OUTPUT_DIR, permalink);
    const basePath = data.basePath !== undefined ? data.basePath : computeBasePath(permalink);
    const layout = data.layout || 'layouts/base.njk';

    const context = {
        ...data,
        basePath,
        currentYear: new Date().getFullYear()
    };

    const renderedContent = env.renderString(content, context);
    const html = env.render(layout, { ...context, content: renderedContent });

    await fs.ensureDir(path.dirname(outPath));
    await fs.writeFile(outPath, html);
    recordManifest({ permalink, outPath, layout, data, basePath, sourcePath });
    console.log(`Built ${permalink}`);
};

const buildAll = async () => {
    await fs.ensureDir(OUTPUT_DIR);

    const files = await fg('**/*.njk', { cwd: SRC_DIR });
    if (!files.length) {
        console.warn('No templates found under src/pages');
        return;
    }

    await Promise.all(files.map((file) => buildFile(file)));
    await writeManifest();
};

buildAll().catch((err) => {
    console.error('Build failed:', err);
    process.exitCode = 1;
});
