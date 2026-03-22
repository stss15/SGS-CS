import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { readSourceFrontmatter, repoRoot } from './source-content';

export interface UnitFrontmatter {
  title?: string;
  description?: string;
  hero?: { title?: string; subtitle?: string };
  specification?: {
    examCode?: string;
    unitSummary?: string;
    objectives?: string[];
    outcomes?: string[];
    subtopics?: string[];
  };
  resources?: Array<{ href: string; number?: string; name?: string }>;
}

export const IB_UNITS: Record<string, { name: string; meta: string }> = {
  A1: { name: 'Computer Fundamentals', meta: 'SL: 11 hours | HL: 18 hours' },
  A2: { name: 'Networks', meta: 'SL: 11 hours | HL: 18 hours' },
  A3: { name: 'Databases', meta: 'SL: 11 hours | HL: 18 hours' },
  A4: { name: 'Machine Learning', meta: 'SL: 5 hours | HL: 18 hours' },
  B1: { name: 'Computational Thinking', meta: 'SL: 5 hours | HL: 5 hours' },
  B2: { name: 'Programming', meta: 'SL: 40 hours | HL: 42 hours' },
  B3: { name: 'Object-Oriented Programming', meta: 'SL: 7 hours | HL: 23 hours' },
  B4: { name: 'Abstract Data Types', meta: 'HL Only | 23 hours' },
};

export async function getUnitFrontmatter(code: string): Promise<UnitFrontmatter> {
  try {
    return await readSourceFrontmatter<UnitFrontmatter>(`src/pages/ib-2027/${code}/index.njk`);
  } catch {
    return {};
  }
}

export interface SubtopicFrontmatter {
  title?: string;
  description?: string;
  hero?: { title?: string; subtitle?: string };
  resources?: Array<{ href: string; number?: string; name?: string; type?: string; target?: string }>;
}

export interface SlideInfo {
  name: string;
  href: string;
}

export const IB_SUBTOPICS = [
  { topic: 'A1', subtopic: 'A1.1' }, { topic: 'A1', subtopic: 'A1.2' },
  { topic: 'A1', subtopic: 'A1.3' }, { topic: 'A1', subtopic: 'A1.4' },
  { topic: 'A2', subtopic: 'A2.1' }, { topic: 'A2', subtopic: 'A2.2' },
  { topic: 'A2', subtopic: 'A2.3' }, { topic: 'A2', subtopic: 'A2.4' },
  { topic: 'A3', subtopic: 'A3.1' }, { topic: 'A3', subtopic: 'A3.2' },
  { topic: 'A3', subtopic: 'A3.3' }, { topic: 'A3', subtopic: 'A3.4' },
  { topic: 'A4', subtopic: 'A4.1' }, { topic: 'A4', subtopic: 'A4.2' },
  { topic: 'A4', subtopic: 'A4.3' }, { topic: 'A4', subtopic: 'A4.4' },
  { topic: 'B1', subtopic: 'B1.1' }, { topic: 'B1', subtopic: 'B1.2' },
  { topic: 'B1', subtopic: 'B1.3' }, { topic: 'B1', subtopic: 'B1.4' },
  { topic: 'B2', subtopic: 'B2.1' }, { topic: 'B2', subtopic: 'B2.2' },
  { topic: 'B2', subtopic: 'B2.3' }, { topic: 'B2', subtopic: 'B2.4' },
  { topic: 'B2', subtopic: 'B2.5' },
  { topic: 'B3', subtopic: 'B3.1' }, { topic: 'B3', subtopic: 'B3.2' },
  { topic: 'B4', subtopic: 'B4.1' },
] as const;

export async function getSubtopicSlides(topic: string, subtopic: string): Promise<SlideInfo[]> {
  // Slide HTML files live in public/ (built by legacy pipeline), not src/pages/
  const slidesDir = path.join(repoRoot, 'public/ib-2027', topic, subtopic, 'slides');
  if (!existsSync(slidesDir)) return [];
  const entries = await readdir(slidesDir);
  return entries
    .filter((e) => e.endsWith('.html'))
    .sort()
    .map((e) => ({
      name: e.replace('.html', '').replace(/_/g, ' ').replace(/^[AB]\d\.\d\s*/i, ''),
      href: `/ib-2027/${topic}/${subtopic}/slides/${e}`
    }));
}

export async function getSubtopicFrontmatter(topic: string, subtopic: string): Promise<SubtopicFrontmatter> {
  try {
    return await readSourceFrontmatter<SubtopicFrontmatter>(
      `src/pages/ib-2027/${topic}/${subtopic}/index.njk`
    );
  } catch {
    return {};
  }
}
