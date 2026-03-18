import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';

export type SiteRouteKind = 'html-route';
export type SiteRouteSource = 'public';
export type SiteShell = 'curriculum' | 'reader' | 'slide' | 'tool' | 'legacy' | 'utility' | 'unknown';
export type SiteAssetKind =
  | 'style'
  | 'script'
  | 'image'
  | 'data'
  | 'document'
  | 'archive'
  | 'font'
  | 'media'
  | 'other';
export type SiteContentKind = 'content-collection' | 'data-source' | 'source-library' | 'printable-source';
export type SiteExperienceKind = 'curriculum-index' | 'reader' | 'slide-deck' | 'interactive' | 'tool' | 'utility' | 'legacy';

export interface ContractFile<TEntry> {
  manifestVersion: 1;
  rootDir: string;
  count: number;
  entries: TEntry[];
}

export interface SiteRouteContract {
  routePath: string;
  sourcePath: string;
  source: SiteRouteSource;
  shell: SiteShell;
  familyId: string;
  routeKind: SiteRouteKind;
}

export interface SiteAssetContract {
  assetPath: string;
  sourcePath: string;
  assetKind: SiteAssetKind;
  familyId: string;
}

export interface SiteContentContract {
  rootPath: string;
  contentKind: SiteContentKind;
  fileCount: number;
  sampleFiles: string[];
}

export interface SiteExperienceContract {
  familyId: string;
  experienceKind: SiteExperienceKind;
  shell: SiteShell;
  routeCount: number;
  assetCount: number;
  routePaths: string[];
  assetPaths: string[];
  sourceRoots: string[];
}

export interface SiteContractInventory {
  rootDir: string;
  routes: ContractFile<SiteRouteContract>;
  assets: ContractFile<SiteAssetContract>;
  content: ContractFile<SiteContentContract>;
  experiences: ContractFile<SiteExperienceContract>;
}

const REQUIRED_MARKER = 'src/data/site.json';

const resolveRepoRoot = (): string => {
  const fromEnv = process.env.SGS_REPO_ROOT;
  const candidates = [
    fromEnv,
    process.cwd(),
    path.resolve(process.cwd(), '..'),
    path.resolve(process.cwd(), '../..'),
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../'),
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../')
  ].filter((value): value is string => Boolean(value));

  for (const candidate of candidates) {
    if (existsSync(path.join(candidate, REQUIRED_MARKER))) {
      return candidate;
    }
  }

  throw new Error('Unable to locate the SGS repository root.');
};

const ROOT_DIR = resolveRepoRoot();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

const toPosix = (value: string): string => value.split(path.sep).join('/');
const trimSlashes = (value: string): string => value.replace(/^\/+|\/+$/g, '');

const makeRoutePath = (relativePath: string): string => `/${toPosix(relativePath)}`;
const makeAssetPath = (relativePath: string): string => `/${toPosix(relativePath)}`;

const getRouteShell = (routePath: string): SiteShell => {
  if (routePath === '/index.html') return 'curriculum';
  if (routePath === '/coming-soon.html' || routePath === '/404.html' || routePath === '/admin.html') return 'utility';
  if (routePath.startsWith('/tools/sql-playground')) return 'tool';
  if (routePath.startsWith('/igcse/') || routePath.startsWith('/ib-2027/') || routePath.startsWith('/ib/') || routePath.startsWith('/ks3/')) {
    if (routePath.includes('/slides/')) return 'slide';
    if (routePath.includes('/textbook')) return 'reader';
    if (routePath.includes('flashcards') || routePath.includes('assessment') || routePath.includes('quiz')) {
      return 'curriculum';
    }
    if (routePath.includes('blockchain-quest') || routePath.includes('block-chain-sim') || routePath.includes('simulation') || routePath.includes('game')) {
      return 'tool';
    }
    return 'curriculum';
  }

  return 'unknown';
};

