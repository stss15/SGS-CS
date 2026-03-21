import path from 'node:path';
import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import type { UnitIndexFrontmatter, UnitPlanFrontmatter } from '@sgs/content-schema';
import {
  getIb2027LevelListing,
  getIb2027UnitIndexData,
  getIb2027UnitPlanData
} from './ib2027-routes';
import { getFlashcardsHref } from './ib2027-unit-index';
import {
  decodeHtmlEntities,
  getListingByKey,
  readMarkdownDocument,
  readSourceFrontmatter,
  repoRoot
} from './source-content';
import { rewriteIgcseCourseHref, rewriteIbCourseHref } from './course-links';
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
  const match = normalizeShellPath(pathname).match(/^\/ib-2027\/(sl|hl)(?:\/(unit-\d+)(?:\/(.+))?)?$/i);
  if (!match) {
    return null;
  }

  return {
    level: match[1].toLowerCase() as 'sl' | 'hl',
    unit: match[2] || null,
    leaf: match[3] || null
  };
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
    icon?: string;
    allowEmpty?: boolean;
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
    icon: options.icon
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

const buildIbCourseGroups = async (level: 'sl' | 'hl'): Promise<ShellNavGroup[]> => {
  const listing = await getIb2027LevelListing(level);
  const basePath = `/ib-2027/${level}`;

  return (listing.sections || []).map((section) => ({
    id: `${level}-${section.title.toLowerCase().replace(/\s+/g, '-')}`,
    label: section.title,
    meta: section.subtitle,
    courseLevel: true,
    items: (section.items || []).map((item) => ({
      label: `Unit ${item.number}. ${item.name}`,
      href: ensureAbsoluteHref(basePath, item.href)
    }))
  }));
};

