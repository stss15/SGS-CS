import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

export type CurriculumTrack = 'ks3' | 'igcse' | 'ib';
export type IbCourseLevel = 'sl' | 'hl';

export interface PilotRoute {
  path: string;
  track: CurriculumTrack;
  description: string;
}

export interface FeatureCard {
  href: string;
  title: string;
  desc?: string;
  icon?: string;
  id?: string;
  comingSoon?: boolean;
}

export interface TopicItem {
  href: string;
  number: string;
  name: string;
}

export interface TopicSection {
  title: string;
  subtitle?: string;
  items: TopicItem[];
}

export interface IGCSEListing {
  sections: TopicSection[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CurriculumIndexFrontmatter {
  title: string;
  description?: string;
  activeSection?: CurriculumTrack;
  breadcrumbs?: BreadcrumbItem[];
  hero: {
    title: string;
    subtitle?: string;
  };
}

export interface CurriculumListingFrontmatter extends CurriculumIndexFrontmatter {
  listingKey: string;
}

export interface CurriculumListingPage extends CurriculumListingFrontmatter {
  sections: TopicSection[];
}

export interface PathwayCard {
  href: string;
  title: string;
  desc: string;
  id?: string;
}



export interface LegacyContentPage {
  title: string;
  description?: string;
  activeSection?: CurriculumTrack;
  breadcrumbs?: BreadcrumbItem[];
  extraStyles?: string[];
  bodyHtml: string;
}

export interface Ib2027SlideRoute {
  level: IbCourseLevel;
  unitSegment: string;
  unitNumber: number;
  slideSlug: string;
  routePath: string;
}

export interface LegacyAliasRoute {
  routePath: string;
}

export interface SlideButton {
  label: string;
  href: string;
}

export interface UnitCard {
  href: string;
  title: string;
  image?: string;
}

export interface UnitResource {
  href: string;
  number?: string;
  name: string;
  type?: string;
  icon?: string;
  target?: string;
}

export interface UnitHero {
  title: string;
  subtitle?: string;
}

export interface UnitIndexFrontmatter {
  title: string;
  description?: string;
  hero: UnitHero;
  cards?: UnitCard[];
  resourcesTitle?: string;
  resources?: UnitResource[];
  studentActivitiesResources?: UnitResource[];
  resourcesSecondaryTitle?: string;
  resourcesSecondary?: UnitResource[];
}

export interface IntroductionBlock {
  bigQuestion?: string;
  overview?: string;
  journey?: string;
}

export interface ConceptBlock {
  title: string;
  icon?: string;
  content: string;
}

export interface TerminologyItem {
  term: string;
  definition: string;
}

export interface SyllabusPoint {
  code: string;
  topic: string;
}

export interface UnitPlanFrontmatter {
  title: string;
  description?: string;
  unitNumber: number;
  unitName: string;
  level: string;
  viewSlidesButtons?: SlideButton[];
  introduction?: IntroductionBlock;
  concepts?: ConceptBlock[];
  terminology?: TerminologyItem[];
  syllabusPoints?: SyllabusPoint[];
  applications?: string[];
  thinkDeeper?: {
    question?: string;
    context?: string;
  };
}

const hasLegacyData = (candidate: string): boolean => existsSync(path.join(candidate, 'src/data/site.json'));

const resolveRepoRoot = (): string => {
  const fromEnv = process.env.SGS_REPO_ROOT;
  const candidates = [
    fromEnv,
    process.cwd(),
    path.resolve(process.cwd(), '..'),
    path.resolve(process.cwd(), '../..'),
    path.resolve(process.cwd(), '../../..'),
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../'),
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../'),
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../../')
  ].filter((value): value is string => Boolean(value));

  for (const candidate of candidates) {
    if (hasLegacyData(candidate)) {
      return candidate;
    }
  }

  throw new Error('Unable to locate repository root for legacy content adapters.');
};

const ROOT_DIR = resolveRepoRoot();
const SITE_DATA_PATH = path.join(ROOT_DIR, 'src/data/site.json');
const HOME_PAGE_PATH = path.join(ROOT_DIR, 'src/pages/index.njk');
const IB_2027_ROOT_DIR = path.join(ROOT_DIR, 'src/pages/ib-2027');
const LEGACY_PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const LEGACY_IB_ARCHIVE_DIR = path.join(ROOT_DIR, 'archive/legacy-ib');
const LEGACY_IB_ARCHIVE_PUBLIC_DIR = path.join(LEGACY_IB_ARCHIVE_DIR, 'public');
const IB_2027_LEGACY_SL_SLIDES_DIR = path.join(LEGACY_PUBLIC_DIR, 'ib-2027/sl/slides');
const IB_2027_LEGACY_HL_SLIDES_DIR = path.join(LEGACY_PUBLIC_DIR, 'ib-2027/hl/slides');
const IB_2027_LEGACY_SL_SCENARIOS_DIR = path.join(LEGACY_PUBLIC_DIR, 'ib-2027/sl/scenarios');
const IB_2027_LEGACY_HL_SCENARIOS_DIR = path.join(LEGACY_PUBLIC_DIR, 'ib-2027/hl/scenarios');
const IB_2027_LEGACY_HL_UNIT4_SCENARIOS_DIR = path.join(LEGACY_PUBLIC_DIR, 'ib-2027/hl/unit-4/scenarios');
const IB_LEGACY_DIR = path.join(LEGACY_IB_ARCHIVE_PUBLIC_DIR, 'ib');
const IGCSE_LEGACY_DIR = path.join(LEGACY_PUBLIC_DIR, 'igcse');
const KS3_LEGACY_DIR = path.join(LEGACY_PUBLIC_DIR, 'ks3');
const IB_LEGACY_NJK_ROOT_DIR = path.join(LEGACY_IB_ARCHIVE_DIR, 'src/pages/ib');
const ROOT_LEGACY_ROUTE_ALLOWLIST = new Set(['/404.html', '/admin.html', '/coming-soon.html']);
const IB_2027_INDEX_PATH = path.join(ROOT_DIR, 'src/pages/ib-2027/index.njk');
const IB_2027_SL_INDEX_PATH = path.join(ROOT_DIR, 'src/pages/ib-2027/sl/index.njk');
const IB_2027_HL_INDEX_PATH = path.join(ROOT_DIR, 'src/pages/ib-2027/hl/index.njk');
const IB_2027_SL_SCENARIO_DIR = path.join(ROOT_DIR, 'src/pages/ib-2027/sl/unit-5/scenarios');
const IB_2027_SL_OOP_PROJECT_DIR = path.join(ROOT_DIR, 'src/pages/ib-2027/sl/unit-5/oop-project');

const fileCache = new Map<string, unknown>();
const IB_LEVEL_ORDER: IbCourseLevel[] = ['sl', 'hl'];
const KS3_LEGACY_ROUTE_ALIASES = new Map<string, string>([
  ['/ks3/year8/mission-control-repair.html', '/ks3/cover/year8.html'],
  ['/ks3/year8/quiz.html', '/ks3/cover/year8-quiz.html'],
  ['/ks3/year9/mission-to-planet-x.html', '/ks3/cover/year9.html'],
  ['/ks3/year9/quiz.html', '/ks3/cover/year9-quiz.html']
]);

const ensureLeadingSlash = (href: string) => (href.startsWith('/') ? href : `/${href}`);
const getIbSlUnitIndexPath = (unitNumber: number) => path.join(ROOT_DIR, `src/pages/ib-2027/sl/unit-${unitNumber}/index.njk`);
const getIbHlUnitIndexPath = (unitNumber: number) => path.join(ROOT_DIR, `src/pages/ib-2027/hl/unit-${unitNumber}/index.njk`);
const getIbSlUnitPlanPath = (unitNumber: number) => path.join(ROOT_DIR, `src/pages/ib-2027/sl/unit-${unitNumber}/unit-plan.njk`);
const getIbHlUnitPlanPath = (unitNumber: number) => path.join(ROOT_DIR, `src/pages/ib-2027/hl/unit-${unitNumber}/unit-plan.njk`);

const readJsonCached = async <T>(filePath: string): Promise<T> => {
  if (fileCache.has(filePath)) {
    return fileCache.get(filePath) as T;
  }

  const raw = await readFile(filePath, 'utf8');
  const parsed = JSON.parse(raw) as T;
  fileCache.set(filePath, parsed);
  return parsed;
};

const readFrontmatterCached = async <T>(filePath: string): Promise<T> => {
  if (fileCache.has(filePath)) {
    return fileCache.get(filePath) as T;
  }

  const raw = await readFile(filePath, 'utf8');
  const parsed = matter(raw).data as T;
  fileCache.set(filePath, parsed);
  return parsed;
};

const getDocumentCacheKey = (filePath: string) => `doc:${filePath}`;

const readDocumentCached = async <T>(filePath: string): Promise<{ data: T; content: string }> => {
  const cacheKey = getDocumentCacheKey(filePath);
  if (fileCache.has(cacheKey)) {
    return fileCache.get(cacheKey) as { data: T; content: string };
  }

  const raw = await readFile(filePath, 'utf8');
  const parsed = matter(raw);
  const result = {
    data: parsed.data as T,
    content: parsed.content
  };

  fileCache.set(cacheKey, result);
  return result;
};

const isRelativeAssetPath = (value: string): boolean =>
  !/^(?:[a-z]+:)?\/\//i.test(value) &&
  !value.startsWith('/') &&
  !value.startsWith('#') &&
  !value.startsWith('?') &&
  !value.startsWith('data:') &&
  !value.startsWith('javascript:');

const absolutizeLegacyAssetPath = (routePath: string, assetPath: string): string => {
  const normalizedRoutePath = normalizeRoutePath(routePath.startsWith('/') ? routePath : `/${routePath}`);
  const baseDirectory = /\/index\.html$/i.test(normalizedRoutePath)
    ? normalizedRoutePath
    : normalizedRoutePath.replace(/[^/]+$/i, '');
  const resolvedUrl = new URL(assetPath, `https://sgs.local${baseDirectory}`);
  return `${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`;
};

const normalizeLegacyBodyHtml = (bodyHtml: string, routePath?: string): string => {
  const withBasePath = bodyHtml.replace(/\{\{\s*basePath\s*\}\}/g, '/');

  if (!routePath) {
    return withBasePath;
  }

  return withBasePath.replace(/\b(href|src)=("([^"]*)"|'([^']*)')/gi, (match, attribute, quotedValue, doubleQuotedValue, singleQuotedValue) => {
    const rawValue = typeof doubleQuotedValue === 'string' ? doubleQuotedValue : singleQuotedValue;
    if (!rawValue || !isRelativeAssetPath(rawValue)) {
      return match;
    }

    const nextValue = absolutizeLegacyAssetPath(routePath, rawValue);
    const quote = quotedValue.startsWith('"') ? '"' : "'";
    return `${attribute}=${quote}${nextValue}${quote}`;
  });
};

