/**
 * Extracted from multiple slide-deck pages on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('live-date-display').innerText = new Date().toLocaleDateString('en-GB', dateOptions);
    