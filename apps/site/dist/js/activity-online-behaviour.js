/**
 * Extracted from Online-behaviour.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 *
 * Features:
 * - Key modal appears on page load
 * - Start button dismisses modal and shows game
 * - Card swipe gestures work (up/down/left/right)
 * - Direction buttons work
 * - Cards flip correctly
 * - Progress bar updates
 * - Score tracking works
 * - End screen appears
 */

        // ============================================
        // CARD DATA
        // ============================================
        const cards = [
            {
                id: 1,
                frontText: "You're in a group chat on Discord with classmates. Someone shares an embarrassing photo of another student who isn't in the chat.",
                backText: "You screenshot the photo and send it to your best friend in a private message.",
                app: "Discord",
                tags: ["sharing", "embarrassing_content", "private_message"]
            },
            {
                id: 2,
                frontText: "Your teacher asks a question on MS Teams during an online lesson. You know the answer but you're worried about getting it wrong in front of everyone.",
                backText: "You unmute yourself and answer the question using your real name, giving it your best shot.",
                app: "MS Teams",
                tags: ["classroom", "participation", "real_identity"]
            },
            {
                id: 3,
                frontText: "You see a TikTok video where someone is being bullied in the comments. The person being bullied goes to your school.",
                backText: "You write a supportive comment using your real account with your name visible.",
                app: "TikTok",
                tags: ["support", "bullying", "public_comment"]
            },
            {
                id: 4,
                frontText: "A friend tells you they're being pressured to send photos to someone online. They ask you not to tell anyone.",
                backText: "You send an anonymous email to a trusted teacher explaining the situation without naming yourself.",
                app: "School Email",
                tags: ["safeguarding", "anonymous_report", "sensitive"]
            },
            {
                id: 5,
                frontText: "Someone posts mean comments about your friend on Instagram. Your friend is really upset about it.",
                backText: "You create a fake account and post mean comments back at the person who started it.",
                app: "Instagram",
                tags: ["revenge", "fake_account", "harassment"]
            },
            {
                id: 6,
                frontText: "You want to share your opinion about a TV show on a fan forum. Some of your opinions are a bit controversial.",
                backText: "You create a username that doesn't identify you and share your honest thoughts respectfully.",
                app: "Reddit",
                tags: ["opinion", "pseudonym", "respectful"]
            },
            {
                id: 7,
                frontText: "Your friend is sick and missed an important lesson. They ask if you can help them catch up.",
                backText: "You send them your notes via WhatsApp and offer to video call to explain anything confusing.",
                app: "WhatsApp",
                tags: ["helping", "friendship", "academic"]
            },
            {
                id: 8,
                frontText: "You're watching a YouTube stream and the streamer asks viewers to share if they've ever struggled with anxiety.",
                backText: "You share your experience in the chat using a username that doesn't reveal who you are.",
                app: "YouTube",
                tags: ["mental_health", "anonymous_sharing", "community"]
            },
            {
                id: 9,
                frontText: "A classmate shares their artwork on Instagram and asks for honest feedback.",
                backText: "You comment 'this is rubbish lol' with laughing emojis from your real account.",
                app: "Instagram",
                tags: ["feedback", "cruel", "public"]
            },
            {
                id: 10,
                frontText: "You notice someone in your year posting worrying things on Snapchat that suggest they might be really struggling.",
                backText: "You take a screenshot and show it to a teacher the next day without telling the person.",
                app: "Snapchat",
                tags: ["safeguarding", "screenshot", "ambiguous"]
            },
            {
                id: 11,
                frontText: "Your friend gives you their password to help them post something while they're away. While logged in, you see private messages.",
                backText: "You read through some of their private conversations because you're curious.",
                app: "Instagram",
                tags: ["privacy", "trust", "snooping"]
            },
            {
                id: 12,
                frontText: "You're in a heated argument with someone on a gaming server. They start insulting you personally.",
                backText: "You respond by finding their social media and posting their personal info in the chat.",
                app: "Discord",
                tags: ["doxxing", "revenge", "dangerous"]
            },
            {
                id: 13,
                frontText: "You want to raise an issue about a school rule you think is unfair. The school has a suggestion box system.",
                backText: "You submit your feedback through the anonymous school suggestion system, clearly explaining your concerns.",
                app: "School System",
                tags: ["feedback", "constructive", "anonymous"]
            },
            {
                id: 14,
                frontText: "Someone you don't know well sends you a follow request. Their profile looks normal and you have mutual friends.",
                backText: "You accept the request and immediately DM them personal information about where you live.",
                app: "Instagram",
                tags: ["stranger_danger", "oversharing", "safety"]
            },
            {
                id: 15,
                frontText: "You wrote something mean about a teacher in a group chat last year. Someone screenshots it and threatens to show the teacher.",
                backText: "You go to the teacher yourself, apologise for what you wrote, and explain you've changed.",
                app: "WhatsApp",
                tags: ["accountability", "apology", "growth"]
            },
            {
                id: 16,
                frontText: "Your friend made a TikTok of you both being silly. It's a bit embarrassing but also really funny.",
                backText: "You ask them not to post it publicly, but say you're okay if they share it just with close friends.",
                app: "TikTok",
                tags: ["consent", "boundaries", "friendship"]
            }
        ];

        // ============================================
        // INSTRUCTION STEPS
        // ============================================
        const instructionSteps = [
            {
                title: "Welcome! 👋",
                content: `
                    <p>In this activity, you'll look at <strong>16 real-life online scenarios</strong> and decide how you'd judge each person's behaviour.</p>
                    <p style="margin-top: 15px;">It's about thinking carefully about what's okay online — and whether it matters if people know who you are.</p>
                `
            },
            {
                title: "How It Works 🎴",
                content: `
                    <p>Each card has <strong>two sides:</strong></p>
                    <p style="margin-top: 10px;"><strong>Front:</strong> The situation — what's happening and where</p>
                    <p style="margin-top: 5px;"><strong>Back:</strong> The action — what the person actually did</p>
                    <p style="margin-top: 15px;">First, read the situation. Then <strong>tap the card to flip it</strong> and see what they did.</p>
                `
            },
            {
                title: "The Four Choices ⬆️⬇️⬅️➡️",
                content: `
                    <div class="direction-preview">
                        <div class="direction-item left">
                            <div class="arrow">←</div>
                            <div class="label">Good & Use Your Name<br><small>This is good — no need to hide who you are.</small></div>
                        </div>
                        <div class="direction-item right">
                            <div class="arrow">→</div>
                            <div class="label">Good but Stay Anonymous<br><small>This is fine — but better to use a nickname.</small></div>
                        </div>
                        <div class="direction-item down">
                            <div class="arrow">↓</div>
                            <div class="label">Not OK Online<br><small>This behaviour shouldn’t happen.</small></div>
                        </div>
                        <div class="direction-item up">
                            <div class="arrow">↑</div>
                            <div class="label">It Depends…<br><small>This one is complicated — you decide.</small></div>
                        </div>
                    </div>
                `
            },
            {
                title: "Controls 🎮",
                content: `
                    <p><strong>Tap the card</strong> to flip it over and see what they did.</p>
                    <p style="margin-top: 15px;">Then <strong>click the button</strong> in the direction of your choice, or <strong>swipe/drag</strong> the card that way.</p>
                    <p style="margin-top: 15px;">The pile counts at the bottom show how many cards you've put in each category.</p>
                `
            },
            {
                title: "Ready? 🚀",
                content: `
                    <p>At the end, you'll see all your choices sorted into groups.</p>
                    <p style="margin-top: 15px;">You'll then use these to complete some <strong>written work</strong> in your exercise book.</p>
                    <p style="margin-top: 20px; font-size: 1.2rem;"><strong>Let's go!</strong></p>
                `
            }
        ];

        // ============================================
        // STATE
        // ============================================
        let currentStep = 0;
        let currentCardIndex = 0;
        let isFlipped = false;
        let results = { left: [], right: [], up: [], down: [] };
        let picked = { left: new Set(), right: new Set(), up: new Set(), down: new Set() };
        let isDragging = false;
        let startX = 0, startY = 0, currentX = 0, currentY = 0;

        // ============================================
        // DOM ELEMENTS
        // ============================================
        const instructionsScreen = document.getElementById('instructions-screen');
        const gameScreen = document.getElementById('game-screen');
        const resultsScreen = document.getElementById('results-screen');
        const stepContent = document.getElementById('step-content');
        const stepDots = document.querySelectorAll('.step-dot');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const cardElement = document.getElementById('current-card-element');
        const cardContainer = document.getElementById('card-container');
        const progressFill = document.getElementById('progress-fill');
        const currentCardSpan = document.getElementById('current-card-num');
        const totalCardsSpan = document.getElementById('total-cards');
        const gameGuidance = document.getElementById('game-guidance');
        const openGuideBtn = document.getElementById('open-guide-btn');
        const startPlayingBtn = document.getElementById('start-playing-btn');
        const keyModalOverlay = document.getElementById('key-modal-overlay');
        const keyPanel = document.getElementById('key-panel');

        const pickedSummary = document.getElementById('picked-summary');
        const clearPicksBtn = document.getElementById('clear-picks-btn');
        const pickedValues = {
            left: document.getElementById('picked-left'),
            right: document.getElementById('picked-right'),
            up: document.getElementById('picked-up'),
            down: document.getElementById('picked-down')
        };

        const controlBtns = {
            left: document.getElementById('btn-left'),
            right: document.getElementById('btn-right'),
            up: document.getElementById('btn-up'),
            down: document.getElementById('btn-down')
        };

        const pileCounts = {
            left: document.getElementById('pile-left'),
            right: document.getElementById('pile-right'),
            up: document.getElementById('pile-up'),
            down: document.getElementById('pile-down')
        };

        // ============================================
        // INSTRUCTIONS NAVIGATION
        // ============================================
        function renderStep() {
            const step = instructionSteps[currentStep];
            stepContent.innerHTML = `<h2>${step.title}</h2>${step.content}`;

            stepDots.forEach((dot, i) => {
                dot.classList.remove('active', 'completed');
                if (i < currentStep) dot.classList.add('completed');
                if (i === currentStep) dot.classList.add('active');
            });

            prevBtn.style.display = currentStep === 0 ? 'none' : 'block';
            nextBtn.textContent = currentStep === instructionSteps.length - 1 ? 'Start! 🎴' : 'Next →';
        }

        prevBtn.addEventListener('click', () => { if (currentStep > 0) { currentStep--; renderStep(); } });
        nextBtn.addEventListener('click', () => {
            if (currentStep < instructionSteps.length - 1) { currentStep++; renderStep(); }
            else { startGame(); }
        });

        // ============================================
        // GAME LOGIC
        // ============================================
        function startGame() {
            instructionsScreen.classList.remove('active');
            // Show the key modal instead of the game screen
            startPlayingBtn.textContent = 'Start Playing →';
            keyModalOverlay.classList.add('active');
        }

        // Key modal start button
        startPlayingBtn.addEventListener('click', () => {
            // Hide the modal
            keyModalOverlay.classList.remove('active');
            // Show the game screen
            gameScreen.classList.add('active');
            // Show the side panel
            keyPanel.classList.add('active');
            // Initialize the game
            totalCardsSpan.textContent = cards.length;
            updatePileCounts();
            loadCard();
        });

        function updateGuidance() {
            if (!gameGuidance) return;
            gameGuidance.textContent = isFlipped
                ? 'Now choose a direction (arrow buttons or swipe).'
                : 'Read the situation, then tap the card to flip it.';
        }

        function loadCard() {
            if (currentCardIndex >= cards.length) { showResults(); return; }

            const card = cards[currentCardIndex];
            cardElement.classList.remove('flipped', 'swiping', 'swipe-left', 'swipe-right', 'swipe-up', 'swipe-down');
            cardElement.style.transform = '';
            cardElement.style.opacity = '';
            isFlipped = false;

            document.getElementById('card-app').textContent = card.app;
            document.getElementById('card-app-back').textContent = card.app;
            document.getElementById('card-front-text').textContent = card.frontText;
            document.getElementById('card-back-text').textContent = card.backText;

            currentCardSpan.textContent = currentCardIndex + 1;
            progressFill.style.width = `${(currentCardIndex / cards.length) * 100}%`;
            updateButtonStates();
            updateGuidance();
        }

        function updateButtonStates() {
            Object.values(controlBtns).forEach(btn => { btn.disabled = !isFlipped; });
        }

        function updatePileCounts() {
            pileCounts.left.textContent = results.left.length;
            pileCounts.right.textContent = results.right.length;
            pileCounts.up.textContent = results.up.length;
            pileCounts.down.textContent = results.down.length;
        }

        function flipCard() {
            isFlipped = !isFlipped;
            cardElement.classList.toggle('flipped');
            updateButtonStates();
            updateGuidance();
        }

        function swipeCard(direction) {
            if (!isFlipped) return;
            results[direction].push(cards[currentCardIndex]);
            updatePileCounts();
            cardElement.classList.add('swiping', `swipe-${direction}`);
            setTimeout(() => { currentCardIndex++; loadCard(); }, 400);
        }

        // Card interactions
        cardContainer.addEventListener('click', (e) => { if (!isDragging) flipCard(); });
        Object.entries(controlBtns).forEach(([dir, btn]) => { btn.addEventListener('click', () => swipeCard(dir)); });

        function getEventPosition(e) {
            return e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };
        }

        function handleDragStart(e) {
            if (!isFlipped) return;
            isDragging = true;
            const pos = getEventPosition(e);
            startX = pos.x; startY = pos.y;
            currentX = 0; currentY = 0;
            cardElement.classList.add('dragging');
        }

        function handleDragMove(e) {
            if (!isDragging) return;
            e.preventDefault();
            const pos = getEventPosition(e);
            currentX = pos.x - startX; currentY = pos.y - startY;
            // Invert X because of rotateY(180deg)
            cardElement.style.transform = `rotateY(180deg) translate(${-currentX}px, ${currentY}px) rotate(${currentX * 0.1}deg)`;
        }

        function handleDragEnd() {
            if (!isDragging) return;
            isDragging = false;
            cardElement.classList.remove('dragging');
            const threshold = 80;
            let direction = null;

            if (Math.abs(currentX) > Math.abs(currentY)) {
                if (currentX > threshold) direction = 'right';
                else if (currentX < -threshold) direction = 'left';
            } else {
                if (currentY > threshold) direction = 'down';
                else if (currentY < -threshold) direction = 'up';
            }

            if (direction) swipeCard(direction);
            else cardElement.style.transform = '';
        }

        cardContainer.addEventListener('mousedown', handleDragStart);
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
        cardContainer.addEventListener('touchstart', handleDragStart, { passive: true });
        document.addEventListener('touchmove', handleDragMove, { passive: false });
        document.addEventListener('touchend', handleDragEnd);

        // Keyboard controls (helpful for laptops / accessibility)
        document.addEventListener('keydown', (e) => {
            if (!gameScreen.classList.contains('active')) return;
            if (keyModalOverlay.classList.contains('active')) return;
            if (overlay.classList.contains('active')) return;

            const key = e.key;
            if (key === ' ' || key === 'Enter') {
                e.preventDefault();
                flipCard();
                return;
            }

            if (!isFlipped) return;

            if (key === 'ArrowLeft') { e.preventDefault(); swipeCard('left'); }
            else if (key === 'ArrowRight') { e.preventDefault(); swipeCard('right'); }
            else if (key === 'ArrowUp') { e.preventDefault(); swipeCard('up'); }
            else if (key === 'ArrowDown') { e.preventDefault(); swipeCard('down'); }
        });

        // Re-open the swipe guide during the game (useful on small screens)
        openGuideBtn.addEventListener('click', () => {
            startPlayingBtn.textContent = 'Back to game';
            keyModalOverlay.classList.add('active');
        });

        // ============================================
        // RESULTS
        // ============================================
        function formatPickedList(dir) {
            const ids = Array.from(picked[dir]).sort((a, b) => a - b);
            if (!ids.length) return 'None yet';
            return ids.length === 1 ? `Card ${ids[0]}` : `Cards ${ids.join(', ')}`;
        }

        function updatePickedUi() {
            if (pickedSummary) {
                pickedSummary.innerHTML =
                    `<strong>Picked cards:</strong> ↓ ${formatPickedList('down')} | ← ${formatPickedList('left')} | → ${formatPickedList('right')} | ↑ ${formatPickedList('up')}`;
            }

            Object.entries(pickedValues).forEach(([dir, el]) => {
                if (!el) return;
                el.textContent = formatPickedList(dir);
            });
        }

        function setPickButtonState(btn, isPicked) {
            if (!btn) return;
            btn.setAttribute('aria-pressed', isPicked ? 'true' : 'false');
            btn.textContent = isPicked ? 'Picked ✓' : 'Pick';
        }

        function togglePicked(dir, cardId, cardEl, btnEl) {
            const dirSet = picked[dir];
            const nowPicked = !dirSet.has(cardId);
            if (nowPicked) dirSet.add(cardId);
            else dirSet.delete(cardId);

            if (cardEl) cardEl.classList.toggle('picked', nowPicked);
            setPickButtonState(btnEl, nowPicked);
            updatePickedUi();
        }

        function showResults() {
            gameScreen.classList.remove('active');
            resultsScreen.classList.add('active');
            keyPanel.classList.remove('active');

            // Update tab counts
            document.getElementById('tab-count-left').textContent = results.left.length;
            document.getElementById('tab-count-right').textContent = results.right.length;
            document.getElementById('tab-count-up').textContent = results.up.length;
            document.getElementById('tab-count-down').textContent = results.down.length;

            // Render cards for each tab
            ['left', 'right', 'up', 'down'].forEach(dir => {
                const container = document.getElementById(`cards-${dir}`);
                if (results[dir].length === 0) {
                    container.innerHTML = `
                        <div class="empty-message">
                            <div class="icon">📭</div>
                            <p>No cards in this pile</p>
                        </div>
                    `;
                } else {
                    container.innerHTML = results[dir].map(card => `
                        <div class="result-card ${picked[dir].has(card.id) ? 'picked' : ''}" data-dir="${dir}" data-card-id="${card.id}">
                            <div class="result-card-header">
                                <h4>Card ${card.id}</h4>
                                <div class="result-card-actions">
                                    <span class="app-tag">${card.app}</span>
                                    <button class="pick-btn" type="button" data-pick="${dir}" data-card-id="${card.id}" aria-pressed="${picked[dir].has(card.id) ? 'true' : 'false'}">
                                        ${picked[dir].has(card.id) ? 'Picked ✓' : 'Pick'}
                                    </button>
                                </div>
                            </div>
                            <div class="result-card-body">
                                <div class="scenario">
                                    <div class="label">📍 Scenario</div>
                                    ${card.frontText}
                                </div>
                                <div class="action">
                                    <div class="label">⚡ Action</div>
                                    ${card.backText}
                                </div>
                            </div>
                        </div>
                    `).join('');
                }
            });

            updatePickedUi();
        }

        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;

                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                tab.classList.add('active');
                document.getElementById(`content-${tabId}`).classList.add('active');
            });
        });

        // Written work overlay
        const toggleBtn = document.getElementById('toggle-written-work');
        const overlay = document.getElementById('written-work-overlay');
        const closeBtn = document.getElementById('close-written-work');

        toggleBtn.addEventListener('click', () => {
            overlay.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });

        // Picking cards for written work
        resultsScreen.addEventListener('click', (e) => {
            const pickBtn = e.target.closest('.pick-btn');
            if (!pickBtn) return;

            const dir = pickBtn.dataset.pick;
            const cardId = Number(pickBtn.dataset.cardId);
            if (!dir || !Number.isFinite(cardId)) return;

            const cardEl = pickBtn.closest('.result-card');
            togglePicked(dir, cardId, cardEl, pickBtn);
        });

        clearPicksBtn.addEventListener('click', () => {
            picked = { left: new Set(), right: new Set(), up: new Set(), down: new Set() };

            document.querySelectorAll('.result-card.picked').forEach(cardEl => {
                cardEl.classList.remove('picked');
            });
            document.querySelectorAll('.pick-btn').forEach(btn => {
                setPickButtonState(btn, false);
            });

            updatePickedUi();
        });

        // Restart
        document.getElementById('restart-btn').addEventListener('click', () => {
            currentCardIndex = 0;
            isFlipped = false;
            results = { left: [], right: [], up: [], down: [] };
            picked = { left: new Set(), right: new Set(), up: new Set(), down: new Set() };
            currentStep = 0;
            resultsScreen.classList.remove('active');
            instructionsScreen.classList.add('active');

            // Hide the key panel when restarting
            keyPanel.classList.remove('active');

            // Reset tabs to default
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.querySelector('.tab.down').classList.add('active');
            document.getElementById('content-down').classList.add('active');

            renderStep();
        });

        // Init
        renderStep();
    