const parseUnitNumber = (unitSegment: string): number | null => {
  const match = unitSegment.match(/^unit-(\d+)$/);
  return match ? Number(match[1]) : null;
};

const getLegacyHtmlSlugs = async (directoryPath: string): Promise<string[]> => {
  if (!existsSync(directoryPath)) {
    return [];
  }

  return (await readdir(directoryPath, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => entry.name.replace(/\.html$/, ''))
    .sort((a, b) => a.localeCompare(b));
};

const getLegacyNunjucksPaths = async (directoryPath: string): Promise<string[]> => {
  if (!existsSync(directoryPath)) {
    return [];
  }

  const entries = await readdir(directoryPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) {
        return getLegacyNunjucksPaths(entryPath);
      }

      if (!entry.isFile() || !entry.name.endsWith('.njk')) {
        return [];
      }

      return [entryPath];
    })
  );

  return files.flat().sort((a, b) => a.localeCompare(b));
};

const getLegacyHtmlRoutes = async (directoryPath: string, routePrefix: string): Promise<LegacyAliasRoute[]> => {
  if (!existsSync(directoryPath)) {
    return [];
  }

  const entries = await readdir(directoryPath, { withFileTypes: true });
  const nestedRoutes = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        return getLegacyHtmlRoutes(entryPath, `${routePrefix}/${entry.name}`);
      }

      if (!entry.isFile() || !entry.name.endsWith('.html')) {
        return [];
      }

      return [{ routePath: `${routePrefix}/${entry.name}` }];
    })
  );

  return nestedRoutes.flat().sort((a, b) => a.routePath.localeCompare(b.routePath));
};

