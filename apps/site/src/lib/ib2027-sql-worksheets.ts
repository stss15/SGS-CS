import type { IbCourseLevel } from '@sgs/content-schema';
import type { LegacyHtmlPage } from './legacy-page-loader';
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
): Promise<LegacyHtmlPage> => loadLegacyHtmlPage(buildLegacySqlWorksheetPath(level, unitNumber));

export const getIb2027SqlWorksheetPage = (
  level: IbCourseLevel,
  unitNumber: number,
  worksheet: string
): Promise<LegacyHtmlPage> => loadLegacyHtmlPage(buildLegacySqlWorksheetPath(level, unitNumber, worksheet));
