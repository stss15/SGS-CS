/**
 * Extracted from software_game.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        window.onerror = function () { return false; };

        // --- CONFIG & STATE ---
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        const STATE = {
            running: false, paused: false, mode: 'PC',
            score: 0, lives: 3, wave: 1, roundTimer: 20,
            player: { x: 0, y: 0, vx: 0, vy: 0, angle: 0 },
            bullets: [], enemies: [], particles: [], enemyBullets: [],
            inputMove: { x: 0, y: 0 }, inputAim: { x: 0, y: 0 }, isFiring: false,
            cam: { x: 0, y: 0 },
            lastTime: 0, lastSpawn: 0, lastShot: 0,

            // Mechanics
            killStreak: 0, weaponLevel: 0, powerupTimer: 0, powerupMaxTime: 5,
            pulseRadius: 0, pulseActive: false,
            quizProgress: 0, questionsRequired: 3,

            // Question Pool
            pool: [],
            sessionMistakes: []
        };

        // --- 65 UNIQUE IGCSE QUESTIONS (BALANCED) ---
        const QUESTIONS = [
            { q: "What is the primary function of System Software?", a: ["To manage and control computer hardware operations", "To perform specific user tasks like word processing", "To design new applications for the user", "To connect the computer to the internet safely"], c: 0 },
            { q: "Application software is best defined as:", a: ["Programs designed to perform specific user tasks", "Software that manages hardware resources directly", "Code that translates high-level languages into binary", "The firmware stored permanently on the motherboard"], c: 0 },
            { q: "Which of the following is a feature of System Software?", a: ["It provides a platform for other software to run", "It is always a single program like a Text Editor", "It is executed only when the user explicitly opens it", "It is primarily used for creating spreadsheets"], c: 0 },
            { q: "Which statement correctly describes the relationship between hardware and software?", a: ["System software controls the hardware allocation", "Application software runs directly on hardware", "Hardware requires no software to function correctly", "System software runs on top of applications"], c: 0 },
            { q: "Utility programs are considered part of which software category?", a: ["System Software", "Application Software", "Firmware", "Hardware"], c: 0 },
            { q: "What is the primary purpose of a disk repair utility?", a: ["To analyse and resolve physical disk errors", "To compress files to save hard drive space", "To prevent viruses from entering the system", "To move files between different folders"], c: 0 },
            { q: "File compression software is used to:", a: ["Reduce file size for storage or transmission", "Encrypt files for security against hackers", "Delete duplicate files automatically from disk", "Organise files into folders for easier access"], c: 0 },
            { q: "Screensavers were originally designed to prevent:", a: ["Phosphor burn-in on CRT monitors", "Unauthorised access to personal data", "Viruses from infecting the system when idle", "The CPU from overheating during inactivity"], c: 0 },
            { q: "Backup utilities are essential for:", a: ["Restoring data if the original is corrupted", "Increasing the processing speed of the CPU", "Preventing hackers from accessing sensitive files", "Running applications faster on old hardware"], c: 0 },
            { q: "Heuristic checking in anti-virus software identifies threats by:", a: ["Analysing behaviour for virus-like activity", "Checking against a known database of signatures", "Asking the user to manually identify the file", "Scanning only files downloaded from emails"], c: 0 },
            { q: "What defines a 'false positive' in anti-virus scanning?", a: ["A safe file incorrectly flagged as a virus", "A malicious virus that is missed by the scan", "A virus that cannot be deleted by the software", "A file that is corrupted but otherwise safe"], c: 0 },
            { q: "When a file is 'quarantined', what happens to it?", a: ["It is isolated so it cannot be executed", "It is deleted immediately from the hard disk", "It is sent to the software developer for analysis", "It is encrypted with a password for safety"], c: 0 },
            { q: "Why must anti-virus databases be updated regularly?", a: ["To recognise newly discovered virus signatures", "To improve the processing speed of the computer", "To ensure the user interface looks modern", "To compress scanned files to save space"], c: 0 },
            { q: "Malware is a broad term that includes:", a: ["Viruses, worms, and Trojan horses", "Operating systems and utility programs", "Compilers, interpreters and linkers", "Shareware, freeware and public domain software"], c: 0 },
            { q: "Defragmentation improves performance by:", a: ["Rearranging file sectors to be contiguous", "Deleting unnecessary files to save disk space", "Compressing files to reduce their file size", "Checking the disk for physical errors and bad sectors"], c: 0 },
            { q: "What does the term 'contiguous' mean in disk management?", a: ["Data blocks are stored next to each other", "Data blocks are spread across the disk platters", "Data blocks are encrypted securely with a key", "Data blocks are compressed to save space"], c: 0 },
            { q: "The Operating System acts as an interface between:", a: ["The user and the computer hardware", "The application software and the internet", "The Random Access Memory and the CPU", "The computer monitor and the printer"], c: 0 },
            { q: "Which management task handles the integrity and confidentiality of data?", a: ["Security Management", "Memory Management", "Process Management", "File Management"], c: 0 },
            { q: "Memory Management is responsible for:", a: ["Allocating RAM to programs and data", "Storing files permanently on the hard disk", "Managing user passwords and access rights", "Controlling printer queues and buffers"], c: 0 },
            { q: "What is the role of Hardware Management?", a: ["Controlling all input and output devices", "Managing the connection speed of the internet", "Designing new hardware components for the PC", "Installing new applications automatically"], c: 0 },
            { q: "Which function allows multiple processes to share CPU time?", a: ["Multitasking", "Multiprocessing", "Buffering", "Interrupt Handling"], c: 0 },
            { q: "Why are user accounts used in a multi-user OS?", a: ["To keep user data separate and secure", "To allow users to share all passwords easily", "To prevent users from installing any software", "To speed up the boot process of the computer"], c: 0 },
            { q: "An 'Administrator' account typically has:", a: ["Full access to manage the system and users", "Restricted access to only one specific folder", "No password requirement for easier access", "Access only to the internet and nothing else"], c: 0 },
            { q: "Access rights are used to:", a: ["Control which files a user can read or edit", "Speed up file access times on the network", "Compress files automatically to save space", "Delete unused files after a certain time"], c: 0 },
            { q: "A Command Line Interface (CLI) is characterised by:", a: ["Direct text input of commands", "Using icons and menus to select options", "Touch screen interaction with gestures", "Voice control only without a keyboard"], c: 0 },
            { q: "A Graphical User Interface (GUI) typically uses:", a: ["WIMP (Windows, Icons, Menus, Pointers)", "Text-only commands typed into a console", "Punch cards to input data into the system", "Assembly language mnemonics for control"], c: 0 },
            { q: "Which user is most likely to prefer a CLI?", a: ["A technician or programmer", "A casual game player", "A graphic designer", "A data entry clerk"], c: 0 },
            { q: "What is a 'Post-WIMP' interaction?", a: ["Touch gestures like pinching and rotating", "Using a mouse and keyboard for navigation", "Typing command syntax into a terminal", "Using a trackball to move the cursor"], c: 0 },
            { q: "A disadvantage of a GUI compared to a CLI is:", a: ["It consumes more system resources", "It is harder for beginners to learn", "It allows less control over file management", "It cannot support multitasking"], c: 0 },
            { q: "An interrupt is a signal sent to the CPU to:", a: ["Request immediate attention", "Shutdown the system", "Delete a file safely", "Increase the clock speed"], c: 0 },
            { q: "What happens when the CPU accepts an interrupt?", a: ["Current task status is saved and ISR runs", "The computer reboots immediately", "The current task is deleted from memory", "The CPU ignores all input from devices"], c: 0 },
            { q: "Why are interrupts assigned priorities?", a: ["To determine which to service first", "To delete low priority tasks automatically", "To colour code error messages for users", "To speed up the internet connection"], c: 0 },
            { q: "What is an ISR in the context of interrupts?", a: ["Interrupt Service Routine", "Internal System Restore", "Input Signal Request", "Internet Security Rule"], c: 0 },
            { q: "Which of these allows the CPU to handle slow I/O devices efficiently?", a: ["Interrupts and Buffers", "Compilers and Linkers", "BIOS and CMOS", "RAM and ROM"], c: 0 },
            { q: "A 'buffer' in computer memory is used to:", a: ["Temporarily store data during transfer", "Permanently archive old files", "Scan for viruses in the background", "Store the operating system code"], c: 0 },
            { q: "Device drivers are software that:", a: ["Translate data for specific hardware", "Physically connect devices to the PC", "Design hardware circuits for the CPU", "Are only used for connecting printers"], c: 0 },
            { q: "When printing, data is sent to a buffer because:", a: ["The CPU is faster than the printer", "The printer is faster than the CPU", "The buffer compresses the data first", "The buffer encrypts the data for safety"], c: 0 },
            { q: "A 'device descriptor' contains:", a: ["Vendor ID and Product ID", "The device's purchase price", "The user's login password", "The date of manufacture"], c: 0 },
            { q: "The bootstrap loader is responsible for:", a: ["Loading the OS into RAM at startup", "Installing new applications", "Connecting to the internet", "Formatting the hard drive"], c: 0 },
            { q: "The BIOS (Basic Input/Output System) is stored in:", a: ["EEPROM (Flash Memory)", "The Hard Disk Drive", "The Random Access Memory", "The Processor Cache"], c: 0 },
            { q: "Where are BIOS settings (like time/date) stored?", a: ["CMOS chip", "The CPU", "The CD-ROM", "The Monitor"], c: 0 },
            { q: "What happens if the CMOS battery fails?", a: ["BIOS settings revert to factory default", "The BIOS program is deleted forever", "The computer cannot turn on at all", "The hard drive is securely wiped"], c: 0 },
            { q: "Firmware is best described as:", a: ["Software providing low-level hardware control", "Application software for end users", "Temporary data stored in RAM", "A type of malicious software"], c: 0 },
            { q: "Machine Code is defined as:", a: ["Binary instructions executed by the CPU", "English-like programming statements", "Assembly mnemonics like ADD and SUB", "HTML tags used for web pages"], c: 0 },
            { q: "Assembly Language is considered:", a: ["A low-level language", "A high-level language", "Machine code", "Firmware"], c: 0 },
            { q: "High-Level Languages (HLL) are designed to be:", a: ["Easy for humans to read and write", "Directly executed by the CPU", "Specific to one processor type", "Written in binary code"], c: 0 },
            { q: "Which is an advantage of Low-Level Languages?", a: ["Direct control over hardware registers", "Portable across different computers", "Easier to debug than High-Level", "Faster to write complex code"], c: 0 },
            { q: "Which is a disadvantage of High-Level Languages?", a: ["They must be translated before execution", "They are hard to maintain and update", "They are difficult to learn for beginners", "They cannot perform mathematical calculations"], c: 0 },
            { q: "A Compiler translates source code:", a: ["All at once into an executable file", "Line by line during execution", "Into assembly language only", "Into English text for documentation"], c: 0 },
            { q: "An Interpreter translates source code:", a: ["Line by line, executing immediately", "All at once before execution", "Into a standalone .exe file", "Back into high-level code"], c: 0 },
            { q: "An Assembler translates:", a: ["Assembly language to Machine code", "High-level code to Machine code", "Machine code to English", "Python to Java"], c: 0 },
            { q: "Which translator reports all errors at the end of translation?", a: ["Compiler", "Interpreter", "Assembler", "Editor"], c: 0 },
            { q: "Which translator stops at the first error encountered?", a: ["Interpreter", "Compiler", "Linker", "Loader"], c: 0 },
            { q: "What is the primary role of a Linker?", a: ["Combine object files into one executable", "Translate source code to object code", "Load the program into memory", "Debug syntax errors in the code"], c: 0 },
            { q: "Linkers allow programmers to:", a: ["Use pre-written modules/libraries", "Write in binary directly to the CPU", "Skip the compilation step entirely", "Run code without an Operating System"], c: 0 },
            { q: "A Loader is responsible for:", a: ["Placing the executable into RAM", "Compiling the source code", "Linking library files together", "Deleting the source code"], c: 0 },
            { q: "What does IDE stand for?", a: ["Integrated Development Environment", "Integrated Drive Electronics", "Internal Data Exchange", "Input Device Error"], c: 0 },
            { q: "Which IDE feature helps highlight syntax errors?", a: ["Dynamic Error Checking", "Auto-completion", "Prettyprinting", "Runtime Environment"], c: 0 },
            { q: "What is the purpose of a Debugger?", a: ["To step through code and find logic errors", "To compile the code faster", "To format the code colors", "To auto-complete keywords"], c: 0 },
            { q: "What does 'Prettyprinting' do?", a: ["Colour-codes and formats source code", "Prints the code to a laser printer", "Checks for spelling mistakes", "Executes the code immediately"], c: 0 },
            { q: "A 'Report Window' in an IDE typically displays:", a: ["Variable values and error messages", "The source code text", "The finished application interface", "System memory usage statistics"], c: 0 },
            { q: "Auto-completion in an IDE helps by:", a: ["Suggesting keywords and variable names", "Writing the entire program for you", "Automatically debugging errors", "Compiling the code instantly"], c: 0 },
            { q: "EEPROM stands for:", a: ["Electrically Erasable Programmable ROM", "Energy Efficient Processing RAM", "External Electronic Power ROM", "Easy Error Processing Read Only Memory"], c: 0 },
            { q: "An 'Error Handling Routine' is designed to:", a: ["Recover the system from unexpected faults", "Crash the computer safely", "Delete corrupted files automatically", "Ignore all errors and continue"], c: 0 }
        ];

        // --- SAFE AUDIO ENGINE ---
        const Sound = {
            ctx: null,
            enabled: false,
            init: function () {
                try {
                    window.AudioContext = window.AudioContext || window.webkitAudioContext;
                    if (window.AudioContext) {
                        this.ctx = new AudioContext();
                        this.enabled = true;
                    }
                } catch (e) { this.enabled = false; }
            },
            play: function (freq, type, dur) {
                if (!this.enabled || !this.ctx) return;
                try {
                    if (this.ctx.state === 'suspended') this.ctx.resume();
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = type;
                    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + dur);
                    osc.connect(gain); gain.connect(this.ctx.destination);
                    osc.start(); osc.stop(this.ctx.currentTime + dur);
                } catch (e) { /* Ignore */ }
            },
            shoot: function () { this.play(600, 'square', 0.1); },
            hit: function () { this.play(200, 'sawtooth', 0.1); },
            explode: function () { this.play(100, 'sawtooth', 0.3); this.play(50, 'square', 0.3); },
            correct: function () { this.play(800, 'sine', 0.1); setTimeout(() => this.play(1200, 'sine', 0.2), 100); },
            wrong: function () { this.play(100, 'sawtooth', 0.4); },
            pulse: function () { this.play(200, 'sine', 0.5); setTimeout(() => this.play(400, 'sine', 0.5), 100); },
            powerup: function () { this.play(600, 'sine', 0.1); setTimeout(() => this.play(900, 'sine', 0.2), 100); }
        };

        // --- INITIALIZATION ---
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            if (STATE.mode === 'MOBILE') checkOrientation();
        }
        window.addEventListener('resize', resize);
        window.onload = () => resize(); // Ensure size on load

        function checkOrientation() {
            const msg = document.getElementById('rotate-msg');
            if (window.innerHeight > window.innerWidth) {
                msg.style.display = 'flex';
                STATE.paused = true;
            } else {
                msg.style.display = 'none';
                if (STATE.running) STATE.paused = false;
            }
        }

        function togglePause() {
            STATE.paused = !STATE.paused;
            document.getElementById('pause-screen').style.display = STATE.paused ? 'flex' : 'none';
        }

        function initGame(mode) {
            Sound.init();
            STATE.mode = mode;
            STATE.running = true; STATE.paused = false;
            STATE.lives = 3; STATE.score = 0; STATE.wave = 1; STATE.roundTimer = 20;
            STATE.enemies = []; STATE.bullets = []; STATE.enemyBullets = [];
            STATE.weaponLevel = 0; STATE.killStreak = 0; STATE.powerupTimer = 0;
            STATE.player.x = 0; STATE.player.y = 0;
            STATE.lastTime = performance.now();
            STATE.sessionMistakes = [];

            // Init Pool
            STATE.pool = QUESTIONS.map((_, i) => i);

            resize();
            document.getElementById('start-screen').style.display = 'none';
            document.getElementById('powerup-bar-container').style.display = 'none';
            updateProgressHUD();

            if (mode === 'MOBILE') {
                setupTouch();
                document.getElementById('mobile-controls').style.display = 'block';
            } else {
                setupPC();
                document.getElementById('mobile-controls').style.display = 'none';
            }

            requestAnimationFrame(loop);
        }

        function exitGame() {
            window.location.href = 'index.html';
        }

        // --- GAME LOOP ---
        function loop(time) {
            if (!STATE.running) return;
            requestAnimationFrame(loop);

            if (STATE.paused) return;

            const dt = Math.min((time - STATE.lastTime) / 1000, 0.1);
            STATE.lastTime = time;

            update(dt);
            render();
        }

        function update(dt) {
            // Timer
            STATE.roundTimer -= dt;
            if (STATE.roundTimer <= 0) {
                STATE.roundTimer = 0;
                triggerQuiz();
                return;
            }

            // Powerup
            if (STATE.weaponLevel > 0) {
                STATE.powerupTimer -= dt;
                const bar = document.getElementById('powerup-bar');
                const pct = (STATE.powerupTimer / STATE.powerupMaxTime) * 100;
                bar.style.width = pct + "%";

                if (STATE.powerupTimer <= 0) {
                    STATE.weaponLevel = 0;
                    STATE.killStreak = 0;
                    document.getElementById('powerup-bar-container').style.display = 'none';
                }
            }

            // Pulse
            if (STATE.pulseActive) {
                STATE.pulseRadius += 800 * dt;
                if (STATE.pulseRadius > 350) {
                    STATE.pulseActive = false;
                    STATE.pulseRadius = 0;
                } else {
                    for (let i = STATE.enemies.length - 1; i >= 0; i--) {
                        const e = STATE.enemies[i];
                        const d = Math.hypot(STATE.player.x - e.x, STATE.player.y - e.y);
                        if (d < STATE.pulseRadius) {
                            createExplosion(e.x, e.y, '#0ff');
                            STATE.enemies.splice(i, 1);
                        }
                    }
                    for (let i = STATE.enemyBullets.length - 1; i >= 0; i--) {
                        const b = STATE.enemyBullets[i];
                        const d = Math.hypot(STATE.player.x - b.x, STATE.player.y - b.y);
                        if (d < STATE.pulseRadius) STATE.enemyBullets.splice(i, 1);
                    }
                }
            }

            // Player
            const speed = 350 * dt;
            STATE.player.x += STATE.inputMove.x * speed;
            STATE.player.y += STATE.inputMove.y * speed;

            // Cam - Zoomed OUT
            STATE.cam.x += (STATE.player.x - width / 2 - STATE.cam.x) * 0.1;
            STATE.cam.y += (STATE.player.y - height / 2 - STATE.cam.y) * 0.1;

            // Aim
            if (Math.abs(STATE.inputAim.x) > 0.1 || Math.abs(STATE.inputAim.y) > 0.1) {
                STATE.player.angle = Math.atan2(STATE.inputAim.y, STATE.inputAim.x);
            }

            // Shoot
            let fireRate = (STATE.weaponLevel >= 2) ? 80 : 150;
            if (STATE.isFiring && Date.now() - STATE.lastShot > fireRate) {
                const v = (STATE.weaponLevel >= 2) ? 1200 : 900;

                if (STATE.weaponLevel === 0) {
                    spawnBullet(0, v);
                } else if (STATE.weaponLevel >= 1) {
                    spawnBullet(0, v);
                    spawnBullet(-0.2, v);
                    spawnBullet(0.2, v);
                    if (STATE.weaponLevel >= 3) spawnBullet(0.4, v);
                    if (STATE.weaponLevel >= 4) spawnBullet(-0.4, v);
                }

                Sound.shoot();
                STATE.lastShot = Date.now();
            }

            // Spawn (FASTER)
            // V22: Base rate 1000 (was 1300). Drops by 120 per wave.
            let spawnDelay = Math.max(100, 1000 - (STATE.wave * 120) - (STATE.weaponLevel * 150));
            if (Date.now() - STATE.lastSpawn > spawnDelay) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 900; // Spawn further out due to zoom

                const rand = Math.random();
                let type = 0;

                // New Enemy Types (8-12)
                if (STATE.wave > 1 && rand < 0.2) type = 2;
                else if (STATE.wave > 2 && rand < 0.3) type = 1;
                else if (STATE.wave > 3 && rand < 0.4) type = 3;
                else if (STATE.wave > 4 && rand < 0.5) type = 4;
                else if (STATE.wave > 5 && rand < 0.6) type = 5;
                else if (STATE.wave > 6 && rand < 0.65) type = 6;
                else if (STATE.wave > 7 && rand < 0.7) type = 7;
                else if (STATE.wave > 3 && rand < 0.75) type = 8; // Phishing (Spiral)
                else if (STATE.wave > 4 && rand < 0.8) type = 9; // Keylogger (Stalker)
                else if (STATE.wave > 5 && rand < 0.85) type = 10; // Cryptojacker (Orbital)
                else if (STATE.wave > 6 && rand < 0.9) type = 11; // Logic Bomb (Dasher)
                else if (STATE.wave > 7 && rand < 0.95) type = 12; // Polymorphic (Splitter)

                let e = createEnemy(type);
                e.x = STATE.player.x + Math.cos(angle) * dist;
                e.y = STATE.player.y + Math.sin(angle) * dist;
                // Custom Init for specialized types
                if (type === 8) e.spiralAngle = 0;
                if (type === 10) e.orbitAngle = 0;
                if (type === 11) e.dashTimer = 0;

                STATE.enemies.push(e);
                STATE.lastSpawn = Date.now();
            }

            // Updates
            STATE.bullets.forEach((b, i) => {
                b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
                if (b.life <= 0) STATE.bullets.splice(i, 1);
            });

            STATE.enemyBullets.forEach((b, i) => {
                b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
                const d = Math.hypot(b.x - STATE.player.x, b.y - STATE.player.y);
                if (d < 20) { damage(); STATE.enemyBullets.splice(i, 1); }
                else if (b.life <= 0) STATE.enemyBullets.splice(i, 1);
            });

            STATE.enemies.forEach((e, i) => {
                const dx = STATE.player.x - e.x;
                const dy = STATE.player.y - e.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // AI MOVEMENT LOGIC
                if (e.type === 8) { // Phishing (Spiral)
                    e.spiralAngle += 2 * dt;
                    e.x += (dx / dist) * e.speed * dt + Math.cos(e.spiralAngle) * 2;
                    e.y += (dy / dist) * e.speed * dt + Math.sin(e.spiralAngle) * 2;
                } else if (e.type === 9) { // Keylogger (Stalker)
                    // Dot product to check if player looking at enemy
                    const px = Math.cos(STATE.player.angle);
                    const py = Math.sin(STATE.player.angle);
                    // Vector from player to enemy
                    const ex = (e.x - STATE.player.x) / dist;
                    const ey = (e.y - STATE.player.y) / dist;
                    const dot = px * ex + py * ey;

                    // If dot > 0.5, player roughly facing enemy -> Slow down
                    // If dot < 0, player looking away -> Speed up
                    let mod = (dot > 0.2) ? 0.2 : 3.0;
                    e.x += (dx / dist) * e.speed * mod * dt;
                    e.y += (dy / dist) * e.speed * mod * dt;
                } else if (e.type === 11) { // Logic Bomb (Dasher)
                    e.dashTimer += dt;
                    if (e.dashTimer > 2) { // Dash!
                        e.x += (dx / dist) * 600 * dt;
                        e.y += (dy / dist) * 600 * dt;
                        if (e.dashTimer > 2.5) e.dashTimer = 0;
                    } else {
                        // Creep slow
                        e.x += (dx / dist) * 20 * dt;
                        e.y += (dy / dist) * 20 * dt;
                    }
                } else {
                    // Normal
                    if (dist > 0) {
                        e.x += (dx / dist) * e.speed * dt;
                        e.y += (dy / dist) * e.speed * dt;
                    }
                }

                // Special Abilities
                if (e.type === 3 && Math.random() < 0.01) {
                    STATE.enemyBullets.push({ x: e.x, y: e.y, vx: (dx / dist) * 300, vy: (dy / dist) * 300, life: 3, color: '#f0f' });
                }
                if (e.type === 10) { // Orbital Shield
                    e.orbitAngle += 3 * dt;
                    // Render logic handles drawing, collision logic here?
                    // Simplify: The "Shield" is just larger collision radius that hurts
                    if (dist < 60) { STATE.enemies.splice(i, 1); damage(); createExplosion(e.x, e.y, '#ffd700'); }
                }

                if (dist < 30) { STATE.enemies.splice(i, 1); damage(); createExplosion(e.x, e.y, '#f00'); }

                for (let j = STATE.bullets.length - 1; j >= 0; j--) {
                    const b = STATE.bullets[j];
                    if (Math.hypot(b.x - e.x, b.y - e.y) < (e.size + 10)) {
                        STATE.bullets.splice(j, 1); e.hp--; Sound.hit();
                        if (e.hp <= 0) {
                            STATE.enemies.splice(i, 1); addScore(); createExplosion(e.x, e.y, e.color);

                            // Splitter Logic
                            if (e.type === 12) {
                                for (let k = 0; k < 2; k++) {
                                    let mini = createEnemy(0); // Virus
                                    mini.size = 15; mini.speed = 200; mini.x = e.x + Math.random() * 20; mini.y = e.y + Math.random() * 20;
                                    STATE.enemies.push(mini);
                                }
                            }
                        }
                        break;
                    }
                }
            });

            for (let i = STATE.particles.length - 1; i >= 0; i--) {
                const p = STATE.particles[i];
                p.x += p.vx; p.y += p.vy; p.life -= 0.05;
                if (p.life <= 0) STATE.particles.splice(i, 1);
            }
        }

        function spawnBullet(offsetAngle, speed) {
            STATE.bullets.push({
                x: STATE.player.x, y: STATE.player.y,
                vx: Math.cos(STATE.player.angle + offsetAngle) * speed,
                vy: Math.sin(STATE.player.angle + offsetAngle) * speed,
                life: 1.5
            });
        }

        function createEnemy(type) {
            let e = { type: type, hp: 1, speed: 100, color: '#fff', sides: 4, size: 20 };
            switch (type) {
                case 0: e.hp = 1; e.speed = 120; e.color = '#ffe600'; e.sides = 4; e.size = 25; break;
                case 1: e.hp = 3; e.speed = 80; e.color = '#ff00aa'; e.sides = 6; e.size = 35; break;
                case 2: e.hp = 1; e.speed = 180; e.color = '#00ff00'; e.sides = 3; e.size = 20; break;
                case 3: e.hp = 2; e.speed = 90; e.color = '#00ffff'; e.sides = 4; e.size = 30; break;
                case 4: e.hp = 1; e.speed = 150; e.color = '#555555'; e.sides = 3; e.size = 15; break;
                case 5: e.hp = 4; e.speed = 60; e.color = '#ff0000'; e.sides = 5; e.size = 40; break;
                case 6: e.hp = 2; e.speed = 110; e.color = '#aa00ff'; e.sides = 5; e.size = 25; break;
                case 7: e.hp = 1; e.speed = 140; e.color = '#ff8800'; e.sides = 3; e.size = 18; break;

                // New Types
                case 8: e.hp = 2; e.speed = 130; e.color = '#ff9900'; e.sides = 3; e.size = 25; break; // Spiral
                case 9: e.hp = 2; e.speed = 50; e.color = '#330000'; e.sides = 4; e.size = 30; break; // Stalker (Speed varies)
                case 10: e.hp = 3; e.speed = 70; e.color = '#ffd700'; e.sides = 6; e.size = 40; break; // Orbital
                case 11: e.hp = 1; e.speed = 0; e.color = '#ffffff'; e.sides = 3; e.size = 20; break; // Dasher (Speed varies)
                case 12: e.hp = 3; e.speed = 90; e.color = '#9900cc'; e.sides = 5; e.size = 45; break; // Splitter
            }
            return e;
        }

        function addScore() {
            STATE.score += 100; STATE.killStreak++; Sound.explode();

            let oldLevel = STATE.weaponLevel;
            if (STATE.killStreak >= 120) STATE.weaponLevel = 4;
            else if (STATE.killStreak >= 75) STATE.weaponLevel = 3;
            else if (STATE.killStreak >= 40) STATE.weaponLevel = 2;
            else if (STATE.killStreak >= 15) STATE.weaponLevel = 1;

            if (STATE.weaponLevel > oldLevel) {
                STATE.powerupTimer = STATE.powerupMaxTime;
                const el = document.getElementById('powerup-bar-container');
                el.style.display = 'block';
                document.getElementById('powerup-text').innerText = "WEAPON LEVEL " + STATE.weaponLevel;
                Sound.powerup();
            } else if (STATE.weaponLevel > 0) {
                STATE.powerupTimer = Math.min(STATE.powerupTimer + 0.5, STATE.powerupMaxTime);
            }
        }

        function render() {
            ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, width, height);

            // ZOOM OUT CAMERA: Change offsets to center screen but scale down world
            ctx.save();
            // Center camera on player, but zoomed out
            // Effectively scaling the context
            const zoom = 0.6; // Zoom factor
            ctx.translate(width / 2, height / 2);
            ctx.scale(zoom, zoom);
            ctx.translate(-STATE.player.x, -STATE.player.y);

            // Draw Grid (Larger area now visible)
            ctx.strokeStyle = '#1a1a2e'; ctx.lineWidth = 2; ctx.beginPath();
            const size = 100;
            // Align grid
            const startX = Math.floor((STATE.player.x - (width / 2) / zoom) / size) * size;
            const startY = Math.floor((STATE.player.y - (height / 2) / zoom) / size) * size;
            const endX = startX + (width / zoom) + size * 2;
            const endY = startY + (height / zoom) + size * 2;

            for (let x = startX; x < endX; x += size) { ctx.moveTo(x, startY); ctx.lineTo(x, endY); }
            for (let y = startY; y < endY; y += size) { ctx.moveTo(startX, y); ctx.lineTo(endX, y); }
            ctx.stroke();

            if (STATE.pulseActive) {
                ctx.beginPath(); ctx.arc(STATE.player.x, STATE.player.y, STATE.pulseRadius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 255, 0.2)`; ctx.fill();
                ctx.strokeStyle = `rgba(0, 255, 255, 0.8)`; ctx.lineWidth = 5; ctx.stroke();
            }

            ctx.save(); ctx.translate(STATE.player.x, STATE.player.y); ctx.rotate(STATE.player.angle);
            drawNeonPoly(3, 20, '#00f3ff'); ctx.restore();

            STATE.enemies.forEach(e => {
                if (e.type === 4 && Math.random() > 0.5) return;
                ctx.save(); ctx.translate(e.x, e.y); ctx.rotate(Date.now() * 0.002);
                drawNeonPoly(e.sides, e.size, e.color);

                // Special Render: Orbital
                if (e.type === 10) {
                    ctx.beginPath();
                    let satX = Math.cos(e.orbitAngle) * 40;
                    let satY = Math.sin(e.orbitAngle) * 40;
                    ctx.arc(satX, satY, 5, 0, Math.PI * 2);
                    ctx.arc(-satX, -satY, 5, 0, Math.PI * 2);
                    ctx.fillStyle = '#fff'; ctx.fill();
                }

                ctx.restore();
            });

            ctx.fillStyle = '#fff'; ctx.shadowBlur = 10; ctx.shadowColor = '#fff';
            STATE.bullets.forEach(b => { ctx.beginPath(); ctx.arc(b.x, b.y, 5, 0, Math.PI * 2); ctx.fill(); });

            ctx.fillStyle = '#f0f'; ctx.shadowColor = '#f0f';
            STATE.enemyBullets.forEach(b => { ctx.beginPath(); ctx.arc(b.x, b.y, 6, 0, Math.PI * 2); ctx.fill(); });

            STATE.particles.forEach(p => {
                ctx.fillStyle = p.col; ctx.globalAlpha = p.life;
                ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
                ctx.globalAlpha = 1.0;
            });

            ctx.restore();

            document.getElementById('score-box').innerText = STATE.score;
            document.getElementById('lives-box').innerText = "❤".repeat(Math.max(0, STATE.lives));
            document.getElementById('wave-box').innerText = "WAVE " + STATE.wave;
            document.getElementById('timer-box').innerText = Math.ceil(STATE.roundTimer);
        }

        function drawNeonPoly(sides, r, color) {
            ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.shadowBlur = 15; ctx.shadowColor = color;
            ctx.beginPath();
            for (let i = 0; i < sides; i++) {
                const theta = (i / sides) * Math.PI * 2;
                if (i === 0) ctx.moveTo(Math.cos(theta) * r, Math.sin(theta) * r);
                else ctx.lineTo(Math.cos(theta) * r, Math.sin(theta) * r);
            }
            ctx.closePath(); ctx.stroke(); ctx.shadowBlur = 0;
        }

        function createExplosion(x, y, color) {
            for (let i = 0; i < 10; i++) {
                const a = Math.random() * Math.PI * 2;
                const s = Math.random() * 5;
                STATE.particles.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1.0, col: color });
            }
        }

        function damage() {
            STATE.lives--;
            STATE.weaponLevel = 0; STATE.killStreak = 0;
            document.getElementById('powerup-bar-container').style.display = 'none';
            Sound.wrong();
            ctx.fillStyle = 'rgba(255,0,0,0.3)'; ctx.fillRect(0, 0, width, height);
            if (STATE.lives <= 0) endGame(false);
        }

        function updateProgressHUD() {
            document.getElementById('progress-box').innerText = `POOL: ${STATE.pool.length} LEFT`;
        }

        function triggerQuiz() {
            STATE.running = false;
            STATE.quizProgress = 0;
            document.getElementById('quiz-screen').style.display = 'flex';

            if (STATE.pool.length === 0) { endGame(true); return; }
            showNextQuizQuestion();
        }

        function showNextQuizQuestion() {
            document.getElementById('quiz-title').innerText = `SECURITY CHECK (${STATE.quizProgress + 1}/${STATE.questionsRequired})`;

            if (STATE.pool.length === 0) { endGame(true); return; }

            const poolIndex = Math.floor(Math.random() * STATE.pool.length);
            const questionIndex = STATE.pool[poolIndex];
            const q = QUESTIONS[questionIndex];

            const div = document.getElementById('q-opts');
            document.getElementById('q-text').innerText = q.q;
            div.innerHTML = '';

            let indices = q.a.map((_, i) => i);
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }

            indices.forEach(i => {
                const btn = document.createElement('button');
                btn.className = 'quiz-opt';
                btn.innerText = q.a[i];
                btn.onclick = () => {
                    if (i === q.c) {
                        btn.classList.add('correct'); Sound.correct();
                        STATE.pool.splice(poolIndex, 1); // Remove from pool
                        updateProgressHUD();
                        STATE.quizProgress++;
                        setTimeout(() => {
                            if (STATE.pool.length === 0) { endGame(true); }
                            else if (STATE.quizProgress >= STATE.questionsRequired) { completeWave(); }
                            else { showNextQuizQuestion(); }
                        }, 800);
                    } else {
                        btn.classList.add('wrong'); damage();
                        STATE.sessionMistakes.push({ q: q.q, correct: q.a[q.c], wrong: q.a[i] });
                        setTimeout(() => {
                            if (STATE.lives > 0) {
                                if (STATE.pool.length > 1) showNextQuizQuestion();
                                else { div.innerHTML = ''; showNextQuizQuestion(); }
                            }
                        }, 800);
                    }
                };
                div.appendChild(btn);
            });
        }

        function completeWave() {
            document.getElementById('quiz-screen').style.display = 'none';
            STATE.pulseActive = true; STATE.pulseRadius = 10; Sound.pulse();
            STATE.wave++; STATE.roundTimer = 20; STATE.lives = Math.min(3, STATE.lives + 1);
            STATE.running = true;
            requestAnimationFrame(loop);
        }

        function endGame(victory) {
            STATE.running = false;
            let best = sessionStorage.getItem('highScore') || 0;
            if (STATE.score > best) { best = STATE.score; sessionStorage.setItem('highScore', best); }

            const goScreen = document.getElementById('game-over');
            goScreen.style.display = 'flex';
            document.getElementById('quiz-screen').style.display = 'none';

            const title = document.getElementById('go-title');
            title.innerText = victory ? "SYSTEM SECURED (VICTORY)" : "CRITICAL FAILURE";
            title.style.color = victory ? "#0f0" : "#f05";

            document.getElementById('final-score').innerText = "SCORE: " + STATE.score;
            document.getElementById('high-score').innerText = "SESSION BEST: " + best;

            const revList = document.getElementById('revision-list');
            const revCont = document.getElementById('revision-container');
            revList.innerHTML = '';

            if (STATE.sessionMistakes.length > 0) {
                revCont.style.display = 'block';
                STATE.sessionMistakes.forEach(m => {
                    const div = document.createElement('div');
                    div.className = 'rev-item';
                    div.innerHTML = `<div class="rev-q">${m.q}</div><span class="rev-wrong">${m.wrong}</span> <span class="rev-correct">➜ ${m.correct}</span>`;
                    revList.appendChild(div);
                });
            } else { revCont.style.display = 'none'; }
        }

        // --- CONTROLS ---
        function setupPC() {
            const keys = {};
            window.addEventListener('keydown', e => {
                if (e.key === 'Escape') {
                    const startScreen = document.getElementById('start-screen');
                    if (startScreen.style.display !== 'none') {
                        exitGame();
                    } else {
                        togglePause();
                    }
                }
                keys[e.key] = true; updateInput(keys);
            });
            window.addEventListener('keyup', e => { keys[e.key] = false; updateInput(keys); });
            window.addEventListener('mousemove', e => {
                STATE.inputAim.x = e.clientX - width / 2;
                STATE.inputAim.y = e.clientY - height / 2;
            });
            window.addEventListener('mousedown', () => STATE.isFiring = true);
            window.addEventListener('mouseup', () => STATE.isFiring = false);

            function updateInput(k) {
                let x = 0, y = 0;
                if (k.w || k.ArrowUp) y -= 1;
                if (k.s || k.ArrowDown) y += 1;
                if (k.a || k.ArrowLeft) x -= 1;
                if (k.d || k.ArrowRight) x += 1;
                STATE.inputMove = { x, y };
            }
        }

        function setupTouch() {
            document.getElementById('stick-left').style.display = 'block';
            document.getElementById('stick-right').style.display = 'block';

            const bindJoystick = (id, callback) => {
                const zone = document.getElementById(id);
                const knob = zone.querySelector('.joystick-knob');
                let start = null;
                let touchId = null;

                zone.addEventListener('touchstart', e => {
                    e.preventDefault();
                    if (touchId !== null) return;
                    const t = e.changedTouches[0];
                    touchId = t.identifier;
                    start = { x: t.clientX, y: t.clientY };
                }, { passive: false });

                zone.addEventListener('touchmove', e => {
                    e.preventDefault();
                    if (touchId === null) return;
                    for (let i = 0; i < e.changedTouches.length; i++) {
                        if (e.changedTouches[i].identifier === touchId) {
                            const t = e.changedTouches[i];
                            const dx = t.clientX - start.x;
                            const dy = t.clientY - start.y;
                            const dist = Math.min(Math.hypot(dx, dy), 35);
                            const angle = Math.atan2(dy, dx);
                            const kx = Math.cos(angle) * dist;
                            const ky = Math.sin(angle) * dist;
                            knob.style.transform = `translate(${kx}px, ${ky}px)`;
                            callback(kx / 35, ky / 35, true);
                            break;
                        }
                    }
                }, { passive: false });

                const endTouch = (e) => {
                    e.preventDefault();
                    if (touchId === null) return;
                    for (let i = 0; i < e.changedTouches.length; i++) {
                        if (e.changedTouches[i].identifier === touchId) {
                            touchId = null;
                            start = null;
                            knob.style.transform = `translate(0,0)`;
                            callback(0, 0, false);
                            break;
                        }
                    }
                };
                zone.addEventListener('touchend', endTouch);
                zone.addEventListener('touchcancel', endTouch);
            };

            bindJoystick('stick-left', (x, y) => { STATE.inputMove = { x, y }; });
            bindJoystick('stick-right', (x, y, active) => {
                if (active) { STATE.inputAim = { x, y }; STATE.isFiring = true; }
                else { STATE.isFiring = false; }
            });
        }
    