const toRouteEntries = (baseRoutePath: string, slugs: string[]): LegacyAliasRoute[] =>
  slugs.map((slug) => ({
    routePath: `${baseRoutePath}/${slug}.html`
  }));

const normalizeRoutePath = (routePath: string): string => routePath.replace(/\\/g, '/');
const resolveLegacyAliasRoutePath = (routePath: string, aliasMap: Map<string, string>): string =>
  aliasMap.get(normalizeRoutePath(routePath)) || normalizeRoutePath(routePath);

const getLegacyPublicPathForRoute = (
  routePath: string,
  allowedPrefixes: string[],
  publicDir: string = LEGACY_PUBLIC_DIR
): string => {
  const normalizedRoutePath = normalizeRoutePath(routePath);

  if (!allowedPrefixes.some((prefix) => normalizedRoutePath.startsWith(prefix)) || normalizedRoutePath.includes('..')) {
    throw new Error(`Invalid legacy alias route path: ${routePath}`);
  }

  const absolutePath = path.resolve(publicDir, `.${normalizedRoutePath}`);
  const publicRoot = `${path.resolve(publicDir)}${path.sep}`;
  if (!absolutePath.startsWith(publicRoot)) {
    throw new Error(`Legacy alias route escaped public root: ${routePath}`);
  }

  return absolutePath;
};

