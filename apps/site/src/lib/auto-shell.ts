import path from 'node:path';
import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import {
  decodeHtmlEntities,
  getListingByKey,
  readMarkdownDocument,
  readSourceFrontmatter,
  repoRoot
} from './source-content';
import { rewriteIgcseCourseHref } from './course-links';
import {
  buildPrevNextLinks,
  hrefMatchesCurrentPath,
  normalizeShellPath,
  type ShellContext,
  type ShellMode,
  type ShellNavGroup,
  type ShellNavItem,
  type ShellPageLink
} from './curriculum-shell';
import { isIgcseWorkspaceRoute, isKs3WorkspaceRoute } from './legacy-route-classification';

interface TopicResourceLink {
  href: string;
  number?: string;
  name?: string;
  type?: string;
  icon?: string;
  target?: string;
}

interface TopicTaskCard {
  href: string;
  title: string;
  subtitle?: string;
}

interface TopicSpecification {
  examCode?: string;
  unitSummary?: string;
  objectives?: string[];
  outcomes?: string[];
  subtopics?: string[];
}

interface LegacyTopicFrontmatter {
  title: string;
  description?: string;
  hero?: {
    title?: string;
    subtitle?: string;
  };
  specification?: TopicSpecification;
  textbookResources?: TopicResourceLink[];
  slideDeckResources?: TopicResourceLink[];
  studentActivitiesResources?: TopicResourceLink[];
  assessmentResources?: TopicResourceLink[];
  homeworkResources?: TopicResourceLink[];
  independentTasks?: TopicTaskCard[];
  revisionResources?: TopicResourceLink[];
}

interface TextbookFrontmatter {
  subtopics?: Array<{
    code: string;
    title: string;
  }>;
}

interface ListingItemRecord {
  href: string;
  number?: string;
  name: string;
  icon?: string;
}

interface ListingSectionRecord {
  title: string;
  subtitle?: string;
  items: ListingItemRecord[];
}

interface ListingRecord {
  sections: ListingSectionRecord[];
}

interface ShellBreadcrumb {
  label: string;
  href?: string;
}

const isValidStudentHref = (href?: string): href is string => {
  if (!href) {
    return false;
  }

  return !href.startsWith('#') && !href.startsWith('javascript:') && !/\/coming-soon(?:\.html)?$/i.test(href);
};

const ensureAbsoluteHref = (basePath: string, href: string): string => {
  if (!href) {
    return href;
  }

  if (/^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith('#') || href.startsWith('javascript:')) {
    return href;
  }

  if (href.startsWith('/')) {
    return href;
  }

  const joined = path.posix.join(basePath, href);
  return joined.startsWith('/') ? joined : `/${joined}`;
};

const formatTitleCase = (value: string): string =>
  decodeHtmlEntities(value)
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const humanizeRouteLabel = (value: string): string =>
  formatTitleCase(
    value
      .replace(/\.html$/i, '')
      .replace(/\bsl\b/gi, 'SL')
      .replace(/\bhl\b/gi, 'HL')
      .replace(/\boop\b/gi, 'OOP')
      .replace(/\bsql\b/gi, 'SQL')
      .replace(/\bnosql\b/gi, 'NoSQL')
  );

const getTopicNumberFromPath = (pathname: string): number | null => {
  const match = normalizeShellPath(pathname).match(/^\/igcse\/topic(\d+)(?:\/|$)/i);
  return match ? Number(match[1]) : null;
};

const getKs3RouteParts = (pathname: string) => {
  const segments = normalizeShellPath(pathname).split('/').filter(Boolean);
  if (segments[0] !== 'ks3' || !/^year\d+$/i.test(segments[1] || '')) {
    return null;
  }

  const year = segments[1].toLowerCase();
  const thirdSegment = segments[2]?.toLowerCase() || null;
  const unit = thirdSegment && /^unit\d+$/i.test(thirdSegment) ? thirdSegment : null;
  const leafSegments = unit ? segments.slice(3) : segments.slice(2);

  return {
    year,
    unit,
    leaf: leafSegments.length > 0 ? leafSegments.join('/') : null
  };
};

const getIbRouteParts = (pathname: string) => {
  const norm = normalizeShellPath(pathname);

  // Match syllabus paths: /ib-2027/A1, /ib-2027/B2/B2.3/slides/...
  const syllabusMatch = norm.match(/^\/ib-2027\/([AB]\d)(?:\/(.+))?$/i);
  if (syllabusMatch) {
    const unitCode = syllabusMatch[1].toUpperCase(); // e.g. "A1", "B2"
    const rest = syllabusMatch[2] || null;            // e.g. "B2.3/slides/foo"
    const subtopicMatch = rest?.match(/^([AB]\d\.\d+)(?:\/(.+))?$/i);
    return {
      unitCode,
      subtopic: subtopicMatch ? subtopicMatch[1].toUpperCase() : null,
      leaf: subtopicMatch ? (subtopicMatch[2] || null) : rest
    };
  }

  // Legacy SL/HL paths — sidebar falls through to default IB shell
  const legacyMatch = norm.match(/^\/ib-2027\/(sl|hl)(?:\/(unit-\d+)(?:\/(.+))?)?$/i);
  if (legacyMatch) {
    return null;
  }

  return null;
};

const findNumberedResource = (resources: TopicResourceLink[] = [], code: string): TopicResourceLink | undefined =>
  resources.find((resource) => {
    const resourceNumber = String(resource.number || '').trim();
    if (resourceNumber && resourceNumber === code) {
      return true;
    }

    const resourceName = String(resource.name || '').trim();
    return resourceName.startsWith(code);
  });

const buildSectionGroup = (
  id: string,
  label: string,
  items: ShellNavItem[],
  options: {
    meta?: string;
    sequence?: boolean;
    open?: boolean;
    collapsible?: boolean;
    divider?: boolean;
    icon?: string;
    allowEmpty?: boolean;
    groupHref?: string;
  } = {}
): ShellNavGroup | null => {
  if (items.length === 0 && !options.allowEmpty) {
    return null;
  }

  return {
    id,
    label,
    items,
    meta: options.meta,
    sequence: options.sequence,
    open: options.open,
    collapsible: options.collapsible,
    divider: options.divider,
    icon: options.icon,
    groupHref: options.groupHref
  };
};

