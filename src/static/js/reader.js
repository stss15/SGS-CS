(() => {
  const shell = document.querySelector('[data-sgs-reader]');
  if (!shell) return;

  const root = document.documentElement;
  const contentRoot = shell.querySelector('[data-reader-content]');
  if (!contentRoot) return;

  const announceEl = shell.querySelector('[data-reader-announcer]');
  const contentsBlocks = Array.from(shell.querySelectorAll('[data-reader-contents-block]'));
  const tocRoots = Array.from(shell.querySelectorAll('[data-reader-toc]'));
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

  const syncHeaderOffset = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const rect = header.getBoundingClientRect();
    root.style.setProperty('--reader-nav-offset', `${Math.max(0, Math.round(rect.height))}px`);
  };

  syncHeaderOffset();
  window.addEventListener('resize', syncHeaderOffset);

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

  const allHeadings = Array.from(contentRoot.querySelectorAll('h2, h3')).filter(
    (heading) => (heading.textContent || '').trim().length > 0
  );
  ensureHeadingIds(allHeadings);

  const topLevelHeadings = allHeadings.some((heading) => heading.tagName === 'H2')
    ? allHeadings.filter((heading) => heading.tagName === 'H2')
    : allHeadings;

  const minimumContentsItems = 2;
  const tocLinksById = new Map();

  const registerTocLink = (headingId, link) => {
    const existing = tocLinksById.get(headingId);
    if (existing) {
      existing.push(link);
      return;
    }
    tocLinksById.set(headingId, [link]);
  };

  const createTocLink = (heading, className) => {
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.dataset.readerTocLink = 'true';
    link.dataset.targetId = heading.id;
    link.className = className;

    const text = document.createElement('span');
    text.className = 'reader-toc-link__label';
    text.textContent = (heading.textContent || '').trim() || 'Untitled';
    link.appendChild(text);

    registerTocLink(heading.id, link);
    return link;
  };

  const buildToc = () => {
    tocLinksById.clear();

    if (!tocRoots.length) return;

    if (topLevelHeadings.length < minimumContentsItems) {
      contentsBlocks.forEach((block) => {
        block.hidden = true;
      });
      tocRoots.forEach((tocRoot) => {
        tocRoot.innerHTML = '';
      });
      return;
    }

    contentsBlocks.forEach((block) => {
      block.hidden = false;
    });

    tocRoots.forEach((tocRoot) => {
      tocRoot.innerHTML = '';

      const standaloneList = document.createElement('ul');
      standaloneList.className = 'reader-toc-list';
      let hasStandaloneItems = false;

      const groupedSections = document.createDocumentFragment();
      let currentGroupList = null;

      allHeadings.forEach((heading) => {
        const isGroupHeading =
          heading.tagName === 'H2' &&
          !!heading.closest('[data-textbook-section-header], .ib-syllabus-reader-block__header');

        if (isGroupHeading) {
          const section = document.createElement('section');
          section.className = 'reader-toc-group';

          const header = document.createElement('div');
          header.className = 'reader-toc-group__header';
          header.appendChild(createTocLink(heading, 'reader-toc-link reader-toc-link--group'));
          section.appendChild(header);

          currentGroupList = document.createElement('ul');
          currentGroupList.className = 'reader-toc-group__list';
          section.appendChild(currentGroupList);
          groupedSections.appendChild(section);
          return;
        }

        if (heading.tagName === 'H2') {
          currentGroupList = null;
        }

        const item = document.createElement('li');
        item.className = 'reader-toc-list__item';
        item.appendChild(createTocLink(heading, 'reader-toc-link reader-toc-link--section'));

        if (currentGroupList) {
          currentGroupList.appendChild(item);
        } else {
          standaloneList.appendChild(item);
          hasStandaloneItems = true;
        }
      });

      if (hasStandaloneItems) {
        tocRoot.appendChild(standaloneList);
      }

      tocRoot.appendChild(groupedSections);
    });
  };

  const setActiveTocLink = (id) => {
    tocLinksById.forEach((links) => {
      links.forEach((link) => link.removeAttribute('aria-current'));
    });

    const activeLinks = tocLinksById.get(id);
    if (!activeLinks) return;

    activeLinks.forEach((link) => {
      link.setAttribute('aria-current', 'location');
    });
  };

  const scrollToHeading = (heading, behavior = prefersReducedMotion() ? 'auto' : 'smooth') => {
    const navOffset = parseCssPx(getComputedStyle(root).getPropertyValue('--reader-nav-offset'), 56);
    const top = window.scrollY + heading.getBoundingClientRect().top - navOffset - 16;
    window.scrollTo({ top: Math.max(0, top), behavior });
  };

  const navigateToId = (id, { updateHistory = true, behavior } = {}) => {
    const heading = document.getElementById(id);
    if (!heading) return;

    setActiveTocLink(id);
    scrollToHeading(heading, behavior);

    if (updateHistory && window.location.hash !== `#${id}`) {
      history.pushState(null, '', `#${id}`);
    }

    announce(`Section: ${(heading.textContent || '').trim()}`);
  };

  buildToc();

  tocRoots.forEach((tocRoot) => {
    tocRoot.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest('a[data-reader-toc-link]');
      if (!(link instanceof HTMLElement)) return;

      event.preventDefault();
      navigateToId(link.dataset.targetId);
    });
  });

  if (window.location.hash) {
    const initialId = window.location.hash.replace('#', '');
    const initialTarget = document.getElementById(initialId);
    if (initialTarget) {
      requestAnimationFrame(() =>
        navigateToId(initialId, { updateHistory: false, behavior: 'auto' })
      );
    }
  } else if (topLevelHeadings[0]?.id) {
    setActiveTocLink(topLevelHeadings[0].id);
  }

  window.addEventListener('hashchange', () => {
    const id = (window.location.hash || '').replace('#', '');
    if (!id) return;
    navigateToId(id, { updateHistory: false, behavior: 'auto' });
  });

  if ('IntersectionObserver' in window && allHeadings.length) {
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

    allHeadings.forEach((heading) => observer.observe(heading));
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
    const target = event.target;
    if (!(target instanceof Element)) return;

    const definitionTrigger = target.closest('[data-def]');
    if (!definitionTrigger || !shell.contains(definitionTrigger)) return;
    openDefinitionFromTarget(definitionTrigger);
  });

  document.body.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target;
    if (!(target instanceof Element)) return;

    const definitionTrigger = target.closest('[data-def]');
    if (!definitionTrigger || !shell.contains(definitionTrigger)) return;
    event.preventDefault();
    openDefinitionFromTarget(definitionTrigger);
  });
})();