export const pilotRoutes: PilotRoute[] = [
  {
    path: '/index.html',
    track: 'ks3',
    description: 'Primary homepage route parity anchor.'
  },
  {
    path: '/igcse/index.html',
    track: 'igcse',
    description: 'Representative curriculum index route.'
  },
  {
    path: '/ib-2027/sl/unit-1/unit-plan.html',
    track: 'ib',
    description: 'Representative unit-plan route for curriculum depth.'
  }
];

export const pilotRoutePaths = pilotRoutes.map((route) => route.path);

interface LegacySiteData {
  listings: Record<string, IGCSEListing>;
}

interface LegacyHomeFrontmatter {
  cards: FeatureCard[];
}



const mapListingSections = (listing: IGCSEListing, makeAbsolute: boolean): TopicSection[] => {
  return (listing.sections || []).map((section) => ({
    ...section,
    items: (section.items || []).map((item) => ({
      ...item,
      href: makeAbsolute ? ensureLeadingSlash(item.href) : item.href
    }))
  }));
};

const getListingByKey = async (listingKey: string, makeAbsolute = false): Promise<IGCSEListing> => {
  const siteData = await readJsonCached<LegacySiteData>(SITE_DATA_PATH);
  const listing = siteData.listings[listingKey];

  if (!listing) {
    throw new Error(`Missing listing key "${listingKey}" in src/data/site.json`);
  }

  return {
    sections: mapListingSections(listing, makeAbsolute)
  };
};

const getCurriculumListingPage = async (filePath: string): Promise<CurriculumListingPage> => {
  const frontmatter = await readFrontmatterCached<CurriculumListingFrontmatter>(filePath);
  const listing = await getListingByKey(frontmatter.listingKey);
  return {
    ...frontmatter,
    sections: listing.sections
  };
};

export const getHomeFeatureCards = async (): Promise<FeatureCard[]> => {
  const frontmatter = await readFrontmatterCached<LegacyHomeFrontmatter>(HOME_PAGE_PATH);
  return (frontmatter.cards || []).map((card) => ({
    ...card,
    href: ensureLeadingSlash(card.href)
  }));
};

export const getIgcseListing = async (): Promise<IGCSEListing> => {
  return getListingByKey('igcse', true);
};



export const getIb2027SyllabusListing = async (): Promise<CurriculumListingPage> => {
  return getListingByKey('ib-2027', false) as Promise<CurriculumListingPage>;
};

export const getIbSlCurriculumIndex = async (): Promise<CurriculumListingPage> => {
  return getCurriculumListingPage(IB_2027_SL_INDEX_PATH);
};

export const getIbHlCurriculumIndex = async (): Promise<CurriculumListingPage> => {
  return getCurriculumListingPage(IB_2027_HL_INDEX_PATH);
};

