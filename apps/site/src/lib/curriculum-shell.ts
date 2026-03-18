export type ShellMode = 'reading' | 'worksheet' | 'workspace';

export interface ShellNavItem {
  label: string;
  href: string;
  meta?: string;
}

export interface ShellNavGroup {
  id: string;
  label: string;
  items: ShellNavItem[];
  meta?: string;
  open?: boolean;
  sequence?: boolean;
}

export interface ShellContext {
  title: string;
  meta?: string;
  groups: ShellNavGroup[];
}

export interface ShellPageLink {
  label: string;
  href: string;
}

const isExternalHref = (href: string): boolean => /^(?:[a-z]+:)?\/\//i.test(href);

export const normalizeShellPath = (value: string): string => {
  const [withoutHash] = value.split('#');
  const [withoutQuery] = withoutHash.split('?');
  const withLeadingSlash = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  const withoutIndex = withLeadingSlash.replace(/\/index\.html$/i, '');
  const withoutHtml = withoutIndex.replace(/\.html$/i, '');
  const withoutTrailingSlash = withoutHtml.length > 1 ? withoutHtml.replace(/\/+$/g, '') : withoutHtml;
  return withoutTrailingSlash || '/';
};

export const hrefMatchesCurrentPath = (href: string, currentPath: string): boolean => {
  if (!href || href.startsWith('#') || href.startsWith('javascript:') || isExternalHref(href)) {
    return false;
  }

  return normalizeShellPath(href) === normalizeShellPath(currentPath);
};

export const buildPrevNextLinks = (
  groups: ShellNavGroup[],
  currentPath: string
): { prevLink?: ShellPageLink; nextLink?: ShellPageLink } => {
  const sequencedItems = groups
    .filter((group) => group.sequence)
    .flatMap((group) => group.items)
    .filter((item) => item.href && !item.href.startsWith('#') && !item.href.startsWith('javascript:') && !isExternalHref(item.href));

  const dedupedItems = sequencedItems.filter(
    (item, index, list) => list.findIndex((candidate) => normalizeShellPath(candidate.href) === normalizeShellPath(item.href)) === index
  );

  const currentIndex = dedupedItems.findIndex((item) => hrefMatchesCurrentPath(item.href, currentPath));
  if (currentIndex === -1) {
    return {};
  }

  const prevItem = currentIndex > 0 ? dedupedItems[currentIndex - 1] : undefined;
  const nextItem = currentIndex < dedupedItems.length - 1 ? dedupedItems[currentIndex + 1] : undefined;

  return {
    prevLink: prevItem ? { label: prevItem.label, href: prevItem.href } : undefined,
    nextLink: nextItem ? { label: nextItem.label, href: nextItem.href } : undefined
  };
};
