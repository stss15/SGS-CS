import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

interface SiteData {
  listings: Record<string, unknown>;
}

const cache = new Map<string, Promise<unknown>>();

const hasRepoData = (candidate: string): boolean =>
  existsSync(path.join(candidate, 'src/data/site.json')) && existsSync(path.join(candidate, 'apps/site/src'));

const resolveRepoRoot = (): string => {
  const fromEnv = process.env.SGS_REPO_ROOT;
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    fromEnv,
    process.cwd(),
    path.resolve(process.cwd(), '..'),
    path.resolve(process.cwd(), '../..'),
    path.resolve(process.cwd(), '../../..'),
    path.resolve(here, '../../../../'),
    path.resolve(here, '../../../../../')
  ].filter((value): value is string => Boolean(value));

  for (const candidate of candidates) {
    if (hasRepoData(candidate)) {
      return candidate;
    }
  }

  throw new Error('Unable to locate repository root for app shell content helpers.');
};

export const repoRoot = resolveRepoRoot();

const readCached = <T>(key: string, absolutePath: string, parser: (raw: string) => T): Promise<T> => {
  const cached = cache.get(key);
  if (cached) {
    return cached as Promise<T>;
  }

  const pending = readFile(absolutePath, 'utf8').then(parser);
  cache.set(key, pending);
  pending.catch(() => cache.delete(key));
  return pending;
};

export const readSiteData = (): Promise<SiteData> =>
  readCached('site-data', path.join(repoRoot, 'src/data/site.json'), (raw) => JSON.parse(raw) as SiteData);

export const getListingByKey = async <T>(listingKey: string): Promise<T> => {
  const siteData = await readSiteData();
  const listing = siteData.listings[listingKey];

  if (!listing) {
    throw new Error(`Missing listing key "${listingKey}" in src/data/site.json`);
  }

  return listing as T;
};

export const readSourceFrontmatter = <T>(relativePath: string): Promise<T> =>
  readCached(`frontmatter:${relativePath}`, path.join(repoRoot, relativePath), (raw) => matter(raw).data as T);

export const readMarkdownDocument = <T>(relativePath: string): Promise<{ data: T; content: string }> =>
  readCached(`document:${relativePath}`, path.join(repoRoot, relativePath), (raw) => {
    const parsed = matter(raw);
    return {
      data: parsed.data as T,
      content: parsed.content
    };
  });

export const readPublicHtml = (routePath: string): Promise<string> => {
  const normalized = routePath.replace(/^\/+/, '');
  return readCached(`html:${normalized}`, path.join(repoRoot, 'public', normalized), (raw) => raw);
};

const htmlEntityMap: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' '
};

export const decodeHtmlEntities = (value: string): string =>
  value.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (entity) => htmlEntityMap[entity] || entity);

export const stripHtmlTags = (value: string): string =>
  decodeHtmlEntities(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

export const extractHtmlTitle = (html: string, fallback: string = 'SGS Education'): string => {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? stripHtmlTags(match[1]) : fallback;
};