const findCurrentLocation = (groups: ShellNavGroup[], currentPath: string) => {
  for (const group of groups) {
    const item = group.items.find((candidate) => hrefMatchesCurrentPath(candidate.href, currentPath));
    if (item) {
      return { group, item };
    }
  }

  return {};
};

const readIgcseTopicFrontmatter = async (topicNumber: number): Promise<LegacyTopicFrontmatter> =>
  readSourceFrontmatter<LegacyTopicFrontmatter>(`src/pages/igcse/topic${topicNumber}/index.njk`);

const readIgcseTextbookFrontmatter = async (topicNumber: number): Promise<TextbookFrontmatter> => {
  try {
    const document = await readMarkdownDocument<TextbookFrontmatter>(
      `apps/site/src/content/igcse-textbooks/topic-${topicNumber}.md`
    );
    return document.data;
  } catch {
    return {};
  }
};

const buildIgcseCourseGroups = async (): Promise<ShellNavGroup[]> => {
  const listing = await getListingByKey<ListingRecord>('igcse');
  return (listing.sections || []).map((section) => ({
    id: section.title.toLowerCase().replace(/\s+/g, '-'),
    label: section.title,
    meta: section.subtitle,
    courseLevel: true,
    items: (section.items || []).map((item) => ({
      label: `${item.number}. ${item.name}`,
      href: item.href
    }))
  }));
};

const buildIgcseTopicShell = async (pathname: string): Promise<{
  shellContext: ShellContext;
  layoutMode: ShellMode;
  breadcrumbs?: ShellBreadcrumb[];
  prevLink?: ShellPageLink;
  nextLink?: ShellPageLink;
}> => {
  const topicNumber = getTopicNumberFromPath(pathname);

  if (!topicNumber) {
    const courseGroups = await buildIgcseCourseGroups();
    return {
      shellContext: {
        title: 'IGCSE',
        meta: 'Cambridge IGCSE Computer Science',
        groups: courseGroups
      },
      layoutMode: 'worksheet',
      breadcrumbs: [{ label: 'IGCSE' }]
    };
  }

  const [frontmatter, textbookData, courseGroups] = await Promise.all([
    readIgcseTopicFrontmatter(topicNumber),
    readIgcseTextbookFrontmatter(topicNumber),
    buildIgcseCourseGroups()
  ]);

  const topicPath = `/igcse/topic${topicNumber}`;
  const overviewHref = `${topicPath}/index.html`;
  const topicTextbookHref = `${topicPath}/textbook.html`;
  const currentPath = normalizeShellPath(pathname);
  const rewriteTopicHref = (href: string) => rewriteIgcseCourseHref(topicNumber, href);
  const localGroups: ShellNavGroup[] = [];

  const overviewGroup = buildSectionGroup(
    'overview',
    'Overview',
    [{ label: 'Topic overview', href: overviewHref, meta: 'Objectives and daily sequence' }],
    { sequence: true, open: true }
  );
  if (overviewGroup) {
    localGroups.push(overviewGroup);
  }

  const textbookSubtopics = textbookData.subtopics || [];
  for (const subtopic of textbookSubtopics) {
    const items: ShellNavItem[] = [];
    const slide = findNumberedResource(frontmatter.slideDeckResources, subtopic.code);
    const assessment = findNumberedResource(frontmatter.assessmentResources, subtopic.code);

    items.push({
      label: 'Read chapter',
      href: `${topicPath}/textbook/${subtopic.code.replace('.', '-')}.html`,
      meta: subtopic.title
    });

    if (slide && isValidStudentHref(slide.href)) {
      items.push({
        label: 'Slide deck',
        href: rewriteTopicHref(ensureAbsoluteHref(topicPath, slide.href)),
        meta: slide.name || subtopic.title
      });
    }

    if (assessment && isValidStudentHref(assessment.href)) {
      items.push({
        label: 'Mini-assessment',
        href: rewriteTopicHref(ensureAbsoluteHref(topicPath, assessment.href)),
        meta: assessment.name || subtopic.title
      });
    }

    const group = buildSectionGroup(
      `subtopic-${subtopic.code.replace('.', '-')}`,
      `${subtopic.code} ${subtopic.title}`,
      items,
      { sequence: true }
    );

    if (group) {
      localGroups.push(group);
    }
  }

  const studentActivities = (frontmatter.studentActivitiesResources || [])
    .filter((item) => isValidStudentHref(item.href))
    .map((item) => ({
      label: item.name || 'Activity',
      href: rewriteTopicHref(ensureAbsoluteHref(topicPath, item.href)),
      meta: item.type
    }));

  if (studentActivities.length > 0) {
    localGroups.push({
      id: 'activities',
      label: 'Activities',
      items: studentActivities,
      sequence: true
    });
  }

  const independentPractice = (frontmatter.independentTasks || [])
    .filter((item) => isValidStudentHref(item.href))
    .map((item) => ({
      label: item.title,
      href: rewriteTopicHref(ensureAbsoluteHref(topicPath, item.href)),
      meta: item.subtitle
    }));

  if (independentPractice.length > 0) {
    localGroups.push({
      id: 'practice',
      label: topicNumber === 1 ? '1.1 Practice' : 'Practice',
      items: independentPractice,
      sequence: true
    });
  }

  const revisionItems = [
    ...(frontmatter.textbookResources || [])
      .filter((item) => isValidStudentHref(item.href))
      .filter((item) => !/textbook\/\d/.test(item.href))
      .map((item) => ({
        label: item.name || 'Topic textbook',
        href: rewriteTopicHref(ensureAbsoluteHref(topicPath, item.href)),
        meta: item.type
      })),
    ...(frontmatter.revisionResources || [])
      .filter((item) => isValidStudentHref(item.href))
      .map((item) => ({
        label: item.name || 'Revision resource',
        href: rewriteTopicHref(ensureAbsoluteHref(topicPath, item.href)),
        meta: item.type
      }))
  ];

  if (revisionItems.length === 0 && textbookSubtopics.length === 0) {
    revisionItems.push({
      label: 'Topic textbook',
      href: topicTextbookHref,
      meta: 'Reading mode'
    });
  }

  const revisionGroup = buildSectionGroup('revision', 'Revision & Reading', revisionItems, {
    open: currentPath.includes('/textbook') || currentPath.includes('/flashcards')
  });
  if (revisionGroup) {
    localGroups.push(revisionGroup);
  }

  const layoutMode: ShellMode = currentPath.includes('/textbook')
    ? 'reading'
    : isIgcseWorkspaceRoute(currentPath)
    ? 'workspace'
    : 'worksheet';

  const { prevLink, nextLink } = buildPrevNextLinks(localGroups, currentPath);
  const currentLocation = findCurrentLocation(localGroups, currentPath);
  const breadcrumbs: ShellBreadcrumb[] = [
    { label: 'IGCSE', href: '/igcse/index.html' },
    { label: `Topic ${topicNumber}`, href: overviewHref }
  ];

  if (currentLocation.group && !hrefMatchesCurrentPath(overviewHref, currentPath)) {
    if (currentLocation.group.label !== 'Overview') {
      breadcrumbs.push({ label: currentLocation.group.label });
    }

    if (
      currentLocation.item &&
      currentLocation.item.label !== 'Topic overview' &&
      currentLocation.item.label !== currentLocation.group.label
    ) {
      breadcrumbs.push({ label: currentLocation.item.label });
    }
  }

  return {
    shellContext: {
      title: `Topic ${topicNumber}`,
      meta: frontmatter.hero?.title || frontmatter.specification?.examCode,
      groups: [...localGroups, ...courseGroups]
    },
    layoutMode,
    breadcrumbs,
    prevLink,
    nextLink
  };
};

