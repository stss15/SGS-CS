(() => {
  const shell = document.querySelector('[data-sgs-reader]');
  if (!shell) return;

  const root = document.documentElement;
  const contentRoot = shell.querySelector('[data-reader-content]');
  if (!contentRoot) return;

  const announceEl = shell.querySelector('[data-reader-announcer]');
  const drawerOverlay = shell.querySelector('[data-reader-drawer-overlay]');
  const tocEl = shell.querySelector('[data-reader-toc]');
  const tocSearch = shell.querySelector('[data-reader-toc-search]');
  const tocToggleBtns = Array.from(shell.querySelectorAll('[data-reader-action="toc-toggle"]'));
  const modalOverlay = document.querySelector('[data-reader-modal-overlay]');
  const defModal = document.getElementById('reader-def-modal');
  const defTitle = defModal?.querySelector('[data-reader-def-title]');
  const defBody = defModal?.querySelector('[data-reader-def-body]');

  const isNarrowViewport = () => window.matchMedia && window.matchMedia('(max-width: 1100px)').matches;
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

  const syncHeaderOffset = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const rect = header.getBoundingClientRect();
    root.style.setProperty('--reader-nav-offset', `${Math.max(0, Math.round(rect.height))}px`);
  };

  const syncTocButtons = () => {
    const expanded = isNarrowViewport() && root.dataset.readerToc === 'open';
    tocToggleBtns.forEach((button) => {
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
    drawerOverlay?.setAttribute('aria-hidden', expanded ? 'false' : 'true');
  };

  const setTocState = (open) => {
    root.dataset.readerToc = isNarrowViewport() ? (open ? 'open' : 'closed') : 'open';
    syncTocButtons();
  };

  const closeToc = () => {
    if (!isNarrowViewport()) return;
    setTocState(false);
  };

  const toggleToc = () => {
    if (!isNarrowViewport()) return;
    setTocState(root.dataset.readerToc !== 'open');
  };

  syncHeaderOffset();
  setTocState(false);

  window.addEventListener('resize', () => {
    syncHeaderOffset();
    if (!isNarrowViewport()) {
      root.dataset.readerToc = 'open';
    } else if (root.dataset.readerToc !== 'open') {
      root.dataset.readerToc = 'closed';
    }
    syncTocButtons();
  });

  drawerOverlay?.addEventListener('click', closeToc);
  tocToggleBtns.forEach((button) => button.addEventListener('click', toggleToc));

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

  const tocLinkById = new Map();

  const buildToc = () => {
    if (!tocEl) return;

    if (!headings.length) {
      tocEl.innerHTML = '<p class="reader-empty">No section headings yet.</p>';
      return;
    }

    const container = document.createDocumentFragment();
    let currentDetails = null;
    let currentSubList = null;

    headings.forEach((heading) => {
      const level = heading.tagName === 'H3' ? 3 : 2;
      const headingText = (heading.textContent || '').trim() || 'Untitled';

      if (level === 2) {
        currentDetails = document.createElement('details');
        currentDetails.className = 'toc-section';
        currentDetails.dataset.tocText = headingText.toLowerCase();

        const summary = document.createElement('summary');
        summary.className = 'toc-section__summary';

        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.dataset.readerTocLink = 'true';
        link.dataset.targetId = heading.id;
        link.textContent = headingText;
        summary.appendChild(link);

        currentDetails.appendChild(summary);
        currentSubList = document.createElement('ul');
        currentSubList.className = 'toc-section__children';
        currentDetails.appendChild(currentSubList);
        container.appendChild(currentDetails);
        tocLinkById.set(heading.id, link);
      } else {
        const item = document.createElement('li');
        item.className = 'toc-level-3';
        item.dataset.tocText = headingText.toLowerCase();

        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.dataset.readerTocLink = 'true';
        link.dataset.targetId = heading.id;

        const dot = document.createElement('span');
        dot.className = 'toc-dot';
        dot.setAttribute('aria-hidden', 'true');

        const text = document.createElement('span');
        text.textContent = headingText;

        link.appendChild(dot);
        link.appendChild(text);
        item.appendChild(link);

        if (currentSubList) {
          currentSubList.appendChild(item);
        } else {
          const standaloneList = document.createElement('ul');
          standaloneList.appendChild(item);
          container.appendChild(standaloneList);
        }
        tocLinkById.set(heading.id, link);
      }
    });

    tocEl.innerHTML = '';
    tocEl.appendChild(container);
  };

  const setActiveTocLink = (id) => {
    tocLinkById.forEach((link) => link.removeAttribute('aria-current'));
    const activeLink = tocLinkById.get(id);
    if (activeLink) {
      activeLink.setAttribute('aria-current', 'location');
    }
  };

  const scrollToHeading = (heading, behavior = prefersReducedMotion() ? 'auto' : 'smooth') => {
    const navOffset = parseCssPx(getComputedStyle(root).getPropertyValue('--reader-nav-offset'), 56);
    const top = window.scrollY + heading.getBoundingClientRect().top - navOffset - 14;
    window.scrollTo({ top: Math.max(0, top), behavior });
  };

  let navigateToId = (id, { updateHistory = true, closeTocOnNavigate = true, behavior } = {}) => {
    const heading = document.getElementById(id);
    if (!heading) return;

    setActiveTocLink(id);
    scrollToHeading(heading, behavior);

    if (updateHistory && window.location.hash !== `#${id}`) {
      history.pushState(null, '', `#${id}`);
    }

    if (closeTocOnNavigate) {
      closeToc();
    }

    announce(`Section: ${(heading.textContent || '').trim()}`);
  };

  buildToc();

  // Wrap H2 content sections in collapsible <details> elements
  const h2Headings = headings.filter((h) => h.tagName === 'H2');
  h2Headings.forEach((h2) => {
    const details = document.createElement('details');
    details.className = 'reader-chapter';

    const summary = document.createElement('summary');
    summary.className = 'reader-chapter__summary';
    summary.appendChild(h2.cloneNode(true));

    h2.parentNode.insertBefore(details, h2);
    details.appendChild(summary);

    let next = details.nextSibling;
    while (next) {
      if (next.nodeType === 1 && next.tagName === 'H2') break;
      if (next.nodeType === 1 && next.classList && next.classList.contains('reader-chapter')) break;
      const toMove = next;
      next = next.nextSibling;
      details.appendChild(toMove);
    }

    h2.remove();
  });

  // When navigating to a heading, expand its chapter
  const expandChapterForId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const chapter = el.closest('details.reader-chapter');
    if (chapter) chapter.open = true;
  };

  // Also open the matching TOC section when a heading is activated
  const expandTocForId = (id) => {
    const link = tocLinkById.get(id);
    if (!link) return;
    const section = link.closest('details.toc-section');
    if (section) section.open = true;
  };

  const originalNavigateToId = navigateToId;
  navigateToId = (id, opts) => {
    expandChapterForId(id);
    expandTocForId(id);
    originalNavigateToId(id, opts);
  };

  tocEl?.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-reader-toc-link]');
    if (!link) return;
    event.preventDefault();
    navigateToId(link.dataset.targetId);
  });

  tocSearch?.addEventListener('input', () => {
    const query = String(tocSearch.value || '').trim().toLowerCase();
    const items = tocEl ? Array.from(tocEl.querySelectorAll('li')) : [];
    items.forEach((item) => {
      if (!query) {
        item.hidden = false;
        return;
      }
      item.hidden = !(item.dataset.tocText || '').includes(query);
    });
  });

  if (window.location.hash) {
    const initialId = window.location.hash.replace('#', '');
    const initialTarget = document.getElementById(initialId);
    if (initialTarget) {
      requestAnimationFrame(() => navigateToId(initialId, { updateHistory: false, closeTocOnNavigate: false, behavior: 'auto' }));
    }
  } else if (headings[0]?.id) {
    setActiveTocLink(headings[0].id);
  }

  window.addEventListener('hashchange', () => {
    const id = (window.location.hash || '').replace('#', '');
    if (!id) return;
    navigateToId(id, { updateHistory: false, closeTocOnNavigate: false, behavior: 'auto' });
  });

  if ('IntersectionObserver' in window && headings.length) {
    let currentId = '';
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => Math.abs(left.boundingClientRect.top) - Math.abs(right.boundingClientRect.top));

        const next = visible[0]?.target;
        if (!next?.id || next.id === currentId) return;
        currentId = next.id;
        setActiveTocLink(currentId);
      },
      {
        root: null,
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 1]
      }
    );

    headings.forEach((heading) => observer.observe(heading));
  }

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
