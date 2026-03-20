/**
 * section-nav.js
 * Sidebar section navigation: show one content section at a time.
 * Falls back to normal anchor-scroll if JS fails to initialise.
 */
(function () {
    'use strict';

    const ACTIVE_CLASS = 'active';
    const VISIBLE_CLASS = 'section-visible';
    const BODY_CLASS = 'section-nav-active';

    function init() {
        const sidebar = document.querySelector('.course-sidebar');
        if (!sidebar) return;

        const sidebarLinks = sidebar.querySelectorAll('.sidebar-link[data-section]');
        if (!sidebarLinks.length) return;

        // Collect all navigable sections
        const sections = [];
        sidebarLinks.forEach(function (link) {
            const id = link.dataset.section;
            const el = document.getElementById(id);
            if (el) sections.push({ id: id, el: el, link: link });
        });

        if (!sections.length) return;

        // Activate JS-driven section filtering
        document.body.classList.add(BODY_CLASS);

        function showSection(targetId) {
            sections.forEach(function (s) {
                const isTarget = s.id === targetId;
                s.el.classList.toggle(VISIBLE_CLASS, isTarget);
                s.link.classList.toggle(ACTIVE_CLASS, isTarget);
                s.link.setAttribute('aria-current', isTarget ? 'true' : 'false');
            });
        }

        // Attach click handlers
        sidebarLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                const id = link.dataset.section;
                const target = document.getElementById(id);
                if (!target) return; // let browser follow href if section missing
                e.preventDefault();
                showSection(id);
                // Update URL hash without scrolling
                if (history.replaceState) {
                    history.replaceState(null, '', '#' + id);
                }
                // On mobile, scroll to the top of main content
                const main = document.getElementById('main-content');
                if (main) main.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Honour URL hash on load; default to first section
        const hash = window.location.hash.replace('#', '');
        const initialId = sections.find(function (s) { return s.id === hash; })
            ? hash
            : sections[0].id;

        showSection(initialId);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