const KS3_YEAR_LISTING_KEYS: Record<string, string> = {
  year7: 'ks3-year7',
  year8: 'ks3-year8',
  year9: 'ks3-year9'
};

const KS3_YEAR_SHELL_ICONS: Record<string, string> = {
  year7: 'fa-solid fa-laptop-code',
  year8: 'fa-solid fa-laptop-code',
  year9: 'fa-solid fa-laptop-code'
};

const formatKs3YearLabel = (year: string): string => year.replace(/^year/i, 'Year ');
const formatKs3ShellMeta = (year: string): string => `${formatKs3YearLabel(year)} Curriculum`;

const buildKs3CourseGroups = async (
  listingKey: string,
): Promise<{ listing: ListingRecord; groups: ShellNavGroup[] }> => {
  const listing = await getListingByKey<ListingRecord>(listingKey);

  return {
    listing,
    groups: (listing.sections || []).map((section) => ({
      id: `${listingKey}-${section.title.toLowerCase().replace(/\s+/g, '-')}`,
      label: section.title,
      meta: section.subtitle,
      courseLevel: true,
      items: (section.items || []).map((item) => ({
        label: item.name,
        href: item.href,
        number: item.number,
        icon: item.icon
      }))
    }))
  };
};

const KS3_UNIT_SECTION_ICONS = {
  overview: 'fa-solid fa-binoculars',
  lessons: 'fa-solid fa-book-open',
  activities: 'fa-solid fa-laptop-code',
  homework: 'fa-solid fa-house',
  assessment: 'fa-solid fa-file-pen',
  textbook: 'fa-solid fa-book-open-reader',
  revision: 'fa-solid fa-rotate-left'
} as const;

const KS3_RESOURCE_LABEL_OVERRIDES: Record<string, string> = {
  '/ks3/year7/unit2/L1_digital_you.html': 'Digital You',
  '/ks3/year7/unit2/L2_the_trail_you_leave_behind.html': 'The Trail You Leave Behind',
  '/ks3/year7/unit2/L3_what_will_people_think.html': 'What Will People Think?',
  '/ks3/year7/unit2/L4_public_vs_private_data.html': 'Public vs Private Data Online',
  '/ks3/year7/unit2/L5_who_is_watching.html': 'Who Is Watching?',
  '/ks3/year7/unit2/L6_the_cost_of_free.html': 'The Cost of Free',
  '/ks3/year7/unit2/L7_cyberbullying_and_harmful_contact.html': 'Cyberbullying & Harmful Contact',
  '/ks3/year7/unit2/L8_digital_citizenship_pledge.html': 'Digital Citizenship Pledge',
  '/ks3/year7/unit2/activity1.html': 'Who Is John Doe',
  '/ks3/year7/unit2/activity2.html': 'Data Detective',
  '/ks3/year7/unit2/activity3.html': 'Swipe Scenarios',
  '/ks3/year7/unit2/assessment-l1-l3-comprehensive.html': 'Mid-Unit Assessment',
  '/ks3/year7/unit2/quiz-l1-mcq.html': 'Lesson 1 Quiz',
  '/ks3/year7/unit2/quiz-l2-mcq.html': 'Lesson 2 Quiz',
  '/ks3/year7/unit2/quiz-l3-mcq.html': 'Lesson 3 Quiz'
};

const getKs3UnitNumber = (unitSlug: string): string =>
  unitSlug.replace(/^unit/i, '').trim();

const findKs3UnitItem = (listing: ListingRecord, unitSlug: string): ListingItemRecord | undefined => {
  const unitNumber = getKs3UnitNumber(unitSlug);
  const normalizedUnitPath = normalizeShellPath(`/ks3/${unitSlug}.html`);

  return (listing.sections || [])
    .flatMap((section) => section.items || [])
    .find((item) => item.number === unitNumber || normalizeShellPath(item.href).endsWith(`/${unitSlug}`) || normalizeShellPath(item.href) === normalizedUnitPath);
};

