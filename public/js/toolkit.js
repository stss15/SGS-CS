(() => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    const openLightbox = (src) => {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        lightbox.classList.add('active');
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('active');
    };

    if (lightbox) {
        lightbox.addEventListener('click', closeLightbox);
        const closeBtn = lightbox.querySelector('.lightbox-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                closeLightbox();
            });
        }
    }

    document.querySelectorAll('[data-lightbox-src]').forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const src = item.getAttribute('data-lightbox-src');
            if (src) openLightbox(src);
        });
    });
})();
