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

export interface FooterLink {
  href: string;
  label: string;
}

export interface HomePageData {
  cards: FeatureCard[];
  footerLink?: FooterLink;
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

export interface Ib2027PathwayIndex extends CurriculumIndexFrontmatter {
  pathways: PathwayCard[];
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
const IB_2027_LEGACY_SL_SLIDES_DIR = path.join(LEGACY_PUBLIC_DIR, 'ib-2027/sl/slides');
const IB_2027_LEGACY_HL_SLIDES_DIR = path.join(LEGACY_PUBLIC_DIR, 'ib-2027/hl/slides');
const IB_2027_LEGACY_SL_SCENARIOS_DIR = path.join(LEGACY_PUBLIC_DIR, 'ib-2027/sl/scenarios');
const IB_2027_LEGACY_HL_SCENARIOS_DIR = path.join(LEGACY_PUBLIC_DIR, 'ib-2027/hl/scenarios');
const IB_2027_LEGACY_HL_UNIT4_SCENARIOS_DIR = path.join(LEGACY_PUBLIC_DIR, 'ib-2027/hl/unit-4/scenarios');
const IGCSE_LEGACY_DIR = path.join(LEGACY_PUBLIC_DIR, 'igcse');
const KS3_LEGACY_DIR = path.join(LEGACY_PUBLIC_DIR, 'ks3');
const IB_LEGACY_NJK_ROOT_DIR = path.join(ROOT_DIR, 'src/pages/ib');
const ROOT_LEGACY_ROUTE_ALLOWLIST = new Set(['/404.html', '/admin.html', '/coming-soon.html']);
const IB_2027_INDEX_PATH = path.join(ROOT_DIR, 'src/pages/ib-2027/index.njk');
const IB_2027_SL_INDEX_PATH = path.join(ROOT_DIR, 'src/pages/ib-2027/sl/index.njk');
const IB_2027_HL_INDEX_PATH = path.join(ROOT_DIR, 'src/pages/ib-2027/hl/index.njk');
const IB_2027_SL_SCENARIO_DIR = path.join(ROOT_DIR, 'src/pages/ib-2027/sl/unit-5/scenarios');
const IB_2027_SL_OOP_PROJECT_DIR = path.join(ROOT_DIR, 'src/pages/ib-2027/sl/unit-5/oop-project');

const fileCache = new Map<string, unknown>();
const IB_LEVEL_ORDER: IbCourseLevel[] = ['sl', 'hl'];

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

const normalizeLegacyBodyHtml = (bodyHtml: string): string => {
  return bodyHtml.replace(/\{\{\s*basePath\s*\}\}/g, '/');
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

const getLegacyPublicPathForRoute = (routePath: string, allowedPrefixes: string[]): string => {
  const normalizedRoutePath = normalizeRoutePath(routePath);

  if (!allowedPrefixes.some((prefix) => normalizedRoutePath.startsWith(prefix)) || normalizedRoutePath.includes('..')) {
    throw new Error(`Invalid legacy alias route path: ${routePath}`);
  }

  const absolutePath = path.resolve(LEGACY_PUBLIC_DIR, `.${normalizedRoutePath}`);
  const publicRoot = `${path.resolve(LEGACY_PUBLIC_DIR)}${path.sep}`;
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
  footerLink?: FooterLink;
}

const IB_2027_PATHWAY_CARDS: PathwayCard[] = [
  {
    href: 'sl/index.html',
    id: 'card-sl',
    title: 'Standard Level (SL)',
    desc: '12 units covering core computational thinking, programming, and system design.'
  },
  {
    href: 'hl/index.html',
    id: 'card-hl',
    title: 'Higher Level (HL)',
    desc: '11 advanced units including ADTs, recursion, machine learning, and systems control.'
  }
];

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

export const getHomePageData = async (): Promise<HomePageData> => {
  const frontmatter = await readFrontmatterCached<LegacyHomeFrontmatter>(HOME_PAGE_PATH);
  return {
    cards: (frontmatter.cards || []).map((card) => ({
      ...card,
      href: ensureLeadingSlash(card.href)
    })),
    footerLink: frontmatter.footerLink
      ? {
          ...frontmatter.footerLink,
          href: ensureLeadingSlash(frontmatter.footerLink.href)
        }
      : undefined
  };
};

export const getHomeFeatureCards = async (): Promise<FeatureCard[]> => {
  const homePage = await getHomePageData();
  return homePage.cards;
};

export const getIgcseListing = async (): Promise<IGCSEListing> => {
  return getListingByKey('igcse', true);
};

export const getIb2027PathwayIndex = async (): Promise<Ib2027PathwayIndex> => {
  const frontmatter = await readFrontmatterCached<CurriculumIndexFrontmatter>(IB_2027_INDEX_PATH);
  return {
    ...frontmatter,
    pathways: IB_2027_PATHWAY_CARDS
  };
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
    bodyHtml: normalizeLegacyBodyHtml(document.content)
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
    bodyHtml: normalizeLegacyBodyHtml(document.content)
  };
};

const getIb2027SlidePath = (level: IbCourseLevel, unitSegment: string, slideSlug: string): string =>
  path.join(IB_2027_ROOT_DIR, level, unitSegment, 'slides', `${slideSlug}.html`);

export const getIb2027UnitSlideRoutes = async (): Promise<Ib2027SlideRoute[]> => {
  const routes: Ib2027SlideRoute[] = [];

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
  if (!IB_LEVEL_ORDER.includes(level)) {
    throw new Error(`Invalid IB level for slide route: ${level}`);
  }

  if (!/^unit-\d+$/.test(unitSegment)) {
    throw new Error(`Invalid IB unit segment for slide route: ${unitSegment}`);
  }

  if (!/^[a-zA-Z0-9._-]+$/.test(slideSlug)) {
    throw new Error(`Invalid IB slide slug: ${slideSlug}`);
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
  return getLegacyHtmlRoutes(path.join(LEGACY_PUBLIC_DIR, 'ib'), '/ib');
};

export const getIbLegacyRouteHtml = async (routePath: string): Promise<string> => {
  const normalizedRoutePath = normalizeRoutePath(routePath);
  if (!normalizedRoutePath.endsWith('.html')) {
    throw new Error(`Legacy IB route must end with .html: ${routePath}`);
  }

  const sourcePath = getLegacyPublicPathForRoute(normalizedRoutePath, ['/ib/']);
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
  return getLegacyHtmlRoutes(KS3_LEGACY_DIR, '/ks3');
};

export const getKs3LegacyRouteHtml = async (routePath: string): Promise<string> => {
  const normalizedRoutePath = normalizeRoutePath(routePath);
  if (!normalizedRoutePath.endsWith('.html')) {
    throw new Error(`Legacy KS3 route must end with .html: ${routePath}`);
  }

  const sourcePath = getLegacyPublicPathForRoute(normalizedRoutePath, ['/ks3/']);
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

export const getIbSlUnitPlan = async (unitNumber: number): Promise<UnitPlanFrontmatter> => {
  if (!Number.isInteger(unitNumber) || unitNumber < 1) {
    throw new Error(`Invalid IB SL unit number: ${unitNumber}`);
  }
  return readFrontmatterCached<UnitPlanFrontmatter>(getIbSlUnitPlanPath(unitNumber));
};

export const getIbHlUnitPlan = async (unitNumber: number): Promise<UnitPlanFrontmatter> => {
  if (!Number.isInteger(unitNumber) || unitNumber < 1) {
    throw new Error(`Invalid IB HL unit number: ${unitNumber}`);
  }
  return readFrontmatterCached<UnitPlanFrontmatter>(getIbHlUnitPlanPath(unitNumber));
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
