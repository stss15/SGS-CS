const Engine = (() => {
    const SAVE_KEY = 'blockchain-quest-arcade-save-v2';
    const MAX_LIVES = 3;
    const CANVAS_W = 960;
    const CANVAS_H = 540;

    const state = {
        currentScreen: 'title',
        currentLevelId: null,
        xp: 0,
        coins: 0,
        lives: MAX_LIVES,
        unlockedLevel: 1,
        completedLevels: {}
    };

    const runtime = {
        level: null,
        modeState: null,
        overlay: null,
        pause: false,
        levelStartTs: 0,
        objectiveText: '',
        hintText: '',
        shake: 0,
        invuln: 0,
        challenge: null,
        dialogue: null,
        resultType: null,
        active: false
    };

    const dom = {};
    const keysHeld = new Set();
    const keysJustPressed = new Set();
    const activeTouchPointers = new Map();

    let ctx;
    let rafId = null;
    let lastFrame = 0;
    let audioCtx = null;

    const THEMES = {
        explore: { bgTop: '#0d1f55', bgBottom: '#070f27', floor: '#10275f', wall: '#2d4f9f', wallDark: '#18316d' },
        runner: { bgTop: '#121046', bgBottom: '#05081d', floor: '#1d2f75', wall: '#3951a4', wallDark: '#1d2f75' },
        boss: { bgTop: '#2b1038', bgBottom: '#0b0919', floor: '#46195f', wall: '#70359e', wallDark: '#3f1f59' }
    };

    const LORE_SNIPPETS = {
        1: [
            'Centralised money systems let one authority approve, freeze, or reverse transactions.',
            'Decentralised networks spread trust across many nodes instead of one owner.',
            'Blockchain records are shared and tamper-evident, not hidden in one private database.'
        ],
        2: [
            'Genesis Block is Block #0. It has no parent, so previous hash is 0.',
            'Nonce is the variable miners change until hash target conditions are met.',
            'Changing block data changes the hash, which protects integrity.'
        ],
        4: [
            'Every block stores previous hash. That forms the chain link.',
            'If one block is altered, every following block is invalid until recomputed.',
            'Chain validation checks links and recalculated hashes.'
        ],
        6: [
            'Consensus means most nodes agree on one valid chain state.',
            '51% attack risk appears when attacker controls majority validation power.',
            'More honest distributed nodes increase security and attack cost.'
        ]
    };

    const SPRITES = {
        heroA: [
            '00111100',
            '01222210',
            '12333321',
            '12344321',
            '01222210',
            '05500550',
            '05000050',
            '77000077'
        ],
        heroB: [
            '00111100',
            '01222210',
            '12333321',
            '12344321',
            '01222210',
            '00555000',
            '05000050',
            '77000077'
        ],
        npc: [
            '00111100',
            '01111110',
            '12222221',
            '12333321',
            '12222221',
            '00422400',
            '05500550',
            '70000700'
        ],
        enemy: [
            '00777700',
            '07888870',
            '78899887',
            '78999987',
            '78899887',
            '07777770',
            '07000070',
            '70000007'
        ],
        token: [
            '00044000',
            '00444400',
            '04444440',
            '44455444',
            '44455444',
            '04444440',
            '00444400',
            '00044000'
        ],
        portal: [
            '00666600',
            '06777760',
            '67777776',
            '67711776',
            '67711776',
            '67777776',
            '06777760',
            '00666600'
        ],
        boss: [
            '0007777777000',
            '0076666666670',
            '07699999999670',
            '76999999999967',
            '76995555999967',
            '76999999999967',
            '07699999999670',
            '0076666666670',
            '0007660066700',
            '0077000000770'
        ]
    };

    const PALETTES = {
        hero: {
            '1': '#ffd9a8',
            '2': '#2e63c5',
            '3': '#16d3e0',
            '4': '#f6b73c',
            '5': '#1a2f69',
            '7': '#213f90'
        },
        npc: {
            '1': '#ffe1be',
            '2': '#4c6fcb',
            '3': '#00f0c5',
            '4': '#ffd266',
            '5': '#294179',
            '7': '#16345b'
        },
        enemy: {
            '7': '#731f52',
            '8': '#d9447a',
            '9': '#ff84b5'
        },
        token: {
            '4': '#ffe28a',
            '5': '#f6b73c'
        },
        portal: {
            '1': '#18f2d0',
            '6': '#3a72df',
            '7': '#9be8ff'
        },
        boss: {
            '6': '#a05fd8',
            '7': '#582681',
            '9': '#ff6ba5',
            '5': '#ffd166'
        }
    };

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const lerp = (a, b, t) => a + (b - a) * t;

    const aabb = (a, b) =>
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y;

    const dist = (a, b) => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    function getLoreSnippet(levelId, index) {
        const snippets = LORE_SNIPPETS[levelId] || ['Blockchain security comes from math + distributed validation.'];
        return snippets[index % snippets.length];
    }

    function init() {
        cacheDom();
        ctx = dom.canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        bindUiEvents();
        bindInputEvents();
        loadProgress();

        renderTitleProgress();
        renderLevelSelect();
        setScreen('title');

        lastFrame = performance.now();
        rafId = requestAnimationFrame(gameLoop);
    }

    function cacheDom() {
        dom.titleScreen = document.getElementById('title-screen');
        dom.levelScreen = document.getElementById('level-screen');
        dom.playScreen = document.getElementById('play-screen');

        dom.startBtn = document.getElementById('start-btn');
        dom.continueBtn = document.getElementById('continue-btn');
        dom.backTitleBtn = document.getElementById('back-title-btn');

        dom.titleProgress = document.getElementById('title-progress-text');
        dom.levelStats = document.getElementById('level-stats');
        dom.levelGrid = document.getElementById('level-grid');

        dom.hudLevel = document.getElementById('hud-level');
        dom.hudObjective = document.getElementById('hud-objective');
        dom.hudXP = document.getElementById('hud-xp');
        dom.hudCoins = document.getElementById('hud-coins');
        dom.hudLives = document.getElementById('hud-lives');

        dom.pauseBtn = document.getElementById('pause-btn');
        dom.pausePanel = document.getElementById('pause-panel');
        dom.resumeBtn = document.getElementById('resume-btn');
        dom.restartLevelBtn = document.getElementById('restart-level-btn');
        dom.levelSelectBtn = document.getElementById('level-select-btn');

        dom.stageWrap = document.getElementById('stage-wrap');
        dom.canvas = document.getElementById('game-canvas');
        dom.dialoguePanel = document.getElementById('dialogue-panel');
        dom.dialogueSpeaker = document.getElementById('dialogue-speaker');
        dom.dialogueRole = document.getElementById('dialogue-role');
        dom.dialogueText = document.getElementById('dialogue-text');
        dom.dialogueNextBtn = document.getElementById('dialogue-next-btn');

        dom.challengePanel = document.getElementById('challenge-panel');
        dom.resultPanel = document.getElementById('result-panel');
        dom.toastLayer = document.getElementById('toast-layer');
        dom.touchControls = document.getElementById('touch-controls');

        dom.canvas.width = CANVAS_W;
        dom.canvas.height = CANVAS_H;
    }

    function bindUiEvents() {
        dom.startBtn.addEventListener('click', () => {
            unlockAudio();
            setScreen('levels');
        });

        dom.continueBtn.addEventListener('click', () => {
            unlockAudio();
            setScreen('levels');
            const next = clamp(state.unlockedLevel, 1, Levels.totalLevels);
            startLevel(next);
        });

        dom.backTitleBtn.addEventListener('click', () => setScreen('title'));

        dom.pauseBtn.addEventListener('click', () => togglePause());
        dom.resumeBtn.addEventListener('click', () => togglePause(false));
        dom.restartLevelBtn.addEventListener('click', () => {
            togglePause(false);
            if (state.currentLevelId) startLevel(state.currentLevelId);
        });
        dom.levelSelectBtn.addEventListener('click', () => {
            togglePause(false);
            setScreen('levels');
        });

        dom.dialogueNextBtn.addEventListener('click', advanceDialogue);
    }

    function bindInputEvents() {
        const actionForKey = (rawKey) => {
            const key = rawKey.toLowerCase();
            if (key === 'arrowleft' || key === 'a') return 'left';
            if (key === 'arrowright' || key === 'd') return 'right';
            if (key === 'arrowup' || key === 'w') return 'up';
            if (key === 'arrowdown' || key === 's') return 'down';
            if (key === ' ' || key === 'spacebar') return 'jump';
            if (key === 'e' || key === 'enter') return 'interact';
            if (key === 'escape') return 'pause';
            return null;
        };

        document.addEventListener('keydown', (event) => {
            const action = actionForKey(event.key);
            if (!action) return;

            unlockAudio();

            if (action === 'pause' && state.currentScreen === 'play') {
                event.preventDefault();
                togglePause();
                return;
            }

            if (!keysHeld.has(action)) keysJustPressed.add(action);
            keysHeld.add(action);

            if (state.currentScreen === 'play' && runtime.overlay === 'dialogue' && (action === 'interact' || action === 'jump')) {
                event.preventDefault();
                advanceDialogue();
                return;
            }

            if (['left', 'right', 'up', 'down', 'jump', 'interact'].includes(action)) {
                event.preventDefault();
            }
        });

        document.addEventListener('keyup', (event) => {
            const action = actionForKey(event.key);
            if (!action) return;
            keysHeld.delete(action);
        });

        const touchButtons = dom.touchControls.querySelectorAll('[data-action]');
        touchButtons.forEach((btn) => {
            btn.addEventListener('pointerdown', (event) => {
                unlockAudio();
                event.preventDefault();
                const action = btn.dataset.action;
                keysHeld.add(action);
                keysJustPressed.add(action);
                activeTouchPointers.set(event.pointerId, action);
                btn.classList.add('active');
            });

            btn.addEventListener('pointerup', (event) => {
                event.preventDefault();
                releaseTouchAction(event.pointerId, btn);
            });

            btn.addEventListener('pointercancel', (event) => {
                releaseTouchAction(event.pointerId, btn);
            });

            btn.addEventListener('pointerleave', (event) => {
                if (event.pressure === 0) {
                    releaseTouchAction(event.pointerId, btn);
                }
            });
        });
    }

    function releaseTouchAction(pointerId, buttonEl) {
        const action = activeTouchPointers.get(pointerId);
        if (!action) return;
        activeTouchPointers.delete(pointerId);
        keysHeld.delete(action);
        if (buttonEl) buttonEl.classList.remove('active');
    }

    function loadProgress() {
        try {
            const raw = localStorage.getItem(SAVE_KEY);
            if (!raw) return;
            const data = JSON.parse(raw);
            state.xp = Number(data.xp) || 0;
            state.coins = Number(data.coins) || 0;
            state.unlockedLevel = clamp(Number(data.unlockedLevel) || 1, 1, Levels.totalLevels);
            state.completedLevels = data.completedLevels && typeof data.completedLevels === 'object' ? data.completedLevels : {};
        } catch (error) {
            console.warn('Could not load game save', error);
        }
    }

    function saveProgress() {
        const payload = {
            xp: state.xp,
            coins: state.coins,
            unlockedLevel: state.unlockedLevel,
            completedLevels: state.completedLevels
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    }

    function renderTitleProgress() {
        const clears = Object.keys(state.completedLevels).length;
        if (clears === 0) {
            dom.titleProgress.textContent = 'Fresh save - 8 missions waiting';
            dom.continueBtn.classList.add('hidden');
        } else {
            dom.titleProgress.textContent = `Unlocked Lv ${state.unlockedLevel} | ${state.xp} XP | ${clears}/8 cleared`;
            dom.continueBtn.classList.remove('hidden');
        }
    }

    function renderLevelSelect() {
        const levels = Levels.getAllLevels();
        dom.levelGrid.innerHTML = levels
            .map((level) => {
                const unlocked = level.id <= state.unlockedLevel;
                const completion = state.completedLevels[level.id];
                const stars = completion ? completion.stars : 0;

                return `
                <article class="level-card ${unlocked ? '' : 'locked'}" data-level-id="${level.id}">
                    <div class="id">LEVEL ${level.id} · ${level.mode.toUpperCase()}</div>
                    <div class="name">${level.icon} ${level.title}</div>
                    <div class="desc">${level.desc}</div>
                    <div class="meta">
                        <span>${level.concept}</span>
                        <span>${stars ? `⭐${stars}` : unlocked ? 'READY' : 'LOCKED'}</span>
                    </div>
                </article>
            `;
            })
            .join('');

        dom.levelStats.textContent = `XP ${state.xp} · Coins ${state.coins} · Clear ${Object.keys(state.completedLevels).length}/8`;

        dom.levelGrid.querySelectorAll('.level-card').forEach((card) => {
            card.addEventListener('click', () => {
                const id = Number(card.dataset.levelId);
                if (!id || id > state.unlockedLevel) {
                    pushToast('Locked', 'Beat the previous mission first.', 'warn');
                    return;
                }
                startLevel(id);
            });
        });
    }

    function setScreen(screen) {
        state.currentScreen = screen;
        dom.titleScreen.classList.remove('active');
        dom.levelScreen.classList.remove('active');
        dom.playScreen.classList.remove('active');

        if (screen === 'title') dom.titleScreen.classList.add('active');
        if (screen === 'levels') dom.levelScreen.classList.add('active');
        if (screen === 'play') dom.playScreen.classList.add('active');

        if (screen !== 'play') {
            runtime.overlay = null;
            runtime.active = false;
            hideOverlay(dom.dialoguePanel);
            hideOverlay(dom.challengePanel);
            hideOverlay(dom.resultPanel);
            hideOverlay(dom.pausePanel);
        }

        if (screen === 'levels') {
            renderLevelSelect();
        }
    }

    function startLevel(levelId) {
        const level = Levels.getLevel(levelId);
        if (!level) return;

        state.currentLevelId = level.id;
        state.lives = MAX_LIVES;

        runtime.level = level;
        runtime.modeState = createModeState(level);
        runtime.pause = false;
        runtime.overlay = null;
        runtime.resultType = null;
        runtime.challenge = null;
        runtime.dialogue = null;
        runtime.invuln = 0;
        runtime.shake = 0;
        runtime.levelStartTs = performance.now();
        runtime.active = true;

        setScreen('play');
        clearToasts();
        updateHud();
        setObjective(getBaseObjective(level));

        const introLines = Characters.getDialogue(level.id, 'intro');
        if (introLines.length > 0) {
            openDialogue(introLines, () => {
                pushToast('Mission Live', 'Move fast. Learn by playing.', 'good');
            });
        }
    }

    function createModeState(level) {
        if (level.mode === 'explore') return setupExplore(level);
        if (level.mode === 'runner') return setupRunner(level);
        return setupBoss(level);
    }

    function setupExplore(level) {
        const tile = 30;
        const rows = level.map.length;
        const cols = level.map[0].length;
        const mapWidth = cols * tile;
        const mapHeight = rows * tile;
        const offsetX = Math.floor((CANVAS_W - mapWidth) / 2);
        const offsetY = Math.floor((CANVAS_H - mapHeight) / 2);

        const grid = level.map.map((row) => row.split(''));
        const collectibles = [];
        const hazards = [];
        const npcs = [];
        const enemies = [];
        const loreNodes = [];
        let start = { x: offsetX + tile * 1.5, y: offsetY + tile * 1.5 };
        let portal = { x: offsetX + (cols - 2) * tile + tile / 2, y: offsetY + tile * 1.5, open: false };

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = grid[y][x];
                const worldX = offsetX + x * tile;
                const worldY = offsetY + y * tile;

                if (cell === 'P') {
                    start = { x: worldX + tile / 2, y: worldY + tile / 2 };
                    grid[y][x] = '.';
                } else if (cell === 'C') {
                    collectibles.push({
                        x: worldX + tile / 2,
                        y: worldY + tile / 2,
                        size: 12,
                        active: true,
                        pulse: Math.random() * Math.PI * 2
                    });
                    grid[y][x] = '.';
                } else if (cell === 'X') {
                    hazards.push({ x: worldX, y: worldY, w: tile, h: tile, phase: Math.random() * Math.PI * 2 });
                } else if (cell === 'N') {
                    npcs.push({ x: worldX + 4, y: worldY + 4, w: tile - 8, h: tile - 8, id: 'satoshi' });
                    grid[y][x] = '.';
                } else if (cell === 'L') {
                    loreNodes.push({
                        x: worldX + tile / 2,
                        y: worldY + tile / 2,
                        active: true,
                        pulse: Math.random() * Math.PI * 2
                    });
                    grid[y][x] = '.';
                } else if (cell === 'M') {
                    enemies.push({
                        x: worldX + 4,
                        y: worldY + 4,
                        w: tile - 8,
                        h: tile - 8,
                        dir: Math.random() > 0.5 ? 1 : -1,
                        speed: 58 + Math.random() * 40,
                        minX: worldX - tile * 2,
                        maxX: worldX + tile * 2
                    });
                    grid[y][x] = '.';
                } else if (cell === 'E') {
                    portal = { x: worldX + tile / 2, y: worldY + tile / 2, open: false };
                    grid[y][x] = '.';
                }
            }
        }

        return {
            mode: 'explore',
            theme: THEMES.explore,
            tile,
            rows,
            cols,
            grid,
            offsetX,
            offsetY,
            mapWidth,
            mapHeight,
            player: {
                x: start.x - 11,
                y: start.y - 11,
                w: 22,
                h: 22,
                speed: 165,
                facing: 1,
                anim: 0
            },
            collectibles,
            hazards,
            npcs,
            loreNodes,
            enemies,
            collectedCount: 0,
            requiredCollectibles: level.requiredCollectibles,
            challengeDone: false,
            portal,
            sparkles: [],
            requiredLore: loreNodes.length > 0 ? 1 : 0,
            loreRead: 0,
            interactCooldown: 0
        };
    }

    function setupRunner(level) {
        const groundY = CANVAS_H - 86;
        return {
            mode: 'runner',
            theme: THEMES.runner,
            player: {
                x: 168,
                y: groundY - 30,
                w: 30,
                h: 30,
                vy: 0,
                onGround: true,
                airJumpsLeft: level.doubleJump ? 1 : 0,
                anim: 0
            },
            groundY,
            distance: 0,
            speed: level.speed,
            obstacleTimer: 0.55,
            tokenTimer: 0.45,
            obstacles: [],
            tokens: [],
            particles: [],
            collectedTokens: 0,
            requiredTokens: level.requiredTokens,
            goal: level.distanceGoal,
            jumpForce: level.jumpForce,
            gravity: level.gravity,
            tokenLabel: level.tokenLabel,
            doubleJump: Boolean(level.doubleJump)
        };
    }

    function setupBoss(level) {
        const player = { x: CANVAS_W / 2 - 14, y: CANVAS_H - 88, w: 28, h: 28, speed: 212, shootCd: 0, anim: 0 };
        const boss = {
            x: CANVAS_W / 2 - 56,
            y: 74,
            w: 112,
            h: 68,
            hp: level.bossHp,
            maxHp: level.bossHp,
            dir: 1,
            speed: 96,
            fireCd: 1.2
        };

        return {
            mode: 'boss',
            theme: THEMES.boss,
            player,
            boss,
            shots: [],
            enemyShots: [],
            sparks: []
        };
    }

    function getBaseObjective(level) {
        if (level.mode === 'explore') {
            const hasLoreTerminals = Array.isArray(level.map) && level.map.some((row) => row.includes('L'));
            if (hasLoreTerminals) {
                return `Collect ${level.requiredCollectibles} shards, scan 1 terminal, then clear challenge.`;
            }
            return `Collect ${level.requiredCollectibles} shards, then clear challenge.`;
        }
        if (level.mode === 'runner') {
            return `Reach ${level.distanceGoal}m and collect ${level.requiredTokens} ${level.tokenLabel}.`;
        }
        return 'Defeat Eve Core with hash pulses.';
    }

    function setObjective(text) {
        runtime.objectiveText = text;
        updateHud();
    }

    function updateHud() {
        const level = runtime.level;
        dom.hudLevel.textContent = level ? `Lv ${level.id}: ${level.title}` : 'No Level';
        dom.hudObjective.textContent = runtime.hintText || runtime.objectiveText || '';
        dom.hudXP.textContent = String(Math.floor(state.xp));
        dom.hudCoins.textContent = String(Math.floor(state.coins));
        dom.hudLives.textContent = `${state.lives}`;
    }

    function addXP(amount) {
        state.xp += amount;
        state.coins += Math.max(1, Math.floor(amount / 8));
        updateHud();
    }

    function consumePressed(action) {
        if (!keysJustPressed.has(action)) return false;
        keysJustPressed.delete(action);
        return true;
    }

    function isHeld(action) {
        return keysHeld.has(action);
    }

    function gameLoop(ts) {
        const dt = clamp((ts - lastFrame) / 1000, 0, 0.033);
        lastFrame = ts;

        if (state.currentScreen === 'play' && runtime.level) {
            if (!runtime.pause && runtime.overlay === null) {
                updateGame(dt);
            } else if (runtime.overlay === 'challenge' && runtime.challenge) {
                updateChallenge(dt);
            }
            renderGame();
        }

        keysJustPressed.clear();
        rafId = requestAnimationFrame(gameLoop);
    }

    function updateGame(dt) {
        runtime.invuln = Math.max(0, runtime.invuln - dt);
        runtime.shake = Math.max(0, runtime.shake - dt);

        if (runtime.modeState.mode === 'explore') updateExplore(dt);
        if (runtime.modeState.mode === 'runner') updateRunner(dt);
        if (runtime.modeState.mode === 'boss') updateBoss(dt);
    }

    function updateExplore(dt) {
        const mode = runtime.modeState;
        const player = mode.player;
        runtime.hintText = '';
        mode.interactCooldown = Math.max(0, mode.interactCooldown - dt);

        const pressedInteract = consumePressed('interact') || consumePressed('jump');
        const heldInteract = isHeld('interact') || isHeld('jump');
        const interactAttempt = pressedInteract || (heldInteract && mode.interactCooldown <= 0);
        if (interactAttempt) mode.interactCooldown = 0.2;

        let axisX = 0;
        let axisY = 0;
        if (isHeld('left')) axisX -= 1;
        if (isHeld('right')) axisX += 1;
        if (isHeld('up')) axisY -= 1;
        if (isHeld('down')) axisY += 1;

        if (axisX !== 0 && axisY !== 0) {
            const inv = 1 / Math.sqrt(2);
            axisX *= inv;
            axisY *= inv;
        }

        const stepX = axisX * player.speed * dt;
        const stepY = axisY * player.speed * dt;

        if (stepX !== 0) {
            const nx = player.x + stepX;
            if (!collidesWall(mode, nx, player.y, player.w, player.h)) {
                player.x = nx;
            }
            player.facing = stepX < 0 ? -1 : 1;
            player.anim += Math.abs(stepX) * 0.2;
        }

        if (stepY !== 0) {
            const ny = player.y + stepY;
            if (!collidesWall(mode, player.x, ny, player.w, player.h)) {
                player.y = ny;
            }
            player.anim += Math.abs(stepY) * 0.2;
        }

        const centerPlayer = { x: player.x + player.w / 2, y: player.y + player.h / 2 };

        for (const hazard of mode.hazards) {
            hazard.phase += dt * 4;
            if (aabb(player, hazard)) {
                triggerHit('Corrupted zone!');
                break;
            }
        }

        for (const enemy of mode.enemies) {
            enemy.x += enemy.dir * enemy.speed * dt;
            if (enemy.x < enemy.minX || enemy.x > enemy.maxX || collidesWall(mode, enemy.x, enemy.y, enemy.w, enemy.h)) {
                enemy.dir *= -1;
            }
            if (aabb(player, enemy)) {
                triggerHit('Eve drone hit!');
            }
        }

        for (const token of mode.collectibles) {
            if (!token.active) continue;
            token.pulse += dt * 6;
            const centerToken = { x: token.x, y: token.y };
            if (dist(centerPlayer, centerToken) <= 18) {
                token.active = false;
                mode.collectedCount += 1;
                mode.sparkles.push({ x: token.x, y: token.y, t: 0.5 });
                addXP(18);
                playTone(740, 0.05);
                pushToast('Data Shard', `${mode.collectedCount}/${mode.requiredCollectibles} collected`, 'good');
            }
        }

        mode.sparkles = mode.sparkles
            .map((spark) => ({ ...spark, t: spark.t - dt }))
            .filter((spark) => spark.t > 0);

        for (const node of mode.loreNodes) {
            node.pulse += dt * 5;
        }

        const nearNpc = mode.npcs.find((npc) => dist({ x: npc.x + npc.w / 2, y: npc.y + npc.h / 2 }, centerPlayer) < 64);
        const portalDistance = dist(mode.portal, centerPlayer);
        const nearPortal = portalDistance < 56;
        const touchingPortal = portalDistance < 24;
        const nearLore = mode.loreNodes.find((node) => node.active && dist({ x: node.x, y: node.y }, centerPlayer) < 46);
        const shardsRemaining = Math.max(0, mode.requiredCollectibles - mode.collectedCount);
        const loreRemaining = Math.max(0, mode.requiredLore - mode.loreRead);
        let interactionUsed = false;

        const readLoreNode = () => {
            if (!nearLore || !nearLore.active || !interactAttempt || interactionUsed) return false;
            nearLore.active = false;
            mode.loreRead += 1;
            interactionUsed = true;
            addXP(16);
            playTone(690, 0.05);
            pushToast('Ledger Intel', getLoreSnippet(runtime.level.id, mode.loreRead - 1), 'good');
            return true;
        };

        if (readLoreNode()) {
            runtime.hintText = 'Intel decoded. Keep collecting shards.';
        }

        if (!mode.challengeDone) {
            if (!runtime.hintText) {
                if (shardsRemaining > 0) {
                    runtime.hintText = `Collect ${shardsRemaining} shard(s).`;
                } else if (loreRemaining > 0) {
                    runtime.hintText = `Scan ${loreRemaining} data terminal(s).`;
                } else {
                    runtime.hintText = 'All shards synced. Talk to your mentor.';
                }
            }

            if (nearLore && nearLore.active) {
                runtime.hintText = 'Press ACT at terminal to decode blockchain intel.';
            }

            if (nearNpc) {
                const mentor = Characters.getCharacter(nearNpc.id).name;
                if (shardsRemaining > 0) {
                    runtime.hintText = `${mentor}: bring ${shardsRemaining} more shard(s).`;
                    if (interactAttempt && !interactionUsed) {
                        pushToast(mentor, `Need ${shardsRemaining} shard(s) before challenge.`, 'warn');
                        interactionUsed = true;
                    }
                } else if (loreRemaining > 0) {
                    runtime.hintText = `${mentor}: scan ${loreRemaining} terminal(s) first.`;
                    if (interactAttempt && !interactionUsed) {
                        pushToast(mentor, `Scan ${loreRemaining} terminal(s) to unlock theory tips.`, 'warn');
                        interactionUsed = true;
                    }
                } else {
                    runtime.hintText = 'Press ACT to start blitz challenge.';
                    if (interactAttempt && !interactionUsed) {
                        interactionUsed = true;
                        openChallenge(runtime.level.challengeId, (passed) => {
                            if (passed) {
                                mode.challengeDone = true;
                                mode.portal.open = true;
                                addXP(36);
                                pushToast('Portal Online', 'Exit gate unlocked.', 'good');
                            }
                        });
                    }
                }
            }
        } else {
            if (nearLore && nearLore.active) {
                runtime.hintText = 'Optional: ACT at terminal for bonus intel + XP.';
            } else if (nearPortal) {
                runtime.hintText = 'Press ACT at portal to finish mission.';
            } else {
                runtime.hintText = 'Portal active. Reach the exit.';
            }

            if ((nearPortal && interactAttempt && !interactionUsed) || touchingPortal) {
                completeLevel();
                return;
            }
        }

        updateHud();
    }

    function collidesWall(mode, x, y, w, h) {
        const points = [
            [x + 3, y + 3],
            [x + w - 3, y + 3],
            [x + 3, y + h - 3],
            [x + w - 3, y + h - 3]
        ];

        for (const [px, py] of points) {
            const col = Math.floor((px - mode.offsetX) / mode.tile);
            const row = Math.floor((py - mode.offsetY) / mode.tile);

            if (row < 0 || col < 0 || row >= mode.rows || col >= mode.cols) return true;
            if (mode.grid[row][col] === '#') return true;
        }

        return false;
    }

    function updateRunner(dt) {
        const mode = runtime.modeState;
        const player = mode.player;

        mode.speed = runtime.level.speed + Math.min(95, mode.distance / 36);
        mode.distance += mode.speed * dt;

        if (consumePressed('jump') || consumePressed('up')) {
            if (player.onGround) {
                player.vy = -mode.jumpForce;
                player.onGround = false;
                player.airJumpsLeft = mode.doubleJump ? 1 : 0;
                playTone(440, 0.06);
            } else if (mode.doubleJump && player.airJumpsLeft > 0) {
                player.vy = -mode.jumpForce * 0.9;
                player.airJumpsLeft -= 1;
                playTone(550, 0.06);
            }
        }

        player.vy += mode.gravity * dt;
        player.y += player.vy * dt;

        if (player.y + player.h >= mode.groundY) {
            player.y = mode.groundY - player.h;
            player.vy = 0;
            player.onGround = true;
            player.airJumpsLeft = mode.doubleJump ? 1 : 0;
        }

        player.anim += dt * (player.onGround ? 8 : 3);

        mode.obstacleTimer -= dt;
        if (mode.obstacleTimer <= 0) {
            spawnRunnerObstacle(mode);
            mode.obstacleTimer = 0.55 + Math.random() * 0.55;
        }

        mode.tokenTimer -= dt;
        if (mode.tokenTimer <= 0) {
            spawnRunnerToken(mode);
            mode.tokenTimer = 0.38 + Math.random() * 0.42;
        }

        for (const obstacle of mode.obstacles) {
            obstacle.x -= mode.speed * dt;
            if (aabb(player, obstacle)) {
                triggerHit('Corrupted block collision!');
            }
        }

        for (const token of mode.tokens) {
            token.x -= mode.speed * dt;
            token.pulse += dt * 8;
            if (!token.got && aabb(player, token)) {
                token.got = true;
                mode.collectedTokens += 1;
                addXP(14);
                playTone(790, 0.05);
                mode.particles.push({ x: token.x + token.w / 2, y: token.y + token.h / 2, t: 0.35 });
            }
        }

        mode.obstacles = mode.obstacles.filter((obj) => obj.x + obj.w > -40);
        mode.tokens = mode.tokens.filter((obj) => obj.x + obj.w > -40 && !obj.got);
        mode.particles = mode.particles
            .map((particle) => ({ ...particle, t: particle.t - dt }))
            .filter((particle) => particle.t > 0);

        runtime.hintText = `${Math.floor(mode.distance)}m / ${mode.goal}m · ${mode.collectedTokens}/${mode.requiredTokens} ${mode.tokenLabel}`;
        updateHud();

        if (mode.distance >= mode.goal && mode.collectedTokens >= mode.requiredTokens) {
            completeLevel();
        }
    }

    function spawnRunnerObstacle(mode) {
        const height = 34 + Math.random() * 95;
        const width = 26 + Math.random() * 40;
        mode.obstacles.push({
            x: CANVAS_W + 18,
            y: mode.groundY - height,
            w: width,
            h: height
        });

        if (Math.random() > 0.76) {
            mode.obstacles.push({
                x: CANVAS_W + 18 + 180,
                y: mode.groundY - (26 + Math.random() * 48),
                w: 22 + Math.random() * 24,
                h: 26 + Math.random() * 48
            });
        }
    }

    function spawnRunnerToken(mode) {
        const lane = Math.random();
        const y = lane < 0.33 ? mode.groundY - 118 : lane < 0.66 ? mode.groundY - 176 : mode.groundY - 72;
        mode.tokens.push({
            x: CANVAS_W + 10,
            y,
            w: 18,
            h: 18,
            got: false,
            pulse: Math.random() * Math.PI
        });
    }

    function updateBoss(dt) {
        const mode = runtime.modeState;
        const player = mode.player;
        const boss = mode.boss;

        let axisX = 0;
        let axisY = 0;
        if (isHeld('left')) axisX -= 1;
        if (isHeld('right')) axisX += 1;
        if (isHeld('up')) axisY -= 1;
        if (isHeld('down')) axisY += 1;

        if (axisX !== 0 && axisY !== 0) {
            const inv = 1 / Math.sqrt(2);
            axisX *= inv;
            axisY *= inv;
        }

        player.x = clamp(player.x + axisX * player.speed * dt, 20, CANVAS_W - player.w - 20);
        player.y = clamp(player.y + axisY * player.speed * dt, CANVAS_H * 0.45, CANVAS_H - player.h - 16);
        player.anim += dt * 7;

        player.shootCd = Math.max(0, player.shootCd - dt);
        if ((consumePressed('jump') || consumePressed('interact')) && player.shootCd <= 0) {
            mode.shots.push({ x: player.x + player.w / 2 - 3, y: player.y - 8, w: 6, h: 14, vy: -540 });
            player.shootCd = 0.18;
            playTone(930, 0.04);
        }

        boss.x += boss.dir * boss.speed * dt;
        if (boss.x < 40) {
            boss.x = 40;
            boss.dir = 1;
        }
        if (boss.x + boss.w > CANVAS_W - 40) {
            boss.x = CANVAS_W - 40 - boss.w;
            boss.dir = -1;
        }

        boss.fireCd -= dt;
        if (boss.fireCd <= 0) {
            fireBossVolley(mode);
            boss.fireCd = 0.65 + Math.random() * 0.45;
        }

        for (const shot of mode.shots) {
            shot.y += shot.vy * dt;
            if (aabb(shot, boss)) {
                shot.dead = true;
                boss.hp -= 1;
                addXP(9);
                mode.sparks.push({ x: shot.x, y: shot.y, t: 0.25 });
                playTone(620, 0.05, 'sawtooth', 0.03);
            }
        }

        for (const shot of mode.enemyShots) {
            shot.x += shot.vx * dt;
            shot.y += shot.vy * dt;
            if (aabb(shot, player)) {
                shot.dead = true;
                triggerHit('Corruption pulse hit!');
            }
        }

        mode.shots = mode.shots.filter((shot) => !shot.dead && shot.y > -20);
        mode.enemyShots = mode.enemyShots.filter((shot) => !shot.dead && shot.y < CANVAS_H + 25 && shot.x > -25 && shot.x < CANVAS_W + 25);
        mode.sparks = mode.sparks
            .map((spark) => ({ ...spark, t: spark.t - dt }))
            .filter((spark) => spark.t > 0);

        runtime.hintText = `Eve Core HP ${boss.hp}/${boss.maxHp}`;
        updateHud();

        if (boss.hp <= 0) {
            completeLevel();
        }
    }

    function fireBossVolley(mode) {
        const boss = mode.boss;
        const player = mode.player;
        const originX = boss.x + boss.w / 2;
        const originY = boss.y + boss.h - 8;

        for (let i = 0; i < 3; i++) {
            const spread = (i - 1) * 0.26;
            const targetX = player.x + player.w / 2;
            const targetY = player.y + player.h / 2;
            const angle = Math.atan2(targetY - originY, targetX - originX) + spread;
            const speed = 165 + Math.random() * 55;

            mode.enemyShots.push({
                x: originX,
                y: originY,
                w: 11,
                h: 11,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed
            });
        }

        playTone(210, 0.07, 'square', 0.035);
    }

    function triggerHit(reason) {
        if (runtime.invuln > 0 || runtime.overlay !== null) return;

        state.lives -= 1;
        runtime.invuln = 1.1;
        runtime.shake = 0.33;
        updateHud();

        playTone(150, 0.13, 'sawtooth', 0.045);
        pushToast('Damage', reason, 'bad');

        if (state.lives <= 0) {
            showGameOver();
        }
    }

    function openDialogue(lines, onFinish) {
        runtime.overlay = 'dialogue';
        runtime.dialogue = {
            lines,
            index: 0,
            onFinish
        };
        renderDialogueLine();
        showOverlay(dom.dialoguePanel);
    }

    function renderDialogueLine() {
        if (!runtime.dialogue) return;
        const entry = runtime.dialogue.lines[runtime.dialogue.index];
        if (!entry) {
            closeDialogue();
            return;
        }

        const character = Characters.getCharacter(entry.speaker);
        dom.dialogueSpeaker.textContent = `${character.avatar} ${character.name}`;
        dom.dialogueSpeaker.style.color = character.color;
        dom.dialogueRole.textContent = character.role;
        dom.dialogueText.textContent = entry.text;
        dom.dialogueNextBtn.textContent = runtime.dialogue.index >= runtime.dialogue.lines.length - 1 ? 'Start Mission' : 'Next';
    }

    function advanceDialogue() {
        if (runtime.overlay !== 'dialogue' || !runtime.dialogue) return;
        runtime.dialogue.index += 1;
        renderDialogueLine();
    }

    function closeDialogue() {
        hideOverlay(dom.dialoguePanel);
        const done = runtime.dialogue && runtime.dialogue.onFinish;
        runtime.dialogue = null;
        runtime.overlay = null;
        if (typeof done === 'function') done();
    }

    function openChallenge(challengeId, callback) {
        const challenge = MiniGames.getChallenge(challengeId);
        if (!challenge) {
            callback(true);
            return;
        }

        runtime.overlay = 'challenge';
        runtime.challenge = {
            data: challenge,
            callback,
            index: 0,
            score: 0,
            combo: 0,
            timeLeft: challenge.timePerQuestion,
            locked: false,
            timerEl: null
        };

        renderChallengeQuestion();
        showOverlay(dom.challengePanel);
    }

    function updateChallenge(dt) {
        if (!runtime.challenge || runtime.challenge.locked) return;
        runtime.challenge.timeLeft -= dt;
        const ratio = clamp(runtime.challenge.timeLeft / runtime.challenge.data.timePerQuestion, 0, 1);
        if (runtime.challenge.timerEl) {
            runtime.challenge.timerEl.style.transform = `scaleX(${ratio})`;
        }

        if (runtime.challenge.timeLeft <= 0) {
            submitChallengeAnswer(-1);
        }
    }

    function renderChallengeQuestion() {
        const challenge = runtime.challenge;
        if (!challenge) return;

        const item = challenge.data.questions[challenge.index];
        if (!item) {
            finishChallenge();
            return;
        }

        const ratio = clamp(challenge.timeLeft / challenge.data.timePerQuestion, 0, 1);

        dom.challengePanel.innerHTML = `
            <h3>${challenge.data.title}</h3>
            <p class="challenge-sub">${challenge.data.subtitle}</p>
            <div class="challenge-timer-wrap"><div class="challenge-timer" style="transform:scaleX(${ratio})"></div></div>
            <div class="challenge-q">${item.question}</div>
            <div class="challenge-options">
                ${item.options
                    .map((option, optionIndex) => `<button class="challenge-option" data-answer="${optionIndex}">${option}</button>`)
                    .join('')}
            </div>
            <div class="challenge-feedback" id="challenge-feedback"></div>
            <div class="challenge-score">Round ${challenge.index + 1}/${challenge.data.questions.length} · Score ${challenge.score}</div>
        `;

        challenge.timerEl = dom.challengePanel.querySelector('.challenge-timer');
        dom.challengePanel.querySelectorAll('.challenge-option').forEach((button) => {
            button.addEventListener('click', () => {
                submitChallengeAnswer(Number(button.dataset.answer));
            });
        });
    }

    function submitChallengeAnswer(answerIndex) {
        const challenge = runtime.challenge;
        if (!challenge || challenge.locked) return;

        challenge.locked = true;

        const question = challenge.data.questions[challenge.index];
        const feedbackEl = dom.challengePanel.querySelector('#challenge-feedback');
        const buttons = Array.from(dom.challengePanel.querySelectorAll('.challenge-option'));

        const correct = answerIndex === question.answer;
        const timeout = answerIndex < 0;

        buttons.forEach((button, index) => {
            if (index === question.answer) button.classList.add('correct');
            if (!timeout && index === answerIndex && answerIndex !== question.answer) button.classList.add('wrong');
            button.disabled = true;
        });

        if (correct) {
            challenge.score += 1;
            challenge.combo += 1;
            const gain = 18 + challenge.combo * 4;
            addXP(gain);
            playTone(820, 0.05);
            feedbackEl.textContent = `Perfect! +${gain} XP · ${question.tip}`;
            feedbackEl.style.color = '#32e58a';
        } else {
            challenge.combo = 0;
            triggerHit(timeout ? 'Time out in challenge.' : 'Wrong blockchain call.');
            feedbackEl.textContent = `Miss. ${question.tip}`;
            feedbackEl.style.color = '#ff7d7d';
        }

        setTimeout(() => {
            if (!runtime.challenge) return;
            challenge.index += 1;
            challenge.timeLeft = challenge.data.timePerQuestion;
            challenge.locked = false;
            renderChallengeQuestion();
        }, 700);
    }

    function finishChallenge() {
        const challenge = runtime.challenge;
        if (!challenge) return;

        const total = challenge.data.questions.length;
        const passRatio = challenge.data.passRatio || 0.7;
        const needed = Math.ceil(total * passRatio);
        const pass = challenge.score >= needed;

        if (pass) {
            const done = challenge.callback;
            runtime.challenge = null;
            runtime.overlay = null;
            hideOverlay(dom.challengePanel);
            pushToast('Challenge Clear', `${needed}/${total} target beaten.`, 'good');
            if (typeof done === 'function') done(true);
            return;
        }

        challenge.locked = true;
        dom.challengePanel.innerHTML = `
            <h3>Challenge Failed</h3>
            <p class="challenge-sub">Score ${challenge.score}/${total}. Need ${needed} to pass.</p>
            <div class="result-actions">
                <button class="arcade-btn primary" id="retry-challenge-btn">Retry</button>
            </div>
        `;

        const retryButton = dom.challengePanel.querySelector('#retry-challenge-btn');
        retryButton.addEventListener('click', () => {
            if (!runtime.challenge) return;
            runtime.challenge.index = 0;
            runtime.challenge.score = 0;
            runtime.challenge.combo = 0;
            runtime.challenge.timeLeft = runtime.challenge.data.timePerQuestion;
            runtime.challenge.locked = false;
            renderChallengeQuestion();
        });
    }

    function completeLevel() {
        if (!runtime.level || runtime.overlay === 'result') return;

        const elapsed = (performance.now() - runtime.levelStartTs) / 1000;
        const stars = clamp(state.lives, 1, MAX_LIVES);
        const completion = state.completedLevels[runtime.level.id];
        const bonusXP = stars * 42;
        addXP(bonusXP);
        state.coins += stars * 9;

        state.completedLevels[runtime.level.id] = {
            stars: Math.max(stars, completion ? completion.stars : 0),
            bestTime: completion ? Math.min(completion.bestTime, elapsed) : elapsed
        };

        if (runtime.level.id < Levels.totalLevels) {
            state.unlockedLevel = Math.max(state.unlockedLevel, runtime.level.id + 1);
        }

        saveProgress();
        renderTitleProgress();

        const outro = Characters.getDialogue(runtime.level.id, 'outro');
        if (outro.length > 0) {
            openDialogue(outro, () => showLevelResult(elapsed, stars, true));
        } else {
            showLevelResult(elapsed, stars, true);
        }
    }

    function showGameOver() {
        showLevelResult((performance.now() - runtime.levelStartTs) / 1000, 0, false);
    }

    function showLevelResult(elapsed, stars, success) {
        runtime.overlay = 'result';
        runtime.resultType = success ? 'success' : 'fail';
        showOverlay(dom.resultPanel);

        const nextLevel = state.currentLevelId < Levels.totalLevels ? state.currentLevelId + 1 : null;

        if (success) {
            playTone(670, 0.08, 'square', 0.04);
            setTimeout(() => playTone(880, 0.09, 'square', 0.03), 90);

            dom.resultPanel.innerHTML = `
                <h3>Mission Clear</h3>
                <div class="stars">${'⭐'.repeat(stars)}${'☆'.repeat(MAX_LIVES - stars)}</div>
                <div class="stats">
                    <div class="stat-box"><strong>${Math.floor(elapsed)}s</strong><span>Time</span></div>
                    <div class="stat-box"><strong>${stars * 42}</strong><span>Bonus XP</span></div>
                    <div class="stat-box"><strong>${stars * 9}</strong><span>Bonus Coins</span></div>
                </div>
                <div class="result-actions">
                    ${nextLevel ? '<button class="arcade-btn primary" id="next-level-btn">Next Mission</button>' : '<button class="arcade-btn primary" id="to-select-btn">Mission Select</button>'}
                    <button class="arcade-btn secondary" id="to-select-btn-2">Mission Select</button>
                </div>
            `;

            const nextBtn = dom.resultPanel.querySelector('#next-level-btn');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    hideOverlay(dom.resultPanel);
                    runtime.overlay = null;
                    startLevel(nextLevel);
                });
            }
        } else {
            playTone(180, 0.15, 'sawtooth', 0.05);
            dom.resultPanel.innerHTML = `
                <h3>System Breach</h3>
                <p class="challenge-sub">Eve broke through this run. Jump back in and tighten your chain.</p>
                <div class="result-actions">
                    <button class="arcade-btn primary" id="retry-mission-btn">Retry Mission</button>
                    <button class="arcade-btn secondary" id="to-select-btn">Mission Select</button>
                </div>
            `;

            const retryBtn = dom.resultPanel.querySelector('#retry-mission-btn');
            retryBtn.addEventListener('click', () => {
                hideOverlay(dom.resultPanel);
                runtime.overlay = null;
                startLevel(state.currentLevelId);
            });
        }

        const toSelectBtn = dom.resultPanel.querySelector('#to-select-btn');
        if (toSelectBtn) {
            toSelectBtn.addEventListener('click', () => {
                hideOverlay(dom.resultPanel);
                runtime.overlay = null;
                setScreen('levels');
            });
        }

        const toSelectBtn2 = dom.resultPanel.querySelector('#to-select-btn-2');
        if (toSelectBtn2) {
            toSelectBtn2.addEventListener('click', () => {
                hideOverlay(dom.resultPanel);
                runtime.overlay = null;
                setScreen('levels');
            });
        }
    }

    function togglePause(force) {
        if (state.currentScreen !== 'play' || runtime.overlay === 'dialogue' || runtime.overlay === 'challenge') return;

        const nextState = typeof force === 'boolean' ? force : !runtime.pause;
        runtime.pause = nextState;

        if (runtime.pause) {
            runtime.overlay = 'pause';
            showOverlay(dom.pausePanel);
        } else {
            if (runtime.overlay === 'pause') runtime.overlay = null;
            hideOverlay(dom.pausePanel);
        }
    }

    function showOverlay(element) {
        element.classList.remove('hidden');
    }

    function hideOverlay(element) {
        element.classList.add('hidden');
    }

    function clearToasts() {
        dom.toastLayer.innerHTML = '';
    }

    function pushToast(title, text, kind) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        if (kind === 'good') toast.style.borderColor = '#38db8f';
        if (kind === 'bad') toast.style.borderColor = '#ff7f7f';
        if (kind === 'warn') toast.style.borderColor = '#ffc86d';
        toast.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
        dom.toastLayer.appendChild(toast);
        setTimeout(() => toast.remove(), 2400);
    }

    function renderGame() {
        if (!runtime.level || !ctx) return;

        const mode = runtime.modeState;
        const theme = mode.theme || THEMES.explore;

        ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

        const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
        grad.addColorStop(0, theme.bgTop);
        grad.addColorStop(1, theme.bgBottom);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        const shakeMag = runtime.shake > 0 ? 6 * runtime.shake : 0;
        ctx.save();
        if (shakeMag > 0) {
            ctx.translate((Math.random() - 0.5) * shakeMag, (Math.random() - 0.5) * shakeMag);
        }

        if (mode.mode === 'explore') renderExplore(mode);
        if (mode.mode === 'runner') renderRunner(mode);
        if (mode.mode === 'boss') renderBoss(mode);

        ctx.restore();

        drawScreenScanline();
    }

    function renderExplore(mode) {
        const tile = mode.tile;

        for (let y = 0; y < mode.rows; y++) {
            for (let x = 0; x < mode.cols; x++) {
                const worldX = mode.offsetX + x * tile;
                const worldY = mode.offsetY + y * tile;
                const cell = mode.grid[y][x];

                ctx.fillStyle = (x + y) % 2 === 0 ? '#102553' : '#0d214a';
                ctx.fillRect(worldX, worldY, tile, tile);

                if (cell === '#') {
                    ctx.fillStyle = '#355eb2';
                    ctx.fillRect(worldX, worldY, tile, tile);
                    ctx.fillStyle = '#223f80';
                    ctx.fillRect(worldX + 3, worldY + 3, tile - 6, tile - 6);
                    continue;
                }
            }
        }

        for (const hazard of mode.hazards) {
            const glow = 0.35 + 0.25 * Math.sin(hazard.phase);
            ctx.fillStyle = `rgba(255, 95, 95, ${glow})`;
            ctx.fillRect(hazard.x + 5, hazard.y + 5, hazard.w - 10, hazard.h - 10);
            ctx.strokeStyle = '#ff6f6f';
            ctx.strokeRect(hazard.x + 6, hazard.y + 6, hazard.w - 12, hazard.h - 12);
        }

        for (const token of mode.collectibles) {
            if (!token.active) continue;
            const scale = 2 + Math.sin(token.pulse) * 0.6;
            drawSprite('token', token.x - 8 * scale / 2, token.y - 8 * scale / 2, scale, PALETTES.token);
        }

        for (const node of mode.loreNodes) {
            if (!node.active) continue;
            const glow = 0.45 + 0.25 * Math.sin(node.pulse);
            ctx.fillStyle = `rgba(24, 242, 208, ${glow})`;
            ctx.fillRect(node.x - 10, node.y - 10, 20, 20);
            ctx.strokeStyle = '#9ff8ff';
            ctx.strokeRect(node.x - 11, node.y - 11, 22, 22);
            ctx.fillStyle = '#0a1f3b';
            ctx.fillRect(node.x - 6, node.y - 6, 12, 12);
            ctx.fillStyle = '#d9fffb';
            ctx.font = '18px VT323';
            ctx.fillText('L', node.x - 3.5, node.y + 5);
        }

        for (const spark of mode.sparkles) {
            const alpha = spark.t / 0.5;
            ctx.fillStyle = `rgba(255, 229, 130, ${alpha})`;
            ctx.beginPath();
            ctx.arc(spark.x, spark.y, lerp(1, 7, 1 - alpha), 0, Math.PI * 2);
            ctx.fill();
        }

        for (const npc of mode.npcs) {
            drawSprite('npc', npc.x, npc.y, 2.4, PALETTES.npc);
        }

        for (const enemy of mode.enemies) {
            drawSprite('enemy', enemy.x, enemy.y, 2.4, PALETTES.enemy);
        }

        const portalScale = mode.portal.open ? 2.8 : 2.4;
        drawSprite('portal', mode.portal.x - 11, mode.portal.y - 11, portalScale, PALETTES.portal);
        if (!mode.portal.open) {
            ctx.fillStyle = 'rgba(255, 95, 95, 0.8)';
            ctx.font = '20px VT323';
            ctx.fillText('LOCK', mode.portal.x - 16, mode.portal.y + 26);
        }

        const frame = Math.floor(mode.player.anim) % 2 === 0 ? 'heroA' : 'heroB';
        ctx.globalAlpha = runtime.invuln > 0 ? (Math.sin(performance.now() * 0.03) > 0 ? 0.35 : 1) : 1;
        drawSprite(frame, mode.player.x - 1, mode.player.y - 1, 2.7, PALETTES.hero, mode.player.facing < 0);
        ctx.globalAlpha = 1;

        ctx.fillStyle = '#d8e5ff';
        ctx.font = '28px VT323';
        ctx.fillText('MOVE: ARROWS/WASD  ·  ACT: E/ENTER', 24, CANVAS_H - 14);
    }

    function renderRunner(mode) {
        const floorY = mode.groundY;

        for (let i = 0; i < 90; i++) {
            const x = (i * 117 - (mode.distance * 0.26) % 117) % (CANVAS_W + 120);
            const y = 30 + ((i * 37) % 280);
            const alpha = (i % 4 === 0 ? 0.7 : 0.35);
            ctx.fillStyle = `rgba(201, 224, 255, ${alpha})`;
            ctx.fillRect(x, y, 2, 2);
        }

        ctx.fillStyle = '#18367c';
        ctx.fillRect(0, floorY, CANVAS_W, CANVAS_H - floorY);
        ctx.fillStyle = '#264ba8';
        for (let x = -20; x < CANVAS_W + 20; x += 34) {
            const shift = (mode.distance * 0.35) % 34;
            ctx.fillRect(x - shift, floorY + 18, 20, 6);
        }

        for (const obstacle of mode.obstacles) {
            ctx.fillStyle = '#ff6f6f';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
            ctx.fillStyle = '#8a2341';
            ctx.fillRect(obstacle.x + 4, obstacle.y + 4, obstacle.w - 8, obstacle.h - 8);
        }

        for (const token of mode.tokens) {
            drawSprite('token', token.x - 2, token.y - 2, 2.1 + Math.sin(token.pulse) * 0.2, PALETTES.token);
        }

        for (const particle of mode.particles) {
            ctx.fillStyle = `rgba(24, 242, 208, ${particle.t / 0.35})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 4 * (particle.t / 0.35), 0, Math.PI * 2);
            ctx.fill();
        }

        const frame = Math.floor(mode.player.anim) % 2 === 0 ? 'heroA' : 'heroB';
        ctx.globalAlpha = runtime.invuln > 0 ? (Math.sin(performance.now() * 0.03) > 0 ? 0.35 : 1) : 1;
        drawSprite(frame, mode.player.x, mode.player.y, 2.8, PALETTES.hero, false);
        ctx.globalAlpha = 1;

        ctx.fillStyle = '#d6e2ff';
        ctx.font = '24px VT323';
        ctx.fillText('JUMP: SPACE / UP / JUMP BTN', 24, 30);
    }

    function renderBoss(mode) {
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        for (let x = 0; x <= CANVAS_W; x += 40) {
            ctx.fillRect(x, 0, 1, CANVAS_H);
        }
        for (let y = 0; y <= CANVAS_H; y += 34) {
            ctx.fillRect(0, y, CANVAS_W, 1);
        }

        const bossBarW = 360;
        const barX = (CANVAS_W - bossBarW) / 2;
        const ratio = clamp(mode.boss.hp / mode.boss.maxHp, 0, 1);
        ctx.fillStyle = '#25133d';
        ctx.fillRect(barX, 18, bossBarW, 16);
        ctx.fillStyle = '#ff78b2';
        ctx.fillRect(barX + 2, 20, (bossBarW - 4) * ratio, 12);
        ctx.strokeStyle = '#b37ad8';
        ctx.strokeRect(barX, 18, bossBarW, 16);

        drawSprite('boss', mode.boss.x, mode.boss.y, 2.2, PALETTES.boss);

        for (const shot of mode.shots) {
            ctx.fillStyle = '#18f2d0';
            ctx.fillRect(shot.x, shot.y, shot.w, shot.h);
        }

        for (const shot of mode.enemyShots) {
            ctx.fillStyle = '#ff6f9f';
            ctx.beginPath();
            ctx.arc(shot.x + shot.w / 2, shot.y + shot.h / 2, shot.w / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        for (const spark of mode.sparks) {
            const alpha = spark.t / 0.25;
            ctx.fillStyle = `rgba(255, 219, 121, ${alpha})`;
            ctx.beginPath();
            ctx.arc(spark.x, spark.y, 7 * alpha, 0, Math.PI * 2);
            ctx.fill();
        }

        const frame = Math.floor(mode.player.anim) % 2 === 0 ? 'heroA' : 'heroB';
        ctx.globalAlpha = runtime.invuln > 0 ? (Math.sin(performance.now() * 0.03) > 0 ? 0.35 : 1) : 1;
        drawSprite(frame, mode.player.x, mode.player.y, 2.8, PALETTES.hero);
        ctx.globalAlpha = 1;

        ctx.fillStyle = '#d6e2ff';
        ctx.font = '24px VT323';
        ctx.fillText('MOVE + FIRE (ACT/JUMP)', 24, CANVAS_H - 16);
    }

    function drawScreenScanline() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        for (let y = 0; y < CANVAS_H; y += 4) {
            ctx.fillRect(0, y, CANVAS_W, 1);
        }
    }

    function drawSprite(spriteName, x, y, scale, palette, flipX = false) {
        const sprite = SPRITES[spriteName];
        if (!sprite) return;

        const h = sprite.length;
        const w = sprite[0].length;

        if (flipX) {
            ctx.save();
            ctx.translate(x + w * scale, y);
            ctx.scale(-1, 1);
            drawSpritePixels(sprite, 0, 0, scale, palette);
            ctx.restore();
            return;
        }

        drawSpritePixels(sprite, x, y, scale, palette);
    }

    function drawSpritePixels(sprite, baseX, baseY, scale, palette) {
        for (let row = 0; row < sprite.length; row++) {
            for (let col = 0; col < sprite[row].length; col++) {
                const key = sprite[row][col];
                if (key === '0') continue;
                ctx.fillStyle = palette[key] || '#ffffff';
                ctx.fillRect(baseX + col * scale, baseY + row * scale, scale, scale);
            }
        }
    }

    function unlockAudio() {
        if (audioCtx) return;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        try {
            audioCtx = new AudioContextClass();
        } catch (error) {
            audioCtx = null;
        }
    }

    function playTone(freq, duration = 0.06, type = 'square', gain = 0.028) {
        if (!audioCtx) return;

        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();

        osc.type = type;
        osc.frequency.value = freq;

        g.gain.value = 0;
        g.gain.linearRampToValueAtTime(gain, now + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(g);
        g.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + duration + 0.03);
    }

    return {
        init
    };
})();

document.addEventListener('DOMContentLoaded', Engine.init);
