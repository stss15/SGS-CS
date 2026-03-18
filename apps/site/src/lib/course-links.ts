const TOOL_SQL_PLAYGROUND_PATH = '/tools/sql-playground.html';

const parseHref = (href: string) => {
  const url = new URL(href, 'https://sgs.local');
  return {
    pathname: url.pathname.replace(/\/+$/g, '') || '/',
    search: url.search,
    hash: url.hash
  };
};

const withRoute = (pathname: string, href: string) => {
  const parsed = parseHref(href);
  return `${pathname}${parsed.search}${parsed.hash}`;
};

export const rewriteIgcseCourseHref = (topicNumber: number, href: string): string => {
  const parsed = parseHref(href);

  if (parsed.pathname !== TOOL_SQL_PLAYGROUND_PATH || topicNumber !== 9) {
    return href;
  }

  return withRoute(`/igcse/topic${topicNumber}/sql-playground.html`, href);
};

export const rewriteIbCourseHref = (level: 'sl' | 'hl', unitNumber: number, href: string): string => {
  const parsed = parseHref(href);
  const hasCourseAlias = (level === 'sl' && unitNumber === 6) || (level === 'hl' && unitNumber === 5);

  if (parsed.pathname !== TOOL_SQL_PLAYGROUND_PATH || !hasCourseAlias) {
    return href;
  }

  return withRoute(`/ib-2027/${level}/unit-${unitNumber}/sql-playground.html`, href);
};

export const stripBlankTarget = (html: string): string =>
  html
    .replace(/\s+target=(['"])_blank\1/gi, '')
    .replace(/\s+rel=(['"])(?:noopener(?:\s+noreferrer)?|noreferrer(?:\s+noopener)?)\1/gi, '');
