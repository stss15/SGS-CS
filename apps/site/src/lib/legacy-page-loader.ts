import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

type NavSection = 'ai-prompt' | 'ks3' | 'year7' | 'year8' | 'year9' | 'igcse' | 'ib';

export interface LegacyBreadcrumbItem {
  label: string;
  href?: string;
}

interface LegacyPageFrontmatter {
  title?: string;
  description?: string;
  activeSection?: NavSection;
  breadcrumbs?: Array<{ label?: string; href?: string }>;
  extraStyles?: string[];
  scripts?: string[];
}

export interface LegacyHtmlPage {
  title: string;
  description: string;
  activeSection?: NavSection;
  breadcrumbs: LegacyBreadcrumbItem[];
  extraStyles: string[];
  scripts: string[];
  bodyHtml: string;
  sourcePath: string;
}

const repoRoot = path.resolve(fileURLToPath(new URL('../../../../', import.meta.url)));
const pageCache = new Map<string, Promise<LegacyHtmlPage>>();

const normalizeHref = (href: unknown): string | undefined => {
  if (typeof href !== 'string' || href.trim().length === 0) {
    return undefined;
  }

  const trimmedHref = href.trim();

  if (
    trimmedHref.startsWith('/') ||
    trimmedHref.startsWith('#') ||
    trimmedHref.startsWith('?') ||
    trimmedHref.startsWith('http://') ||
    trimmedHref.startsWith('https://') ||
    trimmedHref.startsWith('//')
  ) {
    return trimmedHref;
  }

  return `/${trimmedHref.replace(/^\.?\//, '')}`;
};

const normalizeStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => normalizeHref(entry))
    .filter((entry): entry is string => Boolean(entry));
};

const normalizeBreadcrumbs = (value: unknown): LegacyBreadcrumbItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const breadcrumbs: LegacyBreadcrumbItem[] = [];

  value.forEach((entry) => {
    if (!entry || typeof entry !== 'object') {
      return;
    }

    const label = typeof entry.label === 'string' ? entry.label.trim() : '';

    if (!label) {
      return;
    }

    const href = normalizeHref(entry.href);
    breadcrumbs.push(href ? { label, href } : { label });
  });

  return breadcrumbs;
};

const readLegacyHtmlPage = async (relativeSourcePath: string): Promise<LegacyHtmlPage> => {
  const sourcePath = path.join(repoRoot, relativeSourcePath);
  const fileContents = await fs.readFile(sourcePath, 'utf8');
  const parsed = matter(fileContents);
  const frontmatter = parsed.data as LegacyPageFrontmatter;
  const title =
    typeof frontmatter.title === 'string' && frontmatter.title.trim().length > 0
      ? frontmatter.title.trim()
      : path.basename(relativeSourcePath, path.extname(relativeSourcePath));

  return {
    title,
    description:
      typeof frontmatter.description === 'string' && frontmatter.description.trim().length > 0
        ? frontmatter.description.trim()
        : title,
    activeSection: frontmatter.activeSection,
    breadcrumbs: normalizeBreadcrumbs(frontmatter.breadcrumbs),
    extraStyles: normalizeStringArray(frontmatter.extraStyles),
    scripts: normalizeStringArray(frontmatter.scripts),
    bodyHtml: parsed.content.trim(),
    sourcePath: relativeSourcePath
  };
};

export const loadLegacyHtmlPage = (relativeSourcePath: string): Promise<LegacyHtmlPage> => {
  const cached = pageCache.get(relativeSourcePath);

  if (cached) {
    return cached;
  }

  const pending = readLegacyHtmlPage(relativeSourcePath);
  pageCache.set(relativeSourcePath, pending);

  pending.catch(() => {
    pageCache.delete(relativeSourcePath);
  });

  return pending;
};
