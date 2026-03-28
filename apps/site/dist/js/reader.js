(() => {
  const shell = document.querySelector('[data-sgs-reader]');
  if (!shell) return;

  const root = document.documentElement;
  const contentRoot = shell.querySelector('[data-reader-content]');
  if (!contentRoot) return;

  const announceEl = shell.querySelector('[data-reader-announcer]');
  const modalOverlay = document.querySelector('[data-reader-modal-overlay]');
  const defModal = document.getElementById('reader-def-modal');
  const defTitle = defModal?.querySelector('[data-reader-def-title]');
  const defBody = defModal?.querySelector('[data-reader-def-body]');

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const announce = (message) => {
    if (!announceEl) return;
    announceEl.textContent = message;
  };

  const parseCssPx = (value, fallback = 56) => {
    const parsed = Number.parseFloat(String(value || '').trim());
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  // ── Header offset sync ────────────────────────────────────────
  const syncHeaderOffset = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const rect = header.getBoundingClientRect();
    root.style.setProperty('--reader-nav-offset', `${Math.max(0, Math.round(rect.height))}px`);
  };

  syncHeaderOffset();
  window.addEventListener('resize', syncHeaderOffset);

  // ── Heading IDs ───────────────────────────────────────────────
  const slugify = (value) =>
    String(value || '')
      .trim()
      .toLowerCase()
      .replace(/['"]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'section';

  const ensureHeadingIds = (headings) => {
    const used = new Set();
    headings.forEach((heading) => {
      if (heading.id) {
        used.add(heading.id);
        return;
      }

      const base = slugify(heading.textContent);
      let next = base;
      let index = 2;
      while (used.has(next) || document.getElementById(next)) {
        next = `${base}-${index}`;
        index += 1;
      }
      heading.id = next;
      used.add(next);
    });
  };

  const headings = Array.from(contentRoot.querySelectorAll('h2, h3'));
  ensureHeadingIds(headings);

  // ── Collapsible content chapters ──────────────────────────────
  const h2Headings = headings.filter((h) => h.tagName === 'H2' && !h.closest('.ib-syllabus-reader-block__header'));
  h2Headings.forEach((h2) => {
    const details = document.createElement('details');
    details.className = 'reader-chapter';

    const summary = document.createElement('summary');
    summary.className = 'reader-chapter__summary';
    summary.appendChild(h2.cloneNode(true));

    const parent = h2.parentNode;
    let next = h2.nextSibling;
    parent.insertBefore(details, h2);
    h2.remove();
    details.appendChild(summary);

    while (next) {
      if (next.nodeType === 1 && next.tagName === 'H2') break;
      if (next.nodeType === 1 && next.classList && next.classList.contains('reader-chapter')) break;
      const toMove = next;
      next = next.nextSibling;
      details.appendChild(toMove);
    }
  });

  // ── Hash navigation ───────────────────────────────────────────
  const scrollToHeading = (heading, behavior = prefersReducedMotion() ? 'auto' : 'smooth') => {
    const navOffset = parseCssPx(getComputedStyle(root).getPropertyValue('--reader-nav-offset'), 56);
    const top = window.scrollY + heading.getBoundingClientRect().top - navOffset - 14;
    window.scrollTo({ top: Math.max(0, top), behavior });
  };

  const expandChapterForId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const chapter = el.closest('details.reader-chapter');
    if (chapter) chapter.open = true;
  };

  const navigateToId = (id, { updateHistory = true, behavior } = {}) => {
    const heading = document.getElementById(id);
    if (!heading) return;

    expandChapterForId(id);
    scrollToHeading(heading, behavior);

    if (updateHistory && window.location.hash !== `#${id}`) {
      history.pushState(null, '', `#${id}`);
    }

    announce(`Section: ${(heading.textContent || '').trim()}`);
  };

  if (window.location.hash) {
    const initialId = window.location.hash.replace('#', '');
    const initialTarget = document.getElementById(initialId);
    if (initialTarget) {
      requestAnimationFrame(() => navigateToId(initialId, { updateHistory: false, behavior: 'auto' }));
    }
  }

  window.addEventListener('hashchange', () => {
    const id = (window.location.hash || '').replace('#', '');
    if (!id) return;
    navigateToId(id, { updateHistory: false, behavior: 'auto' });
  });

  // ── Contents-block jump links ─────────────────────────────────
  const contentsNav = contentRoot.querySelector('.ib-textbook-contents');
  contentsNav?.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    event.preventDefault();
    navigateToId(href.slice(1));
  });

  // ── Keyword definitions ───────────────────────────────────────
  const keywordNodes = Array.from(contentRoot.querySelectorAll('[data-def]'));
  keywordNodes.forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    node.classList.add('keyword');
    if (!node.hasAttribute('tabindex')) node.tabIndex = 0;
    if (!node.hasAttribute('role')) node.setAttribute('role', 'button');
    node.setAttribute('aria-haspopup', 'dialog');
  });

  const getFocusable = (container) =>
    Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );

  let lastTrigger = null;

  const openDefinition = (term, definition, trigger) => {
    if (!defModal || !modalOverlay) return;
    lastTrigger = trigger instanceof HTMLElement ? trigger : null;
    if (defTitle) defTitle.textContent = term;
    if (defBody) defBody.textContent = definition;
    defModal.style.display = 'block';
    defModal.setAttribute('aria-hidden', 'false');
    modalOverlay.style.display = 'block';
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('reader-modal-open');
    const focusTarget = defModal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusTarget?.focus();
    announce(`Definition opened: ${term}`);
  };

  const closeDefinition = () => {
    if (!defModal || !modalOverlay) return;
    defModal.style.display = 'none';
    defModal.setAttribute('aria-hidden', 'true');
    modalOverlay.style.display = 'none';
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('reader-modal-open');
    if (lastTrigger instanceof HTMLElement) {
      lastTrigger.focus();
    }
    lastTrigger = null;
  };

  modalOverlay?.addEventListener('click', closeDefinition);
  document.querySelectorAll('[data-reader-close-modal]').forEach((button) => {
    button.addEventListener('click', closeDefinition);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && defModal?.getAttribute('aria-hidden') === 'false') {
      closeDefinition();
      return;
    }

    if (event.key !== 'Tab' || defModal?.getAttribute('aria-hidden') !== 'false') return;
    const focusable = getFocusable(defModal);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const openDefinitionFromTarget = (target) => {
    const term = (target.textContent || '').trim();
    const definition = target.getAttribute('data-def') || 'No definition available.';
    openDefinition(term, definition, target);
  };

  document.body.addEventListener('click', (event) => {
    const target = event.target.closest('[data-def]');
    if (!target || !shell.contains(target)) return;
    openDefinitionFromTarget(target);
  });

  document.body.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target.closest('[data-def]');
    if (!target || !shell.contains(target)) return;
    event.preventDefault();
    openDefinitionFromTarget(target);
  });
})();
