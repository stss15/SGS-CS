#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const fg = require('fast-glob');

const ROOT_DIR = path.resolve(__dirname, '../..');
const DEFAULT_TARGET = path.join(ROOT_DIR, 'apps/site/dist');
const AUTH_GATE_MARKER = 'data-sgs-auth-gate';
const LEGACY_INLINE_EVENTS_MARKER = 'data-sgs-inline-events';
const LEGACY_INLINE_EVENTS_SCRIPT = '/js/legacy-inline-events.js';
const DEFAULT_META_DESCRIPTION =
  'SGS Education resources for KS3, IGCSE, and IB students and teachers.';
const DEFAULT_VIEWPORT_META = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
const STANDARD_SKIP_LINK = '    <a class="skip-link" href="#main-content">Skip to main content</a>';
const DEFAULT_SITE_TITLE = 'SGS Education';
const AUTH_HEAD_SNIPPET = `
    <!-- ${AUTH_GATE_MARKER} -->
    <link rel="stylesheet" href="/css/auth-gate.css">
    <script>document.documentElement.classList.add('auth-pending');</script>`;
const AUTH_BODY_SNIPPET = `
    <!-- ${AUTH_GATE_MARKER} -->
    <script src="/__/firebase/10.13.2/firebase-app-compat.js"></script>
    <script src="/__/firebase/10.13.2/firebase-auth-compat.js"></script>
    <script src="/__/firebase/init.js"></script>
    <script src="/js/auth-gate.js"></script>`;

const toPosix = (value) => value.split(path.sep).join('/');

const parseArgs = () => {
  const options = { target: DEFAULT_TARGET };

  process.argv.slice(2).forEach((arg) => {
    if (arg.startsWith('--target=')) {
      options.target = path.resolve(ROOT_DIR, arg.replace('--target=', ''));
    }
  });

  return options;
};

const injectAuthGate = (html) => {
  if (html.includes(AUTH_GATE_MARKER)) return html;

  let updated = html;
  if (/<\/head>/i.test(updated)) {
    updated = updated.replace(/<\/head>/i, `${AUTH_HEAD_SNIPPET}\n</head>`);
  } else {
    updated = `${AUTH_HEAD_SNIPPET}\n${updated}`;
  }

  if (/<\/body>/i.test(updated)) {
    updated = updated.replace(/<\/body>/i, `${AUTH_BODY_SNIPPET}\n</body>`);
  } else {
    updated = `${updated}\n${AUTH_BODY_SNIPPET}`;
  }

  return updated;
};

const injectHeadMeta = (html, metaTag) => {
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, `    ${metaTag}\n</head>`);
  }

  return `${metaTag}\n${html}`;
};

const getActiveSectionFromRoute = (relativePath) => {
  const normalizedPath = toPosix(relativePath).toLowerCase();

  if (normalizedPath.startsWith('ks3/')) return 'ks3';
  if (normalizedPath.startsWith('igcse/')) return 'igcse';
  if (normalizedPath.startsWith('ib-2027/') || normalizedPath.startsWith('ib/')) return 'ib';
  return '';
};

const buildUnifiedHeader = (activeSection) => {
  const navItem = (label, href, sectionKey) => {
    const isActive = activeSection === sectionKey;
    const activeClass = isActive ? ' active' : '';
    const ariaCurrent = isActive ? ' aria-current="page"' : '';
    return `<a href="${href}" class="nav-link${activeClass}"${ariaCurrent}>${label}</a>`;
  };

  return `    <header class="main-header">
        <div class="header-primary">
            <div class="logo-container">
                <a href="/index.html">
                    <img src="/images/Logo.png" alt="SGS Education logo" class="logo-img" decoding="async">
                </a>
                <a href="/index.html" class="site-title-link">
                    <span class="site-title">${DEFAULT_SITE_TITLE}</span>
                </a>
            </div>

            <nav class="main-nav main-nav-simple" aria-label="Main navigation">
                ${navItem('KS3', '/ks3/index.html', 'ks3')}
                ${navItem('IGCSE', '/igcse/index.html', 'igcse')}
                ${navItem('IB', '/ib-2027/index.html', 'ib')}
            </nav>

            <div class="site-auth-slot" data-auth-slot aria-label="Account actions"></div>
        </div>
    </header>`;
};