const readDirectoryLinks = async (absoluteDir: string, routeBasePath: string): Promise<ShellNavItem[]> => {
  if (!existsSync(absoluteDir)) {
    return [];
  }

  const entries = await readdir(absoluteDir, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && (entry.name.endsWith('.astro') || entry.name.endsWith('.njk')))
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

const buildIbLocalGroups = async (
  level: 'sl' | 'hl',
  unitNumber: number,
  currentPath: string,
  unitIndex: UnitIndexFrontmatter,
  _unitPlan: UnitPlanFrontmatter
): Promise<ShellNavGroup[]> => {
  const unitBasePath = `/ib-2027/${level}/unit-${unitNumber}`;
  const rewriteUnitHref = (href: string) => rewriteIbCourseHref(level, unitNumber, href);

  const overviewItems: ShellNavItem[] = [
    { label: 'Unit overview', href: `${unitBasePath}/index.html` },
    { label: 'Unit plan', href: `${unitBasePath}/unit-plan.html` },
    { label: 'Textbook', href: `${unitBasePath}/textbook.html` }
  ];

  const slides = (unitIndex.resources || [])
    .filter((resource) => isValidStudentHref(resource.href))
    .map((resource) => ({
      label: resource.name,
      href: rewriteUnitHref(ensureAbsoluteHref(unitBasePath, resource.href)),
      meta: resource.type
    }));

  const activities = (unitIndex.studentActivitiesResources || [])
    .filter((resource) => isValidStudentHref(resource.href))
    .map((resource) => ({
      label: resource.name,
      href: rewriteUnitHref(ensureAbsoluteHref(unitBasePath, resource.href)),
      meta: resource.type
    }));

  const revisionHref = getFlashcardsHref(unitIndex.cards || []);
  const revisionItems = isValidStudentHref(revisionHref)
    ? [
        {
          label: 'Flashcards',
          href: rewriteUnitHref(ensureAbsoluteHref(unitBasePath, revisionHref))
        }
      ]
    : [];

  const supportItems = (unitIndex.resourcesSecondary || [])
    .filter((resource) => isValidStudentHref(resource.href))
    .map((resource) => ({
      label: resource.name,
      href: rewriteUnitHref(ensureAbsoluteHref(unitBasePath, resource.href)),
      meta: resource.type
    }));

  const specialGroups: ShellNavGroup[] = [];
  const specialRoutePatterns = [
    'oop-project',
    'sql-project',
    'nosql-project',
    'sql-worksheets',
    'scenarios'
  ];

  for (const pattern of specialRoutePatterns) {
    if (!currentPath.includes(`/${pattern}`)) {
      continue;
    }

    const projectLinks = await readDirectoryLinks(
      path.join(repoRoot, `src/pages/ib-2027/${level}/unit-${unitNumber}/${pattern}`),
      `${unitBasePath}/${pattern}`
    );

    const projectGroup = buildSectionGroup(
      `${pattern}-links`,
      humanizeRouteLabel(pattern),
      projectLinks.filter((link) => !link.href.includes('/teacher/')),
      { sequence: true, open: true }
    );

    if (projectGroup) {
      specialGroups.push(projectGroup);
    }

    const teacherLinks = await readDirectoryLinks(
      path.join(repoRoot, `src/pages/ib-2027/${level}/unit-${unitNumber}/${pattern}/teacher`),
      `${unitBasePath}/${pattern}/teacher`
    );

    const teacherGroup = buildSectionGroup('teacher-links', 'Teacher', teacherLinks, {
      open: currentPath.includes('/teacher/')
    });

    if (teacherGroup) {
      specialGroups.push(teacherGroup);
    }
  }

  return [
    buildSectionGroup('unit-overview', 'Overview', overviewItems, { sequence: true, open: true }),
    buildSectionGroup('unit-slides', 'Slides', slides, { sequence: true }),
    buildSectionGroup('unit-activities', 'Activities', activities, { sequence: true }),
    buildSectionGroup('unit-revision', 'Revision', revisionItems),
    buildSectionGroup('unit-support', 'Teacher & Extension', supportItems),
    ...specialGroups
  ].filter((group): group is ShellNavGroup => Boolean(group));
};

const buildIbShell = async (pathname: string): Promise<{
  shellContext: ShellContext;
  layoutMode: ShellMode;
  breadcrumbs?: ShellBreadcrumb[];
  prevLink?: ShellPageLink;
  nextLink?: ShellPageLink;
}> => {
  const routeParts = getIbRouteParts(pathname);
  if (!routeParts) {
    const [slListing, hlListing] = await Promise.all([
      getIb2027LevelListing('sl'),
      getIb2027LevelListing('hl')
    ]);
    const yearGroups: ShellNavGroup[] = [];
    const slSections = slListing.sections || [];
    for (let i = 0; i < slSections.length; i++) {
      const slSection = slSections[i];
      const hlSection = (hlListing.sections || [])[i];
      yearGroups.push({
        id: `year-sl-${slSection.title.toLowerCase().replace(/\s+/g, '-')}`,
        label: `${slSection.title} — SL`,
        meta: slSection.subtitle,
        items: (slSection.items || []).map((item) => ({
          label: `Unit ${item.number}. ${item.name}`,
          href: `/ib-2027/sl/${item.href}`
        }))
      });
      if (hlSection) {
        yearGroups.push({
          id: `year-hl-${hlSection.title.toLowerCase().replace(/\s+/g, '-')}`,
          label: `${hlSection.title} — HL`,
          meta: hlSection.subtitle,
          items: (hlSection.items || []).map((item) => ({
            label: `Unit ${item.number}. ${item.name}`,
            href: `/ib-2027/hl/${item.href}`
          }))
        });
      }
    }
    return {
      shellContext: {
        title: 'IB 2027',
        meta: 'Year-first curriculum overview',
        groups: yearGroups
      },
      layoutMode: 'worksheet',
      breadcrumbs: [{ label: 'IB 2027' }]
    };
  }

  const courseGroups = await buildIbCourseGroups(routeParts.level);
  if (!routeParts.unit) {
    return {
      shellContext: {
        title: routeParts.level.toUpperCase(),
        meta: 'IB Computer Science',
        groups: courseGroups
      },
      layoutMode: 'worksheet',
      breadcrumbs: [
        { label: 'IB 2027', href: '/ib-2027/index.html' },
        { label: routeParts.level.toUpperCase() }
      ]
    };
  }

  const unitNumber = Number(routeParts.unit.replace('unit-', ''));
  const [unitIndex, unitPlan] = await Promise.all([
    getIb2027UnitIndexData(routeParts.level, unitNumber),
    getIb2027UnitPlanData(routeParts.level, unitNumber)
  ]);

  const currentPath = normalizeShellPath(pathname);
  const localGroups = await buildIbLocalGroups(routeParts.level, unitNumber, currentPath, unitIndex, unitPlan);
  const { prevLink, nextLink } = buildPrevNextLinks(localGroups, currentPath);
  const currentLocation = findCurrentLocation(localGroups, currentPath);

  const layoutMode: ShellMode = /textbook/i.test(currentPath)
    ? 'reading'
    : /(slides|sql|scenario|oop-project|project|worksheet)/i.test(currentPath)
    ? 'workspace'
    : currentPath.endsWith('/unit-plan')
    ? 'worksheet'
    : 'worksheet';
  const unitOverviewHref = `/ib-2027/${routeParts.level}/unit-${unitNumber}/index.html`;
  const breadcrumbs: ShellBreadcrumb[] = [
    { label: 'IB 2027', href: '/ib-2027/index.html' },
    { label: routeParts.level.toUpperCase(), href: `/ib-2027/${routeParts.level}/index.html` },
    { label: `Unit ${unitNumber}`, href: unitOverviewHref }
  ];

  if (currentLocation.item && !hrefMatchesCurrentPath(unitOverviewHref, currentPath)) {
    breadcrumbs.push({ label: currentLocation.item.label });
  }

  return {
    shellContext: {
      title: `${routeParts.level.toUpperCase()} Unit ${unitNumber}`,
      meta: unitPlan.unitName,
      groups: [...localGroups, ...courseGroups]
    },
    layoutMode,
    breadcrumbs,
    prevLink,
    nextLink
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
