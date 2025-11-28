(function () {
    if (typeof Reveal === 'undefined') return;

    const AutoFit = {
        id: 'auto-fit',
        init: function (deck) {
            const revealEl = deck.getRevealElement();

            function isPrintMode() {
                return window.location.search.includes('print-pdf');
            }

            function resetAll() {
                revealEl.querySelectorAll('.js-autofit').forEach((el) => {
                    el.style.transform = 'scale(1)';
                });
            }

            function fitElementToParent(el) {
                el.style.transform = 'scale(1)';
                const parent = el.parentElement;
                if (!parent) return;

                const parentRect = parent.getBoundingClientRect();
                const elRect = el.getBoundingClientRect();
                if (!elRect.width || !elRect.height) return;

                const scaleW = parentRect.width / elRect.width;
                const scaleH = parentRect.height / elRect.height;
                const scale = Math.min(scaleW, scaleH, 1.1);
                el.style.transform = `scale(${scale})`;
            }

            function fitCurrentSlide() {
                if (deck.isOverview() || isPrintMode()) {
                    resetAll();
                    return;
                }

                const currentSlide = deck.getCurrentSlide();
                if (!currentSlide) return;

                currentSlide.querySelectorAll('.js-autofit').forEach((el) => fitElementToParent(el));
            }

            deck.on('ready', fitCurrentSlide);
            deck.on('slidechanged', fitCurrentSlide);
            deck.on('fragmentshown', fitCurrentSlide);
            deck.on('fragmenthidden', fitCurrentSlide);
            window.addEventListener('resize', fitCurrentSlide);
        }
    };

    function ensureAutoFitWrappers(root) {
        if (!root) return;
        const slides = root.querySelectorAll('.slides section');
        slides.forEach((section) => {
            const hasChildSections = Array.from(section.children).some((child) => child.tagName === 'SECTION');
            const optedOut =
                section.classList.contains('no-autofit') ||
                section.dataset.noAutofit === 'true' ||
                section.hasAttribute('data-no-autofit');
            if (hasChildSections || optedOut) return;

            const existingInner = Array.from(section.children).find((child) => child.classList && child.classList.contains('slide-inner'));
            if (existingInner) {
                existingInner.classList.add('js-autofit');
                return;
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'slide-inner js-autofit';

            while (section.firstChild) {
                wrapper.appendChild(section.firstChild);
            }

            section.appendChild(wrapper);
        });
    }

    const defaultOptions = {
        hash: false,
        history: false,
        slideNumber: 'c/t',
        showSlideNumber: 'all',
        controls: true,
        progress: true,
        center: true,
        margin: 0.06,
        width: 1600,
        height: 900,
        minScale: 0.5,
        maxScale: 1.5,
        transition: 'slide',
        backgroundTransition: 'fade',
        autoAnimate: true,
        autoAnimateDuration: 0.6,
        autoAnimateEasing: 'ease-out'
    };

    const supplied = window.__deckOptions || {};
    const plugins = supplied.plugins || [];

    if (typeof RevealHighlight !== 'undefined' && !plugins.includes(RevealHighlight)) {
        plugins.push(RevealHighlight);
    }
    if (typeof RevealNotes !== 'undefined' && !plugins.includes(RevealNotes)) {
        plugins.push(RevealNotes);
    }
    if (!plugins.includes(AutoFit)) {
        plugins.push(AutoFit);
    }

    const config = { ...defaultOptions, ...supplied, plugins };

    ensureAutoFitWrappers(document.querySelector('.reveal'));
    Reveal.initialize(config);

    const dateEl = document.getElementById('live-date-display');
    if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.innerText = new Date().toLocaleDateString('en-GB', options);
    }
})();