const buildDisabledShellItem = (label: string, number?: string): ShellNavItem => ({
  label,
  href: '#',
  disabled: true,
  ...(number ? { number } : {})
});

const getKs3ResourceLabel = (href: string, filename: string): string =>
  KS3_RESOURCE_LABEL_OVERRIDES[href] || humanizeRouteLabel(filename);

const getLeadingNumber = (value: string, pattern: RegExp): number => {
  const match = value.match(pattern);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
};

const readPublicKs3UnitItems = async (
  year: string,
  unit: string,
  matcher: (filename: string) => boolean,
  numberPattern: RegExp,
  sortValue: (filename: string) => number = (filename) => getLeadingNumber(filename, numberPattern)
): Promise<ShellNavItem[]> => {
  const absoluteDir = path.join(repoRoot, 'public', 'ks3', year, unit);
  if (!existsSync(absoluteDir)) {
    return [];
  }

  const entries = await readdir(absoluteDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html') && matcher(entry.name))
    .sort((left, right) => sortValue(left.name) - sortValue(right.name) || left.name.localeCompare(right.name))
    .map((entry) => {
      const href = `/ks3/${year}/${unit}/${entry.name}`;
      const numberMatch = entry.name.match(numberPattern);
      return {
        label: getKs3ResourceLabel(href, entry.name),
        href,
        ...(numberMatch?.[1] ? { number: String(Number(numberMatch[1])) } : {})
      };
    });
};

const findFirstExistingKs3Resource = (year: string, unit: string, candidates: string[]): string | null => {
  for (const candidate of candidates) {
    if (existsSync(path.join(repoRoot, 'public', 'ks3', year, unit, candidate))) {
      return `/ks3/${year}/${unit}/${candidate}`;
    }
  }

  return null;
};

const buildKs3UnitResources = async (year: string, unit: string) => {
  const lessons = await readPublicKs3UnitItems(year, unit, (filename) => /^L\d+.*\.html$/i.test(filename), /^L(\d+)/i);
  const activities = await readPublicKs3UnitItems(
    year,
    unit,
    (filename) => /^activity\d+\.html$/i.test(filename),
    /^activity(\d+)/i
  );
  const assessment = await readPublicKs3UnitItems(
    year,
    unit,
    (filename) => /^(assessment.*|quiz.*)\.html$/i.test(filename),
    /(\d+)/,
    (filename) => (/^assessment/i.test(filename) ? 0 : 100 + getLeadingNumber(filename, /l(\d+)/i))
  );

  const textbookHref = findFirstExistingKs3Resource(year, unit, ['textbook.html']);
  const revisionHref = findFirstExistingKs3Resource(year, unit, ['revision.html', 'flashcards.html']);
  const homework =
    year === 'year7' && unit === 'unit2'
      ? ['1', '2', '3'].map((number) => buildDisabledShellItem(`Homework ${number}`, number))
      : [];

  return {
    lessons,
    activities,
    homework,
    assessment,
    textbook: textbookHref ? { label: 'Textbook', href: textbookHref } : buildDisabledShellItem('Textbook'),
    revision: revisionHref ? { label: 'Revision', href: revisionHref } : buildDisabledShellItem('Revision')
  };
};

const buildKs3Shell = async (pathname: string): Promise<{
  shellContext: ShellContext;
  layoutMode: ShellMode;
  breadcrumbs?: ShellBreadcrumb[];
  prevLink?: ShellPageLink;
  nextLink?: ShellPageLink;
}> => {
  const routeParts = getKs3RouteParts(pathname);
  if (!routeParts) {
    const { groups } = await buildKs3CourseGroups('ks3');
    return {
      shellContext: {
        title: 'KS3',
        meta: 'Years 7 to 9',
        groups
      },
      layoutMode: 'worksheet',
      breadcrumbs: [{ label: 'Home', href: '/index.html' }, { label: 'Key Stage 3' }]
    };
  }

  const listingKey = KS3_YEAR_LISTING_KEYS[routeParts.year] || 'ks3';
  const { listing, groups: courseGroups } = await buildKs3CourseGroups(listingKey);
  const yearTitle = formatKs3YearLabel(routeParts.year);
  const yearOverviewRoute = `/ks3/${routeParts.year}/index.html`;
  const yearMeta = listing.sections[0]?.subtitle;
  const currentPath = normalizeShellPath(pathname);
  const yearShellIcon = KS3_YEAR_SHELL_ICONS[routeParts.year];
  const yearShellMeta = formatKs3ShellMeta(routeParts.year);
  const unitItem = routeParts.unit ? findKs3UnitItem(listing, routeParts.unit) : undefined;

  if (!routeParts.unit) {
    if (!routeParts.leaf) {
      return {
        shellContext: {
          title: 'Computer Science',
          meta: yearShellMeta,
          groups: courseGroups,
          icon: yearShellIcon,
          variant: 'rail',
          collapsible: true
        },
        layoutMode: 'worksheet',
        breadcrumbs: [
          { label: 'Home', href: '/index.html' },
          { label: yearTitle }
        ]
      };
    }

    const yearItems = (listing.sections || []).flatMap((section) =>
      (section.items || []).map((item) => ({
        label: item.name,
        href: item.href,
        meta: section.subtitle,
        number: item.number,
        icon: item.icon
      }))
    );

    const localGroups = [
      buildSectionGroup(
        `${routeParts.year}-overview`,
        'Overview',
        [{ label: `${yearTitle} overview`, href: yearOverviewRoute, meta: yearMeta }],
        { sequence: true, open: true }
      ),
      buildSectionGroup(`${routeParts.year}-resources`, 'Resources', yearItems, { sequence: true, open: true })
    ].filter((group): group is ShellNavGroup => Boolean(group));

    const { prevLink, nextLink } = buildPrevNextLinks(localGroups, currentPath);
    const currentLocation = findCurrentLocation(localGroups, currentPath);
    const breadcrumbs: ShellBreadcrumb[] = [
      { label: 'Home', href: '/index.html' },
      { label: yearTitle, href: yearOverviewRoute }
    ];

    if (
      currentLocation.item &&
      currentLocation.item.label !== `${yearTitle} overview` &&
      !hrefMatchesCurrentPath(yearOverviewRoute, currentPath)
    ) {
      breadcrumbs.push({ label: currentLocation.item.label });
    }

    return {
      shellContext: {
        title: 'Computer Science',
        meta: yearShellMeta,
        groups: localGroups,
        icon: yearShellIcon,
        collapsible: true
      },
      layoutMode: isKs3WorkspaceRoute(currentPath) ? 'workspace' : 'worksheet',
      breadcrumbs,
      prevLink,
      nextLink
    };
  }

  const unitOverviewRoute = `/ks3/${routeParts.year}/${routeParts.unit}.html`;
  const unitResources = await buildKs3UnitResources(routeParts.year, routeParts.unit);
  const unitNumber = getKs3UnitNumber(routeParts.unit);
  const unitLabel = `Unit ${unitNumber}`;
  const unitName = unitItem?.name || unitLabel;
  const unitIcon = unitItem?.icon || yearShellIcon;

  const localGroups = [
    buildSectionGroup(
      'unit-overview',
      'Overview',
      [{ label: 'Overview', href: unitOverviewRoute }],
      {
        sequence: true,
        open: true,
        collapsible: false,
        icon: KS3_UNIT_SECTION_ICONS.overview
      }
    ),
    buildSectionGroup('unit-lessons', 'Lessons', unitResources.lessons, {
      sequence: true,
      icon: KS3_UNIT_SECTION_ICONS.lessons,
      allowEmpty: true
    }),
    buildSectionGroup('unit-activities', 'Activities', unitResources.activities, {
      sequence: true,
      icon: KS3_UNIT_SECTION_ICONS.activities,
      allowEmpty: true
    }),
    buildSectionGroup('unit-homework', 'Homework', unitResources.homework, {
      icon: KS3_UNIT_SECTION_ICONS.homework,
      allowEmpty: true
    }),
    buildSectionGroup('unit-assessment', 'Assessment', unitResources.assessment, {
      sequence: true,
      icon: KS3_UNIT_SECTION_ICONS.assessment,
      allowEmpty: true
    }),
    buildSectionGroup(
      'unit-textbook',
      'Textbook',
      [unitResources.textbook],
      {
        collapsible: false,
        icon: KS3_UNIT_SECTION_ICONS.textbook
      }
    ),
    buildSectionGroup(
      'unit-revision',
      'Revision',
      [unitResources.revision],
      {
        collapsible: false,
        icon: KS3_UNIT_SECTION_ICONS.revision
      }
    )
  ].filter((group): group is ShellNavGroup => Boolean(group));

  const { prevLink, nextLink } = buildPrevNextLinks(localGroups, currentPath);
  const currentLocation = findCurrentLocation(localGroups, currentPath);
  const layoutMode: ShellMode = /textbook/i.test(currentPath)
    ? 'reading'
    : isKs3WorkspaceRoute(currentPath)
    ? 'workspace'
    : 'worksheet';
  const breadcrumbs: ShellBreadcrumb[] = [
    { label: 'Home', href: '/index.html' },
    { label: yearTitle, href: yearOverviewRoute },
    { label: routeParts.unit.replace(/^unit/i, 'Unit '), href: unitOverviewRoute }
  ];

  if (currentLocation.item && !hrefMatchesCurrentPath(unitOverviewRoute, currentPath)) {
    breadcrumbs.push({ label: currentLocation.item.label });
  }

  return {
    shellContext: {
      title: unitLabel,
      meta: unitName,
      groups: localGroups,
      icon: unitIcon,
      collapsible: true,
      exclusiveGroups: true
    },
    layoutMode,
    breadcrumbs,
    prevLink,
    nextLink
  };
};

const buildIbCourseGroups = async (): Promise<ShellNavGroup[]> => {
  const listing = await getListingByKey<ListingRecord>('ib-2027');
  const basePath = '/ib-2027';

  return (listing.sections || []).map((section) => {
    const isAssessment = section.title === 'Assessment';
    return {
      id: section.title.toLowerCase().replace(/\s+/g, '-'),
      label: isAssessment ? 'Assessment' : `${section.title}: ${section.subtitle}`,
      courseLevel: true,
      collapsible: false,
      items: (section.items || []).map((item: any) => ({
        label: `${item.number} ${item.name}`,
        href: ensureAbsoluteHref(basePath, item.href),
        disabled: Boolean(item.disabled)
      }))
    };
  });
};

const readDirectoryLinks = async (absoluteDir: string, routeBasePath: string): Promise<ShellNavItem[]> => {
  if (!existsSync(absoluteDir)) {
    return [];
  }

  const entries = await readdir(absoluteDir, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && (entry.name.endsWith('.astro') || entry.name.endsWith('.njk')) && !entry.name.startsWith('['))
    .map((entry) => entry.name.replace(/\.(astro|njk)$/i, ''))
    .sort((left, right) => {
      if (left === 'index') return -1;
      if (right === 'index') return 1;
      return left.localeCompare(right);
    });

  return files.map((slug) => ({
    label: slug === 'index' ? 'Overview' : humanizeRouteLabel(slug),
    href: slug === 'index' ? `${routeBasePath}/index.html` : `${routeBasePath}/${slug}.html`
  }));
};

const IB_SUBTOPIC_NAMES: Record<string, string> = {
  'A1.1': 'Computer hardware and operation',
  'A1.2': 'Data representation and computer logic',
  'A1.3': 'Operating systems and control systems',
  'A1.4': 'Translation (HL)',
  'A2.1': 'Network fundamentals',
  'A2.2': 'Network architecture',
  'A2.3': 'Data transmissions',
  'A2.4': 'Network security',
  'A3.1': 'Database fundamentals',
  'A3.2': 'Database design',
  'A3.3': 'Database programming',
  'A3.4': 'Alternative databases and data warehouses (HL)',
  'A4.1': 'Machine learning fundamentals',
  'A4.2': 'Data preprocessing (HL)',
  'A4.3': 'Machine learning approaches (HL)',
  'A4.4': 'Ethical considerations',
  'B1.1': 'Approaches to computational thinking',
  'B1.2': 'Computational thinking',
  'B1.3': 'Flowcharts and pseudocode',
  'B1.4': 'Algorithm design',
  'B2.1': 'Programming fundamentals',
  'B2.2': 'Data structures',
  'B2.3': 'Programming constructs',
  'B2.4': 'Programming algorithms',
  'B2.5': 'File processing',
  'B3.1': 'Fundamentals of OOP',
  'B3.2': 'Inheritance and polymorphism (HL)',
  'B4.1': 'Fundamentals of ADTs',
};

const readPublicHtmlItems = async (
  absoluteDir: string,
  routeBasePath: string,
  exclude: RegExp = /^(index|slides)$/i
): Promise<ShellNavItem[]> => {
  if (!existsSync(absoluteDir)) return [];
  const entries = await readdir(absoluteDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html') && !exclude.test(entry.name.replace('.html', '')))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => {
      const slug = entry.name.replace(/\.html$/i, '').toLowerCase();
      return {
        label: humanizeRouteLabel(entry.name),
        href: `${routeBasePath.toLowerCase()}/${slug}/index.html`
      };
    });
};