const getRouteFamilyId = (routePath: string): string => {
  if (routePath === '/index.html') return 'home';
  if (routePath === '/coming-soon.html' || routePath === '/404.html' || routePath === '/admin.html') return 'utility';
  if (routePath.startsWith('/tools/sql-playground')) return 'tools/sql-playground';

  const withoutHtml = routePath.replace(/\.html$/, '');
  const withoutIndex = withoutHtml.replace(/\/index$/, '');
  const familyPath = path.posix.dirname(withoutIndex);
  const normalizedFamilyPath = trimSlashes(familyPath);
  if (normalizedFamilyPath) {
    return normalizedFamilyPath;
  }

  const normalizedRoutePath = trimSlashes(withoutIndex);
  return normalizedRoutePath || 'root';
};

const getAssetFamilyId = (assetPath: string): string => {
  const withoutFile = path.posix.dirname(assetPath);
  const segments = withoutFile.split('/').filter(Boolean);
  const supportSegments = new Set(['css', 'js', 'images', 'img', 'assets', 'data', 'downloads', 'fonts', 'media']);

  while (segments.length > 1) {
    const tail = segments.at(-1);
    if (!tail || !supportSegments.has(tail)) {
      break;
    }

    segments.pop();
  }

  if (segments.length === 0) {
    return 'root';
  }

  return segments.join('/');
};

const getAssetKind = (assetPath: string): SiteAssetKind => {
  const extension = path.posix.extname(assetPath).toLowerCase();

  if (['.css', '.scss'].includes(extension)) return 'style';
  if (['.js', '.mjs', '.cjs'].includes(extension)) return 'script';
  if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'].includes(extension)) return 'image';
  if (['.json', '.csv', '.tsv', '.txt', '.yaml', '.yml'].includes(extension)) return 'data';
  if (['.pdf', '.docx', '.tex'].includes(extension)) return 'document';
  if (['.zip', '.tar', '.gz'].includes(extension)) return 'archive';
  if (['.woff', '.woff2', '.ttf', '.otf'].includes(extension)) return 'font';
  if (['.mp4', '.webm', '.mp3', '.wav', '.ogg'].includes(extension)) return 'media';

  return 'other';
};

const getContentKind = (rootPath: string): SiteContentKind => {
  if (rootPath.startsWith('apps/site/src/content/')) return 'content-collection';
  if (rootPath.startsWith('src/data/')) return 'data-source';
  if (rootPath.startsWith('src/printables/')) return 'printable-source';
  return 'source-library';
};

const getExperienceKind = (familyId: string, routes: SiteRouteContract[]): SiteExperienceKind => {
  if (familyId === 'home' || familyId === 'utility') return 'utility';
  if (routes.length === 0) return familyId.startsWith('css') || familyId.startsWith('js') || familyId.startsWith('images') || familyId.startsWith('data') ? 'utility' : 'legacy';
  if (familyId.includes('/textbook')) return 'reader';
  if (familyId.includes('/slides')) return 'slide-deck';
  if (familyId.includes('/blockchain-quest') || familyId.includes('/block-chain-sim') || familyId.includes('/sql-playground')) {
    return 'tool';
  }
  if (familyId.includes('/oop-project') || familyId.includes('/scenarios')) return 'interactive';
  if (routes.some((route) => route.shell === 'reader')) return 'reader';
  if (routes.some((route) => route.shell === 'slide')) return 'slide-deck';
  if (routes.some((route) => route.shell === 'tool')) return 'tool';
  return 'curriculum-index';
};

const listFiles = async (rootPath: string, pattern: string): Promise<string[]> => {
  if (!existsSync(path.join(ROOT_DIR, rootPath))) {
    return [];
  }

  return (await fg(pattern, { cwd: path.join(ROOT_DIR, rootPath), dot: false, onlyFiles: true }))
    .map((relativePath) => toPosix(relativePath))
    .sort((a, b) => a.localeCompare(b));
};

const buildRouteContracts = async (): Promise<ContractFile<SiteRouteContract>> => {
  const routeFiles = await fg(['**/*.html'], { cwd: PUBLIC_DIR, dot: false, onlyFiles: true });
  const entries = routeFiles
    .map((relativePath) => {
      const routePath = makeRoutePath(relativePath);
      return {
        routePath,
        sourcePath: toPosix(path.join('public', relativePath)),
        source: 'public' as const,
        shell: getRouteShell(routePath),
        familyId: getRouteFamilyId(routePath),
        routeKind: 'html-route' as const
      };
    })
    .sort((a, b) => a.routePath.localeCompare(b.routePath));

  return {
    manifestVersion: 1,
    rootDir: toPosix('public'),
    count: entries.length,
    entries
  };
};