const getIbSlScenarioPath = (scenarioSlug: string): string =>
  path.join(IB_2027_SL_SCENARIO_DIR, `${scenarioSlug}.njk`);

export const getIbSlUnit5Scenario = async (scenarioSlug: string): Promise<LegacyContentPage> => {
  const scenarioFilePath = getIbSlScenarioPath(scenarioSlug);
  if (!existsSync(scenarioFilePath)) {
    throw new Error(`Unknown SL Unit 5 scenario: ${scenarioSlug}`);
  }

  const document = await readDocumentCached<Omit<LegacyContentPage, 'bodyHtml'>>(scenarioFilePath);
  return {
    ...document.data,
    extraStyles: document.data.extraStyles || [],
    bodyHtml: normalizeLegacyBodyHtml(document.content, `/ib-2027/sl/unit-5/scenarios/${scenarioSlug}.html`)
  };
};

const getIbSlOopProjectPath = (pagePath: string): string =>
  path.join(IB_2027_SL_OOP_PROJECT_DIR, `${pagePath}.njk`);

export const getIbSlUnit5OopProjectPage = async (pagePath: string): Promise<LegacyContentPage> => {
  const normalizedPath = pagePath.replace(/\\/g, '/').replace(/\.njk$/, '');
  const oopProjectFilePath = getIbSlOopProjectPath(normalizedPath);

  if (!existsSync(oopProjectFilePath)) {
    throw new Error(`Unknown SL Unit 5 OOP Project page: ${normalizedPath}`);
  }

  const document = await readDocumentCached<Omit<LegacyContentPage, 'bodyHtml'>>(oopProjectFilePath);
  return {
    ...document.data,
    extraStyles: document.data.extraStyles || [],
    bodyHtml: normalizeLegacyBodyHtml(document.content, `/ib-2027/sl/unit-5/oop-project/${normalizedPath}.html`)
  };
};

const getIb2027SlidePath = (level: IbCourseLevel, unitSegment: string, slideSlug: string): string =>
  path.join(IB_2027_ROOT_DIR, level, unitSegment, 'slides', `${slideSlug}.html`);

export const getIb2027UnitSlideRoutes = async (): Promise<Ib2027SlideRoute[]> => {
  const routes: Ib2027SlideRoute[] = [];
  const seenSlugs = new Set<string>();

  // 1. Discover slides from the new syllabus-aligned directories (A1/A1.1/slides/, etc.)
  const syllabusPattern = /^[AB]\d$/;
  const subtopicPattern = /^[AB]\d\.\d$/;
  const topLevelEntries = existsSync(IB_2027_ROOT_DIR)
    ? (await readdir(IB_2027_ROOT_DIR, { withFileTypes: true }))
        .filter((e) => e.isDirectory() && syllabusPattern.test(e.name))
    : [];

  for (const topicEntry of topLevelEntries) {
    const topicDir = path.join(IB_2027_ROOT_DIR, topicEntry.name);
    const subtopicDirs = (await readdir(topicDir, { withFileTypes: true }))
      .filter((e) => e.isDirectory() && subtopicPattern.test(e.name))
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const subtopicEntry of subtopicDirs) {
      const slidesDir = path.join(topicDir, subtopicEntry.name, 'slides');
      if (!existsSync(slidesDir)) continue;

      const slideFiles = (await readdir(slidesDir, { withFileTypes: true }))
        .filter((e) => e.isFile() && e.name.endsWith('.html'))
        .sort((a, b) => a.name.localeCompare(b.name));

      for (const slideFile of slideFiles) {
        const slideSlug = slideFile.name.replace(/\.html$/, '');
        seenSlugs.add(slideSlug);
        routes.push({
          level: 'sl' as IbCourseLevel, // syllabus slides are level-neutral
          unitSegment: `${topicEntry.name}/${subtopicEntry.name}`,
          unitNumber: 0,
          slideSlug,
          routePath: `/ib-2027/${topicEntry.name}/${subtopicEntry.name}/slides/${slideSlug}.html`
        });
      }
    }
  }

  // 2. Discover slides from legacy teaching-order directories (sl/unit-N/slides/, hl/unit-N/slides/)
  for (const level of IB_LEVEL_ORDER) {
    const levelDir = path.join(IB_2027_ROOT_DIR, level);
    if (!existsSync(levelDir)) {
      continue;
    }

    const unitDirs = (await readdir(levelDir, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory() && /^unit-\d+$/.test(entry.name))
      .map((entry) => entry.name)
      .sort((a, b) => {
        const unitA = parseUnitNumber(a);
        const unitB = parseUnitNumber(b);
        if (unitA === null || unitB === null) {
          return a.localeCompare(b);
        }
        return unitA - unitB;
      });

    for (const unitSegment of unitDirs) {
      const unitNumber = parseUnitNumber(unitSegment);
      if (unitNumber === null) {
        continue;
      }

      const slidesDir = path.join(levelDir, unitSegment, 'slides');
      if (!existsSync(slidesDir)) {
        continue;
      }

      const slideFiles = (await readdir(slidesDir, { withFileTypes: true }))
        .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
        .map((entry) => entry.name)
        .sort((a, b) => a.localeCompare(b));

      for (const slideFileName of slideFiles) {
        const slideSlug = slideFileName.replace(/\.html$/, '');
        // Skip if already discovered from syllabus structure (dedup)
        if (seenSlugs.has(slideSlug)) continue;
        seenSlugs.add(slideSlug);

        routes.push({
          level,
          unitSegment,
          unitNumber,
          slideSlug,
          routePath: `/ib-2027/${level}/${unitSegment}/slides/${slideSlug}.html`
        });
      }
    }
  }

  return routes;
};

