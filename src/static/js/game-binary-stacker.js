/**
 * Extracted from binary_game.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- Audio Engine ---
        class RetroSound {
            constructor() {
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
                this.enabled = true;
            }
            playTone(freq, type, duration, vol = 0.1) {
                if (!this.enabled || !this.ctx) return;
                if (this.ctx.state === 'suspended') this.ctx.resume();
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                gain.gain.setValueAtTime(vol, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            }
            click() { this.playTone(800, 'sine', 0.05, 0.05); }
            success() {
                this.playTone(1200, 'square', 0.1, 0.05);
                setTimeout(() => this.playTone(1800, 'square', 0.2, 0.05), 100);
            }
            error() { this.playTone(150, 'sawtooth', 0.3, 0.1); }
            levelUp() {
                this.playTone(440, 'sine', 0.1);
                setTimeout(() => this.playTone(554, 'sine', 0.1), 100);
                setTimeout(() => this.playTone(659, 'sine', 0.1), 200);
                setTimeout(() => this.playTone(880, 'sine', 0.4), 300);
            }
            gameOver() {
                this.playTone(300, 'sawtooth', 0.5);
                setTimeout(() => this.playTone(200, 'sawtooth', 0.5), 400);
                setTimeout(() => this.playTone(100, 'sawtooth', 1.0), 800);
            }
        }

        // --- Game Logic ---
        const COLUMNS = [128, 64, 32, 16, 8, 4, 2, 1];
        const ROW_HEIGHT = 80;
        const MAX_ROWS = 7;

        // Complexity Calculation
        const COMPLEXITY_POOL = [];
        (function initComplexity() {
            for (let i = 1; i <= 255; i++) {
                let bits = 0;
                let n = i;
                while (n > 0) {
                    if (n & 1) bits++;
                    n >>= 1;
                }
                let score = bits;
                if (i === 255) score = 2.5; // Special case for all 1s
                else if (bits === 7) score = 6.5; // 7 bits is hard

                COMPLEXITY_POOL.push({ val: i, score: score });
            }
            COMPLEXITY_POOL.sort((a, b) => a.score - b.score);
        })();

        class Game {
            constructor() {
                this.rows = [];
                this.state = {
                    playing: false,
                    paused: false,
                    score: 0,
                    level: 1,
                    linesCleared: 0,
                    linesForNext: 3,
                    spawnRate: 8000,
                    lastSpawn: 0
                };
                this.activeRowId = null;
                this.audio = new RetroSound();
                this.gridEl = document.getElementById('gridLayer');
                this.numpadEl = document.getElementById('numpad');

                // Keyboard Listener
                this.handleKeyDown = this.handleKeyDown.bind(this);
                window.addEventListener('keydown', this.handleKeyDown);

                this.loop = this.loop.bind(this);
                requestAnimationFrame(this.loop);
            }

            start() {
                this.rows = [];
                this.state = {
                    playing: true,
                    paused: false,
                    score: 0,
                    level: 1,
                    linesCleared: 0,
                    linesForNext: 3,
                    spawnRate: 8000,
                    lastSpawn: performance.now()
                };
                this.gridEl.innerHTML = '<div class="danger-line"></div>';
                document.getElementById('startScreen').classList.add('hidden');
                document.getElementById('gameOverScreen').classList.add('hidden');
                this.updateHUD();

                // Spawn initial rows
                this.spawnRow();
                this.spawnRow();
                this.audio.success();
            }

            getDifficulty(level) {
                // Level 1: Top 15 simplest
                // Level 2: Top 35
                // Level 3: Top 60
                // ...
                const range = Math.min(255, 15 + (level - 1) * 20);
                const poolSlice = COMPLEXITY_POOL.slice(0, range);
                const item = poolSlice[Math.floor(Math.random() * poolSlice.length)];
                return { max: 255, val: item.val }; // We use pre-selected value
            }

            // Override spawnRow to use the specific value if provided
            spawnRow() {
                if (this.rows.length >= MAX_ROWS) {
                    this.gameOver();
                    return;
                }

                const diff = this.getDifficulty(this.state.level);
                const type = Math.random() > 0.5 ? 'BINARY' : 'DECIMAL';
                // If we have a specific value from complexity pool, use it. 
                // Note: getDifficulty returns an object with 'val'.
                // Original logic used random max, now we use specific value.
                const target = diff.val;

                const row = {
                    id: Math.random().toString(36).substr(2, 9),
                    type: type,
                    target: target,
                    currentBits: type === 'BINARY' ? 0 : target,
                    input: '',
                    history: [],
                    el: null
                };

                this.rows.push(row);
                this.renderRow(row, this.rows.length - 1);
            }

            renderRow(row, index) {
                const el = document.createElement('div');
                el.className = 'game-row';
                el.style.bottom = (index * ROW_HEIGHT) + 'px';
                el.id = row.id;

                let bitsHtml = '';
                COLUMNS.forEach(val => {
                    const isSet = (row.currentBits & val) !== 0;
                    const activeClass = isSet ? 'active' : '';
                    const clickHandler = row.type === 'BINARY' ? `onclick="game.toggleBit('${row.id}', ${val})"` : '';
                    const cursorStyle = row.type === 'DECIMAL' ? 'cursor: default; opacity: 0.8;' : '';

                    bitsHtml += `<div class="bit-btn ${activeClass}" style="${cursorStyle}" ${clickHandler}>${isSet ? 1 : 0}</div>`;
                });

                let targetHtml = '';
                if (row.type === 'DECIMAL') {
                    targetHtml = `<div class="input-display" onclick="game.openNumpad('${row.id}')" id="input-${row.id}">?</div>`;
                } else {
                    targetHtml = `<div style="font-family: 'JetBrains Mono'; font-size: 1.5rem; font-weight: bold;">${row.target}</div>`;
                }

                el.innerHTML = `
                    <div class="row-content" id="content-${row.id}">
                        <div class="bits-container">${bitsHtml}</div>
                        <div class="target-box">${targetHtml}</div>
                    </div>
                `;

                this.gridEl.appendChild(el);
                row.el = el;
                this.updateFocus();
            }

            updateRowVisuals(row) {
                if (!row.el) return;
                const content = row.el.querySelector('.row-content');
                const bits = row.el.querySelectorAll('.bit-btn');

                COLUMNS.forEach((val, idx) => {
                    const isSet = (row.currentBits & val) !== 0;
                    if (isSet) bits[idx].classList.add('active');
                    else bits[idx].classList.remove('active');
                    bits[idx].innerText = isSet ? '1' : '0';
                });

                if (row.type === 'DECIMAL') {
                    const inputEl = document.getElementById(`input-${row.id}`);
                    if (inputEl) {
                        inputEl.innerText = row.input || '?';
                        if (this.activeRowId === row.id) inputEl.classList.add('active');
                        else inputEl.classList.remove('active');
                    }
                }
            }

            updateFocus() {
                // Highlight the bottom-most row (index 0)
                this.rows.forEach((r, i) => {
                    if (r.el) {
                        const content = r.el.querySelector('.row-content');
                        if (i === 0) content.style.border = '2px solid var(--cyan)';
                        else content.style.border = '1px solid var(--border)';
                    }
                });
            }

            toggleBit(rowId, val) {
                if (this.state.paused || !this.state.playing) return;
                const row = this.rows.find(r => r.id === rowId);
                if (!row || row.type !== 'BINARY') return;

                // Push to history if bit is being set (or just toggle action)
                // Actually, just push the bit value toggled
                row.history.push(val);

                row.currentBits ^= val;
                this.audio.click();
                this.updateRowVisuals(row);

                if (row.currentBits === row.target) {
                    this.solveRow(rowId);
                }
            }

            openNumpad(rowId) {
                if (this.state.paused || !this.state.playing) return;
                this.activeRowId = rowId;
                this.numpadEl.classList.remove('hidden');

                // Position numpad near the row
                const row = this.rows.find(r => r.id === rowId);
                this.updateRowVisuals(row);
            }

            closeNumpad() {
                this.activeRowId = null;
                this.numpadEl.classList.add('hidden');
                this.rows.forEach(r => this.updateRowVisuals(r));
            }

            handleInput(key) {
                if (!this.activeRowId) return;
                const row = this.rows.find(r => r.id === this.activeRowId);
                if (!row) return;

                this.audio.click();

                if (key === 'CHECK') {
                    if (parseInt(row.input) === row.target) {
                        this.solveRow(row.id);
                        this.closeNumpad();
                    } else {
                        this.audio.error();
                        document.getElementById(`content-${row.id}`).classList.add('error');
                        setTimeout(() => document.getElementById(`content-${row.id}`).classList.remove('error'), 500);
                    }
                } else if (key === 'DEL') {
                    row.input = row.input.slice(0, -1);
                } else {
                    if (row.input.length < 3) row.input += key;
                    // Auto check
                    if (parseInt(row.input) === row.target) {
                        this.solveRow(row.id);
                        this.closeNumpad();
                    }
                }
                this.updateRowVisuals(row);
            }

            solveRow(rowId) {
                const rowIdx = this.rows.findIndex(r => r.id === rowId);
                if (rowIdx === -1) return;

                const row = this.rows[rowIdx];
                this.audio.success();

                // Visual success
                const content = document.getElementById(`content-${row.id}`);
                content.classList.add('solved');

                // Update State
                this.state.score += 100 * this.state.level;
                this.state.linesCleared++;
                this.state.linesForNext--;

                if (this.state.linesForNext <= 0) {
                    this.levelUp();
                }

                // Remove row after animation
                setTimeout(() => {
                    if (row.el) row.el.remove();
                    this.rows.splice(rowIdx, 1);
                    // Shift others down
                    this.rows.forEach((r, idx) => {
                        if (r.el) r.el.style.bottom = (idx * ROW_HEIGHT) + 'px';
                    });

                    // Auto-spawn if cleared
                    if (this.rows.length === 0) {
                        this.spawnRow();
                        this.state.lastSpawn = performance.now();
                    }
                    this.updateFocus();
                }, 200);

                this.updateHUD();
            }

            levelUp() {
                this.state.level++;
                this.state.linesForNext = 3 + Math.floor(this.state.level * 1.5);
                this.state.spawnRate = Math.max(2000, 8000 - (this.state.level * 800));
                this.audio.levelUp();
            }

            updateHUD() {
                document.getElementById('scoreDisplay').innerText = this.state.score.toString().padStart(6, '0');
                document.getElementById('levelDisplay').innerText = this.state.level;
                document.getElementById('rateDisplay').innerText = (this.state.spawnRate / 1000).toFixed(1) + 's';
            }

            togglePause() {
                this.state.paused = !this.state.paused;
                document.getElementById('pauseText').innerText = this.state.paused ? "RESUME" : "PAUSE";
            }

            toggleAudio() {
                this.audio.enabled = !this.audio.enabled;
                const icon = document.getElementById('audioIcon');
                icon.className = this.audio.enabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
            }

            gameOver() {
                this.state.playing = false;
                this.audio.gameOver();
                document.getElementById('finalScore').innerText = this.state.score;
                document.getElementById('finalLevel').innerText = this.state.level;
                document.getElementById('gameOverScreen').classList.remove('hidden');
            }

            handleKeyDown(e) {
                if (!this.state.playing || this.state.paused) return;

                // 1-8 Keys for Binary Toggle on Bottom Row
                if (e.key >= '1' && e.key <= '8') {
                    const row = this.rows[0]; // Bottom row
                    if (row && row.type === 'BINARY') {
                        // Map 1->128, 8->1
                        // COLUMNS = [128, 64, 32, 16, 8, 4, 2, 1]
                        // key '1' -> index 0 -> 128
                        const idx = parseInt(e.key) - 1;
                        const val = COLUMNS[idx];
                        this.toggleBit(row.id, val);
                    }
                }

                // Backspace for Undo
                if (e.key === 'Backspace') {
                    const row = this.rows[0];
                    if (row && row.type === 'BINARY' && row.history.length > 0) {
                        const lastVal = row.history.pop();
                        row.currentBits ^= lastVal; // Toggle back
                        this.audio.click();
                        this.updateRowVisuals(row);
                    }
                }
            }

            loop(time) {
                if (this.state.playing && !this.state.paused) {
                    if (time - this.state.lastSpawn > this.state.spawnRate) {
                        this.spawnRow();
                        this.state.lastSpawn = time;
                    }
                }
                requestAnimationFrame(this.loop);
            }
        }

        const game = new Game();

    