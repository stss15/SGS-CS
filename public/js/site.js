(() => {
    const links = document.querySelectorAll('[data-protected-password]');
    if (!links.length) return;

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            const requiredPassword = link.getAttribute('data-protected-password');
            const promptMessage =
                link.getAttribute('data-protected-message') ||
                'Please enter the teacher password to access this resource:';

            const input = window.prompt(promptMessage);
            if (input === null) {
                event.preventDefault();
                return;
            }

            if (input === requiredPassword) {
                return;
            }

            event.preventDefault();
            window.alert('Incorrect password.');
        });
    });
})();