const buildAssetContracts = async (): Promise<ContractFile<SiteAssetContract>> => {
  const assetFiles = await fg(['**/*', '!**/*.html'], { cwd: PUBLIC_DIR, dot: false, onlyFiles: true });
  const entries = assetFiles
    .map((relativePath) => {
      const assetPath = makeAssetPath(relativePath);
      return {
        assetPath,
        sourcePath: toPosix(path.join('public', relativePath)),
        assetKind: getAssetKind(assetPath),
        familyId: getAssetFamilyId(assetPath)
      };
    })
    .sort((a, b) => a.assetPath.localeCompare(b.assetPath));

  return {
    manifestVersion: 1,
    rootDir: toPosix('public'),
    count: entries.length,
    entries
  };
};

const CONTENT_ROOTS = [
  'apps/site/src/content/ib-textbooks',
  'apps/site/src/content/igcse-textbooks',
  'src/data',
  'src/printables',
  'docs/content/curriculum-guides',
  'docs/content/igcse',
  'docs/content/ib-content',
  'docs/content/ks3'
];

const buildContentContracts = async (): Promise<ContractFile<SiteContentContract>> => {
  const entries = (
    await Promise.all(
      CONTENT_ROOTS.map(async (rootPath) => {
        const absoluteRoot = path.join(ROOT_DIR, rootPath);
        if (!existsSync(absoluteRoot)) {
          return null;
        }

        const files = await fg(['**/*'], {
          cwd: absoluteRoot,
          dot: false,
          onlyFiles: true
        });

        const sampleFiles = files
          .map((relativePath) => toPosix(path.join(rootPath, relativePath)))
          .sort((a, b) => a.localeCompare(b))
          .slice(0, 8);

        return {
          rootPath: toPosix(rootPath),
          contentKind: getContentKind(rootPath),
          fileCount: files.length,
          sampleFiles
        } satisfies SiteContentContract;
      })
    )
  )
    .filter((entry): entry is SiteContentContract => entry !== null)
    .sort((a, b) => a.rootPath.localeCompare(b.rootPath));

  return {
    manifestVersion: 1,
    rootDir: toPosix('docs/content'),
    count: entries.length,
    entries
  };
};

const groupByExperience = <T extends { familyId: string }>(entries: T[]): Map<string, T[]> => {
  const grouped = new Map<string, T[]>();
  for (const entry of entries) {
    const current = grouped.get(entry.familyId) || [];
    current.push(entry);
    grouped.set(entry.familyId, current);
  }
  return grouped;
};

const buildExperienceContracts = (
  routes: ContractFile<SiteRouteContract>,
  assets: ContractFile<SiteAssetContract>
): ContractFile<SiteExperienceContract> => {
  const routeGroups = groupByExperience(routes.entries);
  const assetGroups = groupByExperience(assets.entries);
  const familyIds = Array.from(new Set([...routeGroups.keys(), ...assetGroups.keys()])).sort((a, b) => a.localeCompare(b));

  const entries = familyIds.map((familyId) => {
    const groupedRoutes = routeGroups.get(familyId) || [];
    const groupedAssets = assetGroups.get(familyId) || [];
    const shell = groupedRoutes[0]?.shell || inferShellForFamily(familyId);

    return {
      familyId,
      experienceKind: getExperienceKind(familyId, groupedRoutes),
      shell,
      routeCount: groupedRoutes.length,
      assetCount: groupedAssets.length,
      routePaths: groupedRoutes.map((route) => route.routePath),
      assetPaths: groupedAssets.map((asset) => asset.assetPath),
      sourceRoots: Array.from(
        new Set([
          ...groupedRoutes.map((route) => path.posix.dirname(route.sourcePath)),
          ...groupedAssets.map((asset) => path.posix.dirname(asset.sourcePath))
        ])
      ).sort((a, b) => a.localeCompare(b))
    } satisfies SiteExperienceContract;
  });

  return {
    manifestVersion: 1,
    rootDir: toPosix('public'),
    count: entries.length,
    entries
  };
};

