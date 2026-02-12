(() => {
    const shell = document.querySelector('[data-sgs-reader]');
    if (!shell) return;

    const root = document.documentElement;
    const STORAGE_KEY = shell.dataset.readerStorageKey || 'sgs-reader-settings-v1';
    const defaultPaged = shell.dataset.readerDefaultPaged === 'true';

    const DEFAULT_SETTINGS = {
        font: 'source', // source | lexend | literata
        scale: 1.06, // 1.00 .. 1.5
        theme: 'default', // default | paper | contrast | cb
        readability: false,
        paged: defaultPaged,
        toc: 'open', // open | closed
    };

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const safeParse = (raw) => {
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch (error) {
            console.warn('Reader settings parse failed, resetting.', error);
            return null;
        }
    };

    const loadSettings = () => {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = safeParse(raw) || {};
        const settings = { ...DEFAULT_SETTINGS, ...parsed };

        settings.scale = clamp(Number(settings.scale) || DEFAULT_SETTINGS.scale, 1, 1.5);
        settings.font = ['source', 'lexend', 'literata'].includes(settings.font) ? settings.font : DEFAULT_SETTINGS.font;
        settings.theme = ['default', 'paper', 'contrast', 'cb'].includes(settings.theme) ? settings.theme : DEFAULT_SETTINGS.theme;
        settings.toc = settings.toc === 'closed' ? 'closed' : 'open';
        settings.readability = Boolean(settings.readability);
        settings.paged = Boolean(settings.paged);

        return settings;
    };

    const saveSettings = (settings) => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    };

    let settings = loadSettings();
    const isNarrowViewport = () => window.matchMedia && window.matchMedia('(max-width: 1100px)').matches;

    const applySettings = () => {
        root.dataset.readerFont = settings.font;
        root.dataset.readerTheme = settings.theme;
        root.dataset.readerReadability = settings.readability ? 'true' : 'false';
        root.dataset.readerPaged = settings.paged ? 'true' : 'false';
        // Desktop locks contents open; mobile uses stored drawer state.
        root.dataset.readerToc = isNarrowViewport() ? settings.toc : 'open';
        root.style.setProperty('--reader-scale', String(settings.scale));
        root.style.setProperty('--reader-scale-pct', String(Math.round(settings.scale * 100)));
    };

    const prefersReducedMotion = () =>
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const announceEl = shell.querySelector('[data-reader-announcer]');
    const announce = (msg) => {
        if (!announceEl) return;
        announceEl.textContent = msg;
    };

    // Responsive defaults: on smaller viewports, start with rails closed unless user explicitly opened them.
    const applyResponsiveDefaults = () => {
        if (!isNarrowViewport()) return;

        // If settings were never customized (first load), keep drawers closed on narrow screens.
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            settings.toc = 'closed';
        }
    };

    applyResponsiveDefaults();
    applySettings();

    // Keep sticky offsets aligned with the actual site header height.
    const syncHeaderOffset = () => {
        const header = document.querySelector('.main-header');
        if (!header) return;
        const rect = header.getBoundingClientRect();
        const px = Math.max(0, Math.round(rect.height));
        root.style.setProperty('--reader-nav-offset', `${px}px`);
    };

    syncHeaderOffset();
    window.addEventListener('resize', () => {
        syncHeaderOffset();
        applySettings();
    });

    const drawerOverlay = document.querySelector('[data-reader-drawer-overlay]');
    const closeDrawers = () => {
        if (!isNarrowViewport()) return;
        settings.toc = 'closed';
        applySettings();
        saveSettings(settings);
    };

    drawerOverlay?.addEventListener('click', closeDrawers);

    // Pagination: wrap direct content children into .reader-page sections.
    const contentRoot = shell.querySelector('[data-reader-content]');
    if (!contentRoot) return;

    const slugify = (value) =>
        String(value || '')
            .trim()
            .toLowerCase()
            .replace(/['"]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || 'section';

    const ensureHeadingIds = (headings) => {
        const used = new Set();
        headings.forEach((h) => {
            if (h.id) {
                used.add(h.id);
                return;
            }

            const base = slugify(h.textContent);
            let next = base;
            let i = 2;
            while (used.has(next) || document.getElementById(next)) {
                next = `${base}-${i}`;
                i += 1;
            }
            h.id = next;
            used.add(next);
        });
    };

    const wrapIntoPages = () => {
        if (contentRoot.querySelector('.reader-page')) return;

        const childNodes = Array.from(contentRoot.childNodes);
        const pages = [];
        let current = [];

        const push = () => {
            if (!current.length) return;
            pages.push(current);
            current = [];
        };

        childNodes.forEach((node) => {
            if (node.nodeType === 1 && node.tagName === 'H2') {
                push();
            }
            current.push(node);
        });
        push();

        // If we failed to split (no nodes), keep empty container.
        if (!pages.length) return;

        contentRoot.innerHTML = '';
        pages.forEach((nodes, idx) => {
            const section = document.createElement('section');
            section.className = 'reader-page';
            section.dataset.pageIndex = String(idx);
            section.tabIndex = -1;
            nodes.forEach((n) => section.appendChild(n));
            contentRoot.appendChild(section);
        });
    };

    wrapIntoPages();

    const pageEls = () => Array.from(contentRoot.querySelectorAll('.reader-page'));

    const getPageTitle = (pageEl) => {
        const h = pageEl.querySelector('h2, h3');
        return (h?.textContent || 'Page').trim();
    };

    let currentPage = 0;

    const pageLabel = shell.querySelector('[data-reader-page-label]');
    const pagePrevBtns = Array.from(shell.querySelectorAll('[data-reader-action="page-prev"]'));
    const pageNextBtns = Array.from(shell.querySelectorAll('[data-reader-action="page-next"]'));
    const paginationMeta = shell.querySelector('[data-reader-pagination-meta]');

    const parseCssPx = (value, fallback = 84) => {
        const parsed = Number.parseFloat(String(value || '').trim());
        return Number.isFinite(parsed) ? parsed : fallback;
    };

    const scrollToReaderTop = () => {
        const anchor = shell.querySelector('.reader-content') || shell.querySelector('.reader-paper') || shell;
        if (!anchor || !(anchor instanceof HTMLElement)) return;
        const navOffset = parseCssPx(getComputedStyle(root).getPropertyValue('--reader-nav-offset'), 84);
        const y = window.scrollY + anchor.getBoundingClientRect().top - navOffset - 8;
        window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
    };

    const showPage = (idx, { focus = true, reason = 'navigation' } = {}) => {
        const pages = pageEls();
        if (!pages.length) return;
        const next = clamp(idx, 0, pages.length - 1);
        currentPage = next;

        if (settings.paged) {
            pages.forEach((page, i) => {
                page.hidden = i !== next;
            });
        } else {
            pages.forEach((page) => {
                page.hidden = false;
            });
        }

        const title = getPageTitle(pages[next]);
        const label = settings.paged ? `Page ${next + 1} of ${pages.length}: ${title}` : title;

        pageLabel && (pageLabel.textContent = settings.paged ? `Page ${next + 1} / ${pages.length}` : 'Scroll');
        paginationMeta && (paginationMeta.textContent = label);

        pagePrevBtns.forEach((btn) => (btn.disabled = next === 0));
        pageNextBtns.forEach((btn) => (btn.disabled = next >= pages.length - 1));

        setActiveHeadingFromPage(pages[next]);

        if (settings.paged) {
            // Keep the reading viewport stable and predictable for screen readers.
            scrollToReaderTop();
            if (focus) {
                pages[next].focus({ preventScroll: true });
            }
            announce(label);
        } else if (reason === 'navigation') {
            pages[next].scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'auto' });
            announce(`Section: ${title}`);
        } else if (reason === 'hash') {
            announce(`Section: ${title}`);
        }
    };

    pagePrevBtns.forEach((btn) => btn.addEventListener('click', () => showPage(currentPage - 1)));
    pageNextBtns.forEach((btn) => btn.addEventListener('click', () => showPage(currentPage + 1)));

    // TOC generation
    const tocEl = shell.querySelector('[data-reader-toc]');
    const tocSearch = shell.querySelector('[data-reader-toc-search]');

    const headings = Array.from(contentRoot.querySelectorAll('h2, h3'));
    ensureHeadingIds(headings);

    const tocLinkById = new Map();

    const buildToc = () => {
        if (!tocEl) return;

        const ul = document.createElement('ul');
        headings.forEach((h) => {
            const level = h.tagName === 'H3' ? 3 : 2;
            const li = document.createElement('li');
            li.className = `toc-level-${level}`;
            li.dataset.tocText = (h.textContent || '').trim().toLowerCase();

            const a = document.createElement('a');
            a.href = `#${h.id}`;
            a.dataset.readerTocLink = 'true';
            a.dataset.targetId = h.id;

            const dot = document.createElement('span');
            dot.className = 'toc-dot';
            dot.setAttribute('aria-hidden', 'true');

            const text = document.createElement('span');
            text.textContent = (h.textContent || '').trim() || 'Untitled';

            a.appendChild(dot);
            a.appendChild(text);
            li.appendChild(a);
            ul.appendChild(li);

            tocLinkById.set(h.id, a);
        });

        tocEl.innerHTML = '';
        tocEl.appendChild(ul);
    };

    buildToc();

    const setActiveTocLink = (id) => {
        tocLinkById.forEach((link) => link.removeAttribute('aria-current'));
        const next = tocLinkById.get(id);
        if (next) next.setAttribute('aria-current', 'location');
    };

    const setActiveHeadingFromPage = (pageEl) => {
        const first = pageEl.querySelector('h2, h3');
        if (first?.id) {
            setActiveTocLink(first.id);
        }
    };

    const findPageIndexForElement = (el) => {
        const page = el?.closest?.('.reader-page');
        if (!page) return 0;
        const idx = Number(page.dataset.pageIndex);
        return Number.isFinite(idx) ? idx : 0;
    };

    const navigateToId = (id, { closeTocOnNavigate = true } = {}) => {
        const el = document.getElementById(id);
        if (!el) return;

        const idx = findPageIndexForElement(el);
        if (settings.paged) {
            showPage(idx, { focus: true, reason: 'hash' });
        }

        // Update the hash without triggering layout thrash.
        if (window.location.hash !== `#${id}`) {
            history.pushState(null, '', `#${id}`);
        }

        // In scroll mode, bring the target into view.
        if (!settings.paged) {
            el.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'auto' });
            announce(`Section: ${(el.textContent || '').trim()}`);
        }

        setActiveTocLink(id);

        if (closeTocOnNavigate && window.matchMedia && window.matchMedia('(max-width: 1100px)').matches) {
            settings.toc = 'closed';
            applySettings();
            saveSettings(settings);
        }
    };

    tocEl?.addEventListener('click', (event) => {
        const link = event.target.closest('a[data-reader-toc-link]');
        if (!link) return;
        event.preventDefault();
        navigateToId(link.dataset.targetId);
    });

    tocSearch?.addEventListener('input', () => {
        const q = String(tocSearch.value || '').trim().toLowerCase();
        const items = tocEl ? Array.from(tocEl.querySelectorAll('li')) : [];
        items.forEach((li) => {
            if (!q) {
                li.hidden = false;
                return;
            }
            const hay = li.dataset.tocText || '';
            li.hidden = !hay.includes(q);
        });
    });

    // Drawer toggles (search document-wide since edge tabs live outside the shell)
    const tocToggleBtns = Array.from(document.querySelectorAll('[data-reader-action="toc-toggle"]'));

    const toggleToc = () => {
        if (!isNarrowViewport()) return;
        settings.toc = settings.toc === 'open' ? 'closed' : 'open';
        applySettings();
        saveSettings(settings);
        tocToggleBtns.forEach((btn) => {
            btn.setAttribute('aria-pressed', settings.toc === 'open' ? 'true' : 'false');
            btn.setAttribute('aria-expanded', settings.toc === 'open' ? 'true' : 'false');
        });
    };

    tocToggleBtns.forEach((btn) => btn.addEventListener('click', toggleToc));

    // Settings + definition modals
    const modalOverlay = document.querySelector('[data-reader-modal-overlay]');
    const settingsModal = document.getElementById('reader-settings-modal');
    const defModal = document.getElementById('reader-def-modal');
    const openSettingsBtn = shell.querySelector('[data-reader-action="settings-open"]');
    const applyCloseBtn = settingsModal?.querySelector('[data-reader-action="settings-apply-close"]');

    const allModals = [settingsModal, defModal].filter(Boolean);

    const getFocusable = (modal) =>
        Array.from(
            modal.querySelectorAll(
                'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        );

    let activeModal = null;
    let lastTrigger = null;

    const openModal = (modal, trigger) => {
        if (!modal || !modalOverlay) return;
        lastTrigger = trigger || null;
        activeModal = modal;

        allModals.forEach((m) => {
            if (!m) return;
            m.style.display = m === modal ? 'block' : 'none';
            m.setAttribute('aria-hidden', m === modal ? 'false' : 'true');
        });

        modalOverlay.style.display = 'block';
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('reader-modal-open');

        const focusTarget = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        focusTarget?.focus();
    };

    const closeModal = () => {
        if (!modalOverlay) return;
        modalOverlay.style.display = 'none';
        modalOverlay.setAttribute('aria-hidden', 'true');
        allModals.forEach((m) => {
            if (!m) return;
            m.style.display = 'none';
            m.setAttribute('aria-hidden', 'true');
        });
        document.body.classList.remove('reader-modal-open');
        activeModal = null;
        openSettingsBtn?.setAttribute('aria-expanded', 'false');
        if (lastTrigger && lastTrigger instanceof HTMLElement) {
            lastTrigger.focus();
        }
        lastTrigger = null;
    };

    modalOverlay?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && activeModal) {
            closeModal();
            return;
        }
        if (event.key !== 'Tab' || !activeModal) return;

        const focusable = getFocusable(activeModal);
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

    openSettingsBtn?.addEventListener('click', () => {
        openSettingsBtn.setAttribute('aria-expanded', 'true');
        openModal(settingsModal, openSettingsBtn);
    });
    document.querySelectorAll('[data-reader-close-modal]').forEach((btn) => btn.addEventListener('click', closeModal));

    // Bind settings form controls
    const fontSelect = settingsModal?.querySelector('[data-reader-setting="font"]');
    const themeSelect = settingsModal?.querySelector('[data-reader-setting="theme"]');
    const scaleRange = settingsModal?.querySelector('[data-reader-setting="scale"]');
    const scaleValue = settingsModal?.querySelector('[data-reader-scale-value]');

    const readabilityToggle = settingsModal?.querySelector('[data-reader-setting="readability"]');
    const pagedToggle = settingsModal?.querySelector('[data-reader-setting="paged"]');
    const resetBtn = settingsModal?.querySelector('[data-reader-setting="reset"]');

    const syncSettingsUi = () => {
        if (fontSelect) fontSelect.value = settings.font;
        if (themeSelect) themeSelect.value = settings.theme;
        if (scaleRange) scaleRange.value = String(Math.round(settings.scale * 100));
        if (scaleValue) scaleValue.textContent = `${Math.round(settings.scale * 100)}%`;

        if (readabilityToggle) readabilityToggle.checked = settings.readability;
        if (pagedToggle) pagedToggle.checked = settings.paged;
        tocToggleBtns.forEach((btn) => {
            const tocOpen = root.dataset.readerToc === 'open';
            btn.setAttribute('aria-pressed', tocOpen ? 'true' : 'false');
            btn.setAttribute('aria-expanded', tocOpen ? 'true' : 'false');
        });
    };

    const commitSettings = () => {
        applySettings();
        saveSettings(settings);
        // Re-render page visibility when toggling paged mode.
        showPage(inferCurrentPage(), { focus: false, reason: 'settings' });
    };

    fontSelect?.addEventListener('change', () => {
        settings.font = fontSelect.value;
        commitSettings();
    });

    themeSelect?.addEventListener('change', () => {
        settings.theme = themeSelect.value;
        commitSettings();
    });

    scaleRange?.addEventListener('input', () => {
        const pct = clamp(Number(scaleRange.value) || 106, 100, 150);
        settings.scale = pct / 100;
        scaleValue && (scaleValue.textContent = `${pct}%`);
        applySettings();
    });

    scaleRange?.addEventListener('change', () => {
        commitSettings();
    });



    readabilityToggle?.addEventListener('change', () => {
        settings.readability = Boolean(readabilityToggle.checked);
        commitSettings();
    });

    pagedToggle?.addEventListener('change', () => {
        settings.paged = Boolean(pagedToggle.checked);
        commitSettings();
    });

    resetBtn?.addEventListener('click', () => {
        settings = { ...DEFAULT_SETTINGS };
        applyResponsiveDefaults();
        applySettings();
        saveSettings(settings);
        syncSettingsUi();
        showPage(0, { focus: false, reason: 'settings' });
        announce('Reader settings reset.');
    });

    applyCloseBtn?.addEventListener('click', () => {
        commitSettings();
        closeModal();
        announce('Reader settings applied.');
    });

    syncSettingsUi();
    window.addEventListener('resize', syncSettingsUi);

    // Infer current page from hash or scroll position.
    const inferCurrentPage = () => {
        const hash = (window.location.hash || '').replace('#', '');
        if (hash) {
            const el = document.getElementById(hash);
            if (el) return findPageIndexForElement(el);
        }

        // Approximate by whichever page is closest to the top of the viewport.
        const pages = pageEls();
        let best = 0;
        let bestDist = Infinity;
        pages.forEach((page, idx) => {
            const rect = page.getBoundingClientRect();
            const dist = Math.abs(rect.top);
            if (dist < bestDist) {
                bestDist = dist;
                best = idx;
            }
        });
        return best;
    };

    // Apply initial page mode based on hash target (if any).
    showPage(inferCurrentPage(), { focus: false, reason: 'init' });

    window.addEventListener('hashchange', () => {
        const id = (window.location.hash || '').replace('#', '');
        if (!id) return;
        navigateToId(id, { closeTocOnNavigate: false });
    });

    // Scroll-mode active section tracking (IntersectionObserver).
    const initScrollSpy = () => {
        if (!('IntersectionObserver' in window)) return;

        const observed = Array.from(contentRoot.querySelectorAll('h2, h3')).filter((h) => h.id);
        if (!observed.length) return;

        let current = null;

        const io = new IntersectionObserver(
            (entries) => {
                if (settings.paged) return;
                // Prefer the heading nearest the top that is intersecting.
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));

                const top = visible[0]?.target;
                if (!top || !top.id || top.id === current) return;
                current = top.id;
                setActiveTocLink(current);
            },
            {
                root: null,
                rootMargin: '-25% 0px -70% 0px',
                threshold: [0, 1],
            }
        );

        observed.forEach((h) => io.observe(h));
    };

    initScrollSpy();

    // Keyword definitions: make data-def elements keyboard accessible and show in a modal.
    const keywordNodes = Array.from(contentRoot.querySelectorAll('[data-def]'));

    keywordNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        node.classList.add('keyword');
        if (!node.hasAttribute('tabindex')) node.tabIndex = 0;
        if (!node.hasAttribute('role')) node.setAttribute('role', 'button');
        node.setAttribute('aria-haspopup', 'dialog');
    });

    const defTitle = defModal?.querySelector('[data-reader-def-title]');
    const defBody = defModal?.querySelector('[data-reader-def-body]');

    const openDefinition = (term, definition, trigger) => {
        if (!defModal) return;
        if (defTitle) defTitle.textContent = term;
        if (defBody) defBody.textContent = definition;
        openModal(defModal, trigger);
        announce(`Definition opened: ${term}`);
    };

    document.body.addEventListener('click', (event) => {
        const target = event.target.closest('[data-def]');
        if (!target) return;
        if (!shell.contains(target)) return;
        const term = (target.textContent || '').trim();
        const definition = target.getAttribute('data-def') || 'No definition available.';
        openDefinition(term, definition, target);
    });

    document.body.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const target = event.target.closest('[data-def]');
        if (!target) return;
        if (!shell.contains(target)) return;
        event.preventDefault();
        const term = (target.textContent || '').trim();
        const definition = target.getAttribute('data-def') || 'No definition available.';
        openDefinition(term, definition, target);
    });

    // Glossary (support rail): list unique [data-def] terms.
    const glossaryRoot = shell.querySelector('[data-reader-glossary]');
    if (glossaryRoot) {
        const map = new Map();
        keywordNodes.forEach((node) => {
            const term = (node.textContent || '').trim();
            const def = node.getAttribute('data-def') || '';
            if (!term || !def) return;
            const key = term.toLowerCase();
            if (!map.has(key)) {
                map.set(key, { term, def });
            }
        });

        if (!map.size) {
            glossaryRoot.innerHTML = '<p style="margin:0;color:var(--reader-muted);">No key terms on this page yet.</p>';
        } else {
            const entries = Array.from(map.values()).sort((a, b) => a.term.localeCompare(b.term));
            glossaryRoot.innerHTML = '';
            const list = document.createElement('div');
            list.className = 'reader-glossary';
            entries.forEach((entry) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = entry.term;
                btn.addEventListener('click', () => openDefinition(entry.term, entry.def, btn));
                list.appendChild(btn);
            });
            glossaryRoot.appendChild(list);
        }
    }

    // Simple keyboard shortcuts (non-invasive):
    // - Alt+ArrowLeft/Right: prev/next page (paged mode)
    document.addEventListener('keydown', (event) => {
        if (!event.altKey || event.ctrlKey || event.metaKey) return;

        if (event.key === 'ArrowLeft' && settings.paged) {
            event.preventDefault();
            showPage(currentPage - 1);
        }

        if (event.key === 'ArrowRight' && settings.paged) {
            event.preventDefault();
            showPage(currentPage + 1);
        }
    });
})();
