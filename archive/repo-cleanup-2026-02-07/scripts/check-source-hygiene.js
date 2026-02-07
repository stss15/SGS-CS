#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const STATIC_JS_DIR = path.join(ROOT_DIR, 'src/static/js');
const TEMPLATE_DIRS = [path.join(ROOT_DIR, 'src/templates'), path.join(ROOT_DIR, 'src/pages')];

const rel = (filePath) => path.relative(ROOT_DIR, filePath).split(path.sep).join('/');

const walk = (dir, matcher, files = []) => {
    if (!fs.existsSync(dir)) return files;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach((entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(fullPath, matcher, files);
            return;
        }
        if (entry.isFile() && matcher(fullPath)) {
            files.push(fullPath);
        }
    });
    return files;
};

const jsFiles = walk(STATIC_JS_DIR, (filePath) => filePath.endsWith('.js') && !filePath.endsWith('.babel.js'));
const templateFiles = TEMPLATE_DIRS.flatMap((dir) =>
    walk(dir, (filePath) => filePath.endsWith('.njk') || filePath.endsWith('.html'))
);

const consoleIssues = [];
const runtimeInlineHandlerIssues = [];
jsFiles.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    if (/\bconsole\.log\s*\(/.test(content)) {
        consoleIssues.push(rel(filePath));
    }
    if (/\bon[a-z]+\s*=\s*["'][^"']*["']/i.test(content)) {
        runtimeInlineHandlerIssues.push(rel(filePath));
    }
});

const onErrorInlineIssues = [];
const inlineHandlerIssues = [];
const insecureBlankTargets = [];
templateFiles.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    if (/\sonerror\s*=\s*["'][^"']*["']/i.test(content)) {
        onErrorInlineIssues.push(rel(filePath));
    }
    if (/\son[a-z]+\s*=\s*["'][^"']*["']/i.test(content)) {
        inlineHandlerIssues.push(rel(filePath));
    }

    const blankTargetAnchors = [...content.matchAll(/<a\b[^>]*\btarget\s*=\s*["']_blank["'][^>]*>/gi)];
    blankTargetAnchors.forEach((match) => {
        const tag = match[0];
        const relMatch = tag.match(/\brel\s*=\s*["']([^"']*)["']/i);
        if (!relMatch) {
            insecureBlankTargets.push(`${rel(filePath)} :: ${tag}`);
            return;
        }
        const relTokens = relMatch[1]
            .split(/\s+/)
            .map((token) => token.trim().toLowerCase())
            .filter(Boolean);
        if (!relTokens.includes('noopener') || !relTokens.includes('noreferrer')) {
            insecureBlankTargets.push(`${rel(filePath)} :: ${tag}`);
        }
    });
});

if (consoleIssues.length > 0) {
    console.error(`ERROR: console.log found in ${consoleIssues.length} source file(s):`);
    consoleIssues.forEach((item) => console.error(`  - ${item}`));
}

if (runtimeInlineHandlerIssues.length > 0) {
    console.error(
        `ERROR: runtime-generated inline on* handler strings found in ${runtimeInlineHandlerIssues.length} JS source file(s):`
    );
    runtimeInlineHandlerIssues.slice(0, 40).forEach((item) => console.error(`  - ${item}`));
    if (runtimeInlineHandlerIssues.length > 40) {
        console.error(`  - ... ${runtimeInlineHandlerIssues.length - 40} more`);
    }
}

if (onErrorInlineIssues.length > 0) {
    console.error(`ERROR: inline onerror handlers found in ${onErrorInlineIssues.length} source file(s):`);
    onErrorInlineIssues.slice(0, 40).forEach((item) => console.error(`  - ${item}`));
    if (onErrorInlineIssues.length > 40) {
        console.error(`  - ... ${onErrorInlineIssues.length - 40} more`);
    }
}

if (inlineHandlerIssues.length > 0) {
    console.error(`ERROR: inline on* handlers found in ${inlineHandlerIssues.length} source file(s):`);
    inlineHandlerIssues.slice(0, 40).forEach((item) => console.error(`  - ${item}`));
    if (inlineHandlerIssues.length > 40) {
        console.error(`  - ... ${inlineHandlerIssues.length - 40} more`);
    }
}

if (insecureBlankTargets.length > 0) {
    console.error(`ERROR: target="_blank" link(s) without rel="noopener noreferrer": ${insecureBlankTargets.length}`);
    insecureBlankTargets.slice(0, 40).forEach((item) => console.error(`  - ${item}`));
    if (insecureBlankTargets.length > 40) {
        console.error(`  - ... ${insecureBlankTargets.length - 40} more`);
    }
}

if (
    consoleIssues.length > 0 ||
    runtimeInlineHandlerIssues.length > 0 ||
    onErrorInlineIssues.length > 0 ||
    inlineHandlerIssues.length > 0 ||
    insecureBlankTargets.length > 0
) {
    process.exit(1);
}

console.log('Source hygiene checks passed.');