const inferShellForFamily = (familyId: string): SiteShell => {
  if (familyId === 'home' || familyId === 'utility') return 'utility';
  if (familyId.startsWith('tools/') || familyId.startsWith('css') || familyId.startsWith('js') || familyId.startsWith('images') || familyId.startsWith('data')) {
    return familyId.startsWith('tools/') ? 'tool' : 'utility';
  }
  if (familyId.includes('/slides')) return 'slide';
  if (familyId.includes('/textbook')) return 'reader';
  if (familyId.includes('/blockchain-quest') || familyId.includes('/block-chain-sim')) return 'tool';
  if (familyId.includes('/oop-project') || familyId.includes('/scenarios')) return 'tool';
  return 'curriculum';
};

export const buildSiteContractInventory = async (): Promise<SiteContractInventory> => {
  const routes = await buildRouteContracts();
  const assets = await buildAssetContracts();
  const content = await buildContentContracts();
  const experiences = buildExperienceContracts(routes, assets);

  return {
    rootDir: toPosix(ROOT_DIR),
    routes,
    assets,
    content,
    experiences
  };
};

const CONTRACT_FILES = {
  index: 'meta/contracts/index.json',
  routes: 'meta/contracts/routes.json',
  assets: 'meta/contracts/assets.json',
  content: 'meta/contracts/content.json',
  experiences: 'meta/contracts/experiences.json'
} as const;

export const getContractFilePaths = () => CONTRACT_FILES;

const writeJson = async (filePath: string, value: unknown): Promise<void> => {
  await mkdir(path.dirname(path.join(ROOT_DIR, filePath)), { recursive: true });
  await writeFile(path.join(ROOT_DIR, filePath), `${JSON.stringify(value, null, 2)}\n`, 'utf8');
};

export const writeSiteContractManifests = async (inventory: SiteContractInventory): Promise<void> => {
  await writeJson(CONTRACT_FILES.routes, inventory.routes);
  await writeJson(CONTRACT_FILES.assets, inventory.assets);
  await writeJson(CONTRACT_FILES.content, inventory.content);
  await writeJson(CONTRACT_FILES.experiences, inventory.experiences);
  await writeJson(CONTRACT_FILES.index, {
    manifestVersion: 1,
    rootDir: inventory.rootDir,
    routes: CONTRACT_FILES.routes,
    assets: CONTRACT_FILES.assets,
    content: CONTRACT_FILES.content,
    experiences: CONTRACT_FILES.experiences,
    counts: {
      routes: inventory.routes.count,
      assets: inventory.assets.count,
      content: inventory.content.count,
      experiences: inventory.experiences.count
    }
  });
};

export const loadSiteContractManifests = async (): Promise<SiteContractInventory> => {
  const readJson = async <T>(filePath: string): Promise<T> => {
    const raw = await readFile(path.join(ROOT_DIR, filePath), 'utf8');
    return JSON.parse(raw) as T;
  };

  return {
    rootDir: ROOT_DIR,
    routes: await readJson<ContractFile<SiteRouteContract>>(CONTRACT_FILES.routes),
    assets: await readJson<ContractFile<SiteAssetContract>>(CONTRACT_FILES.assets),
    content: await readJson<ContractFile<SiteContentContract>>(CONTRACT_FILES.content),
    experiences: await readJson<ContractFile<SiteExperienceContract>>(CONTRACT_FILES.experiences)
  };
};

export const validateSiteContractManifests = async (): Promise<{ ok: true }> => {
  const current = await buildSiteContractInventory();
  const saved = await loadSiteContractManifests();

  const compare = <T>(name: string, a: ContractFile<T>, b: ContractFile<T>) => {
    const left = JSON.stringify(a);
    const right = JSON.stringify(b);
    if (left !== right) {
      throw new Error(`Contract manifest mismatch for ${name}`);
    }
  };

  compare('routes', current.routes, saved.routes);
  compare('assets', current.assets, saved.assets);
  compare('content', current.content, saved.content);
  compare('experiences', current.experiences, saved.experiences);

  return { ok: true };
};
