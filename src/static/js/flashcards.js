/**
 * Extracted from flashcards.html (shared across IGCSE topics) on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

// --- FULL DATA SET ---
let allData = [];

// --- GAME STATE ---
let deck = [];
let activeDeck = []; // Cards currently in play
let unknownPile = []; // Cards missed
let knownPile = [];   // Cards mastered

let currentIndex = 0;
let isFlipped = false;

function bindCompletionActions() {
    const answerContainer = document.getElementById('aText');
    if (!answerContainer || answerContainer.dataset.completionActionsBound === 'true') {
        return;
    }

    answerContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const actionButton = target.closest('button[data-flashcard-action]');
        if (!actionButton) return;

        event.stopPropagation();
        const action = actionButton.getAttribute('data-flashcard-action');
        if (action === 'next-round') {
            startNextRound();
        } else if (action === 'full-reset') {
            fullReset();
        }
    });

    answerContainer.dataset.completionActionsBound = 'true';
}

async function init() {
    try {
        bindCompletionActions();

        // Resolve questions.json relative to the HTML file's actual directory
        // With cleanUrls, /flashcards serves flashcards.html, so we need to strip the last path segment
        const pathParts = window.location.pathname.split('/');
        // Remove the last segment (page name like 'flashcards')
        pathParts.pop();
        // If the last remaining segment is empty (root), add back
        const basePath = pathParts.join('/') || '/';
        const questionsUrl = basePath + (basePath.endsWith('/') ? '' : '/') + 'questions.json';

        const response = await fetch(questionsUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        allData = await response.json();
        fullReset();
    } catch (error) {
        console.error('Error loading questions:', error);
        document.getElementById('qText').innerHTML = "Error loading questions.<br><small>Please check console.</small>";
    }
}

function fullReset() {
    // Start fresh with all cards
    activeDeck = [...allData];
    shuffleArray(activeDeck);

    unknownPile = [];
    knownPile = [];
    currentIndex = 0;
    isFlipped = false;

    updateVisuals();
    loadCard();
}

function startNextRound() {
    // This is called when the deck is empty but there are unknown cards
    // Animation logic happens here

    // Move unknown cards back to active deck
    activeDeck = [...unknownPile];
    shuffleArray(activeDeck);

    // Reset piles for the new round
    unknownPile = [];
    // knownPile stays as is (visually) or could accrue. 
    // For this logic, let's keep knownPile separate as "Banked" knowledge.

    currentIndex = 0;
    isFlipped = false;

    // Trigger animation: Card flies from Unknown Pile to Center
    const card = document.getElementById('flashcard');
    card.classList.add('fly-in');

    setTimeout(() => {
        card.classList.remove('fly-in');
        updateVisuals();
        loadCard();
    }, 800);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleRemaining() {
    if (currentIndex >= activeDeck.length) return;

    // Get the remaining cards
    const remaining = activeDeck.slice(currentIndex);

    // Shuffle them
    shuffleArray(remaining);

    // Reconstruct activeDeck: processed cards + shuffled remaining cards
    const processed = activeDeck.slice(0, currentIndex);
    activeDeck = processed.concat(remaining);

    // Reload current card
    loadCard();

    // Visual feedback
    const cardEl = document.getElementById('flashcard');
    // Reset animation
    cardEl.classList.remove('fly-in');
    void cardEl.offsetWidth; // Trigger reflow
    cardEl.classList.add('fly-in');

    setTimeout(() => {
        cardEl.classList.remove('fly-in');
    }, 800);
}

function loadCard() {
    const cardEl = document.getElementById('flashcard');
    const feedback = document.getElementById('feedbackBtns');
    const progress = document.getElementById('progressText');

    // Reset visual state
    isFlipped = false;
    cardEl.classList.remove('flipped');
    feedback.classList.remove('visible');

    // Check if deck complete
    if (currentIndex >= activeDeck.length) {
        handleDeckComplete();
        return;
    }

    // Load Content
    const item = activeDeck[currentIndex];
    document.getElementById('qText').innerHTML = item.q;
    document.getElementById('aText').innerHTML = item.a;
    progress.innerText = `Card ${currentIndex + 1} of ${activeDeck.length}`;
}

function handleDeckComplete() {
    const qText = document.getElementById('qText');
    const aText = document.getElementById('aText');
    const feedback = document.getElementById('feedbackBtns');

    if (unknownPile.length > 0) {
        qText.innerHTML = "<i class='fa-solid fa-rotate'></i> Round Complete!";
        aText.innerHTML = `You have ${unknownPile.length} cards to review.<br><br><button class='nav-btn' data-flashcard-action='next-round'>Review Now</button>`;
    } else {
        qText.innerHTML = "<i class='fa-solid fa-trophy'></i> All Mastered!";
        aText.innerHTML = "Great job! You've cleared the deck.<br><br><button class='nav-btn' data-flashcard-action='full-reset'>Start Over</button>";
    }

    // Auto-flip to back to show the message
    document.getElementById('flashcard').classList.add('flipped');
    feedback.classList.remove('visible');
}

function flip() {
    // Don't flip if session is over (buttons are on the back face)
    if (currentIndex >= activeDeck.length) return;

    const cardEl = document.getElementById('flashcard');
    const feedback = document.getElementById('feedbackBtns');

    isFlipped = !isFlipped;
    if (isFlipped) {
        cardEl.classList.add('flipped');
        feedback.classList.add('visible');
    } else {
        cardEl.classList.remove('flipped');
        feedback.classList.remove('visible');
    }
}

function rateCard(rating, event) {
    event.stopPropagation(); // Prevent card flip when clicking buttons

    const currentCard = activeDeck[currentIndex];

    if (rating === 'miss') {
        unknownPile.push(currentCard);
    } else {
        knownPile.push(currentCard);
    }

    currentIndex++;
    updateVisuals();
    loadCard();
}

function updateVisuals() {
    // Update Pile Counts
    document.getElementById('countUnknown').innerText = unknownPile.length;
    document.getElementById('countKnown').innerText = knownPile.length;

    // Visual styling for empty/full piles
    const pU = document.getElementById('pileUnknown');
    const pK = document.getElementById('pileKnown');

    unknownPile.length > 0 ? pU.classList.add('has-cards') : pU.classList.remove('has-cards');
    knownPile.length > 0 ? pK.classList.add('has-cards') : pK.classList.remove('has-cards');
}

// Start
init();
