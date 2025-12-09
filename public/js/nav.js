/**
 * Navigation bar functionality
 * Handles tools dropdown toggle and mobile menu
 */

document.addEventListener('DOMContentLoaded', () => {
    // Tools dropdown
    const toolsToggle = document.querySelector('.tools-toggle');
    const toolsDropdown = document.querySelector('.tools-dropdown');

    if (toolsToggle && toolsDropdown) {
        toolsToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = toolsDropdown.classList.toggle('open');
            toolsToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!toolsToggle.contains(e.target) && !toolsDropdown.contains(e.target)) {
                toolsDropdown.classList.remove('open');
                toolsToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close dropdown on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && toolsDropdown.classList.contains('open')) {
                toolsDropdown.classList.remove('open');
                toolsToggle.setAttribute('aria-expanded', 'false');
                toolsToggle.focus();
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const headerTools = document.querySelector('.header-tools');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', !isOpen);

            // Toggle visibility of nav and tools on mobile
            if (mainNav) mainNav.classList.toggle('mobile-open');
            if (headerTools) headerTools.classList.toggle('mobile-open');
        });
    }
});
