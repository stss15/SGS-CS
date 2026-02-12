import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { NOISE_FILES, TOPIC_MAP, TOPIC_SOURCE_POLICY, normalizePseudocodeAssignments } from './topic-map.mjs';

export const ROOT = process.cwd();

const STOP_WORDS = new Set([
  'and',
  'the',
  'of',
  'to',
  'for',
  'with',
  'in',
  'on',
  'at',
  'by',
  'a',
  'an',
  'its',
  'is',
  'are',
  'this',
  'that',
  'as',
  'from',
  'using',
  'use'
]);

const NOISE_LINE_PATTERNS = [
  /Back to contents page/i,
  /www\.cambridgeinternational\.org/i,
  /Cambridge IGCSE Computer Science/i,
  /\.indd/i,
  /^\d+\s*$/,
  /^\d+\/\d+\/\d+/,
  /^\s*\f\s*$/,
  /^Find out more$/i,
  /^Activity\s+\d+/i,
  /^[▲▼✅]/,
  /\|\s*SGS Education/i,
  /^Quick Recall/i
];

const cachedIndexData = new Map();

export const asPosix = (value) => String(value).split(path.sep).join('/');

export const relativeToRoot = (absolutePath) => asPosix(path.relative(ROOT, absolutePath));

export const sourcePolicy = TOPIC_SOURCE_POLICY;

export const allTopics = TOPIC_MAP;

export const isNoiseFile = (relativePath) => NOISE_FILES.includes(asPosix(relativePath));

export const resolvePathFromRoot = (relativePath) => path.join(ROOT, relativePath);

const parseSubtopicFromString = (value) => {
  const match = String(value || '').trim().match(/^(\d+\.\d+)\s+(.+)$/);
  if (!match) return null;
  return {
    code: match[1],
    title: match[2].trim()
  };
};

export const readTopicIndexContext = (topicNumber) => {
  if (cachedIndexData.has(topicNumber)) {
    return cachedIndexData.get(topicNumber);
  }

  const indexPath = path.join(ROOT, `src/pages/igcse/topic${topicNumber}/index.njk`);
  if (!fs.existsSync(indexPath)) {
    const fallback = {
      subtopicTitles: new Map(),
      unitSummary: '',
      objectives: [],
      outcomes: []
    };
    cachedIndexData.set(topicNumber, fallback);
    return fallback;
  }

  const frontmatter = matter(fs.readFileSync(indexPath, 'utf8')).data || {};
  const specification = frontmatter.specification || {};

  const subtopicTitles = new Map();
  const slideDeckResources = Array.isArray(frontmatter.slideDeckResources) ? frontmatter.slideDeckResources : [];
  for (const item of slideDeckResources) {
    const code = String(item?.number || '').trim();
    const title = String(item?.name || '').trim();
    if (/^\d+\.\d+$/.test(code) && title.length > 0) {
      subtopicTitles.set(code, title);
    }
  }

  if (subtopicTitles.size === 0 && Array.isArray(specification.subtopics)) {
    for (const item of specification.subtopics) {
      const parsed = parseSubtopicFromString(item);
      if (parsed) {
        subtopicTitles.set(parsed.code, parsed.title);
      }
    }
  }

  const context = {
    subtopicTitles,
    unitSummary: String(specification.unitSummary || '').trim(),
    objectives: Array.isArray(specification.objectives)
      ? specification.objectives.map((item) => String(item || '').trim()).filter(Boolean)
      : [],
    outcomes: Array.isArray(specification.outcomes)
      ? specification.outcomes.map((item) => String(item || '').trim()).filter(Boolean)
      : []
  };

  cachedIndexData.set(topicNumber, context);
  return context;
};

export const resolveCanonicalTopic = (topic) => {
  const context = readTopicIndexContext(topic.topicNumber);
  const canonicalSubtopics = topic.subtopics.map((subtopic) => ({
    ...subtopic,
    title: context.subtopicTitles.get(subtopic.code) || subtopic.title
  }));

  return {
    ...topic,
    subtopics: canonicalSubtopics,
    unitSummary:
      context.unitSummary ||
      `${topic.topicName} with full chapter coverage across ${canonicalSubtopics.map((item) => item.code).join(', ')}.`,
    objectives: context.objectives,
    outcomes: context.outcomes
  };
};

export const cleanSourceLine = (line) =>
  String(line || '')
    .replace(/[\u00A0\u2007\u202F]/g, ' ')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

