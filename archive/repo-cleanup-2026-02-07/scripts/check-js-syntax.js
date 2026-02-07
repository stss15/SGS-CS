#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const TARGETS = [
    path.join(ROOT_DIR, 'scripts'),
    path.join(ROOT_DIR, 'src/static/js'),
    path.join(ROOT_DIR, 'src/pages/ks3/Textbook')
];

const EXCLUDED_SUFFIXES = ['.babel.js'];
const EXCLUDED_FILES = new Set([
    'src/static/js/visualizer-linked-list.js'
]);

const shouldCheckFile = (filePath) => {
    if (!filePath.endsWith('.js')) return false;
    if (EXCLUDED_SUFFIXES.some((suffix) => filePath.endsWith(suffix))) return false;
    const relativePath = path.relative(ROOT_DIR, filePath).split(path.sep).join('/');
    if (EXCLUDED_FILES.has(relativePath)) return false;
    return true;
};

const walk = (dir, files = []) => {
    if (!fs.existsSync(dir)) return files;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    entries.forEach((entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(fullPath, files);
            return;
        }
        if (entry.isFile() && shouldCheckFile(fullPath)) {
            files.push(fullPath);
        }
    });

    return files;
};

const rel = (filePath) => path.relative(ROOT_DIR, filePath).split(path.sep).join('/');

const runSyntaxCheck = (filePath) =>
    spawnSync(process.execPath, ['--check', filePath], {
        encoding: 'utf8'
    });

const run = () => {
    const files = TARGETS.flatMap((dir) => walk(dir, []));
    if (!files.length) {
        console.log('No JavaScript files found for syntax checking.');
        return;
    }

    const failures = [];
    files.forEach((filePath) => {
        const result = runSyntaxCheck(filePath);
        if (result.status !== 0) {
            failures.push({
                file: rel(filePath),
                output: (result.stderr || result.stdout || '').trim()
            });
        }
    });

    console.log(`Checked ${files.length} JavaScript file(s).`);
    if (failures.length === 0) {
        console.log('JavaScript syntax checks passed.');
        return;
    }

    console.error(`JavaScript syntax checks failed in ${failures.length} file(s):`);
    failures.forEach((failure) => {
        console.error(`\n- ${failure.file}`);
        if (failure.output) {
            console.error(failure.output);
        }
    });
    process.exit(1);
};

run();
