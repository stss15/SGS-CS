import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { getTextbookSectionPrefix } from './textbook-model';

export interface MarkdownSection {
  heading: string;
  markdown: string;
}

export const renderMarkdownToHtml = async (markdown: string): Promise<string> => {
  const rendered = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(rendered);
};

export const splitTopLevelMarkdownSections = (markdown: string): MarkdownSection[] => {
  const headingRegex = /^##\s+(.+)$/gm;
  const matches = Array.from(markdown.matchAll(headingRegex));
  if (!matches.length) return [];

  return matches.map((match, index) => {
    const heading = match[1].trim();
    const start = match.index ?? 0;
    const nextStart = index + 1 < matches.length ? (matches[index + 1].index ?? markdown.length) : markdown.length;
    return {
      heading,
      markdown: markdown.slice(start, nextStart).trim()
    };
  });
};

export const bucketMarkdownBySection = (
  markdown: string,
  fallbackSectionCode: string,
  knownSectionCodes: Set<string>
): Map<string, string[]> => {
  const buckets = new Map<string, string[]>();
  const sections = splitTopLevelMarkdownSections(markdown);

  if (!sections.length) {
    buckets.set(fallbackSectionCode, [markdown]);
    return buckets;
  }

  sections.forEach((section) => {
    const detectedSectionCode = getTextbookSectionPrefix(section.heading);
    const targetSectionCode =
      detectedSectionCode && knownSectionCodes.has(detectedSectionCode)
        ? detectedSectionCode
        : fallbackSectionCode;

    const existing = buckets.get(targetSectionCode) || [];
    existing.push(section.markdown);
    buckets.set(targetSectionCode, existing);
  });

  return buckets;
};