const readPublicOopProjectItems = async (unitCode: string): Promise<ShellNavItem[]> => {
  const dir = path.join(repoRoot, `public/ib-2027/${unitCode}/B3.1/oop-project`);
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.html') && e.name !== 'index.html' && !e.name.startsWith('teacher'))
    .sort((a, b) => {
      const order = ['preflight', 'level-a', 'level-b', 'level-c', 'level-d', 'level-e', 'level-f', 'level-g', 'level-h', 'level-i', 'level-p1', 'level-p2'];
      const ai = order.findIndex((p) => a.name.startsWith(p));
      const bi = order.findIndex((p) => b.name.startsWith(p));
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    })
    .map((e) => {
      const slug = e.name.replace(/\.html$/i, '').toLowerCase();
      return {
        label: humanizeRouteLabel(e.name),
        href: `/ib-2027/b3/b3.1/oop-project/${slug}/index.html`
      };
    });
};

const buildIbLocalGroups = async (
  unitCode: string,
  currentPath: string
): Promise<ShellNavGroup[]> => {
  const unitBasePath = `/ib-2027/${unitCode.toLowerCase()}`;
  const publicUnitDir = path.join(repoRoot, `public/ib-2027/${unitCode}`);

  // ── Overview (non-collapsible) ───────────────────────────────
  const overviewGroup = buildSectionGroup('unit-overview', 'Overview',
    [{ label: 'Overview', href: `${unitBasePath}/index.html` }],
    { sequence: true, open: true, collapsible: false, icon: 'fa-solid fa-binoculars' }
  );

  // ── Lessons (collapsible — subtopics linking to their slide) ─
  const lessonItems: ShellNavItem[] = [];
  if (existsSync(publicUnitDir)) {
    const unitEntries = await readdir(publicUnitDir, { withFileTypes: true });
    const subtopicDirs = unitEntries
      .filter((e) => e.isDirectory() && /^[AB]\d\.\d+$/i.test(e.name))
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const dir of subtopicDirs) {
      const slidesDir = path.join(publicUnitDir, dir.name, 'slides');
      let slideHref: string | null = null;
      if (existsSync(slidesDir)) {
        const slides = (await readdir(slidesDir)).filter((f) => f.endsWith('.html')).sort();
        if (slides.length > 0) {
          // Astro generates routes as /slideSlug/index.html, not /slideSlug.html
          const slideSlug = slides[0].replace(/\.html$/i, '');
          slideHref = `/ib-2027/${unitCode.toLowerCase()}/${dir.name.toLowerCase()}/slides/${slideSlug.toLowerCase()}/index.html`;
        }
      }
      const subtopicName = IB_SUBTOPIC_NAMES[dir.name.toUpperCase()] || dir.name;
      lessonItems.push({
        label: `${dir.name} ${subtopicName}`,
        href: slideHref || `${unitBasePath}/index.html`,
      });
    }
  }
  const lessonsGroup = buildSectionGroup('unit-lessons', 'Lessons', lessonItems, {
    sequence: true, icon: 'fa-solid fa-book-open', allowEmpty: true
  });

  // ── Activities (collapsible — worksheets, projects, visualisers) ─
  const activityItems: ShellNavItem[] = [];

  // SQL worksheets (A3)
  const sqlWorksheetsDir = path.join(publicUnitDir, 'sql-worksheets');
  if (existsSync(sqlWorksheetsDir)) {
    const wsEntries = await readdir(sqlWorksheetsDir);
    wsEntries
      .filter((f) => f.endsWith('.html') && f !== 'index.html')
      .sort()
      .forEach((f) => {
        const slug = f.replace(/\.html$/i, '').toLowerCase();
        activityItems.push({
          label: `SQL: ${humanizeRouteLabel(f)}`,
          href: `/ib-2027/${unitCode.toLowerCase()}/sql-worksheets/${slug}/index.html`
        });
      });
  }

  // SQL playground (A3)
  if (unitCode === 'A3') {
    activityItems.push({ label: 'SQL Playground', href: '/tools/sql-playground.html' });
  }

  // SQL project and NoSQL project (A3) — from src pages
  for (const projPattern of ['sql-project', 'nosql-project']) {
    const projDir = path.join(repoRoot, `apps/site/src/pages/ib-2027/${unitCode}/${projPattern}`);
    if (existsSync(projDir)) {
      const links = await readDirectoryLinks(projDir, `/ib-2027/${unitCode.toLowerCase()}/${projPattern}`);
      activityItems.push(...links.filter((l) => !l.href.includes('/teacher/')));
    }
  }

  // OOP project (B3 → B3.1/oop-project in public/)
  if (unitCode === 'B3') {
    const oopItems = await readPublicOopProjectItems(unitCode);
    activityItems.push(...oopItems);
  }

  // Scenarios (B3, public/ib-2027/scenarios/)
  if (unitCode === 'B3') {
    const scenariosDir = path.join(repoRoot, 'public/ib-2027/scenarios');
    if (existsSync(scenariosDir)) {
      const sEntries = await readdir(scenariosDir, { withFileTypes: true });
      sEntries
        .filter((e) => e.isFile() && e.name.endsWith('.html'))
        .sort()
        .forEach((e) => {
          const slug = e.name.replace(/\.html$/i, '').toLowerCase();
          activityItems.push({
            label: humanizeRouteLabel(e.name),
            href: `/ib-2027/scenarios/${slug}/index.html`
          });
        });
    }
    // Design patterns (B3.2)
    const dpFile = path.join(publicUnitDir, 'B3.2/design-patterns.html');
    if (existsSync(dpFile)) {
      activityItems.push({ label: 'Design Patterns', href: `/ib-2027/b3/b3.2/design-patterns/index.html` });
    }
  }

  // Subtopic-level extras (visualisers etc. — B2.4, B4.1)
  if (existsSync(publicUnitDir)) {
    const unitEntries = await readdir(publicUnitDir, { withFileTypes: true });
    const subtopicDirs = unitEntries.filter((e) => e.isDirectory() && /^[AB]\d\.\d+$/i.test(e.name));
    for (const dir of subtopicDirs) {
      const subDir = path.join(publicUnitDir, dir.name);
      const extras = await readPublicHtmlItems(subDir, `/ib-2027/${unitCode.toLowerCase()}/${dir.name.toLowerCase()}`, /^(index|slides|revision|specification|textbook)$/i);
      activityItems.push(...extras);
    }
  }

  const activitiesGroup = buildSectionGroup('unit-activities', 'Activities', activityItems, {
    sequence: true, icon: 'fa-solid fa-laptop-code', allowEmpty: true
  });

  // ── Textbook (collapsible — subtopic sections as child links) ─
  const textbookItems: ShellNavItem[] = [];
  const unitUpper = unitCode.toUpperCase();
  const subtopicCodes = Object.keys(IB_SUBTOPIC_NAMES)
    .filter((code) => code.startsWith(`${unitUpper}.`))
    .sort();

  for (const code of subtopicCodes) {
    const name = IB_SUBTOPIC_NAMES[code];
    const anchor = code.toLowerCase().replace(/\./g, '-');
    textbookItems.push({
      label: name,
      number: code,
      href: `${unitBasePath}/textbook/index.html#${anchor}`
    });
  }

  const textbookGroup = buildSectionGroup('unit-textbook', 'Textbook', textbookItems, {
    icon: 'fa-solid fa-book-open-reader',
    allowEmpty: true,
    groupHref: `${unitBasePath}/textbook/index.html`
  });

  // ── Homework (collapsible — empty for now) ───────────────────
  const homeworkGroup = buildSectionGroup('unit-homework', 'Homework', [], {
    icon: 'fa-solid fa-house', allowEmpty: true
  });

  // ── Revision (collapsible — discover from public/) ───────────
  const revisionItems: ShellNavItem[] = [];
  if (existsSync(publicUnitDir)) {
    const unitEntries = await readdir(publicUnitDir, { withFileTypes: true });
    const subtopicDirs = unitEntries.filter((e) => e.isDirectory() && /^[AB]\d\.\d+$/i.test(e.name));
    for (const dir of subtopicDirs) {
      const revFile = path.join(publicUnitDir, dir.name, 'revision.html');
      if (existsSync(revFile)) {
        const subtopicName = IB_SUBTOPIC_NAMES[dir.name.toUpperCase()] || dir.name;
        revisionItems.push({
          label: `${dir.name} Revision`,
          href: `/ib-2027/${unitCode.toLowerCase()}/${dir.name.toLowerCase()}/revision/index.html`
        });
      }
    }
  }
  // Student resources (B2)
  const studentResourcesFile = path.join(publicUnitDir, 'student-resources.html');
  if (existsSync(studentResourcesFile)) {
    revisionItems.push({ label: 'Student Resources', href: `/ib-2027/${unitCode.toLowerCase()}/student-resources/index.html` });
  }
  // Specification files
  const specFile = path.join(publicUnitDir, 'specification.html');
  if (existsSync(specFile)) {
    revisionItems.push({ label: 'Specification', href: `/ib-2027/${unitCode.toLowerCase()}/specification/index.html` });
  }
  const revisionGroup = buildSectionGroup('unit-revision', 'Revision', revisionItems, {
    icon: 'fa-solid fa-rotate-left', allowEmpty: true
  });

  // ── Assessment (collapsible — empty for now) ─────────────────
  const assessmentGroup = buildSectionGroup('unit-assessment', 'Assessment', [], {
    sequence: true, icon: 'fa-solid fa-file-pen', allowEmpty: true
  });

  return [
    overviewGroup,
    lessonsGroup,
    activitiesGroup,
    textbookGroup,
    homeworkGroup,
    revisionGroup,
    assessmentGroup,
  ].filter((group): group is ShellNavGroup => Boolean(group));
};

