#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

const ATTR_PATTERN = /\b(?:href|src)=["']([^"']+)["']/gi;
const SKIP_PREFIXES = ['http://', 'https://', '//', 'mailto:', 'tel:', 'data:', 'javascript:', '#'];
const SKIP_ROOT_PREFIXES = ['/__/firebase/'];

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

const rel = (filePath) => path.relative(ROOT_DIR, filePath).split(path.sep).join('/');

const normalizeLink = (raw) => {
    const withoutFragment = raw.split('#')[0];
    const withoutQuery = withoutFragment.split('?')[0];
    return withoutQuery.trim();
};

const safelyDecodePath = (value) => {
    try {
        return decodeURIComponent(value);
    } catch (_error) {
        return value;
    }
};

const resolveTarget = (sourceFile, linkValue) => {
    const normalized = normalizeLink(linkValue);
    if (!normalized) return null;

    const isSkipped = SKIP_PREFIXES.some((prefix) => normalized.startsWith(prefix));
    if (isSkipped) return null;

    if (SKIP_ROOT_PREFIXES.some((prefix) => normalized.startsWith(prefix))) return null;

    if (normalized.startsWith('/')) {
        return path.join(PUBLIC_DIR, safelyDecodePath(normalized.slice(1)));
    }

    return path.resolve(path.dirname(sourceFile), safelyDecodePath(normalized));
};

const targetExists = (targetPath) => {
    if (!targetPath) return true;

    const checks = new Set([targetPath]);
    if (!path.extname(targetPath)) {
        checks.add(`${targetPath}.html`);
        checks.add(path.join(targetPath, 'index.html'));
    }
    if (targetPath.endsWith(path.sep)) {
        checks.add(path.join(targetPath, 'index.html'));
    }

    return Array.from(checks).some((candidate) => fs.existsSync(candidate));
};

const run = () => {
    if (!fs.existsSync(PUBLIC_DIR)) {
        console.error('ERROR: public/ does not exist. Run `npm run build` first.');
        process.exit(1);
    }

    const htmlFiles = walkHtmlFiles(PUBLIC_DIR);
    const broken = [];

    htmlFiles.forEach((filePath) => {
        const html = fs.readFileSync(filePath, 'utf8')
            .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<!--[\s\S]*?-->/g, '');

        let match = ATTR_PATTERN.exec(html);
        while (match) {
            const rawValue = match[1];
            const target = resolveTarget(filePath, rawValue);
            if (target && !targetExists(target)) {
                broken.push(`${rel(filePath)} -> ${rawValue}`);
            }
            match = ATTR_PATTERN.exec(html);
        }
        ATTR_PATTERN.lastIndex = 0;
    });

    console.log(`Scanned ${htmlFiles.length} HTML files for internal link integrity.`);
    if (broken.length === 0) {
        console.log('Internal link integrity checks passed.');
        return;
    }

    console.error(`Found ${broken.length} broken internal link(s):`);
    broken.slice(0, 60).forEach((item) => console.error(`  - ${item}`));
    if (broken.length > 60) {
        console.error(`  - ... ${broken.length - 60} more`);
    }
    process.exit(1);
};

run();
