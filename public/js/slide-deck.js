(function () {
    if (typeof Reveal === 'undefined') return;

    const defaultOptions = {
        hash: false,
        history: false,
        slideNumber: true,
        controls: true,
        progress: true,
        center: true,
        margin: 0.04,
        width: 960,
        height: '100%',
        minScale: 0.2,
        maxScale: 2.0,
        transition: 'convex',
        backgroundTransition: 'fade'
    };

    const supplied = window.__deckOptions || {};
    const plugins = supplied.plugins || [];

    if (typeof RevealHighlight !== 'undefined' && !plugins.includes(RevealHighlight)) {
        plugins.push(RevealHighlight);
    }

    const config = { ...defaultOptions, ...supplied, plugins };
    Reveal.initialize(config);

    const dateEl = document.getElementById('live-date-display');
    if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.innerText = new Date().toLocaleDateString('en-GB', options);
    }
})();
