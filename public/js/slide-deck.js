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
        // Increased margin to create space for fixed header/footer elements
        // This tells Reveal to leave space around slides
        margin: 0.08,
        width: 1600,
        height: 900,
        minScale: 0.15,
        maxScale: 1.2,
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

/* --- INTERACTIVE KEYWORDS MODAL LOGIC --- */
(function () {
    // 1. Inject Modal HTML if not present
    if (!document.getElementById('keyword-modal')) {
        const modalHTML = `
            <div id="keyword-modal">
                <div id="keyword-modal-overlay"></div>
                <div id="keyword-modal-content">
                    <button id="keyword-modal-close"><i class="fa-solid fa-times"></i></button>
                    <h3 id="keyword-modal-title"></h3>
                    <div id="keyword-modal-def"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const modal = document.getElementById('keyword-modal');
    const titleEl = document.getElementById('keyword-modal-title');
    const defEl = document.getElementById('keyword-modal-def');
    const closeBtn = document.getElementById('keyword-modal-close');
    const overlay = document.getElementById('keyword-modal-overlay');

    // 2. Open Modal Function
    function openModal(keyword, definition) {
        titleEl.textContent = keyword;
        defEl.textContent = definition;
        modal.classList.add('active');
        // Blur the main content
        const reveal = document.querySelector('.reveal');
        if (reveal) reveal.style.filter = 'blur(5px)';
    }

    // 3. Close Modal Function
    function closeModal() {
        modal.classList.remove('active');
        // Unblur
        const reveal = document.querySelector('.reveal');
        if (reveal) reveal.style.filter = 'none';
    }

    // 4. Event Listeners
    // Use delegation for keywords (as they might be dynamically added or inside slides)
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('keyword')) {
            const keyword = e.target.textContent;
            // Use data-def attribute, fallback to text content if missing (shouldn't happen)
            const definition = e.target.getAttribute('data-def') || "No definition found.";
            openModal(keyword, definition);
        }
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
})();