export const cleanSourceText = (text) => {
  const normalized = normalizePseudocodeAssignments(String(text || '').replace(/\r\n?/g, '\n'));
  const rawLines = normalized.split('\n');
  const filtered = [];

  for (const rawLine of rawLines) {
    const line = cleanSourceLine(rawLine);
    if (!line) continue;
    if (NOISE_LINE_PATTERNS.some((pattern) => pattern.test(line))) continue;
    filtered.push(line);
  }

  return filtered.join('\n');
};

const stripHtml = (html) =>
  String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');

export const readSourceText = (relativePath) => {
  const safePath = asPosix(relativePath);
  if (isNoiseFile(safePath)) return '';

  const absolutePath = resolvePathFromRoot(safePath);
  if (!fs.existsSync(absolutePath)) return '';

  const raw = fs.readFileSync(absolutePath, 'utf8');
  const text = absolutePath.toLowerCase().endsWith('.html') ? stripHtml(raw) : raw;
  return cleanSourceText(text);
};

const keywordTokens = (subtopic) => {
  const titleTokens = String(subtopic.title || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .split(/[^a-z0-9.]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3)
    .filter((token) => !STOP_WORDS.has(token));

  const code = String(subtopic.code || '').toLowerCase();
  const tokens = new Set([code, ...titleTokens]);
  return [...tokens];
};

const scoredLine = (line, keywords) => {
  const lower = line.toLowerCase();
  let keywordHits = 0;
  let score = 0;
  for (const keyword of keywords) {
    if (lower.includes(keyword)) {
      keywordHits += 1;
      score += 2;
    }
  }

  if (keywordHits === 0) return -1;
  if (/[0-9]/.test(line)) score += 0.4;
  if (line.length > 180) score -= 0.3;
  if (line.length < 24) score -= 0.6;
  if (/^[-•»]/.test(line)) score += 0.4;

  return score;
};

export const extractEvidenceLines = (sourceText, subtopic, maxLines = 6) => {
  const lines = String(sourceText || '')
    .split('\n')
    .map((line) => cleanSourceLine(line).replace(/^[-•»]\s*/, ''))
    .filter(Boolean)
    .filter((line) => !/^[0-9]+\.[0-9]+(\.[0-9]+)?\s+/.test(line))
    .filter((line) => !/^(Figure|Table)\b/i.test(line))
    .filter((line) => !/[▲▼]/.test(line))
    .filter((line) => line.split(/\s+/).length >= 5);

  if (lines.length === 0) return [];

  const keywords = keywordTokens(subtopic);
  const scored = lines
    .map((line) => ({ line, score: scoredLine(line, keywords) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const selected = [];
  const seen = new Set();

  for (const entry of scored) {
    const key = entry.line.toLowerCase();
    if (seen.has(key)) continue;
    selected.push(entry.line);
    seen.add(key);
    if (selected.length >= maxLines) break;
  }

  if (selected.length === 0) {
    for (const line of lines) {
      const key = line.toLowerCase();
      if (seen.has(key)) continue;
      selected.push(line);
      seen.add(key);
      if (selected.length >= maxLines) break;
    }
  }

  return selected;
};

const sourcePathScore = (relativePath, subtopicCode) => {
  const normalizedPath = asPosix(relativePath).toLowerCase();
  const code = String(subtopicCode || '').toLowerCase();
  const filename = path.basename(normalizedPath);

  let score = 0;
  if (filename.includes(`${code}.`)) score += 6;
  if (filename.includes(code.replace('.', '_'))) score += 5;
  if (filename.includes(code.replace('.', '-'))) score += 5;
  if (normalizedPath.includes(`/chapter ${code.split('.')[0]} subfiles/`)) score += 2;
  if (normalizedPath.includes('/key words')) score -= 1;
  if (normalizedPath.endsWith('.html')) score += 1;
  return score;
};

export const sourceFilesForSubtopic = (topic, subtopic) => {
  const sources = (topic.sourceFiles || []).filter((relativePath) => !isNoiseFile(asPosix(relativePath)));

  return [...sources].sort((a, b) => {
    const delta = sourcePathScore(b, subtopic.code) - sourcePathScore(a, subtopic.code);
    return delta !== 0 ? delta : String(a).localeCompare(String(b));
  });
};

export const escapeHtml = (value) =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const resolveDiagramAsset = (diagram) => {
  if (!diagram?.path) return null;
  const rel = String(diagram.path).replace(/^\//, '');
  const diskPath = path.join(ROOT, 'src/static', rel);
  if (!fs.existsSync(diskPath)) return null;
  return {
    ...diagram,
    diskPath
  };
};

export const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

export const parseBooleanFlag = (value, fallback = false) => {
  if (value === undefined || value === null) return fallback;
  const normal = String(value).trim().toLowerCase();
  if (normal === 'true') return true;
  if (normal === 'false') return false;
  return fallback;
};
