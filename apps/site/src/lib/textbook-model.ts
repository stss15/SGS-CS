import type { CollectionEntry } from 'astro:content';
import type { TextbookSubtopicValue, TextbookVisibilityValue } from '../content/textbook-schema';
import type { IbTheme } from './ib2027-syllabus';

export type TextbookVisibility = TextbookVisibilityValue;

export interface TextbookSectionModel {
  code: string;
  title: string;
  label: string;
  anchor: string;
  order: number;
  visibility: TextbookVisibility;
  overview?: string;
}

export interface TextbookChapterModel {
  code: string;
  title: string;
  label: string;
  slug: string;
  summary: string;
  order: number;
  visibility: TextbookVisibility;
  sections: TextbookSectionModel[];
}

export interface TextbookEntryLike {
  data: {
    level?: 'sl' | 'hl';
    visibility?: TextbookVisibility;
    subtopics?: Array<{
      code: string;
      title: string;
    }>;
  };
}

export interface TextbookSectionGroup<TEntry> {
  section: TextbookSectionModel;
  entries: TEntry[];
}

const slugify = (value: string): string =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'section';

export const buildTextbookAnchor = (code: string, title?: string): string => {
  const codePart = String(code || '').trim();
  const titlePart = String(title || '').trim();
  return slugify(titlePart ? `${codePart} ${titlePart}` : codePart);
};

export const getTextbookSectionPrefix = (value: string): string | undefined => {
  const match = String(value || '')
    .trim()
    .toUpperCase()
    .match(/^([A-Z]\d\.\d)\b/);

  return match?.[1];
};

export const getTextbookVisibility = (value?: TextbookVisibility | 'sl' | 'hl'): TextbookVisibility => {
  if (value === 'sl' || value === 'hl' || value === 'mixed') {
    return value;
  }

  return 'mixed';
};

export const getTextbookVisibilityLabel = (visibility: TextbookVisibility): string =>
  visibility === 'hl' ? 'HL only' : visibility === 'sl' ? 'SL core' : 'SL + HL';

export const buildTextbookSectionModel = (
  section: TextbookSubtopicValue,
  index: number
): TextbookSectionModel => ({
  code: section.code,
  title: section.title,
  label: `${section.code} ${section.title}`,
  anchor: section.anchor || buildTextbookAnchor(section.code, section.title),
  order: section.order ?? index + 1,
  visibility: getTextbookVisibility(section.visibility),
  overview: section.overview
});

export const buildIbThemeChapterModel = (theme: IbTheme): TextbookChapterModel => ({
  code: theme.code,
  title: theme.title,
  label: `${theme.code} ${theme.title}`,
  slug: theme.id,
  summary: theme.overview,
  order: Number.parseInt(theme.code.slice(1), 10) || 0,
  visibility: getTextbookVisibility(theme.level),
  sections: theme.sections.map((section, index) =>
    buildTextbookSectionModel(
      {
        code: section.code,
        title: section.title,
        anchor: buildTextbookAnchor(section.code, section.title),
        order: index + 1,
        visibility: section.level,
        overview: section.overview
      },
      index
    )
  )
});

export const groupEntriesBySections = <TEntry extends TextbookEntryLike>(
  sections: TextbookSectionModel[],
  entries: TEntry[]
): TextbookSectionGroup<TEntry>[] =>
  sections.map((section) => ({
    section,
    entries: entries.filter((entry) =>
      (entry.data.subtopics || []).some((subtopic) =>
        getTextbookSectionPrefix(subtopic.code) === section.code.toUpperCase()
      )
    )
  }));

export const getEntryVisibility = <TEntry extends TextbookEntryLike>(entry: TEntry): TextbookVisibility =>
  getTextbookVisibility(entry.data.visibility || entry.data.level);

export type IbTextbookEntry = CollectionEntry<'ib-textbooks'>;