export const getIb2027UnitSlideHtml = async (
  level: IbCourseLevel,
  unitSegment: string,
  slideSlug: string
): Promise<string> => {
  if (!/^[a-zA-Z0-9._\/-]+$/.test(slideSlug)) {
    throw new Error(`Invalid IB slide slug: ${slideSlug}`);
  }

  // Support syllabus-aligned paths (unitSegment like "A1/A1.1")
  if (/^[AB]\d\/[AB]\d\.\d$/.test(unitSegment)) {
    const slidePath = path.join(IB_2027_ROOT_DIR, unitSegment, 'slides', `${slideSlug}.html`);
    if (!existsSync(slidePath)) {
      throw new Error(`Unknown IB slide route: /ib-2027/${unitSegment}/slides/${slideSlug}.html`);
    }
    return readFile(slidePath, 'utf8');
  }

  // Legacy teaching-order paths
  if (!IB_LEVEL_ORDER.includes(level)) {
    throw new Error(`Invalid IB level for slide route: ${level}`);
  }

  if (!/^unit-\d+$/.test(unitSegment)) {
    throw new Error(`Invalid IB unit segment for slide route: ${unitSegment}`);
  }

  const slidePath = getIb2027SlidePath(level, unitSegment, slideSlug);
  if (!existsSync(slidePath)) {
    throw new Error(`Unknown IB slide route: /ib-2027/${level}/${unitSegment}/slides/${slideSlug}.html`);
  }

  return readFile(slidePath, 'utf8');
};

export const getIb2027SlideAliasRoutes = async (): Promise<LegacyAliasRoute[]> => {
  const [slSlideSlugs, hlSlideSlugs] = await Promise.all([
    getLegacyHtmlSlugs(IB_2027_LEGACY_SL_SLIDES_DIR),
    getLegacyHtmlSlugs(IB_2027_LEGACY_HL_SLIDES_DIR)
  ]);

  return [
    ...toRouteEntries('/ib-2027/sl/slides', slSlideSlugs),
    ...toRouteEntries('/ib-2027/hl/slides', hlSlideSlugs)
  ].sort((a, b) => a.routePath.localeCompare(b.routePath));
};

