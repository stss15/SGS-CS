/**
 * Extracted from B4.1.2_linked_lists.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        document.querySelectorAll('.card-header').forEach(header => {
            header.addEventListener('click', () => {
                header.classList.toggle('collapsed');
                const body = header.nextElementSibling;
                body.classList.toggle('collapsed');
            });
        });
    