/**
 * KS3 Widget Functions
 * Extracted from ks3-standalone.njk
 * Includes: Timer widget, Floating timer, Date display
 * Extracted on 2025-12-14
 */

        // Date Script
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('live-date-display').innerText = new Date().toLocaleDateString('en-GB', dateOptions);

        /* --- WIDGET FUNCTIONS --- */
        // (Including all the widget functions from L5)
        
        let timerInterval;
        let isRunning = false;
        let remainingTime = 0;

        function toggleTimer() {
            const input = document.getElementById('hook-timer');
            const icon = document.getElementById('timer-icon');
            const sound = document.getElementById('timer-sound');

            if (isRunning) {
                clearInterval(timerInterval);
                isRunning = false;
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            } else {
                if (remainingTime === 0) {
                    const parts = input.value.split(':');
                    const mins = parseInt(parts[0]) || 0;
                    const secs = parseInt(parts[1]) || 0;
                    remainingTime = (mins * 60) + secs;
                }

                if (remainingTime <= 0) {
                    alert("Please set a time (mm:ss)!");
                    return;
                }

                isRunning = true;
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                input.disabled = true;

                timerInterval = setInterval(() => {
                    remainingTime--;
                    updateDisplay(remainingTime);
                    if (remainingTime <= 0) {
                        clearInterval(timerInterval);
                        isRunning = false;
                        input.disabled = false;
                        icon.classList.remove('fa-pause');
                        icon.classList.add('fa-play');
                        if (sound) sound.play();
                    }
                }, 1000);
            }
        }

        function updateDisplay(time) {
            const m = Math.floor(time / 60).toString().padStart(2, '0');
            const s = (time % 60).toString().padStart(2, '0');
            document.getElementById('hook-timer').value = `${m}:${s}`;
        }

        function resetTimer() {
            clearInterval(timerInterval);
            isRunning = false;
            remainingTime = 0;
            const input = document.getElementById('hook-timer');
            const icon = document.getElementById('timer-icon');

            input.value = "00:00";
            input.disabled = false;
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }

        /* --- FLOATING TIMER LOGIC --- */
        let ftInterval;
        let ftRunning = false;
        let ftTime = 0;

        function initFloatingTimer() {
            const minInput = document.getElementById('ft-min');
            const secInput = document.getElementById('ft-sec');

            if(!minInput || !secInput) return;

            [minInput, secInput].forEach(input => {
                input.addEventListener('focus', () => input.select());
                input.addEventListener('change', () => {
                    let val = parseInt(input.value) || 0;
                    if (val < 0) val = 0;
                    if (input.id === 'ft-sec' && val > 59) val = 59;
                    input.value = val.toString().padStart(2, '0');

                    let m = parseInt(minInput.value) || 0;
                    let s = parseInt(secInput.value) || 0;
                    ftTime = m * 60 + s;
                });
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') input.blur();
                });
            });
        }

        function toggleTimerExpand() {
            const widget = document.getElementById('floating-timer');
            widget.classList.toggle('expanded');
            const icon = widget.querySelector('.ft-toggle-btn i');
            if (widget.classList.contains('expanded')) {
                icon.classList.remove('fa-clock');
                icon.classList.add('fa-chevron-left');
            } else {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-clock');
            }
        }

        function toggleFloatingTimer() {
            const btn = document.getElementById('ft-toggle');
            const icon = btn.querySelector('i');

            if (ftRunning) {
                clearInterval(ftInterval);
                ftRunning = false;
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            } else {
                if (ftTime === 0 || !ftRunning) {
                    let m = parseInt(document.getElementById('ft-min').value) || 0;
                    let s = parseInt(document.getElementById('ft-sec').value) || 0;
                    ftTime = m * 60 + s;
                }

                if (ftTime > 0) {
                    ftRunning = true;
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                    ftInterval = setInterval(() => {
                        ftTime--;
                        if (ftTime <= 0) {
                            clearInterval(ftInterval);
                            ftRunning = false;
                            ftTime = 0;
                            icon.classList.remove('fa-pause');
                            icon.classList.add('fa-play');
                            try {
                                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                                const osc = ctx.createOscillator();
                                osc.connect(ctx.destination);
                                osc.frequency.value = 880;
                                osc.start();
                                setTimeout(() => osc.stop(), 500);
                            } catch (e) { console.log('Audio error', e); }
                        }
                        updateFTDisplay();
                    }, 1000);
                }
            }
        }

        function resetFloatingTimer() {
            clearInterval(ftInterval);
            ftRunning = false;
            ftTime = 0;
            updateFTDisplay();
            const icon = document.getElementById('ft-toggle').querySelector('i');
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }

        function updateFTDisplay() {
            const m = Math.floor(ftTime / 60).toString().padStart(2, '0');
            const s = (ftTime % 60).toString().padStart(2, '0');
            document.getElementById('ft-min').value = m;
            document.getElementById('ft-sec').value = s;
        }

        window.addEventListener('load', initFloatingTimer);
    