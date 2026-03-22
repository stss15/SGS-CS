/**
 * Navigation bar interactions:
 * - keyboard/touch friendly dropdown menus
 * - tools menu toggling
 * - mobile menu state and cleanup
 */

document.addEventListener('DOMContentLoaded', () => {
    const toolsToggle = document.querySelector('.tools-toggle');
    const toolsDropdown = document.querySelector('.tools-dropdown');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const headerTools = document.querySelector('.header-tools');
    const navDropdowns = Array.from(document.querySelectorAll('[data-nav-dropdown]'));

    const setToolsOpen = (isOpen) => {
        if (!toolsToggle || !toolsDropdown) return;
        toolsDropdown.classList.toggle('open', isOpen);
        toolsToggle.setAttribute('aria-expanded', String(isOpen));
        toolsDropdown.setAttribute('aria-hidden', String(!isOpen));
    };

    const setNavDropdownOpen = (dropdownEl, isOpen) => {
        const button = dropdownEl.querySelector('.nav-link');
        dropdownEl.classList.toggle('open', isOpen);
        if (button) {
            button.setAttribute('aria-expanded', String(isOpen));
        }
    };

    const closeAllNavDropdowns = (exceptDropdown = null) => {
        navDropdowns.forEach((dropdownEl) => {
            if (exceptDropdown && dropdownEl === exceptDropdown) return;
            setNavDropdownOpen(dropdownEl, false);
        });
    };

    navDropdowns.forEach((dropdownEl) => {
        const button = dropdownEl.querySelector('.nav-link');
        const menu = dropdownEl.querySelector('.nav-dropdown-menu');
        const items = menu ? Array.from(menu.querySelectorAll('a, button')) : [];

        if (!button || !menu) return;

        button.addEventListener('click', (event) => {
            event.preventDefault();
            const isOpen = dropdownEl.classList.contains('open');
            closeAllNavDropdowns(dropdownEl);
            setNavDropdownOpen(dropdownEl, !isOpen);
        });

        button.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                closeAllNavDropdowns(dropdownEl);
                setNavDropdownOpen(dropdownEl, true);
                if (items[0]) items[0].focus();
            }

            if (event.key === 'Escape') {
                setNavDropdownOpen(dropdownEl, false);
                button.focus();
            }
        });

        menu.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setNavDropdownOpen(dropdownEl, false);
                button.focus();
            }
        });
    });

    if (toolsToggle && toolsDropdown) {
        toolsToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const isOpen = toolsToggle.getAttribute('aria-expanded') === 'true';
            setToolsOpen(!isOpen);
        });
    }

    const closeAllOverlays = () => {
        closeAllNavDropdowns();
        setToolsOpen(false);
    };

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Node)) return;

        const clickedInsideTools =
            !!toolsToggle?.contains(target) ||
            !!toolsDropdown?.contains(target);
        const clickedInsideNav = navDropdowns.some((dropdownEl) => dropdownEl.contains(target));

        if (!clickedInsideTools) {
            setToolsOpen(false);
        }
        if (!clickedInsideNav) {
            closeAllNavDropdowns();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const wasToolsOpen = toolsToggle?.getAttribute('aria-expanded') === 'true';
            closeAllOverlays();
            if (toolsToggle && wasToolsOpen) {
                toolsToggle.focus();
            }
        }
    });

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            const nextState = !isOpen;
            mobileMenuToggle.setAttribute('aria-expanded', String(nextState));
            mobileMenuToggle.setAttribute('aria-label', nextState ? 'Close main menu' : 'Open main menu');

            if (mainNav) mainNav.classList.toggle('mobile-open', nextState);
            if (headerTools) headerTools.classList.toggle('mobile-open', nextState);

            if (!nextState) {
                closeAllOverlays();
            }
        });
    }

    const resetDesktopState = () => {
        if (window.innerWidth > 768) {
            if (mainNav) mainNav.classList.remove('mobile-open');
            if (headerTools) headerTools.classList.remove('mobile-open');
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.setAttribute('aria-label', 'Open main menu');
            }
            closeAllOverlays();
        }
    };

    window.addEventListener('resize', resetDesktopState);
});
