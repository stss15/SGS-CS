#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

const report = {
    filesScanned: 0,
    missingTitle: [],
    missingViewport: [],
    missingDescription: [],
    missingLang: [],
    missingImgAlt: [],
    inlineHandlers: [],
    insecureBlankTargets: []
};

const walkHtmlFiles = (dir, files = []) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach((entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkHtmlFiles(fullPath, files);
            return;
        }

        if (entry.isFile() && fullPath.endsWith('.html')) {
            files.push(fullPath);
        }
    });
    return files;
};

const stripScriptAndStyleBlocks = (html) =>
    html
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<!--[\s\S]*?-->/g, '');

const rel = (filePath) => path.relative(ROOT_DIR, filePath).split(path.sep).join('/');

const collectFileReport = (filePath) => {
    const rawHtml = fs.readFileSync(filePath, 'utf8');
    const html = stripScriptAndStyleBlocks(rawHtml);
    const fileRef = rel(filePath);
    report.filesScanned += 1;

    if (!/<html[^>]*\blang=["'][^"']+["']/i.test(rawHtml)) {
        report.missingLang.push(fileRef);
    }

    if (!/<title>\s*[^<]+<\/title>/i.test(rawHtml)) {
        report.missingTitle.push(fileRef);
    }

    if (!/<meta[^>]+name=["']viewport["']/i.test(rawHtml)) {
        report.missingViewport.push(fileRef);
    }

    if (!/<meta[^>]+name=["']description["']/i.test(rawHtml)) {
        report.missingDescription.push(fileRef);
    }

    const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)];
    imgTags.forEach((match) => {
        const tag = match[0];
        if (!/\balt\s*=\s*["'][^"']*["']/i.test(tag)) {
            report.missingImgAlt.push(`${fileRef} :: ${tag}`);
        }
    });

    const handlers = [...html.matchAll(/<[^>]+\son[a-z]+\s*=\s*["'][^"']*["'][^>]*>/gi)];
    if (handlers.length > 0) {
        report.inlineHandlers.push(`${fileRef} (${handlers.length})`);
    }

    const blankTargetAnchors = [...rawHtml.matchAll(/<a\b[^>]*\btarget\s*=\s*["']_blank["'][^>]*>/gi)];
    blankTargetAnchors.forEach((match) => {
        const tag = match[0];
        const relMatch = tag.match(/\brel\s*=\s*["']([^"']*)["']/i);
        if (!relMatch) {
            report.insecureBlankTargets.push(`${fileRef} :: ${tag}`);
            return;
        }

        const relTokens = relMatch[1]
            .split(/\s+/)
            .map((token) => token.trim().toLowerCase())
            .filter(Boolean);
        if (!relTokens.includes('noopener') || !relTokens.includes('noreferrer')) {
            report.insecureBlankTargets.push(`${fileRef} :: ${tag}`);
        }
    });
};

const printSection = (title, items, { error = true, max = 25 } = {}) => {
    const prefix = error ? 'ERROR' : 'WARN';
    if (items.length === 0) {
        return;
    }
    console.log(`\n[${prefix}] ${title}: ${items.length}`);
    items.slice(0, max).forEach((item) => console.log(`  - ${item}`));
    if (items.length > max) {
        console.log(`  - ... ${items.length - max} more`);
    }
};

const run = () => {
    if (!fs.existsSync(PUBLIC_DIR)) {
        console.error('ERROR: public/ does not exist. Run `npm run build` first.');
        process.exit(1);
    }

    const htmlFiles = walkHtmlFiles(PUBLIC_DIR);
    htmlFiles.forEach(collectFileReport);

    console.log(`Scanned ${report.filesScanned} HTML files in public/.`);

    const errorBuckets = [
        ['Missing <html lang="...">', report.missingLang],
        ['Missing <title>', report.missingTitle],
        ['Missing viewport meta', report.missingViewport],
        ['Missing description meta', report.missingDescription],
        ['Missing img alt attribute', report.missingImgAlt],
        ['Inline event handlers detected', report.inlineHandlers],
        ['target="_blank" links missing rel="noopener noreferrer"', report.insecureBlankTargets]
    ];

    errorBuckets.forEach(([title, items]) => printSection(title, items, { error: true }));

    const errorCount = errorBuckets.reduce((sum, [, items]) => sum + items.length, 0);
    if (errorCount > 0) {
        console.error(`\nHTML quality checks failed with ${errorCount} error(s).`);
        process.exit(1);
    }

    console.log('\nHTML quality checks passed.');
};

run();
