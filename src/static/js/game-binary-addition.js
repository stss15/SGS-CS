/**
 * Extracted from binary-addition-game.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- Sound Manager (Space Arcade Theme) ---
        const SoundFX = {
            ctx: null,
            init: function () {
                if (!this.ctx) {
                    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
                }
            },
            play: function (type) {
                if (!this.ctx) return;
                if (this.ctx.state === 'suspended') {
                    this.ctx.resume();
                }

                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.connect(gain);
                gain.connect(this.ctx.destination);

                const now = this.ctx.currentTime;

                if (type === 'flip') {
                    // Short high-pitched blip
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(600, now);
                    osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
                    gain.gain.setValueAtTime(0.05, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                    osc.start(now);
                    osc.stop(now + 0.06);

                } else if (type === 'correct') {
                    // Rising arpeggio (Power up)
                    osc.type = 'triangle';
                    gain.gain.value = 0.1;

                    // Note 1
                    osc.frequency.setValueAtTime(440, now); // A4
                    gain.gain.setValueAtTime(0.1, now);

                    // Note 2
                    osc.frequency.setValueAtTime(554, now + 0.1); // C#5

                    // Note 3
                    osc.frequency.setValueAtTime(659, now + 0.2); // E5
                    gain.gain.linearRampToValueAtTime(0, now + 0.4);

                    osc.start(now);
                    osc.stop(now + 0.4);

                    // Add a second "sparkle" layer
                    const osc2 = this.ctx.createOscillator();
                    const gain2 = this.ctx.createGain();
                    osc2.connect(gain2);
                    gain2.connect(this.ctx.destination);
                    osc2.type = 'square';
                    osc2.frequency.setValueAtTime(880, now);
                    osc2.frequency.linearRampToValueAtTime(1760, now + 0.3);
                    gain2.gain.setValueAtTime(0.05, now);
                    gain2.gain.linearRampToValueAtTime(0, now + 0.3);
                    osc2.start(now);
                    osc2.stop(now + 0.3);

                } else if (type === 'incorrect') {
                    // Low buzzing error
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(150, now);
                    osc.frequency.linearRampToValueAtTime(100, now + 0.3);
                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.linearRampToValueAtTime(0, now + 0.3);
                    osc.start(now);
                    osc.stop(now + 0.3);

                } else if (type === 'multiplierLost') {
                    // Descending "power down" slide
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(400, now);
                    osc.frequency.exponentialRampToValueAtTime(100, now + 0.5);

                    // Add some wobble (tremolo)
                    const lfo = this.ctx.createOscillator();
                    lfo.frequency.value = 20;
                    const lfoGain = this.ctx.createGain();
                    lfoGain.gain.value = 500;
                    lfo.connect(lfoGain);
                    lfoGain.connect(osc.frequency);
                    lfo.start(now);
                    lfo.stop(now + 0.5);

                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.linearRampToValueAtTime(0, now + 0.5);
                    osc.start(now);
                    osc.stop(now + 0.5);
                }
            }
        };

        // Game State
        let state = {
            level: 1,
            score: 0,
            streak: 0,
            currentA: 0,
            currentB: 0,
            correctSum: 0,
            correctCarries: [],

            // Timers
            globalTimeLeft: 120, // 2 minutes
            globalTimerInterval: null,

            questionMaxTime: 30, // Starts at 30s
            questionTimeLeft: 30,
            questionTimerInterval: null,

            problemsSolved: 0,
            isGameOver: false
        };

        const placeValues = [128, 64, 32, 16, 8, 4, 2, 1];

        // Level configurations (Simplified for score scaling)
        const levelConfigs = {
            1: { maxSum: 50, basePoints: 100 },
            2: { maxSum: 100, basePoints: 150 },
            3: { maxSum: 150, basePoints: 200 },
            4: { maxSum: 200, basePoints: 250 },
            5: { maxSum: 230, basePoints: 300 },
            6: { maxSum: 250, basePoints: 400 },
            7: { maxSum: 255, basePoints: 500 },
            8: { maxSum: 255, basePoints: 750 },
            9: { maxSum: 255, basePoints: 1000 },
            10: { maxSum: 255, basePoints: 1500 }
        };

        function getConfig() {
            return levelConfigs[Math.min(state.level, 10)];
        }

        function generateProblem() {
            if (state.isGameOver) return;

            const config = getConfig();
            const maxSum = config.maxSum;

            // Generate numbers ensuring no overflow (sum < 256)
            state.currentA = Math.floor(Math.random() * Math.min(maxSum, 255));
            const maxB = Math.min(255 - state.currentA, maxSum - state.currentA);
            state.currentB = Math.floor(Math.random() * Math.max(1, maxB + 1));

            // Ensure at least some complexity based on level
            if (state.level >= 3 && state.currentA + state.currentB < 20) {
                state.currentA = Math.floor(Math.random() * 50) + 20;
                state.currentB = Math.floor(Math.random() * Math.min(50, 255 - state.currentA)) + 10;
            }

            state.correctSum = state.currentA + state.currentB;

            // Calculate correct carries
            state.correctCarries = calculateCarries(state.currentA, state.currentB);

            renderProblem();
            resetQuestionTimer();
        }

        function calculateCarries(a, b) {
            const carries = [0]; // Rightmost carry is always 0
            let carry = 0;

            for (let i = 0; i < 8; i++) {
                const bitA = (a >> i) & 1;
                const bitB = (b >> i) & 1;
                const sum = bitA + bitB + carry;
                carry = sum >= 2 ? 1 : 0;
                if (i < 7) {
                    carries.unshift(carry);
                }
            }

            return carries;
        }

        function renderProblem() {
            // Column indices with Place Values
            const colIndex = document.getElementById('col-index');
            colIndex.innerHTML = placeValues.map(val =>
                `<div class="col-num">${val}</div>`
            ).join('');

            // Number A
            const numA = document.getElementById('num-a');
            numA.innerHTML = Array.from({ length: 8 }, (_, i) => {
                const bit = (state.currentA >> (7 - i)) & 1;
                return `<div class="bit bit-a">${bit}</div>`;
            }).join('');

            // Number B
            const numB = document.getElementById('num-b');
            numB.innerHTML = Array.from({ length: 8 }, (_, i) => {
                const bit = (state.currentB >> (7 - i)) & 1;
                return `<div class="bit bit-b">${bit}</div>`;
            }).join('');

            // Output row (Q) - click buttons default 0
            const outputRow = document.getElementById('output-row');
            outputRow.innerHTML = Array.from({ length: 8 }, (_, i) =>
                `<div class="interaction-bit" id="q${i}" data-toggle-bit="true">0</div>`
            ).join('');

            // Carry row (C) - click buttons default 0 + fixed 0
            const carryRow = document.getElementById('carry-row');
            carryRow.innerHTML = Array.from({ length: 7 }, (_, i) =>
                `<div class="interaction-bit" id="c${i}" data-toggle-bit="true">0</div>`
            ).join('') + '<div class="fixed-carry">0</div>';

            document.getElementById('message').textContent = '';
            document.getElementById('message').className = 'message';
        }

        function toggleBit(element) {
            // Initialize audio on first user interaction
            SoundFX.init();

            if (element.classList.contains('locked') || state.isGameOver) return;

            SoundFX.play('flip'); // Play sound

            const current = element.innerText;
            if (current === '0') {
                element.innerText = '1';
                element.classList.add('active-choice');
            } else {
                element.innerText = '0';
                element.classList.remove('active-choice');
            }
        }

        function checkAnswer() {
            // Initialize audio on button click (fallback)
            SoundFX.init();

            if (state.isGameOver) return;

            let allCorrect = true;

            // Check Q (output)
            const correctBits = state.correctSum.toString(2).padStart(8, '0');

            for (let i = 0; i < 8; i++) {
                const input = document.getElementById(`q${i}`);
                const userBit = input.innerText;
                const correctBit = correctBits[i];

                if (userBit !== correctBit) {
                    allCorrect = false;
                }
            }

            // Check C (carries)
            for (let i = 0; i < 7; i++) {
                const input = document.getElementById(`c${i}`);
                const userCarry = input.innerText;
                const correctCarry = state.correctCarries[i].toString();

                if (userCarry !== correctCarry) {
                    allCorrect = false;
                }
            }

            if (allCorrect) {
                handleCorrectAnswer();
            } else {
                handleIncorrectAnswer();
            }
        }

        function handleCorrectAnswer() {
            SoundFX.play('correct'); // Play correct sound
            state.problemsSolved++;

            const config = getConfig();

            // Multiplier depends on if Question Timer > 0
            let multiplier = 1;
            if (state.questionTimeLeft > 0) {
                state.streak++;
                multiplier = Math.min(1 + state.streak * 0.5, 5);
            } else {
                state.streak = 1; // Reset streak if too slow
            }

            const points = Math.floor(config.basePoints * multiplier);
            state.score += points;

            // Reduce Max time for next question, floor at 6s
            state.questionMaxTime = Math.max(6, state.questionMaxTime - 2);

            // Level up based on score thresholds (simple implementation)
            if (state.score > state.level * 1000) {
                state.level++;
            }

            updateUI();
            updateMultiplierDisplay();
            showMessage(`🎉 Correct! +${points} points`, 'success');

            lockInputs();
            setTimeout(generateProblem, 1000);
        }

        function handleIncorrectAnswer() {
            SoundFX.play('incorrect'); // Play error sound
            state.streak = 0;
            updateMultiplierDisplay();
            updateUI();
            showMessage('❌ Incorrect! Streak lost.', 'error');
        }

        function lockInputs() {
            const bits = document.querySelectorAll('.interaction-bit');
            bits.forEach(b => b.classList.add('locked'));
        }

        function updateMultiplierDisplay() {
            const multiplier = Math.min(1 + state.streak * 0.5, 5);
            document.getElementById('multiplier').textContent = `${multiplier.toFixed(1)}x Multiplier`;
        }

        // --- Timers ---

        function startGlobalTimer() {
            clearInterval(state.globalTimerInterval);
            state.globalTimerInterval = setInterval(() => {
                state.globalTimeLeft--;

                const mins = Math.floor(state.globalTimeLeft / 60);
                const secs = state.globalTimeLeft % 60;
                document.getElementById('global-timer').textContent =
                    `${mins}:${secs.toString().padStart(2, '0')}`;

                if (state.globalTimeLeft <= 0) {
                    gameOver();
                }
            }, 1000);
        }

        function resetQuestionTimer() {
            clearInterval(state.questionTimerInterval);
            state.questionTimeLeft = state.questionMaxTime;
            updateBonusBar();

            state.questionTimerInterval = setInterval(() => {
                // Decrement by 0.1s for smooth bar
                state.questionTimeLeft = Math.max(0, state.questionTimeLeft - 0.1);
                updateBonusBar();

                if (state.questionTimeLeft <= 0) {
                    // Timer ran out, lost multiplier chance
                    if (state.streak > 0) {
                        state.streak = 0;
                        updateMultiplierDisplay();
                        SoundFX.play('multiplierLost'); // Play multiplier lost sound
                    }
                    clearInterval(state.questionTimerInterval);
                }
            }, 100);
        }

        function updateBonusBar() {
            const pct = (state.questionTimeLeft / state.questionMaxTime) * 100;
            const bar = document.getElementById('bonus-bar');
            const text = document.getElementById('bonus-time-text');

            bar.style.width = `${pct}%`;
            text.textContent = `${Math.ceil(state.questionTimeLeft)}s`;

            if (pct < 20) {
                bar.style.background = '#ff4444';
            } else {
                bar.style.background = 'linear-gradient(90deg, #ff6b6b, #ff00ff)';
            }
        }

        function gameOver() {
            SoundFX.play('multiplierLost'); // Play game over sound
            state.isGameOver = true;
            clearInterval(state.globalTimerInterval);
            clearInterval(state.questionTimerInterval);

            const overlay = document.getElementById('level-up-overlay');
            const title = overlay.querySelector('.level-up-text');
            title.textContent = "⏰ TIME'S UP!";

            document.getElementById('level-up-sub').innerHTML =
                `Final Score: ${state.score.toLocaleString()}<br>
                 Problems Solved: ${state.problemsSolved}<br>
                 Level Reached: ${state.level}`;

            overlay.classList.add('show');
        }

        function resetGame() {
            state = {
                level: 1,
                score: 0,
                streak: 0,
                currentA: 0,
                currentB: 0,
                correctSum: 0,
                correctCarries: [],
                globalTimeLeft: 120,
                questionMaxTime: 30,
                questionTimeLeft: 30,
                problemsSolved: 0,
                isGameOver: false
            };

            document.getElementById('level-up-overlay').classList.remove('show');
            updateUI();
            updateMultiplierDisplay();
            startGlobalTimer();
            generateProblem();
        }

        function updateUI() {
            document.getElementById('level').textContent = state.level;
            document.getElementById('score').textContent = state.score.toLocaleString();
            document.getElementById('streak').textContent = `${state.streak}🔥`;
        }

        function showMessage(text, type) {
            const msgEl = document.getElementById('message');
            msgEl.textContent = text;
            msgEl.className = `message ${type}`;
        }

        function bindBitInteractionHandlers() {
            const outputRow = document.getElementById('output-row');
            const carryRow = document.getElementById('carry-row');
            const handleBitToggle = (event) => {
                const target = event.target;
                if (!(target instanceof Element)) return;
                const bit = target.closest('.interaction-bit[data-toggle-bit]');
                if (!bit) return;
                toggleBit(bit);
            };

            outputRow.addEventListener('click', handleBitToggle);
            carryRow.addEventListener('click', handleBitToggle);
        }

        // Initialize game
        bindBitInteractionHandlers();
        updateUI();
        startGlobalTimer();
        generateProblem();
    