export const getIb2027ScenarioAliasRoutes = async (): Promise<LegacyAliasRoute[]> => {
  const [slScenarioSlugs, hlScenarioSlugs, hlUnit4ScenarioSlugs] = await Promise.all([
    getLegacyHtmlSlugs(IB_2027_LEGACY_SL_SCENARIOS_DIR),
    getLegacyHtmlSlugs(IB_2027_LEGACY_HL_SCENARIOS_DIR),
    getLegacyHtmlSlugs(IB_2027_LEGACY_HL_UNIT4_SCENARIOS_DIR)
  ]);

  return [
    ...toRouteEntries('/ib-2027/sl/scenarios', slScenarioSlugs),
    ...toRouteEntries('/ib-2027/hl/scenarios', hlScenarioSlugs),
    ...toRouteEntries('/ib-2027/hl/unit-4/scenarios', hlUnit4ScenarioSlugs)
  ].sort((a, b) => a.routePath.localeCompare(b.routePath));
};

export const getIb2027AliasRouteHtml = async (routePath: string): Promise<string> => {
  const normalizedRoutePath = normalizeRoutePath(routePath);
  if (!normalizedRoutePath.endsWith('.html')) {
    throw new Error(`Legacy alias route must end with .html: ${routePath}`);
  }

  const sourcePath = getLegacyPublicPathForRoute(normalizedRoutePath, ['/ib-2027/']);
  if (!existsSync(sourcePath)) {
    throw new Error(`Unknown legacy alias route source: ${normalizedRoutePath}`);
  }

  return readFile(sourcePath, 'utf8');
};

export const getIbLegacyNunjucksRoutes = async (): Promise<LegacyAliasRoute[]> => {
  const sourceFiles = await getLegacyNunjucksPaths(IB_LEGACY_NJK_ROOT_DIR);

  return sourceFiles
    .map((filePath) => {
      const relativePath = normalizeRoutePath(path.relative(IB_LEGACY_NJK_ROOT_DIR, filePath));
      return {
        routePath: `/ib/${relativePath.replace(/\.njk$/, '.html')}`
      };
    })
    .sort((a, b) => a.routePath.localeCompare(b.routePath));
};

export const getIbLegacyAllRoutes = async (): Promise<LegacyAliasRoute[]> => {
  return getLegacyHtmlRoutes(IB_LEGACY_DIR, '/ib');
};

export const getIbLegacyRouteHtml = async (routePath: string): Promise<string> => {
  const normalizedRoutePath = normalizeRoutePath(routePath);
  if (!normalizedRoutePath.endsWith('.html')) {
    throw new Error(`Legacy IB route must end with .html: ${routePath}`);
  }

  const sourcePath = getLegacyPublicPathForRoute(normalizedRoutePath, ['/ib/'], LEGACY_IB_ARCHIVE_PUBLIC_DIR);
  if (!existsSync(sourcePath)) {
    throw new Error(`Unknown legacy IB route source: ${normalizedRoutePath}`);
  }

  return readFile(sourcePath, 'utf8');
};

export const getIgcseLegacyRoutes = async (): Promise<LegacyAliasRoute[]> => {
  return getLegacyHtmlRoutes(IGCSE_LEGACY_DIR, '/igcse');
};

export const getIgcseLegacyRouteHtml = async (routePath: string): Promise<string> => {
  const normalizedRoutePath = normalizeRoutePath(routePath);
  if (!normalizedRoutePath.endsWith('.html')) {
    throw new Error(`Legacy IGCSE route must end with .html: ${routePath}`);
  }

  const sourcePath = getLegacyPublicPathForRoute(normalizedRoutePath, ['/igcse/']);
  if (!existsSync(sourcePath)) {
    throw new Error(`Unknown legacy IGCSE route source: ${normalizedRoutePath}`);
  }

  return readFile(sourcePath, 'utf8');
};

export const getKs3LegacyRoutes = async (): Promise<LegacyAliasRoute[]> => {
  const discoveredRoutes = await getLegacyHtmlRoutes(KS3_LEGACY_DIR, '/ks3');
  const routeMap = new Map(discoveredRoutes.map((route) => [route.routePath, route]));

  KS3_LEGACY_ROUTE_ALIASES.forEach((_sourceRoutePath, routePath) => {
    routeMap.set(routePath, { routePath });
  });

  return Array.from(routeMap.values()).sort((a, b) => a.routePath.localeCompare(b.routePath));
};

export const resolveKs3LegacySourceRoutePath = (routePath: string): string =>
  resolveLegacyAliasRoutePath(routePath, KS3_LEGACY_ROUTE_ALIASES);

