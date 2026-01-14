/**
 * Extracted from negative-numbers.html on 2025-12-14
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
        // MSB is now negative weight
        const COLUMNS = [-128, 64, 32, 16, 8, 4, 2, 1];
        const ROW_HEIGHT = 80;
        const MAX_ROWS = 7;

        // Complexity Calculation for 2s Comp
        const COMPLEXITY_POOL = [];
        (function initComplexity() {
            // Generate all values from -128 to 127
            for (let i = -128; i <= 127; i++) {
                // Determine bits needed
                // Convert to 8-bit unsigned representation for bit counting
                let unsigned = i < 0 ? 256 + i : i;
                
                let bits = 0;
                let n = unsigned;
                while (n > 0) {
                    if (n & 1) bits++;
                    n >>= 1;
                }

                // Complexity scoring
                // Values close to boundaries or with many bits are "harder"
                let score = bits;
                
                // Special edge cases for teaching
                if (i === -128) score = 1; // 10000000 (actually simple pattern, but concept is hard)
                if (i === -1) score = 4;   // 11111111
                if (i === 0) score = 0;
                
                // Prioritize "learning" numbers first (small positives, small negatives)
                // Distance from 0 roughly correlates to difficulty for mental math
                let magnitude = Math.abs(i);
                
                COMPLEXITY_POOL.push({ val: i, difficulty: magnitude + (bits * 5) });
            }
            // Sort by difficulty
            COMPLEXITY_POOL.sort((a, b) => a.difficulty - b.difficulty);
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
                    spawnRate: 10000, // Slower start for 2s comp
                    lastSpawn: performance.now()
                };
                this.gridEl.innerHTML = '<div class="danger-line"><div class="danger-label">SYSTEM CRITICAL LIMIT</div></div>';
                document.getElementById('startScreen').classList.add('hidden');
                document.getElementById('gameOverScreen').classList.add('hidden');
                this.updateHUD();

                // Spawn initial rows
                this.spawnRow();
                this.spawnRow();
                this.audio.success();
            }

            getDifficulty(level) {
                // Progression logic
                const range = Math.min(COMPLEXITY_POOL.length, 20 + (level - 1) * 25);
                const poolSlice = COMPLEXITY_POOL.slice(0, range);
                const item = poolSlice[Math.floor(Math.random() * poolSlice.length)];
                return item.val;
            }

            spawnRow() {
                if (this.rows.length >= MAX_ROWS) {
                    this.gameOver();
                    return;
                }

                const target = this.getDifficulty(this.state.level);
                const type = Math.random() > 0.5 ? 'BINARY' : 'DECIMAL';

                // Initial bits state
                // If Decimal mode: bits represent 0 (which is 00000000)
                // If Binary mode: we need to find 8-bit pattern for 0? No, just start blank.
                
                const row = {
                    id: Math.random().toString(36).substr(2, 9),
                    type: type,
                    target: target,
                    // currentVal keeps track of the integer value of current bit configuration
                    currentVal: 0, 
                    // To track which bits are technically on:
                    bitMask: 0, // 0 to 255 unsigned representation
                    input: '',
                    el: null
                };

                this.rows.push(row);
                this.renderRow(row, this.rows.length - 1);
            }

            calculateValue(bitMask) {
                let total = 0;
                // Check MSB (128 position in unsigned, which is bit 7)
                if (bitMask & 128) {
                    total -= 128;
                }
                // Add rest
                total += (bitMask & 127);
                return total;
            }

            renderRow(row, index) {
                const el = document.createElement('div');
                el.className = 'game-row';
                el.style.bottom = (index * ROW_HEIGHT) + 'px';
                el.id = row.id;

                let bitsHtml = '';
                COLUMNS.forEach((val, idx) => {
                    // We check against positive column weights for the mask 
                    // The weights in COLUMNS are for math, but for bitwise check we need 128, 64, 32...
                    const maskVal = Math.abs(val); 
                    const isSet = (row.bitMask & maskVal) !== 0;
                    const activeClass = isSet ? 'active' : '';
                    const msbClass = idx === 0 ? 'msb-btn' : ''; // Special style for first bit
                    const clickHandler = row.type === 'BINARY' ? `onclick="game.toggleBit('${row.id}', ${maskVal})"` : '';
                    const cursorStyle = row.type === 'DECIMAL' ? 'cursor: default; opacity: 0.8;' : '';

                    bitsHtml += `<div class="bit-btn ${activeClass} ${msbClass}" style="${cursorStyle}" ${clickHandler}>${isSet ? 1 : 0}</div>`;
                });

                let targetHtml = '';
                if (row.type === 'DECIMAL') {
                    // User sees binary, needs to type decimal
                    // We must show the binary pattern corresponding to the target
                    // Wait, logic correction:
                    // If type is DECIMAL, user INPUTS decimal. So we must SHOW the binary.
                    // So we must pre-fill the bits to match the target.
                    if (row.bitMask === 0 && row.currentVal === 0 && row.target !== 0) {
                        // Initialize bits to match target
                        let unsigned = row.target < 0 ? 256 + row.target : row.target;
                        row.bitMask = unsigned;
                        row.currentVal = row.target;
                    }
                    
                    // Re-generate bits HTML with pre-filled values
                     bitsHtml = '';
                     COLUMNS.forEach((val, idx) => {
                        const maskVal = Math.abs(val);
                        const isSet = (row.bitMask & maskVal) !== 0;
                        const activeClass = isSet ? 'active' : '';
                        const msbClass = idx === 0 ? 'msb-btn' : '';
                        // No click handler for decimal mode
                        bitsHtml += `<div class="bit-btn ${activeClass} ${msbClass}" style="cursor: default;">${isSet ? 1 : 0}</div>`;
                    });

                    targetHtml = `<div class="input-display" onclick="game.openNumpad('${row.id}')" id="input-${row.id}">?</div>`;
                } else {
                    // Binary Mode: User toggles bits to match decimal target
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
                const bits = row.el.querySelectorAll('.bit-btn');

                COLUMNS.forEach((val, idx) => {
                    const maskVal = Math.abs(val);
                    const isSet = (row.bitMask & maskVal) !== 0;
                    
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

                // Toggle bit in mask
                row.bitMask ^= val;
                
                // Recalculate signed value
                row.currentVal = this.calculateValue(row.bitMask);

                this.audio.click();
                this.updateRowVisuals(row);

                if (row.currentVal === row.target) {
                    this.solveRow(rowId);
                }
            }

            openNumpad(rowId) {
                if (this.state.paused || !this.state.playing) return;
                this.activeRowId = rowId;
                this.numpadEl.classList.remove('hidden');
                
                // Clear previous input if ?
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
                    if (row.input === '-' || row.input === '') return; // Invalid
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
                } else if (key === '-') {
                    // Only allow minus at start
                    if (row.input.length === 0) row.input = '-';
                    // Toggle minus if already there
                    else if (row.input.startsWith('-')) row.input = row.input.substring(1);
                    else row.input = '-' + row.input;
                } else {
                    if (row.input.length < 5) row.input += key; // Allow space for -128
                    // Optional: Auto check if input matches length of target string
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

                const content = document.getElementById(`content-${row.id}`);
                content.classList.add('solved');

                this.state.score += 100 * this.state.level;
                this.state.linesCleared++;
                this.state.linesForNext--;

                if (this.state.linesForNext <= 0) {
                    this.levelUp();
                }

                setTimeout(() => {
                    if (row.el) row.el.remove();
                    this.rows.splice(rowIdx, 1);
                    this.rows.forEach((r, idx) => {
                        if (r.el) r.el.style.bottom = (idx * ROW_HEIGHT) + 'px';
                    });

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
                this.state.spawnRate = Math.max(3000, 10000 - (this.state.level * 800));
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
                        // Map 1 -> -128 (MSB), 2 -> 64, etc.
                        const idx = parseInt(e.key) - 1;
                        const val = Math.abs(COLUMNS[idx]); // Get unsigned mask value
                        this.toggleBit(row.id, val);
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

    