const buildIbSubtopicGroups = async (
  unitCode: string,
  subtopicCode: string,
  currentPath: string
): Promise<ShellNavGroup[]> => {
  const subtopicBasePath = `/ib-2027/${unitCode.toLowerCase()}/${subtopicCode.toLowerCase().replace('.', '-')}`;

  // Overview — link to subtopic index
  const overviewGroup = buildSectionGroup('subtopic-overview', 'Overview', [
    { label: 'Overview', href: `${subtopicBasePath}/index.html` }
  ], { sequence: true, open: true, collapsible: false });

  // Lessons — slide decks from public/
  const slidesDir = path.join(repoRoot, `public/ib-2027/${unitCode}/${subtopicCode}/slides`);
  const slideItems: ShellNavItem[] = [];
  if (existsSync(slidesDir)) {
    const entries = await readdir(slidesDir);
    entries
      .filter((e) => e.endsWith('.html'))
      .sort()
      .forEach((e) => {
        const name = e
          .replace('.html', '')
          .replace(/_/g, ' ')
          .replace(/^[AB]\d\.\d\s*/i, '');
        slideItems.push({
          label: name,
          href: `${subtopicBasePath}/slides/${e}`
        });
      });
  }
  const lessonsGroup = buildSectionGroup('subtopic-lessons', 'Lessons', slideItems, {
    open: currentPath.includes('/slides'),
    allowEmpty: true
  });

  // Activities — OOP project, SQL worksheets, scenarios, etc.
  const activityItems: ShellNavItem[] = [];
  const activityPatterns = ['oop-project', 'sql-worksheets', 'sql-project', 'nosql-project', 'scenarios', 'design-patterns'];
  for (const pattern of activityPatterns) {
    const activityDir = path.join(repoRoot, `src/pages/ib-2027/${unitCode}/${subtopicCode}/${pattern}`);
    if (!existsSync(activityDir)) continue;
    const links = await readDirectoryLinks(activityDir, `${subtopicBasePath}/${pattern}`);
    activityItems.push(...links.filter((link) => !link.href.includes('/teacher/')));
  }
  // Also check unit-level activities (e.g. A3/sql-worksheets)
  for (const pattern of activityPatterns) {
    const unitActivityDir = path.join(repoRoot, `src/pages/ib-2027/${unitCode}/${pattern}`);
    if (!existsSync(unitActivityDir)) continue;
    const links = await readDirectoryLinks(unitActivityDir, `/ib-2027/${unitCode.toLowerCase()}/${pattern}`);
    activityItems.push(...links.filter((link) => !link.href.includes('/teacher/')));
  }
  const activitiesGroup = buildSectionGroup('subtopic-activities', 'Activities', activityItems, {
    open: activityPatterns.some((p) => currentPath.includes(`/${p}`)),
    allowEmpty: true
  });

  return [overviewGroup, lessonsGroup, activitiesGroup]
    .filter((group): group is ShellNavGroup => Boolean(group));
};

