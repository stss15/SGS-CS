import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { existsSync, readdirSync, renameSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Post-build integration that lowercases all directory and file names
 * under dist/ib-2027/. This is necessary because:
 * 1. public/ib-2027/ uses uppercase unit codes (A1, B3, A1.1, etc.)
 * 2. Astro copies public/ files preserving their case
 * 3. Astro-generated routes use lowercase (from getStaticPaths)
 * 4. macOS (case-insensitive) merges them, but Firebase (case-sensitive) doesn't
 */
function lowercaseIbDist() {
  return {
    name: 'lowercase-ib-dist',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const ibDir = join(fileURLToPath(dir), 'ib-2027');
        if (!existsSync(ibDir)) return;

        let renamed = 0;
        const lowercaseTree = (dirPath) => {
          const entries = readdirSync(dirPath, { withFileTypes: true });

          // Process directories first (depth-first), then rename
          for (const entry of entries) {
            const currentName = entry.name;
            const currentPath = join(dirPath, currentName);

            if (entry.isDirectory()) {
              lowercaseTree(currentPath);
            }

            const lowerName = currentName.toLowerCase();
            if (lowerName !== currentName) {
              // macOS is case-insensitive, so rename via temp to force the case change
              const tmpPath = join(dirPath, `__tmp_lc_${lowerName}`);
              const newPath = join(dirPath, lowerName);
              renameSync(currentPath, tmpPath);
              renameSync(tmpPath, newPath);
              renamed++;
            }
          }
        };

        lowercaseTree(ibDir);
        if (renamed > 0) {
          console.log(`  lowercase-ib-dist: renamed ${renamed} entries to lowercase`);
        }
      }
    }
  };
}

export default defineConfig({
  integrations: [react(), lowercaseIbDist()],
  output: 'static'
});
