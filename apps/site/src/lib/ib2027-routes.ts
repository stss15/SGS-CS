import type {
  BreadcrumbItem,
  CurriculumListingPage,
  IbCourseLevel,
  UnitIndexFrontmatter,
  UnitPlanFrontmatter
} from '@sgs/content-schema';
import {
  getIbHlCurriculumIndex,
  getIbHlUnitIndex,
  getIbHlUnitPlan,
  getIbSlCurriculumIndex,
  getIbSlUnitIndex,
  getIbSlUnitPlan
} from '@sgs/content-schema';

export interface Ib2027LevelPathProps {
  level: IbCourseLevel;
}

export interface Ib2027UnitPathProps extends Ib2027LevelPathProps {
  unitNumber: number;
}

export const normalizeIb2027Level = (value: string): IbCourseLevel =>
  value.toLowerCase() === 'hl' ? 'hl' : 'sl';

export const getIb2027LevelLabel = (level: IbCourseLevel): string => level.toUpperCase();

// --- New syllabus breadcrumb builder ---

export const buildIb2027Breadcrumbs = (
  unitCode?: string,
  subtopic?: string,
  currentLabel?: string
): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'IB Computer Science', href: '/ib-2027/index.html' }
  ];

  if (unitCode) {
    breadcrumbs.push({ label: unitCode, href: `/ib-2027/${unitCode}/index.html` });
  }

  if (subtopic) {
    breadcrumbs.push({ label: subtopic, href: `/ib-2027/${unitCode}/${subtopic}/index.html` });
  }

  if (currentLabel) {
    breadcrumbs.push({ label: currentLabel });
  }

  return breadcrumbs;
};

// --- Legacy SL/HL breadcrumb builders (kept for backward compat with [level]/[unit] routes) ---

export const buildIb2027LevelBreadcrumbs = (level: IbCourseLevel): BreadcrumbItem[] => [
  { label: 'IB Computer Science', href: '/ib-2027/index.html' },
  { label: getIb2027LevelLabel(level) }
];

export const buildIb2027UnitBreadcrumbs = (
  level: IbCourseLevel,
  unitNumber: number,
  currentLabel?: string
): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'IB Computer Science', href: '/ib-2027/index.html' },
    { label: getIb2027LevelLabel(level), href: `/ib-2027/${level}/index.html` },
    { label: `Unit ${unitNumber}`, href: `/ib-2027/${level}/unit-${unitNumber}/index.html` }
  ];

  return currentLabel ? [...breadcrumbs, { label: currentLabel }] : breadcrumbs;
};

// --- Legacy SL/HL static path and data helpers ---

const extractUnitNumbers = (listing: CurriculumListingPage): number[] =>
  Array.from(
    new Set(
      (listing.sections || [])
        .flatMap((section) => section.items || [])
        .map((item) => {
          const match = String(item.href || '').match(/(?:^|\/)unit-(\d+)\/index\.html$/i);
          return match ? Number(match[1]) : null;
        })
        .filter((unitNumber): unitNumber is number => unitNumber !== null)
    )
  ).sort((left, right) => left - right);

export const getIb2027LevelStaticPaths = async () => [
  {
    params: { level: 'sl' },
    props: { level: 'sl' as const }
  },
  {
    params: { level: 'hl' },
    props: { level: 'hl' as const }
  }
];

export const getIb2027LevelListing = async (level: IbCourseLevel): Promise<CurriculumListingPage> =>
  level === 'sl' ? getIbSlCurriculumIndex() : getIbHlCurriculumIndex();

export const getIb2027UnitStaticPaths = async () => {
  const [slListing, hlListing] = await Promise.all([getIbSlCurriculumIndex(), getIbHlCurriculumIndex()]);

  const buildPaths = (level: IbCourseLevel, listing: CurriculumListingPage) =>
    extractUnitNumbers(listing).map((unitNumber) => ({
      params: {
        level,
        unit: `unit-${unitNumber}`
      },
      props: {
        level,
        unitNumber
      }
    }));

  return [...buildPaths('sl', slListing), ...buildPaths('hl', hlListing)];
};

export const getIb2027UnitIndexData = async (
  level: IbCourseLevel,
  unitNumber: number
): Promise<UnitIndexFrontmatter> => (level === 'sl' ? getIbSlUnitIndex(unitNumber) : getIbHlUnitIndex(unitNumber));

export const getIb2027UnitPlanData = async (
  level: IbCourseLevel,
  unitNumber: number
): Promise<UnitPlanFrontmatter> => (level === 'sl' ? getIbSlUnitPlan(unitNumber) : getIbHlUnitPlan(unitNumber));