const buildIbShell = async (pathname: string): Promise<{
  shellContext: ShellContext;
  layoutMode: ShellMode;
  breadcrumbs?: ShellBreadcrumb[];
  prevLink?: ShellPageLink;
  nextLink?: ShellPageLink;
}> => {
  const routeParts = getIbRouteParts(pathname);

  // Landing page or unrecognised IB path — show just course groups
  if (!routeParts) {
    const courseGroups = await buildIbCourseGroups();
    return {
      shellContext: {
        title: 'IB Computer Science',
        groups: courseGroups
      },
      layoutMode: 'worksheet',
      breadcrumbs: [{ label: 'IB Computer Science' }]
    };
  }

  const currentPath = normalizeShellPath(pathname);

  // Always use unit-level sidebar — subtopics, slides, activities all share the same sidebar
  const localGroups = await buildIbLocalGroups(routeParts.unitCode, currentPath);
  const currentLocation = findCurrentLocation(localGroups, currentPath);

  const layoutMode: ShellMode = /textbook/i.test(currentPath)
    ? 'reading'
    : /(slides|sql|scenario|oop-project|project|worksheet|visualis|Big_0)/i.test(currentPath)
    ? 'workspace'
    : 'worksheet';

  const unitOverviewHref = `/ib-2027/${routeParts.unitCode.toLowerCase()}/index.html`;
  const breadcrumbs: ShellBreadcrumb[] = [
    { label: 'IB Computer Science', href: '/ib-2027/index.html' },
    { label: routeParts.unitCode, href: unitOverviewHref }
  ];

  if (currentLocation.item && !hrefMatchesCurrentPath(unitOverviewHref, currentPath)) {
    breadcrumbs.push({ label: currentLocation.item.label });
  }

  return {
    shellContext: {
      title: routeParts.unitCode,
      meta: IB_SUBTOPIC_NAMES[routeParts.unitCode] || undefined,
      groups: localGroups,
      collapsible: true,
      exclusiveGroups: true
    },
    layoutMode,
    breadcrumbs
  };
};

