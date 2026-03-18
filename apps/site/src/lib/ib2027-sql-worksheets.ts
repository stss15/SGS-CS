import type { IbCourseLevel } from '@sgs/content-schema';
import type { LegacyHtmlPage } from './legacy-page-loader';
import { rewriteIbCourseHref, stripBlankTarget } from './course-links';
import { loadLegacyHtmlPage } from './legacy-page-loader';

interface SqlWorksheetGroup {
  level: IbCourseLevel;
  unitNumber: number;
  worksheets: string[];
}

export interface Ib2027SqlWorksheetHubProps {
  level: IbCourseLevel;
  unitNumber: number;
}

export interface Ib2027SqlWorksheetPageProps extends Ib2027SqlWorksheetHubProps {
  worksheet: string;
}

const SQL_WORKSHEET_GROUPS = [
  {
    level: 'hl',
    unitNumber: 5,
    worksheets: ['course-enrolment', 'house-competition']
  },
  {
    level: 'sl',
    unitNumber: 6,
    worksheets: ['school-library', 'campus-clubs', 'canteen-orders']
  }
] satisfies SqlWorksheetGroup[];

const buildLegacySqlWorksheetPath = (
  level: IbCourseLevel,
  unitNumber: number,
  worksheet: string = 'index'
): string => `src/pages/ib-2027/${level}/unit-${unitNumber}/sql-worksheets/${worksheet}.njk`;

const stripWorksheetMetaChatter = (bodyHtml: string): string =>
  bodyHtml
    .replace(/<section class="sql-outline-card">\s*<h2>How to Use the Sequence<\/h2>[\s\S]*?<\/section>/i, '')
    .replace(/<section class="sql-callout">\s*<h3>Teacher Flow<\/h3>[\s\S]*?<\/section>/i, '');

const rewriteWorksheetToolLinks = (level: IbCourseLevel, unitNumber: number, bodyHtml: string): string =>
  bodyHtml.replace(/href=(["'])(\/tools\/sql-playground\.html[^"']*)\1/gi, (_match, quote, href) => {
    return `href=${quote}${rewriteIbCourseHref(level, unitNumber, href)}${quote}`;
  });

const transformWorksheetPage = (page: LegacyHtmlPage, level: IbCourseLevel, unitNumber: number): LegacyHtmlPage => ({
  ...page,
  bodyHtml: stripBlankTarget(stripWorksheetMetaChatter(rewriteWorksheetToolLinks(level, unitNumber, page.bodyHtml)))
});

export const getIb2027SqlWorksheetHubStaticPaths = async () =>
  SQL_WORKSHEET_GROUPS.map(({ level, unitNumber }) => ({
    params: {
      level,
      unit: `unit-${unitNumber}`
    },
    props: {
      level,
      unitNumber
    }
  }));

export const getIb2027SqlWorksheetStaticPaths = async () =>
  SQL_WORKSHEET_GROUPS.flatMap(({ level, unitNumber, worksheets }) =>
    worksheets.map((worksheet) => ({
      params: {
        level,
        unit: `unit-${unitNumber}`,
        worksheet
      },
      props: {
        level,
        unitNumber,
        worksheet
      }
    }))
  );

export const getIb2027SqlWorksheetHubPage = (
  level: IbCourseLevel,
  unitNumber: number
): Promise<LegacyHtmlPage> =>
  loadLegacyHtmlPage(buildLegacySqlWorksheetPath(level, unitNumber)).then((page) =>
    transformWorksheetPage(page, level, unitNumber)
  );

export const getIb2027SqlWorksheetPage = (
  level: IbCourseLevel,
  unitNumber: number,
  worksheet: string
): Promise<LegacyHtmlPage> =>
  loadLegacyHtmlPage(buildLegacySqlWorksheetPath(level, unitNumber, worksheet)).then((page) =>
    transformWorksheetPage(page, level, unitNumber)
  );