const normalizeMainHeaderShell = (html, relativePath) => {
  const hasMainHeader = /<header\s+class=["']main-header["']/i.test(html);
  const hasBreadcrumb = /<nav\s+class=["']breadcrumb-nav["']/i.test(html);
  if (!hasMainHeader && !hasBreadcrumb) return html;

  const unifiedHeader = buildUnifiedHeader(getActiveSectionFromRoute(relativePath));
  let updated = html;

  if (hasMainHeader) {
    let headerReplacements = 0;
    updated = updated.replace(/<header\s+class=["']main-header["'][\s\S]*?<\/header>/gi, () => {
      headerReplacements += 1;
      return headerReplacements === 1 ? unifiedHeader : '';
    });
  } else {
    // Breadcrumb-only legacy shells still need the canonical site header.
    if (/\bclass=["'][^"']*\bskip-link\b[^"']*["'][^>]*>[\s\S]*?<\/a>/i.test(updated)) {
      updated = updated.replace(
        /(<a\b[^>]*\bclass=["'][^"']*\bskip-link\b[^"']*["'][^>]*>[\s\S]*?<\/a>)/i,
        `$1\n${unifiedHeader}`
      );
    } else if (/<body[^>]*>/i.test(updated)) {
      updated = updated.replace(/<body[^>]*>/i, (match) => `${match}\n${unifiedHeader}`);
    } else {
      updated = `${unifiedHeader}\n${updated}`;
    }
  }

  updated = updated.replace(/\s*<nav\s+class=["']breadcrumb-nav["'][\s\S]*?<\/nav>\s*/gi, '\n');
  updated = updated.replace(/\s*<script[^>]+src=["'][^"']*\/js\/nav\.js["'][^>]*><\/script>\s*/gi, '\n');

  return updated;
};

const ensureSkipLink = (html) => {
  let updated = html.replace(
    /<a\s+href=["']#main-content["']\s*>Skip to main content<\/a>/i,
    '<a class="skip-link" href="#main-content">Skip to main content</a>'
  );

  if (/\bclass=["'][^"']*\bskip-link\b[^"']*["']/i.test(updated)) {
    return updated;
  }

  if (/<body[^>]*>/i.test(updated)) {
    updated = updated.replace(/<body[^>]*>/i, (match) => `${match}\n${STANDARD_SKIP_LINK}`);
  }

  return updated;
};

const ensureMainContentId = (html) =>
  html.replace(/<main\b([^>]*)>/i, (match, attributes) => {
    if (/\bid\s*=/.test(attributes)) return match;
    return `<main id="main-content"${attributes}>`;
  });

const ensureCoreMetaTags = (html) => {
  let updated = html;
  if (!/<meta[^>]+name=["']viewport["']/i.test(updated)) {
    updated = injectHeadMeta(updated, DEFAULT_VIEWPORT_META);
  }

  if (!/<meta[^>]+name=["']description["']/i.test(updated)) {
    updated = injectHeadMeta(
      updated,
      `<meta name="description" content="${DEFAULT_META_DESCRIPTION}">`
    );
  }

  return updated;
};

const ensureBlankTargetRelSecurity = (html) =>
  html.replace(/<a\b[^>]*\btarget\s*=\s*["']_blank["'][^>]*>/gi, (tag) => {
    const relMatch = tag.match(/\brel\s*=\s*["']([^"']*)["']/i);
    const secureTokens = ['noopener', 'noreferrer'];

    if (!relMatch) {
      return tag.replace(/>$/, ' rel="noopener noreferrer">');
    }

    const existingTokens = relMatch[1]
      .split(/\s+/)
      .map((token) => token.trim().toLowerCase())
      .filter(Boolean);
    const mergedTokens = Array.from(new Set([...existingTokens, ...secureTokens]));
    const mergedRel = `rel="${mergedTokens.join(' ')}"`;

    return tag.replace(/\brel\s*=\s*["'][^"']*["']/i, mergedRel);
  });

const ensureImageDecoding = (html) => {
  const nonTransformBlocks = /<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi;
  let output = '';
  let lastIndex = 0;
  let match = nonTransformBlocks.exec(html);

  const transformFragment = (fragment) =>
    fragment.replace(/<img\b[^>]*>/gi, (tag) => {
      if (/\bdecoding\s*=\s*["'][^"']*["']/i.test(tag)) return tag;
      return tag.replace(/>$/, ' decoding="async">');
    });

  while (match) {
    output += transformFragment(html.slice(lastIndex, match.index));
    output += match[0];
    lastIndex = match.index + match[0].length;
    match = nonTransformBlocks.exec(html);
  }

  output += transformFragment(html.slice(lastIndex));
  return output;
};

const escapeHtmlAttribute = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const transformInlineEventsInFragment = (fragment) => {
  let replacements = 0;
  const transformed = fragment.replace(
    /\s(on[a-z]+)\s*=\s*("([^"]*)"|'([^']*)')/gi,
    (_, eventName, _quoted, doubleQuotedValue, singleQuotedValue) => {
      const expression = doubleQuotedValue !== undefined ? doubleQuotedValue : singleQuotedValue || '';
      replacements += 1;
      return ` data-sgs-${eventName.toLowerCase()}="${escapeHtmlAttribute(expression)}"`;
    }
  );

  return { transformed, replacements };
};

const convertLegacyInlineHandlers = (html) => {
  const nonTransformBlocks = /<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi;

  let output = '';
  let lastIndex = 0;
  let totalReplacements = 0;

  let match = nonTransformBlocks.exec(html);
  while (match) {
    const before = html.slice(lastIndex, match.index);
    const converted = transformInlineEventsInFragment(before);
    output += converted.transformed;
    totalReplacements += converted.replacements;

    output += match[0];
    lastIndex = match.index + match[0].length;
    match = nonTransformBlocks.exec(html);
  }

  const tail = html.slice(lastIndex);
  const convertedTail = transformInlineEventsInFragment(tail);
  output += convertedTail.transformed;
  totalReplacements += convertedTail.replacements;

  return { html: output, replacements: totalReplacements };
};

const hasLegacyDataEventAttributes = (html) => /\sdata-sgs-on[a-z]+\s*=\s*["'][^"']*["']/i.test(html);

const injectLegacyInlineEventsRuntime = (html) => {
  if (html.includes(LEGACY_INLINE_EVENTS_MARKER) || html.includes(LEGACY_INLINE_EVENTS_SCRIPT)) {
    return html;
  }

  const snippet = `
    <!-- ${LEGACY_INLINE_EVENTS_MARKER} -->
    <script src="${LEGACY_INLINE_EVENTS_SCRIPT}"></script>`;

  if (/<\/body>/i.test(html)) {
    return html.replace(/<\/body>/i, `${snippet}\n</body>`);
  }

  return `${html}${snippet}`;
};

const run = async () => {
  const options = parseArgs();

  if (!(await fs.pathExists(options.target))) {
    console.error(`ERROR: target directory not found: ${toPosix(path.relative(ROOT_DIR, options.target))}`);
    process.exit(1);
  }

  const htmlFiles = await fg('**/*.html', { cwd: options.target });
  let inlineHandlerReplacements = 0;
  let updatedFiles = 0;

  await Promise.all(
    htmlFiles.map(async (relativePath) => {
      const filePath = path.join(options.target, relativePath);
      const source = await fs.readFile(filePath, 'utf8');
      let updated = normalizeMainHeaderShell(source, relativePath);
      updated = ensureSkipLink(updated);
      updated = ensureMainContentId(updated);
      updated = injectAuthGate(updated);
      updated = ensureCoreMetaTags(updated);
      updated = ensureBlankTargetRelSecurity(updated);
      updated = ensureImageDecoding(updated);
      const converted = convertLegacyInlineHandlers(updated);
      updated = converted.html;
      if (converted.replacements > 0 || hasLegacyDataEventAttributes(updated)) {
        inlineHandlerReplacements += converted.replacements;
        updated = injectLegacyInlineEventsRuntime(updated);
      }
      if (updated !== source) {
        updatedFiles += 1;
        await fs.writeFile(filePath, updated);
      }
    })
  );

  console.log('Framework dist hardening complete.');
  console.log(`  Target: ${toPosix(path.relative(ROOT_DIR, options.target))}`);
  console.log(`  HTML scanned: ${htmlFiles.length}`);
  console.log(`  HTML updated: ${updatedFiles}`);
  console.log(`  Inline handlers migrated: ${inlineHandlerReplacements}`);
};

run().catch((error) => {
  console.error('Failed to harden framework dist:', error);
  process.exit(1);
});