export const getAutoShellState = async (pathname: string): Promise<{
  courseShell?: ShellContext;
  layoutMode?: ShellMode;
  breadcrumbs?: ShellBreadcrumb[];
  prevLink?: ShellPageLink;
  nextLink?: ShellPageLink;
}> => {
  const normalizedPath = normalizeShellPath(pathname);

  if (normalizedPath === '/' || !/^\/(igcse|ks3|ib-2027)(?:\/|$)/.test(normalizedPath)) {
    return {};
  }

  if (normalizedPath === '/igcse' || normalizedPath.startsWith('/igcse/')) {
    const state = await buildIgcseTopicShell(normalizedPath);
    return {
      courseShell: state.shellContext,
      layoutMode: state.layoutMode,
      breadcrumbs: state.breadcrumbs,
      prevLink: state.prevLink,
      nextLink: state.nextLink
    };
  }

  if (normalizedPath === '/ks3' || normalizedPath.startsWith('/ks3/')) {
    const state = await buildKs3Shell(normalizedPath);
    return {
      courseShell: state.shellContext,
      layoutMode: state.layoutMode,
      breadcrumbs: state.breadcrumbs,
      prevLink: state.prevLink,
      nextLink: state.nextLink
    };
  }

  if (normalizedPath === '/ib-2027' || normalizedPath.startsWith('/ib-2027/')) {
    const state = await buildIbShell(normalizedPath);
    return {
      courseShell: state.shellContext,
      layoutMode: state.layoutMode,
      breadcrumbs: state.breadcrumbs,
      prevLink: state.prevLink,
      nextLink: state.nextLink
    };
  }

  return {};
};
