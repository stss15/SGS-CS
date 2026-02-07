const path = require('path');
const fs = require('fs-extra');

const ROOT_DIR = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public');
const PRINTABLES_DIR = path.join(ROOT_DIR, 'src', 'printables');

const pdfJobs = [
    {
        texFile: path.join(PRINTABLES_DIR, 'ks3', 'year7', 'unit2', 'activity1.tex'),
        outFile: path.join(OUTPUT_DIR, 'ks3', 'year7', 'unit2', 'activity1.pdf'),
        label: 'ks3/year7/unit2/activity1.pdf'
    },
    {
        texFile: path.join(PRINTABLES_DIR, 'ks3', 'year7', 'unit2', 'activity2.tex'),
        outFile: path.join(OUTPUT_DIR, 'ks3', 'year7', 'unit2', 'activity2.pdf'),
        label: 'ks3/year7/unit2/activity2.pdf'
    },
    {
        texFile: path.join(PRINTABLES_DIR, 'ks3', 'year7', 'unit2', 'activity3.tex'),
        outFile: path.join(OUTPUT_DIR, 'ks3', 'year7', 'unit2', 'activity3.pdf'),
        label: 'ks3/year7/unit2/activity3.pdf'
    }
];

const buildPdfs = async () => {
    if (process.env.SKIP_LATEX_PDFS === '1') {
        console.log('Skipping LaTeX PDF build (SKIP_LATEX_PDFS=1).');
        return;
    }

    let compile;
    try {
        // Uses Tectonic via node-latex-compiler (bundled binary per platform).
        ({ compile } = require('node-latex-compiler'));
    } catch (err) {
        throw new Error(
            `PDF build requested but node-latex-compiler is not available. Install dependencies and retry. (${err?.message || err})`
        );
    }

    const jobsToRun = [];
    for (const job of pdfJobs) {
        if (!(await fs.pathExists(job.texFile))) {
            console.warn(`Missing printable source: ${path.relative(ROOT_DIR, job.texFile)} (skipping)`);
            continue;
        }
        jobsToRun.push(job);
    }

    if (!jobsToRun.length) {
        return;
    }

    for (const job of jobsToRun) {
        const result = await compile({
            texFile: job.texFile,
            returnBuffer: true
        });

        if (result.status !== 'success' || !result.pdfBuffer) {
            const stderr = result.stderr ? `\n${result.stderr}` : '';
            throw new Error(`Failed to compile ${path.relative(ROOT_DIR, job.texFile)}${stderr}`);
        }

        await fs.ensureDir(path.dirname(job.outFile));
        await fs.writeFile(job.outFile, result.pdfBuffer);
        console.log(`Built ${job.label}`);
    }
};

module.exports = { buildPdfs };

if (require.main === module) {
    buildPdfs().catch((err) => {
        console.error('PDF build failed:', err);
        process.exitCode = 1;
    });
}