export const getKs3LegacyRouteHtml = async (routePath: string): Promise<string> => {
  const normalizedRoutePath = normalizeRoutePath(routePath);
  if (!normalizedRoutePath.endsWith('.html')) {
    throw new Error(`Legacy KS3 route must end with .html: ${routePath}`);
  }

  const sourceRoutePath = resolveKs3LegacySourceRoutePath(normalizedRoutePath);
  const sourcePath = getLegacyPublicPathForRoute(sourceRoutePath, ['/ks3/']);
  if (!existsSync(sourcePath)) {
    throw new Error(`Unknown legacy KS3 route source: ${normalizedRoutePath}`);
  }

  return readFile(sourcePath, 'utf8');
};

export const getRootLegacyRouteHtml = async (routePath: string): Promise<string> => {
  const normalizedRoutePath = normalizeRoutePath(routePath);
  if (!ROOT_LEGACY_ROUTE_ALLOWLIST.has(normalizedRoutePath)) {
    throw new Error(`Unsupported root legacy route: ${routePath}`);
  }

  const sourcePath = getLegacyPublicPathForRoute(normalizedRoutePath, [normalizedRoutePath]);
  if (!existsSync(sourcePath)) {
    throw new Error(`Unknown root legacy route source: ${normalizedRoutePath}`);
  }

  return readFile(sourcePath, 'utf8');
};

const UNIT_PLAN_TITLE_PLACEHOLDER_PATTERN = /\{\{\s*unit(?:Number|Name)\s*\}\}/i;

const normalizeUnitPlanFrontmatter = (frontmatter: UnitPlanFrontmatter): UnitPlanFrontmatter => {
  if (!UNIT_PLAN_TITLE_PLACEHOLDER_PATTERN.test(frontmatter.title)) {
    return frontmatter;
  }

  return {
    ...frontmatter,
    title: `Unit ${frontmatter.unitNumber}: ${frontmatter.unitName} - SGS Computer Science`
  };
};

export const getIbSlUnitPlan = async (unitNumber: number): Promise<UnitPlanFrontmatter> => {
  if (!Number.isInteger(unitNumber) || unitNumber < 1) {
    throw new Error(`Invalid IB SL unit number: ${unitNumber}`);
  }
  return normalizeUnitPlanFrontmatter(await readFrontmatterCached<UnitPlanFrontmatter>(getIbSlUnitPlanPath(unitNumber)));
};

export const getIbHlUnitPlan = async (unitNumber: number): Promise<UnitPlanFrontmatter> => {
  if (!Number.isInteger(unitNumber) || unitNumber < 1) {
    throw new Error(`Invalid IB HL unit number: ${unitNumber}`);
  }
  return normalizeUnitPlanFrontmatter(await readFrontmatterCached<UnitPlanFrontmatter>(getIbHlUnitPlanPath(unitNumber)));
};

export const getIbSlUnit1Plan = async (): Promise<UnitPlanFrontmatter> => {
  return getIbSlUnitPlan(1);
};

export const getIbSlUnitIndex = async (unitNumber: number): Promise<UnitIndexFrontmatter> => {
  if (!Number.isInteger(unitNumber) || unitNumber < 1) {
    throw new Error(`Invalid IB SL unit number: ${unitNumber}`);
  }
  return readFrontmatterCached<UnitIndexFrontmatter>(getIbSlUnitIndexPath(unitNumber));
};

export const getIbHlUnitIndex = async (unitNumber: number): Promise<UnitIndexFrontmatter> => {
  if (!Number.isInteger(unitNumber) || unitNumber < 1) {
    throw new Error(`Invalid IB HL unit number: ${unitNumber}`);
  }
  return readFrontmatterCached<UnitIndexFrontmatter>(getIbHlUnitIndexPath(unitNumber));
};

export const getIbSlUnit1Index = async (): Promise<UnitIndexFrontmatter> => {
  return getIbSlUnitIndex(1);
};

export const getIbSlUnit2Index = async (): Promise<UnitIndexFrontmatter> => {
  return getIbSlUnitIndex(2);
};

export const getIbSlUnit3Index = async (): Promise<UnitIndexFrontmatter> => {
  return getIbSlUnitIndex(3);
};
