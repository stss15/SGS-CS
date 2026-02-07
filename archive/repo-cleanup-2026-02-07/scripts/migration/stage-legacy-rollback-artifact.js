#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');

const ROOT_DIR = path.resolve(__dirname, '../..');
const LEGACY_OUTPUT_DIR = path.join(ROOT_DIR, 'public');
const FRAMEWORK_OUTPUT_DIR = path.join(ROOT_DIR, 'apps/site/dist');

const run = async () => {
  if (!(await fs.pathExists(LEGACY_OUTPUT_DIR))) {
    console.error('ERROR: legacy output directory does not exist. Run `npm run build:legacy` first.');
    process.exit(1);
  }

  await fs.remove(FRAMEWORK_OUTPUT_DIR);
  await fs.copy(LEGACY_OUTPUT_DIR, FRAMEWORK_OUTPUT_DIR);

  console.log('Legacy rollback artifact staged.');
  console.log(`  Source: ${path.relative(ROOT_DIR, LEGACY_OUTPUT_DIR)}`);
  console.log(`  Target: ${path.relative(ROOT_DIR, FRAMEWORK_OUTPUT_DIR)}`);
};

run().catch((error) => {
  console.error('Failed to stage legacy rollback artifact:', error);
  process.exit(1);
});
