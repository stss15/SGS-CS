(() => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const carousel = document.getElementById('carousel');
    const carouselImg = document.getElementById('carousel-img');
    const carouselCaption = document.getElementById('carousel-caption');
    let carouselItems = [];
    let carouselIndex = 0;

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

    // --- Carousel Logic ---
    const carouselSets = {
        interfaces: [
            'images/Interfaces/GUI.png',
            'images/Interfaces/CLI.png',
            'images/Interfaces/VUI.png',
            'images/Interfaces/Form.png',
            'images/Interfaces/Gesture.png'
        ],
        topic1_1: [
            '1.1 images/8-bit-binary-place-values--t3chat--1.jpg',
            '1.1 images/2s compliment.png',
            '1.1 images/addition and overflow.jpg',
            '1.1 images/binary hex conversion.png',
            '1.1 images/binary to denary.png',
            '1.1 images/real world hex.png',
            '1.1 images/right shift.png'
        ],
        topic1_2: [
            '1.2 images/alanogue to digital sound.png',
            '1.2 images/ascii unicode.png',
            '1.2 images/bitmap.png',
            '1.2 images/resolution.png'
        ],
        topic1_3: [
            '1.3 images/Data units 1024.png',
            '1.3 images/data units decimal.png',
            '1.3 images/file size formula.png',
            '1.3 images/lossy vs lossless.png',
            '1.3 images/RLE.png'
        ],
        topic2_1: [
            '2.1 images/data packet structure.png',
            '2.1 images/packet switching.png',
            '2.1 images/serial vs parallel.png',
            '2.1 images/simplex, half and full duplex.png',
            '2.1 images/usb.png'
        ],
        topic2_2: [
            '2.2 images/arq.png',
            '2.2 images/check digit.png',
            '2.2 images/echo check.png',
            '2.2 images/parity block.png',
            '2.2 images/parity check.png'
        ],
        topic2_3: [
            '2.3 images/asymetric encryption.png',
            '2.3 images/encryption terminology.png',
            '2.3 images/how encryption works.png',
            '2.3 images/symmetric encryption.png'
        ],
        topic3_1: [
            '3.1 images/clock, multi-core cahce.png',
            '3.1 images/embedded systems.png',
            '3.1 images/fde cycle.png',
            '3.1 images/machine code instruction breakdown.png',
            '3.1 images/von neumann architecture.png'
        ],
        topic3_2: [
            '3.2 images/3d printing.png',
            '3.2 images/barcode vs qr code.png',
            '3.2 images/inkjet vs laser.png',
            '3.2 images/inside digital camera.png',
            '3.2 images/lcd vs oled.png',
            '3.2 images/sensors cheat sheet.png',
            '3.2 images/touch screen tech.png'
        ],
        topic3_3: [
            '3.3 images/cd dvd blu ray.png',
            '3.3 images/cloud storage.png',
            '3.3 images/cpu to secondary storage.png',
            '3.3 images/hdd vs sdd.png',
            '3.3 images/ram vs rom.png',
            '3.3 images/virtual memory system.png'
        ],
        topic3_4: [
            '3.4 images/IPv4 vs IPv6.png',
            '3.4 images/MAC vs IP address.png',
            '3.4 images/NIC and MAC address.png',
            '3.4 images/Role of a router.png',
            '3.4 images/dynamic vs static ip.png'
        ],
        topic4_1: [
            '4.1 images/Software and Hardware Hierachy.png',
            '4.1 images/features of the OS.png',
            '4.1 images/firmware.png',
            '4.1 images/printer interupts.png',
            '4.1 images/utility programs.png'
        ],
        topic4_2: [
            '4.2 images/compiler vs interpreter.png',
            '4.2 images/features of an ide.png',
            '4.2 images/translation process.png',
            '4.2 images/translation required.png'
        ],
        topic5_1: [
            '5.1 images/anatomy of a url.png',
            '5.1 images/cookies.png',
            '5.1 images/function of a web browser.png',
            '5.1 images/http vs https.png',
            '5.1 images/internet vs www.png'
        ],
        topic5_2: [
            '5.2 images/crypto block.png',
            '5.2 images/crypto currency transaction process.png',
            '5.2 images/fiat vs digital.png',
            '5.2 images/unbreakable chain.png'
        ],
        topic5_3: [
            '5.3 images/biometric authentication.png',
            '5.3 images/common malware.png',
            '5.3 images/data access levels.png',
            '5.3 images/ddos.png',
            '5.3 images/phishing vs pharming.png',
            '5.3 images/two step verification.png'
        ]
    };

    const renderCarousel = () => {
        if (!carousel || !carouselImg || !carouselItems.length) return;
        carouselImg.src = carouselItems[carouselIndex];
        if (carouselCaption) {
            carouselCaption.innerText = `${carouselIndex + 1} / ${carouselItems.length}`;
        }
    };

    const openCarousel = (key) => {
        const set = carouselSets[key];
        if (!set || !set.length || !carousel) return;
        carouselItems = set;
        carouselIndex = 0;
        renderCarousel();
        carousel.classList.add('active');
    };

    const closeCarousel = () => {
        if (carousel) carousel.classList.remove('active');
    };

    if (carousel) {
        carousel.addEventListener('click', (e) => {
            // Close only if clicking backdrop, not buttons or image
            if (e.target.id === 'carousel') closeCarousel();
        });
        const closeBtn = document.getElementById('carousel-close');
        if (closeBtn) closeBtn.addEventListener('click', closeCarousel);
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                carouselIndex = (carouselIndex - 1 + carouselItems.length) % carouselItems.length;
                renderCarousel();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                carouselIndex = (carouselIndex + 1) % carouselItems.length;
                renderCarousel();
            });
        }
    }

    document.querySelectorAll('[data-carousel]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const key = item.getAttribute('data-carousel');
            openCarousel(key);
        });
    });
})();
