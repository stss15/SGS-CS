(() => {
    const STORAGE_KEY = 'sgsd-feedback-v1';
    const ADMIN_PASSWORD = 'teachcs';

    const STATUS = {
        NOT_STARTED: 'not_started',
        IN_PROGRESS: 'in_progress',
        COMPLETED_IMPLEMENTED: 'completed_implemented',
        COMPLETED_REJECTED: 'completed_rejected',
    };

    const STATUS_LABELS = {
        [STATUS.NOT_STARTED]: 'Not started',
        [STATUS.IN_PROGRESS]: 'In progress',
        [STATUS.COMPLETED_IMPLEMENTED]: 'Completed — Implemented',
        [STATUS.COMPLETED_REJECTED]: 'Completed — Rejected',
    };

    const COMPLETED_SET = new Set([
        STATUS.COMPLETED_IMPLEMENTED,
        STATUS.COMPLETED_REJECTED,
    ]);

    const safeParse = (raw) => {
        if (!raw) return { bugs: [], features: [] };
        try {
            const parsed = JSON.parse(raw);
            return {
                bugs: Array.isArray(parsed.bugs) ? parsed.bugs : [],
                features: Array.isArray(parsed.features) ? parsed.features : [],
            };
        } catch (error) {
            console.warn('Feedback data parse failed, resetting store.', error);
            return { bugs: [], features: [] };
        }
    };

    const loadData = () => {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return safeParse(raw);
    };

    const saveData = (data) => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    const createId = () => {
        if (window.crypto?.randomUUID) {
            return window.crypto.randomUUID();
        }
        return `id-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    };

    const normalizeString = (value) => (value || '').trim();

    const addBug = ({ level, category, title, details }) => {
        const data = loadData();
        const now = new Date().toISOString();
        const bug = {
            id: createId(),
            level: normalizeString(level),
            category: normalizeString(category),
            title: normalizeString(title),
            details: normalizeString(details),
            status: STATUS.NOT_STARTED,
            statusComment: '',
            createdAt: now,
            updatedAt: now,
        };
        data.bugs.unshift(bug);
        saveData(data);
        return bug;
    };

    const addFeature = ({ level, details }) => {
        const data = loadData();
        const now = new Date().toISOString();
        const feature = {
            id: createId(),
            level: normalizeString(level),
            details: normalizeString(details),
            status: STATUS.NOT_STARTED,
            statusComment: '',
            createdAt: now,
            updatedAt: now,
        };
        data.features.unshift(feature);
        saveData(data);
        return feature;
    };

    const updateStatus = ({ type, id, status, comment }) => {
        const data = loadData();
        const collection = type === 'bug' ? data.bugs : data.features;
        const item = collection.find((entry) => entry.id === id);
        if (!item) {
            return { ok: false, message: 'Item not found.' };
        }

        const trimmedComment = normalizeString(comment);
        if (COMPLETED_SET.has(status) && !trimmedComment) {
            return { ok: false, message: 'A comment is required when completing an item.' };
        }

        item.status = status;
        item.statusComment = trimmedComment;
        item.updatedAt = new Date().toISOString();
        saveData(data);
        return { ok: true, item };
    };

    const escapeHtml = (value = '') =>
        String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

    const formatDate = (iso) => {
        if (!iso) return 'Unknown date';
        const date = new Date(iso);
        return date.toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    const setDefaultLevel = (defaultLevel, ...selects) => {
        if (!defaultLevel) return;
        selects.forEach((select) => {
            if (!select) return;
            const match = Array.from(select.options).find(
                (option) => option.value.toLowerCase() === defaultLevel.toLowerCase()
            );
            if (match) {
                select.value = match.value;
            }
        });
    };

    const showFormMessage = (form, type, message, isError = false) => {
        const target = form?.querySelector(`[data-feedback-message="${type}"]`);
        if (!target) return;
        target.textContent = message;
        target.classList.toggle('error', isError);
    };

    const initModals = () => {
        const modalsWrapper = document.querySelector('.feedback-modals');
        const overlay = document.querySelector('[data-feedback-overlay]');
        const bugModal = document.getElementById('bug-modal');
        const featureModal = document.getElementById('feature-modal');

        if (!modalsWrapper || !overlay || !bugModal || !featureModal) return;

        const bugForm = document.getElementById('bug-form');
        const featureForm = document.getElementById('feature-form');
        const bugLevel = document.getElementById('bug-level');
        const featureLevel = document.getElementById('feature-level');
        const defaultLevel = modalsWrapper.getAttribute('data-feedback-default-level');

        setDefaultLevel(defaultLevel, bugLevel, featureLevel);

        const modals = {
            bug: bugModal,
            feature: featureModal,
        };

        const openModal = (type) => {
            const modal = modals[type];
            if (!modal) return;
            overlay.classList.add('active');
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            const focusTarget = modal.querySelector('input, select, textarea');
            focusTarget?.focus();
        };

        const closeModal = () => {
            overlay.classList.remove('active');
            Object.values(modals).forEach((modal) => modal.classList.remove('active'));
            document.body.classList.remove('modal-open');
        };

        document.querySelectorAll('[data-open-feedback]').forEach((btn) => {
            const type = btn.getAttribute('data-open-feedback');
            btn.addEventListener('click', () => openModal(type));
        });

        document.querySelectorAll('[data-close-modal]').forEach((btn) => {
            btn.addEventListener('click', closeModal);
        });

        overlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeModal();
        });

        bugForm?.addEventListener('submit', (event) => {
            event.preventDefault();
            const level = normalizeString(bugLevel.value);
            const category = normalizeString(bugForm.elements.category.value);
            const title = normalizeString(bugForm.elements.title.value);
            const details = normalizeString(bugForm.elements.details.value);

            if (!level || !category || !title || !details) {
                showFormMessage(bugForm, 'bug', 'Please fill in every field.', true);
                return;
            }

            addBug({ level, category, title, details });
            bugForm.reset();
            setDefaultLevel(defaultLevel, bugLevel);
            showFormMessage(bugForm, 'bug', 'Thanks — your bug report has been added.');
            setTimeout(closeModal, 600);
        });

        featureForm?.addEventListener('submit', (event) => {
            event.preventDefault();
            const level = normalizeString(featureLevel.value);
            const details = normalizeString(featureForm.elements.details.value);

            if (!level || !details) {
                showFormMessage(featureForm, 'feature', 'Please fill in every field.', true);
                return;
            }

            addFeature({ level, details });
            featureForm.reset();
            setDefaultLevel(defaultLevel, featureLevel);
            showFormMessage(featureForm, 'feature', 'Thanks — your request has been added.');
            setTimeout(closeModal, 600);
        });
    };

    const renderOpenList = (type, items, container) => {
        if (!container) return;
        container.innerHTML = '';

        if (!items.length) {
            container.innerHTML = `<p class="empty-state">Nothing in this queue yet.</p>`;
            return;
        }

        const isBug = type === 'bug';

        items.forEach((item) => {
            const card = document.createElement('article');
            card.className = 'admin-card';
            card.dataset.type = type;
            card.dataset.id = item.id;

            const levelTag = `<span class="tag"><i class="fa-solid fa-graduation-cap"></i>${escapeHtml(item.level || 'Unknown')}</span>`;
            const categoryTag = isBug
                ? `<span class="tag gold"><i class="fa-solid fa-layer-group"></i>${escapeHtml(item.category || 'Unspecified')}</span>`
                : '';
            const createdTag = `<span class="tag muted"><i class="fa-regular fa-clock"></i>${escapeHtml(formatDate(item.createdAt))}</span>`;

            const statusOptions = Object.entries(STATUS_LABELS)
                .map(
                    ([value, label]) =>
                        `<option value="${value}" ${item.status === value ? 'selected' : ''}>${label}</option>`
                )
                .join('');

            card.innerHTML = `
                <div class="meta-row">
                    ${levelTag}
                    ${categoryTag}
                    ${createdTag}
                </div>
                <h3>${escapeHtml(isBug ? item.title : item.details)}</h3>
                ${
                    isBug
                        ? `<p>${escapeHtml(item.details)}</p>`
                        : ''
                }
                <span class="status-chip ${item.status}">${STATUS_LABELS[item.status] || 'Unknown'}</span>
                <div class="status-row">
                    <select class="status-select" name="status">
                        ${statusOptions}
                    </select>
                    <textarea class="status-comment" name="statusComment" placeholder="Add a status comment (required when completing)">${escapeHtml(item.statusComment || '')}</textarea>
                    <button type="button" class="status-save">Save</button>
                </div>
                <div class="status-warning" data-status-warning></div>
            `;

            container.appendChild(card);
        });
    };

    const renderArchive = (data, container, filters) => {
        if (!container) return;
        container.innerHTML = '';

        const combined = [
            ...data.bugs.map((entry) => ({ ...entry, type: 'bug' })),
            ...data.features.map((entry) => ({ ...entry, type: 'feature' })),
        ].filter((entry) => COMPLETED_SET.has(entry.status));

        const filtered = combined.filter((entry) => {
            if (filters.outcome === 'implemented' && entry.status !== STATUS.COMPLETED_IMPLEMENTED) {
                return false;
            }
            if (filters.outcome === 'rejected' && entry.status !== STATUS.COMPLETED_REJECTED) {
                return false;
            }

            const updated = entry.updatedAt ? new Date(entry.updatedAt) : null;
            if (filters.start && updated && updated < filters.start) {
                return false;
            }
            if (filters.end && updated && updated > filters.end) {
                return false;
            }
            return true;
        });

        if (!filtered.length) {
            container.innerHTML = `<p class="empty-state">No completed items match these filters.</p>`;
            return;
        }

        filtered
            .sort(
                (a, b) =>
                    new Date(b.updatedAt || b.createdAt).getTime() -
                    new Date(a.updatedAt || a.createdAt).getTime()
            )
            .forEach((entry) => {
                const card = document.createElement('article');
                card.className = 'admin-card';

                const typeTag = `<span class="tag muted"><i class="fa-solid ${
                    entry.type === 'bug' ? 'fa-bug' : 'fa-lightbulb'
                }"></i>${entry.type === 'bug' ? 'Bug' : 'Feature'}</span>`;
                const levelTag = `<span class="tag"><i class="fa-solid fa-graduation-cap"></i>${escapeHtml(
                    entry.level || 'Unknown'
                )}</span>`;
                const updatedTag = `<span class="tag muted"><i class="fa-regular fa-clock"></i>${escapeHtml(
                    formatDate(entry.updatedAt || entry.createdAt)
                )}</span>`;
                const outcomeTag =
                    entry.status === STATUS.COMPLETED_IMPLEMENTED
                        ? '<span class="status-chip completed_implemented">Implemented</span>'
                        : '<span class="status-chip completed_rejected">Rejected</span>';

                const detailBlock = entry.details
                    ? `<p>${escapeHtml(entry.details)}</p>`
                    : '';

                card.innerHTML = `
                    <div class="meta-row">
                        ${typeTag}
                        ${levelTag}
                        ${updatedTag}
                    </div>
                    <h3>${escapeHtml(entry.title || entry.details || 'Untitled')}</h3>
                    ${detailBlock}
                    ${outcomeTag}
                    ${entry.statusComment ? `<p><strong>Comment:</strong> ${escapeHtml(entry.statusComment)}</p>` : ''}
                `;

                container.appendChild(card);
            });
    };

    const initAdminBoard = () => {
        const board = document.getElementById('admin-board');
        if (!board) return;

        const guard = () => {
            const hasSessionAccess = window.sessionStorage.getItem('sgsd-admin-auth') === 'yes';
            if (hasSessionAccess) return true;
            const input = window.prompt('Teacher password required to view feedback:');
            if (input === ADMIN_PASSWORD) {
                window.sessionStorage.setItem('sgsd-admin-auth', 'yes');
                return true;
            }
            return false;
        };

        const authorized = guard();
        if (!authorized) {
            board.innerHTML =
                '<div class="admin-locked">Access denied. Refresh to try again with the teacher password.</div>';
            return;
        }

        const openBugs = document.getElementById('open-bugs');
        const openFeatures = document.getElementById('open-features');
        const archiveList = document.getElementById('archive-list');
        const outcomeFilter = document.getElementById('archive-outcome');
        const startFilter = document.getElementById('archive-start');
        const endFilter = document.getElementById('archive-end');

        const refresh = () => {
            const data = loadData();
            const activeBugs = data.bugs.filter((bug) => !COMPLETED_SET.has(bug.status));
            const activeFeatures = data.features.filter((feat) => !COMPLETED_SET.has(feat.status));

            renderOpenList('bug', activeBugs, openBugs);
            renderOpenList('feature', activeFeatures, openFeatures);

            const filters = {
                outcome: outcomeFilter?.value || 'all',
                start: startFilter?.value ? new Date(startFilter.value) : null,
                end: endFilter?.value ? new Date(endFilter.value) : null,
            };
            renderArchive(data, archiveList, filters);
        };

        board.addEventListener('click', (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;
            if (!target.classList.contains('status-save')) return;

            const card = target.closest('.admin-card');
            if (!card) return;
            const select = card.querySelector('.status-select');
            const comment = card.querySelector('.status-comment');
            const warning = card.querySelector('[data-status-warning]');

            const status = select?.value;
            const note = comment?.value || '';
            const type = card.dataset.type;
            const id = card.dataset.id;

            const result = updateStatus({ type, id, status, comment: note });
            if (!result.ok) {
                if (warning) warning.textContent = result.message;
                return;
            }

            if (warning) warning.textContent = '';
            refresh();
        });

        [outcomeFilter, startFilter, endFilter].forEach((input) => {
            input?.addEventListener('change', refresh);
        });

        refresh();
    };

    document.addEventListener('DOMContentLoaded', () => {
        initModals();
        initAdminBoard();
    });

    window.SGSFeedback = {
        addBug,
        addFeature,
        updateStatus,
        getData: loadData,
        STATUS,
        STATUS_LABELS,
        ADMIN_PASSWORD,
    };
})();
